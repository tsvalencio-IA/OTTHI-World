/**
 * OTTHI World V704 — autoridade única do layout mundial.
 * Todas as vias, zonas, estruturas, acessos, destinos e áreas protegidas são
 * definidos aqui para impedir que módulos independentes criem mundos incompatíveis.
 */
// @otthi-module-body
  const WORLD_LAYOUT_V704=Object.freeze({
    version:704,
    bounds:Object.freeze({minX:-116,maxX:116,minZ:-116,maxZ:116}),
    roads:Object.freeze([
      {id:'avenida-central-ns',x:0,z:0,w:18,d:210,kind:'avenue'},
      {id:'avenida-central-ew',x:0,z:0,w:210,d:18,kind:'avenue'},
      {id:'via-floresta-sul',x:-55,z:-55,w:9,d:105,kind:'street'},
      {id:'via-floresta-norte',x:-55,z:28,w:9,d:56,kind:'street'},
      {id:'acesso-construcao-ns',x:-55,z:68,w:9,d:24,kind:'street'},
      {id:'acesso-construcao-ew',x:-35,z:78,w:40,d:7,kind:'street'},
      {id:'via-servicos-leste',x:65,z:-55,w:9,d:105,kind:'street'},
      {id:'via-escola-leste',x:68,z:29,w:9,d:58,kind:'street'},
      {id:'acesso-norte',x:34,z:58,w:68,d:9,kind:'street'},
      {id:'acesso-castelo-fazenda',x:84,z:38,w:32,d:7,kind:'street'},
      {id:'acesso-kart',x:80,z:-65,w:30,d:9,kind:'street'}
    ]),
    nodes:Object.freeze({
      VS:{x:0,z:-105},V65S:{x:0,z:-65},V18S:{x:0,z:-18},C:{x:0,z:0},V18N:{x:0,z:18},V58N:{x:0,z:58},VN:{x:0,z:105},
      HW:{x:-105,z:0},H55W:{x:-55,z:0},H25W:{x:-25,z:0},H25E:{x:25,z:0},H65E:{x:65,z:0},H88E:{x:88,z:0},HE:{x:105,z:0},
      W105S:{x:-55,z:-105},W55S:{x:-55,z:-55},W28N:{x:-55,z:28},W56N:{x:-55,z:56},W80N:{x:-55,z:80},BUILD78:{x:-15,z:78},
      E105S:{x:65,z:-105},E65S:{x:65,z:-65},E18S:{x:65,z:-18},E0:{x:65,z:0},E58N:{x:68,z:58},
      N34:{x:34,z:58},N68:{x:68,z:58},C38:{x:68,z:38},CASTLE38:{x:100,z:38},
      K65:{x:65,z:-65},K80:{x:80,z:-65},K94:{x:94,z:-65}
    }),
    edges:Object.freeze([
      ['VS','V65S'],['V65S','V18S'],['V18S','C'],['C','V18N'],['V18N','V58N'],['V58N','VN'],
      ['HW','H55W'],['H55W','H25W'],['H25W','C'],['C','H25E'],['H25E','H65E'],['H65E','H88E'],['H88E','HE'],
      ['W105S','W55S'],['W55S','H55W'],['H55W','W28N'],['W28N','W56N'],['W56N','W80N'],['W80N','BUILD78'],
      ['E105S','E65S'],['E65S','E18S'],['E18S','E0'],['E0','H65E'],['E0','C38'],['C38','E58N'],
      ['V58N','N34'],['N34','N68'],['N68','E58N'],['C38','CASTLE38'],
      ['V65S','E65S'],['E65S','K65'],['K65','K80'],['K80','K94']
    ]),
    points:Object.freeze({
      spawn:{x:-18,z:39},home:{x:-18,z:34},blue:{x:-30,z:17},pink:{x:24,z:17},shop:{x:-22,z:-18},workshop:{x:22,z:-18},
      school:{x:-68,z:-18},schoolEast:{x:82,z:24},police:{x:78,z:-18},policeWest:{x:-68,z:22},fireStation:{x:96,z:-18},
      well:{x:38,z:10},foundry:{x:43,z:-35},mine:{x:-92,z:-92},cabin:{x:-88,z:-42},
      camp:{x:-78,z:-62},hunt:{x:-101,z:-78},lake:{x:-72,z:52},lakeNorth:{x:-100,z:70},pier:{x:-30,z:52},
      farm:{x:101,z:22},farmEntrance:{x:91,z:34},garage:{x:84,z:30},jobBoard:{x:86,z:34},
      sports:{x:42,z:88},sportsEntrance:{x:42,z:66},volley:{x:82,z:95},footvolley:{x:100,z:95},
      kart:{x:94,z:-91},kartEntrance:{x:94,z:-70},kartBoxes:{x:94,z:-91},
      castle:{x:100,z:55},castleEntrance:{x:100,z:40},mountain:{x:-88,z:97},mountainEntrance:{x:-62,z:84},
      lava:{x:35,z:-104},giantGate:{x:18,z:-54},miniTunnel:{x:-38,z:34},crouchTunnel:{x:-42,z:24},
      learningMath:{x:22,z:-32},learningPortuguese:{x:22,z:-40},learningEnglish:{x:22,z:-48},learningEntrance:{x:14,z:-40},
      playground:{x:-28,z:-40},fountain:{x:-14,z:-8},portal:{x:82,z:53},
      construction:{x:-33,z:96},constructionEntrance:{x:-33,z:78},
      platformCircuit:{x:94,z:-52},platformEntrance:{x:76,z:-35},
      repairParking:{x:32,z:-18}
    }),
    zones:Object.freeze({
      urban:{id:'urban',name:'Centro urbano',x:0,z:0,w:118,d:104},
      residential:{id:'residential',name:'Bairros residenciais',x:-2,z:27,w:92,d:38},
      services:{id:'services',name:'Escolas e serviços',x:78,z:-18,w:70,d:106},
      stadium:{id:'stadium',name:'Estádio e atletismo',x:42,z:88,w:62,d:44},
      courts:{id:'courts',name:'Quadras de vôlei e futevôlei',x:91,z:95,w:34,d:24},
      kart:{id:'kart',name:'Kartódromo',x:94,z:-91,w:44,d:38},
      rural:{id:'rural',name:'Fazenda',x:101,z:22,w:26,d:22},
      lake:{id:'lake',name:'Lago principal',x:-72,z:52,w:88,d:18},
      lakeNorth:{id:'lakeNorth',name:'Braço norte do lago',x:-100,z:70,w:32,d:14},
      forest:{id:'forest',name:'Floresta e acampamento',x:-86,z:-58,w:60,d:58},
      mine:{id:'mine',name:'Mina',x:-92,z:-92,w:28,d:24},
      castle:{id:'castle',name:'Castelo e aventura',x:100,z:55,w:32,d:28},
      mountain:{id:'mountain',name:'Montanhas e trilhas',x:-88,z:97,w:50,d:36},
      construction:{id:'construction',name:'Construção dos jogadores',x:-33,z:96,w:36,d:32},
      education:{id:'education',name:'Academia Kids',x:22,z:-40,w:18,d:24},
      platform:{id:'platform',name:'Circuito das plataformas',x:94,z:-52,w:38,d:42}
    }),
    paths:Object.freeze([
      {id:'casa-inicial',x1:-18,z1:37.2,x2:-18,z2:45,w:2.2,destination:'home'},
      {id:'complexo-esportivo',x1:42,z1:62,x2:42,z2:67,w:3.2,destination:'stadium'},
      {id:'quadras-leste-a',x1:68,z1:62,x2:76,z2:64,w:2.2},
      {id:'quadras-leste-b',x1:76,z1:64,x2:76,z2:82,w:2.2},
      {id:'quadra-volei',x1:76,z1:82,x2:82,z2:84,w:2.2,destination:'volley'},
      {id:'quadra-futevolei',x1:92,z1:82,x2:100,z2:84,w:2.2,destination:'footvolley'},
      {id:'fazenda',x1:91,z1:34,x2:96,z2:30,w:2.2,destination:'farm'},
      {id:'castelo',x1:100,z1:41,x2:100,z2:43,w:5.2,destination:'castle'},
      {id:'kart',x1:94,z1:-69,x2:94,z2:-72.1,w:3.2,destination:'kart-circuit'},
      {id:'montanha',x1:-55,z1:80,x2:-63,z2:84,w:2.2,destination:'mountain'},
      {id:'construcao',x1:-35,z1:81,x2:-33,z2:82,w:3.0,destination:'construction-zone'}
    ]),
    structures:Object.freeze([
      {id:'home',kind:'house',point:'home',w:9,d:7,margin:1.2,access:'spawn'},
      {id:'blue',kind:'house',point:'blue',w:9,d:7,margin:1.2},
      {id:'pink',kind:'house',point:'pink',w:9,d:7,margin:1.2},
      {id:'shop',kind:'house',point:'shop',w:9,d:7,margin:1.2},
      {id:'workshop',kind:'house',point:'workshop',w:9,d:7,margin:1.2},
      {id:'school',kind:'house',point:'school',w:9,d:7,margin:1.4},
      {id:'school-east',kind:'house',point:'schoolEast',w:9,d:7,margin:1.4},
      {id:'police',kind:'house',point:'police',w:9,d:7,margin:1.4},
      {id:'police-west',kind:'house',point:'policeWest',w:9,d:7,margin:1.4},
      {id:'fire-station',kind:'house',point:'fireStation',w:9,d:7,margin:1.4},
      {id:'cabin',kind:'house',point:'cabin',w:9,d:7,margin:1.2},
      {id:'stadium',kind:'sport',point:'sports',w:62,d:43,margin:.5},
      {id:'football-field',kind:'sport-inner',point:'sports',w:42,d:18,margin:0,inside:'stadium'},
      {id:'volley',kind:'sport',point:'volley',w:14,d:22,margin:.6},
      {id:'footvolley',kind:'sport',point:'footvolley',w:14,d:22,margin:.6},
      {id:'kart-circuit',kind:'kart',point:'kart',w:44,d:38,margin:.35},
      {id:'kart-boxes',kind:'kart-inner',point:'kartBoxes',w:14,d:32,margin:0,inside:'kart-circuit'},
      {id:'farm',kind:'farm',point:'farm',w:22,d:18,margin:.8},
      {id:'castle',kind:'castle',point:'castle',w:31,d:27.6,margin:.4,allowedRoads:['acesso-castelo-fazenda']},
      {id:'mountain',kind:'terrain',point:'mountain',w:50,d:36,margin:.5},
      {id:'mine',kind:'resource',point:'mine',w:18,d:14,margin:1.0},
      {id:'learning',kind:'education',x:22,z:-40,w:8,d:22,margin:1.0},
      {id:'playground',kind:'playground',point:'playground',w:9,d:7,margin:1.0},
      {id:'giant-gate',kind:'challenge',point:'giantGate',w:10,d:2,margin:1.0},
      {id:'mini-tunnel',kind:'challenge',point:'miniTunnel',w:8,d:6,margin:1.0},
      {id:'crouch-tunnel',kind:'challenge',point:'crouchTunnel',w:8,d:5,margin:1.0},
      {id:'construction-zone',kind:'construction',point:'construction',w:36,d:32,margin:0,allowRoadOverlap:false}
    ])
  });
  function worldLayoutPoint(id,fallback={x:0,z:0}){const p=WORLD_LAYOUT_V704.points[id];return p?{x:Number(p.x),z:Number(p.z)}:{x:Number(fallback.x||0),z:Number(fallback.z||0)};}
  function worldLayoutRect(id){const zone=WORLD_LAYOUT_V704.zones[id];return zone?{...zone}:null;}
  function worldLayoutStructure(id){const item=WORLD_LAYOUT_V704.structures.find(entry=>entry.id===id);if(!item)return null;const p=item.point?worldLayoutPoint(item.point):item;return{...item,x:Number(item.x??p.x),z:Number(item.z??p.z)};}
  function v704RectOverlap(a,b,margin=0){return Math.abs(Number(a.x)-Number(b.x))<(Number(a.w)+Number(b.w))/2+margin&&Math.abs(Number(a.z)-Number(b.z))<(Number(a.d)+Number(b.d))/2+margin;}
  function v704PointInRect(point,rect,margin=0){return Math.abs(Number(point.x)-Number(rect.x))<=Number(rect.w)/2+margin&&Math.abs(Number(point.z)-Number(rect.z))<=Number(rect.d)/2+margin;}
  function v704RoadFootprint(road,includeSidewalk=true){const side=includeSidewalk?2.7:0;return{...road,w:Number(road.w)+(Number(road.w)>=Number(road.d)?0:side),d:Number(road.d)+(Number(road.w)>=Number(road.d)?side:0)};}
  function v704RoadAt(x,z,margin=0,includeSidewalk=false){return WORLD_LAYOUT_V704.roads.some(road=>v704PointInRect({x,z},v704RoadFootprint(road,includeSidewalk),margin));}
  function v704ZoneAt(x,z,margin=0){return Object.values(WORLD_LAYOUT_V704.zones).filter(zone=>v704PointInRect({x,z},zone,margin)).map(zone=>zone.id);}
  function v704ConstructionAt(x,z,margin=0){return v704PointInRect({x,z},WORLD_LAYOUT_V704.zones.construction,-Math.abs(margin));}
  function v704ProtectedRectangles(){return WORLD_LAYOUT_V704.structures.filter(item=>item.kind!=='sport-inner'&&item.kind!=='construction').map(item=>worldLayoutStructure(item.id));}
  function v704ReservedAt(x,z,margin=0){if(v704RoadAt(x,z,margin,true))return true;return v704ProtectedRectangles().some(rect=>v704PointInRect({x,z},rect,Number(rect.margin||0)+margin));}
  function v704BuildAllowedAt(x,z,w=1.5,d=1.5){const zone=WORLD_LAYOUT_V704.zones.construction,rect={x,z,w,d};if(x-w/2<zone.x-zone.w/2||x+w/2>zone.x+zone.w/2||z-d/2<zone.z-zone.d/2||z+d/2>zone.z+zone.d/2)return false;return !WORLD_LAYOUT_V704.roads.some(road=>v704RectOverlap(rect,v704RoadFootprint(road,true),.25));}
  function v704NearestConstructionSlot(index=0){const zone=WORLD_LAYOUT_V704.zones.construction,columns=6,spacingX=5,spacingZ=5,row=Math.floor(index/columns),column=index%columns;return{x:zone.x-zone.w/2+3+column*spacingX,z:zone.z-zone.d/2+3+row*spacingZ};}
  function v704PathRect(path){const dx=Number(path.x2)-Number(path.x1),dz=Number(path.z2)-Number(path.z1),length=Math.hypot(dx,dz);return{id:path.id,x:(path.x1+path.x2)/2,z:(path.z1+path.z2)/2,w:Math.abs(dx)+Number(path.w||2),d:Math.abs(dz)+Number(path.w||2),rotation:Math.atan2(dx,dz),length};}
  function v704StaticWorldAudit(){
    const problems=[],roads=WORLD_LAYOUT_V704.roads.map(road=>v704RoadFootprint(road,true)),structures=WORLD_LAYOUT_V704.structures.map(item=>worldLayoutStructure(item.id)),bounds=WORLD_LAYOUT_V704.bounds;
    const compatible=new Set(['stadium|football-field','football-field|stadium']);
    for(const road of roads){if(road.x-road.w/2<bounds.minX||road.x+road.w/2>bounds.maxX||road.z-road.d/2<bounds.minZ||road.z+road.d/2>bounds.maxZ)problems.push({type:'road-out-of-bounds',a:road.id});}
    for(const item of structures){
      if(item.x-item.w/2<bounds.minX||item.x+item.w/2>bounds.maxX||item.z-item.d/2<bounds.minZ||item.z+item.d/2>bounds.maxZ)problems.push({type:'structure-out-of-bounds',a:item.id});
      if(item.kind==='construction')continue;
      for(const road of roads){if((item.allowedRoads||[]).includes(road.id))continue;if(v704RectOverlap(item,road,Number(item.margin||0)))problems.push({type:'structure-on-road',a:item.id,b:road.id});}
    }
    for(let i=0;i<structures.length;i++)for(let j=i+1;j<structures.length;j++){
      const a=structures[i],b=structures[j];if(a.kind==='construction'||b.kind==='construction'||compatible.has(`${a.id}|${b.id}`)||a.inside===b.id||b.inside===a.id)continue;
      if(v704RectOverlap(a,b,Math.max(Number(a.margin||0),Number(b.margin||0))))problems.push({type:'structure-overlap',a:a.id,b:b.id});
    }
    const water=[WORLD_LAYOUT_V704.zones.lake,WORLD_LAYOUT_V704.zones.lakeNorth];for(const item of structures.filter(s=>!['terrain'].includes(s.kind)))for(const hazard of water)if(v704RectOverlap(item,hazard,.1))problems.push({type:'structure-in-water',a:item.id,b:hazard.id});
    for(const path of WORLD_LAYOUT_V704.paths){const rect=v704PathRect(path);for(const structure of structures){if(['construction-zone'].includes(structure.id)||path.destination===structure.id)continue;const startInside=v704PointInRect({x:path.x1,z:path.z1},structure,.1),endInside=v704PointInRect({x:path.x2,z:path.z2},structure,.1);if(!startInside&&!endInside&&v704RectOverlap(rect,structure,.2))problems.push({type:'path-through-structure',a:path.id,b:structure.id});}}
    return{version:704,passed:problems.length===0,problems,roads:roads.length,structures:structures.length,zones:Object.keys(WORLD_LAYOUT_V704.zones).length,paths:WORLD_LAYOUT_V704.paths.length};
  }
  function v704ActualHouseRect(house){if(!house)return null;if(house.id==='castle-hall')return worldLayoutStructure('castle');return{id:String(house.id||'house'),kind:'runtime-house',x:Number(house.x),z:Number(house.z),w:Number(house.w||9),d:Number(house.d||7)};}
  function v704RuntimeWorldAudit(){
    const problems=[],roads=WORLD_LAYOUT_V704.roads.map(road=>v704RoadFootprint(road,true)),protectedRects=v704ProtectedRectangles(),houses=(world?.houses||[]).map(v704ActualHouseRect).filter(Boolean),vehicles=world?.vehicles||[],hazards=world?.hazards||[];
    const add=(type,a,b='',detail='')=>problems.push({type,a:String(a||''),b:String(b||''),detail:String(detail||'')});
    for(const house of houses)for(const road of roads)if(v704RectOverlap(house,road,1.0))add('house-on-road',house.id,road.id);
    for(let i=0;i<houses.length;i++)for(let j=i+1;j<houses.length;j++)if(v704RectOverlap(houses[i],houses[j],1.0))add('house-overlap',houses[i].id,houses[j].id);
    for(const house of houses)for(const hazard of hazards)if(Number.isFinite(hazard.w)&&v704RectOverlap(house,hazard,.25))add('house-in-hazard',house.id,hazard.type);
    const protectedGameplay=protectedRects.filter(rect=>['sport','kart','farm','castle'].includes(rect.kind));for(const collider of world?.colliders||[]){const rect={x:Number(collider.x),z:Number(collider.z),w:Number(collider.w),d:Number(collider.d)};if(!Number.isFinite(rect.x)||collider.sportsV704||collider.kartV704)continue;for(const protectedRect of protectedGameplay)if(v704RectOverlap(rect,protectedRect,.15))add('collider-in-protected-area',collider.houseId||collider.buildId||collider.landmark||'collider',protectedRect.id);}
    for(const vehicle of vehicles){const x=Number(vehicle.group?.position?.x??vehicle.x),z=Number(vehicle.group?.position?.z??vehicle.z),id=String(vehicle.id||'vehicle');if(!Number.isFinite(x)||!Number.isFinite(z)){add('vehicle-invalid-position',id);continue;}const isKart=String(vehicle.kind||'')==='kart';if(!isKart)for(const road of roads)if(v704PointInRect({x,z},road,Number(vehicle.radius||1.35)))add('vehicle-on-road',id,road.id);for(const structure of protectedRects){if(isKart&&['kart-circuit','kart-boxes'].includes(structure.id))continue;if(v704PointInRect({x,z},structure,1.2))add('vehicle-inside-structure',id,structure.id);}}
    const spawn=worldLayoutPoint('spawn');if(typeof positionBlockedForPlayer==='function'&&positionBlockedForPlayer(spawn.x,spawn.z,.42,{ignoreTraffic:true,allowWater:false}))add('spawn-blocked','spawn');
    const important=['sportsEntrance','volley','footvolley','kartEntrance','farmEntrance','castleEntrance','mountainEntrance','constructionEntrance'];for(const id of important){const p=worldLayoutPoint(id);if(typeof nearestRoadProjection==='function'){const projection=nearestRoadProjection(p);if(!projection||projection.distance>18||projection.clear===false)add('destination-inaccessible',id,'road',projection?`distance=${projection.distance.toFixed(1)}`:'no-projection');}}
    const names={};worldGroup?.traverse?.(object=>{const name=String(object.name||'');if(name)names[name]=(names[name]||0)+1;});for(const name of['OTTHI_V702_FARM','OTTHI_V702_MOUNTAIN','OTTHI_V704_SPORTS','OTTHI_V704_KART'])if((names[name]||0)>1)add('duplicate-world-system',name,String(names[name]));
    const result={version:704,passed:problems.length===0,problems,houses:houses.length,vehicles:vehicles.length,colliders:world?.colliders?.length||0,hazards:hazards.length,interactables:world?.interactables?.length||0,at:Date.now()};world.layoutAuditRuntime=result;if(!result.passed)console.error('[OTTHI V704] auditoria geométrica do mundo real',problems);return result;
  }
  window.OTTHI_WORLD_LAYOUT_V704={layout:WORLD_LAYOUT_V704,point:worldLayoutPoint,zone:worldLayoutRect,structure:worldLayoutStructure,staticAudit:v704StaticWorldAudit,runtimeAudit:v704RuntimeWorldAudit,audit:v704StaticWorldAudit,roadAt:v704RoadAt,reservedAt:v704ReservedAt,buildAllowedAt:v704BuildAllowedAt,constructionSlot:v704NearestConstructionSlot,zonesAt:v704ZoneAt};
