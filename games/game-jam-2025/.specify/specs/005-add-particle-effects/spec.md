# Feature Specification: Particle Effects System

**Feature Branch**: `005-add-particle-effects`
**Created**: October 17, 2025
**Status**: Draft
**Input**: User description: "Add particle burst effects on every object collection using LittleJS ParticleEmitter. Particle count and size should scale with object value. Create visual celebration with yellow/orange particles that burst outward and fade."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See Visual Burst on Collection (Priority: P3)

As a player, when I collect an object, I want to see colorful particles burst from the object's position so that collections feel visually satisfying and I get immediate visual feedback.

**Why this priority**: P3 (Polish) - Visual feedback is critical for "game feel." Particles make each collection an EVENT rather than silent disappearance. Vision.md research: "Particles on EVERY action separates good from great."

**Independent Test**: Collect one penny. See 10-20 yellow/orange particles burst outward from penny position, fade out over 0.5 seconds. No other systems needed - pure visual feedback test.

**Acceptance Scenarios**:

1. **Given** player collects small object ($1-$100), **When** collection occurs, **Then** 10-20 particles burst from object position
2. **Given** player collects medium object ($100-$10K), **When** collection occurs, **Then** 20-30 particles burst from object position
3. **Given** player collects large object ($10K+), **When** collection occurs, **Then** 30-50 particles burst from object position
4. **Given** particles are emitted, **When** 0.5 seconds pass, **Then** all particles have faded to transparent and been destroyed

---

### User Story 2 - Massive Celebration on Tier-Up (Priority: P3)

As a player, when I cross a tier threshold, I want to see a BIG particle explosion with MORE particles and different colors so that tier-ups feel MORE special than regular collections.

**Why this priority**: P3 - Tier-ups are major milestones. Need visual distinction from regular collections (not just "more of same"). Rainbow/golden particles signal achievement.

**Independent Test**: Manually trigger tier-up. See 100 particles burst from player position (5x more than collection). Rainbow colors or golden particles. Lasts longer (1.0 second vs 0.5). Visually MUCH more impressive than collection burst.

**Acceptance Scenarios**:

1. **Given** player crosses tier threshold, **When** tier-up triggers, **Then** 100 particles emit from player center
2. **Given** tier-up particles emit, **When** animation plays, **Then** particles use golden/rainbow colors (different from yellow/orange collection particles)
3. **Given** tier-up particles emit, **When** animation completes, **Then** particles fade over 1.0 second (2x longer than collection particles)

---

### User Story 3 - Magnetic Pull Visual Indicator (Priority: P3)

As a player, when objects are being magnetically pulled toward me, I want to see subtle particle trails or glow effects so that I understand the magnetic system is working and anticipate collection.

**Why this priority**: P3 - Makes invisible magnetic force VISIBLE. Helps players understand mechanic. Creates anticipation before collection (dopamine trigger per Vision.md research).

**Independent Test**: Approach object that's in magnetic range (player is 90%+ of threshold). Object should shimmer or emit trail particles as it moves toward player. Visual confirms "I'm about to collect this."

**Acceptance Scenarios**:

1. **Given** object is within magnetic range AND player is 90%+ of size threshold, **When** object is pulled toward player, **Then** object emits 1-2 trail particles per frame along movement path
2. **Given** object exits magnetic range, **When** magnetic pull stops, **Then** trail particles stop emitting (cleanup)
3. **Given** object is collected, **When** collection occurs, **Then** trail particles immediately stop (don't continue during absorption)

---

### Edge Cases

- What if 50 objects are collected simultaneously (big cluster)? **→ Limit particle emission to 500 total particles on screen (LittleJS handles 100K+ but conservative limit)**
- What if particles overlap and cause visual clutter? **→ Use additive blending for glow effect, particles fade quickly (0.5s max lifespan)**
- What about performance with many particles? **→ Constitution FR-021: Must maintain 60 FPS. If FPS drops, reduce particle count per emission**
- What if player is colorblind? **→ P4 consideration - particles use high-contrast yellow/orange (works for most colorblind types)**
- What about particle cleanup? **→ LittleJS auto-destroys particles after lifespan, no manual cleanup needed**

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-005-001**: System MUST emit particles on every collection event using LittleJS ParticleEmitter
- **FR-005-002**: Particle count MUST scale with object value: small (10-20), medium (20-30), large (30-50)
- **FR-005-003**: Collection particles MUST use yellow→orange color gradient (start: rgb(1,1,0), end: rgb(1,0.5,0))
- **FR-005-004**: Collection particles MUST fade over 0.5 seconds lifespan
- **FR-005-005**: Collection particles MUST emit from collectible.pos (object position)
- **FR-005-006**: Collection particles MUST spread in 180° cone (PI radians) for outward burst effect
- **FR-005-007**: Tier-up particles MUST emit 100 particles from player.pos
- **FR-005-008**: Tier-up particles MUST use golden/rainbow colors (different from collection)
- **FR-005-009**: Tier-up particles MUST fade over 1.0 seconds (2x longer than collection)
- **FR-005-010**: Magnetic trail particles MUST emit 1-2 per frame when object.magnetActive === true
- **FR-005-011**: All particles MUST use tile(48, 16) sprite (sparkle) or undefined for colored circles
- **FR-005-012**: System MUST maintain 60 FPS with up to 500 particles on screen (performance requirement)

### Key Entities

- **ParticleEmitter**: LittleJS built-in class that spawns particle effects
- **Particle**: Individual particle instance with position, velocity, color, size, lifespan
- **Collection Event**: Triggers particle burst when PlayerBall.collect() succeeds
- **Tier-Up Event**: Triggers large particle explosion when size threshold crossed
- **Magnetic Active State**: Boolean on Collectible indicating magnetic pull is active

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of collection events trigger particle bursts (no silent collections)
- **SC-002**: Particle count correlates with object value (observable: small object = few particles, large object = many particles)
- **SC-003**: Tier-up explosions are visually MORE impressive than collection bursts (subjective but testable in playtesting)
- **SC-004**: Game maintains 60 FPS with 200+ collectibles and active particles (performance test)
- **SC-005**: Particles fade smoothly without pop-in/pop-out artifacts (visual quality test)
- **SC-006**: Players report "game looks way better" in playtesting (qualitative feedback)

### Game Jam Theme Validation

**Theme**: "SMALL"

**Theme Integration** (Constitution Article II):

- **Core Mechanic Connection**: Particle burst SIZE scales with object value - SMALL objects = small bursts, BIG objects = huge explosions. Visual scaling reinforces SMALL→BIG theme.
- **Visual Representation**: Particle density/count creates visual hierarchy matching theme (few particles = small impact, many particles = big impact).
- **Player Understanding**: Within 30 seconds, players see particle bursts grow from subtle (penny) to dramatic (rocket), reinforcing exponential growth.
- **Creative Interpretation**: "Your impact on the world grows" - particle explosions are visual metaphor for business disruption scale.

**Theme Success Criteria**:

- **TSC-001**: Particle burst size visibly increases as player grows and collects larger objects
- **TSC-002**: First collection (penny) vs last collection (rocket) have dramatically different particle counts
- **TSC-003**: Tier-up explosions signal "you've grown to next tier" without text explanation
- **TSC-004**: Particles enhance rather than obscure theme (don't clutter screen)

---

## Technical Context *(optional but recommended)*

### Related Constitution Articles

- **Article VI, Section 6.3, FR-031**: Particle System Specification (exact parameters)
- **Article III, Section 3.1**: Katamari Mechanics (defines collection events)
- **Article IX, FR-041**: "It Factor" formula (Juice pillar)

### Dependencies

- **Depends on**: PlayerBall.collect() method (Feature 001 - implemented)
- **Depends on**: Collectible.update() for magnetic state (Feature 001 - implemented)
- **Depends on**: LittleJS ParticleEmitter class (built-in, always available)
- **Optional dependency**: Sprite tile 48 for sparkle sprite (can use undefined for colored circles)

### Implementation Constraints

- **Time Estimate**: 1-2 hours
- **Files Modified**: src/game.js (PlayerBall.collect(), PlayerBall.onTierUp(), Collectible.update())
- **Performance**: Must maintain 60 FPS (Constitution FR-021)
- **Asset Budget**: No file size impact (particles are code-based, optional sprite reuses existing sheet)

### LittleJS ParticleEmitter API

```javascript
new ParticleEmitter(
    pos,              // vec2: Emission position
    angle,            // float: Emission angle (0 = up, PI = down)
    emitSize,         // float: Emission cone size
    emitTime,         // float: How long to emit (seconds)
    emitRate,         // float: Particles per second (or total if emitTime used)
    emitConeAngle,    // float: Cone spread angle (PI = 180°)
    tileInfo,         // tile() or undefined: Particle sprite
    colorStartA,      // Color: Initial color
    colorStartB,      // Color: Initial color variation
    colorEndA,        // Color: Final color
    colorEndB,        // Color: Final color variation
    particleTime,     // float: Particle lifespan (seconds)
    sizeStart,        // float: Initial size
    sizeEnd,          // float: Final size
    speed,            // float: Emission speed
    angleVelocity,    // float: Particle rotation speed
    damping,          // float: Velocity damping (0-1)
    angleDamping,     // float: Angular damping (0-1)
    gravityScale,     // float: Gravity effect (0 = none)
    particleConeAngle,// float: Individual particle cone
    fadeRate          // float: Alpha fade rate
);
```

---

## Out of Scope *(final clarity)*

- ❌ Particle customization UI (settings) - P4
- ❌ Different particle shapes (stars, hearts, coins) - Not needed, simple sparkles sufficient
- ❌ Particle trails behind player (constant emission) - Could add but not in this spec
- ❌ Particle physics interactions (particles collide with objects) - Overkill
- ❌ Particle lighting effects (glow, bloom) - LittleJS additive blending is sufficient

---

**Status**: Ready for `/speckit.plan`
**Priority**: P3 - Week 3 (Oct 28-Nov 2)
**Estimated Implementation**: 1-2 hours
**Impact**: HIGH (visual celebration transforms game feel)
