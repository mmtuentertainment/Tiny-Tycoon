# Task Breakdown: Named Collectibles with Personality

**Feature**: 006-add-named-collectibles | **Branch**: `006-add-named-collectibles`
**Created**: October 17, 2025 | **Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)
**Priority**: P3 (Polish) | **Estimated Total Time**: 2-3 hours

## Task Organization Strategy

Tasks organized by **User Story** to maintain feature independence and testability. Each task is:
- **Atomic**: <1 hour (most 15-30 minutes)
- **Testable**: Clear verification steps
- **Dependency-tracked**: Pre-requisites marked
- **Parallelizable**: Independent tasks marked [P]

---

## User Story 1: Collect Recognizable Named Objects

**Goal**: Display specific object names (PENNY, TEACHER, YACHT) in collection popups

### Phase 1: Data Structure Foundation

**TASK-001**: Add utility functions (formatCurrency, truncateName)
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 20 minutes
- **Dependencies**: None
- **Files**: `src/game.js` (~line 260, before PopupTextManager class)
- **Description**: Implement formatCurrency() (~20 lines) and truncateName() (~15 lines) utilities per plan Phase 3
- **Code**:
  ```javascript
  // Add after line ~260 (before PopupTextManager)
  function formatCurrency(value) { /* K/M/B notation logic */ }
  function truncateName(name, maxChars = 20) { /* word-boundary truncation */ }
  ```
- **Test**:
  1. Open browser console
  2. Run `formatCurrency(1)` → expect "$1"
  3. Run `formatCurrency(1500)` → expect "$1.5K"
  4. Run `formatCurrency(5000000)` → expect "$5M"
  5. Run `formatCurrency(2000000000)` → expect "$2B"
  6. Run `truncateName("PENNY")` → expect "PENNY"
  7. Run `truncateName("ULTRA LUXURY MEGA YACHT")` → expect "ULTRA LUXURY..."

---

**TASK-002**: Implement PopupTextManager class
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 45 minutes
- **Dependencies**: TASK-001 (uses formatCurrency, truncateName)
- **Files**: `src/game.js` (~line 280, after utility functions)
- **Description**: Create PopupTextManager class (~150 lines) per plan Phase 3 with:
  - showCollection(name, value, pos) method
  - update() method (per-frame lifecycle)
  - render() method (drawTextScreen calls)
  - getPopupColor(value) method
  - formatPopupText(name, value, count) method
- **Code**: Copy from plan.md lines 105-264 (PopupTextManager class)
- **Test**:
  1. Add temporary test code in gameInit():
     ```javascript
     const testManager = new PopupTextManager();
     testManager.showCollection("PENNY", 1, vec2(0,0));
     ```
  2. Verify no errors in console
  3. Check testManager.activePopups.length === 1
  4. Remove test code

---

**TASK-003**: Integrate PopupTextManager into game lifecycle
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 15 minutes
- **Dependencies**: TASK-002
- **Files**: `src/game.js` (lines ~268, ~280, ~329, ~583)
- **Description**: Wire PopupTextManager into game:
  1. Add global `let popupManager;` (~line 268)
  2. Initialize `popupManager = new PopupTextManager();` in gameInit() (~line 280)
  3. Call `popupManager.update();` in gameUpdate() (~line 329)
  4. Call `popupManager.render();` in gameRenderPost() (~line 583)
- **Test**:
  1. Start game
  2. Verify no console errors
  3. Check popupManager exists in console: `popupManager`
  4. Manually trigger: `popupManager.showCollection("TEST", 100, vec2(0,0))`
  5. Verify popup appears on screen for 1 second

---

**TASK-004**: Trigger popup on collection in PlayerBall.collect()
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 10 minutes
- **Dependencies**: TASK-003
- **Files**: `src/game.js` (~line 1005, in PlayerBall.collect method)
- **Description**: Add popup trigger after particle spawn in collect() method:
  ```javascript
  // Feature 006: Show collection popup (FR-006-005)
  if (popupManager) {
      popupManager.showCollection(
          COLLECTIBLE_DATA[collectible.type].name,
          collectible.value,
          collectible.pos
      );
  }
  ```
- **Test**:
  1. Start game
  2. Collect any object (coin/customer currently)
  3. **WILL FAIL**: Error "cannot read 'name' of undefined" (EXPECTED - TASK-005 adds names)
  4. Verify popup trigger code exists (visual inspection)

---

### Phase 2: Named Object Data

**TASK-005**: Expand COLLECTIBLE_DATA with 27 named objects
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 30 minutes
- **Dependencies**: None [P] (parallel with TASK-001/002)
- **Files**: `src/game.js` (~line 305, gameInit function)
- **Description**: Replace COLLECTIBLE_DATA initialization (currently 2 objects: coin/customer) with 27 objects per plan Phase 1 (lines 199-421):
  - 10 tier-1 (schoolyard): penny, gum, crayon, homework, backpack, basketball, desk, teacher, bookshelf, swingset
  - 10 tier-2 (urban): coffee, laptop, chair, bicycle, scooter, businessman, sofa, car, foodtruck, house
  - 7 tier-3 (luxury): yacht, limo, mansion, helicopter, jet, skyscraper, rocket
- **Each object needs**: name, value, tier, size (logarithmic), color, spawnWeight
- **Test**:
  1. Open browser console
  2. Run `Object.keys(COLLECTIBLE_DATA).length` → expect 27
  3. Run `COLLECTIBLE_DATA.penny.name` → expect "PENNY"
  4. Run `COLLECTIBLE_DATA.teacher.name` → expect "TEACHER"
  5. Run `COLLECTIBLE_DATA.rocket.name` → expect "SPACE ROCKET"
  6. Verify all objects have: name, value, tier, size, color, spawnWeight

---

**TASK-006**: Test User Story 1 - Named Object Popups
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 10 minutes
- **Dependencies**: TASK-004, TASK-005
- **Files**: None (manual gameplay test)
- **Description**: Verify popup system shows specific names per spec.md acceptance scenarios
- **Test** (US1 Acceptance Scenarios):
  1. Start Level 1
  2. Collect penny → **expect** popup "PENNY! +$1"
  3. Collect teacher → **expect** popup "TEACHER! +$300"
  4. Collect desk → **expect** popup "DESK! +$200"
  5. **SUCCESS**: All popups show specific names, not "coin"/"customer"

---

## User Story 2: Experience Absurdist Escalation

**Goal**: Objects escalate from mundane (penny) to absurd (rocket) across levels

### Phase 3: Weighted Spawning System

**TASK-007**: Add TIER_WEIGHTS constant
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 5 minutes
- **Dependencies**: None [P]
- **Files**: `src/game.js` (~line 62, after STATE constant)
- **Description**: Add tier probability weights per plan Phase 2:
  ```javascript
  const TIER_WEIGHTS = [
      { tier1: 0.70, tier2: 0.25, tier3: 0.05 },  // Level 1
      { tier1: 0.20, tier2: 0.60, tier3: 0.20 },  // Level 2
      { tier1: 0.10, tier2: 0.30, tier3: 0.60 }   // Level 3
  ];
  ```
- **Test**:
  1. Open browser console
  2. Run `TIER_WEIGHTS[0].tier1` → expect 0.70
  3. Run `TIER_WEIGHTS[2].tier3` → expect 0.60

---

**TASK-008**: Implement selectRandomCollectible() function
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 20 minutes
- **Dependencies**: TASK-005 (needs COLLECTIBLE_DATA with tier field), TASK-007
- **Files**: `src/game.js` (~line 765, before spawnCollectiblesForLevel)
- **Description**: Implement weighted spawning algorithm per plan Phase 2 (lines 475-517):
  - selectRandomCollectible(levelIndex) - main function
  - selectFromTier(tier) - helper function
- **Code**: Copy from plan.md lines 475-517
- **Test**:
  1. Open browser console
  2. Run 20 times: `selectRandomCollectible(0)` (Level 1)
  3. Manually count tier-1 vs tier-2 vs tier-3 objects
  4. **expect** ~14 tier-1, ~5 tier-2, ~1 tier-3 (70/25/5 distribution)
  5. Run 20 times: `selectRandomCollectible(2)` (Level 3)
  6. **expect** ~2 tier-1, ~6 tier-2, ~12 tier-3 (10/30/60 distribution)

---

**TASK-009**: Modify spawnCollectiblesForLevel() to use weighted spawning
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 15 minutes
- **Dependencies**: TASK-008
- **Files**: `src/game.js` (~line 817, in spawnCollectiblesForLevel function)
- **Description**: Replace hardcoded coin/customer spawning with weighted selection:
  ```javascript
  // OLD (line ~817):
  // const type = Math.random() < 0.6 ? 'coin' : 'customer';

  // NEW:
  const type = selectRandomCollectible(currentLevel);
  const objectData = COLLECTIBLE_DATA[type];

  // OLD (lines ~818-820): Random size from sizeRange
  // const sizeRange = COLLECTIBLE_DATA[type].sizeRange;
  // const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);

  // NEW: Use fixed size from data
  const size = objectData.size;
  ```
- **Test**:
  1. Start Level 1
  2. Observe spawned objects for 30 seconds
  3. **expect** mostly schoolyard objects (penny, gum, desk, teacher)
  4. **expect** occasional urban objects (coffee, car) - ~25%
  5. **expect** rare luxury objects (yacht) - ~5%

---

**TASK-010**: Update Collectible constructor with name and tier fields
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 10 minutes
- **Dependencies**: TASK-005 (needs COLLECTIBLE_DATA.name/tier)
- **Files**: `src/game.js` (~line 870, Collectible class constructor)
- **Description**: Add name and tier fields to Collectible constructor:
  ```javascript
  class Collectible extends EngineObject {
      constructor(pos, type, size) {
          super(pos, vec2(size, size));
          this.type = type;
          this.name = COLLECTIBLE_DATA[type].name;      // NEW
          this.value = COLLECTIBLE_DATA[type].value;
          this.color = COLLECTIBLE_DATA[type].color;
          this.tier = COLLECTIBLE_DATA[type].tier;      // NEW
          // ... rest unchanged
      }
  }
  ```
- **Test**:
  1. Start game
  2. Open browser console
  3. Find any collectible: `const c = engineObjects.find(o => o instanceof Collectible)`
  4. Run `c.name` → expect object name (e.g., "PENNY")
  5. Run `c.tier` → expect 1, 2, or 3

---

**TASK-011**: Test User Story 2 - Absurdist Escalation
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 15 minutes
- **Dependencies**: TASK-009, TASK-010
- **Files**: None (manual gameplay test)
- **Description**: Verify object escalation across levels per spec.md acceptance scenarios
- **Test** (US2 Acceptance Scenarios):
  1. Play Level 1 for 30 seconds
  2. **expect** mostly schoolyard objects (penny, gum, teacher, desk)
  3. Win Level 1, progress to Level 2
  4. **expect** mostly urban objects (coffee, car, house, businessman)
  5. **expect** occasional schoolyard objects still spawn (~20%)
  6. Win Level 2, progress to Level 3
  7. **expect** mostly luxury objects (yacht, jet, rocket, mansion)
  8. **expect** some urban/schoolyard objects still spawn (~40% combined)
  9. **SUCCESS**: Clear escalation mundane→impressive→absurd

---

## User Story 3: Expand Object Variety

**Goal**: 15-20 distinct object types (not just 2)

**TASK-012**: Test User Story 3 - Object Variety
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 10 minutes
- **Dependencies**: TASK-005 (needs 27 objects), TASK-009 (needs spawning)
- **Files**: None (manual gameplay test)
- **Description**: Verify sufficient object variety per spec.md acceptance scenarios
- **Test** (US3 Acceptance Scenarios):
  1. Open browser console
  2. Run `Object.keys(COLLECTIBLE_DATA).length` → **expect** 27 (exceeds 15 minimum)
  3. Play Level 1 for 60 seconds, count distinct types collected
  4. **expect** at least 8 different types (not just penny/gum repeating)
  5. Play all 3 levels to completion
  6. **expect** encounter at least 15 unique types across all levels
  7. **SUCCESS**: Rich variety, not monotonous

---

## Research Clarifications: Advanced Features

**Goal**: Verify research-backed design decisions work as specified

### Clarification Q2: Popup Aggregation

**TASK-013**: Test popup aggregation (300ms window)
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 10 minutes
- **Dependencies**: TASK-006 (basic popups working)
- **Files**: None (manual gameplay test)
- **Description**: Verify aggregation per spec Clarification Q2
- **Test** (Q2 Acceptance):
  1. Find area with multiple pennies close together
  2. Collect 3 pennies rapidly (<300ms between each)
  3. **expect** single popup: "PENNY x3! +$3" (not 3 separate popups)
  4. Collect 10 objects rapidly
  5. **expect** max 5 popups visible at once
  6. **expect** oldest popups removed when >5 active
  7. **SUCCESS**: Aggregation prevents spam

---

**TASK-014**: Test popup animation (1.0s float + fade)
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 5 minutes
- **Dependencies**: TASK-006 (basic popups working)
- **Files**: None (manual gameplay test)
- **Description**: Verify popup animation per FR-006-012
- **Test**:
  1. Collect single object
  2. Observe popup for full duration
  3. **expect** popup floats upward ~40 pixels over 1 second
  4. **expect** popup starts fading at ~0.7 seconds (last 30%)
  5. **expect** popup fully disappears at 1.0 second
  6. **SUCCESS**: Smooth animation, readable

---

### Clarification Q4: Number Formatting

**TASK-015**: Test currency formatting (K/M/B notation)
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 10 minutes
- **Dependencies**: TASK-006 (popups with values)
- **Files**: None (manual gameplay test)
- **Description**: Verify K/M/B notation per spec Clarification Q4
- **Test** (Q4 Acceptance):
  1. Collect penny → **expect** popup "$1" (exact, not "$0.001K")
  2. Collect teacher → **expect** popup "$300" (exact, under 1K)
  3. Collect car → **expect** popup "$5K" (K notation)
  4. Collect house → **expect** popup "$20K" (K notation)
  5. Collect yacht → **expect** popup "$500K" (K notation, could be "$0.5M")
  6. Collect rocket → **expect** popup "$2B" (B notation)
  7. **SUCCESS**: All values formatted per standard

---

### Clarification Q1: Weighted Spawning Distribution

**TASK-016**: Test weighted spawning distribution
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 15 minutes
- **Dependencies**: TASK-009 (weighted spawning implemented)
- **Files**: None (manual gameplay test)
- **Description**: Verify tier distribution per spec Clarification Q1
- **Test** (Q1 Acceptance):
  1. Start Level 1, collect 20 objects
  2. Count tier-1 vs tier-2 vs tier-3 objects
  3. **expect** ~14 tier-1 (70%), ~5 tier-2 (25%), ~1 tier-3 (5%)
  4. Restart, start Level 3, collect 20 objects
  5. **expect** ~2 tier-1 (10%), ~6 tier-2 (30%), ~12 tier-3 (60%)
  6. **SUCCESS**: Distribution matches TIER_WEIGHTS

---

### Clarification Q5: Name Truncation (Defensive)

**TASK-017**: Test name truncation (defensive)
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 10 minutes
- **Dependencies**: TASK-001 (truncateName function)
- **Files**: `src/game.js` (temporary test object)
- **Description**: Verify truncation logic per spec Clarification Q5 (defensive test)
- **Test** (Q5 Acceptance):
  1. Temporarily add test object to COLLECTIBLE_DATA:
     ```javascript
     testLongName: {
         name: 'ULTRA LUXURY MEGA YACHT',
         value: 1000000,
         tier: 3,
         size: 320,
         color: new Color(1, 1, 1),
         spawnWeight: 0.1
     }
     ```
  2. Modify spawnCollectiblesForLevel() to spawn testLongName
  3. Collect it
  4. **expect** popup shows "ULTRA LUXURY..." (word boundary, not "ULTRA LUXURY MEG...")
  5. Remove test object
  6. Verify all actual object names <20 chars (no truncation triggers in real game)
  7. **SUCCESS**: Truncation works, but unused in production

---

## Integration & Polish

**Goal**: Final integration testing and performance verification

**TASK-018**: Full integration test (all 3 user stories)
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 20 minutes
- **Dependencies**: TASK-006, TASK-011, TASK-012 (all user stories)
- **Files**: None (comprehensive gameplay test)
- **Description**: Play through all 3 levels and verify all features work together
- **Test**:
  1. Start fresh game (Level 1)
  2. Play for 60 seconds
  3. Verify named popups appear (US1)
  4. Verify mostly schoolyard objects spawn (US2)
  5. Verify 8+ distinct types collected (US3)
  6. Win Level 1, progress to Level 2
  7. Verify urban objects dominate, some schoolyard remain (US2)
  8. Win Level 2, progress to Level 3
  9. Verify luxury objects dominate, some lower tiers remain (US2)
  10. Win Level 3
  11. **SUCCESS**: All features work seamlessly together

---

**TASK-019**: Performance verification (60 FPS maintained)
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 10 minutes
- **Dependencies**: TASK-018 (full integration)
- **Files**: None (performance test)
- **Description**: Verify 60 FPS maintained per plan performance considerations
- **Test**:
  1. Open browser console
  2. Run `engineObjects.length` → note entity count
  3. Collect 10 objects rapidly (spawn 5 popups)
  4. Check FPS counter (press F2 in LittleJS)
  5. **expect** 60 FPS maintained (no drops below 55)
  6. Check console for errors
  7. **expect** no errors, no warnings
  8. **SUCCESS**: Performance within target

---

**TASK-020**: Visual polish (colors, readability)
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 15 minutes
- **Dependencies**: TASK-018 (full integration)
- **Files**: `src/game.js` (PopupTextManager.getPopupColor, COLLECTIBLE_DATA colors)
- **Description**: Verify visual polish per plan Phase 5 polish tasks
- **Test**:
  1. Verify all 27 object colors are distinct and recognizable
  2. Collect low-value object → popup white (common)
  3. Collect medium-value object ($100-$10K) → popup yellow
  4. Collect high-value object (>$10K) → popup orange
  5. Test on dark background (sky) and light background (ground)
  6. **expect** popup text readable in all cases
  7. Verify popup doesn't overlap with HUD
  8. **expect** baseYOffset (100px) keeps popups visible
  9. **SUCCESS**: Visually polished and readable

---

**TASK-021**: Edge case testing
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 10 minutes
- **Dependencies**: TASK-018 (full integration)
- **Files**: None (edge case test)
- **Description**: Test edge cases from plan.md "Edge Cases Handled" section
- **Test**:
  1. Collect object when popupManager is null → **expect** no crash (guard checks)
  2. Collect 20 objects in 1 second → **expect** aggregation + max 5 limit prevents spam
  3. Verify no value overflow errors (rocket $2B) → **expect** "$2B" formatted correctly
  4. Check console for any runtime errors → **expect** none
  5. **SUCCESS**: All edge cases handled gracefully

---

**TASK-022**: Constitution compliance verification
- **Status**: [ ] TODO
- **Priority**: P3
- **Time**: 10 minutes
- **Dependencies**: TASK-018 (full integration)
- **Files**: None (Constitution check)
- **Description**: Verify Constitution compliance per plan Constitution Check section
- **Test**:
  1. ✅ Article II (Theme) - Named objects make "SMALL" explicit → collect penny vs rocket
  2. ✅ Article III (Mechanics) - No physics changes → verify existing collection still works
  3. ✅ Article V (Technical) - Single file, ES6+, LittleJS idioms → code review
  4. ✅ Article VIII (Timeline) - 2-3 hours total → check actual time spent
  5. ✅ Article IX (It Factor) - Fixes "soul" problem → collect teacher, verify humor
  6. **SUCCESS**: All Constitution requirements met

---

## Task Summary

**Total Tasks**: 22
**Estimated Time**: 2 hours 45 minutes (within 2-3 hour estimate)

### Critical Path (Must Complete in Order):
1. TASK-001 (utilities) → TASK-002 (PopupTextManager) → TASK-003 (integration) → TASK-004 (trigger)
2. TASK-005 (data) → TASK-006 (test US1)
3. TASK-007 (weights) → TASK-008 (selection) → TASK-009 (spawning) → TASK-011 (test US2)
4. TASK-018 (full integration) → TASK-019-022 (polish)

### Parallel Tasks (Can Do Simultaneously):
- [P] TASK-001, TASK-005, TASK-007 (independent foundations)
- [P] TASK-010 (Collectible fields) with TASK-008-009 (spawning)
- [P] TASK-013-017 (clarification tests) after TASK-018

### Phase Breakdown:
- **Phase 1** (Data Foundation): TASK-001, TASK-002, TASK-003, TASK-004 → 1.5 hours
- **Phase 2** (Named Objects): TASK-005, TASK-006 → 40 minutes
- **Phase 3** (Weighted Spawning): TASK-007, TASK-008, TASK-009, TASK-010, TASK-011 → 1 hour
- **Phase 4** (Testing): TASK-012-017 → 1 hour
- **Phase 5** (Integration): TASK-018-022 → 1 hour 5 minutes

---

## Next Steps

1. **Start with TASK-001** (can run in parallel with TASK-005, TASK-007)
2. **Use `/speckit.implement`** to execute all tasks sequentially
3. **Update task status** as each completes ([ ] → [x])
4. **Run `/speckit.analyze`** after TASK-022 to validate Constitution compliance

**Ready to implement!** All tasks are atomic, testable, and dependency-tracked.
