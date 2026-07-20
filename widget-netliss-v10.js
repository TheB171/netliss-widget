/* ================================================================
   NETLISS — WIDGET DE ATENDIMENTO (PRODUCAO/BETA)
   Arquivo unico para hospedar em CDN e chamar com:
   <script src="URL_DO_ARQUIVO" defer></script>
   ================================================================ */

// ---------------- MONTAGEM (CSS + HTML) ----------------
function nlMontarWidget(){
if(window.NL_WIDGET_ON){ return; } window.NL_WIDGET_ON = true;
var fonte = document.createElement('link');
fonte.rel = 'stylesheet';
fonte.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap';
document.head.appendChild(fonte);
var est = document.createElement('style');
est.textContent = ["","  :root{","    --fundo:#05060d;","    --vidro:rgba(15,19,34,.72);","    --vidro-claro:rgba(255,255,255,.055);","    --borda:rgba(255,255,255,.09);","    --neon:#C6F43F;","    --neon2:#9CCB1E;","    --rosa:#ff3d8a;","    --laranja:#ff8a3d;","    --texto:#f4f6ff;","    --suave:#8b90a8;","    --grad-neon:linear-gradient(135deg,#D5FA66,#A9D51F);","    --fonte-display:'Montserrat',sans-serif;","    --fonte:'Inter',system-ui,sans-serif;","  }","  #nl-moldura *, #nl-bolha *, #nl-teaser *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}","  #nl-moldura, #nl-bolha, #nl-teaser{font-family:var(--fonte);color:var(--texto)}","  @media (prefers-reduced-motion: reduce){","    #nl-bolha{animation:none !important}","  }","","  /* ===== BALÃO ===== */","  #nl-bolha{","    position:fixed;right:22px;bottom:22px;z-index:999990;","    width:72px;height:72px;cursor:pointer;display:none;border:none;background:none;","    filter:drop-shadow(0 8px 22px rgba(0,0,0,.55)) drop-shadow(0 0 16px rgba(198,244,63,.35));","    transition:transform .2s ease;","    animation:flutuar 3.2s ease-in-out infinite;","  }","  #nl-bolha:hover{transform:scale(1.08)}","  #nl-bolha img{width:100%;height:100%;object-fit:contain}","  @keyframes flutuar{0%,100%{translate:0 0}50%{translate:0 -5px}}","","  /* teaser */","  #nl-teaser{","    position:fixed;right:104px;bottom:36px;z-index:999989;max-width:250px;","    background:var(--vidro);backdrop-filter:blur(16px);","    border:1px solid rgba(198,244,63,.35);border-radius:18px 18px 4px 18px;","    padding:14px 16px;font-size:13.5px;line-height:1.5;display:none;cursor:pointer;","    box-shadow:0 12px 34px rgba(0,0,0,.5), 0 0 20px rgba(198,244,63,.12);","  }","  #nl-teaser b{color:var(--neon)}","  #nl-teaser .fechar{position:absolute;top:-9px;left:-9px;width:22px;height:22px;border-radius:50%;","    background:#0f1322;border:1px solid var(--borda);color:var(--suave);","    display:flex;align-items:center;justify-content:center;font-size:11px}","","  /* ===== JANELA ===== */","  #nl-moldura{","    position:fixed;right:20px;bottom:20px;z-index:999995;display:none;","    width:min(392px, calc(100vw - 40px));height:min(640px, calc(100vh - 40px));","    border-radius:28px;padding:1.5px;","    background:linear-gradient(160deg, rgba(198,244,63,.75), rgba(198,244,63,.08) 30%, rgba(255,61,138,.10) 70%, rgba(255,61,138,.55));","    box-shadow:0 30px 80px rgba(0,0,0,.65), 0 0 46px rgba(198,244,63,.14);","  }","  #nl-chat{","    width:100%;height:100%;border-radius:26.5px;overflow:hidden;","    background:var(--vidro);backdrop-filter:blur(22px);","    display:flex;flex-direction:column;","  }","  @media (max-width:520px){","    #nl-moldura{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0;padding:0}","    #nl-chat{border-radius:0}","    #nl-moldura .msg{max-width:88%;font-size:15px;line-height:1.6;padding:12px 15px}","    #nl-moldura .chip{padding:12px 18px;font-size:14.5px;min-height:44px}","    #nl-moldura .card,#nl-moldura .form{max-width:94%;width:94%}","    #nl-moldura .card .desc{font-size:13px}","    #nl-moldura .nl-pill{min-height:48px}","    #nl-corpo{padding:16px 12px}","  }","  /* diagramação dos textos dentro das bolhas */","  #nl-moldura .msg br + br{content:'';display:block;margin-top:6px}","  #nl-moldura .msg{overflow-wrap:break-word;word-break:break-word;hyphens:auto}","","  #nl-moldura .nl-topo{","    display:flex;align-items:center;gap:12px;padding:14px 18px;flex-shrink:0;","    background:linear-gradient(180deg, rgba(255,255,255,.05), transparent);","    border-bottom:1px solid var(--borda);","  }","  #nl-moldura .nl-topo img{width:46px;height:46px;object-fit:contain}","  #nl-moldura .nl-topo .nome{font-weight:700;font-size:16px;font-family:var(--fonte-display);letter-spacing:.3px}","  #nl-moldura .nl-topo .status{font-size:11.5px;color:var(--neon);display:flex;align-items:center;gap:5px}","  #nl-moldura .nl-topo .status::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--neon);","    box-shadow:0 0 8px rgba(198,244,63,.9);display:inline-block}","  #nl-moldura .nl-topo .acoes{margin-left:auto;display:flex;gap:6px}","  #nl-moldura .nl-topo button{","    background:var(--vidro-claro);border:1px solid var(--borda);color:var(--suave);","    width:32px;height:32px;border-radius:10px;cursor:pointer;font-size:14px","  }","  #nl-moldura .nl-topo button:hover{color:var(--texto);border-color:rgba(255,255,255,.25)}","","  #nl-corpo{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}","  #nl-corpo::-webkit-scrollbar{width:5px}","  #nl-corpo::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:99px}","","  #nl-moldura .msg{max-width:82%;padding:11px 15px;border-radius:18px;font-size:14px;line-height:1.55;","    animation:surgir .28s cubic-bezier(.2,.8,.3,1);word-wrap:break-word}","  @keyframes surgir{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}","  #nl-moldura .msg.liss{","    background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px 18px 18px 6px;align-self:flex-start;","    box-shadow:0 4px 16px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.06);","  }","  #nl-moldura .msg.user{","    background:var(--grad-neon);color:#04120a;font-weight:500;","    border-radius:18px 18px 6px 18px;align-self:flex-end;","    box-shadow:0 6px 18px rgba(198,244,63,.25), inset 0 1px 0 rgba(255,255,255,.4);","  }","  #nl-moldura .msg b{color:var(--neon)}","  #nl-moldura .msg.user b{color:#04120a}","  #nl-moldura .msg i{color:var(--suave);font-size:12.5px}","","  #nl-moldura .sistema{","    align-self:center;font-size:11px;color:var(--suave);","    border:1px dashed rgba(255,255,255,.15);border-radius:99px;padding:5px 12px;margin:2px 0;","    background:rgba(0,0,0,.2)","  }","  #nl-moldura .sistema b{color:var(--rosa)}","","  #nl-moldura .chips{display:flex;flex-wrap:wrap;gap:8px;align-self:flex-start;max-width:92%;animation:surgir .28s ease}","  #nl-moldura .chip{","    background:var(--vidro-claro);backdrop-filter:blur(8px);","    border:1px solid rgba(198,244,63,.5);color:var(--neon);","    border-radius:99px;padding:10px 17px;font-size:13.5px;font-weight:600;cursor:pointer;","    font-family:var(--fonte);transition:all .16s ease;","  }","  #nl-moldura .chip:hover{background:var(--grad-neon);color:#04120a;border-color:transparent;","    box-shadow:0 0 18px rgba(198,244,63,.35);transform:translateY(-1px)}","  #nl-moldura .chip.secundario{border-color:var(--borda);color:var(--suave)}","  #nl-moldura .chip.secundario:hover{background:rgba(255,255,255,.1);color:var(--texto);box-shadow:none}","","  #nl-moldura .card{","    align-self:flex-start;max-width:88%;","    background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px;padding:15px;animation:surgir .28s ease;","    box-shadow:0 6px 20px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.06);","  }","  #nl-moldura .card .titulo{font-weight:700;font-size:14.5px;margin-bottom:4px;font-family:var(--fonte-display)}","  #nl-moldura .card .desc{font-size:12.5px;color:var(--suave);line-height:1.55;margin-bottom:11px}","  #nl-moldura .card .botao{","    display:inline-block;background:var(--grad-neon);color:#04120a;font-weight:700;font-size:13px;","    border:none;border-radius:11px;padding:10px 17px;cursor:pointer;font-family:var(--fonte);","    box-shadow:0 4px 14px rgba(198,244,63,.28), inset 0 1px 0 rgba(255,255,255,.4);","    transition:transform .15s ease;","  }","  #nl-moldura .card .botao:hover{transform:translateY(-1px)}","  #nl-moldura .card .preco{color:var(--neon);font-weight:700;font-size:19px;font-family:var(--fonte-display);","    text-shadow:0 0 16px rgba(198,244,63,.4)}","  #nl-moldura .card.destaque{border-color:rgba(198,244,63,.55);box-shadow:0 0 26px rgba(198,244,63,.16), inset 0 1px 0 rgba(255,255,255,.06)}","  #nl-moldura .tag{display:inline-block;background:var(--grad-neon);color:#04120a;font-size:10px;font-weight:800;","    border-radius:99px;padding:3px 10px;margin-bottom:7px;letter-spacing:.5px}","  #nl-moldura .video-fake{","    width:100%;aspect-ratio:16/9;background:rgba(0,0,0,.45);border-radius:12px;margin-bottom:11px;","    display:flex;align-items:center;justify-content:center;color:var(--suave);font-size:12px;","    border:1px solid var(--borda);cursor:pointer","  }","  #nl-moldura .video-fake .play{width:46px;height:46px;border-radius:50%;background:var(--grad-neon);color:#04120a;","    display:flex;align-items:center;justify-content:center;font-size:16px;margin-right:10px;","    box-shadow:0 0 20px rgba(198,244,63,.4)}","","  #nl-moldura .form{align-self:flex-start;width:88%;background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px;padding:15px;display:flex;flex-direction:column;gap:10px;animation:surgir .28s ease}","  #nl-moldura .form input{","    background:rgba(0,0,0,.35);border:1px solid var(--borda);border-radius:11px;color:var(--texto);","    padding:12px 14px;font-size:14px;outline:none;font-family:var(--fonte)","  }","  #nl-moldura .form input:focus{border-color:rgba(198,244,63,.6);box-shadow:0 0 12px rgba(198,244,63,.15)}","  #nl-moldura .form .botao{background:var(--grad-neon);color:#04120a;font-weight:700;border:none;border-radius:11px;","    padding:12px;cursor:pointer;font-size:14px;font-family:var(--fonte);","    box-shadow:0 4px 14px rgba(198,244,63,.28), inset 0 1px 0 rgba(255,255,255,.4)}","","  #nl-moldura .digitando{display:flex;gap:4px;align-self:flex-start;background:var(--vidro-claro);","    border:1px solid var(--borda);border-radius:18px 18px 18px 6px;padding:14px 17px}","  #nl-moldura .digitando span{width:7px;height:7px;border-radius:50%;background:var(--neon);opacity:.7;animation:pontinho 1.2s infinite}","  #nl-moldura .digitando span:nth-child(2){animation-delay:.15s}","  #nl-moldura .digitando span:nth-child(3){animation-delay:.3s}","  @keyframes pontinho{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}","","  /* barra de digitação */","  #nl-moldura .nl-input{","    display:none;align-items:center;gap:10px;padding:10px 12px 12px;flex-shrink:0;","    border-top:1px solid var(--borda);animation:surgir .3s ease;","  }","  #nl-moldura .nl-input.ativa{display:flex}","  #nl-moldura .nl-pill{","    flex:1;display:flex;align-items:center;gap:8px;","    background:rgba(0,0,0,.35);border:1px solid var(--borda);border-radius:99px;","    padding:6px 8px 6px 16px;min-height:46px;transition:border-color .15s ease;","  }","  #nl-moldura .nl-pill:focus-within{border-color:rgba(198,244,63,.5);box-shadow:0 0 14px rgba(198,244,63,.12)}","  #nl-moldura .nl-pill input{","    flex:1;background:transparent;border:none;outline:none;color:var(--texto);","    font-size:15px;font-family:var(--fonte);min-width:0","  }","  #nl-moldura .nl-pill input::placeholder{color:var(--suave)}","  #nl-moldura .nl-icone{","    width:34px;height:34px;border:none;background:transparent;cursor:pointer;","    display:flex;align-items:center;justify-content:center;border-radius:50%;","    transition:background .15s ease;flex-shrink:0","  }","  #nl-moldura .nl-icone:hover{background:rgba(255,255,255,.08)}","  #nl-moldura .nl-icone img{width:19px;height:19px;object-fit:contain;opacity:.85}","  #nl-enviar{","    width:46px;height:46px;border:none;background:transparent;cursor:pointer;padding:0;flex-shrink:0;","    filter:drop-shadow(0 4px 14px rgba(198,244,63,.35));","    transition:transform .15s ease;","  }","  #nl-enviar:hover{transform:scale(1.07)}","  #nl-enviar img{width:100%;height:100%;object-fit:contain}","","  #nl-moldura .pix-codigo{","    font-size:10.5px;color:var(--suave);background:rgba(0,0,0,.35);border:1px solid var(--borda);","    border-radius:8px;padding:8px 10px;margin-bottom:10px;word-break:break-all;text-align:center","  }","  #nl-encerrar{","    display:none;text-align:center;font-size:12px;color:var(--suave);","    padding:7px;cursor:pointer;border-top:1px solid var(--borda);flex-shrink:0;","    transition:color .15s ease;","  }","  #nl-encerrar:hover{color:var(--rosa)}","  #nl-moldura .nl-rodape{","    padding:0 14px 10px;font-size:10.5px;color:var(--suave);text-align:center;flex-shrink:0","  }",""].join(String.fromCharCode(10));
document.head.appendChild(est);
var cx = document.createElement('div');
cx.innerHTML = ["<div id='nl-teaser' onclick='nlAbrirChat()'>","  <div class='fechar' onclick='event.stopPropagation();nlFecharTeaser()'>x</div>","  <span id='nl-teaser-txt'></span>","</div>","","<button id='nl-bolha' onclick='nlAbrirChat()' aria-label='Abrir chat'>","  <img src='https://i.imgur.com/xfpgEW4.png' alt='Liss'>","</button>","","<div id='nl-moldura'>","<div id='nl-chat'>","  <div class='nl-topo'>","    <img src='https://i.imgur.com/xfpgEW4.png' alt='Liss'>","    <div>","      <div class='nome'>Liss</div>","      <div class='status'>Online agora</div>","    </div>","    <div class='acoes'>","      <button onclick='nlReiniciar()' title='Reiniciar conversa'>R</button>","      <button onclick='nlFecharChat()' title='Minimizar'>_</button>","    </div>","  </div>","  <div id='nl-corpo'></div>","  <div id='nl-encerrar' onclick='nlEncerrar()'>Encerrar atendimento</div>","  <div class='nl-input'>","    <div class='nl-pill'>","      <input id='nl-texto' type='text' placeholder='Digite sua mensagem' maxlength='500'>","      <button class='nl-icone' title='Anexar arquivo' onclick='nlDemoAnexo()'><img src='https://i.imgur.com/520dz0b.png' alt=''></button>","      <button class='nl-icone' title='Enviar áudio' onclick='nlDemoAudio()'><img src='https://i.imgur.com/BAbFWEj.png' alt=''></button>","    </div>","    <button id='nl-enviar' onclick='nlEnviarTexto()' title='Enviar'><img src='https://i.imgur.com/1gFtuSA.png' alt='Enviar'></button>","  </div>","  <div class='nl-rodape'>Atendimento Netliss &middot; <b id='nl-id-visual'></b></div>","</div>","</div>"].join(String.fromCharCode(10));
document.body.appendChild(cx);
}


// ================================================================
//  NETLISS — LOGICA DO WIDGET v4 (externo)
//  100% sem barra invertida em strings (compativel GreatPages)
// ================================================================

var CFG = {
  webhook: "https://hook.us2.make.com/7utigfgghdla4j4loav3fu2leopdwp3o",
  playStore: "https://play.google.com/store/apps/details?id=com.netlissbrasil.pro",
  videoTeste: "https://www.youtube.com/@netlissbrasil",
  planos: {
    "BASICO": { id: 6, nome: "Netliss BÁSICO", preco: "R$ 24,90", desc: "Plano mensal · 1 pessoa · Pix" },
    "TOP":    { id: 7, nome: "Netliss TOP", preco: "R$ 59,90", desc: "3 meses · até 2 pessoas · cerca de R$ 9,98 por pessoa/mês" },
    "VIP":    { id: 8, nome: "Netliss VIP", preco: "R$ 99,90", desc: "6 meses · até 3 pessoas · cerca de R$ 5,55 por pessoa/mês" }
  },
  ttlId: 172800000,
  ttlTicket: 172800000
};

var NL = { aberto:false, jaAbriu:false, corpo:null, clientId:null, nome:null, op:null, mod:null,
           ticket:null, difyConv:null, aguardando:false, pollTimer:null, planoAtual:null,
           pgNome:null, pgEmail:null, pgCpf:null, contaRenov:null, modoRenov:false, usuarioApp:null };

// ---------------- ARMAZENAMENTO ----------------
function nlSalvar(chave, valor, ttl){
  try{ localStorage.setItem(chave, JSON.stringify({ v: valor, e: Date.now() + ttl })); }catch(e){}
}
function nlLer(chave){
  try{
    var bruto = localStorage.getItem(chave);
    if(!bruto){ return null; }
    var obj = JSON.parse(bruto);
    if(obj && obj.e && Date.now() < obj.e){ return obj.v; }
    localStorage.removeItem(chave);
  }catch(e){}
  return null;
}
function nlGerarId(){
  var salvo = nlLer("netliss_id");
  if(salvo){ return salvo; }
  var chars = "abcdefghjkmnpqrstuvwxyz23456789";
  var id = "NL-";
  for(var i=0;i<10;i++){ id += chars.charAt(Math.floor(Math.random()*chars.length)); }
  nlSalvar("netliss_id", id, CFG.ttlId);
  return id;
}
function nlSoNumeros(t){
  var limpo = "";
  var s = String(t || "");
  for(var i=0;i<s.length;i++){
    var c = s.charAt(i);
    if(c >= "0" && c <= "9"){ limpo += c; }
  }
  return limpo;
}

// ---------------- API ----------------
async function nlApi(payload){
  payload.id_netliss = NL.clientId;
  var partes = [];
  for(var k in payload){
    if(Object.prototype.hasOwnProperty.call(payload, k)){
      var v = payload[k];
      if(v === undefined || v === null){ v = ""; }
      partes.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(v)));
    }
  }
  try{
    var r = await fetch(CFG.webhook + "?" + partes.join("&"), { method: "POST" });
    var texto = await r.text();
    try{ return JSON.parse(texto); }catch(e){ return { bruto: texto }; }
  }catch(e){ return null; }
}
function nlApiFogo(payload){ nlApi(payload); }

// ---------------- TICKET ----------------
function nlGarantirTicket(){
  if(NL.ticket){ return; }
  var salvo = nlLer("netliss_ticket");
  if(salvo && salvo.id){
    NL.ticket = salvo.id;
    NL.difyConv = salvo.dify || null;
    return;
  }
  NL.ticket = NL.clientId + "-T" + Date.now();
  NL.difyConv = null;
  nlSalvar("netliss_ticket", { id: NL.ticket, dify: null }, CFG.ttlTicket);
  nlApiFogo({ acao: "ticket_abrir", ticket_id: NL.ticket });
}
function nlSalvarConv(){
  nlSalvar("netliss_ticket", { id: NL.ticket, dify: NL.difyConv }, CFG.ttlTicket);
}
function nlLog(autor, texto){
  if(!texto){ return; }
  nlGarantirTicket();
  nlApiFogo({ acao: "msg", ticket_id: NL.ticket, autor: autor, mensagem: String(texto).substring(0, 900) });
}

// ---------------- HISTORICO ----------------
function nlHistPush(autor, html){
  try{
    var hh = nlLer("netliss_hist") || [];
    hh.push({ a: autor, m: html });
    if(hh.length > 150){ hh = hh.slice(hh.length - 150); }
    nlSalvar("netliss_hist", hh, 2592000000);
  }catch(e){}
}
function nlHistRestaurar(){
  var hh = nlLer("netliss_hist") || [];
  for(var i=0;i<hh.length;i++){
    var d = document.createElement("div");
    d.className = "msg " + (hh[i].a === "cliente" ? "user" : "liss");
    d.innerHTML = hh[i].m;
    d.style.animation = "none";
    NL.corpo.appendChild(d);
  }
  if(hh.length){
    var sep = document.createElement("div");
    sep.className = "sistema";
    sep.textContent = "conversas anteriores";
    NL.corpo.insertBefore(sep, NL.corpo.firstChild);
  }
}

// ---------------- INTERFACE ----------------
function nlRolar(){ NL.corpo.scrollTop = NL.corpo.scrollHeight; }
function nlLimparChips(){
  var velhos = NL.corpo.querySelectorAll(".chips, .form");
  for(var i=0;i<velhos.length;i++){ velhos[i].remove(); }
}
function nlEscapar(t){
  var d = document.createElement("div");
  d.textContent = (t === null || t === undefined) ? "" : String(t);
  return d.innerHTML;
}
function nlMsgUser(texto){
  nlLimparChips();
  var d = document.createElement("div");
  d.className = "msg user";
  d.textContent = texto;
  NL.corpo.appendChild(d);
  nlRolar();
  nlHistPush("cliente", nlEscapar(texto));
  nlLog("cliente", texto);
}
function nlSistema(htmlTexto){
  var d = document.createElement("div");
  d.className = "sistema";
  d.innerHTML = htmlTexto;
  NL.corpo.appendChild(d);
  nlRolar();
}
function nlDigitar(depois, ms){
  var t = document.createElement("div");
  t.className = "digitando";
  t.innerHTML = "<span></span><span></span><span></span>";
  NL.corpo.appendChild(t);
  nlRolar();
  setTimeout(function(){ t.remove(); depois(); }, ms || 800);
}
function nlMsgLiss(htmlTexto, depois, autor){
  nlDigitar(function(){
    var d = document.createElement("div");
    d.className = "msg liss";
    d.innerHTML = htmlTexto;
    NL.corpo.appendChild(d);
    nlRolar();
    nlHistPush("liss", htmlTexto);
    nlLog(autor || "minibot", d.textContent);
    if(depois){ depois(); }
  });
}
function nlChips(opcoes){
  var box = document.createElement("div");
  box.className = "chips";
  for(var i=0;i<opcoes.length;i++){
    (function(op){
      var b = document.createElement("button");
      b.className = "chip" + (op.sec ? " secundario" : "");
      b.textContent = op.rotulo;
      b.onclick = function(){ nlMsgUser(op.rotulo); op.acao(); };
      box.appendChild(b);
    })(opcoes[i]);
  }
  NL.corpo.appendChild(box);
  nlRolar();
}
function nlCard(htmlTexto){
  var d = document.createElement("div");
  d.className = "card";
  d.innerHTML = htmlTexto;
  NL.corpo.appendChild(d);
  nlRolar();
  return d;
}
function nlForm(htmlTexto){
  var f = document.createElement("div");
  f.className = "form";
  f.innerHTML = htmlTexto;
  NL.corpo.appendChild(f);
  nlRolar();
  return f;
}

// ---------------- TELEFONE UNIVERSAL ----------------
function nlTelHtml(pre){
  return "" +
    "<div style='display:flex;gap:7px'>" +
    "<select id='" + pre + "-pais' style='background:rgba(0,0,0,.35);border:1px solid var(--borda);border-radius:11px;color:var(--texto);padding:12px 6px;font-size:13px;width:94px;font-family:var(--fonte)'>" +
    "<option value='55' selected>BR +55</option>" +
    "<option value='351'>PT +351</option>" +
    "<option value='1'>US +1</option>" +
    "<option value='595'>PY +595</option>" +
    "<option value='598'>UY +598</option>" +
    "<option value='54'>AR +54</option>" +
    "</select>" +
    "<input id='" + pre + "-ddd' type='tel' placeholder='(DDD)' maxlength='3' style='width:74px'>" +
    "<input id='" + pre + "-num' type='tel' placeholder='Número' maxlength='10' style='flex:1;min-width:0'>" +
    "</div>";
}
function nlTelLer(pre){
  var pais = document.getElementById(pre + "-pais").value;
  var ddd = nlSoNumeros(document.getElementById(pre + "-ddd").value);
  var num = nlSoNumeros(document.getElementById(pre + "-num").value);
  if(ddd.length < 2 || num.length < 8){ return null; }
  return "+" + pais + ddd + num;
}

// ---------------- ABRIR / FECHAR ----------------
function nlAbrirChat(origem){
  document.getElementById("nl-teaser").style.display = "none";
  document.getElementById("nl-bolha").style.display = "none";
  document.getElementById("nl-moldura").style.display = "block";
  NL.aberto = true;
  if(!NL.jaAbriu){ NL.jaAbriu = true; nlInicio(origem); }
}
function nlFecharChat(){
  document.getElementById("nl-moldura").style.display = "none";
  document.getElementById("nl-bolha").style.display = "block";
  NL.aberto = false;
}
function nlFecharTeaser(){ document.getElementById("nl-teaser").style.display = "none"; }
function nlReiniciar(){ nlBloquearDigitacao(); NL.corpo.innerHTML = ""; nlInicio(); }

// ---------------- INICIO ----------------
function nlInicio(origem){
  nlGarantirTicket();
  nlMsgLiss("Oi! Eu sou a <b>Liss</b>, assistente virtual da Netliss.<br>Para agilizar o seu atendimento, por favor me conta:", function(){
    nlChips([
      { rotulo:"Sou novo aqui", acao:nlFluxoNovo },
      { rotulo:"Já sou cliente", acao:nlFluxoCliente }
    ]);
  });
}

// ---------------- NOVO ----------------
function nlFluxoNovo(){
  nlMsgLiss("Seja muito bem-vindo! Antes de tudo, qual é o seu nome?", function(){
    nlForm("<input id='nl-nome-novo' type='text' placeholder='Seu nome' maxlength='40'>" +
           "<button class='botao' onclick='nlSalvarNome()'>Continuar</button>");
  });
}
function nlSalvarNome(){
  var n = document.getElementById("nl-nome-novo").value.trim();
  if(n.length < 2){ alert("Digite seu nome"); return; }
  NL.nome = n.split(" ")[0];
  nlMsgUser(n);
  nlApiFogo({ acao:"nome", nome:n });
  nlMsgLiss("Prazer, <b>" + nlEscapar(NL.nome) + "</b>! Qual é o sistema do seu celular?", function(){
    nlChips([
      { rotulo:"Android", acao:function(){ nlApiFogo({acao:"nome", sistema:"Android"}); nlNovoAndroid(); } },
      { rotulo:"iPhone (iOS)", acao:function(){ nlApiFogo({acao:"nome", sistema:"iOS"}); nlNovoIos(); } }
    ]);
  });
}

var REGRAS = {
  "TIM|PRE": { tipo:"ok", texto:"<b>TIM Pré-pago</b> funciona muito bem com a Netliss!<br><br><b>Com saldo válido:</b> conexão perfeita e estável.<br><br><b>Com saldo expirado:</b> ainda funciona, mas com instabilidade — às vezes você vai precisar ativar e desativar o <b>modo avião</b> e testar todas as opções da TIM no aplicativo até conectar.<br><br>E se um dia, com o saldo expirado, o aplicativo só ficar procurando rede e não conectar de jeito nenhum, é o sinal de que chegou a hora de fazer uma recarga." },
  "TIM|POS": { tipo:"ok", texto:"<b>TIM Pós-pago / Controle</b> funciona muito bem com a Netliss!<br><br>Só existe uma regra de ouro: mantenha os pagamentos da operadora <b>em dia</b>. Se a fatura atrasar, a operadora corta a rota de conexão e o aplicativo para de conectar até você regularizar." },
  "Vivo|PRE": { tipo:"aviso", texto:"Preciso ser honesta com você: <b>Vivo Pré-pago</b> tem funcionado com muita instabilidade — costuma dar dor de cabeça.<br><br>Você pode fazer o teste grátis e ver como se comporta na sua região, mas prefiro te avisar antes. Se você busca estabilidade de verdade, um chip <b>TIM</b> combina muito melhor. Outra ótima opção é a <b>Intercel</b>: ela tem um plano próprio, de cerca de <b>R$17 por mês</b>, que funciona muito bem com a Netliss." },
  "Vivo|POS": { tipo:"ok", texto:"<b>Vivo Pós-pago / Controle</b> está funcionando muito bem com a Netliss!<br><br>Só mantenha os pagamentos da operadora em dia: fatura atrasada derruba a rota de conexão e o aplicativo para de conectar até regularizar." },
  "Claro|PRE": { tipo:"bloqueio", texto:"Como te falei, no <b>Claro Pré-pago</b> a Netliss não funciona — e eu não quero te dar prejuízo nem dor de cabeça.<br><br>A boa notícia: com um chip <b>TIM</b> (pré ou pós) a experiência é excelente. E tem a <b>Intercel</b>, que oferece um plano próprio de cerca de <b>R$17 por mês</b> e combina muito bem com a Netliss." },
  "Claro|POS": { tipo:"ok", texto:"Certo! No <b>Claro Pós-pago / Controle</b> dá para usar a Netliss. Só te adianto que a Claro costuma oscilar mais que as outras operadoras — por isso o <b>teste grátis</b> é essencial: você avalia como fica na sua região antes de pagar qualquer coisa.<br><br>E mantenha a fatura em dia: atraso derruba a rota de conexão." },
  "Intercel|PRE": { tipo:"ok", texto:"<b>Intercel</b> funciona muito bem com a Netliss — tanto pré quanto pós-pago!<br><br>Ela usa a rede da Vivo e oferece um <b>plano próprio de cerca de R$17 por mês</b>. Somando com a Netliss, você fica com internet ilimitada gastando pouquíssimo." },
  "Intercel|POS": { tipo:"ok", texto:"<b>Intercel</b> funciona muito bem com a Netliss — tanto pré quanto pós-pago!<br><br>Ela usa a rede da Vivo e oferece um <b>plano próprio de cerca de R$17 por mês</b>. Somando com a Netliss, você fica com internet ilimitada gastando pouquíssimo." }
};

function nlNovoAndroid(){
  nlMsgLiss("Show! Agora me diz: qual é a sua <b>operadora</b>?", function(){
    nlChips([
      { rotulo:"TIM", acao:function(){ nlAndroidModalidade("TIM"); } },
      { rotulo:"Vivo", acao:function(){ nlAndroidModalidade("Vivo"); } },
      { rotulo:"Claro", acao:function(){ nlAndroidModalidade("Claro"); } },
      { rotulo:"Intercel", acao:function(){ nlAndroidModalidade("Intercel"); } }
    ]);
  });
}
function nlAndroidModalidade(operadora){
  NL.op = operadora;
  if(operadora === "Claro"){
    nlMsgLiss("Preciso ser transparente com você desde já: na <b>Claro</b>, a Netliss funciona <b>somente no Pós-pago ou Controle</b>. No <b>Claro Pré-pago não funciona</b> de jeito nenhum.<br><br>Qual é o seu caso?", function(){
      nlChips([
        { rotulo:"Pós-pago ou Controle", acao:function(){ nlAndroidRegras("Claro", "POS"); } },
        { rotulo:"Pré-pago", acao:function(){ nlAndroidRegras("Claro", "PRE"); } },
        { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
      ]);
    });
    return;
  }
  nlMsgLiss("Anotado: <b>" + operadora + "</b>.<br>E qual é a modalidade do seu chip?", function(){
    nlChips([
      { rotulo:"Pré-pago", acao:function(){ nlAndroidRegras(operadora, "PRE"); } },
      { rotulo:"Pós-pago ou Controle", acao:function(){ nlAndroidRegras(operadora, "POS"); } }
    ]);
  });
}
function nlAndroidRegras(operadora, mod){
  NL.mod = mod;
  nlApiFogo({ acao:"nome", operadora:operadora, modalidade:mod });
  var r = REGRAS[operadora + "|" + mod];
  nlMsgLiss(r.texto, function(){
    if(r.tipo === "ok"){ nlPassoApp(); }
    else if(r.tipo === "aviso"){
      nlChips([
        { rotulo:"Quero testar mesmo assim", acao:nlPassoApp },
        { rotulo:"Tenho outro chip", acao:nlNovoAndroid },
        { rotulo:"Encerrar atendimento", sec:true, acao:nlEncerrar }
      ]);
    } else {
      nlChips([
        { rotulo:"Tenho outro chip", acao:nlNovoAndroid },
        { rotulo:"Atendimento", acao:nlIrParaLiss },
        { rotulo:"Encerrar atendimento", sec:true, acao:nlEncerrar }
      ]);
    }
  });
}
function nlPassoApp(){
  nlMsgLiss("Perfeito! Primeiro passo: baixa o nosso aplicativo oficial na Play Store:", function(){
    nlCard("<div class='titulo'>Aplicativo Netliss</div>" +
      "<div class='desc'>Baixe e instale no seu Android. Aproveite e veja as avaliações de quem já usa.</div>" +
      "<button class='botao' onclick='nlAposDownload()'>Baixar na Play Store</button>");
  });
}
function nlAposDownload(){
  nlMsgUser("Baixar aplicativo");
  window.open(CFG.playStore, "_blank");
  nlMsgLiss("Baixou? Agora assiste esse vídeo rapidinho — ele mostra <b>como se conectar</b> em menos de 2 minutos. Seu teste é liberado logo depois:", function(){
    nlCard("<div class='video-fake' onclick='nlAbrirVideo()'><div class='play'>&#9654;</div> Vídeo: como fazer o teste grátis</div>" +
      "<button class='botao' onclick='nlGerarTeste()'>Já assisti, quero meu teste</button>");
  });
}
function nlAbrirVideo(){
  window.open(CFG.videoTeste, "_blank");
}
async function nlGerarTeste(){
  nlMsgUser("Já assisti, quero meu teste");
  nlDigitar(async function(){
    var r = await nlApi({ acao:"teste", operadora: NL.op || "", modalidade: NL.mod || "" });
    if(r && r.usuario && r.usuario !== "undefined"){
      NL.copiaUser = r.usuario; NL.copiaSenha = r.senha;
      var trata = NL.nome ? ", <b>" + nlEscapar(NL.nome) + "</b>" : "";
      nlMsgLiss("Prontinho" + trata + "! <b>Seu teste grátis está liberado:</b><br><br>Usuário: <b>" + nlEscapar(r.usuario) + "</b><br>Senha: <b>" + nlEscapar(r.senha) + "</b><br>Validade: <b>" + nlEscapar(r.validade_horas) + " hora</b><br><br><button class='chip' onclick='nlCopiarCred(0,this)'>Copiar usuário</button> <button class='chip' onclick='nlCopiarCred(1,this)'>Copiar senha</button><br><br>É só colocar esses dados no aplicativo, escolher a opção da sua operadora e conectar. Qualquer coisa, estou aqui.", function(){
        nlChips([
          { rotulo:"Quero contratar", acao:nlMostrarPlanos },
          { rotulo:"Quero revender", acao:nlRevenda },
          { rotulo:"Preciso de ajuda", acao:nlIrParaLiss }
        ]);
      });
    } else {
      nlMsgLiss("Opa, tive um probleminha para gerar o seu teste agora. Vamos tentar de novo?", function(){
        nlChips([
          { rotulo:"Tentar novamente", acao:nlGerarTeste },
          { rotulo:"Atendimento", acao:nlIrParaLiss }
        ]);
      });
    }
  }, 400);
}

// ---------------- iOS ----------------
function nlNovoIos(){
  nlMsgLiss("No <b>iPhone</b> é bem simples: nossa equipe libera o seu teste grátis pelo <b>WhatsApp</b>, rapidinho e sem custo nenhum.<br><br>Hoje funciona com <b>TIM</b> (pré ou pós-pago) e <b>Vivo Pós-pago</b>. Qual é a sua operadora?", function(){
    nlChips([
      { rotulo:"TIM", acao:function(){ NL.op = "TIM"; nlIosModalidade(); } },
      { rotulo:"Vivo", acao:nlIosVivo },
      { rotulo:"Claro", acao:function(){ nlIosIncompativel("a Claro"); } },
      { rotulo:"Outra", acao:function(){ nlIosIncompativel("essa operadora"); } }
    ]);
  });
}
function nlIosModalidade(){
  nlMsgLiss("E o seu chip é de qual modalidade?", function(){
    nlChips([
      { rotulo:"Pré-pago", acao:function(){ NL.mod = "PRE"; nlIosOk(); } },
      { rotulo:"Pós-pago ou Controle", acao:function(){ NL.mod = "POS"; nlIosOk(); } }
    ]);
  });
}
function nlIosVivo(){
  NL.op = "Vivo";
  nlMsgLiss("E o seu chip Vivo é de qual modalidade?", function(){
    nlChips([
      { rotulo:"Pós-pago ou Controle", acao:function(){ NL.mod = "POS"; nlIosOk(); } },
      { rotulo:"Pré-pago", acao:function(){ nlIosIncompativel("Vivo Pré-pago"); } }
    ]);
  });
}
function nlIosOk(){
  nlMsgLiss("Ótimo, funciona no seu chip! Preenche seus dados que nossa equipe te chama no <b>WhatsApp</b> para liberar o seu teste grátis:", function(){
    nlForm("<input id='nl-ios-nome' type='text' placeholder='Seu nome' maxlength='60'>" +
           nlTelHtml("nl-ios") +
           "<button class='botao' onclick='nlEnviarLeadIos()'>Solicitar teste grátis</button>");
    if(NL.nome){ document.getElementById("nl-ios-nome").value = NL.nome; }
  });
}
function nlEnviarLeadIos(){
  var nome = document.getElementById("nl-ios-nome").value.trim();
  var tel = nlTelLer("nl-ios");
  if(nome.length < 2){ alert("Digite seu nome"); return; }
  if(!tel){ alert("Preencha o DDD e o número do WhatsApp"); return; }
  nlMsgUser(nome + " - " + tel);
  nlApiFogo({ acao:"lead_ios", nome:nome, whatsapp:tel, operadora: NL.op || "", modalidade: NL.mod || "" });
  nlMsgLiss("Prontinho, <b>" + nlEscapar(nome.split(" ")[0]) + "</b>!<br>Nossa equipe vai te chamar no WhatsApp <b>" + nlEscapar(tel) + "</b> em instantes para liberar o seu teste grátis. Fica de olho no seu WhatsApp!", function(){
    nlEncerrar();
  });
}
function nlIosIncompativel(qual){
  nlMsgLiss("No iPhone, " + qual + " ainda não funciona com a Netliss — e eu prefiro te falar a verdade a te dar dor de cabeça.<br><br>Com um chip <b>TIM</b> (pré ou pós) ou <b>Vivo Pós-pago</b> funciona certinho. E no <b>Android</b>, as opções são ainda maiores.", function(){
    nlChips([
      { rotulo:"Tenho outro chip", acao:nlNovoIos },
      { rotulo:"Atendimento", acao:nlIrParaLiss },
      { rotulo:"Encerrar atendimento", sec:true, acao:nlEncerrar }
    ]);
  });
}

// ---------------- PLANOS E PAGAMENTO ----------------
function nlMostrarPlanos(){
  NL.modoRenov = false;
  nlMsgLiss("Olha só as opções — todas com suporte especializado e pagamento seguro:", function(){
    var chaves = ["BASICO","TOP","VIP"];
    for(var i=0;i<chaves.length;i++){
      (function(k){
        var p = CFG.planos[k];
        var c = nlCard((k === "TOP" ? "<div class='tag'>MAIS VENDIDO</div>" : "") +
          "<div class='titulo'>" + p.nome + "</div>" +
          "<div class='preco'>" + p.preco + "</div>" +
          "<div class='desc'>" + p.desc + "</div>" +
          "<button class='botao'>Escolher este plano</button>");
        if(k === "TOP"){ c.className = "card destaque"; }
        c.querySelector("button").onclick = function(){ nlEscolherPlano(k); };
      })(chaves[i]);
    }
  });
}
function nlEscolherPlano(k){
  NL.planoAtual = k;
  nlMsgUser(CFG.planos[k].nome);
  nlMsgLiss("Ótima escolha! E como você prefere pagar?", function(){
    nlChips([
      { rotulo:"PIX", acao:nlFormPix },
      { rotulo:"Cartão de crédito", acao:nlFormCartao }
    ]);
  });
}
function nlFormPix(){
  nlMsgLiss("Preencha os dados abaixo para gerar o seu <b>código PIX</b>:<br><br><i>Nome, e-mail e CPF são exigidos pelas regras do Banco Central e pelo Mercado Pago para emitir a cobrança em seu nome. A Netliss não armazena o seu CPF.</i>", function(){
    nlForm("<input id='nl-pg-nome' type='text' placeholder='Seu nome completo' maxlength='60'>" +
           "<input id='nl-pg-email' type='email' placeholder='Seu e-mail' maxlength='80'>" +
           "<input id='nl-pg-cpf' type='tel' placeholder='Seu CPF (só números)' maxlength='11'>" +
           "<button class='botao' onclick='nlValidarDadosPix()'>Gerar código PIX</button>");
    if(NL.nome){ document.getElementById("nl-pg-nome").value = NL.nome; }
  });
}
function nlValidarDadosPix(){
  var nome = document.getElementById("nl-pg-nome").value.trim();
  var email = document.getElementById("nl-pg-email").value.trim();
  var cpf = nlSoNumeros(document.getElementById("nl-pg-cpf").value);
  if(nome.length < 5){ alert("Digite seu nome completo"); return; }
  if(email.indexOf("@") < 1 || email.indexOf(".") < 3){ alert("Digite um e-mail válido"); return; }
  if(cpf.length !== 11){ alert("O CPF precisa ter 11 números"); return; }
  NL.pgNome = nome; NL.pgEmail = email; NL.pgCpf = cpf;
  nlMsgUser(nome);
  nlApiFogo({ acao:"nome", nome:nome, email:email });
  nlPagarPix();
}
function nlPagarPix(){
  nlDigitar(async function(){
    var p = CFG.planos[NL.planoAtual];
    NL.metodoPg = "pix";
    var corpo = { acao:"pagamento_criar", metodo:"pix", plan_id: p.id, nome: NL.pgNome, email: NL.pgEmail, cpf: NL.pgCpf };
    if(NL.modoRenov && NL.contaRenov){ corpo.account_id = NL.contaRenov; }
    var r = await nlApi(corpo);
    if(r && r.success && r.pix){
      nlMsgLiss("Aqui está o seu PIX do <b>" + p.nome + "</b> (" + p.preco + "). Escaneie o QR Code ou copie o código:", function(){
        nlCard("<img src='data:image/png;base64," + r.pix.qr_code_base64 + "' style='width:180px;display:block;margin:0 auto 10px;border-radius:10px;background:#fff;padding:6px'>" +
          "<div class='pix-codigo' id='nl-pix-txt'>" + nlEscapar(r.pix.qr_code_text) + "</div>" +
          "<div class='desc' style='text-align:center'>Assim que o pagamento for confirmado, eu te aviso <b>aqui mesmo</b> no chat.</div>" +
          "<button class='botao' style='width:100%' onclick='nlCopiarPix()'>Copiar código Pix</button>");
        nlIniciarPolling(r.payment_id, p);
      });
    } else {
      var msgErro = (r && r.message) ? nlEscapar(r.message) : "tive uma instabilidade para gerar o pagamento";
      nlMsgLiss("Opa: " + msgErro + ".<br>Vamos tentar de novo?", function(){
        nlChips([
          { rotulo:"Tentar novamente", acao:nlFormPix },
          { rotulo:"Atendimento", acao:nlIrParaLiss }
        ]);
      });
    }
  }, 400);
}
function nlCopiarPix(){
  var el = document.getElementById("nl-pix-txt");
  if(el && navigator.clipboard){ navigator.clipboard.writeText(el.textContent); }
  alert("Código Pix copiado!");
}
function nlIniciarPolling(paymentId, plano){
  if(NL.pollTimer){ clearInterval(NL.pollTimer); }
  var tentativas = 0;
  NL.pollTimer = setInterval(async function(){
    tentativas++;
    if(tentativas > 200){ clearInterval(NL.pollTimer); return; }
    var s = await nlApi({ acao:"pagamento_status", payment_id: String(paymentId) });
    if(!s){ return; }
    if(s.status === "approved" || s.status === "paid" || s.status === "confirmed"){
      clearInterval(NL.pollTimer);
      nlApiFogo({ acao:"venda", plano: plano.nome, valor: plano.preco, usuario: s.username || "", metodo: NL.metodoPg || "pix" });
      var cred = "";
      if(s.username && s.password){
        NL.copiaUser = s.username; NL.copiaSenha = s.password;
        cred = "<br><br>Usuário: <b>" + nlEscapar(s.username) + "</b><br>Senha: <b>" + nlEscapar(s.password) + "</b><br><br><button class='chip' onclick='nlCopiarCred(0,this)'>Copiar usuário</button> <button class='chip' onclick='nlCopiarCred(1,this)'>Copiar senha</button><br><br><b>Muito importante:</b> anote e guarde essas credenciais com carinho. A Netliss não armazena usuário e senha — se você perder, não conseguimos recuperar.";
      } else {
        cred = "<br><br>Suas credenciais chegam no seu e-mail <b>" + nlEscapar(NL.pgEmail) + "</b> em instantes. Guarde com carinho: a Netliss não armazena usuário e senha.";
      }
      nlMsgLiss("<b>Pagamento aprovado!</b> Seja bem-vindo à família Netliss!" + cred, function(){
        nlChips([
          { rotulo:"Atendimento", acao:nlIrParaLiss },
          { rotulo:"Encerrar atendimento", sec:true, acao:nlEncerrar }
        ]);
      });
    }
    if(s.status === "expired" || s.status === "cancelled"){
      clearInterval(NL.pollTimer);
      nlMsgLiss("O PIX expirou sem pagamento. Sem problema — quer gerar um novo?", function(){
        nlChips([
          { rotulo:"Gerar novo PIX", acao:nlFormPix },
          { rotulo:"Encerrar atendimento", sec:true, acao:nlEncerrar }
        ]);
      });
    }
  }, 7000);
}
function nlFormCartao(){
  nlMsgLiss("Perfeito! Preencha os dados abaixo para pagar com <b>cartão de crédito</b>:<br><br><i>Nome, e-mail e CPF são exigidos pelo Mercado Pago para emitir a cobrança em seu nome. O número do cartão você digita direto no ambiente seguro do Mercado Pago — ele nunca passa pela Netliss.</i>", function(){
    nlForm("<input id='nl-pg-nome' type='text' placeholder='Seu nome completo' maxlength='60'>" +
           "<input id='nl-pg-email' type='email' placeholder='Seu e-mail' maxlength='80'>" +
           "<input id='nl-pg-cpf' type='tel' placeholder='Seu CPF (só números)' maxlength='11'>" +
           "<button class='botao' onclick='nlValidarDadosCartao()'>Continuar para o pagamento</button>");
    if(NL.nome){ document.getElementById("nl-pg-nome").value = NL.nome; }
  });
}
function nlValidarDadosCartao(){
  var nome = document.getElementById("nl-pg-nome").value.trim();
  var email = document.getElementById("nl-pg-email").value.trim();
  var cpf = nlSoNumeros(document.getElementById("nl-pg-cpf").value);
  if(nome.length < 5){ alert("Digite seu nome completo"); return; }
  if(email.indexOf("@") < 1 || email.indexOf(".") < 3){ alert("Digite um e-mail válido"); return; }
  if(cpf.length !== 11){ alert("O CPF precisa ter 11 números"); return; }
  NL.pgNome = nome; NL.pgEmail = email; NL.pgCpf = cpf;
  nlMsgUser(nome);
  nlApiFogo({ acao:"nome", nome:nome, email:email });
  nlPagarCartao();
}
function nlAcharUrlPagamento(r){
  var campos = ["checkout_url", "payment_url", "init_point", "card_url", "url"];
  var fontes = [r, r && r.card, r && r.payment, r && r.dados];
  for(var f = 0; f < fontes.length; f++){
    var o = fontes[f];
    if(!o){ continue; }
    for(var c = 0; c < campos.length; c++){
      var v = o[campos[c]];
      if(v && String(v).indexOf("http") === 0){ return String(v); }
    }
  }
  return "";
}
function nlPagarCartao(){
  nlDigitar(async function(){
    var p = CFG.planos[NL.planoAtual];
    NL.metodoPg = "credit_card";
    var corpo = { acao:"pagamento_criar", metodo:"credit_card", plan_id: p.id, nome: NL.pgNome, email: NL.pgEmail, cpf: NL.pgCpf };
    if(NL.modoRenov && NL.contaRenov){ corpo.account_id = NL.contaRenov; }
    var r = await nlApi(corpo);
    var urlPg = r ? nlAcharUrlPagamento(r) : "";
    if(r && r.success && urlPg){
      NL.urlCartao = urlPg;
      nlMsgLiss("Tudo certo para o seu <b>" + p.nome + "</b> (" + p.preco + ")!", function(){
        nlCard("<div class='titulo'>Pagamento com cartão</div>" +
          "<div class='desc'>Clique no botão abaixo para concluir na página segura do <b>Mercado Pago</b>. Assim que o pagamento for aprovado, eu te aviso <b>aqui mesmo</b> no chat e já te entrego o seu acesso.</div>" +
          "<button class='botao' style='width:100%' onclick='nlAbrirCheckout()'>Pagar com cartão</button>");
        nlIniciarPolling(r.payment_id, p);
      });
    } else if(r && r.success && r.payment_id){
      nlMsgLiss("Pagamento do <b>" + p.nome + "</b> iniciado! Assim que for aprovado, eu te aviso <b>aqui mesmo</b> no chat.", function(){
        nlIniciarPolling(r.payment_id, p);
      });
    } else {
      var msgErro = (r && r.message) ? nlEscapar(r.message) : "tive uma instabilidade para iniciar o pagamento";
      nlMsgLiss("Opa: " + msgErro + ".<br>Vamos tentar de novo?", function(){
        nlChips([
          { rotulo:"Tentar novamente", acao:nlFormCartao },
          { rotulo:"Pagar com PIX", acao:nlFormPix },
          { rotulo:"Atendimento", acao:nlIrParaLiss }
        ]);
      });
    }
  }, 400);
}
function nlAbrirCheckout(){
  if(NL.urlCartao){ window.open(NL.urlCartao, "_blank"); }
}

// ---------------- JA SOU CLIENTE ----------------
function nlFluxoCliente(){
  nlMsgLiss("Que bom te ver de novo!<br>Me fala o seu <b>nome de usuário</b> (o mesmo que você usa no aplicativo):", function(){
    nlForm("<input id='nl-usuario' type='text' placeholder='Seu nome de usuário' maxlength='40'>" +
           "<button class='botao' onclick='nlVerificarUsuario()'>Verificar minha conta</button>");
  });
}
function nlVerificarUsuario(){
  var u = document.getElementById("nl-usuario").value.trim();
  if(u.length < 3){ alert("Digite seu nome de usuário"); return; }
  nlMsgUser(u);
  NL.usuarioApp = u;
  nlDigitar(async function(){
    var r = await nlApi({ acao:"renovacao_busca", usuario:u });
    var conta = null;
    if(r && r.account){ conta = r.account; }
    else if(r && r.data && r.data.account){ conta = r.data.account; }
    else if(r && r.success && r.id){ conta = r; }
    if(conta){
      NL.contaRenov = conta.id || conta.account_id || null;
      var dias = conta.days_remaining;
      if(dias === undefined && conta.expires_at){
        var d1 = new Date(String(conta.expires_at).replace(" ", "T"));
        dias = Math.ceil((d1 - new Date()) / 86400000);
      }
      var info = "";
      if(dias !== undefined && dias !== null && !isNaN(dias)){
        info = (dias > 0)
          ? "<br>Você ainda tem <b>" + dias + " dia(s)</b> de acesso — e renovando agora, os dias novos são <b>somados</b> a esses. Você não perde nada."
          : "<br>Seu acesso está <b>vencido</b>, mas dá para renovar mantendo o <b>mesmo usuário e senha</b>.";
      }
      nlMsgLiss("Achei sua conta <b>" + nlEscapar(u) + "</b>!" + info + "<br><br>Como posso te ajudar hoje?", function(){
        nlChips([
          { rotulo:"Quero renovar", acao:nlRenovarPlanos },
          { rotulo:"Suporte", acao:nlIrParaLiss },
          { rotulo:"Quero revender", acao:nlRevenda }
        ]);
      });
    } else {
      nlMsgLiss("Hmm, não encontrei o usuário <b>" + nlEscapar(u) + "</b>. Pode ter sido erro de digitação — ou o acesso já foi removido do sistema.<br><br>O que você prefere?", function(){
        nlChips([
          { rotulo:"Tentar de novo", acao:nlFluxoCliente },
          { rotulo:"Quero renovar", acao:nlMostrarPlanos },
          { rotulo:"Quero revender", acao:nlRevenda },
          { rotulo:"Atendimento", sec:true, acao:nlIrParaLiss }
        ]);
      });
    }
  }, 400);
}
function nlRenovarPlanos(){
  NL.modoRenov = true;
  nlMsgLiss("Perfeito! Escolha o plano da sua renovação — os dias são somados ao que você já tem:", function(){
    var chaves = ["BASICO","TOP","VIP"];
    for(var i=0;i<chaves.length;i++){
      (function(k){
        var p = CFG.planos[k];
        var c = nlCard((k === "TOP" ? "<div class='tag'>MAIS VENDIDO</div>" : "") +
          "<div class='titulo'>" + p.nome + "</div>" +
          "<div class='preco'>" + p.preco + "</div>" +
          "<div class='desc'>" + p.desc + "</div>" +
          "<button class='botao'>Renovar com este plano</button>");
        if(k === "TOP"){ c.className = "card destaque"; }
        c.querySelector("button").onclick = function(){
          NL.planoAtual = k;
          nlMsgUser("Renovar: " + p.nome);
          nlMsgLiss("Ótima escolha! E como você prefere pagar?", function(){
            nlChips([
              { rotulo:"PIX", acao:nlFormPix },
              { rotulo:"Cartão de crédito", acao:nlFormCartao }
            ]);
          });
        };
      })(chaves[i]);
    }
  });
}

// ---------------- REVENDA ----------------
function nlRevenda(){
  nlMsgLiss("Que ótimo! Para revender bem, o primeiro passo é <b>conhecer o produto</b> — por isso nossos melhores revendedores começaram como clientes.<br><br>Deixa seu contato que nossa equipe te chama no WhatsApp para conversar:", function(){
    nlForm("<input id='nl-rev-nome' type='text' placeholder='Seu nome' maxlength='60'>" +
           nlTelHtml("nl-rev") +
           "<button class='botao' onclick='nlEnviarLeadRevenda()'>Quero saber mais</button>");
    if(NL.nome){ document.getElementById("nl-rev-nome").value = NL.nome; }
  });
}
function nlEnviarLeadRevenda(){
  var nome = document.getElementById("nl-rev-nome").value.trim();
  var tel = nlTelLer("nl-rev");
  if(nome.length < 2){ alert("Digite seu nome"); return; }
  if(!tel){ alert("Preencha o DDD e o número do WhatsApp"); return; }
  nlMsgUser(nome + " - " + tel);
  nlApiFogo({ acao:"lead_revenda", nome:nome, whatsapp:tel, cliente: NL.usuarioApp ? ("sim: " + NL.usuarioApp) : "a confirmar" });
  nlMsgLiss("Perfeito, <b>" + nlEscapar(nome.split(" ")[0]) + "</b>! Nossa equipe vai te chamar no WhatsApp <b>" + nlEscapar(tel) + "</b> para conversar sobre a revenda.", function(){
    nlEncerrar();
  });
}

// ---------------- LISS (Dify) ----------------
function nlLiberarDigitacao(){
  document.querySelector("#nl-moldura .nl-input").classList.add("ativa");
  document.getElementById("nl-encerrar").style.display = "block";
  setTimeout(function(){ document.getElementById("nl-texto").focus(); }, 350);
}
function nlBloquearDigitacao(){
  document.querySelector("#nl-moldura .nl-input").classList.remove("ativa");
  document.getElementById("nl-encerrar").style.display = "none";
}
function nlTravar(trava){
  NL.aguardando = trava;
  var campo = document.getElementById("nl-texto");
  var botao = document.getElementById("nl-enviar");
  campo.disabled = trava;
  botao.disabled = trava;
  botao.style.opacity = trava ? "0.4" : "1";
  campo.placeholder = trava ? "Aguarde a resposta..." : "Digite sua mensagem";
}
function nlIrParaLiss(){
  nlGarantirTicket();
  nlMsgLiss("A partir daqui eu te atendo pessoalmente. Pode me contar a sua dúvida na barra aqui embaixo que eu respondo na hora.", function(){
    nlLiberarDigitacao();
  }, "liss");
}
function nlFormatarLiss(t){
  var seguro = nlEscapar(t);
  var palavras = seguro.split(" ");
  for(var i=0;i<palavras.length;i++){
    var w = palavras[i];
    if(w.indexOf("http://") === 0 || w.indexOf("https://") === 0){
      palavras[i] = "<a href='" + w + "' target='_blank'>" + w + "</a>";
    }
  }
  seguro = palavras.join(" ");
  while(seguro.indexOf(String.fromCharCode(10)) >= 0){
    seguro = seguro.replace(String.fromCharCode(10), "<br>");
  }
  return seguro;
}
function nlLerStreamDify(bruto){
  var texto = "";
  var conv = "";
  var linhas = String(bruto).split(String.fromCharCode(10));
  for(var i=0;i<linhas.length;i++){
    var linha = linhas[i];
    var pos = linha.indexOf("data:");
    if(pos < 0){ continue; }
    var corpo = linha.substring(pos + 5);
    corpo = corpo.replace(String.fromCharCode(13), "");
    while(corpo.charAt(0) === " "){ corpo = corpo.substring(1); }
    if(!corpo || corpo === "[DONE]"){ continue; }
    try{
      var obj = JSON.parse(corpo);
      if(obj.conversation_id && !conv){ conv = obj.conversation_id; }
      if(obj.answer){ texto += obj.answer; }
    }catch(e){}
  }
  return { texto: texto, conv: conv };
}

async function nlEnviarTexto(){
  if(NL.aguardando){ return; }
  var campo = document.getElementById("nl-texto");
  var txt = campo.value.trim();
  if(!txt){ return; }
  campo.value = "";
  nlLimparChips();
  var db = document.createElement("div");
  db.className = "msg user";
  db.textContent = txt;
  NL.corpo.appendChild(db);
  nlRolar();
  nlHistPush("cliente", nlEscapar(txt));
  nlTravar(true);
  var t = document.createElement("div");
  t.className = "digitando";
  t.innerHTML = "<span></span><span></span><span></span>";
  NL.corpo.appendChild(t);
  nlRolar();
  try{
    var limpo = txt;
    var aspas = String.fromCharCode(34);
    var barra = String.fromCharCode(92);
    var quebra = String.fromCharCode(10);
    while(limpo.indexOf(aspas) >= 0){ limpo = limpo.replace(aspas, String.fromCharCode(39)); }
    while(limpo.indexOf(barra) >= 0){ limpo = limpo.replace(barra, " "); }
    while(limpo.indexOf(quebra) >= 0){ limpo = limpo.replace(quebra, " "); }
    if(!NL.difyConv){
      var ctx = "[CONTEXTO INTERNO - use mas nunca mencione:";
      ctx += " nome=" + (NL.nome || "nao informado");
      if(NL.op){ ctx += "; operadora=" + NL.op; }
      if(NL.mod){ ctx += "; modalidade=" + NL.mod; }
      if(NL.usuarioApp){ ctx += "; usuario_app=" + NL.usuarioApp; }
      ctx += "; id=" + NL.clientId + "] ";
      limpo = ctx + limpo;
    }
    var d = await nlApi({ acao: "liss", query: limpo, conv: NL.difyConv || "" });
    t.remove();
    var textoLiss = "";
    var convId = "";
    if(d && d.answer){
      textoLiss = d.answer;
      convId = d.conversation_id || "";
    } else if(d && d.bruto){
      var res = nlLerStreamDify(d.bruto);
      textoLiss = res.texto;
      convId = res.conv;
    }
    if(textoLiss){
      if(convId && !NL.difyConv){ NL.difyConv = convId; nlSalvarConv(); }
      nlLog("liss", textoLiss);
      var cmd = "";
      var marcas = ["[ACAO:PLANOS]", "[ACAO:ENCERRAR]"];
      for(var mi = 0; mi < marcas.length; mi++){
        if(textoLiss.indexOf(marcas[mi]) !== -1){
          cmd = marcas[mi];
          textoLiss = textoLiss.split(marcas[mi]).join(" ");
        }
      }
      if(textoLiss.indexOf("[CHAMADO]") !== -1){
        textoLiss = textoLiss.split("[CHAMADO]")[0];
      }
      textoLiss = textoLiss.trim();
      if(textoLiss){
        var d2 = document.createElement("div");
        d2.className = "msg liss";
        d2.innerHTML = nlFormatarLiss(textoLiss);
        NL.corpo.appendChild(d2);
        nlRolar();
        nlHistPush("liss", d2.innerHTML);
      }
      if(cmd === "[ACAO:ENCERRAR]"){
        nlTravar(false);
        nlEncerrar();
        return;
      }
      if(cmd === "[ACAO:PLANOS]"){
        nlTravar(false);
        nlBloquearDigitacao();
        if(NL.pollTimer){ clearInterval(NL.pollTimer); }
        if(NL.ticket){ nlApiFogo({ acao: "ticket_fechar", ticket_id: NL.ticket }); }
        NL.ticket = null;
        NL.difyConv = null;
        try{ localStorage.removeItem("netliss_ticket"); }catch(e){}
        nlMostrarPlanos();
        return;
      }
    } else {
      nlMsgLiss("Desculpa, tive uma instabilidade agora. Pode repetir a sua mensagem?", null, "liss");
    }
  }catch(e){
    t.remove();
    nlMsgLiss("Desculpa, tive uma instabilidade de conexão. Pode tentar de novo?", null, "liss");
  }
  nlTravar(false);
}
function nlCopiarCred(qual, btn){
  var v = qual === 0 ? NL.copiaUser : NL.copiaSenha;
  if(!v){ return; }
  var ok = function(){
    if(btn){
      btn.textContent = "Copiado!";
      setTimeout(function(){ btn.textContent = qual === 0 ? "Copiar usuário" : "Copiar senha"; }, 1600);
    }
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(String(v)).then(ok, function(){ nlCopiarFallback(v); ok(); });
  } else { nlCopiarFallback(v); ok(); }
}
function nlCopiarFallback(v){
  var ta = document.createElement("textarea");
  ta.value = String(v);
  ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try{ document.execCommand("copy"); }catch(e){}
  ta.remove();
}
function nlDemoAnexo(){ nlSistema("envio de arquivos chega na próxima atualização"); }
function nlDemoAudio(){ nlSistema("envio de áudio chega na próxima atualização"); }

function nlEncerrar(){
  nlBloquearDigitacao();
  if(NL.pollTimer){ clearInterval(NL.pollTimer); }
  if(NL.ticket){ nlApiFogo({ acao: "ticket_fechar", ticket_id: NL.ticket }); }
  NL.ticket = null;
  NL.difyConv = null;
  try{ localStorage.removeItem("netliss_ticket"); }catch(e){}
  nlMsgLiss("Foi um prazer te atender!<br>Se precisar de qualquer coisa, é só clicar no balão que eu apareço. Deus te abençoe!", function(){
    nlChips([
      { rotulo:"Novo atendimento", sec:true, acao:function(){ nlReiniciar(); } }
    ]);
  });
}

// ---------------- INICIALIZACAO ----------------
function nlBootWidget(){
  NL.corpo = document.getElementById("nl-corpo");
  NL.clientId = nlGerarId();
  var rodape = document.getElementById("nl-id-visual");
  if(rodape){ rodape.textContent = NL.clientId; }

  nlHistRestaurar();

  var params = new URLSearchParams(location.search);
  if(!nlLer("netliss_visitou")){
    nlSalvar("netliss_visitou", true, CFG.ttlId);
    nlApiFogo({ acao: "visita",
      gclid: params.get("gclid") || "", fbclid: params.get("fbclid") || "",
      ttclid: params.get("ttclid") || "", ref: params.get("ref") || "" });
  } else {
    nlApiFogo({ acao: "retorno" });
  }

  document.getElementById("nl-texto").addEventListener("keydown", function(ev){
    if(ev.key === "Enter"){ nlEnviarTexto(); }
  });

  var hora = new Date().getHours();
  var periodo = "Boa noite";
  if(hora >= 5 && hora < 12){ periodo = "Bom dia"; }
  else if(hora >= 12 && hora < 18){ periodo = "Boa tarde"; }
  var saudacoes = [ periodo + "! Posso te ajudar?", periodo + "! Precisa de ajuda?", periodo + "! Alguma dúvida?" ];
  document.getElementById("nl-teaser-txt").innerHTML = saudacoes[Math.floor(Math.random()*saudacoes.length)];

  setTimeout(function(){
    document.getElementById("nl-bolha").style.display = "block";
    setTimeout(function(){
      if(!NL.aberto){ document.getElementById("nl-teaser").style.display = "block"; }
    }, 600);
  }, 3000);
}

// Blindagem: funciona carregando antes OU depois da pagina abrir
(function(){
  function nlIniciarTudo(){
    nlMontarWidget();
    nlBootWidget();
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", nlIniciarTudo);
  } else {
    nlIniciarTudo();
  }
})();
