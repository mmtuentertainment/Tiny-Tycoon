# Feature Specification: Named Collectibles with Personality

**Feature Branch**: `006-add-named-collectibles`
**Created**: October 17, 2025
**Status**: Draft
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
- **FR-006-010**: Spawning system MUST select from level-appropriate objects only (Level 1 doesn't spawn yachts)

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

**Status**: Ready for `/speckit.plan`
**Priority**: P3 - Week 3 (Oct 28-Nov 2)
**Estimated Implementation**: 2-3 hours
**Impact**: CRITICAL (this is THE "soul" problem - fixes "soulless" diagnosis)
