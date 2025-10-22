# Implementation Plan: Particle Effects System

**Branch**: `005-add-particle-effects` | **Date**: October 17, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `.specify/specs/005-add-particle-effects/spec.md`

## Summary

Add particle burst effects on every object collection using LittleJS ParticleEmitter. Particle count scales logarithmically with object value (10-70 particles), creating visual celebration that transforms game feel. Includes collection bursts (yellow-orange, 0.5s), tier-up explosions (golden-rainbow, 1.0s, 100 particles), and magnetic trail effects. Features adaptive LOD performance management to maintain 60 FPS with up to 500 particles on screen.

**Technical Approach**: Inline particle emission at collection/tier-up events. No new classes required - add particle spawning functions and integrate into existing `PlayerBall.collect()`, planned `PlayerBall.onTierUp()`, and `Collectible.update()` methods. Uses LittleJS built-in `ParticleEmitter` class with `undefined` tileInfo (colored circles) for performance.

## Technical Context

**Language/Version**: JavaScript ES6+
**Primary Dependencies**: LittleJS latest (from workspace `../../LittleJS/dist/littlejs.release.js`)
**Storage**: N/A (particles are code-based, no persistence)
**Testing**: Manual playtesting via `npm run dev`, visual validation
**Target Platform**: Web browsers (Chrome/Firefox/Safari latest 2 versions)
**Project Type**: LittleJS Game
**Performance Goals**: 60 FPS with 500 particles, <1MB total game size
**Constraints**: Constitution FR-021 (60 FPS requirement), FR-020 (file organization)
**Scale/Scope**: 3 particle types (collection, tier-up, magnetic trail), ~150 lines of code

**LittleJS Game-Specific**:

- **Engine Version**: LittleJS latest from workspace
- **Physics Requirements**: Particles use LittleJS ParticleEmitter (velocity, gravity, damping)
- **Asset Budget**: Zero bytes (using `undefined` tileInfo for colored circles, optional tile(137,16) for sparkle sprite)
- **Game Jam Theme**: "SMALL" - particle burst SIZE scales with object value (small objects = small bursts, big objects = huge explosions)
- **Physics Innovation**: N/A (polish feature, not physics innovation)
- **Shared Components**: None (particles are game-specific)
- **Performance Target**: 60 FPS on mid-range devices, adaptive LOD reduces emission when >400 particles
- **Browser Support**: Modern browsers (Chrome/Firefox/Safari latest 2 versions)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Article II: Theme-First Design ✅
- **FR-016**: Particle burst SIZE scales with object value - reinforces SMALL→BIG theme
- **Theme Visibility**: Within 30 seconds, players see particle bursts grow from subtle (penny) to dramatic (rocket)
- **Visual Metaphor**: Particle explosions represent "your impact on the world grows"

### Article III: Katamari Mechanics ✅
- **FR-001-009**: Particles trigger on collection events (PlayerBall.collect())
- **FR-047**: Tier-up particles trigger when size thresholds crossed (future PlayerBall.onTierUp())
- **No Violations**: Particles are additive feedback, don't modify core physics

### Article V: Technical Standards ✅
- **FR-020**: Files modified: `src/game.js` only (single-file structure for P1-P3 features)
- **FR-021**: Performance: Adaptive LOD system maintains 60 FPS (emissionMultiplier reduces counts when >400 particles)
- **FR-022**: LittleJS Idioms: Uses built-in `ParticleEmitter` class, `new Color()`, `vec2()`

### Article VI: Visual Design ✅
- **FR-027**: Uses `undefined` (colored circles) by default, optional tile(137, 16) for sparkle sprite
- **FR-028**: Additive blending for glow effect, yellow-orange collection colors, golden tier-up colors
- **FR-031**: Particle System Specification (exact LittleJS ParticleEmitter parameters defined)

###  Article VII: Sound Design ✅
- **No Integration Required**: Particles are visual-only, sound effects already handled by Feature 004 (SoundManager)
- **Complementary**: Particles sync with existing sound effects (playCollect, playTierUp)

### Article VIII: Timeline ✅
- **FR-037**: P3 feature (Week 3: Oct 28-Nov 2), 1-2 hour implementation
- **Can Ship in <2 Days**: Yes, simple integration with existing codebase
- **No Blockers**: All dependencies (PlayerBall, Collectible) implemented in Feature 001

### Article IX: It Factor (Juice Pillar) ✅
- **FR-041**: Juice formula: particles + screen shake + sound = celebration on EVERY action
- **Visual Feedback**: Particles provide immediate, satisfying feedback for every collection
- **Dopamine Triggers**: Tier-up explosions create "wow" moments (100 particles vs 10-20)

### Article X: Player Psychology ✅
- **Anticipation**: Magnetic trail particles create anticipation before collection
- **Reward**: Collection bursts provide dopamine hit, tier-ups provide BIG dopamine hit
- **Progression Visibility**: Larger particles for larger objects = visual power curve

### Article XI: Data Structures ✅
- **No New Data**: Uses existing `collectible.value`, `collectible.pos`, `player.pos`
- **Performance Tracking**: Global `activeParticleCount` and `emissionMultiplier` variables

### Article XII: Class Specifications ✅
- **FR-053**: `PlayerBall.collect()` - add particle emission (line 777)
- **FR-055**: `PlayerBall.onTierUp()` - NEW METHOD for tier-up particles (future feature)
- **FR-057**: `Collectible.update()` - add magnetic trail particles (line 676)

### Article XV: Priorities ✅
- **P3 Priority**: Polish feature, enhances "game feel" without modifying core mechanics
- **Playable > Pretty**: Particles are additive, can be disabled if performance issues arise
- **No Blocking**: Features 001-004 completed, Feature 005 is independent

**Constitution Compliance**: ✅ **PASS** (15/15 checks)

## Project Structure

### Documentation (this feature)

```
.specify/specs/005-add-particle-effects/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (in progress)
├── research.md          # Phase 0: LittleJS ParticleEmitter API research (if needed)
├── data-model.md        # Phase 1: Particle configuration data structures (if needed)
└── tasks.md             # Phase 2: Atomic implementation tasks (generated by /speckit.tasks)
```

### Source Code (repository root)

```
src/
└── game.js              # ONLY file modified - all particle code inline

# Lines to modify:
# - Line 777-822: PlayerBall.collect() - add particle emission (FR-005-001, FR-005-002)
# - Line 676-705: Collectible.update() - add magnetic trail particles (FR-005-010)
# - NEW: PlayerBall.onTierUp() - add method for tier-up particles (FR-005-007, FR-005-008)
# - Line 14-200: Add particle config constants (PARTICLE_CONFIG, activeParticleCount, emissionMultiplier)
# - NEW: spawnCollectionParticles(pos, value) - utility function
# - NEW: spawnTierUpParticles(pos) - utility function
# - NEW: updateParticleBudget() - adaptive LOD system
```

**Structure Decision**: Single-file structure (src/game.js) per Constitution FR-020 for P1-P3 features. Particles are simple enough to not require separate modules. Functions placed in "UTILITY FUNCTIONS" section between spawn system and class definitions.

## Complexity Tracking

*No Constitution violations - this section not needed.*

## Phase 0: Research & Discovery

### 0.1 LittleJS ParticleEmitter API ✅

**From spec.md Technical Context section, lines 204-230:**

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

**Key Insights**:
- `emitTime` = 0.01s (instant burst), `emitRate` = particle count (not rate when emitTime < 1s)
- `tileInfo` = `undefined` for colored circles (default), `tile(137, 16)` for sparkle sprite (optional)
- `angle` = PI (down, for upward burst in top-down view), `emitConeAngle` = PI (180°)
- `particleTime` = lifespan (0.5s for collection, 1.0s for tier-up)
- `fadeRate` = 0.1 (fast fade over particle lifetime)

### 0.2 Existing Code Integration Points ✅

**From src/game.js analysis:**

1. **PlayerBall.collect()** (line 777-822):
   - Currently plays sound (line 792-794) and screen shake (line 796-798)
   - **Insert particles BEFORE sound** (line 791): `spawnCollectionParticles(collectible.pos, collectible.value);`

2. **Collectible.update()** (line 676-705):
   - Already has `this.magnetActive` property (line 669, 701, 703)
   - **Insert trail particles** (line 701, after `this.magnetActive = true`): conditional emission

3. **PlayerBall.onTierUp()** (NEW METHOD):
   - Not implemented yet (FR-047 tier system is future feature)
   - **Placeholder for now**: create empty method, will be populated when tier system added

### 0.3 Performance Tracking ✅

**Active Particle Counting**:
- LittleJS doesn't expose active particle count directly
- **Workaround**: Track emissions and estimate count: `activeParticleCount += particleCount` on spawn, decay over time
- **Alternative**: Trust LittleJS (docs say "100,000+ particles at 60fps"), only reduce if FPS drops
- **Decision**: Use estimation approach for proactive LOD, measure `engineFrameRate` for reactive fallback

## Phase 1: Design & Data Modeling

### 1.1 Data Structures

#### Particle Configuration Constants

```javascript
// ============================================================================
// FEATURE 005: PARTICLE EFFECTS SYSTEM (FR-005)
// ============================================================================

// Particle budget and adaptive LOD (FR-005-012, FR-005-013)
let activeParticleCount = 0;  // Estimated active particles (decays over time)
let emissionMultiplier = 1.0; // LOD multiplier (1.0 = full quality, 0.5 = reduced)

// Particle color definitions (FR-005-003, FR-005-008-CLARIFIED)
const PARTICLE_COLORS = {
    collection: {
        startA: new Color(1, 1, 0, 1),        // Bright yellow
        startB: new Color(1, 1, 0, 1),        // Same (no variation)
        endA: new Color(1, 0.5, 0, 0),        // Orange fade to transparent
        endB: new Color(1, 0.5, 0, 0)         // Same
    },
    tierUp: {
        startA: new Color(1, 0.9, 0.2, 1),    // Golden
        startB: new Color(1, 0.7, 0.1, 1),    // Variation (±30% hue)
        endA: new Color(1, 0.5, 0, 0),        // Orange fade
        endB: new Color(1, 0.3, 0, 0)         // Darker orange fade
    },
    magneticTrail: {
        startA: new Color(1, 1, 0.5, 0.8),    // Pale yellow, semi-transparent
        startB: new Color(1, 1, 0.5, 0.8),    // Same
        endA: new Color(1, 1, 0.5, 0),        // Fade to transparent
        endB: new Color(1, 1, 0.5, 0)         // Same
    }
};

// Particle configuration (consolidates all FRs)
const PARTICLE_CONFIG = {
    collection: {
        emitTime: 0.01,           // Instant burst
        emitConeAngle: PI,        // 180° spread (FR-005-006)
        particleTime: 0.5,        // 0.5s lifespan (FR-005-004)
        sizeStart: 0.3,           // Starting particle size
        sizeEnd: 0.1,             // Ending particle size (shrinks)
        speed: 3,                 // Emission speed (outward burst)
        angleVelocity: 0,         // No rotation
        damping: 0.92,            // Velocity decay
        angleDamping: 1,          // No angular decay
        gravityScale: 0,          // No gravity (top-down view)
        particleConeAngle: PI,    // Individual particle spread
        fadeRate: 0.1             // Alpha fade rate
    },
    tierUp: {
        emitTime: 0.01,           // Instant burst
        emitConeAngle: PI * 2,    // 360° spread (full explosion)
        particleTime: 1.0,        // 1.0s lifespan (FR-005-009)
        sizeStart: 0.5,           // Larger particles (more impressive)
        sizeEnd: 0.2,             // Ending size
        speed: 5,                 // Faster emission (dramatic)
        angleVelocity: 0,         // No rotation
        damping: 0.90,            // Slower decay (linger longer)
        angleDamping: 1,          // No angular decay
        gravityScale: 0,          // No gravity
        particleConeAngle: PI * 2,// Full spread
        fadeRate: 0.05            // Slower fade (linger longer)
    },
    magneticTrail: {
        emitTime: 0.01,           // Per-frame emission
        emitConeAngle: 0.5,       // Narrow cone (trail behind movement)
        particleTime: 0.3,        // Short lifespan (subtle trail)
        sizeStart: 0.2,           // Small particles
        sizeEnd: 0.05,            // Tiny ending size
        speed: 0.5,               // Slow emission (trail effect)
        angleVelocity: 0,         // No rotation
        damping: 0.95,            // High damping (particles linger)
        angleDamping: 1,          // No angular decay
        gravityScale: 0,          // No gravity
        particleConeAngle: 0.5,   // Narrow spread
        fadeRate: 0.2             // Fast fade (subtle effect)
    }
};

// Particle budget thresholds (FR-005-013-CLARIFIED)
const PARTICLE_BUDGET = {
    max: 500,                     // Maximum particles on screen
    reduceThreshold: 400,         // 80% of max - start reducing
    restoreThreshold: 250,        // 50% of max - restore full quality
    decayRate: 0.98               // Particle count estimation decay per frame
};
```

### 1.2 Utility Functions

#### spawnCollectionParticles(pos, value)

**Purpose**: Spawn particle burst on collection event (FR-005-001, FR-005-002)

**Algorithm**:
1. Calculate particle count using logarithmic formula (FR-005-002-CLARIFIED):
   ```javascript
   const baseCount = Math.floor(10 + Math.log10(value + 1) * 15);
   const particleCount = Math.floor(baseCount * emissionMultiplier); // Apply LOD
   ```
2. Get particle colors from `PARTICLE_COLORS.collection`
3. Create ParticleEmitter at `pos` with config from `PARTICLE_CONFIG.collection`
4. Update `activeParticleCount += particleCount` for budget tracking

**Signature**:
```javascript
function spawnCollectionParticles(pos, value) {
    // Implementation in Phase 2
}
```

#### spawnTierUpParticles(pos)

**Purpose**: Spawn massive particle explosion on tier-up event (FR-005-007, FR-005-008)

**Algorithm**:
1. Fixed particle count: `100 * emissionMultiplier` (FR-005-007)
2. Get golden+rainbow colors from `PARTICLE_COLORS.tierUp` (FR-005-008-CLARIFIED)
3. Create ParticleEmitter at `pos` with config from `PARTICLE_CONFIG.tierUp`
4. Update `activeParticleCount += particleCount`

**Signature**:
```javascript
function spawnTierUpParticles(pos) {
    // Implementation in Phase 2
}
```

#### updateParticleBudget()

**Purpose**: Adaptive LOD system to maintain 60 FPS (FR-005-013)

**Algorithm**:
1. Decay `activeParticleCount *= PARTICLE_BUDGET.decayRate` (simulate particle lifespan)
2. If `activeParticleCount > PARTICLE_BUDGET.reduceThreshold`: set `emissionMultiplier = 0.5`
3. Else if `activeParticleCount < PARTICLE_BUDGET.restoreThreshold`: set `emissionMultiplier = 1.0`

**Call Location**: `gameUpdate()` function, runs every frame

**Signature**:
```javascript
function updateParticleBudget() {
    // Implementation in Phase 2
}
```

### 1.3 Class Method Modifications

#### PlayerBall.collect() Modification

**Current Code** (line 777-822):
```javascript
collect(collectible) {
    // Add score (FR-010)
    this.score += collectible.value;

    // Exponential size growth (FR-011, from research.md R1)
    const growthAmount = (collectible.value / 200) * this.size.x;
    this.size = this.size.add(vec2(growthAmount, growthAmount));

    // Update mass to match new size (area-based for momentum)
    this.mass = this.size.x * this.size.x;

    // Destroy collectible (FR-009)
    collectible.destroy();

    // Feature 004: Collection sound (FR-004-003, FR-004-004, T007)
    if (soundManager) {
        soundManager.playCollect(collectible.pos, collectible.value);
    }

    // Feature 003: Screen shake...
    // ...
}
```

**NEW Code** (insert AFTER line 789 `collectible.destroy()`, BEFORE line 791 sound):
```javascript
collect(collectible) {
    // ... existing score/growth/mass/destroy code ...

    // Feature 005: Particle burst on collection (FR-005-001, FR-005-002)
    spawnCollectionParticles(collectible.pos, collectible.value);

    // Feature 004: Collection sound (FR-004-003, FR-004-004, T007)
    if (soundManager) {
        soundManager.playCollect(collectible.pos, collectible.value);
    }

    // ... existing screen shake/win condition code ...
}
```

#### PlayerBall.onTierUp() NEW METHOD

**Purpose**: Placeholder for future tier system (FR-047), emit tier-up particles now

**Location**: Add after `PlayerBall.collect()` method (line 823, before `render()`)

**Implementation**:
```javascript
// Feature 005: Tier-up celebration (FR-005-007, FR-005-008)
// NOTE: Tier system (FR-047) not implemented yet - this is a placeholder
// Will be called by tier detection logic when FR-047 is implemented
onTierUp() {
    // Spawn massive particle explosion (100 particles, golden-rainbow)
    spawnTierUpParticles(this.pos);

    // Feature 003: Screen shake for tier-up (FR-030-004)
    if (typeof cameraShake !== 'undefined') {
        cameraShake = Math.min(cameraShake + SHAKE_TIER_UP, SHAKE_MAX);
    }

    // Feature 004: Tier-up sound (FR-004-005)
    if (soundManager) {
        soundManager.playTierUp(this.pos);
    }
}
```

#### Collectible.update() Modification

**Current Code** (line 676-705):
```javascript
update() {
    super.update();

    // Magnetic attraction (FR-012, from research.md R2)
    if (!player) return;

    const distanceToPlayer = this.pos.distance(player.pos);
    const sizeRatio = this.size.x / player.size.x;

    // ... magnetic pull logic ...

    if (canCollect && distanceToPlayer < magnetRange) {
        // ... apply pull ...
        this.magnetActive = true;
    } else {
        this.magnetActive = false;
    }
}
```

**NEW Code** (insert AFTER line 701 `this.magnetActive = true`):
```javascript
update() {
    // ... existing magnetic pull logic ...

    if (canCollect && distanceToPlayer < magnetRange) {
        // ... existing pull code ...
        this.magnetActive = true;

        // Feature 005: Magnetic trail particles (FR-005-010-CLARIFIED)
        // Only emit if player is 90%+ of collection threshold
        const sizeThreshold = this.size.x * 0.5; // 50% rule from FR-001
        if (player.size.x >= sizeThreshold * 0.9) {
            // Emit 1-2 trail particles per frame (random for variety)
            const trailCount = Math.floor(1 + Math.random() * 2); // 1 or 2
            spawnMagneticTrailParticles(this.pos, trailCount);
        }
    } else {
        this.magnetActive = false;
    }
}
```

**NEW Utility Function**: `spawnMagneticTrailParticles(pos, count)`
```javascript
function spawnMagneticTrailParticles(pos, count) {
    // Apply LOD multiplier
    const particleCount = Math.floor(count * emissionMultiplier);
    if (particleCount < 1) return; // Skip if LOD too aggressive

    const config = PARTICLE_CONFIG.magneticTrail;
    const colors = PARTICLE_COLORS.magneticTrail;

    new ParticleEmitter(
        pos, PI, 0.2, config.emitTime, particleCount, config.emitConeAngle,
        undefined, // Colored circles
        colors.startA, colors.startB, colors.endA, colors.endB,
        config.particleTime, config.sizeStart, config.sizeEnd, config.speed,
        config.angleVelocity, config.damping, config.angleDamping,
        config.gravityScale, config.particleConeAngle, config.fadeRate
    );

    activeParticleCount += particleCount;
}
```

## Phase 2: Implementation Strategy

### 2.1 Implementation Order (Priority)

1. **TASK-001**: Add particle configuration constants (PARTICLE_COLORS, PARTICLE_CONFIG, PARTICLE_BUDGET)
2. **TASK-002**: Add global variables (activeParticleCount, emissionMultiplier)
3. **TASK-003**: Implement `updateParticleBudget()` and integrate into `gameUpdate()`
4. **TASK-004**: Implement `spawnCollectionParticles(pos, value)` utility function
5. **TASK-005**: Integrate collection particles into `PlayerBall.collect()`
6. **TASK-006**: Test collection particles with various object values ($1, $100, $10K)
7. **TASK-007**: Implement `spawnTierUpParticles(pos)` utility function
8. **TASK-008**: Implement `PlayerBall.onTierUp()` placeholder method
9. **TASK-009**: Implement `spawnMagneticTrailParticles(pos, count)` utility function
10. **TASK-010**: Integrate magnetic trail particles into `Collectible.update()`
11. **TASK-011**: Test all particle types, verify 60 FPS with 200+ collectibles
12. **TASK-012**: Playtest and tune particle parameters (colors, sizes, speeds)

### 2.2 Testing Strategy

#### Manual Test Steps (per User Stories from spec.md)

**User Story 1: Collection Particles**
1. Run `npm run dev`, start game
2. Collect penny ($10) - expect ~20 yellow particles bursting outward, fade in 0.5s
3. Collect customer ($50) - expect ~25 particles (slightly more than penny)
4. Collect objects rapidly (10 in 5 seconds) - verify LOD reduces particles if >400 active
5. **Pass Criteria**: Particles correlate with value, fade smoothly, no FPS drop

**User Story 2: Tier-Up Particles**
1. Manually trigger `player.onTierUp()` via console: `player.onTierUp()`
2. Expect 100 golden particles bursting in 360°, lasting 1.0 second
3. Visually compare to collection burst - tier-up should be 5x more dramatic
4. **Pass Criteria**: 100 particles visible, golden-orange colors, much more impressive than collection

**User Story 3: Magnetic Trail Particles**
1. Grow player to size 1.0, approach collectible (size 0.5)
2. When at 90% of collection threshold, expect subtle 1-2 particle trail per frame
3. Trail should shimmer along collectible as it moves toward player
4. **Pass Criteria**: Trail visible during magnetic pull, stops when pull stops/collected

**Performance Test (FR-005-012, FR-005-013)**
1. Spawn 200 collectibles (Level 2 max), collect rapidly (50 collections in 10 seconds)
2. Monitor console for `activeParticleCount`, verify stays below 500
3. Check browser FPS meter - should maintain 60 FPS
4. **Pass Criteria**: No FPS drops below 55, LOD multiplier activates at 400 particles

### 2.3 Edge Cases & Mitigation

| Edge Case | Expected Behavior | Mitigation Strategy |
|-----------|------------------|---------------------|
| 50 objects collected simultaneously | ~1000 particles requested | LOD reduces to 500 (emissionMultiplier = 0.5) |
| Particles overlap and clutter screen | Visual noise | Additive blending creates glow, fast fade (0.5s) |
| FPS drops below 60 | Performance degradation | LOD kicks in at 400 particles, reduces to 0.5x |
| Colorblind players | Can't distinguish particles | Yellow-orange is high-contrast, works for most types (P4 consideration) |
| Tier system not implemented | onTierUp() never called | Placeholder method ready, can test manually via console |

### 2.4 Integration Points & Dependencies

**Dependencies (COMPLETE)**:
- ✅ PlayerBall class (Feature 001) - collect() method exists
- ✅ Collectible class (Feature 001) - update() method, magnetActive property exists
- ✅ LittleJS ParticleEmitter - built-in, always available
- ✅ SoundManager (Feature 004) - already integrated, particles sync with sound
- ✅ Screen shake (Feature 003) - already integrated, particles sync with shake

**No Blocking Issues**: All dependencies implemented, Feature 005 is purely additive.

## Phase 3: Risk Analysis

### 3.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Particle count formula too aggressive | Medium | Medium | Logarithmic formula caps at 70 particles, LOD provides fallback |
| LittleJS ParticleEmitter API misuse | Low | High | API documented in spec.md, research from LittleJS examples |
| Performance degradation on low-end devices | Medium | High | Adaptive LOD system reduces counts dynamically, 60 FPS target |
| Magnetic trails too noisy/distracting | Medium | Low | Only emit when 90%+ threshold, short lifespan (0.3s), subtle colors |
| Tier system not implemented yet | Certain | Low | Placeholder method ready, can demo manually via console |

### 3.2 Timeline Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Implementation takes longer than 1-2 hours | Low | Simple integration, no new classes, well-defined API |
| Playtesting reveals particle tuning needed | Medium | PARTICLE_CONFIG makes tuning easy (adjust colors/sizes/speeds) |
| Feature creep (requests for particle customization) | Medium | Out of scope per spec.md, defer to P4 |

### 3.3 Assumptions

1. **LittleJS handles particle cleanup automatically** - particles auto-destroy after `particleTime` expires (per LittleJS docs)
2. **Tile 137 exists for sparkle sprite** - per ULTRA-DEEP-RESEARCH tile map (optional, not required)
3. **60 FPS target is achievable** - ULTRA-DEEP-RESEARCH confirms "100,000+ particles at 60fps"
4. **Tier system will be implemented in future feature** - FR-047 planned, onTierUp() is placeholder
5. **Logarithmic scaling formula produces good distribution** - based on 2025 industry research, may need playtesting tweaks

## Phase 4: Next Steps

After completing this plan:

1. ✅ **Review plan.md** - validate Constitution Check, technical approach, implementation order
2. 🔜 **Run setup script**: `.specify/scripts/bash/setup-plan.sh` (creates tasks.md template)
3. 🔜 **Call `/speckit.tasks`** - breaks plan into atomic tasks (TASK-001 to TASK-012)
4. 🔜 **Call `/speckit.implement`** - executes tasks, writes code to src/game.js
5. 🔜 **Manual testing** - run `npm run dev`, validate user stories
6. 🔜 **Call `/speckit.analyze`** - validate against spec.md and Constitution
7. 🔜 **Commit & push** - feature complete, ready for Feature 006

---

**Plan Status**: ✅ **READY FOR IMPLEMENTATION**
**Estimated Time**: 1-2 hours (per spec.md)
**Risk Level**: LOW (simple integration, no blockers)
**Constitution Compliance**: ✅ PASS (15/15 checks)
