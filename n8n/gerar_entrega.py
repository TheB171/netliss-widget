"""Gera o workflow n8n 'Liss | Entrega automatica (Mercado Pago aprovado)'.
Clone auditado do cenario Make 6788333. Segredos do painel ficam na tabela 'segredos' (o Jean preenche)."""
import json, uuid, sys
sys.path.insert(0, '/home/claude/migracao')

DT = "M27oUkPYEe67Sqxc"; SEG = "DDWiEB69vDSI0blV"; MP_CRED = None
SELF = "https://n8n.netliss.com/webhook/liss/mp-notificacao"
MAKE_PAGAMENTOS = "https://hook.us2.make.com/3wv4hhwgvnus5a83etltcdm7mghqup2c"   # registro da venda (planilha/Telegram) ate clonar Pagamentos
MAKE_CHAMADOS = "https://hook.us2.make.com/kazb5kdmxqwivry8ydradfi4yvpag599"     # chamado interno ate clonar Chamados

def nid(): return str(uuid.uuid4())
def node(name, typ, ver, pos, params, **extra):
    n = {"id": nid(), "name": name, "type": typ, "typeVersion": ver, "position": pos, "parameters": params}; n.update(extra); return n
def cond(expr, op, typ="boolean", right=True):
    c = {"id": nid(), "leftValue": expr, "operator": {"type": typ, "operation": op}}
    if op in ("true", "false", "notEmpty", "empty"): c["operator"]["singleValue"] = True; c["rightValue"] = "" if typ == "string" else True
    else: c["rightValue"] = right
    return c
def iff(name, pos, conds, comb="and"):
    return node(name, "n8n-nodes-base.if", 2.2, pos, {"conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose", "version": 2},
                "conditions": conds, "combinator": comb}, "options": {}})
def dt(name, pos, table, op, filt=None, values=None, cols=None, **extra):
    p = {"resource": "row", "operation": op, "dataTableId": {"__rl": True, "mode": "id", "value": table}}
    if filt: p["filters"] = {"conditions": [{"keyName": k, "condition": "eq", "keyValue": v} for k, v in filt.items()]}
    if op == "get":
        if filt: p["limit"] = 1
        else: p["returnAll"] = True
    if values is not None:
        p["columns"] = {"mappingMode": "defineBelow", "value": values, "matchingColumns": [],
                        "schema": [{"id": c, "displayName": c, "required": False, "defaultMatch": False, "display": True,
                                    "type": "string", "canBeUsedToMatch": True} for c in cols]}
    return node(name, "n8n-nodes-base.dataTable", 1.1, pos, p, **extra)
def http(name, pos, method, url, qs=None, body=None, mp=False):
    p = {"method": method, "url": url, "options": {"response": {"response": {"neverError": True}}, "timeout": 40000}}
    if mp: p.update({"authentication": "genericCredentialType", "genericAuthType": "httpHeaderAuth"})
    if qs: p["sendQuery"] = True; p["queryParameters"] = {"parameters": [{"name": k, "value": v} for k, v in qs]}
    if body: p["sendBody"] = True; p["specifyBody"] = "json"; p["jsonBody"] = body
    return node(name, "n8n-nodes-base.httpRequest", 4.2, pos, p, onError="continueRegularOutput")

COLS = ['ref','status','nome','email','valor','pessoas','dias','renovar','criado','operadora','modalidade','id_netliss',
        'usuario','senha','forma','mp_payment_id','tentativas','renov_base','entregue_em']

LER = r"""
// Le a notificacao do Mercado Pago (vem como JSON no corpo ou como parametros na URL)
const w = $json; const b = w.body || {}; const q = w.query || {};
const id = String((b.data && b.data.id) || q['data.id'] || (q.topic === 'payment' ? q.id : '') || '').trim();
const tipo = String(b.type || q.type || q.topic || '');
const tentativa = parseInt(b.tentativa || 0, 10) || 0;
return [{ json: { id, tentativa, valido: !!id && tipo === 'payment' } }];
"""

DECIDIR = r"""
// Decide o que fazer com o pagamento aprovado
const n = $('Ler notificacao').first().json;
const pg = $('MP: ler pagamento').first().json;
const v = $('Buscar venda').first().json || {};
const seg = {}; for (const i of $('Ler segredos').all()) seg[i.json.chave] = i.json.valor;
let acao = 'nada';
if (v.ref && v.status !== 'entregue' && v.email) acao = 'entregar';
else if (v.status === 'entregue' && v.mp_payment_id && String(v.mp_payment_id) !== n.id) acao = 'dobro';
return [{ json: { acao, id: n.id, tentativa: n.tentativa, ref: String(pg.external_reference || ''), valor_pago: pg.transaction_amount || 0,
  metodo: String(pg.payment_method_id || ''), venda: v, pu: String(seg.painel_usuario || '').trim(), ps: String(seg.painel_senha || '') } }];
"""

# HMAC-SHA256 em JS puro (o Code do n8n nao libera require('crypto'))
HMAC = r"""
function sha256(bytes){const K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
let h=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];const l=bytes.length;const m=bytes.concat([0x80]);while(m.length%64!==56)m.push(0);const bl=l*8;for(let i=7;i>=0;i--)m.push(Math.floor(bl/Math.pow(2,8*i))&255);
const r=(x,n)=>(x>>>n)|(x<<(32-n));for(let o=0;o<m.length;o+=64){const w=new Array(64);for(let i=0;i<16;i++)w[i]=(m[o+4*i]<<24)|(m[o+4*i+1]<<16)|(m[o+4*i+2]<<8)|m[o+4*i+3];
for(let i=16;i<64;i++){const s0=r(w[i-15],7)^r(w[i-15],18)^(w[i-15]>>>3);const s1=r(w[i-2],17)^r(w[i-2],19)^(w[i-2]>>>10);w[i]=(w[i-16]+s0+w[i-7]+s1)|0;}
let [a,b,c,d,e,f,g,hh]=h;for(let i=0;i<64;i++){const S1=r(e,6)^r(e,11)^r(e,25);const ch=(e&f)^(~e&g);const t1=(hh+S1+ch+K[i]+w[i])|0;const S0=r(a,2)^r(a,13)^r(a,22);const mj=(a&b)^(a&c)^(b&c);const t2=(S0+mj)|0;hh=g;g=f;f=e;e=(d+t1)|0;d=c;c=b;b=a;a=(t1+t2)|0;}
h=[h[0]+a|0,h[1]+b|0,h[2]+c|0,h[3]+d|0,h[4]+e|0,h[5]+f|0,h[6]+g|0,h[7]+hh|0];}
const out=[];for(const x of h)out.push((x>>>24)&255,(x>>>16)&255,(x>>>8)&255,x&255);return out;}
const utf8=s=>Array.from(unescape(encodeURIComponent(s))).map(c=>c.charCodeAt(0));
function hmac(key,msg){let k=utf8(key);if(k.length>64)k=sha256(k);while(k.length<64)k.push(0);const ip=k.map(x=>x^0x36),op=k.map(x=>x^0x5c);return sha256(op.concat(sha256(ip.concat(utf8(msg)))));}
"""

PAINEL = HMAC + r"""
// Pagamento aprovado: cria (ou renova) a conta no painel. Anti-duplicidade: usuario e senha derivados do pedido (ref),
// qualquer nova tentativa chega no MESMO usuario e, se ele ja existe, e reaproveitado.
const d = $json; const v = d.venda;
const base = 'https://painel.netliss.shop';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const user = d.pu, pass = d.ps, ref = d.ref;
const pessoas = Math.max(1, Math.min(5, parseInt(v.pessoas, 10) || 1));
const dias = Math.max(1, Math.min(365, parseInt(v.dias, 10) || 30));
const renovar = String(v.renovar || '').trim(); const email = String(v.email || '').trim();
const out = { ok: false, acao: renovar ? 'renovar' : 'criar', tentativas: 0, log: [] };
const h = this.helpers;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const req = (o) => h.httpRequest(Object.assign({ returnFullResponse: true, ignoreHttpStatusErrors: true, timeout: 15000, json: true }, o));
if (!user || !pass) { out.erro = 'login do painel vazio na tabela segredos'; return [{ json: { ...d, r: out } }]; }
if (!ref) { out.erro = 'pedido sem ref'; out.definitivo = true; return [{ json: { ...d, r: out } }]; }
const AL = 'abcdefghjkmnpqrstuvwxyz23456789';
const derivar = (s, n) => { const b = hmac(pass, s); let r = ''; for (let i = 0; i < n; i++) r += AL[b[i] % AL.length]; return r; };
const meuUsuario = derivar(ref + ':usuario', 8), minhaSenha = derivar(ref + ':senha', 8);
out.sug_usuario = meuUsuario; out.sug_senha = minhaSenha;
async function sessao() {
  const lr = await req({ method: 'POST', url: base + '/api/auth/login', headers: { 'Content-Type': 'application/json', 'User-Agent': UA }, body: { usuario: user, senha: pass } });
  if (lr.statusCode >= 400) throw new Error('login do painel recusado (' + lr.statusCode + ')');
  let sc = lr.headers['set-cookie'] || []; if (!Array.isArray(sc)) sc = [sc];
  const ck = sc.map(c => String(c).split(';')[0].trim());
  const H = { 'User-Agent': UA, 'Cookie': ck.join('; '), 'Accept': 'application/json', 'Content-Type': 'application/json' };
  const xs = ck.find(c => /^XSRF-TOKEN=/i.test(c)); if (xs) H['X-XSRF-TOKEN'] = decodeURIComponent(xs.split('=').slice(1).join('='));
  return H;
}
async function contas(H) { const r = await req({ method: 'GET', url: base + '/api/accounts?per_page=3000', headers: H }); return (r.body && r.body.data) || []; }
const achar = (l, u) => l.find(a => String(a.username || '').toLowerCase() === String(u).toLowerCase());
let H = null; let venc0 = String(v.renov_base || '').trim() || null;
for (let t = 1; t <= 4 && !out.ok; t++) {
  out.tentativas = t;
  try {
    if (!H) H = await sessao();
    const lista = await contas(H);
    if (renovar) {
      const c = achar(lista, renovar);
      if (!c) { out.erro = 'usuario a renovar nao encontrado: ' + renovar; out.definitivo = true; break; }
      if (venc0 !== null && String(c.expires_at) !== venc0) { out.ok = true; out.usuario = c.username; out.senha = '(a mesma de sempre)'; out.expira = c.expires_at; out.log.push('renovacao ja aplicada antes'); break; }
      if (venc0 === null) { venc0 = String(c.expires_at); out.renov_base = venc0; }
      const rr = await req({ method: 'PATCH', url: base + '/api/accounts/' + c.id + '/renew', headers: H, body: { days: dias, connection_limit: Math.max(pessoas, parseInt(c.connection_limit, 10) || 1) } });
      out.http = rr.statusCode;
      if (rr.statusCode >= 200 && rr.statusCode < 300) { out.ok = true; out.usuario = c.username; out.senha = '(a mesma de sempre)'; const a = (rr.body && rr.body.data && (rr.body.data.account || rr.body.data)) || {}; if (a.expires_at) out.expira = a.expires_at; }
      else { out.log.push('renovar ' + rr.statusCode); if (rr.statusCode === 401 || rr.statusCode === 419) H = null; if (rr.statusCode === 400 || rr.statusCode === 422) { out.definitivo = true; break; } }
    } else {
      const ja = achar(lista, meuUsuario);
      if (ja) { out.ok = true; out.usuario = ja.username; out.senha = minhaSenha; out.expira = ja.expires_at || ''; out.confirmada = true; out.log.push('conta deste pedido ja existia: reaproveitada'); break; }
      const modelo = lista.filter(a => !Number(a.is_test) && a.category_id).sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))[0] || {};
      const tipo = (Number(modelo.ssh_enabled) && Number(modelo.v2ray_enabled)) ? 'combo' : (Number(modelo.v2ray_enabled) ? 'v2ray' : 'ssh');
      const cat = modelo.category_id || 1;
      const body = { type: tipo, category_id: cat, category_ids: [cat], username: meuUsuario, password: minhaSenha, connection_limit: pessoas, days: dias };
      if (email) body.email = email;
      const cr = await req({ method: 'POST', url: base + '/api/accounts', headers: H, body });
      out.http = cr.statusCode;
      if (cr.statusCode >= 200 && cr.statusCode < 300) { out.ok = true; out.usuario = meuUsuario; out.senha = minhaSenha; const a = (cr.body && cr.body.data && (cr.body.data.account || cr.body.data)) || {}; if (a.expires_at) out.expira = a.expires_at; }
      else { if (cr.statusCode === 401 || cr.statusCode === 419) H = null; if (cr.statusCode === 400 || cr.statusCode === 422) { out.definitivo = true; out.log.push('painel recusou (' + cr.statusCode + ')'); break; } out.log.push('falha ' + cr.statusCode); }
    }
  } catch (e) { out.log.push('erro: ' + String(e.message || e)); H = null; }
  if (!out.ok) await sleep(2000 * out.tentativas);
}
if (out.ok && !renovar && !out.confirmada) { try { const a = achar(await contas(H || await sessao()), out.usuario); out.confirmada = !!a; if (a && a.expires_at) out.expira = a.expires_at; } catch (e) { out.confirmada = 'nao conferida'; } }
if (!out.ok && !out.erro) out.erro = out.log.slice(-3).join(' | ') || 'falha desconhecida';
if (!out.expira) out.expira = new Date(Date.now() + dias * 864e5).toISOString().slice(0, 10);
const p = String(out.expira).slice(0, 10).split('-'); out.expira_br = p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : out.expira;
out.log = out.log.join(' | ');
const agora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).slice(0, 17);
const nP = (pessoas < 10 ? '0' : '') + pessoas;
out.plano = 'Netliss ' + nP + (pessoas == 1 ? ' acesso' : ' acessos') + ' - ' + (dias == 30 ? '30 dias' : dias == 90 ? '03 meses' : '01 ano');
out.agora = agora;
delete d.ps;
return [{ json: { ...d, r: out } }];
"""

EMAIL = open('/home/claude/migracao/email_entrega.html').read() if False else None

nodes, conn = [], {}
def add(n): nodes.append(n); return n["name"]
def link(a, b, out=0):
    conn.setdefault(a, {"main": []})
    while len(conn[a]["main"]) <= out: conn[a]["main"].append([])
    conn[a]["main"][out].append({"node": b, "type": "main", "index": 0})

w = add(node("Webhook Mercado Pago", "n8n-nodes-base.webhook", 2.1, [0, 0],
             {"httpMethod": "POST", "path": "liss/mp-notificacao", "responseMode": "onReceived", "options": {}}, webhookId=nid()))
ler = add(node("Ler notificacao", "n8n-nodes-base.code", 2, [220, 0], {"jsCode": LER}))
val = add(iff("E pagamento?", [440, 0], [cond("={{ $json.valido }}", "true")]))
mp = add(http("MP: ler pagamento", [660, 0], "GET", "=https://api.mercadopago.com/v1/payments/{{ $json.id }}", mp=True))
apr = add(iff("Aprovado e da Liss?", [880, 0], [cond("={{ $json.status }}", "equals", "string", "approved"),
                                                 cond("={{ $json.external_reference }}", "startsWith", "string", "NL")]))
bv = add(dt("Buscar venda", [1100, 0], DT, "get", {"ref": "={{ $json.external_reference }}"}, alwaysOutputData=True))
seg = add(dt("Ler segredos", [1320, 0], SEG, "get", executeOnce=True, alwaysOutputData=True))
dec = add(node("Decidir", "n8n-nodes-base.code", 2, [1540, 0], {"jsCode": DECIDIR}, executeOnce=True))
sw = add(node("Entregar ou pagamento em dobro?", "n8n-nodes-base.switch", 3.2, [1760, 0], {
    "rules": {"values": [
        {"conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 2},
                        "conditions": [cond("={{ $json.acao }}", "equals", "string", "entregar")], "combinator": "and"},
         "renameOutput": True, "outputKey": "entregar"},
        {"conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 2},
                        "conditions": [cond("={{ $json.acao }}", "equals", "string", "dobro")], "combinator": "and"},
         "renameOutput": True, "outputKey": "dobro"}]}, "options": {}}))
pan = add(node("Criar ou renovar no painel", "n8n-nodes-base.code", 2, [1980, -100], {"jsCode": PAINEL}))
okk = add(iff("Acesso criado?", [2200, -100], [cond("={{ $json.r.ok }}", "true")]))
# sucesso
upd_ok = add(dt("Marcar entregue", [2420, -300], DT, "update", {"ref": "={{ $json.ref }}"},
                {"status": "entregue", "usuario": "={{ $json.r.usuario }}", "senha": "={{ $json.r.senha }}",
                 "mp_payment_id": "={{ $json.id }}", "entregue_em": "={{ $json.r.agora }}",
                 "renov_base": "={{ $json.r.renov_base || $json.venda.renov_base || '' }}"}, COLS))
reg = add(http("Registrar venda (Make Pagamentos)", [2640, -300], "POST", MAKE_PAGAMENTOS, qs=[
    ("acao", "venda_liss"), ("payment_id", "={{ $('Criar ou renovar no painel').first().json.id }}"),
    ("ref", "={{ $('Criar ou renovar no painel').first().json.ref }}"),
    ("id_netliss", "={{ $('Criar ou renovar no painel').first().json.venda.id_netliss }}"),
    ("nome", "={{ $('Criar ou renovar no painel').first().json.venda.nome }}"),
    ("email", "={{ $('Criar ou renovar no painel').first().json.venda.email }}"),
    ("plano", "={{ $('Criar ou renovar no painel').first().json.r.plano }}"),
    ("valor_txt", "={{ Number($('Criar ou renovar no painel').first().json.venda.valor).toFixed(2).replace('.', ',') }}"),
    ("metodo", "={{ $('Criar ou renovar no painel').first().json.metodo }}"),
    ("usuario", "={{ $('Criar ou renovar no painel').first().json.r.usuario }}"),
    ("senha", "={{ $('Criar ou renovar no painel').first().json.r.senha }}"),
    ("expira_br", "={{ $('Criar ou renovar no painel').first().json.r.expira_br }}"),
    ("renovar", "={{ $('Criar ou renovar no painel').first().json.venda.renovar }}"),
    ("operadora", "={{ $('Criar ou renovar no painel').first().json.venda.operadora }}"),
    ("modalidade", "={{ $('Criar ou renovar no painel').first().json.venda.modalidade }}")]))
mail = add(node("E-mail com o acesso", "n8n-nodes-base.emailSend", 2.1, [2860, -300], {
    "fromEmail": "Netliss <equipe@netliss.com>",
    "toEmail": "={{ $('Criar ou renovar no painel').first().json.venda.email }}",
    "subject": "={{ $('Criar ou renovar no painel').first().json.r.acao === 'renovar' ? 'Sua renovação Netliss foi confirmada' : 'Seu acesso Netliss chegou' }}",
    "emailFormat": "html", "html": open("/home/claude/migracao/email_entrega.html").read().strip(), "options": {"appendAttribution": False}}, onError="continueRegularOutput"))
# falha
ret = add(iff("Tentar de novo?", [2420, 100], [cond("={{ $json.tentativa }}", "lt", "number", 4),
                                               cond("={{ $json.r.definitivo }}", "notEquals", "boolean", True)]))
upd_t = add(dt("Marcar tentando", [2640, 0], DT, "update", {"ref": "={{ $json.ref }}"},
               {"status": "tentando", "mp_payment_id": "={{ $json.id }}", "tentativas": "={{ String($json.tentativa + 1) }}",
                "renov_base": "={{ $json.r.renov_base || $json.venda.renov_base || '' }}"}, COLS))
wait = add(node("Esperar 01 minuto", "n8n-nodes-base.wait", 1.1, [2860, 0], {"amount": 60, "unit": "seconds"}, webhookId=nid()))
again = add(http("Tentar de novo", [3080, 0], "POST", SELF,
                 body="={{ JSON.stringify({ type: 'payment', data: { id: $('Criar ou renovar no painel').first().json.id }, tentativa: $('Criar ou renovar no painel').first().json.tentativa + 1 }) }}"))
upd_e = add(dt("Marcar erro de entrega", [2640, 200], DT, "update", {"ref": "={{ $json.ref }}"},
               {"status": "erro_entrega", "mp_payment_id": "={{ $json.id }}"}, COLS))
crit = add(http("Chamado: ERRO CRITICO", [2860, 200], "POST", MAKE_CHAMADOS, qs=[
    ("acao", "chamado_abrir"), ("fase", "cliente"),
    ("nome", "={{ $('Criar ou renovar no painel').first().json.venda.nome }}"),
    ("email", "={{ $('Criar ou renovar no painel').first().json.venda.email }}"),
    ("usuario", "={{ $('Criar ou renovar no painel').first().json.venda.renovar }}"),
    ("id_netliss", "={{ $('Criar ou renovar no painel').first().json.venda.id_netliss }}"),
    ("problema", "={{ (() => { const d = $('Criar ou renovar no painel').first().json; const v = d.venda, r = d.r; return 'ERRO CRITICO: PAGAMENTO APROVADO E ACESSO NAO CRIADO. O sistema tentou 05 rodadas e o painel nao criou a conta. O QUE FAZER: ' + (v.renovar ? 'RENOVACAO - renove no painel o usuario ' + v.renovar : 'COMPRA NOVA - crie no painel EXATAMENTE o usuario ' + r.sug_usuario + ' com a senha ' + r.sug_senha) + ' (' + v.pessoas + ' acesso(s), ' + v.dias + ' dias). Use exatamente esses dados: se o sistema tentar de novo, ele reconhece a conta e nao cria outra. Depois RESPONDA este chamado com o usuario e a senha: o cliente recebe por e-mail. Valor: R$ ' + v.valor + '. Pagamento Mercado Pago: ' + d.id + ' (ref ' + d.ref + '). Ultimo erro: ' + r.erro; })() }}")]))
dob = add(http("Chamado: pagamento em dobro", [1980, 200], "POST", MAKE_CHAMADOS, qs=[
    ("acao", "chamado_abrir"), ("fase", "cliente"), ("nome", "={{ $json.venda.nome }}"), ("email", "={{ $json.venda.email }}"),
    ("usuario", "={{ $json.venda.usuario }}"), ("id_netliss", "={{ $json.venda.id_netliss }}"),
    ("problema", "={{ 'PAGAMENTO EM DOBRO: o cliente pagou 02 vezes o mesmo pedido (ref ' + $json.ref + '). O acesso ja foi entregue no primeiro pagamento (Mercado Pago ' + $json.venda.mp_payment_id + '), usuario ' + $json.venda.usuario + '. Devolva no Mercado Pago o segundo pagamento (' + $json.id + ', R$ ' + $json.valor_pago + ') e, se quiser, responda o cliente por aqui.' }}")]))

link(w, ler); link(ler, val); link(val, mp, 0); link(mp, apr); link(apr, bv, 0); link(bv, seg); link(seg, dec); link(dec, sw)
link(sw, pan, 0); link(sw, dob, 1); link(pan, okk)
link(okk, upd_ok, 0); link(upd_ok, reg); link(reg, mail)
link(okk, ret, 1); link(ret, upd_t, 0); link(upd_t, wait); link(wait, again); link(ret, upd_e, 1); link(upd_e, crit)

wf = {"name": "Liss | Entrega automatica (pagamento aprovado)", "nodes": nodes, "connections": conn,
      "settings": {"executionOrder": "v1", "timezone": "America/Sao_Paulo"}, "parentFolderId": "SV1lGsjgS86p85Mw", "active": False}
s = json.dumps(wf, ensure_ascii=False)
json.dump(wf, open("/home/claude/migracao/wf_entrega.json", "w"), ensure_ascii=False)
print(len(nodes), "nos", len(s))
