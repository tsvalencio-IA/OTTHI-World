/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 04-education-daily-quiz.js
 * Escopo: Desafios diários, educação, quiz e coleção
 * Linhas de origem V642: 659-786
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function localDateKey(){const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
  function daysBetween(a,b){if(!a||!b)return 99;return Math.round((new Date(`${b}T12:00:00`)-new Date(`${a}T12:00:00`))/86400000)}
  function ensureDailyChallenges(){const key=localDateKey();if(state.daily.date===key&&state.daily.quests?.length)return;const gap=daysBetween(state.daily.lastDate,key);state.daily.streak=gap===1?(state.daily.streak||0)+1:gap===0?(state.daily.streak||1):1;let seed=Number(key.replaceAll('-',''));const pool=[...DAILY_QUEST_POOL],picked=[];while(picked.length<3&&pool.length){seed=(seed*9301+49297)%233280;const q=pool.splice(Math.floor(seed/233280*pool.length),1)[0];picked.push({id:q.id,progress:0,target:q.target,reward:q.reward,xp:q.xp,claimed:false});}state.daily={date:key,lastDate:key,streak:state.daily.streak||1,quests:picked};saveState();}
  function dailyDefinition(id){return DAILY_QUEST_POOL.find(q=>q.id===id)}
  function trackDaily(type,amount=1){
    ensureDailyChallenges();let changed=false,completedNow=false;
    for(const q of state.daily.quests){if(q.id!==type||q.claimed)continue;const before=q.progress;q.progress=clamp((q.progress||0)+amount,0,q.target);if(q.progress!==before){changed=true;if(before<q.target&&q.progress>=q.target)completedNow=true;}}
    if(!changed)return;updateDailyBadge();const now=performance.now();
    if(completedNow||!trackDaily.lastSave||now-trackDaily.lastSave>6000){trackDaily.lastSave=now;saveState();}
  }
  function updateDailyBadge(){if(!els.dailyBtn)return;ensureDailyChallenges();const ready=state.daily.quests.filter(q=>!q.claimed&&q.progress>=q.target).length;els.dailyBtn.classList.toggle('reward-ready',ready>0);const span=$('span',els.dailyBtn);if(span)span.textContent=ready?`Prêmio ${ready}`:'Desafios';}
  function claimDailyQuest(index){const q=state.daily.quests[index],def=dailyDefinition(q?.id);if(!q||!def||q.claimed||q.progress<q.target)return;q.claimed=true;addCoins(q.reward);addXP(q.xp);addReputation(3);beep(980,90);vibrate(30);toast(`Desafio concluído! +${q.reward} moedas`,'good',2200);saveState(true);openDailyChallenges();}
  const OTTON_BRAND={method:'Método Otton',platform:'Otton Connect',mentor:'Tia Thamis',school:'Escola Otton'};
  const EDUCATION_SUBJECTS={
    math:{id:'math',title:'Matemática Otton',icon:'🔢',color:'#27b36a',description:'Contagem, soma, subtração, padrões e lógica em sequência progressiva.'},
    portuguese:{id:'portuguese',title:'Português Otton',icon:'📚',color:'#7b5ce6',description:'Letras, sílabas, palavras e frases com leitura guiada.'},
    english:{id:'english',title:'English Otton',icon:'🌎',color:'#168de2',description:'Palavras, imagens, sons e expressões com repetição inteligente.'}
  };
  const WORD_BANK=[
    {pt:'CASA',en:'HOUSE',emoji:'🏠',syllables:['CA','SA']},{pt:'GATO',en:'CAT',emoji:'🐱',syllables:['GA','TO']},{pt:'BOLA',en:'BALL',emoji:'⚽',syllables:['BO','LA']},{pt:'SOL',en:'SUN',emoji:'☀️',syllables:['SOL']},
    {pt:'LIVRO',en:'BOOK',emoji:'📘',syllables:['LI','VRO']},{pt:'ÁGUA',en:'WATER',emoji:'💧',syllables:['Á','GUA']},{pt:'CARRO',en:'CAR',emoji:'🚗',syllables:['CAR','RO']},{pt:'CACHORRO',en:'DOG',emoji:'🐶',syllables:['CA','CHOR','RO']},
    {pt:'MAÇÃ',en:'APPLE',emoji:'🍎',syllables:['MA','ÇÃ']},{pt:'PEIXE',en:'FISH',emoji:'🐟',syllables:['PEI','XE']},{pt:'PÁSSARO',en:'BIRD',emoji:'🐦',syllables:['PÁS','SA','RO']},{pt:'LEITE',en:'MILK',emoji:'🥛',syllables:['LEI','TE']},
    {pt:'ESCOLA',en:'SCHOOL',emoji:'🏫',syllables:['ES','CO','LA']},{pt:'AMIGO',en:'FRIEND',emoji:'🧑‍🤝‍🧑',syllables:['A','MI','GO']},{pt:'PORTA',en:'DOOR',emoji:'🚪',syllables:['POR','TA']},{pt:'MESA',en:'TABLE',emoji:'🪑',syllables:['ME','SA']},
    {pt:'LÁPIS',en:'PENCIL',emoji:'✏️',syllables:['LÁ','PIS']},{pt:'CADERNO',en:'NOTEBOOK',emoji:'📓',syllables:['CA','DER','NO']},{pt:'BICICLETA',en:'BICYCLE',emoji:'🚲',syllables:['BI','CI','CLE','TA']},{pt:'JANELA',en:'WINDOW',emoji:'🪟',syllables:['JA','NE','LA']}
  ];
  const STAGE_PREFIX={math:'M',portuguese:'P',english:'I'};
  const SUBJECT_LEVELS={
    math:[
      ['Quantidade e número','Associe quantidades aos números de 1 a 12.','Reconhecer quantidades sem depender de contagem lenta.'],
      ['Sequência numérica','Complete sequências, antecessor e sucessor.','Ganhar segurança com ordem e regularidade dos números.'],
      ['Adição até 20','Some parcelas pequenas com fluência.','Resolver adições simples com precisão.'],
      ['Subtração até 20','Calcule diferenças simples.','Compreender retirada e diferença sem apoio visual constante.'],
      ['Adição até 100','Some dezenas e unidades em passos graduais.','Aumentar fluência em cálculo escrito e mental.'],
      ['Subtração até 100','Subtraia dezenas e unidades.','Consolidar cálculo de diferença com números maiores.'],
      ['Tabuadas-base','Treine 2, 5 e 10 antes de ampliar.','Automatizar fatos fundamentais de multiplicação.'],
      ['Multiplicação','Pratique fatores de 3 a 9.','Resolver multiplicações com mais autonomia e velocidade.'],
      ['Divisão exata','Relacione multiplicação e divisão.','Encontrar quocientes inteiros com segurança.'],
      ['Frações simples','Metade, terço, quarto e partes de quantidades.','Entender fração como parte de um todo e de uma quantidade.'],
      ['Expressões','Combine operações em pequenas expressões.','Ler a expressão e respeitar a ordem das operações.'],
      ['Problemas','Transforme situações em cálculos.','Escolher a operação correta e resolver problemas curtos.'],
      ['Domínio matemático','Misture habilidades anteriores em sequência.','Manter precisão e fluência com conteúdos variados.']
    ],
    portuguese:[
      ['Letras e sons','Reconheça letras iniciais e relações sonoras simples.','Fortalecer a base para leitura autônoma.'],
      ['Sílabas','Identifique e organize sílabas.','Perceber a estrutura sonora e gráfica das palavras.'],
      ['Imagem e palavra','Associe imagem, significado e escrita.','Ampliar vocabulário e reconhecimento global.'],
      ['Ortografia básica','Complete letras e padrões frequentes.','Observar a escrita correta com atenção.'],
      ['Construção de palavras','Monte palavras por partes.','Ler e reconstruir palavras com autonomia.'],
      ['Frases e concordância','Escolha frases que combinam corretamente.','Perceber relações básicas entre palavras na frase.'],
      ['Pontuação','Use ponto, interrogação e exclamação em contexto.','Ler a intenção da frase e pontuar corretamente.'],
      ['Acentuação','Reconheça grafias acentuadas frequentes.','Aprimorar leitura e escrita de palavras usuais.'],
      ['Classes de palavras','Diferencie substantivo, verbo e adjetivo em exemplos simples.','Perceber a função das palavras no enunciado.'],
      ['Interpretação curta','Leia pequenos textos e responda.','Localizar informação explícita com atenção.'],
      ['Ordem e coesão','Organize palavras e frases em sequência lógica.','Construir enunciados claros e coerentes.'],
      ['Inferência de leitura','Descubra informações implícitas em textos curtos.','Compreender além da informação literal.'],
      ['Domínio de leitura','Misture ortografia, gramática e interpretação.','Ler, compreender e revisar com independência.']
    ],
    english:[
      ['Picture words','Associe imagens a palavras básicas.','Criar vocabulário visual de alta frequência.'],
      ['Português → English','Reconheça traduções de palavras familiares.','Recuperar vocabulário sem depender de pistas.'],
      ['Listen and choose','Ouça e identifique palavras.','Relacionar som, pronúncia e escrita.'],
      ['Spelling','Complete a grafia de palavras conhecidas.','Fixar padrões ortográficos do inglês.'],
      ['Useful phrases','Use saudações e expressões do cotidiano.','Compreender frases curtas em contexto.'],
      ['Articles and plurals','Pratique a/an, singular e plural.','Perceber padrões básicos de estrutura.'],
      ['Verb to be','Complete frases com am/is/are.','Construir afirmações simples corretamente.'],
      ['Present simple','Pratique have/has e verbos frequentes.','Ler frases sobre rotina e características.'],
      ['Questions','Reconheça perguntas e respostas simples.','Compreender estruturas interrogativas frequentes.'],
      ['Prepositions','Use in, on, under, next to e between.','Descrever posição em frases curtas.'],
      ['Reading','Leia pequenos textos e localize informações.','Avançar da frase isolada para compreensão textual.'],
      ['Dialogues','Complete conversas do cotidiano.','Escolher respostas adequadas ao contexto.'],
      ['English mastery','Misture vocabulário, áudio, gramática e leitura.','Manter compreensão e autonomia em diferentes tarefas.']
    ]
  };
  const PT_READING=[
    {text:'Otto levou um livro para a escola. No recreio, ele leu duas páginas e depois guardou o livro na mochila.',question:'Onde Otto guardou o livro?',answer:'Na mochila',options:['Na mochila','Na mesa','Na biblioteca','No carro']},
    {text:'A chuva começou cedo. Théo pegou o guarda-chuva antes de sair e chegou seco à escola.',question:'Por que Théo chegou seco?',answer:'Porque levou o guarda-chuva',options:['Porque levou o guarda-chuva','Porque não choveu','Porque foi de bicicleta','Porque ficou em casa']},
    {text:'Lia plantou uma semente e colocou o vaso perto da janela. Todos os dias ela verificava a terra e colocava água quando estava seca.',question:'O que Lia fazia quando a terra estava seca?',answer:'Colocava água',options:['Colocava água','Trocava a janela','Guardava o vaso','Retirava a semente']},
    {text:'O cachorro ficou perto da porta quando ouviu o barulho da chave. Logo depois, a família chegou em casa.',question:'O que o cachorro provavelmente esperava?',answer:'A chegada da família',options:['A chegada da família','A hora de dormir','Uma tempestade','Um passeio de barco']}
  ];
  const EN_READING=[
    {text:'Tom has a red bicycle. He rides it to the park on Saturday morning.',question:'Where does Tom ride his bicycle?',answer:'To the park',options:['To the park','To the school','To the hospital','To the beach']},
    {text:'Ana is in the kitchen. She has an apple and a glass of water.',question:'What fruit does Ana have?',answer:'An apple',options:['An apple','A banana','An orange','A grape']},
    {text:'The blue book is on the table. The pencil is under the book.',question:'Where is the pencil?',answer:'Under the book',options:['Under the book','On the window','In the car','Next to the door']},
    {text:'Ben wakes up at seven. He eats breakfast and then goes to school.',question:'What does Ben do after breakfast?',answer:'He goes to school',options:['He goes to school','He goes to sleep','He plays soccer','He takes a shower']}
  ];
  const MATH_PROBLEMS=[
    {prompt:'Otto tinha 8 carrinhos e ganhou mais 5. Quantos carrinhos ele tem agora?',answer:13,near:[11,12,14,15]},
    {prompt:'Havia 18 livros na estante. 7 foram emprestados. Quantos ficaram?',answer:11,near:[9,10,12,13]},
    {prompt:'Há 4 caixas com 3 lápis em cada uma. Quantos lápis há ao todo?',answer:12,near:[7,9,10,14]},
    {prompt:'24 figurinhas foram divididas igualmente entre 6 crianças. Quantas cada criança recebeu?',answer:4,near:[3,5,6,8]}
  ];
  const PT_ACCENT=[['LÁPIS','LAPIS'],['ÁGUA','AGUA'],['PÁSSARO','PASSARO'],['VOCÊ','VOCE'],['CAFÉ','CAFE'],['FÁCIL','FACIL']];
  const EN_PHRASES=[['HELLO','Olá'],['THANK YOU','Obrigado'],['GOOD MORNING','Bom dia'],['PLEASE','Por favor'],['GOODBYE','Tchau'],['HOW ARE YOU?','Como você está?']];
  function educationStageCode(subject,level){return`${STAGE_PREFIX[subject]||'E'}${Math.max(0,Number(level||1)-1)}`;}
  function educationStageData(subject,level){const row=(SUBJECT_LEVELS[subject]||[])[Math.max(0,Number(level||1)-1)]||['Revisão','Continue praticando.','Consolidar o conteúdo.'];return{code:educationStageCode(subject,level),title:row[0],description:row[1],goal:row[2]};}
  function educationStageRoundCount(level){level=Number(level)||1;return level<=4?6:level<=9?7:8;}
  function educationStageCriteria(level,total=5){level=Number(level)||1;const minScore=Math.max(1,Math.ceil(Number(total||5)*.8));const secondsPerItem=level<=4?24:level<=9?30:38;return{minScore,targetMs:Number(total||5)*secondsPerItem*1000};}
  function seeded(seed){let s=(Number(seed)||1)>>>0;return()=>((s=(s*1664525+1013904223)>>>0)/4294967296);}
  function shuffled(values,rand=Math.random){return [...values].sort(()=>rand()-.5);}
  function choiceSet(answer,candidates,rand){const pool=shuffled([...new Set(candidates.filter(x=>String(x)!==String(answer)))],rand).slice(0,3);return shuffled([answer,...pool],rand);}
  function nearbyNumbers(answer,spread=4){const n=Number(answer);return[n-spread,n-2,n-1,n+1,n+2,n+spread].filter(x=>Number.isFinite(x)&&x>=0);}
  function mathRound(level,rand,index){
    const emoji=['🍎','⭐','🚗','🐟'][Math.floor(rand()*4)];
    if(level===1){const n=1+Math.floor(rand()*12);return{kind:'choice',visual:emoji.repeat(Math.min(n,12)),prompt:'Quantos objetos aparecem?',answer:String(n),options:choiceSet(String(n),nearbyNumbers(n,3).map(String),rand)};}
    if(level===2){const start=1+Math.floor(rand()*18),step=1+Math.floor(rand()*4),back=rand()>.72,values=back?[start+step*3,start+step*2,'?',start]:[start,start+step,'?',start+step*3],ans=start+step*2;return{kind:'choice',visual:values.join('  •  '),prompt:back?'Qual número falta na sequência decrescente?':'Qual número completa a sequência?',answer:String(ans),options:choiceSet(String(ans),nearbyNumbers(ans,step+2).map(String),rand)};}
    if(level===3){const a=2+Math.floor(rand()*10),b=1+Math.floor(rand()*Math.max(2,19-a)),ans=a+b;return{kind:'choice',visual:`${a} + ${b}`,prompt:'Resolva a adição.',answer:String(ans),options:choiceSet(String(ans),nearbyNumbers(ans,3).map(String),rand)};}
    if(level===4){const a=7+Math.floor(rand()*13),b=1+Math.floor(rand()*Math.min(12,a)),ans=a-b;return{kind:'choice',visual:`${a} − ${b}`,prompt:'Resolva a subtração.',answer:String(ans),options:choiceSet(String(ans),nearbyNumbers(ans,3).map(String),rand)};}
    if(level===5){const a=12+Math.floor(rand()*58),b=5+Math.floor(rand()*Math.min(29,99-a)),ans=a+b;return{kind:'choice',visual:`${a} + ${b}`,prompt:'Calcule com atenção às dezenas e unidades.',answer:String(ans),options:choiceSet(String(ans),nearbyNumbers(ans,10).map(String),rand)};}
    if(level===6){const a=35+Math.floor(rand()*64),b=5+Math.floor(rand()*Math.min(34,a-1)),ans=a-b;return{kind:'choice',visual:`${a} − ${b}`,prompt:'Calcule a diferença.',answer:String(ans),options:choiceSet(String(ans),nearbyNumbers(ans,10).map(String),rand)};}
    if(level===7){const factors=[2,5,10],a=factors[Math.floor(rand()*factors.length)],b=1+Math.floor(rand()*10),ans=a*b;return{kind:'choice',visual:`${a} × ${b}`,prompt:'Resolva a tabuada-base.',answer:String(ans),options:choiceSet(String(ans),nearbyNumbers(ans,a).map(String),rand)};}
    if(level===8){const a=3+Math.floor(rand()*7),b=2+Math.floor(rand()*9),ans=a*b;return{kind:'choice',visual:`${a} × ${b}`,prompt:'Resolva a multiplicação.',answer:String(ans),options:choiceSet(String(ans),nearbyNumbers(ans,a).map(String),rand)};}
    if(level===9){const divisor=2+Math.floor(rand()*8),quotient=2+Math.floor(rand()*9),dividend=divisor*quotient;return{kind:'choice',visual:`${dividend} ÷ ${divisor}`,prompt:'Qual é o quociente?',answer:String(quotient),options:choiceSet(String(quotient),nearbyNumbers(quotient,3).map(String),rand)};}
    if(level===10){const den=[2,3,4][Math.floor(rand()*3)],whole=den*(2+Math.floor(rand()*5)),num=1,ans=whole/den;return{kind:'choice',visual:`${num}/${den} de ${whole}`,prompt:`Quanto é ${num}/${den} de ${whole}?`,answer:String(ans),options:choiceSet(String(ans),nearbyNumbers(ans,3).map(String),rand)};}
    if(level===11){const a=2+Math.floor(rand()*10),b=2+Math.floor(rand()*6),c=2+Math.floor(rand()*5),ans=a+b*c;return{kind:'choice',visual:`${a} + ${b} × ${c}`,prompt:'Resolva respeitando a ordem das operações.',answer:String(ans),options:choiceSet(String(ans),[a+b+c,(a+b)*c,a*b+c,ans+2].map(String),rand)};}
    if(level===12){const p=MATH_PROBLEMS[Math.floor(rand()*MATH_PROBLEMS.length)];return{kind:'choice',visual:'🧠',prompt:p.prompt,answer:String(p.answer),options:choiceSet(String(p.answer),p.near.map(String),rand)};}
    return mathRound(3+Math.floor(rand()*9),rand,index);
  }
  function portugueseRound(level,rand,index){
    const word=WORD_BANK[Math.floor(rand()*WORD_BANK.length)];
    if(level===1){const ans=word.pt[0];return{kind:'choice',visual:word.emoji,prompt:`Com qual letra começa ${word.pt}?`,answer:ans,options:choiceSet(ans,['A','B','C','G','L','M','P','S','T','J'],rand)};}
    if(level===2){return{kind:'choice',visual:word.pt,prompt:'Quantas sílabas essa palavra tem?',answer:String(word.syllables.length),options:choiceSet(String(word.syllables.length),['1','2','3','4'],rand)};}
    if(level===3){return{kind:'choice',visual:word.emoji,prompt:'Qual é o nome desta imagem?',answer:word.pt,options:choiceSet(word.pt,WORD_BANK.map(w=>w.pt),rand)};}
    if(level===4){const letters=[...word.pt],positions=letters.map((c,i)=>/[A-ZÁÉÍÓÚÃÕÇ]/.test(c)?i:-1).filter(i=>i>=0),pos=positions[Math.floor(rand()*positions.length)]??0,ans=letters[pos],masked=[...letters];masked[pos]='_';return{kind:'choice',visual:word.emoji,prompt:`Complete corretamente: ${masked.join('')}`,answer:ans,options:choiceSet(ans,'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ'.split(''),rand)};}
    if(level===5){return{kind:'sequence',visual:word.emoji,prompt:'Toque nas sílabas para montar a palavra.',answer:word.syllables.join(''),tokens:shuffled(word.syllables,rand),displayAnswer:word.pt,joiner:''};}
    if(level===6){const noun=word.pt.toLowerCase(),correct=`O ${noun} está na imagem.`;return{kind:'choice',visual:word.emoji,prompt:'Qual frase apresenta concordância adequada?',answer:correct,options:shuffled([correct,`Os ${noun} está na imagem.`,`A ${noun} estão na imagem.`,`O ${noun} estão na imagem.`],rand)};}
    if(level===7){const rows=[['Você terminou a tarefa','?'],['Que surpresa','!'],['Hoje temos aula','.'],['Onde está o livro','?']],row=rows[Math.floor(rand()*rows.length)];return{kind:'choice',visual:row[0],prompt:'Qual sinal completa melhor a frase?',answer:row[1],options:['.','?','!']};}
    if(level===8){const pair=PT_ACCENT[Math.floor(rand()*PT_ACCENT.length)],answer=pair[0];return{kind:'choice',visual:'✍️',prompt:'Qual é a grafia correta?',answer,options:shuffled([pair[0],pair[1]],rand)};}
    if(level===9){const rows=[['CORRER','verbo'],['BONITO','adjetivo'],['ESCOLA','substantivo'],['ESTUDAR','verbo'],['RÁPIDO','adjetivo'],['LIVRO','substantivo']],row=rows[Math.floor(rand()*rows.length)];return{kind:'choice',visual:row[0],prompt:'Qual é a classe principal dessa palavra neste exemplo?',answer:row[1],options:['substantivo','verbo','adjetivo']};}
    if(level===10){const r=PT_READING[Math.floor(rand()*PT_READING.length)];return{kind:'choice',visual:r.text,prompt:r.question,answer:r.answer,options:shuffled(r.options,rand)};}
    if(level===11){const rows=[['Otto','levou','o','caderno','para','a','escola.'],['A','Tia','Thamis','corrigiu','a','atividade.'],['O','cachorro','dormiu','perto','da','porta.']],tokens=rows[Math.floor(rand()*rows.length)],answer=tokens.join(' ');return{kind:'sequence',visual:'📝',prompt:'Monte a frase na ordem correta.',answer,tokens:shuffled(tokens,rand),displayAnswer:answer,joiner:' '};}
    if(level===12){const r=PT_READING[3];return{kind:'choice',visual:r.text,prompt:r.question,answer:r.answer,options:shuffled(r.options,rand)};}
    return portugueseRound(3+Math.floor(rand()*9),rand,index);
  }
  function englishRound(level,rand,index){
    const word=WORD_BANK[Math.floor(rand()*WORD_BANK.length)];
    if(level===1){return{kind:'choice',visual:word.emoji,prompt:'Choose the English word.',answer:word.en,options:choiceSet(word.en,WORD_BANK.map(w=>w.en),rand),speak:word.en};}
    if(level===2){return{kind:'choice',visual:word.pt,prompt:`Como se diz “${word.pt.toLowerCase()}” em inglês?`,answer:word.en,options:choiceSet(word.en,WORD_BANK.map(w=>w.en),rand),speak:word.en};}
    if(level===3){return{kind:'choice',visual:'🔊',prompt:'Listen and choose the word.',answer:word.en,options:choiceSet(word.en,WORD_BANK.map(w=>w.en),rand),speak:word.en,autoSpeak:true};}
    if(level===4){const pos=Math.floor(rand()*word.en.length),ans=word.en[pos],masked=[...word.en];masked[pos]='_';return{kind:'choice',visual:word.emoji,prompt:`Complete the word: ${masked.join('')}`,answer:ans,options:choiceSet(ans,'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),rand),speak:word.en};}
    if(level===5){const pair=EN_PHRASES[Math.floor(rand()*EN_PHRASES.length)];return{kind:'choice',visual:'💬',prompt:`What does “${pair[0]}” mean?`,answer:pair[1],options:choiceSet(pair[1],EN_PHRASES.map(p=>p[1]),rand),speak:pair[0]};}
    if(level===6){const rows=[['an apple','an'],['a book','a'],['two books','books'],['two cars','cars']],row=rows[Math.floor(rand()*rows.length)],isPlural=row[0].startsWith('two ');return{kind:'choice',visual:row[0],prompt:isPlural?'Choose the correct plural form.':'Choose the correct article.',answer:row[1],options:isPlural?choiceSet(row[1],['bookes','carses','book','car'],rand):['a','an']};}
    if(level===7){const rows=[['I __ happy.','am'],['She __ at school.','is'],['They __ friends.','are'],['We __ ready.','are']],row=rows[Math.floor(rand()*rows.length)];return{kind:'choice',visual:row[0],prompt:'Complete with the verb to be.',answer:row[1],options:['am','is','are']};}
    if(level===8){const rows=[['She __ a book.','has'],['I __ a pencil.','have'],['Otto __ soccer on Saturday.','plays'],['They __ at school.','study']],row=rows[Math.floor(rand()*rows.length)];return{kind:'choice',visual:row[0],prompt:'Choose the best word.',answer:row[1],options:choiceSet(row[1],['have','has','play','plays','study','studies'],rand)};}
    if(level===9){const rows=[['What is your name?','My name is Otto.'],['How are you?','I am fine.'],['Where is the book?','It is on the table.'],['Do you like soccer?','Yes, I do.']],row=rows[Math.floor(rand()*rows.length)];return{kind:'choice',visual:row[0],prompt:'Choose the best answer.',answer:row[1],options:choiceSet(row[1],rows.map(x=>x[1]),rand),speak:row[0]};}
    if(level===10){const rows=[['The book is __ the table.','on'],['The pencil is __ the book.','under'],['The ball is __ the box.','in'],['The school is __ the park and the store.','between']],row=rows[Math.floor(rand()*rows.length)];return{kind:'choice',visual:row[0],prompt:'Choose the correct preposition.',answer:row[1],options:['in','on','under','between']};}
    if(level===11){const r=EN_READING[Math.floor(rand()*EN_READING.length)];return{kind:'choice',visual:r.text,prompt:r.question,answer:r.answer,options:shuffled(r.options,rand),speak:r.text};}
    if(level===12){const rows=[['Good morning!','Good morning!'],['Thank you!','You are welcome!'],['See you tomorrow!','See you!'],['How are you?','I am fine, thank you.']],row=rows[Math.floor(rand()*rows.length)];return{kind:'choice',visual:`A: ${row[0]}`,prompt:'Choose the best reply.',answer:row[1],options:choiceSet(row[1],rows.map(x=>x[1]),rand),speak:`${row[0]} ${row[1]}`};}
    return englishRound(3+Math.floor(rand()*9),rand,index);
  }
  function generateEducationRounds(subject,level=1,seed=Date.now(),count=5){level=clamp(Number(level)||1,1,(SUBJECT_LEVELS[subject]||SUBJECT_LEVELS.math).length);const rand=seeded(Number(seed)+level*997),maker=subject==='math'?mathRound:subject==='portuguese'?portugueseRound:englishRound;return Array.from({length:Number(count)||5},(_,i)=>maker(level,rand,i));}
  function subjectLevelRecord(subject,level){return state.learning.lessons[`${subject}-${level}`]||{completed:false,stars:0,best:0,attempts:0};}
  function subjectUnlocked(subject,level){return level===1||subjectLevelRecord(subject,level-1).completed;}
  function educationSummary(){let done=0,total=0;for(const id of Object.keys(EDUCATION_SUBJECTS)){const levels=SUBJECT_LEVELS[id]||[];for(let l=1;l<=levels.length;l++){total++;if(subjectLevelRecord(id,l).completed)done++;}}return{done,total,pct:Math.round(done/Math.max(1,total)*100)};}
  function speakKidWord(text){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(text));u.lang='en-US';u.rate=.78;u.pitch=1.08;speechSynthesis.speak(u);}catch{}}
  function dailyChallengesHtml(){ensureDailyChallenges();return state.daily.quests.map((q,i)=>{const d=dailyDefinition(q.id),pct=clamp(q.progress/q.target*100,0,100),ready=q.progress>=q.target&&!q.claimed;return`<article class="daily-card ${ready?'ready':''} ${q.claimed?'claimed':''}"><div class="daily-icon">${d.icon}</div><div><b>${d.title}</b><span>${d.label(q.progress)}</span><div class="daily-progress"><i style="width:${pct}%"></i></div><small>${q.reward} moedas • ${q.xp} XP</small></div><button data-daily-claim="${i}" ${ready?'':'disabled'}>${q.claimed?'✓':ready?'Receber':'Em andamento'}</button></article>`}).join('');}
  function educationSubjectHtml(subject){const s=EDUCATION_SUBJECTS[subject],levels=SUBJECT_LEVELS[subject];return`<section class="edu-subject" style="--edu:${s.color}"><header><span>${s.icon}</span><div><b>${s.title}</b><small>${s.description}</small></div></header><div class="edu-path">${levels.map((data,i)=>{const level=i+1,rec=subjectLevelRecord(subject,level),unlocked=subjectUnlocked(subject,level),stage=educationStageData(subject,level),criteria=educationStageCriteria(level,educationStageRoundCount(level));return`<button class="edu-node ${rec.completed?'done':''} ${unlocked?'':'locked'} ${rec.needsReview?'review':''}" data-edu-play="${subject}" data-edu-level="${level}" ${unlocked?'':'disabled'}><i>${rec.completed?'✓':unlocked?s.icon:'🔒'}</i><span><em class="edu-stage-code">${stage.code}</em><b>${stage.title}</b><small>${rec.completed?`${'⭐'.repeat(rec.stars||1)} • ${rec.best||0}/${rec.lastTotal||educationStageRoundCount(level)} • ${rec.needsReview?'revisar':'dominado'}`:`${stage.description} • meta ${criteria.minScore}/${educationStageRoundCount(level)}`}</small></span></button>`}).join('')}</div></section>`;}
  function educationSubjectSnapshot(subject){const def=EDUCATION_SUBJECTS[subject]||EDUCATION_SUBJECTS.math,levels=SUBJECT_LEVELS[subject]||[],xp=Number(state.learning.subjectXP?.[subject]||0);let completed=0,stars=0,best=0,nextLevel=1;for(let level=1;level<=levels.length;level++){const rec=subjectLevelRecord(subject,level);if(rec.completed){completed++;stars+=Number(rec.stars||0);best=Math.max(best,Number(rec.best||0));if(nextLevel===level)nextLevel=Math.min(level+1,levels.length);}else if(nextLevel===1||nextLevel>level)nextLevel=level;}const pct=Math.round(completed/Math.max(1,levels.length)*100);return{...def,total:levels.length,completed,stars,best,xp,pct,nextLevel:Math.min(nextLevel,Math.max(1,levels.length))};}
  const THAMIS_DIALOGUES={
    newStudent:['Vamos começar em um ponto confortável e construir segurança passo a passo.','Aqui você não precisa correr contra ninguém: precisamos descobrir o ponto certo para você aprender bem.','Primeiro vem a segurança. Depois, a velocidade aparece naturalmente.'],
    welcome:['Que bom ver você de volta. Vamos continuar exatamente de onde seu aprendizado pede.','Hoje temos uma meta curta e clara. Faça com atenção e observe o quanto você evoluiu.','Cada atividade bem compreendida deixa a próxima um pouco mais fácil.'],
    streak:['Sua constância está aparecendo no resultado. Continue com esse ritmo.','Você está criando uma rotina forte de estudos. Vamos aproveitar essa sequência.'],
    review:['Eu marquei uma revisão porque dominar bem vale mais do que simplesmente passar rápido.','Vamos rever esse ponto com exercícios diferentes. Quando ficar natural, seguimos adiante.'],
    correct:['Muito bem. Observe o caminho que você usou para chegar à resposta.','Correto. Continue com o mesmo cuidado.','Boa! Agora tente manter precisão e ritmo.'],
    wrong:['Tudo bem errar durante o treino. Leia novamente e compare com a resposta correta.','Esse erro mostra exatamente o que precisamos revisar. Observe com calma.','Quase. O importante agora é entender a diferença antes da próxima questão.'],
    perfect:['Excelente trabalho. Precisão total e ótima concentração.','Você dominou esta rodada. Agora podemos aumentar o desafio com segurança.'],
    pass:['Etapa concluída. Vou manter esse conteúdo no seu histórico e preparar o próximo passo.','Você atingiu o critério de domínio desta etapa. Vamos avançar sem perder a revisão.'],
    retry:['Ainda não é hora de avançar. Vamos repetir com uma nova sequência e consolidar esse ponto.','Seu resultado mostra que precisamos de mais uma rodada aqui. Isso faz parte do aprendizado.']
  };
  function thamisDialogue(kind,salt=0){const list=THAMIS_DIALOGUES[kind]||THAMIS_DIALOGUES.welcome,seed=String(localDateKey()).split('').reduce((a,c)=>a+c.charCodeAt(0),0)+Number(salt||0)+(state.daily.streak||0);return list[Math.abs(seed)%list.length];}
  function recommendedEducationTarget(){
    const review=[];for(const subject of Object.keys(EDUCATION_SUBJECTS)){for(let level=1;level<=(SUBJECT_LEVELS[subject]||[]).length;level++){const rec=subjectLevelRecord(subject,level);if(rec.completed&&rec.needsReview)review.push({subject,level,meta:educationSubjectSnapshot(subject),record:rec});}}
    if(review.length){review.sort((a,b)=>(a.record.stars||0)-(b.record.stars||0)||(a.record.lastScore||0)-(b.record.lastScore||0));return review[0];}
    const entries=Object.keys(EDUCATION_SUBJECTS).map(id=>educationSubjectSnapshot(id));entries.sort((a,b)=>a.completed-b.completed||a.xp-b.xp||a.pct-b.pct);const chosen=entries[0]||educationSubjectSnapshot('math');return{subject:chosen.id,level:Math.max(1,chosen.nextLevel||1),meta:chosen,record:subjectLevelRecord(chosen.id,chosen.nextLevel||1)};
  }
  function thamisWelcomeLine(){const rec=recommendedEducationTarget(),playerName=playerDisplayName(),summary=educationSummary(),stage=educationStageData(rec.subject,rec.level),kind=summary.done===0?'newStudent':rec.record?.needsReview?'review':(state.daily.streak||0)>=5?'streak':'welcome';return`Oi, ${escapeHtml(playerName)}! ${escapeHtml(thamisDialogue(kind,rec.level))} Minha recomendação agora é <b>${escapeHtml(rec.meta.title)}</b>, estágio <b>${stage.code} • ${escapeHtml(stage.title)}</b>.`;}
  function thamisPlanItems(){const rec=recommendedEducationTarget(),summary=educationSummary(),stage=educationStageData(rec.subject,rec.level);return[
    {icon:rec.meta.icon,title:`Hoje • ${stage.code} ${stage.title}`,text:`Faça ${educationStageRoundCount(rec.level)} atividades. O critério de domínio é pelo menos 80% de acerto; o tempo serve como referência de fluência, não como punição.`,subject:rec.subject,level:rec.level,kind:'play'},
    {icon:'🔁',title:'Revisão individual',text:rec.record?.needsReview?'Esta etapa voltou para revisão porque ainda há erro ou pouca fluência. Faça outra rodada antes de priorizar o avanço.':'Quando uma etapa ficar abaixo do domínio esperado, a Tia Thamis coloca uma revisão no plano automaticamente.',kind:'hub'},
    {icon:'🎯',title:'Rotina diária',text:`Mantenha uma sessão curta e consistente. Sequência atual: ${state.daily.streak||1} dia(s).`,kind:'daily'},
    {icon:'🏁',title:`Trilha • ${summary.pct}%`,text:'O objetivo é avançar em pequenos passos, consolidando cada habilidade antes de aumentar a complexidade.',kind:'stages'}
  ];}
  function thamisMethodHtml(){const pillars=[['Ponto adequado','O aluno continua do estágio compatível com o que já consegue resolver, e não pela idade ou série.'],['Pequenos passos','A dificuldade cresce em incrementos curtos para permitir descoberta e autonomia.'],['Precisão + fluência','Acerto é obrigatório para domínio; o tempo de referência ajuda a perceber quando uma habilidade ficou natural.'],['Revisão individual','Erros, baixa precisão ou baixa fluência colocam o conteúdo novamente no plano.'],['Correção imediata','A resposta recebe retorno na hora e o resultado fica registrado para orientar a próxima sessão.'],['Rotina curta','A proposta é praticar com constância, evitando sessões longas e cansativas.']];return`<div class="thamis-pillar-grid">${pillars.map(([title,text])=>`<article class="thamis-card"><b>${escapeHtml(title)}</b><p>${escapeHtml(text)}</p></article>`).join('')}</div>`;}
  function thamisProgressHtml(){return`<div class="thamis-progress-grid">${Object.keys(EDUCATION_SUBJECTS).map(id=>{const item=educationSubjectSnapshot(id),stage=educationStageData(id,item.nextLevel),reviewCount=Array.from({length:item.total},(_,i)=>subjectLevelRecord(id,i+1)).filter(r=>r.completed&&r.needsReview).length;return`<article class="thamis-card thamis-progress-card" style="--thamis:${item.color}"><div><small>${item.icon} ${escapeHtml(item.title)}</small><b>${item.completed}/${item.total} estágios</b></div><div class="thamis-progress-bar"><i style="width:${item.pct}%"></i></div><p>${item.pct}% concluído • ${item.stars} estrelas • ${item.xp} XP${reviewCount?` • ${reviewCount} revisão(ões)`:''}</p><small>Próximo: ${stage.code} • ${escapeHtml(stage.title)}</small><button class="btn primary" data-thamis-play="${item.id}" data-thamis-level="${item.nextLevel}">Continuar</button></article>`;}).join('')}</div>`;}
  function thamisStagesHtml(){return`<div class="thamis-stage-columns">${Object.keys(EDUCATION_SUBJECTS).map(subject=>{const def=EDUCATION_SUBJECTS[subject];return`<section class="thamis-stage-column" style="--thamis:${def.color}"><header><span>${def.icon}</span><b>${escapeHtml(def.title)}</b></header>${SUBJECT_LEVELS[subject].map((_,i)=>{const level=i+1,stage=educationStageData(subject,level),rec=subjectLevelRecord(subject,level),unlocked=subjectUnlocked(subject,level);return`<button ${unlocked?'':'disabled'} data-thamis-play="${subject}" data-thamis-level="${level}" class="thamis-stage-row ${rec.completed?'done':''} ${rec.needsReview?'review':''}"><strong>${stage.code}</strong><span><b>${escapeHtml(stage.title)}</b><small>${rec.completed?(rec.needsReview?'Revisão recomendada':'Concluído'):(unlocked?'Disponível':'Bloqueado')}</small></span></button>`;}).join('')}</section>`;}).join('')}</div>`;}
  function openTiaThamisHub(tab='welcome'){
    ensureDailyChallenges();const summary=educationSummary(),valid=(['welcome','plan','stages','progress','method'].includes(tab)?tab:'welcome'),plan=thamisPlanItems();
    const tabs=`<div class="thamis-tabs thamis-tabs-five"><button class="${valid==='welcome'?'active':''}" data-thamis-tab="welcome">👩‍🏫 Atendimento</button><button class="${valid==='plan'?'active':''}" data-thamis-tab="plan">🗂️ Plano</button><button class="${valid==='stages'?'active':''}" data-thamis-tab="stages">📚 Estágios</button><button class="${valid==='progress'?'active':''}" data-thamis-tab="progress">📈 Progresso</button><button class="${valid==='method'?'active':''}" data-thamis-tab="method">🧠 Método</button></div>`;
    const content=valid==='welcome'?`<section class="thamis-pane"><div class="thamis-highlight"><b>${OTTON_BRAND.platform}</b><p>${thamisWelcomeLine()}</p><div class="button-grid"><button data-thamis-recommended class="primary">▶️ Fazer tarefa recomendada</button><button data-thamis-plan>🗂️ Ver plano do dia</button><button data-thamis-stages>📚 Ver todos os estágios</button><button data-thamis-speak>🔊 Ouvir a Tia Thamis</button></div></div><div class="academy-start">${Object.keys(EDUCATION_SUBJECTS).map(id=>{const s=EDUCATION_SUBJECTS[id],snap=educationSubjectSnapshot(id),stage=educationStageData(id,snap.nextLevel);return`<button data-thamis-play="${id}" data-thamis-level="${snap.nextLevel}"><span>${s.icon}</span><b>${escapeHtml(s.title)}</b><small>Continuar em ${stage.code} • ${escapeHtml(stage.title)}</small></button>`;}).join('')}</div></section>`:valid==='plan'?`<section class="thamis-pane"><div class="thamis-card-grid">${plan.map((item,index)=>`<article class="thamis-card"><small>${item.icon} PASSO ${index+1}</small><b>${escapeHtml(item.title)}</b><p>${escapeHtml(item.text)}</p>${item.kind==='play'?`<button class="btn primary" data-thamis-play="${item.subject}" data-thamis-level="${item.level}">Começar agora</button>`:item.kind==='daily'?`<button class="btn primary" data-thamis-daily>Abrir desafios</button>`:item.kind==='stages'?`<button class="btn primary" data-thamis-stages>Ver estágios</button>`:`<button class="btn primary" data-thamis-fullhub>Ver trilha</button>`}</article>`).join('')}</div></section>`:valid==='stages'?`<section class="thamis-pane">${thamisStagesHtml()}</section>`:valid==='progress'?`<section class="thamis-pane">${thamisProgressHtml()}</section>`:`<section class="thamis-pane"><div class="thamis-card"><small>${OTTON_BRAND.method}</small><b>Como a Tia Thamis organiza o aprendizado</b><p>O ${OTTON_BRAND.platform} usa tarefas originais e progressivas de matemática, português e inglês. O aluno avança por domínio, recebe revisão quando necessário e acompanha precisão, fluência e constância.</p></div>${thamisMethodHtml()}</section>`;
    openModal(`${OTTON_BRAND.mentor} • ${OTTON_BRAND.platform}`,`<div class="thamis-console"><div class="academy-banner thamis-banner"><div>👩‍🏫</div><section><b>${OTTON_BRAND.method}</b><span>Estudo individualizado, pequenos passos, revisão e autonomia dentro do mundo do Otto.</span></section></div><div class="learning-top"><div><b>🔥 ${state.daily.streak||1}</b><small>sequência</small></div><div><b>👑 ${state.learning.crowns||0}</b><small>coroas</small></div><div><b>⭐ ${summary.pct}%</b><small>trilha</small></div><div><b>🏆 ${state.learning.perfectLessons||0}</b><small>perfeitas</small></div></div>${tabs}<div class="thamis-content">${content}</div></div>`,root=>{
      root.onclick=e=>{const tabBtn=e.target.closest('[data-thamis-tab]'),playBtn=e.target.closest('[data-thamis-play]'),dailyBtn=e.target.closest('[data-thamis-daily]'),hubBtn=e.target.closest('[data-thamis-fullhub]'),recBtn=e.target.closest('[data-thamis-recommended]'),speakBtn=e.target.closest('[data-thamis-speak]'),planBtn=e.target.closest('[data-thamis-plan]'),stagesBtn=e.target.closest('[data-thamis-stages]');if(tabBtn){openTiaThamisHub(tabBtn.dataset.thamisTab);return;}if(playBtn){startSoloEducationGame(playBtn.dataset.thamisPlay,Number(playBtn.dataset.thamisLevel)||1);return;}if(dailyBtn){openEducationHub('daily');return;}if(hubBtn){openEducationHub(String(state.learning.lastLesson||'math').split('-')[0]);return;}if(planBtn){openTiaThamisHub('plan');return;}if(stagesBtn){openTiaThamisHub('stages');return;}if(recBtn){const rec=recommendedEducationTarget();startSoloEducationGame(rec.subject,rec.level);return;}if(speakBtn){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(thamisWelcomeLine().replace(/<[^>]+>/g,''));u.lang='pt-BR';u.rate=.94;u.pitch=1.04;speechSynthesis.speak(u);}catch{toast('Áudio não disponível neste aparelho.','warn',1800);}return;}};
    });
  }
  function openEducationHub(tab='math'){
    ensureDailyChallenges();const summary=educationSummary(),valid=(EDUCATION_SUBJECTS[tab]||tab==='multiplayer'||tab==='daily')?tab:'math';
    const tabs=`<div class="edu-tabs"><button data-edu-tab="math" class="${valid==='math'?'active':''}">🔢 Matemática</button><button data-edu-tab="portuguese" class="${valid==='portuguese'?'active':''}">📚 Português</button><button data-edu-tab="english" class="${valid==='english'?'active':''}">🌎 English</button><button data-edu-tab="multiplayer" class="${valid==='multiplayer'?'active':''}">⚔️ Duelo</button><button data-edu-tab="daily" class="${valid==='daily'?'active':''}">🎯 Diários</button></div>`;
    const startCards=`<div class="academy-start">${Object.keys(EDUCATION_SUBJECTS).map(id=>{const s=EDUCATION_SUBJECTS[id],snap=educationSubjectSnapshot(id),stage=educationStageData(id,snap.nextLevel);return`<button data-academy-start="${id}" data-academy-level="${snap.nextLevel}"><span>${s.icon}</span><b>${escapeHtml(s.title)}</b><small>${stage.code} • ${escapeHtml(stage.title)}</small></button>`;}).join('')}</div>`;
    const multi=`<div class="edu-multiplayer-intro"><div>⚔️</div><h3>Duelo educativo em tempo real</h3><p>Escolha um jogador online, envie o convite e os dois recebem a mesma partida. O convite aparece na tela com <b>Aceitar e jogar</b>.</p><button class="btn primary xl" data-open-online>Escolher jogador online</button></div>`;
    const content=valid==='daily'?`<div class="daily-header"><b>Desafios de hoje</b><span>Complete atividades dentro do mundo aberto.</span></div><div class="daily-list">${dailyChallengesHtml()}</div>`:valid==='multiplayer'?multi:`${startCards}${educationSubjectHtml(valid)}`;
    openModal(`${OTTON_BRAND.platform} • ${playerDisplayName()}`,`<div class="academy-banner"><div>🎓</div><section><b>${OTTON_BRAND.method}</b><span>Aprenda jogando dentro do mundo aberto do Otto.</span></section></div><div class="learning-top"><div><b>🔥 ${state.daily.streak||1}</b><small>sequência</small></div><div><b>👑 ${state.learning.crowns||0}</b><small>coroas</small></div><div><b>⭐ ${summary.pct}%</b><small>trilha</small></div></div>${tabs}<div class="learning-content">${content}</div>`,root=>{
      root.onclick=e=>{const tabBtn=e.target.closest('[data-edu-tab]'),playBtn=e.target.closest('[data-edu-play]'),startBtn=e.target.closest('[data-academy-start]'),claimBtn=e.target.closest('[data-daily-claim]'),onlineBtn=e.target.closest('[data-open-online]');if(tabBtn){openEducationHub(tabBtn.dataset.eduTab);return;}if(startBtn){startSoloEducationGame(startBtn.dataset.academyStart,Number(startBtn.dataset.academyLevel)||1);return;}if(playBtn){startSoloEducationGame(playBtn.dataset.eduPlay,Number(playBtn.dataset.eduLevel));return;}if(claimBtn){claimDailyQuest(Number(claimBtn.dataset.dailyClaim));return;}if(onlineBtn){openSocialHub();}};
    });
  }
  function openChallengeHub(tab='math'){openEducationHub(tab==='path'?'math':tab);}
  function openDailyChallenges(){openEducationHub('daily');}
  function runEducationGame({subject,level=1,seed=Date.now(),rounds=5,multiplayer=false,opponent='',onFinish=null}){
    const def=EDUCATION_SUBJECTS[subject]||EDUCATION_SUBJECTS.math,stage=educationStageData(subject,level),items=generateEducationRounds(subject,level,seed,rounds);let step=0,hearts=3,score=0,locked=false,sequence=[],mistakes=0;const started=performance.now(),criteria=educationStageCriteria(level,items.length);
    const complete=()=>{const elapsed=Math.round(performance.now()-started),result={score,total:items.length,elapsed,subject,level,mistakes,criteria};if(onFinish)return onFinish(result);finishSoloEducationGame(result);};
    const render=()=>{if(step>=items.length||hearts<=0)return complete();const q=items[step],progress=Math.round(step/items.length*100),speak=q.speak?`<button class="edu-speak" data-edu-speak>🔊 Ouvir</button>`:'',joiner=q.joiner??'';
      const options=q.kind==='sequence'?`<div class="sequence-built" id="sequenceBuilt">${sequence.join(joiner)||'Toque nos blocos'}</div><div class="sequence-options">${q.tokens.map((t,i)=>`<button data-sequence-token="${i}">${escapeHtml(String(t))}</button>`).join('')}</div><div class="sequence-actions"><button data-sequence-clear>Limpar</button><button class="primary" data-sequence-check>Confirmar</button></div>`:`<div class="edu-options">${q.options.map((opt,i)=>`<button data-edu-answer="${escapeHtml(String(opt))}"><span>${String.fromCharCode(65+i)}</span>${escapeHtml(String(opt))}</button>`).join('')}</div>`;
      openModal(multiplayer?`Duelo: ${def.title}`:`${stage.code} • ${stage.title}`,`<div class="lesson-hud"><b>❤️ ${hearts}</b><div><i style="width:${progress}%"></i></div><b>${step+1}/${items.length}</b></div>${multiplayer?`<div class="duel-opponent">⚔️ contra <b>${escapeHtml(opponent)}</b></div>`:''}<div class="edu-stage-meta"><b>${def.icon} ${escapeHtml(def.title)}</b><span>${escapeHtml(stage.goal)}</span><small>Meta de domínio: ${criteria.minScore}/${items.length} • tempo de referência ${Math.round(criteria.targetMs/1000)}s</small></div><div class="edu-question" style="--edu:${def.color}"><small>${stage.code} • ${escapeHtml(stage.title)}</small><div class="edu-visual">${q.visual}</div><h3>${q.prompt}</h3>${speak}</div>${options}<div id="eduFeedback" class="lesson-feedback" hidden></div>`,root=>{
        if(q.autoSpeak)setTimeout(()=>speakKidWord(q.speak),180);$('[data-edu-speak]',root)?.addEventListener('click',()=>speakKidWord(q.speak));
        const resolveAnswer=(answer,button=null)=>{if(locked)return;locked=true;const correct=String(answer).trim().toUpperCase()===String(q.answer).trim().toUpperCase(),feedback=$('#eduFeedback',root);if(correct){score++;state.learning.totalCorrect++;button?.classList.add('correct');feedback.hidden=false;feedback.className='lesson-feedback good';feedback.innerHTML=`<b>Correto!</b><span>${escapeHtml(thamisDialogue('correct',step+level))}</span>`;beep(780,80);addXP(5);}else{hearts--;mistakes++;button?.classList.add('wrong');feedback.hidden=false;feedback.className='lesson-feedback bad';feedback.innerHTML=`<b>Vamos corrigir.</b><span>${escapeHtml(thamisDialogue('wrong',step+level))} Resposta: ${escapeHtml(q.displayAnswer||q.answer)}</span>`;beep(180,110,'sawtooth');}setTimeout(()=>{step++;sequence=[];locked=false;render();},900);};
        $$('[data-edu-answer]',root).forEach(btn=>btn.onclick=()=>resolveAnswer(btn.dataset.eduAnswer,btn));
        $$('[data-sequence-token]',root).forEach(btn=>btn.onclick=()=>{if(locked||btn.disabled)return;sequence.push(q.tokens[Number(btn.dataset.sequenceToken)]);btn.disabled=true;$('#sequenceBuilt',root).textContent=sequence.join(joiner);});
        $('[data-sequence-clear]',root)?.addEventListener('click',()=>{sequence=[];render();});$('[data-sequence-check]',root)?.addEventListener('click',()=>resolveAnswer(sequence.join(joiner),$('[data-sequence-check]',root)));
      });
    };render();
  }
  function startSoloEducationGame(subject,level){try{closeChallengePrompt();level=clamp(Number(level)||1,1,(SUBJECT_LEVELS[subject]||SUBJECT_LEVELS.math).length);runEducationGame({subject,level,seed:Date.now(),rounds:educationStageRoundCount(level)});}catch(error){console.error('Otton Connect:',error);toast('Não foi possível abrir a tarefa. Atualize a página.','bad',3000);}}
  function finishSoloEducationGame(result){
    const criteria=educationStageCriteria(result.level,result.total),passed=result.score>=criteria.minScore,fastEnough=result.elapsed<=criteria.targetMs,perfect=result.score===result.total,stars=passed?(perfect&&fastEnough?3:(perfect||fastEnough)?2:1):0,key=`${result.subject}-${result.level}`,old=subjectLevelRecord(result.subject,result.level),mastery=Math.round(result.score/Math.max(1,result.total)*100),needsReview=!perfect||!fastEnough;
    state.learning.lessons[key]={...old,completed:old.completed||passed,stars:Math.max(old.stars||0,stars),best:Math.max(old.best||0,result.score),attempts:(old.attempts||0)+1,lastScore:result.score,lastTotal:result.total,lastElapsed:result.elapsed,bestElapsed:old.bestElapsed?Math.min(old.bestElapsed,result.elapsed):result.elapsed,mastery:Math.max(old.mastery||0,mastery),needsReview:passed?needsReview:true,updatedAt:Date.now()};
    state.learning.lastLesson=key;state.learning.subjectXP[result.subject]=(state.learning.subjectXP[result.subject]||0)+result.score*10;const stage=educationStageData(result.subject,result.level),seconds=Math.round(result.elapsed/1000);
    if(passed){state.learning.crowns+=(old.completed?0:1);if(perfect)state.learning.perfectLessons++;const coins=30+stars*18;addCoins(coins);addXP(25+stars*12);awardMedal(perfect?`${EDUCATION_SUBJECTS[result.subject].title} ${stage.code} Perfeito`:`${stage.code} • ${stage.title}`);saveState(true);const line=perfect?thamisDialogue('perfect',result.level):thamisDialogue('pass',result.level);openModal(`${stage.code} concluído!`,`<div class="lesson-result"><div>${perfect?'🏆':'🎉'}</div><h3>${result.score}/${result.total}</h3><p>${'⭐'.repeat(stars)} • ${seconds}s • ${coins} moedas</p><div class="thamis-result-note"><b>👩‍🏫 Tia Thamis</b><span>${escapeHtml(line)}</span>${needsReview?'<small>Esta etapa continuará marcada para revisão até ganhar mais precisão ou fluência.</small>':'<small>Domínio forte: etapa pronta para seguir adiante.</small>'}</div><button class="btn primary" data-edu-continue>Continuar</button>${needsReview?'<button class="btn" data-edu-review>Revisar agora</button>':''}</div>`,root=>{ $('[data-edu-continue]',root).onclick=()=>openEducationHub(result.subject);$('[data-edu-review]',root)?.addEventListener('click',()=>startSoloEducationGame(result.subject,result.level));});
    }else{saveState(true);openModal('Revisão necessária',`<div class="lesson-result"><div>🔁</div><h3>${result.score}/${result.total}</h3><p>Para dominar esta etapa, a meta é ${criteria.minScore}/${result.total}.</p><div class="thamis-result-note"><b>👩‍🏫 Tia Thamis</b><span>${escapeHtml(thamisDialogue('retry',result.level))}</span></div><button class="btn primary" data-edu-retry>Nova rodada</button><button class="btn" data-edu-back>Voltar ao plano</button></div>`,root=>{$('[data-edu-retry]',root).onclick=()=>startSoloEducationGame(result.subject,result.level);$('[data-edu-back]',root).onclick=()=>openTiaThamisHub('plan');});}
  }

  let cinematicEmoteTimer=0;
  function startCinematicEmote(type,duration=2800){
    if(!['dance','play','selfie','highfive','hug'].includes(type))return;clearTimeout(cinematicEmoteTimer);document.body.classList.add('cinematic-emote');cinematicEmoteTimer=setTimeout(()=>document.body.classList.remove('cinematic-emote'),Math.max(900,duration));
  }
  function triggerEmote(type,npc=null){
    const duration=type==='selfie'?5200:type==='dance'?3200:2400;startCinematicEmote(type,duration);player.emoteType=type;player.emoteUntil=performance.now()+duration;player.emoteSeq=(player.emoteSeq||0)+1;
    if(npc){npc.emoteType=type;npc.emoteUntil=performance.now()+duration;}
    if(['dance','play','selfie','highfive','hug'].includes(type)){
      const token=String(performance.now());triggerEmote.cinemaToken=token;document.body.classList.add('social-moment');
      setTimeout(()=>{if(triggerEmote.cinemaToken===token)document.body.classList.remove('social-moment');},duration+180);
    }
    if(type==='play')state.needs.fun=clamp(state.needs.fun+8,0,100);
    const msg={wave:'Acenou!',dance:'Hora da dança!',play:'Hora de brincar!',selfie:'Selfie da amizade!',highfive:'Toca aqui!',hug:'Abraço de amizade!'};toast(msg[type]||'Ação social!','good',1100);beep(type==='highfive'?820:type==='play'?700:620,55);vibrate(15);addXP(3);
  }

  function openQuiz(){openEducationHub('math');}
  window.OTTHI_TIA_THAMIS={open:openTiaThamisHub,recommend:recommendedEducationTarget,plan:thamisPlanItems,stages:SUBJECT_LEVELS,stage:educationStageData,dialogue:thamisDialogue};


  function openCollection() {
    const medals = state.medals.length ? state.medals.map(m => `<div class="inventory-item"><b>🏅</b><span>${m}</span></div>`).join('') : '<p>Nenhuma medalha ainda. Complete missões, quiz e desafios.</p>';
    openModal('Coleção e conquistas', `<div class="inventory-grid">${medals}</div>`);
  }

  const avatarCatalog = {
    outfit: [
      ['classic','Clássico','⬛'], ['blue','Jaqueta azul','🟦'], ['red','Jaqueta vermelha','🟥'], ['explorer','Explorador','🟩']
    ],
    hat: [
      ['none','Sem chapéu','🚫'], ['cap','Boné','🧢'], ['crown','Coroa','👑'], ['helmet','Capacete','⛑️']
    ],
    accessory: [
      ['none','Sem acessório','🚫'], ['backpack','Mochila','🎒'], ['glasses','Óculos','🕶️'], ['cape','Capa','🦸']
    ],
    uniform: [
      ['none','Roupa livre','👕'], ['firefighter','Bombeiro Kids','🚒'], ['police','Patrulha Kids','👮'], ['paramedic','Socorrista Kids','🚑'], ['teacher','Professor','🧑‍🏫'], ['delivery','Entregador','📦'], ['mechanic','Mecânico Kids','🔧'], ['miner','Minerador Kids','⛏️'], ['builder','Construtor Kids','🦺']
    ]
  };
