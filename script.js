/* ── NAVBAR ── */
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',function(){
  navbar.classList.toggle('scrolled',window.scrollY>50);
});

/* ── HAMBURGER ── */
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
const mobileClose=document.getElementById('mobileClose');
hamburger.addEventListener('click',function(){mobileMenu.classList.add('open');});
mobileClose.addEventListener('click',function(){mobileMenu.classList.remove('open');});
document.querySelectorAll('.mobile-link').forEach(function(l){
  l.addEventListener('click',function(){mobileMenu.classList.remove('open');});
});

/* ── SCROLL REVEAL ── */
var observer=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');}
  });
},{threshold:.1});
document.querySelectorAll('.fade-in').forEach(function(el){observer.observe(el);});

/* ── COUNTER ANIMATION ── */
function animateNum(el,target,suffix){
  var start=0,dur=1800,startTime=null;
  function step(ts){
    if(!startTime)startTime=ts;
    var p=Math.min((ts-startTime)/dur,1);
    var ease=1-Math.pow(1-p,3);
    el.textContent=Math.floor(ease*target)+(suffix||'');
    if(p<1)requestAnimationFrame(step);
    else el.textContent=target+(suffix||'');
  }
  requestAnimationFrame(step);
}
var countersDone=false;
var counterObs=new IntersectionObserver(function(entries){
  if(entries[0].isIntersecting&&!countersDone){
    countersDone=true;
    document.querySelectorAll('[data-target]').forEach(function(el){
      animateNum(el,parseInt(el.dataset.target),'');
    });
  }
},{threshold:.3});
var statsEl=document.querySelector('.hero-stats');
if(statsEl)counterObs.observe(statsEl);

/* ── TESTE DE PERSONALIDADE ── */
var testeData=[
  {q:'Em um projeto novo, o que mais te motiva?',opts:['Analisar dados e entender a lógica','Imaginar possibilidades inéditas','Colaborar e ouvir as pessoas','Colocar a mão na massa logo'],vals:['A','C','B','D']},
  {q:'Quando enfrenta um problema difícil, você tende a:',opts:['Pensar muito antes de agir','Buscar apoio de outras pessoas','Improvisar e testar soluções','Pesquisar e estudar o assunto'],vals:['C','B','D','A']},
  {q:'O que mais te descreve em grupo?',opts:['O que organiza e planeja','O que conecta as pessoas','O que gera ideias novas','O que executa e entrega'],vals:['A','B','C','D']},
  {q:'Como você prefere aprender algo novo?',opts:['Lendo e refletindo sozinho','Em conversas e discussões','Experimentando na prática','Por meio de vídeos e exemplos visuais'],vals:['A','B','D','C']},
  {q:'O que mais valoriza nas relações?',opts:['Lealdade e confiança','Diversão e leveza','Crescimento mútuo','Honestidade direta'],vals:['B','C','A','D']}
];
var testeResults={
  A:{emoji:'🔬',title:'Perfil Analítico',desc:'Você é movido pela lógica, dados e estrutura. Pensa cuidadosamente antes de agir e valoriza a precisão. Na psicologia, esse perfil se relaciona ao pensamento convergente e ao processamento sistemático de informações.'},
  B:{emoji:'🤝',title:'Perfil Social',desc:'Você valoriza as conexões humanas e tem grande empatia. Aprende e cresce nas relações com os outros. Esse perfil reflete alta inteligência interpessoal e sensibilidade emocional.'},
  C:{emoji:'✨',title:'Perfil Criativo',desc:'Você é imaginativo, inovador e pensa fora da caixa. Gosta de explorar novas possibilidades. Esse perfil se associa ao pensamento divergente e à abertura à experiência.'},
  D:{emoji:'⚡',title:'Perfil Pragmático',desc:'Você é orientado à ação e resultados. Prefere fazer a planejar em excesso. Esse perfil reflete alta eficácia prática e foco na execução.'}
};
var testeAnswers=[];
var testeIndex=0;
function renderTeste(){
  var d=testeData[testeIndex];
  document.getElementById('testeStep').textContent='Pergunta '+(testeIndex+1)+' de 5';
  document.getElementById('progressFill').style.width=((testeIndex+1)/5*100)+'%';
  document.getElementById('testeQ').textContent=d.q;
  var optsEl=document.getElementById('testeOptions');
  optsEl.innerHTML='';
  d.opts.forEach(function(o,i){
    var btn=document.createElement('button');
    btn.className='teste-option';btn.textContent=o;
    btn.addEventListener('click',function(){
      document.querySelectorAll('.teste-option').forEach(function(b){b.classList.remove('selected');});
      btn.classList.add('selected');
      testeAnswers[testeIndex]=d.vals[i];
      document.getElementById('testeNext').disabled=false;
    });
    optsEl.appendChild(btn);
  });
  document.getElementById('testeNext').disabled=true;
}
function showTesteResult(){
  var counts={A:0,B:0,C:0,D:0};
  testeAnswers.forEach(function(v){counts[v]++;});
  var winner=Object.keys(counts).reduce(function(a,b){return counts[a]>=counts[b]?a:b;});
  var r=testeResults[winner];
  document.getElementById('testeBody').style.display='none';
  document.getElementById('testeFooter').style.display='none';
  var res=document.getElementById('testeResult');
  res.style.display='block';
  document.getElementById('resultEmoji').textContent=r.emoji;
  document.getElementById('resultTitle').textContent=r.title;
  document.getElementById('resultDesc').textContent=r.desc;
}
document.getElementById('testeNext').addEventListener('click',function(){
  if(testeIndex<testeData.length-1){
    testeIndex++;renderTeste();
  }else{showTesteResult();}
});
document.getElementById('testeReset').addEventListener('click',function(){
  testeIndex=0;testeAnswers=[];
  document.getElementById('testeBody').style.display='';
  document.getElementById('testeFooter').style.display='';
  document.getElementById('testeResult').style.display='none';
  renderTeste();
});
renderTeste();

/* ── QUIZ ── */
var quizData=[
  {q:'Quem é considerado o pai da Psicanálise?',opts:['Carl Jung','Sigmund Freud','B. F. Skinner','Jean Piaget'],ans:1,exp:'Sigmund Freud (1856–1939) fundou a Psicanálise, explorando o inconsciente e os mecanismos de defesa.'},
  {q:'Qual estrutura cerebral é fundamental para a formação de novas memórias?',opts:['Amígdala','Cerebelo','Hipocampo','Córtex pré-frontal'],ans:2,exp:'O hipocampo é essencial para a consolidação de memórias de curto para longo prazo.'},
  {q:'O que é neuroplasticidade?',opts:['Capacidade do cérebro de se adaptar e criar novas conexões','Rigidez estrutural do sistema nervoso','Processo de morte de neurônios','Tipo de transtorno neurológico'],ans:0,exp:'Neuroplasticidade é a capacidade do cérebro de reorganizar sua estrutura formando novas conexões.'},
  {q:'Qual psicólogo desenvolveu a hierarquia das necessidades?',opts:['Carl Rogers','B. F. Skinner','Abraham Maslow','William James'],ans:2,exp:'Abraham Maslow (1908–1970) propôs a pirâmide das necessidades, do fisiológico à autorrealização.'},
  {q:'O que é condicionamento operante?',opts:['Aprendizagem por estímulo e resposta clássica','Aprendizagem por reforços e punições','Teoria do inconsciente coletivo','Processo de desenvolvimento infantil'],ans:1,exp:'O condicionamento operante, de Skinner, mostra como comportamentos são moldados por reforços e punições.'},
  {q:'Quantos neurônios aproximadamente tem o cérebro humano?',opts:['Cerca de 10 bilhões','Cerca de 86 bilhões','Cerca de 1 trilhão','Cerca de 500 milhões'],ans:1,exp:'Estima-se que o cérebro humano contenha aproximadamente 86 bilhões de neurônios.'},
  {q:'O que é a "amígdala" no contexto da neurociência?',opts:['Estrutura ligada ao processamento emocional','Responsável pelo equilíbrio motor','Controla a linguagem','Gerencia funções autonômicas'],ans:0,exp:'A amígdala é uma estrutura do sistema límbico ligada ao processamento de emoções, especialmente o medo.'},
  {q:'Qual corrente psicológica estuda o comportamento observável?',opts:['Psicanálise','Gestalt','Behaviorismo','Humanismo'],ans:2,exp:'O Behaviorismo, fundado por Watson e desenvolvido por Skinner, foca no estudo do comportamento observável.'},
  {q:'O que é inteligência emocional?',opts:['QI elevado','Capacidade de reconhecer e gerir emoções próprias e alheias','Ausência de emoções negativas','Habilidade matemática'],ans:1,exp:'Inteligência emocional, conceito popularizado por Daniel Goleman, envolve reconhecer, compreender e gerir emoções.'},
  {q:'Jean Piaget é famoso por estudar:',opts:['O inconsciente humano','O comportamento animal','O desenvolvimento cognitivo infantil','A neurociência molecular'],ans:2,exp:'Jean Piaget (1896–1980) descreveu os estágios do desenvolvimento cognitivo das crianças.'}
];
var qIndex=0,qScore=0,quizDone=false;
function renderQuiz(){
  var d=quizData[qIndex];
  document.getElementById('qNum').textContent=qIndex+1;
  document.getElementById('quizQ').textContent=d.q;
  var optsEl=document.getElementById('quizOpts');optsEl.innerHTML='';
  d.opts.forEach(function(o,i){
    var btn=document.createElement('button');
    btn.className='quiz-opt';btn.textContent=o;
    btn.addEventListener('click',function(){
      if(quizDone)return;
      quizDone=true;
      var allBtns=optsEl.querySelectorAll('.quiz-opt');
      allBtns.forEach(function(b,j){
        if(j===d.ans)b.classList.add('correct');
        else if(b===btn)b.classList.add('wrong');
        b.disabled=true;
      });
      if(i===d.ans){qScore++;document.getElementById('qScore').textContent=qScore;}
      document.getElementById('quizExp').textContent=d.exp;
      document.getElementById('quizExp').classList.add('show');
      document.getElementById('quizNext').style.display='inline-flex';
    });
    optsEl.appendChild(btn);
  });
  document.getElementById('quizExp').classList.remove('show');
  document.getElementById('quizExp').textContent='';
  document.getElementById('quizNext').style.display='none';
  quizDone=false;
}
document.getElementById('quizNext').addEventListener('click',function(){
  qIndex++;
  if(qIndex>=quizData.length){
    document.getElementById('quizCard').style.display='none';
    document.querySelector('.quiz-meta').style.display='none';
    var f=document.getElementById('quizFinal');
    f.style.display='block';
    document.getElementById('finalScore').textContent=qScore+'/10';
    var msg='';
    if(qScore>=9)msg='Excelente! Você tem um domínio impressionante sobre Psicologia e Neurociência! 🧠✨';
    else if(qScore>=7)msg='Muito bem! Você tem bom conhecimento sobre a mente humana. Continue explorando!';
    else if(qScore>=5)msg='Bom resultado! Há muito mais para descobrir. Que tal rever os conteúdos do site?';
    else msg='Um ótimo começo! A mente humana é fascinante — explore mais os conteúdos do instituto.';
    document.getElementById('finalMsg').textContent=msg;
  }else{renderQuiz();}
});
document.getElementById('quizReset').addEventListener('click',function(){
  qIndex=0;qScore=0;
  document.getElementById('qScore').textContent=0;
  document.getElementById('quizCard').style.display='';
  document.querySelector('.quiz-meta').style.display='';
  document.getElementById('quizFinal').style.display='none';
  renderQuiz();
});
renderQuiz();

/* ── FAQ ── */
document.querySelectorAll('.faq-item').forEach(function(item){
  item.querySelector('.faq-q').addEventListener('click',function(){
    var isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open');});
    if(!isOpen)item.classList.add('open');
  });
});

/* ── ARTIGOS FILTER ── */
document.querySelectorAll('.filter-btn').forEach(function(btn){
  btn.addEventListener('click',function(){
    document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active');});
    btn.classList.add('active');
    var f=btn.dataset.filter;
    document.querySelectorAll('.artigo-card').forEach(function(card){
      card.style.display=(f==='todos'||card.dataset.cat===f)?'':'none';
    });
  });
});

/* ── GALERIA LIGHTBOX ── */
var lightbox=document.getElementById('lightbox');
var lightboxImg=document.getElementById('lightboxImg');
document.querySelectorAll('.galeria-item').forEach(function(item){
  item.addEventListener('click',function(){
    lightboxImg.src=item.dataset.src;
    lightbox.classList.add('open');
  });
});
document.getElementById('lightboxClose').addEventListener('click',function(){lightbox.classList.remove('open');});
lightbox.addEventListener('click',function(e){if(e.target===lightbox)lightbox.classList.remove('open');});

/* ── TOAST ── */
function showToast(msg){
  var t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');},3000);
}

/* ── CONTATO FORM ── */
document.getElementById('formSend').addEventListener('click',function(){
  var n=document.getElementById('fNome').value.trim();
  var e=document.getElementById('fEmail').value.trim();
  var m=document.getElementById('fMsg').value.trim();
  if(!n||!e||!m){showToast('Por favor, preencha todos os campos.');return;}
  showToast('✅ Mensagem enviada com sucesso! Em breve entraremos em contato.');
  document.getElementById('fNome').value='';
  document.getElementById('fEmail').value='';
  document.getElementById('fMsg').value='';
});

/* ── NEWSLETTER ── */
document.getElementById('nlBtn').addEventListener('click',function(){
  var e=document.getElementById('nlEmail').value.trim();
  if(!e||!e.includes('@')){showToast('Por favor, insira um e-mail válido.');return;}
  showToast('✅ Inscrição realizada! Bem-vindo(a) à newsletter.');
  document.getElementById('nlEmail').value='';
});

/* ── NEURO COUNTERS ── */
var neuroDone=false;
var neuroObs=new IntersectionObserver(function(entries){
  if(entries[0].isIntersecting&&!neuroDone){
    neuroDone=true;
    document.querySelectorAll('.neuro-stat-val[data-target]').forEach(function(el){
      var t=parseInt(el.dataset.target);
      var start=0,dur=2000,startTime=null;
      function step(ts){
        if(!startTime)startTime=ts;
        var p=Math.min((ts-startTime)/dur,1);
        var ease=1-Math.pow(1-p,3);
        el.textContent=Math.floor(ease*t);
        if(p<1)requestAnimationFrame(step);
        else el.textContent=t;
      }
      requestAnimationFrame(step);
    });
  }
},{threshold:.3});
var neuroSection=document.getElementById('neurociencia');
if(neuroSection)neuroObs.observe(neuroSection);
