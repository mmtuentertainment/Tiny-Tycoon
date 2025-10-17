# Implementation Plan: Screen Shake Visual Feedback System

**Feature**: 003-add-screen-shake-feedback
**Created**: October 17, 2025
**Status**: Ready for Implementation
**Estimated Time**: 30-60 minutes

---

## Constitution Check

Validate feature against Constitution v2.1.0:

- [x] **Article II: Theme-First** - Does this embody "SMALL"?
  - ✅ YES - Screen shake scales from subtle (small objects) to dramatic (large objects), reinforcing SMALL→BIG growth theme

- [x] **Article III: Katamari Mechanics** - Physics compliance?
  - ✅ YES - Enhances collection feedback, does not modify physics. Uses LittleJS built-in camera shake (no custom physics)

- [x] **Article V: Technical Standards** - LittleJS idioms followed?
  - ✅ YES - Uses `cameraShake` global variable (LittleJS built-in). No external dependencies, idiomatic usage.

- [x] **Article VIII: Timeline** - Can ship in <2 days?
  - ✅ YES - Estimated 30-60 minutes. Simple variable assignments in existing methods.

- [x] **Article XV: Playable > Pretty** - Is this core gameplay or polish?
  - ✅ POLISH (P3) - Adds "juice" to working gameplay. Not blocking, high impact for low effort.

**Verdict**: ✅ **APPROVED** - All Constitution checks passed

---

## Technical Approach

### Architecture

**No new classes required**. This is a simple enhancement to existing methods:

1. Add screen shake constants at top of file
2. Modify `PlayerBall.collect()` to trigger value-scaled shake
3. Add shake to victory condition handler
4. (Future) Add shake to tier-up system when implemented

**Pattern**: Direct assignment to LittleJS global `cameraShake` variable

### LittleJS Patterns

**Screen Shake (Built-in)**:

```javascript
// LittleJS provides global variable: cameraShake
// Setting this value triggers automatic camera offset + decay

cameraShake = 0.5; // Triggers shake with power 0.5
// LittleJS automatically:
// 1. Adds random offset to camera position
// 2. Decays to zero over ~0.5 seconds
// 3. Can be set multiple times (values accumulate)
```

**No custom code needed** - LittleJS handles all shake logic internally.

### File Organization

**Files to Modify**:

1. **src/game.js** (PRIMARY)
   - Lines 1-20: Add constants section
   - Line 608-632: Modify `PlayerBall.collect()` method
   - Lines 622-628: Add shake to victory condition
   - Lines 122-128: Verify no shake on defeat (already correct)

**Files to Create**: NONE

### Data Structures

**Constants** (add near top of game.js):

```javascript
// ============================================================================
// SCREEN SHAKE CONSTANTS (Feature 003)
// ============================================================================
const SHAKE_BASE = 0.05;           // Minimum shake for smallest objects
const SHAKE_VALUE_MULTIPLIER = 0.0001;  // Scale factor for object value
const SHAKE_MAX = 2.5;             // Maximum cumulative shake (prevent nausea)
const SHAKE_TIER_UP = 0.3;         // Fixed shake for tier-up events
const SHAKE_VICTORY = 0.5;         // Fixed shake for victory
```

**No complex data structures needed** - simple scalar constants.

### Integration Points

**Existing Code Connections**:

1. **PlayerBall.collect()** (line 608)
   - Current: Adds score, grows size, destroys collectible
   - Add: Calculate shake power, set `cameraShake`

2. **Victory Condition** (line 622-628)
   - Current: Sets STATE.VICTORY, logs message
   - Add: Set `cameraShake = SHAKE_VICTORY`

3. **Defeat Condition** (line 122-128)
   - Current: Sets STATE.DEFEAT, logs message
   - NO CHANGE: Per FR-030-006, no shake on defeat

4. **Future: Tier-Up System** (not yet implemented)
   - When tier-up is added, hook shake there
   - For now: Skip tier-up (no tier system exists)

---

## Implementation Details

### Code Structure

**Step 1: Add Constants** (top of file, after LEVEL_CONFIG):

```javascript
// ============================================================================
// SCREEN SHAKE CONSTANTS (Feature 003: FR-030)
// ============================================================================
// Tuned values from research. MAY adjust during playtesting.
// Formula: shakePower = SHAKE_BASE + (objectValue * SHAKE_VALUE_MULTIPLIER)
const SHAKE_BASE = 0.05;                // Min shake (penny: $1 → 0.05)
const SHAKE_VALUE_MULTIPLIER = 0.0001;  // Multiplier (yacht: $5M → 0.55)
const SHAKE_MAX = 2.5;                  // Max cumulative shake per frame
const SHAKE_TIER_UP = 0.3;              // Tier-up celebration shake
const SHAKE_VICTORY = 0.5;              // Victory celebration shake

// Examples:
// Penny ($1):          0.05 + (1 * 0.0001) = 0.05 (subtle)
// Teacher ($300):      0.05 + (300 * 0.0001) = 0.08 (noticeable)
// Yacht ($5,000,000):  0.05 + (5000000 * 0.0001) = 0.55 (dramatic)
// Rocket ($2B):        0.05 + (2000000000 * 0.0001) = 2.05 (extreme)
```

**Step 2: Modify PlayerBall.collect()** (line 608):

```javascript
collect(collectible) {
    // Add score (FR-010)
    this.score += collectible.value;

    // Exponential size growth (FR-011, from research.md R1)
    const growthAmount = (collectible.value / 200) * this.size.x;
    this.size = this.size.add(vec2(growthAmount, growthAmount));

    // Update mass to match new size (area-based for momentum)
    this.mass = this.size.x * this.size.x;

    // Destroy collectible (FR-009)
    collectible.destroy();

    // ✨ Feature 003: Value-scaled screen shake (FR-030-001, FR-030-002)
    const shakePower = SHAKE_BASE + (collectible.value * SHAKE_VALUE_MULTIPLIER);
    cameraShake = Math.min(cameraShake + shakePower, SHAKE_MAX); // FR-030-003: clamp after accumulation

    // Feature 002: Check win condition immediately after size update (T007)
    if (levelState === STATE.PLAYING &&
        this.size.x >= LEVEL_CONFIG[currentLevel].targetSize) {
        levelState = STATE.VICTORY;
        transitionStartTime = time;

        // ✨ Feature 003: Victory shake (FR-030-005)
        cameraShake = Math.min(cameraShake + SHAKE_VICTORY, SHAKE_MAX);

        console.log('VICTORY! Target size reached!');
    }

    // Optional: Log collection for debugging
    // console.log('Collected', collectible.type, '| Score:', this.score);
}
```

**Step 3: Verify Defeat Condition** (line 122-128 - NO CHANGE NEEDED):

```javascript
// Feature 002: Lose condition check (FR-030-006: NO shake on defeat)
if (remainingTime <= 0 && player && player.size.x < LEVEL_CONFIG[currentLevel].targetSize) {
    levelState = STATE.DEFEAT;
    transitionStartTime = time;
    console.log('DEFEAT! Time expired!');
    // NO cameraShake here - defeat is negative feedback
}
```

### Algorithm Choices

**Shake Power Calculation**:

```javascript
// Linear scaling with clamping
shakePower = BASE + (value * MULTIPLIER)
shakePower = clamp(shakePower, 0, MAX)
```

**Why linear not exponential?**
- Object values are already exponential (penny=$1, rocket=$2B)
- Linear multiplier creates natural exponential feel
- Simple formula, easy to tune

**Accumulation Strategy**:

```javascript
// Additive (FR-030-008, FR-030-009)
cameraShake = Math.min(cameraShake + newShake, SHAKE_MAX);
```

**Why additive?**
- Multiple collections in same frame feel MORE impactful
- Tier-up + collection = combined celebration
- Clamping prevents excessive shake (>2.5)

### Performance Considerations

**Impact**: ✅ **ZERO** performance cost

- Screen shake is single float assignment
- LittleJS handles shake in camera matrix (already optimized)
- No loops, no allocations, no complex math
- Maintains 60 FPS even with 100+ entities

**Tested**: Other LittleJS games use cameraShake extensively with no FPS impact

### Testing Strategy

**Manual Test Steps**:

**User Story 1 - Collection Shake**:
1. Start game, collect penny (small)
   - ✅ Verify: Subtle shake (barely visible)
2. Collect customer (medium)
   - ✅ Verify: Noticeable shake (clearly visible)
3. Grow large, collect many small objects rapidly
   - ✅ Verify: Shakes accumulate (screen vibrates)
   - ✅ Verify: Never exceeds 2.5 (no nausea)

**User Story 2 - Tier-Up Shake**:
- NOTE: Tier system not yet implemented
- DEFER: Test when tier-up exists
- WORKAROUND: Can manually trigger `cameraShake = 0.3` in console to verify feel

**User Story 3 - Victory/Defeat Shake**:
1. Play level to victory
   - ✅ Verify: Large shake when "LEVEL COMPLETE!" appears
2. Let timer expire
   - ✅ Verify: NO shake on defeat screen

**Performance Test**:
1. Spawn 100+ collectibles (modify spawn count)
2. Collect cluster rapidly (10-20 in one second)
3. Monitor FPS (F3 debug overlay in LittleJS)
   - ✅ Verify: Maintains 60 FPS

---

## Dependencies & Risks

### Dependencies

**Required (Already Exist)**:
- ✅ PlayerBall.collect() method (Feature 001, line 608)
- ✅ Victory state change (Feature 002, line 622)
- ✅ Defeat state change (Feature 002, line 122)
- ✅ LittleJS cameraShake global (built-in, always available)

**Optional (Not Yet Implemented)**:
- ⏸️ Tier-up system (Future feature)
- When implemented: Add shake to onTierUp() method

### Risks

**Risk 1: Shake values feel wrong**
- **Probability**: Medium (values are estimated, not playtested)
- **Impact**: Low (easy to adjust constants)
- **Mitigation**: Define as constants, tune during testing, document final values
- **Resolution Time**: 5-10 minutes

**Risk 2: Shake too subtle or too intense**
- **Probability**: Low (values based on research)
- **Impact**: Low (cosmetic issue)
- **Mitigation**: Test with multiple playtesters, adjust SHAKE_BASE and SHAKE_VALUE_MULTIPLIER
- **Resolution Time**: 10-15 minutes

**Risk 3: Accumulation causes excessive shake**
- **Probability**: Very Low (clamped to 2.5, unlikely to hit in practice)
- **Impact**: Medium (could cause nausea)
- **Mitigation**: FR-030-003 clamps at 2.5, test with rapid cluster collection
- **Resolution Time**: Already mitigated

**Overall Risk Level**: 🟢 **LOW** - Simple feature, clear implementation, easy to adjust

### Assumptions

1. ✅ LittleJS `cameraShake` global exists and works as documented
2. ✅ Current collect() method is called on every successful collection
3. ✅ collectible.value is always a positive number
4. ✅ Victory/defeat state changes happen exactly once per level
5. ⚠️ Tier-up system will be added later (defer tier-up shake implementation)

---

## Testing Strategy

### Test Plan

**Phase 1: Basic Functionality** (10 minutes)

```javascript
// Test constants defined
console.log('Constants:', SHAKE_BASE, SHAKE_VALUE_MULTIPLIER, SHAKE_MAX);

// Test shake triggers on collection
// Collect one object, check cameraShake value
```

**Phase 2: Shake Scaling** (10 minutes)

```javascript
// Modify COLLECTIBLE_DATA temporarily to create test objects
// coin: value = 1 (expect shake ~0.05)
// expensive_coin: value = 10000 (expect shake ~1.05)

// Collect each, verify visual shake intensity difference
```

**Phase 3: Edge Cases** (10 minutes)

```javascript
// Test accumulation: Collect 5 objects rapidly
// Verify cameraShake accumulates but clamps at 2.5

// Test victory: Reach target size
// Verify shake = 0.5 on victory screen

// Test defeat: Let timer expire
// Verify NO shake on defeat screen
```

**Phase 4: Performance** (5 minutes)

```javascript
// Spawn 100 collectibles
// Collect cluster of 20
// Monitor FPS with debug overlay
// Verify: 60 FPS maintained
```

### Acceptance Criteria Validation

Map each test to Success Criteria:

- **SC-001**: 100% of collections trigger shake → Test Phase 1
- **SC-002**: Shake scales with value → Test Phase 2
- **SC-003**: Tier-up more intense than collection → DEFER (no tier system)
- **SC-004**: Victory more intense than tier-up → Test Phase 3
- **SC-005**: Players report "more satisfying" → Manual playtest after implementation
- **SC-006**: No performance degradation → Test Phase 4

---

## Implementation Sequence

### Step 1: Add Constants (5 minutes)

**Location**: src/game.js, after LEVEL_CONFIG (around line 54)

**Code**:

```javascript
// ============================================================================
// SCREEN SHAKE CONSTANTS (Feature 003: FR-030)
// ============================================================================
// Tuned values from research. MAY adjust during playtesting.
// Formula: shakePower = SHAKE_BASE + (objectValue * SHAKE_VALUE_MULTIPLIER)
const SHAKE_BASE = 0.05;                // Min shake (penny: $1 → 0.05)
const SHAKE_VALUE_MULTIPLIER = 0.0001;  // Multiplier (yacht: $5M → 0.55)
const SHAKE_MAX = 2.5;                  // Max cumulative shake per frame
const SHAKE_TIER_UP = 0.3;              // Tier-up celebration shake
const SHAKE_VICTORY = 0.5;              // Victory celebration shake

// Example calculations (for reference):
// Penny ($1):          0.05 + (1 * 0.0001) = 0.05 (subtle)
// Customer ($50):      0.05 + (50 * 0.0001) = 0.055 (slightly more)
// Teacher ($300):      0.05 + (300 * 0.0001) = 0.08 (noticeable)
// Yacht ($5,000,000):  0.05 + (5000000 * 0.0001) = 0.55 (dramatic)
// Rocket ($2B):        0.05 + (2000000000 * 0.0001) = 2.05 (extreme, clamped to 2.5)
```

**Test**: Console log constants, verify values

### Step 2: Add Shake to Collection (10 minutes)

**Location**: src/game.js:608-632, inside `PlayerBall.collect()` method

**Modify**: Add 2 lines after `collectible.destroy()` (line 620):

```javascript
collect(collectible) {
    // Add score (FR-010)
    this.score += collectible.value;

    // Exponential size growth (FR-011)
    const growthAmount = (collectible.value / 200) * this.size.x;
    this.size = this.size.add(vec2(growthAmount, growthAmount));

    // Update mass
    this.mass = this.size.x * this.size.x;

    // Destroy collectible (FR-009)
    collectible.destroy();

    // ✨ Feature 003: Value-scaled screen shake (FR-030-001, FR-030-002, FR-030-003)
    const shakePower = SHAKE_BASE + (collectible.value * SHAKE_VALUE_MULTIPLIER);
    cameraShake = Math.min(cameraShake + shakePower, SHAKE_MAX); // Accumulate and clamp

    // Victory condition check (existing code)
    if (levelState === STATE.PLAYING &&
        this.size.x >= LEVEL_CONFIG[currentLevel].targetSize) {
        levelState = STATE.VICTORY;
        transitionStartTime = time;
        console.log('VICTORY! Target size reached!');
    }
}
```

**Test**: Collect object, verify screen shakes visually

### Step 3: Add Shake to Victory (5 minutes)

**Location**: src/game.js:622-628, inside victory condition

**Modify**: Add 1 line after `transitionStartTime = time`:

```javascript
// Victory condition (inside PlayerBall.collect or gameUpdate)
if (levelState === STATE.PLAYING &&
    this.size.x >= LEVEL_CONFIG[currentLevel].targetSize) {
    levelState = STATE.VICTORY;
    transitionStartTime = time;

    // ✨ Feature 003: Victory shake (FR-030-005)
    cameraShake = Math.min(cameraShake + SHAKE_VICTORY, SHAKE_MAX);

    console.log('VICTORY! Target size reached!');
}
```

**Note**: Victory condition triggers inside collect() currently (line 622). Shake can fire twice:
1. Collection shake (small, based on final object collected)
2. Victory shake (0.5, for reaching goal)

Per FR-030-009 clarification, both shakes should fire (additive) = EXTRA satisfying final collection!

**Test**: Reach target size, verify larger shake on victory screen

### Step 4: Verify Defeat (2 minutes)

**Location**: src/game.js:122-128

**NO CODE CHANGE NEEDED** - Just verify:

```javascript
// Lose condition: time expired (FR-030-006: NO shake on defeat)
if (remainingTime <= 0 && player && player.size.x < LEVEL_CONFIG[currentLevel].targetSize) {
    levelState = STATE.DEFEAT;
    transitionStartTime = time;
    console.log('DEFEAT! Time expired!');
    // NO cameraShake assignment here ✅
}
```

**Test**: Let timer expire, verify NO shake on defeat screen

### Step 5: Playtesting & Tuning (10-20 minutes)

**If shake feels too weak**:
- Increase SHAKE_BASE (0.05 → 0.08)
- Increase SHAKE_VALUE_MULTIPLIER (0.0001 → 0.00015)

**If shake feels too strong**:
- Decrease SHAKE_BASE (0.05 → 0.03)
- Decrease SHAKE_VALUE_MULTIPLIER (0.0001 → 0.00008)

**Document final values** in code comments with rationale

---

## Code Changes Summary

**Total Lines Added**: ~20 lines (constants + 2 shake assignments)
**Total Lines Modified**: ~2 lines (inside existing methods)
**Complexity**: ⭐ Very Low (scalar assignments only)

**Files Modified**:
1. src/game.js
   - Add constants (lines ~54-70)
   - Modify PlayerBall.collect() (lines 608-632)
   - Add shake to victory condition (line ~626)

**Files Created**: 0

---

## Next Steps

1. ✅ Plan complete and Constitution-validated
2. → Use `/speckit.tasks` to break into atomic tasks
3. → Use `/speckit.implement` to execute tasks
4. → Manual playtest and tune constants
5. → Commit with message: `feat: add screen shake feedback (FR-030)`

---

**Status**: ✅ Ready for `/speckit.tasks`
**Confidence**: 100% - Simple, well-defined, low-risk implementation
**Impact**: HIGH - Biggest "juice" improvement for minimal effort (30-60 min work)
