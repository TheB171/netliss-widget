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
  linkInter: "https://inter-co.onelink.me/Qyu7/ste2n6tb",
  videoRot1: "https://youtube.com/watch?v=T2C22IteWv4",
  videoRot2: "https://youtube.com/watch?v=4C8p0xTU8N8",
  videoRot3: "https://youtube.com/watch?v=42S8Cfzf_Xg",
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
      { rotulo:"Já sou cliente", acao:nlFluxoCliente },
      { rotulo:"Sou revendedor", acao:nlFluxoRevendedor },
      { rotulo:"Sou afiliado", acao:nlFluxoAfiliado }
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
  nlMsgLiss("Que bom ter você aqui, <b>" + nlEscapar(NL.nome) + "</b>!", function(){
    nlMsgLiss("A Netliss é <b>internet ilimitada</b> para o seu celular, através do nosso aplicativo — disponível apenas para <b>Android</b>. A nossa internet vem dos nossos próprios servidores: não dependemos dos seus créditos nem da internet da sua operadora.", function(){
      nlMsgLiss("Também é possível <b>rotear</b> a internet, mas essa função não depende 100% da Netliss. Temos um tutorial que ensina a rotear, disponível só para quem já é cliente. Sobre roteamento, não damos suporte nem garantia.", function(){
        nlMsgLiss("Importante: para o nosso aplicativo funcionar, a sua <b>rota de conexão</b> precisa estar ativa e funcionando. Por isso você precisa seguir rigorosamente os requisitos mínimos da sua operadora. Eu te explico isso nas próximas etapas, mas preciso que você confirme que leu e entendeu tudo até aqui.", function(){
          nlChips([{ rotulo:"Li e entendi, continuar", acao:nlIrParaOperadoras }]);
        });
      });
    });
  });
}
function nlIrParaOperadoras(){
  nlMsgUser("Li e entendi, continuar");
  nlApiFogo({ acao:"nome", sistema:"Android" });
  nlNovoAndroid();
}
var PROC1 = "Vamos resolver. O procedimento é este:<br><br>1) Dentro do aplicativo, teste <b>TODAS</b> as opções da sua operadora, uma por uma. Uma delas costuma conectar.<br><br>2) Se nenhuma conectar, ligue o <b>modo avião</b>, espere 2 segundos, desligue e teste todas as opções de novo.";
var PROC2 = "Com o seu chip em dia, isso costuma resolver rápido. Se o seu crédito estiver perto de vencer, ou se você estiver numa área de sinal ruim, pode ser que precise insistir mais um pouco.<br><br>E se, mesmo insistindo, não conectar de jeito nenhum: a rota de conexão está <b>SUSPENSA</b> do lado da operadora. No pré-pago, uma recarga <b>ATIVA NOVAMENTE</b>; no pós-pago, regularizar a fatura <b>ATIVA NOVAMENTE</b>.";
var RP = "Só existe uma regra de ouro: mantenha os pagamentos da operadora <b>em dia</b>. Se a fatura atrasar ou você parar de pagar, a operadora pode suspender a rota de conexão — e o aplicativo para de conectar.";
var EC = "E uma <b>dica de economia</b>: como a Netliss não depende da internet da sua operadora, você pode migrar para o plano mais barato que ela oferecer — o suficiente para manter a rota de conexão ativa. A economia praticamente paga a Netliss.";
var VIVOAPP = "Um detalhe importante: no nosso aplicativo <b>não existem opções com o nome Intercel</b>. Como a Intercel usa a rede da Vivo, você deve usar as opções da <b>VIVO</b> no aplicativo — e testar todas elas até conectar.";
var REGRAS = {
  "TIM|PRE": { tipo:"ok", texto:"<b>TIM Pré-pago</b> está funcionando muito bem com a Netliss!<br><br>Manter o saldo com a operadora <b>válido</b> (dentro da validade) faz a conexão funcionar com mais facilidade.<br><br>Com a validade do saldo expirada, ainda funciona, mas com mais dificuldade — às vezes você vai precisar ativar e desativar o <b>modo avião</b> e testar todas as opções da TIM no aplicativo até conectar.<br><br>Um detalhe importante: se o saldo estiver expirado e o aplicativo ficar procurando rede utilizável sem conectar — mesmo fazendo o modo avião e testando todas as opções — é sinal de que a sua <b>rota de conexão</b> não está funcionando; portanto, chegou a hora de fazer uma recarga para o aplicativo voltar a funcionar." },
  "TIM|POS": { tipo:"ok", texto:"<b>TIM Pós-pago / Controle</b> funciona muito bem com a Netliss!<br><br>Só existe uma regra de ouro: mantenha os pagamentos da operadora <b>em dia</b>. Se a fatura atrasar ou você parar de pagar, a operadora pode suspender a rota de conexão — e o aplicativo para de conectar.<br><br>E uma <b>dica de economia</b>: como a Netliss não depende da internet da sua operadora, você pode migrar para o plano mais barato que ela oferecer — o suficiente para manter a rota de conexão ativa. A economia praticamente paga a Netliss, e a sua internet ilimitada continua vindo da gente." },
  "Vivo|PRE": { tipo:"sugestao", texto:"Honestamente? O <b>Vivo Pré-pago</b> tem funcionado com muita dificuldade e pode te dar dor de cabeça. Você pode fazer o teste grátis e ver como vai funcionar — pode ser que funcione ou não, mas você é quem vai saber.<br><br>Se você puder, talvez a <b>TIM</b> ou a <b>Intercel</b> sejam melhores para você. Quer conhecer?" },
  "Vivo|POS": { tipo:"ok", texto:"<b>Vivo Pós-pago / Controle</b> funciona muito bem com a Netliss!<br><br>Só existe uma regra de ouro: mantenha os pagamentos da operadora <b>em dia</b>. Se a fatura atrasar ou você parar de pagar, a operadora pode suspender a rota de conexão — e o aplicativo para de conectar.<br><br>E uma <b>dica de economia</b>: como a Netliss não depende da internet da sua operadora, você pode migrar para o plano mais barato que ela oferecer — o suficiente para manter a rota de conexão ativa. A economia praticamente paga a Netliss, e a sua internet ilimitada continua vindo da gente." },
  "Claro|POS": { tipo:"ok", texto:"" },
  "Intercel|PRE": { tipo:"ok", texto:"<b>Intercel Pré-pago</b> funciona muito bem com a Netliss!<br><br>Ela usa a rede da Vivo, mas o comportamento dela com o nosso aplicativo é parecido com o da TIM: o pré-pago também funciona bem.<br><br>Manter o saldo com a operadora <b>válido</b> (dentro da validade) faz a conexão funcionar com mais facilidade. Com a validade do saldo expirada, ainda funciona, mas com mais dificuldade — às vezes você vai precisar ativar e desativar o <b>modo avião</b> e testar todas as opções da VIVO no aplicativo até conectar.<br><br>Fica atento a isto: se o saldo estiver expirado e o aplicativo ficar procurando rede utilizável sem conectar, mesmo depois de testar todas as opções e fazer o modo avião, é sinal de que a sua rota de conexão não está funcionando; chegou a hora de fazer uma recarga.<br><br>" + VIVOAPP },
  "Intercel|POS": { tipo:"ok", texto:"<b>Intercel Pós-pago / Controle</b> funciona muito bem com a Netliss!<br><br>" + RP + "<br><br>" + VIVOAPP + "<br><br>E uma <b>dica de economia</b>: como a Netliss não depende da internet da sua operadora, você pode ficar no plano mais barato da Intercel. Com plano a partir de R$17 por mês, a economia praticamente paga a Netliss." }
};

function nlNovoAndroid(){
  nlMsgLiss("Show! Agora me diz: qual é a sua <b>operadora</b>?", function(){
    nlChips([
      { rotulo:"TIM", acao:function(){ nlAndroidModalidade("TIM"); } },
      { rotulo:"Vivo", acao:function(){ nlAndroidModalidade("Vivo"); } },
      { rotulo:"Claro", acao:nlClaroTela },
      { rotulo:"Intercel", acao:function(){ nlAndroidModalidade("Intercel"); } },
      { rotulo:"Outras operadoras", acao:nlOutrasOperadoras }
    ]);
  });
}
function nlClaroTela(){
  NL.op = "Claro"; NL.mod = "POS";
  nlApiFogo({ acao:"nome", operadora:"Claro" });
  nlMsgLiss("Com a <b>Claro</b>, a Netliss funciona somente no <b>Pós-pago ou Controle</b> — no Claro Pré-pago não funciona de jeito nenhum.<br><br>E mesmo no Pós-pago / Controle, alguns clientes têm relatado mais oscilação do que nas outras operadoras. Por isso o <b>teste grátis</b> é essencial: você avalia como fica antes de pagar qualquer coisa.<br><br>Só existe uma regra de ouro: mantenha os pagamentos da operadora <b>em dia</b>. Se a fatura atrasar ou você parar de pagar, a operadora pode suspender a rota de conexão — e o aplicativo para de conectar.<br><br>E uma <b>dica de economia</b>: como a Netliss não depende da internet da sua operadora, você pode migrar para o plano mais barato que ela oferecer — o suficiente para manter a rota de conexão ativa. A economia praticamente paga a Netliss, e a sua internet ilimitada continua vindo da gente.<br><br>Se você usa <b>Claro Pré-pago</b>, talvez a <b>TIM</b> ou a <b>Intercel</b> sejam melhores para você. Quer conhecer?", function(){
    nlChips([
      { rotulo:"Entendido, fazer o teste", acao:nlPassoApp },
      { rotulo:"Conhecer a TIM", acao:nlConhecerTim },
      { rotulo:"Conhecer a Intercel", acao:nlConhecerIntercel },
      { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
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
    if(r.tipo === "ok"){
      nlChips([
        { rotulo:"Continuar para o teste", acao:nlPassoApp },
        { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
      ]);
    } else {
      nlChips([
        { rotulo:"Conhecer a TIM", acao:nlConhecerTim },
        { rotulo:"Conhecer a Intercel", acao:nlConhecerIntercel },
        { rotulo:"Tenho outro chip", acao:nlNovoAndroid },
        { rotulo:"Quero testar mesmo assim", acao:nlPassoApp }
      ]);
    }
  });
}
function nlConhecerTim(){
  nlMsgUser("Conhecer a TIM");
  NL.op = "TIM";
  nlMsgLiss("A <b>TIM</b> funciona muito bem com a Netliss, no pré e no pós-pago.", function(){
    nlMsgLiss("Qual é a modalidade do seu chip TIM?", function(){
      nlChips([
        { rotulo:"Pré-pago", acao:function(){ nlAndroidRegras("TIM", "PRE"); } },
        { rotulo:"Pós-pago ou Controle", acao:function(){ nlAndroidRegras("TIM", "POS"); } },
        { rotulo:"Conhecer a Intercel", acao:nlConhecerIntercel },
        { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
      ]);
    });
  });
}
function nlConhecerIntercel(){
  nlMsgUser("Conhecer a Intercel");
  nlMsgLiss("A <b>Intercel</b> é a operadora digital do <b>Banco Inter</b>. Ela usa a rede da Vivo e tem planos a partir de <b>R$17 por mês</b> — e funciona muito bem com a Netliss, tanto no pré quanto no pós-pago.", function(){
    nlMsgLiss("Você só precisa ter ou abrir uma conta no Banco Inter. Dá para pedir um chip físico ou um <b>chip virtual (eSIM)</b> direto pelo aplicativo do Banco Inter. Se você não tiver conta no Inter, podemos te ajudar a abrir uma agora mesmo.", function(){
      nlMsgLiss("Ou, se já tiver, qual é a modalidade do seu chip Intercel?", function(){
        nlChips([
          { rotulo:"Pré-pago", acao:function(){ nlAndroidRegras("Intercel", "PRE"); } },
          { rotulo:"Pós-pago ou Controle", acao:function(){ nlAndroidRegras("Intercel", "POS"); } },
          { rotulo:"Abrir conta Inter", acao:nlAbrirInter },
          { rotulo:"Conhecer a TIM", acao:nlConhecerTim },
          { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
        ]);
      });
    });
  });
}
function nlAbrirInter(){
  nlMsgUser("Abrir conta Inter");
  window.open(CFG.linkInter, "_blank");
  nlMsgLiss("Abri o aplicativo do Banco Inter para você. Depois de abrir a conta, é só pedir o chip Intercel por lá e voltar aqui para fazer o seu teste grátis. Te espero!", function(){
    nlChips([
      { rotulo:"Já tenho Intercel, testar", acao:nlIntercelModalidade },
      { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
    ]);
  });
}
function nlOutrasOperadoras(){
  nlMsgUser("Outras operadoras");
  nlMsgLiss("A nossa base são as redes da <b>TIM</b>, da <b>Vivo</b> e da <b>Claro</b>. Se a sua operadora usa a rede de uma delas, tem tudo para funcionar normalmente — muitas operadoras menores funcionam assim.", function(){
    nlMsgLiss("Se você não souber, pesquisa no Google o nome da sua operadora seguido de <b>usa a rede de qual operadora</b>. Em segundos você acha.", function(){
      nlChips([
        { rotulo:"Usa a rede da TIM", acao:function(){ nlAndroidModalidade("TIM"); } },
        { rotulo:"Usa a rede da Vivo", acao:function(){ nlAndroidModalidade("Vivo"); } },
        { rotulo:"Usa a rede da Claro", acao:nlClaroTela }
      ]);
    });
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
          { rotulo:"Preciso de ajuda", acao:nlSuporteNovo }
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
// ---------------- SUPORTE: TRILHA CLIENTE NOVO ----------------
function nlSuporteNovo(){
  NL.trilha = "novo";
  nlMsgUser("Preciso de ajuda");
  nlMsgLiss("Claro! Me diz o que você precisa:", function(){
    nlChips([
      { rotulo:"Não estou conseguindo conectar", acao:nlErrosMenu },
      { rotulo:"O aplicativo é seguro?", acao:nlSupSeguro },
      { rotulo:"O aplicativo é legalizado?", acao:nlSupLegal },
      { rotulo:"Funciona em tablet?", acao:nlSupTablet },
      { rotulo:"Funciona em roteadores?", acao:nlSupRoteador },
      { rotulo:"Funciona na multimídia do carro?", acao:nlSupCarro },
      { rotulo:"Nenhuma dessas opções", acao:nlIrParaLiss }
    ]);
  });
}
function nlFimSuporte(){
  if(NL.trilha === "novo"){
    return [{ rotulo:"Deu certo, quero contratar", acao:nlMostrarPlanos }, { rotulo:"Tenho outra dúvida", acao:nlSuporteNovo }];
  }
  if(NL.trilha === "revendedor"){
    return [{ rotulo:"Copiar orientação", acao:nlCopiarOrientacao }, { rotulo:"Voltar ao suporte", acao:nlSuporteRev }, { rotulo:"Voltar ao menu principal", acao:nlMenuRevendedor }];
  }
  return [{ rotulo:"Resolvido, obrigado", acao:nlFecharSuporte }, { rotulo:"Tenho outra dúvida", acao:nlSuporteAtivo }];
}
function nlFecharSuporte(){
  nlMsgUser("Resolvido, obrigado");
  if(NL.diasRestantes !== undefined && NL.diasRestantes !== null && !isNaN(NL.diasRestantes) && NL.diasRestantes > 0 && NL.diasRestantes < 10){
    nlMsgLiss("Que bom que resolvemos! Já que você está por aqui: o seu acesso vence em <b>" + NL.diasRestantes + " dias</b>. Quer garantir a renovação agora?", function(){
      nlChips([{ rotulo:"Quero renovar", acao:nlRenovarPlanos }, { rotulo:"Agora não, encerrar", sec:true, acao:nlEncerrar }]);
    });
  } else { nlEncerrar(); }
}
function nlErrosMenu(){
  nlMsgUser("Não estou conseguindo conectar");
  nlMsgLiss("Me diz o que aparece na sua tela:", function(){
    nlChips([
      { rotulo:"Procurando rede utilizável", acao:nlErroRota },
      { rotulo:"Conecta mas não navega", acao:nlErroRota },
      { rotulo:"Acesso negado", acao:nlErroNegado },
      { rotulo:"Escolha uma configuração", acao:nlErroConfig },
      { rotulo:"Nenhuma configuração encontrada", acao:nlErroSemConfig },
      { rotulo:"Nenhuma dessas opções", acao:nlIrParaLiss }
    ]);
  });
}
function nlErroRota(){
  NL.ultimaOrientacao = "rota";
  nlMsgLiss(PROC1, function(){
    nlMsgLiss(PROC2, function(){ nlChips(nlFimSuporte()); });
  });
}
function nlErroNegado(){
  NL.ultimaOrientacao = "negado";
  nlMsgLiss("Esse aviso acontece por dois motivos:<br><br>1) Usuário ou senha digitados errado — apague tudo e digite de novo, com atenção a maiúsculas e minúsculas.<br><br>2) A validade do seu teste ou do seu acesso terminou.", function(){
    nlChips(nlFimSuporte());
  });
}
function nlErroConfig(){
  NL.ultimaOrientacao = "config";
  nlMsgLiss("Esse aviso quer dizer que você colocou usuário e senha, mas ainda não escolheu nenhuma opção da sua operadora na lista do aplicativo, que fica logo acima de onde você inseriu o nome de usuário.<br><br>Escolha uma das opções da sua operadora e conecte. Se a primeira não funcionar, vá testando as outras.", function(){
    nlChips(nlFimSuporte());
  });
}
function nlErroSemConfig(){
  NL.ultimaOrientacao = "semconfig";
  nlMsgLiss("Isso quer dizer que a sua internet estava fraca e o aplicativo não conseguiu baixar as configurações.<br><br>1) Conecte o aparelho em qualquer internet (Wi-Fi ou dados).<br><br>2) No aplicativo, toque no ícone de atualizar (as setas em círculo, ao lado do botão de conectar).<br><br>3) Se não resolver, desinstale o aplicativo e instale de novo pela Play Store.", function(){
    nlMsgLiss("Esse é o procedimento completo — as configurações ficam no nosso banco de dados e é o aplicativo que precisa baixá-las. Não há nada que a gente consiga forçar daqui.", function(){
      var b = [{ rotulo:"Baixar na Play Store", acao:function(){ window.open(CFG.playStore, "_blank"); } }];
      nlChips(b.concat(nlFimSuporte()));
    });
  });
}
function nlSupSeguro(){
  NL.ultimaOrientacao = "seguro";
  nlMsgLiss("É sim. Todo o seu tráfego passa dentro de um túnel VPN com criptografia de nível militar entre o seu celular e os nossos servidores.<br><br>Nem a operadora nem terceiros conseguem ver o que você acessa ou digita. Na prática, é mais seguro do que usar Wi-Fi público, que é o alvo preferido de golpistas.", function(){
    nlMsgLiss("Uma coisa importante: privacidade não é impunidade. Quem usar a Netliss para praticar qualquer ato ilícito responde integralmente perante a lei, e nós colaboramos com as autoridades policiais em qualquer investigação necessária para identificar os responsáveis.", function(){
      nlChips(nlFimSuporte());
    });
  });
}
function nlSupLegal(){
  NL.ultimaOrientacao = "legal";
  nlMsgLiss("É sim, 100% legalizado. A Netliss é uma empresa de tecnologia fundada em 2019, classificada por lei como Serviço de Valor Adicionado — o SVA, previsto no artigo 61 da Lei nº 9.472/97, a Lei Geral de Telecomunicações.<br><br>Nós desenvolvemos o aplicativo e mantemos os nossos servidores. Não somos operadora de telefonia: não vendemos chip, não vendemos sinal e não temos antena.", function(){
    nlChips(nlFimSuporte());
  });
}
function nlSupTablet(){
  NL.ultimaOrientacao = "tablet";
  nlMsgLiss("Funciona, desde que o tablet tenha entrada para chip de dados (4G ou 5G), como um celular. Também vale para chip virtual (eSIM).<br><br>O jeito de ter certeza é fazer o teste grátis no seu aparelho.", function(){
    nlChips(nlFimSuporte());
  });
}
function nlSupRoteador(){
  NL.ultimaOrientacao = "roteador";
  nlMsgLiss("O aplicativo foi feito para aparelhos celulares. Em modem 4G, mini roteador ou roteador de chip normalmente não funciona.<br><br>Se você quiser tentar, fica por sua conta e risco: não damos suporte nem garantia para esse tipo de uso.", function(){
    nlChips(nlFimSuporte());
  });
}
function nlSupCarro(){
  NL.ultimaOrientacao = "carro";
  nlMsgLiss("Existem clientes que conseguiram, mas nós não garantimos e não damos suporte para instalação em central multimídia de veículo.<br><br>Se quiser tentar, é por sua conta e risco.", function(){
    nlChips(nlFimSuporte());
  });
}

// ---------------- SUPORTE: TRILHA CLIENTE ATIVO ----------------
function nlSuporteAtivo(){
  NL.trilha = "ativo";
  nlMsgLiss("Certo! Me diz o que está acontecendo:", function(){
    nlChips([
      { rotulo:"Não estou conseguindo conectar", acao:nlErrosMenu },
      { rotulo:"Está caindo toda hora", acao:nlSupCaindo },
      { rotulo:"Link do aplicativo", acao:nlSupLinkApp },
      { rotulo:"Quero rotear", acao:nlSupRotear },
      { rotulo:"Cancelar ou mudar de plano", acao:nlSupCancelar },
      { rotulo:"Nenhuma dessas opções", acao:nlIrParaLiss }
    ]);
  });
}
function nlSupCaindo(){
  NL.ultimaOrientacao = "caindo";
  nlMsgLiss("Algum desses procedimentos pode te ajudar:", function(){
    nlMsgLiss("1) Se você usa 5G, pode ser que mudar o tipo de rede do celular para <b>4G (LTE)</b> resolva. O 5G fica trocando automaticamente de antena o tempo todo, e isso derruba a conexão.", function(){
      nlMsgLiss("2) Veja se o modo de <b>economia de bateria</b>, ou algo parecido, está ativo — configurações desse tipo podem fechar o aplicativo.", function(){
        nlMsgLiss("3) Não use o aplicativo com o <b>Wi-Fi ligado</b>: os dois juntos travam a conexão. Para usar a Netliss, desligue o Wi-Fi antes.", function(){
          nlChips(nlFimSuporte());
        });
      });
    });
  });
}
function nlSupLinkApp(){
  nlMsgUser("Link do aplicativo");
  window.open(CFG.playStore, "_blank");
  nlChips(nlFimSuporte());
}
function nlSupRotear(){
  NL.ultimaOrientacao = "rotear";
  nlMsgLiss("Lembre-se: o roteamento depende do seu aparelho e não temos como dar suporte se não funcionar. Para TV normalmente não dá certo.<br><br>Seguem abaixo os vídeos tutoriais para te ajudar:", function(){
    nlChips([
      { rotulo:"Configurar o celular que vai rotear", acao:function(){ window.open(CFG.videoRot1, "_blank"); } },
      { rotulo:"Conectar de outro celular", acao:function(){ window.open(CFG.videoRot2, "_blank"); } },
      { rotulo:"Conectar de um notebook", acao:function(){ window.open(CFG.videoRot3, "_blank"); } },
      { rotulo:"Resolvido, obrigado", acao:nlFecharSuporte },
      { rotulo:"Tenho outra dúvida", acao:nlSuporteAtivo }
    ]);
  });
}
function nlSupCancelar(){
  NL.ultimaOrientacao = "cancelar";
  nlMsgLiss("Para cancelar é simples: basta não renovar quando o seu plano terminar. O acesso encerra sozinho, sem dívida e sem multa — não trabalhamos com fidelidade.<br><br>Para mudar de plano, você escolhe a nova opção na hora da renovação.", function(){
    nlChips(nlFimSuporte());
  });
}

// ---------------- SUPORTE DO REVENDEDOR ----------------
var ORIENTACOES = {
  rota: "Oi! Sobre a sua conexão: entra no aplicativo e testa TODAS as opções da sua operadora, uma por uma. Uma delas costuma conectar. Se nenhuma funcionar, liga o modo avião, espera 2 segundos, desliga e testa todas de novo. Se mesmo assim não conectar, a rota de conexão está suspensa pela operadora: no pré-pago uma recarga ativa novamente, no pós-pago é só regularizar a fatura. Qualquer coisa me chama!",
  negado: "Oi! Esse aviso de acesso negado acontece por dois motivos: 1) usuário ou senha digitados errado — apaga tudo e digita de novo, com atenção a maiúsculas e minúsculas; 2) a validade do seu acesso terminou. Qualquer coisa me chama!",
  config: "Oi! Esse aviso quer dizer que você colocou usuário e senha, mas ainda não escolheu nenhuma opção da sua operadora na lista do aplicativo, que fica logo acima de onde você inseriu o nome de usuário. Escolhe uma das opções da sua operadora e conecta. Se a primeira não funcionar, vai testando as outras. Qualquer coisa me chama!",
  semconfig: "Oi! Isso quer dizer que a sua internet estava fraca e o aplicativo não conseguiu baixar as configurações. 1) Conecta o aparelho em qualquer internet (Wi-Fi ou dados). 2) No aplicativo, toca no ícone de atualizar (as setas em círculo, ao lado do botão de conectar). 3) Se não resolver, desinstala o aplicativo e instala de novo pela Play Store. Qualquer coisa me chama!",
  caindo: "Oi! Se a conexão está caindo: 1) se você usa 5G, muda o tipo de rede do celular para 4G (LTE) — o 5G fica trocando de antena e derruba a conexão; 2) confere se o modo de economia de bateria está ativo, porque ele fecha o aplicativo; 3) não usa o aplicativo com o Wi-Fi ligado, desliga o Wi-Fi antes. Qualquer coisa me chama!"
};
function nlSuporteRev(){
  NL.trilha = "revendedor";
  nlMsgLiss("Certo! Me diz o que está acontecendo com o seu cliente:", function(){
    nlChips([
      { rotulo:"Ele não está conseguindo conectar", acao:nlErrosMenu },
      { rotulo:"Está caindo toda hora", acao:nlSupCaindo },
      { rotulo:"Link do aplicativo", acao:nlRevLinkApp },
      { rotulo:"Nenhuma dessas opções", acao:nlIrParaLiss }
    ]);
  });
}
function nlRevLinkApp(){
  nlMsgUser("Link do aplicativo");
  NL.copiaLink = CFG.playStore;
  nlMsgLiss("Aqui está o link oficial do nosso aplicativo:<br><br>" + CFG.playStore + "<br><br>Você pode copiar o link para enviar ao seu cliente, ou baixar o aplicativo aqui mesmo, se for você que precisa instalar.", function(){
    nlChips([
      { rotulo:"Copiar link do aplicativo", acao:function(){ nlCopiarTexto(CFG.playStore); } },
      { rotulo:"Baixar o aplicativo", acao:function(){ window.open(CFG.playStore, "_blank"); } },
      { rotulo:"Voltar ao suporte", acao:nlSuporteRev },
      { rotulo:"Voltar ao menu", acao:nlMenuRevendedor }
    ]);
  });
}
function nlCopiarOrientacao(){
  var t = ORIENTACOES[NL.ultimaOrientacao] || "";
  if(t){ nlCopiarTexto(t); nlSistema("orientação copiada, é só enviar ao seu cliente"); }
}
function nlCopiarTexto(v){
  if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(String(v)); }
  else { nlCopiarFallback(v); }
}

// ---------------- RECUPERAR MEU ACESSO ----------------
function nlRecuperarAcesso(){
  nlMsgUser("Recuperar meu acesso");
  nlMsgLiss("Sem problema! Me diz o e-mail que você usou na compra que eu reenvio o seu acesso para ele agora mesmo:", function(){
    nlForm("<input id='nl-rec-email' type='email' placeholder='Seu e-mail da compra' maxlength='80'>" +
           "<button class='botao' onclick='nlEnviarRecuperacao()'>Reenviar meu acesso</button>");
  });
}
function nlEnviarRecuperacao(){
  var email = document.getElementById("nl-rec-email").value.trim();
  if(email.indexOf("@") < 1 || email.indexOf(".") < 3){ alert("Digite um e-mail válido"); return; }
  nlMsgUser(email);
  nlDigitar(async function(){
    var r = await nlApi({ acao:"recuperar", email: email });
    if(r && r.success){
      nlMsgLiss("Pronto! Enviei o seu acesso para <b>" + nlEscapar(email) + "</b>. Dá uma olhada na caixa de entrada e também no spam.", function(){
        nlChips([{ rotulo:"Recebi, obrigado", acao:nlEncerrar }, { rotulo:"Não chegou", acao:nlIrParaLiss }]);
      });
    } else {
      nlMsgLiss("Não encontrei nenhuma compra com esse e-mail. Pode ter sido com outro endereço — quer tentar de novo?", function(){
        nlChips([{ rotulo:"Tentar outro e-mail", acao:nlRecuperarAcesso }, { rotulo:"Nenhuma dessas opções", acao:nlIrParaLiss }]);
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
function nlMostrarMetodos(){
  nlMsgLiss("E como você prefere pagar?", function(){
    nlChips([
      { rotulo:"PIX", acao:nlFormPix },
      { rotulo:"Cartão de crédito", acao:nlFormCartao }
    ]);
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
// ---------------- GANHE DINHEIRO COM A NETLISS ----------------
function nlGanharDinheiro(){
  nlMsgUser("Ganhe dinheiro com a Netliss");
  nlMsgLiss("Que bom que você quer ganhar dinheiro com a gente! São duas formas, e a diferença é simples:", function(){
    nlMsgLiss("<b>AFILIADO</b> — você só divulga o seu link ou QR Code nas suas redes sociais, no seu site, na sua loja, em grupos de WhatsApp, em panfletos, cartazes, cartão de visitas, onde você quiser. Não paga nada e não atende ninguém: nós cuidamos do atendimento, da entrega e do suporte. Você ganha <b>20% da primeira compra</b> de cada cliente que vier pelo seu link — R$4,98 no mensal, R$19,98 no semestral e R$35,98 no anual. E o pagamento é diário: o que vender hoje cai na sua conta amanhã.", function(){
      nlMsgLiss("<b>REVENDEDOR</b> — você tem o seu próprio negócio. Paga uma licença mensal, compra os acessos que for revender a partir de <b>R$3,50</b> e vende pelo preço que quiser. O lucro é bem maior, mas o cliente é seu, e o suporte também: nós damos suporte a você, e você dá suporte aos seus clientes.", function(){
        nlMsgLiss("Ah, e uma dica: se você ainda não testou a Netliss no seu celular, vale testar antes. A gente não vende bem o que não conhece.", function(){
          nlChips([
            { rotulo:"Quero ser afiliado", acao:nlAfiliadoCadastro },
            { rotulo:"Quero ser revendedor", acao:nlLicencas },
            { rotulo:"Quero testar", acao:nlFluxoNovo }
          ]);
        });
      });
    });
  });
}
function nlLicencas(){
  nlMsgUser("Quero ser revendedor");
  nlMsgLiss("<b>LICENÇA BÁSICA</b> — Você paga R$35 por mês: cada acesso de 30 dias sai por <b>R$6,50</b>. Vendendo pelo mesmo preço da Netliss (R$24,90), você lucra <b>R$18,40</b> por venda.", function(){
    nlMsgLiss("<b>LICENÇA TOP</b> — Você paga R$60 por mês: cada acesso sai por <b>R$4,50</b>. Vendendo pelo mesmo preço da Netliss (R$24,90), você lucra <b>R$20,40</b> por venda.", function(){
      nlMsgLiss("<b>LICENÇA VIP</b> — Você paga R$85 por mês: cada acesso sai por <b>R$3,50</b>. Vendendo pelo mesmo preço da Netliss (R$24,90), você lucra <b>R$21,40</b> em cada venda.", function(){
        nlChips([
          { rotulo:"Escolher Básica", acao:function(){ nlComprarLicenca("BASICA"); } },
          { rotulo:"Escolher TOP", acao:function(){ nlComprarLicenca("TOP"); } },
          { rotulo:"Escolher VIP", acao:function(){ nlComprarLicenca("VIP"); } },
          { rotulo:"Tenho uma dúvida", acao:nlIrParaLiss }
        ]);
      });
    });
  });
}
function nlComprarLicenca(nivel){
  NL.nivelLicenca = nivel;
  NL.planoAtual = "LIC_" + nivel;
  nlMsgUser("Escolher " + nivel);
  nlMostrarMetodos();
}

// ---------------- SOU REVENDEDOR ----------------
function nlFluxoRevendedor(){
  nlMsgUser("Sou revendedor");
  nlMsgLiss("Que bom te ver! Me passa o seu <b>ID de revendedor</b>:", function(){
    nlForm("<input id='nl-rev-id' type='text' placeholder='Seu ID de revendedor' maxlength='40'>" +
           "<button class='botao' onclick='nlVerificarRevendedor()'>Entrar</button>" +
           "<button class='botao sec' onclick='nlGanharDinheiro()'>Ganhe dinheiro com a Netliss</button>");
    var g = nlLer("netliss_revid");
    if(g){ document.getElementById("nl-rev-id").value = g; }
  });
}
function nlVerificarRevendedor(){
  var id = document.getElementById("nl-rev-id").value.trim();
  if(id.length < 2){ alert("Digite o seu ID de revendedor"); return; }
  NL.revId = id;
  nlMsgUser(id);
  nlDigitar(async function(){
    var r = await nlApi({ acao:"revendedor_verificar", revid: id });
    if(r && r.success && r.ativo){
      nlSalvar("netliss_revid", id, CFG.ttlId);
      NL.nivelLicenca = r.nivel || "BASICA";
      NL.precoAcesso = r.preco || "6,50";
      nlMenuRevendedor(r.dias);
    } else {
      nlMsgLiss("Opa! Não encontrei uma licença ativa com esse ID — ou ela está vencida, ou o ID não confere.<br><br>Se a sua licença venceu, fica tranquilo: todos os acessos que você já vendeu continuam funcionando normalmente até o fim dos 30 dias de cada um. É só renovar para voltar a gerar testes e comprar acessos.<br><br>E se você ainda não é revendedor, posso te explicar como funciona.", function(){
        nlChips([
          { rotulo:"Tentar novamente", acao:nlFluxoRevendedor },
          { rotulo:"Renovar licença", acao:nlLicencas },
          { rotulo:"Ganhe dinheiro com a Netliss", acao:nlGanharDinheiro }
        ]);
      });
    }
  }, 400);
}
function nlMenuRevendedor(dias){
  var d = (dias !== undefined && dias !== null) ? dias : NL.revDias;
  NL.revDias = d;
  var cab = "Bem-vindo(a) de volta!<br><br>Licença <b>" + (NL.nivelLicenca || "") + "</b> ativa";
  if(d !== undefined && d !== null){ cab += " · vence em <b>" + d + " dias</b>"; }
  if(NL.precoAcesso){ cab += " · seu acesso sai por <b>R$" + NL.precoAcesso + "</b>"; }
  nlMsgLiss(cab, function(){
    nlChips([
      { rotulo:"Regras das operadoras", acao:nlRevRegras },
      { rotulo:"Copiar link do app", acao:function(){ nlCopiarTexto(CFG.playStore); nlSistema("link copiado, é só enviar ao seu cliente"); } },
      { rotulo:"Gerar teste grátis", acao:nlRevGerarTeste },
      { rotulo:"Comprar acesso 30 dias", acao:nlRevComprarAcesso },
      { rotulo:"Suporte", acao:nlSuporteRev },
      { rotulo:"Renovar minha licença", acao:nlLicencas }
    ]);
  });
}
function nlRevRegras(){
  nlMsgUser("Regras das operadoras");
  nlMsgLiss("Qual é a operadora do seu cliente?", function(){
    nlChips([
      { rotulo:"TIM Pré", acao:function(){ nlRevMostrarRegra("TIM|PRE"); } },
      { rotulo:"TIM Pós", acao:function(){ nlRevMostrarRegra("TIM|POS"); } },
      { rotulo:"Vivo Pós", acao:function(){ nlRevMostrarRegra("Vivo|POS"); } },
      { rotulo:"Intercel Pré", acao:function(){ nlRevMostrarRegra("Intercel|PRE"); } },
      { rotulo:"Intercel Pós", acao:function(){ nlRevMostrarRegra("Intercel|POS"); } },
      { rotulo:"Voltar ao menu", acao:nlMenuRevendedor }
    ]);
  });
}
function nlRevMostrarRegra(chave){
  var r = REGRAS[chave];
  if(!r){ nlMenuRevendedor(); return; }
  NL.regraCopiar = r.texto.split("<br>").join(" ").split("<b>").join("").split("</b>").join("");
  nlMsgLiss(r.texto, function(){
    nlChips([
      { rotulo:"Copiar orientação", acao:function(){ nlCopiarTexto(NL.regraCopiar); nlSistema("orientação copiada, é só enviar ao seu cliente"); } },
      { rotulo:"Voltar ao suporte", acao:nlRevRegras },
      { rotulo:"Voltar ao menu principal", acao:nlMenuRevendedor }
    ]);
  });
}
function nlRevGerarTeste(){
  nlMsgUser("Gerar teste grátis");
  nlDigitar(async function(){
    var r = await nlApi({ acao:"revendedor_teste", revid: NL.revId });
    if(r && r.usuario){
      NL.copiaUser = r.usuario; NL.copiaSenha = r.senha;
      NL.copiaDados = "Usuário / Teste criado com sucesso: Usuário: " + r.usuario + " · Senha: " + r.senha + " · Validade: " + (r.validade_horas || "1") + " hora. Instruções: no aplicativo, coloque usuário e senha exatamente como enviado. Nas opções de configuração da sua operadora, teste em todas — uma delas deverá se conectar. Se tiver dúvidas me chama aqui...";
      nlMsgLiss("Prontinho! Teste grátis gerado para o seu cliente:<br><br>Usuário: <b>" + nlEscapar(r.usuario) + "</b><br>Senha: <b>" + nlEscapar(r.senha) + "</b><br>Validade: <b>" + nlEscapar(r.validade_horas || "1") + " hora</b><br><br>Clique em Copiar dados que eu monto a mensagem inteira, com usuário, senha, validade e as instruções de como conectar — é só você enviar ao seu cliente.", function(){
        nlChips([
          { rotulo:"Copiar dados", acao:function(){ nlCopiarTexto(NL.copiaDados); nlSistema("dados copiados, é só enviar ao seu cliente"); } },
          { rotulo:"Contratar 30 dias", acao:nlRevComprarAcesso },
          { rotulo:"Gerar outro teste", acao:nlRevGerarTeste },
          { rotulo:"Voltar ao menu", acao:nlMenuRevendedor }
        ]);
      });
    } else {
      nlMsgLiss("Opa, tive um probleminha para gerar o teste agora. Tenta de novo em instantes.", function(){
        nlChips([{ rotulo:"Tentar novamente", acao:nlRevGerarTeste }, { rotulo:"Voltar ao menu", acao:nlMenuRevendedor }]);
      });
    }
  }, 400);
}
function nlRevComprarAcesso(){
  nlMsgUser("Comprar acesso 30 dias");
  NL.planoAtual = "ACESSO_" + (NL.nivelLicenca || "BASICA");
  nlMsgLiss("Vamos lá! Um acesso de 30 dias pela sua licença <b>" + (NL.nivelLicenca || "") + "</b> sai por <b>R$" + (NL.precoAcesso || "6,50") + "</b>. Confirma?", function(){
    nlChips([
      { rotulo:"Comprar agora", acao:nlMostrarMetodos },
      { rotulo:"Voltar ao menu", acao:nlMenuRevendedor }
    ]);
  });
}

// ---------------- SOU AFILIADO ----------------
function nlFluxoAfiliado(){
  nlMsgUser("Sou afiliado");
  nlMsgLiss("Que bom te ver! Me passa o seu <b>ID de afiliado</b>:", function(){
    nlForm("<input id='nl-afi-id' type='text' placeholder='Seu ID de afiliado' maxlength='40'>" +
           "<button class='botao' onclick='nlVerificarAfiliado()'>Entrar</button>" +
           "<button class='botao sec' onclick='nlPerdiIdAfiliado()'>Perdi meu ID</button>" +
           "<button class='botao sec' onclick='nlGanharDinheiro()'>Ganhe dinheiro com a Netliss</button>");
    var g = nlLer("netliss_afiid");
    if(g){ document.getElementById("nl-afi-id").value = g; }
  });
}
function nlVerificarAfiliado(){
  var id = document.getElementById("nl-afi-id").value.trim();
  if(id.length < 2){ alert("Digite o seu ID de afiliado"); return; }
  nlMsgUser(id);
  nlDigitar(async function(){
    var r = await nlApi({ acao:"afiliado_consultar", afiid: id });
    if(r && r.success){
      nlSalvar("netliss_afiid", id, CFG.ttlId);
      NL.afiId = id;
      var link = "https://www.netliss.com/?ref=" + id;
      nlMsgLiss("Oi, <b>" + nlEscapar(r.nome || "") + "</b>! Aqui está o seu resumo:<br><br>Vendas de hoje: <b>" + (r.hoje || 0) + "</b> — R$" + (r.hoje_valor || "0,00") + " a receber amanhã<br>Total do mês: <b>" + (r.mes || 0) + "</b> vendas — R$" + (r.mes_valor || "0,00") + "<br>Já recebido: R$" + (r.recebido || "0,00") + "<br><br>Seu link: " + link, function(){
        nlChips([
          { rotulo:"Copiar meu link", acao:function(){ nlCopiarTexto(link); nlSistema("link copiado"); } },
          { rotulo:"Baixar meu QR Code", acao:function(){ window.open("https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" + encodeURIComponent(link), "_blank"); } },
          { rotulo:"Editar meus dados", acao:nlAfiliadoCadastro }
        ]);
      });
    } else {
      nlMsgLiss("Não encontrei esse ID. Confere a digitação e tenta de novo — ou, se você ainda não é afiliado, posso criar o seu material agora mesmo.", function(){
        nlChips([
          { rotulo:"Tentar novamente", acao:nlFluxoAfiliado },
          { rotulo:"Perdi meu ID", acao:nlPerdiIdAfiliado },
          { rotulo:"Ganhe dinheiro com a Netliss", acao:nlGanharDinheiro }
        ]);
      });
    }
  }, 400);
}
function nlPerdiIdAfiliado(){
  nlMsgUser("Perdi meu ID");
  nlMsgLiss("Sem problema! Me diz o <b>WhatsApp</b> ou a <b>chave PIX</b> que você cadastrou que eu recupero o seu ID:", function(){
    nlForm("<input id='nl-afi-busca' type='text' placeholder='WhatsApp ou chave PIX' maxlength='60'>" +
           "<button class='botao' onclick='nlBuscarIdAfiliado()'>Recuperar meu ID</button>");
  });
}
function nlBuscarIdAfiliado(){
  var b = document.getElementById("nl-afi-busca").value.trim();
  if(b.length < 4){ alert("Digite o WhatsApp ou a chave PIX"); return; }
  nlMsgUser(b);
  nlDigitar(async function(){
    var r = await nlApi({ acao:"afiliado_consultar", busca: b });
    if(r && r.success && r.afiid){
      nlSalvar("netliss_afiid", r.afiid, CFG.ttlId);
      nlMsgLiss("Achei! O seu ID de afiliado é: <b>" + nlEscapar(r.afiid) + "</b>", function(){
        nlChips([{ rotulo:"Entrar na minha área", acao:nlFluxoAfiliado }]);
      });
    } else {
      nlMsgLiss("Não encontrei nenhum cadastro com esse dado. Quer tentar de novo?", function(){
        nlChips([{ rotulo:"Tentar novamente", acao:nlPerdiIdAfiliado }, { rotulo:"Ganhe dinheiro com a Netliss", acao:nlGanharDinheiro }]);
      });
    }
  }, 400);
}
function nlAfiliadoCadastro(){
  nlMsgUser("Quero ser afiliado");
  nlMsgLiss("Perfeito! Preencha seus dados para eu criar o seu material de afiliado:", function(){
    nlForm("<input id='nl-af-pix' type='text' placeholder='Chave PIX para pagamentos' maxlength='80'>" +
           "<input id='nl-af-nome' type='text' placeholder='Nome completo do titular da conta' maxlength='70'>" +
           "<input id='nl-af-banco' type='text' placeholder='Banco' maxlength='40'>" +
           nlTelHtml("nl-af") +
           "<button class='botao' onclick='nlCriarAfiliado()'>Criar meu material</button>");
  });
}
function nlCriarAfiliado(){
  var pix = document.getElementById("nl-af-pix").value.trim();
  var nome = document.getElementById("nl-af-nome").value.trim();
  var banco = document.getElementById("nl-af-banco").value.trim();
  var tel = nlTelLer("nl-af");
  if(pix.length < 4){ alert("Digite a sua chave PIX"); return; }
  if(nome.length < 5){ alert("Digite o nome completo do titular"); return; }
  if(banco.length < 2){ alert("Digite o banco"); return; }
  if(!tel){ alert("Preencha o DDD e o número do WhatsApp"); return; }
  nlMsgUser(nome);
  nlDigitar(async function(){
    var r = await nlApi({ acao:"afiliado_criar", pix:pix, nome:nome, banco:banco, whatsapp:tel });
    if(r && r.success && r.afiid){
      nlSalvar("netliss_afiid", r.afiid, CFG.ttlId);
      var link = "https://www.netliss.com/?ref=" + r.afiid;
      nlMsgLiss("Pronto! Esse é o seu material:<br><br>O SEU <b>ID DE AFILIADO</b> é: <b>" + nlEscapar(r.afiid) + "</b> — guarde bem, é com ele que você entra aqui.<br><br>Seu link: " + link + "<br><br>Como funciona o seu ganho: você recebe <b>20% da PRIMEIRA compra</b> de cada cliente que vier pelo seu link. Não há mensalidade e não há comissão recorrente nas renovações dele. E o pagamento é <b>diário</b>: tudo o que você vender hoje cai na sua chave PIX amanhã.", function(){
        nlChips([
          { rotulo:"Copiar meu link", acao:function(){ nlCopiarTexto(link); nlSistema("link copiado"); } },
          { rotulo:"Baixar meu QR Code", acao:function(){ window.open("https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" + encodeURIComponent(link), "_blank"); } }
        ]);
      });
    } else {
      nlMsgLiss("Opa, tive um probleminha para criar o seu material agora. Tenta de novo em instantes.", function(){
        nlChips([{ rotulo:"Tentar novamente", acao:nlAfiliadoCadastro }]);
      });
    }
  }, 400);
}

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
