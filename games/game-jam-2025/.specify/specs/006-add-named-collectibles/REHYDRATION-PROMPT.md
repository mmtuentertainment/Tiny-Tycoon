# Feature 006 Rehydration Prompt - Session 2

**Branch**: `006-add-named-collectibles`
**Current Commit**: `eacc8f0` - feat: add popup text utilities and manager (TASK-001/002 complete)
**Session Start Date**: October 17, 2025
**Status**: 2 of 22 tasks complete (9% done)

---

## Context Summary

You are implementing **Feature 006: Named Collectibles with Personality** for Tiny Tycoon, a Katamari-style business growth game built with LittleJS for the 2025 Game Jam (theme: "SMALL").

**Feature Goal**: Replace generic 'coin' and 'customer' types with 15-20 specific named objects (PENNY, TEACHER, YACHT, ROCKET) that create emotional attachment and humor, fixing the core "soulless" problem.

**Priority**: P3 (Polish) | **Estimated Time**: 2-3 hours total | **Time Spent**: ~45 minutes

---

## What's Been Completed ✅

### TASK-001: Utility Functions ✅ (20 minutes)
**File**: `src/game.js` lines 142-190
**Added**:
- `formatCurrency(value)` - Converts values to K/M/B notation
  - Examples: $1, $1.5K, $5M, $2B
  - Research-backed: Cookie Clicker standards
- `truncateName(name, maxChars)` - Word-boundary truncation
  - Truncates at last space within 20 chars
  - Fallback to character limit if no word boundary
  - Research-backed: Apple iOS Guidelines

**Test Status**: Not yet tested (needs browser integration)

---

### TASK-002: PopupTextManager Class ✅ (25 minutes)
**File**: `src/game.js` lines 192-320
**Added**: Simplified PopupTextManager class (~120 lines)

**Key Features**:
- `showCollection(name, value, worldPos)` - Creates new popup
- `update()` - Per-frame animation (float + fade)
- `render()` - Draws popups with drawTextScreen
- `getPopupColor(value)` - Color-codes by value (white/yellow/orange)

**Simplifications Made** (for jam speed):
- ❌ **Removed aggregation** (300ms window complexity)
- ✅ Kept max 5 simultaneous popups
- ✅ Kept 1.0s duration with float/fade animation
- ✅ Kept color coding

**Design Decision**: Simplified from planned 150-line version to 120 lines by removing aggregation feature. Faster to ship, less bugs, easier to maintain. Aggregation can be added later if needed (P4).

**Test Status**: Not yet tested (needs wiring to game lifecycle)

---

## Current State of Code

**Modified File**: `src/game.js`
- Lines 142-190: Utility functions (formatCurrency, truncateName)
- Lines 192-320: PopupTextManager class
- Total additions: +180 lines
- Current file size: ~1480 lines (under 1500 limit ✅)

**Unmodified**:
- COLLECTIBLE_DATA still has only 2 objects (coin, customer)
- No global popupManager variable yet
- PopupTextManager not initialized in gameInit()
- PopupTextManager not updated/rendered in game loop
- Collection trigger not added to PlayerBall.collect()

---

## What Needs to Be Done Next

### Immediate Next Steps (Session 2 Priority)

**TASK-003**: Integrate PopupTextManager into game lifecycle (15 minutes)
**Files**: `src/game.js` (4 locations)
1. Add global `let popupManager;` (~line 268, with soundManager)
2. Initialize `popupManager = new PopupTextManager();` in gameInit() (~line 380)
3. Call `popupManager.update();` in gameUpdate() (~line 429)
4. Call `popupManager.render();` in gameRenderPost() (~line 683)

**Expected Result**: popupManager exists globally, updates/renders each frame, ready to receive showCollection() calls

---

**TASK-004**: Trigger popup on collection (10 minutes)
**File**: `src/game.js` (~line 1105, in PlayerBall.collect method)
**Add after particle spawn**:
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

**Expected Result**: Error "cannot read 'name' of undefined" (EXPECTED - TASK-005 adds names)

---

**TASK-005**: Expand COLLECTIBLE_DATA to 27 named objects (30 minutes) ⚠️ **BIG TASK**
**File**: `src/game.js` (~line 405, in gameInit function)
**Current structure** (2 objects):
```javascript
COLLECTIBLE_DATA = {
    coin: { sizeRange: [0.3, 0.4], value: 10, color: new Color(1, 1, 0), spawnWeight: 0.6 },
    customer: { sizeRange: [0.6, 0.8], value: 50, color: new Color(0, 0.5, 1), spawnWeight: 0.4 }
};
```

**Target structure** (27 objects):
```javascript
COLLECTIBLE_DATA = {
    // LEVEL 1: Schoolyard (10 objects)
    penny: { name: 'PENNY', value: 1, tier: 1, size: 35, color: new Color(0.7, 0.4, 0.1), spawnWeight: 1.0 },
    gum: { name: 'GUM', value: 10, tier: 1, size: 65, color: new Color(1, 0.4, 0.7), spawnWeight: 0.9 },
    crayon: { name: 'CRAYON', value: 15, tier: 1, size: 79, color: new Color(1, 0.2, 0.2), spawnWeight: 0.8 },
    homework: { name: 'HOMEWORK', value: 25, tier: 1, size: 90, color: new Color(0.9, 0.9, 0.9), spawnWeight: 0.7 },
    backpack: { name: 'BACKPACK', value: 75, tier: 1, size: 115, color: new Color(0.2, 0.3, 0.8), spawnWeight: 0.6 },
    basketball: { name: 'BASKETBALL', value: 100, tier: 1, size: 120, color: new Color(1, 0.5, 0), spawnWeight: 0.5 },
    desk: { name: 'DESK', value: 200, tier: 1, size: 135, color: new Color(0.6, 0.4, 0.2), spawnWeight: 0.4 },
    teacher: { name: 'TEACHER', value: 300, tier: 1, size: 145, color: new Color(1, 0.8, 0.6), spawnWeight: 0.3 },
    bookshelf: { name: 'BOOKSHELF', value: 400, tier: 1, size: 153, color: new Color(0.5, 0.3, 0.1), spawnWeight: 0.2 },
    swingset: { name: 'SWING SET', value: 500, tier: 1, size: 160, color: new Color(0.8, 0.8, 0.8), spawnWeight: 0.1 },

    // LEVEL 2: Urban (10 objects)
    coffee: { name: 'COFFEE', value: 100, tier: 2, size: 120, color: new Color(0.4, 0.2, 0.1), spawnWeight: 1.0 },
    laptop: { name: 'LAPTOP', value: 1500, tier: 2, size: 183, color: new Color(0.3, 0.3, 0.3), spawnWeight: 0.9 },
    chair: { name: 'OFFICE CHAIR', value: 300, tier: 2, size: 145, color: new Color(0.1, 0.1, 0.1), spawnWeight: 0.8 },
    bicycle: { name: 'BICYCLE', value: 500, tier: 2, size: 160, color: new Color(0, 0.6, 0), spawnWeight: 0.7 },
    scooter: { name: 'SCOOTER', value: 800, tier: 2, size: 169, color: new Color(0.9, 0.1, 0.1), spawnWeight: 0.6 },
    businessman: { name: 'BUSINESSMAN', value: 2000, tier: 2, size: 188, color: new Color(0.2, 0.2, 0.2), spawnWeight: 0.5 },
    sofa: { name: 'SOFA', value: 3000, tier: 2, size: 195, color: new Color(0.6, 0.3, 0.1), spawnWeight: 0.4 },
    car: { name: 'CAR', value: 5000, tier: 2, size: 205, color: new Color(0.8, 0, 0), spawnWeight: 0.3 },
    foodtruck: { name: 'FOOD TRUCK', value: 10000, tier: 2, size: 220, color: new Color(0.9, 0.9, 0.2), spawnWeight: 0.2 },
    house: { name: 'HOUSE', value: 20000, tier: 2, size: 235, color: new Color(0.8, 0.6, 0.4), spawnWeight: 0.1 },

    // LEVEL 3: Luxury (7 objects)
    yacht: { name: 'YACHT', value: 500000, tier: 3, size: 300, color: new Color(1, 1, 1), spawnWeight: 1.0 },
    limo: { name: 'LIMOUSINE', value: 750000, tier: 3, size: 308, color: new Color(0, 0, 0), spawnWeight: 0.9 },
    mansion: { name: 'MANSION', value: 1000000, tier: 3, size: 320, color: new Color(0.9, 0.8, 0.6), spawnWeight: 0.8 },
    helicopter: { name: 'HELICOPTER', value: 15000000, tier: 3, size: 382, color: new Color(0.3, 0.3, 0.3), spawnWeight: 0.7 },
    jet: { name: 'PRIVATE JET', value: 50000000, tier: 3, size: 408, color: new Color(0.9, 0.9, 0.9), spawnWeight: 0.6 },
    skyscraper: { name: 'SKYSCRAPER', value: 100000000, tier: 3, size: 425, color: new Color(0.5, 0.5, 0.6), spawnWeight: 0.5 },
    rocket: { name: 'SPACE ROCKET', value: 2000000000, tier: 3, size: 485, color: new Color(0.9, 0.9, 0.9), spawnWeight: 0.4 }
};
```

**Key Changes**:
- Replace `sizeRange: [min, max]` with fixed `size: number` (simpler)
- Add `name: string` field (required for popups)
- Add `tier: 1|2|3` field (required for weighted spawning)
- Sizes calculated via logarithmic formula: `size = 20 + (Math.log10(value + 1) * 50)`

**Expected Result**: COLLECTIBLE_DATA has 27 objects, spawning still works (uses size instead of sizeRange)

---

**TASK-006**: Test User Story 1 - Named Object Popups (10 minutes)
**Manual test in browser**:
1. Start Level 1
2. Collect penny → expect popup "PENNY! +$1"
3. Collect teacher → expect popup "TEACHER! +$300"
4. **SUCCESS**: Popups show specific names

---

### Secondary Priority (Session 2 or 3)

**TASK-007-011**: Weighted Spawning System (1 hour)
- Add TIER_WEIGHTS constant
- Implement selectRandomCollectible() function
- Modify spawnCollectiblesForLevel() to use weighted selection
- Update Collectible constructor with name/tier fields
- Test absurdist escalation across levels

**TASK-012-022**: Testing & Polish (1 hour)
- Test all 3 user stories
- Verify research clarifications (Q1-Q5)
- Performance testing (60 FPS)
- Visual polish
- Edge case testing
- Constitution compliance

---

## Technical Reference

### File Locations (src/game.js)
- **Utility functions**: Lines 142-190
- **PopupTextManager class**: Lines 192-320
- **SoundManager class**: Lines 322+ (reference for patterns)
- **Global variables**: ~Line 268 (add popupManager here)
- **gameInit()**: ~Line 380 (initialize popupManager here)
- **gameUpdate()**: ~Line 429 (call popupManager.update() here)
- **gameRenderPost()**: ~Line 683 (call popupManager.render() here)
- **COLLECTIBLE_DATA**: ~Line 405 in gameInit (expand to 27 objects here)
- **PlayerBall.collect()**: ~Line 1105 (trigger popup here)
- **spawnCollectiblesForLevel()**: ~Line 872 (modify spawning here)
- **Collectible constructor**: ~Line 970 (add name/tier fields here)

### Research-Backed Design Decisions

**From Katamari Damacy Wikipedia**:
- Size = collectability threshold (not economic value)
- Objects don't disappear, they become collectible as you grow
- Logarithmic size scaling: `size = 20 + log10(value+1)*50`

**From Cookie Clicker**:
- Cumulative unlocking (all buildings remain available)
- Weighted probability spawning (70/25/5% → 10/30/60% across tiers)

**From WoW Scrolling Combat Text**:
- 1.0s duration standard for popup text
- Max 5 simultaneous to prevent screen clutter

**Simplification Decision**:
- Removed aggregation (300ms window) to ship faster
- Can add back as P4 feature if playtesters want it

---

## Constitution Compliance Status

**Article Checks**:
- ✅ Article II (Theme) - Named objects make "SMALL" explicit
- ✅ Article III (Mechanics) - No physics changes, pure UI/data
- ✅ Article V (Technical) - Single file, ES6+, LittleJS idioms
- ✅ Article VIII (Timeline) - On track for 2-3 hours
- ✅ Article IX (It Factor) - Fixes "soul" problem (FR-042)
- ✅ Article XI (Data) - Extends COLLECTIBLE_DATA
- 🔶 Article XII (Classes) - New PopupTextManager class (lightweight utility, acceptable)

**No violations** - All changes Constitution-compliant

---

## Known Issues / Blockers

**None currently** - Clear path forward for remaining tasks

---

## Session 2 Quick Start Commands

```bash
# Verify branch and status
git status
git log --oneline -3

# Check current code
cat src/game.js | grep -A 10 "class PopupTextManager"
cat src/game.js | grep -A 5 "COLLECTIBLE_DATA = {"

# Start dev server (if needed for testing)
npm run dev

# Open browser to test
# http://localhost:5173
```

---

## Session 2 Prompt

**Copy/paste this to continue:**

```
I'm continuing Feature 006: Named Collectibles with Personality for Tiny Tycoon.

COMPLETED (Session 1):
- TASK-001: formatCurrency() and truncateName() utilities ✅
- TASK-002: PopupTextManager class (simplified 120-line version) ✅
- Commit: eacc8f0

NEXT (Session 2):
- TASK-003: Wire PopupTextManager into game lifecycle (4 integration points)
- TASK-004: Trigger popup on collection
- TASK-005: Expand COLLECTIBLE_DATA from 2 to 27 objects (BIG task - see full structure in REHYDRATION-PROMPT.md)

FILES TO MODIFY:
- src/game.js only (lines 268, 380, 429, 683, 405, 1105)

CONTEXT:
- Branch: 006-add-named-collectibles
- Current file: src/game.js (~1480 lines, under 1500 limit)
- Priority: P3 (Polish), estimated 2-3 hours total, ~45min spent
- Goal: Replace generic types with named objects (penny→teacher→rocket)

REFERENCE DOCS:
- .specify/specs/006-add-named-collectibles/REHYDRATION-PROMPT.md (this file)
- .specify/specs/006-add-named-collectibles/spec.md (requirements)
- .specify/specs/006-add-named-collectibles/plan.md (technical plan)
- .specify/specs/006-add-named-collectibles/tasks.md (22 atomic tasks)

Please continue with TASK-003: Integrate PopupTextManager into game lifecycle.
```

---

## Success Criteria Checklist

**User Story 1**: Collect Recognizable Named Objects
- [ ] Popup shows "PENNY! +$1" (not "coin! +10")
- [ ] Popup shows "TEACHER! +$300"
- [ ] Popup shows "YACHT! +$500K"
- [ ] Popup shows "SPACE ROCKET! +$2B"

**User Story 2**: Experience Absurdist Escalation
- [ ] Level 1 spawns mostly schoolyard objects
- [ ] Level 2 spawns mostly urban objects
- [ ] Level 3 spawns mostly luxury objects
- [ ] Clear progression: mundane → impressive → absurd

**User Story 3**: Expand Object Variety
- [ ] COLLECTIBLE_DATA has 27 objects (exceeds 15 minimum)
- [ ] Level 1 spawns 8+ distinct types in 60 seconds
- [ ] All 3 levels combined show 15+ unique types

**Performance**:
- [ ] Maintains 60 FPS with 5 popups active
- [ ] No console errors
- [ ] Works in Chrome + Firefox

---

## Estimated Remaining Time

- **Session 2**: 1-1.5 hours (TASK-003 through TASK-011)
- **Session 3**: 30 minutes (TASK-012 through TASK-022, testing/polish)
- **Total remaining**: ~2 hours

**Progress**: 2/22 tasks complete (9% done by task count, ~25% done by time)

---

**End of Rehydration Prompt**
**Last Updated**: October 17, 2025
**Next Session**: Continue with TASK-003
