# Implementation Plan: Named Collectibles with Personality

**Branch**: `006-add-named-collectibles` | **Date**: October 17, 2025 | **Spec**: [spec.md](spec.md)
**Priority**: P3 (Polish) | **Estimated Time**: 2-3 hours | **Impact**: CRITICAL ("soul" fix)

## Summary

Replace generic 'coin' and 'customer' types with 15-20 specific named objects (PENNY, GUM, TEACHER, CAR, YACHT, ROCKET) that create emotional attachment and humor. Add `name` field to COLLECTIBLE_DATA, implement collection popup text system with aggregation, and use cumulative weighted spawning across 3 levels for rich variety. This transforms the game from "eating abstract shapes" to "CONSUMING TEACHERS AND ROCKETS" - fixing the core "soulless" problem identified in ALIGNMENT-REPORT.md.

**Key Technical Decisions** (from research clarifications):
- **Spawning**: Cumulative weighted probability (70/25/5% → 10/30/60% across tiers) - NOT exclusive filtering
- **Popup System**: 1.0s duration, max 5 simultaneous, 300ms aggregation window
- **Size Scaling**: Logarithmic formula `size = 20 + log10(value+1)*50` capped at 500px
- **Number Formatting**: K/M/B notation starting at 1,000 with 1 decimal place
- **Truncation**: Word-boundary at 20 chars (defensive coding - all designed names <20 chars)

## Technical Context

**Language/Version**: JavaScript ES6+ (const/let, arrow functions, classes per Constitution Article IV)
**Primary Dependencies**: LittleJS (latest from workspace `../../LittleJS/dist/littlejs.release.js`)
**Storage**: N/A (no persistence, resets on page reload)
**Testing**: Manual gameplay testing (no automated tests per Constitution Article VIII)
**Target Platform**: Web browsers (Chrome/Firefox/Safari latest 2 versions)
**Project Type**: LittleJS game (single-file architecture)
**Performance Goals**: 60 FPS, <1MB total game size
**Constraints**: Browser-compatible, offline-capable, no external dependencies

**LittleJS Game-Specific**:
- **Engine Version**: LittleJS latest from workspace
- **Physics Requirements**: No physics changes (uses existing size-based collision from FR-001)
- **Asset Budget**: Text-only (no sprites required for this feature - still using colored rectangles)
- **Game Jam Theme**: "SMALL" - Named objects make penny→rocket progression more explicit
- **Physics Innovation**: N/A (UI/data feature, not physics)
- **Shared Components**: None (single-file architecture)
- **Performance Target**: 60 FPS maintained (lightweight text rendering)
- **Browser Support**: Modern browsers (drawText/drawTextScreen already working)

## Constitution Check

*GATE: Must pass before implementation. Constitution v1.0.0 compliance.*

### Article II: Theme-First Development ✅
- **FR-016**: Theme = "SMALL"
- **Validation**: Named objects explicitly show scale ("PENNY" fits in pocket vs "SPACE ROCKET" fits cities)
- **TSC-001** (Spec): Object names reference size (penny vs rocket makes theme obvious)
- **TSC-002** (Spec): Eating absurd objects (TEACHER, CAR, ROCKET) creates "I'm HUGE now" realization
- **Impact**: ✅ ENHANCES theme by making progression tangible through recognizable names

### Article III: Katamari-Style Mechanics ✅
- **FR-001**: Size-based collection (no changes)
- **FR-005**: Growth formula (no changes)
- **Validation**: Feature is pure UI/data layer, does not modify physics
- **Research Finding** (Katamari Wikipedia): "Size represents collectability threshold, not economic value"
- **Impact**: ✅ SUPPORTS mechanics by adding personality to existing size-based system

### Article IV: Level Design ✅
- **FR-017**: Three distinct levels (Schoolyard, Downtown, Luxury)
- **FR-047**: Tier progression ($1 → $2B)
- **Validation**: Level-specific object themes (Level 1 = school, Level 2 = urban, Level 3 = luxury)
- **Clarification Q1**: Cumulative weighted spawning creates richer levels than exclusive filtering
- **Impact**: ✅ ENHANCES levels with thematically appropriate objects per tier

### Article V: Technical Standards ✅
- **FR-020**: ES6+ (const/let/classes) - used for PopupTextManager class
- **FR-021**: LittleJS idioms - uses drawTextScreen() from engine
- **FR-022**: Single-file - all code in src/game.js
- **Validation**: No external dependencies, follows existing code style
- **Impact**: ✅ COMPLIES with all technical standards

### Article VI: Visual Design 🔶 PARTIAL (intentional)
- **FR-025**: Sprite sheet integration - NOT in this feature (still colored rectangles)
- **FR-027**: Tile map - NOT in this feature
- **Validation**: Feature is text-only (popup names), sprites deferred to separate Feature 007
- **Spec Out-of-Scope**: "❌ Sprite sheet integration (separate spec: 007-create-sprite-sheet)"
- **Impact**: 🔶 DEFERRED sprites OK (Constitution allows phased approach per Article VIII)

### Article VIII: Workflow & Timeline ✅
- **FR-037**: Ship by Nov 3, 2025 (T-17 days from Oct 17)
- **FR-038**: <2 days per feature for P3
- **Validation**: Estimated 2-3 hours fits well within P3 timeline
- **Milestone**: Week 3 (Oct 28-Nov 2) - on track
- **Impact**: ✅ ACHIEVABLE within timeline

### Article IX: It Factor (Design Essence) ✅
- **FR-042**: Named collectibles (NOT abstract shapes)
- **FR-043**: Personality and humor
- **Validation**: This IS FR-042 implementation - fixes core "soulless" problem
- **VISION.md quote**: "I ate a TEACHER!" vs "I collected blue rectangle" (engagement difference)
- **Impact**: ✅ CRITICAL FIX for game's soul

### Article X: Gen Alpha Psychology ✅
- **FR-044**: Instant gratification (popups show names immediately)
- **FR-045**: Shareability (screenshot moments: "I ate 8 teachers")
- **Validation**: Named objects create memorable moments worth sharing
- **Impact**: ✅ ENHANCES shareability through specific, quotable experiences

### Article XI: Data Structures ✅
- **FR-048**: COLLECTIBLE_DATA with 33 objects (Constitution has full spec)
- **Validation**: This feature adds `name` field + implements 15-20 objects (33 is P4 expansion)
- **FR-006-001**: Minimum 15 distinct types (target: 20)
- **Impact**: ✅ EXTENDS existing COLLECTIBLE_DATA structure

### Article XII: Class Specifications 🔶 NEW CLASS
- **FR-053**: PlayerBall class (existing - modified collect() method)
- **FR-055**: Collectible class (existing - adds name field)
- **NEW**: PopupTextManager class (manages collection popups with aggregation)
- **Validation**: New class follows LittleJS patterns, uses vec2/Color/drawTextScreen
- **Impact**: 🔶 NEW utility class (lightweight, <100 lines)

### Article XV: Priorities & Status ✅
- **Priority**: P3 (Polish) - correct per spec
- **Status**: Ready for implementation (spec clarified, plan created)
- **Validation**: Implements after P1 (core gameplay) and P2 (level progression) complete
- **Impact**: ✅ CORRECT priority sequencing

**GATE RESULT**: ✅ **PASS** - All critical checks pass, sprites deferred as planned

---

## Project Structure

### Documentation (this feature)

```
.specify/specs/006-add-named-collectibles/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (in progress)
└── tasks.md             # Atomic tasks (created by /speckit.tasks next)
```

### Source Code (repository root)

```
src/
└── game.js              # ONLY file modified for this feature

# Modified sections in game.js:
# 1. COLLECTIBLE_DATA object (line ~305) - add 'name' field + expand to 15-20 objects
# 2. spawnCollectiblesForLevel() (line ~772) - weighted spawning by tier
# 3. PlayerBall.collect() (line ~993) - trigger popup on collection
# 4. gameRenderPost() (line ~448) - render active popups
# 5. NEW: PopupTextManager class (~150 lines) - manages popup lifecycle
# 6. NEW: formatCurrency() utility (~20 lines) - K/M/B notation
# 7. NEW: truncateName() utility (~15 lines) - word-boundary truncation
```

**Structure Decision**: Single-file architecture per Constitution FR-022. All changes in src/game.js to maintain simplicity and avoid module complexity for game jam.

---

## Complexity Tracking

*No Constitution violations - this section intentionally left empty.*

All changes comply with Constitution standards. New PopupTextManager class is lightweight utility (<100 lines) following LittleJS idioms.

---

## Implementation Phases

### Phase 0: Pre-Implementation Validation ✅

**Objective**: Verify spec clarity and Constitution compliance

**Tasks**:
1. ✅ Read spec.md and verify all requirements are clear
2. ✅ Run Constitution Check (all gates pass above)
3. ✅ Identify files to modify (src/game.js only)
4. ✅ Review research citations for implementation guidance

**Completion Criteria**: All Constitution gates pass, no ambiguous requirements

---

### Phase 1: Data Structure Expansion

**Objective**: Expand COLLECTIBLE_DATA from 2 objects to 15-20 with names and metadata

**Current COLLECTIBLE_DATA** (lines 305-318 in game.js):
```javascript
COLLECTIBLE_DATA = {
    coin: {
        sizeRange: [0.3, 0.4],
        value: 10,
        color: new Color(1, 1, 0),       // Yellow
        spawnWeight: 0.6                  // 60% of spawns
    },
    customer: {
        sizeRange: [0.6, 0.8],
        value: 50,
        color: new Color(0, 0.5, 1),     // Blue
        spawnWeight: 0.4                  // 40% of spawns
    }
};
```

**Target COLLECTIBLE_DATA** (with research-backed design):
```javascript
COLLECTIBLE_DATA = {
    // LEVEL 1: Schoolyard Objects (6 minimum, 10 target)
    penny: {
        name: 'PENNY',
        value: 1,
        tier: 1,  // Level 1 weighting
        size: 35,  // Calculated via logarithmic formula (FR-006-015)
        color: new Color(0.7, 0.4, 0.1),  // Copper
        spawnWeight: 1.0
    },
    gum: {
        name: 'GUM',
        value: 10,
        tier: 1,
        size: 65,  // log10(11)*50+20 ≈ 70
        color: new Color(1, 0.4, 0.7),  // Pink
        spawnWeight: 0.9
    },
    crayon: {
        name: 'CRAYON',
        value: 15,
        tier: 1,
        size: 79,
        color: new Color(1, 0.2, 0.2),  // Red
        spawnWeight: 0.8
    },
    homework: {
        name: 'HOMEWORK',
        value: 25,
        tier: 1,
        size: 90,
        color: new Color(0.9, 0.9, 0.9),  // White paper
        spawnWeight: 0.7
    },
    backpack: {
        name: 'BACKPACK',
        value: 75,
        tier: 1,
        size: 115,
        color: new Color(0.2, 0.3, 0.8),  // Blue
        spawnWeight: 0.6
    },
    basketball: {
        name: 'BASKETBALL',
        value: 100,
        tier: 1,
        size: 120,
        color: new Color(1, 0.5, 0),  // Orange
        spawnWeight: 0.5
    },
    desk: {
        name: 'DESK',
        value: 200,
        tier: 1,
        size: 135,
        color: new Color(0.6, 0.4, 0.2),  // Brown wood
        spawnWeight: 0.4
    },
    teacher: {
        name: 'TEACHER',  // First "person" - absurdity begins!
        value: 300,
        tier: 1,
        size: 145,
        color: new Color(1, 0.8, 0.6),  // Skin tone
        spawnWeight: 0.3
    },
    bookshelf: {
        name: 'BOOKSHELF',
        value: 400,
        tier: 1,
        size: 153,
        color: new Color(0.5, 0.3, 0.1),  // Dark wood
        spawnWeight: 0.2
    },
    swingset: {
        name: 'SWING SET',
        value: 500,
        tier: 1,
        size: 160,
        color: new Color(0.8, 0.8, 0.8),  // Metal gray
        spawnWeight: 0.1
    },

    // LEVEL 2: Urban/Business Objects (5 minimum, 10 target)
    coffee: {
        name: 'COFFEE',
        value: 100,
        tier: 2,
        size: 120,
        color: new Color(0.4, 0.2, 0.1),  // Brown
        spawnWeight: 1.0
    },
    laptop: {
        name: 'LAPTOP',
        value: 1500,
        tier: 2,
        size: 183,
        color: new Color(0.3, 0.3, 0.3),  // Gray
        spawnWeight: 0.9
    },
    chair: {
        name: 'OFFICE CHAIR',
        value: 300,
        tier: 2,
        size: 145,
        color: new Color(0.1, 0.1, 0.1),  // Black
        spawnWeight: 0.8
    },
    bicycle: {
        name: 'BICYCLE',
        value: 500,
        tier: 2,
        size: 160,
        color: new Color(0, 0.6, 0),  // Green
        spawnWeight: 0.7
    },
    scooter: {
        name: 'SCOOTER',
        value: 800,
        tier: 2,
        size: 169,
        color: new Color(0.9, 0.1, 0.1),  // Red
        spawnWeight: 0.6
    },
    businessman: {
        name: 'BUSINESSMAN',  // Person again!
        value: 2000,
        tier: 2,
        size: 188,
        color: new Color(0.2, 0.2, 0.2),  // Black suit
        spawnWeight: 0.5
    },
    sofa: {
        name: 'SOFA',
        value: 3000,
        tier: 2,
        size: 195,
        color: new Color(0.6, 0.3, 0.1),  // Brown leather
        spawnWeight: 0.4
    },
    car: {
        name: 'CAR',  // Major milestone!
        value: 5000,
        tier: 2,
        size: 205,
        color: new Color(0.8, 0, 0),  // Red
        spawnWeight: 0.3
    },
    foodtruck: {
        name: 'FOOD TRUCK',
        value: 10000,
        tier: 2,
        size: 220,
        color: new Color(0.9, 0.9, 0.2),  // Yellow
        spawnWeight: 0.2
    },
    house: {
        name: 'HOUSE',  // Buildings begin!
        value: 20000,
        tier: 2,
        size: 235,
        color: new Color(0.8, 0.6, 0.4),  // Tan
        spawnWeight: 0.1
    },

    // LEVEL 3: Luxury/Absurd Objects (4 minimum, target expansion)
    yacht: {
        name: 'YACHT',
        value: 500000,
        tier: 3,
        size: 300,
        color: new Color(1, 1, 1),  // White
        spawnWeight: 1.0
    },
    limo: {
        name: 'LIMOUSINE',
        value: 750000,
        tier: 3,
        size: 308,
        color: new Color(0, 0, 0),  // Black
        spawnWeight: 0.9
    },
    mansion: {
        name: 'MANSION',
        value: 1000000,
        tier: 3,
        size: 320,
        color: new Color(0.9, 0.8, 0.6),  // Cream
        spawnWeight: 0.8
    },
    helicopter: {
        name: 'HELICOPTER',
        value: 15000000,
        tier: 3,
        size: 382,
        color: new Color(0.3, 0.3, 0.3),  // Gunmetal
        spawnWeight: 0.7
    },
    jet: {
        name: 'PRIVATE JET',
        value: 50000000,
        tier: 3,
        size: 408,
        color: new Color(0.9, 0.9, 0.9),  // Silver
        spawnWeight: 0.6
    },
    skyscraper: {
        name: 'SKYSCRAPER',
        value: 100000000,
        tier: 3,
        size: 425,
        color: new Color(0.5, 0.5, 0.6),  // Glass/steel
        spawnWeight: 0.5
    },
    rocket: {
        name: 'SPACE ROCKET',  // Ultimate object!
        value: 2000000000,
        tier: 3,
        size: 485,  // Capped at 500px max (FR-006-016)
        color: new Color(0.9, 0.9, 0.9),  // White/silver
        spawnWeight: 0.4
    }
};
```

**Size Calculation Reference** (FR-006-015):
- Formula: `size = 20 + (Math.log10(value + 1) * 50)`
- Capped at 500px max (FR-006-016)
- Examples:
  - Penny ($1): 20 + log10(2)*50 = 20 + 15 = 35px ✓
  - Teacher ($300): 20 + log10(301)*50 = 20 + 125 = 145px ✓
  - Yacht ($500K): 20 + log10(500001)*50 = 20 + 283 = 303px → 300px ✓
  - Rocket ($2B): 20 + log10(2000000001)*50 = 20 + 465 = 485px ✓

**Implementation Notes**:
- **Total Objects**: 27 objects (exceeds 15 minimum, approaches 33 Constitution target)
- **Tier Distribution**: 10 tier-1, 10 tier-2, 7 tier-3 (balanced across levels)
- **Name Length**: All <20 chars (longest = "SPACE ROCKET" = 12 chars, "BUSINESSMAN" = 11 chars)
- **Color Variety**: Distinct hues per object for visual recognition
- **Spawn Weights**: Decrease within tier (common → rare gradient)

**Tasks**:
1. Replace COLLECTIBLE_DATA initialization in gameInit() (line ~305)
2. Update size calculation to use fixed `size` field instead of `sizeRange` (simpler)
3. Add `tier` field for weighted spawning logic
4. Add `name` field to all objects
5. Verify all names <20 chars (truncation defensive coding)

**Completion Criteria**: COLLECTIBLE_DATA has 27 objects with name/value/tier/size/color fields

---

### Phase 2: Weighted Spawning System

**Objective**: Implement cumulative weighted spawning per research Clarification Q1

**Current Spawning** (lines 772-830 in game.js):
- Hardcoded 60/40 split (coin/customer)
- No tier awareness
- Random size selection from `sizeRange`

**Target Spawning Logic** (FR-006-010, FR-006-011):
```javascript
/**
 * Get weighted spawn probability for object based on current level tier
 * Clarification Q1: Cumulative weighted probability (not exclusive)
 * Level 1: 70% tier-1, 25% tier-2, 5% tier-3
 * Level 2: 20% tier-1, 60% tier-2, 20% tier-3
 * Level 3: 10% tier-1, 30% tier-2, 60% tier-3
 */
const TIER_WEIGHTS = [
    { tier1: 0.70, tier2: 0.25, tier3: 0.05 },  // Level 1 (index 0)
    { tier1: 0.20, tier2: 0.60, tier3: 0.20 },  // Level 2 (index 1)
    { tier1: 0.10, tier2: 0.30, tier3: 0.60 }   // Level 3 (index 2)
];

function selectRandomCollectible(levelIndex) {
    const weights = TIER_WEIGHTS[levelIndex];

    // Roll for tier (cumulative probability)
    const tierRoll = Math.random();
    let selectedTier;
    if (tierRoll < weights.tier1) {
        selectedTier = 1;
    } else if (tierRoll < weights.tier1 + weights.tier2) {
        selectedTier = 2;
    } else {
        selectedTier = 3;
    }

    // Get all objects matching selected tier
    const tierObjects = Object.entries(COLLECTIBLE_DATA)
        .filter(([key, data]) => data.tier === selectedTier);

    if (tierObjects.length === 0) {
        console.warn(`No objects found for tier ${selectedTier}, falling back to tier 1`);
        return selectFromTier(1);
    }

    // Weighted selection within tier (using spawnWeight)
    const totalWeight = tierObjects.reduce((sum, [key, data]) => sum + data.spawnWeight, 0);
    let roll = Math.random() * totalWeight;

    for (const [key, data] of tierObjects) {
        roll -= data.spawnWeight;
        if (roll <= 0) {
            return key;  // Return object key (e.g., 'penny', 'yacht')
        }
    }

    // Fallback (shouldn't reach here)
    return tierObjects[0][0];
}

function selectFromTier(tier) {
    const tierObjects = Object.entries(COLLECTIBLE_DATA)
        .filter(([key, data]) => data.tier === tier);
    return tierObjects[Math.floor(Math.random() * tierObjects.length)][0];
}
```

**Modification to spawnCollectiblesForLevel()** (line ~772):
```javascript
// OLD (line ~817):
const type = Math.random() < 0.6 ? 'coin' : 'customer';

// NEW:
const type = selectRandomCollectible(currentLevel);
const objectData = COLLECTIBLE_DATA[type];

// OLD (lines ~818-820): Random size from sizeRange
const sizeRange = COLLECTIBLE_DATA[type].sizeRange;
const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);

// NEW: Use fixed size from data
const size = objectData.size;
```

**Research Justification** (from Clarification Q1):
> "Creates richer visual variety, allows struggling players to collect easier objects, provides aspirational glimpses of future tiers, aligns with Katamari philosophy ('the world doesn't change, YOUR ability to interact with it changes')."

**Katamari Research Citation**:
> "As objects stick to the katamari, the katamari will grow, eventually allowing objects that were once hurdles to be picked up."

**Cookie Clicker Research Citation**:
> "All buildings remain purchasable throughout game (cursors → idleverses). Milestone-based unlocks: buying your 50th or 100th of a building can unlock powerful upgrades."

**Tasks**:
1. Add TIER_WEIGHTS constant at top of file (~line 62 after STATE)
2. Implement selectRandomCollectible() function (~line 765 before spawnCollectiblesForLevel)
3. Implement selectFromTier() helper function
4. Modify spawnCollectiblesForLevel() to use new selection logic
5. Remove `sizeRange` logic, use fixed `size` field from COLLECTIBLE_DATA

**Completion Criteria**:
- Level 1 spawns mostly schoolyard objects with occasional aspirational items
- Level 2 has balanced mix
- Level 3 favors luxury objects but retains some lower-tier variety

---

### Phase 3: Collection Popup System

**Objective**: Implement PopupTextManager with aggregation, duration control, and formatting per Clarifications Q2, Q4, Q5

**NEW: PopupTextManager Class** (~150 lines, add after SoundManager class ~line 232):

```javascript
/**
 * PopupTextManager - Manages collection popup text with aggregation
 * FR-006-012: 1.0s duration with upward float + fade animation
 * FR-006-013: Aggregate identical objects within 300ms window
 * FR-006-014: Max 5 simultaneous popups, oldest removed first
 * Clarification Q2: Research-backed timing from WoW SCT addons
 */
class PopupTextManager {
    constructor() {
        this.activePopups = [];
        this.aggregationWindow = 0.3;  // 300ms window (Clarification Q2)
        this.maxPopups = 5;             // Max simultaneous (FR-006-014)
        this.popupDuration = 1.0;       // 1 second (FR-006-012)
        this.floatDistance = 40;        // Pixels upward (FR-006-012)
    }

    /**
     * Show collection popup (may aggregate if recent identical collection)
     * @param {string} objectName - Name to display (e.g., "PENNY")
     * @param {number} value - Dollar value for formatting
     * @param {vec2} worldPos - World position where collection occurred
     */
    showCollection(objectName, value, worldPos) {
        // Check for recent identical collection (aggregation window)
        const now = time;
        const existing = this.activePopups.find(popup =>
            popup.name === objectName &&
            (now - popup.startTime) < this.aggregationWindow &&
            !popup.aggregated  // Only aggregate once per popup
        );

        if (existing) {
            // Aggregate: increment count and value (FR-006-013)
            existing.count++;
            existing.totalValue += value;
            existing.text = this.formatPopupText(objectName, existing.totalValue, existing.count);
            existing.aggregated = true;  // Mark as aggregated
            return;  // Don't create new popup
        }

        // Create new popup
        const popup = {
            name: objectName,
            value: value,
            totalValue: value,
            count: 1,
            text: this.formatPopupText(objectName, value, 1),
            startTime: now,
            worldPos: worldPos.copy(),  // Store world position
            screenPos: null,            // Calculated per frame (world-to-screen)
            yOffset: 0,                 // Animated upward drift
            alpha: 1.0,                 // Fade out near end
            aggregated: false           // Track if already aggregated
        };

        this.activePopups.push(popup);

        // Enforce max popup limit (FR-006-014)
        if (this.activePopups.length > this.maxPopups) {
            this.activePopups.shift();  // Remove oldest
        }
    }

    /**
     * Format popup text: "PENNY! +$1" or "PENNY x3! +$3"
     * FR-006-018/019/020: K/M/B notation
     * FR-006-021/022/023: Word-boundary truncation
     */
    formatPopupText(name, totalValue, count) {
        // Truncate name if needed (FR-006-021, defensive)
        const truncatedName = truncateName(name, 20);

        // Format currency (FR-006-018)
        const formattedValue = formatCurrency(totalValue);

        // Aggregation display (FR-006-013)
        if (count > 1) {
            return `${truncatedName} x${count}! +${formattedValue}`;
        } else {
            return `${truncatedName}! +${formattedValue}`;
        }
    }

    /**
     * Update all active popups (called per frame in gameUpdate)
     */
    update() {
        const now = time;

        // Update each popup
        for (let i = this.activePopups.length - 1; i >= 0; i--) {
            const popup = this.activePopups[i];
            const age = now - popup.startTime;

            // Remove expired popups
            if (age > this.popupDuration) {
                this.activePopups.splice(i, 1);
                continue;
            }

            // Animate upward float (FR-006-012)
            const progress = age / this.popupDuration;
            popup.yOffset = this.floatDistance * progress;  // Linear upward movement

            // Fade out in last 30% of lifetime
            if (progress > 0.7) {
                popup.alpha = 1.0 - ((progress - 0.7) / 0.3);  // Fade 1.0 → 0.0
            } else {
                popup.alpha = 1.0;
            }
        }
    }

    /**
     * Render all active popups (called in gameRenderPost)
     */
    render() {
        // Stack popups vertically (FR-006-014: 30px spacing)
        const baseYOffset = 100;  // Distance above player
        const stackSpacing = 30;

        for (let i = 0; i < this.activePopups.length; i++) {
            const popup = this.activePopups[i];

            // Convert world position to screen coordinates
            // Use player position as reference (popups follow player on screen)
            if (player) {
                // Screen center + offset for stacking
                const screenX = mainCanvasSize.x / 2;
                const screenY = mainCanvasSize.y / 2 - baseYOffset - (i * stackSpacing) - popup.yOffset;

                // Color based on value (FR-006 color coding mentioned in Clarification Q2)
                const color = this.getPopupColor(popup.totalValue);
                const colorWithAlpha = color.scale(1, popup.alpha);  // Apply fade

                // Render text (24px font per Clarification Q2, larger for high-value)
                const fontSize = popup.totalValue > 1000 ? 32 : 24;
                drawTextScreen(
                    popup.text,
                    vec2(screenX, screenY),
                    fontSize,
                    colorWithAlpha,
                    0,           // angle
                    'center',    // textAlign
                    'monospace', // font
                    new Color(0, 0, 0, popup.alpha * 0.8)  // Outline with fade
                );
            }
        }
    }

    /**
     * Color-code popups by value (Clarification Q2: visual hierarchy)
     * White: Common (<$100)
     * Yellow: Medium ($100-$10K)
     * Orange: Rare (>$10K)
     */
    getPopupColor(value) {
        if (value > 10000) {
            return new Color(1, 0.5, 0);  // Orange (rare)
        } else if (value > 100) {
            return new Color(1, 1, 0);    // Yellow (medium)
        } else {
            return new Color(1, 1, 1);    // White (common)
        }
    }
}
```

**NEW: Currency Formatting Utility** (FR-006-018/019/020, ~20 lines):

```javascript
/**
 * Format currency with K/M/B notation (Clarification Q4)
 * <1K: Exact dollars ("$1", "$300")
 * 1K+: K suffix ("$1.5K", "$5K")
 * 1M+: M suffix ("$1.5M", "$5M")
 * 1B+: B suffix ("$2B", "$500B")
 */
function formatCurrency(value) {
    if (value < 1000) {
        return `$${value}`;  // Exact: "$1", "$300"
    } else if (value < 1000000) {
        const k = value / 1000;
        return k % 1 === 0 ? `$${k}K` : `$${k.toFixed(1)}K`;  // "$1.5K"
    } else if (value < 1000000000) {
        const m = value / 1000000;
        return m % 1 === 0 ? `$${m}M` : `$${m.toFixed(1)}M`;  // "$5M"
    } else {
        const b = value / 1000000000;
        return b % 1 === 0 ? `$${b}B` : `$${b.toFixed(1)}B`;  // "$2B"
    }
}
```

**NEW: Name Truncation Utility** (FR-006-021/022/023, ~15 lines):

```javascript
/**
 * Truncate object name at word boundary (Clarification Q5)
 * Preferred: Word boundary within 20 chars ("ULTRA LUXURY...")
 * Fallback: Character 17 + "..." if no word boundary
 * Minimum: 4 characters visible before ellipsis
 */
function truncateName(name, maxChars = 20) {
    if (name.length <= maxChars) {
        return name;  // No truncation needed
    }

    // Find last space within limit
    const truncated = name.substring(0, maxChars);
    const lastSpace = truncated.lastIndexOf(' ');

    // Word boundary found and leaves ≥4 chars visible
    if (lastSpace > 4) {
        return truncated.substring(0, lastSpace) + '...';
    }

    // Fallback: character limit (ensure 4+ chars visible)
    return truncated.substring(0, Math.max(4, maxChars - 3)) + '...';
}
```

**Integration Points**:

1. **Global Instance** (line ~268 with soundManager):
```javascript
let popupManager;  // Global PopupTextManager instance
```

2. **Initialize in gameInit()** (line ~280 after soundManager):
```javascript
popupManager = new PopupTextManager();
```

3. **Update in gameUpdate()** (line ~329 after particle budget):
```javascript
// Update popup manager
if (popupManager) {
    popupManager.update();
}
```

4. **Render in gameRenderPost()** (line ~583 after score display):
```javascript
// Render collection popups (above all other UI)
if (popupManager) {
    popupManager.render();
}
```

5. **Trigger in PlayerBall.collect()** (line ~1005 after particle spawn):
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

**Tasks**:
1. Implement PopupTextManager class after SoundManager (~line 232)
2. Implement formatCurrency() utility function
3. Implement truncateName() utility function
4. Add global popupManager variable
5. Initialize popupManager in gameInit()
6. Call popupManager.update() in gameUpdate()
7. Call popupManager.render() in gameRenderPost()
8. Trigger popupManager.showCollection() in PlayerBall.collect()

**Completion Criteria**:
- Collecting objects shows popup with name + formatted value
- Identical objects collected within 300ms aggregate ("PENNY x3! +$3")
- Max 5 popups visible at once (oldest removed)
- Popups float upward 40px over 1 second, fading in last 30%
- Values display as K/M/B notation ($1.5K, $5M, $2B)

---

### Phase 4: Collectible Class Updates

**Objective**: Update Collectible class to use new COLLECTIBLE_DATA structure

**Current Collectible Constructor** (line ~870):
```javascript
class Collectible extends EngineObject {
    constructor(pos, type, size) {
        super(pos, vec2(size, size));
        this.type = type;
        this.value = COLLECTIBLE_DATA[type].value;
        this.color = COLLECTIBLE_DATA[type].color;
        // ... rest
    }
}
```

**Updated Collectible Constructor**:
```javascript
class Collectible extends EngineObject {
    constructor(pos, type, size) {
        super(pos, vec2(size, size));
        this.type = type;
        this.name = COLLECTIBLE_DATA[type].name;      // NEW: Store name
        this.value = COLLECTIBLE_DATA[type].value;
        this.color = COLLECTIBLE_DATA[type].color;
        this.tier = COLLECTIBLE_DATA[type].tier;      // NEW: Store tier
        this.magnetActive = false;
        this.collideTiles = false;
        this.mass = 0.1;
        this.damping = 0.9;
        this.collideSolidObjects = true;
    }
    // ... rest unchanged
}
```

**Modification Rationale**:
- Store `name` for popup system access
- Store `tier` for future tier-up logic (FR-047 placeholder)
- No behavioral changes to update() or render()

**Tasks**:
1. Add `this.name = COLLECTIBLE_DATA[type].name;` to constructor
2. Add `this.tier = COLLECTIBLE_DATA[type].tier;` to constructor
3. Verify no other Collectible methods need updates

**Completion Criteria**: Collectible objects have name and tier fields accessible

---

### Phase 5: Integration Testing & Polish

**Objective**: Manual testing of all features, verify Constitution compliance

**Test Scenarios** (from spec.md User Stories):

**US1: Collect Recognizable Named Objects**
1. Start Level 1
2. Collect penny → verify popup shows "PENNY! +$1"
3. Collect teacher → verify popup shows "TEACHER! +$300"
4. Collect desk → verify popup shows "DESK! +$200"
5. **Expected**: All popups display specific names, not generic types

**US2: Experience Absurdist Escalation**
1. Play Level 1 for 30 seconds → verify mostly schoolyard objects spawn
2. Progress to Level 2 → verify urban/business objects appear
3. Occasionally see yacht/rocket in Level 1 → verify aspirational spawns
4. Progress to Level 3 → verify mostly luxury objects, some earlier tiers
5. **Expected**: Clear escalation from mundane (penny) → absurd (rocket)

**US3: Expand Object Variety**
1. Play Level 1 and observe spawns for 60 seconds
2. Count distinct object types collected (aim for 8+ different types)
3. Play all 3 levels and count total unique types (aim for 15+)
4. **Expected**: Rich variety, not just 2 types repeating

**Clarification Tests**:

**Q1: Weighted Spawning**
1. Play Level 1, collect 20 objects
2. Verify ~14 tier-1, ~5 tier-2, ~1 tier-3 (70/25/5 distribution)
3. Play Level 3, collect 20 objects
4. Verify ~2 tier-1, ~6 tier-2, ~12 tier-3 (10/30/60 distribution)

**Q2: Popup Aggregation**
1. Collect 3 pennies rapidly (<300ms between)
2. **Expected**: Single popup "PENNY x3! +$3" (not 3 separate popups)
3. Collect 10 objects rapidly
4. **Expected**: Max 5 popups visible, oldest removed

**Q4: Number Formatting**
1. Collect penny → verify "$1" (exact)
2. Collect teacher → verify "$300" (exact under 1K)
3. Collect car → verify "$5K" (K notation)
4. Collect yacht → verify "$500K" or "$0.5M" (M notation)
5. Collect rocket → verify "$2B" (B notation)

**Q5: Name Truncation** (defensive test)
1. Temporarily add object with 25-char name (e.g., "ULTRA LUXURY MEGA YACHT")
2. Collect it → verify truncates at word: "ULTRA LUXURY..." (not "ULTRA LUXURY MEG...")
3. Remove test object
4. **Expected**: All actual object names <20 chars, no truncation triggers

**Polish Tasks**:
1. Verify all 27 object colors are distinct and recognizable
2. Verify popup colors (white/yellow/orange) work on all backgrounds
3. Verify popup text readable at 720p and 1080p resolutions
4. Adjust popup baseYOffset if overlaps with HUD
5. Verify no performance drops (maintain 60 FPS with 5 popups + particles)

**Bug Fixes** (if found):
- Popup stacking off-center → adjust screenX calculation
- Aggregation not working → check time window logic
- Objects spawning outside play area → verify TIER_WEIGHTS logic
- Popup text too small → increase fontSize from 24px to 28px
- High-value objects too rare → adjust spawn weights

**Completion Criteria**:
- All user stories pass manual testing
- All clarification behaviors verified
- No Constitution violations
- 60 FPS maintained
- No crashes or errors in console

---

## Implementation Notes

### Research-Backed Design Decisions

**From Katamari Damacy Wikipedia** (fetched content):
> "The game uses size, weight, and surface area to determine if an object will stick to the katamari."
- **Application**: Sizes calculated via logarithmic formula based on physical scale, not economic value

> "Takahashi was aiming for four key points: novelty, ease of understanding, enjoyment, and humor."
- **Application**: Named objects add novelty (not abstract shapes) and humor ("I ate a TEACHER!")

> "It was not fun to shrink back down" (shrinking mechanic removed)
- **Application**: No negative feedback loops - popups only show positive gains

**From Cookie Clicker** (research):
> "All buildings remain purchasable throughout game... milestone-based unlocks"
- **Application**: Cumulative weighted spawning keeps all tiers available, creates aspirational moments

**From WoW Scrolling Combat Text** (2024 addons):
> "Customizable scroll duration... sliders for animation speed... eight animation types"
- **Application**: 1.0s duration standard, upward float animation, color-coding by value

**From Game Design Principles** (Game Developer article):
> "Principle #3 - Announce Change: If a change occurs a hundred times in an hour, announcement may not be required."
- **Application**: Aggregation system prevents popup spam during rapid collection

### Performance Considerations

**Estimated Performance Impact**:
- PopupTextManager: ~5-10 FPS cost (5 text draws per frame max)
- Weighted spawning: Negligible (<1ms per spawn, only happens once at level start)
- Currency formatting: Negligible (simple math operations)
- **Total**: <5% FPS impact, well within 60 FPS target

**Memory Impact**:
- COLLECTIBLE_DATA: +2KB (27 objects vs 2 objects)
- PopupTextManager: <1KB (5 active popups max, ~200 bytes each)
- Utility functions: <1KB
- **Total**: <4KB additional memory (negligible for browser game)

**Optimization Opportunities** (if needed):
1. Object pool for popups (reuse instead of create/destroy)
2. Cache formatted currency strings (memoization)
3. Reduce max popups from 5 to 3 if FPS drops

### Edge Cases Handled

**From spec.md Edge Cases section**:
1. **Can't create 33 objects in time** → 27 objects implemented (exceeds 15 minimum)
2. **Object name length** → All designed <20 chars, truncation defensive
3. **Two objects same name** → Unique keys enforced by object literal structure
4. **Localization** → English only (P4 consideration per spec)
5. **Name doesn't fit on screen** → Truncation system + defensive 20-char limit

**Additional Edge Cases**:
- **No popup manager** → All calls check `if (popupManager)` guard
- **Rapid collection (10+ per second)** → Aggregation + max 5 limit prevents spam
- **Very long name (25+ chars)** → Truncation at word boundary or char 17
- **Value overflow (>$999B)** → formatCurrency handles up to quintillion (B format)
- **Zero/negative value** → Not possible (all objects have positive value in data)

### Constitution Compliance Summary

**Fully Compliant**:
- ✅ Article II (Theme) - Named objects make "SMALL" theme explicit
- ✅ Article III (Mechanics) - No physics changes, pure UI/data layer
- ✅ Article IV (Levels) - Tier system aligns with 3-level structure
- ✅ Article V (Technical) - ES6+, LittleJS idioms, single-file
- ✅ Article VIII (Timeline) - 2-3 hours fits P3 schedule
- ✅ Article IX (It Factor) - FIXES core "soul" problem (FR-042)
- ✅ Article X (Psychology) - Named objects = shareability
- ✅ Article XI (Data) - Extends COLLECTIBLE_DATA per FR-048
- ✅ Article XV (Priorities) - P3 priority correct

**Deferred (Intentional)**:
- 🔶 Article VI (Visual) - Sprites deferred to Feature 007 (text-only for now)
- 🔶 Article XII (Classes) - New PopupTextManager class (lightweight utility)

**No Violations**: All changes comply with Constitution standards

---

## Success Criteria

**From spec.md Success Criteria section**:

1. **SC-001**: COLLECTIBLE_DATA contains 15+ unique entries ✅
   - **Actual**: 27 objects (penny → rocket)

2. **SC-002**: Each object has `name` field ✅
   - **Verification**: `Object.keys(COLLECTIBLE_DATA).every(key => DATA[key].name)`

3. **SC-003**: 100% of collection popups display object names ✅
   - **Implementation**: PopupTextManager.showCollection() uses name field

4. **SC-004**: Players can name 3+ specific objects after playing ✅
   - **Qualitative**: Manual testing (memorable names like TEACHER, ROCKET)

5. **SC-005**: Playtesters react to absurd objects ("I ate a teacher?!") ✅
   - **Qualitative**: Requires external playtesting (post-implementation)

6. **SC-006**: Object progression feels natural (penny→desk→car→yacht) ✅
   - **Implementation**: Tier system + weighted spawning creates natural flow

**Theme Success Criteria** (TSC):

1. **TSC-001**: Object names explicitly reference size ✅
   - penny vs SPACE ROCKET makes theme obvious

2. **TSC-002**: Eating absurd objects creates "I'm HUGE now" realization ✅
   - TEACHER, CAR, ROCKET progression

3. **TSC-003**: Named progression communicates theme better than abstract shapes ✅
   - "PENNY" vs "yellow rectangle" - clear improvement

4. **TSC-004**: Players screenshot "I ate a TEACHER" moments ✅
   - Shareability through specific, quotable experiences

**All success criteria achievable through this implementation plan.**

---

## Next Steps

1. **Run `/speckit.tasks`** to break this plan into atomic tasks
2. **Run `/speckit.implement`** to execute tasks and write code
3. **Manual testing** per Phase 5 test scenarios
4. **Run `/speckit.analyze`** to validate Constitution compliance
5. **Create pull request** if all tests pass

**Estimated Timeline**: 2-3 hours total
- Phase 1 (Data): 1 hour
- Phase 2 (Spawning): 30 minutes
- Phase 3 (Popups): 1 hour
- Phase 4 (Collectible): 15 minutes
- Phase 5 (Testing): 30 minutes

**Dependencies**: None (all code self-contained in game.js)

**Risks**: None identified (low-risk UI/data feature)

---

**Plan Status**: ✅ **READY FOR TASKS** - Run `/speckit.tasks` next
