#!/bin/bash
# Netliss - confere a correcao da memoria e investiga a rede e os cortes de resposta. SOMENTE LEITURA.
DEST="$1"
OUT="/root/netliss-rede-$(date +%Y%m%d-%H%M).txt"
cd /opt/dify/docker || { echo "Nao achei /opt/dify/docker"; exit 1; }
{
echo "== CONFERE A CORRECAO $(date -Is) =="
docker compose exec -T api grep -c "InvokeFrom.WEB_APP}" core/app/apps/agent_chat/app_generator.py </dev/null | sed 's/^/linhas corrigidas no arquivo: /'
ls -la /root/netliss-corrige-*.txt 2>/dev/null; cat /root/netliss-corrige-*.txt 2>/dev/null | head -20
} > "$OUT" 2>&1
echo "Parte 02: testando a rede e lendo os registros (leva uns 03 minutos)..."
{
echo; echo "== REDE E REGISTROS $(date -Is) =="
GW=$(ip route | awk '/^default/{print $3; exit}')
echo "gateway da Contabo: $GW"
for t in "$GW" 213.136.95.10 1.1.1.1 8.8.8.8; do
  echo "-- ping $t"; ping -c 40 -i 0.3 -W 2 -q "$t" 2>&1 | tail -2
done
echo "-- ping IPv6 (google)"; ping -6 -c 20 -i 0.3 -W 2 -q 2001:4860:4860::8888 2>&1 | tail -2
echo "-- conexao com a Anthropic, IPv4 x IPv6 (conexao / total, em segundos)"
for i in 1 2 3 4 5; do
  curl -4 -s -o /dev/null -m 10 -w "v4 %{time_connect} / %{time_total}\n" https://api.anthropic.com || echo "v4 FALHOU"
  curl -6 -s -o /dev/null -m 10 -w "v6 %{time_connect} / %{time_total}\n" https://api.anthropic.com || echo "v6 FALHOU"
done
echo "-- conexao com o painel"
for i in 1 2 3; do curl -s -o /dev/null -m 15 -w "dns %{time_namelookup} / conexao %{time_connect} / total %{time_total}\n" https://painel.netliss.shop || echo "FALHOU"; done
echo "-- DNS sem cache (milissegundos)"
for h in painel.netliss.shop api.anthropic.com api.mercadopago.com; do
  for i in 1 2; do
    resolvectl flush-caches 2>/dev/null
    s=$(date +%s%N); resolvectl query --cache=no "$h" >/dev/null 2>&1; rc=$?; e=$(date +%s%N)
    echo "$h tentativa $i: $(( (e-s)/1000000 ))ms (codigo $rc)"
  done
done
echo "-- placa de rede (erros e descartes)"; ip -s link show eth0 2>/dev/null | sed -n '1,12p'
echo "-- retransmissoes TCP desde o reinicio"; nstat -az 2>/dev/null | grep -E "TcpOutSegs|TcpRetransSegs|TcpExtTCPLostRetransmit|TcpExtTCPTimeouts|TcpExtTCPAbortOnTimeout"
echo "-- caddy: respostas cortadas nas ultimas 72h (por endereco)"
docker logs caddy --since 72h 2>&1 | grep 'aborting with incomplete response' | grep -oE '"uri":"[^"?]+' | sort | uniq -c | sort -rn | head -10
echo "-- caddy: erros nas ultimas 72h (tipos)"
docker logs caddy --since 72h 2>&1 | grep -oE '"level":"(error|warn)","ts":[0-9.]+,"logger":"[^"]+","msg":"[^"]+' | sed -E 's/"ts":[0-9.]+,//' | sort | uniq -c | sort -rn | head -10
echo "-- caddy: caso do Lucas (24/11 01:50 UTC)"
docker logs caddy --since 80h 2>&1 | grep -E '"ts":17954850[0-9][0-9]|"ts":17954851[0-9][0-9]' | grep -oE '"msg":"[^"]+"|"uri":"[^"?]+|"duration":[0-9.]+|"status":[0-9]+|"error":"[^"]+"' | paste -sd' ' | cut -c1-1500
echo "-- configuracao de trabalho do Dify"
grep -E "^(SERVER_WORKER_AMOUNT|SERVER_WORKER_CLASS|SERVER_WORKER_CONNECTIONS|GUNICORN_TIMEOUT|API_TOOL_DEFAULT_READ_TIMEOUT|APP_MAX_EXECUTION_TIME|NGINX_PROXY_READ_TIMEOUT|NGINX_KEEPALIVE_TIMEOUT)=" .env
echo "-- api do Dify: erros e cortes nas ultimas 72h (tipos)"
docker compose logs --no-color --since 72h api 2>&1 | grep -iE "error|exception|timeout|disconnect|broken pipe|reset by peer|worker.*(timeout|killed|exit)" | sed -E 's/^[^|]*\| //; s/[0-9]{4}-[0-9]{2}-[0-9]{2}[ T][0-9:.,]+//g; s/[0-9a-f]{8}-[0-9a-f-]{27}/<id>/g' | cut -c1-160 | sort | uniq -c | sort -rn | head -20
echo "-- api do Dify: caso do Lucas (24/11 01:49 a 01:53 UTC)"
docker compose logs --no-color --timestamps --since 80h api 2>&1 | grep -E "2026-11-24T01:(49|5[0-3])" | cut -c1-220 | head -30
echo "-- nginx do Dify: respostas com erro ou cortadas nas ultimas 72h"
docker compose logs --no-color --since 72h nginx 2>&1 | grep -E '" (499|5[0-9][0-9]) ' | grep -oE '"(GET|POST) [^ ?]+[^"]*" [0-9]{3}' | sed -E 's/\?[^ ]*//' | sort | uniq -c | sort -rn | head -10
echo "-- uso de memoria e cpu agora"; free -m | head -2; uptime
docker stats --no-stream --format "{{.Name}} {{.CPUPerc}} {{.MemUsage}}" 2>/dev/null | sort -k2 -rn | head -8
echo; echo "== FIM =="
} >> "$OUT" 2>&1 </dev/null
echo "Teste salvo em $OUT ($(wc -c < "$OUT") bytes)."
if [ -n "$DEST" ]; then
  if jq -Rs '{report: .}' < "$OUT" | curl -s -m 60 -X POST -H 'Content-Type: application/json' --data-binary @- "$DEST" >/dev/null; then
    echo "Enviado para o Claude. Pode avisar no chat."
  else
    echo "Nao consegui enviar. Mande um print desta tela no chat."
  fi
fi
