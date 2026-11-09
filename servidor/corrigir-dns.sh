#!/bin/bash
# Netliss - corrige as falhas de DNS do servidor (passa a usar Cloudflare e Google)
# Uso (como root):  curl -fsSL https://raw.githubusercontent.com/TheB171/netliss-widget/main/servidor/corrigir-dns.sh | bash
# Para desfazer:     rm /etc/systemd/resolved.conf.d/netliss-dns.conf; cp /root/daemon.json.antes-netliss /etc/docker/daemon.json; systemctl restart systemd-resolved docker
exec > >(tee -a /root/netliss-dns.log) 2>&1
echo "== Netliss: correcao de DNS $(date) =="
command -v jq >/dev/null || apt-get install -y jq >/dev/null

echo "-- DNS antes:"
(resolvectl status 2>/dev/null | grep -E "DNS Servers|Current DNS") || cat /etc/resolv.conf
echo "-- Docker antes:"; cat /etc/docker/daemon.json 2>/dev/null || echo "(sem daemon.json)"

# 01. DNS do proprio servidor
if systemctl is-active --quiet systemd-resolved; then
  mkdir -p /etc/systemd/resolved.conf.d
  cat > /etc/systemd/resolved.conf.d/netliss-dns.conf <<'EOF'
[Resolve]
DNS=1.1.1.1 8.8.8.8
FallbackDNS=1.0.0.1 8.8.4.4
Domains=~.
EOF
  systemctl restart systemd-resolved
else
  [ -f /root/resolv.conf.antes-netliss ] || cp /etc/resolv.conf /root/resolv.conf.antes-netliss
  printf "nameserver 1.1.1.1\nnameserver 8.8.8.8\nnameserver 1.0.0.1\n" > /etc/resolv.conf
fi

# 02. DNS dos programas (n8n, Dify, Caddy) dentro do Docker
mkdir -p /etc/docker
if [ -s /etc/docker/daemon.json ] && jq . /etc/docker/daemon.json >/dev/null 2>&1; then
  [ -f /root/daemon.json.antes-netliss ] || cp /etc/docker/daemon.json /root/daemon.json.antes-netliss
else
  echo '{}' > /root/daemon.json.antes-netliss
  echo '{}' > /etc/docker/daemon.json
fi
TMP=$(mktemp)
jq '. + {"dns":["1.1.1.1","8.8.8.8","1.0.0.1"]}' /etc/docker/daemon.json > "$TMP" && mv "$TMP" /etc/docker/daemon.json

# 03. Reinicia o Docker e sobe tudo de novo (Liss e n8n ficam fora do ar por cerca de 01 a 02 minutos)
echo "-- Reiniciando o Docker..."
systemctl restart docker
sleep 5
docker start n8n caddy >/dev/null 2>&1 || true
(cd /opt/dify/docker && docker compose up -d) || true

# 04. Espera o n8n e o Dify voltarem
for i in $(seq 1 60); do
  N=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5678/healthz)
  D=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8080/)
  [ "$N" = "200" ] && [ "$D" != "000" ] && break
  sleep 3
done
echo "-- n8n: $N | Dify: $D"

# 05. Teste: 20 rodadas procurando os enderecos que a Netliss usa, de dentro do n8n
echo "-- Testando os enderecos (20 rodadas)..."
docker exec n8n node -e '
const dns=require("dns").promises;
const hosts=["painel.netliss.shop","sheets.googleapis.com","api.telegram.org","api.anthropic.com","atendimento.netliss.com"];
(async()=>{let ok=0,falha=0;for(let r=0;r<20;r++){for(const h of hosts){try{await dns.lookup(h);ok++;}catch(e){falha++;console.log("falhou",h,e.code);}}}
console.log("RESULTADO: "+ok+" certos, "+falha+" falhas");})();'

echo "-- DNS depois:"
(resolvectl status 2>/dev/null | grep -E "DNS Servers|Current DNS" | head -3) || cat /etc/resolv.conf
docker exec n8n cat /etc/resolv.conf | grep nameserver
echo
echo "================ PRONTO ================"
echo "Copie as linhas acima (de -- n8n ate aqui) e mande para o Claude."
