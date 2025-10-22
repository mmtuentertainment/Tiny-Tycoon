# Task Breakdown: Gen Alpha Personality & Humor Layer

**Feature**: 007-add-gen-alpha-personality
**Created**: 2025-10-22
**Total Estimated Time**: 1.5-2.5 hours
**Tasks**: 8 atomic tasks

---

## Task Overview

| Task | Description | Time | Status |
|------|-------------|------|--------|
| TASK-001 | Add "Biggest W" tracking to PlayerBall | 15min | [x] DONE |
| TASK-002 | Update tracking in collect() method | 10min | [x] DONE |
| TASK-003 | Replace victory screen with personality text (Level 1-3) | 40min | [x] DONE |
| TASK-004 | Replace game complete screen with maximum absurdity | 20min | [x] DONE |
| TASK-005 | Replace defeat screen with minimal irony | 15min | [x] DONE |
| TASK-006 | Add level subtitle to HUD (optional) | 10min | [x] DONE |
| TASK-007 | Test all screens in browser | 20min | [ ] USER TEST REQUIRED |
| TASK-008 | Test emoji cross-browser and replace if needed | 15min | [ ] USER TEST REQUIRED |

**Critical Path**: TASK-001 → TASK-002 → TASK-003 → TASK-007
**Parallel Execution**: TASK-004, TASK-005, TASK-006 can be done in parallel after TASK-002

---

## User Story 1: Ironic Victory Celebrations

### TASK-001: Add "Biggest W" tracking fields to PlayerBall

**Priority**: P3
**Time**: 15 minutes
**Status**: [ ] TODO
**Dependencies**: None

**Description**:
Add two new fields to PlayerBall constructor to track the highest value object collected during gameplay for "Biggest W" stat display.

**Implementation**:
1. Open `src/game.js`
2. Navigate to PlayerBall constructor (line ~1346)
3. Add after `this.totalScore = 0;`:
   ```javascript
   this.biggestCollectedValue = 0;   // Feature 007: Track highest value object
   this.biggestCollectedName = '';   // Feature 007: Track object name for "Biggest W"
   ```

**Files Modified**:
- `src/game.js:1346-1355` (PlayerBall constructor)

**Test Steps**:
1. Save file
2. Check for syntax errors in console
3. Verify game still loads (no errors)
4. ✅ **Pass**: Game loads without errors

---

### TASK-002: Update "Biggest W" tracking in collect() method

**Priority**: P3
**Time**: 10 minutes
**Status**: [ ] TODO
**Dependencies**: TASK-001

**Description**:
Add logic to PlayerBall.collect() to update biggestCollectedValue and biggestCollectedName when a higher-value object is collected.

**Implementation**:
1. Open `src/game.js`
2. Navigate to PlayerBall.collect() method (line ~1401)
3. Add after `this.totalScore += collectible.value;`:
   ```javascript
   // Feature 007: Track biggest collected object (FR-007-020, FR-007-021)
   if (collectible.value > this.biggestCollectedValue) {
       this.biggestCollectedValue = collectible.value;
       const objectData = COLLECTIBLE_DATA[collectible.type];
       this.biggestCollectedName = objectData ? objectData.name : collectible.type.toUpperCase();
   }
   ```

**Files Modified**:
- `src/game.js:1401-1410` (PlayerBall.collect method)

**Test Steps**:
1. Save file
2. Run `npm run dev`
3. Play game, collect PENNY ($1), then DESK ($200), then GUM ($10)
4. Check console: `console.log(player.biggestCollectedName)` should show "DESK"
5. ✅ **Pass**: Tracking shows highest value object, not most recent

---

### TASK-003: Replace victory screen with level-specific personality text

**Priority**: P3
**Time**: 40 minutes
**Status**: [ ] TODO
**Dependencies**: TASK-002

**Description**:
Replace generic "LEVEL COMPLETE!" victory screen with level-specific Gen Alpha personality text. Different text for Level 1 (Broke Era), Level 2 (Mid-tier), Level 3 (Oligarch).

**Implementation**:
1. Open `src/game.js`
2. Navigate to victory screen rendering (line ~797-816)
3. Replace entire victory screen block with:

```javascript
// Feature 007: Victory screen with Gen Alpha personality (FR-007-001/002/003/004)
if (levelState === STATE.VICTORY) {
    // Semi-transparent black overlay
    drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

    const centerX = mainCanvasSize.x / 2;
    const centerY = mainCanvasSize.y / 2;
    const config = LEVEL_CONFIG[currentLevel];
    const levelNum = config.levelNumber;

    // Get biggest W stat (FR-007-022)
    const biggestW = player.biggestCollectedName || '(none)';
    const timeRemaining = formatTime(remainingTime);

    // Level-specific personality text (FR-007-001, FR-007-002, FR-007-003)
    let titleText, subtitleText, scoreLabel, sizeLabel, flavorText;

    if (levelNum === 1) {
        // Level 1: Broke Era - Uncommon grindset
        titleText = 'LEVEL 1 COMPLETE';
        subtitleText = 'UNCOMMON GRINDSET UNLOCKED ✅';
        scoreLabel = `Portfolio: $${levelScoreFormatted} (Bussin fr fr)`;
        sizeLabel = `Size: ${sizeMultiplier}x (Growing fr)`;
        flavorText = 'Press SPACE for next level';
    } else if (levelNum === 2) {
        // Level 2: Mid-tier - Influencer status
        titleText = 'LEVEL 2 COMPLETE';
        subtitleText = 'MID-TIER INFLUENCER ACHIEVED 📱';
        scoreLabel = `Net Worth: $${levelScoreFormatted} (It\'s giving hustle)`;
        sizeLabel = `Size: ${sizeMultiplier}x (Massive W)`;
        flavorText = 'Press SPACE for oligarch status';
    } else {
        // Level 3: Oligarch - Generational wealth
        titleText = 'LEVEL 3 COMPLETE';
        subtitleText = 'OLIGARCH STATUS: CONFIRMED ✅';
        scoreLabel = `Portfolio: $${levelScoreFormatted} (No cap legendary)`;
        sizeLabel = `Size: ${sizeMultiplier}x (UNGOVERNABLE)`;
        flavorText = 'Press SPACE to flex';
    }

    // Render victory text (FR-007-004)
    drawTextScreen(titleText, vec2(centerX, centerY + 100), 48, new Color(0, 1, 0));
    drawTextScreen(subtitleText, vec2(centerX, centerY + 50), 36, new Color(1, 1, 0));
    drawTextScreen(scoreLabel, vec2(centerX, centerY), 28, new Color(1, 1, 1));
    drawTextScreen(sizeLabel, vec2(centerX, centerY - 35), 28, new Color(1, 1, 1));
    drawTextScreen(`Biggest W: ${biggestW}`, vec2(centerX, centerY - 70), 24, new Color(1, 1, 0));
    drawTextScreen(`Time: ${timeRemaining} remaining`, vec2(centerX, centerY - 105), 24, new Color(0.8, 0.8, 0.8));
    drawTextScreen(flavorText, vec2(centerX, centerY - 150), 24, new Color(0.7, 0.7, 0.7));
    return; // Skip normal HUD
}
```

**Files Modified**:
- `src/game.js:797-816` (Victory screen rendering)

**Test Steps**:
1. Save file
2. Run `npm run dev`
3. **Test Level 1**: Complete Level 1
   - ✅ Shows "UNCOMMON GRINDSET UNLOCKED ✅"
   - ✅ Shows "Portfolio: $X (Bussin fr fr)"
   - ✅ Shows "Biggest W: [object name]"
   - ✅ Count slang: 2-3 terms max (bussin, fr, W)
4. **Test Level 2**: Complete Level 2
   - ✅ Shows "MID-TIER INFLUENCER ACHIEVED 📱"
   - ✅ Shows "It's giving hustle"
5. **Test Level 3**: Complete Level 3
   - ✅ Shows "OLIGARCH STATUS: CONFIRMED ✅"
   - ✅ Shows "No cap legendary"
   - ✅ Shows "UNGOVERNABLE"

---

## User Story 2: Self-Aware Tone Throughout

### TASK-004: Replace game complete screen with maximum absurdity

**Priority**: P3
**Time**: 20 minutes
**Status**: [ ] TODO
**Dependencies**: TASK-002
**Parallel**: Can run in parallel with TASK-005, TASK-006

**Description**:
Replace generic "CONGRATULATIONS! ALL LEVELS COMPLETE!" with maximum absurdity text ("YOU WON CAPITALISM", "UNGOVERNABLE STATUS", etc.).

**Implementation**:
1. Open `src/game.js`
2. Navigate to game complete screen (line ~819-833)
3. Replace entire block with:

```javascript
// Feature 007: Game complete screen with maximum absurdity (FR-007-014/015/016)
if (levelState === STATE.GAME_COMPLETE) {
    drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

    const centerX = mainCanvasSize.x / 2;
    const centerY = mainCanvasSize.y / 2;
    const biggestW = player.biggestCollectedName || 'NOTHING';

    // Maximum absurdity text
    drawTextScreen('🎮 GAME COMPLETE 🎮', vec2(centerX, centerY + 120), 54, new Color(1, 1, 0));
    drawTextScreen('YOU WON CAPITALISM', vec2(centerX, centerY + 70), 48, new Color(0, 1, 0));
    drawTextScreen(`Size: ${sizeMultiplier}x (COSMIC)`, vec2(centerX, centerY + 20), 32, new Color(1, 1, 1));
    drawTextScreen(`Total: $${totalScoreFormatted} (Generational)`, vec2(centerX, centerY - 20), 32, new Color(1, 1, 0));
    drawTextScreen(`Biggest W: ${biggestW}`, vec2(centerX, centerY - 60), 28, new Color(1, 1, 1));
    drawTextScreen('UNGOVERNABLE STATUS: ACHIEVED ✅', vec2(centerX, centerY - 100), 28, new Color(0, 1, 0));
    drawTextScreen('Touch grass? Nah, touch ASSETS 💎', vec2(centerX, centerY - 140), 24, new Color(0.9, 0.9, 0.9));
    drawTextScreen('You are now INEVITABLE', vec2(centerX, centerY - 180), 22, new Color(0.7, 0.7, 0.7));
    return; // Skip normal HUD
}
```

**Files Modified**:
- `src/game.js:819-833` (Game complete screen)

**Test Steps**:
1. Save file
2. Run `npm run dev`
3. Complete all 3 levels (use console cheat if needed: `player.size = vec2(50)`)
4. ✅ Shows "YOU WON CAPITALISM"
5. ✅ Shows "UNGOVERNABLE STATUS: ACHIEVED ✅"
6. ✅ Shows "Touch grass? Nah, touch ASSETS 💎"
7. ✅ Different from Level 3 victory (unique text)

---

### TASK-005: Replace defeat screen with minimal irony

**Priority**: P3
**Time**: 15 minutes
**Status**: [ ] TODO
**Dependencies**: TASK-002
**Parallel**: Can run in parallel with TASK-004, TASK-006

**Description**:
Replace generic "TIME'S UP! Try again!" with minimal irony ("GRIND INTERRUPTED 💀", "Run it back?") while maintaining encouraging tone.

**Implementation**:
1. Open `src/game.js`
2. Navigate to defeat screen (line ~836-857)
3. Replace entire block with:

```javascript
// Feature 007: Defeat screen with minimal irony (FR-007-012, FR-007-013)
if (levelState === STATE.DEFEAT) {
    drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

    const centerX = mainCanvasSize.x / 2;
    const centerY = mainCanvasSize.y / 2;
    const config = LEVEL_CONFIG[currentLevel];
    const targetMultiplier = (config.targetSize / 0.5).toFixed(1);

    // Minimal irony (encouraging tone maintained)
    drawTextScreen('GRIND INTERRUPTED 💀', vec2(centerX, centerY + 80), 56, new Color(1, 0.3, 0));
    drawTextScreen(
        `Size: ${sizeMultiplier}x / ${targetMultiplier}x (Not enough)`,
        vec2(centerX, centerY + 20),
        28,
        new Color(1, 1, 1)
    );
    drawTextScreen(`Portfolio: $${levelScoreFormatted} (Rare L moment)`, vec2(centerX, centerY - 20), 28, new Color(1, 1, 1));
    drawTextScreen('Run it back? Press SPACE to retry', vec2(centerX, centerY - 70), 24, new Color(0.8, 0.8, 0.8));
    drawTextScreen('Sigma tip: Collect bigger objects first', vec2(centerX, centerY - 110), 20, new Color(0.6, 0.6, 0.6));
    return; // Skip normal HUD
}
```

**Files Modified**:
- `src/game.js:836-857` (Defeat screen)

**Test Steps**:
1. Save file
2. Run `npm run dev`
3. Let timer expire without reaching goal
4. ✅ Shows "GRIND INTERRUPTED 💀"
5. ✅ Shows "Run it back? Press SPACE to retry"
6. ✅ Shows "Sigma tip: Collect bigger objects first"
7. ✅ Tone is encouraging, not discouraging

---

### TASK-006: Add level subtitle to HUD (OPTIONAL)

**Priority**: P3
**Time**: 10 minutes
**Status**: [ ] TODO
**Dependencies**: None
**Parallel**: Can run in parallel with TASK-004, TASK-005
**Optional**: Can skip if time-constrained

**Description**:
Add subtitle to level display in HUD (e.g., "Level 1 - BROKE ERA"). Simplest personality injection for HUD.

**Implementation**:
1. Open `src/game.js`
2. Navigate to level indicator HUD (line ~903)
3. Replace level text rendering with:

```javascript
// Feature 007: Level text with personality subtitle (FR-007-010)
const levelSubtitles = ['BROKE ERA', 'MID-TIER GRIND', 'OLIGARCH MODE'];
const levelText = `Level ${config.levelNumber} - ${levelSubtitles[currentLevel]}`;

drawTextScreen(
    levelText,
    vec2(mainCanvasSize.x - 120, 90),
    26,  // Slightly smaller to fit subtitle
    new Color(1, 1, 1),
    0,
    'right',
    'monospace',
    new Color(0, 0, 0)
);
```

**Files Modified**:
- `src/game.js:903-913` (HUD level display)

**Test Steps**:
1. Save file
2. Run `npm run dev`
3. ✅ Level 1 shows "Level 1 - BROKE ERA"
4. ✅ Level 2 shows "Level 2 - MID-TIER GRIND"
5. ✅ Level 3 shows "Level 3 - OLIGARCH MODE"
6. ✅ Text fits on screen (not cut off)

---

## Testing & Validation

### TASK-007: Comprehensive manual testing of all screens

**Priority**: P3
**Time**: 20 minutes
**Status**: [ ] TODO
**Dependencies**: TASK-003, TASK-004, TASK-005

**Description**:
Systematic testing of all modified screens to ensure personality text displays correctly, slang count is appropriate, and tone is consistent.

**Test Checklist**:

**Victory Screens**:
- [ ] Level 1: "UNCOMMON GRINDSET UNLOCKED ✅"
- [ ] Level 1: Shows "Portfolio: $X (Bussin fr fr)"
- [ ] Level 1: Shows "Biggest W: [object name]"
- [ ] Level 1: Slang count is 2-3 terms max
- [ ] Level 2: "MID-TIER INFLUENCER ACHIEVED 📱"
- [ ] Level 2: Shows "Net Worth" and "It's giving hustle"
- [ ] Level 3: "OLIGARCH STATUS: CONFIRMED ✅"
- [ ] Level 3: Shows "UNGOVERNABLE"

**Game Complete Screen**:
- [ ] Shows "YOU WON CAPITALISM"
- [ ] Shows "UNGOVERNABLE STATUS: ACHIEVED ✅"
- [ ] Shows "Touch grass? Nah, touch ASSETS 💎"
- [ ] Different from Level 3 victory screen
- [ ] Shows total score and biggest W

**Defeat Screen**:
- [ ] Shows "GRIND INTERRUPTED 💀"
- [ ] Shows "Rare L moment"
- [ ] Shows "Run it back? Press SPACE to retry"
- [ ] Tone is encouraging (not discouraging)
- [ ] Shows portfolio amount

**Biggest W Tracking**:
- [ ] Collect multiple objects, verify tracking highest value
- [ ] Verify tracking resets between levels
- [ ] Edge case: No objects collected shows "(none)"

**Theme Validation** (Article II, Section 2.3):
- [ ] Language progression reinforces SMALL→BIG theme
- [ ] Text references dollar amounts that scale
- [ ] Players understand growth through text

**Pass Criteria**: All checkboxes checked ✅

---

### TASK-008: Test emoji cross-browser and apply fallbacks

**Priority**: P3
**Time**: 15 minutes
**Status**: [ ] TODO
**Dependencies**: TASK-003, TASK-004, TASK-005

**Description**:
Test emoji rendering (✅, 💀, 💎, 📱, 🎮) in Chrome, Firefox, and Safari. Replace with ASCII if they render as boxes (☐).

**Test Steps**:
1. Open game in **Chrome**:
   - [ ] ✅ renders correctly (checkmark)
   - [ ] 💀 renders correctly (skull)
   - [ ] 💎 renders correctly (diamond)
   - [ ] 📱 renders correctly (phone)
   - [ ] 🎮 renders correctly (game controller)

2. Open game in **Firefox**:
   - [ ] All emoji render correctly (repeat checklist above)

3. Open game in **Safari** (if available):
   - [ ] All emoji render correctly (repeat checklist above)

**If ANY emoji renders as box (☐)**:
1. Apply ASCII fallback (FR-007-018):
   - ✅ → `[X]`
   - 💀 → `(skull)`
   - 💎 → `GEM`
   - 📱 → `PHONE`
   - 🎮 → `GAME`

2. Replace problem emoji in text strings

**Pass Criteria**: All emoji render correctly OR fallbacks applied

---

## Summary

### Critical Path (Must Complete)
1. TASK-001: Add tracking fields (15min)
2. TASK-002: Update collect() tracking (10min)
3. TASK-003: Victory screen personality (40min)
4. TASK-007: Comprehensive testing (20min)

**Total Critical Path Time**: 1 hour 25 minutes

### Optional/Parallel
- TASK-004: Game complete screen (20min) - Parallel
- TASK-005: Defeat screen (15min) - Parallel
- TASK-006: HUD subtitle (10min) - Parallel, Optional
- TASK-008: Emoji testing (15min) - Post-implementation

**Total Time with All Tasks**: 2 hours 15 minutes

### Execution Strategy

**Sequential** (safest):
1. TASK-001 → TASK-002 → TASK-003 → TASK-004 → TASK-005 → TASK-006 → TASK-007 → TASK-008

**Parallel** (faster):
1. TASK-001 (15min)
2. TASK-002 (10min)
3. **Parallel block** (40min total, all run simultaneously):
   - TASK-003: Victory screen (40min)
   - TASK-004: Game complete screen (20min) ✓ finishes first
   - TASK-005: Defeat screen (15min) ✓ finishes first
   - TASK-006: HUD subtitle (10min) ✓ finishes first
4. TASK-007: Testing (20min)
5. TASK-008: Emoji testing (15min)

**Fastest Completion**: 1 hour 40 minutes (parallel execution)

---

## Status Tracking

**Progress**: 0/8 tasks complete (0%)

**Next Task**: TASK-001 (Add "Biggest W" tracking fields)

**To Start Implementation**:
```bash
cd "/home/matt/Game Development/games/game-jam-2025"
/speckit.implement
```

---

**Tasks Status**: ✅ **READY FOR IMPLEMENTATION**
**Complexity**: LOW (text replacement)
**Risk**: LOW (no system changes)
**Impact**: HIGH (memorable personality)

