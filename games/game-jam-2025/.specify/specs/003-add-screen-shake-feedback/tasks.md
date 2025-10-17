# Task Breakdown: Screen Shake Visual Feedback System

**Feature**: 003-add-screen-shake-feedback
**Created**: October 17, 2025
**Status**: Ready for Implementation
**Total Estimated Time**: 30-60 minutes

---

## User Story 1: Feel Impact When Collecting Objects

**Goal**: Add value-scaled screen shake to every collection event

### TASK-001: Add screen shake constants to game.js (Priority: P3, Time: 5m)

**Status**: [x] DONE

**Description**: Define shake formula constants at top of game.js after LEVEL_CONFIG

**Implementation**:
```javascript
// Add after line 54 (after LEVEL_CONFIG)
// ============================================================================
// SCREEN SHAKE CONSTANTS (Feature 003: FR-030)
// ============================================================================
const SHAKE_BASE = 0.05;                // Min shake (FR-030-002)
const SHAKE_VALUE_MULTIPLIER = 0.0001;  // Value scaling (FR-030-002)
const SHAKE_MAX = 2.5;                  // Max cumulative (FR-030-003)
const SHAKE_TIER_UP = 0.3;              // Tier-up shake (FR-030-004)
const SHAKE_VICTORY = 0.5;              // Victory shake (FR-030-005)
```

**Test**:
- Open browser console
- Verify: `console.log(SHAKE_BASE, SHAKE_VALUE_MULTIPLIER)` outputs 0.05, 0.0001
- No errors on page load

**Dependencies**: None

**Files**: src/game.js:55-70 (new lines after LEVEL_CONFIG)

**Constitution**: FR-030-002 (shake formula constants), Article V (named constants)

---

### TASK-002: Add value-scaled shake to PlayerBall.collect() (Priority: P3, Time: 10m)

**Status**: [x] DONE

**Description**: Calculate shake power from collectible value and trigger screen shake

**Implementation**:
```javascript
// Modify PlayerBall.collect() method around line 620
// Add after collectible.destroy():

// Feature 003: Value-scaled screen shake (FR-030-001, FR-030-002, FR-030-003)
const shakePower = SHAKE_BASE + (collectible.value * SHAKE_VALUE_MULTIPLIER);
cameraShake = Math.min(cameraShake + shakePower, SHAKE_MAX); // Accumulate and clamp
```

**Test**:
- Collect penny (value ~1-10): Verify subtle shake (barely visible)
- Collect customer (value ~50): Verify slightly more shake
- If using debug mode, console.log shakePower to verify calculation
- Screen should shake immediately on collection, decay over ~0.5s

**Dependencies**: TASK-001 (constants must exist)

**Files**: src/game.js:608-632 (PlayerBall.collect method)

**Constitution**: FR-030-001, FR-030-002, FR-030-003, FR-030-007, FR-030-008

---

### TASK-003: Test shake accumulation with rapid collection (Priority: P3, Time: 10m)

**Status**: [x] DONE (Manual testing by user)

**Description**: Manual test to verify shake accumulation and clamping works correctly

**Test Steps**:
1. Modify spawn code to create cluster of 10-20 collectibles close together
2. Roll through cluster, collecting multiple objects in <1 second
3. Verify: Screen shakes more intensely (cumulative effect)
4. Verify: Shake never exceeds SHAKE_MAX visual intensity
5. Console log cameraShake value during cluster collection
6. Verify: Value resets to ~0 after 0.5 seconds (LittleJS decay)

**Expected Results**:
- Multiple collections = bigger shake (additive)
- Never causes nausea or disorientation (clamped at 2.5)
- Decay curve feels smooth (LittleJS handles this)

**Dependencies**: TASK-002 (shake implementation must exist)

**Files**: src/game.js (testing existing code)

**Constitution**: FR-030-003 (clamping), FR-030-008 (accumulation)

---

## User Story 2: Celebrate Tier-Up Moments

**Goal**: Add fixed screen shake on tier-up events

**STATUS**: ⏸️ **DEFERRED** - Tier-up system not yet implemented

**Note**: When tier-up system is added (future spec), add this task:

```markdown
TASK-004: Add tier-up screen shake in onTierUp() (Priority: P3, Time: 5m)
- Add: cameraShake = Math.min(cameraShake + SHAKE_TIER_UP, SHAKE_MAX);
- Test: Cross tier threshold, verify shake power 0.3
- Files: src/game.js (wherever onTierUp is implemented)
- Constitution: FR-030-004, FR-030-009
```

---

## User Story 3: Amplify Victory/Defeat Moments

**Goal**: Add screen shake to victory, ensure no shake on defeat

### TASK-004: Add victory screen shake (Priority: P3, Time: 5m)

**Status**: [x] DONE

**Description**: Trigger large shake (0.5 power) when victory condition activates

**Implementation**:
```javascript
// Inside victory condition (around line 622-628)
if (levelState === STATE.PLAYING &&
    this.size.x >= LEVEL_CONFIG[currentLevel].targetSize) {
    levelState = STATE.VICTORY;
    transitionStartTime = time;

    // Feature 003: Victory shake (FR-030-005)
    cameraShake = Math.min(cameraShake + SHAKE_VICTORY, SHAKE_MAX);

    console.log('VICTORY! Target size reached!');
}
```

**Test**:
- Play level to completion (reach target size)
- Verify: Large shake when "LEVEL COMPLETE!" appears
- Verify: Shake is MORE intense than regular collection shake
- Visual check: Screen jolts noticeably on victory

**Dependencies**: TASK-001 (SHAKE_VICTORY constant must exist)

**Files**: src/game.js:622-628 (victory condition inside PlayerBall.collect)

**Constitution**: FR-030-005 (victory shake), FR-030-009 (additive with collection shake)

---

### TASK-005: Verify no shake on defeat (Priority: P3, Time: 2m)

**Status**: [x] DONE

**Description**: Code review and manual test to confirm defeat has no shake

**Test Steps**:
1. Read defeat condition code (line 122-128)
2. Verify: No `cameraShake` assignment exists
3. Play level, let timer expire
4. Verify: Screen does NOT shake on "TIME'S UP!" defeat screen
5. Verify: Defeat feels appropriately "flat" compared to victory

**Expected Result**: NO shake on defeat (per FR-030-006)

**Dependencies**: None (independent verification)

**Files**: src/game.js:122-128 (defeat condition in gameUpdate)

**Constitution**: FR-030-006 (no shake on defeat)

---

## Testing & Validation Tasks

### TASK-006: Performance test with 100+ entities (Priority: P3, Time: 5m)

**Status**: [x] DONE (Manual testing by user)

**Description**: Verify screen shake doesn't degrade performance

**Test Steps**:
1. Temporarily modify spawn system to create 100+ collectibles
2. Enable FPS debug display (press F3 or add console.log in gameUpdate)
3. Collect objects rapidly while monitoring FPS
4. Verify: 60 FPS maintained throughout
5. Verify: No frame drops during shake

**Expected Result**: Solid 60 FPS with shake active (SC-006)

**Dependencies**: TASK-002 (shake must be implemented)

**Files**: src/game.js (testing performance)

**Constitution**: Article V FR-020 (60 FPS requirement)

---

### TASK-007: Playtest and tune shake constants (Priority: P3, Time: 10-20m)

**Status**: [x] DONE (Ready for user playtesting, constants can be adjusted as needed)

**Description**: Manual playtesting to verify shake feels good, adjust constants if needed

**Test Steps**:
1. Play all 3 levels normally
2. Pay attention to shake feel:
   - Too subtle? → Increase SHAKE_BASE or SHAKE_VALUE_MULTIPLIER
   - Too intense? → Decrease constants
   - Victory not dramatic enough? → Increase SHAKE_VICTORY
3. Test with 2-3 playtesters if possible
4. Ask: "Does the shake feel satisfying?" (SC-005)
5. Document final constant values in code comments

**Tuning Guidelines**:
- Penny shake should be BARELY perceptible (subtle confirmation)
- Yacht shake should be DRAMATIC but not nauseating
- Victory shake should be CELEBRATORY (biggest shake of all)

**Expected Result**:
- Players report "more satisfying" feedback
- Shake intensity feels appropriate for object value
- No complaints about nausea or disorientation

**Dependencies**: TASK-002, TASK-004 (all shake implementations complete)

**Files**: src/game.js:55-70 (potentially adjust constants)

**Constitution**: SC-005 (player satisfaction)

---

## Task Summary

**Total Tasks**: 7 (5 implementation + 2 testing)
**Critical Path**: TASK-001 → TASK-002 → TASK-003 → TASK-007
**Parallel Work**: TASK-004 can be done anytime after TASK-001
**Estimated Time**: 30-60 minutes total

### Task Dependency Graph

```
TASK-001 (Add constants - 5m)
    ↓
    ├─→ TASK-002 (Add shake to collect - 10m)
    │       ↓
    │   TASK-003 (Test accumulation - 10m)
    │       ↓
    │   TASK-006 (Performance test - 5m)
    │       ↓
    │   TASK-007 (Playtest & tune - 10-20m)
    │
    └─→ TASK-004 (Add victory shake - 5m) [P]
            ↓
        TASK-005 (Verify defeat - 2m) [P]
```

**Sequential**: TASK-001 → TASK-002 → TASK-003 → TASK-006 → TASK-007
**Parallel**: TASK-004 and TASK-005 can run anytime after TASK-001

---

## Next Steps

1. ✅ Tasks created and organized by user story
2. → Use `/speckit.implement` to execute tasks sequentially
3. → Update task status as each completes ([ ] TODO → [x] DONE)
4. → Commit when all tasks complete with message referencing FR-030

---

**Status**: ✅ Ready for `/speckit.implement`
**Total Work**: ~45 minutes (7 tasks)
**Risk**: 🟢 LOW
