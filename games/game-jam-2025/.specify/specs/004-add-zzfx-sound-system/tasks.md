# Tasks: ZzFX Sound System

**Input**: Design documents from `/specs/004-add-zzfx-sound-system/`
**Prerequisites**: plan.md (completed), spec.md (completed)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Note**: This is a P3 (Polish) feature with manual testing only. No automated tests requested in spec.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- File paths reference `src/game.js` (single-file integration)

---

## Phase 1: Foundation (Shared Infrastructure)

**Purpose**: Create core SoundManager class that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] **T001** [Foundation] Add ZZFX_SOUNDS constant object after COLLECTIBLE_DATA (~line 52)
  - **File**: src/game.js:52-70
  - **Action**: Copy ZzFX parameters from Constitution FR-033 for all 5 sounds
  - **Test**: File compiles without errors, constants readable in console
  - **Time**: 5 minutes
  - **Dependencies**: None

- [ ] **T002** [Foundation] Create SoundManager class with constructor and error handling
  - **File**: src/game.js:70-130
  - **Action**: Implement class with try-catch, pre-cache 5 Sound objects, graceful degradation
  - **Test**: Instantiate manually in console: `new SoundManager()` → no errors, console.log shows success
  - **Time**: 20 minutes
  - **Dependencies**: T001

- [ ] **T003** [Foundation] Add SoundManager helper methods (clampPitch, volume scaling)
  - **File**: src/game.js (within SoundManager class)
  - **Action**: Implement clampPitch(pitch) and volume calculation for simultaneous sounds
  - **Test**: Call methods in console with test values, verify clamping (0.5-3.0) and volume formula
  - **Time**: 10 minutes
  - **Dependencies**: T002

- [ ] **T004** [Foundation] Add soundManager global variable declaration
  - **File**: src/game.js:82-85 (with other global variables)
  - **Action**: Add `let soundManager;` after other global declarations
  - **Test**: Variable accessible in console before initialization (undefined initially)
  - **Time**: 2 minutes
  - **Dependencies**: None

- [ ] **T005** [Foundation] Initialize soundManager in gameInit()
  - **File**: src/game.js:102-110 (within gameInit function)
  - **Action**: Add `soundManager = new SoundManager();` after console.log
  - **Test**: Load game, check console for "SoundManager initialized successfully", verify soundManager.sound_collect exists
  - **Time**: 5 minutes
  - **Dependencies**: T002, T004

**Checkpoint**: Foundation ready - SoundManager fully functional, all Sound objects pre-cached

---

## Phase 2: User Story 1 - Hear Feedback on Every Collection (Priority: P3)

**Goal**: Play pitch-scaled collection sound whenever player collects an object

**Independent Test**: Collect one penny → hear high-pitched "bling!" sound

### Implementation for User Story 1

- [ ] **T006** [US1] Implement SoundManager.playCollect() method
  - **File**: src/game.js (within SoundManager class, ~line 110)
  - **Action**: Add playCollect(pos, value, collectionsThisFrame=1) with pitch scaling and volume management (FR-004-003, FR-004-004, FR-004-013)
  - **Test**: Call manually in console: `soundManager.playCollect(player.pos, 10)` → hear sound at correct pitch
  - **Time**: 15 minutes
  - **Dependencies**: T003, T005

- [ ] **T007** [US1] Add playCollect() call in PlayerBall.collect() method
  - **File**: src/game.js:642-650 (within PlayerBall.collect method)
  - **Action**: Add `if (soundManager) { soundManager.playCollect(collectible.pos, collectible.value); }` after size growth
  - **Test**: Collect penny → hear high-pitched sound, collect customer → hear mid-pitched sound
  - **Time**: 5 minutes
  - **Dependencies**: T006

- [ ] **T008** [US1] Test pitch-scaling with different value objects
  - **File**: N/A (manual testing)
  - **Action**: Collect penny ($10), customer ($50), building ($500), yacht ($5M) → verify pitch goes from high → low
  - **Test**: Penny = highest pitch, yacht = lowest pitch (clamped to 3.0x), audible progression
  - **Time**: 10 minutes
  - **Dependencies**: T007

- [ ] **T009** [US1] Test positional audio falloff
  - **File**: N/A (manual testing)
  - **Action**: Spawn collectible far from player (>40 units), collect it → verify sound silent or very quiet
  - **Test**: Sound audible at player position, fades with distance, silent beyond 40 units
  - **Time**: 10 minutes
  - **Dependencies**: T007

- [ ] **T010** [US1] Test graceful degradation (audio failure)
  - **File**: N/A (manual testing)
  - **Action**: Disable Web Audio API in Chrome DevTools → reload game → verify no crashes, game playable
  - **Test**: Console.warn appears, game continues silently, no errors, all mechanics work
  - **Time**: 5 minutes
  - **Dependencies**: T007

**Checkpoint**: Collection sounds fully functional, pitch-scales correctly, positional audio works

---

## Phase 3: User Story 2 - Celebrate Tier-Ups With Audio (Priority: P3)

**Goal**: Play celebratory fanfare when player crosses tier threshold (FUTURE - placeholder only)

**Independent Test**: Manually call playTierUp() → hear rising fanfare sound

**⚠️ NOTE**: Tier system (FR-047) not implemented yet. This phase creates placeholder method for future integration.

### Implementation for User Story 2

- [ ] **T011** [P] [US2] Implement SoundManager.playTierUp() method
  - **File**: src/game.js (within SoundManager class, ~line 125)
  - **Action**: Add playTierUp(pos) with volume 1.2 (FR-004-005)
  - **Test**: Call manually in console: `soundManager.playTierUp(player.pos)` → hear rising fanfare (louder than collection)
  - **Time**: 5 minutes
  - **Dependencies**: T005

- [ ] **T012** [P] [US2] Add TODO comment for future tier integration
  - **File**: src/game.js (wherever tier logic will go, likely PlayerBall class)
  - **Action**: Add comment: `// TODO FR-047: When tier system implemented, call soundManager.playTierUp(this.pos)`
  - **Test**: Comment visible in code, clearly marks future integration point
  - **Time**: 2 minutes
  - **Dependencies**: T011

**Checkpoint**: Tier-up sound method exists, ready for future integration when FR-047 implemented

---

## Phase 4: User Story 3 - Audio Punctuation for Win/Lose (Priority: P3)

**Goal**: Play victory/defeat sounds at session-ending moments (win/lose conditions)

**Independent Test**: Reach target size → hear ascending arpeggio; let timer expire → hear sad trombone

### Implementation for User Story 3

- [ ] **T013** [P] [US3] Implement SoundManager.playVictory() method
  - **File**: src/game.js (within SoundManager class, ~line 130)
  - **Action**: Add playVictory() with center position vec2(0,0) and volume 1.5 (FR-004-006)
  - **Test**: Call manually in console: `soundManager.playVictory()` → hear ascending arpeggio (very loud)
  - **Time**: 5 minutes
  - **Dependencies**: T005

- [ ] **T014** [P] [US3] Implement SoundManager.playDefeat() method
  - **File**: src/game.js (within SoundManager class, ~line 135)
  - **Action**: Add playDefeat() with center position vec2(0,0) and volume 1.0 (FR-004-007)
  - **Test**: Call manually in console: `soundManager.playDefeat()` → hear descending sad trombone
  - **Time**: 5 minutes
  - **Dependencies**: T005

- [ ] **T015** [US3] Add playVictory() call in victory handler
  - **File**: src/game.js:661-670 (within PlayerBall.update, victory condition block)
  - **Action**: Add `if (soundManager) { soundManager.playVictory(); }` after levelState = STATE.VICTORY
  - **Test**: Reach target size → hear victory fanfare immediately, sound at center (not positional)
  - **Time**: 5 minutes
  - **Dependencies**: T013

- [ ] **T016** [US3] Add playDefeat() call in defeat handler
  - **File**: src/game.js:143-150 (within gameUpdate, timer expiration block)
  - **Action**: Add `if (soundManager) { soundManager.playDefeat(); }` after levelState = STATE.DEFEAT
  - **Test**: Let timer expire → hear sad trombone immediately, sound at center
  - **Time**: 5 minutes
  - **Dependencies**: T014

- [ ] **T017** [US3] Test victory sound distinctness
  - **File**: N/A (manual testing)
  - **Action**: Trigger victory → compare sound to collection sound → verify distinctly different waveform
  - **Test**: Victory = ascending arpeggio (do-mi-sol), collection = single "bling!", clearly different
  - **Time**: 5 minutes
  - **Dependencies**: T015

- [ ] **T018** [US3] Test defeat sound distinctness
  - **File**: N/A (manual testing)
  - **Action**: Trigger defeat → compare to victory → verify comedic sad trombone, not harsh
  - **Test**: Defeat = descending trombone (comedic), victory = ascending arpeggio (celebratory), opposites
  - **Time**: 5 minutes
  - **Dependencies**: T016

**Checkpoint**: Victory/defeat sounds play correctly at session-ending moments, sounds distinct and appropriate

---

## Phase 5: User Story 4 - Timer Warning Audio Urgency (Priority: P3)

**Goal**: Play urgent beeping sound when timer reaches last 10 seconds, repeating every 1 second

**Independent Test**: Set timer to 11 seconds → wait → beeping starts at exactly 10 seconds, repeats every second

### Implementation for User Story 4

- [ ] **T019** [US4] Add lastTimerWarningTime global variable
  - **File**: src/game.js:83-96 (with other global variables)
  - **Action**: Add `let lastTimerWarningTime = -1;` after other timer/state variables
  - **Test**: Variable accessible in console, initialized to -1
  - **Time**: 2 minutes
  - **Dependencies**: None

- [ ] **T020** [P] [US4] Implement SoundManager.playTimerWarning() method
  - **File**: src/game.js (within SoundManager class, ~line 140)
  - **Action**: Add playTimerWarning() with center position vec2(0,0) and volume 0.8 (FR-004-008)
  - **Test**: Call manually in console: `soundManager.playTimerWarning()` → hear beep (quieter than other sounds)
  - **Time**: 5 minutes
  - **Dependencies**: T005

- [ ] **T021** [US4] Add timer warning logic in gameUpdate()
  - **File**: src/game.js:140-160 (within gameUpdate, after timer countdown)
  - **Action**: Add beeping logic with second-change detection (prevents spam), only when levelState === PLAYING and remainingTime <= 10
  - **Test**: Start level, fast-forward to 11 seconds remaining → wait → beep at 10, 9, 8, etc.
  - **Time**: 15 minutes
  - **Dependencies**: T019, T020

- [ ] **T022** [US4] Reset lastTimerWarningTime on victory
  - **File**: src/game.js:661-670 (within victory handler)
  - **Action**: Add `lastTimerWarningTime = -1;` after levelState = STATE.VICTORY (FR-004-009)
  - **Test**: Beeping active at 5 seconds → reach target size → beeping stops immediately
  - **Time**: 3 minutes
  - **Dependencies**: T021

- [ ] **T023** [US4] Reset lastTimerWarningTime on defeat
  - **File**: src/game.js:143-150 (within defeat handler)
  - **Action**: Add `lastTimerWarningTime = -1;` after levelState = STATE.DEFEAT (FR-004-009)
  - **Test**: Beeping active at 3 seconds → timer expires → beeping stops immediately (defeat sound plays instead)
  - **Time**: 3 minutes
  - **Dependencies**: T021

- [ ] **T024** [US4] Test beeping cadence accuracy
  - **File**: N/A (manual testing)
  - **Action**: Set timer to 11 seconds → wait → verify beep at exactly 10 (not 9 or 11), then 9, 8, 7, etc.
  - **Test**: 10 beeps total from 10→1 seconds, one beep per second, no double-beeps, no missed beeps
  - **Time**: 15 minutes
  - **Dependencies**: T021

- [ ] **T025** [US4] Test beeping stops on state change
  - **File**: N/A (manual testing)
  - **Action**: Trigger beeping at 8 seconds → win level → verify beeping stops, doesn't play during victory screen
  - **Test**: Beeping stops immediately when levelState changes from PLAYING (victory or defeat)
  - **Time**: 5 minutes
  - **Dependencies**: T022, T023

**Checkpoint**: Timer warning beeps correctly, starts at 10 seconds, repeats every second, stops on state change

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, stress testing, documentation updates

- [ ] **T026** [P] [Polish] Stress test simultaneous sound playback
  - **File**: N/A (manual testing)
  - **Action**: Spawn 50 collectibles in cluster, grow large, roll through → collect 20+ objects in 1 frame
  - **Test**: No audio clipping or distortion, volume scaling works (FR-004-013), 60 FPS maintained
  - **Time**: 10 minutes
  - **Dependencies**: T007

- [ ] **T027** [P] [Polish] Cross-browser compatibility testing
  - **File**: N/A (manual testing)
  - **Action**: Test in Chrome (autoplay strict), Firefox (permissive), Safari (strictest)
  - **Test**: All browsers play sounds after first user interaction, no console errors, graceful autoplay handling
  - **Time**: 15 minutes
  - **Dependencies**: T007, T015, T016, T021

- [ ] **T028** [P] [Polish] Validate all acceptance criteria from spec.md
  - **File**: N/A (manual testing)
  - **Action**: Run through all 11 acceptance scenarios (US1-AS1 through US4-AS3)
  - **Test**: All scenarios pass, all success criteria (SC-001 through SC-011) validated
  - **Time**: 20 minutes
  - **Dependencies**: All previous tasks

- [ ] **T029** [P] [Polish] Update CLAUDE.md with audio system
  - **File**: CLAUDE.md
  - **Action**: Add "ZzFX procedural audio (5 sounds)" to Active Technologies, add feature to Recent Changes
  - **Test**: CLAUDE.md reflects new audio capabilities, documents pitch-scaling pattern
  - **Time**: 5 minutes
  - **Dependencies**: T028

- [ ] **T030** [Polish] Add code comments for future maintainability
  - **File**: src/game.js (SoundManager class and integration points)
  - **Action**: Add JSDoc-style comments explaining pitch scaling formula, volume management, FR references
  - **Test**: Code readable, FR-004-* references clear, future developers understand intent
  - **Time**: 10 minutes
  - **Dependencies**: All implementation tasks

**Checkpoint**: All user stories validated, cross-browser tested, documentation updated, ready for commit

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Foundation (Phase 1)**: No dependencies - MUST complete first, blocks all user stories
2. **User Story 1 (Phase 2)**: Depends on Foundation complete (T001-T005)
3. **User Story 2 (Phase 3)**: Depends on Foundation complete (T001-T005) - Can run in parallel with US1, US3, US4
4. **User Story 3 (Phase 4)**: Depends on Foundation complete (T001-T005) - Can run in parallel with US1, US2, US4
5. **User Story 4 (Phase 5)**: Depends on Foundation complete (T001-T005) - Can run in parallel with US1, US2, US3
6. **Polish (Phase 6)**: Depends on all user stories complete

### Critical Path (Sequential Execution)

If implementing solo, follow this order for fastest completion:

```
Foundation (T001-T005) → US1 (T006-T010) → US3 (T013-T018) → US4 (T019-T025) → US2 (T011-T012) → Polish (T026-T030)
```

**Rationale**: US1 (collection sounds) most critical, US3 (victory/defeat) second, US4 (timer warning) third, US2 (tier-up placeholder) least critical since tier system not implemented yet.

### Parallel Opportunities

Once Foundation (Phase 1) complete, these tasks can run in parallel:

**Parallel Group 1** (different methods in SoundManager class):
- T006 [US1] playCollect()
- T011 [US2] playTierUp()
- T013 [US3] playVictory()
- T014 [US3] playDefeat()
- T020 [US4] playTimerWarning()

**Parallel Group 2** (different integration points in game.js):
- T007 [US1] PlayerBall.collect() call
- T015 [US3] Victory handler call
- T016 [US3] Defeat handler call
- T021 [US4] Timer warning logic

**Parallel Group 3** (independent testing tasks):
- T008-T010 [US1] Collection sound tests
- T017-T018 [US3] Victory/defeat tests
- T024-T025 [US4] Timer warning tests
- T026-T027 [Polish] Stress testing and cross-browser

### Task Time Estimates

| Phase | Total Time | Task Count |
|-------|------------|------------|
| Foundation (Phase 1) | 42 minutes | 5 tasks |
| User Story 1 (Phase 2) | 45 minutes | 5 tasks |
| User Story 2 (Phase 3) | 7 minutes | 2 tasks |
| User Story 3 (Phase 4) | 30 minutes | 6 tasks |
| User Story 4 (Phase 5) | 48 minutes | 7 tasks |
| Polish (Phase 6) | 60 minutes | 5 tasks |
| **TOTAL** | **3 hours 52 minutes** | **30 tasks** |

**Note**: Original plan estimate was 2.5 hours. Actual task breakdown reveals 3.9 hours due to comprehensive testing and polish tasks. Estimate updated to reflect reality.

---

## Implementation Strategy

### MVP First (Core Collection Sounds Only)

1. Complete Phase 1: Foundation (42min) → SoundManager functional
2. Complete Phase 2: User Story 1 (45min) → Collection sounds working
3. **STOP and VALIDATE**: Test collection sounds thoroughly
4. **Deploy/Demo**: Game has audio feedback on every collection (massive juice improvement)

**Total MVP Time**: 1.5 hours to go from 100% silent → collection audio feedback

### Incremental Delivery

1. Foundation + US1 → Deploy (MVP - collection sounds)
2. Add US3 → Deploy (victory/defeat audio punctuation)
3. Add US4 → Deploy (timer urgency)
4. Add US2 → Deploy (tier-up placeholder ready for future)
5. Polish → Deploy (cross-browser tested, production-ready)

### Parallel Team Strategy

With 2 developers after Foundation complete:

- **Developer A**: US1 (collection) + US3 (victory/defeat) - critical sounds
- **Developer B**: US4 (timer warning) + US2 (tier-up placeholder) - secondary sounds

Both complete in ~90 minutes, then converge for polish testing.

---

## Testing Checklist (Manual)

### User Story 1 - Collection Sounds
- [ ] Penny ($10) plays high-pitched "bling!"
- [ ] Customer ($50) plays mid-pitched "bling!" (lower than penny)
- [ ] Yacht ($5M) plays low-pitched "boom!" (pitch clamped to 3.0x)
- [ ] 20+ objects collected simultaneously → no clipping (volume scales down)
- [ ] Sound fades with distance (audible at player, silent beyond 40 units)
- [ ] Browser mute respected (no sound when tab muted)
- [ ] Audio failure graceful (disable Web Audio API → game continues silently)

### User Story 2 - Tier-Up Celebration
- [ ] playTierUp() method callable in console
- [ ] Sound louder than collection (volume 1.2)
- [ ] TODO comment exists for future FR-047 integration

### User Story 3 - Victory/Defeat
- [ ] Victory: Reach target size → ascending arpeggio (do-mi-sol)
- [ ] Defeat: Timer expires → descending sad trombone
- [ ] Victory sound very loud (volume 1.5), celebratory feel
- [ ] Defeat sound comedic, not harsh (volume 1.0)
- [ ] Both sounds at center position (not positional)
- [ ] Sounds distinctly different from collection sounds

### User Story 4 - Timer Warning
- [ ] Beeping starts at exactly 10 seconds (not 9 or 11)
- [ ] Beep repeats every 1 second (10 beeps total from 10→1)
- [ ] Beep quieter than other sounds (volume 0.8)
- [ ] Beeping stops on victory (doesn't play during victory screen)
- [ ] Beeping stops on defeat (defeat sound plays instead)
- [ ] Beeping doesn't spam (max 1 beep per second, not 60/sec)

### Cross-Cutting Concerns
- [ ] Chrome: Autoplay blocked → first click enables audio → no errors
- [ ] Firefox: Audio works immediately (permissive autoplay)
- [ ] Safari: Autoplay blocked → first interaction required → works after
- [ ] 60 FPS maintained during audio playback (check performance monitor)
- [ ] <32 concurrent AudioNodes (check browser Audio tab)
- [ ] All 11 success criteria (SC-001 through SC-011) from spec.md validated

---

## Notes

- **Single-file integration**: All changes in `src/game.js` only, no new files
- **No dependencies**: All ZzFX parameters from Constitution FR-033 (copy-paste ready)
- **Graceful degradation**: Try-catch ensures audio failure doesn't crash game
- **Manual testing only**: No automated tests requested, all validation manual browser testing
- **Theme validation**: Pitch-scaling reinforces "SMALL" theme (high pitch → low pitch = small → big)
- **Performance**: ZzFX sounds <100 bytes each, negligible file size/performance impact
- **Future-ready**: Tier-up placeholder exists for when FR-047 implemented

---

**Status**: Ready for `/speckit.implement` - Execute all 30 tasks sequentially
**Total Time**: 3 hours 52 minutes (updated from 2.5h plan estimate based on detailed task breakdown)
**Priority**: P3 (Polish) - Week 3
**Impact**: CRITICAL - Transforms game from 100% silent → rich audio feedback
