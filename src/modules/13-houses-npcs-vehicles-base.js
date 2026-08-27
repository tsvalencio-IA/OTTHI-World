/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 13-houses-npcs-vehicles-base.js
 * Escopo: Casas, interiores, NPCs, inimigos, cristais, veículos e academia
 * Linhas de origem V642: 2185-2417
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function shadeColor(hex,amount){
    const r=Math.max(0,Math.min(255,((hex>>16)&255)+amount));
    const g=Math.max(0,Math.min(255,((hex>>8)&255)+amount));
    const b=Math.max(0,Math.min(255,(hex&255)+amount));
    return (r<<16)|(g<<8)|b;
  }
  function decorateHouseCommercial(house,config){
    const {id,x,z,color,roofColor,publicBuilding}=config,trim=shadeColor(color,38),dark=shadeColor(color,-44);
    premiumBox(9.3,.18,.22,dark,x,2.76,z+3.5,house.front);
    makePlanter(house.front,x-2.45,.88,z+3.68,id==='blue'?0x52c7ff:id==='pink'?0xff6ba7:0xffd34d);makePlanter(house.front,x+2.45,.88,z+3.68,0x75e56e);
    if(publicBuilding){
      const awningColor=id==='shop'?0xe5483e:0x2f7fd8;
      for(let i=-4;i<=4;i++)box(.58,.18,1.25,i%2?0xfff5df:awningColor,x+i*.58,2.44,z+3.92,house.front);
      premiumBox(4.5,.78,.24,0x18334d,x,3.08,z+3.6,house.front);
      premiumBox(.62,.45,.62,trim,x-3.25,3.32,z+3.55,house.front);premiumBox(.62,.45,.62,trim,x+3.25,3.32,z+3.55,house.front);
    }else{
      premiumBox(2.25,.24,1.1,trim,x,2.37,z+3.78,house.front);premiumBox(.18,1.12,.18,trim,x-.9,1.77,z+3.8,house.front);premiumBox(.18,1.12,.18,trim,x+.9,1.77,z+3.8,house.front);
    }
    premiumBox(.45,1.2,.45,shadeColor(roofColor,-35),x+2.8,4.6,z-1.4,house.roof);premiumBox(.65,.18,.65,0xd8dce2,x+2.8,5.22,z-1.4,house.roof);
    house.roof.traverse(o=>{if(o.isMesh&&o.geometry?.type==='BoxGeometry')addVoxelOutline(o,0x182238,.24)});
    house.front.traverse(o=>{if(o.isMesh&&o.geometry?.type==='BoxGeometry')addVoxelOutline(o,0x182238,.25)});
  }

  function createHouse(config) {
    const {id,name,x,z,color,roofColor,price=0,publicBuilding=false}=config;
    const house={id,name,x,z,w:9,d:7,color,roofColor,price,publicBuilding,roof:new THREE.Group(),front:new THREE.Group(),interiorObjects:[],owned:!!state.houses[id]?.owned};
    worldGroup.add(house.roof,house.front);
    const wallTexture=id.startsWith('school')?textures.schoolWall:id.startsWith('police')?textures.policeWall:id==='fire-station'?textures.fireWall:id.startsWith('shop')?textures.marketWall:textures.brick,wallMat=tintedBrickMaterial(color,wallTexture),roofMat=texturedRoofMaterial(roofColor),roofLight=texturedRoofMaterial(shadeColor(roofColor,18)),corner=renderMat(new THREE.Color(color).lerp(new THREE.Color(0xffffff),.48).getHex(),{roughness:.78});
    const floorMat=id.startsWith('school')?materials.schoolFloor:id.startsWith('shop')?materials.marketFloor:(id.startsWith('police')||id==='fire-station')?materials.concrete:materials.interiorFloor;box(9,.25,7,floorMat,x,.12,z);
    box(9,2.8,.35,wallMat,x,1.5,z-3.32);box(.35,2.8,7,wallMat,x-4.32,1.5,z);box(.35,2.8,7,wallMat,x+4.32,1.5,z);
    box(3.6,2.8,.35,wallMat,x-2.7,1.5,z+3.32,house.front);box(3.6,2.8,.35,wallMat,x+2.7,1.5,z+3.32,house.front);
    for(const cx of [-4.12,4.12]){box(.24,2.82,.4,corner,x+cx,1.5,z-3.28);box(.24,2.82,.4,corner,x+cx,1.5,z+3.28,house.front);}
    box(9.8,.62,7.75,roofMat,x,3.18,z,house.roof);box(8.8,.35,6.8,roofLight,x,3.55,z,house.roof);
    box(7.5,.42,7.15,roofMat,x,3.86,z,house.roof);box(5.9,.4,5.85,texturedRoofMaterial(shadeColor(roofColor,26)),x,4.18,z,house.roof);
    const spotMat=renderMat(0xfff2df,{roughness:.52});
    [[-2.5,-1.7],[2.25,-1.45],[-.4,1.8],[1.2,.5],[-1.2,-.1]].forEach(([ox,oz],i)=>box(i%2?.72:.88,.16,i%2?.72:.88,spotMat,x+ox,4.42,z+oz,house.roof));
    const door=box(1.45,2.25,.18,materials.wood,x,1.12,z+3.48);door.userData.houseId=id;
    box(.18,2.0,.2,corner,x-.83,1.16,z+3.46,house.front);box(.18,2.0,.2,corner,x+.83,1.16,z+3.46,house.front);
    makeWindow(house.front,x-2.4,1.45,z+3.52,1.12,.86,0xf6efe1);makeWindow(house.front,x+2.4,1.45,z+3.52,1.12,.86,0xf6efe1);
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(1.8,.66),new THREE.MeshStandardMaterial({map:signTexture(name,'#18334d','#ffffff'),roughness:.65,side:THREE.DoubleSide}));
    sign.position.set(x,2.36,z+3.58);house.front.add(sign);
    box(.16,.55,.16,materials.wood,x-1.55,.28,z+4.7);box(.36,.25,.24,shadeColor(color,12),x-1.55,.62,z+4.7);
    if(!publicBuilding){createFlower(x-3.1,z+4.7,shadeColor(0xff70c8,(id.charCodeAt(0)%3)*20-20));createFlower(x+3.1,z+4.7,0xffdf55);}
    createLamp(x-3.7,z+4.0);createLamp(x+3.7,z+4.0);
    house.door=door;
    registerCollider(x,z-3.32,9,.35,{houseId:id});registerCollider(x-4.32,z,.35,7,{houseId:id});registerCollider(x+4.32,z,.35,7,{houseId:id});registerCollider(x-2.7,z+3.32,3.6,.35,{houseId:id});registerCollider(x+2.7,z+3.32,3.6,.35,{houseId:id});
    const publicDoor=!!publicBuilding,workshopDoor=id==='workshop';world.houses.push(house);registerInteractable({id:`door-${id}`,type:'door',icon:'🚪',label:workshopDoor?'Entrar na Oficina':`Abrir: ${name}`,x,z:z+4.0,radius:workshopDoor?3.5:publicDoor?3.0:2.5,priority:workshopDoor?480:publicDoor?320:230,action:()=>handleHouseDoor(house)});
    decorateHouseCommercial(house,config);return house;
  }

  function addHouseInterior(house, type='home') {
    if(type==='home'){
      const bed=createFurniture(house,'bed',-2.85,-1.95,0,'Dormir');
      const sofa=createFurniture(house,'sofa',.85,-1.95,0x8b5cf6,'Sentar no sofá');
      const tv=createFurniture(house,'tv',2.85,-.25,0,'Assistir televisão');
      const fridge=createFurniture(house,'fridge',-3.05,1.55,0,'Abrir geladeira');
      const stove=createFurniture(house,'stove',-1.65,1.55,0,'Cozinhar');
      const sink=createFurniture(house,'sink',-.25,1.55,0,'Beber água');
      const shower=createFurniture(house,'shower',3.1,1.6,0,'Tomar banho');
      const chest=createFurniture(house,'chest',3.15,-2.05,0,'Abrir baú');
      const wardrobe=createFurniture(house,'wardrobe',2.95,.65,0,'Trocar roupa');
      createFurniture(house,'table',-1.6,.15,0,'Mesa de refeições');createFurniture(house,'plant',1.65,.55,0,'Planta da casa');
      premiumBox(3.5,.04,2.2,0xd6a65d,house.x-1.7,.18,house.z+1.45,worldGroup,0x765228);
      premiumBox(3.2,.04,2.0,0x7057b7,house.x+1.1,.18,house.z-1.85,worldGroup,0x3f2c65);
      premiumBox(8.1,.12,.18,0x63b4e8,house.x,.78,house.z-3.08);premiumBox(.18,2.0,.18,0x63b4e8,house.x-3.9,1.05,house.z-2.95);premiumBox(.18,2.0,.18,0x63b4e8,house.x+3.9,1.05,house.z-2.95);
      const lampA=addGlow(house.x-2.1,2.25,house.z-.1,0xffc66e,5),lampB=addGlow(house.x+2.1,2.25,house.z-.1,0xffc66e,5);house.interiorObjects.push(lampA,lampB);
      registerActivity(house,bed,'bed');registerActivity(house,sofa,'sofa');registerActivity(house,tv,'tv');registerActivity(house,fridge,'fridge');registerActivity(house,stove,'stove');registerActivity(house,sink,'sink');registerActivity(house,shower,'shower');registerActivity(house,chest,'chest');registerActivity(house,wardrobe,'wardrobe');
    } else if(type==='shop'){
      premiumBox(8.2,.08,6.2,materials.marketFloor,house.x,.16,house.z);premiumBox(8.1,1.15,.12,materials.marketWall,house.x,.72,house.z-3.08);
      const table=createFurniture(house,'table',0,2.05,0,'Comprar itens');registerActivity(house,table,'shop');
      for(const x of [-2.7,0,2.7]){createFurniture(house,'bookshelf',x,-1.35,0,'Prateleira de produtos');for(const z of [-.95,-1.65])premiumBox(.55,.32,.42,[0xffd84d,0x5bd18b,0xff7b72][Math.abs(Math.round(x))%3],house.x+x,.95,house.z+z);}
      createFurniture(house,'fridge',3.05,1.25,0,'Geladeira de bebidas');createFurniture(house,'plant',-3.2,2.1,0,'Horta do mercado');
      const lampA=addGlow(house.x-2.3,2.35,house.z,0xffffff,5),lampB=addGlow(house.x+2.3,2.35,house.z,0xffffff,5);house.interiorObjects.push(lampA,lampB);premiumBox(2.4,.12,.82,0x4b7a5d,house.x-1.45,1.18,house.z+2.45);premiumBox(1.35,.42,.12,0xfff1b8,house.x-1.45,1.52,house.z+2.02);for(const px of [-2.8,-1.8,-.8,.8,1.8,2.8])premiumBox(.58,.08,.58,0xf7e9cb,house.x+px,2.55,house.z);
    } else if(type==='workshop'){
      const table=createFurniture(house,'table',0,-1.0,0,'Usar oficina');registerActivity(house,table,'workshop');
      createFurniture(house,'chest',2.8,-1.8,0,'Baú de ferramentas');
    } else if(type==='school'){
      premiumBox(8.2,.08,6.2,materials.schoolFloor,house.x,.16,house.z);premiumBox(8.1,1.0,.12,materials.interiorWall,house.x,.68,house.z-3.08);
      const board=createFurniture(house,'board',0,-2.75,0,'Começar aula');registerActivity(house,board,'school');
      for(const [x,z] of [[-2.6,-1.2],[0,-1.2],[2.6,-1.2],[-2.6,.65],[0,.65],[2.6,.65]])createFurniture(house,'desk',x,z,0,'Carteira escolar');
      createFurniture(house,'bookshelf',3.25,2.15,0,'Biblioteca');createFurniture(house,'plant',-3.3,2.1,0,'Horta da turma');createFurniture(house,'desk',0,2.15,0,'Mesa do professor');const teacherWardrobe=createFurniture(house,'wardrobe',-3.25,1.15,0,'Uniformes profissionais');registerActivity(house,teacherWardrobe,'wardrobe');for(const x of [-2.6,0,2.6])premiumBox(.7,.85,.28,0x4a90c4,house.x+x,.62,house.z+2.78);for(const [px,c] of [[-2.5,0xffd34d],[0,0x64d986],[2.5,0xff728e]])premiumBox(1.45,.85,.08,c,house.x+px,1.75,house.z-3.0);for(const px of [-2.7,0,2.7])premiumBox(.72,.08,.72,0xfff4d8,house.x+px,2.58,house.z);const lampA=addGlow(house.x-2.4,2.35,house.z,0xfff6cf,5),lampB=addGlow(house.x+2.4,2.35,house.z,0xfff6cf,5);house.interiorObjects.push(lampA,lampB);
    } else if(type==='police'){
      premiumBox(8.2,.08,6.2,materials.concrete,house.x,.16,house.z);premiumBox(8.1,1.05,.12,materials.interiorWall,house.x,.7,house.z-3.08);
      const radio=createFurniture(house,'radio',-2.7,-1.4,0,'Central de segurança');registerActivity(house,radio,'police');
      createFurniture(house,'desk',0,-1.1,0,'Mesa da patrulha');createFurniture(house,'bench',2.5,1.8,0,'Banco de espera');
      createFurniture(house,'board',0,2.7,0,'Regras de trânsito');createFurniture(house,'bookshelf',-3.25,1.7,0,'Guias de segurança');const policeWardrobe=createFurniture(house,'wardrobe',3.15,-1.85,0,'Armário de uniformes');registerActivity(house,policeWardrobe,'wardrobe');premiumBox(8.0,.22,.1,0x245da8,house.x,1.08,house.z-3.0);for(const px of [-1.0,0,1.0])premiumBox(.72,.42,.08,0x7edfff,house.x+px,1.48,house.z-2.94);premiumBox(1.65,.08,1.0,0x2a4058,house.x,2.55,house.z);
    } else if(type==='firestation'){
      premiumBox(8.2,.08,6.2,materials.concrete,house.x,.16,house.z);premiumBox(8.1,1.05,.12,materials.fireWall||materials.interiorWall,house.x,.7,house.z-3.08);
      const dispatch=createFurniture(house,'radio',-2.5,-1.35,0,'Central dos bombeiros');registerActivity(house,dispatch,'firestation');
      createFurniture(house,'desk',0,-1.15,0,'Mesa de emergência');const fireWardrobe=createFurniture(house,'wardrobe',2.9,-1.5,0,'Uniformes de bombeiro');registerActivity(house,fireWardrobe,'wardrobe');createFurniture(house,'bench',0,1.7,0,'Banco da equipe');createFurniture(house,'board',-2.8,2.35,0,'Treinamento de segurança');
      for(const x of [1.75,2.45,3.15])premiumCylinder(.18,1.7,0xe24b3f,house.x+x,.9,house.z+2.45,worldGroup,12);for(let line=-3;line<=3;line+=1.2)premiumBox(.48,.025,5.6,line<0?0xf1c83b:0x222b34,house.x+line,.205,house.z);for(const px of [-2.9,-2.15,-1.4]){premiumBox(.62,1.65,.55,0xc43d38,house.x+px,.88,house.z+2.35);premiumBox(.5,.18,.62,0xf1cc3d,house.x+px,1.8,house.z+2.35);}premiumBox(2.2,.08,1.0,0xfff0cf,house.x,2.55,house.z);
    } else if(type==='neighbor'){
      const sofa=createFurniture(house,'sofa',1,-1.5,0xef6c9d,'Sentar');registerActivity(house,sofa,'sofa');
      const tv=createFurniture(house,'tv',1,.2,0,'Assistir TV');registerActivity(house,tv,'tv');
      createFurniture(house,'bed',-2.5,-1.7,0,'Cama');
    }
    registerInteractable({id:`exit-${house.id}`,type:'exit',icon:'🚪',label:'Sair da casa',x:house.x,z:house.z+2.65,radius:1.5,priority:240,houseId:house.id,action:()=>exitHouse()});
  }
  function registerActivity(house,item,activity){
    const priority=({stove:180,fridge:170,sink:165,bed:160,shower:155,tv:150,sofa:145,wardrobe:140,chest:120,shop:170,workshop:170,school:185,police:185,firestation:190})[activity]||100;
    registerInteractable({id:`${activity}-${house.id}`,type:'activity',activity,icon:activityIcon(activity),label:item.label,x:item.x,z:item.z,radius:1.75,priority,houseId:house.id,action:()=>useActivity(activity,house)});
  }
  function activityIcon(type){return ({bed:'🛏',sofa:'🛋',tv:'📺',fridge:'🍎',stove:'🍳',sink:'💧',shower:'🚿',chest:'🎁',shop:'🛒',workshop:'🛠',wardrobe:'👕',school:'🏫',police:'🛡️',firestation:'🚒'})[type]||'✋';}

  const OTTHI_TOY_THEMES=Object.freeze(['lego','minecraft','playmobil','mario-world']);
  function normalizeToyTheme(value){const raw=String(value??'').trim().toLowerCase();if(raw==='lego'||raw==='leggo')return 'lego';if(raw==='minecraft'||raw==='manycraft')return 'minecraft';if(raw==='playmobil')return 'playmobil';if(raw==='mario'||raw==='marioworld'||raw==='mario-world')return 'mario-world';return 'lego';}
  function toyThemeFromSeed(seed){return OTTHI_TOY_THEMES[Math.abs(Number(seed)||0)%OTTHI_TOY_THEMES.length];}
  function normalizeVehicleBodyType(value){const raw=String(value??'').trim().toLowerCase();if(['moto','motorcycle','bike'].includes(raw))return 'moto';if(['truck','caminhao','caminhão','lorry'].includes(raw))return 'truck';if(['utility','utilitario','utilitário','van','pickup'].includes(raw))return 'utility';return 'small';}
  function vehicleKindIcon(kind){return kind==='moto'?'🏍️':kind==='truck'?'🚚':kind==='utility'?'🚐':'🚗';}

  function createNPC(id,name,x,z,color,pathRadius=3){
    const group=new THREE.Group();group.position.set(x,0,z);worldGroup.add(group);
    const hairPalette=[0x34251c,0x15191f,0x6a4429,0xb36b35,0xd5b36a,0x643e55],skinPalette=[0xffd7b1,0xeab589,0xbd825d,0x8d5b43,0x6f4637];
    const hash=String(id).split('').reduce((a,c)=>a+c.charCodeAt(0),0),theme=toyThemeFromSeed(hash),hairColor=hairPalette[hash%hairPalette.length],naturalSkin=skinPalette[hash%skinPalette.length],skinColor=theme==='lego'?0xf4d64b:theme==='playmobil'?0xffd77a:naturalSkin;
    const shirt=renderMat(color,{roughness:.68}),shirtDark=renderMat(shadeColor(color,-32),{roughness:.74}),pants=renderMat(hash%2?0x294b75:0x43365f,{roughness:.78}),shoe=renderMat(hash%3===0?0xf4f5f7:0x202935,{roughness:.6}),skinMat=renderMat(skinColor,{roughness:.72}),hairMat=renderMat(hairColor,{roughness:.78}),white=renderMat(0xffffff,{roughness:.42});
    const leftArm=new THREE.Group(),rightArm=new THREE.Group(),leftLeg=new THREE.Group(),rightLeg=new THREE.Group();group.add(leftArm,rightArm,leftLeg,rightLeg);
    const addBox=(parent,w,h,d,material,x=0,y=0,z=0)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
    const addSphere=(parent,r,material,x=0,y=0,z=0,sx=1,sy=1,sz=1)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
    const addCylinder=(parent,rt,rb,h,material,x=0,y=0,z=0,radial=12)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,radial),material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
    let body,head;
    if(theme==='lego'){
      body=addBox(group,.98,1.05,.58,shirt,0,1.28,0);head=addCylinder(group,.36,.36,.64,skinMat,0,2.04,0,20);addCylinder(group,.09,.09,.12,skinMat,0,2.42,0,14);
      leftArm.position.set(-.58,1.58,0);rightArm.position.set(.58,1.58,0);leftLeg.position.set(-.21,.82,0);rightLeg.position.set(.21,.82,0);
      addBox(leftArm,.22,.58,.22,shirt,0,-.28,0);addBox(rightArm,.22,.58,.22,shirt,0,-.28,0);addCylinder(leftArm,.10,.10,.18,skinMat,0,-.64,.02,12);addCylinder(rightArm,.10,.10,.18,skinMat,0,-.64,.02,12);addBox(leftLeg,.28,.72,.28,pants,0,-.36,0);addBox(rightLeg,.28,.72,.28,pants,0,-.36,0);addBox(leftLeg,.34,.16,.44,shoe,0,-.82,.07);addBox(rightLeg,.34,.16,.44,shoe,0,-.82,.07);
      for(const [sx,sz] of [[-.15,-.12],[.15,-.12],[-.15,.12],[.15,.12]])addCylinder(group,.055,.055,.08,hairMat,sx,2.44,sz,10);
    }else if(theme==='minecraft'){
      body=addBox(group,.96,1.08,.58,shirt,0,1.28,0);head=addBox(group,.76,.76,.76,skinMat,0,2.08,0);addBox(group,.78,.16,.76,hairMat,0,2.46,0);
      leftArm.position.set(-.58,1.58,0);rightArm.position.set(.58,1.58,0);leftLeg.position.set(-.21,.82,0);rightLeg.position.set(.21,.82,0);
      addBox(leftArm,.28,.72,.28,shirt,0,-.34,0);addBox(rightArm,.28,.72,.28,shirt,0,-.34,0);addBox(leftLeg,.30,.76,.30,pants,0,-.38,0);addBox(rightLeg,.30,.76,.30,pants,0,-.38,0);addBox(leftLeg,.34,.16,.46,shoe,0,-.84,.08);addBox(rightLeg,.34,.16,.46,shoe,0,-.84,.08);
    }else if(theme==='playmobil'){
      body=addCylinder(group,.34,.50,1.02,shirt,0,1.24,0,18);head=addSphere(group,.42,skinMat,0,2.04,0,.98,1.06,.96);addSphere(group,.43,hairMat,0,2.22,-.02,.98,.58,.96);
      leftArm.position.set(-.50,1.56,0);rightArm.position.set(.50,1.56,0);leftLeg.position.set(-.18,.82,0);rightLeg.position.set(.18,.82,0);
      addCylinder(leftArm,.10,.12,.65,shirt,0,-.28,0,10);addCylinder(rightArm,.10,.12,.65,shirt,0,-.28,0,10);addSphere(leftArm,.11,skinMat,0,-.62,.03);addSphere(rightArm,.11,skinMat,0,-.62,.03);addCylinder(leftLeg,.12,.13,.72,pants,0,-.31,0,10);addCylinder(rightLeg,.12,.13,.72,pants,0,-.31,0,10);addBox(leftLeg,.28,.15,.42,shoe,0,-.72,.08);addBox(rightLeg,.28,.15,.42,shoe,0,-.72,.08);
    }else{
      body=addCylinder(group,.36,.46,1.0,shirt,0,1.26,0,14);head=addSphere(group,.41,skinMat,0,2.05,0,.98,1.02,.94);
      leftArm.position.set(-.49,1.56,0);rightArm.position.set(.49,1.56,0);leftLeg.position.set(-.18,.82,0);rightLeg.position.set(.18,.82,0);
      addCylinder(leftArm,.10,.11,.62,shirt,0,-.26,0,10);addCylinder(rightArm,.10,.11,.62,shirt,0,-.26,0,10);addSphere(leftArm,.12,white,0,-.59,.05);addSphere(rightArm,.12,white,0,-.59,.05);addCylinder(leftLeg,.12,.13,.68,pants,0,-.28,0,10);addCylinder(rightLeg,.12,.13,.68,pants,0,-.28,0,10);addBox(leftLeg,.34,.17,.50,shoe,0,-.70,.11);addBox(rightLeg,.34,.17,.50,shoe,0,-.70,.11);
      addSphere(group,.09,skinMat,0,1.98,.37,1.4,1,1);const moustache=renderMat(0x2b170f,{roughness:.72});addBox(group,.19,.04,.04,moustache,-.09,1.91,.37);addBox(group,.19,.04,.04,moustache,.09,1.91,.37);const cap=renderMat(hash%2?0xd93645:0x2d67cb,{roughness:.48});addSphere(group,.44,cap,0,2.35,0,1.16,.34,1.16);addBox(group,.58,.09,.26,cap,0,2.32,.36);
    }
    const eyeMat=renderMat(0x20232a,{roughness:.4});for(const ex of[-.14,.14])addSphere(group,.04,eyeMat,ex,2.05,.35);if(theme!=='mario-world')addSphere(group,.04,skinMat,0,1.98,.37,.75,1.2,.75);addBox(group,.15,.035,.026,0x9d5052,0,1.90,.37);
    if(theme!=='lego'&&theme!=='minecraft'&&theme!=='mario-world'&&hash%3===0){const fringe=addSphere(group,.2,hairMat,-.08,2.22,.28,1.55,.42,.5);}
    const npc={id,name,x,z,baseX:x,baseZ:z,color,group,pathRadius,phase:Math.random()*6.28,friendship:state.friendship[id]||0,theme,body,head,limbs:{leftArm,rightArm,leftLeg,rightLeg},brain:{state:'idle',target:null,nextThink:0,fearUntil:0,lastVehicle:'',lastVehicleAt:0,lastPlayerAt:0,wanderUntil:0,memory:[]}};
    const badge=new THREE.Sprite(new THREE.SpriteMaterial({map:iconTexture(name.charAt(0),'#ffffff','#15314b'),transparent:true,depthWrite:false}));badge.position.set(0,2.85,0);badge.scale.set(.5,.5,.5);badge.visible=false;group.add(badge);npc.badge=badge;
    group.traverse(o=>{if(o.isMesh)addVoxelOutline(o,0x132238,.22);});
    world.npcs.push(npc);registerInteractable({id:`npc-${id}`,type:'npc',icon:'💬',label:`Conversar com ${name}`,radius:2.7,priority:160,getPos:()=>({x:npc.group.position.x,z:npc.group.position.z}),action:()=>talkToNPC(npc)});return npc;
  }

  function createNpcMobility(npc,type,route,speed){
    if(!npc||!Array.isArray(route)||route.length<2)return npc;const ride=new THREE.Group();npc.group.add(ride);const wheels=[],theme=normalizeToyTheme(npc.theme),bodyColor=npc.color,secondary=theme==='lego'?0xf5d84d:theme==='minecraft'?0x5c7448:theme==='playmobil'?0xf4f7ff:0x236ac7;
    const rideBox=(w,h,d,color,x=0,y=0,z=0)=>premiumBox(w,h,d,color,x,y,z,ride),rideSphere=(r,color,x=0,y=0,z=0,sx=1,sy=1,sz=1)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,12,8),renderMat(color,{roughness:.55}));m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;ride.add(m);return m;};
    if(type==='car'){
      if(theme==='minecraft'){rideBox(1.76,.34,2.46,0x24364d,0,.35,0);rideBox(1.58,.46,1.14,bodyColor,0,.63,.43);rideBox(1.34,.42,.80,secondary,0,.83,-.45);rideBox(.22,.34,2.12,secondary,-.88,.44,0);rideBox(.22,.34,2.12,secondary,.88,.44,0);}
      else if(theme==='playmobil'){rideBox(1.72,.32,2.36,0x24364d,0,.32,0);rideSphere(.78,bodyColor,0,.58,.18,1.05,.44,1.25);rideSphere(.64,secondary,0,.78,-.55,1,.52,1.08);}
      else if(theme==='mario-world'){rideBox(1.70,.30,2.30,0x24364d,0,.31,0);rideSphere(.80,bodyColor,0,.54,.16,1.08,.38,1.2);rideSphere(.60,secondary,0,.76,-.50,1,.48,1.05);rideBox(1.28,.10,.18,0xf5d84d,0,.34,-1.12);}
      else{rideBox(1.72,.34,2.45,0x24364d,0,.35,0);rideBox(1.55,.45,1.12,bodyColor,0,.62,.43);rideBox(1.30,.40,.78,secondary,0,.82,-.45);for(const [sx,sz]of[[-.24,-.2],[.24,-.2],[-.24,-.52],[.24,-.52]])rideSphere(.08,bodyColor,sx,1.06,sz,1,1.2,1);}
      for(const p of [[-.78,.28,-.72],[.78,.28,-.72],[-.78,.28,.72],[.78,.28,.72]]){const wheel=premiumCylinder(.28,.24,0x121821,p[0],p[1],p[2],ride,10);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}
    }else if(type==='moto'){
      for(const z of[-.72,.72]){const wheel=premiumCylinder(.34,.13,0x111822,0,.36,z,ride,12);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}rideBox(.28,.26,1.15,bodyColor,0,.58,0);rideBox(.56,.15,.42,secondary,0,.76,-.12);rideBox(.70,.06,.08,0xd7e2eb,0,1.05,.53);
      if(theme==='lego')for(const x of[-.10,.10])rideSphere(.055,0xffffff,x,.93,-.05,1,1.1,1);else if(theme==='minecraft')rideBox(.24,.22,.26,0x34495e,0,.87,.26);else if(theme==='playmobil')rideSphere(.16,secondary,0,.85,-.38,1.1,.8,1.2);else rideSphere(.12,0xffffff,0,.90,.33,1.2,.7,1);
    }else if(type==='bike'){
      for(const z of[-.72,.72]){const wheel=premiumCylinder(.34,.07,0x17202b,0,.36,z,ride,14);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}rideBox(.08,.65,1.2,bodyColor,0,.62,0);rideBox(.58,.07,.08,0xe8eef3,0,1.05,.62);rideBox(.45,.12,.34,secondary,0,.84,-.2);
    }else{
      rideBox(.62,.10,1.2,bodyColor,0,.12,0);for(const p of [[-.25,.08,-.42],[.25,.08,-.42],[-.25,.08,.42],[.25,.08,.42]]){const wheel=premiumCylinder(.09,.08,0x1c2633,p[0],p[1],p[2],ride,8);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}
    }
    ride.traverse(o=>{if(o.isMesh)addVoxelOutline(o,0x132238,.22);});const projected=buildTrafficRoute(route.map(p=>({x:p[0],z:p[1]})),true);npc.group.position.set(projected[0].x,0,projected[0].z);npc.group.userData.roadPath=projected;npc.group.userData.trafficCorridor=type==='car'?1.05:.82;npc.baseX=projected[0].x;npc.baseZ=projected[0].z;npc.mobility={id:`mobility-${npc.id}`,type,theme,route:projected,index:1,speed:speed||({car:4.4,moto:4.8,bike:3.2,skate:2.8})[type]||3,currentSpeed:0,radius:type==='car'?1.45:type==='moto'?.9:.7,group:npc.group,ride,wheels};return npc;
  }
  function createEnemy(type,x,z){
    const group=new THREE.Group();group.position.set(x,0,z);worldGroup.add(group);
    if(type==='slime'){box(1.35,.85,1.35,0x31c65b,0,.45,0,group);box(.18,.12,.05,0xff2441,-.28,.55,.7,group);box(.18,.12,.05,0xff2441,.28,.55,.7,group);}
    else if(type==='bat'){box(1.0,.75,1.0,0x35165e,0,1.4,0,group);box(.8,.18,.45,0x8c4ddb,-.8,1.4,0,group);box(.8,.18,.45,0x8c4ddb,.8,1.4,0,group);box(.12,.1,.05,0xff31f5,-.22,1.48,.54,group);box(.12,.1,.05,0xff31f5,.22,1.48,.54,group);}
    else {box(1.5,1.8,1.2,0x788495,0,1.0,0,group);box(1.0,.8,1.0,0x647080,0,2.2,0,group);box(.14,.1,.05,0xff293f,-.22,2.25,.52,group);box(.14,.1,.05,0xff293f,.22,2.25,.52,group);}
    const enemy={id:`enemy-${type}-${world.enemies.length}`,type,x,z,baseX:x,baseZ:z,group,hp:type==='golem'?3:1,phase:Math.random()*6.28,dead:false,lastHit:0};world.enemies.push(enemy);return enemy;
  }
  function createCrystal(x,y,z,secret=false){
    const mesh=new THREE.Mesh(new THREE.OctahedronGeometry(.48,0),mat(secret?0xa855f7:0x38d8ff,{emissive:secret?0x7e22ce:0x0a9dc0,emissiveIntensity:.7,metalness:.08,roughness:.22}));mesh.position.set(x,y,z);mesh.castShadow=true;worldGroup.add(mesh);addGlow(x,y,z,secret?0xa855f7:0x38d8ff,3);
    world.crystals.push({id:`crystal-${world.crystals.length}`,x,y,z,mesh,got:false,secret});
  }
  function createChest(id,x,z,secret=false){
    const group=new THREE.Group();group.position.set(x,0,z);worldGroup.add(group);box(1.2,.72,.9,materials.wood,0,.36,0,group);const lid=box(1.25,.22,.95,secret?0xa855f7:0xffd84d,0,.84,0,group);const chest={id,x,z,group,lid,opened:!!state.flags[`chest_${id}`],secret};if(chest.opened)lid.rotation.x=-.6;registerInteractable({id:`chest-${id}`,type:'chest',icon:'🎁',label:secret?'Pegar presente secreto':'Abrir presente/baú',x,z,radius:2,priority:200,action:()=>openChest(chest)});return chest;
  }
  function createPlatform(x,y,z,w=3,d=3,color=0x8b5a2b){box(w,y,d,color,x,y/2,z);registerPlatform(x,z,w,d,y);}
  function vehicleById(id){return (world.vehicles||[]).find(v=>v.id===id)||null;}
  function currentVehicleRef(){if(activeVehicleRef)return activeVehicleRef;const byId=vehicleById(player.car.id);if(byId)return byId;if(world.activeVehicle)return world.activeVehicle;return player.car.id?null:(world.vehicle||null);}
  function applyVehicleAppearance(vehicle){
    const a=vehicle?.appearance||{};if(vehicleVisual?.userData?.renderToyVehicleVisual)vehicleVisual.userData.renderToyVehicleVisual(normalizeToyTheme(vehicle?.theme??a.theme),normalizeVehicleBodyType(vehicle?.bodyType??a.bodyType),a);const m=vehicleVisual?.userData?.appearanceMaterials;if(!m)return;
    m.chassis.color.setHex(Number(a.chassis??0x26384e));m.primary.color.setHex(Number(a.primary??0xf28a22));m.primaryDark.color.setHex(Number(a.primaryDark??a.primary??0xc85b16));m.secondary.color.setHex(Number(a.secondary??0x0aa7b8));m.glass.color.setHex(Number(a.glass??0x102338));
    if(typeof applyServiceVehicleVisual==='function')applyServiceVehicleVisual(vehicle);
  }
  function persistParkedVehicle(vehicle){
    if(!vehicle||!state.vehicles)return;state.vehicles.parked[vehicle.id]={x:+vehicle.group.position.x.toFixed(2),z:+vehicle.group.position.z.toFixed(2),heading:+vehicle.group.rotation.y.toFixed(3)};state.vehicles.lastUsedId=vehicle.id;
  }
  function createToyCar(x,z,options={}){
    const id=options.id||`city-car-${world.vehicles.length+1}`,saved=state.vehicles?.parked?.[id]||{},heading=Number(saved.heading??options.heading??0),group=new THREE.Group(),rawX=Number(saved.x??x),rawZ=Number(saved.z??z),spawn=v704ClampWorldPoint(Number.isFinite(rawX)?rawX:x,Number.isFinite(rawZ)?rawZ:z,.9);group.position.set(spawn.x,0,spawn.z);group.rotation.y=heading;group.userData.vehicleId=id;worldGroup.add(group);
    const preset=typeof defaultWorldVehicleParts==='function'?defaultWorldVehicleParts(id):{},theme=normalizeToyTheme(options.theme??preset.theme??'lego'),bodyType=normalizeVehicleBodyType(options.bodyType??preset.bodyType??options.kind??'small'),kind=String(options.kind??preset.kind??(bodyType==='moto'?'moto':bodyType==='truck'?'truck':bodyType==='utility'?'utility':'car'));
    const appearance={chassis:options.chassis??0x26384e,primary:options.primary??catalogColorNumber?.(preset.primary,0xf28a22)??0xf28a22,primaryDark:options.primaryDark??options.primary??catalogColorNumber?.(preset.primary,0xc85b16)??0xc85b16,secondary:options.secondary??catalogColorNumber?.(preset.secondary,0x0aa7b8)??0x0aa7b8,glass:options.glass??0x102338,theme,bodyType};
    const chassis=renderMat(appearance.chassis,{roughness:.5,metalness:.16}),primary=renderMat(appearance.primary,{roughness:.42,metalness:.14}),primaryDark=renderMat(appearance.primaryDark,{roughness:.5,metalness:.12}),secondary=renderMat(appearance.secondary,{roughness:.4,metalness:.18}),glass=renderMat(appearance.glass,{roughness:.12,metalness:.32,transparent:true,opacity:.84}),dark=renderMat(0x151a23,{roughness:.82}),white=renderMat(0xf4f7ff,{roughness:.32});
    const addBox=(w,h,d,material,x=0,y=0,z=0)=>{const resolved=typeof material==='number'?renderMat(material):material;const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),resolved);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;};
    const addSphere=(r,material,x=0,y=0,z=0,sx=1,sy=1,sz=1)=>{const resolved=typeof material==='number'?renderMat(material):material;const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),resolved);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;};
    const wheels=[];const addWheel=(x,y,z,r=.34,w=.28)=>{const wheel=new THREE.Mesh(new THREE.CylinderGeometry(r,r,w,14),dark);wheel.position.set(x,y,z);wheel.rotation.z=Math.PI/2;wheel.castShadow=true;group.add(wheel);const hub=new THREE.Mesh(new THREE.CylinderGeometry(Math.max(.1,r*.35),Math.max(.1,r*.35),w+.03,10),theme==='mario-world'?white:secondary);hub.position.copy(wheel.position);hub.rotation.z=Math.PI/2;group.add(hub);wheels.push(wheel);return wheel;};
    const addHeadlights=(span,z,y=.5)=>{const light=renderMat(0xfff0b0,{emissive:0xffcf55,emissiveIntensity:.82,roughness:.2});addSphere(.12,light,-span,y,z,1.2,.7,.7);addSphere(.12,light,span,y,z,1.2,.7,.7);};
    if(bodyType==='moto'){
      addWheel(0,.30,-.92,.37,.13);addWheel(0,.30,.92,.37,.13);addBox(.18,.16,1.12,primary,0,.56,0);addBox(.44,.13,.48,secondary,0,.75,-.10);addBox(.58,.07,.09,white,0,1.0,.64);addBox(.20,.18,.18,glass,0,.93,.42);addHeadlights(.0,.63,.86);
      if(theme==='lego'){addBox(.28,.11,.34,primaryDark,0,.85,-.44);for(const x of[-.10,.10])addSphere(.055,white,x,.96,-.06,1,1.15,1);}
      else if(theme==='minecraft'){addBox(.34,.20,.36,primaryDark,0,.83,-.46);addBox(.20,.20,.24,glass,0,.90,.28);}
      else if(theme==='playmobil'){addSphere(.17,secondary,0,.87,-.36,1.15,.8,1.2);addSphere(.13,white,0,.97,.24,1.2,.7,1);}
      else{addSphere(.13,primaryDark,0,.85,-.36,1.45,.8,1.2);addSphere(.09,white,0,.90,.36,1.2,.7,1);}
    }else if(bodyType==='truck'){
      addBox(2.28,.36,3.72,chassis,0,.28,0);addBox(1.80,.74,1.38,primary,0,.72,1.10);addBox(2.00,.86,1.76,secondary,0,.84,-.82);addBox(1.28,.36,.82,glass,0,1.02,.86);for(const x of[-.98,.98])for(const z of[-1.20,.05,1.20])addWheel(x,.27,z,.39,.31);addHeadlights(.62,1.84,.60);
      if(theme==='lego'){for(const [sx,sz] of[[-.42,-1.40],[.42,-1.40],[-.14,-1.08],[.14,-1.08]])addSphere(.12,primaryDark,sx,1.34,sz,1,1.2,1);}
      else if(theme==='minecraft'){addBox(2.08,.22,1.88,primaryDark,0,1.28,-.82);addBox(.30,.20,1.72,white,-1.15,.60,0);addBox(.30,.20,1.72,white,1.15,.60,0);}
      else if(theme==='playmobil'){addSphere(.30,secondary,0,1.24,-1.42,3.4,.65,1.2);addSphere(.16,white,-.52,.98,1.60,1,.8,1);addSphere(.16,white,.52,.98,1.60,1,.8,1);}
      else{addBox(1.34,.18,.22,primaryDark,0,.42,-1.75);addSphere(.13,secondary,0,1.24,-1.58,1.55,.9,1);}
    }else if(bodyType==='utility'){
      addBox(2.00,.35,3.00,chassis,0,.28,0);addBox(1.78,.64,1.26,primary,0,.68,.76);addBox(1.80,.70,1.22,secondary,0,.76,-.66);addBox(1.28,.35,.74,glass,0,.98,.50);addWheel(-.91,.25,-.89,.36,.28);addWheel(.91,.25,-.89,.36,.28);addWheel(-.91,.25,.89,.36,.28);addWheel(.91,.25,.89,.36,.28);addHeadlights(.54,1.48,.56);
      if(theme==='lego'){for(const x of[-.36,0,.36])addSphere(.10,primaryDark,x,1.20,-1.06,1,1.2,1);addBox(1.40,.22,.90,secondary,0,.98,-.90);}
      else if(theme==='minecraft'){addBox(1.90,.18,1.36,primaryDark,0,1.20,-.66);addBox(.20,.44,2.42,white,-1.01,.46,0);addBox(.20,.44,2.42,white,1.01,.46,0);}
      else if(theme==='playmobil'){addSphere(.23,secondary,0,1.20,-1.08,3.0,.7,1.1);}
      else{addSphere(.13,secondary,0,1.18,-.98,1.7,.8,1);addBox(1.22,.08,.18,primaryDark,0,.42,-1.42);}
    }else{
      addBox(1.86,.36,2.58,chassis,0,.28,0);addBox(1.74,.49,1.36,primary,0,.56,.56);addBox(1.50,.47,.94,secondary,0,.79,-.49);addBox(1.34,.32,.74,glass,0,.94,-.43);addWheel(-.85,.25,-.80,.34,.28);addWheel(.85,.25,-.80,.34,.28);addWheel(-.85,.25,.80,.34,.28);addWheel(.85,.25,.80,.34,.28);addHeadlights(.58,1.30,.52);
      if(theme==='lego'){addBox(1.96,.18,.28,white,0,.32,1.35);for(const [sx,sz] of[[-.36,-.20],[.36,-.20],[-.12,-.54],[.12,-.54]])addSphere(.10,primaryDark,sx,1.17,sz,1,1.2,1);addBox(.74,.42,.60,dark,0,.73,-.12);}
      else if(theme==='minecraft'){addBox(1.96,.20,.28,white,0,.32,1.35);addBox(1.92,.18,.24,primaryDark,0,.34,-1.33);addBox(.18,.34,2.22,secondary,-.93,.42,0);addBox(.18,.34,2.22,secondary,.93,.42,0);addBox(.82,.42,.78,primaryDark,0,.73,-.08);}
      else if(theme==='playmobil'){addSphere(.87,primary,0,.57,.18,1.08,.45,1.30);addSphere(.73,secondary,0,.79,-.65,1,.55,1.10);}
      else{addSphere(.91,primary,0,.49,.12,1.12,.36,1.28);addSphere(.73,secondary,0,.75,-.53,1,.50,1.08);addBox(1.56,.12,.18,primaryDark,0,.34,-1.29);}
    }
    group.traverse(o=>{if(o.isMesh)addVoxelOutline(o,0x14243a,.28);});
    const garageStored=!!state.vehicles?.garage?.stored?.[id],radius=Number(options.radius||(bodyType==='truck'?2.15:bodyType==='utility'?1.85:bodyType==='moto'?1.15:1.55)),vehicle={id,x:group.position.x,z:group.position.z,heading,group,label:options.label||'Veículo',kind,bodyType,theme,serviceType:options.serviceType||'',appearance,occupied:false,radius,garageStored,wheels};group.visible=!garageStored;world.vehicles.push(vehicle);if(!world.vehicle)world.vehicle=vehicle;
    registerInteractable({id:`vehicle-${id}`,type:'vehicle',icon:vehicleKindIcon(kind),label:`Entrar: ${vehicle.label}`,radius:bodyType==='truck'?3.2:bodyType==='moto'?2.2:2.7,priority:155,getPos:()=>({x:vehicle.group.position.x,z:vehicle.group.position.z}),available:()=>!vehicle.occupied&&vehicle.group.visible,action:()=>enterVehicle(vehicle)});return vehicle;
  }

  function createWaypointMarker(){
    const group=new THREE.Group();
    box(.32,6,.32,mat(0x38d8ff,{transparent:true,opacity:.48}),0,3,0,group);
    const top=new THREE.Mesh(new THREE.OctahedronGeometry(.65,0),mat(0x6ee94b,{emissive:0x35c728,emissiveIntensity:.75}));top.position.y=6.4;group.add(top);
    group.visible=false;worldGroup.add(group);world.waypointMarker=group;updateWaypointMarker();
  }
  function updateWaypointMarker(){
    if(!world.waypointMarker)return;
    const wp=state.waypoint;world.waypointMarker.visible=!!wp;
    if(wp)world.waypointMarker.position.set(wp.x,0,wp.z);
  }
  function createAthleticsGym(){
    // V704: autoridade única. Chamadas legadas reutilizam o complexo já existente.
    return typeof createSportsComplexV704==='function'?createSportsComplexV704():world.gym;
  }
  function createSizeChallenges(){
    // R9: os antigos túneis de habilidade foram removidos do mundo aberto.
    // As mesmas habilidades continuam treináveis em três plataformas abertas, fora da OTTOVIAS e sem bloquear vias.
    const mini=worldLayoutPoint('miniTunnel'),crouch=worldLayoutPoint('crouchTunnel'),giant=worldLayoutPoint('giantGate');
    const pad=(point,color,label,icon,check,flag,xp)=>{
      const group=new THREE.Group();group.position.set(point.x,0,point.z);worldGroup.add(group);
      const base=premiumCylinder(2.25,.14,color,0,.07,0,group,24);base.scale.z=.82;
      const ring=new THREE.Mesh(new THREE.TorusGeometry(1.72,.08,8,28),renderMat(0xffffff,{emissive:color,emissiveIntensity:.42,roughness:.3}));ring.rotation.x=Math.PI/2;ring.position.y=.18;group.add(ring);
      registerInteractable({id:`skill-pad-${flag}`,type:'challenge',icon,label,x:point.x,z:point.z,radius:2.8,priority:110,action:()=>{if(!check()){toast(label==='Desafio MINI'?'Use o botão MINI para ativar esta plataforma.':label==='Desafio ABAIXAR'?'Use ABAIXAR para ativar esta plataforma.':'Use GRANDE para ativar esta plataforma.','warn',2200);return;}setFlag(flag);addXP(xp);ring.material.emissiveIntensity=1.2;setTimeout(()=>{if(ring?.material)ring.material.emissiveIntensity=.42;},700);toast(`${label} concluído!`,'good',1800);}});
    };
    pad(mini,0x38d8ff,'Desafio MINI','◱',()=>player.scaleMode==='mini','miniPassage',25);
    pad(crouch,0xf4b942,'Desafio ABAIXAR','▼',()=>!!player.crouched,'crouchPassage',25);
    pad(giant,0xa855f7,'Desafio GRANDE','⬡',()=>player.scaleMode==='giant','giantGate',35);
  }

  function createSkyDome(){
    const c=document.createElement('canvas');c.width=16;c.height=512;const ctx=c.getContext('2d'),g=ctx.createLinearGradient(0,0,0,512);
    g.addColorStop(0,'#087ee8');g.addColorStop(.34,'#42b9ff');g.addColorStop(.67,'#9de2ff');g.addColorStop(.88,'#d9f4ff');g.addColorStop(1,'#fff0bf');ctx.fillStyle=g;ctx.fillRect(0,0,16,512);
    const tex=new THREE.CanvasTexture(c);tex.magFilter=THREE.LinearFilter;tex.minFilter=THREE.LinearFilter;
    const sky=new THREE.Mesh(new THREE.SphereGeometry(430,20,18),new THREE.MeshBasicMaterial({map:tex,side:THREE.BackSide,fog:false,depthWrite:false}));scene.add(sky);
    const glowCanvas=document.createElement('canvas');glowCanvas.width=glowCanvas.height=128;const gx=glowCanvas.getContext('2d'),rad=gx.createRadialGradient(64,64,12,64,64,64);rad.addColorStop(0,'rgba(255,250,207,1)');rad.addColorStop(.35,'rgba(255,230,128,.72)');rad.addColorStop(1,'rgba(255,214,88,0)');gx.fillStyle=rad;gx.fillRect(0,0,128,128);
    const sunTex=new THREE.CanvasTexture(glowCanvas),sunGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:sunTex,transparent:true,depthWrite:false,fog:false}));sunGlow.position.set(-145,126,-235);sunGlow.scale.set(72,72,1);scene.add(sunGlow);
    const sun=new THREE.Mesh(new THREE.CircleGeometry(13,24),new THREE.MeshBasicMaterial({color:0xfff4c4,depthWrite:false,fog:false}));sun.position.set(-145,126,-232);sun.lookAt(0,70,0);scene.add(sun);
    const cloudMat=renderMat(0xffffff,{transparent:true,opacity:.9,roughness:.95});world.clouds=[];
    const cloudGeo=sharedBoxGeometry(1,1,1);
    for(let i=0;i<7;i++){
      const cloud=new THREE.Group(),parts=[[0,0,0,7,2.2,2.8],[-5.4,-.35,0,5.3,1.85,2.4],[5.1,-.2,0,5.8,2,2.5],[-.8,1.35,0,4.9,2.35,2.6],[3,1.05,0,3.7,1.8,2.3]];
      parts.forEach(([x,y,z,w,h,d])=>{const p=new THREE.Mesh(cloudGeo,cloudMat);p.scale.set(w,h,d);p.position.set(x,y,z);p.frustumCulled=true;cloud.add(p);});
      cloud.position.set((Math.random()-.5)*360,62+Math.random()*38,(Math.random()-.5)*330);cloud.scale.setScalar(.72+Math.random()*.8);scene.add(cloud);world.clouds.push({group:cloud,speed:.55+Math.random()*.85});
    }
  }
  function updateClouds(dt){
    if(textures.water){textures.water.offset.x=(textures.water.offset.x+dt*.012)%1;textures.water.offset.y=(textures.water.offset.y+dt*.007)%1;}
    if(!world.clouds)return;
    for(const c of world.clouds){c.group.position.x+=c.speed*dt;if(c.group.position.x>210)c.group.position.x=-210;}
  }
