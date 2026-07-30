# Checklist das 711 funções — OTTHI World Edu V644

Cada item confirma presença na fonte modular. `endBoundaryLine` termina na próxima declaração de função de topo; não é uma afirmação de parsing semântico do corpo JavaScript.


## `00a-visual-foundation-avatar-v2.js`

- [x] `safeAvatarId()` — linhas 112–115 — return=1 — chama: nenhuma função nomeada detectada
- [x] `safeAvatarColor()` — linhas 116–119 — return=1 — chama: nenhuma função nomeada detectada
- [x] `safeLegacyAvatarChoice()` — linhas 120–123 — return=1 — chama: nenhuma função nomeada detectada
- [x] `defaultAvatarV2()` — linhas 124–126 — return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeAvatarV2()` — linhas 127–156 — return=1 — chama: safeAvatarColor, safeAvatarId, safeLegacyAvatarChoice
- [x] `updateAvatarV2LegacyChoice()` — linhas 157–187 — if=3, return=2 — chama: normalizeAvatarV2, safeLegacyAvatarChoice
- [x] `registerVisualAsset()` — linhas 188–195 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `updateVisualAsset()` — linhas 196–198 — return=1 — chama: registerVisualAsset
- [x] `visualAssetStatus()` — linhas 199–209 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `visualQualityProfile()` — linhas 210–212 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createManagedLOD()` — linhas 213–232 — if=2, return=3 — chama: registerVisualAsset
- [x] `applyVisualQualityBudget()` — linhas 233–242 — if=1, for=1, return=1 — chama: visualQualityProfile
- [x] `updateManagedVisualLODs()` — linhas 243–253 — if=1, for=1, catch=1, return=1 — chama: updateVisualAsset
- [x] `outlineBelongsToPlayer()` — linhas 254–261 — if=1, while=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `updateManagedOutlineVisibility()` — linhas 262–282 — if=4, else=1, for=1, return=1 — chama: outlineBelongsToPlayer, visualQualityProfile
- [x] `visualFoundationDiagnostics()` — linhas 283–309 — if=1, else=1, for=1, return=1 — chama: visualAssetStatus
- [x] `createAvatarRigFoundation()` — linhas 310–343 — if=7, return=3 — chama: registerVisualAsset
- [x] `avatarFoundationDiagnostics()` — linhas 344–362 — return=1 — chama: registerVisualAsset

## `01-build-persistence.js`

- [x] `stableBuildId()` — linhas 363–368 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeBuildRecord()` — linhas 369–375 — if=2, return=3 — chama: stableBuildId
- [x] `normalizeBuildList()` — linhas 376–384 — if=2, return=2 — chama: normalizeBuildRecord
- [x] `normalizeBuildTombstones()` — linhas 385–393 — if=3, return=3 — chama: nenhuma função nomeada detectada
- [x] `mergeBuildTombstones()` — linhas 394–394 — return=1 — chama: normalizeBuildTombstones
- [x] `applyBuildTombstones()` — linhas 395–398 — return=1 — chama: normalizeBuildList, normalizeBuildTombstones
- [x] `mergeBuildCollections()` — linhas 399–401 — return=1 — chama: applyBuildTombstones, normalizeBuildList
- [x] `mergeEntityCollections()` — linhas 402–481 — if=2, return=2 — chama: defaultAvatarV2

## `02-state-save-cloud-account.js`

- [x] `normalizeState()` — linhas 482–539 — if=2, return=1 — chama: applyBuildTombstones, normalizeAvatarV2, normalizeBuildTombstones
- [x] `loadState()` — linhas 540–588 — if=10, else=2, for=1, catch=4, return=5 — chama: ensureDailyChallenges, normalizeState, updateDailyBadge, updateHUD, updateLobbyStats
- [x] `commitState()` — linhas 589–605 — catch=2, return=2 — chama: applyBuildTombstones, ensureDailyChallenges, normalizeBuildTombstones, syncCloudProgress, syncGameAccount, updateDailyBadge, updateLobbyStats
- [x] `saveState()` — linhas 606–613 — if=1, return=2 — chama: commitState
- [x] `cloudProgressPayload()` — linhas 614–622 — return=1 — chama: nenhuma função nomeada detectada
- [x] `syncCloudProgress()` — linhas 623–626 — if=1, return=2 — chama: cloudProgressPayload, hasValidPlayerName
- [x] `mergeCloudProgress()` — linhas 627–648 — if=3, catch=1, return=3 — chama: mergeBuildCollections, mergeBuildTombstones, mergeEntityCollections, normalizeAvatarV2, normalizeState, reconcileWorldBuilds, syncCloudProgress, toast, updateHUD, updateLobbyStats, updatePlayerNameUI
- [x] `accountLinked()` — linhas 649–649 — return=1 — chama: nenhuma função nomeada detectada
- [x] `accountPromptWasHandled()` — linhas 650–650 — return=1 — chama: nenhuma função nomeada detectada
- [x] `accountStatusText()` — linhas 651–667 — if=4, return=7 — chama: accountLinked, publicPlayerName
- [x] `syncGameAccount()` — linhas 668–722 — if=17, catch=1, return=12, throw=10 — chama: accountLinked, applyPlayerName, commitState, normalizeState, publicPlayerName, sanitizePlayerName, saveState, updateHUD, updateLobbyStats, updatePlayerNameUI
- [x] `openAccountForm()` — linhas 723–731 — if=4, else=2, catch=1, return=1 — chama: closeModal, escapeHtml, openAccountCenter, openModal, toast
- [x] `openAccountCenter()` — linhas 732–740 — if=1 — chama: accountLinked, closeModal, escapeHtml, openAccountForm, openAccountLogoutGate, openModal, openPlayerNameModal, saveState, syncGameAccount, toast
- [x] `openAccountLogoutGate()` — linhas 741–747 — if=2, return=1 — chama: closeModal, openAccountCenter, openModal, toast

## `03-ui-modal-install-pwa.js`

- [x] `addXP()` — linhas 748–758 — if=1 — chama: awardMedal, saveState, toast, updateHUD
- [x] `addCoins()` — linhas 759–762 — sem fluxo contado — chama: saveState, updateHUD
- [x] `addReputation()` — linhas 763–766 — sem fluxo contado — chama: saveState, updateHUD
- [x] `awardMedal()` — linhas 767–772 — if=1, return=1 — chama: saveState, toast
- [x] `setFlag()` — linhas 773–779 — if=1, return=1 — chama: evaluateMissions, saveState
- [x] `showScreen()` — linhas 780–784 — sem fluxo contado — chama: updateInstallUI
- [x] `toast()` — linhas 785–790 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `vibrate()` — linhas 791–793 — if=1 — chama: nenhuma função nomeada detectada
- [x] `beep()` — linhas 794–808 — if=2, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `openModal()` — linhas 809–823 — if=3 — chama: scheduleStableResize
- [x] `closeModal()` — linhas 824–841 — if=4, else=1 — chama: cancelFishingSession, clearExtensionPreview, startEngineSound, stopFishingVisual
- [x] `confirmModal()` — linhas 842–855 — if=1, return=1 — chama: closeModal, openModal
- [x] `updateInstallUI()` — linhas 856–903 — if=5, return=2 — chama: openModal, toast
- [x] `isOfficialOtthiGameAddress()` — linhas 904–1030 — if=17, else=1, catch=8, return=12, throw=1 — chama: openModal, saveState, toast, updateInstallUI

## `04-education-daily-quiz.js`

- [x] `localDateKey()` — linhas 1031–1031 — return=1 — chama: nenhuma função nomeada detectada
- [x] `daysBetween()` — linhas 1032–1032 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `ensureDailyChallenges()` — linhas 1033–1033 — if=1, while=1, return=1 — chama: daysBetween, localDateKey, saveState
- [x] `dailyDefinition()` — linhas 1034–1034 — return=1 — chama: nenhuma função nomeada detectada
- [x] `trackDaily()` — linhas 1035–1040 — if=5, for=1, return=1 — chama: ensureDailyChallenges, saveState, updateDailyBadge
- [x] `updateDailyBadge()` — linhas 1041–1041 — if=2, return=1 — chama: ensureDailyChallenges
- [x] `claimDailyQuest()` — linhas 1042–1055 — if=1, return=1 — chama: addCoins, addReputation, addXP, beep, dailyDefinition, openDailyChallenges, saveState, toast, vibrate
- [x] `seeded()` — linhas 1056–1056 — return=1 — chama: nenhuma função nomeada detectada
- [x] `shuffled()` — linhas 1057–1057 — return=1 — chama: nenhuma função nomeada detectada
- [x] `choiceSet()` — linhas 1058–1058 — return=1 — chama: shuffled
- [x] `mathRound()` — linhas 1059–1067 — if=5, return=6 — chama: choiceSet
- [x] `portugueseRound()` — linhas 1068–1076 — if=5, return=6 — chama: choiceSet, shuffled
- [x] `englishRound()` — linhas 1077–1085 — if=5, return=6 — chama: choiceSet
- [x] `generateEducationRounds()` — linhas 1086–1086 — return=1 — chama: seeded
- [x] `subjectLevelRecord()` — linhas 1087–1087 — return=1 — chama: nenhuma função nomeada detectada
- [x] `subjectUnlocked()` — linhas 1088–1088 — return=1 — chama: subjectLevelRecord
- [x] `educationSummary()` — linhas 1089–1089 — if=1, for=2, return=1 — chama: subjectLevelRecord
- [x] `speakKidWord()` — linhas 1090–1090 — catch=1 — chama: nenhuma função nomeada detectada
- [x] `dailyChallengesHtml()` — linhas 1091–1091 — return=2 — chama: dailyDefinition, ensureDailyChallenges
- [x] `educationSubjectHtml()` — linhas 1092–1092 — return=2 — chama: subjectLevelRecord, subjectUnlocked
- [x] `openEducationHub()` — linhas 1093–1102 — if=5, return=4 — chama: claimDailyQuest, dailyChallengesHtml, educationSubjectHtml, educationSummary, ensureDailyChallenges, openModal, openSocialHub, playerDisplayName, startSoloEducationGame
- [x] `openChallengeHub()` — linhas 1103–1103 — sem fluxo contado — chama: openEducationHub
- [x] `openDailyChallenges()` — linhas 1104–1104 — sem fluxo contado — chama: openEducationHub
- [x] `runEducationGame()` — linhas 1105–1118 — if=6, else=1, return=4 — chama: addXP, beep, escapeHtml, finishSoloEducationGame, generateEducationRounds, openModal, speakKidWord
- [x] `startSoloEducationGame()` — linhas 1119–1119 — catch=1 — chama: closeChallengePrompt, runEducationGame, toast
- [x] `finishSoloEducationGame()` — linhas 1120–1122 — if=2, else=1 — chama: addCoins, addXP, awardMedal, openEducationHub, openModal, saveState, startSoloEducationGame, subjectLevelRecord
- [x] `startCinematicEmote()` — linhas 1123–1125 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `triggerEmote()` — linhas 1126–1136 — if=4 — chama: addXP, beep, startCinematicEmote, toast, vibrate
- [x] `openQuiz()` — linhas 1137–1139 — sem fluxo contado — chama: openEducationHub
- [x] `openCollection()` — linhas 1140–1158 — sem fluxo contado — chama: openModal

## `05-avatar-life-customization.js`

- [x] `effectiveAvatarUniform()` — linhas 1159–1166 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `avatarChoiceGroup()` — linhas 1167–1171 — return=1 — chama: effectiveAvatarUniform
- [x] `openAvatarStudio()` — linhas 1172–1181 — sem fluxo contado — chama: applyAvatarCustomization, avatarChoiceGroup, closeModal, normalizeAvatarV2, openModal, playerDisplayName, saveState, setFlag, toast, updateAvatarV2LegacyChoice
- [x] `openLifePanel()` — linhas 1182–1197 — if=2, for=1 — chama: closeModal, openModal, toast
- [x] `openMolds()` — linhas 1198–1200 — sem fluxo contado — chama: openModal, playerDisplayName
- [x] `openHow()` — linhas 1201–1299 — sem fluxo contado — chama: openModal

## `06-missions-profile-hud-inventory-tools.js`

- [x] `deriveMissionFlags()` — linhas 1300–1311 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `evaluateMissions()` — linhas 1312–1329 — if=2, for=1 — chama: addCoins, awardMedal, deriveMissionFlags, toast, updateMissionHUD
- [x] `updateMissionHUD()` — linhas 1330–1350 — if=3, return=3 — chama: activeJobProgress, coopMissionProgressLabel, playerText
- [x] `objectiveStatusLabel()` — linhas 1351–1351 — return=1 — chama: nenhuma função nomeada detectada
- [x] `skillMasterySummary()` — linhas 1352–1352 — return=1 — chama: nenhuma função nomeada detectada
- [x] `pinChapter()` — linhas 1353–1353 — sem fluxo contado — chama: evaluateMissions, saveState, toast, updateMissionHUD
- [x] `openObjectivesPanel()` — linhas 1354–1361 — return=1 — chama: activeCoopMission, activeJobProgress, coopMissionBriefingMarkup, deriveMissionFlags, focusActiveJob, missionBriefingMarkup, openModal, pinChapter, playerText, skillMasterySummary
- [x] `sanitizePlayerName()` — linhas 1362–1362 — return=1 — chama: nenhuma função nomeada detectada
- [x] `hasValidPlayerName()` — linhas 1363–1363 — return=1 — chama: sanitizePlayerName
- [x] `playerDisplayName()` — linhas 1364–1364 — return=1 — chama: hasValidPlayerName, sanitizePlayerName
- [x] `playerText()` — linhas 1365–1365 — return=1 — chama: playerDisplayName
- [x] `updatePlayerNameUI()` — linhas 1366–1366 — if=7 — chama: accountStatusText, hasValidPlayerName, playerDisplayName
- [x] `applyPlayerName()` — linhas 1367–1367 — if=2, return=2 — chama: publicPlayerName, sanitizePlayerName, saveState, toast, updatePlayerNameUI
- [x] `openPlayerNameModal()` — linhas 1368–1372 — if=3, return=1 — chama: applyPlayerName, closeModal, hasValidPlayerName, openModal, toast
- [x] `updateLobbyStats()` — linhas 1373–1379 — sem fluxo contado — chama: updatePlayerNameUI
- [x] `updateHUD()` — linhas 1380–1394 — if=1 — chama: updateMissionHUD, updatePlayerNameUI
- [x] `openInventory()` — linhas 1395–1407 — if=1, return=1 — chama: openModal, saveState, toast, updateHUD
- [x] `equippedTool()` — linhas 1408–1408 — return=1 — chama: nenhuma função nomeada detectada
- [x] `equipTool()` — linhas 1409–1411 — if=2, return=2 — chama: refreshEquippedToolVisual, saveState, toast
- [x] `openToolbelt()` — linhas 1412–1414 — sem fluxo contado — chama: closeModal, equipTool, openModal
- [x] `refreshEquippedToolVisual()` — linhas 1415–1428 — if=4, else=2, return=1 — chama: box, renderMat
- [x] `playToolAnimation()` — linhas 1429–1437 — sem fluxo contado — chama: beep, vibrate

## `07-navigation-traffic-routes.js`

- [x] `routeLength()` — linhas 1438–1438 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `compactRoute()` — linhas 1439–1439 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `projectPointToSegment()` — linhas 1440–1440 — return=1 — chama: nenhuma função nomeada detectada
- [x] `navBlocked()` — linhas 1441–1441 — if=3, for=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `segmentClear()` — linhas 1442–1442 — if=1, for=1, return=2 — chama: navBlocked
- [x] `nearestRoadProjection()` — linhas 1443–1443 — if=1, for=1, return=1 — chama: projectPointToSegment, segmentClear
- [x] `pointOnRoad()` — linhas 1444–1444 — return=1 — chama: nenhuma função nomeada detectada
- [x] `projectPointToPolyline()` — linhas 1445–1449 — if=3, for=1, return=2 — chama: projectPointToSegment
- [x] `snapTrafficToRoad()` — linhas 1450–1455 — if=3, return=3 — chama: nearestRoadProjection, pointOnRoad, projectPointToPolyline
- [x] `trafficActorList()` — linhas 1456–1467 — if=6, for=5, return=2 — chama: nenhuma função nomeada detectada
- [x] `trafficPriority()` — linhas 1468–1468 — if=4, else=2, return=2 — chama: nenhuma função nomeada detectada
- [x] `trafficSpeedFactor()` — linhas 1469–1478 — if=7, else=1, for=1, return=3 — chama: trafficActorList, trafficPriority
- [x] `captureTrafficPositions()` — linhas 1479–1479 — for=1, return=1 — chama: trafficActorList
- [x] `resolveTrafficOverlaps()` — linhas 1480–1490 — if=7, else=1, for=4 — chama: pointOnRoad, snapTrafficToRoad, trafficActorList, trafficPriority
- [x] `graphAdd()` — linhas 1491–1491 — if=2 — chama: nenhuma função nomeada detectada
- [x] `graphShortest()` — linhas 1492–1492 — if=6, for=2, while=2, return=2 — chama: nenhuma função nomeada detectada
- [x] `buildRoutePoints()` — linhas 1493–1504 — if=4, for=2, return=3 — chama: compactRoute, graphAdd, graphShortest, nearestRoadProjection
- [x] `routeProgressInfo()` — linhas 1505–1505 — if=2, for=1, return=2 — chama: projectPointToSegment, routeLength
- [x] `remainingRoute()` — linhas 1506–1506 — return=1 — chama: compactRoute, routeProgressInfo
- [x] `sampleRoute()` — linhas 1507–1507 — for=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `createRouteGuide()` — linhas 1508–1508 — if=2, for=1, return=3 — chama: mat
- [x] `updateRouteGuide()` — linhas 1509–1509 — if=4, return=3 — chama: buildRoutePoints, createRouteGuide, groundHeightAt, remainingRoute, routeProgressInfo, sampleRoute
- [x] `miniPoint()` — linhas 1510–1510 — return=1 — chama: nenhuma função nomeada detectada
- [x] `miniMapLogicalSize()` — linhas 1511–1511 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `miniMapScale()` — linhas 1512–1512 — return=1 — chama: nenhuma função nomeada detectada
- [x] `drawMiniMap()` — linhas 1513–1521 — if=6, for=2, return=1 — chama: miniMapLogicalSize, miniMapScale, miniPoint, remainingRoute
- [x] `updateNavigation()` — linhas 1522–1522 — if=4, else=1, return=2 — chama: beep, drawMiniMap, routeProgressInfo, saveState, toast, updateRouteGuide
- [x] `routeSvgMarkup()` — linhas 1523–1585 — return=1 — chama: playerDisplayName, worldToMap

## `08-map-parent-settings.js`

- [x] `mapLocationDetails()` — linhas 1586–1586 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `worldToMap()` — linhas 1587–1587 — return=1 — chama: nenhuma função nomeada detectada
- [x] `missionMapLocations()` — linhas 1588–1593 — if=3, return=1 — chama: serviceVehicleMapLocation
- [x] `onlinePlayerMapLocations()` — linhas 1594–1594 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentMapLocations()` — linhas 1595–1595 — if=1, for=1, return=1 — chama: coopMissionMapLocations
- [x] `mapDistance()` — linhas 1596–1597 — return=1 — chama: nenhuma função nomeada detectada
- [x] `mapMarkerPlacements()` — linhas 1598–1633 — if=5, else=2, for=4, return=4 — chama: worldToMap
- [x] `applyMapMarkerPlacements()` — linhas 1634–1642 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `mapVisualNodes()` — linhas 1643–1654 — if=3, else=1, for=3, return=1 — chama: worldToMap
- [x] `mapClusterSelectionMarkup()` — linhas 1655–1655 — return=1 — chama: mapDistance
- [x] `mapSelectionMarkup()` — linhas 1656–1659 — if=2, return=3 — chama: currentMapLocations, mapClusterSelectionMarkup, mapDistance, mapLocationDetails
- [x] `setWaypoint()` — linhas 1660–1664 — if=1, return=1 — chama: buildRoutePoints, closeModal, currentMapLocations, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `clearWaypoint()` — linhas 1665–1665 — sem fluxo contado — chama: closeModal, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `openMap()` — linhas 1666–1682 — if=4, return=4 — chama: applyMapMarkerPlacements, buildRoutePoints, currentMapLocations, mapDistance, mapMarkerPlacements, mapSelectionMarkup, mapVisualNodes, openModal, routeProgressInfo, routeSvgMarkup, setWaypoint, worldToMap
- [x] `refreshOpenMapAfterResize()` — linhas 1683–1685 — if=2, return=1 — chama: openMap
- [x] `performLocalReset()` — linhas 1686–1688 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openFinalResetConfirmation()` — linhas 1689–1694 — if=3, return=2 — chama: commitState, confirmModal, openModal, performLocalReset
- [x] `formatPlayTime()` — linhas 1695–1723 — if=7, catch=4, return=6 — chama: accountLinked, confirmModal, escapeHtml, normalizeState, openFinalResetConfirmation, openModal, openSettings, publicPlayerName, saveState, toast
- [x] `openParentGate()` — linhas 1724–1734 — if=5, return=3 — chama: accountLinked, openModal, openSettings
- [x] `openSettings()` — linhas 1735–1785 — if=11, else=6 — chama: accountStatusText, applyQuality, closeChallengePrompt, closeModal, commitState, hasValidPlayerName, multiplayerStatusText, openAccountCenter, openEducationHub, openModal, openParentGate, openPlayerNameModal (+8)

## `09-responsive-ar-quality-diagnostics.js`

- [x] `syncMobilePanels()` — linhas 1786–1834 — if=16, catch=1, return=1, throw=2 — chama: openObjectivesPanel, saveState
- [x] `otthiGameModelUrl()` — linhas 1835–1838 — return=1 — chama: nenhuma função nomeada detectada
- [x] `androidSceneViewerUrl()` — linhas 1839–1848 — return=1 — chama: otthiGameModelUrl
- [x] `isAndroidDevice()` — linhas 1849–1852 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openAndroidSceneViewer()` — linhas 1853–1894 — if=5, catch=2, return=4 — chama: androidSceneViewerUrl, isAndroidDevice, openModal, toast
- [x] `detectStableAutoTier()` — linhas 1895–1914 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `vehiclePlayerMode()` — linhas 1915–1921 — if=3, return=4 — chama: nenhuma função nomeada detectada
- [x] `derivePlayerMode()` — linhas 1922–1932 — if=8, return=9 — chama: vehiclePlayerMode
- [x] `auditPlayerMode()` — linhas 1933–1948 — if=7, return=1 — chama: derivePlayerMode
- [x] `isOnFootMode()` — linhas 1949–1949 — return=1 — chama: derivePlayerMode
- [x] `canEnterMobility()` — linhas 1950–1954 — if=1, return=2 — chama: auditPlayerMode, isOnFootMode
- [x] `cameraRelativeVector()` — linhas 1955–1959 — return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeControlIntent()` — linhas 1960–1967 — if=2, return=3 — chama: cameraRelativeVector, derivePlayerMode
- [x] `requestedQuality()` — linhas 1968–1968 — return=1 — chama: nenhuma função nomeada detectada
- [x] `qualityLabel()` — linhas 1969–1969 — return=1 — chama: qualityTier, requestedQuality
- [x] `qualityTier()` — linhas 1970–1970 — return=1 — chama: requestedQuality
- [x] `targetDpr()` — linhas 1971–1976 — if=2, return=3 — chama: qualityTier
- [x] `applyAdaptiveRenderSettings()` — linhas 1977–1986 — if=4, return=1 — chama: applyVisualQualityBudget, qualityTier, scheduleStableResize, targetDpr
- [x] `samplePerformance()` — linhas 1987–2006 — if=6, else=2, return=2 — chama: applyAdaptiveRenderSettings, lockStableSceneVisibility, requestedQuality, saveState, toast
- [x] `lockStableSceneVisibility()` — linhas 2007–2013 — if=4, for=3 — chama: qualityTier, visualQualityProfile
- [x] `freezeWorldFrustumCulling()` — linhas 2014–2029 — if=4, else=1, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `updateVisualLOD()` — linhas 2030–2036 — if=1, for=1 — chama: updateManagedOutlineVisibility, updateManagedVisualLODs
- [x] `pwaInstalled()` — linhas 2037–2037 — return=1 — chama: nenhuma função nomeada detectada
- [x] `activeVehicleCount()` — linhas 2038–2038 — return=1 — chama: nenhuma função nomeada detectada
- [x] `runtimeDiagnostics()` — linhas 2039–2042 — return=1 — chama: activeVehicleCount, auditPlayerMode, avatarFoundationDiagnostics, pwaInstalled, visualFoundationDiagnostics
- [x] `ensureTechnicalPanel()` — linhas 2043–2045 — if=1, return=2 — chama: toggleTechnicalPanel
- [x] `refreshTechnicalPanel()` — linhas 2046–2046 — if=1, return=1 — chama: ensureTechnicalPanel, qualityTier, runtimeDiagnostics
- [x] `toggleTechnicalPanel()` — linhas 2047–2047 — if=1 — chama: ensureTechnicalPanel, refreshTechnicalPanel
- [x] `initTechnicalPanel()` — linhas 2048–2051 — if=2 — chama: toggleTechnicalPanel

## `10-player-skills.js`

- [x] `playerScaleValue()` — linhas 2052–2054 — return=1 — chama: nenhuma função nomeada detectada
- [x] `skillReady()` — linhas 2055–2055 — if=1, return=2 — chama: toast
- [x] `recordAdvancedSkill()` — linhas 2056–2061 — for=1 — chama: advanceAdventure, saveState, trackDaily, updateAbilityUI
- [x] `collectCrystal()` — linhas 2062–2064 — if=1, return=2 — chama: addCoins, addXP, beep, checkActiveJob, evaluateMissions, saveState, toast, trackDaily, vibrate
- [x] `syncPlayerRootScale()` — linhas 2065–2074 — if=2, return=2 — chama: playerScaleValue
- [x] `setScaleMode()` — linhas 2075–2094 — if=10, else=2, for=2, return=7 — chama: beep, damageEnemy, recordAdvancedSkill, saveState, skillReady, spawnDust, toast, trackDaily, updateAbilityUI, vibrate
- [x] `toggleCrouch()` — linhas 2095–2104 — if=3, return=3 — chama: beep, playerDisplayName, recordAdvancedSkill, saveState, skillReady, toast, updateAbilityUI
- [x] `spinPlayer()` — linhas 2105–2111 — if=3, for=2, return=1 — chama: addXP, beep, collectCrystal, damageEnemy, recordAdvancedSkill, skillReady, toast
- [x] `updateAbilityUI()` — linhas 2112–2118 — if=2, for=2 — chama: nenhuma função nomeada detectada

## `11-render-materials-player-model.js`

- [x] `canvasTexture()` — linhas 2119–2155 — if=11, else=9, for=24, return=2 — chama: nenhuma função nomeada detectada
- [x] `professionalTexture()` — linhas 2156–2163 — if=1, else=1, return=1 — chama: canvasTexture, registerVisualAsset, updateVisualAsset
- [x] `initMaterials()` — linhas 2164–2210 — for=1 — chama: canvasTexture, professionalTexture, registerVisualAsset
- [x] `mat()` — linhas 2211–2219 — return=1 — chama: nenhuma função nomeada detectada
- [x] `geometryKey()` — linhas 2220–2220 — return=1 — chama: nenhuma função nomeada detectada
- [x] `sharedBoxGeometry()` — linhas 2221–2226 — if=1, else=1, return=1 — chama: geometryKey
- [x] `sharedCylinderGeometry()` — linhas 2227–2232 — if=1, else=1, return=1 — chama: geometryKey
- [x] `renderMat()` — linhas 2233–2239 — if=1, else=1, return=1 — chama: mat
- [x] `tintedBrickMaterial()` — linhas 2240–2244 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `texturedRoofMaterial()` — linhas 2245–2247 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `visualCacheHasValue()` — linhas 2248–2252 — if=2, for=1, return=3 — chama: nenhuma função nomeada detectada
- [x] `visualCacheOwnsGeometry()` — linhas 2253–2255 — return=1 — chama: visualCacheHasValue
- [x] `visualCacheOwnsMaterial()` — linhas 2256–2258 — return=1 — chama: visualCacheHasValue
- [x] `visualCacheOwnsTexture()` — linhas 2259–2259 — return=1 — chama: nenhuma função nomeada detectada
- [x] `disposeDetachedVisual()` — linhas 2260–2279 — if=6, for=1, return=1 — chama: visualCacheOwnsGeometry, visualCacheOwnsMaterial, visualCacheOwnsTexture
- [x] `addSoftHighlight()` — linhas 2280–2284 — return=1 — chama: sharedBoxGeometry
- [x] `box()` — linhas 2285–2289 — return=1 — chama: renderMat, sharedBoxGeometry
- [x] `stabilizeSurface()` — linhas 2290–2290 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `stableBox()` — linhas 2291–2291 — return=1 — chama: box, stabilizeSurface
- [x] `cylinder()` — linhas 2292–2296 — return=1 — chama: renderMat, sharedCylinderGeometry
- [x] `addGlow()` — linhas 2297–2300 — return=1 — chama: nenhuma função nomeada detectada
- [x] `addVoxelOutline()` — linhas 2301–2310 — if=3, return=2 — chama: nenhuma função nomeada detectada
- [x] `premiumBox()` — linhas 2311–2313 — return=1 — chama: addVoxelOutline, box
- [x] `premiumCylinder()` — linhas 2314–2316 — return=1 — chama: addVoxelOutline, cylinder
- [x] `makeWindow()` — linhas 2317–2320 — return=1 — chama: mat, premiumBox
- [x] `makePlanter()` — linhas 2321–2324 — for=1, return=1 — chama: premiumBox
- [x] `createPlayerModel()` — linhas 2325–2387 — if=3, for=2 — chama: addSoftHighlight, addVoxelOutline, box, createAvatarRigFoundation, mat, multiplayerNameTexture, playerDisplayName, refreshEquippedToolVisual, renderMat, sharedCylinderGeometry
- [x] `loadFaithfulAthosModel()` — linhas 2388–2393 — return=1 — chama: nenhuma função nomeada detectada
- [x] `clearAvatarLayer()` — linhas 2394–2401 — if=2, for=1, catch=1 — chama: disposeDetachedVisual
- [x] `avatarPartLayer()` — linhas 2402–2406 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `addUniformPatch()` — linhas 2407–2410 — return=1 — chama: signTexture
- [x] `addUniformLimb()` — linhas 2411–2413 — if=1 — chama: box
- [x] `uniformPalette()` — linhas 2414–2426 — return=1 — chama: nenhuma função nomeada detectada
- [x] `dressAnimatedAvatar()` — linhas 2427–2447 — if=4, for=2, return=2 — chama: avatarPartLayer, box, mat, uniformPalette
- [x] `applyAvatarCustomization()` — linhas 2448–2478 — if=19, else=12, for=1, return=1 — chama: addUniformPatch, box, clearAvatarLayer, dressAnimatedAvatar, effectiveAvatarUniform, mat
- [x] `registerCollider()` — linhas 2479–2479 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `registerPlatform()` — linhas 2480–2480 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `registerInteractable()` — linhas 2481–2481 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldPos()` — linhas 2482–2485 — if=1, return=2 — chama: nenhuma função nomeada detectada

## `12-world-resources-nature.js`

- [x] `isInteractionAvailable()` — linhas 2486–2492 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `ensureFlowerBatch()` — linhas 2493–2506 — if=2, return=1 — chama: renderMat, sharedBoxGeometry
- [x] `createTree()` — linhas 2507–2528 — if=2, return=1 — chama: box, collectResource, createManagedLOD, registerInteractable, renderMat
- [x] `createRock()` — linhas 2529–2534 — if=1, return=1 — chama: collectResource, createManagedLOD, registerInteractable, sharedBoxGeometry
- [x] `createGoldFoundry()` — linhas 2535–2542 — return=1 — chama: premiumBox, registerCollider, registerInteractable, renderMat, signTexture, texturedRoofMaterial
- [x] `createGoldMine()` — linhas 2543–2556 — for=2, return=1 — chama: collectResource, createLamp, createSignpost, premiumBox, registerInteractable, renderMat
- [x] `createVillageWell()` — linhas 2557–2565 — for=1, return=1 — chama: createSignpost, premiumBox, premiumCylinder, registerInteractable
- [x] `drawWaterFromWell()` — linhas 2566–2570 — if=3, return=2 — chama: addXP, advanceAdventure, playToolAnimation, saveState, toast, updateHUD
- [x] `createFlower()` — linhas 2571–2580 — if=2 — chama: ensureFlowerBatch
- [x] `createLamp()` — linhas 2581–2588 — return=1 — chama: addGlow, box, renderMat
- [x] `createSignpost()` — linhas 2589–2594 — return=1 — chama: box, signTexture
- [x] `createFenceLine()` — linhas 2595–2598 — for=1 — chama: box
- [x] `createRoad()` — linhas 2599–2616 — if=1, else=1, for=2 — chama: renderMat, stableBox
- [x] `createWater()` — linhas 2617–2617 — for=1 — chama: stableBox
- [x] `createLava()` — linhas 2618–2619 — return=1 — chama: mat, stableBox
- [x] `createFurniture()` — linhas 2620–2681 — if=16, for=15, return=1 — chama: box, cylinder, premiumBox, premiumCylinder, renderMat, shadeColor
- [x] `signTexture()` — linhas 2682–2712 — if=3, else=2, for=1, while=1, return=1 — chama: nenhuma função nomeada detectada

## `13-houses-npcs-vehicles-base.js`

- [x] `shadeColor()` — linhas 2713–2718 — return=1 — chama: nenhuma função nomeada detectada
- [x] `decorateHouseCommercial()` — linhas 2719–2735 — if=3, else=1, for=1 — chama: addVoxelOutline, box, makePlanter, premiumBox, shadeColor
- [x] `createHouse()` — linhas 2736–2762 — if=1, for=1, return=1 — chama: box, createFlower, createLamp, decorateHouseCommercial, makeWindow, registerCollider, registerInteractable, renderMat, shadeColor, signTexture, texturedRoofMaterial, tintedBrickMaterial
- [x] `addHouseInterior()` — linhas 2763–2810 — if=7, else=6, for=11 — chama: addGlow, createFurniture, exitHouse, premiumBox, premiumCylinder, registerActivity, registerInteractable
- [x] `registerActivity()` — linhas 2811–2814 — sem fluxo contado — chama: activityIcon, registerInteractable, useActivity
- [x] `activityIcon()` — linhas 2815–2816 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createNPC()` — linhas 2817–2835 — if=4, else=1, for=2, return=1 — chama: addVoxelOutline, box, iconTexture, registerInteractable, renderMat, shadeColor, talkToNPC
- [x] `createNpcMobility()` — linhas 2836–2849 — if=5, else=3, for=4, return=3 — chama: addVoxelOutline, nearestRoadProjection, premiumBox, premiumCylinder
- [x] `createEnemy()` — linhas 2850–2856 — if=2, else=2, return=1 — chama: box
- [x] `createCrystal()` — linhas 2857–2860 — sem fluxo contado — chama: addGlow, mat
- [x] `createChest()` — linhas 2861–2863 — if=1, return=1 — chama: box, openChest, registerInteractable
- [x] `createPlatform()` — linhas 2864–2864 — sem fluxo contado — chama: box, registerPlatform
- [x] `vehicleById()` — linhas 2865–2865 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentVehicleRef()` — linhas 2866–2866 — if=3, return=4 — chama: vehicleById
- [x] `applyVehicleAppearance()` — linhas 2867–2871 — if=2, return=1 — chama: applyServiceVehicleVisual
- [x] `persistParkedVehicle()` — linhas 2872–2874 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `createToyCar()` — linhas 2875–2887 — if=2, for=1, return=1 — chama: addVoxelOutline, box, cylinder, enterVehicle, registerInteractable, renderMat
- [x] `createWaypointMarker()` — linhas 2888–2893 — sem fluxo contado — chama: box, mat, updateWaypointMarker
- [x] `updateWaypointMarker()` — linhas 2894–2898 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `createAthleticsGym()` — linhas 2899–2921 — for=6 — chama: createLamp, openRaceCenter, premiumBox, registerInteractable, renderMat, signTexture
- [x] `createSizeChallenges()` — linhas 2922–2939 — if=3, return=3 — chama: addXP, box, registerInteractable, setFlag, toast
- [x] `createSkyDome()` — linhas 2940–2955 — for=1 — chama: renderMat, sharedBoxGeometry
- [x] `updateClouds()` — linhas 2956–2960 — if=3, for=1, return=1 — chama: nenhuma função nomeada detectada

## `14-world-district-decoration.js`

- [x] `createVoxelMushroom()` — linhas 2961–2969 — if=1, return=1 — chama: addVoxelOutline, box, renderMat, shadeColor
- [x] `iconTexture()` — linhas 2970–2972 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createChallengeCube()` — linhas 2973–2973 — return=1 — chama: box, iconTexture
- [x] `createPortalArch()` — linhas 2974–2979 — for=1, return=1 — chama: addGlow, box, mat
- [x] `createPlayground()` — linhas 2980–2983 — for=1, return=1 — chama: box
- [x] `createFountain()` — linhas 2984–2984 — return=1 — chama: addGlow, cylinder, mat
- [x] `createAwning()` — linhas 2985–2985 — for=1, return=1 — chama: box
- [x] `createStreetTree()` — linhas 2986–2993 — return=1 — chama: box, createManagedLOD, makePlanter, premiumBox
- [x] `createBackdropBuilding()` — linhas 2994–3004 — for=2, return=1 — chama: addVoxelOutline, box, createManagedLOD, renderMat, shadeColor
- [x] `createFloatingIsland()` — linhas 3005–3008 — for=1, return=1 — chama: addVoxelOutline, mat, premiumBox
- [x] `createCoinTrail()` — linhas 3009–3011 — sem fluxo contado — chama: mat
- [x] `createCommercialDistrict()` — linhas 3012–3020 — sem fluxo contado — chama: createBackdropBuilding, createCoinTrail, createFloatingIsland, createStreetTree
- [x] `createDistrictVisuals()` — linhas 3021–3052 — sem fluxo contado — chama: createAwning, createChallengeCube, createCommercialDistrict, createFountain, createPlayground, createPortalArch, createVoxelMushroom

## `15-transit-bus-metro.js`

- [x] `compactBusPath()` — linhas 3053–3055 — if=3, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `projectedBusPoint()` — linhas 3056–3056 — return=1 — chama: nearestRoadProjection
- [x] `offsetBusPath()` — linhas 3057–3064 — if=2, for=1, return=4 — chama: compactBusPath, pointOnRoad
- [x] `buildBusRoadPath()` — linhas 3065–3078 — if=4, for=2, return=3 — chama: buildRoutePoints, compactBusPath, nearestRoadProjection, offsetBusPath, projectedBusPoint
- [x] `busRoutePoints()` — linhas 3079–3079 — return=1 — chama: nenhuma função nomeada detectada
- [x] `busNextStop()` — linhas 3080–3080 — if=1, for=1, return=2 — chama: busRoutePoints
- [x] `nearestForwardBusSegment()` — linhas 3081–3085 — if=2, for=1, return=2 — chama: projectPointToSegment
- [x] `recoverBusRoute()` — linhas 3086–3089 — if=2, return=2 — chama: busRoutePoints, nearestForwardBusSegment, projectPointToPolyline, setBusState
- [x] `setBusState()` — linhas 3090–3092 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `setBusWaiting()` — linhas 3093–3095 — return=1 — chama: saveState
- [x] `clearBusWaiting()` — linhas 3096–3096 — if=1 — chama: saveState
- [x] `restoreBusWaiting()` — linhas 3097–3097 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `busStopRecord()` — linhas 3098–3098 — return=1 — chama: nenhuma função nomeada detectada
- [x] `safeBusExitPoint()` — linhas 3099–3104 — if=1, return=2 — chama: busStopRecord, groundHeightAt, positionBlockedForPlayer, safePointNear
- [x] `createMetroEntrance()` — linhas 3105–3113 — for=2, return=1 — chama: iconTexture, openMetroStation, premiumBox, registerInteractable
- [x] `ensureMetroOverlay()` — linhas 3114–3116 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `openMetroStation()` — linhas 3117–3121 — if=2, return=1 — chama: openModal, rideMetroTo, toast
- [x] `rideMetroTo()` — linhas 3122–3135 — if=9, return=3 — chama: advanceAdventure, auditPlayerMode, canEnterMobility, clearMovementInputs, closeModal, ensureMetroOverlay, rememberSafePlayerPosition, safePointNear, saveState, setFlag, toast, trackDaily (+2)
- [x] `ensureBusStop()` — linhas 3136–3139 — if=2, return=2 — chama: iconTexture, openBusStop, premiumBox, registerInteractable
- [x] `busSpawnIndex()` — linhas 3140–3142 — if=2, for=1, return=2 — chama: pointOnRoad, trafficActorList
- [x] `createBusModel()` — linhas 3143–3165 — if=2, for=9, return=1 — chama: buildBusRoadPath, busSpawnIndex, ensureBusStop, enterBus, premiumBox, premiumCylinder, registerInteractable, renderMat, signTexture
- [x] `createTransitWorld()` — linhas 3166–3166 — for=1 — chama: createBusModel, restoreBusWaiting, validateBusCoverage
- [x] `busAtStop()` — linhas 3167–3167 — return=1 — chama: nenhuma função nomeada detectada
- [x] `busEtaSeconds()` — linhas 3168–3168 — if=3, for=1, return=4 — chama: busAtStop, busRoutePoints
- [x] `validateBusCoverage()` — linhas 3169–3169 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `busDestinationsAfter()` — linhas 3170–3172 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `openBusArrivalOffer()` — linhas 3173–3182 — if=2, return=3 — chama: busAtStop, busDestinationsAfter, clearBusWaiting, closeModal, enterBus, openModal, setBusState, setBusWaiting, toast
- [x] `offerBusAtStop()` — linhas 3183–3189 — if=6, else=1, return=4 — chama: busAtStop, openBusArrivalOffer
- [x] `openBusStop()` — linhas 3190–3201 — return=1 — chama: busAtStop, busEtaSeconds, clearBusWaiting, closeModal, openBusArrivalOffer, openModal, setBusWaiting, toast
- [x] `ensureTransitPanel()` — linhas 3202–3204 — if=2, return=3 — chama: toast, updateTransitPanel
- [x] `updateTransitPanel()` — linhas 3205–3207 — if=1, return=1 — chama: busNextStop, ensureTransitPanel
- [x] `enterBus()` — linhas 3208–3218 — if=8, return=4 — chama: auditPlayerMode, busAtStop, canEnterMobility, clearBusWaiting, clearMovementInputs, closeModal, saveState, setBusState, toast, updateTransitPanel
- [x] `exitBusAtStop()` — linhas 3219–3227 — if=7, return=2 — chama: advanceAdventure, auditPlayerMode, busAtStop, busStopRecord, rememberSafePlayerPosition, safeBusExitPoint, saveState, setBusState, setFlag, toast, trackDaily, updateContext (+1)
- [x] `updateTransitWorld()` — linhas 3228–3273 — if=31, else=11, for=2 — chama: busRoutePoints, exitBusAtStop, offerBusAtStop, pointOnRoad, recoverBusRoute, setBusState, trafficSpeedFactor, updateTransitPanel

## `16-emergency-services.js`

- [x] `decorateCityServices()` — linhas 3274–3294 — if=1, for=5 — chama: iconTexture, premiumBox, premiumCylinder
- [x] `serviceKindForJob()` — linhas 3295–3295 — return=1 — chama: nenhuma função nomeada detectada
- [x] `serviceVehiclePools()` — linhas 3296–3296 — if=3, return=4 — chama: nenhuma função nomeada detectada
- [x] `serviceVehicleById()` — linhas 3297–3297 — return=1 — chama: serviceVehiclePools
- [x] `currentServiceMissionJob()` — linhas 3298–3298 — return=1 — chama: activeCoopServiceJob
- [x] `serviceVehicleAvailable()` — linhas 3299–3299 — if=1, return=2 — chama: currentServiceMissionJob
- [x] `serviceVehicleAppearance()` — linhas 3300–3300 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `safeServiceDepot()` — linhas 3301–3301 — if=2, for=1, return=1 — chama: nearestRoadProjection, trafficActorList
- [x] `registerServiceVehicle()` — linhas 3302–3305 — return=1 — chama: currentServiceMissionJob, enterServiceVehicle, registerInteractable, safeServiceDepot, serviceVehicleAppearance, serviceVehicleAvailable
- [x] `enterServiceVehicle()` — linhas 3306–3308 — if=3, return=4 — chama: currentServiceMissionJob, enterVehicle, serviceKindForJob, serviceMissionVehicle, serviceVehicleAvailable, toast
- [x] `serviceMissionVehicle()` — linhas 3309–3309 — return=1 — chama: currentServiceMissionJob, serviceVehicleById
- [x] `serviceVehicleMapLocation()` — linhas 3310–3310 — if=1, return=2 — chama: currentServiceMissionJob, serviceKindForJob, serviceMissionVehicle
- [x] `reserveMissionServiceVehicle()` — linhas 3311–3313 — if=4, return=3 — chama: buildRoutePoints, currentServiceMissionJob, serviceKindForJob, serviceMissionVehicle, serviceVehicleAvailable, serviceVehiclePools, setMissionState, toast, updateNavigation, updateWaypointMarker
- [x] `releaseMissionServiceVehicle()` — linhas 3314–3314 — if=2 — chama: serviceMissionVehicle
- [x] `isDrivingServiceVehicle()` — linhas 3315–3315 — return=1 — chama: nenhuma função nomeada detectada
- [x] `onServiceVehicleBoarded()` — linhas 3316–3316 — if=3, else=1, return=1 — chama: currentServiceMissionJob, focusActiveJob, onCoopServiceVehicleBoarded, saveState, serviceKindForJob, setMissionState
- [x] `onServiceVehicleExited()` — linhas 3317–3317 — if=1, return=1 — chama: currentServiceMissionJob, saveState
- [x] `returnServiceVehicleHome()` — linhas 3318–3318 — if=2, return=1 — chama: moveServiceVehicle
- [x] `createFireIncidentSite()` — linhas 3319–3322 — for=2, return=1 — chama: helpExtinguishFire, mat, registerInteractable, renderMat
- [x] `createFireTruck()` — linhas 3323–3328 — for=3, return=1 — chama: premiumBox, premiumCylinder, registerServiceVehicle, renderMat
- [x] `createFireServiceWorld()` — linhas 3329–3329 — sem fluxo contado — chama: createFireTruck
- [x] `activateFireIncident()` — linhas 3330–3330 — if=2, return=3 — chama: saveState, toast
- [x] `ensureActiveFire()` — linhas 3331–3331 — return=1 — chama: activateFireIncident
- [x] `helpExtinguishFire()` — linhas 3332–3332 — if=7, for=1, return=5 — chama: extinguishFireIncident, setMissionState, spawnDust, toast
- [x] `extinguishFireIncident()` — linhas 3333–3333 — if=5, for=1, return=1 — chama: addXP, completeActiveJob, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `serviceVehicleRoute()` — linhas 3334–3334 — if=1, return=1 — chama: buildRoutePoints
- [x] `moveServiceVehicle()` — linhas 3335–3336 — if=5, for=1, return=5 — chama: serviceVehicleRoute, snapTrafficToRoad, trafficSpeedFactor
- [x] `updateFireService()` — linhas 3337–3348 — if=12, else=1, for=2, return=1 — chama: activateFireIncident, extinguishFireIncident, moveServiceVehicle, returnServiceVehicleHome, spawnDust
- [x] `createPoliceCar()` — linhas 3349–3357 — if=1, for=1, return=1 — chama: addVoxelOutline, iconTexture, mat, premiumBox, premiumCylinder, registerServiceVehicle, renderMat
- [x] `createAmbulance()` — linhas 3358–3364 — for=1, return=1 — chama: premiumBox, premiumCylinder, registerServiceVehicle, renderMat
- [x] `createPoliceSystem()` — linhas 3365–3369 — sem fluxo contado — chama: createAmbulance, createPoliceCar
- [x] `movePoliceToward()` — linhas 3370–3373 — if=3, for=1, return=3 — chama: snapTrafficToRoad, trafficSpeedFactor
- [x] `updatePolicePatrol()` — linhas 3374–3376 — if=1 — chama: movePoliceToward
- [x] `updateSafetyPanel()` — linhas 3377–3379 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `startPoliceAlert()` — linhas 3380–3384 — if=2, return=3 — chama: saveState, toast, updateSafetyPanel
- [x] `finishSafetyStop()` — linhas 3385–3388 — if=2, return=1 — chama: clearMovementInputs, exitVehicle, groundHeightAt, openSafetyLesson, saveState, updateSafetyPanel
- [x] `openSafetyLesson()` — linhas 3389–3398 — if=1 — chama: addReputation, addXP, awardMedal, closeModal, openModal, saveState, toast
- [x] `updatePoliceSystem()` — linhas 3399–3410 — if=14, else=3, for=2 — chama: finishSafetyStop, movePoliceToward, npcSpeech, returnServiceVehicleHome, startPoliceAlert, updatePolicePatrol, updateSafetyPanel
- [x] `moveIncidentResponder()` — linhas 3411–3416 — if=6, for=1, return=5 — chama: buildRoutePoints, snapTrafficToRoad, trafficSpeedFactor
- [x] `incidentServiceLabel()` — linhas 3417–3417 — return=1 — chama: nenhuma função nomeada detectada
- [x] `lockIncidentActor()` — linhas 3418–3418 — if=3, return=1 — chama: setBusState
- [x] `separateIncidentActors()` — linhas 3419–3419 — if=3, return=2 — chama: snapTrafficToRoad
- [x] `createIncidentVisual()` — linhas 3420–3420 — if=1, for=2, return=1 — chama: premiumBox, premiumCylinder, renderMat
- [x] `createTrafficIncidentAt()` — linhas 3421–3425 — if=3, for=1, return=2 — chama: assistTrafficIncident, createIncidentVisual, dispatchIncidentResponders, lockIncidentActor, nearestRoadProjection, registerInteractable, saveState, separateIncidentActors, toast
- [x] `createTrafficIncident()` — linhas 3426–3426 — if=1, return=2 — chama: createTrafficIncidentAt
- [x] `ensureActiveTrafficIncident()` — linhas 3427–3427 — if=2, return=3 — chama: createTrafficIncidentAt, nearestRoadProjection
- [x] `dispatchIncidentResponder()` — linhas 3428–3431 — if=2, return=3 — chama: reserveMissionServiceVehicle, serviceKindForJob, serviceVehicleAvailable, serviceVehiclePools
- [x] `dispatchIncidentResponders()` — linhas 3432–3432 — sem fluxo contado — chama: dispatchIncidentResponder
- [x] `assistTrafficIncident()` — linhas 3433–3435 — if=5, for=1, return=6 — chama: saveState, serviceKindForJob, setMissionState, spawnDust, toast
- [x] `markPlayerIncidentArrival()` — linhas 3436–3436 — if=3, return=3 — chama: isDrivingServiceVehicle, saveState, serviceKindForJob, setMissionState, toast, updateNavigation, updateWaypointMarker
- [x] `releaseIncidentActorStates()` — linhas 3437–3437 — if=2, for=1 — chama: setBusState
- [x] `resolveTrafficIncident()` — linhas 3438–3442 — if=5, for=3, return=1 — chama: completeActiveJob, releaseIncidentActorStates, saveState, serviceKindForJob, toast
- [x] `updateTrafficIncidents()` — linhas 3443–3455 — if=13, else=1, for=6, return=3 — chama: createTrafficIncident, markPlayerIncidentArrival, moveIncidentResponder, resolveTrafficIncident, returnServiceVehicleHome, trafficActorList
- [x] `openTransitGuide()` — linhas 3456–3458 — sem fluxo contado — chama: openModal, setWaypoint

## `17-adventures-learning-world.js`

- [x] `createRoyalCastle()` — linhas 3459–3484 — for=10, return=1 — chama: addGlow, createCastleChallengeTokens, createSignpost, exitHouse, mat, premiumBox, premiumCylinder, registerInteractable, renderMat, toast
- [x] `createCastleChallengeTokens()` — linhas 3485–3487 — return=1 — chama: mat
- [x] `openAdventureHub()` — linhas 3488–3490 — sem fluxo contado — chama: openModal, startAdventure
- [x] `startAdventure()` — linhas 3491–3493 — if=3, for=1, return=3 — chama: closeModal, saveState, setWaypoint, toast
- [x] `restoreActiveAdventure()` — linhas 3494–3499 — if=2, for=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `advanceAdventure()` — linhas 3500–3502 — if=3, else=1, return=2 — chama: beep, finishAdventure, saveState
- [x] `finishAdventure()` — linhas 3503–3505 — if=4, else=1, for=1, return=1 — chama: addCoins, addReputation, addXP, awardMedal, saveState, setFlag, toast
- [x] `updateAdventure()` — linhas 3506–3508 — if=6, for=1, return=2 — chama: advanceAdventure, finishAdventure
- [x] `createLearningStation()` — linhas 3509–3511 — return=1 — chama: iconTexture, mat, openEducationHub, premiumBox, registerInteractable
- [x] `createLearningPlaza()` — linhas 3512–3518 — sem fluxo contado — chama: createLearningStation, createSignpost

## `18-water-fishing-boats.js`

- [x] `rectOverlap()` — linhas 3519–3519 — return=1 — chama: nenhuma função nomeada detectada
- [x] `insideWater()` — linhas 3520–3520 — return=1 — chama: nenhuma função nomeada detectada
- [x] `waterAt()` — linhas 3521–3521 — return=1 — chama: insideWater
- [x] `isInsideLakeNavigable()` — linhas 3522–3522 — return=1 — chama: nenhuma função nomeada detectada
- [x] `isNearFishingArea()` — linhas 3523–3523 — return=1 — chama: nenhuma função nomeada detectada
- [x] `resolveWaterWalking()` — linhas 3524–3526 — if=3, return=2 — chama: groundHeightAt, toast, waterAt
- [x] `distanceToBoatDock()` — linhas 3527–3527 — return=1 — chama: nenhuma função nomeada detectada
- [x] `validBoatExit()` — linhas 3528–3528 — return=1 — chama: distanceToBoatDock
- [x] `safeBoatExitPoint()` — linhas 3529–3530 — return=1 — chama: nenhuma função nomeada detectada
- [x] `ensureFishingVisual()` — linhas 3531–3544 — if=1, return=2 — chama: renderMat
- [x] `setFishingLine()` — linhas 3545–3545 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `fishingCastTarget()` — linhas 3546–3552 — if=2, else=1, return=1 — chama: isInsideLakeNavigable
- [x] `beginFishingVisual()` — linhas 3553–3566 — if=2, return=1 — chama: ensureFishingVisual, fishingCastTarget, setFishingLine
- [x] `castFishingVisual()` — linhas 3567–3567 — if=1, return=1 — chama: beep, ensureFishingVisual, fishingCastTarget
- [x] `hookFishingVisual()` — linhas 3568–3568 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `pullFishingVisual()` — linhas 3569–3569 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `restoreFishingCamera()` — linhas 3570–3573 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `stopFishingVisual()` — linhas 3574–3580 — if=4, else=1, return=2 — chama: restoreFishingCamera, setFishingUiActive
- [x] `clearFishingTimers()` — linhas 3581–3581 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `setFishingUiActive()` — linhas 3582–3586 — if=1 — chama: scheduleStableResize, syncMobilePanels
- [x] `cancelFishingSession()` — linhas 3587–3587 — sem fluxo contado — chama: clearFishingTimers, stopFishingVisual
- [x] `ensureFishingModalStyle()` — linhas 3588–3598 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `updateFishingVisual()` — linhas 3599–3609 — if=11, else=6, return=1 — chama: setFishingLine, stopFishingVisual
- [x] `createShoreFisher()` — linhas 3610–3615 — return=1 — chama: createNPC, premiumCylinder, renderMat
- [x] `createShoreFishingLife()` — linhas 3616–3620 — if=1, return=1 — chama: createShoreFisher
- [x] `updateShoreFishers()` — linhas 3621–3624 — if=3, for=1 — chama: nenhuma função nomeada detectada
- [x] `createBoatModel()` — linhas 3625–3629 — sem fluxo contado — chama: premiumBox, registerInteractable, renderMat
- [x] `ensureBoatPanel()` — linhas 3630–3632 — if=1, return=2 — chama: exitBoat, startFishing
- [x] `updateBoatPanel()` — linhas 3633–3642 — if=8, return=6 — chama: auditPlayerMode, boardNpcPassenger, canEnterMobility, ensureBoatPanel, exitVehicle, nearestRideCompanion, saveState, toast, updateVehicleControlsUI
- [x] `enterBoatAsPassenger()` — linhas 3643–3650 — if=4, return=4 — chama: auditPlayerMode, canEnterMobility, exitVehicle, saveState, toast, updateBoatPanel, updateVehicleControlsUI
- [x] `exitBoat()` — linhas 3651–3658 — if=7, else=1, return=3 — chama: auditPlayerMode, groundHeightAt, releaseNpcPassenger, rememberSafePlayerPosition, safeBoatExitPoint, saveState, toast, updateBoatPanel, updateVehicleControlsUI, validBoatExit
- [x] `updateBoatPhysics()` — linhas 3659–3665 — if=6, else=1, return=2 — chama: exitBoat, mobilityThrottleIntent, toast, updateMobilityControlLabels
- [x] `constrainBoat()` — linhas 3666–3666 — if=3, return=1 — chama: isInsideLakeNavigable
- [x] `weightedFish()` — linhas 3667–3667 — if=1, for=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `startFishing()` — linhas 3668–3676 — if=14, return=11 — chama: addCoins, addXP, beep, beginFishingVisual, cancelFishingSession, castFishingVisual, clearFishingTimers, ensureFishingModalStyle, hookFishingVisual, isNearFishingArea, openModal, pullFishingVisual (+6)

## `19-campfire-hunting-house-extensions.js`

- [x] `campfireAllowed()` — linhas 3677–3677 — if=4, return=5 — chama: rectOverlap, waterAt
- [x] `spawnCampfire()` — linhas 3678–3680 — if=1, for=1, return=1 — chama: mat, openCampfire, premiumCylinder, registerInteractable
- [x] `nearestActiveCampfire()` — linhas 3681–3682 — if=3, return=4 — chama: campfireAllowed, confirmModal, saveState, spawnCampfire, toast
- [x] `finishCampfireCooking()` — linhas 3683–3683 — if=1, return=1 — chama: beep, saveState, toast
- [x] `openCampfire()` — linhas 3684–3686 — if=4, return=4 — chama: closeModal, confirmModal, finishCampfireCooking, openModal, saveState, toast, updateHUD
- [x] `openNearestCampfire()` — linhas 3687–3687 — if=1, else=1 — chama: nearestActiveCampfire, openCampfire, toast
- [x] `openCampfireZone()` — linhas 3688–3688 — if=1, else=1 — chama: closeModal, nearestActiveCampfire, openCampfire, openModal
- [x] `createCampfireZone()` — linhas 3689–3689 — for=1 — chama: createSignpost, premiumBox, registerInteractable
- [x] `createForestAnimal()` — linhas 3690–3690 — if=1, for=2, return=1 — chama: premiumBox
- [x] `startHunting()` — linhas 3691–3691 — if=5, else=1, return=2 — chama: addXP, closeModal, openModal, saveState, toast
- [x] `createHuntingArea()` — linhas 3692–3692 — for=1 — chama: createForestAnimal, createSignpost, premiumBox, registerInteractable, startHunting
- [x] `nearestOwnedHouseForExtension()` — linhas 3693–3693 — return=1 — chama: nenhuma função nomeada detectada
- [x] `extensionPlacement()` — linhas 3694–3694 — return=1 — chama: nenhuma função nomeada detectada
- [x] `extensionValid()` — linhas 3695–3706 — if=6, for=1, return=6 — chama: rectOverlap
- [x] `furnitureCatalogForRoom()` — linhas 3707–3707 — return=1 — chama: nenhuma função nomeada detectada
- [x] `furnitureSpec()` — linhas 3708–3708 — return=1 — chama: furnitureCatalogForRoom
- [x] `furnitureForExtension()` — linhas 3709–3709 — return=1 — chama: nenhuma função nomeada detectada
- [x] `furnitureFootprint()` — linhas 3710–3710 — return=1 — chama: furnitureSpec
- [x] `furniturePlacementValid()` — linhas 3711–3711 — if=2, return=3 — chama: furnitureFootprint, furnitureForExtension, rectOverlap
- [x] `disposeFurnitureGroup()` — linhas 3712–3712 — if=1, return=1 — chama: disposeDetachedVisual
- [x] `clearFurniturePreview()` — linhas 3713–3713 — if=1 — chama: disposeFurnitureGroup
- [x] `clearExtensionPreview()` — linhas 3714–3714 — if=1 — chama: clearFurniturePreview, disposeDetachedVisual
- [x] `renderExtensionPreview()` — linhas 3715–3715 — if=2, for=1, return=1 — chama: disposeDetachedVisual, extensionValid
- [x] `createFurnitureModel()` — linhas 3716–3739 — if=23, else=21, for=14, return=3 — chama: furnitureSpec, mat, premiumBox, shadeColor
- [x] `renderExtensionFurniture()` — linhas 3740–3740 — if=3, for=1, return=1 — chama: createFurnitureModel, disposeFurnitureGroup, furnitureForExtension
- [x] `renderFurniturePreview()` — linhas 3741–3741 — if=1, return=2 — chama: clearFurniturePreview, createFurnitureModel, furniturePlacementValid
- [x] `nextFurnitureSlot()` — linhas 3742–3742 — if=1, for=1, return=2 — chama: furniturePlacementValid
- [x] `openFurniturePlacement()` — linhas 3743–3744 — if=9, else=1, return=6 — chama: addCoins, clearFurniturePreview, closeModal, confirmModal, furniturePlacementValid, furnitureSpec, nextFurnitureSlot, openFurnitureManager, openModal, renderExtensionFurniture, renderFurniturePreview, saveState (+1)
- [x] `openFurnitureManager()` — linhas 3745–3745 — if=1, return=2 — chama: closeModal, furnitureCatalogForRoom, furnitureForExtension, furnitureSpec, openFurniturePlacement, openModal, saveState, toast
- [x] `spawnHouseExtension()` — linhas 3746–3746 — if=1, return=1 — chama: openFurnitureManager, premiumBox, registerInteractable, registerPlatform, renderExtensionFurniture, shadeColor
- [x] `resourcesEnough()` — linhas 3747–3747 — return=1 — chama: nenhuma função nomeada detectada
- [x] `costText()` — linhas 3748–3748 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openHouseExtensionPlanner()` — linhas 3749–3749 — if=3, for=1, return=3 — chama: clearExtensionPreview, closeModal, costText, extensionPlacement, extensionValid, nearestOwnedHouseForExtension, openModal, playerDisplayName, renderExtensionPreview, resourcesEnough, saveState, spawnHouseExtension (+1)
- [x] `openHouseExtensionMenu()` — linhas 3750–3750 — sem fluxo contado — chama: closeModal, costText, openHouseExtensionPlanner, openModal
- [x] `createLakeExpansion()` — linhas 3751–3755 — for=3 — chama: createBoatModel, createShoreFishingLife, createSignpost, premiumBox, premiumCylinder, registerInteractable, registerPlatform, startFishing
- [x] `restoreLifeExpansion()` — linhas 3756–3756 — if=2, for=2 — chama: finishCampfireCooking, spawnCampfire, spawnHouseExtension
- [x] `updateLifeActivities()` — linhas 3757–3760 — if=8, for=2, return=1 — chama: finishCampfireCooking, saveState, updateShoreFishers

## `20-world-build-cloud-houses.js`

- [x] `createLifeExpansionWorld()` — linhas 3761–3761 — sem fluxo contado — chama: applyCloudWorldObjects, createCampfireZone, createHuntingArea, createLakeExpansion, restoreLifeExpansion
- [x] `buildWorld()` — linhas 3762–3822 — if=3, for=9 — chama: addHouseInterior, box, createAthleticsGym, createChest, createCooperativeMissionWorld, createCrystal, createDistrictVisuals, createEnemy, createFenceLine, createFireServiceWorld, createFlower, createGoldFoundry (+30)
- [x] `collectResource()` — linhas 3823–3832 — if=3, return=3 — chama: addXP, advanceAdventure, beep, checkActiveJob, evaluateMissions, playToolAnimation, saveState, toast, trackDaily, vibrate
- [x] `openChest()` — linhas 3833–3839 — if=2, return=1 — chama: addCoins, addXP, evaluateMissions, saveState, setFlag, toast
- [x] `cloudHouseRecord()` — linhas 3840–3840 — return=1 — chama: nenhuma função nomeada detectada
- [x] `isMyCloudHouse()` — linhas 3841–3841 — return=1 — chama: nenhuma função nomeada detectada
- [x] `reconcileCloudHouses()` — linhas 3842–3871 — if=15, else=1, for=1, return=11 — chama: addCoins, awardMedal, closeModal, cloudHouseRecord, confirmModal, enterHouse, isMyCloudHouse, openModal, publicPlayerName, saveState, setFlag, startRace (+1)
- [x] `enterHouse()` — linhas 3872–3883 — if=5, else=1, for=6, return=2 — chama: auditPlayerMode, canEnterMobility, clearMovementInputs, rememberSafePlayerPosition, safePointNear, savePlayerPosition, setFlag, toast, updateCamera, updateContext
- [x] `exitHouse()` — linhas 3884–3895 — if=4, else=1, for=6, return=2 — chama: auditPlayerMode, clearMovementInputs, rememberSafePlayerPosition, safePointNear, savePlayerPosition, toast
- [x] `openHomeChest()` — linhas 3896–3903 — if=2, return=2 — chama: openModal, playerDisplayName, saveState, toast

## `21-interactions-shop-social-races.js`

- [x] `useActivity()` — linhas 3904–3931 — if=19, else=15, return=2 — chama: addXP, closeModal, openAvatarStudio, openEducationHub, openFireStationDesk, openHomeChest, openModal, openSafetyLesson, openShop, openTeacherJobLesson, openWorkshop, playerDisplayName (+5)
- [x] `openShop()` — linhas 3932–3937 — if=1, return=1 — chama: addCoins, addXP, closeModal, openModal, saveState, toast
- [x] `openWorkshop()` — linhas 3938–3946 — if=3, return=3 — chama: addCoins, addXP, closeModal, openModal, saveState, toast
- [x] `friendshipTier()` — linhas 3947–3947 — return=1 — chama: nenhuma função nomeada detectada
- [x] `changeFriendship()` — linhas 3948–3952 — if=2 — chama: addReputation, addXP, evaluateMissions, saveState, setFlag, toast
- [x] `talkToNPC()` — linhas 3953–4000 — if=25, else=18, return=1 — chama: addCoins, addReputation, changeFriendship, closeModal, completeActiveJob, friendshipTier, openHouseChallenge, openJobCenter, openModal, saveState, setFlag, startRace (+4)
- [x] `openHouseChallenge()` — linhas 4001–4007 — if=1, return=1 — chama: closeModal, openModal, startRace, toast
- [x] `openRaceCenter()` — linhas 4008–4013 — sem fluxo contado — chama: closeModal, openModal, startRace
- [x] `createRaceOpponent()` — linhas 4014–4016 — return=1 — chama: box
- [x] `clearRaceObjects()` — linhas 4017–4021 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `spawnRaceCoins()` — linhas 4022–4027 — for=1 — chama: cylinder
- [x] `startRace()` — linhas 4028–4038 — if=4, return=2 — chama: createRaceOpponent, exitHouse, saveState, spawnRaceCoins, toast, updateWaypointMarker
- [x] `finishRace()` — linhas 4039–4048 — if=4, else=1, return=1 — chama: addCoins, addReputation, addXP, awardMedal, clearRaceObjects, evaluateMissions, saveState, setFlag, toast, trackDaily, updateWaypointMarker
- [x] `updateRace()` — linhas 4049–4079 — if=12, else=4, for=1, return=2 — chama: beep, finishRace

## `22-careers-jobs-uniforms.js`

- [x] `setMissionState()` — linhas 4080–4080 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `missionVehicleName()` — linhas 4081–4081 — return=1 — chama: serviceKindForJob, serviceMissionVehicle
- [x] `missionInstructionSteps()` — linhas 4082–4082 — if=7, return=8 — chama: effectiveAvatarUniform, missionVehicleName, serviceKindForJob
- [x] `missionBriefingMarkup()` — linhas 4083–4083 — return=1 — chama: activeJobProgress, missionInstructionSteps, missionVehicleName
- [x] `equipJobUniform()` — linhas 4084–4088 — if=1, return=1 — chama: applyAvatarCustomization, saveState
- [x] `focusActiveJob()` — linhas 4089–4107 — if=19, else=8, return=8 — chama: applyAvatarCustomization, buildRoutePoints, closeModal, confirmModal, ensureActiveFire, ensureActiveTrafficIncident, exitHouse, releaseMissionServiceVehicle, reserveMissionServiceVehicle, saveState, serviceKindForJob, setMissionState (+5)
- [x] `activeJobProgress()` — linhas 4108–4118 — if=12, return=13 — chama: serviceKindForJob
- [x] `openJobCenter()` — linhas 4119–4127 — sem fluxo contado — chama: activeJobProgress, equipJobUniform, missionBriefingMarkup, openModal, startJob, toast
- [x] `startJob()` — linhas 4128–4136 — if=8, else=3, return=2 — chama: ensureActiveFire, ensureActiveTrafficIncident, equipJobUniform, exitHouse, focusActiveJob, reserveMissionServiceVehicle, saveState, serviceKindForJob, setMissionState, toast, updateMissionHUD
- [x] `completeActiveJob()` — linhas 4137–4150 — if=9, return=3 — chama: applyAvatarCustomization, evaluateMissions, releaseMissionServiceVehicle, saveState, setFlag, setMissionState, toast, updateHUD, updateMissionHUD, updateWaypointMarker
- [x] `checkActiveJob()` — linhas 4151–4158 — if=4, else=2, return=1 — chama: completeActiveJob
- [x] `restoreActiveJobRuntime()` — linhas 4159–4161 — if=6, return=1 — chama: applyAvatarCustomization, ensureActiveFire, ensureActiveTrafficIncident, reserveMissionServiceVehicle, serviceKindForJob, updateMissionHUD
- [x] `updateCareerMissions()` — linhas 4162–4173 — if=18, else=9, return=2 — chama: activeJobProgress, beep, checkActiveJob, completeActiveJob, ensureActiveTrafficIncident, isDrivingServiceVehicle, reserveMissionServiceVehicle, saveState, serviceKindForJob, setMissionState, setWaypoint, toast (+2)
- [x] `openTeacherJobLesson()` — linhas 4174–4177 — if=1, return=1 — chama: addXP, closeModal, completeActiveJob, openModal, toast
- [x] `openFireStationDesk()` — linhas 4178–4189 — if=6, return=2 — chama: buildRoutePoints, closeModal, ensureActiveFire, equipJobUniform, exitHouse, focusActiveJob, openModal, startJob, toast, updateWaypointMarker
- [x] `startDeliveryJob()` — linhas 4190–4194 — if=1, return=1 — chama: saveState, toast

## `23-vehicle-effects-driving.js`

- [x] `clearServiceVehicleVisual()` — linhas 4195–4198 — if=2 — chama: disposeDetachedVisual
- [x] `serviceVehicleIcon()` — linhas 4199–4199 — return=1 — chama: nenhuma função nomeada detectada
- [x] `applyServiceVehicleVisual()` — linhas 4200–4212 — if=5, else=2, for=1, return=3 — chama: addVoxelOutline, box, clearServiceVehicleVisual, mat, signTexture
- [x] `spawnDust()` — linhas 4213–4218 — if=1 — chama: nenhuma função nomeada detectada
- [x] `updateFX()` — linhas 4219–4228 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `startEngineSound()` — linhas 4229–4239 — if=2, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `stopEngineSound()` — linhas 4240–4244 — if=1, catch=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `updateVehicleFX()` — linhas 4245–4269 — if=12, else=2, for=1, catch=1, return=2 — chama: beep, serviceVehicleIcon, spawnDust, sprintRequested, startEngineSound, stopEngineSound
- [x] `mobilityDriverActive()` — linhas 4270–4270 — return=1 — chama: nenhuma função nomeada detectada
- [x] `updateMobilityControlLabels()` — linhas 4271–4278 — if=13, else=1 — chama: mobilityDriverActive, sprintRequested
- [x] `updateVehicleControlsUI()` — linhas 4279–4286 — if=3 — chama: mobilityDriverActive, playerDisplayName, updateMobilityControlLabels
- [x] `vehicleHorn()` — linhas 4287–4289 — if=4, return=2 — chama: beep, mobilityDriverActive, vibrate
- [x] `enterVehicle()` — linhas 4290–4297 — if=6, return=2 — chama: applyVehicleAppearance, boardNpcPassenger, buildRoutePoints, canEnterMobility, clearMovementInputs, groundHeightAt, nearestRideCompanion, onServiceVehicleBoarded, saveState, serviceVehicleIcon, setFlag, setMissionState (+7)
- [x] `enterVehicleAsPassenger()` — linhas 4298–4306 — if=6, return=4 — chama: auditPlayerMode, canEnterMobility, clearMovementInputs, exitBoat, saveState, toast, updateAbilityUI, updateRunUI, updateVehicleControlsUI
- [x] `exitVehicle()` — linhas 4307–4315 — if=8, else=1, return=2 — chama: auditPlayerMode, clearMovementInputs, clearServiceVehicleVisual, currentVehicleRef, groundHeightAt, onServiceVehicleExited, persistParkedVehicle, releaseNpcPassenger, rememberSafePlayerPosition, safeVehicleExitPoint, saveState, stopEngineSound (+5)
- [x] `repairBridge()` — linhas 4316–4330 — if=2, return=2 — chama: addReputation, addXP, saveState, setFlag, toast

## `24-construction-system.js`

- [x] `buildCostText()` — linhas 4331–4331 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentBuildOwnerIds()` — linhas 4332–4332 — return=1 — chama: nenhuma função nomeada detectada
- [x] `buildOwnedByPlayer()` — linhas 4333–4333 — return=1 — chama: currentBuildOwnerIds
- [x] `buildFootprint()` — linhas 4334–4337 — return=1 — chama: nenhuma função nomeada detectada
- [x] `buildPlacementCandidate()` — linhas 4338–4343 — if=1, return=2 — chama: canBuildAt, groundHeightAt
- [x] `canBuildAt()` — linhas 4344–4354 — if=7, return=9 — chama: buildFootprint, groundHeightAt, rectOverlap, waterAt
- [x] `createBuildPreviewMesh()` — linhas 4355–4366 — if=7, else=6, for=3, return=3 — chama: sharedBoxGeometry
- [x] `disposeBuildPreview()` — linhas 4367–4369 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `ensureBuildPanel()` — linhas 4370–4374 — if=1, return=2 — chama: endBuildMode
- [x] `updateBuildPanel()` — linhas 4375–4379 — if=1, return=1 — chama: buildCostText, ensureBuildPanel, resourcesEnough
- [x] `updateBuildPreview()` — linhas 4380–4385 — if=5, return=2 — chama: buildPlacementCandidate, createBuildPreviewMesh, disposeBuildPreview, updateBuildPanel
- [x] `beginBuildMode()` — linhas 4386–4389 — if=2, return=3 — chama: disposeBuildPreview, ensureBuildPanel, toast, updateBuildPreview, updateContext, updateVehicleControlsUI
- [x] `endBuildMode()` — linhas 4390–4392 — if=3, return=2 — chama: disposeBuildPreview, toast, updateContext, updateVehicleControlsUI
- [x] `rotateBuildPreview()` — linhas 4393–4393 — if=1, return=2 — chama: updateBuildPreview, vibrate
- [x] `openBuildMenu()` — linhas 4394–4400 — if=3, return=3 — chama: beginBuildMode, buildCostText, closeModal, openHouseExtensionMenu, openModal, toast
- [x] `placeBuild()` — linhas 4401–4411 — if=5, for=2, catch=1, return=6, throw=1 — chama: addXP, buildCostText, checkActiveJob, evaluateMissions, mergeBuildCollections, normalizeBuildRecord, normalizeBuildTombstones, resourcesEnough, saveState, spawnBuild, syncCloudProgress, toast (+2)
- [x] `spawnBuild()` — linhas 4412–4424 — if=9, else=7, for=2, return=4 — chama: addGlow, box, buildRecordSignature, groundHeightAt, normalizeBuildRecord, premiumBox, registerCollider, registerPlatform
- [x] `buildRecordSignature()` — linhas 4425–4425 — return=1 — chama: nenhuma função nomeada detectada
- [x] `removeWorldBuildRecord()` — linhas 4426–4428 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `reconcileWorldBuilds()` — linhas 4429–4440 — if=5, for=2, return=5 — chama: applyBuildTombstones, buildOwnedByPlayer, buildRecordSignature, confirmModal, mergeBuildTombstones, normalizeBuildTombstones, removeWorldBuildRecord, saveState, spawnBuild, syncCloudProgress, toast

## `25-render-init-resize-position-collision.js`

- [x] `initThree()` — linhas 4441–4449 — if=1, for=1, return=2 — chama: applyAdaptiveRenderSettings, applyAvatarCustomization, applyQuality, buildWorld, createPlayerModel, freezeWorldFrustumCulling, initLocalMultiplayer, initMaterials, lockStableSceneVisibility, openModal, qualityTier, reconcileCloudHouses (+7)
- [x] `applyQuality()` — linhas 4450–4450 — if=1, return=1 — chama: applyAdaptiveRenderSettings
- [x] `viewportMetrics()` — linhas 4451–4463 — return=1 — chama: nenhuma função nomeada detectada
- [x] `resize()` — linhas 4464–4477 — if=2 — chama: clearMovementInputs, syncMobilePanels, targetDpr, viewportMetrics
- [x] `scheduleStableResize()` — linhas 4478–4478 — sem fluxo contado — chama: resize
- [x] `ensureViewportCoherence()` — linhas 4479–4482 — if=1, return=2 — chama: resize, viewportMetrics
- [x] `refreshOrientationLayout()` — linhas 4483–4487 — if=3 — chama: resize, scheduleStableResize
- [x] `restorePosition()` — linhas 4488–4493 — if=1 — chama: isInsideLakeNavigable, rememberSafePlayerPosition, safePointNear
- [x] `returnHome()` — linhas 4494–4500 — if=10, else=1, return=1 — chama: auditPlayerMode, busAtStop, exitBoat, exitBusAtStop, exitHouse, exitVehicle, rememberSafePlayerPosition, safePointNear, savePlayerPosition, toast
- [x] `savePlayerPosition()` — linhas 4501–4512 — if=7, else=3 — chama: commitState, isInsideLakeNavigable, saveState
- [x] `groundHeightAt()` — linhas 4513–4515 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `positionBlockedForPlayer()` — linhas 4516–4532 — if=11, for=3, return=6 — chama: groundHeightAt, trafficActorList, waterAt
- [x] `safePointNear()` — linhas 4533–4537 — if=1, for=2, return=2 — chama: groundHeightAt, positionBlockedForPlayer
- [x] `rememberSafePlayerPosition()` — linhas 4538–4542 — if=2, return=3 — chama: positionBlockedForPlayer
- [x] `recoverPlayerIfInvalid()` — linhas 4543–4549 — if=2, return=3 — chama: positionBlockedForPlayer, rememberSafePlayerPosition, safePointNear
- [x] `safeVehicleExitPoint()` — linhas 4550–4553 — return=1 — chama: safePointNear
- [x] `vehicleHitsCollider()` — linhas 4554–4562 — if=5, for=2, return=4 — chama: currentVehicleRef, trafficActorList
- [x] `registerVehicleImpact()` — linhas 4563–4566 — if=1 — chama: beep, toast, vibrate
- [x] `resolveCollisions()` — linhas 4567–4580 — if=9, else=4, for=1, return=1 — chama: playerScaleValue, registerVehicleImpact, vehicleHitsCollider

## `26-input-player-physics.js`

- [x] `resolveMovementInput()` — linhas 4581–4597 — if=4, else=3, return=1 — chama: derivePlayerMode, normalizeControlIntent
- [x] `sprintRequested()` — linhas 4598–4598 — return=1 — chama: nenhuma função nomeada detectada
- [x] `updateRunUI()` — linhas 4599–4601 — if=4, return=2 — chama: mobilityDriverActive, sprintRequested, updateMobilityControlLabels
- [x] `clearMovementInputs()` — linhas 4602–4609 — if=1 — chama: updateRunUI
- [x] `canJump()` — linhas 4610–4610 — return=1 — chama: nenhuma função nomeada detectada
- [x] `requestJump()` — linhas 4611–4611 — if=2, return=1 — chama: canJump, doJump
- [x] `doJump()` — linhas 4612–4612 — if=1, return=1 — chama: beep, canJump, trackDaily, vibrate
- [x] `updatePlayer()` — linhas 4613–4647 — if=20, else=6, return=1 — chama: animatePlayer, beep, cameraRelativeVector, canJump, checkHazards, collectNearbyCrystals, constrainBoat, doJump, groundHeightAt, recoverPlayerIfInvalid, rememberSafePlayerPosition, resolveCollisions (+10)
- [x] `mobilityThrottleIntent()` — linhas 4648–4660 — if=7, return=7 — chama: nenhuma função nomeada detectada
- [x] `updateVehiclePhysics()` — linhas 4661–4675 — if=7, else=1, return=3 — chama: exitVehicle, mobilityThrottleIntent, sprintRequested, toast, updateMobilityControlLabels
- [x] `animatePlayer()` — linhas 4676–4700 — if=13, else=8, return=1 — chama: nenhuma função nomeada detectada
- [x] `checkHazards()` — linhas 4701–4703 — if=4, else=1, for=1 — chama: returnHome, toast
- [x] `collectNearbyCrystals()` — linhas 4704–4707 — if=2, for=1 — chama: collectCrystal
- [x] `npcSpeech()` — linhas 4708–4708 — if=1 — chama: toast

## `27-npc-enemies-combat-camera-action.js`

- [x] `nearestRideCompanion()` — linhas 4709–4711 — return=1 — chama: nenhuma função nomeada detectada
- [x] `nearestBoardableNpc()` — linhas 4712–4714 — return=1 — chama: nenhuma função nomeada detectada
- [x] `boardNpcPassenger()` — linhas 4715–4717 — if=3, return=3 — chama: saveState, toast
- [x] `releaseNpcPassenger()` — linhas 4718–4720 — if=3, return=1 — chama: groundHeightAt
- [x] `updateNpcSociety()` — linhas 4721–4730 — if=9, else=5, return=2 — chama: cloudHouseRecord, npcSpeech, saveState, updateHUD
- [x] `updateNPCs()` — linhas 4731–4767 — if=11, else=8, for=2 — chama: snapTrafficToRoad, trafficSpeedFactor
- [x] `updateEnemies()` — linhas 4768–4776 — if=5, for=1 — chama: beep, saveState, toast, vibrate
- [x] `meleeAttack()` — linhas 4777–4781 — if=1, return=1 — chama: beep, damageEnemy, toast
- [x] `damageEnemy()` — linhas 4782–4785 — if=2, return=1 — chama: addCoins, addXP, evaluateMissions, saveState, toast
- [x] `firePower()` — linhas 4786–4791 — if=3, return=3 — chama: beep, mat, toast, vehicleHorn, vibrate
- [x] `updateFireballs()` — linhas 4792–4795 — if=2, for=2 — chama: damageEnemy
- [x] `updateCamera()` — linhas 4796–4827 — if=6, else=1 — chama: playerScaleValue
- [x] `nearestInteractable()` — linhas 4828–4845 — if=14, for=1, return=12 — chama: boardNpcPassenger, isInteractionAvailable, nearestBoardableNpc, nearestRemotePlayer, openRemotePlayerActions, toast, updateTransitPanel, worldPos
- [x] `updateContext()` — linhas 4846–4849 — if=4, return=2 — chama: nearestInteractable
- [x] `doAction()` — linhas 4850–4861 — if=6, return=2 — chama: isInteractionAvailable, meleeAttack, nearestInteractable, syncMobilePanels, updateContext, worldPos
- [x] `updateNeeds()` — linhas 4862–4869 — if=3, return=1 — chama: playerDisplayName, saveState, sprintRequested, toast, updateHUD

## `28-multiplayer-social-online.js`

- [x] `multiplayerGameLabel()` — linhas 4870–4870 — return=1 — chama: nenhuma função nomeada detectada
- [x] `guardianMultiplayerAllowed()` — linhas 4871–4871 — return=1 — chama: nenhuma função nomeada detectada
- [x] `guardianCommunicationAllowed()` — linhas 4872–4872 — return=1 — chama: nenhuma função nomeada detectada
- [x] `publicPlayerName()` — linhas 4873–4876 — return=1 — chama: nenhuma função nomeada detectada
- [x] `remotePlayerName()` — linhas 4877–4879 — return=1 — chama: nenhuma função nomeada detectada
- [x] `sanitizeRemoteSession()` — linhas 4880–4884 — if=1, for=1, return=1 — chama: remotePlayerName
- [x] `pendingChallenges()` — linhas 4885–4885 — return=1 — chama: nenhuma função nomeada detectada
- [x] `readyGameSessions()` — linhas 4886–4886 — return=1 — chama: nenhuma função nomeada detectada
- [x] `closeChallengePrompt()` — linhas 4887–4887 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `showIncomingChallengePrompt()` — linhas 4888–4888 — if=1, return=1 — chama: guardianCommunicationAllowed, multiplayerGameLabel
- [x] `showReadySessionPrompt()` — linhas 4889–4890 — if=2, return=2 — chama: guardianCommunicationAllowed, multiplayerGameLabel, sessionOpponentName
- [x] `socialActionLabel()` — linhas 4891–4891 — return=1 — chama: nenhuma função nomeada detectada
- [x] `socialRequestPending()` — linhas 4892–4892 — return=1 — chama: nenhuma função nomeada detectada
- [x] `showIncomingSocialRequest()` — linhas 4893–4905 — if=7, return=8 — chama: guardianCommunicationAllowed, saveState, socialActionLabel, toast
- [x] `applyAcceptedSocialAction()` — linhas 4906–4923 — if=15, else=9, return=3 — chama: closeChallengePrompt, closeModal, enterBoatAsPassenger, enterVehicleAsPassenger, escapeHtml, multiplayerGameLabel, openModal, openNearestCampfire, saveState, sessionOpponentName, startFishing, startHunting (+3)
- [x] `updateOnlineAttention()` — linhas 4924–4924 — if=2 — chama: guardianCommunicationAllowed, pendingChallenges, readyGameSessions, socialRequestPending
- [x] `challengeInboxHtml()` — linhas 4925–4925 — return=1 — chama: escapeHtml, multiplayerGameLabel, pendingChallenges
- [x] `socialRequestInboxHtml()` — linhas 4926–4926 — return=1 — chama: escapeHtml, socialActionLabel, socialRequestPending
- [x] `completedGameSessions()` — linhas 4927–4927 — return=1 — chama: nenhuma função nomeada detectada
- [x] `rememberMatchResult()` — linhas 4928–4928 — if=2, return=3 — chama: sessionOpponentName
- [x] `duelHistoryHtml()` — linhas 4929–4929 — return=2 — chama: completedGameSessions, escapeHtml, multiplayerGameLabel, sessionOpponentName
- [x] `activeSessionsHtml()` — linhas 4930–4930 — return=2 — chama: escapeHtml, multiplayerGameLabel, readyGameSessions
- [x] `bindChallengeCards()` — linhas 4931–4933 — if=5, else=1, return=3 — chama: closeChallengePrompt, multiplayerGameLabel, refreshOpenSocialHub, toast, updateOnlineAttention
- [x] `highestUnlockedLevel()` — linhas 4934–4934 — if=1, for=1, return=1 — chama: subjectUnlocked
- [x] `openChallengePicker()` — linhas 4935–4935 — if=1, else=1 — chama: closeModal, highestUnlockedLevel, openModal, toast
- [x] `sessionOpponentName()` — linhas 4936–4936 — return=1 — chama: remotePlayerName
- [x] `startMultiplayerEducationGame()` — linhas 4937–4937 — if=2, return=2 — chama: closeChallengePrompt, escapeHtml, openModal, runEducationGame, saveState, sessionOpponentName, toast
- [x] `maybeShowMultiplayerResult()` — linhas 4938–4938 — if=4, return=3 — chama: addCoins, addXP, escapeHtml, openModal, rememberMatchResult, saveState
- [x] `currentOnlineRoom()` — linhas 4939–4939 — return=1 — chama: nenhuma função nomeada detectada
- [x] `multiplayerStatusText()` — linhas 4940–4940 — if=2, return=3 — chama: currentOnlineRoom
- [x] `updateMultiplayerBadge()` — linhas 4941–4941 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `onlinePlayers()` — linhas 4942–4942 — return=2 — chama: remotePlayerName
- [x] `onlinePlayerListHtml()` — linhas 4943–4943 — return=1 — chama: escapeHtml, onlinePlayers
- [x] `bindOnlinePlayerCards()` — linhas 4944–4944 — if=1 — chama: openRemotePlayerActions
- [x] `refreshOpenSocialHub()` — linhas 4945–4945 — if=9, return=1 — chama: activeSessionsHtml, bindChallengeCards, bindOnlinePlayerCards, challengeInboxHtml, chatMessageHtml, duelHistoryHtml, multiplayerStatusText, onlinePlayerListHtml, onlinePlayers, socialRequestInboxHtml, updateOnlineAttention
- [x] `approvedChatPhrases()` — linhas 4946–4946 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openSocialHub()` — linhas 4947–4957 — if=3, return=2 — chama: activeSessionsHtml, approvedChatPhrases, bindChallengeCards, bindOnlinePlayerCards, challengeInboxHtml, chatMessageHtml, duelHistoryHtml, escapeHtml, guardianCommunicationAllowed, guardianMultiplayerAllowed, multiplayerStatusText, onlinePlayerListHtml (+8)
- [x] `escapeHtml()` — linhas 4958–4958 — return=1 — chama: nenhuma função nomeada detectada
- [x] `chatMessageHtml()` — linhas 4959–4959 — return=1 — chama: escapeHtml
- [x] `openReportPlayer()` — linhas 4960–4966 — if=1, return=1 — chama: closeModal, openModal, toast
- [x] `openRemotePlayerActions()` — linhas 4967–4986 — if=18, else=5, catch=1, return=8 — chama: closeModal, confirmModal, guardianCommunicationAllowed, isNearFishingArea, nearestActiveCampfire, openChallengePicker, openModal, openReportPlayer, openSocialHub, toast, triggerEmote
- [x] `nearestRemotePlayer()` — linhas 4987–4987 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `openMultiplayerConfig()` — linhas 4988–4988 — sem fluxo contado — chama: openSocialHub
- [x] `applyCloudWorldObjects()` — linhas 4989–4995 — if=8, for=6, return=1 — chama: spawnCampfire, spawnHouseExtension
- [x] `remotePlayerEvent()` — linhas 4996–5027 — if=47, else=11, for=2, while=1, catch=1, return=11 — chama: applyAcceptedSocialAction, applyCloudWorldObjects, closeChallengePrompt, createGhost, exitBoat, exitVehicle, guardianCommunicationAllowed, guardianMultiplayerAllowed, hasValidPlayerName, maybeShowMultiplayerResult, mergeCloudProgress, multiplayerGameLabel (+15)
- [x] `initLocalMultiplayer()` — linhas 5028–5031 — if=6, return=4 — chama: guardianMultiplayerAllowed, hasValidPlayerName, publicPlayerName, remotePlayerEvent, updateMultiplayerBadge
- [x] `multiplayerNameTexture()` — linhas 5032–5032 — if=1, else=1, return=1 — chama: sanitizePlayerName
- [x] `updateLocalPlayerNameLabel()` — linhas 5033–5033 — if=2, return=2 — chama: multiplayerNameTexture, playerDisplayName
- [x] `updateGhostName()` — linhas 5034–5034 — if=2, return=1 — chama: multiplayerNameTexture, sanitizePlayerName
- [x] `ghostVehicleKind()` — linhas 5035–5035 — if=3, return=4 — chama: nenhuma função nomeada detectada
- [x] `styleGhostVehicle()` — linhas 5036–5042 — if=4, else=3, for=1, return=1 — chama: ghostVehicleKind
- [x] `createGhost()` — linhas 5043–5049 — for=1, return=1 — chama: box, cylinder, mat, multiplayerNameTexture, sanitizePlayerName
- [x] `updateMultiplayer()` — linhas 5050–5062 — if=6, for=1, return=1 — chama: guardianMultiplayerAllowed, publicPlayerName, styleGhostVehicle

## `29-game-loop-controls-gamepad.js`

- [x] `updatePlayUsage()` — linhas 5063–5080 — if=3, return=1 — chama: openModal, saveState, stopGame
- [x] `showWorldLoading()` — linhas 5081–5085 — if=1 — chama: openModal
- [x] `showWorldLoadFailure()` — linhas 5086–5093 — if=1 — chama: escapeHtml, openModal, showScreen
- [x] `gameLoop()` — linhas 5094–5125 — if=17, return=1 — chama: auditPlayerMode, captureTrafficPositions, ensureViewportCoherence, pollGamepad, qualityTier, refreshTechnicalPanel, resolveTrafficOverlaps, samplePerformance, updateAdventure, updateBuildPreview, updateCamera, updateCareerMissions (+22)
- [x] `setupControls()` — linhas 5126–5151 — if=30, else=4, return=5 — chama: closeModal, doAction, endBuildMode, firePower, mobilityDriverActive, openPauseMenu, requestJump, rotateBuildPreview, saveState, setScaleMode, spinPlayer, toast (+3)
- [x] `pollGamepad()` — linhas 5152–5175 — if=19, else=2, catch=1, return=6, throw=2 — chama: accountLinked, accountPromptWasHandled, applyAvatarCustomization, closeModal, doAction, equippedTool, evaluateMissions, firePower, gameLoop, hasValidPlayerName, initThree, mobilityDriverActive (+22)

## `30-pause-tests-public-api-bootstrap.js`

- [x] `stopGame()` — linhas 5176–5181 — if=10 — chama: endBuildMode, exitBoat, exitBusAtStop, exitVehicle, savePlayerPosition, showScreen, stopEngineSound, updateLobbyStats, updateSafetyPanel
- [x] `openPauseMenu()` — linhas 5182–5193 — if=4, return=1 — chama: closeModal, endBuildMode, openLifePanel, openModal, returnHome, startEngineSound, stopEngineSound, stopGame
- [x] `updateBridgeVisual()` — linhas 5194–5196 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `prepareVehicleTestArea()` — linhas 5197–5209 — if=2, return=1 — chama: clearMovementInputs, enterVehicle, exitVehicle, groundHeightAt
- [x] `stepVehicleSimulation()` — linhas 5210–5359 — if=11, for=5, return=36 — chama: activateFireIncident, applyAdaptiveRenderSettings, auditPlayerMode, beginBuildMode, buildRoutePoints, busAtStop, cameraRelativeVector, closeModal, completeActiveJob, constrainBoat, currentVehicleRef, detectStableAutoTier (+61)

## `31-neighborhood-world-controller.js`

- [x] `roomWorldInfo()` — linhas 5360–5360 — return=1 — chama: nenhuma função nomeada detectada
- [x] `roomHouseMarkers()` — linhas 5361–5361 — return=2 — chama: nenhuma função nomeada detectada
- [x] `mapHouseLocations()` — linhas 5362–5362 — return=1 — chama: roomHouseMarkers
- [x] `mapRegionsMarkup()` — linhas 5363–5363 — return=2 — chama: escapeHtml
- [x] `clearRemoteRoomEntities()` — linhas 5364–5367 — for=1 — chama: applyCloudWorldObjects, closeChallengePrompt, reconcileCloudHouses, refreshOpenSocialHub, updateMultiplayerBadge
- [x] `resetMobilityForRoomChange()` — linhas 5368–5372 — if=10 — chama: cancelFishingSession, clearMovementInputs, endBuildMode, exitBoat, exitHouse, exitVehicle
- [x] `canChangeRoom()` — linhas 5373–5373 — return=1 — chama: nenhuma função nomeada detectada
- [x] `focusCurrentRoom()` — linhas 5374–5374 — sem fluxo contado — chama: buildRoutePoints, roomWorldInfo, toast, updateNavigation
- [x] `applyRoomWorld()` — linhas 5375–5395 — if=6, return=3 — chama: clearRemoteRoomEntities, refreshOpenMapAfterResize, rememberSafePlayerPosition, resetMobilityForRoomChange, roomWorldInfo, safePointNear, saveState, toast, updateContext, updateHUD, updateNavigation

## `32-cooperative-missions.js`

- [x] `ensureCooperativeState()` — linhas 5396–5396 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopUid()` — linhas 5397–5397 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopMissionTemplate()` — linhas 5398–5398 — return=1 — chama: nenhuma função nomeada detectada
- [x] `activeCoopMission()` — linhas 5399–5399 — return=1 — chama: ensureCooperativeState
- [x] `activeCoopRecord()` — linhas 5400–5400 — if=1, return=2 — chama: activeCoopMission
- [x] `activeCoopServiceJob()` — linhas 5401–5401 — return=1 — chama: activeCoopMission
- [x] `coopParticipants()` — linhas 5402–5402 — return=1 — chama: activeCoopRecord
- [x] `coopOwnParticipant()` — linhas 5403–5403 — return=1 — chama: activeCoopRecord, coopUid
- [x] `coopRoleLabel()` — linhas 5404–5404 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopProgress()` — linhas 5405–5405 — return=1 — chama: activeCoopRecord
- [x] `coopEventValues()` — linhas 5406–5406 — return=1 — chama: activeCoopRecord, coopProgress
- [x] `coopHasEvent()` — linhas 5407–5407 — return=1 — chama: activeCoopRecord, coopEventValues
- [x] `coopIndividualCount()` — linhas 5408–5408 — return=1 — chama: activeCoopRecord, coopEventValues, coopUid
- [x] `coopRoleCapacity()` — linhas 5409–5409 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopRoleTaken()` — linhas 5410–5410 — return=1 — chama: coopParticipants, coopUid
- [x] `coopEventSubjectId()` — linhas 5411–5411 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopMedicalDestination()` — linhas 5412–5412 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `coopRaceStandings()` — linhas 5413–5415 — return=2 — chama: activeCoopRecord, coopEventValues, coopParticipants
- [x] `coopRaceTargetReached()` — linhas 5416–5416 — return=1 — chama: activeCoopRecord, coopProgress, coopRaceStandings
- [x] `coopMissionMapLocations()` — linhas 5417–5421 — if=2, return=3 — chama: activeCoopMission, activeCoopRecord, coopCurrentInstruction, coopCurrentTarget, coopMissionTemplate, coopOwnParticipant, coopRoleLabel
- [x] `coopServiceKind()` — linhas 5422–5422 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopMissionHash()` — linhas 5423–5423 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `coopSceneTarget()` — linhas 5424–5430 — if=8, for=2, return=4 — chama: activateFireIncident, activeCoopMission, coopMissionHash, createTrafficIncidentAt, nearestRoadProjection, serviceVehiclePools
- [x] `coopNearestSchool()` — linhas 5431–5431 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopNearestInvitableNpc()` — linhas 5432–5432 — return=1 — chama: activeCoopRecord, coopEventSubjectId, coopProgress
- [x] `coopCurrentTarget()` — linhas 5433–5451 — if=15, return=13 — chama: activeCoopMission, activeCoopRecord, coopMedicalDestination, coopNearestInvitableNpc, coopNearestSchool, coopProgress, coopSceneTarget, coopServiceKind, serviceMissionVehicle
- [x] `coopCurrentInstruction()` — linhas 5452–5466 — if=12, return=13 — chama: activeCoopMission, activeCoopRecord, coopIndividualCount, coopMissionTemplate, coopOwnParticipant, coopProgress, coopRoleLabel
- [x] `coopMissionProgressLabel()` — linhas 5467–5467 — if=1, return=2 — chama: activeCoopMission, activeCoopRecord, coopCurrentInstruction, coopMissionTemplate, coopProgress
- [x] `coopMissionBriefingMarkup()` — linhas 5468–5471 — if=1, return=2 — chama: activeCoopMission, activeCoopRecord, coopCurrentInstruction, coopIndividualCount, coopMissionProgressLabel, coopMissionTemplate, coopOwnParticipant, coopParticipants, coopProgress, coopRaceStandings, coopRoleLabel, coopUid
- [x] `coopPermissionDenied()` — linhas 5472–5473 — if=1, catch=1, return=4 — chama: nenhuma função nomeada detectada
- [x] `bindCoopActionButton()` — linhas 5474–5474 — if=3, return=2 — chama: nenhuma função nomeada detectada
- [x] `coopLocalRecord()` — linhas 5475–5477 — return=1 — chama: coopUid, publicPlayerName
- [x] `coopActiveState()` — linhas 5478–5492 — if=27, else=6, return=24 — chama: activeCoopMission, activeCoopRecord, closeModal, continueCoopMissionOffline, coopLocalRecord, coopMissionTemplate, coopOwnParticipant, coopParticipants, coopPermissionDenied, coopRoleCapacity, coopRoleTaken, coopUid (+6)
- [x] `continueCoopMissionOffline()` — linhas 5493–5497 — if=1, return=2 — chama: activeCoopMission, activeCoopRecord, closeModal, coopUid, prepareCoopMissionRuntime, publicPlayerName, saveState, toast, updateMissionHUD
- [x] `prepareCoopMissionRuntime()` — linhas 5498–5504 — if=6, else=2, return=1 — chama: activateCoopRaceBots, activeCoopMission, activeCoopRecord, applyAvatarCustomization, coopCurrentTarget, coopMissionTemplate, coopSceneTarget, coopServiceKind, coopSetWaypoint, equipJobUniform, reserveMissionServiceVehicle, saveState
- [x] `coopSetWaypoint()` — linhas 5505–5505 — if=1, return=1 — chama: buildRoutePoints, updateNavigation, updateWaypointMarker
- [x] `onCoopServiceVehicleBoarded()` — linhas 5506–5514 — if=14, return=12 — chama: activeCoopMission, activeCoopRecord, coopSceneTarget, coopSetWaypoint, coopUid, toast
- [x] `coopNearbyParticipantCount()` — linhas 5515–5551 — if=45, for=1, return=34 — chama: activeCoopMission, activeCoopRecord, coopCurrentTarget, coopEventSubjectId, coopHasEvent, coopMedicalDestination, coopNearestInvitableNpc, coopNearestSchool, coopOwnParticipant, coopParticipants, coopProgress, coopServiceKind (+7)
- [x] `updateCoopFishingProgress()` — linhas 5552–5552 — if=3, catch=1, return=1 — chama: activeCoopRecord, coopProgress, coopSetWaypoint, updateMissionHUD
- [x] `updateCoopSchoolFollowers()` — linhas 5553–5553 — if=2, for=1 — chama: nenhuma função nomeada detectada
- [x] `activateCoopRaceBots()` — linhas 5554–5554 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `deactivateCoopRaceBots()` — linhas 5555–5555 — for=1 — chama: nenhuma função nomeada detectada
- [x] `updateCoopRaceVisuals()` — linhas 5556–5557 — if=3, else=1, for=1, return=1 — chama: activeCoopMission, activeCoopRecord
- [x] `updateCoopRaceProgress()` — linhas 5558–5571 — if=24, else=8, catch=2, return=5 — chama: activeCoopMission, activeCoopRecord, completeCoopMissionLocal, coopHasEvent, coopMissionTemplate, coopProgress, coopRaceTargetReached, coopSetWaypoint, coopUid, toast
- [x] `resolveCoopMissionScene()` — linhas 5572–5572 — if=7, else=3, for=2 — chama: activeCoopMission, activeCoopRecord, extinguishFireIncident, releaseIncidentActorStates, resolveTrafficIncident, serviceVehiclePools
- [x] `resetCoopMissionNpcs()` — linhas 5573–5573 — if=3, for=1 — chama: activeCoopMission
- [x] `completeCoopMissionLocal()` — linhas 5574–5577 — if=8, return=5 — chama: activeCoopMission, activeCoopRecord, addCoins, addReputation, addXP, applyAvatarCustomization, awardMedal, closeModal, confirmModal, coopMissionTemplate, coopParticipants, coopUid (+9)
- [x] `openCoopLobby()` — linhas 5578–5584 — if=2, return=2 — chama: activeCoopMission, activeCoopRecord, bindCoopActionButton, closeModal, coopCurrentTarget, coopMissionBriefingMarkup, coopMissionTemplate, coopParticipants, coopRoleCapacity, coopRoleLabel, coopRoleTaken, coopSetWaypoint (+3)
- [x] `openCoopMissionCenter()` — linhas 5585–5590 — if=1, return=2 — chama: activeCoopMission, bindCoopActionButton, closeModal, coopCurrentTarget, coopMissionBriefingMarkup, coopMissionTemplate, coopParticipants, coopSetWaypoint, coopUid, ensureCooperativeState, openCoopLobby, openModal
- [x] `createCoopOvalTrackWorld()` — linhas 5591–5595 — for=2 — chama: nenhuma função nomeada detectada
- [x] `createCooperativeMissionWorld()` — linhas 5596–5600 — if=6, else=1, for=1, return=1 — chama: activeCoopMission, activeCoopRecord, completeCoopMissionLocal, coopCurrentTarget, createCoopOvalTrackWorld, createNPC, ensureCooperativeState, prepareCoopMissionRuntime, registerInteractable, toast, updateMissionHUD
- [x] `updateCoopMissions()` — linhas 5601–5607 — if=15, catch=2, return=5 — chama: activeCoopMission, activeCoopRecord, completeCoopMissionLocal, coopHasEvent, coopMedicalDestination, coopMissionProgressLabel, coopProgress, coopServiceKind, deactivateCoopRaceBots, isDrivingServiceVehicle, prepareCoopMissionRuntime, releaseMissionServiceVehicle (+9)
- [x] `updateCoopVisuals()` — linhas 5608–5609 — sem fluxo contado — chama: updateCoopRaceVisuals
