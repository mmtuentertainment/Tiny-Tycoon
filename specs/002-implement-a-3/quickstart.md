# Quickstart Guide: Level Progression System

**Feature**: 002-implement-a-3 (Level Progression System)
**Date**: 2025-10-15

## Prerequisites

✅ **Feature 001 Complete**: Core Katamari Mechanic must be working
  - Player movement (WASD/arrows)
  - Collision and collection
  - Exponential growth
  - Magnetic attraction
  - Camera follow
  - Basic HUD (size, score)

✅ **Development Environment**:
  - Node.js installed
  - `games/game-jam-2025/` project setup
  - LittleJS at `../../LittleJS/dist/littlejs.release.js`
  - `npm run dev` script functional

---

## Quick Validation Checklist

After implementing Feature 002, verify these core behaviors:

### Level 1 Validation (Easy)

1. **Start game** → Player spawns at center (0, 0), size 0.5×0.5
2. **Timer** → Displays "1:00", counts down to "0:59", "0:58"...
3. **Collectibles** → 30-50 objects spawned, sizes 0.3-3.0 units
4. **Growth** → Collect objects, grow exponentially (Feature 001 formula)
5. **Target** → Reach 5.0× size (10x from start) before timer expires
6. **Victory** → Green "LEVEL COMPLETE!" screen shows
7. **Auto-advance** → After 2-3 seconds, Level 2 begins
8. **Skip** → Press any key during victory screen → Level 2 starts immediately

### Level 2 Validation (Medium)

1. **Level start** → Player reset to 0.5×0.5, new collectibles spawn
2. **Timer** → "1:30" (90 seconds)
3. **Collectibles** → 40-60 objects, sizes 3.0-10.0 units
4. **Play area** → Larger (100×100 units), camera follows with boundaries
5. **Target** → Reach 15.0× size (30x from start)
6. **Victory** → Same screen, advances to Level 3

### Level 3 Validation (Hard)

1. **Level start** → Player reset again, largest play area
2. **Timer** → "2:00" (120 seconds)
3. **Collectibles** → 50-80 objects, sizes 10.0-40.0 units
4. **Play area** → Largest (150×150 units)
5. **Target** → Reach 50.0× size (100x from start)
6. **Victory** → Shows "GAME COMPLETE!" screen

### Defeat Flow Validation

1. **Let timer expire** → Don't reach target size before 0:00
2. **Defeat screen** → Red "TIME'S UP!" with size comparison
3. **Retry** → After 2-3s or key press, same level restarts
4. **Retry works** → Player at 0.5, timer reset, fresh collectibles

### Timer Urgency Validation

1. **Normal** → Timer shows white text when >10s remaining
2. **Urgent** → Timer shows orange/red text when ≤10s remaining
3. **Countdown** → "0:10" → "0:09" → ... → "0:01" → "0:00"
4. **Exact timing** → Defeat triggers immediately at 0:00

---

## Testing Scenarios

### Scenario 1: Complete Game Happy Path

**Steps**:
1. Start game (Level 1 begins)
2. Collect objects until 5.0× size reached
3. Victory screen appears
4. Wait 2-3 seconds OR press key
5. Level 2 begins
6. Collect objects until 15.0× size reached
7. Victory screen appears
8. Advance to Level 3
9. Collect objects until 50.0× size reached
10. Game complete screen appears

**Expected**: Smooth progression through all 3 levels without errors

---

### Scenario 2: Defeat and Retry

**Steps**:
1. Start Level 1
2. Intentionally avoid collectibles
3. Wait until timer reaches 0:00
4. Defeat screen appears with size < 10.0x
5. Press key to retry
6. Level 1 restarts (timer 1:00, player 0.5×)
7. Play normally and complete level
8. Victory screen, advance to Level 2

**Expected**: Defeat flow works, retry restarts same level correctly

---

### Scenario 3: Skip Transitions

**Steps**:
1. Complete Level 1 (reach 5.0×)
2. Victory screen appears
3. Immediately press any key (don't wait 2-3s)
4. Level 2 starts instantly
5. Complete Level 2
6. Press key during victory
7. Level 3 starts instantly

**Expected**: Key press skips auto-advance timer, immediate transition

---

### Scenario 4: Soft Boundary Verification

**Steps**:
1. Start Level 1
2. Move player to far right edge of play area
3. Continue pressing right arrow
4. Observe camera stops at boundary
5. Player can still move slightly off-screen
6. Move back left
7. Camera follows normally

**Expected**: Camera clamped to play area, player not hard-stopped

---

### Scenario 5: Collectible Spawning Per Level

**Steps**:
1. Start Level 1, count collectibles (should be 30-50)
2. Verify sizes are small (0.3-3.0 range visually)
3. Complete level
4. Level 2: count collectibles (should be 40-60)
5. Verify sizes are medium (3.0-10.0 range)
6. Complete level
7. Level 3: count collectibles (should be 50-80)
8. Verify sizes are large (10.0-40.0 range)

**Expected**: Each level spawns appropriate count and size range

---

## Common Issues & Troubleshooting

### Issue: Timer not counting down

**Symptoms**: Timer stuck at "1:00", doesn't decrement

**Causes**:
- `levelStartTime` not initialized in `startLevel()`
- `gameUpdate()` not calculating elapsed time
- State not set to `STATE.PLAYING`

**Fix**:
```javascript
// In startLevel()
levelStartTime = time; // LittleJS global
levelState = STATE.PLAYING;

// In gameUpdate()
if (levelState === STATE.PLAYING) {
  const elapsed = time - levelStartTime;
  remainingTime = Math.max(0, config.timeLimit - elapsed);
}
```

---

### Issue: Wrong collectible count spawned

**Symptoms**: Always 30 collectibles, never varies, or way too many

**Causes**:
- `randInt()` not called with min/max from config
- `spawnCount` calculated incorrectly

**Fix**:
```javascript
const spawnCount = randInt(
  config.collectibleSpawnCount.min,
  config.collectibleSpawnCount.max
);
```

---

### Issue: Camera not clamped at boundaries

**Symptoms**: Black edges visible, player can see beyond play area

**Causes**:
- Clamp logic not in `gameUpdatePost()` after lerp
- Viewport dimensions not calculated correctly
- Bounds calculation off by one

**Fix**:
```javascript
// In gameUpdatePost() AFTER camera lerp
const playAreaHalfSize = LEVEL_CONFIG[currentLevel].playAreaSize / 2;
const viewportHalfWidth = mainCanvasSize.x / (2 * cameraScale);
const viewportHalfHeight = mainCanvasSize.y / (2 * cameraScale);

cameraPos.x = clamp(
  cameraPos.x,
  -playAreaHalfSize + viewportHalfWidth,
  playAreaHalfSize - viewportHalfWidth
);
// Same for Y
```

---

### Issue: Transition screen stuck, can't skip

**Symptoms**: Victory/defeat screen shows, key press doesn't work

**Causes**:
- `keyWasPressed()` not checking all keys
- State check missing (only works in VICTORY/DEFEAT)
- `handleTransition()` not called

**Fix**:
```javascript
// In gameUpdate()
if ((levelState === STATE.VICTORY || levelState === STATE.DEFEAT) && keyWasPressed()) {
  handleTransition();
}
```

---

### Issue: Level doesn't restart after defeat

**Symptoms**: Defeat screen shows, but retry doesn't work

**Causes**:
- `handleTransition()` not calling `startLevel(currentLevel)` for defeat
- `currentLevel` incremented on defeat (should only increment on victory)

**Fix**:
```javascript
function handleTransition() {
  if (levelState === STATE.VICTORY) {
    if (currentLevel < LEVEL_CONFIG.length - 1) {
      startLevel(currentLevel + 1); // Next level
    } else {
      levelState = STATE.GAME_COMPLETE;
    }
  } else if (levelState === STATE.DEFEAT) {
    startLevel(currentLevel); // RETRY same level, don't increment
  }
}
```

---

### Issue: Win condition not triggering

**Symptoms**: Reach 5.0× size, but victory screen doesn't show

**Causes**:
- Win check not in `PlayerBall.collect()` after size update
- State guard missing (`levelState === STATE.PLAYING`)
- Comparison using `sizeMultiplier` instead of `size.x`

**Fix**:
```javascript
// In PlayerBall.collect() AFTER size update
if (levelState === STATE.PLAYING &&
    this.size.x >= LEVEL_CONFIG[currentLevel].targetSize) {
  levelState = STATE.VICTORY;
  transitionStartTime = time;
}
```

---

### Issue: Collectibles too large/small for level

**Symptoms**: Level 1 has huge objects, or Level 3 has tiny objects

**Causes**:
- Using Feature 001 fixed sizes instead of level config
- `config.collectibleSizeMin/Max` not passed to spawn function

**Fix**:
```javascript
// In spawnCollectiblesForLevel()
const size = rand(config.collectibleSizeMin, config.collectibleSizeMax);
// NOT: const size = rand(0.3, 0.4); // Feature 001 fixed sizes
```

---

## Performance Validation

### Expected Performance

| Metric | Target | How to Measure |
|--------|--------|----------------|
| FPS | 60 FPS | Browser DevTools Performance tab |
| Level 1 collectibles | 30-50 | Count on screen |
| Level 2 collectibles | 40-60 | Count on screen |
| Level 3 collectibles | 50-80 | Count on screen (max stress) |
| Timer accuracy | ±50ms | Compare system clock to in-game timer |
| Transition delay | 2.5s ±0.1s | Time from victory to auto-advance |

### Performance Testing

1. **Open DevTools** → Performance tab → Start recording
2. **Play Level 3** (most collectibles, largest area = max stress)
3. **Collect rapidly** (triggers many collision checks, magnetic forces)
4. **Stop recording after 30 seconds**
5. **Check FPS**: Should stay at 60 FPS (green line at top)
6. **Check frame time**: Should be <16.67ms per frame

**If performance issues**:
- Reduce max spawn count in LEVEL_CONFIG (50-80 → 40-60)
- Optimize magnetic attraction checks (distance threshold)
- Profile `spawnCollectiblesForLevel()` (should be <50ms)

---

## Manual Test Checklist

Print this and check off during testing:

**Level 1 (Easy)**:
- [ ] Timer starts at 1:00
- [ ] 30-50 collectibles spawned
- [ ] Collectibles are small (0.3-3.0 units)
- [ ] Can reach 5.0× size (10x from 0.5)
- [ ] Victory screen shows on win
- [ ] Defeat screen shows on timeout
- [ ] Can retry after defeat
- [ ] Can skip victory screen with key

**Level 2 (Medium)**:
- [ ] Player resets to 0.5× size
- [ ] Timer starts at 1:30 (90s)
- [ ] 40-60 collectibles spawned
- [ ] Collectibles are medium (3.0-10.0 units)
- [ ] Play area feels larger (100×100)
- [ ] Can reach 15.0× size (30x from 0.5)
- [ ] Victory advances to Level 3

**Level 3 (Hard)**:
- [ ] Player resets to 0.5× size
- [ ] Timer starts at 2:00 (120s)
- [ ] 50-80 collectibles spawned
- [ ] Collectibles are large (10.0-40.0 units)
- [ ] Play area feels largest (150×150)
- [ ] Can reach 50.0× size (100x from 0.5)
- [ ] Victory shows "GAME COMPLETE!"

**Timers & HUD**:
- [ ] Timer counts down smoothly (no jumps)
- [ ] MM:SS format correct (e.g., "1:05" not "1:5")
- [ ] Timer turns orange at 10s remaining
- [ ] Target size displayed ("Target: 10.0x")
- [ ] Level number displayed ("Level 1", "Level 2", "Level 3")
- [ ] Size multiplier updates (Feature 001 HUD)
- [ ] Score updates (Feature 001 HUD)

**Boundaries**:
- [ ] Camera stops at play area edges
- [ ] No black space visible
- [ ] Player can move slightly off-screen (soft boundary)
- [ ] Camera follows normally near center

**Edge Cases**:
- [ ] Win at exactly 0:00 → Player wins (favored)
- [ ] Press multiple keys during transition → No double-trigger
- [ ] Complete Level 3 → Game complete screen, no Level 4
- [ ] Collectibles never spawn outside bounds

---

## Next Steps

After validation:

1. ✅ **All tests pass** → Ready for `/speckit.tasks` command
2. ❌ **Bugs found** → Fix issues, re-test, update this guide with new learnings
3. **Performance OK** (60 FPS) → Proceed to implementation
4. **Performance issues** → Optimize before adding more features

---

**Quickstart Status**: ✅ Complete
**Ready for Testing**: Yes (after implementation)
**Ready for Task Breakdown**: Yes
