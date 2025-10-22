# Feature Specification: Consumption Log & Victory Stats

**Feature Branch**: `008-add-consumption-log`
**Created**: October 17, 2025
**Status**: Draft
**Input**: User description: "Add consumption tracking system that logs what objects player collected during level. Display detailed stats on victory screen: list of consumed objects with counts, 'Most Cursed' stat for eating people, total objects, grindset level rating. Make victory screen screenshot-worthy."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See What I Consumed (Priority: P3)

As a player, when I complete a level, I want to see a detailed list of what I ate so that I can remember specific moments ("I ate 8 teachers!") and feel proud/amused by my consumption spree.

**Why this priority**: P3 (Polish) - Creates memory and narrative. "What did I eat?" is core Katamari question. List transforms abstract score into concrete story. Critical for shareability per Vision.md.

**Independent Test**: Play level, collect: 12 pennies, 5 gum, 3 backpacks, 1 desk. Trigger victory. Screen shows: "YOU CONSUMED: 🪙 12 Pennies, 🍬 5 Gum, 🎒 3 Backpacks, 🪑 1 Desk". Counts are accurate. Can verify by manual counting.

**Acceptance Scenarios**:

1. **Given** player collects 12 pennies and 5 gum during level, **When** victory screen displays, **Then** consumption log shows "🪙 12 Pennies" and "🍬 5 Gum" with correct counts
2. **Given** player collects mix of objects, **When** victory screen shows consumption log, **Then** objects are sorted by count (most consumed first) or by size (smallest to largest)
3. **Given** player collects same object multiple times, **When** logging, **Then** counts are aggregated (not "PENNY, PENNY, PENNY" but "3 Pennies")
4. **Given** player collects object with emoji icon, **When** displaying, **Then** emoji renders correctly in supported browsers

---

### User Story 2 - Highlight Absurd Moments (Priority: P3)

As a player, when I eat absurd objects (people, vehicles, buildings), I want the victory screen to call attention to these moments so that the humor is emphasized and I want to share screenshots.

**Why this priority**: P3 - "Most Cursed: Ate 8 people" stat creates shareable moment. Highlighting absurdity (eating teachers, cars, rockets) is the CORE Katamari humor. Makes victory screen memorable.

**Independent Test**: Collect 8 teachers, 3 cars, 1 rocket. Victory screen shows: "Most Cursed: Ate 8 people" or "Biggest Flex: SPACE ROCKET". These callouts are MORE prominent than regular stats. Screenshot-worthy.

**Acceptance Scenarios**:

1. **Given** player consumes any "person" object (teacher, businessman, CEO), **When** victory screen displays, **Then** shows "Most Cursed: Ate X people" stat if count > 0
2. **Given** player consumes highest-value object in level, **When** victory displays, **Then** shows "Biggest Flex: [object name]" highlighting most impressive consumption
3. **Given** player consumes unusual combination (e.g., 20 of same object), **When** victory displays, **Then** shows interesting stat about it ("Hoarder: 20 Basketballs collected")

---

### User Story 3 - Grindset Level Rating (Priority: P3)

As a player, when I complete a level, I want to see a "grindset level" rating based on my performance so that I get categorical feedback (not just numbers) and want to achieve higher ratings.

**Why this priority**: P3 - Categorical ratings (UNCOMMON, RARE, LEGENDARY) are more satisfying than raw scores. Creates goal ("I want to get LEGENDARY grindset!"). Ties into Gen Alpha "sigma grindset" meme culture.

**Independent Test**: Complete level with minimal score (just barely win). Get "COMMON GRINDSET" rating. Complete level with high score (2x target). Get "LEGENDARY GRINDSET" rating. Rating tiers are clear and motivating.

**Acceptance Scenarios**:

1. **Given** player completes level with score 0-50% above target, **When** victory displays, **Then** shows "COMMON GRINDSET" rating
2. **Given** player completes level with score 50-100% above target, **When** victory displays, **Then** shows "UNCOMMON GRINDSET" rating
3. **Given** player completes level with score 100-200% above target, **When** victory displays, **Then** shows "RARE GRINDSET" rating
4. **Given** player completes level with score 200%+ above target, **When** victory displays, **Then** shows "LEGENDARY GRINDSET" rating

---

### Edge Cases

- What if player collects zero objects but somehow wins? **→ Show "MINIMAL GRINDSET - Efficiency%" (edge case humor)**
- What if consumption log has 50+ object types? **→ Show top 10 most-consumed, "...and X more" for rest**
- What about text overflow on small screens? **→ Use scrollable area or multi-column layout**
- What if object name is very long? **→ Truncate to 20 characters with "..."**
- What about emoji support in all browsers? **→ Fallback to text symbols if emoji fails ("*" instead of "🪙")**

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-008-001**: System MUST track consumption counts during level in `consumptionLog` object (key: objectType, value: count)
- **FR-008-002**: PlayerBall.collect() MUST increment consumptionLog[obj.type] on each collection
- **FR-008-003**: Victory screen MUST display consumption log with format "🪙 X [ObjectName]" per type
- **FR-008-004**: Consumption log MUST sort entries by count descending (most consumed first)
- **FR-008-005**: System MUST identify "person" objects (teacher, businessman, CEO) and show "Most Cursed: Ate X people" if any consumed
- **FR-008-006**: System MUST identify highest-value consumed object and show "Biggest Flex: [name]"
- **FR-008-007**: System MUST calculate grindset rating based on score thresholds: 0-50% above target = COMMON, 50-100% = UNCOMMON, 100-200% = RARE, 200%+ = LEGENDARY
- **FR-008-008**: Consumption log MUST reset when starting new level (don't carry across levels)
- **FR-008-009**: Victory screen MUST display total objects consumed (sum of all log counts)
- **FR-008-010**: Text rendering MUST use multi-line layout for readability (max 80 chars per line)

### Key Entities

- **Consumption Log**: Object tracking { objectType: count } for current level
- **Grindset Rating**: Categorical performance measure (COMMON, UNCOMMON, RARE, LEGENDARY)
- **Most Cursed Stat**: Count of "person" objects consumed (teacher + businessman + CEO)
- **Biggest Flex**: Highest-value object consumed in level

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Consumption counts are 100% accurate (verifiable by manual counting during play)
- **SC-002**: "Most Cursed" stat shows correct people count (e.g., 3 teachers + 2 businessmen = "Ate 5 people")
- **SC-003**: "Biggest Flex" correctly identifies highest-value object consumed
- **SC-004**: Grindset ratings are consistent with thresholds (150% above target always = RARE)
- **SC-005**: Players screenshot victory screens to share (social media engagement indicator)
- **SC-006**: Victory screen is readable in 5 seconds (not information overload)

### Game Jam Theme Validation

**Theme**: "SMALL"

**Theme Integration** (Constitution Article II):

- **Core Mechanic Connection**: Consumption log SHOWS progression from SMALL (pennies) to BIG (rockets) through concrete list of objects consumed.
- **Visual Representation**: List format creates visual hierarchy - small objects at top, big objects at bottom (or sorted by count).
- **Player Understanding**: Within 5 seconds of seeing victory screen, players understand "I started with pennies, ended with rockets" = SMALL→BIG theme.
- **Creative Interpretation**: "Your consumption history is your growth story" - log is narrative of ascent from SMALL to BIG.

**Theme Success Criteria**:

- **TSC-001**: Consumption log explicitly lists size progression (penny→teacher→car→yacht)
- **TSC-002**: "Biggest Flex" stat highlights maximum size achieved (theme endpoint)
- **TSC-003**: Object variety in log demonstrates exponential growth (10 types = grew through many scales)
- **TSC-004**: Grindset ratings reinforce "small beginnings → big outcomes" narrative

---

## Technical Context *(optional but recommended)*

### Related Constitution Articles

- **Article IX, FR-051**: Consumption Log specification
- **Article XI, FR-048**: COLLECTIBLE_DATA (provides object names for display)
- **Article IX, FR-043**: Gen Alpha language (affects stat descriptions)

### Dependencies

- **Depends on**: Named collectibles (Spec 006) - Needs object.name field for display
- **Depends on**: Victory screen state (Feature 002 - implemented)
- **Depends on**: LittleJS drawText() for multi-line rendering
- **Optional**: Emoji support (browser-dependent, can fallback to text)

### Implementation Constraints

- **Time Estimate**: 2 hours
  - 30 min: Add consumptionLog tracking to PlayerBall
  - 30 min: Increment log in collect() method
  - 1 hour: Render log on victory screen with formatting
- **Files Modified**: src/game.js (PlayerBall class, gameRenderPost() victory section)
- **Data Structure**: Simple object literal { penny: 12, teacher: 3, ... }

---

## Out of Scope *(clarity)*

- ❌ Historical logs across sessions (persistence) - Single level only
- ❌ Comparison with previous runs ("You improved by X") - No persistence yet
- ❌ Global leaderboards (highest consumption counts) - P4 social feature
- ❌ Detailed breakdowns (value per object type) - Keep simple
- ❌ Graphs/charts of consumption - Text list sufficient
- ❌ "Weirdest consumption" AI analysis - Predetermined stats only

---

## Notes & Context

**From Vision.md Critical Gaps**:
> "#5 Shareability: Forgettable → Consumption logs + Victory stats + Absurd moments"
> "Makes game memorable. Difference between 'I played it' and 'I need to show my friend'"

**From ALIGNMENT-REPORT.md**:
> "FR-051: Consumption Log - Status: NOT IMPLEMENTED"
> "Missing: No memorable stats, no shareable moments"

**Why This Matters**:
- Creates MEMORY ("I ate 8 teachers" is memorable, "$500 score" is not)
- Creates STORIES ("Most cursed run: consumed 12 people")
- Creates SHAREABILITY (screenshot victory stats, post to social media)
- Transforms abstract score → concrete narrative

**Implementation Strategy**:
1. Add `this.consumptionLog = {}` to PlayerBall constructor
2. In collect(): `this.consumptionLog[obj.type] = (this.consumptionLog[obj.type] || 0) + 1`
3. In victory screen: Loop through consumptionLog, render each entry
4. Calculate "Most Cursed" by counting person-type objects
5. Find "Biggest Flex" by tracking max-value object consumed

**Expected Outcome**:
Victory screen transforms from boring stats → screenshot-worthy moments.

---

**Status**: Ready for `/speckit.plan`
**Priority**: P3 - Week 3 (Oct 28-Nov 2)
**Estimated Implementation**: 2 hours
**Impact**: HIGH (shareability = virality potential)
