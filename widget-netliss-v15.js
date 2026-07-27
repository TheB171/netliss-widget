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
est.textContent = ["","  :root{","    --fundo:#05060d;","    --vidro:rgba(15,19,34,.72);","    --vidro-claro:rgba(255,255,255,.055);","    --borda:rgba(255,255,255,.09);","    --neon:#C6F43F;","    --neon2:#9CCB1E;","    --rosa:#ff3d8a;","    --laranja:#ff8a3d;","    --texto:#f4f6ff;","    --suave:#8b90a8;","    --grad-neon:linear-gradient(135deg,#D5FA66,#A9D51F);","    --fonte-display:'Montserrat',sans-serif;","    --fonte:'Inter',system-ui,sans-serif;","  }","  #nl-moldura *, #nl-bolha *, #nl-teaser *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}","  #nl-moldura, #nl-bolha, #nl-teaser{font-family:var(--fonte);color:var(--texto)}","  @media (prefers-reduced-motion: reduce){","    #nl-bolha{animation:none !important}","  }","","  /* ===== BALÃO ===== */","  #nl-bolha{","    position:fixed;right:22px;bottom:22px;z-index:999990;","    width:72px;height:72px;cursor:pointer;display:none;border:none;background:none;","    filter:drop-shadow(0 8px 22px rgba(0,0,0,.55)) drop-shadow(0 0 16px rgba(198,244,63,.35));","    transition:transform .2s ease;","    animation:flutuar 3.2s ease-in-out infinite;","  }","  #nl-bolha:hover{transform:scale(1.08)}","  #nl-bolha img{width:100%;height:100%;object-fit:contain}","  @keyframes flutuar{0%,100%{translate:0 0}50%{translate:0 -5px}}","","  /* teaser */","  #nl-teaser{","    position:fixed;right:104px;bottom:36px;z-index:999989;max-width:250px;","    background:var(--vidro);backdrop-filter:blur(16px);","    border:1px solid rgba(198,244,63,.35);border-radius:18px 18px 4px 18px;","    padding:14px 16px;font-size:13.5px;line-height:1.5;display:none;cursor:pointer;","    box-shadow:0 12px 34px rgba(0,0,0,.5), 0 0 20px rgba(198,244,63,.12);","  }","  #nl-teaser b{color:var(--neon)}","  #nl-teaser .fechar{position:absolute;top:-9px;left:-9px;width:22px;height:22px;border-radius:50%;","    background:#0f1322;border:1px solid var(--borda);color:var(--suave);","    display:flex;align-items:center;justify-content:center;font-size:11px}","","  /* ===== JANELA ===== */","  #nl-moldura{","    position:fixed;right:20px;bottom:20px;z-index:999995;display:none;","    width:min(392px, calc(100vw - 40px));height:min(640px, calc(100vh - 40px));","    border-radius:28px;padding:1.5px;","    background:linear-gradient(160deg, rgba(198,244,63,.75), rgba(198,244,63,.08) 30%, rgba(255,61,138,.10) 70%, rgba(255,61,138,.55));","    box-shadow:0 30px 80px rgba(0,0,0,.65), 0 0 46px rgba(198,244,63,.14);","  }","  #nl-chat{","    width:100%;height:100%;border-radius:26.5px;overflow:hidden;","    background:var(--vidro);backdrop-filter:blur(22px);","    display:flex;flex-direction:column;","  }","  @media (max-width:520px){","    #nl-moldura{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0;padding:0}","    #nl-chat{border-radius:0}","    #nl-moldura .msg{max-width:88%;font-size:15px;line-height:1.6;padding:12px 15px}","    #nl-moldura .chip{padding:12px 18px;font-size:14.5px;min-height:44px}","    #nl-moldura .card,#nl-moldura .form{max-width:94%;width:94%}","    #nl-moldura .card .desc{font-size:13px}","    #nl-moldura .nl-pill{min-height:48px}","    #nl-corpo{padding:16px 12px}","  }","  /* diagramação dos textos dentro das bolhas */","  #nl-moldura .msg br + br{content:'';display:block;margin-top:6px}","  #nl-moldura .msg{overflow-wrap:break-word;word-break:break-word;hyphens:auto}","","  #nl-moldura .nl-topo{","    display:flex;align-items:center;gap:12px;padding:14px 18px;flex-shrink:0;","    background:linear-gradient(180deg, rgba(255,255,255,.05), transparent);","    border-bottom:1px solid var(--borda);","  }","  #nl-moldura .nl-topo img{width:46px;height:46px;object-fit:contain}","  #nl-moldura .nl-topo .nome{font-weight:700;font-size:16px;font-family:var(--fonte-display);letter-spacing:.3px}","  #nl-moldura .nl-topo .status{font-size:11.5px;color:var(--neon);display:flex;align-items:center;gap:5px}","  #nl-moldura .nl-topo .status::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--neon);","    box-shadow:0 0 8px rgba(198,244,63,.9);display:inline-block}","  #nl-moldura .nl-topo .acoes{margin-left:auto;display:flex;gap:6px}","  #nl-moldura .nl-topo button{","    background:var(--vidro-claro);border:1px solid var(--borda);color:var(--suave);","    width:32px;height:32px;border-radius:10px;cursor:pointer;font-size:14px","  }","  #nl-moldura .nl-topo button:hover{color:var(--texto);border-color:rgba(255,255,255,.25)}","","  #nl-corpo{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}","  #nl-corpo::-webkit-scrollbar{width:5px}","  #nl-corpo::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:99px}","","  #nl-moldura .msg{max-width:82%;padding:11px 15px;border-radius:18px;font-size:14px;line-height:1.55;","    animation:surgir .28s cubic-bezier(.2,.8,.3,1);word-wrap:break-word}","  @keyframes surgir{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}","  #nl-moldura .msg.liss{","    background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px 18px 18px 6px;align-self:flex-start;","    box-shadow:0 4px 16px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.06);","  }","  #nl-moldura .msg.user{","    background:var(--grad-neon);color:#04120a;font-weight:500;","    border-radius:18px 18px 6px 18px;align-self:flex-end;","    box-shadow:0 6px 18px rgba(198,244,63,.25), inset 0 1px 0 rgba(255,255,255,.4);","  }","  #nl-moldura .msg b{color:var(--neon)}","  #nl-moldura .msg.user b{color:#04120a}","  #nl-moldura .msg i{color:var(--suave);font-size:12.5px}","","  #nl-moldura .sistema{","    align-self:center;font-size:11px;color:var(--suave);","    border:1px dashed rgba(255,255,255,.15);border-radius:99px;padding:5px 12px;margin:2px 0;","    background:rgba(0,0,0,.2)","  }","  #nl-moldura .sistema b{color:var(--rosa)}","","  #nl-moldura .chips{display:flex;flex-wrap:wrap;gap:8px;align-self:flex-start;max-width:92%;animation:surgir .28s ease}","  #nl-moldura .chip{","    background:var(--vidro-claro);backdrop-filter:blur(8px);","    border:1px solid rgba(198,244,63,.5);color:var(--neon);","    border-radius:99px;padding:10px 17px;font-size:13.5px;font-weight:600;cursor:pointer;","    font-family:var(--fonte);transition:all .16s ease;","  }","  #nl-moldura .chip:hover{background:var(--grad-neon);color:#04120a;border-color:transparent;","    box-shadow:0 0 18px rgba(198,244,63,.35);transform:translateY(-1px)}","  #nl-moldura .chip.secundario{border-color:var(--borda);color:var(--suave)}","  #nl-moldura .chip.secundario:hover{background:rgba(255,255,255,.1);color:var(--texto);box-shadow:none}","","  #nl-moldura .card{","    align-self:flex-start;max-width:88%;","    background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px;padding:15px;animation:surgir .28s ease;","    box-shadow:0 6px 20px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.06);","  }","  #nl-moldura .card .titulo{font-weight:700;font-size:14.5px;margin-bottom:4px;font-family:var(--fonte-display)}","  #nl-moldura .card .desc{font-size:12.5px;color:var(--suave);line-height:1.55;margin-bottom:11px}","  #nl-moldura .card .botao{","    display:inline-block;background:var(--grad-neon);color:#04120a;font-weight:700;font-size:13px;","    border:none;border-radius:11px;padding:10px 17px;cursor:pointer;font-family:var(--fonte);","    box-shadow:0 4px 14px rgba(198,244,63,.28), inset 0 1px 0 rgba(255,255,255,.4);","    transition:transform .15s ease;","  }","  #nl-moldura .card .botao:hover{transform:translateY(-1px)}","  #nl-moldura .card .preco{color:var(--neon);font-weight:700;font-size:19px;font-family:var(--fonte-display);","    text-shadow:0 0 16px rgba(198,244,63,.4)}","  #nl-moldura .card.destaque{border-color:rgba(198,244,63,.55);box-shadow:0 0 26px rgba(198,244,63,.16), inset 0 1px 0 rgba(255,255,255,.06)}","  #nl-moldura .tag{display:inline-block;background:var(--grad-neon);color:#04120a;font-size:10px;font-weight:800;","    border-radius:99px;padding:3px 10px;margin-bottom:7px;letter-spacing:.5px}","  #nl-moldura .video-fake{","    width:100%;aspect-ratio:16/9;background:rgba(0,0,0,.45);border-radius:12px;margin-bottom:11px;","    display:flex;align-items:center;justify-content:center;color:var(--suave);font-size:12px;","    border:1px solid var(--borda);cursor:pointer","  }","  #nl-moldura .video-fake .play{width:46px;height:46px;border-radius:50%;background:var(--grad-neon);color:#04120a;","    display:flex;align-items:center;justify-content:center;font-size:16px;margin-right:10px;","    box-shadow:0 0 20px rgba(198,244,63,.4)}","","  #nl-moldura .form{align-self:flex-start;width:88%;background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px;padding:15px;display:flex;flex-direction:column;gap:10px;animation:surgir .28s ease}","  #nl-moldura .form input{","    background:rgba(0,0,0,.35);border:1px solid var(--borda);border-radius:11px;color:var(--texto);","    padding:12px 14px;font-size:14px;outline:none;font-family:var(--fonte)","  }","  #nl-moldura .form input:focus{border-color:rgba(198,244,63,.6);box-shadow:0 0 12px rgba(198,244,63,.15)}","  #nl-moldura .form .botao{background:var(--grad-neon);color:#04120a;font-weight:700;border:none;border-radius:11px;","    padding:12px;cursor:pointer;font-size:14px;font-family:var(--fonte);","    box-shadow:0 4px 14px rgba(198,244,63,.28), inset 0 1px 0 rgba(255,255,255,.4)}","","  #nl-moldura .digitando{display:flex;gap:4px;align-self:flex-start;background:var(--vidro-claro);","    border:1px solid var(--borda);border-radius:18px 18px 18px 6px;padding:14px 17px}","  #nl-moldura .digitando span{width:7px;height:7px;border-radius:50%;background:var(--neon);opacity:.7;animation:pontinho 1.2s infinite}","  #nl-moldura .digitando span:nth-child(2){animation-delay:.15s}","  #nl-moldura .digitando span:nth-child(3){animation-delay:.3s}","  @keyframes pontinho{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}","","  /* barra de digitação */","  #nl-moldura .nl-input{","    display:none;align-items:center;gap:10px;padding:10px 12px 12px;flex-shrink:0;","    border-top:1px solid var(--borda);animation:surgir .3s ease;","  }","  #nl-moldura .nl-input.ativa{display:flex}","  #nl-moldura .nl-pill{","    flex:1;display:flex;align-items:center;gap:8px;","    background:rgba(0,0,0,.35);border:1px solid var(--borda);border-radius:99px;","    padding:6px 8px 6px 16px;min-height:46px;transition:border-color .15s ease;","  }","  #nl-moldura .nl-pill:focus-within{border-color:rgba(198,244,63,.5);box-shadow:0 0 14px rgba(198,244,63,.12)}","  #nl-moldura .nl-pill input{","    flex:1;background:transparent;border:none;outline:none;color:var(--texto);","    font-size:15px;font-family:var(--fonte);min-width:0","  }","  #nl-moldura .nl-pill input::placeholder{color:var(--suave)}","  #nl-moldura .nl-icone{","    width:34px;height:34px;border:none;background:transparent;cursor:pointer;","    display:flex;align-items:center;justify-content:center;border-radius:50%;","    transition:background .15s ease;flex-shrink:0","  }","  #nl-moldura .nl-icone:hover{background:rgba(255,255,255,.08)}","  #nl-moldura .nl-icone img{width:19px;height:19px;object-fit:contain;opacity:.85}","  #nl-enviar{","    width:46px;height:46px;border:none;background:transparent;cursor:pointer;padding:0;flex-shrink:0;","    filter:drop-shadow(0 4px 14px rgba(198,244,63,.35));","    transition:transform .15s ease;","  }","  #nl-enviar:hover{transform:scale(1.07)}","  #nl-enviar img{width:100%;height:100%;object-fit:contain}","","  #nl-moldura .pix-codigo{","    font-size:10.5px;color:var(--suave);background:rgba(0,0,0,.35);border:1px solid var(--borda);","    border-radius:8px;padding:8px 10px;margin-bottom:10px;word-break:break-all;text-align:center","  }","  #nl-encerrar{","    display:none;text-align:center;font-size:12.5px;color:#ff6b6b;font-weight:600;background:rgba(255,61,90,.10);letter-spacing:.2px;","    padding:7px;cursor:pointer;border-top:1px solid var(--borda);flex-shrink:0;","    transition:color .15s ease;","  }","  #nl-encerrar:hover{color:var(--rosa)}","  #nl-moldura .nl-rodape{","    padding:0 14px 10px;font-size:10.5px;color:var(--suave);text-align:center;flex-shrink:0","  }",""].join(String.fromCharCode(10));
document.head.appendChild(est);
var cx = document.createElement('div');
cx.innerHTML = ["<div id='nl-teaser' onclick='nlAbrirChat()'>","  <div class='fechar' onclick='event.stopPropagation();nlFecharTeaser()'>x</div>","  <span id='nl-teaser-txt'></span>","</div>","","<button id='nl-bolha' onclick='nlAbrirChat()' aria-label='Abrir chat'>","  <img src='https://i.imgur.com/xfpgEW4.png' alt='Liss'>","</button>","","<div id='nl-moldura'>","<div id='nl-chat'>","  <div class='nl-topo'>","    <img src='https://i.imgur.com/xfpgEW4.png' alt='Liss'>","    <div>","      <div class='nome'>Liss</div>","      <div class='status'>Online agora</div>","    </div>","    <div class='acoes'>","      <button onclick='nlReiniciar()' title='Reiniciar conversa'>R</button>","      <button onclick='nlFecharChat()' title='Minimizar'>_</button>","    </div>","  </div>","  <div id='nl-corpo'></div>","  <div id='nl-encerrar' onclick='nlEncerrar()'>Encerrar atendimento</div>","  <div class='nl-input'>","    <div class='nl-pill'>","      <input id='nl-texto' type='text' placeholder='Digite sua mensagem' maxlength='500'>","      <button class='nl-icone' title='Anexar arquivo' onclick='nlDemoAnexo()'><img src='https://i.imgur.com/520dz0b.png' alt=''></button>","      <button class='nl-icone' title='Enviar áudio' onclick='nlAudio()'><img src='https://i.imgur.com/BAbFWEj.png' alt=''></button>","    </div>","    <button id='nl-enviar' onclick='nlEnviarTexto()' title='Enviar'><img src='https://i.imgur.com/1gFtuSA.png' alt='Enviar'></button>","  </div>","  <div class='nl-rodape'>Atendimento Netliss &middot; <b id='nl-id-visual'></b></div>","</div>","</div>"].join(String.fromCharCode(10));
document.body.appendChild(cx);
}


// ================================================================
//  NETLISS — LOGICA DO WIDGET v4 (externo)
//  100% sem barra invertida em strings (compativel GreatPages)
// ================================================================

var CFG = {
  webhook: "https://hook.us2.make.com/7utigfgghdla4j4loav3fu2leopdwp3o",
  playStore: "https://play.google.com/store/apps/details?id=com.netlissbrasil.pro",
  videoTeste: "https://www.youtube-nocookie.com/embed/3LFpGP8JDh8",
  planos: {
    "BASICO": { id: 6, nome: "Netliss BÁSICO", preco: "R$ 24,90", desc: "Plano mensal · 1 pessoa · Pix" },
    "TOP":    { id: 7, nome: "Netliss TOP", preco: "R$ 59,90", desc: "3 meses · até 2 pessoas · cerca de R$ 9,98 por pessoa/mês" },
    "VIP":    { id: 8, nome: "Netliss VIP", preco: "R$ 99,90", desc: "6 meses · até 3 pessoas · cerca de R$ 5,55 por pessoa/mês" }
  },
  legendaPost: "Dá pra ter internet ilimitada no celular? Dá sim! Eu uso a @netlissbr — faz um teste grátis lá e me conta depois... #internetparacelular #netlissbr",
  ttlId: 3153600000000,
  ttlTicket: 86400000
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
  var id = "NL-" + Date.now().toString(36) + "-";
  for(var i=0;i<6;i++){ id += chars.charAt(Math.floor(Math.random()*chars.length)); }
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
  nlRotaConexao();
}
function nlRotaConexao(){
  nlMsgLiss("Que bom ter você aqui, <b>" + nlEscapar(NL.nome) + "</b>!<br><br>A Netliss é <b>internet ilimitada</b> para o seu celular, através do nosso aplicativo. Nós não usamos os seus créditos nem a internet da sua operadora — a nossa internet vem dos nossos próprios servidores.<br><br>Mas, para que isso aconteça, os requisitos mínimos que vou te passar precisam ser cumpridos rigorosamente. Se forem cumpridos, o aplicativo conecta; se não forem, ele não consegue se conectar.", function(){
    nlChips([
      { rotulo:"Concordo, continuar", acao:nlPergSistema }
    ]);
  });
}
function nlPergSistema(){
  nlMsgUser("Concordo, continuar");
  nlMsgLiss("Qual é o <b>sistema operacional</b> do seu celular?", function(){
    nlChips([
      { rotulo:"Android", acao:function(){ nlApiFogo({acao:"nome", sistema:"Android"}); nlNovoAndroid(); } },
      { rotulo:"iPhone (iOS)", acao:function(){ nlApiFogo({acao:"nome", sistema:"iOS"}); nlNovoIos(); } }
    ]);
  });
}

var REGRAS = {
  "TIM|PRE": { tipo:"ok", texto:"<b>TIM Pré-pago</b> está funcionando muito bem com a Netliss!<br><br>Manter o saldo com a operadora <b>válido</b> (dentro da validade) faz a conexão funcionar com mais facilidade.<br><br>Com a validade do saldo expirada, ainda funciona, mas com mais dificuldade — às vezes você vai precisar ativar e desativar o <b>modo avião</b> e testar todas as opções da TIM no aplicativo até conectar.<br><br>Um detalhe importante: se o saldo estiver expirado e o aplicativo ficar procurando rede utilizável sem conectar — mesmo fazendo o modo avião e testando todas as opções — é sinal de que a sua <b>rota de conexão</b> não está funcionando; portanto, chegou a hora de fazer uma recarga para o aplicativo voltar a funcionar." },
  "TIM|POS": { tipo:"ok", texto:"<b>TIM Pós-pago / Controle</b> funciona muito bem com a Netliss!<br><br>Só existe uma regra de ouro: mantenha os pagamentos da operadora <b>em dia</b>. Se a fatura atrasar ou você parar de pagar, a operadora pode suspender a rota de conexão — e o aplicativo para de conectar.<br><br>E uma <b>dica de economia</b>: como a Netliss não depende da internet da sua operadora, você pode migrar para o plano mais barato que ela oferecer — o suficiente para manter a rota de conexão ativa. A economia praticamente paga a Netliss, e a sua internet ilimitada continua vindo da gente." },
  "Vivo|PRE": { tipo:"sugestao", texto:"Honestamente? O <b>Vivo Pré-pago</b> tem funcionado com muita dificuldade e pode te dar dor de cabeça. Você pode fazer o teste grátis e ver como vai funcionar — pode ser que funcione ou não, mas você é quem vai saber.<br><br>Se você puder, talvez a <b>TIM</b> ou a <b>Intercel</b> sejam melhores para você. Quer conhecer?" },
  "Vivo|POS": { tipo:"ok", texto:"<b>Vivo Pós-pago / Controle</b> funciona muito bem com a Netliss!<br><br>Só existe uma regra de ouro: mantenha os pagamentos da operadora <b>em dia</b>. Se a fatura atrasar ou você parar de pagar, a operadora pode suspender a rota de conexão — e o aplicativo para de conectar.<br><br>E uma <b>dica de economia</b>: como a Netliss não depende da internet da sua operadora, você pode migrar para o plano mais barato que ela oferecer — o suficiente para manter a rota de conexão ativa. A economia praticamente paga a Netliss, e a sua internet ilimitada continua vindo da gente." },
  "Claro|POS": { tipo:"ok", texto:"" },
  "Intercel|PRE": { tipo:"ok", texto:"<b>Intercel</b> funciona muito bem com a Netliss! As regras são as mesmas da TIM: no <b>pré-pago</b>, manter o saldo dentro da validade faz a conexão funcionar com mais facilidade (com a validade expirada, funciona com mais dificuldade — modo avião e testar as opções até conectar); no <b>pós-pago</b>, mantenha os pagamentos em dia para a rota de conexão não ser suspensa.<br><br>E um detalhe importante: no nosso aplicativo <b>não existem opções com o nome Intercel</b> — como ela usa a rede da Vivo, é só usar as opções da <b>VIVO</b> no app." + '<br><br>E uma <b>dica de economia</b>: como a Netliss não depende da internet da sua operadora, você pode migrar para o plano mais barato que ela oferecer — o suficiente para manter a rota de conexão ativa. A economia praticamente paga a Netliss, e a sua internet ilimitada continua vindo da gente.' },
  "Intercel|POS": { tipo:"ok", texto:"<b>Intercel</b> funciona muito bem com a Netliss! As regras são as mesmas da TIM: no <b>pré-pago</b>, manter o saldo dentro da validade faz a conexão funcionar com mais facilidade; no <b>pós-pago</b>, mantenha os pagamentos em dia para a rota de conexão não ser suspensa.<br><br>E um detalhe importante: no nosso aplicativo <b>não existem opções com o nome Intercel</b> — como ela usa a rede da Vivo, é só usar as opções da <b>VIVO</b> no app." + '<br><br>E uma <b>dica de economia</b>: como a Netliss não depende da internet da sua operadora, você pode migrar para o plano mais barato que ela oferecer — o suficiente para manter a rota de conexão ativa. A economia praticamente paga a Netliss, e a sua internet ilimitada continua vindo da gente.' }
};

function nlNovoAndroid(){
  nlMsgLiss("Show! Agora me diz: qual é a sua <b>operadora</b>?", function(){
    nlChips([
      { rotulo:"TIM", acao:function(){ nlAndroidModalidade("TIM"); } },
      { rotulo:"Vivo", acao:function(){ nlAndroidModalidade("Vivo"); } },
      { rotulo:"Claro", acao:nlClaroTela }
    ]);
  });
}
function nlClaroTela(){
  NL.op = "Claro"; NL.mod = "POS";
  nlApiFogo({ acao:"nome", operadora:"Claro" });
  nlMsgLiss("Com a <b>Claro</b>, a Netliss funciona somente no <b>Pós-pago ou Controle</b> — no Claro Pré-pago não funciona de jeito nenhum.<br><br>E mesmo no Pós-pago / Controle, alguns clientes têm relatado mais oscilação do que nas outras operadoras. Por isso o <b>teste grátis</b> é essencial: você avalia como fica antes de pagar qualquer coisa.<br><br>Só existe uma regra de ouro: mantenha os pagamentos da operadora <b>em dia</b>. Se a fatura atrasar ou você parar de pagar, a operadora pode suspender a rota de conexão — e o aplicativo para de conectar.<br><br>E uma <b>dica de economia</b>: como a Netliss não depende da internet da sua operadora, você pode migrar para o plano mais barato que ela oferecer — o suficiente para manter a rota de conexão ativa. A economia praticamente paga a Netliss, e a sua internet ilimitada continua vindo da gente.<br><br>Se você puder, talvez a <b>TIM</b> ou a <b>Intercel</b> sejam melhores para você. Quer conhecer?", function(){
    nlChips([
      { rotulo:"Entendido, fazer o teste", acao:nlPassoApp },
      { rotulo:"Conhecer a TIM", acao:nlConhecerTim },
      { rotulo:"Conhecer a Intercel", acao:nlConhecerIntercel }
    ]);
  });
}
function nlAndroidModalidade(operadora){
  NL.op = operadora;
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
    else {
      nlChips([
        { rotulo:"Conhecer a TIM", acao:nlConhecerTim },
        { rotulo:"Conhecer a Intercel", acao:nlConhecerIntercel },
        { rotulo:"Quero testar mesmo assim", acao:nlPassoApp }
      ]);
    }
  });
}
function nlConhecerTim(){
  nlMsgUser("Conhecer a TIM");
  NL.op = "TIM";
  nlMsgLiss("Boa escolha! A <b>TIM</b> funciona muito bem com a Netliss, no pré e no pós-pago, e você encontra o chip em qualquer loja ou banca por poucos reais.<br><br>Qual é a modalidade do seu chip TIM?", function(){
    nlChips([
      { rotulo:"Pré-pago", acao:function(){ nlAndroidRegras("TIM", "PRE"); } },
      { rotulo:"Pós-pago ou Controle", acao:function(){ nlAndroidRegras("TIM", "POS"); } },
      { rotulo:"Ainda não tenho", acao:function(){ nlMsgLiss("Sem problema! Compra um chip TIM (pré ou pós), coloca no seu aparelho e volta aqui para fazer o seu teste grátis. Te espero!", function(){ nlChips([{ rotulo:"Já tenho, continuar", acao:nlNovoAndroid }]); }); } }
    ]);
  });
}
function nlConhecerIntercel(){
  nlMsgUser("Conhecer a Intercel");
  nlMsgLiss("A <b>Intercel</b> é a operadora digital do <b>Banco Inter</b>. Ela usa a rede da Vivo e tem planos a partir de <b>R$17 por mês</b> — e funciona muito bem com a Netliss, tanto no pré quanto no pós-pago.<br><br>Você pode pedir um chip físico ou até um <b>chip virtual (eSIM)</b> direto pelo aplicativo do Inter, colocar para funcionar no seu telefone e voltar aqui para fazer o seu teste grátis.", function(){
    nlChips([
      { rotulo:"Já tenho Intercel, testar", acao:nlIntercelModalidade },
      { rotulo:"Conhecer a TIM", acao:nlConhecerTim },
      { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
    ]);
  });
}
function nlIntercelModalidade(){
  NL.op = "Intercel";
  nlMsgLiss("Show! E qual é a modalidade do seu chip <b>Intercel</b>?", function(){
    nlChips([
      { rotulo:"Pré-pago", acao:function(){ nlAndroidRegras("Intercel", "PRE"); } },
      { rotulo:"Pós-pago ou Controle", acao:function(){ nlAndroidRegras("Intercel", "POS"); } }
    ]);
  });
}

function nlPassoApp(){
  nlMsgLiss("Primeiro passo: baixar o nosso aplicativo oficial na Play Store. Aproveita para dar uma olhada nas <b>avaliações</b> de quem já é nosso cliente — elas falam por nós:", function(){
    nlCard("<div class='titulo'>Aplicativo Netliss</div>" +
      "<div class='desc'>Baixe e instale no seu Android e veja as avaliações de quem já usa.</div>" +
      "<button class='botao' onclick='nlAposDownload()'>Baixar na Play Store</button>");
  });
}
function nlAposDownload(){
  nlMsgUser("Baixar aplicativo");
  window.open(CFG.playStore, "_blank");
  nlMsgLiss("Segundo passo: agora assiste esse vídeo rapidinho — ele mostra <b>como se conectar</b> em minutos. Seu teste é liberado logo depois:", function(){
    nlCard("<div style='position:relative;padding-bottom:56%;height:0;border-radius:12px;overflow:hidden;margin-bottom:11px;border:1px solid rgba(255,255,255,.09)'><iframe src='" + CFG.videoTeste + "' style='position:absolute;top:0;left:0;width:100%;height:100%;border:0' title='Como fazer o teste' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>" +
      "<button class='botao' onclick='nlGerarTeste()'>Já assisti, receber teste</button>");
  });
}
async function nlGerarTeste(){
  nlMsgUser("Já assisti, receber teste");
  nlDigitar(async function(){
    var r = await nlApi({ acao:"teste", operadora: NL.op || "", modalidade: NL.mod || "" });
    if(r && r.limite){
      nlMsgLiss("<b>" + nlEscapar(NL.nome || "Tudo bem") + "</b>, eu já liberei para você os <b>3 testes grátis</b> que cada cliente tem direito — a nossa missão de te deixar experimentar bem a Netliss foi cumprida. Por isso, não consigo liberar um novo teste.<br><br>Se você gostou e quer continuar com internet ilimitada, o caminho agora é contratar um plano. A partir daqui, a decisão — e a responsabilidade — é toda sua.", function(){
        nlChips([
          { rotulo:"Ver os planos", acao:nlMostrarPlanos },
          { rotulo:"Quero revender", acao:nlRevenda }
        ]);
      });
      return;
    }
    if(r && r.usuario && r.usuario !== "undefined"){
      NL.copiaUser = r.usuario; NL.copiaSenha = r.senha;
      var trata = NL.nome ? ", <b>" + nlEscapar(NL.nome) + "</b>" : "";
      nlMsgLiss("Prontinho" + trata + "! <b>Seu teste grátis está liberado:</b><br><br>Usuário: <b>" + nlEscapar(r.usuario) + "</b><br>Senha: <b>" + nlEscapar(r.senha) + "</b><br>Validade: <b>" + nlEscapar(r.validade_horas) + " hora</b><br><br><button class='chip' onclick='nlCopiarCred(0,this)'>Copiar usuário</button> <button class='chip' onclick='nlCopiarCred(1,this)'>Copiar senha</button><br><br>É só colocar usuário e senha no aplicativo e testar as opções da sua operadora para se conectar. Qualquer dúvida, reveja o vídeo ou fale conosco.", function(){
        nlChips([
          { rotulo:"Quero contratar", acao:nlMostrarPlanos },
          { rotulo:"Quero revender", acao:nlRevenda },
          { rotulo:"Preciso de ajuda", acao:nlIrParaLiss }
        ]);
      });
    } else {
      nlMsgLiss("Opa, tive um probleminha para gerar o seu teste agora. Por favor, tente novamente — e se não der certo, reporta o erro para a gente que a equipe resolve.", function(){
        nlChips([
          { rotulo:"Tentar novamente", acao:nlGerarTeste },
          { rotulo:"Reportar erro", acao:nlReportarErro }
        ]);
      });
    }
  }, 400);
}
function nlReportarErro(){
  nlMsgUser("Reportar erro");
  nlApiFogo({ acao:"reportar_erro", assunto:"Falha ao gerar teste grátis", operadora: NL.op || "", modalidade: NL.mod || "" });
  nlMsgLiss("Erro reportado! Nossa equipe técnica já foi avisada e vai resolver. Tente novamente mais tarde para gerar o seu teste. Obrigada por avisar!", function(){
    nlChips([
      { rotulo:"Tentar novamente", acao:nlGerarTeste },
      { rotulo:"Ver os planos", acao:nlMostrarPlanos }
    ]);
  });
}

// ---------------- iOS ----------------
function nlNovoIos(){
  nlMsgLiss("No <b>iPhone</b> funciona assim: o teste grátis, a contratação e o suporte são feitos pelo nosso <b>WhatsApp</b>, com a nossa equipe — rapidinho e sem custo nenhum.<br><br>Hoje o iPhone funciona com <b>TIM</b> (pré ou pós-pago) e <b>Vivo Pós-pago</b>. Qual é a sua operadora?", function(){
    nlChips([
      { rotulo:"TIM", acao:function(){ NL.op = "TIM"; nlIosTimMod(); } },
      { rotulo:"Vivo", acao:nlIosVivo }
    ]);
  });
}
function nlIosVivo(){
  NL.op = "Vivo"; NL.mod = "POS";
  nlMsgLiss("No iPhone, a <b>Vivo</b> funciona no <b>Pós-pago ou Controle</b>.<br><br><b>Vivo Pós-pago / Controle</b> funciona muito bem com a Netliss! Só existe uma regra de ouro: mantenha os pagamentos da operadora <b>em dia</b>. Se a fatura atrasar ou você parar de pagar, a operadora pode suspender a rota de conexão — e o aplicativo para de conectar.<br><br>Tudo certo com essas condições? Posso pedir para a equipe liberar o seu teste?", function(){
    nlChips([
      { rotulo:"Sim, pode liberar", acao:nlIosOk },
      { rotulo:"Tenho outro chip", acao:nlNovoIos }
    ]);
  });
}
function nlIosTimMod(){
  nlMsgLiss("E o seu chip <b>TIM</b> é de qual modalidade?", function(){
    nlChips([
      { rotulo:"Pré-pago", acao:function(){ NL.mod = "PRE"; nlIosTimPre(); } },
      { rotulo:"Pós-pago ou Controle", acao:function(){ NL.mod = "POS"; nlIosTimPos(); } }
    ]);
  });
}
function nlIosTimPos(){
  nlMsgLiss("<b>TIM Pós-pago / Controle</b> funciona muito bem com a Netliss! Só existe uma regra de ouro: mantenha os pagamentos da operadora <b>em dia</b>. Se a fatura atrasar ou você parar de pagar, a operadora pode suspender a rota de conexão — e o aplicativo para de conectar.<br><br>Tudo certo com essas condições? Posso pedir para a equipe liberar o seu teste?", function(){
    nlChips([
      { rotulo:"Sim, pode liberar", acao:nlIosOk },
      { rotulo:"Tenho outro chip", acao:nlNovoIos }
    ]);
  });
}
function nlIosTimPre(){
  nlMsgLiss("<b>TIM Pré-pago</b> está funcionando muito bem com a Netliss!<br><br>Manter o saldo <b>válido</b> (dentro da validade) faz a conexão funcionar com mais facilidade. Com a validade expirada, ainda funciona, mas com mais dificuldade — às vezes é preciso ativar e desativar o <b>modo avião</b> e testar até conectar. E se, com o saldo expirado, o app só ficar tentando conectar, é sinal de que chegou a hora de fazer uma recarga.<br><br>E um aviso importante, na maior honestidade: o <b>TIM Pré-pago no iPhone é uma liberação recente</b>. Está funcionando bem, mas pode parar a qualquer momento — e se isso acontecer, a solução será migrar para o <b>TIM Pós-pago</b>. Você pode testar e contratar sabendo disso, combinado?<br><br>Posso pedir para a equipe liberar o seu teste?", function(){
    nlChips([
      { rotulo:"Sim, pode liberar", acao:nlIosOk },
      { rotulo:"Tenho outro chip", acao:nlNovoIos }
    ]);
  });
}
function nlIosOk(){
  nlMsgLiss("Perfeito! Preenche seus dados que nossa equipe te chama no <b>WhatsApp</b> para liberar o seu teste grátis:", function(){
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
  nlMsgLiss("Preencha os dados abaixo para gerar o seu <b>código PIX</b>:<br><br><i>A exigência do CPF nas cobranças por PIX cumpre a Resolução BCB nº 1/2020 do Banco Central, garantindo a rastreabilidade das transações para prevenir lavagem de dinheiro ou fraudes.</i>", function(){
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
    var acaoPg = (NL.modoRenov && NL.contaRenov) ? "pagamento_renovar" : "pagamento_criar";
    var corpo = { acao: acaoPg, metodo:"pix", plan_id: p.id, nome: NL.pgNome, email: NL.pgEmail, cpf: NL.pgCpf };
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
          { rotulo:"Pagar com cartão", acao:nlFormCartao }
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
      NL.vendaUser = s.username || NL.copiaUser || ""; NL.vendaPlano = plano.nome;
      nlApiFogo({ acao:"venda", plano: plano.nome, valor: plano.preco, usuario: NL.vendaUser, metodo: NL.metodoPg || "pix" });
      var cred = "";
      if(s.username && s.password){
        NL.copiaUser = s.username; NL.copiaSenha = s.password;
        cred = "<br><br>Usuário: <b>" + nlEscapar(s.username) + "</b><br>Senha: <b>" + nlEscapar(s.password) + "</b><br><br><button class='chip' onclick='nlCopiarCred(0,this)'>Copiar usuário</button> <button class='chip' onclick='nlCopiarCred(1,this)'>Copiar senha</button><br><br><b>Muito importante:</b> anote e guarde essas credenciais em um local seguro. A Netliss não armazena usuário e senha — se você perder, não conseguimos recuperar.";
      } else {
        cred = "<br><br>Suas credenciais chegam no seu e-mail <b>" + nlEscapar(NL.pgEmail) + "</b> em instantes. Guarde com carinho: a Netliss não armazena usuário e senha.";
      }
      nlMsgLiss("<b>Pagamento aprovado!</b> Seja bem-vindo(a) à família Netliss!" + cred, function(){
        nlPosCompra();
      });
    }
    if(s.status === "rejected" || s.status === "declined" || s.status === "refused"){
      clearInterval(NL.pollTimer);
      nlMsgLiss("A operadora do cartão <b>recusou</b> o pagamento. Isso costuma ser limite, dados digitados errados ou bloqueio do banco — não é problema na Netliss. Quer tentar de novo?", function(){
        nlChips([
          { rotulo:"Tentar outro cartão", acao:nlFormDadosCartao },
          { rotulo:"Pagar com PIX", acao:nlFormPix },
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
  nlMsgLiss("Perfeito! Preencha os dados abaixo para pagar com <b>cartão de crédito</b>:<br><br><i>A exigência do CPF nas cobranças cumpre a Resolução BCB nº 1/2020 do Banco Central, garantindo a rastreabilidade das transações para prevenir lavagem de dinheiro ou fraudes. O número do cartão você digita em ambiente protegido pelo Mercado Pago — ele nunca passa pela Netliss.</i>", function(){
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
  nlFormDadosCartao();
}
function nlFormDadosCartao(){
  nlMsgLiss("Agora os dados do <b>cartão</b>. Eles são protegidos pelo Mercado Pago — a Netliss não vê nem guarda o número do seu cartão:", function(){
    nlForm("<input id='nl-cc-num' type='tel' placeholder='Número do cartão' maxlength='19'>" +
           "<input id='nl-cc-nome' type='text' placeholder='Nome impresso no cartão' maxlength='40'>" +
           "<input id='nl-cc-val' type='tel' placeholder='Validade (MM/AA)' maxlength='5'>" +
           "<input id='nl-cc-cvv' type='tel' placeholder='CVV (código de segurança)' maxlength='4'>" +
           "<button class='botao' onclick='nlTokenizarEPagar()'>Pagar agora</button>");
  });
}
function nlCarregarMp(cb){
  if(window.MercadoPago){ cb(true); return; }
  var s = document.createElement("script");
  s.src = "https://sdk.mercadopago.com/js/v2";
  s.onload = function(){ cb(true); };
  s.onerror = function(){ cb(false); };
  document.head.appendChild(s);
}
function nlAcharChave(obj, chave, prof){
  if(!obj || typeof obj !== "object" || prof > 6){ return null; }
  if(obj[chave]){ return obj[chave]; }
  for(var k in obj){
    var achado = nlAcharChave(obj[k], chave, (prof || 0) + 1);
    if(achado){ return achado; }
  }
  return null;
}
function nlTokenizarEPagar(){
  var num = nlSoNumeros(document.getElementById("nl-cc-num").value);
  var titular = document.getElementById("nl-cc-nome").value.trim();
  var val = document.getElementById("nl-cc-val").value.trim();
  var cvv = nlSoNumeros(document.getElementById("nl-cc-cvv").value);
  if(num.length < 13){ alert("Confira o número do cartão"); return; }
  if(titular.length < 5){ alert("Digite o nome impresso no cartão"); return; }
  var partes = val.split("/");
  if(partes.length !== 2 && val.length === 4){ partes = [val.substring(0,2), val.substring(2,4)]; }
  if(partes.length !== 2 || partes[0].length !== 2){ alert("Validade no formato MM/AA"); return; }
  if(cvv.length < 3){ alert("Confira o CVV"); return; }
  var mes = partes[0];
  var ano = partes[1].length === 2 ? "20" + partes[1] : partes[1];
  nlMsgUser("Cartão final " + num.substring(num.length - 4));
  nlDigitar(async function(){
    var m = await nlApi({ acao:"metodos" });
    var chave = m ? nlAcharChave(m, "mp_public_key", 0) : null;
    if(!chave){
      nlMsgLiss("Não consegui iniciar o ambiente seguro do cartão agora. Você pode tentar mais tarde ou pagar pelo <b>PIX</b>, que está funcionando perfeitamente. Qual você prefere?", function(){
        nlChips([{ rotulo:"Tentar novamente", acao:nlFormDadosCartao }, { rotulo:"Pagar com PIX", acao:nlFormPix }]);
      });
      return;
    }
    nlCarregarMp(function(carregou){
      if(!carregou || !window.MercadoPago){
        nlMsgLiss("O ambiente seguro do cartão não carregou (pode ser bloqueador de anúncios ou conexão). Quer tentar de novo ou ir de PIX?", function(){
          nlChips([{ rotulo:"Tentar de novo", acao:nlFormDadosCartao }, { rotulo:"Pagar com PIX", acao:nlFormPix }]);
        });
        return;
      }
      try{
        var mp = new MercadoPago(chave);
        mp.createCardToken({
          cardNumber: num,
          cardholderName: titular,
          cardExpirationMonth: mes,
          cardExpirationYear: ano,
          securityCode: cvv,
          identificationType: "CPF",
          identificationNumber: NL.pgCpf
        }).then(function(t){
          if(t && t.id){ nlPagarCartao(t.id); }
          else { nlErroCartao("não consegui validar os dados do cartão"); }
        }).catch(function(){
          nlErroCartao("os dados do cartão não passaram na validação — confere número, validade e CVV");
        });
      }catch(e){
        nlErroCartao("houve um erro ao proteger os dados do cartão");
      }
    });
  }, 300);
}
function nlErroCartao(motivo){
  nlMsgLiss("Opa: " + motivo + ".<br>Vamos tentar de novo?", function(){
    nlChips([
      { rotulo:"Tentar novamente", acao:nlFormDadosCartao },
      { rotulo:"Tentar outro cartão", acao:nlFormDadosCartao },
      { rotulo:"Pagar com PIX", acao:nlFormPix }
    ]);
  });
}
function nlPagarCartao(tokenCartao){
  nlDigitar(async function(){
    var p = CFG.planos[NL.planoAtual];
    var acaoPg = (NL.modoRenov && NL.contaRenov) ? "pagamento_renovar" : "pagamento_criar";
    var corpo = { acao: acaoPg, metodo:"credit_card", card_token: tokenCartao, plan_id: p.id, nome: NL.pgNome, email: NL.pgEmail, cpf: NL.pgCpf };
    if(NL.modoRenov && NL.contaRenov){ corpo.account_id = NL.contaRenov; }
    NL.metodoPg = "credit_card";
    var r = await nlApi(corpo);
    if(r && r.success && r.payment_id){
      nlMsgLiss("Pagamento do <b>" + p.nome + "</b> enviado! Estou aguardando a aprovação da operadora do cartão — costuma levar poucos segundos. Assim que aprovar, te entrego o acesso <b>aqui mesmo</b>.", function(){
        nlIniciarPolling(r.payment_id, p);
      });
    } else {
      var msgErro = (r && r.message) ? nlEscapar(r.message) : "tive uma instabilidade para iniciar o pagamento";
      nlErroCartao(msgErro);
    }
  }, 400);
}

// ---------------- PROGRAMA DE RECOMPENSAS ----------------
function nlPosCompra(){
  nlMsgLiss("Agora que você faz parte da família, quer <b>ganhar dias grátis</b> ou <b>mais um acesso</b>? É simples: poste sobre a Netliss no Instagram e ganhe. Quer saber como?", function(){
    nlChips([
      { rotulo:"Quero participar!", acao:nlRecompensaRegras },
      { rotulo:"Agora não, encerrar", sec:true, acao:nlEncerrar }
    ]);
  });
}
function nlRecompensaRegras(){
  nlMsgUser("Quero participar!");
  nlMsgLiss("Mostra a Netliss funcionando no seu celular e ganhe:<br><br>&#128241; <b>Print do app conectado</b> (postado no feed ou reels) = <b>+10 dias</b> no seu plano.<br><br>&#127909; <b>Vídeo ou gravação da tela</b> usando e comentando (feed ou reels) = <b>+1 acesso completo</b>.<br><br>Importante: precisa ser postado no <b>feed ou reels</b> (não vale só stories) e com a legenda que eu já deixo pronta pra você.", function(){
    nlMsgLiss("Aqui está a legenda — é só copiar e colar na sua postagem:<br><br><i>" + nlEscapar(CFG.legendaPost) + "</i><br><br><button class='chip' onclick='nlCopiarLegenda(this)'>Copiar legenda</button>", function(){
      nlMsgLiss("Poste no seu <b>feed ou reels</b> com essa legenda (e mantenha o <b>@netlissbr</b> marcado). Como você marcou a gente, nossa equipe vê a sua postagem automaticamente pelo Instagram — não precisa mandar print! Quando terminar, é só avisar aqui.", function(){
        nlChips([
          { rotulo:"Já postei!", acao:nlRecompensaInsta },
          { rotulo:"Encerrar atendimento", sec:true, acao:nlEncerrar }
        ]);
      });
    });
  });
}
function nlCopiarLegenda(btn){
  var v = CFG.legendaPost;
  var ok = function(){ if(btn){ btn.textContent = "Copiado!"; setTimeout(function(){ btn.textContent = "Copiar legenda"; }, 1600); } };
  if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(v).then(ok, function(){ nlCopiarFallback(v); ok(); }); }
  else { nlCopiarFallback(v); ok(); }
}
function nlRecompensaInsta(){
  nlMsgUser("Já postei!");
  nlMsgLiss("Maravilha! Agora me diz o seu <b>@ do Instagram</b> (o seu nome de usuário lá), para a nossa equipe encontrar a sua postagem e aplicar o bônus:", function(){
    nlForm("<input id='nl-insta' type='text' placeholder='@seuinstagram' maxlength='40'>" +
           "<button class='botao' onclick='nlEnviarInsta()'>Enviar meu Instagram</button>");
  });
}
function nlEnviarInsta(){
  var insta = document.getElementById("nl-insta").value.trim();
  insta = insta.split(" ").join("");
  if(insta.length < 2){ alert("Digite o seu @ do Instagram"); return; }
  if(insta.charAt(0) !== "@"){ insta = "@" + insta; }
  nlMsgUser(insta);
  nlApiFogo({ acao:"recompensa", usuario: NL.vendaUser || "", plano: NL.vendaPlano || "", instagram: insta });
  nlMsgLiss("Perfeito! Nossa equipe vai localizar a sua postagem no Instagram e aplicar o seu bônus direto na conta <b>" + nlEscapar(NL.vendaUser || "") + "</b>. Pode levar algumas horas. Obrigada por divulgar a Netliss!", function(){
    nlChips([
      { rotulo:"Novo atendimento", acao:nlReiniciar }
    ]);
  });
}

// ---------------- JA SOU CLIENTE ----------------
function nlFluxoCliente(){
  nlMsgLiss("Que bom te ver de novo!<br><br>Me fala o seu <b>nome de usuário</b> (o mesmo que você usa no aplicativo):", function(){
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
        var opcoes = [
          { rotulo:"Quero renovar", acao:nlRenovarPlanos },
          { rotulo:"Quero revender", acao:nlRevenda }
        ];
        if(dias !== undefined && dias !== null && !isNaN(dias) && dias > 0){
          opcoes.push({ rotulo:"Suporte 24h", acao:nlIrParaLiss });
        }
        nlChips(opcoes);
      });
    } else {
      nlMsgLiss("Hmm, não encontrei o usuário <b>" + nlEscapar(u) + "</b>. Pode ter sido erro de digitação — ou o acesso já venceu e foi removido do sistema.<br><br>O que você prefere?", function(){
        nlChips([
          { rotulo:"Tentar de novo", acao:nlFluxoCliente },
          { rotulo:"Quero renovar", acao:nlMostrarPlanos },
          { rotulo:"Quero revender", acao:nlRevenda }
        ]);
      });
    }
  }, 400);
}
function nlRenovarPlanos(){
  NL.modoRenov = true;
  nlMsgLiss("Perfeito! Escolha o plano da sua renovação — caso o seu acesso ainda não tenha vencido, os dias contratados são somados ao que você já tem:", function(){
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
  nlMsgLiss("Que ótimo! Para revender, o primeiro passo é <b>conhecer o produto</b> — por isso nossos melhores revendedores começaram como clientes.<br><br>Deixa seu contato que nossa equipe te chama no WhatsApp para conversar:", function(){
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
  nlMsgLiss("Certo, me conta aqui embaixo o que está acontecendo...", function(){
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
      nlMsgLiss("Desculpe, nosso sistema está instável agora. Tente novamente mais tarde...", null, "liss");
    }
  }catch(e){
    t.remove();
    nlMsgLiss("Desculpe, nosso sistema está instável agora. Tente novamente mais tarde...", null, "liss");
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
function nlAudio(){
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){ nlSistema("O seu navegador parece não suportar áudio — digite sua mensagem"); return; }
  if(NL.gravando && NL.rec){ try{ NL.rec.stop(); }catch(e){} return; }
  var campo = document.getElementById("nl-texto");
  NL.rec = new SR();
  NL.rec.lang = "pt-BR";
  NL.rec.interimResults = false;
  NL.rec.maxAlternatives = 1;
  NL.gravando = true;
  nlSistema("Gravando... fale a sua mensagem e faça uma pausa para enviar");
  NL.rec.onresult = function(ev){
    var txt = "";
    if(ev.results && ev.results[0] && ev.results[0][0]){ txt = ev.results[0][0].transcript; }
    if(txt && campo){ campo.value = txt; nlEnviarTexto(); }
  };
  NL.rec.onend = function(){ NL.gravando = false; };
  NL.rec.onerror = function(ev){
    NL.gravando = false;
    if(ev.error === "not-allowed"){ nlSistema("permita o uso do microfone para enviar áudio"); }
    else { nlSistema("não consegui entender o áudio — tenta de novo ou digite"); }
  };
  try{ NL.rec.start(); }catch(e){ NL.gravando = false; }
}

function nlEncerrar(){
  nlBloquearDigitacao();
  if(NL.pollTimer){ clearInterval(NL.pollTimer); }
  if(NL.ticket){ nlApiFogo({ acao: "ticket_fechar", ticket_id: NL.ticket }); }
  NL.ticket = null;
  NL.difyConv = null;
  try{ localStorage.removeItem("netliss_ticket"); }catch(e){}
  nlMsgLiss("Foi um prazer te atender!<br>Se precisar de qualquer coisa, é só chamar. Deus te abençoe!", function(){
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
