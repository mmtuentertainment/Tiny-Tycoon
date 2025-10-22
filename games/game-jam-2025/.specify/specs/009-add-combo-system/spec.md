# Feature Specification: Combo Multiplier System

**Feature Branch**: `009-add-combo-system`
**Created**: October 17, 2025
**Status**: Draft
**Input**: User description: "Add combo system that tracks rapid collections (within 2-second window). Show combo popups (COMBO x3 🔥 GRINDSET ACTIVATED) and apply value multipliers (x1.5, x2.0, x3.0) for skilled play. Reset combo if no collection for 2 seconds."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Earn Combo Multipliers Through Skill (Priority: P3)

As a player, when I collect multiple objects quickly (3+ in 2 seconds), I want to see a combo popup and earn bonus value so that skilled movement is rewarded and I'm motivated to collect aggressively.

**Why this priority**: P3 (Polish) - Skill expression system. Rewards player mastery. Creates "one more run" motivation ("I can get higher combo this time"). Vision.md: "Combo system = skill expression, MORE DOPAMINE."

**Independent Test**: Collect 3 objects within 2 seconds. See "COMBO x3 🔥 GRINDSET ACTIVATED" popup. Next collections worth 1.5x value. Wait 2 seconds without collecting. Combo resets. Can test timing independently with stopwatch.

**Acceptance Scenarios**:

1. **Given** player collects 3 objects within 2-second window, **When** 3rd collection occurs, **Then** combo popup displays "COMBO x3 🔥 GRINDSET ACTIVATED" and valueMultiplier sets to 1.5
2. **Given** player collects 5 objects within combo window, **When** 5th collection occurs, **Then** combo popup displays "COMBO x5 ⚡ UNGOVERNABLE MODE" and valueMultiplier sets to 2.0
3. **Given** player collects 10 objects within combo window, **When** 10th collection occurs, **Then** combo popup displays "COMBO x10 💎 LEGENDARY CONSUMER" and valueMultiplier sets to 3.0
4. **Given** combo is active, **When** 2 seconds pass with no collection, **Then** combo resets to 0 and valueMultiplier returns to 1.0

---

### User Story 2 - See Combo Status Persistently (Priority: P3)

As a player, when I have an active combo, I want to see a combo counter on screen so that I know my current streak and am motivated to maintain it.

**Why this priority**: P3 - Visual feedback for active combo. Creates tension ("don't let it drop!") and awareness. Shows players the mechanic exists.

**Independent Test**: Build combo to x3. See "COMBO: x3" indicator in HUD (top-right or near score). Counter updates in real-time. Resets to hidden when combo drops. Can observe without other systems.

**Acceptance Scenarios**:

1. **Given** player has combo count >= 3, **When** HUD renders, **Then** displays "COMBO: x3" (or current count) in prominent position
2. **Given** combo count < 3, **When** HUD renders, **Then** combo indicator is hidden (don't show x0, x1, x2)
3. **Given** combo is active, **When** collecting object, **Then** combo counter updates immediately (no delay)
4. **Given** combo resets, **When** counter hits 0, **Then** indicator fades out or disappears (visual feedback of loss)

---

### User Story 3 - Feel Combo Value Multiplier (Priority: P3)

As a player, when I collect objects during active combo, I want to earn MORE value so that combos feel rewarding and I'm motivated to maintain them rather than collect slowly.

**Why this priority**: P3 - Multipliers create tangible benefit. Without value boost, combo is just visual (no gameplay impact). Multipliers reward skill with progression advantage.

**Independent Test**: Collect object worth $100 with no combo. Earn $100. Build combo to x3. Collect same $100 object. Earn $150 (1.5x multiplier). Value boost is measurable and significant.

**Acceptance Scenarios**:

1. **Given** player has combo x3 active (multiplier 1.5), **When** collecting $100 object, **Then** player earns $150 (100 × 1.5)
2. **Given** player has combo x5 active (multiplier 2.0), **When** collecting $100 object, **Then** player earns $200 (100 × 2.0)
3. **Given** player has combo x10 active (multiplier 3.0), **When** collecting $100 object, **Then** player earns $300 (100 × 3.0)
4. **Given** combo multiplier is applied, **When** score updates, **Then** HUD score display reflects multiplied value immediately

---

### Edge Cases

- What if player gets combo x10 in first 5 seconds (very skilled)? **→ Allow it! No artificial caps. Skill should be rewarded.**
- What if combo window is too generous (easy to maintain)? **→ 2 seconds is tested value, can tune if needed (1.5s harder, 3s easier)**
- What if multiple objects collected in same frame (cluster)? **→ Each collection increments combo separately (cluster = instant high combo)**
- What about combo across level transitions? **→ Reset combo when level ends (fresh start each level)**
- What if combo popup overlaps other UI? **→ Render combo popup above other text (higher z-order) with semi-transparent background**

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-009-001**: System MUST track combo count (integer, increments on each collection)
- **FR-009-002**: System MUST track time since last collection (float, resets on collection)
- **FR-009-003**: Combo window MUST be 2.0 seconds (per Constitution FR-050)
- **FR-009-004**: System MUST reset combo to 0 if timeSinceLastCollection > 2.0 seconds
- **FR-009-005**: System MUST display combo popup when combo reaches 3, 5, or 10
- **FR-009-006**: Combo x3 MUST set valueMultiplier to 1.5 (+50% value)
- **FR-009-007**: Combo x5 MUST set valueMultiplier to 2.0 (+100% value)
- **FR-009-008**: Combo x10 MUST set valueMultiplier to 3.0 (+200% value)
- **FR-009-009**: Object value MUST be multiplied before adding to score: `score += (value * valueMultiplier)`
- **FR-009-010**: Combo counter MUST display in HUD when combo >= 3 (hidden below 3)
- **FR-009-011**: Combo popups MUST use emojis (🔥, ⚡, 💎) per Constitution FR-050 examples
- **FR-009-012**: Combo state MUST reset when level ends or restarts

### Key Entities

- **Combo Count**: Integer tracking consecutive collections within window
- **Time Since Last Collection**: Float timer tracking gap between collections
- **Value Multiplier**: Float (1.0 to 3.0) applied to object values
- **Combo Popup**: Temporary large text showing combo milestone reached

### Combo Tier Definitions (From Constitution FR-050)

```
COMBO x3:  "COMBO x3 🔥 GRINDSET ACTIVATED"     → Multiplier: 1.5x
COMBO x5:  "COMBO x5 ⚡ UNGOVERNABLE MODE"      → Multiplier: 2.0x
COMBO x10: "COMBO x10 💎 LEGENDARY CONSUMER"   → Multiplier: 3.0x
```

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Combo counter increments correctly for each collection within 2-second window
- **SC-002**: Combo resets to 0 exactly 2.0 seconds after last collection (timing accuracy test)
- **SC-003**: Value multipliers apply correctly (collect $100 with x2 combo = $200 earned, verifiable in score)
- **SC-004**: Combo popups display at exactly 3, 5, 10 thresholds (not 4 or 6)
- **SC-005**: Skilled players achieve x10 combo regularly (indicates combo window is balanced)
- **SC-006**: Players report "combos make me want to play better" (engagement feedback)

### Game Jam Theme Validation

**Theme**: "SMALL"

**Theme Integration** (Constitution Article II):

- **Core Mechanic Connection**: Combo system rewards collecting many SMALL objects quickly to grow into BIG status faster. Encourages aggressive "consume everything" playstyle that embodies theme.
- **Visual Representation**: Combo popups use size progression language ("GRINDSET" → "UNGOVERNABLE" → "LEGENDARY CONSUMER" = growth metaphor)
- **Player Understanding**: Combo system is intuitive - collect fast = bonus. Theme of "small actions compounding into big results."
- **Creative Interpretation**: "Many small wins = big success" - startup/hustle culture narrative through mechanics.

**Theme Success Criteria**:

- **TSC-001**: Combo system encourages collecting SMALL objects rapidly (theme alignment)
- **TSC-002**: Multipliers accelerate growth (SMALL→BIG faster with skill)
- **TSC-003**: Combo language ("GRINDSET", "UNGOVERNABLE") reinforces entrepreneur theme
- **TSC-004**: System rewards "hustle" behavior = meta-thematic consistency

---

## Technical Context *(optional but recommended)*

### Related Constitution Articles

- **Article XI, Section 11.3, FR-050**: Combo System specification (exact thresholds and multipliers)
- **Article X, FR-045**: Compulsion Loop (combo adds to reward→investment loop)
- **Article IX, FR-041**: "It Factor" - Combo is part of Progression pillar

### Dependencies

- **Depends on**: PlayerBall.collect() method (Feature 001 - implemented)
- **Depends on**: Time tracking (LittleJS `time` global)
- **Depends on**: Value system (PlayerBall.score)
- **Optional**: Sound effect for combo milestones (can reuse tier-up sound or add new)

### Implementation Constraints

- **Time Estimate**: 2-3 hours
  - 1 hour: Add combo tracking variables and logic to PlayerBall
  - 1 hour: Implement combo popup rendering (large centered text, fades after 1.5s)
  - 30 min: Add combo counter to HUD
  - 30 min: Testing and tuning combo window timing
- **Files Modified**: src/game.js (PlayerBall class, gameUpdate() timer, gameRenderPost() HUD)
- **Performance**: Negligible (simple counter, no complex calculations)

---

## Out of Scope *(clarity)*

- ❌ Different combo tiers beyond x3/x5/x10 (e.g., x20, x50) - Three tiers sufficient
- ❌ Combo decay (multiplier slowly decreases) - Binary on/off is simpler
- ❌ Combo bonuses beyond value (speed boost, invincibility) - Just multiplier
- ❌ Combo leaderboards (highest combo achieved) - P4 social feature
- ❌ Combo achievements ("Reach x20 combo") - FR-052 not in scope
- ❌ Visual combo meter (progress bar) - Text counter sufficient

---

## Notes & Context

**From Vision.md Competitor Analysis**:
> "agar.io/slither.io - Simple controls, skill expression through movement"
> "Combo system = our unique twist on Katamari formula"

**From Constitution FR-050**:
> "Combo System (Skill Expression)"
> "Track collections within 2.0-second window"
> "Makes game more compelling through skill rewards"

**Why This Matters**:
- Skill expression = replayability ("I can beat my combo record")
- Variable rewards = dopamine (sometimes x1, sometimes x3 = exciting)
- Speedrun potential (combo mastery = optimization meta)
- Differentiation (most Katamari clones don't have combos)

**Implementation Note**:
This is PURE GAMEPLAY mechanic. No art, no assets, just:
- Counter variables (comboCount, timeSinceLastCollection)
- Multiplier math (value × multiplier)
- Popup text rendering (same system as collection popups)

**Expected Outcome**:
Skilled play feels MORE rewarding. "One more run" compulsion increases.

---

**Status**: Ready for `/speckit.plan`
**Priority**: P3 - Week 3 (Oct 28-Nov 2)
**Estimated Implementation**: 2-3 hours
**Impact**: MEDIUM (engagement boost, replayability)
