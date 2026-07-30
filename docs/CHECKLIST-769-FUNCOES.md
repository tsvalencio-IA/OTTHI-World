# Checklist das 769 funções — OTTHI World Edu V644

Cada item confirma presença na fonte modular. `endBoundaryLine` termina na próxima declaração de função de topo; não é uma afirmação de parsing semântico do corpo JavaScript.


## `00a-visual-foundation-avatar-v2.js`

- [x] `safeAvatarId()` — linhas 114–117 — return=1 — chama: nenhuma função nomeada detectada
- [x] `safeAvatarColor()` — linhas 118–121 — return=1 — chama: nenhuma função nomeada detectada
- [x] `safeLegacyAvatarChoice()` — linhas 122–125 — return=1 — chama: nenhuma função nomeada detectada
- [x] `defaultAvatarV2()` — linhas 126–128 — return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeAvatarV2()` — linhas 129–158 — return=1 — chama: safeAvatarColor, safeAvatarId, safeLegacyAvatarChoice
- [x] `updateAvatarV2LegacyChoice()` — linhas 159–189 — if=3, return=2 — chama: normalizeAvatarV2, safeLegacyAvatarChoice
- [x] `registerVisualAsset()` — linhas 190–197 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `updateVisualAsset()` — linhas 198–200 — return=1 — chama: registerVisualAsset
- [x] `visualAssetStatus()` — linhas 201–211 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `visualQualityProfile()` — linhas 212–214 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createManagedLOD()` — linhas 215–234 — if=2, return=3 — chama: registerVisualAsset
- [x] `applyVisualQualityBudget()` — linhas 235–244 — if=1, for=1, return=1 — chama: visualQualityProfile
- [x] `updateManagedVisualLODs()` — linhas 245–255 — if=1, for=1, catch=1, return=1 — chama: updateVisualAsset
- [x] `outlineBelongsToPlayer()` — linhas 256–263 — if=1, while=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `updateManagedOutlineVisibility()` — linhas 264–284 — if=4, else=1, for=1, return=1 — chama: outlineBelongsToPlayer, visualQualityProfile
- [x] `visualFoundationDiagnostics()` — linhas 285–311 — if=1, else=1, for=1, return=1 — chama: visualAssetStatus
- [x] `createAvatarRigFoundation()` — linhas 312–345 — if=7, return=3 — chama: registerVisualAsset
- [x] `avatarFoundationDiagnostics()` — linhas 346–364 — return=1 — chama: registerVisualAsset
- [x] `stableBuildId()` — linhas 365–370 — for=1, return=1 — chama: nenhuma função nomeada detectada

## `01-build-persistence.js`

- [x] `normalizeBuildRecord()` — linhas 371–377 — if=2, return=3 — chama: stableBuildId
- [x] `normalizeBuildList()` — linhas 378–386 — if=2, return=2 — chama: normalizeBuildRecord
- [x] `normalizeBuildTombstones()` — linhas 387–395 — if=3, return=3 — chama: nenhuma função nomeada detectada
- [x] `mergeBuildTombstones()` — linhas 396–396 — return=1 — chama: normalizeBuildTombstones
- [x] `applyBuildTombstones()` — linhas 397–400 — return=1 — chama: normalizeBuildList, normalizeBuildTombstones
- [x] `mergeBuildCollections()` — linhas 401–403 — return=1 — chama: applyBuildTombstones, normalizeBuildList
- [x] `mergeEntityCollections()` — linhas 404–483 — if=2, return=2 — chama: defaultAvatarV2
- [x] `normalizeState()` — linhas 484–541 — if=2, return=1 — chama: applyBuildTombstones, normalizeAvatarV2, normalizeBuildTombstones

## `02-state-save-cloud-account.js`

- [x] `loadState()` — linhas 542–590 — if=10, else=2, for=1, catch=4, return=5 — chama: ensureDailyChallenges, normalizeState, updateDailyBadge, updateHUD, updateLobbyStats
- [x] `commitState()` — linhas 591–607 — catch=2, return=2 — chama: applyBuildTombstones, ensureDailyChallenges, normalizeBuildTombstones, syncCloudProgress, syncGameAccount, updateDailyBadge, updateLobbyStats
- [x] `saveState()` — linhas 608–615 — if=1, return=2 — chama: commitState
- [x] `cloudProgressPayload()` — linhas 616–624 — return=1 — chama: nenhuma função nomeada detectada
- [x] `syncCloudProgress()` — linhas 625–628 — if=1, return=2 — chama: cloudProgressPayload, hasValidPlayerName
- [x] `mergeCloudProgress()` — linhas 629–650 — if=3, catch=1, return=3 — chama: mergeBuildCollections, mergeBuildTombstones, mergeEntityCollections, normalizeAvatarV2, normalizeState, reconcileWorldBuilds, syncCloudProgress, toast, updateHUD, updateLobbyStats, updatePlayerNameUI
- [x] `accountLinked()` — linhas 651–651 — return=1 — chama: nenhuma função nomeada detectada
- [x] `accountPromptWasHandled()` — linhas 652–652 — return=1 — chama: nenhuma função nomeada detectada
- [x] `accountStatusText()` — linhas 653–669 — if=4, return=7 — chama: accountLinked, publicPlayerName
- [x] `syncGameAccount()` — linhas 670–724 — if=17, catch=1, return=12, throw=10 — chama: accountLinked, applyPlayerName, commitState, normalizeState, publicPlayerName, sanitizePlayerName, saveState, updateHUD, updateLobbyStats, updatePlayerNameUI
- [x] `openAccountForm()` — linhas 725–733 — if=4, else=2, catch=1, return=1 — chama: closeModal, escapeHtml, openAccountCenter, openModal, toast
- [x] `openAccountCenter()` — linhas 734–742 — if=1 — chama: accountLinked, closeModal, escapeHtml, openAccountForm, openAccountLogoutGate, openModal, openPlayerNameModal, saveState, syncGameAccount, toast
- [x] `openAccountLogoutGate()` — linhas 743–749 — if=2, return=1 — chama: closeModal, openAccountCenter, openModal, toast
- [x] `addXP()` — linhas 750–760 — if=1 — chama: awardMedal, saveState, toast, updateHUD

## `03-ui-modal-install-pwa.js`

- [x] `addCoins()` — linhas 761–764 — sem fluxo contado — chama: saveState, updateHUD
- [x] `addReputation()` — linhas 765–768 — sem fluxo contado — chama: saveState, updateHUD
- [x] `awardMedal()` — linhas 769–774 — if=1, return=1 — chama: saveState, toast
- [x] `setFlag()` — linhas 775–781 — if=1, return=1 — chama: evaluateMissions, saveState
- [x] `showScreen()` — linhas 782–786 — sem fluxo contado — chama: updateInstallUI
- [x] `toast()` — linhas 787–792 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `vibrate()` — linhas 793–795 — if=1 — chama: nenhuma função nomeada detectada
- [x] `beep()` — linhas 796–810 — if=2, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `openModal()` — linhas 811–825 — if=3 — chama: scheduleStableResize
- [x] `closeModal()` — linhas 826–843 — if=4, else=1 — chama: cancelFishingSession, clearExtensionPreview, startEngineSound, stopFishingVisual
- [x] `confirmModal()` — linhas 844–857 — if=1, return=1 — chama: closeModal, openModal
- [x] `updateInstallUI()` — linhas 858–905 — if=5, return=2 — chama: openModal, toast
- [x] `isOfficialOtthiGameAddress()` — linhas 906–1032 — if=17, else=1, catch=8, return=12, throw=1 — chama: openModal, saveState, toast, updateInstallUI
- [x] `localDateKey()` — linhas 1033–1033 — return=1 — chama: nenhuma função nomeada detectada
- [x] `daysBetween()` — linhas 1034–1034 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `ensureDailyChallenges()` — linhas 1035–1035 — if=1, while=1, return=1 — chama: daysBetween, localDateKey, saveState
- [x] `dailyDefinition()` — linhas 1036–1036 — return=1 — chama: nenhuma função nomeada detectada
- [x] `trackDaily()` — linhas 1037–1042 — if=5, for=1, return=1 — chama: ensureDailyChallenges, saveState, updateDailyBadge

## `04-education-daily-quiz.js`

- [x] `updateDailyBadge()` — linhas 1043–1043 — if=2, return=1 — chama: ensureDailyChallenges
- [x] `claimDailyQuest()` — linhas 1044–1057 — if=1, return=1 — chama: addCoins, addReputation, addXP, beep, dailyDefinition, openDailyChallenges, saveState, toast, vibrate
- [x] `seeded()` — linhas 1058–1058 — return=1 — chama: nenhuma função nomeada detectada
- [x] `shuffled()` — linhas 1059–1059 — return=1 — chama: nenhuma função nomeada detectada
- [x] `choiceSet()` — linhas 1060–1060 — return=1 — chama: shuffled
- [x] `mathRound()` — linhas 1061–1069 — if=5, return=6 — chama: choiceSet
- [x] `portugueseRound()` — linhas 1070–1078 — if=5, return=6 — chama: choiceSet, shuffled
- [x] `englishRound()` — linhas 1079–1087 — if=5, return=6 — chama: choiceSet
- [x] `generateEducationRounds()` — linhas 1088–1088 — return=1 — chama: seeded
- [x] `subjectLevelRecord()` — linhas 1089–1089 — return=1 — chama: nenhuma função nomeada detectada
- [x] `subjectUnlocked()` — linhas 1090–1090 — return=1 — chama: subjectLevelRecord
- [x] `educationSummary()` — linhas 1091–1091 — if=1, for=2, return=1 — chama: subjectLevelRecord
- [x] `speakKidWord()` — linhas 1092–1092 — catch=1 — chama: nenhuma função nomeada detectada
- [x] `dailyChallengesHtml()` — linhas 1093–1093 — return=2 — chama: dailyDefinition, ensureDailyChallenges
- [x] `educationSubjectHtml()` — linhas 1094–1094 — return=2 — chama: subjectLevelRecord, subjectUnlocked
- [x] `openEducationHub()` — linhas 1095–1104 — if=5, return=4 — chama: claimDailyQuest, dailyChallengesHtml, educationSubjectHtml, educationSummary, ensureDailyChallenges, openModal, openSocialHub, playerDisplayName, startSoloEducationGame
- [x] `openChallengeHub()` — linhas 1105–1105 — sem fluxo contado — chama: openEducationHub
- [x] `openDailyChallenges()` — linhas 1106–1106 — sem fluxo contado — chama: openEducationHub
- [x] `runEducationGame()` — linhas 1107–1120 — if=6, else=1, return=4 — chama: addXP, beep, escapeHtml, finishSoloEducationGame, generateEducationRounds, openModal, speakKidWord
- [x] `startSoloEducationGame()` — linhas 1121–1121 — catch=1 — chama: closeChallengePrompt, runEducationGame, toast
- [x] `finishSoloEducationGame()` — linhas 1122–1124 — if=2, else=1 — chama: addCoins, addXP, awardMedal, openEducationHub, openModal, saveState, startSoloEducationGame, subjectLevelRecord
- [x] `startCinematicEmote()` — linhas 1125–1127 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `triggerEmote()` — linhas 1128–1138 — if=4 — chama: addXP, beep, startCinematicEmote, toast, vibrate
- [x] `openQuiz()` — linhas 1139–1141 — sem fluxo contado — chama: openEducationHub
- [x] `openCollection()` — linhas 1142–1160 — sem fluxo contado — chama: openModal
- [x] `effectiveAvatarUniform()` — linhas 1161–1168 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `avatarChoiceGroup()` — linhas 1169–1173 — return=1 — chama: effectiveAvatarUniform

## `05-avatar-life-customization.js`

- [x] `openAvatarStudio()` — linhas 1174–1183 — sem fluxo contado — chama: applyAvatarCustomization, avatarChoiceGroup, closeModal, normalizeAvatarV2, openModal, playerDisplayName, saveState, setFlag, toast, updateAvatarV2LegacyChoice
- [x] `openLifePanel()` — linhas 1184–1199 — if=2, for=1 — chama: closeModal, openModal, toast
- [x] `openMolds()` — linhas 1200–1202 — sem fluxo contado — chama: openModal, playerDisplayName
- [x] `openHow()` — linhas 1203–1301 — sem fluxo contado — chama: openModal
- [x] `deriveMissionFlags()` — linhas 1302–1313 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `evaluateMissions()` — linhas 1314–1331 — if=2, for=1 — chama: addCoins, awardMedal, deriveMissionFlags, toast, updateMissionHUD

## `06-missions-profile-hud-inventory-tools.js`

- [x] `updateMissionHUD()` — linhas 1332–1352 — if=3, return=3 — chama: activeJobProgress, coopMissionProgressLabel, playerText
- [x] `objectiveStatusLabel()` — linhas 1353–1353 — return=1 — chama: nenhuma função nomeada detectada
- [x] `skillMasterySummary()` — linhas 1354–1354 — return=1 — chama: nenhuma função nomeada detectada
- [x] `pinChapter()` — linhas 1355–1355 — sem fluxo contado — chama: evaluateMissions, saveState, toast, updateMissionHUD
- [x] `openObjectivesPanel()` — linhas 1356–1363 — return=1 — chama: activeCoopMission, activeJobProgress, coopMissionBriefingMarkup, deriveMissionFlags, focusActiveJob, missionBriefingMarkup, openModal, pinChapter, playerText, skillMasterySummary
- [x] `sanitizePlayerName()` — linhas 1364–1364 — return=1 — chama: nenhuma função nomeada detectada
- [x] `hasValidPlayerName()` — linhas 1365–1365 — return=1 — chama: sanitizePlayerName
- [x] `playerDisplayName()` — linhas 1366–1366 — return=1 — chama: hasValidPlayerName, sanitizePlayerName
- [x] `playerText()` — linhas 1367–1367 — return=1 — chama: playerDisplayName
- [x] `updatePlayerNameUI()` — linhas 1368–1368 — if=7 — chama: accountStatusText, hasValidPlayerName, playerDisplayName
- [x] `applyPlayerName()` — linhas 1369–1369 — if=2, return=2 — chama: publicPlayerName, sanitizePlayerName, saveState, toast, updatePlayerNameUI
- [x] `openPlayerNameModal()` — linhas 1370–1374 — if=3, return=1 — chama: applyPlayerName, closeModal, hasValidPlayerName, openModal, toast
- [x] `updateLobbyStats()` — linhas 1375–1381 — sem fluxo contado — chama: updatePlayerNameUI
- [x] `updateHUD()` — linhas 1382–1396 — if=1 — chama: updateMissionHUD, updatePlayerNameUI
- [x] `openInventory()` — linhas 1397–1409 — if=1, return=1 — chama: openModal, saveState, toast, updateHUD
- [x] `equippedTool()` — linhas 1410–1410 — return=1 — chama: nenhuma função nomeada detectada
- [x] `equipTool()` — linhas 1411–1413 — if=2, return=2 — chama: refreshEquippedToolVisual, saveState, toast
- [x] `openToolbelt()` — linhas 1414–1416 — sem fluxo contado — chama: closeModal, equipTool, openModal
- [x] `refreshEquippedToolVisual()` — linhas 1417–1430 — if=4, else=2, return=1 — chama: box, renderMat
- [x] `playToolAnimation()` — linhas 1431–1439 — sem fluxo contado — chama: beep, vibrate
- [x] `routeLength()` — linhas 1440–1440 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `compactRoute()` — linhas 1441–1441 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `projectPointToSegment()` — linhas 1442–1442 — return=1 — chama: nenhuma função nomeada detectada
- [x] `navBlocked()` — linhas 1443–1443 — if=3, for=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `segmentClear()` — linhas 1444–1444 — if=1, for=1, return=2 — chama: navBlocked
- [x] `nearestRoadProjection()` — linhas 1445–1445 — if=1, for=1, return=1 — chama: projectPointToSegment, segmentClear
- [x] `pointOnRoad()` — linhas 1446–1446 — return=1 — chama: nenhuma função nomeada detectada
- [x] `projectPointToPolyline()` — linhas 1447–1451 — if=3, for=1, return=2 — chama: projectPointToSegment
- [x] `snapTrafficToRoad()` — linhas 1452–1457 — if=3, return=3 — chama: nearestRoadProjection, pointOnRoad, projectPointToPolyline

## `07-navigation-traffic-routes.js`

- [x] `trafficActorList()` — linhas 1458–1469 — if=6, for=5, return=2 — chama: nenhuma função nomeada detectada
- [x] `trafficPriority()` — linhas 1470–1470 — if=4, else=2, return=2 — chama: nenhuma função nomeada detectada
- [x] `trafficSpeedFactor()` — linhas 1471–1480 — if=7, else=1, for=1, return=3 — chama: trafficActorList, trafficPriority
- [x] `captureTrafficPositions()` — linhas 1481–1481 — for=1, return=1 — chama: trafficActorList
- [x] `resolveTrafficOverlaps()` — linhas 1482–1492 — if=7, else=1, for=4 — chama: pointOnRoad, snapTrafficToRoad, trafficActorList, trafficPriority
- [x] `graphAdd()` — linhas 1493–1493 — if=2 — chama: nenhuma função nomeada detectada
- [x] `graphShortest()` — linhas 1494–1494 — if=6, for=2, while=2, return=2 — chama: nenhuma função nomeada detectada
- [x] `buildRoutePoints()` — linhas 1495–1506 — if=4, for=2, return=3 — chama: compactRoute, graphAdd, graphShortest, nearestRoadProjection
- [x] `routeProgressInfo()` — linhas 1507–1507 — if=2, for=1, return=2 — chama: projectPointToSegment, routeLength
- [x] `remainingRoute()` — linhas 1508–1508 — return=1 — chama: compactRoute, routeProgressInfo
- [x] `sampleRoute()` — linhas 1509–1509 — for=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `createRouteGuide()` — linhas 1510–1510 — if=2, for=1, return=3 — chama: mat
- [x] `updateRouteGuide()` — linhas 1511–1511 — if=4, return=3 — chama: buildRoutePoints, createRouteGuide, groundHeightAt, remainingRoute, routeProgressInfo, sampleRoute
- [x] `miniPoint()` — linhas 1512–1512 — return=1 — chama: nenhuma função nomeada detectada
- [x] `miniMapLogicalSize()` — linhas 1513–1513 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `miniMapScale()` — linhas 1514–1514 — return=1 — chama: nenhuma função nomeada detectada
- [x] `drawMiniMap()` — linhas 1515–1523 — if=6, for=2, return=1 — chama: miniMapLogicalSize, miniMapScale, miniPoint, remainingRoute
- [x] `updateNavigation()` — linhas 1524–1524 — if=4, else=1, return=2 — chama: beep, drawMiniMap, routeProgressInfo, saveState, toast, updateRouteGuide
- [x] `routeSvgMarkup()` — linhas 1525–1587 — return=1 — chama: playerDisplayName, worldToMap
- [x] `mapLocationDetails()` — linhas 1588–1588 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `worldToMap()` — linhas 1589–1589 — return=1 — chama: nenhuma função nomeada detectada
- [x] `missionMapLocations()` — linhas 1590–1595 — if=3, return=1 — chama: serviceVehicleMapLocation
- [x] `onlinePlayerMapLocations()` — linhas 1596–1596 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentMapLocations()` — linhas 1597–1597 — if=1, for=1, return=1 — chama: coopMissionMapLocations
- [x] `mapDistance()` — linhas 1598–1599 — return=1 — chama: nenhuma função nomeada detectada
- [x] `mapMarkerPlacements()` — linhas 1600–1635 — if=5, else=2, for=4, return=4 — chama: worldToMap

## `08-map-parent-settings.js`

- [x] `applyMapMarkerPlacements()` — linhas 1636–1644 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `mapVisualNodes()` — linhas 1645–1656 — if=3, else=1, for=3, return=1 — chama: worldToMap
- [x] `mapClusterSelectionMarkup()` — linhas 1657–1657 — return=1 — chama: mapDistance
- [x] `mapSelectionMarkup()` — linhas 1658–1661 — if=2, return=3 — chama: currentMapLocations, mapClusterSelectionMarkup, mapDistance, mapLocationDetails
- [x] `setWaypoint()` — linhas 1662–1666 — if=1, return=1 — chama: buildRoutePoints, closeModal, currentMapLocations, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `clearWaypoint()` — linhas 1667–1667 — sem fluxo contado — chama: closeModal, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `openMap()` — linhas 1668–1684 — if=4, return=4 — chama: applyMapMarkerPlacements, buildRoutePoints, currentMapLocations, mapDistance, mapMarkerPlacements, mapSelectionMarkup, mapVisualNodes, openModal, routeProgressInfo, routeSvgMarkup, setWaypoint, worldToMap
- [x] `refreshOpenMapAfterResize()` — linhas 1685–1687 — if=2, return=1 — chama: openMap
- [x] `performLocalReset()` — linhas 1688–1690 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openFinalResetConfirmation()` — linhas 1691–1696 — if=3, return=2 — chama: commitState, confirmModal, openModal, performLocalReset
- [x] `formatPlayTime()` — linhas 1697–1725 — if=7, catch=4, return=6 — chama: accountLinked, confirmModal, escapeHtml, normalizeState, openFinalResetConfirmation, openModal, openSettings, publicPlayerName, saveState, toast
- [x] `openParentGate()` — linhas 1726–1736 — if=5, return=3 — chama: accountLinked, openModal, openSettings
- [x] `openSettings()` — linhas 1737–1787 — if=11, else=6 — chama: accountStatusText, applyQuality, closeChallengePrompt, closeModal, commitState, hasValidPlayerName, multiplayerStatusText, openAccountCenter, openEducationHub, openModal, openParentGate, openPlayerNameModal (+8)
- [x] `syncMobilePanels()` — linhas 1788–1836 — if=16, catch=1, return=1, throw=2 — chama: openObjectivesPanel, saveState

## `09-responsive-ar-quality-diagnostics.js`

- [x] `otthiGameModelUrl()` — linhas 1837–1840 — return=1 — chama: nenhuma função nomeada detectada
- [x] `androidSceneViewerUrl()` — linhas 1841–1850 — return=1 — chama: otthiGameModelUrl
- [x] `isAndroidDevice()` — linhas 1851–1854 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openAndroidSceneViewer()` — linhas 1855–1896 — if=5, catch=2, return=4 — chama: androidSceneViewerUrl, isAndroidDevice, openModal, toast
- [x] `detectStableAutoTier()` — linhas 1897–1916 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `vehiclePlayerMode()` — linhas 1917–1923 — if=3, return=4 — chama: nenhuma função nomeada detectada
- [x] `derivePlayerMode()` — linhas 1924–1934 — if=8, return=9 — chama: vehiclePlayerMode
- [x] `auditPlayerMode()` — linhas 1935–1950 — if=7, return=1 — chama: derivePlayerMode
- [x] `isOnFootMode()` — linhas 1951–1951 — return=1 — chama: derivePlayerMode
- [x] `canEnterMobility()` — linhas 1952–1956 — if=1, return=2 — chama: auditPlayerMode, isOnFootMode
- [x] `cameraRelativeVector()` — linhas 1957–1961 — return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeControlIntent()` — linhas 1962–1969 — if=2, return=3 — chama: cameraRelativeVector, derivePlayerMode
- [x] `requestedQuality()` — linhas 1970–1970 — return=1 — chama: nenhuma função nomeada detectada
- [x] `qualityLabel()` — linhas 1971–1971 — return=1 — chama: qualityTier, requestedQuality
- [x] `qualityTier()` — linhas 1972–1972 — return=1 — chama: requestedQuality
- [x] `targetDpr()` — linhas 1973–1978 — if=2, return=3 — chama: qualityTier
- [x] `applyAdaptiveRenderSettings()` — linhas 1979–1988 — if=4, return=1 — chama: applyVisualQualityBudget, qualityTier, scheduleStableResize, targetDpr
- [x] `samplePerformance()` — linhas 1989–2008 — if=6, else=2, return=2 — chama: applyAdaptiveRenderSettings, lockStableSceneVisibility, requestedQuality, saveState, toast
- [x] `lockStableSceneVisibility()` — linhas 2009–2015 — if=4, for=3 — chama: qualityTier, visualQualityProfile
- [x] `freezeWorldFrustumCulling()` — linhas 2016–2031 — if=4, else=1, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `updateVisualLOD()` — linhas 2032–2038 — if=1, for=1 — chama: updateManagedOutlineVisibility, updateManagedVisualLODs
- [x] `pwaInstalled()` — linhas 2039–2039 — return=1 — chama: nenhuma função nomeada detectada
- [x] `activeVehicleCount()` — linhas 2040–2040 — return=1 — chama: nenhuma função nomeada detectada
- [x] `runtimeDiagnostics()` — linhas 2041–2044 — return=1 — chama: activeVehicleCount, auditPlayerMode, avatarFoundationDiagnostics, pwaInstalled, visualFoundationDiagnostics
- [x] `ensureTechnicalPanel()` — linhas 2045–2047 — if=1, return=2 — chama: toggleTechnicalPanel
- [x] `refreshTechnicalPanel()` — linhas 2048–2048 — if=1, return=1 — chama: ensureTechnicalPanel, qualityTier, runtimeDiagnostics
- [x] `toggleTechnicalPanel()` — linhas 2049–2049 — if=1 — chama: ensureTechnicalPanel, refreshTechnicalPanel
- [x] `initTechnicalPanel()` — linhas 2050–2053 — if=2 — chama: toggleTechnicalPanel
- [x] `playerScaleValue()` — linhas 2054–2056 — return=1 — chama: nenhuma função nomeada detectada
- [x] `skillReady()` — linhas 2057–2057 — if=1, return=2 — chama: toast
- [x] `recordAdvancedSkill()` — linhas 2058–2063 — for=1 — chama: advanceAdventure, saveState, trackDaily, updateAbilityUI
- [x] `collectCrystal()` — linhas 2064–2066 — if=1, return=2 — chama: addCoins, addXP, beep, checkActiveJob, evaluateMissions, saveState, toast, trackDaily, vibrate
- [x] `syncPlayerRootScale()` — linhas 2067–2076 — if=2, return=2 — chama: playerScaleValue

## `10-player-skills.js`

- [x] `setScaleMode()` — linhas 2077–2096 — if=10, else=2, for=2, return=7 — chama: beep, damageEnemy, recordAdvancedSkill, saveState, skillReady, spawnDust, toast, trackDaily, updateAbilityUI, vibrate
- [x] `toggleCrouch()` — linhas 2097–2106 — if=3, return=3 — chama: beep, playerDisplayName, recordAdvancedSkill, saveState, skillReady, toast, updateAbilityUI
- [x] `spinPlayer()` — linhas 2107–2113 — if=3, for=2, return=1 — chama: addXP, beep, collectCrystal, damageEnemy, recordAdvancedSkill, skillReady, toast
- [x] `updateAbilityUI()` — linhas 2114–2120 — if=2, for=2 — chama: nenhuma função nomeada detectada
- [x] `canvasTexture()` — linhas 2121–2157 — if=11, else=9, for=24, return=2 — chama: nenhuma função nomeada detectada

## `11-render-materials-player-model.js`

- [x] `professionalTexture()` — linhas 2158–2165 — if=1, else=1, return=1 — chama: canvasTexture, registerVisualAsset, updateVisualAsset
- [x] `initMaterials()` — linhas 2166–2212 — for=1 — chama: canvasTexture, professionalTexture, registerVisualAsset
- [x] `mat()` — linhas 2213–2221 — return=1 — chama: nenhuma função nomeada detectada
- [x] `geometryKey()` — linhas 2222–2222 — return=1 — chama: nenhuma função nomeada detectada
- [x] `sharedBoxGeometry()` — linhas 2223–2228 — if=1, else=1, return=1 — chama: geometryKey
- [x] `sharedCylinderGeometry()` — linhas 2229–2234 — if=1, else=1, return=1 — chama: geometryKey
- [x] `renderMat()` — linhas 2235–2241 — if=1, else=1, return=1 — chama: mat
- [x] `tintedBrickMaterial()` — linhas 2242–2246 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `texturedRoofMaterial()` — linhas 2247–2249 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `visualCacheHasValue()` — linhas 2250–2254 — if=2, for=1, return=3 — chama: nenhuma função nomeada detectada
- [x] `visualCacheOwnsGeometry()` — linhas 2255–2257 — return=1 — chama: visualCacheHasValue
- [x] `visualCacheOwnsMaterial()` — linhas 2258–2260 — return=1 — chama: visualCacheHasValue
- [x] `visualCacheOwnsTexture()` — linhas 2261–2261 — return=1 — chama: nenhuma função nomeada detectada
- [x] `disposeDetachedVisual()` — linhas 2262–2281 — if=6, for=1, return=1 — chama: visualCacheOwnsGeometry, visualCacheOwnsMaterial, visualCacheOwnsTexture
- [x] `addSoftHighlight()` — linhas 2282–2286 — return=1 — chama: sharedBoxGeometry
- [x] `box()` — linhas 2287–2291 — return=1 — chama: renderMat, sharedBoxGeometry
- [x] `stabilizeSurface()` — linhas 2292–2292 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `stableBox()` — linhas 2293–2293 — return=1 — chama: box, stabilizeSurface
- [x] `cylinder()` — linhas 2294–2298 — return=1 — chama: renderMat, sharedCylinderGeometry
- [x] `addGlow()` — linhas 2299–2302 — return=1 — chama: nenhuma função nomeada detectada
- [x] `addVoxelOutline()` — linhas 2303–2312 — if=3, return=2 — chama: nenhuma função nomeada detectada
- [x] `premiumBox()` — linhas 2313–2315 — return=1 — chama: addVoxelOutline, box
- [x] `premiumCylinder()` — linhas 2316–2318 — return=1 — chama: addVoxelOutline, cylinder
- [x] `makeWindow()` — linhas 2319–2322 — return=1 — chama: mat, premiumBox
- [x] `makePlanter()` — linhas 2323–2326 — for=1, return=1 — chama: premiumBox
- [x] `createPlayerModel()` — linhas 2327–2389 — if=3, for=2 — chama: addSoftHighlight, addVoxelOutline, box, createAvatarRigFoundation, mat, multiplayerNameTexture, playerDisplayName, refreshEquippedToolVisual, renderMat, sharedCylinderGeometry
- [x] `loadFaithfulAthosModel()` — linhas 2390–2395 — return=1 — chama: nenhuma função nomeada detectada
- [x] `clearAvatarLayer()` — linhas 2396–2403 — if=2, for=1, catch=1 — chama: disposeDetachedVisual
- [x] `avatarPartLayer()` — linhas 2404–2408 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `addUniformPatch()` — linhas 2409–2412 — return=1 — chama: signTexture
- [x] `addUniformLimb()` — linhas 2413–2415 — if=1 — chama: box
- [x] `uniformPalette()` — linhas 2416–2428 — return=1 — chama: nenhuma função nomeada detectada
- [x] `dressAnimatedAvatar()` — linhas 2429–2449 — if=4, for=2, return=2 — chama: avatarPartLayer, box, mat, uniformPalette
- [x] `applyAvatarCustomization()` — linhas 2450–2480 — if=19, else=12, for=1, return=1 — chama: addUniformPatch, box, clearAvatarLayer, dressAnimatedAvatar, effectiveAvatarUniform, mat
- [x] `registerCollider()` — linhas 2481–2481 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `registerPlatform()` — linhas 2482–2482 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `registerInteractable()` — linhas 2483–2483 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldPos()` — linhas 2484–2487 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `isInteractionAvailable()` — linhas 2488–2494 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `ensureFlowerBatch()` — linhas 2495–2508 — if=2, return=1 — chama: renderMat, sharedBoxGeometry
- [x] `createTree()` — linhas 2509–2530 — if=2, return=1 — chama: box, collectResource, createManagedLOD, registerInteractable, renderMat

## `12-world-resources-nature.js`

- [x] `createRock()` — linhas 2531–2536 — if=1, return=1 — chama: collectResource, createManagedLOD, registerInteractable, sharedBoxGeometry
- [x] `createGoldFoundry()` — linhas 2537–2544 — return=1 — chama: premiumBox, registerCollider, registerInteractable, renderMat, signTexture, texturedRoofMaterial
- [x] `createGoldMine()` — linhas 2545–2558 — for=2, return=1 — chama: collectResource, createLamp, createSignpost, premiumBox, registerInteractable, renderMat
- [x] `createVillageWell()` — linhas 2559–2567 — for=1, return=1 — chama: createSignpost, premiumBox, premiumCylinder, registerInteractable
- [x] `drawWaterFromWell()` — linhas 2568–2572 — if=3, return=2 — chama: addXP, advanceAdventure, playToolAnimation, saveState, toast, updateHUD
- [x] `createFlower()` — linhas 2573–2582 — if=2 — chama: ensureFlowerBatch
- [x] `createLamp()` — linhas 2583–2590 — return=1 — chama: addGlow, box, renderMat
- [x] `createSignpost()` — linhas 2591–2596 — return=1 — chama: box, signTexture
- [x] `createFenceLine()` — linhas 2597–2600 — for=1 — chama: box
- [x] `createRoad()` — linhas 2601–2618 — if=1, else=1, for=2 — chama: renderMat, stableBox
- [x] `createWater()` — linhas 2619–2619 — for=1 — chama: stableBox
- [x] `createLava()` — linhas 2620–2621 — return=1 — chama: mat, stableBox
- [x] `createFurniture()` — linhas 2622–2683 — if=16, for=15, return=1 — chama: box, cylinder, premiumBox, premiumCylinder, renderMat, shadeColor
- [x] `signTexture()` — linhas 2684–2714 — if=3, else=2, for=1, while=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `shadeColor()` — linhas 2715–2720 — return=1 — chama: nenhuma função nomeada detectada
- [x] `decorateHouseCommercial()` — linhas 2721–2737 — if=3, else=1, for=1 — chama: addVoxelOutline, box, makePlanter, premiumBox, shadeColor
- [x] `createHouse()` — linhas 2738–2764 — if=1, for=1, return=1 — chama: box, createFlower, createLamp, decorateHouseCommercial, makeWindow, registerCollider, registerInteractable, renderMat, shadeColor, signTexture, texturedRoofMaterial, tintedBrickMaterial

## `13-houses-npcs-vehicles-base.js`

- [x] `addHouseInterior()` — linhas 2765–2812 — if=7, else=6, for=11 — chama: addGlow, createFurniture, exitHouse, premiumBox, premiumCylinder, registerActivity, registerInteractable
- [x] `registerActivity()` — linhas 2813–2816 — sem fluxo contado — chama: activityIcon, registerInteractable, useActivity
- [x] `activityIcon()` — linhas 2817–2818 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createNPC()` — linhas 2819–2837 — if=4, else=1, for=2, return=1 — chama: addVoxelOutline, box, iconTexture, registerInteractable, renderMat, shadeColor, talkToNPC
- [x] `createNpcMobility()` — linhas 2838–2851 — if=5, else=3, for=4, return=3 — chama: addVoxelOutline, nearestRoadProjection, premiumBox, premiumCylinder
- [x] `createEnemy()` — linhas 2852–2858 — if=2, else=2, return=1 — chama: box
- [x] `createCrystal()` — linhas 2859–2862 — sem fluxo contado — chama: addGlow, mat
- [x] `createChest()` — linhas 2863–2865 — if=1, return=1 — chama: box, openChest, registerInteractable
- [x] `createPlatform()` — linhas 2866–2866 — sem fluxo contado — chama: box, registerPlatform
- [x] `vehicleById()` — linhas 2867–2867 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentVehicleRef()` — linhas 2868–2868 — if=3, return=4 — chama: vehicleById
- [x] `applyVehicleAppearance()` — linhas 2869–2873 — if=2, return=1 — chama: applyServiceVehicleVisual
- [x] `persistParkedVehicle()` — linhas 2874–2876 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `createToyCar()` — linhas 2877–2889 — if=2, for=1, return=1 — chama: addVoxelOutline, box, cylinder, enterVehicle, registerInteractable, renderMat
- [x] `createWaypointMarker()` — linhas 2890–2895 — sem fluxo contado — chama: box, mat, updateWaypointMarker
- [x] `updateWaypointMarker()` — linhas 2896–2900 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `createAthleticsGym()` — linhas 2901–2923 — for=6 — chama: createLamp, openRaceCenter, premiumBox, registerInteractable, renderMat, signTexture
- [x] `createSizeChallenges()` — linhas 2924–2941 — if=3, return=3 — chama: addXP, box, registerInteractable, setFlag, toast
- [x] `createSkyDome()` — linhas 2942–2957 — for=1 — chama: renderMat, sharedBoxGeometry
- [x] `updateClouds()` — linhas 2958–2962 — if=3, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `createVoxelMushroom()` — linhas 2963–2971 — if=1, return=1 — chama: addVoxelOutline, box, renderMat, shadeColor
- [x] `iconTexture()` — linhas 2972–2974 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createChallengeCube()` — linhas 2975–2975 — return=1 — chama: box, iconTexture
- [x] `createPortalArch()` — linhas 2976–2981 — for=1, return=1 — chama: addGlow, box, mat
- [x] `createPlayground()` — linhas 2982–2985 — for=1, return=1 — chama: box
- [x] `createFountain()` — linhas 2986–2986 — return=1 — chama: addGlow, cylinder, mat
- [x] `createAwning()` — linhas 2987–2987 — for=1, return=1 — chama: box
- [x] `createStreetTree()` — linhas 2988–2995 — return=1 — chama: box, createManagedLOD, makePlanter, premiumBox

## `14-world-district-decoration.js`

- [x] `createBackdropBuilding()` — linhas 2996–3006 — for=2, return=1 — chama: addVoxelOutline, box, createManagedLOD, renderMat, shadeColor
- [x] `createFloatingIsland()` — linhas 3007–3010 — for=1, return=1 — chama: addVoxelOutline, mat, premiumBox
- [x] `createCoinTrail()` — linhas 3011–3013 — sem fluxo contado — chama: mat
- [x] `createCommercialDistrict()` — linhas 3014–3022 — sem fluxo contado — chama: createBackdropBuilding, createCoinTrail, createFloatingIsland, createStreetTree
- [x] `createDistrictVisuals()` — linhas 3023–3054 — sem fluxo contado — chama: createAwning, createChallengeCube, createCommercialDistrict, createFountain, createPlayground, createPortalArch, createVoxelMushroom
- [x] `compactBusPath()` — linhas 3055–3057 — if=3, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `projectedBusPoint()` — linhas 3058–3058 — return=1 — chama: nearestRoadProjection
- [x] `offsetBusPath()` — linhas 3059–3066 — if=2, for=1, return=4 — chama: compactBusPath, pointOnRoad
- [x] `buildBusRoadPath()` — linhas 3067–3080 — if=4, for=2, return=3 — chama: buildRoutePoints, compactBusPath, nearestRoadProjection, offsetBusPath, projectedBusPoint
- [x] `busRoutePoints()` — linhas 3081–3081 — return=1 — chama: nenhuma função nomeada detectada
- [x] `busNextStop()` — linhas 3082–3082 — if=1, for=1, return=2 — chama: busRoutePoints
- [x] `nearestForwardBusSegment()` — linhas 3083–3087 — if=2, for=1, return=2 — chama: projectPointToSegment

## `15-transit-bus-metro.js`

- [x] `recoverBusRoute()` — linhas 3088–3091 — if=2, return=2 — chama: busRoutePoints, nearestForwardBusSegment, projectPointToPolyline, setBusState
- [x] `setBusState()` — linhas 3092–3094 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `setBusWaiting()` — linhas 3095–3097 — return=1 — chama: saveState
- [x] `clearBusWaiting()` — linhas 3098–3098 — if=1 — chama: saveState
- [x] `restoreBusWaiting()` — linhas 3099–3099 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `busStopRecord()` — linhas 3100–3100 — return=1 — chama: nenhuma função nomeada detectada
- [x] `safeBusExitPoint()` — linhas 3101–3106 — if=1, return=2 — chama: busStopRecord, groundHeightAt, positionBlockedForPlayer, safePointNear
- [x] `createMetroEntrance()` — linhas 3107–3115 — for=2, return=1 — chama: iconTexture, openMetroStation, premiumBox, registerInteractable
- [x] `ensureMetroOverlay()` — linhas 3116–3118 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `openMetroStation()` — linhas 3119–3123 — if=2, return=1 — chama: openModal, rideMetroTo, toast
- [x] `rideMetroTo()` — linhas 3124–3137 — if=9, return=3 — chama: advanceAdventure, auditPlayerMode, canEnterMobility, clearMovementInputs, closeModal, ensureMetroOverlay, rememberSafePlayerPosition, safePointNear, saveState, setFlag, toast, trackDaily (+2)
- [x] `ensureBusStop()` — linhas 3138–3141 — if=2, return=2 — chama: iconTexture, openBusStop, premiumBox, registerInteractable
- [x] `busSpawnIndex()` — linhas 3142–3144 — if=2, for=1, return=2 — chama: pointOnRoad, trafficActorList
- [x] `createBusModel()` — linhas 3145–3167 — if=2, for=9, return=1 — chama: buildBusRoadPath, busSpawnIndex, ensureBusStop, enterBus, premiumBox, premiumCylinder, registerInteractable, renderMat, signTexture
- [x] `createTransitWorld()` — linhas 3168–3168 — for=1 — chama: createBusModel, restoreBusWaiting, validateBusCoverage
- [x] `busAtStop()` — linhas 3169–3169 — return=1 — chama: nenhuma função nomeada detectada
- [x] `busEtaSeconds()` — linhas 3170–3170 — if=3, for=1, return=4 — chama: busAtStop, busRoutePoints
- [x] `validateBusCoverage()` — linhas 3171–3171 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `busDestinationsAfter()` — linhas 3172–3174 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `openBusArrivalOffer()` — linhas 3175–3184 — if=2, return=3 — chama: busAtStop, busDestinationsAfter, clearBusWaiting, closeModal, enterBus, openModal, setBusState, setBusWaiting, toast
- [x] `offerBusAtStop()` — linhas 3185–3191 — if=6, else=1, return=4 — chama: busAtStop, openBusArrivalOffer
- [x] `openBusStop()` — linhas 3192–3203 — return=1 — chama: busAtStop, busEtaSeconds, clearBusWaiting, closeModal, openBusArrivalOffer, openModal, setBusWaiting, toast
- [x] `ensureTransitPanel()` — linhas 3204–3206 — if=2, return=3 — chama: toast, updateTransitPanel
- [x] `updateTransitPanel()` — linhas 3207–3209 — if=1, return=1 — chama: busNextStop, ensureTransitPanel
- [x] `enterBus()` — linhas 3210–3220 — if=8, return=4 — chama: auditPlayerMode, busAtStop, canEnterMobility, clearBusWaiting, clearMovementInputs, closeModal, saveState, setBusState, toast, updateTransitPanel
- [x] `exitBusAtStop()` — linhas 3221–3229 — if=7, return=2 — chama: advanceAdventure, auditPlayerMode, busAtStop, busStopRecord, rememberSafePlayerPosition, safeBusExitPoint, saveState, setBusState, setFlag, toast, trackDaily, updateContext (+1)
- [x] `updateTransitWorld()` — linhas 3230–3275 — if=31, else=11, for=2 — chama: busRoutePoints, exitBusAtStop, offerBusAtStop, pointOnRoad, recoverBusRoute, setBusState, trafficSpeedFactor, updateTransitPanel
- [x] `decorateCityServices()` — linhas 3276–3296 — if=1, for=5 — chama: iconTexture, premiumBox, premiumCylinder
- [x] `serviceKindForJob()` — linhas 3297–3297 — return=1 — chama: nenhuma função nomeada detectada
- [x] `serviceVehiclePools()` — linhas 3298–3298 — if=3, return=4 — chama: nenhuma função nomeada detectada
- [x] `serviceVehicleById()` — linhas 3299–3299 — return=1 — chama: serviceVehiclePools
- [x] `currentServiceMissionJob()` — linhas 3300–3300 — return=1 — chama: activeCoopServiceJob
- [x] `serviceVehicleAvailable()` — linhas 3301–3301 — if=1, return=2 — chama: currentServiceMissionJob
- [x] `serviceVehicleAppearance()` — linhas 3302–3302 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `safeServiceDepot()` — linhas 3303–3303 — if=2, for=1, return=1 — chama: nearestRoadProjection, trafficActorList
- [x] `registerServiceVehicle()` — linhas 3304–3307 — return=1 — chama: currentServiceMissionJob, enterServiceVehicle, registerInteractable, safeServiceDepot, serviceVehicleAppearance, serviceVehicleAvailable
- [x] `enterServiceVehicle()` — linhas 3308–3310 — if=3, return=4 — chama: currentServiceMissionJob, enterVehicle, serviceKindForJob, serviceMissionVehicle, serviceVehicleAvailable, toast

## `16-emergency-services.js`

- [x] `serviceMissionVehicle()` — linhas 3311–3311 — return=1 — chama: currentServiceMissionJob, serviceVehicleById
- [x] `serviceVehicleMapLocation()` — linhas 3312–3312 — if=1, return=2 — chama: currentServiceMissionJob, serviceKindForJob, serviceMissionVehicle
- [x] `reserveMissionServiceVehicle()` — linhas 3313–3315 — if=4, return=3 — chama: buildRoutePoints, currentServiceMissionJob, serviceKindForJob, serviceMissionVehicle, serviceVehicleAvailable, serviceVehiclePools, setMissionState, toast, updateNavigation, updateWaypointMarker
- [x] `releaseMissionServiceVehicle()` — linhas 3316–3316 — if=2 — chama: serviceMissionVehicle
- [x] `isDrivingServiceVehicle()` — linhas 3317–3317 — return=1 — chama: nenhuma função nomeada detectada
- [x] `onServiceVehicleBoarded()` — linhas 3318–3318 — if=3, else=1, return=1 — chama: currentServiceMissionJob, focusActiveJob, onCoopServiceVehicleBoarded, saveState, serviceKindForJob, setMissionState
- [x] `onServiceVehicleExited()` — linhas 3319–3319 — if=1, return=1 — chama: currentServiceMissionJob, saveState
- [x] `returnServiceVehicleHome()` — linhas 3320–3320 — if=2, return=1 — chama: moveServiceVehicle
- [x] `createFireIncidentSite()` — linhas 3321–3324 — for=2, return=1 — chama: helpExtinguishFire, mat, registerInteractable, renderMat
- [x] `createFireTruck()` — linhas 3325–3330 — for=3, return=1 — chama: premiumBox, premiumCylinder, registerServiceVehicle, renderMat
- [x] `createFireServiceWorld()` — linhas 3331–3331 — sem fluxo contado — chama: createFireTruck
- [x] `activateFireIncident()` — linhas 3332–3332 — if=2, return=3 — chama: saveState, toast
- [x] `ensureActiveFire()` — linhas 3333–3333 — return=1 — chama: activateFireIncident
- [x] `helpExtinguishFire()` — linhas 3334–3334 — if=7, for=1, return=5 — chama: extinguishFireIncident, setMissionState, spawnDust, toast
- [x] `extinguishFireIncident()` — linhas 3335–3335 — if=5, for=1, return=1 — chama: addXP, completeActiveJob, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `serviceVehicleRoute()` — linhas 3336–3336 — if=1, return=1 — chama: buildRoutePoints
- [x] `moveServiceVehicle()` — linhas 3337–3338 — if=5, for=1, return=5 — chama: serviceVehicleRoute, snapTrafficToRoad, trafficSpeedFactor
- [x] `updateFireService()` — linhas 3339–3350 — if=12, else=1, for=2, return=1 — chama: activateFireIncident, extinguishFireIncident, moveServiceVehicle, returnServiceVehicleHome, spawnDust
- [x] `createPoliceCar()` — linhas 3351–3359 — if=1, for=1, return=1 — chama: addVoxelOutline, iconTexture, mat, premiumBox, premiumCylinder, registerServiceVehicle, renderMat
- [x] `createAmbulance()` — linhas 3360–3366 — for=1, return=1 — chama: premiumBox, premiumCylinder, registerServiceVehicle, renderMat
- [x] `createPoliceSystem()` — linhas 3367–3371 — sem fluxo contado — chama: createAmbulance, createPoliceCar
- [x] `movePoliceToward()` — linhas 3372–3375 — if=3, for=1, return=3 — chama: snapTrafficToRoad, trafficSpeedFactor
- [x] `updatePolicePatrol()` — linhas 3376–3378 — if=1 — chama: movePoliceToward
- [x] `updateSafetyPanel()` — linhas 3379–3381 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `startPoliceAlert()` — linhas 3382–3386 — if=2, return=3 — chama: saveState, toast, updateSafetyPanel
- [x] `finishSafetyStop()` — linhas 3387–3390 — if=2, return=1 — chama: clearMovementInputs, exitVehicle, groundHeightAt, openSafetyLesson, saveState, updateSafetyPanel
- [x] `openSafetyLesson()` — linhas 3391–3400 — if=1 — chama: addReputation, addXP, awardMedal, closeModal, openModal, saveState, toast
- [x] `updatePoliceSystem()` — linhas 3401–3412 — if=14, else=3, for=2 — chama: finishSafetyStop, movePoliceToward, npcSpeech, returnServiceVehicleHome, startPoliceAlert, updatePolicePatrol, updateSafetyPanel
- [x] `moveIncidentResponder()` — linhas 3413–3418 — if=6, for=1, return=5 — chama: buildRoutePoints, snapTrafficToRoad, trafficSpeedFactor
- [x] `incidentServiceLabel()` — linhas 3419–3419 — return=1 — chama: nenhuma função nomeada detectada
- [x] `lockIncidentActor()` — linhas 3420–3420 — if=3, return=1 — chama: setBusState
- [x] `separateIncidentActors()` — linhas 3421–3421 — if=3, return=2 — chama: snapTrafficToRoad
- [x] `createIncidentVisual()` — linhas 3422–3422 — if=1, for=2, return=1 — chama: premiumBox, premiumCylinder, renderMat
- [x] `createTrafficIncidentAt()` — linhas 3423–3427 — if=3, for=1, return=2 — chama: assistTrafficIncident, createIncidentVisual, dispatchIncidentResponders, lockIncidentActor, nearestRoadProjection, registerInteractable, saveState, separateIncidentActors, toast
- [x] `createTrafficIncident()` — linhas 3428–3428 — if=1, return=2 — chama: createTrafficIncidentAt
- [x] `ensureActiveTrafficIncident()` — linhas 3429–3429 — if=2, return=3 — chama: createTrafficIncidentAt, nearestRoadProjection
- [x] `dispatchIncidentResponder()` — linhas 3430–3433 — if=2, return=3 — chama: reserveMissionServiceVehicle, serviceKindForJob, serviceVehicleAvailable, serviceVehiclePools
- [x] `dispatchIncidentResponders()` — linhas 3434–3434 — sem fluxo contado — chama: dispatchIncidentResponder
- [x] `assistTrafficIncident()` — linhas 3435–3437 — if=5, for=1, return=6 — chama: saveState, serviceKindForJob, setMissionState, spawnDust, toast
- [x] `markPlayerIncidentArrival()` — linhas 3438–3438 — if=3, return=3 — chama: isDrivingServiceVehicle, saveState, serviceKindForJob, setMissionState, toast, updateNavigation, updateWaypointMarker
- [x] `releaseIncidentActorStates()` — linhas 3439–3439 — if=2, for=1 — chama: setBusState
- [x] `resolveTrafficIncident()` — linhas 3440–3444 — if=5, for=3, return=1 — chama: completeActiveJob, releaseIncidentActorStates, saveState, serviceKindForJob, toast
- [x] `updateTrafficIncidents()` — linhas 3445–3457 — if=13, else=1, for=6, return=3 — chama: createTrafficIncident, markPlayerIncidentArrival, moveIncidentResponder, resolveTrafficIncident, returnServiceVehicleHome, trafficActorList
- [x] `openTransitGuide()` — linhas 3458–3460 — sem fluxo contado — chama: openModal, setWaypoint
- [x] `createRoyalCastle()` — linhas 3461–3486 — for=10, return=1 — chama: addGlow, createCastleChallengeTokens, createSignpost, exitHouse, mat, premiumBox, premiumCylinder, registerInteractable, renderMat, toast
- [x] `createCastleChallengeTokens()` — linhas 3487–3489 — return=1 — chama: mat
- [x] `openAdventureHub()` — linhas 3490–3492 — sem fluxo contado — chama: openModal, startAdventure
- [x] `startAdventure()` — linhas 3493–3495 — if=3, for=1, return=3 — chama: closeModal, saveState, setWaypoint, toast

## ``

- [x] `restoreActiveAdventure()` — linhas 3496–3501 — if=2, for=1, return=2 — chama: nenhuma função nomeada detectada

## `17-adventures-learning-world.js`

- [x] `advanceAdventure()` — linhas 3502–3504 — if=3, else=1, return=2 — chama: beep, finishAdventure, saveState
- [x] `finishAdventure()` — linhas 3505–3507 — if=4, else=1, for=1, return=1 — chama: addCoins, addReputation, addXP, awardMedal, saveState, setFlag, toast
- [x] `updateAdventure()` — linhas 3508–3510 — if=6, for=1, return=2 — chama: advanceAdventure, finishAdventure
- [x] `createLearningStation()` — linhas 3511–3513 — return=1 — chama: iconTexture, mat, openEducationHub, premiumBox, registerInteractable
- [x] `createLearningPlaza()` — linhas 3514–3520 — sem fluxo contado — chama: createLearningStation, createSignpost
- [x] `rectOverlap()` — linhas 3521–3521 — return=1 — chama: nenhuma função nomeada detectada
- [x] `insideWater()` — linhas 3522–3522 — return=1 — chama: nenhuma função nomeada detectada
- [x] `waterAt()` — linhas 3523–3523 — return=1 — chama: insideWater
- [x] `isInsideLakeNavigable()` — linhas 3524–3524 — return=1 — chama: nenhuma função nomeada detectada
- [x] `isNearFishingArea()` — linhas 3525–3525 — return=1 — chama: nenhuma função nomeada detectada
- [x] `resolveWaterWalking()` — linhas 3526–3528 — if=3, return=2 — chama: groundHeightAt, toast, waterAt
- [x] `distanceToBoatDock()` — linhas 3529–3529 — return=1 — chama: nenhuma função nomeada detectada
- [x] `validBoatExit()` — linhas 3530–3530 — return=1 — chama: distanceToBoatDock
- [x] `safeBoatExitPoint()` — linhas 3531–3532 — return=1 — chama: nenhuma função nomeada detectada
- [x] `ensureFishingVisual()` — linhas 3533–3546 — if=1, return=2 — chama: renderMat
- [x] `setFishingLine()` — linhas 3547–3547 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `fishingCastTarget()` — linhas 3548–3554 — if=2, else=1, return=1 — chama: isInsideLakeNavigable
- [x] `beginFishingVisual()` — linhas 3555–3568 — if=2, return=1 — chama: ensureFishingVisual, fishingCastTarget, setFishingLine

## `18-water-fishing-boats.js`

- [x] `castFishingVisual()` — linhas 3569–3569 — if=1, return=1 — chama: beep, ensureFishingVisual, fishingCastTarget
- [x] `hookFishingVisual()` — linhas 3570–3570 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `pullFishingVisual()` — linhas 3571–3571 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `restoreFishingCamera()` — linhas 3572–3575 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `stopFishingVisual()` — linhas 3576–3582 — if=4, else=1, return=2 — chama: restoreFishingCamera, setFishingUiActive
- [x] `clearFishingTimers()` — linhas 3583–3583 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `setFishingUiActive()` — linhas 3584–3588 — if=1 — chama: scheduleStableResize, syncMobilePanels
- [x] `cancelFishingSession()` — linhas 3589–3589 — sem fluxo contado — chama: clearFishingTimers, stopFishingVisual
- [x] `ensureFishingModalStyle()` — linhas 3590–3600 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `updateFishingVisual()` — linhas 3601–3611 — if=11, else=6, return=1 — chama: setFishingLine, stopFishingVisual
- [x] `createShoreFisher()` — linhas 3612–3617 — return=1 — chama: createNPC, premiumCylinder, renderMat
- [x] `createShoreFishingLife()` — linhas 3618–3622 — if=1, return=1 — chama: createShoreFisher
- [x] `updateShoreFishers()` — linhas 3623–3626 — if=3, for=1 — chama: nenhuma função nomeada detectada
- [x] `createBoatModel()` — linhas 3627–3631 — sem fluxo contado — chama: premiumBox, registerInteractable, renderMat
- [x] `ensureBoatPanel()` — linhas 3632–3634 — if=1, return=2 — chama: exitBoat, startFishing
- [x] `updateBoatPanel()` — linhas 3635–3644 — if=8, return=6 — chama: auditPlayerMode, boardNpcPassenger, canEnterMobility, ensureBoatPanel, exitVehicle, nearestRideCompanion, saveState, toast, updateVehicleControlsUI
- [x] `enterBoatAsPassenger()` — linhas 3645–3652 — if=4, return=4 — chama: auditPlayerMode, canEnterMobility, exitVehicle, saveState, toast, updateBoatPanel, updateVehicleControlsUI
- [x] `exitBoat()` — linhas 3653–3660 — if=7, else=1, return=3 — chama: auditPlayerMode, groundHeightAt, releaseNpcPassenger, rememberSafePlayerPosition, safeBoatExitPoint, saveState, toast, updateBoatPanel, updateVehicleControlsUI, validBoatExit
- [x] `updateBoatPhysics()` — linhas 3661–3667 — if=6, else=1, return=2 — chama: exitBoat, mobilityThrottleIntent, toast, updateMobilityControlLabels
- [x] `constrainBoat()` — linhas 3668–3668 — if=3, return=1 — chama: isInsideLakeNavigable
- [x] `weightedFish()` — linhas 3669–3669 — if=1, for=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `startFishing()` — linhas 3670–3678 — if=14, return=11 — chama: addCoins, addXP, beep, beginFishingVisual, cancelFishingSession, castFishingVisual, clearFishingTimers, ensureFishingModalStyle, hookFishingVisual, isNearFishingArea, openModal, pullFishingVisual (+6)
- [x] `campfireAllowed()` — linhas 3679–3679 — if=4, return=5 — chama: rectOverlap, waterAt
- [x] `spawnCampfire()` — linhas 3680–3682 — if=1, for=1, return=1 — chama: mat, openCampfire, premiumCylinder, registerInteractable
- [x] `nearestActiveCampfire()` — linhas 3683–3684 — if=3, return=4 — chama: campfireAllowed, confirmModal, saveState, spawnCampfire, toast
- [x] `finishCampfireCooking()` — linhas 3685–3685 — if=1, return=1 — chama: beep, saveState, toast
- [x] `openCampfire()` — linhas 3686–3688 — if=4, return=4 — chama: closeModal, confirmModal, finishCampfireCooking, openModal, saveState, toast, updateHUD
- [x] `openNearestCampfire()` — linhas 3689–3689 — if=1, else=1 — chama: nearestActiveCampfire, openCampfire, toast
- [x] `openCampfireZone()` — linhas 3690–3690 — if=1, else=1 — chama: closeModal, nearestActiveCampfire, openCampfire, openModal
- [x] `createCampfireZone()` — linhas 3691–3691 — for=1 — chama: createSignpost, premiumBox, registerInteractable
- [x] `createForestAnimal()` — linhas 3692–3692 — if=1, for=2, return=1 — chama: premiumBox
- [x] `startHunting()` — linhas 3693–3693 — if=5, else=1, return=2 — chama: addXP, closeModal, openModal, saveState, toast
- [x] `createHuntingArea()` — linhas 3694–3694 — for=1 — chama: createForestAnimal, createSignpost, premiumBox, registerInteractable, startHunting
- [x] `nearestOwnedHouseForExtension()` — linhas 3695–3695 — return=1 — chama: nenhuma função nomeada detectada
- [x] `extensionPlacement()` — linhas 3696–3696 — return=1 — chama: nenhuma função nomeada detectada
- [x] `extensionValid()` — linhas 3697–3708 — if=6, for=1, return=6 — chama: rectOverlap
- [x] `furnitureCatalogForRoom()` — linhas 3709–3709 — return=1 — chama: nenhuma função nomeada detectada
- [x] `furnitureSpec()` — linhas 3710–3710 — return=1 — chama: furnitureCatalogForRoom
- [x] `furnitureForExtension()` — linhas 3711–3711 — return=1 — chama: nenhuma função nomeada detectada
- [x] `furnitureFootprint()` — linhas 3712–3712 — return=1 — chama: furnitureSpec
- [x] `furniturePlacementValid()` — linhas 3713–3713 — if=2, return=3 — chama: furnitureFootprint, furnitureForExtension, rectOverlap
- [x] `disposeFurnitureGroup()` — linhas 3714–3714 — if=1, return=1 — chama: disposeDetachedVisual
- [x] `clearFurniturePreview()` — linhas 3715–3715 — if=1 — chama: disposeFurnitureGroup
- [x] `clearExtensionPreview()` — linhas 3716–3716 — if=1 — chama: clearFurniturePreview, disposeDetachedVisual
- [x] `renderExtensionPreview()` — linhas 3717–3717 — if=2, for=1, return=1 — chama: disposeDetachedVisual, extensionValid

## ``

- [x] `createFurnitureModel()` — linhas 3718–3741 — if=23, else=21, for=14, return=3 — chama: furnitureSpec, mat, premiumBox, shadeColor

## `19-campfire-hunting-house-extensions.js`

- [x] `renderExtensionFurniture()` — linhas 3742–3742 — if=3, for=1, return=1 — chama: createFurnitureModel, disposeFurnitureGroup, furnitureForExtension
- [x] `renderFurniturePreview()` — linhas 3743–3743 — if=1, return=2 — chama: clearFurniturePreview, createFurnitureModel, furniturePlacementValid
- [x] `nextFurnitureSlot()` — linhas 3744–3744 — if=1, for=1, return=2 — chama: furniturePlacementValid
- [x] `openFurniturePlacement()` — linhas 3745–3746 — if=9, else=1, return=6 — chama: addCoins, clearFurniturePreview, closeModal, confirmModal, furniturePlacementValid, furnitureSpec, nextFurnitureSlot, openFurnitureManager, openModal, renderExtensionFurniture, renderFurniturePreview, saveState (+1)
- [x] `openFurnitureManager()` — linhas 3747–3747 — if=1, return=2 — chama: closeModal, furnitureCatalogForRoom, furnitureForExtension, furnitureSpec, openFurniturePlacement, openModal, saveState, toast
- [x] `spawnHouseExtension()` — linhas 3748–3748 — if=1, return=1 — chama: openFurnitureManager, premiumBox, registerInteractable, registerPlatform, renderExtensionFurniture, shadeColor
- [x] `resourcesEnough()` — linhas 3749–3749 — return=1 — chama: nenhuma função nomeada detectada
- [x] `costText()` — linhas 3750–3750 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openHouseExtensionPlanner()` — linhas 3751–3751 — if=3, for=1, return=3 — chama: clearExtensionPreview, closeModal, costText, extensionPlacement, extensionValid, nearestOwnedHouseForExtension, openModal, playerDisplayName, renderExtensionPreview, resourcesEnough, saveState, spawnHouseExtension (+1)
- [x] `openHouseExtensionMenu()` — linhas 3752–3752 — sem fluxo contado — chama: closeModal, costText, openHouseExtensionPlanner, openModal
- [x] `createLakeExpansion()` — linhas 3753–3757 — for=3 — chama: createBoatModel, createShoreFishingLife, createSignpost, premiumBox, premiumCylinder, registerInteractable, registerPlatform, startFishing
- [x] `restoreLifeExpansion()` — linhas 3758–3758 — if=2, for=2 — chama: finishCampfireCooking, spawnCampfire, spawnHouseExtension
- [x] `updateLifeActivities()` — linhas 3759–3762 — if=8, for=2, return=1 — chama: finishCampfireCooking, saveState, updateShoreFishers
- [x] `createLifeExpansionWorld()` — linhas 3763–3763 — sem fluxo contado — chama: applyCloudWorldObjects, createCampfireZone, createHuntingArea, createLakeExpansion, restoreLifeExpansion
- [x] `buildWorld()` — linhas 3764–3824 — if=3, for=9 — chama: addHouseInterior, box, createAthleticsGym, createChest, createCooperativeMissionWorld, createCrystal, createDistrictVisuals, createEnemy, createFenceLine, createFireServiceWorld, createFlower, createGoldFoundry (+30)

## `20-world-build-cloud-houses.js`

- [x] `collectResource()` — linhas 3825–3834 — if=3, return=3 — chama: addXP, advanceAdventure, beep, checkActiveJob, evaluateMissions, playToolAnimation, saveState, toast, trackDaily, vibrate
- [x] `openChest()` — linhas 3835–3841 — if=2, return=1 — chama: addCoins, addXP, evaluateMissions, saveState, setFlag, toast
- [x] `cloudHouseRecord()` — linhas 3842–3842 — return=1 — chama: nenhuma função nomeada detectada
- [x] `isMyCloudHouse()` — linhas 3843–3843 — return=1 — chama: nenhuma função nomeada detectada
- [x] `reconcileCloudHouses()` — linhas 3844–3873 — if=15, else=1, for=1, return=11 — chama: addCoins, awardMedal, closeModal, cloudHouseRecord, confirmModal, enterHouse, isMyCloudHouse, openModal, publicPlayerName, saveState, setFlag, startRace (+1)
- [x] `enterHouse()` — linhas 3874–3885 — if=5, else=1, for=6, return=2 — chama: auditPlayerMode, canEnterMobility, clearMovementInputs, rememberSafePlayerPosition, safePointNear, savePlayerPosition, setFlag, toast, updateCamera, updateContext
- [x] `exitHouse()` — linhas 3886–3897 — if=4, else=1, for=6, return=2 — chama: auditPlayerMode, clearMovementInputs, rememberSafePlayerPosition, safePointNear, savePlayerPosition, toast
- [x] `openHomeChest()` — linhas 3898–3905 — if=2, return=2 — chama: openModal, playerDisplayName, saveState, toast
- [x] `useActivity()` — linhas 3906–3933 — if=19, else=15, return=2 — chama: addXP, closeModal, openAvatarStudio, openEducationHub, openFireStationDesk, openHomeChest, openModal, openSafetyLesson, openShop, openTeacherJobLesson, openWorkshop, playerDisplayName (+5)
- [x] `openShop()` — linhas 3934–3939 — if=1, return=1 — chama: addCoins, addXP, closeModal, openModal, saveState, toast
- [x] `openWorkshop()` — linhas 3940–3948 — if=3, return=3 — chama: addCoins, addXP, closeModal, openModal, saveState, toast

## ``

- [x] `friendshipTier()` — linhas 3949–3949 — return=1 — chama: nenhuma função nomeada detectada

## `21-interactions-shop-social-races.js`

- [x] `changeFriendship()` — linhas 3950–3954 — if=2 — chama: addReputation, addXP, evaluateMissions, saveState, setFlag, toast
- [x] `talkToNPC()` — linhas 3955–4002 — if=25, else=18, return=1 — chama: addCoins, addReputation, changeFriendship, closeModal, completeActiveJob, friendshipTier, openHouseChallenge, openJobCenter, openModal, saveState, setFlag, startRace (+4)
- [x] `openHouseChallenge()` — linhas 4003–4009 — if=1, return=1 — chama: closeModal, openModal, startRace, toast
- [x] `openRaceCenter()` — linhas 4010–4015 — sem fluxo contado — chama: closeModal, openModal, startRace
- [x] `createRaceOpponent()` — linhas 4016–4018 — return=1 — chama: box
- [x] `clearRaceObjects()` — linhas 4019–4023 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `spawnRaceCoins()` — linhas 4024–4029 — for=1 — chama: cylinder
- [x] `startRace()` — linhas 4030–4040 — if=4, return=2 — chama: createRaceOpponent, exitHouse, saveState, spawnRaceCoins, toast, updateWaypointMarker
- [x] `finishRace()` — linhas 4041–4050 — if=4, else=1, return=1 — chama: addCoins, addReputation, addXP, awardMedal, clearRaceObjects, evaluateMissions, saveState, setFlag, toast, trackDaily, updateWaypointMarker
- [x] `updateRace()` — linhas 4051–4081 — if=12, else=4, for=1, return=2 — chama: beep, finishRace
- [x] `setMissionState()` — linhas 4082–4082 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `missionVehicleName()` — linhas 4083–4083 — return=1 — chama: serviceKindForJob, serviceMissionVehicle
- [x] `missionInstructionSteps()` — linhas 4084–4084 — if=7, return=8 — chama: effectiveAvatarUniform, missionVehicleName, serviceKindForJob
- [x] `missionBriefingMarkup()` — linhas 4085–4085 — return=1 — chama: activeJobProgress, missionInstructionSteps, missionVehicleName
- [x] `equipJobUniform()` — linhas 4086–4090 — if=1, return=1 — chama: applyAvatarCustomization, saveState
- [x] `focusActiveJob()` — linhas 4091–4109 — if=19, else=8, return=8 — chama: applyAvatarCustomization, buildRoutePoints, closeModal, confirmModal, ensureActiveFire, ensureActiveTrafficIncident, exitHouse, releaseMissionServiceVehicle, reserveMissionServiceVehicle, saveState, serviceKindForJob, setMissionState (+5)
- [x] `activeJobProgress()` — linhas 4110–4120 — if=12, return=13 — chama: serviceKindForJob
- [x] `openJobCenter()` — linhas 4121–4129 — sem fluxo contado — chama: activeJobProgress, equipJobUniform, missionBriefingMarkup, openModal, startJob, toast

## `22-careers-jobs-uniforms.js`

- [x] `startJob()` — linhas 4130–4138 — if=8, else=3, return=2 — chama: ensureActiveFire, ensureActiveTrafficIncident, equipJobUniform, exitHouse, focusActiveJob, reserveMissionServiceVehicle, saveState, serviceKindForJob, setMissionState, toast, updateMissionHUD
- [x] `completeActiveJob()` — linhas 4139–4152 — if=9, return=3 — chama: applyAvatarCustomization, evaluateMissions, releaseMissionServiceVehicle, saveState, setFlag, setMissionState, toast, updateHUD, updateMissionHUD, updateWaypointMarker
- [x] `checkActiveJob()` — linhas 4153–4160 — if=4, else=2, return=1 — chama: completeActiveJob
- [x] `restoreActiveJobRuntime()` — linhas 4161–4163 — if=6, return=1 — chama: applyAvatarCustomization, ensureActiveFire, ensureActiveTrafficIncident, reserveMissionServiceVehicle, serviceKindForJob, updateMissionHUD
- [x] `updateCareerMissions()` — linhas 4164–4175 — if=18, else=9, return=2 — chama: activeJobProgress, beep, checkActiveJob, completeActiveJob, ensureActiveTrafficIncident, isDrivingServiceVehicle, reserveMissionServiceVehicle, saveState, serviceKindForJob, setMissionState, setWaypoint, toast (+2)
- [x] `openTeacherJobLesson()` — linhas 4176–4179 — if=1, return=1 — chama: addXP, closeModal, completeActiveJob, openModal, toast
- [x] `openFireStationDesk()` — linhas 4180–4191 — if=6, return=2 — chama: buildRoutePoints, closeModal, ensureActiveFire, equipJobUniform, exitHouse, focusActiveJob, openModal, startJob, toast, updateWaypointMarker
- [x] `startDeliveryJob()` — linhas 4192–4196 — if=1, return=1 — chama: saveState, toast
- [x] `clearServiceVehicleVisual()` — linhas 4197–4200 — if=2 — chama: disposeDetachedVisual
- [x] `serviceVehicleIcon()` — linhas 4201–4201 — return=1 — chama: nenhuma função nomeada detectada
- [x] `applyServiceVehicleVisual()` — linhas 4202–4214 — if=5, else=2, for=1, return=3 — chama: addVoxelOutline, box, clearServiceVehicleVisual, mat, signTexture
- [x] `spawnDust()` — linhas 4215–4220 — if=1 — chama: nenhuma função nomeada detectada
- [x] `updateFX()` — linhas 4221–4230 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `startEngineSound()` — linhas 4231–4241 — if=2, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `stopEngineSound()` — linhas 4242–4246 — if=1, catch=1, return=1 — chama: nenhuma função nomeada detectada

## `23-vehicle-effects-driving.js`

- [x] `updateVehicleFX()` — linhas 4247–4271 — if=12, else=2, for=1, catch=1, return=2 — chama: beep, serviceVehicleIcon, spawnDust, sprintRequested, startEngineSound, stopEngineSound
- [x] `mobilityDriverActive()` — linhas 4272–4272 — return=1 — chama: nenhuma função nomeada detectada
- [x] `updateMobilityControlLabels()` — linhas 4273–4280 — if=13, else=1 — chama: mobilityDriverActive, sprintRequested
- [x] `updateVehicleControlsUI()` — linhas 4281–4288 — if=3 — chama: mobilityDriverActive, playerDisplayName, updateMobilityControlLabels
- [x] `vehicleHorn()` — linhas 4289–4291 — if=4, return=2 — chama: beep, mobilityDriverActive, vibrate
- [x] `enterVehicle()` — linhas 4292–4299 — if=6, return=2 — chama: applyVehicleAppearance, boardNpcPassenger, buildRoutePoints, canEnterMobility, clearMovementInputs, groundHeightAt, nearestRideCompanion, onServiceVehicleBoarded, saveState, serviceVehicleIcon, setFlag, setMissionState (+7)
- [x] `enterVehicleAsPassenger()` — linhas 4300–4308 — if=6, return=4 — chama: auditPlayerMode, canEnterMobility, clearMovementInputs, exitBoat, saveState, toast, updateAbilityUI, updateRunUI, updateVehicleControlsUI
- [x] `exitVehicle()` — linhas 4309–4317 — if=8, else=1, return=2 — chama: auditPlayerMode, clearMovementInputs, clearServiceVehicleVisual, currentVehicleRef, groundHeightAt, onServiceVehicleExited, persistParkedVehicle, releaseNpcPassenger, rememberSafePlayerPosition, safeVehicleExitPoint, saveState, stopEngineSound (+5)
- [x] `repairBridge()` — linhas 4318–4332 — if=2, return=2 — chama: addReputation, addXP, saveState, setFlag, toast
- [x] `buildCostText()` — linhas 4333–4333 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentBuildOwnerIds()` — linhas 4334–4334 — return=1 — chama: nenhuma função nomeada detectada
- [x] `buildOwnedByPlayer()` — linhas 4335–4335 — return=1 — chama: currentBuildOwnerIds
- [x] `buildFootprint()` — linhas 4336–4339 — return=1 — chama: nenhuma função nomeada detectada
- [x] `buildPlacementCandidate()` — linhas 4340–4345 — if=1, return=2 — chama: canBuildAt, groundHeightAt
- [x] `canBuildAt()` — linhas 4346–4356 — if=7, return=9 — chama: buildFootprint, groundHeightAt, rectOverlap, waterAt
- [x] `createBuildPreviewMesh()` — linhas 4357–4368 — if=7, else=6, for=3, return=3 — chama: sharedBoxGeometry
- [x] `disposeBuildPreview()` — linhas 4369–4371 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `ensureBuildPanel()` — linhas 4372–4376 — if=1, return=2 — chama: endBuildMode
- [x] `updateBuildPanel()` — linhas 4377–4381 — if=1, return=1 — chama: buildCostText, ensureBuildPanel, resourcesEnough

## ``

- [x] `updateBuildPreview()` — linhas 4382–4387 — if=5, return=2 — chama: buildPlacementCandidate, createBuildPreviewMesh, disposeBuildPreview, updateBuildPanel

## `24-construction-system.js`

- [x] `beginBuildMode()` — linhas 4388–4391 — if=2, return=3 — chama: disposeBuildPreview, ensureBuildPanel, toast, updateBuildPreview, updateContext, updateVehicleControlsUI
- [x] `endBuildMode()` — linhas 4392–4394 — if=3, return=2 — chama: disposeBuildPreview, toast, updateContext, updateVehicleControlsUI
- [x] `rotateBuildPreview()` — linhas 4395–4395 — if=1, return=2 — chama: updateBuildPreview, vibrate
- [x] `openBuildMenu()` — linhas 4396–4402 — if=3, return=3 — chama: beginBuildMode, buildCostText, closeModal, openHouseExtensionMenu, openModal, toast
- [x] `placeBuild()` — linhas 4403–4413 — if=5, for=2, catch=1, return=6, throw=1 — chama: addXP, buildCostText, checkActiveJob, evaluateMissions, mergeBuildCollections, normalizeBuildRecord, normalizeBuildTombstones, resourcesEnough, saveState, spawnBuild, syncCloudProgress, toast (+2)
- [x] `spawnBuild()` — linhas 4414–4426 — if=9, else=7, for=2, return=4 — chama: addGlow, box, buildRecordSignature, groundHeightAt, normalizeBuildRecord, premiumBox, registerCollider, registerPlatform
- [x] `buildRecordSignature()` — linhas 4427–4427 — return=1 — chama: nenhuma função nomeada detectada
- [x] `removeWorldBuildRecord()` — linhas 4428–4430 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `reconcileWorldBuilds()` — linhas 4431–4442 — if=5, for=2, return=5 — chama: applyBuildTombstones, buildOwnedByPlayer, buildRecordSignature, confirmModal, mergeBuildTombstones, normalizeBuildTombstones, removeWorldBuildRecord, saveState, spawnBuild, syncCloudProgress, toast
- [x] `initThree()` — linhas 4443–4451 — if=1, for=1, return=2 — chama: applyAdaptiveRenderSettings, applyAvatarCustomization, applyQuality, buildWorld, createPlayerModel, freezeWorldFrustumCulling, initLocalMultiplayer, initMaterials, lockStableSceneVisibility, openModal, qualityTier, reconcileCloudHouses (+7)
- [x] `applyQuality()` — linhas 4452–4452 — if=1, return=1 — chama: applyAdaptiveRenderSettings
- [x] `viewportMetrics()` — linhas 4453–4465 — return=1 — chama: nenhuma função nomeada detectada
- [x] `resize()` — linhas 4466–4479 — if=2 — chama: clearMovementInputs, syncMobilePanels, targetDpr, viewportMetrics
- [x] `scheduleStableResize()` — linhas 4480–4480 — sem fluxo contado — chama: resize
- [x] `ensureViewportCoherence()` — linhas 4481–4484 — if=1, return=2 — chama: resize, viewportMetrics
- [x] `refreshOrientationLayout()` — linhas 4485–4489 — if=3 — chama: resize, scheduleStableResize
- [x] `restorePosition()` — linhas 4490–4495 — if=1 — chama: isInsideLakeNavigable, rememberSafePlayerPosition, safePointNear

## `25-render-init-resize-position-collision.js`

- [x] `returnHome()` — linhas 4496–4502 — if=10, else=1, return=1 — chama: auditPlayerMode, busAtStop, exitBoat, exitBusAtStop, exitHouse, exitVehicle, rememberSafePlayerPosition, safePointNear, savePlayerPosition, toast
- [x] `savePlayerPosition()` — linhas 4503–4514 — if=7, else=3 — chama: commitState, isInsideLakeNavigable, saveState
- [x] `groundHeightAt()` — linhas 4515–4517 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `positionBlockedForPlayer()` — linhas 4518–4534 — if=11, for=3, return=6 — chama: groundHeightAt, trafficActorList, waterAt
- [x] `safePointNear()` — linhas 4535–4539 — if=1, for=2, return=2 — chama: groundHeightAt, positionBlockedForPlayer
- [x] `rememberSafePlayerPosition()` — linhas 4540–4544 — if=2, return=3 — chama: positionBlockedForPlayer
- [x] `recoverPlayerIfInvalid()` — linhas 4545–4551 — if=2, return=3 — chama: positionBlockedForPlayer, rememberSafePlayerPosition, safePointNear
- [x] `safeVehicleExitPoint()` — linhas 4552–4555 — return=1 — chama: safePointNear
- [x] `vehicleHitsCollider()` — linhas 4556–4564 — if=5, for=2, return=4 — chama: currentVehicleRef, trafficActorList
- [x] `registerVehicleImpact()` — linhas 4565–4568 — if=1 — chama: beep, toast, vibrate
- [x] `resolveCollisions()` — linhas 4569–4582 — if=9, else=4, for=1, return=1 — chama: playerScaleValue, registerVehicleImpact, vehicleHitsCollider
- [x] `resolveMovementInput()` — linhas 4583–4599 — if=4, else=3, return=1 — chama: derivePlayerMode, normalizeControlIntent
- [x] `sprintRequested()` — linhas 4600–4600 — return=1 — chama: nenhuma função nomeada detectada
- [x] `updateRunUI()` — linhas 4601–4603 — if=4, return=2 — chama: mobilityDriverActive, sprintRequested, updateMobilityControlLabels
- [x] `clearMovementInputs()` — linhas 4604–4611 — if=1 — chama: updateRunUI
- [x] `canJump()` — linhas 4612–4612 — return=1 — chama: nenhuma função nomeada detectada
- [x] `requestJump()` — linhas 4613–4613 — if=2, return=1 — chama: canJump, doJump
- [x] `doJump()` — linhas 4614–4614 — if=1, return=1 — chama: beep, canJump, trackDaily, vibrate
- [x] `updatePlayer()` — linhas 4615–4649 — if=20, else=6, return=1 — chama: animatePlayer, beep, cameraRelativeVector, canJump, checkHazards, collectNearbyCrystals, constrainBoat, doJump, groundHeightAt, recoverPlayerIfInvalid, rememberSafePlayerPosition, resolveCollisions (+10)

## `26-input-player-physics.js`

- [x] `mobilityThrottleIntent()` — linhas 4650–4662 — if=7, return=7 — chama: nenhuma função nomeada detectada
- [x] `updateVehiclePhysics()` — linhas 4663–4677 — if=7, else=1, return=3 — chama: exitVehicle, mobilityThrottleIntent, sprintRequested, toast, updateMobilityControlLabels
- [x] `animatePlayer()` — linhas 4678–4702 — if=13, else=8, return=1 — chama: nenhuma função nomeada detectada
- [x] `checkHazards()` — linhas 4703–4705 — if=4, else=1, for=1 — chama: returnHome, toast
- [x] `collectNearbyCrystals()` — linhas 4706–4709 — if=2, for=1 — chama: collectCrystal
- [x] `npcSpeech()` — linhas 4710–4710 — if=1 — chama: toast
- [x] `nearestRideCompanion()` — linhas 4711–4713 — return=1 — chama: nenhuma função nomeada detectada
- [x] `nearestBoardableNpc()` — linhas 4714–4716 — return=1 — chama: nenhuma função nomeada detectada
- [x] `boardNpcPassenger()` — linhas 4717–4719 — if=3, return=3 — chama: saveState, toast
- [x] `releaseNpcPassenger()` — linhas 4720–4722 — if=3, return=1 — chama: groundHeightAt
- [x] `updateNpcSociety()` — linhas 4723–4732 — if=9, else=5, return=2 — chama: cloudHouseRecord, npcSpeech, saveState, updateHUD
- [x] `updateNPCs()` — linhas 4733–4769 — if=11, else=8, for=2 — chama: snapTrafficToRoad, trafficSpeedFactor

## `27-npc-enemies-combat-camera-action.js`

- [x] `updateEnemies()` — linhas 4770–4778 — if=5, for=1 — chama: beep, saveState, toast, vibrate
- [x] `meleeAttack()` — linhas 4779–4783 — if=1, return=1 — chama: beep, damageEnemy, toast
- [x] `damageEnemy()` — linhas 4784–4787 — if=2, return=1 — chama: addCoins, addXP, evaluateMissions, saveState, toast
- [x] `firePower()` — linhas 4788–4793 — if=3, return=3 — chama: beep, mat, toast, vehicleHorn, vibrate
- [x] `updateFireballs()` — linhas 4794–4797 — if=2, for=2 — chama: damageEnemy
- [x] `updateCamera()` — linhas 4798–4829 — if=6, else=1 — chama: playerScaleValue
- [x] `nearestInteractable()` — linhas 4830–4847 — if=14, for=1, return=12 — chama: boardNpcPassenger, isInteractionAvailable, nearestBoardableNpc, nearestRemotePlayer, openRemotePlayerActions, toast, updateTransitPanel, worldPos
- [x] `updateContext()` — linhas 4848–4851 — if=4, return=2 — chama: nearestInteractable
- [x] `doAction()` — linhas 4852–4863 — if=6, return=2 — chama: isInteractionAvailable, meleeAttack, nearestInteractable, syncMobilePanels, updateContext, worldPos
- [x] `updateNeeds()` — linhas 4864–4871 — if=3, return=1 — chama: playerDisplayName, saveState, sprintRequested, toast, updateHUD
- [x] `multiplayerGameLabel()` — linhas 4872–4872 — return=1 — chama: nenhuma função nomeada detectada
- [x] `guardianMultiplayerAllowed()` — linhas 4873–4873 — return=1 — chama: nenhuma função nomeada detectada
- [x] `guardianCommunicationAllowed()` — linhas 4874–4874 — return=1 — chama: nenhuma função nomeada detectada
- [x] `publicPlayerName()` — linhas 4875–4878 — return=1 — chama: nenhuma função nomeada detectada
- [x] `remotePlayerName()` — linhas 4879–4881 — return=1 — chama: nenhuma função nomeada detectada
- [x] `sanitizeRemoteSession()` — linhas 4882–4886 — if=1, for=1, return=1 — chama: remotePlayerName
- [x] `pendingChallenges()` — linhas 4887–4887 — return=1 — chama: nenhuma função nomeada detectada
- [x] `readyGameSessions()` — linhas 4888–4888 — return=1 — chama: nenhuma função nomeada detectada
- [x] `closeChallengePrompt()` — linhas 4889–4889 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `showIncomingChallengePrompt()` — linhas 4890–4890 — if=1, return=1 — chama: guardianCommunicationAllowed, multiplayerGameLabel
- [x] `showReadySessionPrompt()` — linhas 4891–4892 — if=2, return=2 — chama: guardianCommunicationAllowed, multiplayerGameLabel, sessionOpponentName
- [x] `socialActionLabel()` — linhas 4893–4893 — return=1 — chama: nenhuma função nomeada detectada
- [x] `socialRequestPending()` — linhas 4894–4894 — return=1 — chama: nenhuma função nomeada detectada
- [x] `showIncomingSocialRequest()` — linhas 4895–4907 — if=7, return=8 — chama: guardianCommunicationAllowed, saveState, socialActionLabel, toast
- [x] `applyAcceptedSocialAction()` — linhas 4908–4925 — if=15, else=9, return=3 — chama: closeChallengePrompt, closeModal, enterBoatAsPassenger, enterVehicleAsPassenger, escapeHtml, multiplayerGameLabel, openModal, openNearestCampfire, saveState, sessionOpponentName, startFishing, startHunting (+3)
- [x] `updateOnlineAttention()` — linhas 4926–4926 — if=2 — chama: guardianCommunicationAllowed, pendingChallenges, readyGameSessions, socialRequestPending
- [x] `challengeInboxHtml()` — linhas 4927–4927 — return=1 — chama: escapeHtml, multiplayerGameLabel, pendingChallenges
- [x] `socialRequestInboxHtml()` — linhas 4928–4928 — return=1 — chama: escapeHtml, socialActionLabel, socialRequestPending

## ``

- [x] `completedGameSessions()` — linhas 4929–4929 — return=1 — chama: nenhuma função nomeada detectada

## `28-multiplayer-social-online.js`

- [x] `rememberMatchResult()` — linhas 4930–4930 — if=2, return=3 — chama: sessionOpponentName
- [x] `duelHistoryHtml()` — linhas 4931–4931 — return=2 — chama: completedGameSessions, escapeHtml, multiplayerGameLabel, sessionOpponentName
- [x] `activeSessionsHtml()` — linhas 4932–4932 — return=2 — chama: escapeHtml, multiplayerGameLabel, readyGameSessions
- [x] `bindChallengeCards()` — linhas 4933–4935 — if=5, else=1, return=3 — chama: closeChallengePrompt, multiplayerGameLabel, refreshOpenSocialHub, toast, updateOnlineAttention
- [x] `highestUnlockedLevel()` — linhas 4936–4936 — if=1, for=1, return=1 — chama: subjectUnlocked
- [x] `openChallengePicker()` — linhas 4937–4937 — if=1, else=1 — chama: closeModal, highestUnlockedLevel, openModal, toast
- [x] `sessionOpponentName()` — linhas 4938–4938 — return=1 — chama: remotePlayerName
- [x] `startMultiplayerEducationGame()` — linhas 4939–4939 — if=2, return=2 — chama: closeChallengePrompt, escapeHtml, openModal, runEducationGame, saveState, sessionOpponentName, toast
- [x] `maybeShowMultiplayerResult()` — linhas 4940–4940 — if=4, return=3 — chama: addCoins, addXP, escapeHtml, openModal, rememberMatchResult, saveState
- [x] `currentOnlineRoom()` — linhas 4941–4941 — return=1 — chama: nenhuma função nomeada detectada
- [x] `multiplayerStatusText()` — linhas 4942–4942 — if=2, return=3 — chama: currentOnlineRoom
- [x] `updateMultiplayerBadge()` — linhas 4943–4943 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `onlinePlayers()` — linhas 4944–4944 — return=2 — chama: remotePlayerName
- [x] `onlinePlayerListHtml()` — linhas 4945–4945 — return=1 — chama: escapeHtml, onlinePlayers
- [x] `bindOnlinePlayerCards()` — linhas 4946–4946 — if=1 — chama: openRemotePlayerActions
- [x] `refreshOpenSocialHub()` — linhas 4947–4947 — if=9, return=1 — chama: activeSessionsHtml, bindChallengeCards, bindOnlinePlayerCards, challengeInboxHtml, chatMessageHtml, duelHistoryHtml, multiplayerStatusText, onlinePlayerListHtml, onlinePlayers, socialRequestInboxHtml, updateOnlineAttention
- [x] `approvedChatPhrases()` — linhas 4948–4948 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openSocialHub()` — linhas 4949–4959 — if=3, return=2 — chama: activeSessionsHtml, approvedChatPhrases, bindChallengeCards, bindOnlinePlayerCards, challengeInboxHtml, chatMessageHtml, duelHistoryHtml, escapeHtml, guardianCommunicationAllowed, guardianMultiplayerAllowed, multiplayerStatusText, onlinePlayerListHtml (+8)
- [x] `escapeHtml()` — linhas 4960–4960 — return=1 — chama: nenhuma função nomeada detectada
- [x] `chatMessageHtml()` — linhas 4961–4961 — return=1 — chama: escapeHtml
- [x] `openReportPlayer()` — linhas 4962–4968 — if=1, return=1 — chama: closeModal, openModal, toast
- [x] `openRemotePlayerActions()` — linhas 4969–4988 — if=18, else=5, catch=1, return=8 — chama: closeModal, confirmModal, guardianCommunicationAllowed, isNearFishingArea, nearestActiveCampfire, openChallengePicker, openModal, openReportPlayer, openSocialHub, toast, triggerEmote
- [x] `nearestRemotePlayer()` — linhas 4989–4989 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `openMultiplayerConfig()` — linhas 4990–4990 — sem fluxo contado — chama: openSocialHub
- [x] `applyCloudWorldObjects()` — linhas 4991–4997 — if=8, for=6, return=1 — chama: spawnCampfire, spawnHouseExtension
- [x] `remotePlayerEvent()` — linhas 4998–5029 — if=47, else=11, for=2, while=1, catch=1, return=11 — chama: applyAcceptedSocialAction, applyCloudWorldObjects, closeChallengePrompt, createGhost, exitBoat, exitVehicle, guardianCommunicationAllowed, guardianMultiplayerAllowed, hasValidPlayerName, maybeShowMultiplayerResult, mergeCloudProgress, multiplayerGameLabel (+15)
- [x] `initLocalMultiplayer()` — linhas 5030–5033 — if=6, return=4 — chama: guardianMultiplayerAllowed, hasValidPlayerName, publicPlayerName, remotePlayerEvent, updateMultiplayerBadge
- [x] `multiplayerNameTexture()` — linhas 5034–5034 — if=1, else=1, return=1 — chama: sanitizePlayerName
- [x] `updateLocalPlayerNameLabel()` — linhas 5035–5035 — if=2, return=2 — chama: multiplayerNameTexture, playerDisplayName
- [x] `updateGhostName()` — linhas 5036–5036 — if=2, return=1 — chama: multiplayerNameTexture, sanitizePlayerName
- [x] `ghostVehicleKind()` — linhas 5037–5037 — if=3, return=4 — chama: nenhuma função nomeada detectada
- [x] `styleGhostVehicle()` — linhas 5038–5044 — if=4, else=3, for=1, return=1 — chama: ghostVehicleKind
- [x] `createGhost()` — linhas 5045–5051 — for=1, return=1 — chama: box, cylinder, mat, multiplayerNameTexture, sanitizePlayerName
- [x] `updateMultiplayer()` — linhas 5052–5064 — if=6, for=1, return=1 — chama: guardianMultiplayerAllowed, publicPlayerName, styleGhostVehicle
- [x] `updatePlayUsage()` — linhas 5065–5082 — if=3, return=1 — chama: openModal, saveState, stopGame
- [x] `showWorldLoading()` — linhas 5083–5087 — if=1 — chama: openModal
- [x] `showWorldLoadFailure()` — linhas 5088–5095 — if=1 — chama: escapeHtml, openModal, showScreen
- [x] `gameLoop()` — linhas 5096–5127 — if=19, return=1 — chama: auditPlayerMode, captureTrafficPositions, ensureViewportCoherence, pollGamepad, qualityTier, refreshTechnicalPanel, resolveTrafficOverlaps, samplePerformance, updateAdventure, updateBuildPreview, updateCamera, updateCareerMissions (+24)

## `29-game-loop-controls-gamepad.js`

- [x] `setupControls()` — linhas 5128–5153 — if=30, else=4, return=5 — chama: closeModal, doAction, endBuildMode, firePower, mobilityDriverActive, openPauseMenu, requestJump, rotateBuildPreview, saveState, setScaleMode, spinPlayer, toast (+3)
- [x] `pollGamepad()` — linhas 5154–5177 — if=19, else=2, catch=1, return=6, throw=2 — chama: accountLinked, accountPromptWasHandled, applyAvatarCustomization, closeModal, doAction, equippedTool, evaluateMissions, firePower, gameLoop, hasValidPlayerName, initThree, mobilityDriverActive (+22)
- [x] `stopGame()` — linhas 5178–5183 — if=10 — chama: endBuildMode, exitBoat, exitBusAtStop, exitVehicle, savePlayerPosition, showScreen, stopEngineSound, updateLobbyStats, updateSafetyPanel
- [x] `openPauseMenu()` — linhas 5184–5195 — if=4, return=1 — chama: closeModal, endBuildMode, openLifePanel, openModal, returnHome, startEngineSound, stopEngineSound, stopGame
- [x] `updateBridgeVisual()` — linhas 5196–5198 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `prepareVehicleTestArea()` — linhas 5199–5211 — if=2, return=1 — chama: clearMovementInputs, enterVehicle, exitVehicle, groundHeightAt
- [x] `stepVehicleSimulation()` — linhas 5212–5361 — if=11, for=5, return=36 — chama: activateFireIncident, applyAdaptiveRenderSettings, auditPlayerMode, beginBuildMode, buildRoutePoints, busAtStop, cameraRelativeVector, closeModal, completeActiveJob, constrainBoat, currentVehicleRef, detectStableAutoTier (+61)

## `30-pause-tests-public-api-bootstrap.js`

- [x] `roomWorldInfo()` — linhas 5362–5362 — return=1 — chama: nenhuma função nomeada detectada
- [x] `roomHouseMarkers()` — linhas 5363–5363 — return=2 — chama: nenhuma função nomeada detectada
- [x] `mapHouseLocations()` — linhas 5364–5364 — return=1 — chama: roomHouseMarkers
- [x] `mapRegionsMarkup()` — linhas 5365–5365 — return=2 — chama: escapeHtml
- [x] `clearRemoteRoomEntities()` — linhas 5366–5369 — for=1 — chama: applyCloudWorldObjects, closeChallengePrompt, reconcileCloudHouses, refreshOpenSocialHub, updateMultiplayerBadge
- [x] `resetMobilityForRoomChange()` — linhas 5370–5374 — if=10 — chama: cancelFishingSession, clearMovementInputs, endBuildMode, exitBoat, exitHouse, exitVehicle
- [x] `canChangeRoom()` — linhas 5375–5375 — return=1 — chama: nenhuma função nomeada detectada
- [x] `focusCurrentRoom()` — linhas 5376–5376 — sem fluxo contado — chama: buildRoutePoints, roomWorldInfo, toast, updateNavigation
- [x] `applyRoomWorld()` — linhas 5377–5397 — if=6, return=3 — chama: clearRemoteRoomEntities, refreshOpenMapAfterResize, rememberSafePlayerPosition, resetMobilityForRoomChange, roomWorldInfo, safePointNear, saveState, toast, updateContext, updateHUD, updateNavigation
- [x] `ensureCooperativeState()` — linhas 5398–5398 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopUid()` — linhas 5399–5399 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopMissionTemplate()` — linhas 5400–5400 — return=1 — chama: nenhuma função nomeada detectada
- [x] `activeCoopMission()` — linhas 5401–5401 — return=1 — chama: ensureCooperativeState
- [x] `activeCoopRecord()` — linhas 5402–5402 — if=1, return=2 — chama: activeCoopMission
- [x] `activeCoopServiceJob()` — linhas 5403–5403 — return=1 — chama: activeCoopMission
- [x] `coopParticipants()` — linhas 5404–5404 — return=1 — chama: activeCoopRecord
- [x] `coopOwnParticipant()` — linhas 5405–5405 — return=1 — chama: activeCoopRecord, coopUid
- [x] `coopRoleLabel()` — linhas 5406–5406 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopProgress()` — linhas 5407–5407 — return=1 — chama: activeCoopRecord
- [x] `coopEventValues()` — linhas 5408–5408 — return=1 — chama: activeCoopRecord, coopProgress
- [x] `coopHasEvent()` — linhas 5409–5409 — return=1 — chama: activeCoopRecord, coopEventValues
- [x] `coopIndividualCount()` — linhas 5410–5410 — return=1 — chama: activeCoopRecord, coopEventValues, coopUid
- [x] `coopRoleCapacity()` — linhas 5411–5411 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopRoleTaken()` — linhas 5412–5412 — return=1 — chama: coopParticipants, coopUid
- [x] `coopEventSubjectId()` — linhas 5413–5413 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopMedicalDestination()` — linhas 5414–5414 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `coopRaceStandings()` — linhas 5415–5417 — return=2 — chama: activeCoopRecord, coopEventValues, coopParticipants
- [x] `coopRaceTargetReached()` — linhas 5418–5418 — return=1 — chama: activeCoopRecord, coopProgress, coopRaceStandings
- [x] `coopMissionMapLocations()` — linhas 5419–5423 — if=2, return=3 — chama: activeCoopMission, activeCoopRecord, coopCurrentInstruction, coopCurrentTarget, coopMissionTemplate, coopOwnParticipant, coopRoleLabel

## `31-neighborhood-world-controller.js`

- [x] `coopServiceKind()` — linhas 5424–5424 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopMissionHash()` — linhas 5425–5425 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `coopSceneTarget()` — linhas 5426–5432 — if=8, for=2, return=4 — chama: activateFireIncident, activeCoopMission, coopMissionHash, createTrafficIncidentAt, nearestRoadProjection, serviceVehiclePools
- [x] `coopNearestSchool()` — linhas 5433–5433 — return=1 — chama: nenhuma função nomeada detectada
- [x] `coopNearestInvitableNpc()` — linhas 5434–5434 — return=1 — chama: activeCoopRecord, coopEventSubjectId, coopProgress
- [x] `coopCurrentTarget()` — linhas 5435–5453 — if=15, return=13 — chama: activeCoopMission, activeCoopRecord, coopMedicalDestination, coopNearestInvitableNpc, coopNearestSchool, coopProgress, coopSceneTarget, coopServiceKind, serviceMissionVehicle

## `32-cooperative-missions.js`

- [x] `coopCurrentInstruction()` — linhas 5454–5468 — if=12, return=13 — chama: activeCoopMission, activeCoopRecord, coopIndividualCount, coopMissionTemplate, coopOwnParticipant, coopProgress, coopRoleLabel
- [x] `coopMissionProgressLabel()` — linhas 5469–5469 — if=1, return=2 — chama: activeCoopMission, activeCoopRecord, coopCurrentInstruction, coopMissionTemplate, coopProgress
- [x] `coopMissionBriefingMarkup()` — linhas 5470–5473 — if=1, return=2 — chama: activeCoopMission, activeCoopRecord, coopCurrentInstruction, coopIndividualCount, coopMissionProgressLabel, coopMissionTemplate, coopOwnParticipant, coopParticipants, coopProgress, coopRaceStandings, coopRoleLabel, coopUid
- [x] `coopPermissionDenied()` — linhas 5474–5475 — if=1, catch=1, return=4 — chama: nenhuma função nomeada detectada
- [x] `bindCoopActionButton()` — linhas 5476–5476 — if=3, return=2 — chama: nenhuma função nomeada detectada
- [x] `coopLocalRecord()` — linhas 5477–5479 — return=1 — chama: coopUid, publicPlayerName
- [x] `coopActiveState()` — linhas 5480–5494 — if=27, else=6, return=24 — chama: activeCoopMission, activeCoopRecord, closeModal, continueCoopMissionOffline, coopLocalRecord, coopMissionTemplate, coopOwnParticipant, coopParticipants, coopPermissionDenied, coopRoleCapacity, coopRoleTaken, coopUid (+6)
- [x] `continueCoopMissionOffline()` — linhas 5495–5499 — if=1, return=2 — chama: activeCoopMission, activeCoopRecord, closeModal, coopUid, prepareCoopMissionRuntime, publicPlayerName, saveState, toast, updateMissionHUD
- [x] `prepareCoopMissionRuntime()` — linhas 5500–5506 — if=6, else=2, return=1 — chama: activateCoopRaceBots, activeCoopMission, activeCoopRecord, applyAvatarCustomization, coopCurrentTarget, coopMissionTemplate, coopSceneTarget, coopServiceKind, coopSetWaypoint, equipJobUniform, reserveMissionServiceVehicle, saveState
- [x] `coopSetWaypoint()` — linhas 5507–5507 — if=1, return=1 — chama: buildRoutePoints, updateNavigation, updateWaypointMarker
- [x] `onCoopServiceVehicleBoarded()` — linhas 5508–5516 — if=14, return=12 — chama: activeCoopMission, activeCoopRecord, coopSceneTarget, coopSetWaypoint, coopUid, toast
- [x] `coopNearbyParticipantCount()` — linhas 5517–5553 — if=45, for=1, return=34 — chama: activeCoopMission, activeCoopRecord, coopCurrentTarget, coopEventSubjectId, coopHasEvent, coopMedicalDestination, coopNearestInvitableNpc, coopNearestSchool, coopOwnParticipant, coopParticipants, coopProgress, coopServiceKind (+7)
- [x] `updateCoopFishingProgress()` — linhas 5554–5554 — if=3, catch=1, return=1 — chama: activeCoopRecord, coopProgress, coopSetWaypoint, updateMissionHUD
- [x] `updateCoopSchoolFollowers()` — linhas 5555–5555 — if=2, for=1 — chama: nenhuma função nomeada detectada
- [x] `activateCoopRaceBots()` — linhas 5556–5556 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `deactivateCoopRaceBots()` — linhas 5557–5557 — for=1 — chama: nenhuma função nomeada detectada
- [x] `updateCoopRaceVisuals()` — linhas 5558–5559 — if=3, else=1, for=1, return=1 — chama: activeCoopMission, activeCoopRecord
- [x] `updateCoopRaceProgress()` — linhas 5560–5573 — if=24, else=8, catch=2, return=5 — chama: activeCoopMission, activeCoopRecord, completeCoopMissionLocal, coopHasEvent, coopMissionTemplate, coopProgress, coopRaceTargetReached, coopSetWaypoint, coopUid, toast
- [x] `resolveCoopMissionScene()` — linhas 5574–5574 — if=7, else=3, for=2 — chama: activeCoopMission, activeCoopRecord, extinguishFireIncident, releaseIncidentActorStates, resolveTrafficIncident, serviceVehiclePools
- [x] `resetCoopMissionNpcs()` — linhas 5575–5575 — if=3, for=1 — chama: activeCoopMission
- [x] `completeCoopMissionLocal()` — linhas 5576–5579 — if=8, return=5 — chama: activeCoopMission, activeCoopRecord, addCoins, addReputation, addXP, applyAvatarCustomization, awardMedal, closeModal, confirmModal, coopMissionTemplate, coopParticipants, coopUid (+9)
- [x] `openCoopLobby()` — linhas 5580–5586 — if=2, return=2 — chama: activeCoopMission, activeCoopRecord, bindCoopActionButton, closeModal, coopCurrentTarget, coopMissionBriefingMarkup, coopMissionTemplate, coopParticipants, coopRoleCapacity, coopRoleLabel, coopRoleTaken, coopSetWaypoint (+3)
- [x] `openCoopMissionCenter()` — linhas 5587–5592 — if=1, return=2 — chama: activeCoopMission, bindCoopActionButton, closeModal, coopCurrentTarget, coopMissionBriefingMarkup, coopMissionTemplate, coopParticipants, coopSetWaypoint, coopUid, ensureCooperativeState, openCoopLobby, openModal
- [x] `createCoopOvalTrackWorld()` — linhas 5593–5597 — for=2 — chama: nenhuma função nomeada detectada
- [x] `createCooperativeMissionWorld()` — linhas 5598–5602 — if=6, else=1, for=1, return=1 — chama: activeCoopMission, activeCoopRecord, completeCoopMissionLocal, coopCurrentTarget, createCoopOvalTrackWorld, createNPC, ensureCooperativeState, prepareCoopMissionRuntime, registerInteractable, toast, updateMissionHUD
- [x] `updateCoopMissions()` — linhas 5603–5609 — if=15, catch=2, return=5 — chama: activeCoopMission, activeCoopRecord, completeCoopMissionLocal, coopHasEvent, coopMedicalDestination, coopMissionProgressLabel, coopProgress, coopServiceKind, deactivateCoopRaceBots, isDrivingServiceVehicle, prepareCoopMissionRuntime, releaseMissionServiceVehicle (+9)
- [x] `updateCoopVisuals()` — linhas 5610–5637 — sem fluxo contado — chama: updateCoopRaceVisuals
- [x] `ensureOtthiWorldState()` — linhas 5638–5645 — return=1 — chama: normalizeAvatarV2
- [x] `worldPbrPath()` — linhas 5646–5646 — return=1 — chama: nenhuma função nomeada detectada
- [x] `configureWorldTexture()` — linhas 5647–5656 — if=3, else=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `loadWorldTexture()` — linhas 5657–5666 — if=1, return=2 — chama: configureWorldTexture, registerVisualAsset, updateVisualAsset, worldPbrPath
- [x] `ensureUv2()` — linhas 5667–5670 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `applyPbrPack()` — linhas 5671–5682 — if=4, return=2 — chama: loadWorldTexture

## `33-otthi-world-professional-core.js`

- [x] `upgradeCoreMaterialsToWorldPbr()` — linhas 5683–5691 — if=3, for=1, return=2 — chama: applyPbrPack
- [x] `improveSceneMeshMaterials()` — linhas 5692–5702 — if=4, for=1, return=3 — chama: configureWorldTexture, ensureUv2, qualityTier
- [x] `otthiWorldStageMarkup()` — linhas 5703–5705 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openOtthiWorldCenter()` — linhas 5706–5715 — for=1 — chama: applyOtthiWorldRuntimeSettings, closeModal, ensureOtthiWorldState, openAvatarStudio, openBuildMenu, openModal, openWorldHeroCenter, openWorldModularGarage, otthiWorldStageMarkup, saveState
- [x] `injectOtthiWorldButtons()` — linhas 5716–5724 — if=2 — chama: nenhuma função nomeada detectada
- [x] `applyOtthiWorldRuntimeSettings()` — linhas 5725–5730 — if=3 — chama: qualityTier
- [x] `otthiWorldDiagnostics()` — linhas 5731–5743 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldAvatarSafeChoice()` — linhas 5744–5746 — return=1 — chama: nenhuma função nomeada detectada
- [x] `disposeWorldAvatarObject()` — linhas 5747–5749 — if=2, for=1 — chama: nenhuma função nomeada detectada
- [x] `clearWorldAvatarV3()` — linhas 5750–5754 — if=1, for=1 — chama: disposeWorldAvatarObject
- [x] `worldAvatarMaterial()` — linhas 5755–5757 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldAvatarLayer()` — linhas 5758–5760 — return=1 — chama: nenhuma função nomeada detectada
- [x] `avatarV3Box()` — linhas 5761–5761 — if=1, return=1 — chama: addVoxelOutline
- [x] `avatarV3Sphere()` — linhas 5762–5762 — return=1 — chama: nenhuma função nomeada detectada
- [x] `avatarPatternColor()` — linhas 5763–5763 — return=1 — chama: nenhuma função nomeada detectada
- [x] `applyWorldAvatarV3()` — linhas 5764–5810 — if=21, else=10, for=3, return=2 — chama: avatarPatternColor, avatarV3Box, avatarV3Sphere, clearWorldAvatarV3, ensureOtthiWorldState, worldAvatarLayer, worldAvatarMaterial, worldAvatarSafeChoice

## `34-avatar-studio-professional-v3.js`

- [x] `worldAvatarOptions()` — linhas 5811–5826 — return=1 — chama: applyAvatarCustomization, applyWorldAvatarV3, avatarChoiceGroup, closeModal, ensureOtthiWorldState, normalizeAvatarV2, openModal, playerDisplayName, safeAvatarColor, saveState, setFlag, toast (+2)
- [x] `otthiSeededRandom()` — linhas 5827–5827 — return=2 — chama: nenhuma função nomeada detectada
- [x] `worldDetailAllowed()` — linhas 5828–5834 — if=4, return=5 — chama: waterAt
- [x] `createWorldInstancedDetails()` — linhas 5835–5844 — if=3, while=2, return=2 — chama: loadWorldTexture, otthiSeededRandom, qualityTier, worldDetailAllowed
- [x] `createWorldMushroomCluster()` — linhas 5845–5849 — return=1 — chama: groundHeightAt, loadWorldTexture, worldAvatarMaterial
- [x] `enhanceWorldHouses()` — linhas 5850–5860 — if=2, for=4, return=2 — chama: premiumBox, renderMat, shadeColor
- [x] `createWorldAtmosphericDetails()` — linhas 5861–5866 — if=1, for=1, return=2 — chama: loadWorldTexture, otthiSeededRandom, qualityTier
- [x] `createWorldLandmarks()` — linhas 5867–5872 — if=1, for=1, return=2 — chama: createWorldMushroomCluster, premiumBox, signTexture
- [x] `createOtthiWorldProfessionalLayer()` — linhas 5873–5877 — if=2, return=2 — chama: applyOtthiWorldRuntimeSettings, createWorldAtmosphericDetails, createWorldInstancedDetails, createWorldLandmarks, enhanceWorldHouses, ensureOtthiWorldState, improveSceneMeshMaterials, upgradeCoreMaterialsToWorldPbr
- [x] `updateOtthiWorldEnvironment()` — linhas 5878–5914 — if=17, else=9, for=4, return=7 — chama: sharedBoxGeometry

## `35-world-render-pbr-environment.js`

- [x] `registerWorldBuildRecord()` — linhas 5915–5940 — if=14, else=9, for=7, return=5 — chama: addGlow, buildRecordSignature, ensureUv2, groundHeightAt, loadWorldTexture, normalizeBuildRecord, premiumBox, premiumCylinder, registerCollider, registerPlatform, worldAvatarMaterial
- [x] `defaultWorldVehicleParts()` — linhas 5941–5941 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldVehicleParts()` — linhas 5942–5942 — return=1 — chama: ensureOtthiWorldState
- [x] `removeWorldVehicleModules()` — linhas 5943–5943 — if=2 — chama: disposeWorldAvatarObject
- [x] `worldVehicleModuleMaterial()` — linhas 5944–5944 — return=1 — chama: loadWorldTexture
- [x] `applyWorldVehicleModulesToGroup()` — linhas 5945–5967 — if=16, else=5, for=6, return=5 — chama: addVoxelOutline, currentVehicleRef, loadWorldTexture, removeWorldVehicleModules, saveState, toast, worldVehicleModuleMaterial, worldVehicleParts

## `36-modular-build-machines.js`

- [x] `vehicleCatalogOptions()` — linhas 5968–5968 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openWorldModularGarage()` — linhas 5969–5978 — if=6 — chama: applyWorldVehicleModulesToGroup, closeModal, ensureOtthiWorldState, escapeHtml, openModal, safeAvatarColor, saveState, syncCloudProgress, toast, vehicleById, vehicleCatalogOptions, worldVehicleParts
- [x] `createWorldModularGarageInteractable()` — linhas 5979–5988 — if=1, return=2 — chama: openWorldModularGarage, registerInteractable
- [x] `worldHeroState()` — linhas 5989–5989 — return=1 — chama: ensureOtthiWorldState
- [x] `heroPowerUnlocked()` — linhas 5990–5990 — return=1 — chama: worldHeroState
- [x] `heroPowerReady()` — linhas 5991–5991 — return=1 — chama: worldHeroState
- [x] `createHeroPulseVisual()` — linhas 5992–5994 — if=2, else=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `activateWorldHeroPower()` — linhas 5995–6010 — if=11, else=4, for=4, return=4 — chama: beep, collectCrystal, createHeroPulseVisual, damageEnemy, heroPowerReady, heroPowerUnlocked, saveState, spawnDust, toast, updateWorldHeroHud, vibrate, worldHeroState
- [x] `worldHeroPowerCards()` — linhas 6011–6011 — return=2 — chama: heroPowerUnlocked, worldHeroState
- [x] `openWorldHeroCenter()` — linhas 6012–6019 — sem fluxo contado — chama: activateWorldHeroPower, closeModal, openModal, saveState, startWorldHeroChallenge, updateWorldHeroHud, worldHeroPowerCards, worldHeroState
- [x] `createHeroPlatform()` — linhas 6020–6020 — return=1 — chama: premiumBox, registerPlatform
- [x] `createHeroToken()` — linhas 6021–6021 — return=1 — chama: loadWorldTexture
- [x] `createWorldHeroAdventure()` — linhas 6022–6029 — if=1, for=2, return=2 — chama: addGlow, createHeroPlatform, createHeroToken, premiumBox, registerInteractable, signTexture
- [x] `resetWorldHeroTokens()` — linhas 6030–6030 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `startWorldHeroChallenge()` — linhas 6031–6033 — if=4, return=2 — chama: exitBoat, exitHouse, exitVehicle, resetWorldHeroTokens, toast, updateWaypointMarker, worldHeroState
- [x] `completeWorldHeroChallenge()` — linhas 6034–6034 — if=2, for=1, return=1 — chama: addCoins, addXP, awardMedal, saveState, setFlag, syncCloudProgress, toast, updateWaypointMarker, updateWorldHeroHud, worldHeroState
- [x] `updateWorldHeroAdventure()` — linhas 6035–6041 — if=5, for=1 — chama: addXP, beep, completeWorldHeroChallenge, groundHeightAt, toast, updateWorldHeroHud, worldHeroState
- [x] `ensureWorldHeroHud()` — linhas 6042–6044 — if=1, return=1 — chama: activateWorldHeroPower
- [x] `updateWorldHeroHud()` — linhas 6045–6054 — if=3, catch=1, return=3 — chama: applyOtthiWorldRuntimeSettings, applyWorldAvatarV3, createOtthiWorldProfessionalLayer, createWorldHeroAdventure, createWorldModularGarageInteractable, ensureOtthiWorldState, ensureWorldHeroHud, otthiWorldDiagnostics, toast, upgradeCoreMaterialsToWorldPbr, worldHeroState
- [x] `bootstrapOtthiWorldShell()` — linhas 6055–6072 — if=3, catch=1, return=1 — chama: activateWorldHeroPower, applyAvatarCustomization, applyWorldAvatarV3, applyWorldVehicleModulesToGroup, createOtthiWorldProfessionalLayer, ensureOtthiWorldState, ensureWorldHeroHud, injectOtthiWorldButtons, startWorldHeroChallenge, updateWorldHeroHud, vehicleById
