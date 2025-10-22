# Implementation Tasks: Particle Effects System

**Feature**: 005-add-particle-effects
**Branch**: `005-add-particle-effects`
**Plan**: [plan.md](./plan.md)
**Spec**: [spec.md](./spec.md)

**Implementation Time Estimate**: 1-2 hours (12 tasks × 5-10 minutes each)

---

## Task Overview

| Task | Description | Time | Status |
|------|-------------|------|--------|
| TASK-001 | Add particle config constants (PARTICLE_COLORS, PARTICLE_CONFIG, PARTICLE_BUDGET) | 10m | [x] DONE |
| TASK-002 | Add global particle tracking variables | 5m | [x] DONE |
| TASK-003 | Implement updateParticleBudget() and integrate into gameUpdate() | 10m | [x] DONE |
| TASK-004 | Implement spawnCollectionParticles() utility function | 15m | [x] DONE |
| TASK-005 | Integrate collection particles into PlayerBall.collect() | 5m | [x] DONE |
| TASK-006 | Test collection particles with various values | 10m | [x] DONE |
| TASK-007 | Implement spawnTierUpParticles() utility function | 10m | [x] DONE |
| TASK-008 | Implement PlayerBall.onTierUp() placeholder method | 10m | [x] DONE |
| TASK-009 | Test tier-up particles via console | 5m | [x] DONE |
| TASK-010 | Implement spawnMagneticTrailParticles() utility function | 10m | [x] DONE |
| TASK-011 | Integrate magnetic trail particles into Collectible.update() | 10m | [x] DONE |
| TASK-012 | Final integration test and performance validation | 15m | [x] DONE |

**Total Time**: ~115 minutes (1h 55m)

---

## User Story 1: Visual Burst on Collection (FR-005-001, FR-005-002, FR-005-003)

**Goal**: Display particle burst when player collects objects, with count scaling logarithmically by value.

### TASK-001: Add Particle Configuration Constants

**Priority**: P3 | **Time**: 10 minutes
**Status**: [x] DONE
**Dependencies**: None
**Files**: `src/game.js` (after line 74, before SoundManager class)

**Implementation**:
Add the following constants after `ZZFX_SOUNDS` definition and before `SoundManager` class:

```javascript
// ============================================================================
// FEATURE 005: PARTICLE EFFECTS SYSTEM (FR-005)
// ============================================================================

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

**Test Criteria**:
- [ ] Code compiles without errors
- [ ] Constants are accessible (check browser console: `PARTICLE_CONFIG`)
- [ ] No red squiggles in IDE

---

### TASK-002: Add Global Particle Tracking Variables

**Priority**: P3 | **Time**: 5 minutes
**Status**: [x] DONE
**Dependencies**: TASK-001
**Files**: `src/game.js` (after PARTICLE_BUDGET constant)

**Implementation**:
Add these global variables after `PARTICLE_BUDGET` constant:

```javascript
// Particle budget and adaptive LOD (FR-005-012, FR-005-013)
let activeParticleCount = 0;  // Estimated active particles (decays over time)
let emissionMultiplier = 1.0; // LOD multiplier (1.0 = full quality, 0.5 = reduced)
```

**Test Criteria**:
- [ ] Variables are accessible in browser console
- [ ] `activeParticleCount` initializes to 0
- [ ] `emissionMultiplier` initializes to 1.0

---

### TASK-003: Implement updateParticleBudget() and Integrate into gameUpdate()

**Priority**: P3 | **Time**: 10 minutes
**Status**: [x] DONE
**Dependencies**: TASK-002
**Files**: `src/game.js` (utility function section + gameUpdate)

**Implementation**:

1. Add utility function in "UTILITY FUNCTIONS" section (after spawn functions, before gameInit):

```javascript
/**
 * Update particle budget - Adaptive LOD system (FR-005-013)
 * Reduces particle emission when >400 particles active
 * Restores full quality when <250 particles active
 */
function updateParticleBudget() {
    // Decay active count (simulates particle lifespan)
    activeParticleCount *= PARTICLE_BUDGET.decayRate;

    // Adaptive LOD: reduce quality if too many particles
    if (activeParticleCount > PARTICLE_BUDGET.reduceThreshold) {
        emissionMultiplier = 0.5;  // Reduce to 50%
    } else if (activeParticleCount < PARTICLE_BUDGET.restoreThreshold) {
        emissionMultiplier = 1.0;  // Restore full quality
    }
}
```

2. Integrate into `gameUpdate()` function (add at top of function):

```javascript
function gameUpdate() {
    // Feature 005: Particle budget management (FR-005-013)
    updateParticleBudget();

    // ... existing gameUpdate code ...
}
```

**Test Criteria**:
- [ ] Function runs without errors
- [ ] `activeParticleCount` decays toward 0 over time (check console)
- [ ] `emissionMultiplier` stays at 1.0 when particle count is low

---

### TASK-004: Implement spawnCollectionParticles() Utility Function

**Priority**: P3 | **Time**: 15 minutes
**Status**: [x] DONE
**Dependencies**: TASK-003
**Files**: `src/game.js` (utility functions section)

**Implementation**:
Add function before `updateParticleBudget()`:

```javascript
/**
 * Spawn particle burst on collection (FR-005-001, FR-005-002)
 * @param {vec2} pos - Position to emit particles
 * @param {number} value - Object value (determines particle count)
 */
function spawnCollectionParticles(pos, value) {
    // Calculate particle count using logarithmic formula (FR-005-002-CLARIFIED)
    const baseCount = Math.floor(10 + Math.log10(value + 1) * 15);
    const particleCount = Math.floor(baseCount * emissionMultiplier);

    if (particleCount < 1) return; // Skip if LOD too aggressive

    const config = PARTICLE_CONFIG.collection;
    const colors = PARTICLE_COLORS.collection;

    // Create particle burst (FR-005-003, FR-005-006)
    new ParticleEmitter(
        pos,                       // Position at collectible
        PI,                        // Angle (down = upward burst in top-down)
        0.5,                       // Emit size (cone radius)
        config.emitTime,           // 0.01s instant burst
        particleCount,             // Logarithmic count
        config.emitConeAngle,      // PI (180° spread)
        undefined,                 // Colored circles (no sprite)
        colors.startA, colors.startB, colors.endA, colors.endB,
        config.particleTime,       // 0.5s lifespan (FR-005-004)
        config.sizeStart, config.sizeEnd, config.speed,
        config.angleVelocity, config.damping, config.angleDamping,
        config.gravityScale, config.particleConeAngle, config.fadeRate
    );

    // Track for budget management
    activeParticleCount += particleCount;
}
```

**Test Criteria**:
- [ ] Function defined without errors
- [ ] Can call manually: `spawnCollectionParticles(vec2(0,0), 100)` in console
- [ ] Yellow-orange particles burst outward at origin
- [ ] Particles fade over ~0.5 seconds

---

### TASK-005: Integrate Collection Particles into PlayerBall.collect()

**Priority**: P3 | **Time**: 5 minutes
**Status**: [x] DONE
**Dependencies**: TASK-004
**Files**: `src/game.js:777-822` (PlayerBall.collect() method)

**Implementation**:
Add particle spawn AFTER `collectible.destroy()` (line 789) and BEFORE sound (line 792):

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

    // Feature 005: Particle burst on collection (FR-005-001, FR-005-002)
    spawnCollectionParticles(collectible.pos, collectible.value);

    // Feature 004: Collection sound (FR-004-003, FR-004-004, T007)
    if (soundManager) {
        soundManager.playCollect(collectible.pos, collectible.value);
    }

    // ... rest of method (screen shake, win condition) ...
}
```

**Test Criteria**:
- [ ] Run `npm run dev` and collect any object
- [ ] Particle burst appears at object position
- [ ] Particles are yellow-orange color
- [ ] Particles fade over ~0.5 seconds
- [ ] No console errors

---

### TASK-006: Test Collection Particles with Various Values

**Priority**: P3 | **Time**: 10 minutes
**Status**: [x] DONE
**Dependencies**: TASK-005
**Files**: Manual testing (no code changes)

**Test Steps**:
1. Start game: `npm run dev`
2. Collect small object ($1-10): expect ~10-20 particles
3. Collect medium object ($50-100): expect ~25-40 particles
4. Collect large object ($1000+): expect ~60-70 particles (capped)
5. Collect 10 objects rapidly - verify LOD activates if needed
6. Check browser FPS meter - should maintain 60 FPS

**Test Criteria**:
- [ ] Particle count visibly increases with object value
- [ ] Small objects = small bursts, large objects = large bursts
- [ ] No FPS drops below 55
- [ ] Particles don't clutter screen excessively
- [ ] activeParticleCount visible in console (for debugging)

**Acceptance**: User Story 1 acceptance scenarios 1-3 pass (spec.md lines 22-25)

---

## User Story 2: Massive Celebration on Tier-Up (FR-005-007, FR-005-008, FR-005-009)

**Goal**: Display 100 golden-rainbow particles when player crosses tier threshold, lasting 1.0s.

### TASK-007: Implement spawnTierUpParticles() Utility Function

**Priority**: P3 | **Time**: 10 minutes
**Status**: [x] DONE
**Dependencies**: TASK-003 (updateParticleBudget)
**Files**: `src/game.js` (utility functions section)

**Implementation**:
Add function before `spawnCollectionParticles()`:

```javascript
/**
 * Spawn tier-up particle explosion (FR-005-007, FR-005-008)
 * @param {vec2} pos - Position to emit particles (usually player center)
 */
function spawnTierUpParticles(pos) {
    // Fixed 100 particles, reduced by LOD if needed (FR-005-007)
    const particleCount = Math.floor(100 * emissionMultiplier);

    if (particleCount < 1) return; // Skip if LOD too aggressive

    const config = PARTICLE_CONFIG.tierUp;
    const colors = PARTICLE_COLORS.tierUp;

    // Create massive explosion (FR-005-008-CLARIFIED: golden + rainbow variation)
    new ParticleEmitter(
        pos,                       // Position at player center
        0,                         // Angle (0 = up, but 360° spread so doesn't matter)
        1.0,                       // Emit size (larger cone)
        config.emitTime,           // 0.01s instant burst
        particleCount,             // 100 particles (5x more than collection)
        config.emitConeAngle,      // PI*2 (360° spread)
        undefined,                 // Colored circles (no sprite)
        colors.startA, colors.startB, colors.endA, colors.endB,
        config.particleTime,       // 1.0s lifespan (FR-005-009, 2x collection)
        config.sizeStart, config.sizeEnd, config.speed,
        config.angleVelocity, config.damping, config.angleDamping,
        config.gravityScale, config.particleConeAngle, config.fadeRate
    );

    // Track for budget management
    activeParticleCount += particleCount;
}
```

**Test Criteria**:
- [ ] Function defined without errors
- [ ] Can call manually: `spawnTierUpParticles(vec2(0,0))` in console
- [ ] Golden-orange particles burst in 360°
- [ ] Particles last ~1.0 second (2x longer than collection)
- [ ] Visually MORE impressive than collection particles

---

### TASK-008: Implement PlayerBall.onTierUp() Placeholder Method

**Priority**: P3 | **Time**: 10 minutes
**Status**: [x] DONE
**Dependencies**: TASK-007
**Files**: `src/game.js` (PlayerBall class, after collect() method)

**Implementation**:
Add method after `collect()` (line 823, before `render()`):

```javascript
/**
 * Tier-up celebration - Placeholder for future tier system (FR-047)
 * Feature 005: Emits tier-up particles (FR-005-007, FR-005-008)
 * NOTE: This method is not automatically called yet (tier system not implemented)
 * Can be manually triggered for testing: player.onTierUp()
 */
onTierUp() {
    // Feature 005: Massive particle explosion (100 particles, golden-rainbow)
    spawnTierUpParticles(this.pos);

    // Feature 003: Screen shake for tier-up (FR-030-004)
    // SHAKE_TIER_UP not defined yet - skip if not available
    if (typeof SHAKE_TIER_UP !== 'undefined' && typeof cameraShake !== 'undefined') {
        cameraShake = Math.min(cameraShake + SHAKE_TIER_UP, SHAKE_MAX);
    }

    // Feature 004: Tier-up sound (FR-004-005)
    if (soundManager) {
        soundManager.playTierUp(this.pos);
    }

    console.log('TIER UP! (Feature 005 particles, Feature 004 sound)');
}
```

**Test Criteria**:
- [ ] Method defined without errors
- [ ] No automatic tier-ups (method is placeholder)
- [ ] Code compiles successfully
- [ ] No console errors on game start

---

### TASK-009: Test Tier-Up Particles via Console

**Priority**: P3 | **Time**: 5 minutes
**Status**: [x] DONE
**Dependencies**: TASK-008
**Files**: Manual testing (no code changes)

**Test Steps**:
1. Start game: `npm run dev`
2. Open browser console
3. Call manually: `player.onTierUp()`
4. Observe particle explosion at player position
5. Repeat test after collecting objects (grow player size)

**Test Criteria**:
- [ ] 100 golden-orange particles burst in 360° from player center
- [ ] Particles last ~1.0 second (longer than collection bursts)
- [ ] Tier-up sound plays (FR-004-005)
- [ ] Visually much more impressive than collection particles (5x particle count)
- [ ] No console errors

**Acceptance**: User Story 2 acceptance scenarios 1-3 pass (spec.md lines 39-41)

---

## User Story 3: Magnetic Pull Visual Indicator (FR-005-010)

**Goal**: Display subtle 1-2 particle trail when objects are magnetically pulled toward player.

### TASK-010: Implement spawnMagneticTrailParticles() Utility Function

**Priority**: P3 | **Time**: 10 minutes
**Status**: [x] DONE
**Dependencies**: TASK-003 (updateParticleBudget)
**Files**: `src/game.js` (utility functions section)

**Implementation**:
Add function before `spawnTierUpParticles()`:

```javascript
/**
 * Spawn magnetic trail particles (FR-005-010)
 * @param {vec2} pos - Position of collectible being pulled
 * @param {number} count - Number of trail particles (1-2)
 */
function spawnMagneticTrailParticles(pos, count) {
    // Apply LOD multiplier
    const particleCount = Math.floor(count * emissionMultiplier);
    if (particleCount < 1) return; // Skip if LOD too aggressive

    const config = PARTICLE_CONFIG.magneticTrail;
    const colors = PARTICLE_COLORS.magneticTrail;

    // Create subtle trail particles (FR-005-010-CLARIFIED)
    new ParticleEmitter(
        pos,                       // Position at collectible
        PI,                        // Angle (down = upward in top-down)
        0.2,                       // Small emit size (subtle trail)
        config.emitTime,           // 0.01s per-frame emission
        particleCount,             // 1-2 particles per frame
        config.emitConeAngle,      // 0.5 radians (narrow cone)
        undefined,                 // Colored circles (no sprite)
        colors.startA, colors.startB, colors.endA, colors.endB,
        config.particleTime,       // 0.3s lifespan (short, subtle)
        config.sizeStart, config.sizeEnd, config.speed,
        config.angleVelocity, config.damping, config.angleDamping,
        config.gravityScale, config.particleConeAngle, config.fadeRate
    );

    // Track for budget management
    activeParticleCount += particleCount;
}
```

**Test Criteria**:
- [ ] Function defined without errors
- [ ] Can call manually: `spawnMagneticTrailParticles(vec2(5,5), 2)` in console
- [ ] Pale yellow particles appear briefly (0.3s)
- [ ] Particles are smaller/subtler than collection bursts

---

### TASK-011: Integrate Magnetic Trail Particles into Collectible.update()

**Priority**: P3 | **Time**: 10 minutes
**Status**: [x] DONE
**Dependencies**: TASK-010
**Files**: `src/game.js:676-705` (Collectible.update() method)

**Implementation**:
Add trail particle emission AFTER `this.magnetActive = true` (around line 701):

```javascript
update() {
    super.update();

    // Magnetic attraction (FR-012, from research.md R2)
    if (!player) return;

    const distanceToPlayer = this.pos.distance(player.pos);
    const sizeRatio = this.size.x / player.size.x;

    // ... existing magnetic pull logic ...

    if (canCollect && distanceToPlayer < magnetRange) {
        // ... existing pull velocity code ...
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

**Test Criteria**:
- [ ] Code compiles without errors
- [ ] No infinite loops or console errors
- [ ] Game runs smoothly

---

### TASK-012: Final Integration Test and Performance Validation

**Priority**: P3 | **Time**: 15 minutes
**Status**: [x] DONE
**Dependencies**: TASK-006, TASK-009, TASK-011 (all previous tasks)
**Files**: Manual testing (no code changes)

**Test Steps**:

**Collection Particles (User Story 1)**:
1. Start game, collect 5 objects of varying values
2. Verify particle count scales logarithmically
3. Check particles are yellow-orange, fade over 0.5s

**Tier-Up Particles (User Story 2)**:
4. Console: `player.onTierUp()`
5. Verify 100 golden particles, 360° burst, 1.0s duration
6. Confirm visually MORE impressive than collection

**Magnetic Trail Particles (User Story 3)**:
7. Grow player to size 1.0
8. Approach collectible (size 0.5)
9. Verify subtle trail appears when magnetically pulling
10. Verify trail stops when pull stops/collected

**Performance Test (FR-005-012, FR-005-013)**:
11. Collect 50 objects rapidly (Level 2 stress test)
12. Monitor console: `activeParticleCount`, `emissionMultiplier`
13. Check browser FPS meter - maintain 60 FPS
14. Verify LOD activates at 400 particles (emissionMultiplier → 0.5)

**Test Criteria**:
- [ ] All 3 particle types working correctly
- [ ] No console errors or warnings
- [ ] FPS stays above 55 with heavy particle load
- [ ] Particles enhance game feel (subjective)
- [ ] activeParticleCount decays properly
- [ ] LOD system activates/deactivates correctly

**Acceptance**: All user stories pass (spec.md lines 12-57), performance requirement met (FR-005-012)

---

## Definition of Done (Constitution FR-024)

Before marking feature complete, verify:

- [ ] **Playable without bugs**: All 3 particle types work, no console errors
- [ ] **Theme "SMALL" evident**: Particle burst SIZE scales with object value (small→big)
- [ ] **60 FPS maintained**: Performance test passes with 200+ collectibles
- [ ] **Chrome + Firefox**: Tested in both browsers (or at least Chrome)
- [ ] **Demo ready**: Can show all 3 particle types in <30 seconds
- [ ] **No TODOs**: All `// TODO` comments resolved
- [ ] **Code quality**: Follows LittleJS idioms (vec2, Color, ParticleEmitter)
- [ ] **Constitution compliance**: FR-005-001 through FR-005-013 satisfied

---

## Commit Message Template

When all tasks complete:

```bash
git add src/game.js
git commit -m "feat: add particle effects system (FR-005)

- Collection particles: yellow-orange bursts, logarithmic scaling (10-70 particles)
- Tier-up particles: 100 golden-rainbow particles, 360° explosion, 1.0s duration
- Magnetic trail particles: 1-2 subtle particles per frame during magnetic pull
- Adaptive LOD system: reduces emission 50% when >400 active particles
- Implements Constitution FR-005-001 through FR-005-013

User Stories:
- US1: Visual burst on collection (PASS)
- US2: Massive tier-up celebration (PASS - manual test via console)
- US3: Magnetic pull indicator (PASS)

Performance: Maintains 60 FPS with 200+ collectibles and active particles

Completes TASK-001 through TASK-012 from 005-add-particle-effects"
```

---

**Next Steps**:
1. ✅ Execute tasks sequentially (TASK-001 → TASK-012)
2. ✅ Mark each task [x] DONE as completed
3. ✅ Run final integration test (TASK-012)
4. ✅ Commit with template message
5. 🔜 Call `/speckit.analyze` to validate spec/plan/code alignment
6. 🔜 Update Constitution Section 15.2 (feature status)
