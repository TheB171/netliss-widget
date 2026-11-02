"""Gera o workflow n8n 'Liss | Cobranca Mercado Pago' (clone auditado do cenario Make 6788318)."""
import json, uuid

DT = "M27oUkPYEe67Sqxc"          # data table vendas_liss
NOTIF = "https://n8n.netliss.com/webhook/liss/mp-notificacao"
COLS = ['ref','status','nome','email','valor','pessoas','dias','renovar','criado','operadora','modalidade',
        'id_netliss','usuario','senha','forma','mp_payment_id','tentativas']

def nid(): return str(uuid.uuid4())

def node(name, typ, ver, pos, params, **extra):
    n = {"id": nid(), "name": name, "type": typ, "typeVersion": ver, "position": pos, "parameters": params}
    n.update(extra)
    return n

def respond(name, pos, expr="={{ $json.resposta }}"):
    return node(name, "n8n-nodes-base.respondToWebhook", 1.4, pos, {
        "respondWith": "json", "responseBody": expr,
        "options": {"responseHeaders": {"entries": [{"name": "Access-Control-Allow-Origin", "value": "*"}]}}})

def mp_http(name, pos, method, url, body=None, extra_headers=None):
    p = {"method": method, "url": url, "authentication": "genericCredentialType",
         "genericAuthType": "httpHeaderAuth", "options": {"response": {"response": {"neverError": True}}}}
    if extra_headers:
        p["sendHeaders"] = True
        p["headerParameters"] = {"parameters": extra_headers}
    if body:
        p["sendBody"] = True; p["specifyBody"] = "json"; p["jsonBody"] = body
    return node(name, "n8n-nodes-base.httpRequest", 4.2, pos, p)

def dt_get(name, pos, key_expr):
    return node(name, "n8n-nodes-base.dataTable", 1.1, pos, {
        "resource": "row", "operation": "get",
        "dataTableId": {"__rl": True, "mode": "id", "value": DT},
        "filters": {"conditions": [{"keyName": "ref", "condition": "eq", "keyValue": key_expr}]},
        "limit": 1}, alwaysOutputData=True)

def dt_insert(name, pos, values):
    return node(name, "n8n-nodes-base.dataTable", 1.1, pos, {
        "resource": "row", "operation": "insert",
        "dataTableId": {"__rl": True, "mode": "id", "value": DT},
        "columns": {"mappingMode": "defineBelow", "value": values, "matchingColumns": [],
                    "schema": [{"id": c, "displayName": c, "required": False, "defaultMatch": False,
                                "display": True, "type": "string", "canBeUsedToMatch": True} for c in COLS]}})

PRECOS = "{1:{30:24.90,90:59.90,365:99.90},2:{30:35.90,90:86.90,365:143.90},3:{30:52.90,90:126.90,365:211.90},4:{30:69.90,90:167.90,365:279.90},5:{30:84.90,90:203.90,365:339.90}}"

MONTAR = r"""
// Liss - monta a cobranca (Pix OU cartao). Clone auditado do Make 6788318.
const q = $('Webhook cobrar').first().json.query || {};
let emailConta = '';
try { const rows = $('Planilha: e-mail do usuario').all().map(i => i.json).filter(r => r && Object.keys(r).length);
      const ult = rows[rows.length - 1] || {}; emailConta = String(ult['O'] || ult['E-mail'] || ult['email'] || '').trim().toLowerCase(); } catch (e) {}
const P = __PRECOS__;
const re = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/;
const renovar = String(q.renovar || '').trim();
const email = (renovar && re.test(emailConta)) ? emailConta : String(q.email || '').trim().toLowerCase();
const nome = (String(q.nome || 'Cliente').trim().slice(0, 40)) || 'Cliente';
const pessoas = parseInt(q.pessoas, 10);
let dias = parseInt(q.dias, 10);
if (dias > 0 && dias <= 31) dias = 30; else if (dias > 31 && dias <= 120) dias = 90; else if (dias > 120) dias = 365;
const forma = /cart/i.test(q.forma || '') ? 'cartao' : 'pix';
const anterior = String(q.anterior || '').trim();
const falha = m => [{ json: { ok: false, resposta: { ok: false, erro: m } } }];
if (!re.test(email)) return falha('email invalido');
if (!P[pessoas]) return falha('pessoas deve ser de 1 a 5');
if (!P[pessoas][dias]) return falha('dias deve ser 30, 90 ou 365');
const valor = P[pessoas][dias];
const ref = 'NL' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const nP = (pessoas < 10 ? '0' : '') + pessoas;
const desc = 'Netliss ' + nP + (pessoas == 1 ? ' acesso' : ' acessos') + ' - ' + (dias == 30 ? '30 dias' : dias == 90 ? '03 meses' : '01 ano') + (renovar ? ' (renovacao ' + renovar + ')' : '');
const notif = '__NOTIF__';
let mp_url, mp_body;
if (forma === 'pix') {
  const exp = new Date(Date.now() + 60 * 60e3 - 3 * 3600e3).toISOString().replace('Z', '-03:00');
  mp_url = 'https://api.mercadopago.com/v1/payments';
  mp_body = { transaction_amount: valor, description: desc, payment_method_id: 'pix', payer: { email, first_name: nome },
              external_reference: ref, notification_url: notif, date_of_expiration: exp, statement_descriptor: 'NETLISS' };
} else {
  const voltar = 'https://www.netliss.com/';
  mp_url = 'https://api.mercadopago.com/checkout/preferences';
  mp_body = { items: [{ id: 'netliss-' + pessoas + '-' + dias, title: desc, quantity: 1, unit_price: valor, currency_id: 'BRL' }],
              payer: { email, name: nome }, external_reference: ref, notification_url: notif, statement_descriptor: 'NETLISS',
              payment_methods: { excluded_payment_types: [{ id: 'ticket' }, { id: 'atm' }, { id: 'bank_transfer' }], installments: 12 },
              back_urls: { success: voltar, pending: voltar, failure: voltar } };
}
return [{ json: { ok: true, ref, forma, valor, valor_txt: 'R$' + valor.toFixed(2).replace('.', ','), desc, email, email_conta: emailConta,
  nome, pessoas, dias, renovar, anterior: /^NL[a-z0-9]+$/i.test(anterior) ? anterior : '',
  operadora: String(q.operadora || '').trim().slice(0, 12), modalidade: String(q.modalidade || '').trim().toUpperCase().slice(0, 3),
  id_netliss: String(q.id_netliss || ''), mp_url, mp_body } }];
""".replace("__PRECOS__", PRECOS).replace("__NOTIF__", NOTIF)

RESPOSTA = r"""
// Monta a resposta para a Liss. AUDITORIA: no Make a mascara do e-mail na renovacao estava corrompida
// (o texto de substituicao tinha virado codigo). Corrigido aqui.
const c = $('Montar cobranca').first().json;
const j = $json || {};
const out = { ...c };
if (c.forma === 'pix') {
  const td = (j.point_of_interaction && j.point_of_interaction.transaction_data) || {};
  out.pix_copia_cola = td.qr_code || ''; out.pix_link = td.ticket_url || ''; out.ok = !!out.pix_copia_cola;
} else { out.link_cartao = j.init_point || ''; out.ok = !!out.link_cartao; }
if (!out.ok) out.detalhe = String(j.message || j.error || 'sem resposta').slice(0, 150);
const pub = { ok: out.ok, ref: c.ref, forma: c.forma, valor: c.valor_txt, plano: c.desc };
if (c.renovar && c.email === c.email_conta) {
  pub.email_do_acesso = c.email.replace(/^(.{1,3})[^@]*([^@]@.*)$/, '$1*****$2');
  pub.observacao = 'renovacao: o acesso renovado vai para o e-mail cadastrado deste usuario';
}
if (c.forma === 'pix') { pub.pix_copia_e_cola = out.pix_copia_cola || ''; pub.link_qrcode = out.pix_link || ''; pub.validade = '60 minutos'; }
else { pub.link_cartao = out.link_cartao || ''; }
if (c.anterior) pub.cobranca_anterior = 'cancelada';
if (!out.ok) { pub.erro = 'nao foi possivel gerar a cobranca agora'; pub.detalhe = out.detalhe; }
const agora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).slice(0, 17);
return [{ json: { ok: out.ok, resposta: pub, registro: { ref: c.ref, status: 'aguardando', nome: c.nome, email: c.email,
  valor: String(c.valor), pessoas: String(c.pessoas), dias: String(c.dias), renovar: c.renovar, criado: agora + ' (' + c.forma + ')',
  operadora: c.operadora, modalidade: c.modalidade, id_netliss: c.id_netliss, forma: c.forma, tentativas: '0' } } }];
"""

PENDENTES = r"""
// Cobranca anterior: devolve um item por pagamento pendente para cancelar
const res = ($json.results || []).filter(p => p.status === 'pending' || p.status === 'in_process');
return res.map(p => ({ json: { id: String(p.id) } }));
"""

STATUS = r"""
// Status de um pagamento pelo ref (e reenvia para entrega se o aviso do Mercado Pago se perdeu)
const q = $('Webhook status').first().json.query || {};
const ref = String(q.ref || '').trim();
const reg = $('Buscar venda (status)').first().json || {};
const st = String(reg.status || '');
const pub = { ok: true, ref };
let reenviar = null;
if (!ref) return [{ json: { resposta: { ok: false, erro: 'ref vazia' } } }];
if (!st) return [{ json: { resposta: { ok: false, erro: 'ref nao encontrada' } } }];
if (st === 'entregue') {
  pub.status = 'entregue'; pub.usuario = reg.usuario; pub.senha = reg.senha;
  pub.mensagem = 'Pagamento aprovado e acesso criado. Envie ao cliente exatamente: Usuário: ' + reg.usuario + ' / Senha: ' + reg.senha + ' (tambem foi para o e-mail).';
} else if (st === 'erro_entrega') {
  pub.status = 'aprovado_em_atencao';
  pub.mensagem = 'Pagamento aprovado. A equipe ja foi avisada com prioridade maxima e o acesso chega no e-mail do cliente o quanto antes. Tranquilize o cliente; nao abra outro chamado.';
} else {
  const res = $json.results || [];
  const ap = res.find(p => p.status === 'approved');
  if (ap) {
    pub.status = 'aprovado_processando';
    pub.mensagem = 'Pagamento aprovado; o acesso esta sendo criado e chega em instantes. Peca para o cliente aguardar 01 minuto e consulte de novo.';
    if (st === 'aguardando') reenviar = String(ap.id);
  } else if (res.length) { pub.status = res[0].status; pub.mensagem = res[0].status === 'pending' ? 'Pagamento ainda nao confirmado (pendente).' : 'Status: ' + res[0].status; }
  else { pub.status = 'sem_pagamento'; pub.mensagem = 'Ainda nao recebemos esse pagamento.'; }
}
return [{ json: { resposta: pub, reenviar } }];
"""

VER = r"""
// Consulta leve (o chat vigia o pagamento): so le a tabela
const r = $json || {};
const st = r.status || 'nao_encontrado';
return [{ json: { resposta: { ok: true, status: st, usuario: st === 'entregue' ? r.usuario : '', senha: st === 'entregue' ? r.senha : '' } } }];
"""

nodes, conn = [], {}
def add(n): nodes.append(n); return n["name"]
def link(a, b, out=0):
    conn.setdefault(a, {"main": []})
    while len(conn[a]["main"]) <= out: conn[a]["main"].append([])
    conn[a]["main"][out].append({"node": b, "type": "main", "index": 0})

# ---------- cobrar ----------
w1 = add(node("Webhook cobrar", "n8n-nodes-base.webhook", 2.1, [0, 0],
              {"httpMethod": "POST", "path": "liss/cobranca", "responseMode": "responseNode", "options": {}}, webhookId=nid()))
sh = add(node("Planilha: e-mail do usuario", "n8n-nodes-base.googleSheets", 4.7, [240, 0], {
    "operation": "read",
    "documentId": {"__rl": True, "mode": "id", "value": "1tX-8o2r0qPOs1ZO-ZwygvOtrEWL5yIGJEOrpj8Odk-o"},
    "sheetName": {"__rl": True, "mode": "name", "value": "Pagamentos"},
    "filtersUI": {"values": [{"lookupColumn": "K", "lookupValue": "={{ ($json.query.renovar || '#nenhum#').toLowerCase().replace(/[^a-z0-9._@-]/g, '') || '#nenhum#' }}"}]},
    "options": {}}, alwaysOutputData=True, onError="continueRegularOutput",
    notes="Se o cliente esta renovando, pega o e-mail cadastrado do usuario. Precisa da conexao Google."))
mt = add(node("Montar cobranca", "n8n-nodes-base.code", 2, [480, 0], {"jsCode": MONTAR}, executeOnce=True))
ok = add(node("Dados validos?", "n8n-nodes-base.if", 2.2, [720, 0], {
    "conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose", "version": 2},
                   "conditions": [{"id": nid(), "leftValue": "={{ $json.ok }}", "rightValue": True,
                                   "operator": {"type": "boolean", "operation": "true", "singleValue": True}}],
                   "combinator": "and"}, "options": {}}))
rerr = add(respond("Responder erro", [960, 200]))
cria = add(mp_http("Mercado Pago: criar cobranca", [960, -120], "POST", "={{ $json.mp_url }}",
                   body="={{ JSON.stringify($json.mp_body) }}",
                   extra_headers=[{"name": "X-Idempotency-Key", "value": "={{ $json.ref }}-{{ $json.forma }}"}]))
resp = add(node("Montar resposta", "n8n-nodes-base.code", 2, [1200, -120], {"jsCode": RESPOSTA}))
r1 = add(respond("Responder Liss", [1440, -200]))
okc = add(node("Cobranca gerada?", "n8n-nodes-base.if", 2.2, [1440, -40], {
    "conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose", "version": 2},
                   "conditions": [{"id": nid(), "leftValue": "={{ $json.ok }}", "rightValue": True,
                                   "operator": {"type": "boolean", "operation": "true", "singleValue": True}}],
                   "combinator": "and"}, "options": {}}))
grava = add(dt_insert("Gravar venda", [1680, -40], {c: "={{ $json.registro.%s }}" % c for c in COLS if c not in ('usuario','senha','mp_payment_id')}))
# cancelamento da cobranca anterior (roda em paralelo, nao bloqueia a resposta)
tem = add(node("Tem cobranca anterior?", "n8n-nodes-base.if", 2.2, [960, -360], {
    "conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose", "version": 2},
                   "conditions": [{"id": nid(), "leftValue": "={{ $json.anterior }}", "rightValue": "",
                                   "operator": {"type": "string", "operation": "notEmpty", "singleValue": True}}],
                   "combinator": "and"}, "options": {}}))
bpa = add(mp_http("MP: buscar pagamentos anteriores", [1200, -460], "GET",
                  "=https://api.mercadopago.com/v1/payments/search?external_reference={{ encodeURIComponent($json.anterior) }}"))
pen = add(node("Pendentes", "n8n-nodes-base.code", 2, [1440, -460], {"jsCode": PENDENTES}))
can = add(mp_http("MP: cancelar pagamento", [1680, -460], "PUT",
                  "=https://api.mercadopago.com/v1/payments/{{ $json.id }}", body='={"status":"cancelled"}'))
bpr = add(mp_http("MP: buscar links anteriores", [1200, -300], "GET",
                  "=https://api.mercadopago.com/checkout/preferences/search?external_reference={{ encodeURIComponent($('Montar cobranca').first().json.anterior) }}"))
lks = add(node("Links", "n8n-nodes-base.code", 2, [1440, -300], {"jsCode":
    "return ($json.elements || []).map(p => ({ json: { id: p.id } }));"}))
exp = add(mp_http("MP: expirar link", [1680, -300], "PUT",
                  "=https://api.mercadopago.com/checkout/preferences/{{ $json.id }}",
                  body="={{ JSON.stringify({ expires: true, expiration_date_to: new Date(Date.now() - 3*3600e3).toISOString().replace('Z','-03:00') }) }}"))

link(w1, sh); link(sh, mt); link(mt, ok)
link(ok, tem, 0); link(ok, cria, 0); link(ok, rerr, 1)
link(tem, bpa, 0); link(tem, bpr, 0); link(bpa, pen); link(pen, can); link(bpr, lks); link(lks, exp)
link(cria, resp); link(resp, r1); link(resp, okc); link(okc, grava, 0)

# ---------- status ----------
w2 = add(node("Webhook status", "n8n-nodes-base.webhook", 2.1, [0, 500],
              {"httpMethod": "GET", "path": "liss/pagamento-status", "responseMode": "responseNode", "options": {}}, webhookId=nid()))
bs = add(dt_get("Buscar venda (status)", [240, 500], "={{ $json.query.ref || 'x' }}"))
ms = add(mp_http("MP: buscar pagamento", [480, 500], "GET",
                 "=https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference={{ encodeURIComponent($('Webhook status').first().json.query.ref || 'x') }}"))
cs = add(node("Montar status", "n8n-nodes-base.code", 2, [720, 500], {"jsCode": STATUS}))
r2 = add(respond("Responder status", [960, 420]))
rv = add(node("Reenviar para entrega?", "n8n-nodes-base.if", 2.2, [960, 580], {
    "conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose", "version": 2},
                   "conditions": [{"id": nid(), "leftValue": "={{ $json.reenviar }}", "rightValue": "",
                                   "operator": {"type": "string", "operation": "notEmpty", "singleValue": True}}],
                   "combinator": "and"}, "options": {}}))
ent = add(node("Avisar entrega", "n8n-nodes-base.httpRequest", 4.2, [1200, 580], {
    "method": "POST", "url": NOTIF, "sendBody": True, "specifyBody": "json",
    "jsonBody": "={{ JSON.stringify({ type: 'payment', data: { id: $json.reenviar }, tentativa: 0, origem: 'consulta_liss' }) }}",
    "options": {"response": {"response": {"neverError": True}}}}))
link(w2, bs); link(bs, ms); link(ms, cs); link(cs, r2); link(cs, rv); link(rv, ent, 0)

# ---------- ver (consulta leve do chat) ----------
w3 = add(node("Webhook ver", "n8n-nodes-base.webhook", 2.1, [0, 900],
              {"httpMethod": "GET", "path": "liss/pagamento-ver", "responseMode": "responseNode", "options": {}}, webhookId=nid()))
bv = add(dt_get("Buscar venda (ver)", [240, 900], "={{ $json.query.ref || 'x' }}"))
cv = add(node("Montar ver", "n8n-nodes-base.code", 2, [480, 900], {"jsCode": VER}))
r3 = add(respond("Responder ver", [720, 900]))
link(w3, bv); link(bv, cv); link(cv, r3)

wf = {"name": "Liss | Cobranca Mercado Pago", "nodes": nodes, "connections": conn,
      "settings": {"executionOrder": "v1", "timezone": "America/Sao_Paulo"},
      "parentFolderId": "sLSOa6RdzKyWeqrP", "active": False}
json.dump(wf, open("/home/claude/migracao/wf_cobranca.json", "w"), ensure_ascii=False)
print(len(nodes), "nos;", len(json.dumps(wf)), "bytes")
