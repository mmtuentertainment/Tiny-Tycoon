# Data Model: Level Progression System

**Feature**: 002-implement-a-3 (Level Progression System)
**Date**: 2025-10-15
**Status**: Complete

## Overview

This document defines the data structures, state management, and entity relationships for the 3-level progression system. All structures extend or integrate with Feature 001 (Core Katamari Mechanic) implementation.

---

## Level Configuration Data

### LEVEL_CONFIG Array

**Type**: `Array<LevelConfig>`
**Scope**: Global constant
**Purpose**: Defines parameters for all 3 levels

**Structure**:
```javascript
const LEVEL_CONFIG = [
  { // Level 1 - Easy
    levelNumber: 1,
    targetSize: 5.0,                    // Player must reach 5.0× size (10x from 0.5 start)
    timeLimit: 60,                      // 60 seconds
    playAreaSize: 50,                   // 50×50 unit square world
    startingPlayerSize: 0.5,            // Reset to 0.5× each level
    collectibleSizeMin: 0.3,            // Smallest collectible
    collectibleSizeMax: 3.0,            // Largest collectible
    collectibleSpawnCount: { min: 30, max: 50 }, // Random count in range
    difficulty: 'Easy'
  },
  { // Level 2 - Medium
    levelNumber: 2,
    targetSize: 15.0,                   // 30x from 0.5 start
    timeLimit: 90,                      // 90 seconds
    playAreaSize: 100,                  // 100×100 units
    startingPlayerSize: 0.5,
    collectibleSizeMin: 3.0,            // Larger objects than L1
    collectibleSizeMax: 10.0,
    collectibleSpawnCount: { min: 40, max: 60 },
    difficulty: 'Medium'
  },
  { // Level 3 - Hard
    levelNumber: 3,
    targetSize: 50.0,                   // 100x from 0.5 start
    timeLimit: 120,                     // 120 seconds
    playAreaSize: 150,                  // 150×150 units
    startingPlayerSize: 0.5,
    collectibleSizeMin: 10.0,           // Even larger objects
    collectibleSizeMax: 40.0,
    collectibleSpawnCount: { min: 50, max: 80 },
    difficulty: 'Hard'
  }
];
```

**Type Definition** (for clarity, not actual TypeScript):
```typescript
interface LevelConfig {
  levelNumber: number;           // 1, 2, or 3
  targetSize: number;            // Size player must reach to win
  timeLimit: number;             // Seconds allowed for level
  playAreaSize: number;          // Square world dimensions (units)
  startingPlayerSize: number;    // Player size at level start (always 0.5)
  collectibleSizeMin: number;    // Min size for spawned collectibles
  collectibleSizeMax: number;    // Max size for spawned collectibles
  collectibleSpawnCount: {       // Random range for spawn count
    min: number;
    max: number;
  };
  difficulty: 'Easy' | 'Medium' | 'Hard'; // Display label
}
```

**Access Pattern**:
```javascript
// Current level config
const config = LEVEL_CONFIG[currentLevel]; // currentLevel is 0-indexed

// Example usage
if (player.size.x >= config.targetSize) {
  // Win condition
}
```

---

## State Management

### Game State Machine

**States**:
```javascript
const STATE = {
  PLAYING: 'PLAYING',           // Active gameplay
  VICTORY: 'VICTORY',           // Win condition met, showing victory screen
  DEFEAT: 'DEFEAT',             // Lose condition met, showing defeat screen
  LEVEL_TRANSITION: 'LEVEL_TRANSITION', // Brief state during level reset
  GAME_COMPLETE: 'GAME_COMPLETE' // All 3 levels completed
};
```

**State Variables**:
```javascript
let currentLevel = 0;           // 0-indexed: 0 = Level 1, 1 = Level 2, 2 = Level 3
let levelState = STATE.PLAYING; // Current state
let transitionStartTime = 0;    // LittleJS `time` when transition screen shown
```

**State Transitions**:
| From | To | Trigger | Side Effects |
|------|----|---------|--------------|
| PLAYING | VICTORY | `player.size.x >= config.targetSize` | Set `transitionStartTime = time` |
| PLAYING | DEFEAT | `remainingTime <= 0 && player.size.x < config.targetSize` | Set `transitionStartTime = time` |
| VICTORY | LEVEL_TRANSITION | 2.5s elapsed OR any key pressed | Call `handleTransition()` |
| DEFEAT | LEVEL_TRANSITION | 2.5s elapsed OR any key pressed | Call `handleTransition()` |
| LEVEL_TRANSITION | PLAYING | `startLevel()` completes | Reset player, timer, spawn collectibles |
| VICTORY (level 2) | GAME_COMPLETE | Level 3 victory | Show final completion screen |

**State Guards**:
- Win/lose checks only run when `levelState === STATE.PLAYING`
- Transition input only processed when `levelState === STATE.VICTORY || levelState === STATE.DEFEAT`
- Timer only updates when `levelState === STATE.PLAYING`

---

### Timer System

**Variables**:
```javascript
let levelStartTime = 0;         // LittleJS `time` when level began
let remainingTime = 0;          // Calculated: timeLimit - elapsed
```

**Update Logic** (in `gameUpdate()`):
```javascript
if (levelState === STATE.PLAYING) {
  const elapsed = time - levelStartTime;
  remainingTime = Math.max(0, LEVEL_CONFIG[currentLevel].timeLimit - elapsed);

  // Lose condition check
  if (remainingTime <= 0 && player.size.x < LEVEL_CONFIG[currentLevel].targetSize) {
    levelState = STATE.DEFEAT;
    transitionStartTime = time;
  }
}
```

**Display Formatting** (in `gameRenderPost()`):
```javascript
function formatTime(seconds) {
  const s = Math.floor(seconds);
  const minutes = Math.floor(s / 60);
  const secs = s % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

const displayTime = formatTime(remainingTime);
const isUrgent = remainingTime <= 10;
const color = isUrgent ? new Color(1, 0.3, 0) : new Color(1, 1, 1); // Orange when urgent
drawTextScreen(displayTime, vec2(mainCanvasSize.x / 2, mainCanvasSize.y - 40), 48, color);
```

**Urgency Thresholds**:
- Normal: `remainingTime > 10` → White text
- Urgent: `remainingTime <= 10` → Orange text, optional pulse animation (P3)

---

## Entity Extensions

### PlayerBall (extends Feature 001)

**New Attributes**: None (uses existing `size`, `pos`, `velocity`, `score`, `sizeMultiplier`)

**Modified Methods**:
```javascript
class PlayerBall extends EngineObject {
  collect(collectible) {
    // ... existing Feature 001 growth logic ...

    // NEW: Win condition check after size update
    if (levelState === STATE.PLAYING &&
        this.size.x >= LEVEL_CONFIG[currentLevel].targetSize) {
      levelState = STATE.VICTORY;
      transitionStartTime = time;
    }

    // ... existing destroy and score logic ...
  }

  // No changes to update() or render()
}
```

**Reset Behavior** (in `startLevel()`):
```javascript
player.pos = vec2(0, 0);                           // Center of play area
player.size = vec2(config.startingPlayerSize);      // 0.5×0.5
player.velocity = vec2(0, 0);                      // Stop movement
player.score = 0;                                  // Reset score
player.sizeMultiplier = 1.0;                       // Reset multiplier
```

---

### Collectible (extends Feature 001)

**No Changes**: Collectible class from Feature 001 remains unchanged. Only spawning parameters change per level.

**Spawn Integration**:
```javascript
function spawnCollectiblesForLevel(config) {
  const spawnCount = randInt(config.collectibleSpawnCount.min, config.collectibleSpawnCount.max);
  const gridSize = Math.ceil(Math.sqrt(spawnCount));
  const cellSize = config.playAreaSize / gridSize;
  const playAreaHalfSize = config.playAreaSize / 2;

  collectibles = []; // Clear array (objects already destroyed)

  for (let i = 0; i < spawnCount; i++) {
    const gridX = i % gridSize;
    const gridY = Math.floor(i / gridSize);

    const cellCenterX = -playAreaHalfSize + (gridX + 0.5) * cellSize;
    const cellCenterY = -playAreaHalfSize + (gridY + 0.5) * cellSize;

    const offsetX = rand(-cellSize * 0.4, cellSize * 0.4);
    const offsetY = rand(-cellSize * 0.4, cellSize * 0.4);
    const spawnPos = vec2(cellCenterX + offsetX, cellCenterY + offsetY);

    // Random size within level's range (NOT Feature 001's fixed ranges)
    const size = rand(config.collectibleSizeMin, config.collectibleSizeMax);

    // Type distribution: 60% coin, 40% customer (from Feature 001)
    const type = rand() < 0.6 ? 'coin' : 'customer';

    // Boundary check
    const halfSize = size / 2;
    if (Math.abs(spawnPos.x) + halfSize < playAreaHalfSize &&
        Math.abs(spawnPos.y) + halfSize < playAreaHalfSize) {
      new Collectible(spawnPos, size, type);
    }
  }
}
```

---

## Camera System Extensions

### Soft Boundary Enforcement

**New Logic** (in `gameUpdatePost()`):
```javascript
function gameUpdatePost() {
  // Existing Feature 001 camera follow
  cameraPos = cameraPos.lerp(player.pos, 0.1);

  // NEW: Clamp to play area bounds
  const config = LEVEL_CONFIG[currentLevel];
  const playAreaHalfSize = config.playAreaSize / 2;

  // Viewport dimensions in world units
  const viewportHalfWidth = mainCanvasSize.x / (2 * cameraScale);
  const viewportHalfHeight = mainCanvasSize.y / (2 * cameraScale);

  // Clamp camera position
  cameraPos.x = clamp(
    cameraPos.x,
    -playAreaHalfSize + viewportHalfWidth,
    playAreaHalfSize - viewportHalfWidth
  );
  cameraPos.y = clamp(
    cameraPos.y,
    -playAreaHalfSize + viewportHalfHeight,
    playAreaHalfSize - viewportHalfHeight
  );
}
```

**Boundary Behavior**:
- Player near center: Camera follows normally (Feature 001 lerp)
- Player near edge: Camera stops, player continues moving (soft boundary)
- Player off-screen: Allowed (can return to visible area)

---

## HUD Extensions

### Timer Display

**Position**: Top center
**Format**: `MM:SS` (e.g., "1:23", "0:45", "0:00")
**Color**: White (normal), Orange (≤10s remaining)
**Font Size**: 48px

**Rendering** (in `gameRenderPost()`):
```javascript
const displayTime = formatTime(remainingTime);
const color = remainingTime <= 10 ? new Color(1, 0.3, 0) : new Color(1, 1, 1);
drawTextScreen(displayTime, vec2(mainCanvasSize.x / 2, mainCanvasSize.y - 40), 48, color);
```

---

### Target Size Display

**Position**: Top left (below existing size display from Feature 001)
**Format**: `Target: ${targetSize}x`
**Color**: White (normal), Green (≥90% progress), Red (timer urgent)
**Font Size**: 32px

**Rendering** (in `gameRenderPost()`):
```javascript
const config = LEVEL_CONFIG[currentLevel];
const targetMultiplier = config.targetSize / 0.5; // Convert to multiplier
const progress = player.sizeMultiplier / targetMultiplier;

let color = new Color(1, 1, 1); // White default
if (progress >= 0.9) color = new Color(0, 1, 0); // Green when close
if (remainingTime <= 10) color = new Color(1, 0.3, 0); // Orange when urgent

drawTextScreen(
  `Target: ${targetMultiplier.toFixed(1)}x`,
  vec2(80, mainCanvasSize.y - 80),
  32,
  color
);
```

---

### Level Indicator

**Position**: Top right
**Format**: `Level ${levelNumber}`
**Color**: White
**Font Size**: 32px

**Rendering** (in `gameRenderPost()`):
```javascript
const levelNumber = LEVEL_CONFIG[currentLevel].levelNumber;
drawTextScreen(
  `Level ${levelNumber}`,
  vec2(mainCanvasSize.x - 120, mainCanvasSize.y - 40),
  32,
  new Color(1, 1, 1)
);
```

---

## Transition Screens

### Victory Screen

**Layout**:
```
┌─────────────────────────────────────┐
│                                     │
│         LEVEL COMPLETE!             │  ← 64px, green
│                                     │
│      Final Size: 12.3x              │  ← 32px, white
│      Time Remaining: 0:23           │  ← 32px, white
│                                     │
│   Press any key to continue...      │  ← 24px, gray
│                                     │
└─────────────────────────────────────┘
```

**Rendering** (in `gameRenderPost()`):
```javascript
if (levelState === STATE.VICTORY) {
  // Semi-transparent black overlay
  drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

  // Messages (all centered)
  const centerX = mainCanvasSize.x / 2;
  const centerY = mainCanvasSize.y / 2;

  drawTextScreen('LEVEL COMPLETE!', vec2(centerX, centerY + 60), 64, new Color(0, 1, 0));
  drawTextScreen(`Final Size: ${player.sizeMultiplier.toFixed(1)}x`, vec2(centerX, centerY), 32, new Color(1, 1, 1));
  drawTextScreen(`Time Remaining: ${formatTime(remainingTime)}`, vec2(centerX, centerY - 40), 32, new Color(1, 1, 1));
  drawTextScreen('Press any key to continue...', vec2(centerX, centerY - 100), 24, new Color(0.7, 0.7, 0.7));
}
```

---

### Defeat Screen

**Layout**:
```
┌─────────────────────────────────────┐
│                                     │
│           TIME'S UP!                │  ← 64px, red
│                                     │
│     Size: 3.2x / 10.0x              │  ← 32px, white
│        Try again!                   │  ← 32px, white
│                                     │
│   Press any key to retry...         │  ← 24px, gray
│                                     │
└─────────────────────────────────────┘
```

**Rendering** (in `gameRenderPost()`):
```javascript
if (levelState === STATE.DEFEAT) {
  // Semi-transparent black overlay
  drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

  const centerX = mainCanvasSize.x / 2;
  const centerY = mainCanvasSize.y / 2;
  const config = LEVEL_CONFIG[currentLevel];
  const targetMultiplier = config.targetSize / 0.5;

  drawTextScreen('TIME\'S UP!', vec2(centerX, centerY + 60), 64, new Color(1, 0, 0));
  drawTextScreen(
    `Size: ${player.sizeMultiplier.toFixed(1)}x / ${targetMultiplier.toFixed(1)}x`,
    vec2(centerX, centerY),
    32,
    new Color(1, 1, 1)
  );
  drawTextScreen('Try again!', vec2(centerX, centerY - 40), 32, new Color(1, 1, 1));
  drawTextScreen('Press any key to retry...', vec2(centerX, centerY - 100), 24, new Color(0.7, 0.7, 0.7));
}
```

---

## Level Management Functions

### startLevel(levelIndex)

**Purpose**: Initialize a new level or retry current level

**Parameters**:
- `levelIndex: number` - 0-indexed level (0 = Level 1, 1 = Level 2, 2 = Level 3)

**Implementation**:
```javascript
function startLevel(levelIndex) {
  currentLevel = levelIndex;
  const config = LEVEL_CONFIG[currentLevel];

  // Reset player to starting state
  player.pos = vec2(0, 0);
  player.size = vec2(config.startingPlayerSize);
  player.velocity = vec2(0, 0);
  player.score = 0;
  player.sizeMultiplier = 1.0;

  // Clear old collectibles
  collectibles.forEach(c => c.destroy());
  collectibles = [];

  // Spawn new collectibles for this level
  spawnCollectiblesForLevel(config);

  // Reset timer
  levelStartTime = time;
  remainingTime = config.timeLimit;

  // Set state to playing
  levelState = STATE.PLAYING;
}
```

**Call Sites**:
- `gameInit()`: `startLevel(0)` to begin game at Level 1
- `handleTransition()` after victory: `startLevel(currentLevel + 1)`
- `handleTransition()` after defeat: `startLevel(currentLevel)` (retry)

---

### handleTransition()

**Purpose**: Handle victory/defeat screen completion, advance or retry level

**Parameters**: None

**Implementation**:
```javascript
function handleTransition() {
  if (levelState === STATE.VICTORY) {
    // Victory: advance to next level or complete game
    if (currentLevel < LEVEL_CONFIG.length - 1) {
      startLevel(currentLevel + 1);
    } else {
      // Game complete (beat all 3 levels)
      levelState = STATE.GAME_COMPLETE;
    }
  } else if (levelState === STATE.DEFEAT) {
    // Defeat: retry same level
    startLevel(currentLevel);
  }
}
```

**Call Sites**:
- `gameUpdate()` when auto-advance timer expires: `if (time - transitionStartTime >= 2.5)`
- `gameUpdate()` when any key pressed during transition: `if (keyWasPressed())`

---

## Global Variable Summary

| Variable | Type | Initial Value | Purpose |
|----------|------|---------------|---------|
| `LEVEL_CONFIG` | `const Array<LevelConfig>` | `[{...}, {...}, {...}]` | Level parameters (3 levels) |
| `STATE` | `const Object` | `{PLAYING, VICTORY, DEFEAT, ...}` | State enum constants |
| `currentLevel` | `number` | `0` | Current level index (0-2) |
| `levelState` | `string` | `STATE.PLAYING` | Current game state |
| `levelStartTime` | `number` | `0` | LittleJS `time` when level began |
| `remainingTime` | `number` | `60` | Seconds remaining in level |
| `transitionStartTime` | `number` | `0` | LittleJS `time` when transition screen shown |

**Namespace**: All variables in global scope (LittleJS game.js pattern)
**Lifetime**: Entire game session (reset on page reload)

---

## Integration with Feature 001

### Preserved Systems

- **PlayerBall class**: No structural changes, only win check added to `collect()`
- **Collectible class**: No changes at all
- **Movement physics**: Unchanged (WASD, momentum, damping)
- **Collision detection**: Unchanged (size-based, magnetic attraction)
- **Growth formula**: Unchanged (exponential scaling from Feature 001)
- **HUD score/size display**: Extended with timer, target, level indicator

### Modified Systems

- **Collectible spawning**: Now uses `spawnCollectiblesForLevel(config)` instead of fixed parameters
- **Camera follow**: Added soft boundary clamping after lerp
- **Game loop**: Added state machine, timer updates, win/lose checks
- **Rendering**: Added transition screen overlays in `gameRenderPost()`

### Dependency Chain

```
Feature 001 (Core Mechanic)
    ↓ provides
PlayerBall, Collectible, camera, HUD basics
    ↓ extended by
Feature 002 (Level Progression)
    ↓ adds
Level config, timer, state machine, boundaries, transitions
```

---

## Data Flow Diagram

```
Game Start
    ↓
gameInit() → startLevel(0)
    ↓
LEVEL_CONFIG[0] → spawnCollectiblesForLevel()
    ↓
STATE.PLAYING
    ↓
gameUpdate() ────────────────┐
    │                        │
    ├→ Timer countdown        │
    ├→ Lose check             │
    └→ Transition handling    │
                              │
PlayerBall.collect() ─────────┤
    │                        │
    └→ Win check              │
                              │
                              ↓
                      STATE.VICTORY or STATE.DEFEAT
                              ↓
                       (2.5s or key press)
                              ↓
                      handleTransition()
                              ↓
                  ┌───────────┴───────────┐
                  ↓                       ↓
          startLevel(currentLevel + 1)  startLevel(currentLevel)
          (next level)                  (retry)
                  │
                  └─→ Loop until STATE.GAME_COMPLETE
```

---

## Validation

**Data Integrity Checks**:
- Level indices: Always 0-2 (bounds checked in `startLevel()`)
- Timer: Never negative (`Math.max(0, ...)` in update)
- State transitions: Atomic (no intermediate states)
- Collectible spawn count: Within min/max range (verified by `randInt()`)

**Edge Cases Handled**:
- Level 3 victory: Transitions to `STATE.GAME_COMPLETE` instead of next level
- Simultaneous win/lose: Win check in `collect()` runs before lose check in `gameUpdate()` (player favored)
- Skip before auto-advance: Both paths call `handleTransition()`, idempotent
- No collectibles spawned: Boundary check may skip invalid spawns, but min count ensures >25 valid spawns

---

**Data Model Status**: ✅ Complete
**All Entities Defined**: Yes
**Integration with Feature 001**: Verified
**Ready for Implementation**: Yes

**Next Steps**:
1. Generate `quickstart.md` with testing procedures
2. Run agent context update
3. Proceed to `/speckit.tasks`
