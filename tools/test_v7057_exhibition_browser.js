/* Browser homologation for the exhibition build. Requires Playwright and a local HTTP server. */
'use strict';

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = process.env.OTTHI_TEST_URL || 'http://127.0.0.1:8790/';
const EDGE = process.env.OTTHI_EDGE || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUT = path.resolve(__dirname, '..', 'docs', 'qa-v7057-r2');
fs.mkdirSync(OUT, { recursive: true });

const results = [];
const errors = [];
function check(name, ok, detail = '') {
  results.push({ name, passed: !!ok, detail });
  process.stdout.write(`${ok ? 'OK' : 'FALHA'} - ${name}${detail ? `: ${detail}` : ''}\n`);
}
function assert(name, condition, detail = '') {
  check(name, condition, detail);
}

async function preparePage(context, viewport) {
  const page = await context.newPage();
  page.setDefaultTimeout(90000);
  page.setDefaultNavigationTimeout(90000);
  page.__otthiExpectedOffline = false;
  if (viewport) await page.setViewportSize(viewport);
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error' && !page.__otthiExpectedOffline) errors.push(`console: ${message.text()}`);
  });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(() => !!window.OTTHOS_TEST_API, null, { timeout: 60000 });
  return page;
}

async function startGame(page, name = 'Aluno QA') {
  await page.locator('#playBtn').click();
  for (let attempt = 0; attempt < 8; attempt++) {
    if (await page.evaluate(() => window.OTTHOS_TEST_API.getGame().running)) return;
    const offline = page.locator('[data-account-offline]');
    if (await offline.count() && await offline.isVisible()) {
      await offline.click();
      await page.waitForTimeout(80);
    }
    const input = page.locator('#playerNameInput');
    if (await input.count() && await input.isVisible()) {
      await input.fill(name);
      await page.locator('[data-save-player-name]').click();
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(250);
  }
  await page.waitForFunction(() => window.OTTHOS_TEST_API.getGame().running, null, { timeout: 60000 });
}

async function testLobby(page) {
  const buttons = ['profileNameBtn', 'arBtn', 'quizBtn', 'learningPathBtn', 'neighborhoodBtn', 'collectionBtn', 'avatarBtn', 'accountBtn', 'moldsBtn', 'howBtn', 'settingsBtn'];
  const wired = await page.evaluate(ids => ids.map(id => {
    const button = document.getElementById(id);
    if (!button) return { id, exists: false, reacts: false };
    const before = { modal: document.getElementById('modal')?.hidden, title: document.getElementById('modalTitle')?.textContent || '', viewer: document.getElementById('viewerScreen')?.hidden };
    button.click();
    const after = { modal: document.getElementById('modal')?.hidden, title: document.getElementById('modalTitle')?.textContent || '', viewer: document.getElementById('viewerScreen')?.hidden };
    window.OTTHOS_TEST_API.closeModal();
    const lobby = document.getElementById('lobby');
    if (lobby) lobby.hidden = false;
    return { id, exists: true, wired: typeof button.onclick === 'function', reacts: before.modal !== after.modal || before.title !== after.title || before.viewer !== after.viewer };
  }), buttons);
  for (const item of wired) check(`Menu ${item.id} responde`, item.exists && (item.wired || item.reacts), JSON.stringify(item));
}

async function testCoreRuntime(page) {
  const world = await page.evaluate(() => ({
    game: OTTHOS_TEST_API.getGame(),
    audit: OTTHI_WORLD_LAYOUT_V704.runtimeAudit(),
    evolution: OTTHOS_TEST_API.worldEvolution?.diagnostics?.(),
    performance: OTTHOS_TEST_API.performance(),
    database: OTTHOS_TEST_API.database(),
    coop: OTTHI_COOP?.preflightAll?.()
  }));
  assert('Jogo iniciou', world.game.running === true);
  assert('Mundo sem violações espaciais', world.audit.passed === true && world.audit.problems.length === 0, JSON.stringify(world.audit.problems));
  assert('Sistemas de mundo evoluído inicializados', world.evolution?.initialized === true, JSON.stringify(world.evolution));
  assert('Banco local disponível', world.database.available === true, JSON.stringify(world.database));
  assert('Renderizador ativo', world.performance.drawCalls > 0 && world.performance.triangles > 0, JSON.stringify(world.performance));
  if (Array.isArray(world.coop)) assert('Pré-validação cooperativa', world.coop.every(item => item.ok !== false && !(item.errors || []).length), JSON.stringify(world.coop));

  const education = await page.evaluate(() => ['math', 'portuguese', 'english'].map(subject => ({ subject, rounds: OTTHOS_TEST_API.educationRounds(subject, 2, 70572) })));
  for (const item of education) assert(`Academia ${item.subject}`, item.rounds.length === 5 && item.rounds.every(round => round.prompt && Array.isArray(round.options) && round.options.length >= 2));

  const jobIds = ['delivery', 'police', 'firefighter', 'paramedic', 'teacher', 'gather', 'crystals', 'builder'];
  for (const id of jobIds) {
    const job = await page.evaluate(jobId => {
      const before = OTTHOS_TEST_API.getState().profile.coins;
      const started = OTTHOS_TEST_API.startJobById(jobId, false);
      const active = OTTHOS_TEST_API.getState().career.activeJob?.id || '';
      const completed = OTTHOS_TEST_API.forceCompleteJob();
      const after = OTTHOS_TEST_API.getState().profile.coins;
      return { started: !!started, active, completed: !!completed, reward: after - before };
    }, id);
    assert(`Trabalho ${id}`, job.started && job.active === id && job.completed && job.reward > 0, JSON.stringify(job));
  }

  const build = await page.evaluate(() => {
    OTTHOS_TEST_API.setInventory({ blocks: 9, wood: 9, stone: 9, fences: 9 });
    const before = OTTHOS_TEST_API.construction().stateBuilds.length;
    const prepared = OTTHOS_TEST_API.prepareBuild('block', -33, 90, 0);
    const preview = OTTHOS_TEST_API.construction().placement;
    const placed = OTTHOS_TEST_API.placeBuild();
    const after = OTTHOS_TEST_API.construction().stateBuilds.length;
    OTTHOS_TEST_API.cancelBuild();
    return { prepared: !!prepared, preview, placed: !!placed, before, after };
  });
  assert('Construção e colocação', build.prepared && build.placed && build.after === build.before + 1, JSON.stringify(build));

  const navigation = await page.evaluate(() => {
    const waypoint = OTTHOS_TEST_API.setWaypoint('school');
    const route = OTTHOS_TEST_API.navigation().route;
    const cleared = OTTHOS_TEST_API.clearWaypoint();
    return { waypoint: waypoint?.id, route: route.length, cleared, current: OTTHOS_TEST_API.navigation().waypoint };
  });
  assert('GPS e rota', navigation.waypoint === 'school' && navigation.route >= 2 && navigation.cleared && !navigation.current, JSON.stringify(navigation));

  const abilities = await page.evaluate(() => {
    const mini = OTTHOS_TEST_API.setSize('mini');
    const giant = OTTHOS_TEST_API.setSize('giant');
    const normal = OTTHOS_TEST_API.setSize('normal');
    OTTHOS_TEST_API.crouch(); const crouched = OTTHOS_TEST_API.getGame().player.crouched;
    OTTHOS_TEST_API.crouch(); const standing = !OTTHOS_TEST_API.getGame().player.crouched;
    return { mini, giant, normal, crouched, standing };
  });
  assert('Habilidades de tamanho e abaixar', abilities.crouched && abilities.standing, JSON.stringify(abilities));

  const house = await page.evaluate(() => {
    const entered = OTTHOS_TEST_API.enterHouseById('home');
    const inside = OTTHOS_TEST_API.getGame();
    const exited = OTTHOS_TEST_API.exitHouse();
    const outside = OTTHOS_TEST_API.getGame();
    return { entered, inside: { house: inside.currentHouse, camera: inside.cameraMode }, exited, outside: { house: outside.currentHouse, camera: outside.cameraMode } };
  });
  assert('Entrada e saída de casa', house.entered && house.inside.house === 'home' && house.inside.camera === 'interior' && house.exited && house.outside.house === null && house.outside.camera === 'openworld', JSON.stringify(house));

  const vehicle = await page.evaluate(() => {
    const prepared = OTTHOS_TEST_API.prepareVehicleTest();
    const moving = OTTHOS_TEST_API.stepVehicleSimulation(180, .18, 1);
    const state = OTTHOS_TEST_API.vehicle();
    const exited = OTTHOS_TEST_API.exitVehicle();
    return { prepared, moving, state, exited };
  });
  assert('Direção de veículo', vehicle.prepared.active && vehicle.prepared.vehicleId && vehicle.moving.distance > 3 && vehicle.moving.impacts === 0 && vehicle.state.active && vehicle.exited, JSON.stringify(vehicle));

  const transit = await page.evaluate(async () => {
    const busBefore = OTTHOS_TEST_API.transport().buses[0];
    const boarded = OTTHOS_TEST_API.boardBus(busBefore.id);
    const modeBoarded = OTTHOS_TEST_API.transport().mode;
    OTTHOS_TEST_API.stepTransit(30);
    const exited = OTTHOS_TEST_API.exitBus();
    const metro = OTTHOS_TEST_API.rideMetro('village', 'central');
    const modeDuringMetro = OTTHOS_TEST_API.transport().mode;
    await new Promise(resolve => setTimeout(resolve, 2200));
    const modeAfterMetro = OTTHOS_TEST_API.transport().mode;
    return { boarded, modeBoarded, exited, metro, modeDuringMetro, modeAfterMetro };
  });
  assert('Ônibus e metrô', transit.boarded && transit.modeBoarded === 'bus' && transit.exited && transit.metro && transit.modeDuringMetro === 'metro' && transit.modeAfterMetro === '', JSON.stringify(transit));

  const boat = await page.evaluate(() => {
    const forced = OTTHOS_TEST_API.forceBoatState(-38, 52, 0);
    const moved = OTTHOS_TEST_API.stepBoat(.2, 1, 120);
    const returned = OTTHOS_TEST_API.forceBoatState(-24.7, 52, 0);
    const exited = OTTHOS_TEST_API.exitBoat(true);
    return { forced, moved, returned, exited, boating: OTTHOS_TEST_API.lifeExpansion().boating };
  });
  assert('Barco e desembarque seguro', boat.moved.distance > 1 && boat.returned.canExit && boat.exited && !boat.boating, JSON.stringify(boat));

  const services = await page.evaluate(() => {
    const fireStarted = OTTHOS_TEST_API.startFire();
    const fires = OTTHOS_TEST_API.stepFire(120);
    const prepared = OTTHOS_TEST_API.prepareVehicleTest();
    const policeStarted = OTTHOS_TEST_API.startPoliceAlert();
    const police = OTTHOS_TEST_API.police();
    OTTHOS_TEST_API.finishSafetyStop();
    OTTHOS_TEST_API.closeModal();
    return { fireStarted: !!fireStarted, activeFires: fires.filter(f => f.active).length, prepared, policeStarted: !!policeStarted, alert: !!police.alert };
  });
  assert('Serviços de incêndio e polícia', services.fireStarted && services.activeFires >= 1 && services.policeStarted && services.alert, JSON.stringify(services));

  const multiplayer = await page.evaluate(() => {
    const id = OTTHOS_TEST_API.simulateRemotePresence({ uid: 'remote-exhibition', name: 'Aluno Remoto', vehicle: true });
    const ghosts = OTTHOS_TEST_API.multiplayer().ghosts;
    return { id, ghost: ghosts.find(item => item.id === id) };
  });
  assert('Presença multiplayer simulada', multiplayer.id === 'remote-exhibition' && !!multiplayer.ghost, JSON.stringify(multiplayer));

  const sports = await page.evaluate(() => {
    OTTHI_SPORTS_V705.startFootball('solo'); const football = OTTHI_SPORTS_V705.state().active;
    OTTHI_SPORTS_V705.stop(false); const stopped = OTTHI_SPORTS_V705.state().active;
    OTTHI_SPORTS_V705.startCourt('volley'); const volley = OTTHI_SPORTS_V705.state().active;
    OTTHI_SPORTS_V705.stop(false);
    return { football, stopped, volley, final: OTTHI_SPORTS_V705.state().active };
  });
  assert('Esportes iniciam e encerram', sports.football === 'football' && sports.stopped === '' && sports.volley === 'volley' && sports.final === '', JSON.stringify(sports));

  const news = await page.evaluate(() => {
    OTTHI_OTTOVIAS.openNews();
    const modes = [...document.querySelectorAll('[data-michelle-news-mode]')].map(button => button.dataset.michelleNewsMode);
    const silent = document.querySelector('[data-michelle-news-mode="silent"]');
    silent?.click();
    const state = OTTHI_OTTOVIAS.state();
    OTTHOS_TEST_API.closeModal();
    return { modes, selected: state.newsMode, answer: OTTHI_OTTOVIAS.askMichelle('Como está o trânsito?') };
  });
  assert('Noticiário configurável e consultável', ['critical', 'all', 'silent'].every(mode => news.modes.includes(mode)) && news.selected === 'silent' && news.answer.length > 15, JSON.stringify(news));
}

async function testPersistence(page) {
  const marker = 72;
  await page.evaluate(value => { OTTHOS_TEST_API.setInventory({ crystals: value }); OTTHOS_TEST_API.saveNow(); }, marker);
  await page.waitForTimeout(300);
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForFunction(() => !!window.OTTHOS_TEST_API, null, { timeout: 60000 });
  const persisted = await page.evaluate(() => ({ crystals: OTTHOS_TEST_API.getState().inventory.crystals, db: OTTHOS_TEST_API.database() }));
  assert('Persistência após recarregar', persisted.crystals === marker && persisted.db.available, JSON.stringify(persisted));
}

async function testPwaOffline(page) {
  const context = page.context();
  if (!await page.evaluate(() => !!navigator.serviceWorker?.controller)) {
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForFunction(() => !!window.OTTHOS_TEST_API && !!navigator.serviceWorker?.controller, null, { timeout: 60000 });
  }
  let offline;
  try {
    page.__otthiExpectedOffline = true;
    await context.setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForFunction(() => !!window.OTTHOS_TEST_API, null, { timeout: 60000 });
    offline = await page.evaluate(() => ({ title: document.title, api: !!window.OTTHOS_TEST_API, controller: !!navigator.serviceWorker?.controller, release: !!window.OTTHI_RELEASE_COHERENT }));
  } finally {
    await context.setOffline(false);
    page.__otthiExpectedOffline = false;
  }
  assert('PWA abre o shell sem rede', offline?.api && offline?.controller && offline?.release, JSON.stringify(offline));
}

async function testResponsive(browser) {
  const sizes = [
    { width: 320, height: 568, name: '320x568' },
    { width: 568, height: 320, name: '568x320' },
    { width: 390, height: 844, name: '390x844' },
    { width: 844, height: 390, name: '844x390' },
    { width: 768, height: 1024, name: '768x1024' },
    { width: 1024, height: 768, name: '1024x768' },
    { width: 1366, height: 768, name: '1366x768' }
  ];
  for (const mobile of [true, false]) {
    const group = sizes.filter(size => (size.width < 900) === mobile);
    const first = group[0];
    const context = await browser.newContext({ viewport: { width: first.width, height: first.height }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    const page = await preparePage(context, { width: first.width, height: first.height });
    await startGame(page, mobile ? 'QA Mobile' : 'QA Desktop');
    for (const size of group) {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.waitForTimeout(320);
      const layout = await page.evaluate(() => {
        const ids = ['actionBtn', 'jumpBtn', 'quickToggleBtn', 'skillsToggleBtn', 'gameSettingsBtn'];
        const controls = ids.map(id => { const el = document.getElementById(id), r = el?.getBoundingClientRect(); return { id, visible: !!el && getComputedStyle(el).display !== 'none' && r.width > 0 && r.height > 0, left: r?.left, top: r?.top, right: r?.right, bottom: r?.bottom }; });
        return { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, body: document.body.className, controls, mobile: OTTHOS_TEST_API.mobileLayout(), game: OTTHOS_TEST_API.getGame() };
      });
      const noOverflow = layout.scrollWidth <= layout.width + 2;
      const essential = layout.controls.filter(item => ['actionBtn', 'jumpBtn', 'quickToggleBtn', 'skillsToggleBtn'].includes(item.id));
      const inViewport = essential.every(item => item.visible && item.left >= -2 && item.top >= -2 && item.right <= layout.width + 2 && item.bottom <= layout.height + 2);
      const orientation = size.width > size.height ? layout.mobile.landscape : layout.mobile.portrait;
      check(`Responsividade ${size.name}`, noOverflow && inViewport && orientation, JSON.stringify({ noOverflow, inViewport, orientation, body: layout.body, controls: essential }));
      if (size.name === '568x320' || size.name === '1366x768') {
        try { await page.screenshot({ path: path.join(OUT, `exibicao-${size.name}.png`), caret: 'hide', timeout: 120000 }); }
        catch (error) { errors.push(`screenshot ${size.name}: ${error.message}`); }
      }
    }
    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: EDGE, args: ['--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  try {
    const context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
    const page = await preparePage(context, { width: 1366, height: 768 });
    await testLobby(page);
    await startGame(page);
    await page.waitForTimeout(1200);
    await testCoreRuntime(page);
    await testPersistence(page);
    await testPwaOffline(page);
    await page.screenshot({ path: path.join(OUT, 'exibicao-desktop-final.png'), fullPage: true });
    await context.close();
    await testResponsive(browser);
  } finally {
    await browser.close();
  }
  const report = { generatedAt: new Date().toISOString(), url: BASE_URL, passed: results.every(item => item.passed) && errors.length === 0, counts: { passed: results.filter(item => item.passed).length, failed: results.filter(item => !item.passed).length, total: results.length }, errors, results };
  fs.writeFileSync(path.join(OUT, 'TESTE-NAVEGADOR-EXIBICAO-V7057-R2.json'), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`\n${JSON.stringify({ passed: report.passed, counts: report.counts, errors }, null, 2)}\n`);
  if (!report.passed) process.exitCode = 1;
}

main().catch(error => { console.error(error.stack || error); process.exit(1); });
