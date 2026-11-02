#!/bin/bash
# Netliss - instalacao do servidor (Dify + n8n + HTTPS automatico)
# Uso (como root):  curl -fsSL https://raw.githubusercontent.com/TheB171/netliss-widget/main/servidor/instalar.sh | bash
exec > >(tee -a /root/netliss-instalacao.log) 2>&1
export DEBIAN_FRONTEND=noninteractive
echo "== Netliss: inicio $(date) =="

# 01. Memoria extra (swap 4 GB)
if [ ! -f /swapfile ]; then
  fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

# 02. Pacotes basicos + protecao contra ataque de senha no SSH
apt-get update -y
apt-get install -y ca-certificates curl git jq openssl fail2ban unattended-upgrades
systemctl enable --now fail2ban || true

# 03. Docker
if ! command -v docker >/dev/null; then curl -fsSL https://get.docker.com | sh; fi
systemctl enable --now docker

# 04. Dify (ultima versao estavel), acessivel so por dentro do servidor (o HTTPS fica na frente)
TAG=$(curl -s https://api.github.com/repos/langgenius/dify/releases/latest | jq -r .tag_name)
if [ -z "$TAG" ] || [ "$TAG" = "null" ]; then TAG=main; fi
if [ ! -d /opt/dify ]; then git clone --depth 1 --branch "$TAG" https://github.com/langgenius/dify.git /opt/dify; fi
cd /opt/dify/docker
[ -f .env ] || cp .env.example .env
sed -i "s|^SECRET_KEY=.*|SECRET_KEY=$(openssl rand -hex 32)|" .env
sed -i "s|^EXPOSE_NGINX_PORT=.*|EXPOSE_NGINX_PORT=127.0.0.1:8080|" .env
sed -i "s|^EXPOSE_NGINX_SSL_PORT=.*|EXPOSE_NGINX_SSL_PORT=127.0.0.1:8443|" .env
grep -q '^EXPOSE_NGINX_PORT=' .env || echo 'EXPOSE_NGINX_PORT=127.0.0.1:8080' >> .env
grep -q '^EXPOSE_NGINX_SSL_PORT=' .env || echo 'EXPOSE_NGINX_SSL_PORT=127.0.0.1:8443' >> .env
docker compose up -d

# 05. n8n, tambem so por dentro do servidor
docker volume create n8n_data >/dev/null
docker rm -f n8n >/dev/null 2>&1 || true
docker run -d --name n8n --restart unless-stopped -p 127.0.0.1:5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_HOST=n8n.netliss.com -e N8N_PROTOCOL=https -e N8N_PORT=5678 \
  -e WEBHOOK_URL=https://n8n.netliss.com/ \
  -e GENERIC_TIMEZONE=America/Sao_Paulo -e TZ=America/Sao_Paulo \
  docker.n8n.io/n8nio/n8n:latest

# 06. Caddy: HTTPS automatico para atendimento.netliss.com e n8n.netliss.com
mkdir -p /opt/caddy
cat > /opt/caddy/Caddyfile <<'CADDY'
atendimento.netliss.com {
	reverse_proxy 127.0.0.1:8080
}
n8n.netliss.com {
	reverse_proxy 127.0.0.1:5678
}
CADDY
docker rm -f caddy >/dev/null 2>&1 || true
docker run -d --name caddy --restart unless-stopped --network host \
  -v /opt/caddy/Caddyfile:/etc/caddy/Caddyfile -v caddy_data:/data -v caddy_config:/config \
  caddy:2

sleep 20
echo
echo "== Servicos rodando =="
docker ps --format '{{.Names}}: {{.Status}}' | sort
echo
echo "== INSTALACAO CONCLUIDA (Dify $TAG) =="
