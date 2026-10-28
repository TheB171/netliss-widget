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
  webhookAf: "https://hook.us2.make.com/k4z1kgqcy8ofo5rgkr4a6l31xwt4emg2",
  playStore: "https://play.google.com/store/apps/details?id=com.netlissbrasil.pro",
  linkInter: "https://inter-co.onelink.me/Qyu7/ste2n6tb",
  videoRot1: "https://youtube.com/watch?v=T2C22IteWv4",
  videoRot2: "https://youtube.com/watch?v=4C8p0xTU8N8",
  videoRot3: "https://youtube.com/watch?v=42S8Cfzf_Xg",
  videoTeste: "https://www.youtube-nocookie.com/embed/3LFpGP8JDh8?rel=0&modestbranding=1&playsinline=1",
  videosRot: ["https://www.youtube-nocookie.com/embed/T2C22IteWv4?rel=0&modestbranding=1&playsinline=1",
              "https://www.youtube-nocookie.com/embed/4C8p0xTU8N8?rel=0&modestbranding=1&playsinline=1",
              "https://www.youtube-nocookie.com/embed/42S8Cfzf_Xg?rel=0&modestbranding=1&playsinline=1"],
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
var NL_LEITURAS = ["pagamento_status", "avisos", "metodos", "renovacao_busca", "contagem"];
var NL_LEITURA_MUDA = ["avisos", "renovacao_busca", "contagem"];
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
  var rotasTeste = ["teste", "reportar_erro", "contagem"];
  var rotasChamado = ["chamado_abrir", "erro"];
  var rotasPag = ["pagamento_criar", "pagamento_renovar", "pagamento_status", "avisos", "recuperar", "acesso_socorro"];
  var destino = CFG.webhook;
  if(rotasTeste.indexOf(payload.acao) > -1){ destino = CFG.webhookTeste; }
  if(rotasPag.indexOf(payload.acao) > -1){ destino = CFG.webhookPag; }
  if(rotasChamado.indexOf(payload.acao) > -1){ destino = CFG.webhookChamado; }
  if(String(payload.acao || "").indexOf("af_") === 0){ destino = CFG.webhookAf; }
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
function nlOpModCliente(){
  var f = nlFichaLer();
  return { operadora: NL.op || f.op || "", modalidade: NL.mod || f.mod || "" };
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

var NL_TELAS = ["nlInicio","nlJaTestou","nlFluxoNovo","nlLimiteTestes","nlPedirNome","nlOutroTeste","nlSalvarNome","nlOpTim","nlOpVivo","nlModalPre","nlModalPos",
  "nlRotaConexao","nlIrParaOperadoras","nlNovoAndroid","nlPerguntarOperadora","nlOutrasOperadoras","nlAndroidModalidade","nlAndroidRegras","nlClaroTela",
  "nlPassoApp","nlAposDownload","nlGerarTeste","nlSuporteNovo","nlFecharSuporte","nlErrosMenu","nlErroRota","nlErroLenta",
  "nlErroNegado","nlErroLimite","nlErroNavega","nlMenuSuporteNovo","nlVoltarSuporte","nlFormChamadoLimite","nlFormChamadoGeral","nlConfirmarDados","nlErroConfig","nlErroSemConfig",
  "nlSupSeguro","nlSupLegal","nlSupTablet","nlSupRoteador","nlSupCarro","nlSuporteAtivo","nlSupCaindo","nlSupLinkApp",
  "nlSupRotear","nlSupCancelar","nlRecuperarAcesso","nlFormRecuperar","nlEnviarRecuperacao","nlReportarErro",
  "nlMostrarPlanos","nlMostrarMetodos","nlPlanoN","nlEscolherPlano","nlPerguntarMetodo","nlVitalicio","nlVitalPix","nlVitalCartao",
  "nlAvisoCompra","nlFormPix","nlValidarDadosPix","nlConfirmouPix","nlPagarPix","nlAcessoSocorro","nlChamadoPagamento",
  "nlFormCartao","nlValidarDadosCartao","nlConfirmouCartao","nlFormDadosCartao","nlTokenizarEPagar","nlPagarCartao","nlErroCartao",
  "nlFluxoCliente","nlPedirUsuario","nlAvisoInicio","nlAvisoOperadora","nlAvisoOkNovo","nlAvisoOkCliente","nlVerificarUsuario","nlBuscarConta","nlRenovarPlanos","nlRenovarN","nlIrParaLiss","nlChamadoRecebeuProblema",
  "nlEnviarChamado","nlDispararChamado","nlEncerrar",
  "nlAfMenuInicial","nlAfInicio","nlAfRegras","nlAfConferir","nlAfEntrar","nlAfArea","nlAfLinkQr"];
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
function nlJaTestou(qtd){
  var f = nlFichaLer();
  var n = parseInt(qtd, 10);
  if(isNaN(n)){ n = f.limite ? 3 : (f.testes || 1); }
  if(n > 3){ n = 3; }
  if(n >= 3){ nlLimiteTestes(); return; }
  NL.nome = NL.nome || f.nome || null;
  var trata = NL.nome ? (nlEscapar(NL.nome) + ", p") : "P";
  nlMsgLiss(trata + "ercebi que você já fez <b>" + n + "/3</b> testes permitidos conosco. O que você quer fazer agora?", function(){
    nlChips([
      { rotulo:"Fazer outro teste", acao:nlOutroTeste },
      { rotulo:"Ver preços e planos", acao:nlMostrarPlanos }
    ]);
  });
}
function nlLimiteTestes(){
  NL.testesAparelho = 3;
  NL.nome = NL.nome || nlFichaLer().nome || null;
  nlMsgLiss("<b>" + nlEscapar(NL.nome || "Tudo bem") + "</b>, eu já liberei para você todos os testes gratuitos que cada cliente tem direito. Por isso, não consigo liberar um novo teste para você.", function(){
    nlMsgLiss("Se você quiser conhecer melhor a Netliss, contrate um plano de 30 dias. Se não gostar ou não quiser continuar, basta não renovar.", function(){
      nlChips([
        { rotulo:"Ver os planos", acao:nlMostrarPlanos }
      ]);
    });
  });
}
async function nlContarTestes(){
  nlEsperaLigar();
  var fp = await nlFpPronto(2500);
  var r = await Promise.race([
    nlApi({ acao:"contagem", fp: fp || "" }),
    new Promise(function(ok){ setTimeout(function(){ ok(null); }, 10000); })
  ]);
  nlEsperaDesligar();
  var n = NaN;
  if(r && r.testes !== undefined && r.testes !== null && r.testes !== ""){ n = parseInt(r.testes, 10); }
  if(isNaN(n)){
    var f = nlFichaLer();
    n = f.limite ? 3 : (f.testou ? (f.testes || 1) : 0);
  }
  NL.testesAparelho = n;
  return n;
}
function nlPedirNome(){
  nlMsgLiss("Seja muito bem-vindo(a)! Antes de tudo, como você se chama?", function(){
    nlForm("<input id='nl-nome-novo' type='text' placeholder='Seu nome' maxlength='40'>" +
           "<button class='botao' onclick='nlSalvarNome()'>Continuar</button>");
  });
}
function nlOutroTeste(){
  if(NL.nome){ nlRotaConexao(); return; }
  nlPedirNome();
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
  try{ nlCarregarAvisos().catch(function(){}); }catch(e){}
  NL.pulouFicha = false;
  NL.testesAparelho = undefined;
  nlGarantirTicket();
  nlMsgLiss("Olá! Jesus te abençoe! Eu sou a <b>Liss</b>, a assistente virtual da Netliss!", function(){
    nlMsgLiss("Para agilizar o seu atendimento, por favor me conte:", function(){
    nlChips([
      { rotulo:"Sou novo aqui", acao:nlFluxoNovo },
      { rotulo:"Já sou cliente", acao:nlFluxoCliente },
      { rotulo:"Ganhe dinheiro indicando a Netliss", acao:nlAfInicio, largo:true }
    ]);
    });
  });
}

// ---------------- NOVO ----------------
async function nlFluxoNovo(){
  if(NL.testesAparelho >= 3){ nlLimiteTestes(); return; }
  if(!NL.pulouFicha){
    NL.pulouFicha = true;
    var n = await nlContarTestes();
    if(n >= 3){ nlLimiteTestes(); return; }
    if(n >= 1){ nlJaTestou(n); return; }
  }
  nlPedirNome();
}
function nlSalvarNome(){
  var n = document.getElementById("nl-nome-novo").value.trim();
  if(n.length < 2){ nlDestravar(); alert("Digite seu nome"); return; }
  NL.nome = n.split(" ")[0];
  nlFichaGravar({ nome: NL.nome });
  nlMsgUser(n);
  nlApiFogo({ acao:"nome", nome:n, aviso:"novo", testes: (NL.testesAparelho > 0 ? NL.testesAparelho : 0) });
  // v92: cliente novo vai direto para a apresentação; o aviso só aparece para Vivo pré
  nlRotaConexao();
}
// v90: aviso importante logo no começo do atendimento (texto da aba Avisos), com botão único
async function nlAvisoInicio(quem){
  if(!NL.avisoMostrado){
    var _cache = false;
    try{ var _c = JSON.parse(localStorage.getItem("nl_avisos") || "null"); _cache = !!(_c && _c.quando && (Date.now() - _c.quando) < 21600000); }catch(e){}
    if(!_cache){ nlEsperaLigar(); }
    try{ await nlCarregarAvisos(); }catch(e){}
    if(!_cache){ nlEsperaDesligar(); }
  }
  if(!NL.avisoMostrado && NL.avisoTexto && NL.avisoTexto.replace(/[\s\-]/g, "").length > 3){
    NL.avisoMostrado = true;
    nlMsgLiss("<b>Aviso importante:</b> " + nlEscapar(NL.avisoTexto), function(){
      nlChips([{ rotulo:"Entendi, continuar", acao:(quem === "cliente" ? nlAvisoOkCliente : nlAvisoOkNovo), largo:true }]);
    });
    return;
  }
  if(quem === "cliente"){ nlPedirUsuario(); } else { nlRotaConexao(); }
}
function nlAvisoOkNovo(){ nlRotaConexao(); }
function nlAvisoOkCliente(){ nlPedirUsuario(); }
function nlOpTim(){ nlAndroidModalidade("TIM"); }
function nlOpVivo(){ nlAndroidModalidade("Vivo"); }
function nlModalPre(){
  if((NL.op || "") === "Vivo"){ nlAvisoOperadora(function(){ nlAndroidRegras("Vivo", "PRE"); }); return; }
  nlAndroidRegras(NL.op || "TIM", "PRE");
}
// v92: aviso importante só para Vivo pré (a Claro já tem a própria tela de aviso)
async function nlAvisoOperadora(depois){
  if(!NL.avisoMostrado){
    try{ await nlCarregarAvisos(); }catch(e){}
  }
  if(!NL.avisoMostrado && NL.avisoTexto && NL.avisoTexto.replace(/[\s\-]/g, "").length > 3){
    NL.avisoMostrado = true;
    nlMsgUser("Pré-pago");
    nlMsgLiss("<b>Aviso importante:</b> " + nlEscapar(NL.avisoTexto), function(){
      nlChips([{ rotulo:"Entendi, continuar", acao:function(){ NL.avisoJaUser = true; depois(); }, largo:true }]);
    });
    return;
  }
  depois();
}
function nlModalPos(){ nlAndroidRegras(NL.op || "TIM", "POS"); }

function nlRotaConexao(){
  nlMsgLiss("Que bom ter você aqui, <b>" + nlEscapar(NL.nome) + "</b>!", function(){
    nlMsgLiss("Nossa internet é <b>100% ilimitada de verdade</b>, e você pode usar e rotear à vontade sem medo de acabar. Nós somos um aplicativo para dispositivos móveis com sistema operacional <b>ANDROID</b>. Não funcionamos com iOS (iPhone) ou outros sistemas operacionais. O pacote da sua operadora pode até diminuir enquanto você usa, mas, quando ele acaba, a Netliss continua funcionando. É fácil de usar e eu vou te explicar tudo por aqui.", function(){
      nlMsgLiss("Primeiro vamos falar sobre as regras de funcionamento, me conta qual operadora você usa?", function(){
        nlChips([
          { rotulo:"TIM", acao:nlOpTim },
          { rotulo:"Vivo", acao:nlOpVivo },
          { rotulo:"Claro", acao:nlClaroTela },
          { rotulo:"Outras operadoras", acao:nlOutrasOperadoras }
        ]);
      });
    });
  });
}
function nlIrParaOperadoras(){ nlNovoAndroid(); }


function nlNovoAndroid(){
  nlPerguntarOperadora();
}
function nlPerguntarOperadora(){
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
  if(NL.avisoJaUser){ NL.avisoJaUser = false; } else { nlMsgUser(mod === "PRE" ? "Pré-pago" : "Pós-pago ou Controle"); }
  if(mod === "PRE"){
    nlMsgLiss("A dica é não ficar longos períodos sem colocar crédito, para que a operadora não cancele o funcionamento da sua rede. Sem a <b>rede utilizável</b> o aplicativo não consegue conectar.", function(){
      nlMsgLiss("Esse crédito não é para gastar com a internet da operadora: serve só para manter a sua <b>rede utilizável</b>, porque a internet que você usa é a da Netliss. Com o saldo <b>válido</b> o aplicativo conecta com mais facilidade; com o saldo <b>expirado</b> ele ainda funciona por um bom tempo, com mais dificuldade, até parar. Quando ficar só em <b>procurando rede utilizável</b>, faça uma nova recarga mínima. Normalmente uma recarga dura de 45 a 90 dias." + (operadora === "TIM" ? " Com a TIM, uma recarga de R$20 costuma durar esse tempo todo." : ""), function(){
        nlChips([
          { rotulo:"Continuar para o teste", acao:nlPassoApp },
          { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
        ]);
      });
    });
  } else {
    nlMsgLiss("A dica é não deixar de pagar em dia o seu plano com a operadora, para que ela não cancele o funcionamento da sua rede. Sem a <b>rede utilizável</b> o aplicativo não consegue conectar.", function(){
      nlMsgLiss("Você pode ficar no plano mais barato da sua operadora se quiser economizar: a Netliss usa a rede da operadora só como caminho até os nossos servidores, e a internet que você usa é a nossa.", function(){
        nlChips([
          { rotulo:"Continuar para o teste", acao:nlPassoApp },
          { rotulo:"Tenho outro chip", acao:nlNovoAndroid }
        ]);
      });
    });
  }
}
function nlClaroTela(){
  NL.op = "Claro"; NL.mod = "POS";
  nlFichaGravar({ op: "Claro", mod: "POS" });
  nlMsgUser("Claro");
  nlMsgLiss("Com a <b>Claro</b>, os resultados estão variando de aparelho para aparelho: só o teste grátis vai mostrar se funciona no seu. Se não funcionar, um chip <b>TIM</b> costuma resolver.", function(){
    nlMsgLiss("A dica é não deixar de recarregar (pré-pago) nem de pagar em dia (pós-pago ou controle), para que a operadora não cancele o funcionamento da sua rede. Sem a <b>rede utilizável</b> o aplicativo não consegue conectar.", function(){
      nlMsgLiss("Você pode ficar no plano mais barato da sua operadora se quiser economizar: a Netliss usa a rede da operadora só como caminho até os nossos servidores, e a internet que você usa é a nossa.", function(){
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
function nlVideoGrande(qual){
  var _src = (qual && CFG.videosRot[qual - 1]) ? CFG.videosRot[qual - 1] : CFG.videoTeste;
  var f = document.createElement("div");
  f.id = "nl-video-grande";
  f.style.cssText = "position:fixed;inset:0;z-index:1000000;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(6px)";
  f.innerHTML = "<div style='position:relative;width:min(900px,92vw)'>" +
    "<div style='position:relative;padding-bottom:56.25%;height:0;border-radius:14px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.7)'>" +
    "<iframe src='" + _src + "&autoplay=1' style='position:absolute;top:0;left:0;width:100%;height:100%;border:0' allow='autoplay; encrypted-media; picture-in-picture; fullscreen' allowfullscreen></iframe></div>" +
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
  nlMsgLiss("O vídeo abaixo vai te ensinar como inserir o seu usuário e senha e fazer o seu teste grátis. Assista antes de prosseguir.", function(){
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
    var _op = NL.op || _fi.op || "", _md = NL.mod || _fi.mod || "";
    var r = await nlApi({ acao:"teste", operadora: _op, modalidade: _md, fp: _fp || "", nome: NL.nome || _fi.nome || "" });
    if(r && !r.limite && !(r.usuario && r.usuario !== "undefined")){
      await new Promise(function(ok){ setTimeout(ok, 2500); });
      var r2 = await nlApi({ acao:"teste", operadora: _op, modalidade: _md, fp: _fp || "", nome: NL.nome || _fi.nome || "" });
      if(r2){ r = r2; }
    }
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlGerarTeste); return; }
    nlInertes("teste");
    if(r && r.limite){
      nlFichaGravar({ testou: 1, testes: 3, limite: 1 });
      nlLimiteTestes();
      return;
    }
    if(r && r.usuario && r.usuario !== "undefined"){
      NL.copiaUser = r.usuario; NL.copiaSenha = r.senha;
      nlFichaGravar({ testou: 1, testes: (nlFichaLer().testes || 0) + 1, op: NL.op || "", mod: NL.mod || "", testeEm: Date.now() });
      nlMsgLiss("Teste grátis liberado:<br><br>Usuário: <b>" + nlEscapar(r.usuario) + "</b><br>Senha: <b>" + nlEscapar(r.senha) + "</b><br>Validade: <b>" + nlEscapar(r.validade_horas || "1") + " hora</b><br><br><button class='chip' data-vivo='1' onclick='nlCopiarCred(0,this)'>Copiar usuário</button> <button class='chip' data-vivo='1' onclick='nlCopiarCred(1,this)'>Copiar senha</button>", function(){
        nlChips([
          { rotulo:"Ver preços e planos", acao:nlMostrarPlanos },
          { rotulo:"Preciso de ajuda", acao:nlSuporteNovo }
        ]);
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
  nlMenuSuporteNovo();
}
function nlMenuSuporteNovo(){
  NL.trilha = "novo";
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
function nlVoltarSuporte(){
  if(NL.trilha === "novo"){ nlMenuSuporteNovo(); return; }
  nlSuporteAtivo();
}
function nlFimSuporte(){
  if(NL.trilha === "novo"){
    return [{ rotulo:"Deu certo, ver preços e planos", acao:nlMostrarPlanos }, { rotulo:"Tenho outra dúvida", acao:nlSuporteNovo }];
  }
  return [{ rotulo:"Resolvido, obrigado", acao:nlFecharSuporte }, { rotulo:"Tenho outra dúvida", acao:nlSuporteAtivo }];
}
function nlFimPergunta(){
  if(NL.trilha === "novo"){
    return [{ rotulo:"Ver preços e planos", acao:nlMostrarPlanos }, { rotulo:"Tenho outra dúvida", acao:nlSuporteNovo }];
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
      { rotulo:"Conecta mas não navega", acao:nlErroNavega },
      { rotulo:"Internet lenta", acao:nlErroLenta },
      { rotulo:"Acesso negado", acao:nlErroNegado },
      { rotulo:"Escolha uma configuração", acao:nlErroConfig },
      { rotulo:"Nenhuma configuração encontrada", acao:nlErroSemConfig },
      { rotulo:"Limite ultrapassado", acao:nlErroLimite },
      { rotulo:"Nenhuma dessas opções", acao:nlVoltarSuporte }
    ]);
  });
}
function nlErroRota(){
  NL.ultimaOrientacao = "rota";
  nlMsgLiss("Esse comportamento é sinal de que a sua rede com a operadora está enfrentando dificuldades. Por isso o aplicativo não conecta, ou não consegue gerar dados de navegação... Vamos tentar resolver.", function(){
    nlMsgLiss("<b>01)</b> Dentro do aplicativo, você precisa testar <b>TODAS</b> as opções da sua operadora, uma por uma. Uma delas costuma conectar.", function(){
      nlMsgLiss("<b>02)</b> Se nenhuma conectar, ligue o <b>modo avião</b>, espere 2 segundos, desligue o modo avião e teste todas as opções de novo.", function(){
        nlMsgLiss("No pré-pago, com o saldo da recarga válido isso costuma resolver rápido. Com o saldo expirado o aplicativo continua funcionando por um bom tempo, porém com mais dificuldade, então pode ser que precise insistir mais um pouco nas etapas 01 e 02. O mesmo vale se você estiver numa área de sinal ruim.", function(){
          nlMsgLiss("Agora, se mesmo insistindo nesse procedimento não conectar de jeito nenhum, é sinal de que a operadora cancelou o funcionamento da sua rede, e sem a <b>rede utilizável</b> o aplicativo não consegue conectar. No pré-pago, só volta a funcionar com uma nova <b>recarga de crédito mínimo</b> com a operadora; no pós-pago ou controle, é preciso colocar o pagamento do plano <b>em dia</b> com a operadora.", function(){
            nlChips(nlFimSuporte());
          });
        });
      });
    });
  });
}
function nlErroNavega(){
  NL.ultimaOrientacao = "navega";
  nlMsgLiss("Esse comportamento é sinal de que a sua rede com a operadora está enfrentando dificuldades. Por isso o aplicativo não conecta, ou não consegue gerar dados de navegação... Vamos tentar resolver.", function(){
    nlMsgLiss("<b>01)</b> Dentro do aplicativo, você precisa testar <b>TODAS</b> as opções da sua operadora, uma por uma. Uma delas costuma conectar.", function(){
      nlMsgLiss("<b>02)</b> Se nenhuma conectar, ligue o <b>modo avião</b>, espere 2 segundos, desligue o modo avião e teste todas as opções de novo.", function(){
        nlMsgLiss("No pré-pago, com o saldo da recarga válido isso costuma resolver rápido. Com o saldo expirado o aplicativo continua funcionando por um bom tempo, porém com mais dificuldade, então pode ser que precise insistir mais um pouco nas etapas 01 e 02. O mesmo vale se você estiver numa área de sinal ruim.", function(){
          nlChips(nlFimSuporte());
        });
      });
    });
  });
}
function nlErroLenta(){
  NL.ultimaOrientacao = "lenta";
  nlMsgLiss("Se a internet está lenta, não tem relação com o aplicativo da Netliss, normalmente é a rede da sua operadora que está congestionada ou com sinal fraco naquele momento. Você pode tentar os passos abaixo.", function(){
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
      var _tit = ["Configurar o celular que vai rotear", "Conectar de outro celular", "Conectar de um notebook"];
      for(var _v = 0; _v < _tit.length; _v++){
        nlCard("<div class='titulo'>" + _tit[_v] + "</div>" +
          "<div style='position:relative;padding-bottom:56%;height:0;border-radius:12px;overflow:hidden;margin:8px 0 11px;border:1px solid rgba(255,255,255,.09)'><iframe src='" + CFG.videosRot[_v] + "' loading='lazy' style='position:absolute;top:0;left:0;width:100%;height:100%;border:0' title='" + _tit[_v] + "' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe></div>" +
          "<button class='botao' style='width:100%;background:rgba(255,255,255,.1);color:#f4f6ff;box-shadow:none' data-vivo='1' onclick='nlVideoGrande(" + (_v + 1) + ")'>Ver em tela maior</button>");
      }
      nlChips(nlFimSuporte());
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
      { rotulo:"Comprei pelo chat", acao:nlFormRecuperar }
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
    var _om = nlOpModCliente();
    var corpo = { acao: acaoPg, metodo:"pix", plan_id: nlPlanoId(p), nome: NL.pgNome, email: NL.pgEmail, cpf: NL.pgCpf, operadora: _om.operadora, modalidade: _om.modalidade };
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
  nlFichaGravar({ comprou: Date.now() });
  nlApiFogo({ acao:"venda", plano: plano.nome, valor: plano.preco, valor_num: nlValorNum(plano.preco), usuario: NL.vendaUser, metodo: pend.metodo || NL.metodoPg || "pix", email: email, cpf: NL.pgCpf || "" });
  var cred = "O acesso foi enviado para o e-mail <b>" + nlEscapar(email) + "</b>.<br><br>Confira também a caixa de spam ou promoções.";
  nlMsgLiss("<b>Pagamento aprovado!</b> Seja bem-vindo(a) à família Netliss!", function(){
    nlMsgLiss(cred, function(){
      nlMsgLiss("Ah, e todo dia publicamos uma mensagem devocional dentro do aplicativo. Dá uma olhada e, se te fizer bem, compartilha com alguém que precise ler.", function(){
        nlEncerrarEm(1500);
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
                  mp_public_key_used: NL.mpChave || "", mp_device_session_id: nlDeviceId(), operadora: nlOpModCliente().operadora, modalidade: nlOpModCliente().modalidade };
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
function nlAvisoCliente(tipo){
  var d = NL.diasRestantes;
  nlApiFogo({ acao:"aviso", tipo: tipo, usuario: NL.usuarioApp || "", dias: (typeof d === "number" && !isNaN(d)) ? Math.max(0, d) : "" });
}
function nlClienteRenovar(){ nlAvisoCliente("renovacao"); nlRenovarPlanos(); }
function nlClienteSuporte(){ nlAvisoCliente("suporte"); nlSuporteAtivo(); }
function nlClienteNaoAchou(){ nlAvisoCliente("nao_achou"); nlMostrarPlanos(); }
function nlClienteEsqueci(){ nlAvisoCliente("recuperacao"); nlRecuperarAcesso(); }
function nlFluxoCliente(){
  nlAvisoInicio("cliente");
}
function nlPedirUsuario(){
  nlMsgLiss("Que bom te ver de novo!<br><br>Me fala o seu <b>nome de usuário</b> (o mesmo que você usa no aplicativo):", function(){
    nlForm("<input id='nl-usuario' type='text' placeholder='Seu nome de usuário' maxlength='40'>" +
           "<button class='botao' onclick='nlVerificarUsuario()'>Verificar minha conta</button>" +
           "<button class='botao sec' onclick='nlClienteEsqueci()'>Esqueci meu usuário</button>");
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
          { rotulo:"Quero renovar", acao:nlClienteRenovar }
        ];
        if(dias !== undefined && dias !== null && !isNaN(dias) && dias > 0){
          opcoes.push({ rotulo:"Suporte 24h", acao:nlClienteSuporte });
        }
        nlChips(opcoes);
      });
    } else {
      nlMsgLiss("Hmm, não encontrei o usuário <b>" + nlEscapar(u) + "</b>. Pode ter sido erro de digitação — ou o acesso já venceu e foi removido do sistema.<br><br>O que você prefere?", function(){
        nlChips([
          { rotulo:"Tentar de novo", acao:nlFluxoCliente },
          { rotulo:"Quero renovar", acao:nlClienteNaoAchou }
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
    var _fase = (NL.trilha === "novo") ? "teste" : "cliente";
    var _fpc = await nlFpPronto(1500);
    var r = await nlApi({ acao:"chamado_abrir", nome: NL.nome || "Cliente", email: NL.chEmail || "", whatsapp: NL.chZap || "", usuario: NL.chUser || nlUsuarioConhecido(), problema: NL.chamadoProblema || "", fase: _fase, fp: _fpc || "" });
    nlEsperaDesligar();
    if(!r || !(r.success === true || r.success === "true")){ nlInstabilidade(nlDispararChamado); return; }
    NL.ultimoChamado = r.chamado || "";
    if(_fase === "teste"){ nlFichaGravar({ testou: 0, testes: 0, limite: 0 }); NL.testesAparelho = 0; }
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
  r.origem = nlOrigemDetalhe(params, src, refe, host, ua, r);
  r.campanha = params.get("utm_campaign") || params.get("campaign") || params.get("utm_content") || "";
  for(var k in r){ if(Object.prototype.hasOwnProperty.call(r, k)){ r[k] = nlLimparParam(r[k]); } }
  return r;
}
// v88: origem detalhada (rotulo legivel para a planilha)
function nlOrigemDetalhe(params, src, refe, host, ua, r){
  var med = (params.get("utm_medium") || "").toLowerCase();
  var pago = (med.indexOf("cpc") > -1 || med.indexOf("paid") > -1 || med.indexOf("ads") > -1 || med.indexOf("pago") > -1);
  var dom = "";
  if(refe && (!host || refe.indexOf(host) < 0)){
    var m = refe.match(/^[a-z]+:\/\/([^\/:?#]+)/);
    dom = m ? m[1].replace(/^www\./, "").replace(/^m\./, "").replace(/^l\./, "").replace(/^lm\./, "") : "";
  }
  function tem(t){ return dom.indexOf(t) > -1; }
  if(params.get("ref")) return "afiliado";
  if(params.get("gclid") || params.get("gbraid") || params.get("wbraid")) return (src.indexOf("youtube") > -1 ? "youtube-ads" : "google-ads");
  if(params.get("gptclid") || params.get("gpt_id")) return "chatgpt-ads";
  if(params.get("fbclid") && pago) return "meta-ads";
  if(params.get("ttclid")) return "tiktok-ads";
  if(src){
    var s2 = src.replace(/[^a-z0-9]/g, "");
    if(s2 === "ig") s2 = "instagram";
    if(s2 === "fb") s2 = "facebook";
    if(s2 === "yt") s2 = "youtube";
    if(s2 === "wa" || s2 === "zap") s2 = "whatsapp";
    if(s2.indexOf("chatgpt") > -1 || s2.indexOf("openai") > -1) s2 = "chatgpt";
    return s2.substring(0, 30) + (pago ? "-ads" : (med ? "-" + med.replace(/[^a-z0-9]/g, "").substring(0, 15) : ""));
  }
  if(dom){
    if(tem("youtube.") || tem("youtu.be")) return "youtube";
    if(tem("google.")) return "google-organico";
    if(tem("instagram.")) return "instagram";
    if(tem("facebook.") || tem("fb.")) return "facebook";
    if(tem("threads.")) return "threads";
    if(tem("whatsapp.") || tem("wa.me")) return "whatsapp";
    if(tem("chatgpt.") || tem("openai.")) return "chatgpt";
    if(tem("gemini.") || tem("bard.")) return "gemini";
    if(tem("perplexity.")) return "perplexity";
    if(tem("copilot.")) return "copilot";
    if(tem("claude.ai")) return "claude";
    if(tem("deepseek.")) return "deepseek";
    if(tem("bing.")) return "bing";
    if(tem("yahoo.")) return "yahoo";
    if(tem("duckduckgo.")) return "duckduckgo";
    if(tem("tiktok.")) return "tiktok";
    if(tem("kwai.")) return "kwai";
    if(tem("t.co") || tem("twitter.") || tem("x.com")) return "x-twitter";
    if(tem("telegram.") || tem("t.me")) return "telegram";
    return "site-" + dom.substring(0, 40);
  }
  if(ua.indexOf("Instagram") > -1) return "instagram-app";
  if(ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1 || ua.indexOf("FB_IAB") > -1) return "facebook-app";
  if(ua.indexOf("musical_ly") > -1 || ua.indexOf("BytedanceWebview") > -1 || ua.indexOf("TikTok") > -1) return "tiktok-app";
  if(ua.indexOf("WhatsApp") > -1) return "whatsapp";
  if(params.get("fbclid")) return "meta-link";
  return "direto";
}

// ================================================================
//  PROGRAMA DE AFILIADOS (v85)
//  Cadastro, entrada por codigo no e-mail, area do afiliado.
//  Tudo conversa com o cenario "Netliss - Afiliados" (CFG.webhookAf).
// ================================================================
function nlAfP2(n){ n = Number(n || 0); return n < 10 ? "0" + n : String(n); }
function nlAfEmailOk(e){
  e = String(e || "").trim().toLowerCase();
  var a = e.indexOf("@");
  if(a < 1 || e.indexOf(" ") > -1 || e.lastIndexOf(".") < a + 2 || e.lastIndexOf(".") > e.length - 3){ return ""; }
  return e;
}
function nlAfCadLer(){ return nlLer("netliss_afcad") || {}; }
function nlAfCadGravar(dados){
  var c = nlAfCadLer();
  for(var k in dados){ if(dados.hasOwnProperty(k)){ c[k] = dados[k]; } }
  nlSalvar("netliss_afcad", c, 3600000);
  return c;
}
function nlAfSes(){ return nlLer("netliss_afses") || {}; }
function nlAfSesGravar(email, sessao, dados){
  nlSalvar("netliss_afses", { email: email, sessao: sessao, dados: dados || {} }, 7000000);
}
function nlAfSesDados(dados){
  var s = nlAfSes();
  if(!s.sessao){ return; }
  s.dados = dados || s.dados;
  nlSalvar("netliss_afses", s, 7000000);
}
function nlAfSesLimpar(){ try{ localStorage.removeItem("netliss_afses"); }catch(e){} }
function nlAfMenuInicial(){
  nlMsgLiss("Como posso te ajudar?", function(){
    nlChips([
      { rotulo:"Sou novo aqui", acao:nlFluxoNovo },
      { rotulo:"Já sou cliente", acao:nlFluxoCliente },
      { rotulo:"Ganhe dinheiro indicando a Netliss", acao:nlAfInicio, largo:true }
    ]);
  });
}

// ---------- A01 apresentacao ----------
function nlAfInicio(){
  nlMsgLiss("Indique a Netliss e ganhe <b>20%</b> do primeiro pagamento de cada cliente que contratar pelo seu link ou QR code.<br><br>O Pix cai na sua conta no dia seguinte à venda.", function(){
    nlChips([
      { rotulo:"Quero ser afiliado", acao:nlAfRegras },
      { rotulo:"Já sou afiliado", acao:nlAfEntrar }
    ]);
  });
}

// ---------- A02 regras ----------
function nlAfRegras(){
  nlMsgLiss("Antes do cadastro, as regras do programa:<br><br>" +
    "<b>01.</b> A comissão é de 20% sobre o primeiro pagamento de cada CPF. Renovação não gera comissão.<br><br>" +
    "<b>02.</b> A indicação fica registrada no celular e no navegador onde a pessoa abriu o seu link.<br><br>" +
    "<b>03.</b> Se um pagamento for estornado, o valor é descontado das suas próximas comissões.", function(){
    nlMsgLiss("<b>04.</b> Tentar fazer cliente antigo passar por novo leva à desclassificação do programa.<br><br>" +
      "<b>05.</b> Ao excluir o cadastro, você perde as comissões pendentes e futuras.<br><br>" +
      "<b>06.</b> Não há vínculo empregatício. A Netliss pode encerrar o programa a qualquer momento, com aviso prévio e pagamento das comissões já geradas.", function(){
      nlChips([
        { rotulo:"Li e aceito as regras", acao:nlAfAceitar }
      ]);
    });
  });
}
function nlAfAceitar(){
  nlAfCadGravar({ aceite: "1" });
  nlAfPedirEmail();
}

// ---------- A03 cadastro, uma pergunta por vez ----------
function nlAfPedirEmail(){
  nlMsgLiss("Ótimo! Qual é o seu <b>e-mail</b>?<br><br><i>Atenção: o e-mail do cadastro não poderá ser alterado depois.</i>", function(){
    nlForm("<input id='nl-af-email' type='email' placeholder='seuemail@exemplo.com' maxlength='80'>" +
           "<button class='botao' onclick='nlAfSalvarEmail()'>Continuar</button>");
  });
}
function nlAfSalvarEmail(){
  if(nlTrancado("afemail")){ return; }
  var campo = document.getElementById("nl-af-email");
  var e = nlAfEmailOk(campo ? campo.value : "");
  if(!e){ nlDestravar(); alert("Digite um e-mail válido"); return; }
  nlMsgUser(e);
  nlAfCadGravar({ email: e });
  nlAfPedirZap();
}
function nlAfPedirZap(){
  nlMsgLiss("Agora o seu <b>WhatsApp</b>, para contato quando for preciso:", function(){
    nlForm(nlTelHtml("nl-af-tel", "WhatsApp para contato") +
           "<button class='botao' onclick='nlAfSalvarZap()'>Continuar</button>");
  });
}
function nlAfSalvarZap(){
  if(nlTrancado("afzap")){ return; }
  var t = nlTelLer("nl-af-tel");
  if(!t){ nlDestravar(); alert("Digite o DDD e o número do WhatsApp"); return; }
  nlMsgUser(t);
  nlAfCadGravar({ zap: t });
  nlAfPedirTitular();
}
function nlAfPedirTitular(){
  nlMsgLiss("Qual é o <b>nome completo do titular</b> da conta que vai receber os pagamentos?", function(){
    nlForm("<input id='nl-af-titular' type='text' placeholder='Nome completo do titular' maxlength='80'>" +
           "<button class='botao' onclick='nlAfSalvarTitular()'>Continuar</button>");
  });
}
function nlAfSalvarTitular(){
  if(nlTrancado("aftitular")){ return; }
  var campo = document.getElementById("nl-af-titular");
  var t = campo ? campo.value.trim() : "";
  if(t.length < 5 || t.indexOf(" ") < 1){ nlDestravar(); alert("Digite o nome completo do titular"); return; }
  nlMsgUser(t);
  nlAfCadGravar({ titular: t });
  nlAfPedirPix();
}
function nlAfPedirPix(){
  nlMsgLiss("E qual é a sua <b>chave Pix</b>? Pode ser CPF, celular, e-mail ou chave aleatória.", function(){
    nlForm("<input id='nl-af-pix' type='text' placeholder='Sua chave Pix' maxlength='120'>" +
           "<button class='botao' onclick='nlAfSalvarPix()'>Continuar</button>");
  });
}
function nlAfSalvarPix(){
  if(nlTrancado("afpix")){ return; }
  var campo = document.getElementById("nl-af-pix");
  var p = campo ? campo.value.trim() : "";
  if(p.length < 4){ nlDestravar(); alert("Digite a sua chave Pix"); return; }
  nlMsgUser(p);
  nlAfCadGravar({ pix: p });
  nlAfConferir();
}
function nlAfConferir(){
  var c = nlAfCadLer();
  nlMsgLiss("Confere os seus dados:<br><br>" +
    "<b>E-mail:</b> " + nlEscapar(c.email || "") + "<br>" +
    "<b>WhatsApp:</b> " + nlEscapar(c.zap || "") + "<br>" +
    "<b>Titular:</b> " + nlEscapar(c.titular || "") + "<br>" +
    "<b>Chave Pix:</b> " + nlEscapar(c.pix || ""), function(){
    nlChips([
      { rotulo:"Confirmar", acao:nlAfEnviarCadastro },
      { rotulo:"Corrigir", acao:nlAfPedirEmail, sec:true }
    ]);
  });
}
function nlAfEnviarCadastro(){
  var c = nlAfCadLer();
  if(!c.email || !c.zap || !c.titular || !c.pix){ nlAfPedirEmail(); return; }
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"af_cadastrar", email:c.email, whatsapp:c.zap, titular:c.titular, pix:c.pix, aceite:c.aceite || "1" });
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlAfEnviarCadastro); return; }
    if(r.ok){
      try{ localStorage.removeItem("netliss_afcad"); }catch(e){}
      nlMsgLiss("Pronto, <b>" + nlEscapar(String(c.titular).split(" ")[0]) + "</b>! Seu cadastro de afiliado foi concluído. 🎉<br><br>Aqui estão o seu link e o seu QR code. Copie e guarde em um lugar seguro: também enviamos tudo para o seu e-mail.", function(){
        nlAfCardLinkQr(r.link, r.qr, r.ref);
        nlMsgLiss("Agora é só divulgar onde você quiser. Cada cliente novo que contratar pelo seu link gera a sua comissão.", function(){
        });
      });
      return;
    }
    if(r.existe === "ativo"){
      nlMsgLiss("Esse e-mail já está cadastrado como afiliado.", function(){
        nlChips([
          { rotulo:"Entrar como afiliado", acao:nlAfEntrarCadastrado },
          { rotulo:"Usar outro e-mail", acao:nlAfPedirEmail, sec:true }
        ]);
      });
      return;
    }
    if(r.existe === "desativado"){
      nlMsgLiss("Esse cadastro de afiliado está desativado, deseja reativar novamente?", function(){
        nlChips([
          { rotulo:"Sim, reativar", acao:nlAfEntrarCadastrado },
          { rotulo:"Não", acao:nlAfMenuInicial, sec:true }
        ]);
      });
      return;
    }
    nlMsgLiss("Algum dado ficou inválido. Vamos conferir de novo, começando pelo e-mail.", function(){ nlAfPedirEmail(); });
  });
}
function nlAfEntrarCadastrado(){
  var c = nlAfCadLer();
  if(c.email){ nlAfPedirCodigo(c.email); return; }
  nlAfEntrar();
}

// ---------- link e QR code ----------
function nlAfCardLinkQr(link, qr, ref){
  var l = nlEscapar(link || ""), q = nlEscapar(qr || "");
  nlCard("<div class='titulo'>Seu link de afiliado</div>" +
    "<div class='pix-codigo' style='font-size:12.5px;color:var(--texto)'>" + l + "</div>" +
    "<button class='botao' data-vivo='1' data-v='" + l + "' onclick='nlAfCopiar(this)'>Copiar link</button>" +
    "<div class='titulo' style='margin-top:16px'>Seu QR code</div>" +
    "<div style='background:#fff;border-radius:12px;padding:10px;margin:8px 0 11px;text-align:center'>" +
    "<img src='" + q + "' alt='QR code' style='width:100%;max-width:220px;height:auto;display:block;margin:0 auto'></div>" +
    "<button class='botao' data-vivo='1' data-v='" + q + "' data-n='qrcode-netliss-" + nlEscapar(ref || "") + ".png' onclick='nlAfBaixarQr(this)'>Baixar QR code</button>",
    { nl: "aflink" });
}
function nlAfCopiar(b){
  var v = b ? b.getAttribute("data-v") : "";
  if(!v){ return; }
  nlCopiarTexto(v);
  nlAvisinho("Link copiado!");
}
async function nlAfBaixarQr(b){
  var url = b ? b.getAttribute("data-v") : "";
  var nome = (b && b.getAttribute("data-n")) || "qrcode-netliss.png";
  if(!url){ return; }
  try{
    var r = await fetch(url);
    var blob = await r.blob();
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nome;
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){ try{ URL.revokeObjectURL(a.href); a.remove(); }catch(e){} }, 1500);
    nlAvisinho("QR code baixado!");
  }catch(e){
    window.open(url, "_blank");
  }
}

// ---------- A05 entrada por codigo ----------
function nlAfEntrar(){
  var s = nlAfSes();
  if(s.sessao && s.dados && s.dados.ref){ nlAfArea(); return; }
  nlMsgLiss("Me fala o <b>e-mail</b> do seu cadastro de afiliado. Vou te enviar um código de acesso.", function(){
    nlForm("<input id='nl-af-login' type='email' placeholder='seuemail@exemplo.com' maxlength='80'>" +
           "<button class='botao' onclick='nlAfSalvarLogin()'>Enviar código</button>");
  });
}
function nlAfSalvarLogin(){
  if(nlTrancado("aflogin")){ return; }
  var campo = document.getElementById("nl-af-login");
  var e = nlAfEmailOk(campo ? campo.value : "");
  if(!e){ nlDestravar(); alert("Digite um e-mail válido"); return; }
  nlMsgUser(e);
  nlAfPedirCodigo(e);
}
function nlAfPedirCodigo(email){
  nlAfCadGravar({ email: email });
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"af_codigo", email:email });
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlAfEntrar); return; }
    if(r.ok || r.motivo === "espere"){
      var txt = r.ok
        ? "Enviei um código de <b>06 caracteres</b> para <b>" + nlEscapar(email) + "</b>. Confira também a caixa de spam.<br><br>O código vale por 10 minutos."
        : "Acabei de enviar um código para <b>" + nlEscapar(email) + "</b>. Confira a caixa de entrada e o spam.";
      nlMsgLiss(txt, function(){ nlAfFormCodigo(); });
      return;
    }
    if(r.existe === false){
      nlMsgLiss("Não encontrei nenhum afiliado com esse e-mail.", function(){
        nlChips([
          { rotulo:"Quero ser afiliado", acao:nlAfRegras },
          { rotulo:"Tentar outro e-mail", acao:nlAfEntrar, sec:true }
        ]);
      });
      return;
    }
    nlInstabilidade(nlAfEntrar);
  });
}
function nlAfFormCodigo(){
  nlForm("<input id='nl-af-codigo' type='text' placeholder='Código de 06 caracteres' maxlength='6' autocomplete='one-time-code' style='text-transform:uppercase;letter-spacing:4px;text-align:center'>" +
         "<button class='botao' onclick='nlAfSalvarCodigo()'>Entrar</button>" +
         "<button class='botao sec' onclick='nlAfReenviar()'>Reenviar código</button>");
}
function nlAfReenviar(){
  var c = nlAfCadLer();
  if(!c.email){ nlAfEntrar(); return; }
  nlMsgUser("Reenviar código");
  nlAfPedirCodigo(c.email);
}
function nlAfSalvarCodigo(){
  if(nlTrancado("afcodigo")){ return; }
  var campo = document.getElementById("nl-af-codigo");
  var cod = campo ? campo.value.trim().toUpperCase() : "";
  if(cod.length !== 6){ nlDestravar(); alert("Digite o código de 06 caracteres"); return; }
  var c = nlAfCadLer();
  if(!c.email){ nlAfEntrar(); return; }
  nlMsgUser(cod);
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"af_entrar", email:c.email, codigo:cod });
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlAfFormCodigo); return; }
    if(r.ok){
      nlAfSesGravar(c.email, r.sessao, r.dados);
      if(r.dados && r.dados.status === "desativado"){
        nlMsgLiss("Esse cadastro de afiliado está desativado, deseja reativar novamente?", function(){
          nlChips([
            { rotulo:"Sim, reativar", acao:nlAfReativar },
            { rotulo:"Não", acao:nlAfSair, sec:true }
          ]);
        });
        return;
      }
      nlAfArea();
      return;
    }
    if(r.motivo === "errado"){
      nlMsgLiss("Código incorreto. Você ainda tem <b>" + nlAfP2(r.restam) + "</b> " + (r.restam === 1 ? "tentativa" : "tentativas") + ".", function(){ nlAfFormCodigo(); });
      return;
    }
    var msg = (r.motivo === "bloqueado") ? "Você errou o código 03 vezes. Por segurança, peça um código novo." : "Esse código expirou. Peça um código novo.";
    nlMsgLiss(msg, function(){
      nlChips([
        { rotulo:"Pedir código novo", acao:nlAfReenviarChip }
      ]);
    });
  });
}
function nlAfReenviarChip(){
  var c = nlAfCadLer();
  if(!c.email){ nlAfEntrar(); return; }
  nlAfPedirCodigo(c.email);
}

// ---------- A06 area do afiliado ----------
function nlAfArea(){
  var s = nlAfSes();
  if(!s.sessao){ nlAfSessaoVencida(); return; }
  var d = s.dados || {};
  nlMsgLiss("<b>Sua área de afiliado</b><br><br>" +
    "<b>Titular:</b> " + nlEscapar(d.titular || "") + "<br>" +
    "<b>WhatsApp:</b> " + nlEscapar(d.whatsapp || "") + "<br>" +
    "<b>Chave Pix:</b> " + nlEscapar(d.pix || "") + "<br>" +
    "<b>E-mail:</b> " + nlEscapar(d.email || s.email || "") + "<br>" +
    "<b>Código:</b> " + nlEscapar(d.ref || ""), function(){
    nlChips([
      { rotulo:"Meu link e QR code", acao:nlAfLinkQr },
      { rotulo:"Meus resultados", acao:nlAfResultados },
      { rotulo:"Editar WhatsApp", acao:nlAfEditarZap },
      { rotulo:"Editar chave Pix", acao:nlAfEditarPix },
      { rotulo:"Excluir cadastro", acao:nlAfExcluir, sec:true },
      { rotulo:"Sair", acao:nlAfSair, sec:true }
    ]);
  });
}
function nlAfSessaoVencida(){
  nlAfSesLimpar();
  nlMsgLiss("Por segurança, o seu acesso de afiliado expirou. Entre de novo com o seu e-mail.", function(){ nlAfEntrar(); });
}
function nlAfVoltarArea(){ nlAfArea(); }
function nlAfLinkQr(){
  var s = nlAfSes();
  if(!s.sessao){ nlAfSessaoVencida(); return; }
  var d = s.dados || {};
  nlMsgLiss("Aqui estão o seu link e o seu QR code:", function(){
    nlAfCardLinkQr(d.link, d.qr, d.ref);
    nlChips([{ rotulo:"Voltar à minha área", acao:nlAfVoltarArea, sec:true }]);
  });
}
function nlAfResultados(){
  var s = nlAfSes();
  if(!s.sessao){ nlAfSessaoVencida(); return; }
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"af_resultados", email:s.email, sessao:s.sessao });
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlAfResultados); return; }
    if(!r.ok){ nlAfSessaoVencida(); return; }
    nlMsgLiss("<b>Seus resultados</b><br><br>" +
      "<b>Vendas que geraram comissão:</b> " + nlAfP2(r.vendas) + "<br>" +
      "<b>Comissões geradas:</b> " + nlEscapar(r.ganhos) + "<br>" +
      "<b>Já recebido:</b> " + nlEscapar(r.pago) + "<br>" +
      "<b>A receber:</b> " + nlEscapar(r.receber) + "<br><br>" +
      "<i>As vendas de hoje aparecem aqui amanhã, depois das 10h30.</i>", function(){
      nlChips([{ rotulo:"Voltar à minha área", acao:nlAfVoltarArea, sec:true }]);
    });
  });
}
function nlAfEditarZap(){
  nlMsgLiss("Qual é o seu <b>novo WhatsApp</b>?", function(){
    nlForm(nlTelHtml("nl-af-tel2", "Novo WhatsApp") +
           "<button class='botao' onclick='nlAfSalvarZapNovo()'>Salvar</button>" +
           "<button class='botao sec' onclick='nlAfVoltarArea()'>Cancelar</button>");
  });
}
function nlAfSalvarZapNovo(){
  if(nlTrancado("afzap2")){ return; }
  var t = nlTelLer("nl-af-tel2");
  if(!t){ nlDestravar(); alert("Digite o DDD e o número do WhatsApp"); return; }
  nlMsgUser(t);
  nlAfMandarEdicao({ campo:"whatsapp", whatsapp:t });
}
function nlAfEditarPix(){
  nlMsgLiss("Informe a <b>nova chave Pix</b> e o <b>nome completo do titular</b> da conta:", function(){
    nlForm("<input id='nl-af-pix2' type='text' placeholder='Nova chave Pix' maxlength='120'>" +
           "<input id='nl-af-tit2' type='text' placeholder='Nome completo do titular' maxlength='80'>" +
           "<button class='botao' onclick='nlAfSalvarPixNovo()'>Salvar</button>" +
           "<button class='botao sec' onclick='nlAfVoltarArea()'>Cancelar</button>");
  });
}
function nlAfSalvarPixNovo(){
  if(nlTrancado("afpix2")){ return; }
  var p = (document.getElementById("nl-af-pix2") || {}).value || "";
  var t = (document.getElementById("nl-af-tit2") || {}).value || "";
  p = p.trim(); t = t.trim();
  if(p.length < 4){ nlDestravar(); alert("Digite a nova chave Pix"); return; }
  if(t.length < 5 || t.indexOf(" ") < 1){ nlDestravar(); alert("Digite o nome completo do titular"); return; }
  nlMsgUser(p + " (" + t + ")");
  nlAfMandarEdicao({ campo:"pix", pix:p, titular:t });
}
function nlAfMandarEdicao(dados){
  var s = nlAfSes();
  if(!s.sessao){ nlAfSessaoVencida(); return; }
  dados.acao = "af_editar"; dados.email = s.email; dados.sessao = s.sessao;
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi(dados);
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlAfVoltarArea); return; }
    if(r.ok){
      nlAfSesDados(r.dados);
      nlMsgLiss("Pronto, dados atualizados!", function(){ nlAfArea(); });
      return;
    }
    if(r.motivo === "sessao"){ nlAfSessaoVencida(); return; }
    nlMsgLiss("Não consegui salvar: confira os dados e tente de novo.", function(){ nlAfArea(); });
  });
}
function nlAfExcluir(){
  nlMsgLiss("Ao excluir, você perde as comissões pendentes e futuras e o seu link deixa de gerar comissão. Deseja continuar?", function(){
    nlChips([
      { rotulo:"Sim, excluir", acao:nlAfExcluirConfirma },
      { rotulo:"Cancelar", acao:nlAfVoltarArea, sec:true }
    ]);
  });
}
function nlAfExcluirConfirma(){
  var s = nlAfSes();
  if(!s.sessao){ nlAfSessaoVencida(); return; }
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"af_excluir", email:s.email, sessao:s.sessao });
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlAfExcluir); return; }
    if(!r.ok){ nlAfSessaoVencida(); return; }
    nlAfSesLimpar();
    nlMsgLiss("Seu cadastro de afiliado foi desativado.<br><br>Se um dia quiser voltar, é só entrar com o mesmo e-mail em <b>Já sou afiliado</b>.", function(){
      
    });
  });
}
function nlAfReativar(){
  var s = nlAfSes();
  if(!s.sessao){ nlAfSessaoVencida(); return; }
  nlDigitar(async function(){
    nlEsperaLigar();
    var r = await nlApi({ acao:"af_reativar", email:s.email, sessao:s.sessao });
    nlEsperaDesligar();
    if(!r){ nlInstabilidade(nlAfReativar); return; }
    if(!r.ok){ nlAfSessaoVencida(); return; }
    nlAfSesDados(r.dados);
    nlMsgLiss("Cadastro reativado! Bem-vindo(a) de volta. 🎉", function(){ nlAfArea(); });
  });
}
function nlAfSair(){
  nlAfSesLimpar();
  nlMsgLiss("Você saiu da sua área de afiliado.", function(){
    
  });
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

  // Liss nova: historico e tela salvos pelo chat antigo (botoes e planos antigos) nao sao mostrados
  try{ if(nlLer("netliss_modo") !== "liss2"){ localStorage.removeItem("netliss_hist"); localStorage.removeItem("netliss_estado"); } }catch(e){}
  nlHistRestaurar();

  var _r = nlRastro();
  var _temRastro = (_r.gclid || _r.fbclid || _r.ttclid || _r.gptclid || _r.ref) ? true : false;
  if(!nlLer("netliss_visitou")){
    nlSalvar("netliss_visitou", true, CFG.ttlId);
    nlApiFogo({ acao: "visita", gclid:_r.gclid, fbclid:_r.fbclid, ttclid:_r.ttclid, gptclid:_r.gptclid, ref:_r.ref, origem:_r.origem, campanha:_r.campanha });
  } else if(_temRastro){
    nlApiFogo({ acao: "retorno", gclid:_r.gclid, fbclid:_r.fbclid, ttclid:_r.ttclid, gptclid:_r.gptclid, ref:_r.ref, origem:_r.origem, campanha:_r.campanha });
  } else {
    nlApiFogo({ acao: "retorno", origem:_r.origem });
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

// ================================================================
//  BETA: Liss conversando pelo Dify (mesma cara do chat oficial)
// ================================================================
var NL_DIFY = { base: "https://atendimento.netliss.com", code: "crQaCrMQQJN6fDfU", tok: null, tokEm: 0 };
function nlMdHtml(txt){
  var NLc = String.fromCharCode(10);
  var linhas = String(txt || "").split(String.fromCharCode(13)).join("").split(NLc);
  var out = [];
  for(var i = 0; i < linhas.length; i++){
    var l = nlEscapar(linhas[i]);
    var r = "", pos = 0;
    while(true){
      var a = l.indexOf("[", pos);
      if(a < 0){ r += l.substring(pos); break; }
      var b = l.indexOf("](", a);
      var c = (b > -1) ? l.indexOf(")", b + 2) : -1;
      if(b < 0 || c < 0){ r += l.substring(pos); break; }
      var rot = l.substring(a + 1, b), url = l.substring(b + 2, c);
      r += l.substring(pos, a);
      if(url.indexOf("http") === 0){
        if(url.indexOf("https://play.google.com/") === 0){
          // link da Play Store: selo oficial do Google Play + o endereco visivel, para o cliente ver que e a loja oficial
          r += "<a class='nl-play' href='" + url + "' target='_blank' rel='noopener'>" +
               "<img src='https://play.google.com/intl/pt-BR/badges/static/images/badges/pt-br_badge_web_generic.png' alt='Disponível no Google Play' onerror=\"this.outerHTML='<span class=nl-play-alt>Abrir na Play Store</span>'\">" +
               "<span class='nl-play-dom'>🔒 play.google.com · loja oficial do Google</span></a>";
        } else {
          if(rot === url && (url.indexOf("youtu") > -1)){ rot = "▶️ Assistir ao vídeo"; }
          r += "<a class='nl-link' href='" + url + "' target='_blank' rel='noopener'>" + rot + "</a>";
        }
      }
      else { r += l.substring(a, c + 1); }
      pos = c + 1;
    }
    var p = r.split("**");
    if(p.length > 2){ r = ""; for(var k = 0; k < p.length; k++){ r += (k % 2 === 1 && k < p.length - 1) ? "<b>" + p[k] + "</b>" : p[k]; } }
    out.push(r);
  }
  return out.join("<br>");
}
async function nlDifyToken(){
  // a chave de sessao do Dify nao expira e e ela que liga o cliente a conversa:
  // fica guardada no aparelho, para a Liss nao "esquecer" a conversa quando a pagina recarrega
  if(NL_DIFY.tok){ return NL_DIFY.tok; }
  var salvo = nlLer("netliss_liss_sessao");
  if(salvo){ NL_DIFY.tok = salvo; return salvo; }
  var r = await fetch(NL_DIFY.base + "/api/passport", { headers: { "X-App-Code": NL_DIFY.code } });
  var j = await r.json();
  NL_DIFY.tok = j.access_token; NL_DIFY.tokEm = Date.now();
  try{ nlSalvar("netliss_liss_sessao", NL_DIFY.tok, 2592000000); }catch(e){}
  return NL_DIFY.tok;
}
async function nlDifyPergunta(texto, aoBloco){
  var tok = await nlDifyToken();
  var fp = "";
  try{ fp = await nlFpPronto(NL.fp ? 50 : 1200); }catch(e){}
  var corpo = { inputs: { id_netliss: NL.clientId || "", fp: fp || "" }, query: texto, response_mode: "streaming", conversation_id: NL.difyConv || "" };
  // sem o "pai" (a ultima mensagem da conversa) o Dify nao entrega o historico para a Liss e ela esquece tudo
  var pai = nlLer("netliss_liss_pai");
  if(NL.difyConv && pai && pai.conv === NL.difyConv && pai.msg){ corpo.parent_message_id = pai.msg; }
  if(NL.difyArquivos && NL.difyArquivos.length){ corpo.files = NL.difyArquivos.map(function(id){ return { type: "image", transfer_method: "local_file", upload_file_id: id }; }); }
  var r = await fetch(NL_DIFY.base + "/api/chat-messages", { method: "POST", headers: { "X-App-Passport": tok, "X-App-Code": NL_DIFY.code, "Content-Type": "application/json" }, body: JSON.stringify(corpo) });
  if(r.status === 401 && !NL.difyReset){ NL.difyReset = 1; NL_DIFY.tok = null; try{ localStorage.removeItem("netliss_liss_sessao"); }catch(e){} NL.difyConv = null; nlSalvarConv(); return nlDifyPergunta(texto, aoBloco); }
  if(r.status === 404 && NL.difyConv){ NL.difyConv = null; nlSalvarConv(); return nlDifyPergunta(texto, aoBloco); }
  if(r.status >= 400){ throw new Error("dify " + r.status); }
  NL.difyArquivos = null;
  var resp = "", enviado = 0, parou = false, NL2 = String.fromCharCode(10) + String.fromCharCode(10);
  // mostra cada paragrafo assim que ele fica pronto (a conversa flui como gente escrevendo)
  var emitir = function(){
    if(!aoBloco || parou){ return; }
    while(true){
      var resto = resp.slice(enviado), k = resto.indexOf(NL2);
      if(k < 0){ return; }
      var bloco = resto.slice(0, k);
      if(bloco.indexOf("[") > -1){ parou = true; return; }
      enviado += k + 2;
      if(bloco.trim()){ aoBloco(bloco.trim()); }
    }
  };
  var tratar = function(ln){
    if(ln.indexOf("data:") !== 0){ return; }
    var d = null; try{ d = JSON.parse(ln.substring(5)); }catch(e){ return; }
    if(d.conversation_id && !NL.difyConv){ NL.difyConv = d.conversation_id; nlSalvarConv(); }
    var mid = d.message_id || (d.event === "message_end" ? d.id : "");
    if(mid && d.conversation_id){ try{ nlSalvar("netliss_liss_pai", { conv: d.conversation_id, msg: mid }, 2592000000); }catch(e){} }
    if(d.event === "agent_message" || d.event === "message"){ resp += (d.answer || ""); emitir(); }
    if(d.event === "error"){ throw new Error(d.message || "erro"); }
  };
  if(r.body && r.body.getReader){
    var leitor = r.body.getReader(), dec = new TextDecoder(), buf = "";
    while(true){
      var pedaco = await leitor.read();
      if(pedaco.done){ break; }
      buf += dec.decode(pedaco.value, { stream: true });
      var j;
      while((j = buf.indexOf(String.fromCharCode(10))) > -1){ var linha = buf.slice(0, j).trim(); buf = buf.slice(j + 1); tratar(linha); }
    }
    if(buf.trim()){ tratar(buf.trim()); }
  } else {
    var linhas = (await r.text()).split(String.fromCharCode(10));
    for(var i = 0; i < linhas.length; i++){ tratar(linhas[i].trim()); }
  }
  return { completo: resp.trim(), resto: resp.slice(enviado).trim(), mostrou: enviado > 0 };
}
function nlLissLayout(){
  try{
    var enc = document.getElementById("nl-encerrar"), inp = document.querySelector("#nl-moldura .nl-input");
    if(enc && inp && inp.nextElementSibling !== enc){ enc.parentNode.insertBefore(inp, enc); }
    if(enc){ enc.style.margin = "2px 14px 10px"; }
  }catch(e){}
}
function nlLissSaudacao(){
  // simples e elegante, como numa empresa seria: so o cumprimento da hora e "posso ajudar?"
  var h = new Date().getHours();
  var p = (h >= 5 && h < 12) ? "bom dia" : (h >= 12 && h < 18) ? "boa tarde" : "boa noite";
  var P = p.charAt(0).toUpperCase() + p.slice(1);
  var lista = [
    "Netliss Brasil, " + p + "! 😊<br>Posso ajudar?",
    P + "! 😊 Posso ajudar?",
    "Netliss Brasil, " + p + "! Em que posso ajudar? 😊"
  ];
  return lista[Math.floor(Math.random() * lista.length)];
}
function nlInicio(origem){
  NL.pulouFicha = true;
  NL.encerrado = false;
  NL.qtdMsgs = 0;
  try{ nlSalvar("netliss_modo", "liss2", 2592000000); }catch(e){}
  nlGarantirTicket();
  nlLissLayout();
  NL.modoChamado = "problema";
  nlMsgLiss(nlLissSaudacao(), function(){
    nlLiberarDigitacao();
  });
}
// so retoma conversa que nasceu na Liss nova; tela salva pelo chat antigo (botoes e planos antigos) recomeca do zero
var nlContinuarAntigo = nlContinuar;
nlContinuar = function(origem){
  if(nlLer("netliss_modo") !== "liss2"){
    try{ localStorage.removeItem("netliss_estado"); localStorage.removeItem("netliss_hist"); }catch(e){}
    NL.recomecou = true;
    nlComecar(origem);
    return;
  }
  nlContinuarAntigo(origem);
};
var nlRetomarPagamentoAntigo = nlRetomarPagamento;
nlRetomarPagamento = function(){ if(NL.recomecou){ return; } nlRetomarPagamentoAntigo(); };
function nlLiberarDigitacao(){
  nlLissLayout();
  NL.modoChamado = "problema";
  document.querySelector("#nl-moldura .nl-input").classList.add("ativa");
  document.getElementById("nl-encerrar").style.display = "block";
  setTimeout(function(){ try{ document.getElementById("nl-texto").focus(); }catch(e){} }, 350);
}
function nlEnviarTexto(){
  if(NL.aguardando || NL.encerrado){ return; }
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
  nlLissResponder(txt.replace(/\[\s*aviso do sistema[^\]]*\]/gi, "(texto do cliente)").replace(/aviso\s+do\s+sistema/gi, "(texto do cliente)"));
}
// ---------- ANEXO (fotos e prints) ----------
function nlDemoAnexo(){ nlAnexo(); }
function nlAnexo(){
  if(NL.aguardando || NL.encerrado || NL.anexando){ return; }
  var inp = document.getElementById("nl-arquivo");
  if(!inp){
    inp = document.createElement("input");
    inp.type = "file"; inp.id = "nl-arquivo"; inp.accept = "image/*"; inp.multiple = true; inp.style.display = "none";
    inp.addEventListener("change", function(){ var fs = Array.prototype.slice.call(inp.files || [], 0, 3); inp.value = ""; if(fs.length){ nlAnexoEnviar(fs); } });
    document.body.appendChild(inp);
  }
  inp.click();
}
// reduz a imagem no proprio aparelho (sobe rapido ate no 4G fraco); devolve { blob, mini }
function nlAnexoReduzir(arq){
  return new Promise(function(ok){
    var url = URL.createObjectURL(arq), img = new Image();
    img.onload = function(){
      try{
        var lado = function(max){ var w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, max / Math.max(w, h)); var c = document.createElement("canvas"); c.width = Math.round(w * k); c.height = Math.round(h * k); var x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height); return c; };
        var grande = lado(1600), mini = lado(260).toDataURL("image/jpeg", 0.6);
        grande.toBlob(function(b){ URL.revokeObjectURL(url); ok({ blob: b || arq, mini: mini }); }, "image/jpeg", 0.85);
      }catch(e){ URL.revokeObjectURL(url); ok({ blob: arq, mini: "" }); }
    };
    img.onerror = function(){ URL.revokeObjectURL(url); ok(null); };
    img.src = url;
  });
}
async function nlAnexoEnviar(arquivos){
  NL.anexando = true;
  var campo = document.getElementById("nl-texto");
  var legenda = (campo && campo.value.trim()) || "";
  if(campo){ campo.value = ""; }
  nlLimparChips();
  var ids = [], minis = [];
  try{
    var tok = await nlDifyToken();
    for(var i = 0; i < arquivos.length; i++){
      var red = await nlAnexoReduzir(arquivos[i]);
      if(!red){ nlSistema("esse arquivo não é uma imagem que eu consiga abrir — envie uma foto ou um print da tela"); continue; }
      var fd = new FormData();
      fd.append("file", red.blob, "imagem-" + Date.now() + "-" + i + ".jpg");
      var r = await fetch(NL_DIFY.base + "/api/files/upload", { method: "POST", headers: { "X-App-Passport": tok, "X-App-Code": NL_DIFY.code }, body: fd });
      var j = null; try{ j = await r.json(); }catch(e){}
      if(r.status < 300 && j && j.id){ ids.push(j.id); minis.push(red.mini); }
      else { nlReportarFalha("anexo", new Error("upload " + r.status)); }
    }
  }catch(e){ nlReportarFalha("anexo", e); }
  NL.anexando = false;
  if(!ids.length){ nlSistema("não consegui enviar a imagem agora — tenta de novo em instantes"); if(campo && legenda){ campo.value = legenda; } return; }
  var db = document.createElement("div");
  db.className = "msg user nl-msg-img";
  var html = "";
  for(var k = 0; k < minis.length; k++){ if(minis[k]){ html += "<img class='nl-anexo' src='" + minis[k] + "' alt='imagem enviada'>"; } }
  if(legenda){ html += "<div>" + nlEscapar(legenda) + "</div>"; }
  db.innerHTML = html || "📎 imagem enviada";
  NL.corpo.appendChild(db);
  nlRolar();
  setTimeout(nlRolar, 300);
  nlHistPush("cliente", html || "📎 imagem enviada");
  nlApiFogo({ acao:"msg", ticket_id: NL.ticket, autor:"cliente", mensagem: "[imagem] " + legenda });
  NL.difyArquivos = ids;
  var pergunta = legenda ? legenda.replace(/\[\s*aviso do sistema[^\]]*\]/gi, "(texto do cliente)") : (ids.length > 1 ? "(o cliente enviou estas imagens)" : "(o cliente enviou esta imagem)");
  nlLissResponder(pergunta);
}
(function(){ try{ var st = document.createElement("style"); st.textContent = "#nl-chat .msg.user img.nl-anexo{display:block;max-width:180px;max-height:220px;border-radius:10px;margin:2px 0 4px}#nl-chat .msg.user.nl-msg-img{padding:6px}"; document.head.appendChild(st); }catch(e){} })();

function nlLissFicha(resp){
  var a = resp.indexOf("[FICHA");
  if(a < 0){ return resp; }
  var b = resp.indexOf("]", a);
  if(b < 0){ return resp.substring(0, a); }
  var miolo = resp.substring(a + 6, b).trim();
  var partes = miolo.split(";"), dados = {};
  var mapa = { nome:"nome", operadora:"op", modalidade:"mod", usuario:"usuario", testou:"testou", nota:"nota", comprou:"comprou", plano:"plano" };
  for(var i = 0; i < partes.length; i++){
    var kv = partes[i].split("=");
    if(kv.length < 2){ continue; }
    var k = kv[0].trim().toLowerCase(), v = kv.slice(1).join("=").trim();
    if(mapa[k] && v){ dados[mapa[k]] = v.substring(0, 160); }
  }
  if(dados.nome){ NL.nome = dados.nome.split(" ")[0]; }
  if(dados.usuario){ NL.usuarioApp = dados.usuario; }
  if(dados.nota){ var f = nlFichaLer(); var antigas = f.nota ? String(f.nota) : ""; if(antigas.indexOf(dados.nota) < 0){ dados.nota = (antigas ? antigas + " | " : "") + dados.nota; } dados.nota = dados.nota.slice(-400); }
  nlFichaGravar(dados);
  return (resp.substring(0, a) + resp.substring(b + 1)).trim();
}
function nlLissFim(){
  NL.fimAgendado = 0; NL.pedindoEncerrar = false; NL.modoChamado = null;
  try{ nlEnviarRegistro(); }catch(e){}
  nlLimparChips();
  nlBloquearDigitacao();
  if(NL.ticket){ nlApiFogo({ acao: "ticket_fechar", ticket_id: NL.ticket }); }
  NL.ticket = null; NL.difyConv = null;
  try{ localStorage.removeItem("netliss_ticket"); }catch(e){}
  NL.encerrado = true;
  try{ nlEstadoSalvar(); }catch(e){}
  nlChips([{ rotulo:"Novo atendimento", sec:true, acao:nlReiniciar }]);
  var _e = document.getElementById("nl-encerrar"); if(_e){ _e.style.display = "none"; }
}
async function nlLissResponder(txt){
  nlTravar(true);
  nlEsperaLigar();
  var fila = Promise.resolve(), mostrou = false;
  var aoBloco = function(bloco){
    mostrou = true;
    fila = fila.then(function(){ return new Promise(function(ok){ nlEsperaDesligar(); nlMsgLiss(nlMdHtml(bloco), function(){ if(NL.lissPensando){ nlEsperaLigar(); } ok(); }); }); });
  };
  var res = null;
  NL.lissPensando = true;
  try{ res = await nlDifyPergunta(txt, aoBloco); }catch(e){ res = null; }
  if(!res && !mostrou){ try{ await new Promise(function(ok){ setTimeout(ok, 1500); }); res = await nlDifyPergunta(txt, aoBloco); }catch(e2){ res = null; } }
  NL.lissPensando = false;
  await fila;
  nlEsperaDesligar();
  if(!res || (!res.completo && !mostrou)){ nlTravar(false); if(!mostrou){ nlMsgLiss(NL_INSTAB); } nlLiberarDigitacao(); return; }
  var completo = res.completo, resp = nlLissFicha(res.resto);
  var fim = completo.indexOf("[ENCERRAR]") > -1;
  resp = resp.split("[ENCERRAR]").join("").trim();
  var acoes = [];
  var marcas = ["AFILIADO", "VIDEO_TESTE", "VIDEOS_ROTEAMENTO"];
  for(var m = 0; m < marcas.length; m++){
    var tag = "[ACAO:" + marcas[m] + "]";
    if(resp.indexOf(tag) > -1){ acoes.push(marcas[m]); resp = resp.split(tag).join("").trim(); }
  }
  resp = nlLissPagamento(resp);
  nlLissCredenciais(completo);
  var blocos = resp.split(String.fromCharCode(10) + String.fromCharCode(10));
  var i = 0;
  var proximo = function(){
    if(i >= blocos.length){ nlTravar(false); nlLissAcoes(acoes, fim); return; }
    var b = blocos[i++].trim();
    if(!b){ proximo(); return; }
    nlMsgLiss(nlMdHtml(b), proximo);
  };
  proximo();
}
// baloes da Liss: pausa curta entre um e outro (antes era 0,8 s de "digitando" falso em cada balao)
function nlDigitar(depois, ms){
  if(NL.silencioso){ depois(); return; }
  setTimeout(depois, ms || 250);
}
function nlVoltarAoMenu(){ nlLiberarDigitacao(); }
(function(){ try{ var st = document.createElement("style"); st.textContent = "#nl-chat .msg.liss a.nl-link{color:#c6ff3d;font-weight:600;text-decoration:underline;word-break:break-word}#nl-chat .msg.liss a.nl-play{display:inline-block;text-decoration:none;margin:4px 0 2px}#nl-chat .msg.liss a.nl-play img{display:block;height:62px;width:auto;margin-left:-8px}#nl-chat .msg.liss .nl-play-dom{display:block;font-size:11.5px;color:#a9b0b8;margin-top:1px}#nl-chat .msg.liss .nl-play-alt{display:inline-block;background:#c6ff3d;color:#050505;font-weight:700;border-radius:10px;padding:10px 14px}"; document.head.appendChild(st); }catch(e){} })();
function nlOcioso(){
  var v = nlLer("netliss_visto");
  if(!v){ return false; }
  return (Date.now() - v) > 86400000;
}
function nlLissValorApos(txt, rotulo){
  var a = txt.indexOf(rotulo);
  if(a < 0){ return ""; }
  var resto = txt.substring(a + rotulo.length).split("*").join("").trim();
  var fim = resto.length;
  var paradas = [String.fromCharCode(10), " ", "<"];
  for(var i = 0; i < paradas.length; i++){ var p = resto.indexOf(paradas[i]); if(p > -1 && p < fim){ fim = p; } }
  return resto.substring(0, fim).trim();
}
function nlLissCredenciais(txt){
  var u = nlLissValorApos(txt, "Usuário:"), sh = nlLissValorApos(txt, "Senha:");
  if(u && sh && u.length >= 4 && sh.length >= 4){ NL.copiaUser = u; NL.copiaSenha = sh; NL.lissCopiar = true; nlFichaGravar({ testou: 1, testeEm: Date.now() }); }
}
function nlLissCopiarU(){ nlCopiarCred(0); }
function nlLissCopiarS(){ nlCopiarCred(1); }
function nlLissVideoTeste(){
  nlCard("<div style='position:relative;padding-bottom:56%;height:0;border-radius:12px;overflow:hidden;margin-bottom:11px;border:1px solid rgba(255,255,255,.09)'><iframe src='" + CFG.videoTeste + "' style='position:absolute;top:0;left:0;width:100%;height:100%;border:0' title='Como fazer o teste' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe></div>" +
    "<button class='botao' style='width:100%;background:rgba(255,255,255,.1);color:#f4f6ff;box-shadow:none' data-vivo='1' onclick='nlVideoGrande()'>Ver em tela maior</button>");
}
function nlLissVideosRot(){
  var _tit = ["Configurar o celular que vai rotear", "Conectar de outro celular", "Conectar de um notebook"];
  for(var _v = 0; _v < _tit.length; _v++){
    nlCard("<div class='titulo'>" + _tit[_v] + "</div>" +
      "<div style='position:relative;padding-bottom:56%;height:0;border-radius:12px;overflow:hidden;margin:8px 0 11px;border:1px solid rgba(255,255,255,.09)'><iframe src='" + CFG.videosRot[_v] + "' loading='lazy' style='position:absolute;top:0;left:0;width:100%;height:100%;border:0' title='" + _tit[_v] + "' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe></div>" +
      "<button class='botao' style='width:100%;background:rgba(255,255,255,.1);color:#f4f6ff;box-shadow:none' data-vivo='1' onclick='nlVideoGrande(" + (_v + 1) + ")'>Ver em tela maior</button>");
  }
}
function nlLissTag(resp, nome){
  var a = resp.indexOf("[" + nome + "]"), b = resp.indexOf("[/" + nome + "]");
  if(a < 0 || b < a){ return { resp: resp, valor: "" }; }
  var valor = resp.substring(a + nome.length + 2, b).trim();
  valor = valor.replace(/^\[?(https?:[^\]\s)]+)\]?(\(.*\))?$/, "$1");
  return { resp: (resp.substring(0, a) + resp.substring(b + nome.length + 3)).trim(), valor: valor };
}
function nlLissPagamento(resp){
  var p = nlLissTag(resp, "PIX"); resp = p.resp;
  var q = nlLissTag(resp, "LINKPIX"); resp = q.resp;
  var c = nlLissTag(resp, "LINKCARTAO"); resp = c.resp;
  var r = nlLissTag(resp, "PEDIDO"); resp = r.resp;
  if(p.valor || q.valor || c.valor){ NL.pag = { pix: p.valor, qr: q.valor, cartao: c.valor }; }
  if(/^NL[a-z0-9]+$/i.test(r.valor)){ nlPagVigiar(r.valor, true); }
  return resp;
}
function nlLissCopiarPix(btn){
  var v = NL.lissPix; if(!v){ return; }
  var ok = function(){ if(btn){ btn.textContent = "Código Pix copiado!"; setTimeout(function(){ btn.textContent = "Copiar código Pix"; }, 2000); } };
  if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(String(v)).then(ok, function(){ nlCopiarFallback(v); ok(); }); } else { nlCopiarFallback(v); ok(); }
}
function nlLissCardPagamento(){
  var g = NL.pag; if(!g){ return; }
  NL.pag = null;
  var link = function(url, txt){ return "<a class='nl-link' href='" + String(url).replace(/'/g, "%27") + "' target='_blank' rel='noopener'>" + txt + "</a>"; };
  if(g.pix){
    NL.lissPix = g.pix;
    var img = "";
    try{ var q = nlQrcode(0, "M"); q.addData(g.pix); q.make(); img = q.createDataURL(5, 10); }catch(e){ img = ""; }
    var h = "<div style='text-align:center'>";
    if(img){ h += "<div style='background:#fff;border-radius:14px;padding:10px;display:inline-block;margin-bottom:12px'><img src='" + img + "' alt='QR Code do Pix' style='display:block;width:210px;height:210px;image-rendering:pixelated'></div>"; }
    h += "<div style='font-size:12px;color:#aab2c8;margin-bottom:6px'>Pix copia e cola</div>";
    h += "<div style='font-family:monospace;font-size:11.5px;line-height:1.45;color:#e8ecf7;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:9px 10px;word-break:break-all;text-align:left;margin-bottom:10px;user-select:all;-webkit-user-select:all'>" + nlEscapar(g.pix) + "</div>";
    h += "<button class='botao' style='width:100%' data-vivo='1' onclick='nlLissCopiarPix(this)'>Copiar código Pix</button></div>";
    nlCard(h);
  }
  if(g.cartao && /^https:\/\//.test(g.cartao)){ nlMsgLiss(link(g.cartao, "💳 Pagar com cartão de crédito")); }
}
// ===== O chat vigia o pagamento sozinho e a Liss entrega o acesso na conversa =====
var NL_COBRANCA = "https://hook.us2.make.com/dm9cplrlpx5r5fd7aazeztamiuscfbeg";
function nlPagVigiar(ref, novo){
  if(novo){ try{ nlSalvar("netliss_pedido", { ref: ref, t: Date.now() }, 1800000); }catch(e){} }
  NL.pedidoRef = ref; NL.pedidoInicio = NL.pedidoInicio && !novo ? NL.pedidoInicio : Date.now(); NL.pedidoN = 0;
  clearTimeout(NL.pedidoTimer);
  NL.pedidoTimer = setTimeout(nlPagChecar, 20000);
}
function nlPagParar(){ clearTimeout(NL.pedidoTimer); NL.pedidoRef = null; try{ localStorage.removeItem("netliss_pedido"); }catch(e){} }
async function nlPagChecar(){
  // consulta leve (so le o pedido no Make, sem chamar o Mercado Pago): roda a cada 20 s e SO com o chat visivel na tela.
  // Com o cliente no app do banco (pagina escondida) nao consulta nada; quando ele volta, confere na hora.
  var ref = NL.pedidoRef; if(!ref){ return; }
  if(Date.now() - NL.pedidoInicio > 1800000){ nlPagParar(); return; }
  if(document.visibilityState === "hidden" || NL.aguardando){ NL.pedidoTimer = setTimeout(nlPagChecar, 20000); return; }
  NL.pedidoN++;
  var acao = (NL.pedidoN === 10) ? "status" : "ver";
  var j = null;
  try{ var r = await fetch(NL_COBRANCA + "?acao=" + acao + "&ref=" + encodeURIComponent(ref)); j = await r.json(); }catch(e){ j = null; }
  if(ref !== NL.pedidoRef){ return; }
  var st = j && j.status;
  if(st === "entregue" && j.usuario){
    nlPagParar();
    nlPagAvisarLiss("O pagamento do pedido " + ref + " foi CONFIRMADO e o acesso já foi criado. Usuário: " + j.usuario + " / Senha: " + j.senha + ". Comemore com o cliente pelo nome, entregue o usuário e a senha exatamente nesse formato (Usuário: ... e Senha: ...), diga que também foi para o e-mail dele e passe o COMO USAR em poucas linhas.");
    return;
  }
  if(st === "erro_entrega" || st === "aprovado_em_atencao"){
    nlPagParar();
    nlPagAvisarLiss("O pagamento do pedido " + ref + " foi APROVADO, mas o acesso está sendo finalizado pela equipe com prioridade. Tranquilize o cliente: o acesso chega no e-mail dele. Não abra chamado.");
    return;
  }
  NL.pedidoTimer = setTimeout(nlPagChecar, 20000);
}
function nlPagAvisarLiss(txt){
  if(!NL.aberto){ try{ nlAbrirChat("pagamento"); }catch(e){} }
  var tenta = function(){ if(NL.aguardando){ setTimeout(tenta, 1500); return; } nlLissResponder("[AVISO DO SISTEMA - não foi o cliente que escreveu] " + txt); };
  tenta();
}
document.addEventListener("visibilitychange", function(){
  if(document.visibilityState === "visible" && NL.pedidoRef){ clearTimeout(NL.pedidoTimer); NL.pedidoTimer = setTimeout(nlPagChecar, 800); }
});
(function(){ try{ var pd = nlLer("netliss_pedido"); if(pd && pd.ref){ NL.pedidoInicio = pd.t || Date.now(); nlPagVigiar(pd.ref, false); } }catch(e){} })();
function nlLissAcoes(acoes, fim){
  nlLissCardPagamento();
  if(NL.lissCopiar){
    NL.lissCopiar = false;
    nlCard("<button class='botao' style='width:100%;margin-bottom:8px' data-vivo='1' onclick='nlCopiarCred(0, this)'>Copiar usuário</button><button class='botao' style='width:100%' data-vivo='1' onclick='nlCopiarCred(1, this)'>Copiar senha</button>");
  }
  for(var i = 0; i < acoes.length; i++){
    if(acoes[i] === "VIDEO_TESTE"){ nlLissVideoTeste(); }
    if(acoes[i] === "VIDEOS_ROTEAMENTO"){ nlLissVideosRot(); }
  }
  if(acoes.indexOf("AFILIADO") > -1){ nlLiberarDigitacao(); nlAfInicio(); return; }
  if(fim){ nlLissFim(); } else { nlLiberarDigitacao(); }
}

// ===== Liss: "Liss está digitando..." no lugar dos três pontinhos =====
(function(){ try{ var st = document.createElement("style"); st.textContent = "#nl-chat .nl-dig{display:inline-flex;align-items:center;gap:6px;margin:4px 0 8px;padding:9px 14px;border-radius:16px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.09);color:#cfd5e6;font-size:13.5px;font-style:italic}#nl-chat .nl-dig i{display:inline-block;width:5px;height:5px;border-radius:50%;background:#c6ff3d;opacity:.3;animation:nlDig 1.2s infinite}#nl-chat .nl-dig i:nth-child(2){animation-delay:.2s}#nl-chat .nl-dig i:nth-child(3){animation-delay:.4s}@keyframes nlDig{0%,100%{opacity:.25}50%{opacity:1}}"; document.head.appendChild(st); }catch(e){} })();
function nlEsperaLigar(){
  if(NL.silencioso || !NL.corpo){ return; }
  nlEsperaDesligar();
  var t = document.createElement("div");
  t.className = "nl-dig";
  t.id = "nl-espera";
  t.innerHTML = "<span class='nl-dig-txt'>Liss está digitando</span><i></i><i></i><i></i>";
  NL.corpo.appendChild(t);
  nlRolar();
  NL.esperaTimer = setTimeout(function(){
    var s = document.querySelector("#nl-espera .nl-dig-txt");
    if(s){ s.textContent = "Liss está digitando, só um instante"; }
  }, 9000);
}
function nlEsperaDesligar(){
  try{ clearTimeout(NL.esperaTimer); }catch(e){}
  try{ var t = document.getElementById("nl-espera"); if(t){ t.remove(); } }catch(e){}
}


/* QR Code Generator for JavaScript - Copyright (c) 2009 Kazuhiko Arase - MIT license */
var nlQrcode=function(){
// Licensed under the MIT license:
var t=function(){var t=function(t,r){var e=t,n=g[r],o=null,i=0,a=null,u=[],f={},c=function(t,r){o=function(t){for(var r=new Array(t),e=0;e<t;e+=1){r[e]=new Array(t);for(var n=0;n<t;n+=1)r[e][n]=null}return r}(i=4*e+17),l(0,0),l(i-7,0),l(0,i-7),s(),h(),d(t,r),e>=7&&v(t),null==a&&(a=p(e,n,u)),w(a,r)},l=function(t,r){for(var e=-1;e<=7;e+=1)if(!(t+e<=-1||i<=t+e))for(var n=-1;n<=7;n+=1)r+n<=-1||i<=r+n||(o[t+e][r+n]=0<=e&&e<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=n&&n<=4)},h=function(){for(var t=8;t<i-8;t+=1)null==o[t][6]&&(o[t][6]=t%2==0);for(var r=8;r<i-8;r+=1)null==o[6][r]&&(o[6][r]=r%2==0)},s=function(){for(var t=B.getPatternPosition(e),r=0;r<t.length;r+=1)for(var n=0;n<t.length;n+=1){var i=t[r],a=t[n];if(null==o[i][a])for(var u=-2;u<=2;u+=1)for(var f=-2;f<=2;f+=1)o[i+u][a+f]=-2==u||2==u||-2==f||2==f||0==u&&0==f}},v=function(t){for(var r=B.getBCHTypeNumber(e),n=0;n<18;n+=1){var a=!t&&1==(r>>n&1);o[Math.floor(n/3)][n%3+i-8-3]=a}for(n=0;n<18;n+=1){a=!t&&1==(r>>n&1);o[n%3+i-8-3][Math.floor(n/3)]=a}},d=function(t,r){for(var e=n<<3|r,a=B.getBCHTypeInfo(e),u=0;u<15;u+=1){var f=!t&&1==(a>>u&1);u<6?o[u][8]=f:u<8?o[u+1][8]=f:o[i-15+u][8]=f}for(u=0;u<15;u+=1){f=!t&&1==(a>>u&1);u<8?o[8][i-u-1]=f:u<9?o[8][15-u-1+1]=f:o[8][15-u-1]=f}o[i-8][8]=!t},w=function(t,r){for(var e=-1,n=i-1,a=7,u=0,f=B.getMaskFunction(r),c=i-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var g=0;g<2;g+=1)if(null==o[n][c-g]){var l=!1;u<t.length&&(l=1==(t[u]>>>a&1)),f(n,c-g)&&(l=!l),o[n][c-g]=l,-1==(a-=1)&&(u+=1,a=7)}if((n+=e)<0||i<=n){n-=e,e=-e;break}}},p=function(t,r,e){for(var n=A.getRSBlocks(t,r),o=b(),i=0;i<e.length;i+=1){var a=e[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var u=0;for(i=0;i<n.length;i+=1)u+=n[i].dataCount;if(o.getLengthInBits()>8*u)throw"code length overflow. ("+o.getLengthInBits()+">"+8*u+")";for(o.getLengthInBits()+4<=8*u&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*u||(o.put(236,8),o.getLengthInBits()>=8*u));)o.put(17,8);return function(t,r){for(var e=0,n=0,o=0,i=new Array(r.length),a=new Array(r.length),u=0;u<r.length;u+=1){var f=r[u].dataCount,c=r[u].totalCount-f;n=Math.max(n,f),o=Math.max(o,c),i[u]=new Array(f);for(var g=0;g<i[u].length;g+=1)i[u][g]=255&t.getBuffer()[g+e];e+=f;var l=B.getErrorCorrectPolynomial(c),h=k(i[u],l.getLength()-1).mod(l);for(a[u]=new Array(l.getLength()-1),g=0;g<a[u].length;g+=1){var s=g+h.getLength()-a[u].length;a[u][g]=s>=0?h.getAt(s):0}}var v=0;for(g=0;g<r.length;g+=1)v+=r[g].totalCount;var d=new Array(v),w=0;for(g=0;g<n;g+=1)for(u=0;u<r.length;u+=1)g<i[u].length&&(d[w]=i[u][g],w+=1);for(g=0;g<o;g+=1)for(u=0;u<r.length;u+=1)g<a[u].length&&(d[w]=a[u][g],w+=1);return d}(o,n)};f.addData=function(t,r){var e=null;switch(r=r||"Byte"){case"Numeric":e=M(t);break;case"Alphanumeric":e=x(t);break;case"Byte":e=m(t);break;case"Kanji":e=L(t);break;default:throw"mode:"+r}u.push(e),a=null},f.isDark=function(t,r){if(t<0||i<=t||r<0||i<=r)throw t+","+r;return o[t][r]},f.getModuleCount=function(){return i},f.make=function(){if(e<1){for(var t=1;t<40;t++){for(var r=A.getRSBlocks(t,n),o=b(),i=0;i<u.length;i++){var a=u[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var g=0;for(i=0;i<r.length;i++)g+=r[i].dataCount;if(o.getLengthInBits()<=8*g)break}e=t}c(!1,function(){for(var t=0,r=0,e=0;e<8;e+=1){c(!0,e);var n=B.getLostPoint(f);(0==e||t>n)&&(t=n,r=e)}return r}())},f.createTableTag=function(t,r){t=t||2;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+(r=void 0===r?4*t:r)+"px;",e+='">',e+="<tbody>";for(var n=0;n<f.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<f.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+t+"px;",e+=" height: "+t+"px;",e+=" background-color: ",e+=f.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},f.createSvgTag=function(t,r,e,n){var o={};"object"==typeof arguments[0]&&(t=(o=arguments[0]).cellSize,r=o.margin,e=o.alt,n=o.title),t=t||2,r=void 0===r?4*t:r,(e="string"==typeof e?{text:e}:e||{}).text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,(n="string"==typeof n?{text:n}:n||{}).text=n.text||null,n.id=n.text?n.id||"qrcode-title":null;var i,a,u,c,g=f.getModuleCount()*t+2*r,l="";for(c="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",l+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',l+=o.scalable?"":' width="'+g+'px" height="'+g+'px"',l+=' viewBox="0 0 '+g+" "+g+'" ',l+=' preserveAspectRatio="xMinYMin meet"',l+=n.text||e.text?' role="img" aria-labelledby="'+y([n.id,e.id].join(" ").trim())+'"':"",l+=">",l+=n.text?'<title id="'+y(n.id)+'">'+y(n.text)+"</title>":"",l+=e.text?'<description id="'+y(e.id)+'">'+y(e.text)+"</description>":"",l+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',l+='<path d="',a=0;a<f.getModuleCount();a+=1)for(u=a*t+r,i=0;i<f.getModuleCount();i+=1)f.isDark(a,i)&&(l+="M"+(i*t+r)+","+u+c);return l+='" stroke="transparent" fill="black"/>',l+="</svg>"},f.createDataURL=function(t,r){t=t||2,r=void 0===r?4*t:r;var e=f.getModuleCount()*t+2*r,n=r,o=e-r;return I(e,e,(function(r,e){if(n<=r&&r<o&&n<=e&&e<o){var i=Math.floor((r-n)/t),a=Math.floor((e-n)/t);return f.isDark(a,i)?0:1}return 1}))},f.createImgTag=function(t,r,e){t=t||2,r=void 0===r?4*t:r;var n=f.getModuleCount()*t+2*r,o="";return o+="<img",o+=' src="',o+=f.createDataURL(t,r),o+='"',o+=' width="',o+=n,o+='"',o+=' height="',o+=n,o+='"',e&&(o+=' alt="',o+=y(e),o+='"'),o+="/>"};var y=function(t){for(var r="",e=0;e<t.length;e+=1){var n=t.charAt(e);switch(n){case"<":r+="&lt;";break;case">":r+="&gt;";break;case"&":r+="&amp;";break;case'"':r+="&quot;";break;default:r+=n}}return r};return f.createASCII=function(t,r){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var r,e,n,o,i,a=1*f.getModuleCount()+2*t,u=t,c=a-t,g={"██":"█","█ ":"▀"," █":"▄","  ":" "},l={"██":"▀","█ ":"▀"," █":" ","  ":" "},h="";for(r=0;r<a;r+=2){for(n=Math.floor((r-u)/1),o=Math.floor((r+1-u)/1),e=0;e<a;e+=1)i="█",u<=e&&e<c&&u<=r&&r<c&&f.isDark(n,Math.floor((e-u)/1))&&(i=" "),u<=e&&e<c&&u<=r+1&&r+1<c&&f.isDark(o,Math.floor((e-u)/1))?i+=" ":i+="█",h+=t<1&&r+1>=c?l[i]:g[i];h+="\n"}return a%2&&t>0?h.substring(0,h.length-a-1)+Array(a+1).join("▀"):h.substring(0,h.length-1)}(r);t-=1,r=void 0===r?2*t:r;var e,n,o,i,a=f.getModuleCount()*t+2*r,u=r,c=a-r,g=Array(t+1).join("██"),l=Array(t+1).join("  "),h="",s="";for(e=0;e<a;e+=1){for(o=Math.floor((e-u)/t),s="",n=0;n<a;n+=1)i=1,u<=n&&n<c&&u<=e&&e<c&&f.isDark(o,Math.floor((n-u)/t))&&(i=0),s+=i?g:l;for(o=0;o<t;o+=1)h+=s+"\n"}return h.substring(0,h.length-1)},f.renderTo2dContext=function(t,r){r=r||2;for(var e=f.getModuleCount(),n=0;n<e;n++)for(var o=0;o<e;o++)t.fillStyle=f.isDark(n,o)?"black":"white",t.fillRect(n*r,o*r,r,r)},f};t.stringToBytes=(t.stringToBytesFuncs={default:function(t){for(var r=[],e=0;e<t.length;e+=1){var n=t.charCodeAt(e);r.push(255&n)}return r}}).default,t.createStringToBytes=function(t,r){var e=function(){for(var e=S(t),n=function(){var t=e.read();if(-1==t)throw"eof";return t},o=0,i={};;){var a=e.read();if(-1==a)break;var u=n(),f=n()<<8|n();i[String.fromCharCode(a<<8|u)]=f,o+=1}if(o!=r)throw o+" != "+r;return i}(),n="?".charCodeAt(0);return function(t){for(var r=[],o=0;o<t.length;o+=1){var i=t.charCodeAt(o);if(i<128)r.push(i);else{var a=e[t.charAt(o)];"number"==typeof a?(255&a)==a?r.push(a):(r.push(a>>>8),r.push(255&a)):r.push(n)}}return r}};var r,e,n,o,i,a=1,u=2,f=4,c=8,g={L:1,M:0,Q:3,H:2},l=0,h=1,s=2,v=3,d=4,w=5,p=6,y=7,B=(r=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],e=1335,n=7973,i=function(t){for(var r=0;0!=t;)r+=1,t>>>=1;return r},(o={}).getBCHTypeInfo=function(t){for(var r=t<<10;i(r)-i(e)>=0;)r^=e<<i(r)-i(e);return 21522^(t<<10|r)},o.getBCHTypeNumber=function(t){for(var r=t<<12;i(r)-i(n)>=0;)r^=n<<i(r)-i(n);return t<<12|r},o.getPatternPosition=function(t){return r[t-1]},o.getMaskFunction=function(t){switch(t){case l:return function(t,r){return(t+r)%2==0};case h:return function(t,r){return t%2==0};case s:return function(t,r){return r%3==0};case v:return function(t,r){return(t+r)%3==0};case d:return function(t,r){return(Math.floor(t/2)+Math.floor(r/3))%2==0};case w:return function(t,r){return t*r%2+t*r%3==0};case p:return function(t,r){return(t*r%2+t*r%3)%2==0};case y:return function(t,r){return(t*r%3+(t+r)%2)%2==0};default:throw"bad maskPattern:"+t}},o.getErrorCorrectPolynomial=function(t){for(var r=k([1],0),e=0;e<t;e+=1)r=r.multiply(k([1,C.gexp(e)],0));return r},o.getLengthInBits=function(t,r){if(1<=r&&r<10)switch(t){case a:return 10;case u:return 9;case f:case c:return 8;default:throw"mode:"+t}else if(r<27)switch(t){case a:return 12;case u:return 11;case f:return 16;case c:return 10;default:throw"mode:"+t}else{if(!(r<41))throw"type:"+r;switch(t){case a:return 14;case u:return 13;case f:return 16;case c:return 12;default:throw"mode:"+t}}},o.getLostPoint=function(t){for(var r=t.getModuleCount(),e=0,n=0;n<r;n+=1)for(var o=0;o<r;o+=1){for(var i=0,a=t.isDark(n,o),u=-1;u<=1;u+=1)if(!(n+u<0||r<=n+u))for(var f=-1;f<=1;f+=1)o+f<0||r<=o+f||0==u&&0==f||a==t.isDark(n+u,o+f)&&(i+=1);i>5&&(e+=3+i-5)}for(n=0;n<r-1;n+=1)for(o=0;o<r-1;o+=1){var c=0;t.isDark(n,o)&&(c+=1),t.isDark(n+1,o)&&(c+=1),t.isDark(n,o+1)&&(c+=1),t.isDark(n+1,o+1)&&(c+=1),0!=c&&4!=c||(e+=3)}for(n=0;n<r;n+=1)for(o=0;o<r-6;o+=1)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(e+=40);for(o=0;o<r;o+=1)for(n=0;n<r-6;n+=1)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(e+=40);var g=0;for(o=0;o<r;o+=1)for(n=0;n<r;n+=1)t.isDark(n,o)&&(g+=1);return e+=Math.abs(100*g/r/r-50)/5*10},o),C=function(){for(var t=new Array(256),r=new Array(256),e=0;e<8;e+=1)t[e]=1<<e;for(e=8;e<256;e+=1)t[e]=t[e-4]^t[e-5]^t[e-6]^t[e-8];for(e=0;e<255;e+=1)r[t[e]]=e;var n={glog:function(t){if(t<1)throw"glog("+t+")";return r[t]},gexp:function(r){for(;r<0;)r+=255;for(;r>=256;)r-=255;return t[r]}};return n}();function k(t,r){if(void 0===t.length)throw t.length+"/"+r;var e=function(){for(var e=0;e<t.length&&0==t[e];)e+=1;for(var n=new Array(t.length-e+r),o=0;o<t.length-e;o+=1)n[o]=t[o+e];return n}(),n={getAt:function(t){return e[t]},getLength:function(){return e.length},multiply:function(t){for(var r=new Array(n.getLength()+t.getLength()-1),e=0;e<n.getLength();e+=1)for(var o=0;o<t.getLength();o+=1)r[e+o]^=C.gexp(C.glog(n.getAt(e))+C.glog(t.getAt(o)));return k(r,0)},mod:function(t){if(n.getLength()-t.getLength()<0)return n;for(var r=C.glog(n.getAt(0))-C.glog(t.getAt(0)),e=new Array(n.getLength()),o=0;o<n.getLength();o+=1)e[o]=n.getAt(o);for(o=0;o<t.getLength();o+=1)e[o]^=C.gexp(C.glog(t.getAt(o))+r);return k(e,0).mod(t)}};return n}var A=function(){var t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],r=function(t,r){var e={};return e.totalCount=t,e.dataCount=r,e},e={};return e.getRSBlocks=function(e,n){var o=function(r,e){switch(e){case g.L:return t[4*(r-1)+0];case g.M:return t[4*(r-1)+1];case g.Q:return t[4*(r-1)+2];case g.H:return t[4*(r-1)+3];default:return}}(e,n);if(void 0===o)throw"bad rs block @ typeNumber:"+e+"/errorCorrectionLevel:"+n;for(var i=o.length/3,a=[],u=0;u<i;u+=1)for(var f=o[3*u+0],c=o[3*u+1],l=o[3*u+2],h=0;h<f;h+=1)a.push(r(c,l));return a},e}(),b=function(){var t=[],r=0,e={getBuffer:function(){return t},getAt:function(r){var e=Math.floor(r/8);return 1==(t[e]>>>7-r%8&1)},put:function(t,r){for(var n=0;n<r;n+=1)e.putBit(1==(t>>>r-n-1&1))},getLengthInBits:function(){return r},putBit:function(e){var n=Math.floor(r/8);t.length<=n&&t.push(0),e&&(t[n]|=128>>>r%8),r+=1}};return e},M=function(t){var r=a,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+2<r.length;)t.put(o(r.substring(n,n+3)),10),n+=3;n<r.length&&(r.length-n==1?t.put(o(r.substring(n,n+1)),4):r.length-n==2&&t.put(o(r.substring(n,n+2)),7))}},o=function(t){for(var r=0,e=0;e<t.length;e+=1)r=10*r+i(t.charAt(e));return r},i=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return n},x=function(t){var r=u,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+1<r.length;)t.put(45*o(r.charAt(n))+o(r.charAt(n+1)),11),n+=2;n<r.length&&t.put(o(r.charAt(n)),6)}},o=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return n},m=function(r){var e=f,n=t.stringToBytes(r),o={getMode:function(){return e},getLength:function(t){return n.length},write:function(t){for(var r=0;r<n.length;r+=1)t.put(n[r],8)}};return o},L=function(r){var e=c,n=t.stringToBytesFuncs.SJIS;if(!n)throw"sjis not supported.";!function(t,r){var e=n("友");if(2!=e.length||38726!=(e[0]<<8|e[1]))throw"sjis not supported."}();var o=n(r),i={getMode:function(){return e},getLength:function(t){return~~(o.length/2)},write:function(t){for(var r=o,e=0;e+1<r.length;){var n=(255&r[e])<<8|255&r[e+1];if(33088<=n&&n<=40956)n-=33088;else{if(!(57408<=n&&n<=60351))throw"illegal char at "+(e+1)+"/"+n;n-=49472}n=192*(n>>>8&255)+(255&n),t.put(n,13),e+=2}if(e<r.length)throw"illegal char at "+(e+1)}};return i},D=function(){var t=[],r={writeByte:function(r){t.push(255&r)},writeShort:function(t){r.writeByte(t),r.writeByte(t>>>8)},writeBytes:function(t,e,n){e=e||0,n=n||t.length;for(var o=0;o<n;o+=1)r.writeByte(t[o+e])},writeString:function(t){for(var e=0;e<t.length;e+=1)r.writeByte(t.charCodeAt(e))},toByteArray:function(){return t},toString:function(){var r="";r+="[";for(var e=0;e<t.length;e+=1)e>0&&(r+=","),r+=t[e];return r+="]"}};return r},S=function(t){var r=t,e=0,n=0,o=0,i={read:function(){for(;o<8;){if(e>=r.length){if(0==o)return-1;throw"unexpected end of file./"+o}var t=r.charAt(e);if(e+=1,"="==t)return o=0,-1;t.match(/^\s$/)||(n=n<<6|a(t.charCodeAt(0)),o+=6)}var i=n>>>o-8&255;return o-=8,i}},a=function(t){if(65<=t&&t<=90)return t-65;if(97<=t&&t<=122)return t-97+26;if(48<=t&&t<=57)return t-48+52;if(43==t)return 62;if(47==t)return 63;throw"c:"+t};return i},I=function(t,r,e){for(var n=function(t,r){var e=t,n=r,o=new Array(t*r),i={setPixel:function(t,r,n){o[r*e+t]=n},write:function(t){t.writeString("GIF87a"),t.writeShort(e),t.writeShort(n),t.writeByte(128),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(255),t.writeByte(255),t.writeByte(255),t.writeString(","),t.writeShort(0),t.writeShort(0),t.writeShort(e),t.writeShort(n),t.writeByte(0);var r=a(2);t.writeByte(2);for(var o=0;r.length-o>255;)t.writeByte(255),t.writeBytes(r,o,255),o+=255;t.writeByte(r.length-o),t.writeBytes(r,o,r.length-o),t.writeByte(0),t.writeString(";")}},a=function(t){for(var r=1<<t,e=1+(1<<t),n=t+1,i=u(),a=0;a<r;a+=1)i.add(String.fromCharCode(a));i.add(String.fromCharCode(r)),i.add(String.fromCharCode(e));var f,c,g,l=D(),h=(f=l,c=0,g=0,{write:function(t,r){if(t>>>r!=0)throw"length over";for(;c+r>=8;)f.writeByte(255&(t<<c|g)),r-=8-c,t>>>=8-c,g=0,c=0;g|=t<<c,c+=r},flush:function(){c>0&&f.writeByte(g)}});h.write(r,n);var s=0,v=String.fromCharCode(o[s]);for(s+=1;s<o.length;){var d=String.fromCharCode(o[s]);s+=1,i.contains(v+d)?v+=d:(h.write(i.indexOf(v),n),i.size()<4095&&(i.size()==1<<n&&(n+=1),i.add(v+d)),v=d)}return h.write(i.indexOf(v),n),h.write(e,n),h.flush(),l.toByteArray()},u=function(){var t={},r=0,e={add:function(n){if(e.contains(n))throw"dup key:"+n;t[n]=r,r+=1},size:function(){return r},indexOf:function(r){return t[r]},contains:function(r){return void 0!==t[r]}};return e};return i}(t,r),o=0;o<r;o+=1)for(var i=0;i<t;i+=1)n.setPixel(i,o,e(i,o));var a=D();n.write(a);for(var u=function(){var t=0,r=0,e=0,n="",o={},i=function(t){n+=String.fromCharCode(a(63&t))},a=function(t){if(t<0);else{if(t<26)return 65+t;if(t<52)return t-26+97;if(t<62)return t-52+48;if(62==t)return 43;if(63==t)return 47}throw"n:"+t};return o.writeByte=function(n){for(t=t<<8|255&n,r+=8,e+=1;r>=6;)i(t>>>r-6),r-=6},o.flush=function(){if(r>0&&(i(t<<6-r),t=0,r=0),e%3!=0)for(var o=3-e%3,a=0;a<o;a+=1)n+="="},o.toString=function(){return n},o}(),f=a.toByteArray(),c=0;c<f.length;c+=1)u.writeByte(f[c]);return u.flush(),"data:image/gif;base64,"+u};return t}();return t.stringToBytesFuncs["UTF-8"]=function(t){return function(t){for(var r=[],e=0;e<t.length;e++){var n=t.charCodeAt(e);n<128?r.push(n):n<2048?r.push(192|n>>6,128|63&n):n<55296||n>=57344?r.push(224|n>>12,128|n>>6&63,128|63&n):(e++,n=65536+((1023&n)<<10|1023&t.charCodeAt(e)),r.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n))}return r}(t)},t}();
