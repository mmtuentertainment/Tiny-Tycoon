# Feature Specification: Screen Shake Visual Feedback System

**Feature Branch**: `003-add-screen-shake-feedback`
**Created**: October 17, 2025
**Status**: Draft
**Input**: User description: "Add screen shake visual feedback that triggers on every object collection, with shake intensity proportional to object value. Bigger objects create dramatic screen shake, while small objects create subtle shake. Also add shake on tier-up events and level completion."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Feel Impact When Collecting Objects (Priority: P3)

As a player, when I collect an object, I want to FEEL the collection through screen shake so that each collection feels satisfying and rewarding, making me want to collect more objects.

**Why this priority**: P3 (Polish) - Core gameplay works, but lacks "juice" that makes it feel good. This is critical for "It Factor" per Constitution FR-041 and Vision.md research.

**Independent Test**: Play game, collect one penny (small value). Screen shakes subtly (0.05 power). Collect one teacher (medium value). Screen shakes noticeably (0.08 power). Collect one yacht (high value). Screen shakes dramatically (0.55 power). Feature delivers immediate tactile feedback without any other systems.

**Acceptance Scenarios**:

1. **Given** player collects object worth $1 (penny), **When** collection occurs, **Then** screen shakes with power 0.05 for subtle feedback
2. **Given** player collects object worth $300 (teacher), **When** collection occurs, **Then** screen shakes with power 0.08 for noticeable feedback
3. **Given** player collects object worth $5,000,000 (yacht), **When** collection occurs, **Then** screen shakes with power 0.55 for dramatic feedback
4. **Given** player collects object worth $2,000,000,000 (rocket), **When** collection occurs, **Then** screen shakes with power 2.05 for extreme feedback

---

### User Story 2 - Celebrate Tier-Up Moments (Priority: P3)

As a player, when I cross a size tier threshold and unlock new collectibles, I want a BIG screen shake celebration so that tier-ups feel like major achievements and reward my progress.

**Why this priority**: P3 - Enhances progression feedback. Tier-ups are major milestones that should feel MORE significant than regular collections.

**Independent Test**: Manually trigger tier-up event (cross threshold from 0.9 to 1.1 size). Screen shakes with fixed power 0.3 for medium celebration shake. Visually distinct from collection shakes.

**Acceptance Scenarios**:

1. **Given** player reaches tier threshold (e.g., 1.0x size for "SIDE HUSTLE" tier), **When** tier-up occurs, **Then** screen shakes with fixed power 0.3 (medium intensity)
2. **Given** player crosses multiple tier thresholds rapidly, **When** each tier-up occurs, **Then** each triggers independent screen shake (no stacking limit)

---

### User Story 3 - Amplify Victory/Defeat Moments (Priority: P3)

As a player, when I complete a level or fail, I want the screen shake to punctuate the moment so that victory feels triumphant and defeat feels conclusive.

**Why this priority**: P3 - Enhances win/lose feedback. These are session-ending moments that should have strong punctuation.

**Independent Test**: Trigger level complete condition. Screen shakes with power 0.5 (large shake). Trigger level defeat. Screen could shake or not (defeat is already punishing). Can test independently without any collection mechanics.

**Acceptance Scenarios**:

1. **Given** player reaches target size before timer expires, **When** victory condition triggers, **Then** screen shakes with fixed power 0.5 (large celebration)
2. **Given** timer expires before reaching target, **When** defeat condition triggers, **Then** no screen shake occurs (defeat is already negative feedback)

---

### Edge Cases

- What happens when multiple collections occur in same frame (e.g., player hits cluster)? **→ Shake values should accumulate (additive), not override**
- How does shake interact with camera follow system? **→ Shake is additive to camera position, doesn't break following**
- What if shake power exceeds reasonable limits (e.g., 10.0)? **→ Clamp maximum shake to 2.5 to prevent nausea/disorientation**
- What about accessibility (motion sensitivity)? **→ P4 consideration - add setting to disable/reduce shake intensity**

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-030-001**: System MUST trigger screen shake on every collectible collection event
- **FR-030-002**: Screen shake power MUST be calculated as: `BASE_SHAKE + (objectValue * VALUE_MULTIPLIER)` where BASE_SHAKE=0.05, VALUE_MULTIPLIER=0.0001
- **FR-030-003**: Screen shake power MUST be clamped to maximum 2.5 AFTER accumulation of all same-frame shakes (prevent excessive shaking)
- **FR-030-004**: System MUST trigger fixed screen shake (power 0.3) on tier-up events
- **FR-030-005**: System MUST trigger fixed screen shake (power 0.5) on level victory events when levelState changes to STATE.VICTORY (on victory screen display)
- **FR-030-006**: System MUST NOT trigger screen shake on defeat events (negative moment)
- **FR-030-007**: Screen shake MUST use LittleJS built-in `cameraShake` global variable with default decay curve (~0.5s to zero) for all shake types
- **FR-030-008**: Multiple shakes in same frame MUST accumulate (additive), not override
- **FR-030-009**: When collection triggers tier-up, both collection shake AND tier-up shake MUST fire (additive)

### Key Entities

- **Collection Event**: Triggered when PlayerBall.collect() is called successfully
- **Tier-Up Event**: Triggered when PlayerBall.onTierUp() is called (crossing size threshold)
- **Victory Event**: Triggered when levelState changes to STATE.VICTORY
- **cameraShake Variable**: LittleJS global (float) that controls camera offset randomization

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of collection events trigger screen shake with correct power calculation
- **SC-002**: Screen shake power scales linearly with object value (verifiable via console logging)
- **SC-003**: Tier-up shake (0.3) is visually MORE intense than average collection shake (~0.08)
- **SC-004**: Victory shake (0.5) is visually MORE intense than tier-up shake (0.3)
- **SC-005**: Players report game "feels more satisfying" in playtesting (qualitative feedback)
- **SC-006**: No performance degradation (maintains 60 FPS with shake active)

### Game Jam Theme Validation

**Theme**: "SMALL"

**Theme Integration** (Constitution Article II - Theme Requirements):

- **Core Mechanic Connection**: Screen shake emphasizes GROWTH from SMALL to BIG - subtle shake when small, dramatic shake when big. Reinforces exponential progression theme.
- **Visual Representation**: Visual feedback scales with player's business empire size - small entrepreneur = small reactions, tycoon = massive reactions.
- **Player Understanding**: Within 30 seconds, players FEEL the difference between collecting small object (gentle) vs large object (intense), reinforcing theme.
- **Creative Interpretation**: "Bigger impact as you grow" - screen shake is metaphor for market disruption scale.

**Theme Success Criteria**:

- **TSC-001**: Players can FEEL size progression through shake intensity differences
- **TSC-002**: Shake scaling creates visceral understanding of "SMALL → BIG" growth
- **TSC-003**: First-time players notice shake increases as they grow (observable in playtesting)
- **TSC-004**: Shake contributes to overall "starting small, ending massive" theme coherence

---

## Clarifications

### Question 1: Shake Duration and Decay
**Q**: The spec mentions LittleJS dampens shake "over ~0.5 seconds" - should all shake types (collection, tier-up, victory) use the same decay curve, or should bigger events have longer-lasting shake?

**A**: Use LittleJS default decay for all (simpler implementation). The intensity difference is sufficient to distinguish event types; duration should remain consistent for predictable feel.

**Updated Requirement**: FR-030-007 clarified - "All shake events MUST use default LittleJS decay curve (~0.5s to zero), regardless of shake power"

---

### Question 2: Simultaneous Shake Accumulation Cap
**Q**: FR-030-008 says shakes accumulate additively, and FR-030-003 clamps max to 2.5. If player collects 100 small objects in one frame (each 0.05), should we clamp at 2.5 total, or should the formula prevent this scenario differently?

**A**: Clamp at 2.5 total after accumulation. Edge case unlikely in practice (max ~50 collectibles spawn, player can't hit all simultaneously). Simple post-accumulation clamp is correct approach.

**Updated Requirement**: FR-030-003 clarified - "Maximum shake of 2.5 MUST apply AFTER accumulation of all same-frame shakes"

---

### Question 3: Tier-Up During Collection
**Q**: If player collects an object that simultaneously triggers a tier-up, should both shakes fire (collection 0.05 + tier-up 0.3 = 0.35 total), or should tier-up override collection?

**A**: Both fire (additive). Tier-up IS a major moment and deserves the combined intensity. Collecting the object that unlocks new tier should feel EXTRA satisfying.

**Updated Requirement**: FR-030-009 added - "When collection triggers tier-up, both collection shake AND tier-up shake MUST fire (additive)"

---

### Question 4: Victory Shake Timing
**Q**: Should victory shake (0.5) trigger immediately when size threshold reached, or when victory screen/animation begins? Could there be a delay between reaching goal and victory state change?

**A**: Trigger on STATE.VICTORY change (when victory screen displays). Immediate feedback tied to UI moment, not invisible threshold crossing. Player sees "VICTORY" text → shake happens.

**Updated Requirement**: FR-030-005 clarified - "Victory shake MUST trigger when levelState changes to STATE.VICTORY (on victory screen display), not when size threshold reached"

---

### Question 5: Shake Values Justification
**Q**: The shake power formula `0.05 + (objectValue * 0.0001)` produces specific values (penny=0.05, yacht=0.55, rocket=2.05). Were these values playtested, or should they be tunable constants for iteration?

**A**: Values are from research/estimation and should be implemented as named constants for easy tuning. Allow adjustment during playtesting if feedback feels too weak or too strong. Document final values after testing.

**Updated Requirement**: Added to Technical Context - "Shake formula constants (BASE_SHAKE=0.05, VALUE_MULTIPLIER=0.0001) SHOULD be defined as named constants in code. MAY be adjusted during playtesting. Document final values in code comments with rationale."

---

## Technical Context *(optional but recommended)*

### Related Constitution Articles

- **Article III, Section 3.1, FR-030**: Screen Shake System specification
- **Article VI, Section 6.3**: Visual Feedback ("Juice") requirements
- **Article IX, Section 9.1, FR-041**: "It Factor" formula (Juice pillar)

### Dependencies

- **Depends on**: PlayerBall.collect() method (implemented in Feature 001)
- **Depends on**: Victory/defeat state changes (implemented in Feature 002)
- **Integrates with**: LittleJS camera system (built-in, always available)

### Implementation Constraints

- **Time Estimate**: 30 minutes to 1 hour (very simple - one-line additions)
- **Files Modified**: src/game.js (PlayerBall.collect(), onTierUp(), victory/defeat handlers)
- **No New Files**: Uses existing LittleJS `cameraShake` global
- **No Dependencies**: Zero external libraries, pure LittleJS built-in
- **Constants**: Define BASE_SHAKE=0.05, VALUE_MULTIPLIER=0.0001 as named constants. MAY be adjusted during playtesting. Document final values in code comments with rationale.

---

## Out of Scope *(clarity on what this feature will NOT include)*

- ❌ Customizable shake intensity (settings UI) - P4 post-jam
- ❌ Accessibility options (disable shake) - P4 post-jam
- ❌ Different shake patterns (horizontal-only, vertical-only) - Not needed
- ❌ Shake on bounce (when too small to collect) - Not in spec, can add later
- ❌ Shake on timer warning - Different feature (FR-014 enhancement)

---

## Notes & Context

**From Vision.md Research**:
> "Game feel/juice - Screen shake on EVERY action. This is THE difference between mechanically solid and emotionally engaging."

**From LittleJS Jam Winners Analysis**:
> "204Snake! (1st place), GATOR (2nd place) - Common factor: Screen shake, particles, sound on every action."

**Why This Matters**:
- Transforms "collecting shapes" → "ABSORBING objects with IMPACT"
- Zero performance cost (LittleJS handles shake in camera matrix)
- Highest satisfaction-to-effort ratio (1 hour work = 10x better feel)
- Critical for winning jam (polish separates good from great)

**Implementation Note**:
LittleJS `cameraShake` is a simple float that adds random offset to camera position. Set it to desired power, engine automatically dampens it to zero over ~0.5 seconds. Can be set multiple times per frame (values accumulate).

---

**Status**: Ready for `/speckit.plan`
**Priority**: P3 - Week 3 (Oct 28-Nov 2)
**Estimated Implementation**: 30-60 minutes
**Impact**: HIGH (biggest "juice" improvement for minimal effort)
