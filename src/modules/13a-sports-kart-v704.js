/**
 * OTTHI World V704 — complexo esportivo e kartódromo jogáveis.
 * Uma única geometria para estádio/pista, quadras separadas e corrida de kart com checkpoints.
 */
// @otthi-module-body
  const SPORTS_V704={initialized:false,active:null,football:null,courts:new Map(),kart:null,publishAt:0};
  function v704SportGroundY(x,z){return typeof groundHeightAt==='function'?groundHeightAt(x,z):0;}
  function v704SetRaceHud(title,status){if(!els?.raceBadge)return;els.raceBadge.hidden=false;els.raceTitle.textContent=title;els.raceStatus.textContent=status;}
  function v704HideRaceHud(){if(els?.raceBadge)els.raceBadge.hidden=true;}
  function v704SportBall(color=0xffffff,r=.45){const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),renderMat(color,{roughness:.56,metalness:0}));mesh.castShadow=true;mesh.receiveShadow=true;worldGroup.add(mesh);return mesh;}
  function v704CreateSimpleAthlete(color,x,z,label='Adversário'){
    const group=new THREE.Group();group.position.set(x,0,z);group.userData.label=label;worldGroup.add(group);
    box(.72,1.02,.52,color,0,1.08,0,group);box(.64,.64,.64,0xffca98,0,1.92,0,group);box(.2,.78,.2,0x23324a,-.2,.43,0,group);box(.2,.78,.2,0x23324a,.2,.43,0,group);
    return group;
  }
  function v704FieldLine(w,d,x,z){return stableBox(w,.025,d,0xffffff,x,.205,z,worldGroup,4);}
  function v704CreateGoal(x,z,side){
    const g=new THREE.Group();g.position.set(x,0,z);worldGroup.add(g);const post=renderMat(0xffffff,{roughness:.65}),net=renderMat(0xdbeafe,{transparent:true,opacity:.55,roughness:.9});
    box(.16,2.15,.16,post,0,1.08,-3.3,g);box(.16,2.15,.16,post,0,1.08,3.3,g);box(.16,.16,6.75,post,0,2.12,0,g);
    for(let zi=-3;zi<=3;zi+=.75)box(1.8,.035,.035,net,side*-.9,1.1,zi,g);for(let yi=.25;yi<2.1;yi+=.38)box(1.8,.035,.035,net,side*-.9,yi,0,g);
    return g;
  }
  function createSportsComplexV704(){
    if(SPORTS_V704.initialized)return world.sportsV704;const c=worldLayoutPoint('sports'),cx=c.x,cz=c.z,rx=26,rz=14;
    const sports={centerX:cx,centerZ:cz,radiusX:rx,radiusZ:rz,startX:cx+rx,finishX:cx+rx,lane1Z:cz,lane2Z:cz+1.8,fieldW:42,fieldD:18};const sportsRoot=new THREE.Group();sportsRoot.name='OTTHI_V704_SPORTS';worldGroup.add(sportsRoot);sports.root=sportsRoot;world.gym=sports;world.sportsV704=sports;
    const grass=renderMat(0x348447,{roughness:.94}),track=renderMat(0xb94f3b,{roughness:.9}),trackLine=renderMat(0xf8fafc,{roughness:.75});
    premiumBox(58,.11,32,0x2f6e43,cx,.06,cz,worldGroup);
    for(let i=0;i<88;i++){
      const a=i/88*Math.PI*2,b=(i+1)/88*Math.PI*2,m=(a+b)/2;
      for(const [off,width,matl] of [[0,5.2,track],[-2.0,.09,trackLine],[2.0,.09,trackLine]]){
        const arx=rx+off,arz=rz+off*.52,x=cx+Math.cos(m)*arx,z=cz+Math.sin(m)*arz;
        const ax=cx+Math.cos(a)*arx,az=cz+Math.sin(a)*arz,bx=cx+Math.cos(b)*arx,bz=cz+Math.sin(b)*arz,len=Math.hypot(bx-ax,bz-az);
        const piece=new THREE.Mesh(new THREE.BoxGeometry(Math.max(.45,len+.08),.10,width),matl);piece.position.set(x,.16,z);piece.rotation.y=-Math.atan2(Math.sin(m)*arz,Math.cos(m)*arx);piece.receiveShadow=true;worldGroup.add(piece);
      }
    }
    // Campo central com medidas proporcionais e marcações completas.
    premiumBox(sports.fieldW,.08,sports.fieldD,grass,cx,.18,cz,worldGroup);
    v704FieldLine(sports.fieldW,.12,cx,cz-sports.fieldD/2);v704FieldLine(sports.fieldW,.12,cx,cz+sports.fieldD/2);v704FieldLine(.12,sports.fieldD,cx-sports.fieldW/2,cz);v704FieldLine(.12,sports.fieldD,cx+sports.fieldW/2,cz);v704FieldLine(.1,sports.fieldD,cx,cz);
    const circle=new THREE.RingGeometry(2.6,2.72,36);circle.rotateX(-Math.PI/2);const cm=new THREE.Mesh(circle,renderMat(0xffffff,{roughness:.8,side:THREE.DoubleSide}));cm.position.set(cx,.23,cz);worldGroup.add(cm);
    for(const side of[-1,1]){v704FieldLine(6.5,.1,cx+side*(sports.fieldW/2-3.25),cz-5);v704FieldLine(6.5,.1,cx+side*(sports.fieldW/2-3.25),cz+5);v704FieldLine(.1,10,cx+side*(sports.fieldW/2-6.5),cz);v704CreateGoal(cx+side*(sports.fieldW/2+.08),cz,side);}
    // Arquibancadas fora da pista, sem collider no campo ou nas raias.
    for(const side of[-1,1])for(let row=0;row<3;row++)premiumBox(34-row*1.4,.42,1.15,row%2?0x547998:0x688daa,cx,.38+row*.46,cz+side*(17.2+row*.72),worldGroup);
    for(const p of[[cx-29,cz-16.5],[cx+29,cz-16.5],[cx-29,cz+16.5],[cx+29,cz+16.5]])createLamp(p[0],p[1]);
    const scoreBase=premiumBox(9,3.1,.8,0x17324d,cx,2.0,cz+20.2,worldGroup);scoreBase.userData.sportsStructure=true;
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(7.8,1.45),new THREE.MeshStandardMaterial({map:signTexture('OTTHI ARENA  0 × 0','#102d4a','#ffffff'),roughness:.55,side:THREE.DoubleSide}));sign.position.set(cx,2.45,cz+19.75);sign.rotation.y=Math.PI;worldGroup.add(sign);sports.scoreboard=sign;
    // Entradas separadas: atletismo e futebol.
    registerInteractable({id:'athletics-gym',type:'race',icon:'🏃',label:'Atletismo — corridas e voltas',x:cx-8,z:cz-19,radius:3.2,priority:160,action:()=>openRaceCenter()});
    registerInteractable({id:'football-v704',type:'sport',icon:'⚽',label:'Futebol — iniciar partida',x:cx+8,z:cz-19,radius:3.2,priority:166,action:()=>openFootballV704()});
    createCourtV704('volley',worldLayoutPoint('volley'),false);createCourtV704('footvolley',worldLayoutPoint('footvolley'),true);
    SPORTS_V704.initialized=true;return sports;
  }
  function createCourtV704(type,center,foot=false){
    const cx=center.x,cz=center.z,w=12,d=20,base=foot?0xdab977:0x4f9bd5;premiumBox(w,.10,d,base,cx,.08,cz,worldGroup);
    v704FieldLine(w,.11,cx,cz-d/2);v704FieldLine(w,.11,cx,cz+d/2);v704FieldLine(.11,d,cx-w/2,cz);v704FieldLine(.11,d,cx+w/2,cz);v704FieldLine(w,.08,cx,cz);
    const netH=foot?1.8:2.35;for(let y=.35;y<netH;y+=.32)premiumBox(w,.025,.025,0xf3f4f6,cx,y,cz,worldGroup);premiumBox(.16,netH+.25,.16,0xe5e7eb,cx-w/2,.5+netH/2,cz,worldGroup);premiumBox(.16,netH+.25,.16,0xe5e7eb,cx+w/2,.5+netH/2,cz,worldGroup);
    const label=foot?'Futevôlei':'Vôlei',id=`${type}-v704`;createSignpost(cx,cz-d/2-2.6,label,Math.PI);
    const court={id,type,label,cx,cz,w,d,netH,foot,ball:null,ai:null,score:[0,0],serving:0,state:'idle',timer:0,vx:0,vy:0,vz:0};SPORTS_V704.courts.set(type,court);
    registerInteractable({id,type:'sport',icon:foot?'🏖️':'🏐',label:`${label} — iniciar partida`,x:cx,z:cz-d/2-2,radius:3,priority:165,action:()=>startCourtV704(type)});
  }
  function openFootballV704(){
    openModal('Futebol OTTHI',`<p>Partida com bola física, gols, cronômetro, adversário e goleiro básico.</p><div class="button-grid"><button id="footballSoloV704" class="primary">⚽ Jogar contra o computador</button><button id="footballOnlineV704">🌐 Abrir modo online</button></div>`);
    setTimeout(()=>{const solo=document.getElementById('footballSoloV704'),online=document.getElementById('footballOnlineV704');if(solo)solo.onclick=()=>startFootballV704('solo');if(online)online.onclick=()=>startFootballV704('online');},0);
  }
  function resetFootballBallV704(direction=0){const f=SPORTS_V704.football;if(!f)return;f.ball.position.set(f.cx,.58,f.cz);f.vx=direction*2.5;f.vz=0;f.cooldown=.8;}
  function startFootballV704(mode='solo'){
    closeModal();stopSportV704(false);const s=world.sportsV704,cx=s.centerX,cz=s.centerZ,ball=v704SportBall(0xffffff,.48),ai=v704CreateSimpleAthlete(0xe5484d,cx+10,cz,'Adversário'),keeper=v704CreateSimpleAthlete(0x3b82f6,cx+s.fieldW/2-1.8,cz,'Goleiro');ball.position.set(cx,.58,cz);
    SPORTS_V704.football={type:'football',mode,cx,cz,w:s.fieldW,d:s.fieldD,ball,ai,keeper,score:[0,0],time:90,vx:0,vz:0,cooldown:1,finished:false};SPORTS_V704.active=SPORTS_V704.football;
    player.x=cx-8;player.z=cz;player.y=v704SportGroundY(player.x,player.z);v704SetRaceHud('⚽ Futebol OTTHI','90 s • 0 × 0');toast(mode==='online'?'Partida online aberta. Jogadores da sala podem entrar no campo.':'Partida solo iniciada. Use AÇÃO perto da bola para chutar.','good',2400);
  }
  function footballKickV704(){const f=SPORTS_V704.football;if(!f||f.finished)return false;const dx=f.ball.position.x-player.x,dz=f.ball.position.z-player.z;if(Math.hypot(dx,dz)>2.1)return false;const power=9.5,fx=Math.sin(player.facing),fz=Math.cos(player.facing);f.vx=fx*power+player.vx*.35;f.vz=fz*power+player.vz*.35;f.cooldown=.18;toast('Chute!','good',650);return true;}
  function updateFootballV704(dt){
    const f=SPORTS_V704.football;if(!f||f.finished)return;f.time=Math.max(0,f.time-dt);f.cooldown=Math.max(0,f.cooldown-dt);
    f.ball.position.x+=f.vx*dt;f.ball.position.z+=f.vz*dt;const friction=Math.pow(.18,dt);f.vx*=friction;f.vz*=friction;f.ball.rotation.z-=f.vx*dt;f.ball.rotation.x+=f.vz*dt;
    // Contato do jogador também desloca a bola; AÇÃO fornece o chute forte.
    const pd=Math.hypot(f.ball.position.x-player.x,f.ball.position.z-player.z);if(pd<1.05&&f.cooldown<=0){const a=Math.atan2(f.ball.position.x-player.x,f.ball.position.z-player.z);f.vx+=Math.sin(a)*2.3;f.vz+=Math.cos(a)*2.3;f.cooldown=.15;}
    // IA persegue a bola e finaliza para o gol esquerdo.
    const adx=f.ball.position.x-f.ai.position.x,adz=f.ball.position.z-f.ai.position.z,ad=Math.max(.001,Math.hypot(adx,adz));f.ai.position.x+=adx/ad*3.1*dt;f.ai.position.z+=adz/ad*3.1*dt;f.ai.rotation.y=Math.atan2(adx,adz);
    if(ad<1.2&&f.cooldown<=0){f.vx=-8.4;f.vz=clamp((f.cz-f.ball.position.z)*.6,-3.2,3.2);f.cooldown=.5;}
    f.keeper.position.z=clamp(f.ball.position.z,f.cz-3,f.cz+3);
    const halfW=f.w/2,halfD=f.d/2,goal=Math.abs(f.ball.position.z-f.cz)<3.4;
    if(f.ball.position.x>f.cx+halfW){if(goal){f.score[0]++;toast('GOL DO JOGADOR!','good',1800);resetFootballBallV704(-1);}else{f.ball.position.x=f.cx+halfW;f.vx=-Math.abs(f.vx)*.68;}}
    if(f.ball.position.x<f.cx-halfW){if(goal){f.score[1]++;toast('Gol do adversário.','warn',1600);resetFootballBallV704(1);}else{f.ball.position.x=f.cx-halfW;f.vx=Math.abs(f.vx)*.68;}}
    if(f.ball.position.z>f.cz+halfD){f.ball.position.z=f.cz+halfD;f.vz=-Math.abs(f.vz)*.72;}if(f.ball.position.z<f.cz-halfD){f.ball.position.z=f.cz-halfD;f.vz=Math.abs(f.vz)*.72;}
    v704SetRaceHud('⚽ Futebol OTTHI',`${Math.ceil(f.time)} s • ${f.score[0]} × ${f.score[1]}`);v704UpdateScoreboard(f.score[0],f.score[1]);v704PublishSport({type:'football',mode:f.mode,score:f.score,time:Math.ceil(f.time),ball:[+f.ball.position.x.toFixed(2),+f.ball.position.z.toFixed(2)]});
    if(f.time<=0){f.finished=true;const won=f.score[0]>f.score[1];addXP(won?45:20);if(won)addCoins(25);toast(won?'Vitória no futebol!':f.score[0]===f.score[1]?'Empate no futebol.':'Fim de partida. Continue treinando.',won?'good':'warn',2400);setTimeout(()=>stopSportV704(),1800);}
  }
  function v704UpdateScoreboard(a,b){const sign=world.sportsV704?.scoreboard;if(!sign)return;const old=sign.material;sign.material=new THREE.MeshStandardMaterial({map:signTexture(`OTTHI ARENA  ${a} × ${b}`,'#102d4a','#ffffff'),roughness:.55,side:THREE.DoubleSide});old?.map?.dispose?.();old?.dispose?.();}
  function startCourtV704(type){
    stopSportV704(false);const c=SPORTS_V704.courts.get(type);if(!c)return;c.ball=c.ball||v704SportBall(type==='footvolley'?0xffd34d:0xffffff,.4);c.ai=c.ai||v704CreateSimpleAthlete(0x8b5cf6,c.cx,c.cz+6,`${c.label} CPU`);c.score=[0,0];c.state='serve';c.serving=0;c.timer=75;c.vx=0;c.vy=0;c.vz=0;c.ball.position.set(c.cx,.55,c.cz-6);c.ai.position.set(c.cx,0,c.cz+6);SPORTS_V704.active=c;player.x=c.cx;player.z=c.cz-6;player.y=v704SportGroundY(player.x,player.z);v704SetRaceHud(`${c.foot?'🏖️':'🏐'} ${c.label}`,'AÇÃO para sacar • 0 × 0');toast(`${c.label}: use AÇÃO para sacar e rebater. Primeiro a 7 pontos vence.`,'good',2300);
  }
  function courtHitV704(){const c=SPORTS_V704.active;if(!c||!['volley','footvolley'].includes(c.type))return false;const d=Math.hypot(c.ball.position.x-player.x,c.ball.position.z-player.z);if(c.state==='serve'&&c.serving===0){c.ball.position.set(player.x,1.1,player.z+.55);c.vx=Math.sin(player.facing)*3.1;c.vz=Math.max(5.8,Math.cos(player.facing)*6.4);c.vy=c.foot?5.2:6.8;c.state='rally';return true;}if(d<2.15&&c.ball.position.y<3.3){c.vx=Math.sin(player.facing)*3.4;c.vz=Math.max(5.6,Math.cos(player.facing)*6.6);c.vy=c.foot?4.8:6.4;c.state='rally';return true;}return false;}
  function resetCourtServeV704(c,server){c.serving=server;c.state='serve';c.vx=c.vy=c.vz=0;c.ball.position.set(c.cx,.55,c.cz+(server?6:-6));if(server===1){setTimeout(()=>{if(SPORTS_V704.active===c&&c.state==='serve'){c.vz=-6.2;c.vy=c.foot?5.0:6.5;c.state='rally';}},700);}}
  function courtPointV704(c,side){c.score[side]++;toast(`${side===0?'Você':'Computador'} marcou!`,side===0?'good':'warn',1200);if(c.score[side]>=7){addXP(side===0?42:16);if(side===0)addCoins(18);toast(side===0?`Vitória no ${c.label}!`:`Fim da partida de ${c.label}.`,side===0?'good':'warn',2200);setTimeout(()=>stopSportV704(),1500);return;}resetCourtServeV704(c,side===0?0:1);}
  function updateCourtV704(c,dt){
    if(!c||SPORTS_V704.active!==c)return;c.timer=Math.max(0,c.timer-dt);if(c.state==='serve'){v704SetRaceHud(`${c.foot?'🏖️':'🏐'} ${c.label}`,`${c.serving===0?'AÇÃO para sacar':'Saque do computador'} • ${c.score[0]} × ${c.score[1]}`);return;}
    c.vy-=9.1*dt;c.ball.position.x+=c.vx*dt;c.ball.position.y+=c.vy*dt;c.ball.position.z+=c.vz*dt;c.ball.rotation.x+=c.vz*dt;c.ball.rotation.z-=c.vx*dt;
    // Rede: bloqueia bolas abaixo da altura correta.
    if(Math.abs(c.ball.position.z-c.cz)<.28&&c.ball.position.y<c.netH+.18){c.ball.position.z=c.cz+(c.vz>0?-.32:.32);c.vz*=-.52;c.vy*=.72;}
    // IA acompanha a projeção da bola e rebate para o lado do jogador.
    c.ai.position.x+=clamp(c.ball.position.x-c.ai.position.x,-3.1*dt,3.1*dt);c.ai.position.z+=clamp((c.cz+5)-c.ai.position.z,-2.6*dt,2.6*dt);
    const aiD=Math.hypot(c.ball.position.x-c.ai.position.x,c.ball.position.z-c.ai.position.z);if(c.ball.position.z>c.cz&&aiD<1.7&&c.ball.position.y<2.7&&c.vz>0){c.vx=clamp((player.x-c.ball.position.x)*.45,-3.2,3.2);c.vz=-6.2;c.vy=c.foot?4.9:6.2;}
    const halfW=c.w/2,halfD=c.d/2;if(c.ball.position.y<=.28){const inside=Math.abs(c.ball.position.x-c.cx)<=halfW&&Math.abs(c.ball.position.z-c.cz)<=halfD;courtPointV704(c,c.ball.position.z>c.cz?0:1);return;}
    if(Math.abs(c.ball.position.x-c.cx)>halfW+1||Math.abs(c.ball.position.z-c.cz)>halfD+1){courtPointV704(c,c.ball.position.z>c.cz?0:1);return;}
    v704SetRaceHud(`${c.foot?'🏖️':'🏐'} ${c.label}`,`${c.score[0]} × ${c.score[1]} • ${Math.ceil(c.timer)} s`);v704PublishSport({type:c.type,score:c.score,ball:[+c.ball.position.x.toFixed(2),+c.ball.position.y.toFixed(2),+c.ball.position.z.toFixed(2)]});if(c.timer<=0)stopSportV704();
  }
  function createKartVehicleV704(id,x,z,color,heading=0){
    const saved=state.vehicles?.parked?.[id]||{},group=new THREE.Group();group.position.set(Number(saved.x??x),0,Number(saved.z??z));group.rotation.y=Number(saved.heading??heading);group.userData.vehicleId=id;worldGroup.add(group);
    const chassis=renderMat(0x1d2939,{roughness:.48,metalness:.2}),body=renderMat(color,{roughness:.38,metalness:.16}),wheel=renderMat(0x101318,{roughness:.72});
    box(1.55,.22,2.15,chassis,0,.25,0,group);box(1.28,.34,1.0,body,0,.46,.35,group);box(.62,.48,.62,0x27364a,0,.65,-.28,group);box(1.72,.18,.25,body,0,.32,1.12,group);box(1.7,.14,.22,body,0,.38,-1.08,group);
    for(const [wx,wz]of[[-.82,-.72],[.82,-.72],[-.82,.72],[.82,.72]]){const wh=cylinder(.31,.26,wheel,wx,.25,wz,group,14);wh.rotation.z=Math.PI/2;}
    const vehicle={id,x:group.position.x,z:group.position.z,heading:group.rotation.y,group,label:'Kart OTTHI',kind:'kart',serviceType:'kart',appearance:{primary:color,secondary:0xffffff,chassis:0x1d2939},occupied:false,radius:1.25};world.vehicles.push(vehicle);world.kartsV704=world.kartsV704||[];world.kartsV704.push(vehicle);
    registerInteractable({id:`vehicle-${id}`,type:'vehicle',icon:'🏎️',label:'Entrar no kart',radius:2.3,priority:170,getPos:()=>({x:group.position.x,z:group.position.z}),available:()=>!vehicle.occupied&&group.visible,action:()=>enterVehicle(vehicle)});return vehicle;
  }
  function createKartCircuitV704(){
    if(SPORTS_V704.kart)return SPORTS_V704.kart;const c=worldLayoutPoint('kart'),cx=c.x,cz=c.z,rx=18,rz=10,trackMat=renderMat(0x30343b,{roughness:.88}),curbA=renderMat(0xffffff,{roughness:.72}),curbB=renderMat(0xe5484d,{roughness:.72});
    const root=new THREE.Group();root.name='OTTHI_V704_KART';worldGroup.add(root);premiumBox(44,.08,32,0x477a3c,cx,.04,cz,worldGroup);
    for(let i=0;i<72;i++){const a=i/72*Math.PI*2,b=(i+1)/72*Math.PI*2,m=(a+b)/2,x=cx+Math.cos(m)*rx,z=cz+Math.sin(m)*rz,ax=cx+Math.cos(a)*rx,az=cz+Math.sin(a)*rz,bx=cx+Math.cos(b)*rx,bz=cz+Math.sin(b)*rz,len=Math.hypot(bx-ax,bz-az),road=new THREE.Mesh(new THREE.BoxGeometry(len+.15,.1,5.1),trackMat);road.position.set(x,.15,z);road.rotation.y=-Math.atan2(Math.sin(m)*rz,Math.cos(m)*rx);road.userData.kartTrack=true;worldGroup.add(road);for(const off of[-2.65,2.65]){const crx=rx+off,crz=rz+off*.55,curb=new THREE.Mesh(new THREE.BoxGeometry(len+.12,.16,.34),i%2?curbA:curbB);curb.position.set(cx+Math.cos(m)*crx,.22,cz+Math.sin(m)*crz);curb.rotation.y=road.rotation.y;curb.userData.kartBarrier=true;worldGroup.add(curb);}}
    // Ilha central e boxes próprios do kartódromo; nenhuma edificação ocupa a pista.
    premiumBox(18,.14,6,0x606873,cx,.16,cz,worldGroup);for(const [i,x]of[-6,-2,2,6].entries())premiumBox(3,1.8,3,i%2?0x36536b:0x2d465e,cx+x,.9,cz,worldGroup);
    for(let i=-2;i<=2;i++)premiumBox(.25,.08,4.6,i%2?0xffffff:0x111827,cx+rx,.24,cz+i*.9,worldGroup);
    const checkpoints=[{x:cx+rx,z:cz},{x:cx,z:cz+rz},{x:cx-rx,z:cz},{x:cx,z:cz-rz}],entrance=worldLayoutPoint('kartEntrance');
    const karts=[createKartVehicleV704('kart-red',cx+rx-1.5,cz-1.6,0xe5484d,-Math.PI/2),createKartVehicleV704('kart-blue',cx+rx-1.5,cz+1.6,0x2787d8,-Math.PI/2),createKartVehicleV704('kart-yellow',cx-4,cz-4.4,0xf1c943,0),createKartVehicleV704('kart-green',cx+4,cz-4.4,0x31a76a,0)];
    const kart={cx,cz,rx,rz,checkpoints,karts,active:false,countdown:0,lap:0,expected:0,startAt:0,best:0,ai:[],root};SPORTS_V704.kart=kart;world.kartV704=kart;
    registerInteractable({id:'kart-race-v704',type:'kart',icon:'🏁',label:'Kartódromo — iniciar corrida',x:entrance.x,z:entrance.z,radius:3.4,priority:174,action:()=>startKartRaceV704()});createSignpost(entrance.x,entrance.z+1.2,'Kartódromo OTTHI',Math.PI);return kart;
  }
  function startKartRaceV704(){
    const k=SPORTS_V704.kart;if(!k)return;if(k.active){toast('A corrida já está em andamento.','warn');return;}let kart=currentVehicleRef?.();if(!kart||kart.kind!=='kart'){kart=k.karts.find(v=>!v.occupied)||k.karts[0];enterVehicle(kart);}if(!player.vehicle||currentVehicleRef?.()?.kind!=='kart'){toast('Entre em um kart para correr.','warn');return;}
    const v=currentVehicleRef();v.group.position.set(k.cx+k.rx-1.5,0,k.cz-1.4);v.group.rotation.y=-Math.PI/2;player.x=v.group.position.x;player.z=v.group.position.z;player.car.heading=-Math.PI/2;player.car.speed=0;k.active=true;k.countdown=3.3;k.lap=0;k.expected=1;k.startAt=performance.now();k.ai=[];
    for(let i=0;i<3;i++){const group=new THREE.Group();group.position.set(k.cx+k.rx-3.2,0,k.cz+(i-1)*2.2);worldGroup.add(group);box(1.35,.22,1.9,[0x7d58c9,0xf28a22,0x138d83][i],0,.3,0,group);for(const [x,z]of[[-.72,-.62],[.72,-.62],[-.72,.62],[.72,.62]]){const w=cylinder(.27,.22,0x111827,x,.25,z,group,12);w.rotation.z=Math.PI/2;}k.ai.push({group,angle:-.04-i*.035,speed:.64+i*.035,lap:0});}
    SPORTS_V704.active=k;v704SetRaceHud('🏁 Kart OTTHI','3');toast('Corrida de 3 voltas. Passe pelos quatro checkpoints na ordem.','good',2200);
  }
  function updateKartRaceV704(dt){
    const k=SPORTS_V704.kart;if(!k?.active)return;k.countdown-=dt;if(k.countdown>0){player.car.speed=0;v704SetRaceHud('🏁 Kart OTTHI',String(Math.ceil(k.countdown)));return;}
    for(const ai of k.ai){ai.angle+=ai.speed*dt;const loops=Math.floor(ai.angle/(Math.PI*2));ai.lap=Math.max(ai.lap,loops);const a=ai.angle%(Math.PI*2);ai.group.position.set(k.cx+Math.cos(a)*k.rx,0,k.cz+Math.sin(a)*k.rz);ai.group.rotation.y=-Math.atan2(Math.cos(a)*k.rx,-Math.sin(a)*k.rz);}
    const cp=k.checkpoints[k.expected],d=Math.hypot(player.x-cp.x,player.z-cp.z);if(d<4.0){k.expected=(k.expected+1)%k.checkpoints.length;if(k.expected===1){k.lap++;beep(760);toast(`Volta ${Math.min(k.lap,3)}/3`,'good',1000);}}
    // Penalização real contra atalhos: carro fora do corredor perde desempenho e volta ao último checkpoint se insistir.
    const nx=(player.x-k.cx)/k.rx,nz=(player.z-k.cz)/k.rz,ellipse=Math.hypot(nx,nz),offTrack=Math.abs(ellipse-1)>.25;if(offTrack){player.car.speed*=Math.pow(.2,dt);k.offTrack=(k.offTrack||0)+dt;}else k.offTrack=0;if(k.offTrack>2.2){const prev=k.checkpoints[(k.expected+3)%4],vehicle=currentVehicleRef?.();player.x=prev.x;player.z=prev.z;player.car.speed=0;if(vehicle?.group){vehicle.group.position.set(prev.x,0,prev.z);vehicle.group.rotation.y=player.car.heading;}k.offTrack=0;toast('Atalho inválido: retorno ao último checkpoint.','warn',1500);}
    const aiProgresses=k.ai.map(a=>a.lap+(a.angle%(Math.PI*2))/(Math.PI*2)),aiProgress=Math.max(...aiProgresses),playerProgress=k.lap+k.expected/4,position=1+aiProgresses.filter(progress=>progress>playerProgress).length;v704SetRaceHud('🏁 Kart OTTHI',`Volta ${Math.min(k.lap+1,3)}/3 • P${Math.min(position,4)}`);v704PublishSport({type:'kart',lap:k.lap,expected:k.expected,position});
    if(k.lap>=3){k.active=false;const elapsed=(performance.now()-k.startAt)/1000,won=playerProgress>=aiProgress;addXP(won?60:30);if(won)addCoins(40);toast(`${won?'Vitória':'Chegada'} no kart: ${elapsed.toFixed(1)} s`,won?'good':'warn',2600);for(const ai of k.ai)worldGroup.remove(ai.group);k.ai=[];SPORTS_V704.active=null;setTimeout(v704HideRaceHud,1800);}
  }
  function handleActiveSportActionV704(){if(SPORTS_V704.football)return footballKickV704();const a=SPORTS_V704.active;if(a&&['volley','footvolley'].includes(a.type))return courtHitV704();return false;}
  function stopSportV704(show=true){
    const f=SPORTS_V704.football;if(f){worldGroup.remove(f.ball);worldGroup.remove(f.ai);worldGroup.remove(f.keeper);SPORTS_V704.football=null;}
    const a=SPORTS_V704.active;if(a&&['volley','footvolley'].includes(a.type)){if(a.ball)a.ball.visible=false;if(a.ai)a.ai.visible=false;a.state='idle';}
    SPORTS_V704.active=null;if(show)v704HideRaceHud();
  }
  function v704PublishSport(data){const now=performance.now();if(now-SPORTS_V704.publishAt<350)return;SPORTS_V704.publishAt=now;try{window.OTTHOS_RTDB?.publish?.({sport:{...data,updatedAtClient:Date.now()}},false);}catch{}}
  function updateWorldSportsV704(dt){
    if(SPORTS_V704.football)updateFootballV704(dt);const a=SPORTS_V704.active;if(a&&['volley','footvolley'].includes(a.type))updateCourtV704(a,dt);if(SPORTS_V704.kart?.active)updateKartRaceV704(dt);
  }
  window.OTTHI_SPORTS_V704={create:createSportsComplexV704,createKart:createKartCircuitV704,startFootball:startFootballV704,startCourt:startCourtV704,startKart:startKartRaceV704,stop:stopSportV704,update:updateWorldSportsV704,state:()=>({active:SPORTS_V704.active?.type||'',football:SPORTS_V704.football?{score:[...SPORTS_V704.football.score],time:SPORTS_V704.football.time}:null,kart:SPORTS_V704.kart?{active:SPORTS_V704.kart.active,lap:SPORTS_V704.kart.lap,expected:SPORTS_V704.kart.expected}:null})};
