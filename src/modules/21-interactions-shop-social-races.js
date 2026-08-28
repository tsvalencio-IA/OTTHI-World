/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 21-interactions-shop-social-races.js
 * Escopo: Atividades, mercado, oficina, amizades, NPCs e corridas
 * Linhas de origem V642: 3241-3415
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function useActivity(type,house){
    if(type==='bed'){
      player.sitUntil=performance.now()+1400;state.needs.energy=100;state.needs.hunger=Math.max(0,state.needs.hunger-4);setFlag('slept');addXP(20);toast('Você dormiu e salvou o jogo.','good');saveState(true);
    }else if(type==='sofa'){
      player.sitUntil=performance.now()+2400;state.needs.fun=clamp(state.needs.fun+20,0,100);toast('Sentou no sofá.','good');addXP(5);
    }else if(type==='tv'){
      player.sitUntil=performance.now()+3000;state.needs.fun=clamp(state.needs.fun+34,0,100);state.needs.energy=clamp(state.needs.energy-3,0,100);toast(`Assistindo ao desenho de ${playerDisplayName()}!`,'good');addXP(8);
    }else if(type==='fridge'){
      openModal('Geladeira',`<p>Comida disponível: <b>${state.inventory.food}</b></p><div class="modal-actions"><button class="btn primary" data-eat>Comer lanche</button><button class="btn" data-close>Fechar</button></div>`,root=>{
        $('[data-eat]',root).onclick=()=>{if(state.inventory.food<=0){toast('A geladeira está vazia.','warn');return;}state.inventory.food--;state.needs.hunger=clamp(state.needs.hunger+32,0,100);setFlag('ateMeal');addXP(12);saveState();closeModal();toast('Lanche delicioso!','good');};$('[data-close]',root).onclick=closeModal;
      });
    }else if(type==='stove'){
      openModal('Cozinha',`<p>Cozinhar custa 1 comida e recupera muita fome.</p><div class="modal-actions"><button class="btn primary" data-cook>Cozinhar refeição</button><button class="btn" data-close>Cancelar</button></div>`,root=>{
        $('[data-cook]',root).onclick=()=>{if(state.inventory.food<=0){toast('Você precisa comprar ou colher comida.','warn');return;}state.inventory.food--;state.stats.cooked++;trackDaily('cook',1);state.needs.hunger=100;state.needs.fun=clamp(state.needs.fun+8,0,100);setFlag('ateMeal');addXP(20);saveState();closeModal();toast('Refeição pronta!','good');};$('[data-close]',root).onclick=closeModal;
      });
    }else if(type==='sink'){
      if(state.inventory.water>0)state.inventory.water--;state.needs.hunger=clamp(state.needs.hunger+5,0,100);state.needs.hygiene=clamp(state.needs.hygiene+8,0,100);toast('Bebeu água.','good');saveState();
    }else if(type==='shower'){
      state.needs.hygiene=100;state.needs.energy=clamp(state.needs.energy-2,0,100);player.sitUntil=performance.now()+1800;toast('Banho tomado!','good');addXP(8);saveState();
    }else if(type==='chest')openHomeChest();
    else if(type==='shop')openShop();
    else if(type==='workshop')openWorkshop();
    else if(type==='wardrobe')openAvatarStudio();
    else if(type==='school'){if(state.career.activeJob?.id==='teacher')openTeacherJobLesson(house);else openEducationHub(String(state.learning.lastLesson||'math').split('-')[0]);}
    else if(type==='police'){if(state.career.activeJob?.id==='police')toast('Patrulha ativa: siga os pontos marcados no GPS.','good',2200);else openSafetyLesson('station');}
    else if(type==='firestation')openFireStationDesk();
    updateHUD();
  }
  function openShop(){
    ensureWorldEvolutionState?.();
    const items=[
      {name:'Comida',price:15,key:'food',amount:2,icon:'🍎',group:'Consumíveis'},
      {name:'Água',price:8,key:'water',amount:2,icon:'💧',group:'Consumíveis'},
      {name:'Iscas',price:12,key:'bait',amount:5,icon:'🪱',group:'Pesca'},
      {name:'Sementes',price:10,key:'seeds',amount:6,icon:'🌱',group:'Fazenda'},
      {name:'Trigo',price:14,key:'wheat',amount:2,icon:'🌾',group:'Fazenda'},
      {name:'Cenouras',price:14,key:'carrots',amount:2,icon:'🥕',group:'Fazenda'},
      {name:'Argila',price:20,key:'clay',amount:2,icon:'🟫',group:'Materiais'},
      {name:'Cristal',price:80,key:'crystals',amount:1,icon:'💎',group:'Especial'},
      {name:'Vara de pesca',price:65,key:'fishingRod',amount:1,icon:'🎣',group:'Pesca',unique:true},
      {name:'Madeira',price:18,key:'wood',amount:3,icon:'🪵',group:'Materiais'},
      {name:'Pedra',price:18,key:'stone',amount:3,icon:'🪨',group:'Materiais'},
      {name:'Blocos',price:25,key:'blocks',amount:4,icon:'🧱',group:'Construção'},
      {name:'Cercas',price:20,key:'fences',amount:3,icon:'🪵',group:'Construção'},
      {name:'Machado',price:45,tool:'axe',icon:'🪓',group:'Ferramentas'},
      {name:'Picareta',price:48,tool:'pickaxe',icon:'⛏️',group:'Ferramentas'},
      {name:'Balde',price:32,tool:'bucket',icon:'🪣',group:'Ferramentas'},
      {name:'Enxada',price:38,tool:'hoe',icon:'🧑‍🌾',group:'Ferramentas'},
      {name:'Pá',price:35,tool:'shovel',icon:'🪏',group:'Ferramentas'}
    ];
    const cards=items.map((item,i)=>{const owned=item.tool&&state.tools.owned.includes(item.tool);const unique=item.unique&&(state.inventory[item.key]||0)>0;return `<button class="choice shop-choice ${owned||unique?'owned':''}" data-buy="${i}" ${owned||unique?'disabled':''}><b>${item.icon} ${item.name}</b><span>${owned||unique?'Já possui':`${item.price} moedas — ${item.tool?'ferramenta':`+${item.amount}`}`}</span><small>${item.group}</small></button>`;}).join('');
    openModal('Mercadinho da Vila',`<div class="shop-wallet"><span>🪙 Moedas</span><b>${state.profile.coins}</b></div><p class="shop-help">Todos os itens essenciais podem ser comprados aqui, mas também podem ser obtidos jogando, coletando, cavando, plantando e pescando.</p><div class="choice-grid shop-complete-grid">${cards}</div>`,root=>{
      $$('[data-buy]',root).forEach(btn=>btn.onclick=()=>{const item=items[Number(btn.dataset.buy)];if(!item||btn.disabled)return;if(state.profile.coins<item.price){toast('Moedas insuficientes.','warn');return;}addCoins(-item.price);if(item.tool){state.tools.owned=[...new Set([...(state.tools.owned||[]),item.tool])];state.tools.equipped=item.tool;refreshEquippedToolVisual();}else state.inventory[item.key]=(state.inventory[item.key]||0)+item.amount;addXP(5);saveState(true);updateHUD();closeModal();toast(`${item.name} adquirido!`,'good');});
    });
  }
  function openWorkshop(){
    const inv=state.inventory;
    openModal('Oficina e Fundição',`<div class="workshop-header"><div>🛠️</div><section><h3>Ferramentas, veículos, construção e ouro</h3><p>Escolha uma melhoria. Os materiais só são consumidos depois do toque.</p></section></div><div class="resource-summary"><span>🪵 ${inv.wood}</span><span>🪨 ${inv.stone}</span><span>🟨 ${inv.goldOre||0}</span><span>🏅 ${inv.goldBar||0}</span></div><div class="choice-grid workshop-grid"><button class="choice" data-player-garage><b>🚗 Minha Garagem</b><span>Guardar, retirar, comprar e personalizar veículos</span></button><button class="choice" data-sword><b>✨ Ferramenta de aventura</b><span>2 madeiras + 2 pedras</span></button><button class="choice" data-blocks><b>🧱 Kit construção</b><span>1 madeira + 1 pedra</span></button><button class="choice" data-smelt><b>🏅 Fundir ouro</b><span>3 minérios → 1 barra</span></button></div>`,root=>{
      $('[data-player-garage]',root).onclick=()=>typeof openPlayerGarage==='function'?openPlayerGarage():toast('Garagem ainda carregando.','warn');
      $('[data-sword]',root).onclick=()=>{if(inv.wood<2||inv.stone<2){toast('Faltam materiais.','warn');return;}inv.wood-=2;inv.stone-=2;state.flags.swordUpgrade=(state.flags.swordUpgrade||0)+1;addXP(35);saveState();closeModal();toast('Ferramenta de aventura melhorada!','good');};
      $('[data-blocks]',root).onclick=()=>{if(inv.wood<1||inv.stone<1){toast('Faltam materiais.','warn');return;}inv.wood--;inv.stone--;inv.blocks+=3;inv.fences+=2;saveState();closeModal();toast('Kit de construção pronto!','good');};
      $('[data-smelt]',root).onclick=()=>{if((inv.goldOre||0)<3){toast('Você precisa de 3 minérios de ouro.','warn');return;}inv.goldOre-=3;inv.goldBar=(inv.goldBar||0)+1;addCoins(60);addXP(35);saveState(true);closeModal();toast('Barra de ouro criada: +60 moedas.','good',2200);};
    });
  }

  function friendshipTier(value){ return value>=60?'Melhor amigo':value>=30?'Amigo':value>=10?'Conhecido':'Vizinho'; }
  function changeFriendship(npc, amount, message){
    state.friendship[npc.id]=clamp((state.friendship[npc.id]||0)+amount,0,100);npc.friendship=state.friendship[npc.id];
    if(npc.id==='nino')setFlag('talkedNeighbor');
    if(message)toast(message,'good');addXP(Math.max(2,amount*2));addReputation(Math.max(1,Math.floor(amount/2)));evaluateMissions();saveState();
  }
  function talkToNPC(npc){
    if(npc.id==='maya'&&state.flags.deliveryActive&&player.vehicle&&distance2D(player,npc)<3.5){state.flags.deliveryActive=false;state.inventory.package=0;setFlag('deliveryDone');if(state.career.activeJob?.id==='delivery')completeActiveJob();else{addCoins(120);addReputation(30);}toast('Entrega concluída para Maya!','good',2400);}
    const value=state.friendship[npc.id]||0;
    const greetings={clara:'Sou Clara, professora. Na escola aprendemos brincando e respeitando todos.',rafa:'Sou Rafa, da patrulha educativa. Segurança vem sempre em primeiro lugar.',davi:'Sou Davi, bombeiro. Nossas missões são treinamentos controlados e seguros.',leo:'Sou Leo, entregador. Conhecer as melhores rotas deixa a cidade mais rápida.',nino:'Sou Nino. A vila tem casas, corridas e desafios esperando por você.',luna:'Quero ver sua casa cheia de estilo! Vamos decorar?',teo:'Trabalho e criatividade transformam materiais em conquistas.',bia:'Há cristais e caminhos secretos esperando por você.',maya:'Na garagem sempre existe um trabalho para quem quer crescer.'};
    openModal(npc.name,`<div class="dialogue-box">${greetings[npc.id]||'Olá, vizinho!'}</div><div class="friend-meter"><span>Amizade — ${friendshipTier(value)}</span><b>${value}/100</b><i style="width:${value}%"></i></div><div class="choice-grid social-actions">
      <button class="choice" data-social="talk"><b>💬 Conversar</b><span>Conhecer melhor</span></button>
      <button class="choice" data-social="joke"><b>😄 Contar piada</b><span>Aumenta diversão</span></button>
      <button class="choice" data-social="gift"><b>🎁 Dar presente</b><span>Usa comida ou cristal</span></button>
      <button class="choice" data-social="argue"><b>🤝 Resolver desacordo</b><span>Conversar com calma e respeito</span></button>
      <button class="choice" data-social="race"><b>🏃 Desafiar corrida</b><span>Corrida de velocidade</span></button>
      <button class="choice" data-social="coinrace"><b>🪙 Pega-moedas</b><span>Quem coleta mais?</span></button>
      <button class="choice" data-social="house"><b>🏠 Disputar casa</b><span>Ganhe uma propriedade</span></button>
      <button class="choice" data-social="job"><b>💼 Perguntar trabalho</b><span>Ganhar moedas</span></button>
      <button class="choice" data-social="invite"><b>🏡 Convidar para casa</b><span>Precisa de amizade 10</span></button>
      <button class="choice" data-social="wave"><b>👋 Acenar</b><span>Animação social rápida</span></button>
      <button class="choice" data-social="dance"><b>🕺 Dançar</b><span>Aumenta diversão</span></button>
      <button class="choice" data-social="play"><b>🎈 Brincar</b><span>Diversão e amizade</span></button>
      <button class="choice" data-social="selfie"><b>📸 Tirar selfie</b><span>Guarde uma lembrança</span></button>
      <button class="choice" data-social="follow"><b>${npc.following?'✋ Parar de seguir':'👣 Seguir junto'}</b><span>${npc.following?'Encerrar acompanhamento':'O vizinho acompanha você'}</span></button>
      <button class="choice" data-social="ride"><b>${(npc.pendingRide||npc.passengerMode)?'✋ Cancelar passeio':'🚗 Passear junto'}</b><span>${(npc.pendingRide||npc.passengerMode)?'Sair ou cancelar a carona':'Entra no próximo carro ou barco'}</span></button>
    </div>`,root=>{
      $$('[data-social]',root).forEach(btn=>btn.onclick=()=>{
        const action=btn.dataset.social;
        if(action==='talk'){state.stats.talks++;trackDaily('talk',1);changeFriendship(npc,2,`${npc.name} gostou da conversa.`);closeModal();}
        else if(action==='joke'){state.social.jokes++;state.needs.fun=clamp(state.needs.fun+12,0,100);changeFriendship(npc,3,`${npc.name} riu da piada!`);closeModal();}
        else if(action==='gift'){
          if(state.inventory.food>0){state.inventory.food--;state.social.gifts++;changeFriendship(npc,7,'Presente entregue!');closeModal();}
          else if(state.inventory.crystals>0){state.inventory.crystals--;state.social.gifts++;changeFriendship(npc,10,'Cristal presenteado!');closeModal();}
          else toast('Você não tem comida nem cristal para presentear.','warn');
        } else if(action==='argue'){
          state.social.arguments=(state.social.arguments||0)+1;state.friendship[npc.id]=clamp((state.friendship[npc.id]||0)+2,0,100);state.profile.reputation+=1;saveState(true);updateHUD();closeModal();toast(`${npc.name} e você resolveram tudo conversando.`,'good');
        } else if(action==='race'){closeModal();startRace('sprint',npc);}
        else if(action==='coinrace'){closeModal();startRace('coins',npc);}
        else if(action==='house'){closeModal();openHouseChallenge(npc);}
        else if(action==='job'){closeModal();openJobCenter(npc.id);}
        else if(action==='invite'){
          if((state.friendship[npc.id]||0)<10){toast('A amizade precisa chegar a 10.','warn');return;}
          if(!state.social.invited.includes(npc.id))state.social.invited.push(npc.id);changeFriendship(npc,2,`${npc.name} aceitou visitar sua casa!`);closeModal();
        }else if(action==='wave'){triggerEmote('wave',npc);changeFriendship(npc,1);closeModal();}
        else if(action==='dance'){triggerEmote('dance',npc);state.needs.fun=clamp(state.needs.fun+10,0,100);changeFriendship(npc,2);closeModal();}
        else if(action==='play'){triggerEmote('play',npc);state.needs.fun=clamp(state.needs.fun+14,0,100);changeFriendship(npc,3,`${npc.name} adorou brincar!`);closeModal();}
        else if(action==='selfie'){triggerEmote('selfie',npc);state.flags.selfies=(state.flags.selfies||0)+1;changeFriendship(npc,2);closeModal();}
        else if(action==='follow'){const stopping=!!npc.following;npc.following=!stopping;if(stopping){npc.pendingRide=false;npc.passengerMode=null;if(npc.group)npc.group.visible=true;}toast(stopping?`${npc.name} parou de acompanhar você.`:`${npc.name} vai acompanhar você.`,'good');closeModal();}
        else if(action==='ride'){if(npc.pendingRide||npc.passengerMode){npc.pendingRide=false;npc.following=false;npc.passengerMode=null;if(npc.group)npc.group.visible=true;toast(`Passeio com ${npc.name} cancelado.`,'good');}else{npc.pendingRide=true;npc.following=true;toast(`${npc.name} vai entrar no próximo carro ou barco com você.`,'good',2400);}closeModal();}
      });
    });
  }

  function openHouseChallenge(npc){
    const options=world.houses.filter(h=>!h.publicBuilding&&!state.houses[h.id]?.owned);
    if(!options.length){toast('Você já conquistou todas as casas disponíveis.','good');return;}
    openModal('Disputa de propriedade',`<p>Vença ${npc.name} numa corrida para conquistar a casa escolhida.</p><div class="choice-grid">${options.map(h=>`<button class="choice" data-house-race="${h.id}"><b>🏠 ${h.name}</b><span>Prêmio: propriedade destrancada</span></button>`).join('')}</div>`,root=>{
      $$('[data-house-race]',root).forEach(btn=>btn.onclick=()=>{const id=btn.dataset.houseRace;closeModal();startRace('sprint',npc,id);});
    });
  }
  function openRaceCenter(npc=null){
    const name=npc?.name||'um atleta da vila';
    openModal('🏃 Atletismo OTTHI',`<p>Corra <b>pela pista real</b>. As voltas só contam passando pelos setores na ordem — cortar pelo campo não funciona.</p><div class="choice-grid"><button class="choice" data-race="sprint"><b>⚡ Volta rápida</b><span>1 volta • duelo contra ${name}</span></button><button class="choice" data-race="twoLaps"><b>🏃 Duas voltas</b><span>ritmo, ultrapassagem e resistência</span></button><button class="choice" data-race="coins"><b>🏅 Pega-medalhas</b><span>colete 10 medalhas espalhadas nas raias</span></button></div>`,root=>{
      $$('[data-race]',root).forEach(btn=>btn.onclick=()=>{closeModal();startRace(btn.dataset.race,npc||world.npcs[0]);});
    });
  }
  function createRaceOpponent(npc){
    if(typeof v705Athlete==='function'){const athlete=v705Athlete(npc?.color||0xff72b6,0,0,npc?.name||'Atleta','field',1.04);athlete.group.userData.raceAthlete=athlete;return athlete.group;}
    const group=new THREE.Group();worldGroup.add(group);box(.78,1.12,.55,npc?.color||0xff72b6,0,1.1,0,group);box(.68,.68,.68,0xffd3a0,0,2.0,0,group);box(.08,.08,.04,0x111827,-.15,2.05,.36,group);box(.08,.08,.04,0x111827,.15,2.05,.36,group);return group;
  }
  function athleticsRacePoint(gym,t,lane=0){if(typeof v705AthleticsPoint==='function')return v705AthleticsPoint(gym,t,lane);const a=-Math.PI/2+((t%1+1)%1)*Math.PI*2,rx=(gym.radiusX||26)+lane,rz=(gym.radiusZ||14)+lane*.53;return{x:gym.centerX+Math.cos(a)*rx,z:gym.centerZ+Math.sin(a)*rz,heading:Math.atan2(-Math.sin(a)*rx,Math.cos(a)*rz)};}
  function athleticsRaceProgress(gym,x,z){if(typeof v705AthleticsProgress==='function')return v705AthleticsProgress(gym,x,z);const a=Math.atan2((z-gym.centerZ)/(gym.radiusZ||14),(x-gym.centerX)/(gym.radiusX||26)),raw=(a+Math.PI/2)/(Math.PI*2);return(raw%1+1)%1;}
  function athleticsTrackApproxLength(gym){const a=Math.max(gym.radiusX||26,gym.radiusZ||14),b=Math.min(gym.radiusX||26,gym.radiusZ||14);return Math.PI*(3*(a+b)-Math.sqrt((3*a+b)*(a+3*b)));}
  function clearRaceObjects(){
    if(activeRace?.opponent)worldGroup.remove(activeRace.opponent);
    for(const coin of world.raceCoins)worldGroup.remove(coin.mesh);
    world.raceCoins=[];
  }
  function spawnRaceCoins(gym=world.gym){
    world.raceCoins=[];
    for(let i=0;i<12;i++){const point=athleticsRacePoint(gym,(i+.5)/12,(i%3-1)*.75),mesh=cylinder(.35,.12,0xffd84d,point.x,.72,point.z,worldGroup,18);mesh.rotation.x=Math.PI/2;world.raceCoins.push({x:point.x,z:point.z,mesh,got:false,index:i});}
  }
  function startRace(type,npc,housePrize=null){
    if(activeRace){toast('Termine o desafio atual.','warn');return;}
    if(currentHouse)exitHouse();
    const gym=world.gym;if(!gym){toast('Pista de atletismo ainda não carregou.','warn');return;}
    const opponent=createRaceOpponent(npc||world.npcs[0]),start=athleticsRacePoint(gym,0,0),opponentStart=athleticsRacePoint(gym,0,1.0),lapsTarget=type==='twoLaps'?2:1;
    opponent.position.set(opponentStart.x,0,opponentStart.z);opponent.rotation.y=opponentStart.heading;
    activeRace={type,npcId:npc?.id||'nino',npcName:npc?.name||'Nino',housePrize,startAt:performance.now()+3000,started:false,opponent,opponentT:0,opponentLap:0,opponentScore:0,playerScore:0,timeLimit:type==='coins'?55:type==='twoLaps'?72:38,lapsTarget,playerLap:0,nextGate:1,gateCount:12,lastGateAt:0,trackLength:athleticsTrackApproxLength(gym),lastOpponentCoin:0};
    player.x=start.x;player.z=start.z;player.y=v705GroundY? v705GroundY(start.x,start.z):0;player.vx=player.vz=player.vy=0;player.facing=start.heading;cameraYaw=start.heading+Math.PI;cameraMode='openworld';const entrance=worldLayoutPoint('sportsEntrance');state.waypoint={id:'gym',name:'Pista de Atletismo',x:entrance.x,z:entrance.z};updateWaypointMarker();
    if(type==='coins')spawnRaceCoins(gym);
    els.raceBadge.hidden=false;if(typeof ensureSportExitButton==='function')ensureSportExitButton(true);els.raceTitle.textContent=type==='coins'?'🏅 Pega-medalhas':type==='twoLaps'?'🏃 Duas voltas':housePrize?'🏠 Corrida pela casa':'⚡ Volta rápida';els.raceStatus.textContent='3...';toast(`Na pista contra ${activeRace.npcName}. Passe pelos setores na ordem.`, 'good',2600);saveState(true);
  }
  function finishRace(won){
    if(!activeRace)return;const race=activeRace;state.stats.races++;trackDaily('race',1);clearRaceObjects();activeRace=null;els.raceBadge.hidden=true;if(typeof ensureSportExitButton==='function')ensureSportExitButton(false);
    if(won){state.races.wins++;if(race.type==='coins')state.races.coinWins++;addCoins(race.type==='coins'?90:race.type==='twoLaps'?145:120);addReputation(18);addXP(race.type==='twoLaps'?85:70);setFlag(race.type==='coins'?'wonCoinRace':'wonRace');if(race.housePrize){const old=state.houses[race.housePrize]||{};state.houses[race.housePrize]={...old,owned:true,locked:false};state.races.houseWins++;setFlag('wonHouseChallenge');setFlag('boughtHouse');awardMedal('Casa Conquistada');}toast(race.housePrize?'Você venceu e conquistou a casa!':'Você venceu na pista!','good',2600);}else{state.races.losses++;toast(`${race.npcName} venceu. Tente novamente!`,'warn',2400);}
    const exit=worldLayoutPoint('sportsEntrance');player.x=exit.x;player.z=exit.z;player.y=v705GroundY? v705GroundY(exit.x,exit.z):0;player.vx=player.vz=player.vy=0;state.waypoint=null;updateWaypointMarker();saveState(true);evaluateMissions();
  }
  function updateRaceOpponentVisual(race,dt){const p=athleticsRacePoint(world.gym,race.opponentT,1.0),athlete=race.opponent?.userData?.raceAthlete;if(athlete&&typeof v705AnimateAthlete==='function'){athlete.group.position.x=p.x;athlete.group.position.z=p.z;athlete.group.position.y=v705GroundY? v705GroundY(p.x,p.z):0;athlete.group.rotation.y=p.heading;const swing=Math.sin(animTime*11)*.62;athlete.limbs.leftArm.rotation.x=lerp(athlete.limbs.leftArm.rotation.x,swing,.25);athlete.limbs.rightArm.rotation.x=lerp(athlete.limbs.rightArm.rotation.x,-swing,.25);athlete.limbs.leftLeg.rotation.x=lerp(athlete.limbs.leftLeg.rotation.x,-swing*.8,.25);athlete.limbs.rightLeg.rotation.x=lerp(athlete.limbs.rightLeg.rotation.x,swing*.8,.25);}else{race.opponent.position.set(p.x,0,p.z);race.opponent.rotation.y=p.heading;}}
  function updateRace(dt){
    if(!activeRace)return;const race=activeRace,gym=world.gym,now=performance.now();
    if(now<race.startAt){els.raceStatus.textContent=`${Math.max(1,Math.ceil((race.startAt-now)/1000))}...`;return;}
    if(!race.started){race.started=true;race.startedAt=now;els.raceStatus.textContent='VALENDO!';beep(880,100);}
    const elapsed=(now-race.startedAt)/1000;race.timeLeft=Math.max(0,race.timeLimit-elapsed);
    if(race.type==='coins'){
      race.opponentT=(race.opponentT+dt*.047)%1;updateRaceOpponentVisual(race,dt);if(elapsed-race.lastOpponentCoin>3.8){race.lastOpponentCoin=elapsed;race.opponentScore++;}
      for(const coin of world.raceCoins){if(coin.got)continue;coin.mesh.rotation.y+=dt*5;if(Math.hypot(player.x-coin.x,player.z-coin.z)<1.25){coin.got=true;coin.mesh.visible=false;race.playerScore++;beep(920,45);}}
      els.raceStatus.textContent=`Você ${race.playerScore}/10 • ${race.npcName} ${race.opponentScore}/10 • ${Math.ceil(race.timeLeft)}s`;if(race.playerScore>=10)finishRace(true);else if(race.opponentScore>=10)finishRace(false);else if(race.timeLeft<=0)finishRace(race.playerScore>race.opponentScore);return;
    }
    const opponentPace=race.type==='twoLaps'?.050:.053;race.opponentT+=opponentPace*dt;if(race.opponentT>=1){race.opponentT-=1;race.opponentLap++;}updateRaceOpponentVisual(race,dt);
    const gate=athleticsRacePoint(gym,race.nextGate/race.gateCount,0),gateDist=Math.hypot(player.x-gate.x,player.z-gate.z);if(gateDist<3.0&&now-Number(race.lastGateAt||0)>450){race.lastGateAt=now;if(race.nextGate===0){race.playerLap++;race.nextGate=1;beep(980,65);toast(`Volta ${race.playerLap}/${race.lapsTarget}`,'good',850);}else{race.nextGate++;if(race.nextGate>=race.gateCount)race.nextGate=0;}}
    const trackProgress=athleticsRaceProgress(gym,player.x,player.z),trackPoint=athleticsRacePoint(gym,trackProgress,0),offTrack=Math.hypot(player.x-trackPoint.x,player.z-trackPoint.z);if(offTrack>4.8&&now-Number(race.offTrackWarnAt||0)>1500){race.offTrackWarnAt=now;toast('Volte para as raias — cortar o campo não valida a volta.','warn',1200);}
    const playerProgress=race.playerLap+trackProgress,opponentProgress=race.opponentLap+race.opponentT,pos=playerProgress>=opponentProgress?1:2;els.raceStatus.textContent=`Volta ${Math.min(race.lapsTarget,race.playerLap+1)}/${race.lapsTarget} • ${pos}º/2 • setor ${race.nextGate}/${race.gateCount-1} • ${race.timeLeft.toFixed(1)}s`;
    if(race.playerLap>=race.lapsTarget)finishRace(true);else if(race.opponentLap>=race.lapsTarget||race.timeLeft<=0)finishRace(false);
  }


  const JOBS = [
    {id:'delivery',title:'Entregador da Vila',icon:'📦',reward:120,rep:30,description:'Pegue o carrinho e entregue o pacote para Maya.'},
    {id:'police',title:'Patrulha Educativa',icon:'👮',reward:160,rep:38,description:'Visite três pontos da cidade e oriente o trânsito com segurança.'},
    {id:'firefighter',title:'Bombeiro Kids',icon:'🚒',reward:180,rep:42,description:'Vista o uniforme, dirija o caminhão dos bombeiros e atenda uma emergência controlada.'},
    {id:'paramedic',title:'Socorrista da Vila',icon:'🚑',reward:175,rep:40,description:'Vista o uniforme, dirija a ambulância e responda a um acidente com segurança.'},
    {id:'teacher',title:'Professor por um Dia',icon:'🧑‍🏫',reward:150,rep:34,description:'Vá a uma escola e conduza uma atividade educativa.'},
    {id:'gather',title:'Ajudante da Oficina',icon:'🪵',reward:90,rep:18,description:'Colete 3 madeiras e 2 pedras.',target:{wood:3,stone:2}},
    {id:'crystals',title:'Explorador de Cristais',icon:'💎',reward:140,rep:24,description:'Colete 3 novos cristais.',target:{crystals:3}},
    {id:'builder',title:'Decorador do Bairro',icon:'🧱',reward:110,rep:20,description:'Construa 2 objetos perto de uma casa.',target:{builds:2}}
  ];
  const MISSION_STATES=Object.freeze({LOCKED:'LOCKED',AVAILABLE:'AVAILABLE',ACCEPTED:'ACCEPTED',PREPARING:'PREPARING',TRAVELLING:'TRAVELLING',AT_LOCATION:'AT_LOCATION',ACTION_REQUIRED:'ACTION_REQUIRED',RETURNING:'RETURNING',COMPLETING:'COMPLETING',COMPLETED:'COMPLETED',CANCELLED:'CANCELLED',FAILED_SAFE:'FAILED_SAFE'});
  const JOB_UNIFORMS={delivery:'delivery',police:'police',firefighter:'firefighter',paramedic:'paramedic',teacher:'teacher',gather:'mechanic',crystals:'miner',builder:'builder'};
