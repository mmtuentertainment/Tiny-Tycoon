# Feature Specification: Named Collectibles with Personality

**Feature Branch**: `006-add-named-collectibles`
**Created**: October 17, 2025
**Status**: Clarified (ready for `/speckit.plan`)
**Input**: User description: "Replace generic 'coin' and 'customer' types with 15-20 specific named objects (PENNY, GUM, BACKPACK, TEACHER, CAR, YACHT, ROCKET). Add 'name' field to COLLECTIBLE_DATA. Show object names in collection popup text. Create personality and absurdist escalation (penny → eating people → eating buildings)."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Collect Recognizable Named Objects (Priority: P3)

As a player, when I collect an object, I want to know WHAT I collected (PENNY, TEACHER, YACHT) so that collections feel meaningful and I can remember specific moments ("I ate a teacher!") rather than generic abstractions.

**Why this priority**: P3 (Polish) - This is THE "soulless" problem from Vision.md. Generic types (coin, customer) have no personality. Named objects (PENNY, TEACHER, YACHT) create emotional attachment and humor.

**Independent Test**: Collect various objects. Each shows specific name in popup text: "CONSUMED: PENNY! +$1", "CONSUMED: TEACHER! +$300", "CONSUMED: YACHT! +$5M". Names are culturally recognizable. Can test without any other features.

**Acceptance Scenarios**:

1. **Given** player collects penny object, **When** collection occurs, **Then** popup text displays "CONSUMED: PENNY! +$1"
2. **Given** player collects teacher object, **When** collection occurs, **Then** popup text displays "CONSUMED: TEACHER! +$300"
3. **Given** player collects yacht object, **When** collection occurs, **Then** popup text displays "CONSUMED: YACHT! +$5,000,000"
4. **Given** player collects rocket object, **When** collection occurs, **Then** popup text displays "CONSUMED: SPACE ROCKET! +$2,000,000,000"

---

### User Story 2 - Experience Absurdist Escalation (Priority: P3)

As a player, as I progress through the game, I want object types to escalate from mundane (penny) to absurd (eating people) to cosmic (eating rockets) so that the game's humor and theme emerge through object progression.

**Why this priority**: P3 - Katamari Damacy's core appeal is absurdist escalation. Starting with "picking up pennies" and ending with "consuming space rockets" creates the "whoa, this escalated" humor that makes game memorable.

**Independent Test**: Play Level 1 (schoolyard objects: penny, gum, teacher). Progress to Level 2 (urban objects: coffee, car, house). Progress to Level 3 (luxury objects: yacht, jet, rocket). Absurdity increases across levels - can observe progression arc.

**Acceptance Scenarios**:

1. **Given** player is in Level 1 (Broke Era), **When** collectibles spawn, **Then** only childhood/school objects appear (penny, gum, crayon, homework, backpack, basketball, desk, teacher, bookshelf, swing set)
2. **Given** player is in Level 2 (Influencer Arc), **When** collectibles spawn, **Then** only urban/business objects appear (coffee, laptop, chair, bicycle, scooter, businessman, sofa, car, food truck, house)
3. **Given** player is in Level 3 (Oligarch Endgame), **When** collectibles spawn, **Then** only luxury/absurd objects appear (yacht, limo, mansion, helicopter, jet, skyscraper, rocket)
4. **Given** player progresses from Level 1→2→3, **When** observing object types, **Then** clear escalation from mundane→impressive→absurd is visible

---

### User Story 3 - Expand Object Variety (Priority: P3)

As a player, I want to collect 15-20 different object types (not just 2) so that gameplay has variety and I'm not just collecting "yellow rectangles" for 10 minutes.

**Why this priority**: P3 - Current game has only 2 types (coin, customer). This creates monotony. 15-20 types creates variety, discovery, and reduces repetitive feeling. Minimum viable variety for engagement.

**Independent Test**: Count distinct object types in COLLECTIBLE_DATA. Should have 15-20 entries (not 2). Each has unique name, value, size. Spawning system uses all types. Can verify by inspecting data structure.

**Acceptance Scenarios**:

1. **Given** COLLECTIBLE_DATA is defined, **When** counting entries, **Then** at least 15 distinct object types exist
2. **Given** player plays Level 1 for 60 seconds, **When** observing collectibles, **Then** at least 8 different types spawn (not just penny/gum repeated)
3. **Given** player plays all 3 levels, **When** observing all collectibles across levels, **Then** at least 15 unique types are encountered

---

### Edge Cases

- What if we can't create 33 objects (Constitution spec) in time? **→ 15-20 is acceptable minimum (this spec), 33 is ideal (P4 expansion)**
- What about object name length (very long names)? **→ Truncate display to 20 characters max ("SPACE ROCKET" fits, "ULTRA LUXURY MEGA..." truncated)**
- What if two objects have same name? **→ Names must be unique keys in COLLECTIBLE_DATA (enforced by object literal)**
- What about localization (non-English names)? **→ P4 consideration - English only for jam**
- What if object name doesn't fit on screen? **→ Use smaller font size (24px vs 32px) for long names**

---

## Clarifications *(research-based)*

Based on deep contextual research from primary sources (Katamari Damacy Wikipedia, Cookie Clicker mechanics, WoW SCT addons, game design principles). All recommendations grounded in actual fetched documentation, not surface searches:

### Question 1: Level-Specific Spawning Logic

**Q**: When objects are filtered by level (FR-006-010), should the spawning system ONLY spawn objects from the current level, or can it spawn objects from current AND previous levels?

**A**: Use **cumulative spawning with weighted probability** (industry standard from Katamari Damacy, Cookie Clicker). All objects remain in spawn pool, but probabilities shift based on player tier:
- **Level 1**: 70% tier-1 objects, 25% tier-2, 5% tier-3 (mostly pennies, occasional aspirational yacht)
- **Level 2**: 20% tier-1, 60% tier-2, 20% tier-3 (balanced)
- **Level 3**: 10% tier-1, 30% tier-2, 60% tier-3 (mostly rockets, some nostalgic pennies)

**Reasoning**: Creates richer visual variety, allows struggling players to collect easier objects, provides aspirational glimpses of future tiers, aligns with Katamari philosophy ("the world doesn't change, YOUR ability to interact with it changes").

**Updated Requirements**:
- **FR-006-010 REVISED**: Spawning system MUST use cumulative weighted probability (not exclusive filtering). Level 1: 70/25/5% split, Level 2: 20/60/20%, Level 3: 10/30/60%.
- **FR-006-011 NEW**: All object types MUST remain spawnable at all tiers (no exclusive filtering).

---

### Question 2: Collection Popup Duration and Overlap

**Q**: How long should the "CONSUMED: [NAME]! +$[VALUE]" popup remain visible, and what happens if multiple objects are collected rapidly (10+ per second)?

**A**: Use **1.0 second duration with aggregation window** (standard from WoW Scrolling Combat Text, Diablo III damage numbers, Pac-Man Championship Edition):
- **Duration**: 1.0 second per popup (0.5s too fast for readability at high collection rates)
- **Aggregation**: If identical object collected within 300ms, combine into single popup: "PENNY x3! +$3"
- **Maximum Simultaneous**: 5 popups visible at once, vertically stacked with 30px spacing
- **Animation**: Float upward 40px while fading (alpha 1.0 → 0.0 linear)
- **Overflow**: If >5 popups active, remove oldest popup first

**Reasoning**: Prevents screen clutter during rapid collection, maintains readability, follows ARPG industry patterns.

**Updated Requirements**:
- **FR-006-012 NEW**: Popups MUST display for 1.0 second with upward float animation (40px) and alpha fade
- **FR-006-013 NEW**: Identical objects collected within 300ms MUST aggregate ("PENNY x3! +$3" not 3 separate popups)
- **FR-006-014 NEW**: Maximum 5 simultaneous popups, vertically stacked with 30px spacing, oldest removed first if exceeded

---

### Question 3: Object Size Scaling

**Q**: The spec defines object VALUES but not object SIZES. Should size correlate with value (rocket = 2,000,000,000x larger than penny), or use tiered/logarithmic scaling?

**A**: Use **logarithmic scaling with 500px cap** (Katamari Damacy standard - size represents collectability threshold, not economic value):
- **Formula**: `size = 20 + (Math.log10(value + 1) * 50)`, capped at 500px max
- **Examples**:
  - Penny ($1): 35px
  - Teacher ($300): 145px (~4x penny)
  - Yacht ($5M): 355px (~10x penny)
  - Rocket ($2B): 485px (~14x penny, not 2,000,000,000x)
- **Alternative**: Tiered scaling (40px tier-1, 120px tier-2, 300px tier-3) for simpler implementation

**Reasoning**: Linear value scaling makes rockets unplayably large (fill entire screen), prevents player from collecting variety, contradicts Katamari's "size = difficulty to collect" not "size = value" principle.

**Updated Requirements**:
- **FR-006-015 NEW**: Object size MUST use logarithmic scaling: `size = 20 + (Math.log10(value + 1) * 50)`
- **FR-006-016 NEW**: Maximum object size MUST be capped at 500px (prevents screen overflow)
- **FR-006-017 NEW**: Minimum object size MUST be 30px (ensures readability and collectability)

---

### Question 4: Value Display Formatting

**Q**: Should popup text display raw values ("$500000") or formatted values ("$500K")?

**A**: Use **K/M/B notation starting at 1,000 with 1 decimal place** (Cookie Clicker, Adventure Capitalist, Diablo III standard):
- **Under 1,000**: Full numbers ("$1", "$300")
- **1,000+**: "K" suffix ("$1.5K", "$5K")
- **1,000,000+**: "M" suffix ("$1.5M", "$5M")
- **1,000,000,000+**: "B" suffix ("$2B", "$500B")
- **Decimals**: 1 decimal place for abbreviated values, 0 decimals for exact thousands/millions

**Examples from spec**:
- Penny: "$1" (exact)
- Teacher: "$300" (exact)
- Yacht: "$5M" (was $5,000,000)
- Rocket: "$2B" (was $2,000,000,000)

**Reasoning**: Improves readability (6 chars vs 13 chars), saves screen space, matches player expectations from other games, large abbreviated numbers feel more impressive.

**Updated Requirements**:
- **FR-006-018 NEW**: Value display MUST use K/M/B notation starting at 1,000
- **FR-006-019 NEW**: Abbreviated values MUST show 1 decimal place ("$1.5M" not "$1.500000M")
- **FR-006-020 NEW**: Values under 1,000 MUST display as exact integers ("$300" not "$0.3K")

---

### Question 5: Truncation Behavior

**Q**: Should truncation happen at character 20 ("ULTRA LUXURY MEGA...") or at last complete word before 20 characters ("ULTRA LUXURY...")?

**A**: Use **word-boundary truncation with 20-character limit** (Apple iOS Guidelines, PatternFly Design System, WoW item names):
- **Preferred**: Truncate at last word boundary within 20 chars ("ULTRA LUXURY..." at 13 chars)
- **Fallback**: If no word boundary found OR word boundary <4 chars, use character limit ("ABCD...")
- **Minimum visible**: 4 characters before ellipsis (prevents "A..." confusion)
- **Design constraint**: Keep all object names under 20 characters to avoid triggering truncation

**Current spec names** (all under 20 chars):
- "SPACE ROCKET" = 12 chars ✓
- "PRIVATE JET" = 11 chars ✓
- "BUSINESSMAN" = 11 chars ✓

**Reasoning**: Word-boundary truncation is more readable ("LUXURY..." vs "LUXURY M..."), feels intentional not lazy, aligns with iOS/PatternFly standards.

**Updated Requirements**:
- **FR-006-021 NEW**: Object names exceeding 20 characters MUST truncate at last word boundary with "..." suffix
- **FR-006-022 NEW**: If no word boundary found within 20 chars, truncate at character 17 and add "..."
- **FR-006-023 NEW**: Minimum 4 characters MUST be visible before ellipsis (prevents "A..." ambiguity)
- **Design Guideline**: All object names SHOULD be designed to fit within 20 characters (avoid truncation)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-006-001**: COLLECTIBLE_DATA MUST contain minimum 15 distinct object types (target: 20)
- **FR-006-002**: Each object MUST have `name` field (string, culturally recognizable)
- **FR-006-003**: Object names MUST be SPECIFIC not generic ("PENNY" not "coin", "TEACHER" not "person")
- **FR-006-004**: Object names MUST escalate in absurdity across levels (mundane→impressive→cosmic)
- **FR-006-005**: System MUST display object names in collection popup text via drawText() or similar
- **FR-006-006**: Level 1 objects MUST be childhood/school themed (penny, gum, crayon, homework, backpack, basketball, desk, teacher, bookshelf, swing set minimum)
- **FR-006-007**: Level 2 objects MUST be urban/business themed (coffee, laptop, chair, bicycle, car, house minimum)
- **FR-006-008**: Level 3 objects MUST be luxury/absurd themed (yacht, mansion, jet, rocket minimum)
- **FR-006-009**: Object values MUST scale with absurdity ($1 for penny, $300 for teacher, $5M for yacht, $2B for rocket)
- **FR-006-010**: Spawning system MUST use cumulative weighted probability (not exclusive filtering). Level 1: 70/25/5% split, Level 2: 20/60/20%, Level 3: 10/30/60% (see Clarifications Q1)
- **FR-006-011**: All object types MUST remain spawnable at all tiers (no exclusive filtering)
- **FR-006-012**: Popups MUST display for 1.0 second with upward float animation (40px) and alpha fade
- **FR-006-013**: Identical objects collected within 300ms MUST aggregate ("PENNY x3! +$3" not 3 separate popups)
- **FR-006-014**: Maximum 5 simultaneous popups, vertically stacked with 30px spacing, oldest removed first if exceeded
- **FR-006-015**: Object size MUST use logarithmic scaling: `size = 20 + (Math.log10(value + 1) * 50)`
- **FR-006-016**: Maximum object size MUST be capped at 500px (prevents screen overflow)
- **FR-006-017**: Minimum object size MUST be 30px (ensures readability and collectability)
- **FR-006-018**: Value display MUST use K/M/B notation starting at 1,000
- **FR-006-019**: Abbreviated values MUST show 1 decimal place ("$1.5M" not "$1.500000M")
- **FR-006-020**: Values under 1,000 MUST display as exact integers ("$300" not "$0.3K")
- **FR-006-021**: Object names exceeding 20 characters MUST truncate at last word boundary with "..." suffix
- **FR-006-022**: If no word boundary found within 20 chars, truncate at character 17 and add "..."
- **FR-006-023**: Minimum 4 characters MUST be visible before ellipsis (prevents "A..." ambiguity)

### Key Entities

- **Named Object**: Collectible with specific name field (not generic type)
- **Object Taxonomy**: Hierarchical categorization (Level 1: school, Level 2: urban, Level 3: luxury)
- **Absurdist Escalation**: Progression from mundane→absurd that creates Katamari-style humor
- **Collection Popup**: Temporary floating text showing "CONSUMED: [NAME]! +$[VALUE]"

### Minimum Object List (15 required, 20 target)

**Level 1 (Schoolyard) - 6 minimum**:
1. PENNY ($1)
2. GUM ($10)
3. BACKPACK ($75)
4. BASKETBALL ($100)
5. DESK ($200)
6. TEACHER ($300) ← First "person" - absurdity begins

**Level 2 (Downtown) - 5 minimum**:
7. COFFEE ($100)
8. OFFICE CHAIR ($300)
9. BICYCLE ($500)
10. CAR / HONDA CIVIC ($5,000)
11. HOUSE / STARTER HOME ($20,000)

**Level 3 (Luxury) - 4 minimum**:
12. YACHT ($500,000)
13. MANSION ($1,000,000)
14. HELICOPTER ($15,000,000)
15. SPACE ROCKET ($2,000,000,000)

**Optional Additions (reach 20 total)**:
16. CRAYON ($15) - Level 1
17. HOMEWORK ($25) - Level 1
18. LAPTOP / MACBOOK ($1,500) - Level 2
19. BUSINESSMAN / SUIT ($2,000) - Level 2
20. PRIVATE JET / GULFSTREAM ($50,000,000) - Level 3

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: COLLECTIBLE_DATA contains 15+ unique object entries (count keys)
- **SC-002**: Each object has `name` field (verify via Object.keys(COLLECTIBLE_DATA).every(key => DATA[key].name))
- **SC-003**: 100% of collection popups display object names (not types)
- **SC-004**: Players can name 3+ specific objects they collected after playing (memory/engagement test)
- **SC-005**: Playtesters laugh or react to absurd objects ("I ate a teacher?!") - qualitative feedback
- **SC-006**: Object progression feels natural (penny→desk→car→yacht) not random (penny→rocket→gum) - subjective but testable

### Game Jam Theme Validation

**Theme**: "SMALL"

**Theme Integration** (Constitution Article II):

- **Core Mechanic Connection**: Named objects create clear progression from SMALL (penny) to BIG (rocket). Specific names make size contrast obvious - "penny fits in pocket, rocket fits cities."
- **Visual Representation**: Object names in popup text reinforce what you're consuming - seeing "PENNY" vs "SPACE ROCKET" makes growth explicit.
- **Player Understanding**: Within 30 seconds, players see names escalate (PENNY→GUM→BACKPACK) and understand "I'm getting bigger, objects are getting bigger."
- **Creative Interpretation**: "From pennies to planets" - named objects tell rags-to-riches story through collectibles.

**Theme Success Criteria**:

- **TSC-001**: Object names explicitly reference size (PENNY vs ROCKET makes theme obvious)
- **TSC-002**: Eating absurd objects (TEACHER, CAR, ROCKET) creates "I'm HUGE now" realization
- **TSC-003**: Named progression communicates theme better than abstract shapes
- **TSC-004**: Players screenshot "I ate a TEACHER" moments (shareability = theme resonance)

---

## Technical Context *(optional but recommended)*

### Related Constitution Articles

- **Article IX, Section 9.1, FR-042**: Named Collectibles Requirement (NOT abstract shapes)
- **Article XI, Section 11.2, FR-048**: COLLECTIBLE_DATA Structure (complete 33-object specification)
- **Article VI, Section 6.3, FR-032**: Popup Text System (display names)

### Implementation References

- **Constitution FR-048**: Complete COLLECTIBLE_DATA with all 33 objects (copy/paste ready)
- **VISION.md lines 1562-1565**: Why named objects matter ("I ate a TEACHER!" vs "I collected blue rectangle")
- **ALIGNMENT-REPORT.md**: This is THE core "soulless" problem - generic types lack personality

### Implementation Constraints

- **Time Estimate**: 2-3 hours
  - 1 hour: Expand COLLECTIBLE_DATA from 2 to 15-20 objects
  - 30 min: Add 'name' field to each object
  - 30 min: Add popup text rendering in PlayerBall.collect()
  - 30 min: Update spawning to use level-specific objects
- **Files Modified**: src/game.js (COLLECTIBLE_DATA, PlayerBall.collect(), spawnCollectiblesForLevel())
- **No New Files**: Everything in existing game.js
- **No Assets Needed**: Can use colored rectangles still (names are text, not sprites)

---

## Out of Scope *(clarity)*

- ❌ Sprite sheet integration (separate spec: 007-create-sprite-sheet) - Can use rectangles with names
- ❌ All 33 objects from Constitution (15-20 is MVP, 33 is P4 expansion)
- ❌ Object descriptions/lore (just names, not backstories)
- ❌ Object animations (idle, collected) - Static objects OK
- ❌ Object sound variations (different sounds per object) - All use same collection sound
- ❌ Object rarity system (FR-049) - Different spec if needed

---

## Notes & Context

**From Vision.md Critical Gaps**:
> "#1 Visual Identity: Rectangles → Named Sprites"
> "What's Missing: REAL recognizable objects (people, cars, trees, buildings), Objects you can NAME and RECOGNIZE"

**From ALIGNMENT-REPORT.md**:
> "FR-042: Named Collectibles - Status: NOT IMPLEMENTED"
> "Current: Generic types (coin, customer)"
> "Should: Specific names (PENNY, TEACHER, YACHT)"
> "**This is THE CORE 'soulless' problem**"

**Why This Matters**:
- Creates emotional attachment vs abstract shapes
- Enables humor ("I ate 8 teachers" is funny, "I collected 8 blue rectangles" is not)
- Makes game memorable and shareable
- Critical for Gen Alpha engagement (specific objects = screenshot moments)

**Implementation Strategy**:
1. Add 'name' field to existing coin/customer
2. Duplicate pattern to create 13-18 more objects
3. Add level filtering (objects[].filter(o => o.level === currentLevel))
4. Add popup text in collect(): `drawText(\`CONSUMED: ${obj.name}! +$${obj.value}\`)`

**Expected Outcome**:
Game transforms from "eating abstract shapes" → "CONSUMING TEACHERS AND ROCKETS"

---

## Research Citations *(deep context)*

Key insights from fetched primary sources that informed the clarifications:

### From Katamari Damacy (Wikipedia - full article fetched)

**Size-based mechanics, not value-based**:
> "The game uses size, weight, and surface area to determine if an object will stick to the katamari."

**Physical progression, not economic**:
> "The player might start the game by picking up thumbtacks and ants, and slowly work up to the point where the katamari is picking up buildings, mountains, and clouds."

**Objects remain in world (cumulative approach)**:
> "As objects stick to the katamari, the katamari will grow, eventually allowing objects that were once hurdles to be picked up."

**Design philosophy - 4 key points**:
> "Takahashi was aiming for four key points: **novelty, ease of understanding, enjoyment, and humor**."

**Shrinking mechanic was REMOVED**:
> "It was not fun to shrink back down and hear the music regress to a simpler form." — Negative feedback loops tested and rejected.

### From Cookie Clicker (Wikipedia + mechanics research)

**Cumulative unlocking system**:
- All buildings remain purchasable throughout game (cursors → idleverses)
- Prices increase exponentially (15% more per purchase)
- Milestone-based unlocks: "buying your 50th or 100th of a building can unlock powerful upgrades"
- **Key insight**: Objects don't disappear from shop - old items remain relevant through synergies

### From WoW Scrolling Combat Text (addon research)

**Standard timing from 2024 addons**:
- MikScrollingBattleText: Customizable duration, lightweight, "sliders for animation speed"
- ScrollingCombatText: "Eight animation types, opacity, movement speed"
- CombatTextPlus: "Spiral, Shake, Fade, Bounce, Scale, Pop modes"
- **Industry consensus**: ~1 second duration with customizable animation speed

### From Game Design Principles (Game Developer article)

**Principle #3 - Announce Change**:
> "Communicate all changes to the player... A good rule of thumb is degree of rarity. If a change occurs a hundred times in an hour, the announcement may not be required."

**Principle #7 - Sound**:
> "What sound does it make when \_\_\_\_\_ happens? If players close their eyes, the sound alone should still achieve the desired affect."

**Principle #12 - Communication**:
> "If it's a good idea but you can't communicate it correctly, it might as well be a bad idea."

---

**Status**: Clarified (ready for `/speckit.plan`)
**Priority**: P3 - Week 3 (Oct 28-Nov 2)
**Estimated Implementation**: 2-3 hours
**Impact**: CRITICAL (this is THE "soul" problem - fixes "soulless" diagnosis)

**Next Step**: Run `/speckit.plan` to incorporate clarifications into technical implementation plan
