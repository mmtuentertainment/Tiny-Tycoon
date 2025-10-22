# Tasks: Core Katamari Mechanic

**Input**: Design documents from `/home/matt/Game Development/specs/001-implement-the-foundational/`
**Prerequisites**: plan.md (complete), spec.md (complete, clarified), research.md (complete), data-model.md (complete), quickstart.md (complete)

**Tests**: No automated tests for P1 (manual playtesting per constitution Article V - time-constrained jam)

**Organization**: Tasks grouped by user story to enable independent implementation and testing of each story.

**File Path**: All tasks operate on `/home/matt/Game Development/games/game-jam-2025/src/game.js` (single-file approach per constitution Article IV)

---

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different sections, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Tasks are atomic: <1 hour each, clear completion criteria

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project environment and prepare for implementation

- [ ] T001 Verify LittleJS engine available at `../../LittleJS/dist/littlejs.release.js`
- [ ] T002 Verify `index.html` correctly loads LittleJS and `src/game.js`
- [ ] T003 Verify development server works (`npm run dev` → http://localhost:8000)
- [ ] T004 Verify browser console shows no errors on page load
- [ ] T005 Verify existing game.js skeleton has all 6 LittleJS callbacks (engineInit, gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost)

**Checkpoint**: Development environment operational, skeleton intact

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core configuration that MUST be complete before ANY user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Add COLLECTIBLE_DATA configuration object to `src/game.js` after `'use strict'` with coin and customer definitions (sizeRange, value, color, spawnWeight from data-model.md)
- [ ] T007 Add global `player` variable declaration at top of `src/game.js` (after COLLECTIBLE_DATA)
- [ ] T008 Verify COLLECTIBLE_DATA accessible in console (reload page, type `COLLECTIBLE_DATA` in console → should show object)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Player Movement & Control (Priority: P1) 🎯 MVP

**Goal**: Playable character that responds to WASD/Arrow keys with momentum physics and camera follow

**Independent Test**: Load game, press WASD/Arrow keys, player ball moves with momentum, camera follows smoothly

### Implementation for User Story 1

- [ ] T009 [US1] Create PlayerBall class skeleton in `src/game.js` after gameRenderPost() function (extends EngineObject, constructor only)
- [ ] T010 [US1] Implement PlayerBall constructor in `src/game.js`: Set pos from parameter, size vec2(0.5, 0.5), mass 0.25, damping 0.9, score 0, color golden yellow, collideTiles false (20 lines)
- [ ] T011 [US1] Implement PlayerBall.update() method in `src/game.js`: Add WASD input detection (KeyD, KeyA, KeyW, KeyS), add Arrow key detection (ArrowRight, ArrowLeft, ArrowUp, ArrowDown), calculate moveInput vec2, apply acceleration to velocity, call super.update() (15 lines, uses research.md R3 parameters)
- [ ] T012 [US1] Add empty PlayerBall.render() method in `src/game.js`: Use drawRect(this.pos, this.size, this.color) for code-based shape (5 lines)
- [ ] T013 [US1] Update gameInit() in `src/game.js`: Set cameraPos to vec2(0, 0), set cameraScale to 32, create player instance `player = new PlayerBall(vec2(0, 0))` (5 lines)
- [ ] T014 [US1] Update gameUpdate() in `src/game.js`: Add camera follow with lerp - `if (player) cameraPos = cameraPos.lerp(player.pos, 0.1)` using lerp factor from research.md R3 (3 lines)
- [ ] T015 [US1] Manual test: Reload page, verify player (golden square) visible at center, no console errors
- [ ] T016 [US1] Manual test: Press W/Up Arrow → player moves up, A/Left → moves left, S/Down → moves down, D/Right → moves right (FR-002, FR-003)
- [ ] T017 [US1] Manual test: Hold key then release → player continues moving then gradually slows (momentum + damping, FR-004, FR-005)
- [ ] T018 [US1] Manual test: Move player around → camera smoothly follows with slight lag (FR-013, SC-007)

**Checkpoint**: Player Movement & Control complete - player is controllable and camera follows ✅

---

## Phase 4: User Story 2 - Size-Based Collection System (Priority: P1)

**Goal**: Collectible objects spawn, player can collect smaller objects, collision detection works

**Independent Test**: Load game, collectibles visible around player, move into smaller collectibles and they disappear, score increases

### Implementation for User Story 2

- [ ] T019 [US2] Create Collectible class skeleton in `src/game.js` after PlayerBall class (extends EngineObject, constructor only)
- [ ] T020 [US2] Implement Collectible constructor in `src/game.js`: Accept pos, type, size parameters, set size vec2(size, size), set type/value/color from COLLECTIBLE_DATA[type], set magnetActive false, collideTiles false, mass 0 (10 lines from data-model.md)
- [ ] T021 [US2] Add empty Collectible.update() method in `src/game.js` (placeholder, will add magnet in T028-T030)
- [ ] T022 [US2] Add Collectible.render() method in `src/game.js`: Use drawRect(this.pos, this.size, this.color) (3 lines)
- [ ] T023 [US2] Create spawnCollectibles() function in `src/game.js` before class definitions: Implement grid spawning with 12×12 cells, cell size 2.5, grid offset -15, randomization ±1.0, weighted type selection 60% coins / 40% customers, random size within type range from COLLECTIBLE_DATA (30 lines from research.md R4 and quickstart.md Step 5)
- [ ] T024 [US2] Update gameInit() in `src/game.js`: Call spawnCollectibles() after player creation (1 line)
- [ ] T025 [US2] Manual test: Reload page, verify 144 collectibles visible (yellow coins and blue customers scattered around player), console shows "Spawned 144 collectibles"
- [ ] T026 [US2] Implement PlayerBall.collideWithObject() method in `src/game.js`: Check if other is Collectible instance, check if this.size.x > other.size.x (strict smaller check), if true call this.collect(other), return false for no bounce (10 lines from data-model.md)
- [ ] T027 [US2] Implement PlayerBall.collect() method stub in `src/game.js`: Add this.score += collectible.value, call collectible.destroy() - NO size growth yet (saved for US3) (5 lines)
- [ ] T028 [US2] Manual test: Move player into small coin (0.3-0.4 size) → coin disappears, score increases by 10 (FR-008, FR-009, FR-010)
- [ ] T029 [US2] Manual test: Move player (size 0.5) into customer (0.6-0.8 size) → customer does NOT disappear (too large, FR-008)
- [ ] T030 [US2] Manual test: Verify same-size collision (create test collectible at exact 0.5 size) → cannot collect (edge case)
- [ ] T031 [US2] Manual test: Verify console has no errors, engineObjects.length decreases as collectibles collected

**Checkpoint**: Size-Based Collection System complete - collision detection works, objects can be collected ✅

---

## Phase 5: User Story 3 - Exponential Growth System (Priority: P1)

**Goal**: Player ball grows exponentially when collecting objects, size progression is visually dramatic

**Independent Test**: Collect sequence of objects, player ball grows noticeably, previously uncollectable objects become collectable

### Implementation for User Story 3

- [ ] T032 [US3] Update PlayerBall.collect() method in `src/game.js`: Add exponential growth formula - calculate growthAmount as (collectible.value / 200) * this.size.x, add growthAmount to this.size (vec2), update this.mass to size.x * size.x (area-based) (8 lines from research.md R1)
- [ ] T033 [US3] Manual test: Collect small coin (value 10) at starting size 0.5 → verify size increases to ~0.525 (noticeable 5% growth, FR-011 acceptance 1)
- [ ] T034 [US3] Manual test: Grow to size 1.0, collect customer (value 50) → verify size increases by ~0.25 (25% growth, larger than coin, FR-011 acceptance 2)
- [ ] T035 [US3] Manual test: Grow to size 3.0, collect coin (value 10) → verify absolute growth (~0.15) larger than early-game coin collection (exponential effect, SC-010)
- [ ] T036 [US3] Manual test: Start game fresh, collect objects continuously for 60 seconds, verify final size reaches 4.0-6.0 range (10x growth from 0.5, SC-003)
- [ ] T037 [US3] Manual test: Grow player to size 0.7, approach customer at 0.6 → verify customer now shows as collectable (previously too large, now smaller than player, FR-011 acceptance 4)
- [ ] T038 [US3] Manual test: Observe size progression over 30 seconds → verify visually dramatic and immediately recognizable (FR-017, FR-018, TSC-001)
- [ ] T039 [US3] Manual test: Have non-player observer watch 30 seconds of gameplay → verify they can identify "SMALL" theme without prompting (TSC-003 target: 90% success)

**Checkpoint**: Exponential Growth System complete - satisfying size progression, theme evident ✅

---

## Phase 6: User Story 2 Extended - Magnetic Attraction (Priority: P1)

**Goal**: Near-size collectibles exhibit magnetic pull toward player

**Independent Test**: Grow player to size where customers are nearly collectable (0.8-0.9 size), approach customer, observe magnetic pull

**Note**: This enhances US2 but was deferred after basic collection to ensure core collision works first

### Implementation for Magnetic Attraction

- [ ] T040 [US2] Update Collectible.update() method in `src/game.js`: Check if player exists, calculate distanceToPlayer using this.pos.distance(player.pos) (5 lines)
- [ ] T041 [US2] Add magnetic attraction logic to Collectible.update() in `src/game.js`: Calculate sizeRatio (this.size.x / player.size.x), check conditions (distance < 2.5 && sizeRatio >= 0.8 && sizeRatio < 1.0), calculate sizeRatioFactor using (sizeRatio - 0.8) / 0.15 clamped to 1.0 (8 lines from research.md R2)
- [ ] T042 [US2] Add magnetic force calculation to Collectible.update() in `src/game.js`: Calculate magnetForce using (1.5 / (distanceToPlayer + 0.1)) * sizeRatioFactor, calculate directionToPlayer vector (player.pos - this.pos).normalize(), apply force to velocity, set this.magnetActive = true (8 lines from research.md R2)
- [ ] T043 [US2] Add else clause to Collectible.update() in `src/game.js`: Set this.magnetActive = false when conditions not met (2 lines)
- [ ] T044 [US2] Add magnet visual feedback to Collectible.render() in `src/game.js`: If magnetActive, draw glow outline using drawRect with size.scale(1.2) and color.scale(0.5, 0.1) for transparency (4 lines from data-model.md)
- [ ] T045 [US2] Manual test: Start fresh game, collect coins until size ~0.7, approach customer at 0.6-0.7 size → verify customer does NOT pull (too large, sizeRatio > 1.0)
- [ ] T046 [US2] Manual test: Grow player to size 0.8, approach customer at 0.7 size → verify customer pulls toward player (sizeRatio 0.875, within 80-95% range, FR-012)
- [ ] T047 [US2] Manual test: Verify magnetic pull only activates within 2.5 units distance (move away from near-size object → magnet deactivates)
- [ ] T048 [US2] Manual test: Observe glow effect on magnetActive collectibles (visual feedback working)

**Checkpoint**: Magnetic Attraction complete - near-size objects pulled to player ✅

---

## Phase 7: User Story 4 - Visual Feedback & HUD (Priority: P2)

**Goal**: Display player size and score on screen in readable format without obstructing gameplay

**Independent Test**: Play game, observe top-left and top-right corners, size and score update as collections occur

### Implementation for User Story 4

- [ ] T049 [P] [US4] Implement size display in gameRenderPost() in `src/game.js`: Calculate sizeMultiplier as (player.size.x / 0.5).toFixed(1), call drawTextScreen with text "Size: ${multiplier}x", position vec2(80, mainCanvasSize.y - 40), size 32, color white, alignment left, font monospace, outline black (8 lines from research.md R5 and quickstart.md Step 8)
- [ ] T050 [P] [US4] Implement score display in gameRenderPost() in `src/game.js`: Format score with player.score.toLocaleString(), call drawTextScreen with text "$${scoreFormatted}", position vec2(mainCanvasSize.x - 150, mainCanvasSize.y - 40), size 32, color yellow, alignment right, font monospace, outline black (8 lines from research.md R5)
- [ ] T051 [US4] Manual test: Reload page, verify "Size: 1.0x" displays top-left (0.5 size = 1.0 multiplier, FR-014)
- [ ] T052 [US4] Manual test: Verify "$0" displays top-right (starting score, FR-015)
- [ ] T053 [US4] Manual test: Collect one coin → verify size display updates to "Size: 1.1x" immediately (FR-014 acceptance 3)
- [ ] T054 [US4] Manual test: Collect one coin → verify score updates to "$10" immediately (FR-015 acceptance 4)
- [ ] T055 [US4] Manual test: Collect 10+ objects → verify score shows comma formatting (e.g., "$1,250" for readability)
- [ ] T056 [US4] Manual test: Move player around world → verify HUD stays fixed in screen space (doesn't move with camera, FR-016)
- [ ] T057 [US4] Manual test: Check HUD doesn't obscure player ball or nearby collectibles (FR-016, SC-009)

**Checkpoint**: Visual Feedback & HUD complete - player has clear progress indicators ✅

---

## Phase 8: Integration & Polish (Cross-Cutting Concerns)

**Purpose**: Final integration, performance validation, and theme verification

### Integration Tasks

- [ ] T058 Add console.log statements for debugging: "Tiny Tycoon - Game initialized" in gameInit(), "Spawned ${count} collectibles" in spawnCollectibles() (2 lines)
- [ ] T059 Verify all global variables declared at top: player (1 line check)
- [ ] T060 Verify class definition order: COLLECTIBLE_DATA → spawnCollectibles() → engineInit/game callbacks → PlayerBall class → Collectible class (ordering check)
- [ ] T061 Add code comments for clarity: Section headers using `// ============ SECTION ============` format (10 lines total)

### Performance Validation Tasks

- [ ] T062 Performance test: Open console, check `engineUpdateTime` value → verify < 16ms (60 FPS, SC-002)
- [ ] T063 Performance test: Check `engineObjects.length` in console after spawn → verify 145 objects (1 player + 144 collectibles, SC-002)
- [ ] T064 Performance test: Play game for 60 seconds continuously → verify no FPS drops, smooth gameplay maintained (SC-002)
- [ ] T065 Performance test: Open DevTools Performance tab, record 10 seconds of gameplay, verify solid 60 FPS line (SC-002)

### Theme Validation Tasks

- [ ] T066 Theme test: Fresh start, play for exactly 30 seconds while timer running, check if "SMALL to BIG" transformation is obvious (FR-018)
- [ ] T067 Theme test: Show game to another person for 30 seconds → ask "What's the theme?" without prompting → target 90%+ identify "SMALL" or "growing" (TSC-003, SC-004)
- [ ] T068 Theme test: Verify player starts visibly tiny (0.5 units) and grows to visibly large (4.0+ units) within 60 seconds (SC-003)
- [ ] T069 Theme test: Confirm size progression is "immediately recognizable" and "visually dramatic" per FR-017 (subjective but critical)

### Edge Case Validation Tasks

- [ ] T070 Edge case test: Create collectible at exactly player.size → verify cannot collect (same size, edge case 1)
- [ ] T071 Edge case test: Verify magnetic attraction activates between 2-2.5 units distance, deactivates beyond 2.5 (edge case 2)
- [ ] T072 Edge case test: Collect all 144 objects → verify player can still move, no errors (empty screen, edge case 3)
- [ ] T073 Edge case test: Don't move player → verify collectibles stay static (no drift toward stationary player unless magnet active, edge case 7)
- [ ] T074 Edge case test: Position player overlapping 3+ collectibles → verify all get collected in same frame (edge case 6)

### Cross-Browser Validation Tasks

- [ ] T075 [P] Cross-browser test: Open game in Chrome latest → verify all functionality works (SC-008)
- [ ] T076 [P] Cross-browser test: Open game in Firefox latest → verify all functionality works (SC-008)
- [ ] T077 [P] Cross-browser test: Open game in Safari latest (if available) → verify all functionality works (SC-008)

### Constitution Compliance Validation

- [ ] T078 Constitution check: Verify theme "SMALL" evident in first 30 seconds (Article I requirement)
- [ ] T079 Constitution check: Verify all Katamari mechanics present: size-based collision, momentum, magnetic attraction (Article II)
- [ ] T080 Constitution check: Verify implementation time < 2 days (Article III timeline)
- [ ] T081 Constitution check: Verify using LittleJS idioms: EngineObject, vec2(), no external deps (Article IV)
- [ ] T082 Constitution check: Verify code-based shapes used (Article V: Playable > Pretty)

### Final Quality Gates (from constitution)

- [ ] T083 Quality gate: Playable without console errors (open DevTools, check console is clean)
- [ ] T084 Quality gate: Theme "SMALL" immediately evident (30-second observation test)
- [ ] T085 Quality gate: Runs at 60 FPS with 100+ entities on screen (performance tab validation)
- [ ] T086 Quality gate: Works in Chrome + Firefox desktop (cross-browser tests T075-T076 passed)
- [ ] T087 Quality gate: Can be explained in <30 seconds ("Control ball, collect smaller objects, grow big" - simple pitch)
- [ ] T088 Quality gate: Contributes to winning jam (theme interpretation strong, gameplay fun, innovation evident)

**Checkpoint**: All integration and validation complete - feature ready for merge ✅

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately (T001-T005)
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories (T006-T008)
- **User Story 1 (Phase 3)**: Depends on Foundational completion (T009-T018)
- **User Story 2 (Phase 4)**: Depends on User Story 1 completion (needs player to collide with, T019-T031)
- **User Story 2 Extended (Phase 6)**: Depends on User Story 2 basic collection working (T040-T048)
- **User Story 3 (Phase 5)**: Depends on User Story 2 completion (needs collection to trigger growth, T032-T039)
- **User Story 4 (Phase 7)**: Depends on User Story 1 and 3 (needs player.size and player.score, T049-T057)
- **Integration (Phase 8)**: Depends on all user stories complete (T058-T088)

### Critical Path (Must Complete in Order)

```
T001-T005 (Setup)
    ↓
T006-T008 (Foundation: COLLECTIBLE_DATA)
    ↓
T009-T018 (US1: Player Movement - creates player)
    ↓
T019-T031 (US2: Collection - creates collectibles, basic collision)
    ↓
T032-T039 (US3: Growth - adds size increase to collection)
    ↓
T040-T048 (US2 Extended: Magnetic - enhances collection)
    ↓
T049-T057 (US4: HUD - adds visual feedback)
    ↓
T058-T088 (Integration & Validation)
```

### User Story Independence

**Note**: While tasks have sequential dependencies above, this is due to the single-file architecture. The user stories themselves are logically independent:

- **User Story 1**: Could be tested alone (player movement without collectibles)
- **User Story 2**: Requires US1 (needs player to move and collide)
- **User Story 3**: Requires US2 (needs collection events to trigger growth)
- **User Story 4**: Requires US1 + US3 (needs player.size and player.score values)

If using multi-file architecture, US1, US2 (basic), and US4 could be developed in parallel by different developers.

### Within Each User Story

**User Story 1 (T009-T018)**:
- T009-T012: Class definition (sequential, same class)
- T013-T014: Game callbacks update (sequential, dependencies)
- T015-T018: Manual testing (sequential, verify each feature)

**User Story 2 (T019-T031 + T040-T048)**:
- T019-T022: Collectible class (sequential, same class)
- T023-T024: Spawning (sequential, T024 depends on T023)
- T025-T031: Testing basic collection (sequential)
- T040-T048: Magnetic enhancement (sequential, modifies Collectible.update)

**User Story 3 (T032-T039)**:
- T032: Modify collect() method (single change)
- T033-T039: Progressive testing (sequential, build understanding)

**User Story 4 (T049-T057)**:
- T049-T050: Marked [P] - can implement both displays in parallel (independent code)
- T051-T057: Testing (sequential)

**Integration (T058-T088)**:
- T058-T061: Code quality (sequential)
- T062-T065: Performance (sequential)
- T066-T069: Theme (sequential)
- T070-T074: Edge cases (could be parallel but sequential is fine)
- T075-T077: Marked [P] - different browsers, test in parallel
- T078-T088: Validation (sequential checklist)

### Parallel Opportunities

Tasks marked [P] can run simultaneously:

- **T049 and T050**: Size display and score display (different screen positions, independent)
- **T075, T076, T077**: Chrome, Firefox, Safari testing (different browsers)

**Limited Parallelization**: Due to single-file architecture (src/game.js), most tasks are sequential to avoid merge conflicts.

---

## Parallel Example: User Story 4

```bash
# These two tasks can be done in parallel (different screen positions):
T049: Implement size display (top-left corner)
T050: Implement score display (top-right corner)

# Then test both together:
T051-T057: Manual testing of both displays
```

---

## Implementation Strategy

### MVP First (User Stories 1-3 Only)

**Minimum Viable Prototype** - Playable core loop:
1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T008)
3. Complete Phase 3: User Story 1 - Player Movement (T009-T018)
4. Complete Phase 4: User Story 2 - Collection (T019-T031)
5. Complete Phase 5: User Story 3 - Growth (T032-T039)
6. Complete Phase 6: User Story 2 Extended - Magnetic (T040-T048)
7. **STOP and VALIDATE**: Test core loop works (move, collect, grow)
8. This achieves Day 7 milestone: "Playable core loop" ✅

**Optional Enhancement** - Add HUD (recommended):
9. Complete Phase 7: User Story 4 - HUD (T049-T057)
10. Complete Phase 8: Integration & Validation (T058-T088)

### Incremental Delivery

Each checkpoint represents a testable increment:
1. **Setup + Foundation** (T001-T008) → Configuration ready
2. **+ User Story 1** (T009-T018) → Player controllable, camera follows
3. **+ User Story 2** (T019-T031) → Collectibles spawn, basic collision works
4. **+ User Story 3** (T032-T039) → Growth system active, theme evident
5. **+ User Story 2 Extended** (T040-T048) → Magnetic attraction enhances collection
6. **+ User Story 4** (T049-T057) → HUD provides feedback
7. **+ Integration** (T058-T088) → Full validation, ready to ship

**Each increment is playable and testable independently** ✅

### Time Estimates

| Phase | Tasks | Est. Time | Running Total |
|-------|-------|-----------|---------------|
| Setup | T001-T005 | 15 min | 0:15 |
| Foundational | T006-T008 | 15 min | 0:30 |
| US1: Movement | T009-T018 | 1.5 hours | 2:00 |
| US2: Collection | T019-T031 | 2 hours | 4:00 |
| US3: Growth | T032-T039 | 1 hour | 5:00 |
| US2: Magnetic | T040-T048 | 1 hour | 6:00 |
| US4: HUD | T049-T057 | 1 hour | 7:00 |
| Integration | T058-T088 | 2 hours | 9:00 |

**Total Estimate**: ~9 hours (fits within <2 day constraint, target Oct 16) ✅

---

## Notes

- All tasks modify single file: `src/game.js` (no parallelization across files)
- [P] tasks are rare due to single-file architecture (only T049-T050, T075-T077)
- Manual testing emphasized (no automated test tasks per constitution Article V)
- Each user story phase has clear checkpoint (independently testable state)
- Tasks are atomic: <1 hour each, specific file modifications
- Total: 88 tasks (very granular for complex feature, reduces risk)
- Verification tasks (manual tests) are as important as implementation tasks
- Theme validation (T066-T069) critical for game jam judging success
- Constitution compliance checks (T078-T082) ensure governance adherence

**Next Step**: Run `/speckit.implement` to begin executing tasks sequentially, or start manual implementation using quickstart.md as guide.
