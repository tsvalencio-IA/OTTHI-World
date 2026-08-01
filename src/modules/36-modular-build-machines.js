/**
 * OTTHI World V700 — módulo-fonte
 * Arquivo: 36-modular-build-machines.js
 * Escopo: Etapa 4, construção avançada e veículos montáveis sem substituir os sistemas existentes
 */
// @otthi-module-body
  Object.assign(BUILD_RECIPES,{
    roof:{name:'Módulo de telhado',icon:'🏠',cost:{wood:3,blocks:1},description:'Telhado modular em camadas'},
    door:{name:'Porta modular',icon:'🚪',cost:{wood:2,blocks:1},description:'Porta decorativa para construções'},
    window:{name:'Janela modular',icon:'🪟',cost:{wood:1,blocks:1},description:'Janela com moldura e vidro'},
    stairs:{name:'Escada',icon:'🪜',cost:{wood:3,stone:1},description:'Quatro degraus utilizáveis'},
    table:{name:'Mesa',icon:'🪵',cost:{wood:3},description:'Mesa para casas e áreas externas'},
    chair:{name:'Cadeira',icon:'🪑',cost:{wood:2},description:'Cadeira modular'},
    crate:{name:'Caixote',icon:'📦',cost:{wood:2},description:'Caixa decorativa empilhável'},
    mushroom:{name:'Cogumelo fantástico',icon:'🍄',cost:{blocks:2,wood:1},description:'Elemento original do mundo fantástico'},
    heroPad:{name:'Plataforma de energia',icon:'⚡',cost:{stone:2,crystals:1},description:'Plataforma luminosa para aventuras'},
    garageRack:{name:'Bancada de oficina',icon:'🛠',cost:{wood:3,stone:2},description:'Bancada visual para montar máquinas'}
  });
  const OTTHI_WORLD_BUILD_SIZES=Object.freeze({roof:{w:3,d:3},door:{w:1.7,d:.38},window:{w:2,d:.32},stairs:{w:2.6,d:3.2},table:{w:2.2,d:1.2},chair:{w:1,d:1},crate:{w:1.25,d:1.25},mushroom:{w:1.4,d:1.4},heroPad:{w:2.8,d:2.8},garageRack:{w:3,d:1.2}});
  const legacyBuildFootprint=buildFootprint;
  buildFootprint=function buildFootprintWorld(type,rotation=0){const base=OTTHI_WORLD_BUILD_SIZES[type];if(!base)return legacyBuildFootprint(type,rotation);return Math.abs(Math.sin(Number(rotation||0)))>.7?{w:base.d,d:base.w}:{...base};};
  const legacyCreateBuildPreviewMesh=createBuildPreviewMesh;
  createBuildPreviewMesh=function createBuildPreviewMeshWorld(type){
    if(!OTTHI_WORLD_BUILD_SIZES[type])return legacyCreateBuildPreviewMesh(type);if(!window.THREE||!worldGroup)return null;const group=new THREE.Group(),material=new THREE.MeshBasicMaterial({color:0x64ef78,transparent:true,opacity:.42,depthWrite:false,depthTest:true});
    const part=(w,h,d,x,y,z)=>{const mesh=new THREE.Mesh(sharedBoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.renderOrder=990;mesh.frustumCulled=false;group.add(mesh);return mesh;};
    if(type==='roof'){part(3,.35,3,0,.18,0);part(2.3,.35,2.5,0,.48,0);part(1.5,.35,2,0,.78,0);}
    else if(type==='door'){part(1.7,2.5,.35,0,1.25,0);part(1.2,2.15,.38,0,1.08,.02);}
    else if(type==='window'){part(2,1.55,.32,0,.78,0);part(1.55,1.15,.36,0,.78,.02);}
    else if(type==='stairs')for(let i=0;i<4;i++)part(2.5,.28+i*.28,.72,0,(.28+i*.28)/2,-1.05+i*.7);
    else if(type==='table'){part(2.2,.18,1.1,0,1,0);for(const x of[-.85,.85])for(const z of[-.38,.38])part(.15,.92,.15,x,.46,z);}
    else if(type==='chair'){part(.9,.16,.86,0,.62,0);part(.9,.82,.16,0,1.02,-.34);for(const x of[-.32,.32])part(.12,.58,.12,x,.29,0);}
    else if(type==='crate'){part(1.2,1.2,1.2,0,.6,0);}
    else if(type==='mushroom'){part(.42,.9,.42,0,.45,0);part(1.35,.48,1.35,0,1.05,0);}
    else if(type==='heroPad'){part(2.8,.28,2.8,0,.14,0);part(1.9,.18,1.9,0,.32,0);}
    else{part(3,.92,1.1,0,.46,0);part(2.7,.18,1.25,0,1,0);}
    group.userData.previewMaterial=material;group.userData.previewType=type;worldGroup.add(group);return group;
  };
  function registerWorldBuildRecord(data,mesh,extras=[],baseY=0){mesh.userData.buildId=data.id;mesh.userData.buildType=data.type;const record={data:{...data,groundY:baseY},mesh,extras,signature:buildRecordSignature(data)};world.builds.push(record);return record;}
  const legacySpawnBuild=spawnBuild;
  spawnBuild=function spawnBuildWorld(rawData,persist=false){
    const preliminary=normalizeBuildRecord(rawData);if(!preliminary||!OTTHI_WORLD_BUILD_SIZES[preliminary.type])return legacySpawnBuild(rawData,persist);if(!worldGroup)return null;const existing=world.builds.find(item=>item.data.id===preliminary.id);if(existing)return existing;
    const data=preliminary,rotation=Number(data.rotation||0),quarter=Math.abs(Math.sin(rotation))>.7,oriented=(w,d)=>quarter?{w:d,d:w}:{w,d},baseY=groundHeightAt(data.x,data.z),group=new THREE.Group(),extras=[];group.position.set(data.x,baseY,data.z);group.rotation.y=rotation;group.userData.otthiWorldBuild=true;worldGroup.add(group);
    if(data.type==='roof'){premiumBox(3,.34,3,materials.roof,0,.17,0,group);premiumBox(2.35,.34,2.55,materials.roof,0,.49,0,group);premiumBox(1.65,.34,2.05,materials.roof,0,.81,0,group);registerPlatform(data.x,data.z,3,3,baseY+1,{buildId:data.id});}
    else if(data.type==='door'){premiumBox(1.7,2.5,.35,materials.stone,0,1.25,0,group);premiumBox(1.22,2.15,.39,materials.wood,0,1.08,.03,group);premiumCylinder(.07,.08,0xffd84d,.4,1.08,.24,group,10);const size=oriented(1.7,.38);registerCollider(data.x,data.z,size.w,size.d,{buildId:data.id});}
    else if(data.type==='window'){premiumBox(2,1.55,.32,materials.wood,0,.78,0,group);const glass=new THREE.MeshStandardMaterial({map:loadWorldTexture('city-glass','basecolor',{repeat:[1,1],color:true}),normalMap:loadWorldTexture('city-glass','normal',{repeat:[1,1]}),roughnessMap:loadWorldTexture('city-glass','roughness',{repeat:[1,1]}),color:0x8fdfff,transparent:true,opacity:.72,roughness:.18,metalness:.16});premiumBox(1.55,1.12,.36,glass,0,.78,.03,group,0x204b69);premiumBox(.08,1.12,.4,materials.wood,0,.78,.05,group);premiumBox(1.55,.08,.4,materials.wood,0,.78,.05,group);}
    else if(data.type==='stairs'){for(let i=0;i<4;i++){const height=.28+i*.28,z=-1.05+i*.7;premiumBox(2.5,height,.72,materials.wood,0,height/2,z,group);const worldZ=data.z+Math.cos(rotation)*z,worldX=data.x+Math.sin(rotation)*z,size=oriented(2.5,.72);registerPlatform(worldX,worldZ,size.w,size.d,baseY+height,{buildId:data.id});}}
    else if(data.type==='table'){premiumBox(2.2,.18,1.1,materials.wood,0,1,0,group);for(const x of[-.85,.85])for(const z of[-.38,.38])premiumBox(.15,.92,.15,materials.wood,x,.46,z,group);const size=oriented(2.2,1.2);registerCollider(data.x,data.z,size.w,size.d,{buildId:data.id});}
    else if(data.type==='chair'){premiumBox(.9,.16,.86,materials.wood,0,.62,0,group);premiumBox(.9,.82,.16,materials.wood,0,1.02,-.34,group);for(const x of[-.32,.32])premiumBox(.12,.58,.12,materials.wood,x,.29,0,group);const size=oriented(1,1);registerCollider(data.x,data.z,size.w,size.d,{buildId:data.id});}
    else if(data.type==='crate'){premiumBox(1.2,1.2,1.2,materials.wood,0,.6,0,group);for(const r of[-.52,.52]){premiumBox(.12,1.22,.12,0x5b341c,r,.61,.52,group);premiumBox(.12,1.22,.12,0x5b341c,r,.61,-.52,group);}registerPlatform(data.x,data.z,1.2,1.2,baseY+1.2,{buildId:data.id});registerCollider(data.x,data.z,1.2,1.2,{buildId:data.id});}
    else if(data.type==='mushroom'){const stem=worldAvatarMaterial(0xe7d0aa,{roughness:.88});const cap=new THREE.MeshStandardMaterial({map:loadWorldTexture('mushroom','basecolor',{repeat:[1,1],color:true,nearest:true}),normalMap:loadWorldTexture('mushroom','normal',{repeat:[1,1]}),roughnessMap:loadWorldTexture('mushroom','roughness',{repeat:[1,1]}),roughness:.74});const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.2,.3,.9,8),stem);trunk.position.y=.45;group.add(trunk);const top=new THREE.Mesh(new THREE.SphereGeometry(.7,12,8,0,Math.PI*2,0,Math.PI*.58),cap);top.position.y=1.12;top.scale.y=.65;group.add(top);registerCollider(data.x,data.z,1.1,1.1,{buildId:data.id});}
    else if(data.type==='heroPad'){const energy=otthiWorldRuntime.materials.get('heroEnergy')||new THREE.MeshStandardMaterial({color:0x4fddff,emissive:0x147ca2,emissiveIntensity:.65,roughness:.2});premiumBox(2.8,.28,2.8,materials.stone,0,.14,0,group);premiumBox(1.95,.18,1.95,energy,0,.34,0,group,0x0b4b66);extras.push(addGlow(data.x,baseY+.55,data.z,0x45ddff,4));registerPlatform(data.x,data.z,2.8,2.8,baseY+.43,{buildId:data.id});}
    else if(data.type==='garageRack'){premiumBox(3,.92,1.1,materials.wood,0,.46,0,group);premiumBox(2.75,.18,1.25,materials.emergencyMetal,0,1,0,group);for(const x of[-1.15,1.15])premiumBox(.18,1.85,.18,materials.emergencyMetal,x,.93,0,group);for(const [x,c]of[[-.72,0xf2c94c],[0,0x4fc3f7],[.72,0xef5350]])premiumBox(.42,.28,.34,c,x,1.24,0,group);const size=oriented(3,1.2);registerCollider(data.x,data.z,size.w,size.d,{buildId:data.id});}
    group.traverse(object=>{if(object.isMesh){object.castShadow=true;object.receiveShadow=true;ensureUv2(object);}});return registerWorldBuildRecord(data,group,extras,baseY);
  };

  const OTTHI_WORLD_VEHICLE_CATALOG=Object.freeze({
    body:Object.freeze([['brick','Blocos montáveis'],['toy','Brinquedo arredondado'],['kart','Kart de corrida'],['classic','Clássico'],['compact','Compacto'],['sport','Esportivo'],['offroad','Aventura / 4x4'],['special','Especial'],['utility','Utilitário'],['exploration','Exploração'],['service','Serviço']]),
    hood:Object.freeze([['flat','Plano'],['intake','Entrada de ar'],['power','Energia']]),
    roof:Object.freeze([['standard','Padrão'],['open','Sem teto'],['rack','Bagageiro'],['beacon','Sinalizador']]),
    wheels:Object.freeze([['city','Urbanas'],['sport','Esportivas'],['offroad','Todo-terreno']]),
    rear:Object.freeze([['none','Sem acessório'],['spoiler','Aerofólio'],['box','Caixa de carga']]),
    lights:Object.freeze([['warm','Clássicas'],['white','Brancas'],['energy','Energia']])
  });
  const OTTHI_WORLD_CIVIL_VEHICLE_PRESETS=Object.freeze({
    'garage-orange':Object.freeze({body:'brick',hood:'flat',roof:'standard',wheels:'city',rear:'none',lights:'warm',primary:'#f28a22',secondary:'#0aa7b8',accent:'#f5d84d'}),
    'market-blue':Object.freeze({body:'toy',hood:'flat',roof:'open',wheels:'city',rear:'none',lights:'white',primary:'#2787d8',secondary:'#43c6e8',accent:'#e9f7ff'}),
    'workshop-red':Object.freeze({body:'kart',hood:'intake',roof:'open',wheels:'sport',rear:'spoiler',lights:'white',primary:'#e5484d',secondary:'#f3b33d',accent:'#fff0a8'}),
    'gym-yellow':Object.freeze({body:'kart',hood:'intake',roof:'rack',wheels:'offroad',rear:'none',lights:'warm',primary:'#f1c943',secondary:'#ef6c3d',accent:'#fff2a8'}),
    'royal-purple':Object.freeze({body:'special',hood:'power',roof:'standard',wheels:'sport',rear:'spoiler',lights:'energy',primary:'#7d58c9',secondary:'#f1c94d',accent:'#70e8ff'}),
    'home-green':Object.freeze({body:'utility',hood:'flat',roof:'standard',wheels:'city',rear:'box',lights:'warm',primary:'#31a76a',secondary:'#8edb65',accent:'#f5d84d'}),
    'forest-teal':Object.freeze({body:'exploration',hood:'intake',roof:'rack',wheels:'offroad',rear:'box',lights:'white',primary:'#138d83',secondary:'#6bc08b',accent:'#dff6a3'})
  });
  const OTTHI_WORLD_VEHICLE_DEBRIS=[];
  function defaultWorldVehicleParts(vehicleId=''){return{body:'classic',hood:'flat',roof:'standard',wheels:'city',rear:'none',lights:'warm',primary:'#f28a22',secondary:'#0aa7b8',accent:'#f5d84d',...(OTTHI_WORLD_CIVIL_VEHICLE_PRESETS[vehicleId]||{})};}
  function worldVehicleParts(vehicleId){
    ensureOtthiWorldState();
    const current=state.vehicles.modularParts[vehicleId]||{},legacy=defaultWorldVehicleParts(),preset=defaultWorldVehicleParts(vehicleId),fields=Object.keys(legacy),isLegacyDefault=fields.every(key=>current[key]===legacy[key]),usePreset=!Object.keys(current).length||isLegacyDefault;
    const next=usePreset?{...preset}:{...preset,...current};state.vehicles.modularParts[vehicleId]=next;state.vehicles.partDurability[vehicleId]=Number.isFinite(state.vehicles.partDurability[vehicleId])?clamp(state.vehicles.partDurability[vehicleId],0,100):100;return next;
  }
  function removeWorldVehicleModules(group){const previous=group?.userData?.otthiWorldVehicleModules;if(previous){group.remove(previous);disposeWorldAvatarObject(previous);}if(group?.userData)group.userData.otthiWorldVehicleModules=null;}
  function worldVehicleModuleMaterial(color,metalness=.18,roughness=.42){const material=new THREE.MeshStandardMaterial({map:loadWorldTexture('toy-plastic','basecolor',{repeat:[1,1],color:true}),normalMap:loadWorldTexture('toy-plastic','normal',{repeat:[1,1]}),roughnessMap:loadWorldTexture('toy-plastic','roughness',{repeat:[1,1]}),color:new THREE.Color(color),metalness,roughness});material.userData.otthiWorldAvatarMaterial=true;return material;}
  function applyWorldVehicleModulesToGroup(group,vehicleId){
    if(!group||!vehicleId)return false;removeWorldVehicleModules(group);const parts=worldVehicleParts(vehicleId),durability=Number(state.vehicles.partDurability[vehicleId]??100),modules=new THREE.Group();modules.name=`OTTHI_WORLD_VEHICLE_${vehicleId}`;group.add(modules);group.userData.otthiWorldVehicleModules=modules;
    const primary=worldVehicleModuleMaterial(parts.primary),secondary=worldVehicleModuleMaterial(parts.secondary),accent=worldVehicleModuleMaterial(parts.accent,.28,.34),dark=worldVehicleModuleMaterial(0x17202b,.08,.82),energy=worldVehicleModuleMaterial(0x5de6ff,.22,.18),glass=worldVehicleModuleMaterial(0x7bc8e6,.28,.18);glass.transparent=true;glass.opacity=.72;energy.emissive=new THREE.Color(0x1684a8);energy.emissiveIntensity=.72;
    const register=(mesh,key='')=>{mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.otthiVehiclePiece=key||'';mesh.userData.otthiVehicleId=vehicleId;modules.add(mesh);if(state.settings?.worldOutlines!==false)addVoxelOutline(mesh,0x102238,.14);return mesh;};
    const part=(w,h,d,material,x,y,z,key='')=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);return register(mesh,key);};
    const rounded=(r,material,x,y,z,sx=1,sy=1,sz=1,key='')=>{const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,18,12),material);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);return register(mesh,key);};
    const stud=(x,y,z,material=accent)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.07,12),material);mesh.position.set(x,y,z);return register(mesh,'stud');};
    const wheelMaterial=new THREE.MeshStandardMaterial({map:loadWorldTexture('vehicle-tire','basecolor',{repeat:[1,1],color:true}),normalMap:loadWorldTexture('vehicle-tire','normal',{repeat:[1,1]}),roughnessMap:loadWorldTexture('vehicle-tire','roughness',{repeat:[1,1]}),color:0x20242b,roughness:.94});wheelMaterial.userData.otthiWorldAvatarMaterial=true;
    const wheelRadius=parts.body==='kart'?.30:parts.wheels==='offroad'?.43:parts.wheels==='sport'?.37:.34,wheelWidth=parts.body==='kart'?.36:parts.wheels==='offroad'?.34:.29;
    if(parts.body==='brick'){
      part(1.94,.34,2.72,dark,0,.30,0,'chassis');part(1.78,.42,1.36,primary,0,.58,.48,'body');part(1.48,.44,.92,secondary,0,.82,-.48,'cabin');part(1.31,.30,.68,glass,0,.98,-.42,'glass');
      for(const z of[-.98,-.48,.02,.52,1.02])for(const x of[-.58,0,.58])stud(x,1.03,z,parts.roof==='open'?secondary:primary);
      part(1.92,.16,.24,accent,0,.36,1.42,'bumper');part(1.86,.16,.22,secondary,0,.36,-1.42,'bumper');
    }else if(parts.body==='toy'){
      rounded(1.0,primary,0,.53,.28,1.0,.43,1.34,'body');rounded(.78,secondary,0,.85,-.42,.93,.55,.78,'cabin');rounded(.69,glass,0,.98,-.37,.9,.45,.68,'glass');
      part(1.84,.20,.30,accent,0,.34,1.33,'bumper');part(1.72,.18,.26,secondary,0,.34,-1.30,'bumper');
    }else if(parts.body==='kart'){
      part(1.78,.18,2.16,dark,0,.20,0,'chassis');part(1.42,.18,.92,primary,0,.38,.55,'nose');rounded(.48,secondary,0,.58,-.24,.82,.72,.82,'seat');part(.62,.08,.16,accent,0,.81,.24,'steering');
      for(const x of[-.98,.98])part(.14,.24,1.88,primary,x,.26,0,'sidepod');part(2.12,.13,.22,accent,0,.24,1.16,'bumper');part(1.72,.10,.24,secondary,0,.64,-1.05,'spoiler');
    }else if(parts.body==='compact'){
      rounded(.96,primary,0,.54,.25,.92,.43,1.22,'body');rounded(.72,secondary,0,.84,-.40,.92,.52,.72,'cabin');rounded(.62,glass,0,.96,-.36,.88,.42,.66,'glass');
    }else if(parts.body==='sport'){
      rounded(1.04,primary,0,.45,.22,1.0,.30,1.35,'body');rounded(.70,glass,0,.78,-.30,.92,.40,.70,'glass');part(2.02,.14,.28,accent,0,.23,1.40,'bumper');
    }else if(parts.body==='offroad'||parts.body==='exploration'){
      part(2.04,.38,2.68,dark,0,.34,0,'chassis');rounded(.96,primary,0,.62,.28,.98,.42,1.18,'body');part(1.52,.48,.98,secondary,0,.87,-.47,'cabin');part(1.36,.32,.75,glass,0,1.00,-.42,'glass');for(const x of[-1.03,1.03])part(.20,.42,2.42,dark,x,.46,0,'side');
    }else if(parts.body==='special'){
      rounded(1.0,primary,0,.49,.18,1,.34,1.35,'body');rounded(.68,glass,0,.82,-.30,.92,.43,.74,'glass');for(const x of[-.96,.96]){const fin=part(.12,.58,1.08,secondary,x,.78,-.82,'fin');fin.rotation.z=x<0?-.18:.18;}part(.48,.12,1.12,energy,0,1.17,-.28,'energy');
    }else{
      part(1.92,.34,2.62,dark,0,.30,0,'chassis');rounded(.94,primary,0,.56,.28,.96,.42,1.24,'body');part(1.48,.44,.94,secondary,0,.83,-.48,'cabin');part(1.30,.30,.72,glass,0,.96,-.42,'glass');
    }
    if(durability>52&&parts.hood==='intake')part(.72,.20,.62,secondary,0,.96,.72,'hood');else if(durability>52&&parts.hood==='power'){part(.74,.16,.66,energy,0,.98,.72,'hood');part(.12,.07,.72,accent,0,1.08,.72,'hood');}
    if(durability>38&&parts.roof==='rack'){for(const x of[-.62,.62])part(.10,.34,1.18,dark,x,1.32,-.42,'roof');for(const z of[-.92,.02])part(1.36,.10,.10,dark,0,1.49,z,'roof');}
    else if(durability>38&&parts.roof==='beacon'){part(1.18,.12,.22,dark,0,1.28,-.42,'roof');part(.34,.22,.24,energy,-.32,1.44,-.42,'roof');part(.34,.22,.24,accent,.32,1.44,-.42,'roof');}
    if(durability>22&&parts.rear==='spoiler'&&parts.body!=='kart'){part(1.46,.12,.34,secondary,0,1.08,-1.30,'spoiler');for(const x of[-.5,.5])part(.10,.42,.10,dark,x,.89,-1.22,'spoiler');}
    else if(durability>22&&parts.rear==='box')part(1.32,.66,.82,secondary,0,.90,-1.10,'rear');
    const wheelZ=parts.body==='kart'?.76:.82,wheelX=parts.body==='kart'?.92:.88,wheelY=parts.body==='kart'?.24:.25;
    for(const [x,z]of[[-wheelX,-wheelZ],[wheelX,-wheelZ],[-wheelX,wheelZ],[wheelX,wheelZ]]){if(durability<8&&x>0&&z<0)continue;const wheel=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,16),wheelMaterial);wheel.position.set(x,wheelY,z);wheel.rotation.z=Math.PI/2;register(wheel,'wheel');const hub=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,wheelWidth+.03,12),parts.wheels==='sport'?accent:secondary);hub.position.copy(wheel.position);hub.rotation.z=Math.PI/2;register(hub,'hub');}
    const lightMaterial=parts.lights==='energy'?energy:worldVehicleModuleMaterial(parts.lights==='white'?0xffffff:0xffe7a1,.1,.2);lightMaterial.emissive=new THREE.Color(parts.lights==='energy'?0x28c7ef:0xffc95a);lightMaterial.emissiveIntensity=parts.lights==='energy'?1.1:.72;for(const x of[-.58,.58])part(.30,.16,.08,lightMaterial,x,.51,parts.body==='kart'?1.12:1.34,'light');
    modules.userData.vehicleId=vehicleId;modules.userData.durability=durability;modules.userData.detachable=[...modules.children].filter(mesh=>mesh.isMesh&&mesh.userData.otthiVehiclePiece);otthiWorldRuntime.stats.vehicleModules++;return true;
  }
  const legacyCreateToyCar=createToyCar;
  createToyCar=function createToyCarWorld(x,z,options={}){const vehicle=legacyCreateToyCar(x,z,options);applyWorldVehicleModulesToGroup(vehicle?.group,vehicle?.id);return vehicle;};
  function worldVehicleMapLocations(){
    const records=[],seen=new Set(),add=(vehicle,type='car')=>{if(!vehicle?.id||seen.has(`${type}:${vehicle.id}`))return;const localCar=player.vehicle&&player.car.id===vehicle.id,localBoat=player.boating&&type==='boat',group=vehicle.group;if(group?.visible===false&&!localCar&&!localBoat)return;const x=Number(localCar||localBoat?player.x:group?.position?.x??vehicle.x??0),z=Number(localCar||localBoat?player.z:group?.position?.z??vehicle.z??0),kind=String(vehicle.serviceType||vehicle.kind||type),icon=type==='bus'?'🚌':type==='boat'?'🛶':kind==='police'?'🚓':kind==='firefighter'||kind==='fire'?'🚒':kind==='paramedic'||kind==='ambulance'?'🚑':'🚗',name=type==='bus'?`${vehicle.route?.number||''} ${vehicle.route?.name||'Ônibus'}`.trim():(vehicle.label||vehicle.route?.name||(type==='boat'?'Barco do Lago':'Veículo')),groupName=type==='bus'?'Transporte':type==='boat'?'Água e Natureza':['police','firefighter','fire','paramedic','ambulance'].includes(kind)?'Veículos de serviço':'Veículos';seen.add(`${type}:${vehicle.id}`);records.push({id:`world-vehicle-${type}-${vehicle.id}`,name,icon,group:groupName,x,z,navX:x,navZ:z,description:`Localização atual de ${name}.`,actions:['Marcar no GPS','Caminhar até o veículo','Usar AÇÃO para entrar']});};
    for(const vehicle of world?.vehicles||[])add(vehicle,'car');for(const bus of world?.buses||[])add(bus,'bus');for(const vehicle of world?.policeCars||[])add(vehicle,'service');for(const vehicle of world?.fireTrucks||[])add(vehicle,'service');for(const vehicle of world?.ambulances||[])add(vehicle,'service');if(world?.boat)add(world.boat,'boat');return records;
  }
  const legacyCurrentMapLocations=currentMapLocations;
  currentMapLocations=function currentMapLocationsWorldVehicles(){const unique=new Map();for(const location of [...legacyCurrentMapLocations(),...worldVehicleMapLocations()])if(location?.id)unique.set(location.id,location);return[...unique.values()];};
  const legacyApplyVehicleAppearance=applyVehicleAppearance;
  applyVehicleAppearance=function applyVehicleAppearanceWorld(vehicle){legacyApplyVehicleAppearance(vehicle);if(vehicleVisual&&vehicle?.id)applyWorldVehicleModulesToGroup(vehicleVisual,vehicle.id);};
  function spawnWorldVehicleDebris(mesh,severity=1){
    if(!mesh?.isMesh||!worldGroup)return false;const piece=mesh.clone();piece.geometry=mesh.geometry;piece.material=mesh.material;mesh.getWorldPosition(piece.position);mesh.getWorldQuaternion(piece.quaternion);mesh.getWorldScale(piece.scale);piece.userData={otthiVehicleDebris:true,life:5.5,velocity:new THREE.Vector3((Math.random()-.5)*severity*3.8,2.2+Math.random()*severity*2.0,(Math.random()-.5)*severity*3.8),spin:new THREE.Vector3((Math.random()-.5)*5,(Math.random()-.5)*5,(Math.random()-.5)*5)};worldGroup.add(piece);mesh.visible=false;OTTHI_WORLD_VEHICLE_DEBRIS.push(piece);return true;
  }
  function detachWorldVehiclePieces(group,count=1,severity=1){const modules=group?.userData?.otthiWorldVehicleModules,candidates=(modules?.userData?.detachable||[]).filter(mesh=>mesh.visible&&['roof','spoiler','bumper','hood','wheel','side','fin','rear','light','stud'].includes(mesh.userData.otthiVehiclePiece));for(let i=0;i<count&&candidates.length;i++){const index=Math.floor(Math.random()*candidates.length),mesh=candidates.splice(index,1)[0];spawnWorldVehicleDebris(mesh,severity);}}
  function updateWorldVehicleDebris(dt){for(let i=OTTHI_WORLD_VEHICLE_DEBRIS.length-1;i>=0;i--){const piece=OTTHI_WORLD_VEHICLE_DEBRIS[i],data=piece.userData;data.life-=dt;data.velocity.y-=7.8*dt;piece.position.addScaledVector(data.velocity,dt);piece.rotation.x+=data.spin.x*dt;piece.rotation.y+=data.spin.y*dt;piece.rotation.z+=data.spin.z*dt;const ground=groundHeightAt(piece.position.x,piece.position.z)+.08;if(piece.position.y<ground){piece.position.y=ground;data.velocity.y=Math.abs(data.velocity.y)*.22;data.velocity.x*=.72;data.velocity.z*=.72;}if(data.life<=0){piece.parent?.remove(piece);OTTHI_WORLD_VEHICLE_DEBRIS.splice(i,1);}}}
  const legacyWorldVehicleEnvironment=updateOtthiWorldEnvironment;updateOtthiWorldEnvironment=function updateOtthiWorldEnvironmentVehicles(dt){legacyWorldVehicleEnvironment(dt);updateWorldVehicleDebris(dt);};
  const legacyRegisterVehicleImpact=registerVehicleImpact;
  registerVehicleImpact=function registerVehicleImpactWorld(){const vehicle=currentVehicleRef(),id=vehicle?.id||player.car.id,impactSpeed=Math.abs(Number(player.car.speed||0));legacyRegisterVehicleImpact();if(!id)return;const before=Number(state.vehicles.partDurability[id]??100),loss=clamp(4+impactSpeed*1.35,4,18),after=clamp(before-loss,0,100),severity=clamp(impactSpeed/7,.7,2.2);state.vehicles.partDurability[id]=after;detachWorldVehiclePieces(vehicleVisual,impactSpeed>7?2:1,severity);if(vehicle?.group)applyWorldVehicleModulesToGroup(vehicle.group,id);if(before>55&&after<=55)toast('Uma peça do veículo se soltou com a batida.','warn',2100);else if(before>22&&after<=22)toast('O veículo precisa ser remontado na bancada da oficina.','warn',2500);saveState();};
  function vehicleCatalogOptions(field,selected){return OTTHI_WORLD_VEHICLE_CATALOG[field].map(([id,name])=>`<button class="avatar-option ${selected===id?'selected':''}" data-world-vehicle-field="${field}" data-world-vehicle-value="${id}"><b>${field==='wheels'?'◉':field==='roof'?'▰':field==='lights'?'✦':'▣'}</b><span>${name}</span></button>`).join('');}
  function openWorldModularGarage(vehicleId=''){
    ensureOtthiWorldState();const available=world?.vehicles||[],resolved=vehicleId||player.car.id||state.vehicles.lastUsedId||available[0]?.id||'garage-orange',vehicle=vehicleById(resolved)||available[0],id=vehicle?.id||resolved,parts=worldVehicleParts(id),durability=Number(state.vehicles.partDurability[id]||100);
    openModal('Montagem de veículos',`<div class="otthi-garage-status"><span>🚙</span><div><b>${escapeHtml(vehicle?.label||id)}</b><small>Peças montadas: ${durability}%</small></div></div><label class="field"><span>Veículo</span><select data-world-vehicle-select>${available.map(item=>`<option value="${item.id}" ${item.id===id?'selected':''}>${escapeHtml(item.label||item.id)}</option>`).join('')}</select></label>${Object.entries({body:'Carroceria',hood:'Capô',roof:'Teto',wheels:'Rodas',rear:'Parte traseira',lights:'Faróis'}).map(([field,title])=>`<section class="avatar-section"><h3>${title}</h3><div class="avatar-grid">${vehicleCatalogOptions(field,parts[field])}</div></section>`).join('')}<section class="avatar-section"><h3>Cores das peças</h3><div class="world-color-grid"><label>Principal<input type="color" data-world-vehicle-color="primary" value="${parts.primary}"></label><label>Secundária<input type="color" data-world-vehicle-color="secondary" value="${parts.secondary}"></label><label>Destaque<input type="color" data-world-vehicle-color="accent" value="${parts.accent}"></label></div></section><div class="modal-actions"><button class="btn primary" data-world-vehicle-save>Salvar visual</button><button class="btn good" data-world-vehicle-repair>Remontar todas as peças</button></div>`,root=>{
      $('[data-world-vehicle-select]',root).onchange=event=>openWorldModularGarage(event.currentTarget.value);
      $$('[data-world-vehicle-field]',root).forEach(button=>button.onclick=()=>{const target=worldVehicleParts(id),field=button.dataset.worldVehicleField,value=button.dataset.worldVehicleValue;target[field]=value;state.vehicles.modularParts[id]=target;$$(`[data-world-vehicle-field="${field}"]`,root).forEach(item=>item.classList.toggle('selected',item===button));if(vehicle?.group)applyWorldVehicleModulesToGroup(vehicle.group,id);if(player.vehicle&&player.car.id===id)applyWorldVehicleModulesToGroup(vehicleVisual,id);});
      $$('[data-world-vehicle-color]',root).forEach(input=>input.oninput=()=>{const target=worldVehicleParts(id);target[input.dataset.worldVehicleColor]=safeAvatarColor(input.value,target[input.dataset.worldVehicleColor]);state.vehicles.modularParts[id]=target;if(vehicle?.group)applyWorldVehicleModulesToGroup(vehicle.group,id);if(player.vehicle&&player.car.id===id)applyWorldVehicleModulesToGroup(vehicleVisual,id);});
      $('[data-world-vehicle-save]',root).onclick=()=>{saveState(true).finally(()=>syncCloudProgress(true));closeModal();toast('Montagem do veículo salva no mesmo progresso.','good',2200);};
      $('[data-world-vehicle-repair]',root).onclick=()=>{state.vehicles.partDurability[id]=100;if(vehicle?.group)applyWorldVehicleModulesToGroup(vehicle.group,id);if(player.vehicle&&player.car.id===id)applyWorldVehicleModulesToGroup(vehicleVisual,id);saveState(true);openWorldModularGarage(id);toast('Todas as peças foram remontadas.','good',1600);};
    });
  }
  function createWorldModularGarageInteractable(){
    const index=world.interactables?.findIndex?.(item=>item.id==='otthi-world-garage')??-1;if(index>=0)world.interactables.splice(index,1);
    registerInteractable({id:'otthi-world-garage',type:'workshop',icon:'🧩',label:'Bancada de montagem e reparo de veículos',x:22,z:-12.5,radius:3.3,priority:182,action:()=>openWorldModularGarage()});
    otthiWorldRuntime.modularVehiclesReady=true;return true;
  }
