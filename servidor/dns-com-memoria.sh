#!/bin/bash
# Netliss - DNS com memoria (cache) para o servidor parar de "perder a internet"
# O que faz: o proprio servidor passa a guardar os enderecos ja consultados e, se a internet
# piscar, continua usando o endereco guardado (em vez de dar erro). n8n, Dify e Liss usam essa memoria.
# Uso (como root):  curl -fsSL https://raw.githubusercontent.com/TheB171/netliss-widget/main/servidor/dns-com-memoria.sh | bash
exec > >(tee -a /root/netliss-dns2.log) 2>&1
echo "== Netliss: DNS com memoria $(date) =="
command -v jq >/dev/null || apt-get install -y jq >/dev/null

GW=$(ip -4 addr show docker0 2>/dev/null | awk '/inet /{print $2}' | cut -d/ -f1)
[ -z "$GW" ] && GW=172.17.0.1
echo "-- endereco do servidor para os programas: $GW"

# copias para desfazer
cp -f /etc/docker/daemon.json /root/daemon.json.antes-dns2 2>/dev/null
cp -f /etc/systemd/resolved.conf.d/netliss-dns.conf /root/resolved-netliss.antes-dns2 2>/dev/null

desfazer () {
  echo "!! Algo nao funcionou. Voltando como estava..."
  cp -f /root/resolved-netliss.antes-dns2 /etc/systemd/resolved.conf.d/netliss-dns.conf 2>/dev/null
  cp -f /root/daemon.json.antes-dns2 /etc/docker/daemon.json 2>/dev/null
  systemctl restart systemd-resolved
  systemctl restart docker; sleep 5
  docker start n8n caddy >/dev/null 2>&1 || true
  (cd /opt/dify/docker && docker compose up -d) >/dev/null 2>&1 || true
  echo "================ VOLTEI COMO ESTAVA (nada quebrou) ================"
  echo "Tire um print e mande para o Claude."
  exit 1
}

# 01. memoria de DNS no servidor (guarda por ate 24h e usa o guardado se a internet piscar)
mkdir -p /etc/systemd/resolved.conf.d
cat > /etc/systemd/resolved.conf.d/netliss-dns.conf <<EOF
[Resolve]
DNS=1.1.1.1 8.8.8.8 1.0.0.1 8.8.4.4
FallbackDNS=9.9.9.9 149.112.112.112
Domains=~.
Cache=yes
StaleRetentionSec=86400
DNSStubListenerExtra=$GW
EOF
systemctl restart systemd-resolved
sleep 3

# libera o acesso dos programas (Docker) a essa memoria, se o firewall estiver ligado
if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then
  ufw allow from 172.16.0.0/12 to any port 53 >/dev/null
fi

# 02. programas (n8n, Dify) usam a memoria do servidor primeiro; se ela falhar, vao direto na Cloudflare
TMP=$(mktemp)
[ -s /etc/docker/daemon.json ] || echo '{}' > /etc/docker/daemon.json
jq --arg gw "$GW" '. + {"dns":[$gw,"1.1.1.1"],"dns-opts":["timeout:2","attempts:3"]}' /etc/docker/daemon.json > "$TMP" && mv "$TMP" /etc/docker/daemon.json || desfazer

echo "-- Reiniciando o Docker (Liss e n8n ficam fora do ar por 01 a 02 minutos)..."
systemctl restart docker || desfazer
sleep 5
docker start n8n caddy >/dev/null 2>&1 || true
(cd /opt/dify/docker && docker compose up -d) >/dev/null 2>&1 || true

for i in $(seq 1 60); do
  N=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5678/healthz)
  D=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8080/)
  [ "$N" = "200" ] && [ "$D" != "000" ] && break
  sleep 3
done
echo "-- n8n: $N | Dify: $D"
[ "$N" = "200" ] || desfazer

# 03. teste: 40 rodadas procurando os enderecos que a Netliss usa, de dentro do n8n
echo "-- Testando (40 rodadas)..."
RES=$(docker exec n8n node -e '
const dns=require("dns").promises;
const hosts=["painel.netliss.shop","sheets.googleapis.com","api.telegram.org","api.anthropic.com","atendimento.netliss.com","api.mercadopago.com","painel.dtunnel.com.br"];
(async()=>{let ok=0,falha=0;for(let r=0;r<40;r++){for(const h of hosts){try{await dns.lookup(h);ok++;}catch(e){falha++;}}}
console.log(ok+" "+falha);})();')
OK=$(echo "$RES" | awk '{print $1}'); FALHA=$(echo "$RES" | awk '{print $2}')
echo "RESULTADO: ${OK:-0} certos, ${FALHA:-?} falhas"
[ -n "$OK" ] && [ "${FALHA:-99}" -le 2 ] || desfazer

echo "-- Memoria ligada:"; resolvectl statistics 2>/dev/null | grep -iE "cache|current" | head -4
docker exec n8n cat /etc/resolv.conf | grep -E "nameserver|options"
echo
echo "================ PRONTO ================"
echo "Tire um print desta tela e mande para o Claude."
