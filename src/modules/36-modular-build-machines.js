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
    body:Object.freeze([['classic','Clássica'],['sport','Esportiva'],['offroad','Aventura'],['service','Serviço']]),
    hood:Object.freeze([['flat','Plano'],['intake','Entrada de ar'],['power','Energia']]),
    roof:Object.freeze([['standard','Padrão'],['open','Sem teto'],['rack','Bagageiro'],['beacon','Sinalizador']]),
    wheels:Object.freeze([['city','Urbanas'],['sport','Esportivas'],['offroad','Todo-terreno']]),
    rear:Object.freeze([['none','Sem acessório'],['spoiler','Aerofólio'],['box','Caixa de carga']]),
    lights:Object.freeze([['warm','Clássicas'],['white','Brancas'],['energy','Energia']])
  });
  function defaultWorldVehicleParts(){return{body:'classic',hood:'flat',roof:'standard',wheels:'city',rear:'none',lights:'warm',primary:'#f28a22',secondary:'#0aa7b8',accent:'#f5d84d'};}
  function worldVehicleParts(vehicleId){ensureOtthiWorldState();const current=state.vehicles.modularParts[vehicleId]||{};const next={...defaultWorldVehicleParts(),...current};state.vehicles.modularParts[vehicleId]=next;state.vehicles.partDurability[vehicleId]=Number.isFinite(state.vehicles.partDurability[vehicleId])?clamp(state.vehicles.partDurability[vehicleId],0,100):100;return next;}
  function removeWorldVehicleModules(group){const previous=group?.userData?.otthiWorldVehicleModules;if(previous){group.remove(previous);disposeWorldAvatarObject(previous);}if(group?.userData)group.userData.otthiWorldVehicleModules=null;}
  function worldVehicleModuleMaterial(color,metalness=.18,roughness=.42){const material=new THREE.MeshStandardMaterial({map:loadWorldTexture('toy-plastic','basecolor',{repeat:[1,1],color:true}),normalMap:loadWorldTexture('toy-plastic','normal',{repeat:[1,1]}),roughnessMap:loadWorldTexture('toy-plastic','roughness',{repeat:[1,1]}),color:new THREE.Color(color),metalness,roughness});material.userData.otthiWorldAvatarMaterial=true;return material;}
  function applyWorldVehicleModulesToGroup(group,vehicleId){
    if(!group||!vehicleId)return false;removeWorldVehicleModules(group);const parts=worldVehicleParts(vehicleId),durability=Number(state.vehicles.partDurability[vehicleId]||100),modules=new THREE.Group();modules.name=`OTTHI_WORLD_VEHICLE_${vehicleId}`;group.add(modules);group.userData.otthiWorldVehicleModules=modules;
    const primary=worldVehicleModuleMaterial(parts.primary),secondary=worldVehicleModuleMaterial(parts.secondary),accent=worldVehicleModuleMaterial(parts.accent,.28,.34),dark=worldVehicleModuleMaterial(0x17202b,.08,.82),energy=worldVehicleModuleMaterial(0x5de6ff,.22,.18);energy.emissive=new THREE.Color(0x1684a8);energy.emissiveIntensity=.72;
    const part=(w,h,d,material,x,y,z)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;modules.add(mesh);if(state.settings?.worldOutlines!==false)addVoxelOutline(mesh,0x102238,.20);return mesh;};
    if(parts.body==='sport'){part(2.02,.16,.34,primary,0,.22,1.42);part(2.05,.14,.30,primary,0,.22,-1.42);part(.24,.28,2.45,secondary,-1.0,.38,0);part(.24,.28,2.45,secondary,1.0,.38,0);}
    else if(parts.body==='offroad'){part(2.12,.24,.42,dark,0,.32,1.42);part(2.12,.24,.42,dark,0,.32,-1.42);for(const x of[-1.02,1.02])part(.20,.42,2.42,dark,x,.44,0);}
    else if(parts.body==='service'){part(1.92,.20,.36,accent,0,.34,1.39);part(1.92,.20,.36,accent,0,.34,-1.39);part(.12,.34,2.3,accent,-.97,.48,0);part(.12,.34,2.3,accent,.97,.48,0);}
    if(parts.hood==='intake')part(.72,.24,.64,secondary,0,.98,.73);else if(parts.hood==='power'){part(.74,.18,.66,energy,0,.99,.73);part(.12,.08,.72,accent,0,1.10,.73);}
    if(durability>20&&parts.roof==='rack'){for(const x of[-.62,.62])part(.10,.36,1.18,dark,x,1.36,-.42);for(const z of[-.92,.02])part(1.36,.10,.10,dark,0,1.55,z);}
    else if(durability>20&&parts.roof==='beacon'){part(1.18,.12,.22,dark,0,1.31,-.42);part(.34,.22,.24,energy,-.32,1.47,-.42);part(.34,.22,.24,accent,.32,1.47,-.42);}
    if(durability>10&&parts.rear==='spoiler'){part(1.46,.12,.34,secondary,0,1.12,-1.32);for(const x of[-.5,.5])part(.10,.44,.10,dark,x,.91,-1.23);}
    else if(durability>10&&parts.rear==='box')part(1.32,.66,.82,secondary,0,.93,-1.12);
    const wheelRadius=parts.wheels==='offroad'?.42:parts.wheels==='sport'?.36:.33,wheelWidth=parts.wheels==='offroad'?.34:.28,wheelMaterial=new THREE.MeshStandardMaterial({map:loadWorldTexture('vehicle-tire','basecolor',{repeat:[1,1],color:true,nearest:true}),normalMap:loadWorldTexture('vehicle-tire','normal',{repeat:[1,1]}),roughnessMap:loadWorldTexture('vehicle-tire','roughness',{repeat:[1,1]}),color:0x20242b,roughness:.94});wheelMaterial.userData.otthiWorldAvatarMaterial=true;
    for(const [x,z]of[[-.86,-.8],[.86,-.8],[-.86,.8],[.86,.8]]){const wheel=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,14),wheelMaterial);wheel.position.set(x,.24,z);wheel.rotation.z=Math.PI/2;wheel.castShadow=true;modules.add(wheel);const hub=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,wheelWidth+.03,10),parts.wheels==='sport'?accent:secondary);hub.position.copy(wheel.position);hub.rotation.z=Math.PI/2;modules.add(hub);}
    const lightMaterial=parts.lights==='energy'?energy:worldVehicleModuleMaterial(parts.lights==='white'?0xffffff:0xffe7a1,.1,.2);lightMaterial.emissive=new THREE.Color(parts.lights==='energy'?0x28c7ef:0xffc95a);lightMaterial.emissiveIntensity=parts.lights==='energy'?1.1:.72;for(const x of[-.58,.58])part(.34,.18,.08,lightMaterial,x,.52,1.37);
    modules.userData.vehicleId=vehicleId;modules.userData.durability=durability;otthiWorldRuntime.stats.vehicleModules++;return true;
  }
  const legacyCreateToyCar=createToyCar;
  createToyCar=function createToyCarWorld(x,z,options={}){const vehicle=legacyCreateToyCar(x,z,options);applyWorldVehicleModulesToGroup(vehicle?.group,vehicle?.id);return vehicle;};
  const legacyApplyVehicleAppearance=applyVehicleAppearance;
  applyVehicleAppearance=function applyVehicleAppearanceWorld(vehicle){legacyApplyVehicleAppearance(vehicle);if(vehicleVisual&&vehicle?.id)applyWorldVehicleModulesToGroup(vehicleVisual,vehicle.id);};
  const legacyRegisterVehicleImpact=registerVehicleImpact;
  registerVehicleImpact=function registerVehicleImpactWorld(){const vehicle=currentVehicleRef(),id=vehicle?.id||player.car.id;legacyRegisterVehicleImpact();if(!id)return;const before=Number(state.vehicles.partDurability[id]??100),after=clamp(before-5,0,100);state.vehicles.partDurability[id]=after;if(vehicle?.group)applyWorldVehicleModulesToGroup(vehicle.group,id);if(player.vehicle&&vehicleVisual)applyWorldVehicleModulesToGroup(vehicleVisual,id);if(before>20&&after<=20)toast('Uma peça externa ficou solta. Visite a oficina para reparar.','warn',2400);saveState();};
  function vehicleCatalogOptions(field,selected){return OTTHI_WORLD_VEHICLE_CATALOG[field].map(([id,name])=>`<button class="avatar-option ${selected===id?'selected':''}" data-world-vehicle-field="${field}" data-world-vehicle-value="${id}"><b>${field==='wheels'?'◉':field==='roof'?'▰':field==='lights'?'✦':'▣'}</b><span>${name}</span></button>`).join('');}
  function openWorldModularGarage(vehicleId=''){
    ensureOtthiWorldState();const available=world?.vehicles||[],resolved=vehicleId||player.car.id||state.vehicles.lastUsedId||available[0]?.id||'garage-orange',vehicle=vehicleById(resolved)||available[0],id=vehicle?.id||resolved,parts=worldVehicleParts(id),durability=Number(state.vehicles.partDurability[id]||100);
    openModal('Oficina modular OTTHI',`<div class="otthi-garage-status"><span>🚙</span><div><b>${escapeHtml(vehicle?.label||id)}</b><small>Integridade das peças: ${durability}%</small></div></div><label class="field"><span>Veículo</span><select data-world-vehicle-select>${available.map(item=>`<option value="${item.id}" ${item.id===id?'selected':''}>${escapeHtml(item.label||item.id)}</option>`).join('')}</select></label>${Object.entries({body:'Carroceria',hood:'Capô',roof:'Teto',wheels:'Rodas',rear:'Parte traseira',lights:'Faróis'}).map(([field,title])=>`<section class="avatar-section"><h3>${title}</h3><div class="avatar-grid">${vehicleCatalogOptions(field,parts[field])}</div></section>`).join('')}<section class="avatar-section"><h3>Cores das peças</h3><div class="world-color-grid"><label>Principal<input type="color" data-world-vehicle-color="primary" value="${parts.primary}"></label><label>Secundária<input type="color" data-world-vehicle-color="secondary" value="${parts.secondary}"></label><label>Destaque<input type="color" data-world-vehicle-color="accent" value="${parts.accent}"></label></div></section><div class="modal-actions"><button class="btn primary" data-world-vehicle-save>Salvar montagem</button><button class="btn good" data-world-vehicle-repair>Reparar peças</button></div>`,root=>{
      $('[data-world-vehicle-select]',root).onchange=event=>openWorldModularGarage(event.currentTarget.value);
      $$('[data-world-vehicle-field]',root).forEach(button=>button.onclick=()=>{const target=worldVehicleParts(id),field=button.dataset.worldVehicleField,value=button.dataset.worldVehicleValue;target[field]=value;state.vehicles.modularParts[id]=target;$$(`[data-world-vehicle-field="${field}"]`,root).forEach(item=>item.classList.toggle('selected',item===button));if(vehicle?.group)applyWorldVehicleModulesToGroup(vehicle.group,id);if(player.vehicle&&player.car.id===id)applyWorldVehicleModulesToGroup(vehicleVisual,id);});
      $$('[data-world-vehicle-color]',root).forEach(input=>input.oninput=()=>{const target=worldVehicleParts(id);target[input.dataset.worldVehicleColor]=safeAvatarColor(input.value,target[input.dataset.worldVehicleColor]);state.vehicles.modularParts[id]=target;if(vehicle?.group)applyWorldVehicleModulesToGroup(vehicle.group,id);if(player.vehicle&&player.car.id===id)applyWorldVehicleModulesToGroup(vehicleVisual,id);});
      $('[data-world-vehicle-save]',root).onclick=()=>{saveState(true).finally(()=>syncCloudProgress(true));closeModal();toast('Montagem do veículo salva no mesmo progresso.','good',2200);};
      $('[data-world-vehicle-repair]',root).onclick=()=>{state.vehicles.partDurability[id]=100;if(vehicle?.group)applyWorldVehicleModulesToGroup(vehicle.group,id);if(player.vehicle&&player.car.id===id)applyWorldVehicleModulesToGroup(vehicleVisual,id);saveState(true);openWorldModularGarage(id);toast('Peças reparadas.','good',1600);};
    });
  }
  function createWorldModularGarageInteractable(){
    if(world.interactables?.some(item=>item.id==='otthi-world-garage'))return false;registerInteractable({id:'otthi-world-garage',type:'workshop',icon:'🛠',label:'Abrir oficina modular OTTHI',x:22,z:-13.5,radius:3.2,priority:244,action:()=>openWorldModularGarage()});otthiWorldRuntime.modularVehiclesReady=true;return true;
  }
