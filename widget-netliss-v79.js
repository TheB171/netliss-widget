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
est.textContent = ["","  :root{","    --fundo:#05060d;","    --vidro:rgba(15,19,34,.72);","    --vidro-claro:rgba(255,255,255,.055);","    --borda:rgba(255,255,255,.09);","    --neon:#C6F43F;","    --neon2:#9CCB1E;","    --rosa:#ff3d8a;","    --laranja:#ff8a3d;","    --texto:#f4f6ff;","    --suave:#8b90a8;","    --grad-neon:linear-gradient(135deg,#D5FA66,#A9D51F);","    --fonte-display:'Montserrat',sans-serif;","    --fonte:'Inter',system-ui,sans-serif;","  }","  #nl-moldura *, #nl-bolha *, #nl-teaser *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}","  #nl-moldura, #nl-bolha, #nl-teaser{font-family:var(--fonte);color:var(--texto)}","  @media (prefers-reduced-motion: reduce){","    #nl-bolha{animation:none !important}","  }","","  /* ===== BALÃO ===== */","  #nl-bolha{","    position:fixed;right:22px;bottom:22px;z-index:999990;","    width:72px;height:72px;cursor:pointer;display:none;border:none;background:none;","    filter:drop-shadow(0 8px 22px rgba(0,0,0,.55)) drop-shadow(0 0 16px rgba(198,244,63,.35));","    transition:transform .2s ease;","    animation:flutuar 3.2s ease-in-out infinite;","  }","  #nl-bolha:hover{transform:scale(1.08)}","  #nl-bolha img{width:100%;height:100%;object-fit:contain}","  @keyframes flutuar{0%,100%{translate:0 0}50%{translate:0 -5px}}","","  /* teaser */","  #nl-teaser{","    position:fixed;right:104px;bottom:36px;z-index:999989;max-width:250px;","    background:var(--vidro);backdrop-filter:blur(16px);","    border:1px solid rgba(198,244,63,.35);border-radius:18px 18px 4px 18px;","    padding:14px 16px;font-size:13.5px;line-height:1.5;display:none;cursor:pointer;","    box-shadow:0 12px 34px rgba(0,0,0,.5), 0 0 20px rgba(198,244,63,.12);","  }","  #nl-teaser b{color:var(--neon)}","  #nl-teaser .fechar{position:absolute;top:-9px;left:-9px;width:22px;height:22px;border-radius:50%;","    background:#0f1322;border:1px solid var(--borda);color:var(--suave);","    display:flex;align-items:center;justify-content:center;font-size:11px}","","  /* ===== JANELA ===== */","  #nl-moldura{","    position:fixed;right:20px;bottom:20px;z-index:999995;display:none;","    width:min(392px, calc(100vw - 40px));height:min(640px, calc(100vh - 40px));","    border-radius:28px;padding:1.5px;","    background:linear-gradient(160deg, rgba(198,244,63,.75), rgba(198,244,63,.08) 30%, rgba(255,61,138,.10) 70%, rgba(255,61,138,.55));","    box-shadow:0 30px 80px rgba(0,0,0,.65), 0 0 46px rgba(198,244,63,.14);","  }","  #nl-chat{","    width:100%;height:100%;border-radius:26.5px;overflow:hidden;","    background:var(--vidro);backdrop-filter:blur(22px);","    display:flex;flex-direction:column;","  }","  @media (max-width:520px){","    #nl-moldura{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0;padding:0}","    #nl-chat{border-radius:0}","    #nl-moldura .msg{max-width:91%;font-size:16px;line-height:1.72;padding:15px 17px}","    #nl-moldura .msg p{margin:0 0 13px}","    #nl-moldura .chips{max-width:100%;gap:9px}","    #nl-corpo{gap:12px}","    #nl-moldura .chip{padding:12px 18px;font-size:14.5px;min-height:44px}","    #nl-moldura .card,#nl-moldura .form{max-width:94%;width:94%}","    #nl-moldura .card .desc{font-size:13px}","    #nl-moldura .nl-pill{min-height:48px}","    #nl-corpo{padding:16px 12px}","  }","  /* diagramação dos textos dentro das bolhas */","  #nl-moldura .msg br{display:block;content:'';margin-top:7px}","  #nl-moldura .msg{overflow-wrap:break-word;word-break:break-word;hyphens:auto}","","  #nl-moldura .nl-topo{","    display:flex;align-items:center;gap:12px;padding:14px 18px;flex-shrink:0;","    background:linear-gradient(180deg, rgba(255,255,255,.05), transparent);","    border-bottom:1px solid var(--borda);","  }","  #nl-moldura .nl-topo img{width:46px;height:46px;object-fit:contain}","  #nl-moldura .nl-topo .nome{font-weight:700;font-size:16px;font-family:var(--fonte-display);letter-spacing:.3px}","  #nl-moldura .nl-topo .status{font-size:11.5px;color:var(--neon);display:flex;align-items:center;gap:5px}","  #nl-moldura .nl-topo .status::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--neon);","    box-shadow:0 0 8px rgba(198,244,63,.9);display:inline-block}","  #nl-moldura .nl-topo .acoes{margin-left:auto;display:flex;gap:6px}","  #nl-moldura .nl-topo button{","    background:var(--vidro-claro);border:1px solid var(--borda);color:var(--suave);","    width:32px;height:32px;border-radius:10px;cursor:pointer;font-size:14px","  }","  #nl-moldura .nl-topo button:hover{color:var(--texto);border-color:rgba(255,255,255,.25)}","","  #nl-corpo{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}","  #nl-corpo::-webkit-scrollbar{width:5px}","  #nl-corpo::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:99px}","","  #nl-moldura .msg{max-width:84%;padding:14px 17px;border-radius:18px;font-size:15.5px;line-height:1.7;letter-spacing:.1px;animation:surgir .28s cubic-bezier(.2,.8,.3,1);word-wrap:break-word}","  #nl-moldura .msg p{margin:0 0 12px}","  #nl-moldura .msg p:last-child{margin:0}","  @keyframes surgir{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}","  #nl-moldura .msg.liss{","    background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px 18px 18px 6px;align-self:flex-start;","    box-shadow:0 4px 16px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.06);","  }","  #nl-moldura .msg.user{","    background:var(--grad-neon);color:#04120a;font-weight:500;","    border-radius:18px 18px 6px 18px;align-self:flex-end;","    box-shadow:0 6px 18px rgba(198,244,63,.25), inset 0 1px 0 rgba(255,255,255,.4);","  }","  #nl-moldura .msg b{color:var(--neon)}","  #nl-moldura .msg.user b{color:#04120a}","  #nl-moldura .msg i{color:var(--suave);font-size:12.5px}","","  #nl-moldura .sistema{","    align-self:center;font-size:11px;color:var(--suave);","    border:1px dashed rgba(255,255,255,.15);border-radius:99px;padding:5px 12px;margin:2px 0;","    background:rgba(0,0,0,.2)","  }","  #nl-moldura .sistema b{color:var(--rosa)}","","  #nl-desce{position:absolute;right:16px;bottom:106px;z-index:40;display:none;width:42px;height:42px;padding:0;","    background:rgba(18,18,26,.94);color:#c3f53c;border:1px solid rgba(195,245,60,.34);border-radius:50%;","    cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.55);font-family:inherit;font-size:18px;line-height:1;","    align-items:center;justify-content:center;transition:transform .18s ease,background .18s ease}","  #nl-desce.tem{display:flex;animation:surgirBalao .28s cubic-bezier(.2,.9,.3,1)}","  #nl-desce:hover{background:rgba(28,28,38,.98);transform:translateY(2px)}","  #nl-desce i{position:absolute;top:-3px;right:-3px;width:10px;height:10px;border-radius:50%;background:#c3f53c;","    box-shadow:0 0 0 2px rgba(12,12,18,.95);animation:piscaBalao 1.5s ease-in-out infinite}","  @keyframes piscaBalao{0%,100%{opacity:1}50%{opacity:.3}}","  @keyframes surgirBalao{from{opacity:0;transform:scale(.65)}to{opacity:1;transform:scale(1)}}","  #nl-moldura .chip.largo{flex:1 0 100%;justify-content:center;text-align:center}","  #nl-moldura .chips{display:flex;flex-wrap:wrap;gap:8px;align-self:flex-start;max-width:92%;animation:surgir .28s ease}","  #nl-moldura .chip{","    background:var(--vidro-claro);backdrop-filter:blur(8px);","    border:1px solid rgba(198,244,63,.5);color:var(--neon);","    border-radius:99px;padding:10px 17px;font-size:13.5px;font-weight:600;cursor:pointer;","    font-family:var(--fonte);transition:all .16s ease;","  }","  #nl-moldura .chip:hover{background:var(--grad-neon);color:#04120a;border-color:transparent;","    box-shadow:0 0 18px rgba(198,244,63,.35);transform:translateY(-1px)}","  #nl-moldura .chip.secundario{border-color:var(--borda);color:var(--suave)}","  #nl-moldura .chip.secundario:hover{background:rgba(255,255,255,.1);color:var(--texto);box-shadow:none}","","  #nl-moldura .card{","    align-self:flex-start;max-width:88%;","    background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px;padding:15px;animation:surgir .28s ease;","    box-shadow:0 6px 20px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.06);","  }","  #nl-moldura .card .titulo{font-weight:700;font-size:14.5px;margin-bottom:4px;font-family:var(--fonte-display)}","  #nl-moldura .card .desc{font-size:12.5px;color:var(--suave);line-height:1.55;margin-bottom:11px}","  #nl-moldura .card .botao{","    display:inline-block;background:var(--grad-neon);color:#04120a;font-weight:700;font-size:13px;","    border:none;border-radius:11px;padding:10px 17px;cursor:pointer;font-family:var(--fonte);","    box-shadow:0 4px 14px rgba(198,244,63,.28), inset 0 1px 0 rgba(255,255,255,.4);","    transition:transform .15s ease;","  }","  #nl-moldura .card .botao:hover{transform:translateY(-1px)}","  #nl-moldura .card .preco{color:var(--neon);font-weight:700;font-size:19px;font-family:var(--fonte-display);","    text-shadow:0 0 16px rgba(198,244,63,.4)}","  #nl-moldura .card.destaque{border-color:rgba(198,244,63,.55);box-shadow:0 0 26px rgba(198,244,63,.16), inset 0 1px 0 rgba(255,255,255,.06)}","  #nl-moldura .tag{display:inline-block;background:var(--grad-neon);color:#04120a;font-size:10px;font-weight:800;","    border-radius:99px;padding:3px 10px;margin-bottom:7px;letter-spacing:.5px}","  #nl-moldura .video-fake{","    width:100%;aspect-ratio:16/9;background:rgba(0,0,0,.45);border-radius:12px;margin-bottom:11px;","    display:flex;align-items:center;justify-content:center;color:var(--suave);font-size:12px;","    border:1px solid var(--borda);cursor:pointer","  }","  #nl-moldura .video-fake .play{width:46px;height:46px;border-radius:50%;background:var(--grad-neon);color:#04120a;","    display:flex;align-items:center;justify-content:center;font-size:16px;margin-right:10px;","    box-shadow:0 0 20px rgba(198,244,63,.4)}","","  #nl-moldura .form{align-self:flex-start;width:88%;background:var(--vidro-claro);border:1px solid var(--borda);","    border-radius:18px;padding:15px;display:flex;flex-direction:column;gap:10px;animation:surgir .28s ease}","  #nl-moldura .form input{","    background:rgba(0,0,0,.35);border:1px solid var(--borda);border-radius:11px;color:var(--texto);","    padding:12px 14px;font-size:14px;outline:none;font-family:var(--fonte)","  }","  #nl-moldura .form input:focus{border-color:rgba(198,244,63,.6);box-shadow:0 0 12px rgba(198,244,63,.15)}","  #nl-moldura .form .botao{background:var(--grad-neon);color:#04120a;font-weight:700;border:none;border-radius:11px;","    padding:12px;cursor:pointer;font-size:14px;font-family:var(--fonte);","    box-shadow:0 4px 14px rgba(198,244,63,.28), inset 0 1px 0 rgba(255,255,255,.4)}","","  #nl-moldura .digitando{display:flex;gap:4px;align-self:flex-start;background:var(--vidro-claro);","    border:1px solid var(--borda);border-radius:18px 18px 18px 6px;padding:14px 17px}","  #nl-moldura .digitando span{width:7px;height:7px;border-radius:50%;background:var(--neon);opacity:.7;animation:pontinho 1.2s infinite}","  #nl-moldura .digitando span:nth-child(2){animation-delay:.15s}","  #nl-moldura .digitando span:nth-child(3){animation-delay:.3s}","  @keyframes pontinho{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}","","  /* barra de digitação */","  #nl-moldura .nl-input{","    display:none;align-items:center;gap:10px;padding:10px 12px 12px;flex-shrink:0;","    border-top:1px solid var(--borda);animation:surgir .3s ease;","  }","  #nl-moldura .nl-input.ativa{display:flex}","  #nl-moldura .nl-pill{","    flex:1;display:flex;align-items:center;gap:8px;","    background:rgba(0,0,0,.35);border:1px solid var(--borda);border-radius:99px;","    padding:6px 8px 6px 16px;min-height:46px;transition:border-color .15s ease;","  }","  #nl-moldura .nl-pill:focus-within{border-color:rgba(198,244,63,.5);box-shadow:0 0 14px rgba(198,244,63,.12)}","  #nl-moldura .nl-pill input{","    flex:1;background:transparent;border:none;outline:none;color:var(--texto);","    font-size:15px;font-family:var(--fonte);min-width:0","  }","  #nl-moldura .nl-pill input::placeholder{color:var(--suave)}","  #nl-moldura .nl-icone{","    width:34px;height:34px;border:none;background:transparent;cursor:pointer;","    display:flex;align-items:center;justify-content:center;border-radius:50%;","    transition:background .15s ease;flex-shrink:0","  }","  #nl-moldura .nl-icone:hover{background:rgba(255,255,255,.08)}","  #nl-moldura .nl-icone img{width:19px;height:19px;object-fit:contain;opacity:.85}","  #nl-enviar{","    width:46px;height:46px;border:none;background:transparent;cursor:pointer;padding:0;flex-shrink:0;","    filter:drop-shadow(0 4px 14px rgba(198,244,63,.35));","    transition:transform .15s ease;","  }","  #nl-enviar:hover{transform:scale(1.07)}","  #nl-enviar img{width:100%;height:100%;object-fit:contain}","","  #nl-moldura .pix-codigo{","    font-size:10.5px;color:var(--suave);background:rgba(0,0,0,.35);border:1px solid var(--borda);","    border-radius:8px;padding:8px 10px;margin-bottom:10px;word-break:break-all;text-align:center","  }","  #nl-encerrar{","    display:none;text-align:center;font-size:13px;color:#ffffff;font-weight:600;background:#101018;letter-spacing:.2px;","    margin:6px 14px 12px;padding:11px;cursor:pointer;border:1px solid rgba(255,255,255,.18);border-radius:12px;flex-shrink:0;position:relative;z-index:1;","    transition:color .15s ease;","  }","  #nl-encerrar:hover{background:#1b1b26;border-color:rgba(255,255,255,.32)}","  #nl-moldura .nl-rodape{","    padding:0 14px 10px;font-size:10.5px;color:var(--suave);text-align:center;flex-shrink:0","  }",""].join(String.fromCharCode(10));
document.head.appendChild(est);
var cx = document.createElement('div');
cx.innerHTML = ["<div id='nl-teaser' onclick='nlAbrirChat()'>","  <div class='fechar' onclick='event.stopPropagation();nlFecharTeaser()'>x</div>","  <span id='nl-teaser-txt'></span>","</div>","","<button id='nl-bolha' onclick='nlAbrirChat()' aria-label='Abrir chat'>","  <img src='https://i.imgur.com/xfpgEW4.png' alt='Liss'>","</button>","","<div id='nl-moldura'>","<div id='nl-chat'>","  <div class='nl-topo'>","    <img src='https://i.imgur.com/xfpgEW4.png' alt='Liss'>","    <div>","      <div class='nome'>Liss</div>","      <div class='status'>Online agora</div>","    </div>","    <div class='acoes'>","      <button onclick='nlFecharChat()' title='Minimizar'>_</button>","    </div>","  </div>","  <div id='nl-corpo'></div>","  <button id='nl-desce' onclick='nlRolar()' title='Ver mensagens novas'>&#8595;<i></i></button>","  <div id='nl-encerrar' onclick='nlPedirEncerrar()'>Encerrar atendimento</div>","  <div class='nl-input'>","    <div class='nl-pill'>","      <input id='nl-texto' type='text' placeholder='Digite sua mensagem' maxlength='500'>","      <button class='nl-icone' title='Anexar arquivo' onclick='nlDemoAnexo()'><img src='https://i.imgur.com/520dz0b.png' alt=''></button>","      <button class='nl-icone' title='Enviar áudio' onclick='nlAudio()'><img src='https://i.imgur.com/BAbFWEj.png' alt=''></button>","    </div>","    <button id='nl-enviar' onclick='nlEnviarTexto()' title='Enviar'><img src='https://i.imgur.com/1gFtuSA.png' alt='Enviar'></button>","  </div>","  <div class='nl-rodape'>Atendimento Netliss &middot; <b id='nl-id-visual'></b></div>","</div>","</div>"].join(String.fromCharCode(10));
document.body.appendChild(cx);
}


// ================================================================
//  NETLISS — LOGICA DO WIDGET v4 (externo)
//  100% sem barra invertida em strings (compativel GreatPages)
// ================================================================

var CFG = {
  webhook: "https://hook.us2.make.com/7utigfgghdla4j4loav3fu2leopdwp3o",
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
    "TRIMESTRAL": { id: 22, nome: "Plano Trimestral", preco: "R$ 59,90", desc: "3 meses · 1 pessoa · de R$ 119,70 por R$ 59,90 (50% off) · sai por R$ 19,97 por mes" },
    "ANUAL":     { id: 23, nome: "Plano Anual", preco: "R$ 99,90", desc: "1 ano · 1 pessoa · de R$ 478,80 por R$ 99,90 (79% off) · sai por R$ 8,32 por mes" },
    "VITALICIO": { id: 31, idCartao: 30, nome: "Plano Vitalicio", preco: "R$ 390,00", desc: "10 anos · ate 4 pessoas · de R$ 490,00 por R$ 390,00 a vista no PIX · ou R$ 490,00 no cartao em ate 10x de R$ 49,00" }
  },
  ttlId: 3153600000000,
  ttlTicket: 86400000,
  pixMinutos: 210,
  fpDias: 30
};
var NL_PLANOS = ["MENSAL","TRIMESTRAL","ANUAL","VITALICIO"];

var NL = { aberto:false, jaAbriu:false, corpo:null, clientId:null, nome:null, op:null, mod:null,
           ticket:null, difyConv:null, aguardando:false, pollTimer:null, planoAtual:null,
           pgNome:null, pgEmail:null, pgCpf:null, contaRenov:null, modoRenov:false, usuarioApp:null };

// ---------------- ARMAZENAMENTO ----------------
function nlSalvar(chave, valor, ttl){
  var pacote;
  try{ pacote = JSON.stringify({ v: valor, e: Date.now() + ttl }); }catch(e){ return; }
  try{ localStorage.setItem(chave, pacote); return; }catch(e){}
  try{
    var lixo = [];
    for(var i = 0; i < localStorage.length; i++){
      var k = localStorage.key(i);
      if(k && k.indexOf("netliss") === 0 && k !== chave && k !== "netliss_id" && k !== "netliss_ticket"){ lixo.push(k); }
    }
    for(var j = 0; j < lixo.length; j++){ localStorage.removeItem(lixo[j]); }
    localStorage.setItem(chave, pacote);
  }catch(e){
    try{ localStorage.clear(); localStorage.setItem(chave, pacote); }catch(e2){}
  }
}
function nlLimpezaInicial(){
  try{
    var teste = "netliss_teste_espaco";
    localStorage.setItem(teste, "1");
    localStorage.removeItem(teste);
  }catch(e){
    try{
      for(var i = localStorage.length - 1; i >= 0; i--){
        var k = localStorage.key(i);
        if(k && k.indexOf("netliss_estado") === 0){ localStorage.removeItem(k); }
      }
    }catch(e2){}
  }
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

// ---------------- INSTABILIDADE ----------------
var NL_INSTAB = "Estou com uma instabilidade nesse momento e não consegui concluir essa etapa.<br><br>Tente de novo em alguns minutos.";
function nlRespostaRuim(texto, obj){
  var t = String(texto || "").trim();
  if(!t){ return true; }
  if(!obj || typeof obj !== "object"){ return true; }
  var b = t.toLowerCase();
  if(obj.bruto){
    if(b.indexOf("data:") === 0){ return false; }
    if(b.indexOf("event:") === 0){ return false; }
    return true;
  }
  if(obj.code && obj.message && obj.success === undefined){ return true; }
  return false;
}
function nlInstabilidade(refazer){
  NL.instCont = (NL.instCont || 0) + 1;
  var primeira = (NL.instCont < 2);
  nlMsgLiss(NL_INSTAB, function(){
    if(typeof refazer === "function" && primeira){
      nlChips([{ rotulo:"Tentar de novo", acao:refazer }]);
    }
  });
}

// ---------------- API ----------------
var NL_LEITURAS = ["pagamento_status", "avisos", "metodos", "renovacao_busca"];
var NL_LEITURA_MUDA = ["avisos", "renovacao_busca"];
async function nlApi(payload, opcoes){
  if(NL.silencioso && NL_LEITURA_MUDA.indexOf(payload.acao) < 0){ return new Promise(function(){}); }
  var op = opcoes || {};
  payload.id_netliss = NL.clientId;
  var partes = [];
  for(var k in payload){
    if(Object.prototype.hasOwnProperty.call(payload, k)){
      var v = payload[k];
      if(v === undefined || v === null){ v = ""; }
      partes.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(v)));
    }
  }
  var rotasTeste = ["teste", "reportar_erro"];
  var rotasChamado = ["chamado_abrir", "erro"];
  var rotasPag = ["pagamento_criar", "pagamento_renovar", "pagamento_status", "avisos", "recuperar", "acesso_socorro"];
  var destino = CFG.webhook;
  if(rotasTeste.indexOf(payload.acao) > -1){ destino = CFG.webhookTeste; }
  if(rotasPag.indexOf(payload.acao) > -1){ destino = CFG.webhookPag; }
  if(rotasChamado.indexOf(payload.acao) > -1){ destino = CFG.webhookChamado; }
  var url = destino + "?" + partes.join("&");
  var voltas = (!op.fogo && NL_LEITURAS.indexOf(payload.acao) > -1) ? 2 : 1;
  for(var t = 0; t < voltas; t++){
    if(t > 0){ await new Promise(function(ok){ setTimeout(ok, 1500); }); }
    var obj = await nlBuscar(url, op.fogo);
    if(obj){
      NL.instCont = 0;
      NL.pagFalhas = 0;
      return obj;
    }
  }
  return null;
}
async function nlBuscar(url, fogo){
  var relogio = null;
  NL.apiEmVoo = (NL.apiEmVoo || 0) + 1;
  try{
    var cfg = { method: "POST" };
    if(fogo && url.length < 7000){ cfg.keepalive = true; }
    else if(typeof AbortController === "function"){
      var ctrl = new AbortController();
      cfg.signal = ctrl.signal;
      relogio = setTimeout(function(){ try{ ctrl.abort(); }catch(e){} }, 45000);
    }
    var r = await fetch(url, cfg);
    var texto = await r.text();
    if(relogio){ clearTimeout(relogio); }
    NL.apiEmVoo = Math.max(0, NL.apiEmVoo - 1);
    var obj = null;
    try{ obj = JSON.parse(texto); }catch(e){ obj = { bruto: texto }; }
    if((r.status && r.status >= 400) || nlRespostaRuim(texto, obj)){ return null; }
    return obj;
  }catch(e){
    if(relogio){ clearTimeout(relogio); }
    NL.apiEmVoo = Math.max(0, (NL.apiEmVoo || 1) - 1);
    return null;
  }
}
function nlRegistrar(autor, texto){
  var limpo = String(texto).replace(/<[^>]+>/g, " ").split(String.fromCharCode(10)).join(" ").split(String.fromCharCode(9)).join(" ").trim();
  if(!limpo){ return; }
  if(!NL.linhas){ NL.linhas = []; }
  NL.linhas.push(autor + ": " + limpo);
  if(NL.envioFila){ clearTimeout(NL.envioFila); }
  NL.envioFila = setTimeout(nlEnviarRegistro, 20000);
}
function nlEnviarRegistro(){
  if(!NL.linhas || !NL.linhas.length){ return; }
  if(!NL.ticket){ nlGarantirTicket(); }
  var bloco = NL.linhas.join(" || ");
  NL.linhas = [];
  nlApiFogo({ acao:"msg", ticket_id: NL.ticket, autor:"atendimento", mensagem: bloco });
}
function nlApiFogo(payload){
  if(NL.silencioso){ return; }
  nlApi(payload, { fogo: true });
}
function nlReportarFalha(onde, err){
  try{
    NL.falhas = NL.falhas || {};
    if(NL.falhas[onde] || (NL.falhasTotal || 0) >= 3){ return; }
    NL.falhas[onde] = 1;
    NL.falhasTotal = (NL.falhasTotal || 0) + 1;
    var msg = String((err && (err.message || err)) || "erro").substring(0, 300);
    nlApiFogo({ acao:"erro", rota: "widget " + onde, detalhe: msg });
  }catch(e){}
}
function nlEsperaLigar(){
  if(NL.silencioso || !NL.corpo){ return; }
  nlEsperaDesligar();
  var t = document.createElement("div");
  t.className = "digitando";
  t.id = "nl-espera";
  t.innerHTML = "<span></span><span></span><span></span>";
  NL.corpo.appendChild(t);
  nlRolar();
}
function nlEsperaDesligar(){
  try{ var t = document.getElementById("nl-espera"); if(t){ t.remove(); } }catch(e){}
}
function nlCpfGuardar(cpf){ try{ sessionStorage.setItem("netliss_cpf", String(cpf || "")); }catch(e){} }
function nlCpfLer(){ try{ return sessionStorage.getItem("netliss_cpf") || ""; }catch(e){ return ""; } }
function nlSoBase64(t){
  var x = String(t || ""), ok = "";
  for(var i = 0; i < x.length; i++){
    var c = x.charAt(i);
    if((c >= "A" && c <= "Z") || (c >= "a" && c <= "z") || (c >= "0" && c <= "9") || c === "+" || c === "/" || c === "="){ ok += c; }
  }
  return ok;
}
function nlDataUtc(v){
  var t = String(v || "").trim();
  if(!t){ return null; }
  var base = t.split(" ").join("T");
  if(base.length <= 10){ base = base + "T00:00:00"; }
  var cauda = base.substring(10);
  if(cauda.indexOf("Z") < 0 && cauda.indexOf("+") < 0 && cauda.indexOf("-") < 0){ base = base + "Z"; }
  var d = new Date(base);
  return isNaN(d.getTime()) ? null : d;
}

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
  nlTocar();
}

// ---------------- HISTORICO ----------------
function nlEstadoSalvar(){
  try{
    nlSalvar("netliss_estado", {
      ver: 76,
      nome: NL.nome || "", op: NL.op || "", mod: NL.mod || "",
      copiaUser: NL.copiaUser || "", copiaSenha: NL.copiaSenha || "",
      usuarioApp: NL.usuarioApp || "", vendaUser: NL.vendaUser || "",
      pgNome: NL.pgNome || "", pgEmail: NL.pgEmail || "", planoAtual: NL.planoAtual || "",
      diasRestantes: (NL.diasRestantes === undefined || NL.diasRestantes === null ? "" : NL.diasRestantes),
      pgId: NL.pgId || "", pgPlano: NL.pgPlano || "",
      vitalMetodo: NL.vitalMetodo || "", modoRenov: (NL.modoRenov ? 1 : 0), contaRenov: NL.contaRenov || "",
      metodoPg: NL.metodoPg || "", trilha: NL.trilha || "", modoChamado: NL.modoChamado || "",
      chEmail: NL.chEmail || "", chZap: NL.chZap || "", chUser: NL.chUser || "", chamadoProblema: NL.chamadoProblema || "",
      recEmail: NL.recEmail || "", recBruta: NL.recBruta || "", fimAgendado: NL.fimAgendado || 0,
      encerrado: (NL.encerrado ? 1 : 0),
      tela: (NL.corpo ? NL.corpo.innerHTML : ""),
      botoes: NL.ultimosChips || [],
      telaAtual: NL.telaAtual || "", telaArgs: NL.telaArgs || []
    }, 2592000000);
  }catch(e){}
}
function nlEstadoRestaurar(){
  try{
    var e = nlLer("netliss_estado");
    if(!e){ return false; }
    NL.nome = e.nome || NL.nome; NL.op = e.op; NL.mod = e.mod;
    NL.copiaUser = e.copiaUser; NL.copiaSenha = e.copiaSenha;
    NL.usuarioApp = e.usuarioApp; NL.vendaUser = e.vendaUser;
    NL.pgNome = e.pgNome || NL.pgNome; NL.pgEmail = e.pgEmail; NL.planoAtual = e.planoAtual;
    if(e.diasRestantes !== "" && e.diasRestantes !== undefined && e.diasRestantes !== null){ NL.diasRestantes = e.diasRestantes; }
    NL.vitalMetodo = e.vitalMetodo || NL.vitalMetodo;
    NL.modoRenov = e.modoRenov ? true : false;
    NL.contaRenov = e.contaRenov || NL.contaRenov;
    NL.metodoPg = e.metodoPg || NL.metodoPg;
    NL.trilha = e.trilha || NL.trilha;
    NL.modoChamado = e.modoChamado || null;
    NL.chEmail = e.chEmail || NL.chEmail; NL.chZap = e.chZap || NL.chZap; NL.chUser = e.chUser || NL.chUser;
    NL.chamadoProblema = e.chamadoProblema || NL.chamadoProblema;
    NL.recEmail = e.recEmail || NL.recEmail; NL.recBruta = e.recBruta || NL.recBruta;
    NL.fimAgendado = e.fimAgendado || 0;
    NL.pgCpf = nlCpfLer() || NL.pgCpf;
    NL.encerrado = e.encerrado ? true : false;
    NL.telaAtual = e.telaAtual || "";
    NL.telaArgs = e.telaArgs || [];
    return true;
  }catch(err){ return false; }
}
function nlHistPush(autor, html){
  nlEstadoSalvar();
  try{
    var hh = nlLer("netliss_hist") || [];
    hh.push({ a: autor, m: html });
    if(hh.length > 400){ hh = hh.slice(hh.length - 400); }
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
function nlChecarDesce(){
  var b = document.getElementById("nl-desce");
  if(!b || !NL.corpo){ return; }
  var falta = NL.corpo.scrollHeight - NL.corpo.scrollTop - NL.corpo.clientHeight;
  if(falta > 60 && NL.aberto){ b.classList.add("tem"); } else { b.classList.remove("tem"); }
}
function nlRolar(){
  NL.corpo.scrollTop = NL.corpo.scrollHeight;
  setTimeout(nlChecarDesce, 220);
}
function nlFichaLer(){
  var f = nlLer("netliss_cliente");
  if(!f || typeof f !== "object"){ return {}; }
  return f;
}
function nlFichaGravar(dados){
  try{
    var f = nlFichaLer();
    for(var k in dados){ if(dados.hasOwnProperty(k)){ f[k] = dados[k]; } }
    nlSalvar("netliss_cliente", f, 31536000000);
  }catch(e){}
}
function nlTocar(){
  try{ nlSalvar("netliss_visto", Date.now(), 2592000000); }catch(e){}
}
function nlOcioso(){
  var v = nlLer("netliss_visto");
  if(!v){ return false; }
  return (Date.now() - v) > 86400000;
}
function nlNomeFn(f){
  if(!f){ return ""; }
  if(f.__nome){ return f.__nome; }
  if(f.name && f.name !== "nova" && f.name.indexOf("nl") === 0){ return f.name; }
  return "";
}
function nlLimparChips(){
  var velhos = NL.corpo.querySelectorAll(".chips, .form");
  for(var i=0;i<velhos.length;i++){ velhos[i].remove(); }
  NL.ultimosChips = [];
}
function nlEscapar(t){
  var d = document.createElement("div");
  d.textContent = (t === null || t === undefined) ? "" : String(t);
  return d.innerHTML.split(String.fromCharCode(34)).join("&quot;").split(String.fromCharCode(39)).join("&#39;");
}
function nlMsgUser(texto){
  if(NL.silencioso){ return; }
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
function nlAvisinho(txt){
  try{
    var d = document.createElement("div");
    d.className = "sistema";
    d.textContent = txt;
    NL.corpo.appendChild(d);
    nlRolar();
    setTimeout(function(){ try{ d.remove(); }catch(e){} }, 2600);
  }catch(e){}
}
function nlSistema(htmlTexto){
  var d = document.createElement("div");
  d.className = "sistema";
  d.innerHTML = htmlTexto;
  NL.corpo.appendChild(d);
  nlRolar();
}
function nlDigitar(depois, ms){
  if(NL.silencioso){ depois(); return; }
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
  if(NL.silencioso){ if(depois){ depois(); } return; }
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
function nlClique(el, nome){
  var r = el.getAttribute("data-r") || el.textContent;
  nlMsgUser(r);
  if(typeof window[nome] === "function"){ window[nome](); }
}
function nlVivo(nome){
  if(typeof window[nome] === "function"){ window[nome](); }
}
function nlChips(opcoes){
  var _e = document.getElementById("nl-encerrar"); if(_e && !NL.encerrado){ _e.style.display = "block"; }
  NL.ultimosChips = [];
  var box = document.createElement("div");
  box.className = "chips";
  for(var i=0;i<opcoes.length;i++){
    var op = opcoes[i];
    var _nm = nlNomeFn(op.acao);
    NL.ultimosChips.push({ r: op.rotulo, f: _nm, s: op.sec ? 1 : 0, g: op.largo ? 1 : 0, m: op.manter ? 1 : 0 });
    var b = document.createElement("button");
    b.className = "chip" + (op.sec ? " secundario" : "") + (op.largo ? " largo" : "");
    b.textContent = op.rotulo;
    b.setAttribute("data-r", op.rotulo);
    if(_nm && typeof window[_nm] === "function"){
      if(op.manter){
        b.setAttribute("data-vivo", "1");
        b.setAttribute("onclick", "nlVivo('" + _nm + "')");
      } else {
        b.setAttribute("onclick", "nlClique(this, '" + _nm + "')");
      }
    } else if(op.acao){
      (function(fn, rot, manter){
        b.onclick = function(){ if(!manter){ nlMsgUser(rot); } fn(); };
      })(op.acao, op.rotulo, op.manter);
      if(op.manter){ b.setAttribute("data-vivo", "1"); }
    }
    box.appendChild(b);
  }
  NL.corpo.appendChild(box);
  nlRolar();
  try{ nlEstadoSalvar(); }catch(e){}
}
function nlTrancado(chave){
  var agora = Date.now();
  if(!NL.travas){ NL.travas = {}; }
  if(NL.travas[chave] && agora < NL.travas[chave]){ return true; }
  NL.travas[chave] = agora + 1500;
  return false;
}
function nlDestravar(){
  NL.travas = NL.travas || {};
  for(var _tk in NL.travas){ NL.travas[_tk] = 0; }
  setTimeout(function(){
    try{
      if(!NL.corpo){ return; }
      var fs2 = NL.corpo.querySelectorAll(".form");
      if(!fs2.length){ return; }
      var bs = fs2[fs2.length - 1].querySelectorAll("button");
      for(var i = 0; i < bs.length; i++){
        var b = bs[i];
        var guardado = b.getAttribute("data-onclick");
        if(guardado){ b.setAttribute("onclick", guardado); }
        b.removeAttribute("data-inerte");
        b.disabled = false;
        b.style.opacity = "1";
        b.style.cursor = "pointer";
      }
    }catch(e){}
  }, 40);
}
function nlMatarBotao(b){
  try{
    if(!b){ return; }
    if(b.getAttribute("data-vivo") === "1"){ return; }
    if(b.getAttribute("data-inerte") === "1"){ return; }
    b.setAttribute("data-inerte", "1");
    var _oc = b.getAttribute("onclick");
    if(_oc){ b.setAttribute("data-onclick", _oc); }
    b.onclick = null;
    b.removeAttribute("onclick");
    b.disabled = true;
    b.style.opacity = "0.35";
    b.style.cursor = "default";
  }catch(e){}
}
function nlMatarLista(lista){
  if(!lista){ return; }
  for(var i = 0; i < lista.length; i++){ nlMatarBotao(lista[i]); }
}
function nlVigiarCliques(){
  if(!NL.corpo || NL.vigiando){ return; }
  NL.vigiando = true;
  NL.corpo.addEventListener("click", function(ev){
    var alvo = ev.target;
    while(alvo && alvo !== NL.corpo && alvo.tagName !== "BUTTON"){ alvo = alvo.parentNode; }
    if(!alvo || alvo.tagName !== "BUTTON"){ return; }
    if(alvo.getAttribute("data-vivo") === "1"){ return; }
    if(alvo.getAttribute("data-inerte") === "1"){ return; }
    var atuais = [];
    var todos = NL.corpo.querySelectorAll("button");
    for(var i = 0; i < todos.length; i++){ atuais.push(todos[i]); }
    setTimeout(function(){ nlMatarLista(atuais); }, 0);
  }, true);
}
function nlInertes(tipo){
  try{
    var alvos = NL.corpo.querySelectorAll("[data-nl='" + tipo + "'] button");
    for(var i = 0; i < alvos.length; i++){
      var b = alvos[i];
      if(b.getAttribute("data-vivo") === "1"){ continue; }
      if(b.getAttribute("data-inerte") === "1"){ continue; }
      b.setAttribute("data-inerte", "1");
      b.onclick = null;
      b.disabled = true;
      b.style.opacity = "0.35";
      b.style.cursor = "default";
    }
  }catch(e){}
}
function nlCard(htmlTexto, extra){
  var d = document.createElement("div");
  d.className = "card" + (extra && extra.cls ? " " + extra.cls : "");
  if(extra && extra.nl){ d.setAttribute("data-nl", extra.nl); }
  if(extra && extra.id){ d.id = extra.id; }
  d.innerHTML = htmlTexto;
  NL.corpo.appendChild(d);
  nlRolar();
  try{ nlEstadoSalvar(); }catch(e){}
  return d;
}
function nlForm(htmlTexto){
  var f = document.createElement("div");
  f.className = "form";
  f.innerHTML = htmlTexto;
  NL.corpo.appendChild(f);
  nlRolar();
  try{ nlEstadoSalvar(); }catch(e){}
  return f;
}

// ---------------- TELEFONE UNIVERSAL ----------------
function nlTelHtml(pre, rotulo){
  var titulo = rotulo || "WhatsApp para contato";
  return "" +
    "<div style='font-size:12px;opacity:.72;margin:2px 0 5px 3px'>" + titulo + "</div>" +
    "<div style='display:flex;gap:6px'>" +
    "<select id='" + pre + "-pais' style='background:rgba(0,0,0,.35);border:1px solid var(--borda);border-radius:11px;color:var(--texto);padding:12px 4px;font-size:12px;width:72px;min-width:72px;flex:0 0 72px;font-family:var(--fonte)'>" +
    "<option value='55' selected>BR +55</option>" +
    "<option value='351'>PT +351</option>" +
    "<option value='1'>US +1</option>" +
    "<option value='595'>PY +595</option>" +
    "<option value='598'>UY +598</option>" +
    "<option value='54'>AR +54</option>" +
    "</select>" +
    "<input id='" + pre + "-ddd' type='tel' placeholder='DDD' maxlength='3' style='width:54px;min-width:54px;flex:0 0 54px;text-align:center;padding-left:4px;padding-right:4px'>" +
    "<input id='" + pre + "-num' type='tel' placeholder='Número' maxlength='10' style='flex:1 1 auto;min-width:0'>" +
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
  try{ nlSalvar("netliss_aberto", 1, 21600000); }catch(e){}
  if(!NL.jaAbriu){
    NL.jaAbriu = true;
    try{ nlIniciarFp(); }catch(e){}
    var _h = nlLer("netliss_hist") || [];
    var _t = nlLer("netliss_ticket");
    var _es = nlLer("netliss_estado") || {};
    if(_es.encerrado){ NL.encerrado = false; }
    if(_h.length && !_es.encerrado && nlOcioso()){
      nlExpirarPorInatividade();
      nlComecar(origem);
    } else if(_h.length && _t && !_es.encerrado && !NL.encerrado){
      nlContinuar(origem);
      setTimeout(function(){ try{ nlRetomarPagamento(); }catch(e){} }, 900);
    } else {
      nlComecar(origem);
    }
  }
}
function nlFecharChat(){
  document.getElementById("nl-moldura").style.display = "none";
  document.getElementById("nl-bolha").style.display = "block";
  NL.aberto = false;
  try{ nlSalvar("netliss_aberto", 0, 21600000); }catch(e){}
}
function nlFecharTeaser(){ document.getElementById("nl-teaser").style.display = "none"; }
function nlVoltarAoAtendimento(){
  nlNaoEncerrar();
}
function nlReiniciar(){
  NL.encerrado = false;
  NL.pedindoEncerrar = false;
  NL.modoChamado = null;
  NL.fimAgendado = 0;
  nlPararCrono();
  nlPararVerificacao();
  NL.pgAtivo = false;
  nlBloquearDigitacao();
  NL.corpo.innerHTML = "";
  NL.ultimosChips = []; NL.telaAtual = ""; NL.telaArgs = [];
  try{ nlSalvar("netliss_estado", { tela: "", botoes: [], telaAtual: "", telaArgs: [], encerrado: 0 }, 2592000000); }catch(e){}
  nlHistRestaurar();
  nlComecar();
}

function nlBotaoVivo(b){
  if(!b || b.disabled){ return false; }
  if(b.getAttribute("data-inerte") === "1"){ return false; }
  return b.getAttribute("onclick") ? true : false;
}
function nlTemAcao(){
  if(!NL.corpo){ return false; }
  if(NL.modoChamado === "problema"){ return true; }
  var bs = NL.corpo.querySelectorAll(".chips button, .form button, .card button");
  for(var i = 0; i < bs.length; i++){
    if(bs[i].getAttribute("data-vivo") === "1"){ continue; }
    if(nlBotaoVivo(bs[i])){ return true; }
  }
  var pend = nlLerPendente();
  if(pend){
    if(document.getElementById("nl-card-pix")){ return true; }
    if(pend.metodo === "credit_card" && Date.now() - (pend.inicio || 0) < 1800000 && (NL.telaAtual === "nlPagarCartao" || NL.telaAtual === "nlTokenizarEPagar")){ return true; }
  }
  return false;
}
function nlDesarmarMortos(){
  try{
    var dg = NL.corpo.querySelectorAll(".digitando");
    for(var j = 0; j < dg.length; j++){ dg[j].remove(); }
    var bs = NL.corpo.querySelectorAll("button");
    for(var i = 0; i < bs.length; i++){
      var b = bs[i];
      if(b.disabled || b.getAttribute("data-inerte") === "1"){ continue; }
      if(b.getAttribute("onclick")){ continue; }
      b.setAttribute("data-inerte", "1");
      b.removeAttribute("data-vivo");
      b.disabled = true;
      b.style.opacity = "0.35";
      b.style.cursor = "default";
    }
  }catch(e){}
}
function nlRefazerBotoes(e){
  if(!e || !e.botoes || !e.botoes.length){ return false; }
  var b = [];
  for(var i = 0; i < e.botoes.length; i++){
    var nome = e.botoes[i].f;
    var fn = (nome && typeof window[nome] === "function") ? window[nome] : null;
    if(fn){ b.push({ rotulo: e.botoes[i].r, sec: e.botoes[i].s ? true : false, largo: e.botoes[i].g ? true : false, manter: e.botoes[i].m ? true : false, acao: fn }); }
  }
  if(!b.length){ return false; }
  nlChips(b);
  return true;
}
var NL_NAO_REPETIR = ["nlGerarTeste","nlPagarPix","nlPagarCartao","nlTokenizarEPagar","nlConfirmouPix","nlConfirmouCartao",
  "nlDispararChamado","nlChamadoPagamento","nlEnviarRecuperacao","nlAcessoSocorro","nlReportarErro","nlEncerrar",
  "nlFecharSuporte","nlSalvarNome","nlValidarDadosPix","nlValidarDadosCartao","nlEnviarChamado","nlVerificarUsuario"];
function nlRefazerTela(e){
  if(!e || !e.telaAtual || typeof window[e.telaAtual] !== "function"){ return false; }
  if(NL_NAO_REPETIR.indexOf(e.telaAtual) > -1){ return false; }
  var abrirReal = window.open;
  try{
    NL.silencioso = true;
    window.open = function(){ return null; };
    window[e.telaAtual].apply(null, e.telaArgs || []);
  }catch(err){}
  NL.silencioso = false;
  window.open = abrirReal;
  return nlTemAcao();
}
function nlResgateSeNada(e, ms){
  var limite = Date.now() + ms;
  var olhar = function(){
    if(nlTemAcao()){ return; }
    if(Date.now() < limite){ setTimeout(olhar, 300); return; }
    if(!nlRefazerBotoes(e)){ nlResgate(); }
  };
  setTimeout(olhar, 300);
}
function nlResgate(){
  nlChips([
    { rotulo:"Continuar meu atendimento", acao:nlVoltarAoMenu },
    { rotulo:"Começar de novo", sec:true, acao:nlReiniciar }
  ]);
}
function nlVoltarAoMenu(){
  if(NL.usuarioApp){ nlSuporteAtivo(); return; }
  if(NL.op){ nlNovoAndroid(); return; }
  nlFluxoNovo();
}
function nlExpirarPorInatividade(){
  var t = nlLer("netliss_ticket");
  var id = (t && t.id) ? t.id : t;
  if(id){ try{ nlApiFogo({ acao:"ticket_fechar", ticket_id: id }); }catch(e){} }
  try{ localStorage.removeItem("netliss_ticket"); }catch(e){}
  try{ nlSalvar("netliss_estado", { tela:"", botoes:[], telaAtual:"", telaArgs:[], encerrado:0 }, 2592000000); }catch(e){}
  NL.ticket = null; NL.difyConv = null; NL.encerrado = false;
  NL.corpo.innerHTML = "";
  nlHistRestaurar();
  nlSistema("Atendimento anterior encerrado por inatividade.");
  nlTocar();
}
function nlContinuar(origem){
  nlEstadoRestaurar();
  var salvo = nlLer("netliss_ticket");
  if(salvo && salvo.id){ NL.ticket = salvo.id; NL.difyConv = salvo.dify || null; }
  var e = nlLer("netliss_estado") || {};
  if(e.tela){
    NL.corpo.innerHTML = e.tela;
    nlDesarmarMortos();
    if(document.getElementById("nl-cc-num")){ nlCarregarSeguranca(); }
    nlRolar();
    setTimeout(nlRolar, 150);
    if(NL.fimAgendado){ nlEncerrar(); return; }
    if(NL.modoChamado === "problema"){ nlLiberarDigitacao(); }
    else if(!nlTemAcao()){
      if(nlRefazerTela(e)){ }
      else if(e.telaAtual && NL_NAO_REPETIR.indexOf(e.telaAtual) < 0 && typeof window[e.telaAtual] === "function"){ nlResgateSeNada(e, 10000); }
      else if(!nlRefazerBotoes(e)){ nlResgate(); }
    }
    setTimeout(nlRolar, 120);
    return;
  }
  NL.corpo.innerHTML = "";
  nlHistRestaurar();
  var trata = NL.nome ? ("<b>" + nlEscapar(NL.nome) + "</b>, ") : "";
  nlMsgLiss("Oi de novo, " + trata + "continuamos de onde paramos!", function(){
    nlChips([{ rotulo:"Continuar meu atendimento", acao:nlVoltarAoMenu }]);
  });
}

var NL_TELAS = ["nlInicio","nlJaTestou","nlFluxoNovo","nlSalvarNome","nlOpTim","nlOpVivo","nlModalPre","nlModalPos",
  "nlRotaConexao","nlIrParaOperadoras","nlNovoAndroid","nlOutrasOperadoras","nlAndroidModalidade","nlAndroidRegras","nlClaroTela",
  "nlPassoApp","nlAposDownload","nlGerarTeste","nlSuporteNovo","nlFecharSuporte","nlErrosMenu","nlErroRota","nlErroLenta",
  "nlErroNegado","nlErroLimite","nlFormChamadoLimite","nlFormChamadoGeral","nlConfirmarDados","nlErroConfig","nlErroSemConfig",
  "nlSupSeguro","nlSupLegal","nlSupTablet","nlSupRoteador","nlSupCarro","nlSuporteAtivo","nlSupCaindo","nlSupLinkApp",
  "nlSupRotear","nlSupCancelar","nlRecuperarAcesso","nlFormRecuperar","nlEnviarRecuperacao","nlReportarErro",
  "nlMostrarPlanos","nlMostrarMetodos","nlPlanoN","nlEscolherPlano","nlPerguntarMetodo","nlVitalicio","nlVitalPix","nlVitalCartao",
  "nlAvisoCompra","nlFormPix","nlValidarDadosPix","nlConfirmouPix","nlPagarPix","nlAcessoSocorro","nlChamadoPagamento",
  "nlFormCartao","nlValidarDadosCartao","nlConfirmouCartao","nlFormDadosCartao","nlTokenizarEPagar","nlPagarCartao","nlErroCartao",
  "nlFluxoCliente","nlVerificarUsuario","nlBuscarConta","nlRenovarPlanos","nlRenovarN","nlIrParaLiss","nlChamadoRecebeuProblema",
  "nlEnviarChamado","nlDispararChamado","nlEncerrar"];
function nlInstrumentar(){
  for(var _z = 0; _z < NL_TELAS.length; _z++){
    (function(nome){
      var orig = window[nome];
      if(typeof orig !== "function" || orig.__marcada){ return; }
      var nova = function(){
        if(!NL.silencioso){ NL.telaAtual = nome; NL.telaArgs = [].slice.call(arguments); }
        try{
          var r = orig.apply(this, arguments);
          if(r && typeof r.then === "function"){ r.then(null, function(err){ nlReportarFalha(nome, err); }); }
          return r;
        }catch(err){
          if(NL.silencioso){ throw err; }
          nlReportarFalha(nome, err);
          try{ nlDestravar(); nlResgate(); }catch(e2){}
          return undefined;
        }
      };
      nova.__marcada = true;
      nova.__nome = nome;
      window[nome] = nova;
    })(NL_TELAS[_z]);
  }
}

// ---------------- INICIO ----------------
function nlJaTestou(){
  var f = nlFichaLer();
  var n = f.testes || 1;
  if(n > 3){ n = 3; }
  NL.nome = f.nome || NL.nome;
  var trata = f.nome ? (nlEscapar(f.nome) + ", p") : "P";
  if(n >= 3 || f.limite){
    nlMsgLiss(trata + "ercebi que você já usou os <b>3 testes</b> que cada pessoa tem direito.", function(){
      nlMsgLiss("Para continuar com a internet ilimitada, agora o caminho é escolher um plano.", function(){
        nlChips([
          { rotulo:"Ver os planos", acao:nlMostrarPlanos }
        ]);
      });
    });
    return;
  }
  nlMsgLiss(trata + "ercebi que você já fez <b>" + n + "/3</b> testes permitidos conosco. O que você quer fazer agora?", function(){
    nlChips([
      { rotulo:"Fazer outro teste", acao:nlRotaConexao },
      { rotulo:"Quero contratar", acao:nlMostrarPlanos }
    ]);
  });
}
async function nlComecar(origem){
  var pend = nlLerPendente();
  if(pend && Date.now() - (pend.inicio || 0) > 86400000){ nlLimparPendente(); pend = null; }
  if(pend){
    nlEsperaLigar();
    var s = null;
    try{ s = await nlApi({ acao:"pagamento_status", payment_id: String(pend.id), email: pend.email || "" }); }catch(e){ s = null; }
    nlEsperaDesligar();
    if(s){
      var conta = s.account || {};
      var usuario = s.username || conta.username || "";
      var st = String(s.status || "").toLowerCase();
      var aprovado = (st === "approved" || st === "paid" || st === "confirmed");
      var entregue = (s.entregue === true || s.entregue === "true" || (s.entregue === undefined && usuario)) ? true : false;
      if(aprovado && usuario && entregue){
        if(pend.email && !NL.pgEmail){ NL.pgEmail = pend.email; }
        nlPagamentoEntregue(pend, usuario);
        return;
      }
      if(!aprovado && ["expired","cancelled","rejected","declined","refused","refunded","charged_back"].indexOf(st) > -1){ nlLimparPendente(); }
    }
  }
  nlInicio(origem);
}
function nlInicio(origem){
  nlGarantirTicket();
  nlMsgLiss("Olá! Jesus te abençoe! Eu sou a <b>Liss</b>, a assistente virtual da Netliss!", function(){
    nlMsgLiss("Para agilizar o seu atendimento, por favor me conte:", function(){
    nlChips([
      { rotulo:"Sou novo aqui", acao:nlFluxoNovo },
      { rotulo:"Já sou cliente", acao:nlFluxoCliente }
    ]);
    });
  });
}

// ---------------- NOVO ----------------
function nlFluxoNovo(){
  var _f = nlFichaLer();
  if(_f.testou && !NL.pulouFicha){ NL.pulouFicha = true; nlJaTestou(); return; }
  nlMsgLiss("Seja muito bem-vindo(a)! Antes de tudo, como você se chama?", function(){
    nlForm("<input id='nl-nome-novo' type='text' placeholder='Seu nome' maxlength='40'>" +
           "<button class='botao' onclick='nlSalvarNome()'>Continuar</button>");
  });
}
function nlSalvarNome(){
  var n = document.getElementById("nl-nome-novo").value.trim();
  if(n.length < 2){ nlDestravar(); alert("Digite seu nome"); return; }
  NL.nome = n.split(" ")[0];
  nlFichaGravar({ nome: NL.nome });
  nlMsgUser(n);
  nlApiFogo({ acao:"nome", nome:n });
  nlRotaConexao();
}
function nlOpTim(){ nlAndroidModalidade("TIM"); }
function nlOpVivo(){ nlAndroidModalidade("Vivo"); }
function nlModalPre(){ nlAndroidRegras(NL.op || "TIM", "PRE"); }
function nlModalPos(){ nlAndroidRegras(NL.op || "TIM", "POS"); }

function nlRotaConexao(){
  nlMsgLiss("Que bom ter você aqui, <b>" + nlEscapar(NL.nome) + "</b>!", function(){
    nlMsgLiss("A Netliss é internet ilimitada para celular. Somos um aplicativo para sistemas <b>Android</b> que, através da rede da sua operadora, te conecta aos nossos servidores — e por isso você tem internet <b>100% ilimitada de verdade</b>.", function(){
      nlMsgLiss("Também é possível <b>rotear</b> a nossa internet, mas como essa função não depende 100% da Netliss, não é possível oferecer suporte ou garantia para quem quiser rotear. Se você quiser tentar, disponibilizamos vídeos tutoriais para tentar ajudar.", function(){
        nlMsgLiss("Ou seja, você precisa do nosso aplicativo instalado no seu dispositivo e precisa do chip da sua operadora para fornecer a rede! Chips virtuais (eSIM) também funcionam. <b>Não precisa de créditos nem de internet.</b>", function(){
          nlMsgLiss("Para eu te explicar sobre as regras de funcionamento, me conta qual operadora você usa?", function(){
            nlChips([
              { rotulo:"TIM", acao:nlOpTim },
              { rotulo:"Vivo", acao:nlOpVivo },
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
      { rotulo:"TIM", acao:nlOpTim },
      { rotulo:"Vivo", acao:nlOpVivo },
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
        { rotulo:"Usa a rede da TIM", acao:nlOpTim },
        { rotulo:"Usa a rede da Vivo", acao:nlOpVivo },
        { rotulo:"Usa a rede da Claro", acao:nlClaroTela }
      ]);
    });
  });
}
function nlAndroidModalidade(operadora){
  NL.op = operadora;
  nlFichaGravar({ op: operadora });
  nlMsgUser(operadora);
  nlMsgLiss("Anotado: <b>" + operadora + "</b>.", function(){
    nlMsgLiss("E qual é a modalidade do seu chip?", function(){
      nlChips([
        { rotulo:"Pré-pago", acao:nlModalPre },
        { rotulo:"Pós-pago ou Controle", acao:nlModalPos }
      ]);
    });
  });
}
function nlAndroidRegras(operadora, mod){
  NL.mod = mod;
  nlFichaGravar({ mod: mod });
  nlMsgUser(mod === "PRE" ? "Pré-pago" : "Pós-pago ou Controle");
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
  nlFichaGravar({ op: "Claro", mod: "POS" });
  nlMsgUser("Claro");
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
  window.open(CFG.playStore, "_blank");
  nlMsgLiss("Agora esse vídeo vai te mostrar como se conectar ao nosso app. Assiste primeiro e depois clica abaixo para receber o seu teste:", function(){
    nlCard("<div style='position:relative;padding-bottom:56%;height:0;border-radius:12px;overflow:hidden;margin-bottom:11px;border:1px solid rgba(255,255,255,.09)'><iframe src='" + CFG.videoTeste + "' style='position:absolute;top:0;left:0;width:100%;height:100%;border:0' title='Como fazer o teste' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe></div>" +
      "<button class='botao' style='width:100%;margin-bottom:9px;background:rgba(255,255,255,.1);color:#f4f6ff;box-shadow:none' data-vivo='1' onclick='nlVideoGrande()'>Ver em tela maior</button>" +
      "<button class='botao' onclick='nlGerarTeste()'>Já assisti, receber teste</button>", { nl: "teste" });
  });
}
async function nlGerarTeste(){
  if(nlTrancado("teste")){ return; }
  nlMsgUser("Já assisti, receber teste");
  nlDigitar(async function(){
    nlEsperaLigar();
    var _fp = await nlFpPronto(2500);
    var _fi = nlFichaLer();
    var r = await nlApi({ acao:"teste", operadora: NL.op || _fi.op || "", modalidade: NL.mod || _fi.mod || "", fp: _fp || "" });
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlGerarTeste); return; }
    nlInertes("teste");
    if(r && r.limite){
      nlFichaGravar({ testou: 1, testes: 3, limite: 1 });
      nlMsgLiss("<b>" + nlEscapar(NL.nome || "Tudo bem") + "</b>, eu já liberei para você todos os testes gratuitos que cada cliente tem direito. Por isso, não consigo liberar um novo teste para você.", function(){
        nlMsgLiss("Se você quiser conhecer melhor a Netliss, contrate um plano de 30 dias. Se não gostar ou não quiser continuar, basta não renovar.", function(){
          nlChips([
            { rotulo:"Ver os planos", acao:nlMostrarPlanos }
          ]);
        });
      });
      return;
    }
    if(r && r.usuario && r.usuario !== "undefined"){
      NL.copiaUser = r.usuario; NL.copiaSenha = r.senha;
      nlFichaGravar({ testou: 1, testes: (nlFichaLer().testes || 0) + 1, op: NL.op || "", mod: NL.mod || "" });
      var trata = NL.nome ? ", <b>" + nlEscapar(NL.nome) + "</b>" : "";
      nlMsgLiss("Prontinho" + trata + "! Seu teste grátis está liberado:", function(){
        nlMsgLiss("Usuário: <b>" + nlEscapar(r.usuario) + "</b><br>Senha: <b>" + nlEscapar(r.senha) + "</b><br>Validade: <b>" + nlEscapar(r.validade_horas || "1") + " hora</b><br><br><button class='chip' data-vivo='1' onclick='nlCopiarCred(0,this)'>Copiar usuário</button> <button class='chip' data-vivo='1' onclick='nlCopiarCred(1,this)'>Copiar senha</button>", function(){
          nlMsgLiss("É só colocar usuário e senha no aplicativo igualzinho enviamos acima, respeitando letras maiúsculas e minúsculas, números e etc... E depois testar em todas as opções da sua operadora que existem no aplicativo para se conectar. Qualquer dúvida, reveja o vídeo ou fale conosco.", function(){
            nlChips([
              { rotulo:"Quero contratar", acao:nlMostrarPlanos },
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
      { rotulo:"Quero rotear", acao:nlSupRotear },
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
      { rotulo:"Limite ultrapassado", acao:nlErroLimite },
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
function nlUsuarioConhecido(){
  return NL.usuarioApp || NL.vendaUser || NL.copiaUser || "";
}
function nlErroLimite(){
  nlMsgUser("Limite ultrapassado");
  NL.ultimaOrientacao = "limite";
  nlMsgLiss("Essa mensagem aparece quando o seu acesso é usado em mais aparelhos do que o seu plano permite.", function(){
    nlMsgLiss("Vou abrir um chamado agora e, assim que o seu acesso for liberado, você recebe a confirmação por e-mail.", function(){
      NL.chamadoProblema = "LIMITE ULTRAPASSADO - aparece essa mensagem no aplicativo e nao consigo conectar.";
      nlGarantirTicket();
      nlMsgLiss("Me confirme os dados, abaixo por favor:", function(){
        nlFormChamadoLimite();
      });
    });
  });
}
function nlFormChamadoLimite(){
  var u = NL.chUser || nlUsuarioConhecido();
  var e = NL.chEmail || "";
  nlForm("<input id='nl-ch-user' type='text' placeholder='Seu nome de usuário no aplicativo' value='" + nlEscapar(u) + "' maxlength='40'>" +
         "<input id='nl-ch-email' type='email' placeholder='Seu melhor e-mail' value='" + nlEscapar(e) + "' maxlength='80'>" +
         "<button class='botao' onclick='nlEnviarChamado()'>Abrir chamado</button>");
}
function nlFormChamadoGeral(){
  nlForm("<input id='nl-ch-email' type='email' placeholder='Seu melhor e-mail' value='" + nlEscapar(NL.chEmail || "") + "' maxlength='80'>" +
         "<input id='nl-ch-zap' type='tel' placeholder='WhatsApp com DDD' value='" + nlEscapar(NL.chZap || "") + "' maxlength='16'>" +
         "<button class='botao' onclick='nlEnviarChamado()'>Abrir chamado</button>");
}
var NL_CONFIRMA = "Por favor, antes de avançarmos confirme se seus dados estão realmente corretos. Não nos responsabilizamos caso você tenha fornecido informações incorretas!";
function nlConfirmarDados(seguir, corrigir){
  var fs = (typeof seguir === "string") ? window[seguir] : seguir;
  var fc = (typeof corrigir === "string") ? window[corrigir] : corrigir;
  nlMsgLiss(NL_CONFIRMA, function(){
    nlChips([
      { rotulo:"Confirmo, pode seguir", acao:fs },
      { rotulo:"Deixa eu corrigir", sec:true, acao:fc }
    ]);
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
            var b = [{ rotulo:"Baixar na Play Store", manter:true, acao:nlAbrirPlayStore }];
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
        { rotulo:"Configurar o celular que vai rotear", manter:true, acao:nlVideoRot1 },
        { rotulo:"Conectar de outro celular", manter:true, acao:nlVideoRot2 },
        { rotulo:"Conectar de um notebook", manter:true, acao:nlVideoRot3 }
      ].concat(nlFimSuporte()));
    });
  });
}
function nlAbrirPlayStore(){ window.open(CFG.playStore, "_blank"); }
function nlVideoRot1(){ window.open(CFG.videoRot1, "_blank"); }
function nlVideoRot2(){ window.open(CFG.videoRot2, "_blank"); }
function nlVideoRot3(){ window.open(CFG.videoRot3, "_blank"); }
function nlSupCancelar(){
  NL.ultimaOrientacao = "cancelar";
  nlMsgLiss("Para cancelar é simples: basta não renovar quando o seu plano terminar. O acesso encerra sozinho, sem dívida e sem multa — não trabalhamos com fidelidade.", function(){
    nlMsgLiss("Para mudar de plano, você escolhe a nova opção na hora da renovação.", function(){
      nlChips(nlFimSuporte());
    });
  });
}

function nlCopiarTexto(v){
  if(NL.silencioso){ return; }
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
    nlForm("<input id='nl-rec-email' type='email' placeholder='E-mail da compra' value='" + nlEscapar(NL.recEmail || "") + "' maxlength='80'>" +
           "<input id='nl-rec-data' type='date' value='" + nlEscapar(NL.recBruta || "") + "' style='margin-top:8px'>" +
           "<button class='botao' style='margin-top:8px' onclick='nlEnviarRecuperacao()'>Recuperar meu acesso</button>");
  });
}
function nlEnviarRecuperacao(){
  if(nlTrancado("recuperar")){ return; }
  var email = document.getElementById("nl-rec-email").value.trim();
  var bruta = document.getElementById("nl-rec-data").value;
  if(email.indexOf("@") < 1 || email.indexOf(".") < 3){ nlDestravar(); alert("Digite um e-mail válido"); return; }
  if(!bruta || bruta.length < 10){ nlDestravar(); alert("Escolha a data da compra"); return; }
  var partes = bruta.split("-");
  var data = partes[2] + "/" + partes[1] + "/" + partes[0];
  NL.recEmail = email; NL.recBruta = bruta;
  nlMsgUser(email + " - " + data);
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"recuperar", email: email, data_compra: data });
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlFormRecuperar); return; }
    if(r && r.success){
      nlMsgLiss("Pronto! Enviamos os seus dados de acesso para <b>" + nlEscapar(email) + "</b>. Confere a sua caixa de entrada e também o spam.", function(){
        nlEncerrarEm(1500);
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
  nlApiFogo({ acao:"reportar_erro", assunto:"Erro ao gerar o teste gratis", operadora: NL.op || "", modalidade: NL.mod || "" });
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
    var total = NL.vitalicioLigado ? 4 : 3;
    for(var i = 0; i < total; i++){
      var k = NL_PLANOS[i];
      var p = CFG.planos[k];
      nlCard((k === "TRIMESTRAL" ? "<div class='tag'>MAIS VENDIDO</div>" : "") +
        "<div class='titulo'>" + p.nome + "</div>" +
        "<div class='preco'>" + p.preco + "</div>" +
        "<div class='desc'>" + p.desc + "</div>" +
        "<button class='botao' onclick='nlPlanoN(" + i + ")'>Escolher este plano</button>",
        { cls: (k === "TRIMESTRAL" ? "destaque" : ""), nl: "plano" });
    }
  });
}
function nlPlanoN(i){
  var k = NL_PLANOS[i];
  if(!k || !CFG.planos[k]){ return; }
  NL.modoRenov = false;
  nlEscolherPlano(k);
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
  nlAvisoCompra("nlPerguntarMetodo");
}
function nlPerguntarMetodo(){
  nlMsgLiss("Ótima escolha! E como você prefere pagar?", function(){
    nlChips([
      { rotulo:"PIX", acao:nlFormPix },
      { rotulo:"Cartão de crédito", acao:nlFormCartao }
    ]);
  });
}
function nlVitalicio(){
  nlMsgLiss("Excelente escolha! O Vitalício é o nosso melhor negócio: você paga uma vez e usa por 10 anos, com até 4 pessoas conectadas.<br><br>Por transparência: o nosso sistema permite criar acessos de no máximo 10 anos, e é exatamente esse o prazo que você recebe. Nada de letra miúda.<br><br>E você escolhe como pagar: <b>R$ 390,00 à vista no PIX</b>, com desconto — ou <b>R$ 490,00 no cartão</b>, em até 10x de R$ 49,00.", function(){
    nlChips([
      { rotulo:"Pagar R$390 no PIX", acao:nlVitalPix },
      { rotulo:"Parcelar R$490 no cartão", acao:nlVitalCartao }
    ]);
  });
}
function nlVitalPix(){
  NL.vitalMetodo = "pix";
  if(NL.modoRenov && NL.contaRenov){ nlFormPix(); return; }
  nlAvisoCompra("nlFormPix");
}
function nlVitalCartao(){
  NL.vitalMetodo = "cartao";
  if(NL.modoRenov && NL.contaRenov){ nlFormCartao(); return; }
  nlAvisoCompra("nlFormCartao");
}
function nlAvisoCompra(seguir){
  var fs = (typeof seguir === "string") ? window[seguir] : seguir;
  nlMsgLiss("Confirme que você recebeu o teste gratuito e que funcionou corretamente, e que ao efetuar o pagamento você está de acordo que depois de confirmado, está ciente de que <b>não há reembolsos</b>.", function(){
    nlMsgLiss("Se ficou alguma dúvida, podemos liberar mais um teste — a gente prefere que você compre com segurança do que se arrependa depois. Ao continuar, você confirma que testou e concorda com essa condição.", function(){
    nlChips([
      { rotulo:"Concordo, continuar", acao:fs },
      { rotulo:"Preciso de ajuda", acao:nlSuporteNovo }
    ]);
    });
  });
}
function nlPlanoId(p){
  if(!p){ return 0; }
  if(NL.planoAtual === "VITALICIO" && NL.vitalMetodo === "cartao"){ return p.idCartao; }
  return p.id;
}
function nlParcelas(){
  return (NL.planoAtual === "VITALICIO" && NL.vitalMetodo === "cartao") ? 10 : 1;
}
function nlFormPix(){
  if(NL.planoAtual === "VITALICIO"){ NL.vitalMetodo = "pix"; }
  nlMsgLiss("Preencha os dados abaixo para gerar o seu <b>código PIX</b>:<br><br><i>A exigência do CPF nas cobranças por PIX cumpre a Resolução BCB nº 1/2020 do Banco Central, garantindo a rastreabilidade das transações para prevenir lavagem de dinheiro ou fraudes.</i><br><br><b>ATENÇÃO ao e-mail:</b> digite um e-mail real e correto, porque é para ele que enviamos o seu acesso e é por ele que você recupera as credenciais se precisar.", function(){
    nlForm("<input id='nl-pg-nome' type='text' placeholder='Seu nome completo' maxlength='60'>" +
           "<input id='nl-pg-email' type='email' placeholder='" + (NL.emailCliente ? "E-mail do cliente" : "Seu e-mail") + "' value='" + (NL.emailCliente || "") + "' maxlength='80'>" +
           "<input id='nl-pg-cpf' type='tel' placeholder='Seu CPF (só números)' maxlength='11'>" +
           "<button class='botao' onclick='nlValidarDadosPix()'>Gerar código PIX</button>");
    if(NL.nome && NL.nome.length >= 5){ document.getElementById("nl-pg-nome").value = NL.nome; }
    nlRepreencherPagamento();
  });
}
function nlRepreencherPagamento(){
  try{
    if(NL.pgNome){ document.getElementById("nl-pg-nome").value = NL.pgNome; }
    if(NL.pgEmail){ document.getElementById("nl-pg-email").value = NL.pgEmail; }
    if(NL.pgCpf){ document.getElementById("nl-pg-cpf").value = NL.pgCpf; }
  }catch(e){}
}
function nlValidarDadosPix(){
  if(nlTrancado("cobranca")){ return; }
  var _cn = document.getElementById("nl-pg-nome");
  var _ce = document.getElementById("nl-pg-email");
  var _cc = document.getElementById("nl-pg-cpf");
  if(!_cn || !_ce || !_cc){ return; }
  var nome = _cn.value.trim();
  var email = _ce.value.trim();
  var cpf = nlSoNumeros(_cc.value);
  if(nome.length < 5){ nlDestravar(); alert("Digite seu nome completo"); return; }
  if(email.indexOf("@") < 1 || email.indexOf(".") < 3){ nlDestravar(); alert("Digite um e-mail válido"); return; }
  if(cpf.length !== 11){ nlDestravar(); alert("O CPF precisa ter 11 números"); return; }
  NL.pgNome = nome; NL.pgEmail = email; NL.pgCpf = cpf;
  nlCpfGuardar(cpf);
  nlMsgUser(nome);
  nlConfirmarDados("nlConfirmouPix", "nlFormPix");
}
function nlConfirmouPix(){
  if(!NL.pgCpf){ NL.pgCpf = nlCpfLer(); }
  if(!NL.pgCpf || !NL.pgEmail || !NL.pgNome){ nlFormPix(); return; }
  nlApiFogo({ acao:"nome", nome:NL.pgNome, email:NL.pgEmail });
  nlPagarPix();
}
function nlPagarPix(){
  nlDigitar(async function(){
    var p = CFG.planos[NL.planoAtual];
    if(!p){ nlMostrarPlanos(); return; }
    NL.metodoPg = "pix";
    if(NL.planoAtual === "VITALICIO"){ NL.vitalMetodo = "pix"; }
    var acaoPg = (NL.modoRenov && NL.contaRenov) ? "pagamento_renovar" : "pagamento_criar";
    var corpo = { acao: acaoPg, metodo:"pix", plan_id: nlPlanoId(p), nome: NL.pgNome, email: NL.pgEmail, cpf: NL.pgCpf };
    if(NL.modoRenov && NL.contaRenov){ corpo.account_id = NL.contaRenov; corpo.usuario = NL.usuarioApp || ""; }
    nlEsperaLigar();
    var r = await nlApi(corpo);
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlFormPix); return; }
    if(r && r.success && r.pix){
      NL.pixImg = r.pix.qr_code_base64; NL.pixTexto = r.pix.qr_code_text;
      var _fim = nlExpiraPix(r);
      nlMsgLiss("Aqui está o seu PIX do <b>" + p.nome + "</b> (" + p.preco + "). Escaneie o QR Code ou copie o código PIX.", function(){
        nlCard("<img src='data:image/png;base64," + nlSoBase64(r.pix.qr_code_base64) + "' style='width:180px;display:block;margin:0 auto 10px;border-radius:10px;background:#fff;padding:6px'>" +
          "<div class='pix-codigo' id='nl-pix-txt'>" + nlEscapar(r.pix.qr_code_text) + "</div>" +
          "<button class='botao' data-vivo='1' style='width:100%' onclick='nlCopiarPix()'>Copiar código Pix</button>", { id: "nl-card-pix" });
        nlIniciarPolling(r.payment_id, p, { metodo: "pix", fim: _fim });
      });
    } else {
      if(!r || !r.message){ nlInstabilidade(nlFormPix); return; }
      nlMsgLiss("Opa: " + nlEscapar(r.message) + ".<br>Vamos tentar de novo?", function(){
        nlChips([
          { rotulo:"Tentar novamente", acao:nlFormPix },
          { rotulo:"Pagar com cartão", acao:nlFormCartao }
        ]);
      });
    }
  }, 400);
}
function nlExpiraPix(r){
  var agora = Date.now();
  var lista = [];
  try{
    var px = r.pix || {};
    lista = [px.expires_at, px.expiration_date, px.date_of_expiration, px.expiration, r.expires_at, r.expiration_date, r.date_of_expiration];
  }catch(e){}
  for(var i = 0; i < lista.length; i++){
    if(!lista[i]){ continue; }
    var txt = String(lista[i]);
    var posT = txt.indexOf("T");
    if(posT < 0){ continue; }
    var cauda = txt.substring(posT);
    if(cauda.indexOf("Z") < 0 && cauda.indexOf("+") < 0 && cauda.indexOf("-") < 0){ continue; }
    var t = Date.parse(txt);
    if(!isNaN(t) && t > agora + 60000 && t < agora + 86400000){ return t; }
  }
  return agora + CFG.pixMinutos * 60000;
}
function nlCopiarPix(){
  var el = document.getElementById("nl-pix-txt");
  if(!el){ return; }
  nlCopiarTexto(el.textContent);
  nlAvisinho("código PIX copiado");
}
function nlLerPendente(){
  var pend = null;
  try{ pend = JSON.parse(localStorage.getItem("nl_pag_pendente") || "null"); }catch(e){ pend = null; }
  return (pend && pend.id) ? pend : null;
}
function nlGravarPendente(pend){
  try{ localStorage.setItem("nl_pag_pendente", JSON.stringify(pend)); }catch(e){}
}
function nlRemoverPix(){
  try{ var c = document.getElementById("nl-card-pix"); if(c){ c.remove(); } }catch(e){}
}
function nlRetomarPagamento(){
  var pend = nlLerPendente();
  if(!pend){
    nlPararCrono();
    nlRemoverPix();
    return;
  }
  NL.pagPendente = pend;
  if(pend.email && !NL.pgEmail){ NL.pgEmail = pend.email; }
  if(pend.metodo && !NL.metodoPg){ NL.metodoPg = pend.metodo; }
  var cartao = (pend.metodo === "credit_card");
  var naTela = (document.getElementById("nl-card-pix") || document.getElementById("nl-crono-box")) ? true : false;
  if(cartao && Date.now() - (pend.inicio || 0) < 1800000 && (NL.telaAtual === "nlPagarCartao" || NL.telaAtual === "nlTokenizarEPagar")){ naTela = true; }
  NL.pgAtivo = naTela;
  if(!naTela){ return; }
  if(naTela && !cartao){ nlIniciarCrono(); }
  if(naTela && cartao){ NL.pollRapido = Math.max(NL.pollRapido || 0, 10); }
  nlVerificarPagamento(true).then(function(){ nlAgendarVerificacao(); }, function(){ nlAgendarVerificacao(); });
}
function nlPararVerificacao(){
  if(NL.pollProx){ clearTimeout(NL.pollProx); NL.pollProx = null; }
}
function nlAgendarVerificacao(){
  nlPararVerificacao();
  if(!NL.pgAtivo){ return; }
  var pend = NL.pagPendente || nlLerPendente();
  if(!pend){ return; }
  if(Date.now() > (pend.fim || 0) + 600000){ return; }
  var espera = (NL.pollRapido > 0) ? 6000 : 90000;
  NL.pollProx = setTimeout(function(){
    NL.pollProx = null;
    if(NL.pollRapido > 0){ NL.pollRapido = NL.pollRapido - 1; }
    nlVerificarPagamento(true).then(function(){ nlAgendarVerificacao(); }, function(){ nlAgendarVerificacao(); });
  }, espera);
}
function nlIniciarPolling(paymentId, plano, extra){
  var ex = extra || {};
  nlInertes("plano");
  NL.pgAtivo = true;
  var agora = Date.now();
  NL.pagPendente = { id: String(paymentId), plano: { nome: plano.nome, preco: plano.preco }, inicio: agora,
                     email: NL.pgEmail || "", metodo: ex.metodo || NL.metodoPg || "pix",
                     fim: ex.fim || (agora + CFG.pixMinutos * 60000) };
  nlGravarPendente(NL.pagPendente);
  if(NL.pagPendente.metodo === "credit_card"){
    NL.pollRapido = 20;
    nlAgendarVerificacao();
    return;
  }
  nlIniciarCrono();
}
function nlSalvarPendente(){
  try{ nlSalvar("netliss_pg", { id: NL.pgId, plano: NL.planoAtual, email: NL.pgEmail }, 604800000); }catch(e){}
}
function nlLimparPendente(){
  NL.pgAtivo = false;
  NL.pagPendente = null;
  nlPararVerificacao();
  try{ localStorage.removeItem("nl_pag_pendente"); }catch(e){}
}
function nlValorNum(txt){
  var t = String(txt || "");
  var limpo = "";
  for(var i = 0; i < t.length; i++){
    var c = t.charAt(i);
    if(c >= "0" && c <= "9"){ limpo = limpo + c; }
    else if(c === ","){ limpo = limpo + "."; }
  }
  var n = parseFloat(limpo);
  return isNaN(n) ? 0 : n;
}
function nlCronoHtml(){
  return "<div id='nl-crono-box' style='text-align:center'>" +
    "<div style='font-size:12px;color:var(--suave);letter-spacing:.6px'>AGUARDANDO CONFIRMAÇÃO DO PAGAMENTO</div>" +
    "<div id='nl-crono' style='font-size:30px;font-weight:700;color:var(--neon);font-family:var(--fonte-display);margin:8px 0 4px'>--:--</div>" +
    "<div style='font-size:12.5px;color:var(--suave);line-height:1.5'>Assim que o pagamento cair, eu te aviso aqui e envio o acesso para o seu e-mail.</div>" +
    "</div>";
}
function nlPintarCrono(){
  var el = document.getElementById("nl-crono");
  if(!el){ return; }
  var resta = NL.cronoFim - Date.now();
  if(resta < 0){ resta = 0; }
  var seg = Math.floor(resta / 1000);
  var h = Math.floor(seg / 3600);
  var m = Math.floor((seg % 3600) / 60);
  var sg = seg % 60;
  var txt = (m < 10 ? "0" : "") + m + ":" + (sg < 10 ? "0" : "") + sg;
  if(h > 0){ txt = h + ":" + (m < 10 ? "0" : "") + m + ":" + (sg < 10 ? "0" : "") + sg; }
  el.textContent = txt;
}
function nlPararCrono(){
  if(NL.cronoTick){ clearInterval(NL.cronoTick); NL.cronoTick = null; }
  if(NL.cronoPoll){ clearInterval(NL.cronoPoll); NL.cronoPoll = null; }
  var box = document.getElementById("nl-crono-box");
  if(box){ var c = box.closest(".card"); if(c){ c.remove(); } else { box.remove(); } }
}
function nlCronoAcabou(){
  nlPararCrono();
  nlPararVerificacao();
  nlRemoverPix();
  var pend = NL.pagPendente || nlLerPendente();
  if(pend){ NL.cronoFimAvisado = String(pend.id); }
  nlMsgLiss("Não identifiquei o seu pagamento e esse código PIX <b>expirou</b>.<br><br>Se você já pagou, é só me avisar que eu localizo o seu acesso.", function(){
    nlChips([
      { rotulo:"Já paguei e não recebi", acao:nlAcessoSocorro },
      { rotulo:"Gerar novo PIX", acao:nlFormPix },
      { rotulo:"Pagar com cartão", acao:nlFormCartao }
    ]);
  });
}
function nlIniciarCrono(){
  var pend = NL.pagPendente || nlLerPendente();
  if(!pend){ return; }
  NL.cronoFim = pend.fim || ((pend.inicio || Date.now()) + CFG.pixMinutos * 60000);
  if(NL.cronoFim <= Date.now()){ return; }
  if(!document.getElementById("nl-crono-box")){ nlCard(nlCronoHtml()); }
  nlPintarCrono();
  if(NL.cronoTick){ clearInterval(NL.cronoTick); }
  NL.cronoTick = setInterval(function(){
    nlPintarCrono();
    if(Date.now() >= NL.cronoFim){ nlCronoAcabou(); }
  }, 1000);
  nlAgendarVerificacao();
}
async function nlAcessoSocorro(){
  if(nlTrancado("socorro")){ return; }
  var pend = NL.pagPendente || nlLerPendente();
  if(!pend){ nlMsgLiss("Não encontrei uma compra pendente por aqui.", function(){ nlChips([{ rotulo:"Ver os planos", acao:nlMostrarPlanos }]); }); return; }
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"acesso_socorro", payment_id: String(pend.id), email: NL.pgEmail || pend.email || "" });
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlAcessoSocorro); return; }
    if(r && (r.achou === true || r.achou === "true")){
      NL.entregueId = String(pend.id);
      nlPararCrono();
      nlRemoverPix();
      nlLimparPendente();
      var _para = r.enviado_para || NL.pgEmail || pend.email || "";
      nlMsgLiss("Achei o seu acesso e acabei de enviar para <b>" + nlEscapar(_para) + "</b>.<br><br>Confira também a caixa de spam ou promoções.", function(){
        nlEncerrarEm(1200);
      });
      return;
    }
    nlMsgLiss("Não consegui localizar o seu acesso por aqui.", function(){
      nlChips([{ rotulo:"Solicitar ajuda", acao:nlChamadoPagamento }]);
    });
  }, 400);
}
function nlChamadoPagamento(){
  if(nlTrancado("chpag")){ return; }
  var pend = NL.pagPendente || nlLerPendente() || {};
  var plano = pend.plano || {};
  nlGarantirTicket();
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"chamado_abrir", nome: NL.pgNome || NL.nome || "", email: NL.pgEmail || pend.email || "", usuario: nlUsuarioConhecido(),
      whatsapp: NL.pgZap || NL.chZap || "",
      problema: "PAGOU E NAO RECEBEU - Plano: " + (plano.nome || "") + " - Valor: " + (plano.preco || "") + " - Pagamento: " + (pend.id || "") + " - Metodo: " + (NL.metodoPg || pend.metodo || "") });
    nlEsperaDesligar();
    if(!r || !(r.success === true || r.success === "true")){ nlInstabilidade(nlChamadoPagamento); return; }
    nlMsgLiss("Um chamado prioritário foi aberto. Nossa equipe vai te responder por e-mail ou WhatsApp.<br><br>Agora é só aguardar.", function(){
      nlEncerrarEm(1500);
    });
  }, 400);
}
async function nlVerificarPagamento(quieto){
  if(!NL.pgAtivo){ return; }
  var pend = NL.pagPendente || nlLerPendente();
  if(!pend){ return; }
  if(NL.verificando){ return; }
  NL.verificando = true;
  var s = null;
  try{ s = await nlApi({ acao:"pagamento_status", payment_id: String(pend.id), email: NL.pgEmail || pend.email || "" }); }catch(e){ s = null; }
  NL.verificando = false;
  var atual = NL.pagPendente || nlLerPendente();
  if(!atual || String(atual.id) !== String(pend.id)){ return; }
  if(!s){
    NL.pagFalhas = (NL.pagFalhas || 0) + 1;
    if(NL.pgAtivo && NL.pagFalhas >= 2 && !NL.instAvisoPag){ NL.instAvisoPag = true; nlMsgLiss(NL_INSTAB, null); }
    return;
  }
  NL.pagFalhas = 0;
  NL.instAvisoPag = false;
  var conta = s.account || {};
  var usuario = s.username || conta.username || "";
  var st = String(s.status || "").toLowerCase();
  var cartao = (pend.metodo === "credit_card");
  var aprovado = (st === "approved" || st === "paid" || st === "confirmed");
  var entregue = (s.entregue === true || s.entregue === "true" || (s.entregue === undefined && usuario)) ? true : false;
  if(aprovado && usuario && entregue){ nlPagamentoEntregue(pend, usuario); return; }
  if(aprovado){
    NL.pollRapido = Math.max(NL.pollRapido || 0, 10);
    if(!NL.pgAtivo || NL.avisouPreparo === String(pend.id)){ return; }
    NL.avisouPreparo = String(pend.id);
    nlPararCrono();
    nlRemoverPix();
    nlMsgLiss("Pagamento confirmado! Estamos preparando o seu acesso, isso leva alguns segundos.", function(){
      nlChips([{ rotulo:"Verificar de novo", acao:nlAcessoSocorro }]);
    });
    return;
  }
  if(cartao && (st === "rejected" || st === "declined" || st === "refused" || st === "cancelled")){
    var _falavaC = NL.pgAtivo;
    nlPararCrono();
    nlLimparPendente();
    if(!_falavaC){ return; }
    nlMsgLiss("A operadora do cartão <b>recusou</b> o pagamento. Quer tentar de novo?", function(){
      nlChips([
        { rotulo:"Tentar novamente", acao:nlFormDadosCartao },
        { rotulo:"Tentar outro cartão", acao:nlFormDadosCartao },
        { rotulo:"Pagar com PIX", acao:nlFormPix }
      ]);
    });
    return;
  }
  if(!cartao && (st === "expired" || st === "cancelled" || st === "rejected")){
    var _falava = NL.pgAtivo;
    nlPararCrono();
    nlRemoverPix();
    nlLimparPendente();
    if(!_falava){ return; }
    nlMsgLiss("Esse PIX expirou sem pagamento. Mas não tem problema — quer gerar um novo?", function(){
      nlChips([
        { rotulo:"Gerar novo PIX", acao:nlFormPix },
        { rotulo:"Pagar com cartão", acao:nlFormCartao }
      ]);
    });
    return;
  }
  if(st === "refunded" || st === "charged_back"){ nlPararCrono(); nlLimparPendente(); return; }
  if(!cartao && Date.now() >= (pend.fim || 0) && NL.pgAtivo && NL.cronoFimAvisado !== String(pend.id)){
    nlCronoAcabou();
  }
}
function nlPagamentoEntregue(pend, usuario){
  if(NL.entregueId === String(pend.id)){ return; }
  NL.entregueId = String(pend.id);
  var plano = pend.plano || { nome:"", preco:"" };
  var email = NL.pgEmail || pend.email || "";
  nlPararCrono();
  nlRemoverPix();
  nlLimparPendente();
  nlLimparChips();
  nlInertes("plano");
  NL.vendaUser = usuario || NL.copiaUser || ""; NL.vendaPlano = plano.nome;
  nlApiFogo({ acao:"venda", plano: plano.nome, valor: plano.preco, valor_num: nlValorNum(plano.preco), usuario: NL.vendaUser, metodo: pend.metodo || NL.metodoPg || "pix", email: email, cpf: NL.pgCpf || "" });
  var cred = "O acesso foi enviado para o e-mail <b>" + nlEscapar(email) + "</b>.<br><br>Confira também a caixa de spam ou promoções.";
  nlMsgLiss("<b>Pagamento aprovado!</b> Seja bem-vindo(a) à família Netliss!", function(){
    nlMsgLiss(cred, function(){
      nlMsgLiss("Ah, e todo dia publicamos uma mensagem devocional dentro do aplicativo. Dá uma olhada e, se te fizer bem, compartilha com alguém que precise ler.", function(){
        nlChips([
          { rotulo:"Encerrar atendimento", sec:true, acao:nlEncerrar }
        ]);
      });
    });
  });
}
function nlFormCartao(){
  if(NL.planoAtual === "VITALICIO"){ NL.vitalMetodo = "cartao"; }
  nlCarregarSeguranca();
  nlMsgLiss("Perfeito! Preencha os dados abaixo para pagar com <b>cartão de crédito</b>:<br><br><i>A exigência do CPF cumpre a Resolução BCB nº 1/2020 do Banco Central, para prevenir lavagem de dinheiro ou fraudes. O número do cartão você digita em ambiente protegido pelo Mercado Pago.</i><br><br><b>ATENÇÃO ao e-mail:</b> digite um e-mail real e correto, porque é para ele que enviamos o seu acesso e é por ele que você recupera as credenciais se precisar.", function(){
    nlForm("<input id='nl-pg-nome' type='text' placeholder='Seu nome completo' maxlength='60'>" +
           "<input id='nl-pg-email' type='email' placeholder='" + (NL.emailCliente ? "E-mail do cliente" : "Seu e-mail") + "' value='" + (NL.emailCliente || "") + "' maxlength='80'>" +
           "<input id='nl-pg-cpf' type='tel' placeholder='Seu CPF (só números)' maxlength='11'>" +
           "<button class='botao' onclick='nlValidarDadosCartao()'>Continuar para o pagamento</button>");
    if(NL.nome && NL.nome.length >= 5){ document.getElementById("nl-pg-nome").value = NL.nome; }
    nlRepreencherPagamento();
  });
}
function nlValidarDadosCartao(){
  var _cn = document.getElementById("nl-pg-nome");
  var _ce = document.getElementById("nl-pg-email");
  var _cc = document.getElementById("nl-pg-cpf");
  if(!_cn || !_ce || !_cc){ return; }
  var nome = _cn.value.trim();
  var email = _ce.value.trim();
  var cpf = nlSoNumeros(_cc.value);
  if(nome.length < 5){ nlDestravar(); alert("Digite seu nome completo"); return; }
  if(email.indexOf("@") < 1 || email.indexOf(".") < 3){ nlDestravar(); alert("Digite um e-mail válido"); return; }
  if(cpf.length !== 11){ nlDestravar(); alert("O CPF precisa ter 11 números"); return; }
  NL.pgNome = nome; NL.pgEmail = email; NL.pgCpf = cpf;
  nlCpfGuardar(cpf);
  nlMsgUser(nome);
  nlConfirmarDados("nlConfirmouCartao", "nlFormCartao");
}
function nlConfirmouCartao(){
  if(!NL.pgCpf){ NL.pgCpf = nlCpfLer(); }
  if(!NL.pgCpf || !NL.pgEmail || !NL.pgNome){ nlFormCartao(); return; }
  nlApiFogo({ acao:"nome", nome:NL.pgNome, email:NL.pgEmail });
  nlFormDadosCartao();
}
function nlFormDadosCartao(){
  nlCarregarSeguranca();
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
  if(nlTrancado("cobranca")){ return; }
  var num = nlSoNumeros(document.getElementById("nl-cc-num").value);
  var titular = document.getElementById("nl-cc-nome").value.trim();
  var val = document.getElementById("nl-cc-val").value.trim();
  var cvv = nlSoNumeros(document.getElementById("nl-cc-cvv").value);
  if(num.length < 13){ nlDestravar(); alert("Confira o número do cartão"); return; }
  if(titular.length < 5){ nlDestravar(); alert("Digite o nome impresso no cartão"); return; }
  var partes = val.split("/");
  if(partes.length !== 2 && val.length === 4){ partes = [val.substring(0,2), val.substring(2,4)]; }
  if(partes.length !== 2 || partes[0].length !== 2){ nlDestravar(); alert("Validade no formato MM/AA"); return; }
  if(cvv.length < 3){ nlDestravar(); alert("Confira o CVV"); return; }
  if(!NL.pgCpf){ NL.pgCpf = nlCpfLer(); }
  if(!NL.pgCpf || !NL.pgEmail || !NL.pgNome){ nlDestravar(); nlFormCartao(); return; }
  var mes = partes[0];
  var ano = partes[1].length === 2 ? "20" + partes[1] : partes[1];
  nlCarregarSeguranca();
  nlMsgUser("Cartão final " + num.substring(num.length - 4));
  nlDigitar(async function(){
    nlEsperaLigar();
    var m = await nlApi({ acao:"metodos" });
    nlEsperaDesligar();
    var chave = m ? nlAcharChave(m, "mp_public_key", 0) : null;
    if(!chave){ nlInstabilidade(nlFormDadosCartao); return; }
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
        NL.mpMetodo = "";
        var gerarToken = function(){
          try{
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
          }catch(e4){ nlErroCartao("houve um erro ao proteger os dados do cartão"); }
        };
        var pm = null;
        try{ pm = mp.getPaymentMethods({ bin: NL.mpBin }); }catch(e3){ pm = null; }
        if(pm && typeof pm.then === "function"){
          pm.then(function(bm){
            try{ if(bm && bm.results && bm.results.length > 0){ NL.mpMetodo = bm.results[0].id; } }catch(e2){}
            gerarToken();
          }, function(){ gerarToken(); });
        } else { gerarToken(); }
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
    if(!p){ nlMostrarPlanos(); return; }
    if(NL.planoAtual === "VITALICIO"){ NL.vitalMetodo = "cartao"; }
    var acaoPg = (NL.modoRenov && NL.contaRenov) ? "pagamento_renovar" : "pagamento_criar";
    var corpo = { acao: acaoPg, metodo:"credit_card", card_token: tokenCartao, plan_id: nlPlanoId(p), nome: NL.pgNome, email: NL.pgEmail, cpf: NL.pgCpf,
                  mp_payment_method_id: NL.mpMetodo || "", installments: nlParcelas(), cardholder_name: NL.mpTitular || NL.pgNome,
                  mp_public_key_used: NL.mpChave || "", mp_device_session_id: nlDeviceId() };
    if(NL.modoRenov && NL.contaRenov){ corpo.account_id = NL.contaRenov; corpo.usuario = NL.usuarioApp || ""; }
    NL.metodoPg = "credit_card";
    nlEsperaLigar();
    var r = await nlApi(corpo);
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlFormDadosCartao); return; }
    if(r && r.success && r.payment_id){
      var stc = String(r.status || "").toLowerCase();
      if(stc === "rejected" || stc === "cancelled"){
        nlMsgLiss("A operadora do cartão <b>recusou</b> o pagamento. Quer tentar de novo?", function(){
          nlChips([
            { rotulo:"Tentar novamente", acao:nlFormDadosCartao },
            { rotulo:"Tentar outro cartão", acao:nlFormDadosCartao },
            { rotulo:"Pagar com PIX", acao:nlFormPix }
          ]);
        });
        return;
      }
      nlMsgLiss("Pagamento do <b>" + p.nome + "</b> enviado! Estou aguardando a aprovação da operadora do cartão — costuma levar poucos segundos. Assim que aprovar, te entrego o acesso <b>aqui mesmo</b>.", function(){
        nlIniciarPolling(r.payment_id, p, { metodo: "credit_card" });
        if(stc === "approved"){
          NL.avisouPreparo = String(r.payment_id);
          nlMsgLiss("<b>Pagamento aprovado!</b> Estou liberando o seu acesso, isso leva alguns segundos.", null);
        }
      });
    } else {
      if(!r || !r.message){ nlInstabilidade(nlFormDadosCartao); return; }
      nlErroCartao(nlEscapar(r.message));
    }
  }, 400);
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
  if(nlTrancado("conta")){ return; }
  var u = document.getElementById("nl-usuario").value.trim();
  if(u.length < 3){ nlDestravar(); alert("Digite seu nome de usuário"); return; }
  nlMsgUser(u);
  NL.usuarioApp = u;
  nlBuscarConta(u);
}
function nlBuscarConta(u){
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"renovacao_busca", usuario:u });
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlFluxoCliente); return; }
    var conta = null;
    if(r && r.account){ conta = r.account; }
    else if(r && r.data && r.data.account){ conta = r.data.account; }
    else if(r && r.success && r.id){ conta = r; }
    if(conta){
      NL.contaRenov = conta.id || conta.account_id || null;
      var dias = conta.days_remaining;
      if((dias === undefined || dias === null || dias === "") && conta.expires_at){
        var d1 = nlDataUtc(conta.expires_at);
        if(d1){ dias = Math.ceil((d1.getTime() - Date.now()) / 86400000); }
      }
      if((conta.is_expired === true || conta.is_expired === "true") && !(dias <= 0)){ dias = 0; }
      if(dias !== undefined && dias !== null && dias !== "" && !isNaN(dias)){ dias = Number(dias); NL.diasRestantes = dias; }
      var info = "";
      if(dias !== undefined && dias !== null && !isNaN(dias)){
        info = (dias > 0)
          ? "<br>Você ainda tem <b>" + dias + " dia(s)</b> de acesso — e renovando agora, os dias novos são <b>somados</b> a esses. Você não perde nada."
          : "<br>Seu acesso está <b>vencido</b>, mas dá para renovar mantendo o <b>mesmo usuário e senha</b>.";
      }
      nlMsgLiss("Achei sua conta <b>" + nlEscapar(u) + "</b>!" + info + "<br><br>Como posso te ajudar hoje?", function(){
        var opcoes = [
          { rotulo:"Quero renovar", acao:nlRenovarPlanos }
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
          { rotulo:"Quero renovar", acao:nlMostrarPlanos }
        ]);
      });
    }
  }, 400);
}
async function nlRenovarPlanos(){
  NL.modoRenov = true;
  await nlCarregarAvisos();
  nlMsgLiss("Perfeito! Escolha o plano da sua renovação — caso o seu acesso ainda não tenha vencido, os dias contratados são somados ao que você já tem:", function(){
    var total = NL.vitalicioLigado ? 4 : 3;
    for(var i = 0; i < total; i++){
      var k = NL_PLANOS[i];
      var p = CFG.planos[k];
      nlCard((k === "TRIMESTRAL" ? "<div class='tag'>MAIS VENDIDO</div>" : "") +
        "<div class='titulo'>" + p.nome + "</div>" +
        "<div class='preco'>" + p.preco + "</div>" +
        "<div class='desc'>" + p.desc + "</div>" +
        "<button class='botao' onclick='nlRenovarN(" + i + ")'>Renovar com este plano</button>",
        { cls: (k === "TRIMESTRAL" ? "destaque" : ""), nl: "plano" });
    }
  });
}
function nlRenovarN(i){
  var k = NL_PLANOS[i];
  if(!k || !CFG.planos[k]){ return; }
  var p = CFG.planos[k];
  NL.planoAtual = k;
  NL.modoRenov = true;
  nlMsgUser("Renovar: " + p.nome);
  if(k === "VITALICIO"){ nlVitalicio(); return; }
  nlPerguntarMetodo();
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
  var _podeChamado = (NL.copiaUser || NL.usuarioApp || NL.vendaUser) ? true : false;
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
      nlFormChamadoGeral();
    });
  });
}
function nlEnviarChamado(){
  if(nlTrancado("chamado")){ return; }
  var campoUser = document.getElementById("nl-ch-user");
  var campoZap = document.getElementById("nl-ch-zap");
  var em = document.getElementById("nl-ch-email").value.trim();
  var zap = campoZap ? campoZap.value.replace(/[^0-9]/g, "") : "";
  var usu = campoUser ? campoUser.value.trim() : nlUsuarioConhecido();
  if(campoUser && usu.length < 3){ nlDestravar(); alert("Digite o seu nome de usuário do aplicativo"); return; }
  if(em.indexOf("@") < 1 || em.indexOf(".") < 3){ nlDestravar(); alert("Digite um e-mail válido"); return; }
  if(campoZap && zap.length < 10){ nlDestravar(); alert("Digite o WhatsApp com DDD"); return; }
  NL.chUser = usu; NL.chEmail = em; NL.chZap = zap;
  nlMsgUser((usu ? usu + " · " : "") + em + (zap ? " · " + zap : ""));
  nlConfirmarDados("nlDispararChamado", campoZap ? "nlFormChamadoGeral" : "nlFormChamadoLimite");
}
function nlDispararChamado(){
  if(nlTrancado("disparo")){ return; }
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"chamado_abrir", nome: NL.nome || "Cliente", email: NL.chEmail || "", whatsapp: NL.chZap || "", usuario: NL.chUser || nlUsuarioConhecido(), problema: NL.chamadoProblema || "" });
    nlEsperaDesligar();
    if(!r || !(r.success === true || r.success === "true")){ nlInstabilidade(nlDispararChamado); return; }
    NL.ultimoChamado = r.chamado || "";
    nlMsgLiss("Chamado aberto com sucesso, agora é só aguardar!", function(){
      nlMsgLiss("Você vai receber a sua resposta por e-mail. Os nossos especialistas analisam os chamados de segunda a sexta, das 9h às 18h.", function(){
        nlMsgLiss("Obrigada e Jesus te abençoe!", function(){
          nlApiFogo({ acao:"ticket_fechar", ticket_id: NL.ticket });
          nlEncerrarEm(1200);
        });
      });
    });
  }, 500);
}

function nlEnviarTexto(){
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
  nlChamadoRecebeuProblema(txt);
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
  if(NL.pedindoEncerrar && NL.corpo.querySelector("[data-nl='encerrar']")){ return; }
  NL.pedindoEncerrar = true;
  NL.chipsAntesEncerrar = (NL.ultimosChips || []).slice();
  nlMsgLiss("Quer mesmo encerrar o atendimento?", function(){
    nlChips([
      { rotulo:"Sim, encerrar", acao:nlEncerrar },
      { rotulo:"Não, continuar", sec:true, manter:true, acao:nlNaoEncerrar }
    ]);
    var cx = NL.corpo.querySelectorAll(".chips");
    if(cx.length){ cx[cx.length - 1].setAttribute("data-nl", "encerrar"); }
    try{ nlEstadoSalvar(); }catch(e){}
  });
}
function nlNaoEncerrar(){
  NL.pedindoEncerrar = false;
  var caixas = NL.corpo.querySelectorAll("[data-nl='encerrar']");
  for(var c = 0; c < caixas.length; c++){ caixas[c].remove(); }
  var d = document.createElement("div");
  d.className = "msg user";
  d.textContent = "Não, continuar";
  NL.corpo.appendChild(d);
  nlRegistrar("cliente", "Não, continuar");
  nlHistPush("cliente", nlEscapar("Não, continuar"));
  if(NL.chipsAntesEncerrar){ NL.ultimosChips = NL.chipsAntesEncerrar; }
  var blocos = NL.corpo.querySelectorAll(".chips, .form");
  for(var i = 0; i < blocos.length; i++){
    var el = blocos[i];
    var itens = el.querySelectorAll("button, input");
    var algum = false;
    for(var j = 0; j < itens.length; j++){
      if(itens[j].tagName === "INPUT" || nlBotaoVivo(itens[j])){ algum = true; break; }
    }
    if(algum){ NL.corpo.appendChild(el); }
  }
  nlRolar();
  try{ nlEstadoSalvar(); }catch(e){}
  if(nlTemAcao()){ return; }
  var e = { telaAtual: NL.telaAtual, telaArgs: NL.telaArgs, botoes: NL.ultimosChips };
  if(nlRefazerTela(e)){ return; }
  if(!nlRefazerBotoes(e)){ nlResgate(); }
}
function nlEncerrarEm(ms){
  NL.fimAgendado = Date.now() + ms;
  try{ nlEstadoSalvar(); }catch(e){}
  setTimeout(function(){ if(NL.fimAgendado){ nlEncerrar(); } }, ms);
}
function nlEncerrar(){
  NL.fimAgendado = 0;
  NL.pedindoEncerrar = false;
  NL.modoChamado = null;
  NL.pgAtivo = false;
  nlPararCrono();
  nlPararVerificacao();
  nlEnviarRegistro();
  nlLimparChips();
  nlBloquearDigitacao();
  if(NL.pollTimer){ clearInterval(NL.pollTimer); }
  if(NL.ticket){ nlApiFogo({ acao: "ticket_fechar", ticket_id: NL.ticket }); }
  NL.ticket = null;
  NL.difyConv = null;
  try{ localStorage.removeItem("netliss_ticket"); }catch(e){}
  NL.encerrado = true;
  try{ nlEstadoSalvar(); }catch(e){}
  nlMsgLiss("Foi um prazer te atender!<br>Se precisar de qualquer coisa, é só chamar. Jesus te abençoe!", function(){
    nlChips([
      { rotulo:"Novo atendimento", sec:true, acao:nlReiniciar }
    ]);
    var _e = document.getElementById("nl-encerrar"); if(_e){ _e.style.display = "none"; }
  });
}

// ---------------- APARELHO ----------------
function nlHash(str, seed){
  var h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
  for(var i = 0; i < str.length; i++){
    var ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 = h1 ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 = h2 ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  var num = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  var txt = num.toString(16);
  while(txt.length < 14){ txt = "0" + txt; }
  return txt;
}
function nlFpMidia(){
  var q = ["(any-hover: hover)","(hover: hover)","(any-pointer: fine)","(pointer: fine)","(pointer: coarse)","(color-gamut: p3)",
           "(color-gamut: rec2020)","(dynamic-range: high)","(prefers-reduced-motion: reduce)","(forced-colors: active)",
           "(inverted-colors: inverted)","(prefers-contrast: more)","(monochrome)","(prefers-color-scheme: dark)"];
  var r = "";
  for(var i = 0; i < q.length; i++){
    try{ r += (window.matchMedia && window.matchMedia(q[i]).matches) ? "1" : "0"; }catch(e){ r += "x"; }
  }
  return r;
}
function nlFpWebgl(){
  try{
    var cv = document.createElement("canvas");
    var gl = cv.getContext("webgl") || cv.getContext("experimental-webgl");
    if(!gl){ return "sem"; }
    var r = [];
    var dbg = gl.getExtension("WEBGL_debug_renderer_info");
    if(dbg){ r.push(gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL)); r.push(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)); }
    else { r.push(gl.getParameter(gl.VENDOR)); r.push(gl.getParameter(gl.RENDERER)); }
    var ps = [gl.MAX_TEXTURE_SIZE, gl.MAX_RENDERBUFFER_SIZE, gl.MAX_VERTEX_ATTRIBS, gl.MAX_VERTEX_UNIFORM_VECTORS,
              gl.MAX_FRAGMENT_UNIFORM_VECTORS, gl.MAX_VARYING_VECTORS, gl.MAX_TEXTURE_IMAGE_UNITS,
              gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS, gl.MAX_CUBE_MAP_TEXTURE_SIZE];
    for(var i = 0; i < ps.length; i++){ r.push(gl.getParameter(ps[i])); }
    var vp = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
    if(vp && vp.length > 1){ r.push(vp[0] + "x" + vp[1]); }
    var perda = gl.getExtension("WEBGL_lose_context");
    if(perda){ perda.loseContext(); }
    return nlHash(r.join("|"), 7);
  }catch(e){ return "erro"; }
}
var NL_FONTES = ["Arial","Arial Black","Calibri","Cambria","Candara","Consolas","Constantia","Corbel","Segoe UI","Tahoma",
  "Trebuchet MS","Verdana","Georgia","Palatino Linotype","Century Gothic","Franklin Gothic Medium","Lucida Console",
  "Lucida Sans Unicode","Helvetica Neue","Menlo","Monaco","Avenir","Futura","Gill Sans","Optima","DejaVu Sans",
  "Liberation Sans","Droid Sans Mono","Noto Sans Mono","SamsungOne","SamsungOneUI","Samsung Sans","SECRobotoLight",
  "MiSans","Mitype2018","OPPOSans","HarmonyOS Sans","vivo Sans","OnePlus Sans","Clock2017R"];
function nlFpFontes(){
  try{
    var cv = document.createElement("canvas");
    var x = cv.getContext("2d");
    if(!x){ return "sem"; }
    var amostra = "mmmmmmmmmmlli10OQwW";
    var bases = ["monospace", "serif", "sans-serif"];
    var larg = [];
    for(var i = 0; i < bases.length; i++){ x.font = "72px " + bases[i]; larg.push(x.measureText(amostra).width); }
    var tem = "";
    for(var j = 0; j < NL_FONTES.length; j++){
      var achou = "0";
      for(var k = 0; k < bases.length; k++){
        x.font = "72px '" + NL_FONTES[j] + "', " + bases[k];
        if(x.measureText(amostra).width !== larg[k]){ achou = "1"; break; }
      }
      tem += achou;
    }
    return tem;
  }catch(e){ return "erro"; }
}
function nlFpCanvas(){
  try{
    var cv = document.createElement("canvas");
    cv.width = 280; cv.height = 60;
    var x = cv.getContext("2d");
    if(!x){ return "sem"; }
    x.textBaseline = "top";
    x.font = "16px Arial";
    x.fillStyle = "#f60"; x.fillRect(120, 2, 70, 22);
    x.fillStyle = "#069"; x.fillText("Netliss Wi-Fi 4G 2019 <ok> 1/3", 3, 4);
    x.fillStyle = "rgba(102,204,0,0.7)"; x.font = "18px Georgia"; x.fillText("Netliss Wi-Fi 4G 2019 <ok> 1/3", 5, 28);
    x.globalCompositeOperation = "multiply";
    x.fillStyle = "rgb(255,0,255)"; x.beginPath(); x.arc(40, 30, 22, 0, Math.PI * 2, true); x.closePath(); x.fill();
    x.fillStyle = "rgb(0,255,255)"; x.beginPath(); x.arc(70, 30, 22, 0, Math.PI * 2, true); x.closePath(); x.fill();
    return nlHash(cv.toDataURL(), 11);
  }catch(e){ return "erro"; }
}
function nlFpAudio(){
  return new Promise(function(ok){
    var feito = false;
    var fim = function(v){ if(!feito){ feito = true; ok(v); } };
    setTimeout(function(){ fim("tempo"); }, 1500);
    try{
      var OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      if(!OAC){ fim("sem"); return; }
      var ctx = new OAC(1, 5000, 44100);
      var osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = 10000;
      var comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -50; comp.knee.value = 40; comp.ratio.value = 12; comp.attack.value = 0; comp.release.value = 0.25;
      osc.connect(comp); comp.connect(ctx.destination); osc.start(0);
      var pronto = function(buf){
        try{
          var d = buf.getChannelData(0), soma = 0;
          for(var i = 4500; i < 5000; i++){ soma += Math.abs(d[i]); }
          fim(String(Math.round(soma * 1000000)));
        }catch(e){ fim("erro"); }
      };
      var pr = ctx.startRendering();
      if(pr && typeof pr.then === "function"){ pr.then(pronto, function(){ fim("erro"); }); }
      else { ctx.oncomplete = function(ev){ pronto(ev.renderedBuffer); }; }
    }catch(e){ fim("erro"); }
  });
}
function nlFpUa(){
  var ua = String(navigator.userAgent || "");
  var a = ua.indexOf("("), b = ua.indexOf(")");
  var dentro = (a > -1 && b > a) ? ua.substring(a + 1, b) : ua.substring(0, 60);
  var partes = dentro.split(";"), out = [];
  for(var i = 0; i < partes.length; i++){
    var p = partes[i].trim();
    if(p.indexOf("rv:") === 0){ continue; }
    out.push(p);
  }
  return out.join(";");
}
function nlFpUach(){
  return new Promise(function(ok){
    var feito = false;
    var fim = function(v){ if(!feito){ feito = true; ok(v); } };
    setTimeout(function(){ fim(null); }, 700);
    try{
      var ud = navigator.userAgentData;
      if(!ud || !ud.getHighEntropyValues){ fim(null); return; }
      ud.getHighEntropyValues(["model", "platformVersion", "fullVersionList"]).then(function(v){
        var nav = "";
        try{
          var lista = v.fullVersionList || [];
          for(var i = 0; i < lista.length && !nav; i++){
            var br = String(lista[i].brand || "");
            if(br.indexOf("Not") > -1 || br === "Chromium"){ continue; }
            nav = br + " " + lista[i].version;
          }
          for(var j = 0; j < lista.length && !nav; j++){ if(String(lista[j].brand || "") === "Chromium"){ nav = "Chromium " + lista[j].version; } }
        }catch(e){}
        fim({ plataforma: v.platform || ud.platform || "", modelo: v.model || "", versao: v.platformVersion || "", movel: (v.mobile || ud.mobile) ? 1 : 0, navegador: nav });
      }, function(){ fim(null); });
    }catch(e){ fim(null); }
  });
}
function nlFpNavegadorUa(){
  var ua = String(navigator.userAgent || "");
  var marcas = ["SamsungBrowser/", "Firefox/", "FxiOS/", "CriOS/", "EdgA/", "Edg/", "OPR/", "Version/", "Chrome/"];
  for(var i = 0; i < marcas.length; i++){
    var p = ua.indexOf(marcas[i]);
    if(p > -1){ var resto = ua.substring(p); var f = resto.indexOf(" "); return f > -1 ? resto.substring(0, f) : resto; }
  }
  return "";
}
function nlFpBase(){
  var nav = window.navigator || {}, scr = window.screen || {};
  var w = scr.width || 0, h = scr.height || 0;
  var tz = ""; try{ tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; }catch(e){}
  var lg = ""; try{ lg = (nav.languages && nav.languages.length) ? Array.prototype.join.call(nav.languages, ",") : (nav.language || ""); }catch(e){}
  return [
    "sc=" + Math.min(w, h) + "x" + Math.max(w, h),
    "dpr=" + Math.round((window.devicePixelRatio || 1) * 100) / 100,
    "cd=" + (scr.colorDepth || ""),
    "hc=" + (nav.hardwareConcurrency || ""),
    "dm=" + (nav.deviceMemory || ""),
    "tp=" + (nav.maxTouchPoints || 0),
    "tz=" + tz,
    "lg=" + String(lg).toLowerCase(),
    "mq=" + nlFpMidia(),
    "gl=" + nlFpWebgl(),
    "ft=" + nlFpFontes()
  ];
}
async function nlCalcularFp(){
  var partes = nlFpBase();
  var ch = await nlFpUach();
  if(ch && ch.modelo){
    partes.push("m=" + ch.modelo, "pv=" + ch.versao, "pf=" + ch.plataforma, "mb=" + ch.movel);
  } else {
    partes.push("ua=" + nlFpUa());
    if(ch){ partes.push("pv=" + ch.versao, "pf=" + ch.plataforma); }
    partes.push("cv=" + nlFpCanvas());
    partes.push("au=" + (await nlFpAudio()));
  }
  partes.push("nv=" + ((ch && ch.navegador) ? ch.navegador : nlFpNavegadorUa()));
  partes.push("pe=" + Math.floor(Date.now() / (CFG.fpDias * 86400000)));
  var txt = partes.join(";");
  return "f1" + nlHash(txt, 1) + nlHash(txt, 2);
}
function nlIniciarFp(){
  if(NL.fpPromessa){ return NL.fpPromessa; }
  try{
    NL.fpPromessa = nlCalcularFp().then(function(v){ NL.fp = v; return v; }, function(){ NL.fp = ""; return ""; });
  }catch(e){
    NL.fpPromessa = Promise.resolve("");
  }
  return NL.fpPromessa;
}
function nlFpPronto(ms){
  var pr = nlIniciarFp();
  return Promise.race([pr, new Promise(function(ok){ setTimeout(function(){ ok(NL.fp || ""); }, ms); })]);
}

// ---------------- ORIGEM DO VISITANTE ----------------
function nlLimparParam(v){
  var x = String(v || ""), ok = "";
  for(var i = 0; i < x.length && ok.length < 100; i++){
    var c = x.charAt(i);
    if((c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || (c >= "0" && c <= "9") || c === "-" || c === "_" || c === "."){ ok += c; }
  }
  return ok;
}
function nlRastro(){
  var params = new URLSearchParams(location.search);
  var src = (params.get("utm_source") || "").toLowerCase();
  var r = {
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
    ttclid: params.get("ttclid") || "",
    gptclid: params.get("gptclid") || params.get("gpt_id") || "",
    ref: params.get("ref") || ""
  };
  if(!r.gptclid && (src.indexOf("chatgpt") > -1 || src.indexOf("openai") > -1 || src.indexOf("gpt") === 0)){
    r.gptclid = params.get("utm_campaign") || params.get("utm_content") || src;
  }
  if(!r.fbclid && (src === "fb" || src === "ig" || src === "meta" || src.indexOf("facebook") > -1 || src.indexOf("instagram") > -1)){ r.fbclid = "utm-" + src; }
  if(!r.ttclid && src.indexOf("tiktok") > -1){ r.ttclid = "utm-tiktok"; }
  var refe = "", host = "", ua = "";
  try{ refe = String(document.referrer || "").toLowerCase(); }catch(e){}
  try{ host = String(location.hostname || "").toLowerCase(); }catch(e){}
  try{ ua = String(navigator.userAgent || ""); }catch(e){}
  if(refe && (!host || refe.indexOf(host) < 0)){
    if(!r.gptclid && (refe.indexOf("chatgpt.com") > -1 || refe.indexOf("chat.openai.com") > -1)){ r.gptclid = "ref-chatgpt"; }
    if(!r.fbclid && (refe.indexOf("facebook.com") > -1 || refe.indexOf("instagram.com") > -1 || refe.indexOf("threads.net") > -1)){ r.fbclid = "ref-meta"; }
    if(!r.ttclid && refe.indexOf("tiktok.com") > -1){ r.ttclid = "ref-tiktok"; }
  }
  if(!r.fbclid && (ua.indexOf("Instagram") > -1 || ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1 || ua.indexOf("FB_IAB") > -1)){ r.fbclid = "app-meta"; }
  if(!r.ttclid && (ua.indexOf("musical_ly") > -1 || ua.indexOf("BytedanceWebview") > -1 || ua.indexOf("TikTok") > -1)){ r.ttclid = "app-tiktok"; }
  for(var k in r){ if(Object.prototype.hasOwnProperty.call(r, k)){ r[k] = nlLimparParam(r[k]); } }
  return r;
}

// ---------------- INICIALIZACAO ----------------
function nlBootWidget(){
  nlLimpezaInicial();
  NL.corpo = document.getElementById("nl-corpo");
  nlVigiarCliques();
  NL.corpo.addEventListener("scroll", nlChecarDesce);
  setInterval(nlChecarDesce, 1200);
  NL.clientId = nlGerarId();
  var rodape = document.getElementById("nl-id-visual");
  if(rodape){ rodape.textContent = NL.clientId; }

  nlHistRestaurar();

  var _r = nlRastro();
  var _temRastro = (_r.gclid || _r.fbclid || _r.ttclid || _r.gptclid || _r.ref) ? true : false;
  if(!nlLer("netliss_visitou")){
    nlSalvar("netliss_visitou", true, CFG.ttlId);
    nlApiFogo({ acao: "visita", gclid:_r.gclid, fbclid:_r.fbclid, ttclid:_r.ttclid, gptclid:_r.gptclid, ref:_r.ref });
  } else if(_temRastro){
    nlApiFogo({ acao: "retorno", gclid:_r.gclid, fbclid:_r.fbclid, ttclid:_r.ttclid, gptclid:_r.gptclid, ref:_r.ref });
  } else {
    nlApiFogo({ acao: "retorno" });
  }
  setTimeout(function(){ try{ nlIniciarFp(); }catch(e){} }, 1500);

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
  document.addEventListener("visibilitychange", function(){
    try{
      if(document.visibilityState === "visible" && NL.jaAbriu && NL.pgAtivo && (NL.pagPendente || nlLerPendente())){ nlVerificarPagamento(true); }
    }catch(e){}
  });

  nlInstrumentar();

  var _pend = nlLerPendente();
  if(_pend && nlLer("netliss_aberto") === 1 && (_pend.fim || 0) > Date.now()){
    setTimeout(function(){ if(!NL.aberto){ nlAbrirChat("pagamento"); } }, 1200);
  }

  setTimeout(function(){
    if(!NL.aberto){ document.getElementById("nl-bolha").style.display = "block"; }
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
