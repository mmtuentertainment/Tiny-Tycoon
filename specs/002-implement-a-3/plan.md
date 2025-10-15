# Implementation Plan: Level Progression System

**Branch**: `002-implement-a-3` | **Date**: 2025-10-15 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/home/matt/Game Development/specs/002-implement-a-3/spec.md`

**Note**: This plan follows the Tiny Tycoon constitution principles and builds upon Feature 001 (Core Katamari Mechanic). Targets Day 14 (Oct 27) milestone for complete 3-level game.

## Summary

Implement a 3-level progression system that structures the Katamari collection gameplay into distinct challenges with escalating difficulty. Each level has a target size goal (L1: 5.0, L2: 15.0, L3: 50.0), time limit (L1: 60s, L2: 90s, L3: 120s), and scaled play area (L1: 50x50, L2: 100x100, L3: 150x150 units). Core systems include level configuration data structure, countdown timer display in MM:SS format with visual urgency at 10 seconds, win condition checking (size >= target), lose condition checking (time == 0), victory/defeat transition screens (2-3s auto-advance, skip with any key), immediate retry functionality after defeat, automatic progression to next level after victory, level-appropriate collectible spawning (L1: 30-50, L2: 40-60, L3: 50-80 objects with scaled size ranges), player size reset on level start, collectible clearing between levels, and soft boundary enforcement via camera limits. The "SMALL" theme is reinforced through cyclical rebirth - players repeatedly start small and must grow big, creating multiple "small beginnings, big achievements" moments across all three levels. Technical approach extends existing Feature 001 game.js with level management state machine, timer system integrated with gameUpdate(), HUD extensions for timer/target display, and transition screen rendering in gameRenderPost().

## Technical Context

**Language/Version**: JavaScript ES6+ (const/let, arrow functions, classes per constitution Article IV)
**Primary Dependencies**: LittleJS latest from workspace (`../../LittleJS/dist/littlejs.release.js`), Feature 001 implementation (PlayerBall, Collectible, core mechanics)
**Storage**: N/A (no persistence, levels reset on page reload)
**Testing**: Manual playtesting with focus on level transitions, timer accuracy, retry flow (constitution Article V: manual > automated for jam)
**Target Platform**: Web browsers desktop (Chrome/Firefox/Safari latest 2 versions per constitution)
**Project Type**: Game (LittleJS single-file jam structure)
**Performance Goals**: 60 FPS with 80 collectibles max (L3 upper bound), timer updates at 1Hz without frame drops
**Constraints**: <2 days implementation (constitution Article III), builds on Feature 001 code, no external dependencies, no state persistence
**Scale/Scope**: 3 levels total, 2 transition screens (victory/defeat), 1 timer system, level-specific spawn configurations

**LittleJS Game-Specific**:

- **Engine Version**: LittleJS latest from workspace repository
- **Physics Requirements**: Extends Feature 001 physics (momentum, collection, magnetic attraction) with soft boundary enforcement - camera clamped to play area bounds while player can move freely
- **Asset Budget**: Code-based shapes for transition screens (drawTextScreen for messages), timer uses existing HUD text rendering, no additional assets required for P1
- **Game Jam Theme**: "SMALL" - Reinforces theme through cyclical rebirth pattern - players experience "starting SMALL" moment three times (once per level), each with progressively larger "BIG" achievement goals (5x → 15x → 50x from 0.5 start)
- **Physics Innovation**: N/A (Feature 002 is game structure, not physics mechanic)
- **Shared Components**: None (self-contained extension of Feature 001)
- **Performance Target**: 60 FPS mid-range devices, <250KB total game size (Feature 001 baseline + level system overhead)
- **Browser Support**: Chrome/Firefox/Safari latest 2 versions desktop only (mobile deferred to post-jam)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Article I: Theme-First Development ✅ PASS

- ✅ Feature reinforces "SMALL" theme through cyclical rebirth (start small 3x, grow big 3x)
- ✅ Theme Success Criteria TSC-001 to TSC-004 all address theme integration
- ✅ Level transition screens can emphasize size comparison (SMALL→BIG visual feedback)
- ✅ Implementation rules: Player resets to 0.5 size each level, target sizes scale dramatically (5.0 → 15.0 → 50.0)

### Article II: Katamari Mechanics ✅ PASS

- ✅ Feature extends Feature 001 core loop, doesn't replace it
- ✅ All Katamari mechanics (Roll→Collect→Grow→Unlock) remain unchanged
- ✅ Level system adds structure and goals without altering collection mechanics
- ✅ Size-based collision, momentum, magnetic attraction preserved from Feature 001

### Article III: Game Jam Timeline ✅ PASS

- ✅ P1 priority level system (Week 2: Oct 21-27, follows Feature 001 completion)
- ✅ <2 day implementation estimate (Oct 21-23 target, 4 days before Day 14 milestone)
- ✅ Day 14 milestone: Complete 3-level game with win/lose conditions
- ✅ Code-based transition screens acceptable P1 (sprite polish deferred to P3)
- ✅ Manual testing only

### Article IV: LittleJS Native ✅ PASS

- ✅ No new classes required (state machine in global scope, timer in gameUpdate)
- ✅ Use vec2() for play area boundaries
- ✅ Extends existing game.js (Feature 001 base ~400 lines, Feature 002 adds ~300 lines = ~700 total, within 1000 line jam guideline)
- ✅ Data-driven: LEVEL_CONFIG array with per-level parameters
- ✅ Global variables: currentLevel, levelState, levelTimer, remainingTime
- ✅ No external dependencies, no TypeScript

### Article V: Playable > Pretty ✅ PASS

- ✅ Priority 1: Level progression (US1: completion flow, US2: retry, US3: timer) - all P1
- ✅ Priority 2: Collectible spawning, difficulty scaling - P2 (required for complete game)
- ✅ Priority 3: Transition screen polish, skip functionality - P3 (UX enhancement)
- ✅ Priority 4-7: Sound effects, visual effects, animations deferred to post-P2
- ✅ Definition of Done: Complete 3 levels, clear feedback, timer accuracy, theme evident

**CONSTITUTION CHECK RESULT: ✅ ALL 5 PRINCIPLES PASS - PROCEED TO PHASE 0**

## Project Structure

### Documentation (this feature)

```
specs/002-implement-a-3/
├── spec.md              # ✅ Complete (validated, clarified with 5 Q&A)
├── plan.md              # This file (Phase 0 pending)
├── research.md          # Phase 0 output (pending)
├── data-model.md        # Phase 1 output (pending)
├── quickstart.md        # Phase 1 output (pending)
└── tasks.md             # Phase 2 (/speckit.tasks - NOT created by /speckit.plan)
```

### Source Code (games/game-jam-2025/)

```
src/
├── game.js              # Extended from Feature 001 (~400 lines)
│                        # NEW: Level management state machine (~60 lines)
│                        #   - LEVEL_CONFIG array (3 levels × ~15 lines = 45)
│                        #   - currentLevel, levelState enums (~15 lines)
│                        # NEW: Timer system (~40 lines)
│                        #   - levelTimer, remainingTime variables
│                        #   - Timer countdown in gameUpdate (~15 lines)
│                        #   - Timer urgency check (<10s) (~10 lines)
│                        #   - Win/lose condition checks (~15 lines)
│                        # NEW: Level initialization (~50 lines)
│                        #   - startLevel(levelNum) function (~25 lines)
│                        #   - clearCollectibles() function (~10 lines)
│                        #   - resetPlayer() function (~15 lines)
│                        # NEW: Collectible spawning per level (~40 lines)
│                        #   - spawnCollectiblesForLevel(config) (~40 lines)
│                        # NEW: Soft boundary enforcement (~20 lines)
│                        #   - Camera clamp in gameUpdatePost (~20 lines)
│                        # NEW: Transition screens (~60 lines)
│                        #   - Victory screen rendering (~25 lines)
│                        #   - Defeat screen rendering (~25 lines)
│                        #   - Skip input handling (~10 lines)
│                        # NEW: HUD extensions (~30 lines)
│                        #   - Timer display MM:SS format (~15 lines)
│                        #   - Target size display (~10 lines)
│                        #   - Level indicator (~5 lines)
│                        # Total NEW for Feature 002: ~300 lines
│                        # Total game.js: ~700 lines (within jam guidelines)
│
├── objects/             # (Future P3 if game.js exceeds 1000 lines)
└── levels/              # (Future post-jam if level data becomes complex)

assets/
└── sprites.png          # 256×256 placeholder (unused P1, ready for P3)

tests/
└── manual-checklist.md  # Extended with level progression playtest scenarios

index.html               # Unchanged from Feature 001
build.js                 # Production build (P3 submission)
package.json             # npm run dev script (unchanged)
```

**Structure Decision**: Continue single-file game.js (LittleJS jam pattern) per constitution Article IV. Feature 002 adds ~300 lines to Feature 001's ~400 lines = ~700 total, comfortably within 1000 line guideline. Multi-file refactor only if combined features exceed 1000 lines in future P3+ work.

## Complexity Tracking

*No complexity violations. Feature follows single-file LittleJS pattern and extends existing code without abstraction layers.*

## Phase 0: Research & Technical Decisions

**Status**: Requires execution
**Output**: `research.md`

### Research Tasks

#### R1: Timer Update Frequency ⚠️ CRITICAL

**Question**: How to implement 1Hz timer countdown without performance impact at 60 FPS?

**Context**:
- FR-002: Timer counts down each second
- gameUpdate() runs at 60 FPS
- Need to track elapsed time and update remaining time display

**Research Approach**:
1. Use LittleJS `time` global (seconds since game start)
2. Track `levelStartTime` when level begins
3. Calculate `elapsedTime = time - levelStartTime`
4. Calculate `remainingTime = levelConfig.timeLimit - elapsedTime`
5. Update check: `if (Math.floor(remainingTime) !== Math.floor(previousRemainingTime))`
6. Validate: No GC pressure, timer accurate to ±50ms

**Deliverable**: Pseudocode for timer system with LittleJS time integration

---

#### R2: MM:SS Format Conversion ⚠️ IMPORTANT

**Question**: What's the JavaScript formula to convert seconds (60, 90, 120) to MM:SS string?

**Context**:
- FR-002: Display as MM:SS format (e.g., "1:00", "1:30", "2:00")
- Remaining time is float (decrements continuously)
- Need integer seconds for display

**Research Approach**:
1. Formula: `const seconds = Math.floor(remainingTime)`
2. Minutes: `const minutes = Math.floor(seconds / 60)`
3. Remaining seconds: `const secs = seconds % 60)`
4. Format: `const display = ${minutes}:${secs.toString().padStart(2, '0')}`
5. Examples: 90s → "1:30", 10s → "0:10", 0s → "0:00"

**Deliverable**: Single line JavaScript function formatTime(seconds)

---

#### R3: Soft Boundary Implementation ⚠️ CRITICAL

**Question**: How to clamp camera to play area bounds while allowing player to move freely?

**Context**:
- FR-001a: Soft boundaries (camera limits) for each level's play area
- Clarification: L1: 50×50, L2: 100×100, L3: 150×150 units
- Player can move anywhere, camera stops at edges
- Feature 001 uses cameraPos for follow, cameraScale for zoom

**Research Approach**:
1. Calculate play area bounds: `const halfSize = levelConfig.playAreaSize / 2`
2. Bounds: `minX = -halfSize, maxX = halfSize, minY = -halfSize, maxY = halfSize`
3. Clamp camera after lerp: `cameraPos.x = clamp(cameraPos.x, minX, maxX)`
4. Viewport size consideration: Add margin for half-screen visibility
5. Test at boundaries: Player visible, no black edges

**Deliverable**: Camera clamp pseudocode with play area size integration

---

#### R4: Level-Specific Spawn Algorithm ⚠️ CRITICAL

**Question**: How to spawn 30-50 (L1), 40-60 (L2), 50-80 (L3) collectibles within play area bounds?

**Context**:
- Clarification: Dynamic spawn counts per level
- Collectible size ranges scale with level (L1: 0.3-3.0, L2: 3.0-10.0, L3: 10.0-40.0)
- Must respect play area dimensions (no out-of-bounds spawning)
- Randomized grid pattern from Feature 001

**Research Approach**:
1. Extend Feature 001's grid spawning with level config
2. Grid cells: Calculate `Math.sqrt(spawnCount)` for even distribution
3. Cell size: `playAreaSize / gridDimension`
4. Randomize within cell: `±cellSize * 0.4` (avoid cell center clustering)
5. Size selection: `rand(config.collectibleSizeMin, config.collectibleSizeMax)`
6. Type distribution: Keep Feature 001 60/40 coin/customer split
7. Boundary check: Ensure `pos.x ± size < playAreaBounds`

**Deliverable**: spawnCollectiblesForLevel(config) pseudocode

---

#### R5: Transition Screen State Machine ⚠️ IMPORTANT

**Question**: What states and transitions handle victory/defeat/retry/next-level flow?

**Context**:
- US1: Victory → next level (auto after 2-3s or skip)
- US2: Defeat → retry same level (auto after 2-3s or skip)
- US7: Transition screens skippable with any key press

**Research Approach**:
1. State enum: `PLAYING, VICTORY, DEFEAT, LEVEL_TRANSITION`
2. Victory triggers: size >= target → `levelState = VICTORY`, `transitionStartTime = time`
3. Defeat triggers: remainingTime <= 0 && size < target → `levelState = DEFEAT`
4. Auto-advance: `if (time - transitionStartTime >= 2.5) { nextLevel() }`
5. Skip: `if (keyWasPressed() && levelState !== PLAYING) { nextLevel() }`
6. Next level logic: Victory → currentLevel++, Defeat → restart currentLevel
7. Max level check: `if (currentLevel > 3) { gameComplete() }`

**Deliverable**: State machine diagram and transition logic pseudocode

---

#### R6: Win/Lose Condition Check Timing ⚠️ CRITICAL

**Question**: When and how often to check win/lose conditions without performance impact?

**Context**:
- FR-003: Win condition triggers immediately (within 1 frame)
- FR-004: Lose condition when timer reaches 0
- SC-003: Win triggers within 1 frame of reaching target size
- Need efficient checking at 60 FPS

**Research Approach**:
1. Win check: In PlayerBall.collect() after size update (already called once per collection)
2. Lose check: When remainingTime transitions from >0 to <=0 (once per second max)
3. Avoid redundant checks: `if (levelState === PLAYING)` guard
4. Immediate trigger: Set levelState in same frame as condition met
5. No polling in main loop for win (event-driven via collection)

**Deliverable**: Win/lose check placement and frequency strategy

---

### Expected Research Outcomes

**research.md** will contain:
- Timer update pseudocode using LittleJS time global
- formatTime(seconds) JavaScript function
- Camera soft boundary clamp algorithm
- Level-specific spawn configuration and algorithm
- State machine states, transitions, and timing logic
- Win/lose condition check strategy and placement

All values ready for direct implementation in Phase 1 data model and code.

---

## Phase 1: Data Model & Design Artifacts

**Status**: Pending (awaits Phase 0 research completion)
**Output**: `data-model.md`, `quickstart.md`

### Data Model Preview

#### LEVEL_CONFIG Array

**Structure**:
```javascript
const LEVEL_CONFIG = [
  { // Level 1
    levelNumber: 1,
    targetSize: 5.0,
    timeLimit: 60, // seconds
    playAreaSize: 50, // units (50×50 square)
    startingPlayerSize: 0.5,
    collectibleSizeMin: 0.3,
    collectibleSizeMax: 3.0,
    collectibleSpawnCount: { min: 30, max: 50 },
    difficulty: 'Easy'
  },
  { // Level 2
    levelNumber: 2,
    targetSize: 15.0,
    timeLimit: 90,
    playAreaSize: 100,
    startingPlayerSize: 0.5,
    collectibleSizeMin: 3.0,
    collectibleSizeMax: 10.0,
    collectibleSpawnCount: { min: 40, max: 60 },
    difficulty: 'Medium'
  },
  { // Level 3
    levelNumber: 3,
    targetSize: 50.0,
    timeLimit: 120,
    playAreaSize: 150,
    startingPlayerSize: 0.5,
    collectibleSizeMin: 10.0,
    collectibleSizeMax: 40.0,
    collectibleSpawnCount: { min: 50, max: 80 },
    difficulty: 'Hard'
  }
];
```

---

#### Level State Machine

**States**:
- `PLAYING`: Active gameplay, player can move/collect, timer counting down
- `VICTORY`: Win condition met, showing victory screen, awaiting next level
- `DEFEAT`: Lose condition met, showing defeat screen, awaiting retry
- `LEVEL_TRANSITION`: Brief state during level reset (clears collectibles, resets player)

**Transitions**:
- `PLAYING → VICTORY`: When `player.size.x >= LEVEL_CONFIG[currentLevel].targetSize`
- `PLAYING → DEFEAT`: When `remainingTime <= 0 && player.size.x < targetSize`
- `VICTORY → LEVEL_TRANSITION`: After 2.5s or any key press
- `DEFEAT → LEVEL_TRANSITION`: After 2.5s or any key press
- `LEVEL_TRANSITION → PLAYING`: After level initialization complete

**Global Variables**:
```javascript
let currentLevel = 0; // 0-indexed (0 = Level 1, 1 = Level 2, 2 = Level 3)
let levelState = 'PLAYING';
let levelStartTime = 0;
let remainingTime = 0;
let transitionStartTime = 0;
```

---

#### Timer System

**Attributes**:
- `levelStartTime`: Captured `time` when level begins
- `remainingTime`: Calculated `levelConfig.timeLimit - (time - levelStartTime)`
- `displayTime`: MM:SS formatted string
- `urgencyActive`: Boolean true when `remainingTime <= 10`

**Update Logic** (in gameUpdate):
```javascript
if (levelState === 'PLAYING') {
  const elapsed = time - levelStartTime;
  remainingTime = Math.max(0, levelConfig.timeLimit - elapsed);

  // Check lose condition
  if (remainingTime <= 0 && player.size.x < levelConfig.targetSize) {
    levelState = 'DEFEAT';
    transitionStartTime = time;
  }
}
```

**Display** (in gameRenderPost):
```javascript
const minutes = Math.floor(remainingTime / 60);
const seconds = Math.floor(remainingTime % 60);
const displayTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
const color = remainingTime <= 10 ? new Color(1, 0.3, 0) : new Color(1, 1, 1); // Orange urgency
drawTextScreen(displayTime, vec2(mainCanvasSize.x / 2, mainCanvasSize.y - 40), 48, color);
```

---

#### Transition Screen Rendering

**Victory Screen**:
```javascript
if (levelState === 'VICTORY') {
  // Darken background
  drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

  // Victory message
  drawTextScreen('LEVEL COMPLETE!', vec2(mainCanvasSize.x / 2, mainCanvasSize.y / 2 + 60), 64, new Color(0, 1, 0));
  drawTextScreen(`Final Size: ${player.sizeMultiplier.toFixed(1)}x`, vec2(mainCanvasSize.x / 2, mainCanvasSize.y / 2), 32, new Color(1, 1, 1));
  drawTextScreen(`Time Remaining: ${displayTime}`, vec2(mainCanvasSize.x / 2, mainCanvasSize.y / 2 - 40), 32, new Color(1, 1, 1));
  drawTextScreen('Press any key to continue...', vec2(mainCanvasSize.x / 2, mainCanvasSize.y / 2 - 100), 24, new Color(0.7, 0.7, 0.7));
}
```

**Defeat Screen**:
```javascript
if (levelState === 'DEFEAT') {
  // Darken background
  drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

  // Defeat message
  drawTextScreen('TIME\'S UP!', vec2(mainCanvasSize.x / 2, mainCanvasSize.y / 2 + 60), 64, new Color(1, 0, 0));
  drawTextScreen(`Size: ${player.sizeMultiplier.toFixed(1)}x / ${levelConfig.targetSize / 0.5}x`, vec2(mainCanvasSize.x / 2, mainCanvasSize.y / 2), 32, new Color(1, 1, 1));
  drawTextScreen('Try again!', vec2(mainCanvasSize.x / 2, mainCanvasSize.y / 2 - 40), 32, new Color(1, 1, 1));
  drawTextScreen('Press any key to retry...', vec2(mainCanvasSize.x / 2, mainCanvasSize.y / 2 - 100), 24, new Color(0.7, 0.7, 0.7));
}
```

**Skip Input Handling** (in gameUpdate):
```javascript
if ((levelState === 'VICTORY' || levelState === 'DEFEAT') && keyWasPressed()) {
  handleTransition();
}
```

---

#### Soft Boundary System

**Bounds Calculation**:
```javascript
const playAreaHalfSize = LEVEL_CONFIG[currentLevel].playAreaSize / 2;
const minBound = -playAreaHalfSize;
const maxBound = playAreaHalfSize;
```

**Camera Clamp** (in gameUpdatePost after camera lerp):
```javascript
// Existing Feature 001 camera follow
cameraPos = cameraPos.lerp(player.pos, 0.1);

// NEW: Clamp to play area bounds
const viewportHalfWidth = mainCanvasSize.x / (2 * cameraScale);
const viewportHalfHeight = mainCanvasSize.y / (2 * cameraScale);

cameraPos.x = clamp(cameraPos.x, minBound + viewportHalfWidth, maxBound - viewportHalfWidth);
cameraPos.y = clamp(cameraPos.y, minBound + viewportHalfHeight, maxBound - viewportHalfHeight);
```

---

#### Level Initialization Functions

**startLevel(levelIndex)**:
```javascript
function startLevel(levelIndex) {
  currentLevel = levelIndex;
  const config = LEVEL_CONFIG[currentLevel];

  // Reset player
  player.pos = vec2(0, 0);
  player.size = vec2(config.startingPlayerSize);
  player.velocity = vec2(0, 0);
  player.score = 0;
  player.sizeMultiplier = 1.0;

  // Clear old collectibles
  collectibles.forEach(c => c.destroy());
  collectibles = [];

  // Spawn new collectibles
  spawnCollectiblesForLevel(config);

  // Reset timer
  levelStartTime = time;
  remainingTime = config.timeLimit;

  // Set state
  levelState = 'PLAYING';
}
```

**handleTransition()**:
```javascript
function handleTransition() {
  if (levelState === 'VICTORY') {
    // Next level or game complete
    if (currentLevel < LEVEL_CONFIG.length - 1) {
      startLevel(currentLevel + 1);
    } else {
      // Game complete (all 3 levels beaten)
      levelState = 'GAME_COMPLETE';
    }
  } else if (levelState === 'DEFEAT') {
    // Retry same level
    startLevel(currentLevel);
  }
}
```

---

### Quickstart Guide Preview

**quickstart.md** will document:
1. Prerequisites: Feature 001 implementation complete (movement, collection, growth working)
2. Testing Plan:
   - Level 1: Verify timer counts from 1:00, collectibles 30-50, target 5.0x works
   - Level 2: Verify 90s timer, collectibles 40-60, target 15.0x, larger play area
   - Level 3: Verify 120s timer, collectibles 50-80, target 50.0x, largest play area
   - Victory flow: Complete level, see victory screen, auto-advance to next level
   - Defeat flow: Let timer expire, see defeat screen, retry same level
   - Skip: Press key during transition to skip 2.5s wait
3. Common Issues:
   - Timer not counting: Check `levelStartTime` initialization
   - Wrong collectible count: Verify spawn config min/max range
   - Camera not clamped: Check play area bounds calculation
   - Transition stuck: Verify `keyWasPressed()` listener active

---

## Phase 2: Task Breakdown (NOT EXECUTED HERE)

**Note**: `/speckit.plan` stops after Phase 1. Task breakdown created by `/speckit.tasks`.

Next command: `/speckit.tasks` will generate atomic tasks (<1 hour each) organized by user story:
- US1: Basic Level Completion Flow (5-7 tasks)
- US2: Failure Condition and Retry (3-4 tasks)
- US3: Timer Awareness and Urgency (4-5 tasks)
- US4: Level-Appropriate Collectible Spawning (3-4 tasks)
- US5: Progressive Difficulty Scaling (2-3 tasks)
- US6: Clear Goal Visibility (3-4 tasks)
- US7: Smooth Level Transitions (4-5 tasks)

Total estimated: 24-32 atomic implementation tasks

---

## Implementation Estimate

**Total Time**: 1.5-2 days (within constitution <2 day constraint for P1 features)

**Breakdown**:
- Phase 0 Research: 2-3 hours (timer system, state machine, boundary logic)
- Phase 1 Data Model: 1 hour (document LEVEL_CONFIG, state machine, functions)
- Level state machine: 3-4 hours (states, transitions, initialization)
- Timer system: 2-3 hours (countdown, MM:SS format, urgency, lose condition)
- Win condition integration: 1-2 hours (check in PlayerBall.collect(), trigger victory)
- Transition screens: 3-4 hours (victory/defeat rendering, skip handling)
- Level-specific spawning: 2-3 hours (extend Feature 001 spawn with level config)
- Soft boundaries: 2 hours (camera clamp, viewport calculation)
- HUD extensions: 2 hours (timer display, target display, level indicator)
- Manual Testing & Tuning: 4-5 hours (playtest all 3 levels, transitions, retry flow)

**Target Completion**: October 23, 2025 (Day 10) - 4 days before Day 14 milestone buffer

---

## Success Validation

Feature complete when:
- ✅ All 17 acceptance scenarios pass (7 user stories)
- ✅ All 7 success criteria validated
- ✅ All 4 theme success criteria validated (cyclical small-to-big pattern evident)
- ✅ Manual playtest confirms:
  - Can complete all 3 levels in sequence
  - Defeat and retry flow works correctly
  - Timer accurate and urgency visible at <10s
  - Collectibles spawn appropriate to level
  - Transition screens clear and skippable
- ✅ 60 FPS maintained with 80 collectibles on screen (L3 max)
- ✅ Works in Chrome + Firefox without errors
- ✅ Theme "start SMALL" pattern recognized by playtesters in all 3 levels

---

**Plan Status**: Constitution validated, awaiting Phase 0 research execution
**Next Step**: Execute research tasks R1-R6 → generate research.md
**Then**: Generate data-model.md with concrete specifications
**Finally**: Ready for `/speckit.tasks` command
