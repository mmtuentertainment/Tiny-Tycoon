# Tasks: Level Progression System

**Input**: Design documents from `/specs/002-implement-a-3/`
**Prerequisites**: ✅ plan.md, ✅ spec.md, ✅ research.md, ✅ data-model.md, ✅ quickstart.md

**Project Type**: LittleJS Game (single-file game.js extension)
**Base Code**: Feature 001 (Core Katamari Mechanic) - ~400 LOC in src/game.js
**New Code**: Feature 002 adds ~300 LOC to game.js (~700 total)

**Tests**: Manual playtesting only (per constitution Article V: manual > automated for game jam timeline)

**Organization**: Tasks grouped by user story (7 stories total) to enable independent implementation and validation of each gameplay feature.

---

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different code sections, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US7)
- File path: `src/game.js` for all implementation tasks (single-file LittleJS pattern)

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Core data structures and state management infrastructure that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] **T001** [P] Add LEVEL_CONFIG array constant to src/game.js (3 level objects with all parameters from data-model.md)
- [X] **T002** [P] Add STATE enum object to src/game.js (PLAYING, VICTORY, DEFEAT, LEVEL_TRANSITION, GAME_COMPLETE)
- [X] **T003** [P] Add global state variables to src/game.js (currentLevel, levelState, levelStartTime, remainingTime, transitionStartTime)
- [X] **T004** Create formatTime(seconds) utility function in src/game.js (MM:SS conversion from research.md R2)
- [X] **T005** Create startLevel(levelIndex) function skeleton in src/game.js (to be filled in by user stories)
- [X] **T006** Create handleTransition() function skeleton in src/game.js (to be filled in by user stories)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 2: User Story 1 - Basic Level Completion Flow (Priority: P1) 🎯 MVP

**Goal**: Player can complete Level 1, see victory screen, and automatically advance to Level 2

**Independent Test**: Play Level 1, reach 5.0× size before 60s expires, verify victory screen shows and Level 2 begins

**Acceptance Scenarios**:
1. Level 1 → reach 5.0× → victory screen → Level 2 begins
2. Level 2 → reach 15.0× → victory screen → Level 3 begins
3. Level 3 → reach 50.0× → game completion screen

### Implementation for User Story 1

- [X] **T007** [US1] Add win condition check to PlayerBall.collect() method in src/game.js (if size >= targetSize → STATE.VICTORY)
- [X] **T008** [US1] Implement startLevel() player reset logic in src/game.js (pos, size, velocity, score per data-model.md)
- [X] **T009** [US1] Implement startLevel() timer initialization in src/game.js (levelStartTime = time, remainingTime = config.timeLimit)
- [X] **T010** [US1] Implement startLevel() state setup in src/game.js (levelState = STATE.PLAYING)
- [X] **T011** [US1] Implement handleTransition() victory path in src/game.js (if VICTORY → currentLevel++ or GAME_COMPLETE)
- [X] **T012** [US1] Call startLevel(0) in gameInit() to begin game at Level 1
- [X] **T013** [US1] Implement victory screen rendering in gameRenderPost() in src/game.js (overlay, "LEVEL COMPLETE!", stats)
- [X] **T014** [US1] Implement auto-advance timer check in gameUpdate() in src/game.js (2.5s after transitionStartTime → handleTransition())

**Checkpoint**: Can win Level 1, see victory screen, and auto-advance to Level 2 after 2.5s

---

## Phase 3: User Story 2 - Failure Condition and Retry (Priority: P1) 🎯 MVP

**Goal**: Player who fails a level sees defeat screen and can retry the same level

**Independent Test**: Start Level 1, let timer expire without reaching 5.0×, verify defeat screen and retry restarts Level 1

**Acceptance Scenarios**:
1. Timer reaches 0:00 with size < target → defeat screen displays
2. Defeat screen shows failure reason and size comparison
3. Retry restarts same level with fresh collectibles and full timer

### Implementation for User Story 2

- [X] **T015** [US2] Add lose condition check in gameUpdate() timer section in src/game.js (remainingTime <= 0 && size < target → STATE.DEFEAT)
- [X] **T016** [US2] Implement defeat screen rendering in gameRenderPost() in src/game.js (overlay, "TIME'S UP!", size comparison, retry prompt)
- [X] **T017** [US2] Implement handleTransition() defeat path in src/game.js (if DEFEAT → startLevel(currentLevel) to retry)
- [ ] **T018** [US2] Test defeat flow: let timer expire on Level 1, verify defeat screen, verify retry restarts Level 1

**Checkpoint**: Defeat screen works, retry correctly restarts same level

---

## Phase 4: User Story 3 - Timer Awareness and Urgency (Priority: P1) 🎯 MVP

**Goal**: Player always sees remaining time and gets visual urgency feedback when time is low

**Independent Test**: Watch timer count down from 1:00 to 0:00, verify MM:SS format and orange color at ≤10s

**Acceptance Scenarios**:
1. Timer displays MM:SS format and counts down each second
2. Timer shows orange/red color when ≤10s remaining
3. Timer stops at 0:00 when failure triggers

### Implementation for User Story 3

- [X] **T019** [US3] Implement timer update logic in gameUpdate() in src/game.js (elapsed = time - levelStartTime, remainingTime calculation)
- [X] **T020** [US3] Implement timer display in gameRenderPost() in src/game.js (center top, MM:SS format via formatTime())
- [X] **T021** [US3] Implement urgency color logic in gameRenderPost() in src/game.js (white if >10s, orange if ≤10s)
- [ ] **T022** [US3] Test timer: verify counts from 1:00 to 0:00, verify orange color at 0:10

**Checkpoint**: Timer displays correctly, counts down accurately, shows urgency feedback

---

## Phase 5: User Story 4 - Level-Appropriate Collectible Spawning (Priority: P2)

**Goal**: Each level spawns collectibles appropriate to its size range and difficulty

**Independent Test**: Observe collectibles across all 3 levels, verify counts and size ranges match config

**Acceptance Scenarios**:
1. Level 1: 30-50 collectibles, sizes 0.3-3.0
2. Level 2: 40-60 collectibles, sizes 3.0-10.0
3. Level 3: 50-80 collectibles, sizes 10.0-40.0
4. New level clears old collectibles and spawns fresh ones

### Implementation for User Story 4

- [X] **T023** [US4] Create spawnCollectiblesForLevel(config) function in src/game.js (randomized grid algorithm from research.md R4)
- [X] **T024** [US4] Implement collectible clearing logic in startLevel() in src/game.js (collectibles.forEach destroy, clear array)
- [X] **T025** [US4] Call spawnCollectiblesForLevel(config) from startLevel() in src/game.js
- [X] **T026** [US4] Update spawn logic to use config.collectibleSizeMin/Max in src/game.js (replace Feature 001 fixed ranges)
- [ ] **T027** [US4] Test spawning: verify Level 1 has 30-50 small objects, Level 2 has 40-60 medium, Level 3 has 50-80 large

**Checkpoint**: Each level spawns correct count and size range of collectibles

---

## Phase 6: User Story 5 - Progressive Difficulty Scaling (Priority: P2)

**Goal**: Each level has unique parameters (target size, time limit, play area) that increase difficulty

**Independent Test**: Complete all 3 levels, verify each feels appropriately more challenging

**Acceptance Scenarios**:
1. Level 1: target 5.0, timer 60s, area 50×50, difficulty "Easy"
2. Level 2: target 15.0, timer 90s, area 100×100, difficulty "Medium"
3. Level 3: target 50.0, timer 120s, area 150×150, difficulty "Hard"

### Implementation for User Story 5

- [X] **T028** [US5] Verify LEVEL_CONFIG array has correct values in src/game.js (L1: 5.0/60/50, L2: 15.0/90/100, L3: 50.0/120/150)
- [X] **T029** [US5] Implement soft boundary camera clamp in gameUpdatePost() in src/game.js (clamp after lerp, use playAreaSize from config)
- [ ] **T030** [US5] Test boundaries: verify camera stops at edges for each level, no black space visible
- [ ] **T031** [US5] Test difficulty scaling: play all 3 levels, verify each feels harder than previous

**Checkpoint**: Difficulty scales correctly across all 3 levels with unique parameters

---

## Phase 7: User Story 6 - Clear Goal Visibility (Priority: P2)

**Goal**: Player always knows current size, target size, and progress toward goal

**Independent Test**: Observe HUD throughout gameplay, verify size/target/level displays update correctly

**Acceptance Scenarios**:
1. HUD shows "Size: 2.5 / 5.0" format with current and target
2. HUD updates in real-time as player grows
3. Visual confirmation when target size reached (optional: green indicator)

### Implementation for User Story 6

- [X] **T032** [P] [US6] Add target size display in gameRenderPost() in src/game.js (top left, "Target: 10.0x" format)
- [X] **T033** [P] [US6] Add level indicator display in gameRenderPost() in src/game.js (top right, "Level 1" format)
- [X] **T034** [US6] Update existing size display from Feature 001 to show progress indicator in src/game.js (optional: color change at 90%)
- [ ] **T035** [US6] Test HUD: verify all displays visible, accurate, and update in real-time

**Checkpoint**: HUD clearly shows current size, target, level, and timer at all times

---

## Phase 8: User Story 7 - Smooth Level Transitions (Priority: P3)

**Goal**: Transition screens are polished and skippable for better user experience

**Independent Test**: Complete/fail levels, verify screens display clearly and skip functionality works

**Acceptance Scenarios**:
1. Victory screen shows level stats and auto-advances after 2-3s
2. Defeat screen shows failure reason and auto-advances after 2-3s
3. Any key press skips transition immediately
4. Automatic progression works correctly (next level or retry)

### Implementation for User Story 7

- [X] **T036** [US7] Implement skip input handling in gameUpdate() in src/game.js (keyWasPressed() during VICTORY/DEFEAT → handleTransition())
- [X] **T037** [US7] Add level stats to victory screen in src/game.js (final size, time remaining from data-model.md)
- [X] **T038** [US7] Add encouragement message to defeat screen in src/game.js ("Try again!" text)
- [X] **T039** [US7] Implement GAME_COMPLETE screen rendering in gameRenderPost() in src/game.js (final victory after Level 3)
- [ ] **T040** [US7] Test transitions: verify skip works, auto-advance timing correct, stats display accurately

**Checkpoint**: All transition screens polished, skippable, and display appropriate feedback

---

## Phase 9: Integration & Polish

**Purpose**: Ensure all user stories work together seamlessly

- [ ] **T041** Integration test: Play complete game flow (Level 1 → 2 → 3) without errors
- [ ] **T042** Integration test: Test defeat on each level, verify retry works correctly
- [X] **T043** Code review: Verify all global variables initialized correctly in src/game.js
- [X] **T044** Code review: Verify no Feature 001 code broken by Feature 002 changes
- [ ] **T045** Performance test: Run Level 3 (80 collectibles max) and verify 60 FPS maintained
- [ ] **T046** Run quickstart.md validation checklist (all 3 levels, defeat flow, timer, boundaries, HUD)
- [ ] **T047** Manual playtest: Verify "SMALL" theme evident through cyclical rebirth pattern (start small 3 times)
- [X] **T048** [P] Update manual-checklist.md in tests/ with Level 2-3 scenarios
- [X] **T049** [P] Add comments to LEVEL_CONFIG and STATE enum for maintainability

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Foundational)**: No dependencies - start immediately - BLOCKS all user stories
- **Phase 2-8 (User Stories)**: All depend on Phase 1 completion
  - Can proceed in parallel if multiple developers
  - Or sequentially in priority order: P1 stories (US1-3) → P2 stories (US4-6) → P3 story (US7)
- **Phase 9 (Integration)**: Depends on all desired user stories complete

### User Story Dependencies

| Story | Priority | Depends On | Can Start After | Blocks |
|-------|----------|------------|-----------------|--------|
| US1 - Level Completion | P1 | Phase 1 | Foundational complete | None (independent) |
| US2 - Failure & Retry | P1 | Phase 1 | Foundational complete | None (independent) |
| US3 - Timer & Urgency | P1 | Phase 1 | Foundational complete | None (independent) |
| US4 - Collectible Spawning | P2 | Phase 1, US1 (startLevel) | US1 complete | None |
| US5 - Difficulty Scaling | P2 | Phase 1 | Foundational complete | None (independent) |
| US6 - Goal Visibility | P2 | Phase 1, US3 (timer) | US3 complete | None |
| US7 - Transitions Polish | P3 | Phase 1, US1, US2 | US1 & US2 complete | None |

### Within Each User Story

**US1 (Level Completion)**:
- T007 (win check) can start immediately
- T008-T010 (startLevel) can run in parallel
- T011 (handleTransition) after T010
- T012 (call startLevel) after T008-T010
- T013 (victory screen) can run in parallel with T008-T012
- T014 (auto-advance) after T011, T013

**US2 (Failure & Retry)**:
- T015 (lose check) depends on US3 timer implementation
- T016 (defeat screen) can run in parallel with T015
- T017 (handleTransition defeat path) after T015
- T018 (test) after T015-T017

**US3 (Timer)**:
- T019 (timer update) can start immediately
- T020 (timer display) depends on T019, T004 (formatTime)
- T021 (urgency color) depends on T020
- T022 (test) after T019-T021

**US4 (Collectible Spawning)**:
- T023 (spawnCollectiblesForLevel) can start immediately
- T024 (clearing) can start immediately
- T025 (call from startLevel) depends on T023, T008 (startLevel exists)
- T026 (update sizes) depends on T023
- T027 (test) after T023-T026

**US5 (Difficulty Scaling)**:
- T028 (verify config) can start immediately (validation only)
- T029 (soft boundaries) can start immediately
- T030 (test boundaries) after T029
- T031 (test difficulty) after all levels playable (US1 complete)

**US6 (Goal Visibility)**:
- T032, T033 marked [P] - can run in parallel (different HUD sections)
- T034 depends on Feature 001 size display existing
- T035 (test) after T032-T034

**US7 (Transitions Polish)**:
- T036 (skip input) depends on US1 T013, US2 T016 (screens exist)
- T037 (victory stats) can run in parallel with T036
- T038 (defeat encouragement) can run in parallel with T036, T037
- T039 (game complete) depends on T011 (handleTransition victory path)
- T040 (test) after T036-T039

### Parallel Opportunities

**Phase 1 (Foundational)**: All tasks T001-T006 marked [P] can run in parallel (different code sections)

**Within User Stories**:
- US1: T008, T009, T010 (startLevel sections), T013 (victory screen) can run in parallel
- US3: All sequential (timer update → display → color)
- US4: T023, T024 can run in parallel
- US6: T032, T033 marked [P] can run in parallel
- US7: T036, T037, T038 can run in parallel

**Across User Stories** (if multiple developers):
- After Phase 1: US1, US2, US3, US5 can all start in parallel
- After US1: US4, US6, US7 can start

---

## Implementation Strategy

### MVP First (P1 Stories Only)

1. **Complete Phase 1**: Foundational (T001-T006) - ~1 hour
2. **Complete US1**: Level completion flow (T007-T014) - ~3-4 hours
3. **Complete US2**: Defeat and retry (T015-T018) - ~2 hours
4. **Complete US3**: Timer display (T019-T022) - ~2 hours
5. **STOP and VALIDATE**: Play all 3 levels, verify win/lose, timer works
6. **MVP COMPLETE**: Playable 3-level game with goals and failure

**At this point: Game is fully playable with clear objectives and challenge**

### Incremental Delivery

1. **Foundation** (Phase 1) → Data structures ready
2. **+ US1** (win flow) → Can complete levels
3. **+ US2** (lose flow) → Can retry on failure → **Playable core loop!**
4. **+ US3** (timer) → Time pressure added → **MVP complete!**
5. **+ US4** (spawning) → Better level variety → **Enhanced difficulty**
6. **+ US5** (scaling) → Proper progression → **Balanced gameplay**
7. **+ US6** (HUD) → Clear feedback → **Polished UX**
8. **+ US7** (transitions) → Smooth flow → **Professional feel**
9. **+ Phase 9** (integration) → Bug-free, validated → **Ready to ship!**

### Parallel Team Strategy (if multiple developers)

**Sequential Critical Path** (1 developer):
1. Phase 1 (1h) → US1 (4h) → US2 (2h) → US3 (2h) → US4 (3h) → US5 (2h) → US6 (2h) → US7 (3h) → Phase 9 (4h)
2. **Total: ~23 hours** (~3 days) - matches plan.md estimate of 1.5-2 days with efficiency

**Parallel Execution** (2 developers):
1. Both: Phase 1 together (1h)
2. Dev A: US1 + US3 (6h) | Dev B: US2 + US5 (4h)
3. Dev A: US4 (3h) | Dev B: US6 + US7 (5h)
4. Both: Phase 9 together (4h)
5. **Total: ~14 hours** (~2 days)

---

## Task Time Estimates

| Task | Estimate | Notes |
|------|----------|-------|
| T001-T006 | 1h total | Data structure setup |
| T007-T014 | 3-4h | US1 win flow |
| T015-T018 | 2h | US2 lose flow |
| T019-T022 | 2h | US3 timer |
| T023-T027 | 2-3h | US4 spawning |
| T028-T031 | 2h | US5 scaling |
| T032-T035 | 2h | US6 HUD |
| T036-T040 | 3h | US7 transitions |
| T041-T049 | 4-5h | Integration & polish |
| **TOTAL** | **21-26h** | **~3 days solo, ~2 days parallel** |

---

## Notes

- All tasks modify `src/game.js` (single-file LittleJS pattern)
- [P] tasks can run in parallel (different code sections)
- Each user story independently testable after its phase
- No automated tests (manual playtesting per constitution)
- Commit after each user story phase completion
- Stop at any checkpoint to validate story independently
- Feature 001 code must remain functional throughout

---

## Validation Checkpoints

After each phase, run these quick validation tests:

**Phase 1**: Verify globals declared without errors, game still runs
**US1**: Win Level 1, see victory screen, Level 2 starts
**US2**: Lose Level 1 (let timer expire), see defeat screen, retry works
**US3**: Timer counts down from 1:00 to 0:00, shows orange at ≤10s
**US4**: Each level spawns correct count/size collectibles
**US5**: Camera stops at boundaries, no black edges
**US6**: HUD shows size/target/level/timer clearly
**US7**: Can skip transitions with key press, auto-advance works
**Phase 9**: Complete game works flawlessly, 60 FPS maintained

---

**Total Tasks**: 49
**Critical Path**: Phase 1 → US1 → US2 → US3 → Phase 9 (MVP)
**Full Feature**: All phases complete
**Estimated Duration**: 21-26 hours (1.5-3 days)
**Ready to Begin**: Yes - all design artifacts complete
