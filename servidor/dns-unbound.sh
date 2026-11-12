#!/bin/bash
# Netliss - DNS a prova de queda (Unbound com memoria que responde na hora)
# Problema: quando a internet do servidor pisca, o DNS demora para responder e o n8n desiste
# (erro "The DNS server returned an error"). A memoria antiga so respondia depois de varios segundos.
# Solucao: o Unbound guarda os enderecos por ate 03 dias e, se a internet piscar, responde
# na hora com o endereco guardado, enquanto busca o novo em segundo plano.
# Uso (como root):  curl -fsSL https://raw.githubusercontent.com/TheB171/netliss-widget/main/servidor/dns-unbound.sh | bash
exec > >(tee -a /root/netliss-dns3.log) 2>&1
echo "== Netliss: DNS a prova de queda $(date) =="

GW=$(ip -4 addr show docker0 2>/dev/null | awk '/inet /{print $2}' | cut -d/ -f1)
[ -z "$GW" ] && GW=172.17.0.1
echo "-- endereco do servidor para os programas: $GW"

# copias para desfazer
cp -f /etc/systemd/resolved.conf.d/netliss-dns.conf /root/resolved-netliss.antes-dns3 2>/dev/null
cp -f /etc/docker/daemon.json /root/daemon.json.antes-dns3 2>/dev/null

desfazer () {
  echo "!! Algo nao funcionou. Voltando como estava..."
  systemctl stop unbound 2>/dev/null; systemctl disable unbound 2>/dev/null
  cp -f /root/resolved-netliss.antes-dns3 /etc/systemd/resolved.conf.d/netliss-dns.conf 2>/dev/null
  cp -f /root/daemon.json.antes-dns3 /etc/docker/daemon.json 2>/dev/null
  systemctl restart systemd-resolved
  sleep 3
  echo "================ VOLTEI COMO ESTAVA (nada quebrou) ================"
  echo "Tire um print e mande para o Claude."
  exit 1
}

# 01. instala o Unbound (sem deixar ele iniciar sozinho antes da configuracao)
echo "-- Instalando o Unbound..."
printf '#!/bin/sh\nexit 101\n' > /usr/sbin/policy-rc.d; chmod +x /usr/sbin/policy-rc.d
DEBIAN_FRONTEND=noninteractive apt-get install -y unbound >/dev/null 2>&1
rm -f /usr/sbin/policy-rc.d
command -v unbound >/dev/null || { echo "!! Nao consegui instalar o Unbound."; desfazer; }

# 02. configuracao: responde na hora com o endereco guardado e atualiza em segundo plano
mkdir -p /etc/unbound/unbound.conf.d
cat > /etc/unbound/unbound.conf.d/netliss.conf <<EOF
server:
    interface: 127.0.0.1
    interface: $GW
    ip-freebind: yes
    port: 53
    access-control: 127.0.0.0/8 allow
    access-control: 172.16.0.0/12 allow
    access-control: 10.0.0.0/8 allow
    access-control: 192.168.0.0/16 allow
    do-ip6: no
    num-threads: 1
    prefetch: yes
    cache-min-ttl: 600
    serve-expired: yes
    serve-expired-ttl: 259200
    serve-expired-client-timeout: 800
    msg-cache-size: 32m
    rrset-cache-size: 64m
    outgoing-num-tcp: 20
    incoming-num-tcp: 20
forward-zone:
    name: "."
    forward-addr: 1.1.1.1
    forward-addr: 8.8.8.8
    forward-addr: 9.9.9.9
    forward-addr: 1.0.0.1
    forward-addr: 8.8.4.4
EOF
# chave de seguranca do DNS (o Unbound precisa dela para ligar)
mkdir -p /var/lib/unbound; chown unbound:unbound /var/lib/unbound 2>/dev/null
if [ ! -s /var/lib/unbound/root.key ]; then
  runuser -u unbound -- unbound-anchor -a /var/lib/unbound/root.key >/dev/null 2>&1 || true
fi
if [ ! -s /var/lib/unbound/root.key ] && [ -s /usr/share/dns/root.key ]; then
  cp /usr/share/dns/root.key /var/lib/unbound/root.key; chown unbound:unbound /var/lib/unbound/root.key
fi
if [ ! -s /var/lib/unbound/root.key ]; then
  # sem a chave, desliga so a checagem extra (os servidores 1.1.1.1 e 8.8.8.8 ja fazem essa checagem)
  mv -f /etc/unbound/unbound.conf.d/root-auto-trust-anchor-file.conf /root/root-auto-trust-anchor-file.conf.desligado 2>/dev/null
fi
unbound-checkconf || { echo "!! Configuracao do Unbound com erro."; desfazer; }

# 03. a memoria antiga deixa de ouvir no endereco dos programas (o Unbound passa a responder ali)
if [ -f /etc/systemd/resolved.conf.d/netliss-dns.conf ]; then
  sed -i '/^DNSStubListenerExtra=/d' /etc/systemd/resolved.conf.d/netliss-dns.conf
fi
systemctl restart systemd-resolved
sleep 2

# 04. liga o Unbound
systemctl enable unbound >/dev/null 2>&1
systemctl restart unbound || { echo "!! O Unbound nao ligou."; journalctl -u unbound -n 20 --no-pager; desfazer; }
sleep 2

# libera o acesso dos programas (Docker) ao Unbound, se o firewall estiver ligado
if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then
  ufw allow from 172.16.0.0/12 to any port 53 >/dev/null
fi

# 05. os programas continuam usando o mesmo endereco ($GW); o Docker nao precisa reiniciar
command -v jq >/dev/null || apt-get install -y jq >/dev/null 2>&1
TMP=$(mktemp)
[ -s /etc/docker/daemon.json ] || echo '{}' > /etc/docker/daemon.json
NOVO=$(jq --arg gw "$GW" '. + {"dns":[$gw,"1.1.1.1"],"dns-opts":["timeout:3","attempts:3"]}' /etc/docker/daemon.json)
if [ "$NOVO" != "$(jq . /etc/docker/daemon.json)" ]; then
  echo "$NOVO" > "$TMP" && mv "$TMP" /etc/docker/daemon.json
  echo "-- Reiniciando o Docker (Liss e n8n ficam fora do ar por 01 a 02 minutos)..."
  systemctl restart docker || desfazer
  sleep 5
  docker start n8n caddy >/dev/null 2>&1 || true
  (cd /opt/dify/docker && docker compose up -d) >/dev/null 2>&1 || true
  for i in $(seq 1 60); do
    N=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5678/healthz)
    [ "$N" = "200" ] && break; sleep 3
  done
fi

# 06. teste: o Unbound responde?
R=$(dig +short +time=2 +tries=1 @"$GW" sheets.googleapis.com 2>/dev/null | head -1)
[ -z "$R" ] && R=$(getent hosts sheets.googleapis.com | awk '{print $1}' | head -1)
echo "-- Unbound respondeu: ${R:-NADA}"
[ -n "$R" ] || desfazer

# 07. teste de dentro do n8n: 40 rodadas com os enderecos que a Netliss usa
echo "-- Testando de dentro do n8n (40 rodadas)..."
RES=$(docker exec n8n node -e '
const dns=require("dns").promises;
const hosts=["painel.netliss.shop","sheets.googleapis.com","oauth2.googleapis.com","www.googleapis.com","api.telegram.org","api.anthropic.com","atendimento.netliss.com","api.mercadopago.com","painel.dtunnel.com.br","play.google.com"];
(async()=>{let ok=0,falha=0;for(let r=0;r<40;r++){for(const h of hosts){try{await dns.lookup(h);ok++;}catch(e){falha++;}}}
console.log(ok+" "+falha);})();')
OK=$(echo "$RES" | awk '{print $1}'); FALHA=$(echo "$RES" | awk '{print $2}')
echo "RESULTADO: ${OK:-0} certos, ${FALHA:-?} falhas"
[ -n "$OK" ] && [ "${FALHA:-99}" -le 2 ] || desfazer

echo "-- Unbound ligado:"; systemctl is-active unbound
docker exec n8n cat /etc/resolv.conf | grep -E "nameserver|options"
echo
echo "================ PRONTO ================"
echo "Tire um print desta tela e mande para o Claude."
