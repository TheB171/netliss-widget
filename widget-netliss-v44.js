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
est.textContent = ["","  :root{","    --fundo:#05060d;","    --vidro:rgba(15,19,34,.72);","    --vidro-claro:rgba(255,255,255,.055);","    --borda:rgba(255,255,255,.09);","    --neon:#C6F43F;","    --neon2:#9CCB1E;","    --rosa:#ff3d8a;","    --laranja:#ff8a3d;","    --texto:#f4f6ff;","    --suave:#8b90a8;","    --grad-neon:linear-gradient(135deg,#D5FA66,#A9D51F);","    --fonte-display:'Montserrat',sans-serif;","    --fonte:'Inter',system-ui,sans-serif;","  }","  #nl-moldura *, #nl-bolha *, #nl-teaser *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}","  #nl-moldura, #nl-bolha, #nl-teaser{font-family:var(--fonte);color:var(--texto)}","  @media (prefers-reduced-motion: reduce){","    #nl-bolha{animation:none !important}","  }","","  /* ===== BALÃO ===== */","  #nl-bolha{","    position:fixed;right:22px;bottom:22px;z-index:999990;","    width:72px;height:72px;cursor:pointer;display:none;border:none;background:none;","    filter:drop-shadow(0 8px 22px rgba(0,0,0,.55)) drop-shadow(0 0 16px rgba(198,244,63,.35));","    transition:transform .2s ease;","    animation:flutuar 3.2s ease-in-out infinite;","  }","  #nl-bolha:hover{transform:scale(1.08)}","  #nl-bolha img{width:100%;height:100%;object-fit:contain}","  @keyframes flutuar{0%,100%{translate:0 0}50%{translate:0 -5px}}","","  /* teaser */","  #nl-teaser{","    position:fixed;right:104px;bottom:36px;z-index:999989;max-width:250px;","    background:var(--vidro);backdrop-filter:blur(16px);","    border:1px solid rgba(198,244,63,.35);border-radius:18px 18px 4px 18px;","    padding:14px 16px;font-size:13.5px;line-height:1.5;display:none;cursor:pointer;","    box-shadow:0 12px 34px rgba(0,0,0,.5), 0 0 20px rgba(198,244,63,.12);","  }","  #nl-teaser b{color:var(--neon)}","  #nl-teaser .fechar{position:absolute;top:-9px;left:-9px;width:22px;height:22px;border-radius:50%;","    background:#0f1322;border:1px solid var(--borda);color:var(--suave);","    display:flex;align-items:center;justify-content:center;font-size:11px}","","  /* ===== JANELA ===== */","  #nl-moldura{","    position:fixed;right:20px;bottom:20px;z-index:999995;display:none;","    width:min(392px, calc(100vw - 40px));height:min(640px, calc(100vh - 40px));","    border-radius:28px;padding:1.5px;","    background:linear-gradient(160deg, rgba(198,244,63,.75), rgba(198,244,63,.08) 30%, rgba(255,61,138,.10) 70%, rgba(255,61,138,.55));","    box-shadow:0 30px 80px rgba(0,0,0,.65), 0 0 46px rgba(198,244,63,.14);","  }","  #nl-chat{","    width:100%;height:100%;border-radius:26.5px;overflow:hidden;","    background:var(--vidro);backdrop-filter:blur(22px);","    display:flex;flex-direction:column;","  }","  @media (max-width:520px){","    #nl-moldura{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0;padding:0}","    #nl-chat{border-radius:0}","    #nl-moldura .msg{max-width:91%;font-size:16px;line-height:1.72;padding:15px 17px}","    #nl-moldura .msg p{margin:0 0 13px}","    #nl-moldura .chips{max-width:100%;gap:9px}","    #nl-corpo{gap:12px}","    #nl-moldura .chip{padding:12px 18px;font-size:14.5px;min-height:44px}","    #nl-moldura .card,#nl-moldura .form{max-width:94%;width:94%}","    #nl-moldura .card .desc{font-size:13px}","    #nl-moldura .nl-pill{min-height:48px}","    #nl-corpo{padding:16px 12px}","  }","  /* diagramação dos textos dentro das bolhas */","  #nl-moldura .msg br{display:block;content:'';margin-top:7px}","  #nl-moldura .msg{overflow-wrap:break-word;word-break:break-word;hyphens:auto}","","  #nl-moldura .nl-topo{","    display:flex;align-items:center;gap:12px;padding:14px 18px;flex-shrink:0;","    background:linear-gradient(180deg, rgba(255,255,255,.05), transparent);","    border-bottom:1px solid var(--borda);","  }","  #nl-moldura .nl-topo img{width:46px;height:46px;object-fit:contain}","  #nl-moldura .nl-topo .nome{font-weight:700;font-size:16px;font-family:var(--fonte-display);letter-spacing:.3px}","  #nl-moldura .nl-topo .status{font-size:11.5px;color:var(--neon);display:flex;align-items:center;gap:5px}","  #nl-moldura .nl-topo .status::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--neon);","    box-shadow:0 0 8px rgba(198,244,63,.9);display:inline-block}","  #nl-moldura .nl-topo .acoes{margin-left:auto;display:flex;gap:6px}","  #nl-moldura .nl-topo button{","    background:var(--vidro-claro);border:1px solid var(--borda);color:var(--suave);","    width:32px;height:32px;border-radius:10px;cursor:pointer;font-size:14px","  }","  #nl-moldura .nl-topo button:hover{color:var(--texto);border-color:rgba(255,255,255,.25)}","","  #nl-corpo{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}","  #nl-corpo::-webkit-scrollbar{width:5px}","  #nl-corpo::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:99px}","","  #nl-moldura .msg{max-width:84%;padding:14px 17px;border-radius:18px;font-size:15.5px;line-height:1.7;letter-spacing:.1px;animation:surgir .28s cubic-bezier(.2,.8,.3,1);word-wrap:break-word}","  #nl-moldura .msg p{margin:0 0 12px}","  #nl-moldura .msg p:last-child{margin:0}","  @keyframes surgir{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}","  #nl-moldura .msg.liss{","    background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px 18px 18px 6px;align-self:flex-start;","    box-shadow:0 4px 16px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.06);","  }","  #nl-moldura .msg.user{","    background:var(--grad-neon);color:#04120a;font-weight:500;","    border-radius:18px 18px 6px 18px;align-self:flex-end;","    box-shadow:0 6px 18px rgba(198,244,63,.25), inset 0 1px 0 rgba(255,255,255,.4);","  }","  #nl-moldura .msg b{color:var(--neon)}","  #nl-moldura .msg.user b{color:#04120a}","  #nl-moldura .msg i{color:var(--suave);font-size:12.5px}","","  #nl-moldura .sistema{","    align-self:center;font-size:11px;color:var(--suave);","    border:1px dashed rgba(255,255,255,.15);border-radius:99px;padding:5px 12px;margin:2px 0;","    background:rgba(0,0,0,.2)","  }","  #nl-moldura .sistema b{color:var(--rosa)}","","  #nl-moldura .chip.largo{flex:1 0 100%;justify-content:center;text-align:center}","  #nl-moldura .chips{display:flex;flex-wrap:wrap;gap:8px;align-self:flex-start;max-width:92%;animation:surgir .28s ease}","  #nl-moldura .chip{","    background:var(--vidro-claro);backdrop-filter:blur(8px);","    border:1px solid rgba(198,244,63,.5);color:var(--neon);","    border-radius:99px;padding:10px 17px;font-size:13.5px;font-weight:600;cursor:pointer;","    font-family:var(--fonte);transition:all .16s ease;","  }","  #nl-moldura .chip:hover{background:var(--grad-neon);color:#04120a;border-color:transparent;","    box-shadow:0 0 18px rgba(198,244,63,.35);transform:translateY(-1px)}","  #nl-moldura .chip.secundario{border-color:var(--borda);color:var(--suave)}","  #nl-moldura .chip.secundario:hover{background:rgba(255,255,255,.1);color:var(--texto);box-shadow:none}","","  #nl-moldura .card{","    align-self:flex-start;max-width:88%;","    background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px;padding:15px;animation:surgir .28s ease;","    box-shadow:0 6px 20px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.06);","  }","  #nl-moldura .card .titulo{font-weight:700;font-size:14.5px;margin-bottom:4px;font-family:var(--fonte-display)}","  #nl-moldura .card .desc{font-size:12.5px;color:var(--suave);line-height:1.55;margin-bottom:11px}","  #nl-moldura .card .botao{","    display:inline-block;background:var(--grad-neon);color:#04120a;font-weight:700;font-size:13px;","    border:none;border-radius:11px;padding:10px 17px;cursor:pointer;font-family:var(--fonte);","    box-shadow:0 4px 14px rgba(198,244,63,.28), inset 0 1px 0 rgba(255,255,255,.4);","    transition:transform .15s ease;","  }","  #nl-moldura .card .botao:hover{transform:translateY(-1px)}","  #nl-moldura .card .preco{color:var(--neon);font-weight:700;font-size:19px;font-family:var(--fonte-display);","    text-shadow:0 0 16px rgba(198,244,63,.4)}","  #nl-moldura .card.destaque{border-color:rgba(198,244,63,.55);box-shadow:0 0 26px rgba(198,244,63,.16), inset 0 1px 0 rgba(255,255,255,.06)}","  #nl-moldura .tag{display:inline-block;background:var(--grad-neon);color:#04120a;font-size:10px;font-weight:800;","    border-radius:99px;padding:3px 10px;margin-bottom:7px;letter-spacing:.5px}","  #nl-moldura .video-fake{","    width:100%;aspect-ratio:16/9;background:rgba(0,0,0,.45);border-radius:12px;margin-bottom:11px;","    display:flex;align-items:center;justify-content:center;color:var(--suave);font-size:12px;","    border:1px solid var(--borda);cursor:pointer","  }","  #nl-moldura .video-fake .play{width:46px;height:46px;border-radius:50%;background:var(--grad-neon);color:#04120a;","    display:flex;align-items:center;justify-content:center;font-size:16px;margin-right:10px;","    box-shadow:0 0 20px rgba(198,244,63,.4)}","","  #nl-moldura .form{align-self:flex-start;width:88%;background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px;padding:15px;display:flex;flex-direction:column;gap:10px;animation:surgir .28s ease}","  #nl-moldura .form input{","    background:rgba(0,0,0,.35);border:1px solid var(--borda);border-radius:11px;color:var(--texto);","    padding:12px 14px;font-size:14px;outline:none;font-family:var(--fonte)","  }","  #nl-moldura .form input:focus{border-color:rgba(198,244,63,.6);box-shadow:0 0 12px rgba(198,244,63,.15)}","  #nl-moldura .form .botao{background:var(--grad-neon);color:#04120a;font-weight:700;border:none;border-radius:11px;","    padding:12px;cursor:pointer;font-size:14px;font-family:var(--fonte);","    box-shadow:0 4px 14px rgba(198,244,63,.28), inset 0 1px 0 rgba(255,255,255,.4)}","","  #nl-moldura .digitando{display:flex;gap:4px;align-self:flex-start;background:var(--vidro-claro);","    border:1px solid var(--borda);border-radius:18px 18px 18px 6px;padding:14px 17px}","  #nl-moldura .digitando span{width:7px;height:7px;border-radius:50%;background:var(--neon);opacity:.7;animation:pontinho 1.2s infinite}","  #nl-moldura .digitando span:nth-child(2){animation-delay:.15s}","  #nl-moldura .digitando span:nth-child(3){animation-delay:.3s}","  @keyframes pontinho{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}","","  /* barra de digitação */","  #nl-moldura .nl-input{","    display:none;align-items:center;gap:10px;padding:10px 12px 12px;flex-shrink:0;","    border-top:1px solid var(--borda);animation:surgir .3s ease;","  }","  #nl-moldura .nl-input.ativa{display:flex}","  #nl-moldura .nl-pill{","    flex:1;display:flex;align-items:center;gap:8px;","    background:rgba(0,0,0,.35);border:1px solid var(--borda);border-radius:99px;","    padding:6px 8px 6px 16px;min-height:46px;transition:border-color .15s ease;","  }","  #nl-moldura .nl-pill:focus-within{border-color:rgba(198,244,63,.5);box-shadow:0 0 14px rgba(198,244,63,.12)}","  #nl-moldura .nl-pill input{","    flex:1;background:transparent;border:none;outline:none;color:var(--texto);","    font-size:15px;font-family:var(--fonte);min-width:0","  }","  #nl-moldura .nl-pill input::placeholder{color:var(--suave)}","  #nl-moldura .nl-icone{","    width:34px;height:34px;border:none;background:transparent;cursor:pointer;","    display:flex;align-items:center;justify-content:center;border-radius:50%;","    transition:background .15s ease;flex-shrink:0","  }","  #nl-moldura .nl-icone:hover{background:rgba(255,255,255,.08)}","  #nl-moldura .nl-icone img{width:19px;height:19px;object-fit:contain;opacity:.85}","  #nl-enviar{","    width:46px;height:46px;border:none;background:transparent;cursor:pointer;padding:0;flex-shrink:0;","    filter:drop-shadow(0 4px 14px rgba(198,244,63,.35));","    transition:transform .15s ease;","  }","  #nl-enviar:hover{transform:scale(1.07)}","  #nl-enviar img{width:100%;height:100%;object-fit:contain}","","  #nl-moldura .pix-codigo{","    font-size:10.5px;color:var(--suave);background:rgba(0,0,0,.35);border:1px solid var(--borda);","    border-radius:8px;padding:8px 10px;margin-bottom:10px;word-break:break-all;text-align:center","  }","  #nl-encerrar{","    display:none;text-align:center;font-size:13px;color:#ffffff;font-weight:600;background:#101018;letter-spacing:.2px;","    margin:6px 14px 12px;padding:11px;cursor:pointer;border:1px solid rgba(255,255,255,.18);border-radius:12px;flex-shrink:0;position:relative;z-index:1;","    transition:color .15s ease;","  }","  #nl-encerrar:hover{background:#1b1b26;border-color:rgba(255,255,255,.32)}","  #nl-moldura .nl-rodape{","    padding:0 14px 10px;font-size:10.5px;color:var(--suave);text-align:center;flex-shrink:0","  }",""].join(String.fromCharCode(10));
document.head.appendChild(est);
var cx = document.createElement('div');
cx.innerHTML = ["<div id='nl-teaser' onclick='nlAbrirChat()'>","  <div class='fechar' onclick='event.stopPropagation();nlFecharTeaser()'>x</div>","  <span id='nl-teaser-txt'></span>","</div>","","<button id='nl-bolha' onclick='nlAbrirChat()' aria-label='Abrir chat'>","  <img src='https://i.imgur.com/xfpgEW4.png' alt='Liss'>","</button>","","<div id='nl-moldura'>","<div id='nl-chat'>","  <div class='nl-topo'>","    <img src='https://i.imgur.com/xfpgEW4.png' alt='Liss'>","    <div>","      <div class='nome'>Liss</div>","      <div class='status'>Online agora</div>","    </div>","    <div class='acoes'>","      <button onclick='nlFecharChat()' title='Minimizar'>_</button>","    </div>","  </div>","  <div id='nl-corpo'></div>","  <div id='nl-encerrar' onclick='nlPedirEncerrar()'>Encerrar atendimento</div>","  <div class='nl-input'>","    <div class='nl-pill'>","      <input id='nl-texto' type='text' placeholder='Digite sua mensagem' maxlength='500'>","      <button class='nl-icone' title='Anexar arquivo' onclick='nlDemoAnexo()'><img src='https://i.imgur.com/520dz0b.png' alt=''></button>","      <button class='nl-icone' title='Enviar áudio' onclick='nlAudio()'><img src='https://i.imgur.com/BAbFWEj.png' alt=''></button>","    </div>","    <button id='nl-enviar' onclick='nlEnviarTexto()' title='Enviar'><img src='https://i.imgur.com/1gFtuSA.png' alt='Enviar'></button>","  </div>","  <div class='nl-rodape'>Atendimento Netliss &middot; <b id='nl-id-visual'></b></div>","</div>","</div>"].join(String.fromCharCode(10));
document.body.appendChild(cx);
}


// ================================================================
//  NETLISS — LOGICA DO WIDGET v4 (externo)
//  100% sem barra invertida em strings (compativel GreatPages)
// ================================================================

var CFG = {
  webhook: "https://hook.us2.make.com/7utigfgghdla4j4loav3fu2leopdwp3o",
  webhookRev: "https://hook.us2.make.com/k4z1kgqcy8ofo5rgkr4a6l31xwt4emg2",
  webhookTeste: "https://hook.us2.make.com/illlqngjivaojdjrsruq7h0qxihjq57f",
  webhookChamado: "https://hook.us2.make.com/kazb5kdmxqwivry8ydradfi4yvpag599",
  webhookPag: "https://hook.us2.make.com/3wv4hhwgvnus5a83etltcdm7mghqup2c",
  playStore: "https://play.google.com/store/apps/details?id=com.netlissbrasil.pro",
  linkInter: "https://inter-co.onelink.me/Qyu7/ste2n6tb",
  videoRot1: "https://youtube.com/watch?v=T2C22IteWv4",
  videoRot2: "https://youtube.com/watch?v=4C8p0xTU8N8",
  videoRot3: "https://youtube.com/watch?v=42S8Cfzf_Xg",
  videoTeste: "https://www.youtube-nocookie.com/embed/3LFpGP8JDh8?rel=0&modestbranding=1&playsinline=1",
  planos: {
    "MENSAL":    { id: 21, nome: "Plano Mensal", preco: "R$ 24,90", desc: "30 dias · 1 pessoa · de R$ 39,90 por R$ 24,90 (37% off)" },
    "SEMESTRAL": { id: 22, nome: "Plano Semestral", preco: "R$ 99,90", desc: "6 meses · 1 pessoa · de R$ 239,40 por R$ 99,90 (58% off) · sai por R$ 16,65 por mes" },
    "ANUAL":     { id: 23, nome: "Plano Anual", preco: "R$ 179,90", desc: "1 ano · 1 pessoa · de R$ 478,80 por R$ 179,90 (62% off) · sai por R$ 14,99 por mes" },
    "VITALICIO": { id: 31, idCartao: 30, nome: "Plano Vitalicio", preco: "R$ 390,00", desc: "10 anos · ate 4 pessoas · de R$ 490,00 por R$ 390,00 a vista no PIX · ou R$ 490,00 no cartao em ate 10x de R$ 49,00" }
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
    var rotasRev = ["revendedor_verificar", "revendedor_teste", "revendedor_comprar", "afiliado_criar", "afiliado_consultar"];
    var rotasTeste = ["teste", "reportar_erro", "recompensa"];
    var rotasChamado = ["chamado_abrir", "erro"];
    var rotasPag = ["pagamento_criar", "pagamento_renovar", "pagamento_status", "avisos", "recuperar"];
    var destino = CFG.webhook;
    for(var i = 0; i < rotasRev.length; i++){
      if(payload.acao === rotasRev[i]){ destino = CFG.webhookRev; break; }
    }
    for(var j = 0; j < rotasTeste.length; j++){
      if(payload.acao === rotasTeste[j]){ destino = CFG.webhookTeste; break; }
    }
    for(var k = 0; k < rotasPag.length; k++){
      if(payload.acao === rotasPag[k]){ destino = CFG.webhookPag; break; }
    }
    for(var m = 0; m < rotasChamado.length; m++){
      if(payload.acao === rotasChamado[m]){ destino = CFG.webhookChamado; break; }
    }
    var r = await fetch(destino + "?" + partes.join("&"), { method: "POST" });
    var texto = await r.text();
    try{ return JSON.parse(texto); }catch(e){ return { bruto: texto }; }
  }catch(e){ return null; }
}
function nlRegistrar(autor, texto){
  var limpo = String(texto).replace(/<[^>]+>/g, " ").split(String.fromCharCode(10)).join(" ").split(String.fromCharCode(9)).join(" ").trim();
  if(!limpo){ return; }
  if(!NL.linhas){ NL.linhas = []; }
  NL.linhas.push(autor + ": " + limpo);
  if(NL.envioFila){ clearTimeout(NL.envioFila); }
  NL.envioFila = setTimeout(nlEnviarRegistro, 12000);
}
function nlEnviarRegistro(){
  if(!NL.linhas || !NL.linhas.length){ return; }
  if(!NL.ticket){ nlGarantirTicket(); }
  var bloco = NL.linhas.join(" || ");
  NL.linhas = [];
  nlApiFogo({ acao:"msg", ticket_id: NL.ticket, autor:"atendimento", mensagem: bloco });
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
  if(NL.ultimaFalaUser === texto){ return; }
  NL.ultimaFalaUser = texto;
  nlRegistrar("cliente", texto);
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
function nlParagrafos(t){
  var partes = String(t).split("<br><br>");
  if(partes.length < 2){ return t; }
  var out = "";
  for(var i = 0; i < partes.length; i++){
    var p = partes[i];
    if(p.indexOf("<br>") === 0){ p = p.substring(4); }
    out += "<p>" + p + "</p>";
  }
  return out;
}
function nlMsgLiss(htmlTexto, depois, autor){
  NL.ultimaFalaUser = null;
  nlRegistrar(autor || "liss", htmlTexto);
  nlDigitar(function(){
    var d = document.createElement("div");
    d.className = "msg liss";
    d.innerHTML = nlParagrafos(htmlTexto);
    NL.corpo.appendChild(d);
    nlRolar();
    nlHistPush("liss", htmlTexto);
    nlLog(autor || "minibot", d.textContent);
    if(depois){ depois(); }
  });
}
function nlChips(opcoes){
  var _e = document.getElementById("nl-encerrar"); if(_e && !NL.encerrado){ _e.style.display = "block"; }
  var box = document.createElement("div");
  box.className = "chips";
  for(var i=0;i<opcoes.length;i++){
    (function(op){
      var b = document.createElement("button");
      b.className = "chip" + (op.sec ? " secundario" : "") + (op.largo ? " largo" : "");
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
  var _e = document.getElementById("nl-encerrar"); if(_e){ _e.style.display = "block"; }
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
function nlReiniciar(){
  NL.encerrado = false; nlBloquearDigitacao(); NL.corpo.innerHTML = ""; nlInicio(); }

// ---------------- INICIO ----------------
function nlInicio(origem){
  nlGarantirTicket();
  nlMsgLiss("Olá! Jesus te abençoe! Eu sou a <b>Liss</b>, a assistente virtual da Netliss!", function(){
    nlMsgLiss("Para agilizar o seu atendimento, por favor me conte:", function(){
    nlChips([
      { rotulo:"Sou novo aqui", acao:nlFluxoNovo },
      { rotulo:"Já sou cliente", acao:nlFluxoCliente },
      { rotulo:"Sou revendedor", acao:nlFluxoRevendedor },
      { rotulo:"Sou afiliado", acao:nlFluxoAfiliado },
      { rotulo:"Ganhe dinheiro com a Netliss", largo:true, acao:function(){ nlMsgUser("Ganhe dinheiro com a Netliss"); nlGanharDinheiro(); } }
    ]);
    });
  });
}

// ---------------- NOVO ----------------
function nlFluxoNovo(){
  nlMsgLiss("Seja muito bem-vindo(a)! Antes de tudo, como você se chama?", function(){
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
    nlMsgLiss("A Netliss é internet ilimitada para celular. Somos um aplicativo para sistemas <b>Android</b> que, através da rede da sua operadora, te conecta aos nossos servidores — e por isso você tem internet <b>100% ilimitada de verdade</b>.", function(){
      nlMsgLiss("Também é possível <b>rotear</b> a nossa internet, mas como essa função não depende 100% da Netliss, não é possível oferecer suporte ou garantia para quem quiser rotear. Depois que você contrata, disponibilizamos vídeos tutoriais para tentar ajudar.", function(){
        nlMsgLiss("Ou seja, você precisa do nosso aplicativo instalado no seu dispositivo e precisa do chip da sua operadora para fornecer a rede! Chips virtuais (eSIM) também funcionam. <b>Não precisa de créditos nem de internet.</b>", function(){
          nlMsgLiss("Para eu te explicar sobre as regras de funcionamento, me conta qual operadora você usa?", function(){
            nlApiFogo({ acao:"nome", sistema:"Android" });
            nlChips([
              { rotulo:"TIM", acao:function(){ nlAndroidModalidade("TIM"); } },
              { rotulo:"Vivo", acao:function(){ nlAndroidModalidade("Vivo"); } },
              { rotulo:"Claro", acao:nlClaroTela },
              { rotulo:"Outras operadoras", acao:nlOutrasOperadoras }
            ]);
          });
        });
      });
    });
  });
}
function nlIrParaOperadoras(){ nlNovoAndroid(); }

var PROC1 = "Vamos resolver. O procedimento é este:<br><br>1) Dentro do aplicativo, teste <b>TODAS</b> as opções da sua operadora, uma por uma. Uma delas costuma conectar.<br><br>2) Se nenhuma conectar, ligue o <b>modo avião</b>, espere 2 segundos, desligue e teste todas as opções de novo.";
var PROC2 = "Com o seu chip em dia, isso costuma resolver rápido. Se o seu crédito estiver perto de vencer, ou se você estiver numa área de sinal ruim, pode ser que precise insistir mais um pouco.<br><br>E se, mesmo insistindo, não conectar de jeito nenhum: a rota de conexão está <b>SUSPENSA</b> do lado da operadora. No pré-pago, uma recarga <b>ATIVA NOVAMENTE</b>; no pós-pago, regularizar a fatura <b>ATIVA NOVAMENTE</b>.";

function nlNovoAndroid(){
  nlMsgLiss("Me conta qual operadora você usa?", function(){
    nlChips([
      { rotulo:"TIM", acao:function(){ nlAndroidModalidade("TIM"); } },
      { rotulo:"Vivo", acao:function(){ nlAndroidModalidade("Vivo"); } },
      { rotulo:"Claro", acao:nlClaroTela },
      { rotulo:"Outras operadoras", acao:nlOutrasOperadoras }
    ]);
  });
}
function nlOutrasOperadoras(){
  nlMsgUser("Outras operadoras");
  nlMsgLiss("A nossa base são as redes da <b>TIM</b>, da <b>Vivo</b> e da <b>Claro</b>. Se a sua operadora usa a rede de uma delas, tem tudo para funcionar normalmente.", function(){
    nlMsgLiss("Caso não saiba, pesquise no Google sobre qual rede a sua operadora usa. Normalmente muitas operadoras possuem nome diferente, mas utilizam a mesma rede.", function(){
      nlChips([
        { rotulo:"Usa a rede da TIM", acao:function(){ nlAndroidModalidade("TIM"); } },
        { rotulo:"Usa a rede da Vivo", acao:function(){ nlAndroidModalidade("Vivo"); } },
        { rotulo:"Usa a rede da Claro", acao:nlClaroTela }
      ]);
    });
  });
}
function nlAndroidModalidade(operadora){
  NL.op = operadora;
  nlMsgUser(operadora);
  nlMsgLiss("Anotado: <b>" + operadora + "</b>.", function(){
    nlMsgLiss("E qual é a modalidade do seu chip?", function(){
      nlChips([
        { rotulo:"Pré-pago", acao:function(){ nlAndroidRegras(operadora, "PRE"); } },
        { rotulo:"Pós-pago ou Controle", acao:function(){ nlAndroidRegras(operadora, "POS"); } }
      ]);
    });
  });
}
function nlAndroidRegras(operadora, mod){
  NL.mod = mod;
  nlMsgUser(mod === "PRE" ? "Pré-pago" : "Pós-pago ou Controle");
  nlApiFogo({ acao:"nome", operadora:operadora, modalidade:mod });
  if(mod === "PRE"){
    nlMsgLiss("Como <b>pré-pago</b> funciona com a Netliss...", function(){
      nlMsgLiss("Toda vez que você faz uma recarga, a operadora te dá uma data de validade para aquele saldo. Com o saldo <b>dentro da validade</b> a conexão funciona com mais facilidade.", function(){
        nlMsgLiss("Já o saldo <b>expirado</b> ainda funciona — porém às vezes você vai precisar ativar e desativar o <b>modo avião</b> e testar todas as opções da sua operadora no aplicativo, com um pouco mais de insistência, até conectar.", function(){
          nlMsgLiss("Se o aplicativo ficar <b>procurando rede utilizável</b> e não conectar de jeito nenhum, normalmente é sinal de que a sua operadora suspendeu a rota de conexão da rede. Então é preciso fazer uma recarga mínima com a sua operadora para que o aplicativo volte a funcionar.", function(){
            nlChips([
              { rotulo:"Continuar para o teste", acao:nlPassoApp },
              { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
            ]);
          });
        });
      });
    });
  } else {
    nlMsgLiss("Como <b>pós-pago</b> funciona com a Netliss...", function(){
      nlMsgLiss("Mantenha os pagamentos com a operadora <b>em dia</b>. Se atrasar ou parar de pagar, a operadora suspende a rota de conexão — e o aplicativo para de conectar.", function(){
        nlMsgLiss("Você pode até migrar para um plano mais barato com a sua operadora se quiser economizar. A Netliss precisa da rede apenas para manter a <b>rota de conexão ativa</b> e conectar o seu celular aos nossos servidores.", function(){
          nlChips([
            { rotulo:"Continuar para o teste", acao:nlPassoApp },
            { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
          ]);
        });
      });
    });
  }
}
function nlClaroTela(){
  NL.op = "Claro"; NL.mod = "POS";
  nlMsgUser("Claro");
  nlApiFogo({ acao:"nome", operadora:"Claro", modalidade:"POS" });
  nlMsgLiss("Com a <b>Claro</b>, a Netliss funciona somente no <b>Pós-pago ou Controle</b> — Pré-pago não funciona.", function(){
    nlMsgLiss("Mantenha os pagamentos com a operadora <b>em dia</b>. Se atrasar ou parar de pagar, a operadora suspende a rota de conexão — e o aplicativo para de conectar.", function(){
      nlMsgLiss("Você pode até migrar para um plano mais barato com a sua operadora se quiser economizar. A Netliss precisa da rede apenas para manter a <b>rota de conexão ativa</b> e conectar o seu celular aos nossos servidores.", function(){
        nlChips([
          { rotulo:"Continuar para o teste", acao:nlPassoApp },
          { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
        ]);
      });
    });
  });
}
function nlPassoApp(){
  nlMsgLiss("Primeiro passo é baixar o nosso aplicativo na Play Store. Aproveita para dar uma olhada nas <b>avaliações</b> de quem já usou o nosso app...", function(){
    nlChips([{ rotulo:"Baixar na Play Store", acao:nlAposDownload }]);
  });
}
function nlVideoGrande(){
  var f = document.createElement("div");
  f.id = "nl-video-grande";
  f.style.cssText = "position:fixed;inset:0;z-index:1000000;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(6px)";
  f.innerHTML = "<div style='position:relative;width:min(900px,92vw)'>" +
    "<div style='position:relative;padding-bottom:56.25%;height:0;border-radius:14px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.7)'>" +
    "<iframe src='" + CFG.videoTeste + "&autoplay=1' style='position:absolute;top:0;left:0;width:100%;height:100%;border:0' allow='autoplay; encrypted-media; picture-in-picture; fullscreen' allowfullscreen></iframe></div>" +
    "<button style='position:absolute;top:-46px;right:0;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:99px;padding:8px 18px;font-size:14px;cursor:pointer;font-family:inherit' onclick='nlFecharVideo()'>Fechar</button>" +
    "</div>";
  f.onclick = function(e){ if(e.target === f){ nlFecharVideo(); } };
  document.body.appendChild(f);
}
function nlFecharVideo(){
  var f = document.getElementById("nl-video-grande");
  if(f){ f.parentNode.removeChild(f); }
}
function nlAposDownload(){
  nlMsgUser("Baixar aplicativo");
  window.open(CFG.playStore, "_blank");
  nlMsgLiss("Agora esse vídeo vai te mostrar como se conectar ao nosso app. Assiste primeiro e depois clica abaixo para receber o seu teste:", function(){
    nlCard("<div style='position:relative;padding-bottom:56%;height:0;border-radius:12px;overflow:hidden;margin-bottom:11px;border:1px solid rgba(255,255,255,.09)'><iframe src='" + CFG.videoTeste + "' style='position:absolute;top:0;left:0;width:100%;height:100%;border:0' title='Como fazer o teste' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe></div>" +
      "<button class='botao' style='width:100%;margin-bottom:9px;background:rgba(255,255,255,.1);color:#f4f6ff;box-shadow:none' onclick='nlVideoGrande()'>Ver em tela maior</button>" +
      "<button class='botao' onclick='nlGerarTeste()'>Já assisti, receber teste</button>");
  });
}
async function nlGerarTeste(){
  nlMsgUser("Já assisti, receber teste");
  nlDigitar(async function(){
    var r = await nlApi({ acao:"teste", operadora: NL.op || "", modalidade: NL.mod || "" });
    if(r && r.limite){
      nlMsgLiss("<b>" + nlEscapar(NL.nome || "Tudo bem") + "</b>, eu já liberei para você todos os testes gratuitos que cada cliente tem direito. Por isso, não consigo liberar um novo teste para você.", function(){
        nlMsgLiss("Se você quiser conhecer melhor a Netliss, contrate um plano de 30 dias. Se não gostar ou não quiser continuar, basta não renovar.", function(){
          nlChips([
            { rotulo:"Ver os planos", acao:nlMostrarPlanos },
            { rotulo:"Ganhe dinheiro com a Netliss", acao:nlGanharDinheiro }
          ]);
        });
      });
      return;
    }
    if(r && r.usuario && r.usuario !== "undefined"){
      NL.copiaUser = r.usuario; NL.copiaSenha = r.senha;
      var trata = NL.nome ? ", <b>" + nlEscapar(NL.nome) + "</b>" : "";
      nlMsgLiss("Prontinho" + trata + "! Seu teste grátis está liberado:", function(){
        nlMsgLiss("Usuário: <b>" + nlEscapar(r.usuario) + "</b><br>Senha: <b>" + nlEscapar(r.senha) + "</b><br>Validade: <b>" + nlEscapar(r.validade_horas || "1") + " hora</b><br><br><button class='chip' onclick='nlCopiarCred(0,this)'>Copiar usuário</button> <button class='chip' onclick='nlCopiarCred(1,this)'>Copiar senha</button>", function(){
          nlMsgLiss("É só colocar usuário e senha no aplicativo igualzinho enviamos acima, respeitando letras maiúsculas e minúsculas, números e etc... E depois testar em todas as opções da sua operadora que existem no aplicativo para se conectar. Qualquer dúvida, reveja o vídeo ou fale conosco.", function(){
            nlChips([
              { rotulo:"Quero contratar", acao:nlMostrarPlanos },
              { rotulo:"Ganhe dinheiro com a Netliss", acao:nlGanharDinheiro },
              { rotulo:"Preciso de ajuda", acao:nlSuporteNovo }
            ]);
          });
        });
      });
    } else {
      nlMsgLiss("Opa, não consegui gerar o seu teste. Por favor, tente novamente — e se não der certo, reporte o erro aqui embaixo para avisar a nossa equipe.", function(){
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
  nlMsgLiss("Claro! Me diz o que tá acontecendo:", function(){
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
function nlFimPergunta(){
  if(NL.trilha === "novo"){
    return [{ rotulo:"Quero contratar", acao:nlMostrarPlanos }, { rotulo:"Tenho outra dúvida", acao:nlSuporteNovo }];
  }
  return nlFimSuporte();
}
function nlFecharSuporte(){
  nlMsgUser("Resolvido, obrigado");
  if(NL.diasRestantes !== undefined && NL.diasRestantes !== null && !isNaN(NL.diasRestantes) && NL.diasRestantes > 0 && NL.diasRestantes < 10){
    nlMsgLiss("Que bom que resolvemos! Já que você está por aqui: o seu acesso vence em <b>" + NL.diasRestantes + " dias</b>. Quer garantir a renovação agora?", function(){
      nlChips([{ rotulo:"Quero renovar", acao:nlRenovarPlanos }, { rotulo:"Agora não", sec:true, acao:nlEncerrar }]);
    });
  } else { nlEncerrar(); }
}
function nlErrosMenu(){
  nlMsgUser("Não estou conseguindo conectar");
  nlMsgLiss("Me diz o que está acontecendo ou se aparece alguma mensagem dessas no aplicativo:", function(){
    nlChips([
      { rotulo:"Procurando rede utilizável", acao:nlErroRota },
      { rotulo:"Conecta mas não navega", acao:nlErroRota },
      { rotulo:"Internet lenta", acao:nlErroLenta },
      { rotulo:"Acesso negado", acao:nlErroNegado },
      { rotulo:"Escolha uma configuração", acao:nlErroConfig },
      { rotulo:"Nenhuma configuração encontrada", acao:nlErroSemConfig },
      { rotulo:"Nenhuma dessas opções", acao:nlIrParaLiss }
    ]);
  });
}
function nlErroRota(){
  NL.ultimaOrientacao = "rota";
  nlMsgLiss("Esse comportamento é sinal de que a sua rede com a operadora está enfrentando dificuldades. Por isso o aplicativo não conecta, ou não consegue gerar dados de navegação... Vamos tentar resolver.", function(){
    nlMsgLiss("<b>01)</b> Dentro do aplicativo, você precisa testar <b>TODAS</b> as opções da sua operadora, uma por uma. Uma delas costuma conectar.", function(){
      nlMsgLiss("<b>02)</b> Se nenhuma conectar, ligue o <b>modo avião</b>, espere 2 segundos, desligue o modo avião e teste todas as opções de novo.", function(){
        nlMsgLiss("Se o saldo da sua recarga estiver dentro da validade, isso costuma resolver rápido. Se estiver expirado, ou se você estiver numa área de sinal ruim, pode ser que precise insistir mais um pouco nas etapas 01 e 02.", function(){
          nlMsgLiss("Agora, se mesmo insistindo nesse procedimento não conectar de jeito nenhum: certamente a <b>rota de conexão</b> pode estar SUSPENSA pela operadora. Se for pré-pago, você precisa fazer uma recarga para ativar novamente; se for pós-pago, regularize a fatura do seu plano com a operadora.", function(){
            nlChips(nlFimSuporte());
          });
        });
      });
    });
  });
}
function nlErroLenta(){
  NL.ultimaOrientacao = "lenta";
  nlMsgLiss("Se a internet está lenta, normalmente é a rede da sua operadora que está congestionada ou com sinal fraco naquele momento.", function(){
    nlMsgLiss("<b>01)</b> Dentro do aplicativo, teste as outras opções da sua operadora — algumas rotas ficam mais rápidas que outras.", function(){
      nlMsgLiss("<b>02)</b> Se você usa 5G, mude o tipo de rede do celular para <b>4G (LTE)</b>. O 5G fica trocando de antena o tempo todo e isso atrapalha a conexão.", function(){
        nlMsgLiss("<b>03)</b> Ligue o modo avião por 2 segundos, desligue e conecte de novo. Isso força o celular a pegar uma antena melhor.", function(){
          nlChips(nlFimSuporte());
        });
      });
    });
  });
}
function nlErroNegado(){
  NL.ultimaOrientacao = "negado";
  nlMsgLiss("Esse aviso acontece por dois motivos:", function(){
    nlMsgLiss("<b>1)</b> Seu usuário ou senha podem estar incorretos — verifique como você digitou, com atenção às letras maiúsculas e minúsculas.", function(){
      nlMsgLiss("<b>2)</b> O prazo do seu acesso ou teste já expirou.", function(){
        nlChips(nlFimSuporte());
      });
    });
  });
}
function nlErroConfig(){
  NL.ultimaOrientacao = "config";
  nlMsgLiss("Esse aviso quer dizer que você colocou usuário e senha, mas ainda não escolheu nenhuma opção da sua operadora na lista do aplicativo. Essa opção fica logo acima de onde você inseriu o nome de usuário.", function(){
    nlChips(nlFimSuporte());
  });
}
function nlErroSemConfig(){
  NL.ultimaOrientacao = "semconfig";
  nlMsgLiss("Isso quer dizer que, por algum motivo, o aplicativo não conseguiu baixar ou carregar as configurações.", function(){
    nlMsgLiss("<b>1)</b> Conecte-se em qualquer internet (Wi-Fi ou dados).", function(){
      nlMsgLiss("<b>2)</b> No aplicativo, toque no ícone de atualizar (as setas em círculo, ao lado do botão de conectar).", function(){
        nlMsgLiss("<b>3)</b> Se não resolver, desinstale o aplicativo e instale de novo pela Play Store.", function(){
          nlMsgLiss("Esse é o procedimento completo — as configurações ficam no nosso banco de dados e é o aplicativo que precisa baixá-las. Não há nada que a gente consiga forçar daqui.", function(){
            var b = [{ rotulo:"Baixar na Play Store", acao:function(){ window.open(CFG.playStore, "_blank"); } }];
            nlChips(b.concat(nlFimSuporte()));
          });
        });
      });
    });
  });
}
function nlSupSeguro(){
  NL.ultimaOrientacao = "seguro";
  nlMsgUser("O aplicativo é seguro?");
  nlMsgLiss("É sim. Toda a sua navegação passa dentro de um túnel VPN com criptografia de nível militar entre o seu celular e os nossos servidores.", function(){
    nlMsgLiss("Ninguém consegue ver o que você acessa ou digita. Na prática, é mais seguro do que usar Wi-Fi público.", function(){
      nlMsgLiss("Uma coisa importante: privacidade não é impunidade. Se você usar a Netliss para praticar qualquer tipo de ato criminoso, responderá integralmente perante a lei, e nós iremos colaborar com as autoridades policiais em qualquer investigação necessária para identificar os responsáveis.", function(){
        nlChips(nlFimPergunta());
      });
    });
  });
}
function nlSupLegal(){
  NL.ultimaOrientacao = "legal";
  nlMsgUser("O aplicativo é legalizado?");
  nlMsgLiss("É sim, 100% legalizado. A Netliss é uma empresa de tecnologia fundada em 2019, classificada como Serviço de Valor Adicionado — o SVA, previsto na Lei Geral de Telecomunicações, no artigo 61 da Lei nº 9.472/97.", function(){
    nlMsgLiss("A nossa responsabilidade é desenvolver o aplicativo e manter os nossos servidores. Não somos operadora de telefonia, portanto: não temos relação alguma com a ANATEL, não vendemos chip, não vendemos sinal, não temos antena e coisas desse tipo.", function(){
      nlChips(nlFimPergunta());
    });
  });
}
function nlSupTablet(){
  NL.ultimaOrientacao = "tablet";
  nlMsgUser("Funciona em tablet?");
  nlMsgLiss("Funciona, se o tablet for Android e aceitar o chip da operadora — pode ser o chip virtual também (eSIM), como se fosse um celular. Ou se você rotear do seu celular para o tablet.", function(){
    nlChips(nlFimPergunta());
  });
}
function nlSupRoteador(){
  NL.ultimaOrientacao = "roteador";
  nlMsgUser("Funciona em roteadores?");
  nlMsgLiss("A Netliss é uma combinação do aplicativo mais o chip da operadora. Em modem 4G, mini roteador ou coisas desse tipo, normalmente não funciona.", function(){
    nlMsgLiss("Se você quiser tentar, fica por sua conta e risco: nós da Netliss não damos suporte nem garantia para esse tipo de uso.", function(){
      nlChips(nlFimPergunta());
    });
  });
}
function nlSupCarro(){
  NL.ultimaOrientacao = "carro";
  nlMsgUser("Funciona na multimídia do carro?");
  nlMsgLiss("Existem clientes que conseguem usar sem problema nenhum, desde que seja Android e aceite o chip da operadora. Pode ser o chip virtual também (eSIM). Mas nós não garantimos e não damos suporte para instalação em central multimídia de veículo.", function(){
    nlMsgLiss("Se quiser aprender como funciona no celular e tentar, não tem problema algum, porém é por sua conta e risco.", function(){
      nlChips(nlFimPergunta());
    });
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
  nlMsgLiss("Isso não é com a Netliss, mas sim com a sua rede ou algo desse tipo... Mas algum desses procedimentos pode te ajudar:", function(){
    nlMsgLiss("<b>1)</b> Se você usa 5G, pode ser que mudar o tipo de rede do celular para <b>4G (LTE)</b> resolva. O 5G fica trocando automaticamente de antena o tempo todo, e isso derruba a conexão.", function(){
      nlMsgLiss("<b>2)</b> Veja se o modo de economia de bateria, ou algo parecido, está ativo — configurações desse tipo podem fechar o aplicativo automaticamente.", function(){
        nlMsgLiss("<b>3)</b> Não use o aplicativo com o Wi-Fi ligado: os dois juntos travam a conexão. Para usar a Netliss, desligue o Wi-Fi antes.", function(){
          nlChips(nlFimSuporte());
        });
      });
    });
  });
}
function nlSupLinkApp(){
  window.open(CFG.playStore, "_blank");
  nlChips(nlFimSuporte());
}
function nlSupRotear(){
  NL.ultimaOrientacao = "rotear";
  nlMsgLiss("Lembre-se: o roteamento depende do seu aparelho e não temos como dar suporte se não funcionar. Para TV normalmente não dá certo.", function(){
    nlMsgLiss("Seguem abaixo os vídeos tutoriais para te ajudar:", function(){
      nlChips([
        { rotulo:"Configurar o celular que vai rotear", acao:function(){ window.open(CFG.videoRot1, "_blank"); } },
        { rotulo:"Conectar de outro celular", acao:function(){ window.open(CFG.videoRot2, "_blank"); } },
        { rotulo:"Conectar de um notebook", acao:function(){ window.open(CFG.videoRot3, "_blank"); } },
        { rotulo:"Resolvido, obrigado", acao:nlFecharSuporte },
        { rotulo:"Tenho outra dúvida", acao:nlSuporteAtivo }
      ]);
    });
  });
}
function nlSupCancelar(){
  NL.ultimaOrientacao = "cancelar";
  nlMsgLiss("Para cancelar é simples: basta não renovar quando o seu plano terminar. O acesso encerra sozinho, sem dívida e sem multa — não trabalhamos com fidelidade.", function(){
    nlMsgLiss("Para mudar de plano, você escolhe a nova opção na hora da renovação.", function(){
      nlChips(nlFimSuporte());
    });
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
  nlMsgUser("Esqueci meu usuário");
  nlMsgLiss("Essa recuperação é nova aqui no chat e funciona apenas para quem comprou por aqui informando o e-mail. Se você comprou antes ou por outro canal, não será possível recuperar o seu acesso.", function(){
    nlChips([
      { rotulo:"Comprei pelo chat", acao:nlFormRecuperar },
      { rotulo:"Voltar", acao:nlIrParaLiss }
    ]);
  });
}
function nlFormRecuperar(){
  nlMsgUser("Comprei pelo chat");
  nlMsgLiss("Preciso de duas informações: o e-mail que você informou na compra e a data em que ela foi feita. Se não lembrar a data, ela aparece no extrato do seu banco.", function(){
    nlForm("<input id='nl-rec-email' type='email' placeholder='E-mail da compra' maxlength='80'>" +
           "<input id='nl-rec-data' type='date' style='margin-top:8px'>" +
           "<button class='botao' style='margin-top:8px' onclick='nlEnviarRecuperacao()'>Recuperar meu acesso</button>");
  });
}
function nlEnviarRecuperacao(){
  var email = document.getElementById("nl-rec-email").value.trim();
  var bruta = document.getElementById("nl-rec-data").value;
  if(email.indexOf("@") < 1 || email.indexOf(".") < 3){ alert("Digite um e-mail válido"); return; }
  if(!bruta || bruta.length < 10){ alert("Escolha a data da compra"); return; }
  var partes = bruta.split("-");
  var data = partes[2] + "/" + partes[1] + "/" + partes[0];
  nlMsgUser(email + " - " + data);
  nlDigitar(async function(){
    var r = await nlApi({ acao:"recuperar", email: email, data_compra: data });
    if(r && r.success){
      nlMsgLiss("Pronto! Enviamos os seus dados de acesso para <b>" + nlEscapar(email) + "</b>. Confere a sua caixa de entrada e também o spam.", function(){
        setTimeout(nlEncerrar, 1500);
      });
    } else {
      nlMsgLiss("Não encontrei nenhuma compra com esse e-mail nessa data. Confere o extrato do seu banco e tenta de novo com a data exata.", function(){
        nlChips([{ rotulo:"Tentar de novo", acao:nlFormRecuperar }, { rotulo:"Nenhuma dessas opções", acao:nlIrParaLiss }]);
      });
    }
  }, 400);
}

function nlReportarErro(){
  nlMsgUser("Reportar erro");
  nlApiFogo({ acao:"reportar_erro", assunto:"Erro ao gerar o teste gratis" });
  nlMsgLiss("Erro reportado! Nossa equipe técnica já foi avisada e vai resolver. Tente novamente mais tarde para gerar o seu teste. Obrigada por avisar!", function(){
    nlChips([{ rotulo:"Tentar novamente", acao:nlGerarTeste }, { rotulo:"Ver os planos", acao:nlMostrarPlanos }]);
  });
}


// ---------------- PLANOS E PAGAMENTO ----------------
async function nlCarregarAvisos(){
  var cache = null;
  try{ cache = JSON.parse(localStorage.getItem("nl_avisos") || "null"); }catch(e){ cache = null; }
  if(cache && cache.quando && (Date.now() - cache.quando) < 21600000){
    NL.vitalicioLigado = (cache.vitalicio === "SIM");
    NL.avisoTexto = cache.aviso || "";
    return;
  }
  var a = await nlApi({ acao:"avisos" });
  var vit = (a && a.vitalicio_ligado ? String(a.vitalicio_ligado).toUpperCase() : "NAO");
  var txt = (a && a.aviso_ligado && String(a.aviso_ligado).toUpperCase() === "SIM") ? (a.aviso_texto || "") : "";
  NL.vitalicioLigado = (vit === "SIM");
  NL.avisoTexto = txt;
  try{ localStorage.setItem("nl_avisos", JSON.stringify({ vitalicio: vit, aviso: txt, quando: Date.now() })); }catch(e){}
}
async function nlMostrarPlanos(){
  NL.modoRenov = false;
  await nlCarregarAvisos();
  nlMsgLiss("Todos os nossos planos com pagamento seguro e liberação imediata:", function(){
    var chaves = ["MENSAL","SEMESTRAL","ANUAL"];
    if(NL.vitalicioLigado){ chaves.push("VITALICIO"); }
    for(var i=0;i<chaves.length;i++){
      (function(k){
        var p = CFG.planos[k];
        var c = nlCard((k === "SEMESTRAL" ? "<div class='tag'>MAIS VENDIDO</div>" : "") +
          "<div class='titulo'>" + p.nome + "</div>" +
          "<div class='preco'>" + p.preco + "</div>" +
          "<div class='desc'>" + p.desc + "</div>" +
          "<button class='botao'>Escolher este plano</button>");
        if(k === "SEMESTRAL"){ c.className = "card destaque"; }
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
  if(k === "VITALICIO"){ nlVitalicio(); return; }
  nlAvisoCompra(function(){
    nlMsgLiss("Ótima escolha! E como você prefere pagar?", function(){
      nlChips([
        { rotulo:"PIX", acao:nlFormPix },
        { rotulo:"Cartão de crédito", acao:nlFormCartao }
      ]);
    });
  });
}
function nlVitalicio(){
  nlMsgLiss("Excelente escolha! O Vitalício é o nosso melhor negócio: você paga uma vez e usa por 10 anos, com até 4 pessoas conectadas.<br><br>Por transparência: o nosso sistema permite criar acessos de no máximo 10 anos, e é exatamente esse o prazo que você recebe. Nada de letra miúda.<br><br>E você escolhe como pagar: <b>R$ 390,00 à vista no PIX</b>, com desconto — ou <b>R$ 490,00 no cartão</b>, em até 10x de R$ 49,00.", function(){
    nlChips([
      { rotulo:"Pagar R$390 no PIX", acao:function(){ NL.vitalMetodo = "pix"; nlAvisoCompra(nlFormPix); } },
      { rotulo:"Parcelar R$490 no cartão", acao:function(){ NL.vitalMetodo = "cartao"; nlAvisoCompra(nlFormCartao); } }
    ]);
  });
}
function nlAvisoCompra(seguir){
  nlMsgLiss("Confirme que você recebeu o teste gratuito e que funcionou corretamente, e que ao efetuar o pagamento você está de acordo que depois de confirmado, está ciente de que <b>não há reembolsos</b>.", function(){
    nlMsgLiss("Se ficou alguma dúvida, podemos liberar mais um teste — a gente prefere que você compre com segurança do que se arrependa depois. Ao continuar, você confirma que testou e concorda com essa condição.", function(){
    nlChips([
      { rotulo:"Concordo, continuar", acao:seguir },
      { rotulo:"Preciso de ajuda", acao:function(){ nlSuporteNovo(); } }
    ]);
    });
  });
}
function nlPlanoId(p){
  if(NL.planoAtual === "VITALICIO" && NL.vitalMetodo === "cartao"){ return p.idCartao; }
  return p.id;
}
function nlParcelas(){
  return (NL.planoAtual === "VITALICIO" && NL.vitalMetodo === "cartao") ? 10 : 1;
}
function nlFormPix(){
  nlMsgLiss("Preencha os dados abaixo para gerar o seu <b>código PIX</b>:<br><br><i>A exigência do CPF nas cobranças por PIX cumpre a Resolução BCB nº 1/2020 do Banco Central, garantindo a rastreabilidade das transações para prevenir lavagem de dinheiro ou fraudes.</i><br><br><b>ATENÇÃO ao e-mail:</b> digite um e-mail real e correto, porque é para ele que enviamos o seu acesso e é por ele que você recupera as credenciais se precisar.", function(){
    nlForm("<input id='nl-pg-nome' type='text' placeholder='Seu nome completo' maxlength='60'>" +
           "<input id='nl-pg-email' type='email' placeholder='" + (NL.emailCliente ? "E-mail do cliente" : "Seu e-mail") + "' value='" + (NL.emailCliente || "") + "' maxlength='80'>" +
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
    var corpo = { acao: acaoPg, metodo:"pix", plan_id: nlPlanoId(p), nome: NL.pgNome, email: NL.pgEmail, cpf: NL.pgCpf };
    if(NL.modoRenov && NL.contaRenov){ corpo.account_id = NL.contaRenov; }
    var r = await nlApi(corpo);
    if(r && r.success && r.pix){
      nlMsgLiss("Aqui está o seu PIX do <b>" + p.nome + "</b> (" + p.preco + "). Escaneie o QR Code ou copie o código PIX.<br><br>Assim que pagar, é só clicar no botão abaixo que eu confirmo na hora.", function(){
        nlCard("<img src='data:image/png;base64," + r.pix.qr_code_base64 + "' style='width:180px;display:block;margin:0 auto 10px;border-radius:10px;background:#fff;padding:6px'>" +
          "<div class='pix-codigo' id='nl-pix-txt'>" + nlEscapar(r.pix.qr_code_text) + "</div>" +
          "<div class='desc' style='text-align:center'>Assim que o pagamento for confirmado, eu te aviso <b>aqui mesmo</b> no chat.</div>" +
          "<button class='botao' style='width:100%' onclick='nlCopiarPix()'>Copiar código Pix</button>" +
          "<button class='botao' style='width:100%;margin-top:8px' onclick='nlVerificarPagamento()'>Já paguei, verificar</button>");
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
  NL.pagPendente = { id: String(paymentId), plano: plano };
  try{ localStorage.setItem("nl_pag_pendente", JSON.stringify(NL.pagPendente)); }catch(e){}
  if(NL.metodoPg === "credit_card"){
    nlMsgLiss("Estamos confirmando o seu pagamento e preparando o seu acesso. Isso leva alguns segundos.", function(){
      setTimeout(function(){ nlVerificarPagamento(); }, 15000);
    });
  }
}
function nlDesativarJaPaguei(){
  var bs = document.querySelectorAll("#nl-corpo button");
  for(var i = 0; i < bs.length; i++){
    var oc = bs[i].getAttribute("onclick") || "";
    if(oc.indexOf("nlVerificarPagamento") > -1){
      bs[i].disabled = true;
      bs[i].style.opacity = "0.45";
      bs[i].style.cursor = "default";
      bs[i].textContent = "Acesso ja entregue";
      bs[i].removeAttribute("onclick");
    }
  }
}
function nlLimparPendente(){
  NL.pagPendente = null;
  try{ localStorage.removeItem("nl_pag_pendente"); }catch(e){}
}
async function nlVerificarPagamento(){
  var pend = NL.pagPendente;
  if(!pend){
    try{ pend = JSON.parse(localStorage.getItem("nl_pag_pendente") || "null"); }catch(e){ pend = null; }
  }
  if(!pend){ return; }
  var paymentId = pend.id;
  var plano = pend.plano || { nome:"", preco:"" };
  await (async function(){
    var s = await nlApi({ acao:"pagamento_status", payment_id: String(paymentId), email: NL.pgEmail });
    if(!s){ return; }
    var conta = s.account || {};
    if(!s.username && conta.username){ s.username = conta.username; s.password = conta.password; }
    if(s.status === "approved" && !s.username){
      nlMsgLiss("Pagamento confirmado! Estamos preparando o seu acesso, isso leva alguns segundos.", function(){
        nlChips([{ rotulo:"Verificar de novo", acao:nlVerificarPagamento }]);
      });
      return;
    }
    if(s.status === "approved" || s.status === "paid" || s.status === "confirmed"){
      nlLimparPendente();
      nlDesativarJaPaguei();
      NL.vendaUser = s.username || NL.copiaUser || ""; NL.vendaPlano = plano.nome;
      nlApiFogo({ acao:"venda", plano: plano.nome, valor: plano.preco, usuario: NL.vendaUser, metodo: NL.metodoPg || "pix" });
      var cred = "";
      if(s.username && s.password){
        NL.copiaUser = s.username; NL.copiaSenha = s.password;
        cred = "Usuário: <b>" + nlEscapar(s.username) + "</b><br>Senha: <b>" + nlEscapar(s.password) + "</b><br>Seu acesso vale até <b>" + nlEscapar(s.expires_at || s.validade || "") + "</b><br><br><button class='chip' onclick='nlCopiarCred(0,this)'>Copiar usuário</button> <button class='chip' onclick='nlCopiarCred(1,this)'>Copiar senha</button>";
      } else {
        cred = "Suas credenciais chegam no seu e-mail <b>" + nlEscapar(NL.pgEmail) + "</b> em instantes.";
      }
      nlMsgLiss("<b>Pagamento aprovado!</b> Seja bem-vindo(a) à família Netliss!", function(){
        nlMsgLiss(cred, function(){
          nlMsgLiss("Ah, e todo dia publicamos uma mensagem devocional dentro do aplicativo. Dá uma olhada e, se te fizer bem, compartilha com alguém que precise ler.", function(){
            nlPosCompra();
          });
        });
      });
    }
    if(s.status === "rejected" || s.status === "declined" || s.status === "refused"){
      nlLimparPendente();
      nlMsgLiss("A operadora do cartão <b>recusou</b> o pagamento. Quer tentar de novo?", function(){
        nlChips([
          { rotulo:"Tentar novamente", acao:nlFormDadosCartao },
          { rotulo:"Tentar outro cartão", acao:nlFormDadosCartao },
          { rotulo:"Pagar com PIX", acao:nlFormPix }
        ]);
      });
    }
    if(s.status === "expired" || s.status === "cancelled"){
      nlLimparPendente();
      nlMsgLiss("Esse PIX expirou sem pagamento. Mas não tem problema — quer gerar um novo?", function(){
        nlChips([
          { rotulo:"Gerar novo PIX", acao:nlFormPix },
          { rotulo:"Pagar com cartão", acao:nlFormCartao }
        ]);
      });
    }
  })();
}
function nlFormCartao(){
  nlCarregarSeguranca();
  nlMsgLiss("Perfeito! Preencha os dados abaixo para pagar com <b>cartão de crédito</b>:<br><br><i>A exigência do CPF cumpre a Resolução BCB nº 1/2020 do Banco Central, para prevenir lavagem de dinheiro ou fraudes. O número do cartão você digita em ambiente protegido pelo Mercado Pago.</i><br><br><b>ATENÇÃO ao e-mail:</b> digite um e-mail real e correto, porque é para ele que enviamos o seu acesso e é por ele que você recupera as credenciais se precisar.", function(){
    nlForm("<input id='nl-pg-nome' type='text' placeholder='Seu nome completo' maxlength='60'>" +
           "<input id='nl-pg-email' type='email' placeholder='" + (NL.emailCliente ? "E-mail do cliente" : "Seu e-mail") + "' value='" + (NL.emailCliente || "") + "' maxlength='80'>" +
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
function nlCarregarSeguranca(){
  if(document.getElementById("nl-mp-seg")){ return; }
  var s = document.createElement("script");
  s.id = "nl-mp-seg";
  s.src = "https://www.mercadopago.com/v2/security.js";
  s.setAttribute("view", "checkout");
  s.onload = function(){ NL.mpDevice = window.MP_DEVICE_SESSION_ID || NL.mpDevice || ""; };
  document.head.appendChild(s);
}
function nlDeviceId(){
  return window.MP_DEVICE_SESSION_ID || NL.mpDevice || "";
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
        NL.mpChave = chave;
        NL.mpBin = num.substring(0, 6);
        NL.mpTitular = titular;
        mp.getPaymentMethods({ bin: NL.mpBin }).then(function(bm){
          try{
            if(bm && bm.results && bm.results.length > 0){ NL.mpMetodo = bm.results[0].id; }
          }catch(e2){ NL.mpMetodo = ""; }
        }).catch(function(){ NL.mpMetodo = ""; });
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
    var corpo = { acao: acaoPg, metodo:"credit_card", card_token: tokenCartao, plan_id: nlPlanoId(p), nome: NL.pgNome, email: NL.pgEmail, cpf: NL.pgCpf,
                  mp_payment_method_id: NL.mpMetodo || "", installments: nlParcelas(), cardholder_name: NL.mpTitular || NL.pgNome,
                  mp_public_key_used: NL.mpChave || "", mp_device_session_id: nlDeviceId() };
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
      { rotulo:"Agora não", sec:true, acao:nlGanharDinheiro }
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
  nlMsgLiss("Perfeito! Nossa equipe vai localizar a sua postagem e aplicar o bônus automaticamente direto na conta <b>" + nlEscapar(NL.vendaUser || "") + "</b>. Agora é só aguardar! Jesus te abençoe e muito obrigada por participar.", function(){
    nlChips([
      { rotulo:"Novo atendimento", acao:nlReiniciar }
    ]);
  });
}

// ---------------- JA SOU CLIENTE ----------------
function nlFluxoCliente(){
  nlMsgLiss("Que bom te ver de novo!<br><br>Me fala o seu <b>nome de usuário</b> (o mesmo que você usa no aplicativo):", function(){
    nlForm("<input id='nl-usuario' type='text' placeholder='Seu nome de usuário' maxlength='40'>" +
           "<button class='botao' onclick='nlVerificarUsuario()'>Verificar minha conta</button>" +
           "<button class='botao sec' onclick='nlRecuperarAcesso()'>Esqueci meu usuário</button>");
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
          { rotulo:"Ganhe dinheiro com a Netliss", acao:nlGanharDinheiro }
        ];
        if(dias !== undefined && dias !== null && !isNaN(dias) && dias > 0){
          opcoes.push({ rotulo:"Suporte 24h", acao:nlSuporteAtivo });
        }
        nlChips(opcoes);
      });
    } else {
      nlMsgLiss("Hmm, não encontrei o usuário <b>" + nlEscapar(u) + "</b>. Pode ter sido erro de digitação — ou o acesso já venceu e foi removido do sistema.<br><br>O que você prefere?", function(){
        nlChips([
          { rotulo:"Tentar de novo", acao:nlFluxoCliente },
          { rotulo:"Quero renovar", acao:nlMostrarPlanos },
          { rotulo:"Ganhe dinheiro com a Netliss", acao:nlGanharDinheiro }
        ]);
      });
    }
  }, 400);
}
function nlRenovarPlanos(){
  NL.modoRenov = true;
  nlMsgLiss("Perfeito! Escolha o plano da sua renovação — caso o seu acesso ainda não tenha vencido, os dias contratados são somados ao que você já tem:", function(){
    var chaves = ["MENSAL","SEMESTRAL","ANUAL"];
    if(NL.vitalicioLigado){ chaves.push("VITALICIO"); }
    for(var i=0;i<chaves.length;i++){
      (function(k){
        var p = CFG.planos[k];
        var c = nlCard((k === "SEMESTRAL" ? "<div class='tag'>MAIS VENDIDO</div>" : "") +
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
  nlMsgLiss("Que bom que você quer ganhar dinheiro com a gente! São duas formas de ganhar, e a diferença é simples, vou te explicar:", function(){
    nlMsgLiss("<b>AFILIADO</b> — você só divulga o seu link ou QR Code nas suas redes sociais, no seu site, na sua loja, em grupos de WhatsApp, em panfletos, cartazes, cartão de visitas, onde você quiser. Não paga nada e não atende ninguém: nós cuidamos do atendimento, da entrega e do suporte. Você ganha <b>20% da primeira compra</b> de cada cliente que vier pelo seu link — R$4,98 no mensal, R$19,98 no semestral e R$35,98 no anual. E o pagamento é diário: o que vender hoje cai na sua conta amanhã.", function(){
      nlMsgLiss("<b>REVENDEDOR</b> — você tem o seu próprio negócio. Paga uma licença mensal para ter testes gratuitos ilimitados, e quando for efetuar uma venda, você compra os acessos que for revender a partir de <b>R$2,50</b> e vende pelo preço que quiser. O lucro é bem maior, mas o cliente é seu, e o suporte também: nós damos suporte a você, e você dá suporte aos seus clientes.", function(){
        var _jaEhCliente = (NL.vendaUser || NL.usuarioApp || NL.copiaUser) ? true : false;
        var _fim = function(){
          var b = [
            { rotulo:"Quero ser afiliado", acao:nlAfiliadoCadastro },
            { rotulo:"Quero ser revendedor", acao:nlLicencas }
          ];
          if(!_jaEhCliente){ b.push({ rotulo:"Quero testar", acao:nlFluxoNovo }); }
          nlChips(b);
        };
        if(_jaEhCliente){ _fim(); }
        else {
          nlMsgLiss("Ah, e uma dica: se você ainda não testou a Netliss no seu celular, vale testar antes. A gente não vende bem o que não conhece.", _fim);
        }
      });
    });
  });
}
function nlLicencas(){
  nlMsgUser("Quero ser revendedor");
  nlMsgLiss("<b>LICENÇA BÁSICA</b> — Você paga R$35 por mês: cada acesso de 30 dias sai por <b>R$6,50</b>. Vendendo pelo mesmo preço da Netliss (R$24,90), você lucra <b>R$18,40</b> por venda.", function(){
    nlMsgLiss("<b>LICENÇA TOP</b> — Você paga R$60 por mês: cada acesso sai por <b>R$4,50</b>. Vendendo pelo mesmo preço da Netliss (R$24,90), você lucra <b>R$20,40</b> por venda.", function(){
      nlMsgLiss("<b>LICENÇA VIP</b> — Você paga R$85 por mês: cada acesso sai por <b>R$2,50</b>. Vendendo pelo mesmo preço da Netliss (R$24,90), você lucra <b>R$22,40</b> em cada venda.", function(){
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
           "<button class='botao sec' onclick='nlRecuperarAcesso()'>Esqueci meu ID</button>" +
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
      nlMsgLiss("Opa! Não encontrei uma licença ativa com esse ID — talvez você tenha digitado errado, ou ela pode estar vencida. — ou ela está vencida, ou o ID não confere.<br><br>Se a sua licença venceu, fica tranquilo: todos os acessos que você já vendeu continuam funcionando normalmente até o fim dos 30 dias de cada um. É só renovar para voltar a gerar testes e comprar acessos.<br><br>E se você ainda não é revendedor, posso te explicar como funciona.", function(){
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
  nlMsgLiss("Qual é a operadora do seu cliente?", function(){
    nlChips([
      { rotulo:"TIM", acao:function(){ nlRevModalidade("TIM"); } },
      { rotulo:"Vivo", acao:function(){ nlRevModalidade("Vivo"); } },
      { rotulo:"Claro", acao:function(){ nlRevMostrarRegra("CLARO"); } },
      { rotulo:"Outras operadoras", acao:nlRevOutras },
      { rotulo:"Voltar ao menu", acao:nlMenuRevendedor }
    ]);
  });
}
function nlRevOutras(){
  nlMsgLiss("A nossa base são as redes da <b>TIM</b>, da <b>Vivo</b> e da <b>Claro</b>. Se a operadora do seu cliente usa a rede de uma delas, tem tudo para funcionar normalmente.", function(){
    nlMsgLiss("Caso não saiba, pesquise no Google sobre qual rede a operadora dele usa. Normalmente muitas operadoras possuem nome diferente, mas utilizam a mesma rede.", function(){
      nlChips([
        { rotulo:"Usa a rede da TIM", acao:function(){ nlRevModalidade("TIM"); } },
        { rotulo:"Usa a rede da Vivo", acao:function(){ nlRevModalidade("Vivo"); } },
        { rotulo:"Usa a rede da Claro", acao:function(){ nlRevMostrarRegra("CLARO"); } },
        { rotulo:"Voltar ao menu", acao:nlMenuRevendedor }
      ]);
    });
  });
}
function nlRevModalidade(op){
  nlMsgLiss("Anotado: <b>" + op + "</b>.", function(){
    nlMsgLiss("E qual é a modalidade do chip dele?", function(){
      nlChips([
        { rotulo:"Pré-pago", acao:function(){ nlRevMostrarRegra("PRE"); } },
        { rotulo:"Pós-pago ou Controle", acao:function(){ nlRevMostrarRegra("POS"); } },
        { rotulo:"Voltar ao menu", acao:nlMenuRevendedor }
      ]);
    });
  });
}
var REGRAS_REV = {
  PRE: "Como pre-pago funciona com a Netliss: toda vez que voce faz uma recarga, a operadora te da uma data de validade para aquele saldo. Com o saldo dentro da validade a conexao funciona com mais facilidade. Ja o saldo expirado ainda funciona, porem as vezes voce vai precisar ativar e desativar o modo aviao e testar todas as opcoes da sua operadora no aplicativo, com um pouco mais de insistencia, ate conectar. Se o aplicativo ficar procurando rede utilizavel e nao conectar de jeito nenhum, normalmente e sinal de que a sua operadora suspendeu a rota de conexao da rede. Entao e preciso fazer uma recarga minima para o aplicativo voltar a funcionar.",
  POS: "Como pos-pago funciona com a Netliss: mantenha os pagamentos com a operadora em dia. Se atrasar ou parar de pagar, a operadora suspende a rota de conexao e o aplicativo para de conectar. Voce pode ate migrar para um plano mais barato se quiser economizar. A Netliss precisa da rede apenas para manter a rota de conexao ativa e conectar o seu celular aos nossos servidores.",
  CLARO: "Com a Claro, a Netliss funciona somente no Pos-pago ou Controle. Pre-pago nao funciona. Mantenha os pagamentos com a operadora em dia: se atrasar ou parar de pagar, a operadora suspende a rota de conexao e o aplicativo para de conectar. Voce pode migrar para um plano mais barato se quiser economizar, porque a Netliss precisa da rede apenas para manter a rota de conexao ativa."
};
function nlRevMostrarRegra(chave){
  var t = REGRAS_REV[chave];
  if(!t){ nlMenuRevendedor(); return; }
  NL.regraCopiar = t;
  nlMsgLiss("Manda essa orientação para o seu cliente:", function(){
    nlMsgLiss(t, function(){
      nlChips([
        { rotulo:"Copiar orientação", acao:function(){ nlCopiarTexto(NL.regraCopiar); nlSistema("orientação copiada, é só enviar ao seu cliente"); } },
        { rotulo:"Ver outra operadora", acao:nlRevRegras },
        { rotulo:"Voltar ao menu principal", acao:nlMenuRevendedor }
      ]);
    });
  });
}
function nlRevGerarTeste(){
  nlMsgUser("Gerar teste grátis");
  nlDigitar(async function(){
    var r = await nlApi({ acao:"revendedor_teste", revid: NL.revId });
    if(r && r.usuario){
      NL.copiaUser = r.usuario; NL.copiaSenha = r.senha;
      NL.copiaDados = "Usuário / Teste criado com sucesso: Usuário: " + r.usuario + " · Senha: " + r.senha + " · Validade: " + (r.validade_horas || "1") + " hora. Instruções: no aplicativo, coloque usuário e senha exatamente como enviado. Nas opções de configuração da sua operadora, teste em todas — uma delas deverá se conectar. Se tiver dúvidas me chama aqui...";
      nlMsgLiss("Prontinho! Teste grátis gerado para o seu cliente:<br><br>Usuário: <b>" + nlEscapar(r.usuario) + "</b><br>Senha: <b>" + nlEscapar(r.senha) + "</b><br>Validade: <b>" + nlEscapar(r.validade_horas || "1") + " hora</b><br><br>Clique em Copiar dados que eu monto a mensagem inteira, com usuário, senha, validade e as instruções de como conectar — pronto para enviar ao seu cliente.", function(){
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
      { rotulo:"Comprar agora", acao:nlRevEmailCliente },
      { rotulo:"Voltar ao menu", acao:nlMenuRevendedor }
    ]);
  });
}
function nlRevEmailCliente(){
  nlMsgUser("Comprar agora");
  nlMsgLiss("Me informa o <b>e-mail do cliente</b> que vai usar este acesso. É por esse e-mail que ele consegue recuperar o acesso sozinho depois, sem precisar te procurar.<br><br>Se o acesso for para o seu próprio uso, coloca o seu e-mail.", function(){
    nlForm("<input id='nl-rev-email-cli' type='email' placeholder='E-mail de quem vai usar' maxlength='80'>" +
           "<button class='botao' onclick='nlRevSeguirCompra()'>Continuar</button>");
  });
}
function nlRevSeguirCompra(){
  var e = document.getElementById("nl-rev-email-cli").value.trim();
  if(e.indexOf("@") < 1 || e.indexOf(".") < 3){ alert("Digite um e-mail válido"); return; }
  nlMsgUser(e);
  NL.emailCliente = e;
  nlMostrarMetodos();
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
      nlMsgLiss("Pronto! Esse é o seu material:<br><br>O SEU <b>ID DE AFILIADO</b> é: <b>" + nlEscapar(r.afiid) + "</b> — guarde bem, é com ele que você entra aqui.<br><br>Seu link: " + link + "<br><br>E o seu QR Code está aí embaixo, é só baixar como imagem e usar onde quiser.<br><br>Como funciona o seu ganho: você recebe <b>20% da PRIMEIRA compra</b> de cada cliente que vier pelo seu link. Não há mensalidade e não há comissão recorrente nas renovações dele. E o pagamento é <b>diário</b>: tudo o que você vender hoje cai na sua chave PIX amanhã.", function(){
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
  nlGanharDinheiro();
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
  var _podeChamado = (NL.copiaUser || NL.usuarioApp || NL.vendaUser || NL.revId) ? true : false;
  if(!_podeChamado){
    nlMsgLiss("Para eu abrir um chamado com a nossa equipe, primeiro preciso que você faça o seu teste grátis — é rápido e não custa nada.", function(){
      nlMsgLiss("Assim a nossa equipe já sabe exatamente como o aplicativo se comportou no seu celular e consegue te ajudar de verdade.", function(){
        nlChips([
          { rotulo:"Quero fazer o teste", acao:nlFluxoNovo },
          { rotulo:"Já sou cliente", acao:nlFluxoCliente }
        ]);
      });
    });
    return;
  }
  nlGarantirTicket();
  NL.modoChamado = "problema";
  nlMsgLiss("Certo, me conte com detalhes o que está acontecendo, por favor...", function(){
    nlLiberarDigitacao();
  });
}
function nlChamadoRecebeuProblema(texto){
  NL.chamadoProblema = texto;
  NL.modoChamado = null;
  nlBloquearDigitacao();
  nlMsgLiss("Para te orientar melhor sobre isso, vou precisar abrir um chamado interno para a nossa equipe técnica.", function(){
    nlMsgLiss("Por favor, me informe o seu e-mail e um número de WhatsApp para contato:", function(){
      nlForm("<input id='nl-ch-email' type='email' placeholder='Seu melhor e-mail' maxlength='80'>" +
             "<input id='nl-ch-zap' type='tel' placeholder='WhatsApp com DDD' maxlength='16'>" +
             "<button class='botao' onclick='nlEnviarChamado()'>Abrir chamado</button>");
    });
  });
}
function nlEnviarChamado(){
  var em = document.getElementById("nl-ch-email").value.trim();
  var zap = document.getElementById("nl-ch-zap").value.replace(/[^0-9]/g, "");
  if(em.indexOf("@") < 1 || em.indexOf(".") < 3){ alert("Digite um e-mail válido"); return; }
  if(zap.length < 10){ alert("Digite o WhatsApp com DDD"); return; }
  nlMsgUser(em + " · " + zap);
  nlDigitar(function(){
    nlApiFogo({ acao:"chamado_abrir", nome: NL.nome || "Cliente", email: em, whatsapp: zap, problema: NL.chamadoProblema || "" });
    nlMsgLiss("Chamado aberto com sucesso, agora é só aguardar!", function(){
      nlMsgLiss("Você vai receber a sua resposta por e-mail. Os nossos especialistas analisam os chamados de segunda a sexta, das 9h às 18h.", function(){
        nlMsgLiss("Obrigada e Jesus te abençoe!", function(){
          nlApiFogo({ acao:"ticket_fechar", ticket_id: NL.ticket });
          setTimeout(nlEncerrar, 1200);
        });
      });
    });
  }, 500);
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
  nlApiFogo({ acao:"msg", ticket_id: NL.ticket, autor:"cliente", mensagem: txt });
  if(NL.modoChamado === "problema"){ nlChamadoRecebeuProblema(txt); return; }
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

function nlPedirEncerrar(){
  if(NL.encerrado){ return; }
  nlChips([
    { rotulo:"Sim, encerrar", acao:nlEncerrar },
    { rotulo:"Não, continuar", sec:true, acao:function(){} }
  ]);
  nlMsgLiss("Quer mesmo encerrar o atendimento?");
}
function nlEncerrar(){
  nlEnviarRegistro();
  nlBloquearDigitacao();
  if(NL.pollTimer){ clearInterval(NL.pollTimer); }
  if(NL.ticket){ nlApiFogo({ acao: "ticket_fechar", ticket_id: NL.ticket }); }
  NL.ticket = null;
  NL.difyConv = null;
  try{ localStorage.removeItem("netliss_ticket"); }catch(e){}
  NL.encerrado = true;
  nlMsgLiss("Foi um prazer te atender!<br>Se precisar de qualquer coisa, é só chamar. Jesus te abençoe!", function(){
    nlChips([
      { rotulo:"Novo atendimento", sec:true, acao:function(){ nlReiniciar(); } }
    ]);
    var _e = document.getElementById("nl-encerrar"); if(_e){ _e.style.display = "none"; }
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
  var _r = { gclid: params.get("gclid") || "", fbclid: params.get("fbclid") || "", ttclid: params.get("ttclid") || "", ref: params.get("ref") || "" };
  var _temRastro = (_r.gclid || _r.fbclid || _r.ttclid || _r.ref) ? true : false;
  if(!nlLer("netliss_visitou")){
    nlSalvar("netliss_visitou", true, CFG.ttlId);
    nlApiFogo({ acao: "visita", gclid:_r.gclid, fbclid:_r.fbclid, ttclid:_r.ttclid, ref:_r.ref });
  } else if(_temRastro){
    nlApiFogo({ acao: "retorno", gclid:_r.gclid, fbclid:_r.fbclid, ttclid:_r.ttclid, ref:_r.ref });
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

  var _porLink = document.querySelectorAll("a[href*='abrir-chat'], a[href*='abrirchat'], [data-netliss]");
  for(var _k = 0; _k < _porLink.length; _k++){
    _porLink[_k].addEventListener("click", function(ev){ ev.preventDefault(); ev.stopPropagation(); nlAbrirChat("botao_site"); }, true);
  }
  var _frases = ["teste gratis","teste grátis","atendimento ao cliente","falar com especialistas","escolher este plano","fale com a gente","quero contratar"];
  var _liga = document.querySelectorAll("a, button, div[role='button'], .botao, .btn");
  for(var _i = 0; _i < _liga.length; _i++){
    (function(el){
      if(el.closest && el.closest("#nl-moldura")){ return; }
      var t = (el.textContent || "").trim().toLowerCase();
      if(!t || t.length > 60){ return; }
      for(var _j = 0; _j < _frases.length; _j++){
        if(t.indexOf(_frases[_j]) > -1){
          el.addEventListener("click", function(ev){ ev.preventDefault(); ev.stopPropagation(); nlAbrirChat("botao_site"); }, true);
          break;
        }
      }
    })(_liga[_i]);
  }

  window.addEventListener("pagehide", function(){ try{ nlEnviarRegistro(); }catch(e){} });
  window.addEventListener("beforeunload", function(){ try{ nlEnviarRegistro(); }catch(e){} });

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
