/**
 * OTTHI World V700 — módulo-fonte
 * Arquivo: 34-avatar-studio-professional-v3.js
 * Escopo: Etapa 2, personagem modular profissional sobre o rig procedural preservado
 */
// @otthi-module-body
  const OTTHI_WORLD_AVATAR_CATALOG=Object.freeze({
    bodyStyle:Object.freeze([['block','OTTHI Blocks','▣'],['toy','OTTHI Toys','●'],['hero','OTTHI Heroes','◆'],['adventure','OTTHI Adventure','★']]),
    face:Object.freeze([['face-happy-01','Feliz','🙂'],['face-brave-01','Corajoso','😎'],['face-curious-01','Curioso','🤔'],['face-focus-01','Concentrado','🎯']]),
    hair:Object.freeze([['hair-none','Sem cabelo','◯'],['hair-short-01','Curto','✂'],['hair-spikes-01','Espetado','⚡'],['hair-curls-01','Cacheado','〰']]),
    torso:Object.freeze([['world-jacket-01','Jaqueta World','🧥'],['world-hoodie-01','Moletom','👕'],['world-explorer-01','Explorador','🧭'],['world-hero-01','Herói OTTHI','⚡'],['world-shadow-guardian','Guardião Noturno','🌙'],['world-web-runner','Corredor de Fios','🕸️'],['world-mushroom-adventurer','Aventureiro Cogumelo','🍄'],['world-toy-rescuer','Resgatista Brinquedo','🧸']]),
    legs:Object.freeze([['world-pants-01','Calça urbana','👖'],['world-shorts-01','Bermuda','🩳'],['world-armor-01','Proteção de aventura','🛡']]),
    shoes:Object.freeze([['world-sneakers-01','Tênis','👟'],['world-boots-01','Botas','🥾'],['world-energy-01','Tênis de energia','✨']]),
    back:Object.freeze([['none','Sem item','—'],['world-backpack-01','Mochila modular','🎒'],['world-cape-01','Capa OTTHI','🦸'],['world-jetpack-01','Propulsor de brinquedo','🚀']]),
    pattern:Object.freeze([['none','Sem estampa','□'],['world-stripe','Faixas','≡'],['world-pixels','Pixels','▦'],['world-star','Estrela OTTHI','★']])
  });

  function worldAvatarSafeChoice(field,value){
    const options=OTTHI_WORLD_AVATAR_CATALOG[field]||[];return options.some(item=>item[0]===value)?value:(options[0]?.[0]||'none');
  }
  function disposeWorldAvatarObject(object){
    object?.traverse?.(child=>{if(child.isMesh){child.geometry?.dispose?.();const list=Array.isArray(child.material)?child.material:[child.material];for(const material of list){if(material?.userData?.otthiWorldAvatarMaterial)material.dispose?.();}}});
  }
  function clearWorldAvatarV3(){
    const attachments=playerModel?.userData?.worldAvatarV3Attachments||[];
    for(const attachment of attachments){attachment.parent?.remove(attachment);disposeWorldAvatarObject(attachment);}
    if(playerModel)playerModel.userData.worldAvatarV3Attachments=[];
  }
  function worldAvatarMaterial(color,options={}){
    const material=new THREE.MeshStandardMaterial({color:new THREE.Color(color),roughness:Number(options.roughness??.48),metalness:Number(options.metalness??.04),transparent:!!options.transparent,opacity:Number(options.opacity??1),emissive:new THREE.Color(options.emissive??0x000000),emissiveIntensity:Number(options.emissiveIntensity??0)});material.userData.otthiWorldAvatarMaterial=true;return material;
  }
  function worldAvatarLayer(parent,name){
    const group=new THREE.Group();group.name=`OTTHI_WORLD_AVATAR_V3_${name}`;parent?.add(group);playerModel.userData.worldAvatarV3Attachments=playerModel.userData.worldAvatarV3Attachments||[];playerModel.userData.worldAvatarV3Attachments.push(group);return group;
  }
  function avatarV3Box(parent,w,h,d,material,x=0,y=0,z=0){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);if(state.settings?.worldOutlines!==false)addVoxelOutline(mesh,0x102238,.22);return mesh;}
  function avatarV3Sphere(parent,r,material,x=0,y=0,z=0,sx=1,sy=1,sz=1){const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,12,8),material);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
  function avatarPatternColor(){return state.avatar.pattern==='world-star'?0xffd84d:state.avatar.pattern==='world-pixels'?0x5ad7ff:state.avatar.pattern==='world-stripe'?0xffffff:state.avatar.secondaryColor;}
  function applyWorldAvatarV3(){
    if(!playerModel?.userData?.parts)return false;ensureOtthiWorldState();clearWorldAvatarV3();
    const parts=playerModel.userData.parts,avatar=state.avatar;
    avatar.bodyStyle=worldAvatarSafeChoice('bodyStyle',avatar.bodyStyle);avatar.face=worldAvatarSafeChoice('face',avatar.face);avatar.hair=worldAvatarSafeChoice('hair',avatar.hair);avatar.torso=worldAvatarSafeChoice('torso',avatar.torso);avatar.legs=worldAvatarSafeChoice('legs',avatar.legs);avatar.shoes=worldAvatarSafeChoice('shoes',avatar.shoes);avatar.back=worldAvatarSafeChoice('back',avatar.back);avatar.pattern=worldAvatarSafeChoice('pattern',avatar.pattern);
    const primary=worldAvatarMaterial(avatar.primaryColor,{roughness:.42}),secondary=worldAvatarMaterial(avatar.secondaryColor,{roughness:.54}),accent=worldAvatarMaterial(avatarPatternColor(),{roughness:.34}),hairMat=worldAvatarMaterial(avatar.hairColor,{roughness:.7}),skin=worldAvatarMaterial(0xd9a075,{roughness:.72}),energy=worldAvatarMaterial(0x5fe7ff,{roughness:.18,metalness:.18,emissive:0x129ac8,emissiveIntensity:.86});
    const headLayer=worldAvatarLayer(parts.head,'HEAD'),bodyLayer=worldAvatarLayer(parts.body,'TORSO'),leftArm=worldAvatarLayer(parts.leftArm,'ARM_LEFT'),rightArm=worldAvatarLayer(parts.rightArm,'ARM_RIGHT'),leftLeg=worldAvatarLayer(parts.leftLeg,'LEG_LEFT'),rightLeg=worldAvatarLayer(parts.rightLeg,'LEG_RIGHT');
    if(avatar.bodyStyle==='toy'){
      avatarV3Sphere(leftArm,.22,skin,0,-.99,.02);avatarV3Sphere(rightArm,.22,skin,0,-.99,.02);avatarV3Sphere(leftLeg,.21,secondary,0,-.62,0);avatarV3Sphere(rightLeg,.21,secondary,0,-.62,0);avatarV3Sphere(headLayer,.55,worldAvatarMaterial(0x11151d,{roughness:.5}),0,0,0,1.04,1.02,1.04);
    }else if(avatar.bodyStyle==='hero'){
      avatarV3Box(leftArm,.47,.26,.48,accent,0,-.15,0);avatarV3Box(rightArm,.47,.26,.48,accent,0,-.15,0);avatarV3Box(bodyLayer,1.16,.18,.78,secondary,0,.62,0);avatarV3Box(leftLeg,.45,.2,.45,accent,0,-.7,0);avatarV3Box(rightLeg,.45,.2,.45,accent,0,-.7,0);
    }else if(avatar.bodyStyle==='adventure'){
      avatarV3Sphere(headLayer,.58,skin,0,0,0,1.03,1.02,1.03);avatarV3Box(bodyLayer,1.12,.23,.82,accent,0,.55,0);avatarV3Sphere(leftArm,.23,skin,0,-.98,.02);avatarV3Sphere(rightArm,.23,skin,0,-.98,.02);avatarV3Box(leftLeg,.47,.18,.5,primary,0,-.72,0);avatarV3Box(rightLeg,.47,.18,.5,primary,0,-.72,0);
    }
    if(avatar.torso==='world-jacket-01'){
      avatarV3Box(bodyLayer,1.12,.96,.08,primary,0,.02,.405);avatarV3Box(bodyLayer,.08,.92,.10,accent,0,.02,.46);avatarV3Box(leftArm,.41,.44,.41,primary,0,-.33,0);avatarV3Box(rightArm,.41,.44,.41,primary,0,-.33,0);
    }else if(avatar.torso==='world-hoodie-01'){
      avatarV3Box(bodyLayer,1.13,.98,.09,primary,0,.01,.41);avatarV3Box(bodyLayer,.58,.32,.13,secondary,0,-.28,.47);avatarV3Box(headLayer,1.18,.34,.34,primary,0,.31,-.38);
    }else if(avatar.torso==='world-explorer-01'){
      avatarV3Box(bodyLayer,1.14,1.0,.09,primary,0,0,.42);avatarV3Box(bodyLayer,.20,.92,.12,accent,-.28,0,.47);avatarV3Box(bodyLayer,.20,.92,.12,accent,.28,0,.47);avatarV3Box(bodyLayer,.34,.24,.14,secondary,-.29,-.23,.49);avatarV3Box(bodyLayer,.34,.24,.14,secondary,.29,-.23,.49);
    }else if(avatar.torso==='world-shadow-guardian'){
      avatarV3Box(bodyLayer,1.16,1.02,.09,worldAvatarMaterial(0x18243b,{roughness:.42}),0,0,.42);avatarV3Box(bodyLayer,.38,.24,.11,accent,0,.12,.49);avatarV3Box(leftArm,.44,.52,.44,worldAvatarMaterial(0x22334f,{roughness:.5}),0,-.36,0);avatarV3Box(rightArm,.44,.52,.44,worldAvatarMaterial(0x22334f,{roughness:.5}),0,-.36,0);const cape=worldAvatarLayer(parts.body,'SHADOW_CAPE');avatarV3Box(cape,1.02,1.48,.06,worldAvatarMaterial(0x101827,{roughness:.58}),0,-.18,-.5).rotation.x=-.09;
    }else if(avatar.torso==='world-web-runner'){
      const red=worldAvatarMaterial(0xd93645,{roughness:.42}),blue=worldAvatarMaterial(0x1e5fae,{roughness:.5});avatarV3Box(bodyLayer,1.16,1.02,.09,red,0,0,.42);avatarV3Box(bodyLayer,.48,.82,.11,blue,0,-.05,.48);for(const y of[-.25,0,.25])avatarV3Box(bodyLayer,1.08,.035,.12,accent,0,y,.495);avatarV3Box(leftArm,.44,.52,.44,red,0,-.36,0);avatarV3Box(rightArm,.44,.52,.44,red,0,-.36,0);
    }else if(avatar.torso==='world-mushroom-adventurer'){
      const overalls=worldAvatarMaterial(0x236ac7,{roughness:.55}),shirt=worldAvatarMaterial(0xd94236,{roughness:.48});avatarV3Box(bodyLayer,1.16,1.02,.09,shirt,0,0,.42);avatarV3Box(bodyLayer,.72,.72,.11,overalls,0,-.15,.49);avatarV3Box(bodyLayer,.16,.86,.12,overalls,-.28,.02,.49);avatarV3Box(bodyLayer,.16,.86,.12,overalls,.28,.02,.49);avatarV3Box(leftArm,.44,.52,.44,shirt,0,-.36,0);avatarV3Box(rightArm,.44,.52,.44,shirt,0,-.36,0);const cap=worldAvatarLayer(parts.head,'ADVENTURE_CAP');avatarV3Sphere(cap,.64,shirt,0,.44,0,1.15,.35,1.15);avatarV3Box(cap,.72,.10,.34,shirt,0,.38,.42);
    }else if(avatar.torso==='world-toy-rescuer'){
      avatarV3Box(bodyLayer,1.18,1.04,.10,primary,0,0,.42);avatarV3Box(bodyLayer,.76,.68,.12,secondary,0,-.10,.49);avatarV3Box(bodyLayer,.18,.90,.12,accent,-.32,.02,.49);avatarV3Box(bodyLayer,.18,.90,.12,accent,.32,.02,.49);avatarV3Box(leftArm,.46,.55,.46,primary,0,-.36,0);avatarV3Box(rightArm,.46,.55,.46,primary,0,-.36,0);
    }else{
      avatarV3Box(bodyLayer,1.16,1.02,.09,primary,0,0,.42);const emblem=new THREE.Mesh(new THREE.CircleGeometry(.23,12),worldAvatarMaterial(avatarPatternColor(),{roughness:.25,emissive:avatarPatternColor(),emissiveIntensity:.20}));emblem.position.set(0,.12,.49);bodyLayer.add(emblem);avatarV3Box(leftArm,.44,.52,.44,primary,0,-.36,0);avatarV3Box(rightArm,.44,.52,.44,primary,0,-.36,0);
    }
    if(avatar.pattern==='world-stripe'){avatarV3Box(bodyLayer,1.13,.15,.11,accent,0,.23,.48);avatarV3Box(bodyLayer,1.13,.15,.11,accent,0,-.04,.48);}
    if(avatar.pattern==='world-pixels')for(const [x,y]of[[-.3,.26],[0,.04],[.3,.26],[-.3,-.18],[.3,-.18]])avatarV3Box(bodyLayer,.16,.16,.11,accent,x,y,.48);
    if(avatar.pattern==='world-star'){const star=new THREE.Mesh(new THREE.CircleGeometry(.23,5),accent);star.position.set(0,.1,.49);star.rotation.z=Math.PI/10;bodyLayer.add(star);}
    if(avatar.legs==='world-shorts-01'){
      avatarV3Box(leftLeg,.43,.34,.43,primary,0,-.19,0);avatarV3Box(rightLeg,.43,.34,.43,primary,0,-.19,0);avatarV3Box(leftLeg,.37,.32,.38,skin,0,-.51,0);avatarV3Box(rightLeg,.37,.32,.38,skin,0,-.51,0);
    }else if(avatar.legs==='world-armor-01'){
      avatarV3Box(leftLeg,.46,.72,.46,secondary,0,-.36,0);avatarV3Box(rightLeg,.46,.72,.46,secondary,0,-.36,0);avatarV3Box(leftLeg,.48,.18,.48,accent,0,-.66,0);avatarV3Box(rightLeg,.48,.18,.48,accent,0,-.66,0);
    }else{
      avatarV3Box(leftLeg,.42,.68,.42,secondary,0,-.36,0);avatarV3Box(rightLeg,.42,.68,.42,secondary,0,-.36,0);
    }
    const shoeMat=avatar.shoes==='world-energy-01'?energy:avatar.shoes==='world-boots-01'?secondary:primary;
    avatarV3Box(leftLeg,.48,.25,.59,shoeMat,0,-1.03,.09);avatarV3Box(rightLeg,.48,.25,.59,shoeMat,0,-1.03,.09);
    if(avatar.shoes==='world-energy-01'){avatarV3Box(leftLeg,.34,.08,.63,energy,0,-1.16,.11);avatarV3Box(rightLeg,.34,.08,.63,energy,0,-1.16,.11);}
    if(avatar.hair==='hair-short-01'){avatarV3Box(headLayer,1.13,.24,1.13,hairMat,0,.49,0);avatarV3Box(headLayer,.24,.42,1.08,hairMat,-.48,.29,-.02);avatarV3Box(headLayer,.24,.42,1.08,hairMat,.48,.29,-.02);}
    else if(avatar.hair==='hair-spikes-01'){avatarV3Box(headLayer,1.13,.18,1.10,hairMat,0,.48,0);for(const x of[-.38,-.12,.14,.4]){const spike=new THREE.Mesh(new THREE.ConeGeometry(.16,.48,4),hairMat);spike.position.set(x,.76,-.03);spike.rotation.y=Math.PI/4;headLayer.add(spike);}}
    else if(avatar.hair==='hair-curls-01'){for(const [x,y,z]of[[-.4,.48,0],[-.14,.57,.04],[.14,.57,.04],[.4,.48,0],[-.48,.28,-.05],[.48,.28,-.05]])avatarV3Sphere(headLayer,.22,hairMat,x,y,z);}
    const expression=avatar.face;
    const brow=worldAvatarMaterial(expression==='face-brave-01'?0x6ae6ff:0xffffff,{roughness:.55});
    const leftBrow=avatarV3Box(headLayer,.28,.05,.04,brow,-.27,.18,.54),rightBrow=avatarV3Box(headLayer,.28,.05,.04,brow,.27,.18,.54);
    if(expression==='face-brave-01'){leftBrow.rotation.z=-.18;rightBrow.rotation.z=.18;}
    if(expression==='face-curious-01'){leftBrow.position.y=.25;rightBrow.rotation.z=.14;}
    const mouth=avatarV3Box(headLayer,expression==='face-focus-01'?.26:.34,.05,.04,worldAvatarMaterial(0xff6f81,{roughness:.45}),0,-.22,.54);if(expression==='face-happy-01')mouth.rotation.z=.02;
    if(avatar.back==='world-backpack-01'){const pack=worldAvatarLayer(parts.body,'BACKPACK');avatarV3Box(pack,.82,.92,.38,secondary,0,.02,-.54);avatarV3Box(pack,.55,.24,.15,accent,0,-.22,-.76);}
    else if(avatar.back==='world-cape-01'){const cape=worldAvatarLayer(parts.body,'CAPE');avatarV3Box(cape,.94,1.34,.06,primary,0,-.18,-.49).rotation.x=-.08;avatarV3Box(cape,.52,.14,.08,accent,0,.42,-.5);}
    else if(avatar.back==='world-jetpack-01'){const jet=worldAvatarLayer(parts.body,'JETPACK');avatarV3Box(jet,.34,.82,.36,secondary,-.28,.02,-.54);avatarV3Box(jet,.34,.82,.36,secondary,.28,.02,-.54);avatarV3Box(jet,.22,.22,.3,energy,-.28,-.48,-.56);avatarV3Box(jet,.22,.22,.3,energy,.28,-.48,-.56);}
    otthiWorldRuntime.avatarReady=true;return true;
  }
  function worldAvatarOptions(field,title){
    const selected=state.avatar[field];return `<section class="avatar-section world-avatar-section"><h3>${title}</h3><div class="avatar-grid">${OTTHI_WORLD_AVATAR_CATALOG[field].map(([id,name,icon])=>`<button class="avatar-option ${selected===id?'selected':''}" data-world-avatar-field="${field}" data-world-avatar-value="${id}"><b>${icon}</b><span>${name}</span></button>`).join('')}</div></section>`;
  }
  const legacyApplyAvatarCustomization=applyAvatarCustomization;
  applyAvatarCustomization=function applyAvatarCustomizationWorld(){legacyApplyAvatarCustomization();applyWorldAvatarV3();};
  const legacyOpenAvatarStudio=openAvatarStudio;
  openAvatarStudio=function openAvatarStudioWorld(){
    ensureOtthiWorldState();
    openModal(`Estúdio de Personagem — ${playerDisplayName()}`,`<div class="avatar-summary world-avatar-summary"><div class="avatar-face"><i></i><i></i></div><div><b>Mesmo estúdio para todos os jogadores</b><span>Misture Blocks, Toys, Heroes e Adventure. O rig, as skills, o multiplayer e o progresso permanecem preservados.</span></div></div>${worldAvatarOptions('bodyStyle','Estilo do corpo')}${worldAvatarOptions('face','Expressão')}${worldAvatarOptions('hair','Cabelo')}${worldAvatarOptions('torso','Parte superior')}${worldAvatarOptions('legs','Parte inferior')}${worldAvatarOptions('shoes','Calçados')}${worldAvatarOptions('back','Costas')}${worldAvatarOptions('pattern','Estampa')}<section class="avatar-section"><h3>Cores</h3><div class="world-color-grid"><label>Cor principal<input type="color" data-world-avatar-color="primaryColor" value="${state.avatar.primaryColor}"></label><label>Cor secundária<input type="color" data-world-avatar-color="secondaryColor" value="${state.avatar.secondaryColor}"></label><label>Cabelo<input type="color" data-world-avatar-color="hairColor" value="${state.avatar.hairColor}"></label></div></section>${avatarChoiceGroup('uniform','Uniforme profissional preservado')}${avatarChoiceGroup('hat','Chapéu clássico preservado')}${avatarChoiceGroup('accessory','Acessório clássico preservado')}<div class="modal-actions"><button class="btn primary" data-world-avatar-save>Salvar personagem completo</button><button class="btn" data-world-avatar-legacy>Ver estúdio clássico</button></div>`,root=>{
      $$('[data-world-avatar-field]',root).forEach(button=>button.onclick=()=>{const field=button.dataset.worldAvatarField,value=button.dataset.worldAvatarValue;state.avatar={...state.avatar,[field]:worldAvatarSafeChoice(field,value),renderMode:'otthi-world-v3'};$$(`[data-world-avatar-field="${field}"]`,root).forEach(item=>item.classList.toggle('selected',item===button));applyAvatarCustomization();});
      $$('[data-world-avatar-color]',root).forEach(input=>input.oninput=()=>{state.avatar={...state.avatar,[input.dataset.worldAvatarColor]:safeAvatarColor(input.value,state.avatar[input.dataset.worldAvatarColor])};applyAvatarCustomization();});
      $$('[data-avatar-type]',root).forEach(button=>button.onclick=()=>{state.avatar=updateAvatarV2LegacyChoice(state.avatar,button.dataset.avatarType,button.dataset.avatarId);$$(`[data-avatar-type="${button.dataset.avatarType}"]`,root).forEach(item=>item.classList.toggle('selected',item===button));applyAvatarCustomization();});
      $('[data-world-avatar-save]',root).onclick=()=>{state.avatar=normalizeAvatarV2({...state.avatar,renderMode:'otthi-world-v3'});setFlag('customizedAvatar');setFlag('otthiWorldAvatarV3');saveState(true);closeModal();toast('Personagem salvo e sincronizado sem alterar o rig de jogabilidade.','good',2400);};
      $('[data-world-avatar-legacy]',root).onclick=legacyOpenAvatarStudio;
    });
  };
