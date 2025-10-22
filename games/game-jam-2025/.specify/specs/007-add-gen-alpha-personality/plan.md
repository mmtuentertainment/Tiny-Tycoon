# Implementation Plan: Gen Alpha Personality & Humor Layer

**Feature**: 007-add-gen-alpha-personality
**Created**: 2025-10-22
**Status**: Ready for implementation
**Estimated Time**: 1.5-2.5 hours

---

## Constitution Check

### Article II: Theme-First Development ✅
- **Does this embody "SMALL"?** YES
  - Language progression (Portfolio → Net Worth → Generational Wealth) reinforces SMALL→BIG theme
  - Ironic escalation ("bussin" → "UNGOVERNABLE") mirrors growth from pennies to rockets
  - Text explicitly references dollar amounts that scale ($523 → $500M)

### Article III: Katamari Mechanics ✅
- **Physics compliance?** N/A
  - This is pure text changes, no physics modifications
  - Does not affect core Katamari collection mechanics

### Article V: Technical Standards ✅
- **LittleJS idioms followed?** YES
  - Uses existing `drawTextScreen()` API (no custom rendering)
  - Follows LittleJS Color and vec2 patterns
  - No new classes or complex systems

### Article VIII: Timeline ✅
- **Can ship in <2 days?** YES
  - Estimate: 1.5-2.5 hours (pure string replacement)
  - No new systems, no complex logic
  - Simple find-replace with personality injection

### Article XV: Playable > Pretty ✅
- **Is this core gameplay or polish?** POLISH (P3)
  - Does not affect gameplay mechanics
  - Adds character and memorability (shareability factor)
  - Can be skipped if time-constrained (but HIGH impact for low cost)

**Constitution Compliance**: ✅ **APPROVED** - All checks passed

---

## Technical Approach

### Architecture: Pure Text Replacement (No New Systems)

**Strategy**: Find existing text strings in `gameRenderPost()` and replace with Gen Alpha personality-injected versions.

**Affected Screens**:
1. **Victory Screen** (STATE.VICTORY) - Lines 797-816
2. **Game Complete Screen** (STATE.GAME_COMPLETE) - Lines 819-833
3. **Defeat Screen** (STATE.DEFEAT) - Lines 836-857
4. **HUD Level Text** (during STATE.PLAYING) - Line 913

**NO New Files**: All changes in `src/game.js`
**NO New Classes**: Pure string modifications
**NO New Systems**: No managers, no state tracking (except "Biggest W")

### LittleJS Patterns Used

**Existing Patterns** (no changes needed):
- `drawTextScreen(text, pos, size, color, angle, align, font, outline)` - Already in use
- `levelState` state machine - Already working
- `currentLevel` tracking - Already available
- `player.score`, `player.totalScore` - Already tracked

**New Pattern** (simple addition):
- `player.biggestCollectedValue` (number) - Track max value
- `player.biggestCollectedName` (string) - Track object name

### File Organization

**Single File Modified**: `src/game.js`

**Sections to Modify**:
1. **Lines 549-559** - PlayerBall constructor (add biggestCollected tracking)
2. **Lines 605-626** - PlayerBall.collect() (update tracking)
3. **Lines 797-816** - Victory screen text (add personality per level)
4. **Lines 819-833** - Game complete screen (maximum absurdity)
5. **Lines 836-857** - Defeat screen (minimal irony)
6. **Line 913** - HUD level text (optional personality injection)

---

## Implementation Details

### Part 1: Add "Biggest W" Tracking to PlayerBall

**Location**: PlayerBall constructor (line 550)

**Current Code**:
```javascript
constructor(pos) {
    super(pos, vec2(0.5, 0.5));
    this.mass = 0.25;
    this.damping = 0.5;
    this.score = 0;  // Level earnings
    this.totalScore = 0;  // Cumulative earnings
    this.color = new Color(1, 0.8, 0);
    this.collideTiles = false;
    this.collideSolidObjects = true;
}
```

**New Code** (add 2 fields):
```javascript
constructor(pos) {
    super(pos, vec2(0.5, 0.5));
    this.mass = 0.25;
    this.damping = 0.5;
    this.score = 0;  // Level earnings
    this.totalScore = 0;  // Cumulative earnings
    this.biggestCollectedValue = 0;  // Feature 007: Track highest value object
    this.biggestCollectedName = '';  // Feature 007: Track object name for "Biggest W"
    this.color = new Color(1, 0.8, 0);
    this.collideTiles = false;
    this.collideSolidObjects = true;
}
```

### Part 2: Update Tracking in collect()

**Location**: PlayerBall.collect() method (after line 608)

**Current Code**:
```javascript
collect(collectible) {
    // Add score (FR-010)
    this.score += collectible.value;
    this.totalScore += collectible.value;

    // ... rest of method
}
```

**New Code** (add tracking):
```javascript
collect(collectible) {
    // Add score (FR-010)
    this.score += collectible.value;
    this.totalScore += collectible.value;

    // Feature 007: Track biggest collected object (FR-007-020, FR-007-021)
    if (collectible.value > this.biggestCollectedValue) {
        this.biggestCollectedValue = collectible.value;
        const objectData = COLLECTIBLE_DATA[collectible.type];
        this.biggestCollectedName = objectData ? objectData.name : collectible.type.toUpperCase();
    }

    // ... rest of method
}
```

### Part 3: Victory Screen Per-Level Personality

**Location**: gameRenderPost() - Victory screen (lines 805-814)

**Current Text** (generic):
```
LEVEL COMPLETE!
Final Size: 5.0x
Time Remaining: 0:32
Level Earnings: $523
Total Score: $1,234
Press any key to continue...
```

**Level 1 Text** (Broke Era - "uncommon grindset"):
```
LEVEL 1 COMPLETE
UNCOMMON GRINDSET UNLOCKED ✅

Portfolio: $523 (Bussin fr fr)
Final Size: 5.0x (Growing fr)
Biggest W: DESK
Time: 0:32 remaining

Press SPACE for next level
```

**Level 2 Text** (Mid-tier - "influencer achieved"):
```
LEVEL 2 COMPLETE
MID-TIER INFLUENCER ACHIEVED 📱

Net Worth: $5.2K (It's giving hustle)
Final Size: 15.0x (Massive W)
Biggest W: CAR
Time: 1:15 remaining

Press SPACE for oligarch status
```

**Level 3 Text** (Oligarch - "generational wealth"):
```
LEVEL 3 COMPLETE
OLIGARCH STATUS: CONFIRMED ✅

Portfolio: $500M (No cap legendary)
Final Size: 50.0x (UNGOVERNABLE)
Biggest W: SPACE ROCKET
Time: 0:45 remaining

YOU ARE NOW UNTOUCHABLE
Press SPACE to flex
```

**Implementation** (level-specific text via switch):
```javascript
// Feature 007: Victory screen with Gen Alpha personality (FR-007-001/002/003)
if (levelState === STATE.VICTORY) {
    // Semi-transparent black overlay
    drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

    const centerX = mainCanvasSize.x / 2;
    const centerY = mainCanvasSize.y / 2;
    const config = LEVEL_CONFIG[currentLevel];
    const levelNum = config.levelNumber;

    // Get biggest W stat (FR-007-022)
    const biggestW = player.biggestCollectedName || '(none)';

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
        scoreLabel = `Net Worth: $${levelScoreFormatted} (It\\'s giving hustle)`;
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
    const timeRemaining = formatTime(remainingTime);
    drawTextScreen(`Time: ${timeRemaining} remaining`, vec2(centerX, centerY - 105), 24, new Color(0.8, 0.8, 0.8));
    drawTextScreen(flavorText, vec2(centerX, centerY - 150), 24, new Color(0.7, 0.7, 0.7));
    return;
}
```

### Part 4: Game Complete Screen (Maximum Absurdity)

**Location**: gameRenderPost() - Game complete screen (lines 819-833)

**Current Text** (generic):
```
CONGRATULATIONS!
ALL LEVELS COMPLETE!
Final Size: 50.0x
Total Score: $500,234,567
```

**New Text** (maximum absurdity):
```
🎮 GAME COMPLETE 🎮
YOU WON CAPITALISM

Final Size: 50.0x (COSMIC)
Total Earnings: $500M (Generational)
Biggest W: SPACE ROCKET

UNGOVERNABLE STATUS: ACHIEVED ✅
Touch grass? Nah, touch ASSETS 💎

Sigma grindset: COMPLETED
You are now INEVITABLE
```

**Implementation**:
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
    return;
}
```

### Part 5: Defeat Screen (Minimal Irony)

**Location**: gameRenderPost() - Defeat screen (lines 846-855)

**Current Text** (generic):
```
TIME'S UP!
Size: 3.2x / 5.0x
Try again!
Level Earnings: $234
Press any key to retry...
```

**New Text** (minimal irony):
```
GRIND INTERRUPTED 💀
Size: 3.2x / 5.0x (Not enough)
Portfolio: $234 (Rare L moment)

Run it back? (Y/N jk just press SPACE)
Sigma tip: Collect bigger objects
```

**Implementation**:
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
    return;
}
```

### Part 6: HUD Level Text (Optional - Simplest Approach)

**Location**: gameRenderPost() - Level display (line 913)

**Current Text**:
```
Level 1
```

**New Text** (with subtitle):
```
Level 1 - BROKE ERA
```

**Implementation** (simple string concatenation):
```javascript
// Feature 007: Level text with personality (FR-007-010)
const levelSubtitles = ['BROKE ERA', 'MID-TIER GRIND', 'OLIGARCH MODE'];
const levelText = `Level ${config.levelNumber} - ${levelSubtitles[currentLevel]}`;

drawTextScreen(
    levelText,
    vec2(mainCanvasSize.x - 120, 90),
    28,  // Slightly smaller to fit subtitle
    new Color(1, 1, 1),
    0,
    'right',
    'monospace',
    new Color(0, 0, 0)
);
```

---

## Data Structures

### New PlayerBall Fields

```javascript
class PlayerBall extends EngineObject {
    constructor(pos) {
        // ... existing fields ...
        this.biggestCollectedValue = 0;   // Number - highest value collected this level
        this.biggestCollectedName = '';   // String - name of highest value object
    }
}
```

### Level-Specific Text Data

```javascript
// Inline in victory screen (no separate data structure needed)
const VICTORY_TEXT = {
    1: {
        title: 'LEVEL 1 COMPLETE',
        subtitle: 'UNCOMMON GRINDSET UNLOCKED ✅',
        scoreLabel: 'Portfolio',
        scoreFlavor: 'Bussin fr fr',
        sizeFlavor: 'Growing fr',
        nextPrompt: 'Press SPACE for next level'
    },
    2: { /* ... */ },
    3: { /* ... */ }
};
```

**Decision**: Inline strings simpler for jam. No separate config object needed.

---

## Testing Strategy

### Manual Test Steps

**Test 1: Victory Screen Personality (User Story 1)**
1. Complete Level 1 (reach 5.0x size before timer)
2. **Verify**: Victory screen shows "UNCOMMON GRINDSET UNLOCKED ✅"
3. **Verify**: Shows "Portfolio: $X (Bussin fr fr)"
4. **Verify**: Shows "Biggest W: [object name]"
5. **Count slang**: Should have 2-3 terms max (bussin, fr, W)
6. **Verify**: Tone is ironic/humorous, not earnest

**Test 2: Game Complete Maximum Absurdity (Clarification Q3)**
1. Complete all 3 levels
2. **Verify**: Game complete screen shows "YOU WON CAPITALISM"
3. **Verify**: Shows "UNGOVERNABLE STATUS: ACHIEVED"
4. **Verify**: Meta-commentary present ("Touch grass? Nah, touch ASSETS")
5. **Verify**: Different from Level 3 victory (unique text)

**Test 3: Defeat Screen Minimal Irony (Clarification Q2)**
1. Let timer expire without reaching goal
2. **Verify**: Shows "GRIND INTERRUPTED 💀"
3. **Verify**: Shows "Run it back?" or similar encouraging text
4. **Verify**: Tone is not discouraging (maintains motivation)

**Test 4: Biggest W Tracking (Clarification Q5)**
1. Collect PENNY ($1), then DESK ($200), then GUM ($10)
2. **Verify**: Biggest W shows "DESK" (highest value, not most recent)
3. Test across levels: Biggest W should reset per level

**Test 5: Emoji Cross-Browser (Clarification Q4)**
1. Test in Chrome, Firefox, Safari
2. **Verify**: ✅, 💀, 💎 render correctly (not boxes)
3. **If box**: Replace with ASCII fallback

### Performance Validation

- **FPS**: Should remain 60 FPS (text rendering is cheap)
- **Load Time**: No impact (no new assets)
- **Memory**: Negligible (few string variables)

---

## Dependencies & Risks

### Dependencies

**Required (Already Implemented)**:
- ✅ Feature 006: Named Collectibles (provides object names for "Biggest W")
- ✅ Feature 002: Level progression system (provides STATE machine)
- ✅ PlayerBall class (extends for tracking fields)

**LittleJS Built-ins**:
- ✅ `drawTextScreen()` - Text rendering (already in use)
- ✅ `vec2()` - Position vectors (already in use)
- ✅ `Color()` - Color objects (already in use)

### Risks & Mitigation

**Risk 1: Emoji renders as boxes (☐) on Linux/older browsers**
- **Mitigation**: Test in Chrome/Firefox/Safari first (Clarification Q4)
- **Fallback**: Replace problem emoji with ASCII (FR-007-018)
- **Priority emoji**: ✅ (checkmark), 💀 (skull), 💎 (diamond)

**Risk 2: Text doesn't fit on screen (mobile/small viewports)**
- **Mitigation**: Test on 1280×720 minimum (jam requirement)
- **Fallback**: Use smaller font sizes if needed (24pt → 20pt)
- **Constitution**: FR-023 requires 1280×720 support

**Risk 3: Slang becomes cringe/outdated**
- **Mitigation**: Use approved list only (FR-007-006)
- **Mitigation**: Max 2-3 terms per screen (FR-007-005)
- **Post-jam**: Easy to update strings if needed

**Risk 4: "Biggest W" stat not tracked correctly**
- **Mitigation**: Initialize fields in constructor
- **Mitigation**: Test with multiple collections in order
- **Edge case**: Handle empty case (`biggestCollectedName === ''`)

---

## Performance Considerations

**60 FPS Requirement**: ✅ SAFE
- Text rendering is one of cheapest operations
- No new systems, no new loops
- String concatenation happens once per frame (negligible)

**Memory**: ✅ SAFE
- Two new fields per PlayerBall: ~100 bytes
- Text strings: ~2KB total (insignificant)
- No new objects created per frame

**Bundle Size**: ✅ SAFE
- ~200 lines of code added (mostly strings)
- ~5KB minified
- Well under 1MB target

---

## Integration Points

### Point 1: PlayerBall Constructor
**File**: src/game.js, line 550
**Change**: Add 2 new fields (`biggestCollectedValue`, `biggestCollectedName`)
**Impact**: LOW - simple field addition

### Point 2: PlayerBall.collect() Method
**File**: src/game.js, line 608
**Change**: Add tracking logic (3 lines)
**Impact**: LOW - simple comparison and assignment

### Point 3: Victory Screen Rendering
**File**: src/game.js, lines 797-816
**Change**: Replace with level-specific personality text
**Impact**: MEDIUM - most text to change, but straightforward

### Point 4: Game Complete Screen Rendering
**File**: src/game.js, lines 819-833
**Change**: Replace with maximum absurdity text
**Impact**: LOW - single screen, ~10 lines

### Point 5: Defeat Screen Rendering
**File**: src/game.js, lines 836-857
**Change**: Add minimal irony text
**Impact**: LOW - simple text replacement

### Point 6: HUD Level Text
**File**: src/game.js, line 913
**Change**: Add subtitle to level display
**Impact**: VERY LOW - optional, single line change

---

## Assumptions

1. **Emoji support**: Assuming modern browsers (Chrome/Firefox/Safari latest 2 versions)
2. **Screen size**: Assuming 1280×720 minimum per Constitution FR-023
3. **Object names**: Assuming Feature 006 COLLECTIBLE_DATA is stable (names won't change)
4. **State machine**: Assuming STATE.VICTORY/DEFEAT/GAME_COMPLETE work correctly
5. **No localization**: Assuming English-only for jam (P4 for translations)

---

## Next Steps

1. ✅ Plan approved
2. ⏭️ Run `/speckit.tasks` to break into atomic tasks
3. ⏭️ Run `/speckit.implement` to execute tasks
4. ⏭️ Manual test in browser (5 test scenarios above)
5. ⏭️ Run `/speckit.analyze` to validate completion

---

**Plan Status**: ✅ **READY FOR TASKS**
**Complexity**: LOW (text replacement only)
**Risk**: LOW (no new systems)
**Impact**: HIGH (adds memorable personality)
**ROI**: EXCELLENT (1.5-2.5 hours for high shareability)

---

**Constitution Compliance**: ✅ All checks passed
**Technical Feasibility**: ✅ Straightforward implementation
**Timeline**: ✅ Well under 2-day limit (Constitution FR-038)
**Recommendation**: ✅ **PROCEED WITH IMPLEMENTATION**
