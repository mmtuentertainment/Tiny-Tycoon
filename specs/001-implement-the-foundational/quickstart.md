# Quickstart Guide: Core Katamari Mechanic Implementation

**Feature**: 001-implement-the-foundational
**Date**: 2025-10-14
**Target**: Playable core loop in <2 days (Oct 14-16)

This guide provides step-by-step instructions for implementing the Core Katamari Mechanic for Tiny Tycoon, from setup through verification.

---

## Prerequisites

Before starting, ensure you have:

- [x] Node.js installed (verify: `node --version`)
- [x] LittleJS engine at `/home/matt/Game Development/LittleJS/dist/littlejs.release.js`
- [x] Tiny Tycoon repository cloned from https://github.com/mmtuentertainment/Tiny-Tycoon.git
- [x] Development branch `001-implement-the-foundational` checked out
- [x] Web browser with DevTools (Chrome or Firefox recommended)

---

## Step 1: Environment Setup (5 minutes)

### Navigate to Game Directory

```bash
cd "/home/matt/Game Development/games/game-jam-2025"
```

### Verify Files Exist

```bash
ls -la src/game.js        # Should exist (skeleton from commit 8083c63)
ls -la index.html         # Should exist
ls -la package.json       # Should exist
ls -la build.js           # Should exist
```

### Start Development Server

```bash
npm run dev
```

**Expected Output**:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

### Open in Browser

Navigate to: **http://localhost:8000**

**Expected**: Black screen (no errors in console F12)

---

## Step 2: Implement COLLECTIBLE_DATA Configuration (10 minutes)

### Location: src/game.js

Add after `'use strict';` and before `// ENGINE CALLBACKS`:

```javascript
// ============================================================================
// CONFIGURATION DATA
// ============================================================================

const COLLECTIBLE_DATA = {
  coin: {
    sizeRange: [0.3, 0.4],
    value: 10,
    color: new Color(1, 1, 0),       // Yellow
    spawnWeight: 0.6
  },
  customer: {
    sizeRange: [0.6, 0.8],
    value: 50,
    color: new Color(0, 0.5, 1),     // Blue
    spawnWeight: 0.4
  }
};
```

**Verification**: Reload page, check console (F12) - no errors ✅

---

## Step 3: Implement PlayerBall Class (30 minutes)

### Location: src/game.js

Add after the ENGINE CALLBACKS section (after `gameRenderPost()` function):

```javascript
// ============================================================================
// PLAYER BALL CLASS
// ============================================================================

class PlayerBall extends EngineObject {
  constructor(pos) {
    super(pos, vec2(0.5, 0.5));  // Start at smallest size
    this.mass = 0.25;              // Area: 0.5 × 0.5
    this.damping = 0.9;            // 90% velocity retained per frame
    this.score = 0;
    this.color = new Color(1, 0.8, 0);  // Golden yellow
    this.collideTiles = false;     // Free movement, no tile collision
  }

  update() {
    // WASD and Arrow key input (FR-002, FR-003)
    const moveSpeed = 0.2;
    const moveInput = vec2(
      (keyIsDown('KeyD') || keyIsDown('ArrowRight')) -
      (keyIsDown('KeyA') || keyIsDown('ArrowLeft')),
      (keyIsDown('KeyW') || keyIsDown('ArrowUp')) -
      (keyIsDown('KeyS') || keyIsDown('ArrowDown'))
    );

    // Apply acceleration (momentum physics - FR-004)
    this.velocity = this.velocity.add(moveInput.scale(moveSpeed));

    // Parent update handles physics and damping (FR-005)
    super.update();
  }

  collideWithObject(other) {
    // Only process Collectible objects (FR-008)
    if (!(other instanceof Collectible)) return false;

    // Size-based collection: Can only collect strictly smaller
    if (this.size.x > other.size.x) {
      this.collect(other);
    }

    return false; // No physics bounce
  }

  collect(collectible) {
    // Add score (FR-010)
    this.score += collectible.value;

    // Exponential size growth (FR-011, from research.md R1)
    const growthAmount = (collectible.value / 200) * this.size.x;
    this.size = this.size.add(vec2(growthAmount, growthAmount));

    // Update mass (area-based for momentum)
    this.mass = this.size.x * this.size.x;

    // Destroy collectible (FR-009)
    collectible.destroy();
  }

  render() {
    // Code-based shape for P1 (sprites deferred to P3)
    drawRect(this.pos, this.size, this.color);
  }
}
```

**Verification**: Reload, check console - no errors ✅

---

## Step 4: Implement Collectible Class (30 minutes)

### Location: src/game.js

Add after PlayerBall class:

```javascript
// ============================================================================
// COLLECTIBLE CLASS
// ============================================================================

class Collectible extends EngineObject {
  constructor(pos, type, size) {
    super(pos, vec2(size, size));  // Square collectibles
    this.type = type;
    this.value = COLLECTIBLE_DATA[type].value;
    this.color = COLLECTIBLE_DATA[type].color;
    this.magnetActive = false;
    this.collideTiles = false;
    this.mass = 0;  // Static objects (no physics push)
  }

  update() {
    super.update();

    if (!player) return;

    const distanceToPlayer = this.pos.distance(player.pos);
    const sizeRatio = this.size.x / player.size.x;

    // Magnetic attraction (FR-012, from research.md R2)
    if (distanceToPlayer < 2.5 && sizeRatio >= 0.8 && sizeRatio < 1.0) {
      // Size ratio factor (0.8 = 0%, 0.95 = 100%)
      const sizeRatioFactor = Math.min((sizeRatio - 0.8) / 0.15, 1.0);

      // Magnetic force (inverse distance)
      const magnetForce = (1.5 / (distanceToPlayer + 0.1)) * sizeRatioFactor;

      // Apply force toward player
      const directionToPlayer = player.pos.subtract(this.pos).normalize();
      this.velocity = this.velocity.add(directionToPlayer.scale(magnetForce));

      this.magnetActive = true;
    } else {
      this.magnetActive = false;
    }
  }

  render() {
    // Draw collectible
    drawRect(this.pos, this.size, this.color);

    // Optional: Glow when magnet active (visual feedback)
    if (this.magnetActive) {
      drawRect(this.pos, this.size.scale(1.2), this.color.scale(0.5, 0.1));
    }
  }
}
```

**Verification**: Reload, check console - no errors ✅

---

## Step 5: Implement Grid Spawning (20 minutes)

### Location: src/game.js

Add before class definitions (after COLLECTIBLE_DATA):

```javascript
// ============================================================================
// SPAWN SYSTEM
// ============================================================================

function spawnCollectibles() {
  const GRID_ROWS = 12;
  const GRID_COLS = 12;
  const CELL_SIZE = 2.5;
  const GRID_OFFSET = -15;      // Center grid at origin
  const RANDOMIZATION_RANGE = 1.0;

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      // Base grid position
      const gridX = GRID_OFFSET + (col * CELL_SIZE) + (CELL_SIZE / 2);
      const gridY = GRID_OFFSET + (row * CELL_SIZE) + (CELL_SIZE / 2);

      // Random offset within cell
      const randomX = gridX + (Math.random() - 0.5) * 2 * RANDOMIZATION_RANGE;
      const randomY = gridY + (Math.random() - 0.5) * 2 * RANDOMIZATION_RANGE;
      const spawnPos = vec2(randomX, randomY);

      // Weighted type selection (60% coins, 40% customers)
      const type = Math.random() < 0.6 ? 'coin' : 'customer';

      // Random size within type range
      const sizeRange = COLLECTIBLE_DATA[type].sizeRange;
      const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);

      // Spawn collectible
      new Collectible(spawnPos, type, size);
    }
  }

  console.log(`Spawned ${GRID_ROWS * GRID_COLS} collectibles`);
}
```

**Verification**: Reload, check console - should see "Spawned 144 collectibles" ✅

---

## Step 6: Update gameInit() (10 minutes)

### Location: src/game.js - gameInit() function

Replace the existing `gameInit()` with:

```javascript
function gameInit() {
  console.log('Tiny Tycoon - Game initialized');

  // Set camera (FR-001)
  cameraPos = vec2(0, 0);
  cameraScale = 32;  // 32 pixels per game unit

  // Create player at origin (FR-001)
  player = new PlayerBall(vec2(0, 0));

  // Spawn collectibles (FR-006, from research.md R4)
  spawnCollectibles();
}
```

**Verification**: Reload, you should see:
- Player (golden yellow square) at center
- 144 collectibles (yellow coins, blue customers) scattered around
- Console: "Tiny Tycoon - Game initialized" and "Spawned 144 collectibles"

---

## Step 7: Update gameUpdate() for Camera (5 minutes)

### Location: src/game.js - gameUpdate() function

Replace with:

```javascript
function gameUpdate() {
  // Camera follow player with lerp (FR-013, from research.md R3)
  if (player) {
    cameraPos = cameraPos.lerp(player.pos, 0.1);
  }

  // LittleJS automatically calls update() on all EngineObjects
}
```

**Verification**: Move player with WASD - camera should smoothly follow ✅

---

## Step 8: Implement HUD in gameRenderPost() (15 minutes)

### Location: src/game.js - gameRenderPost() function

Replace with:

```javascript
function gameRenderPost() {
  if (!player) return;

  // Calculate display values
  const sizeMultiplier = (player.size.x / 0.5).toFixed(1);
  const scoreFormatted = player.score.toLocaleString();

  // Size display (top-left) - FR-014
  drawTextScreen(
    `Size: ${sizeMultiplier}x`,
    vec2(80, mainCanvasSize.y - 40),
    32,
    new Color(1, 1, 1),       // White
    0,
    'left',
    'monospace',
    new Color(0, 0, 0)         // Black outline
  );

  // Score display (top-right) - FR-015
  drawTextScreen(
    `$${scoreFormatted}`,
    vec2(mainCanvasSize.x - 150, mainCanvasSize.y - 40),
    32,
    new Color(1, 1, 0),       // Yellow
    0,
    'right',
    'monospace',
    new Color(0, 0, 0)
  );
}
```

**Verification**: Reload, you should see:
- Top-left: "Size: 1.0x" (starts at 0.5, but displays as 1.0x multiplier)
- Top-right: "$0"

**Note**: Size multiplier displays (currentSize / 0.5), so 0.5 starting size shows as "1.0x" (1× the starting size).

---

## Step 9: Full Integration Test (15 minutes)

### Manual Test Checklist

Run through all acceptance scenarios:

#### User Story 1: Player Movement (7 scenarios)

- [ ] Press W or Up Arrow → Player moves up ✅
- [ ] Press A or Left Arrow → Player moves left ✅
- [ ] Press S or Down Arrow → Player moves down ✅
- [ ] Press D or Right Arrow → Player moves right ✅
- [ ] Release keys → Player gradually slows down (momentum) ✅
- [ ] Move player → Camera follows smoothly ✅
- [ ] View player → Starts at small size (0.5×0.5 units) ✅

#### User Story 2: Collection (6 scenarios)

- [ ] Touch smaller collectible → It disappears ✅
- [ ] Touch larger collectible → Nothing happens (too big) ✅
- [ ] Touch same-size collectible → Cannot collect ✅
- [ ] Approach slightly larger object → No magnetic pull ✅
- [ ] Approach near-size object (just smaller) → Object pulled toward you ✅
- [ ] Collect object → Score increases ✅

#### User Story 3: Growth (6 scenarios)

- [ ] Collect small coin → Ball grows noticeably ✅
- [ ] Collect customer (larger) → Ball grows more than coin ✅
- [ ] Collect when large → Growth less dramatic relative to size ✅
- [ ] Grow large enough → Previously uncollectable objects now magnetic ✅
- [ ] Growth progression → Visually dramatic and recognizable ✅
- [ ] Collect for 30 seconds → "SMALL" theme clearly evident ✅

#### User Story 4: HUD (6 scenarios)

- [ ] View screen → Size displayed (e.g., "Size: 1.0x") ✅
- [ ] View screen → Score displayed (e.g., "$0") ✅
- [ ] Collect object → Size display updates immediately ✅
- [ ] Collect object → Score display updates immediately ✅
- [ ] HUD displayed → Doesn't obscure player or collectibles ✅
- [ ] Camera moves → HUD stays fixed in screen space ✅

### Console Verification Commands

Open browser console (F12) and test:

```javascript
// Check player exists
player                       // Should be PlayerBall object
player.pos                   // Should be vec2 near (0, 0)
player.size                  // Should start vec2(0.5, 0.5)
player.score                 // Should be 0 initially

// Check collectibles spawned
engineObjects.length         // Should be 145 (1 player + 144 collectibles)

// Check camera follows
cameraPos                    // Should be vec2 near player.pos
cameraScale                  // Should be 32

// Check HUD visible
mainCanvasSize               // Should be vec2 (canvas width, height)
```

---

## Step 10: Performance Validation (10 minutes)

### Frame Rate Check

Open console and monitor:

```javascript
// Check FPS
engineUpdateTime             // Should be < 16ms (60 FPS)
```

**Alternative**: Browser DevTools → Performance → Record → Play for 10s → Stop
- **Target**: Solid 60 FPS line ✅

### Object Count Test

```javascript
// Count collectibles
engineObjects.filter(obj => obj instanceof Collectible).length  // Should be 144 initially
```

**Success Criteria** (SC-002):
- ✅ 60 FPS maintained with 100+ objects on screen

---

## Step 11: Theme Validation (30 seconds playtest)

**Test Procedure**:
1. Reload game (start fresh)
2. Set 30-second timer
3. Play naturally (move with WASD, collect objects)
4. After 30 seconds, check:
   - Is "SMALL" theme obvious? (started tiny, now larger) ✅
   - Can someone watching identify the theme? ✅
   - Is growth visually dramatic? ✅

**Success Criteria** (SC-004):
- ✅ 90% of playtesters identify "SMALL" theme in 30 seconds

**Expected Growth**:
- Start: Size 0.5 ("Size: 1.0x" displayed)
- After 30s: Size ~1.5-2.5 ("Size: 3.0-5.0x" displayed)
- Visually: Player is noticeably larger, can collect objects that were obstacles

---

## Troubleshooting

### Player doesn't move
**Symptom**: WASD/Arrow keys don't move player

**Solutions**:
1. Check console for errors (F12)
2. Verify `player` object exists: Type `player` in console
3. Check PlayerBall class has `update()` method
4. Verify `super.update()` called at end of `update()`

---

### Collectibles don't spawn
**Symptom**: Only player visible, no coins/customers

**Solutions**:
1. Check console: Should see "Spawned 144 collectibles"
2. Verify `spawnCollectibles()` called in `gameInit()`
3. Check engineObjects.length in console (should be 145)
4. Try zooming out (player might be too close to see grid)

---

### No collision/collection
**Symptom**: Player touches collectibles but they don't disappear

**Solutions**:
1. Check PlayerBall has `collideWithObject()` method
2. Verify size check: `if (this.size.x > other.size.x)`
3. Check player.score in console after touching - should increase
4. Verify collectible.destroy() called in collect()

---

### Camera doesn't follow
**Symptom**: Player moves off-screen, camera stays at origin

**Solutions**:
1. Check `gameUpdate()` has camera lerp code
2. Verify `cameraPos = cameraPos.lerp(player.pos, 0.1)`
3. Check cameraPos in console - should match player.pos approximately
4. Ensure LittleJS vec2 has `.lerp()` method (built-in)

---

### HUD not visible
**Symptom**: No "Size" or "$" displays on screen

**Solutions**:
1. Check `gameRenderPost()` has HUD rendering code
2. Verify `mainCanvasSize` exists (LittleJS global)
3. Try different position: `vec2(100, 100)` to test visibility
4. Check console for text rendering errors

---

### Performance issues (< 60 FPS)
**Symptom**: Game runs slowly, choppy movement

**Solutions**:
1. Check engineUpdateTime in console (should be < 16ms)
2. Verify only 144 collectibles spawned (not thousands)
3. Disable magnet glow effect in Collectible.render() temporarily
4. Check browser isn't throttling (DevTools open can reduce FPS)

---

## Verification Checklist (Before Marking Complete)

### Functional Requirements

- [ ] FR-001: Player spawns at origin, size 0.5×0.5 ✅
- [ ] FR-002: WASD moves player ✅
- [ ] FR-003: Arrow keys move player ✅
- [ ] FR-004: Momentum physics (acceleration on key hold) ✅
- [ ] FR-005: Damping (gradual slowdown on key release) ✅
- [ ] FR-006: Coins and customers spawn ✅
- [ ] FR-007a: Coins 0.3-0.4 units, 10 points ✅
- [ ] FR-007b: Customers 0.6-0.8 units, 50 points ✅
- [ ] FR-008: Can only collect strictly smaller objects ✅
- [ ] FR-009: Collectibles absorbed and removed ✅
- [ ] FR-010: Score increases by object value ✅
- [ ] FR-011: Size increases with exponential formula ✅
- [ ] FR-012: Magnetic attraction for near-size objects ✅
- [ ] FR-013: Camera follows with lerp ✅
- [ ] FR-014: HUD displays size (e.g., "Size: 2.5x") ✅
- [ ] FR-015: HUD displays score (e.g., "$250") ✅
- [ ] FR-016: HUD in screen space (fixed position) ✅
- [ ] FR-017: Growth visually dramatic (0.5 → 5.0 recognizable) ✅
- [ ] FR-018: Theme "SMALL" evident in 30 seconds ✅

### Success Criteria

- [ ] SC-001: Players understand mechanic in 30s without tutorial ✅
- [ ] SC-002: 60 FPS with 100+ objects ✅
- [ ] SC-003: 10x growth in 60 seconds active collection ✅
- [ ] SC-004: 90% playtesters identify "SMALL" theme in 30s ✅
- [ ] SC-005: Controls intuitive on first attempt ✅
- [ ] SC-006: Collection responsive (16ms max delay) ✅
- [ ] SC-007: Camera smooth and natural ✅
- [ ] SC-008: Works in Chrome + Firefox ✅
- [ ] SC-009: HUD readable without obstruction ✅
- [ ] SC-010: Exponential curve noticeable (later = faster) ✅

### Theme Success Criteria

- [ ] TSC-001: Theme immediately recognizable (size change visible) ✅
- [ ] TSC-002: Core mechanic relates to theme (start small, grow big) ✅
- [ ] TSC-003: 90% playtesters identify theme in 30s ✅
- [ ] TSC-004: Feature establishes theme foundation for game ✅

---

## Next Steps After Completion

Once all checkboxes pass:

1. **Commit Changes**:
```bash
git add src/game.js
git commit -m "feat: implement core Katamari mechanic (P1)

- Add PlayerBall class with WASD movement and momentum
- Add Collectible class with magnetic attraction
- Implement exponential growth formula (10x in 60s)
- Add grid-based spawning (144 objects)
- Implement camera follow with lerp
- Add HUD (size and score displays)

Completes: US1-US4 (Player Movement, Collection, Growth, HUD)
Validates: All 18 FRs, 10 SCs, 4 TSCs
Milestone: Day 7 playable core loop achieved

🤖 Generated with Claude Code"
```

2. **Manual Playtest**:
   - Play for 60 seconds, verify 10x growth
   - Test all edge cases (same-size, magnetic range, etc.)
   - Verify theme "SMALL" is immediately obvious

3. **Cross-Browser Test**:
   - Chrome: Load game, verify works
   - Firefox: Load game, verify works
   - Safari (if available): Load game, verify works

4. **Mark Feature Complete**:
   - All FRs pass ✅
   - All SCs pass ✅
   - Constitution compliance ✅
   - Ready for P2 features (level system, win/lose)

5. **Optional**: Create pull request for code review

---

## Quick Reference: Key Parameters

| Parameter | Value | Location |
|-----------|-------|----------|
| Player start size | 0.5×0.5 units | PlayerBall constructor |
| Growth scaling factor | 200 | PlayerBall.collect() |
| Coin size range | 0.3-0.4 units | COLLECTIBLE_DATA.coin |
| Customer size range | 0.6-0.8 units | COLLECTIBLE_DATA.customer |
| Coin value | 10 points | COLLECTIBLE_DATA.coin |
| Customer value | 50 points | COLLECTIBLE_DATA.customer |
| Magnet strength | 1.5 | Collectible.update() |
| Magnet distance | 2.5 units | Collectible.update() |
| Magnet size range | 80-95% player | Collectible.update() |
| Camera lerp factor | 0.1 | gameUpdate() |
| Grid size | 12×12 cells | spawnCollectibles() |
| Cell size | 2.5 units | spawnCollectibles() |
| Randomization | ±1.0 units | spawnCollectibles() |
| Type distribution | 60% coin, 40% customer | spawnCollectibles() |

---

**Implementation Time**: ~2 hours coding + 0.5 hours testing = ~2.5 hours total
**Target Date**: October 16, 2025 (4 days before Day 7 milestone)
**Status**: Ready to implement - all parameters defined and validated
