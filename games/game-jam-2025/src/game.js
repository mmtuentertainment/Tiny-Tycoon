'use strict';

// ============================================================================
// TINY TYCOON - Development Skeleton
// ============================================================================
// See docs/ULTRA-DEEP-RESEARCH.md PART 15 for complete implementation examples
// See docs/DAY-1-QUICKSTART.md for 30-minute setup guide
// See docs/CODE-INTEGRATION-TEST.md for integration checklist
// ============================================================================

// ============================================================================
// CONFIGURATION DATA
// ============================================================================
// Note: Initialized in engineInit after LittleJS loads

let COLLECTIBLE_DATA;

// Feature 002: Level Progression System - Level Configuration
const LEVEL_CONFIG = [
    { // Level 1 - Easy
        levelNumber: 1,
        targetSize: 5.0,                    // Player must reach 5.0× size (10x from 0.5 start)
        timeLimit: 60,                      // 60 seconds
        playAreaSize: 50,                   // 50×50 unit square world
        startingPlayerSize: 0.5,            // Reset to 0.5× each level
        collectibleSizeMin: 0.3,            // Smallest collectible
        collectibleSizeMax: 3.0,            // Largest collectible
        collectibleSpawnCount: { min: 30, max: 50 }, // Random count in range
        difficulty: 'Easy'
    },
    { // Level 2 - Medium
        levelNumber: 2,
        targetSize: 15.0,                   // 30x from 0.5 start
        timeLimit: 90,                      // 90 seconds
        playAreaSize: 100,                  // 100×100 units
        startingPlayerSize: 0.5,
        collectibleSizeMin: 3.0,            // Larger objects than L1
        collectibleSizeMax: 10.0,
        collectibleSpawnCount: { min: 40, max: 60 },
        difficulty: 'Medium'
    },
    { // Level 3 - Hard
        levelNumber: 3,
        targetSize: 50.0,                   // 100x from 0.5 start
        timeLimit: 120,                     // 120 seconds
        playAreaSize: 150,                  // 150×150 units
        startingPlayerSize: 0.5,
        collectibleSizeMin: 10.0,           // Even larger objects
        collectibleSizeMax: 40.0,
        collectibleSpawnCount: { min: 50, max: 80 },
        difficulty: 'Hard'
    }
];

// Feature 002: State Machine
const STATE = {
    PLAYING: 'PLAYING',
    VICTORY: 'VICTORY',
    DEFEAT: 'DEFEAT',
    LEVEL_TRANSITION: 'LEVEL_TRANSITION',
    GAME_COMPLETE: 'GAME_COMPLETE'
};

// ============================================================================
// FEATURE 004: ZZFX SOUND SYSTEM (FR-004)
// ============================================================================
// ZzFX parameters from Constitution Article VII, Section 7.1, FR-033
const ZZFX_SOUNDS = {
    collect: [,,537,.02,.02,.22,1,1.59,-6.98,4.97],
    tierUp: [,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17],
    victory: [1.5,,262,,.2,.4,1,1.8,,,,,,,,.5,.1],
    defeat: [1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01],
    timerWarning: [,,400,.01,,.05,,1.5,,,,,,,,.1]
};

// ============================================================================
// FEATURE 005: PARTICLE EFFECTS SYSTEM (FR-005)
// ============================================================================

// Particle color definitions (FR-005-003, FR-005-008-CLARIFIED)
// NOTE: Initialized in gameInit() after LittleJS Color class is available
let PARTICLE_COLORS;

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

// Particle budget and adaptive LOD (FR-005-012, FR-005-013)
let activeParticleCount = 0;  // Estimated active particles (decays over time)
let emissionMultiplier = 1.0; // LOD multiplier (1.0 = full quality, 0.5 = reduced)

/**
 * SoundManager - Manages all game audio via ZzFX
 * FR-004-001: Pre-caches all sounds for instant playback
 * FR-004-012: Graceful degradation if audio fails
 */
class SoundManager {
    constructor() {
        try {
            // Pre-cache Sound objects (FR-004-001)
            this.sound_collect = new Sound(ZZFX_SOUNDS.collect);
            this.sound_tierUp = new Sound(ZZFX_SOUNDS.tierUp);
            this.sound_victory = new Sound(ZZFX_SOUNDS.victory);
            this.sound_defeat = new Sound(ZZFX_SOUNDS.defeat);
            this.sound_timerWarning = new Sound(ZZFX_SOUNDS.timerWarning);
            console.log('SoundManager initialized successfully');
        } catch (error) {
            // FR-004-018: Graceful degradation
            console.warn('Audio failed to initialize:', error);
            this.sound_collect = null;
            this.sound_tierUp = null;
            this.sound_victory = null;
            this.sound_defeat = null;
            this.sound_timerWarning = null;
        }
    }

    /**
     * Clamp pitch to human-audible range (FR-004-003-CLARIFIED)
     * Industry standard: 0.5x-3.0x (Unreal Engine uses 0.4x-2.0x)
     */
    clampPitch(pitch) {
        return Math.max(0.5, Math.min(3.0, pitch));
    }

    /**
     * Play collection sound with pitch-scaling and volume management
     * FR-004-003: Pitch scales with value (high for pennies, low for yachts)
     * FR-004-004: Positional audio with distance falloff
     * FR-004-013: Volume scales inversely with simultaneous collections
     */
    playCollect(pos, value, collectionsThisFrame = 1) {
        if (!this.sound_collect) return; // Silent if audio failed

        // Pitch scales with value: high pitch (pennies) → low pitch (yachts)
        const rawPitch = 1 + (value * 0.001);
        const pitch = this.clampPitch(rawPitch);

        // Volume scales inversely with simultaneous collections to prevent clipping
        const volume = Math.max(0.3, 1.0 / Math.sqrt(collectionsThisFrame));

        // Positional audio (LittleJS defaults: range=40, taper=0.7)
        this.sound_collect.play(pos, volume, pitch);
    }

    /**
     * Play tier-up fanfare (FR-004-005)
     * NOTE: Tier system (FR-047) not implemented yet - placeholder for future
     */
    playTierUp(pos) {
        if (!this.sound_tierUp) return;
        this.sound_tierUp.play(pos, 1.2); // 20% louder than collections
    }

    /**
     * Play victory fanfare (FR-004-006)
     * Center position, very loud, celebratory
     */
    playVictory() {
        if (!this.sound_victory) return;
        this.sound_victory.play(vec2(0, 0), 1.5); // Center, 150% volume
    }

    /**
     * Play defeat sound (FR-004-007)
     * Center position, normal volume, comedic
     */
    playDefeat() {
        if (!this.sound_defeat) return;
        this.sound_defeat.play(vec2(0, 0), 1.0); // Center, 100% volume
    }

    /**
     * Play timer warning beep (FR-004-008)
     * Quiet, not annoying, creates urgency
     */
    playTimerWarning() {
        if (!this.sound_timerWarning) return;
        this.sound_timerWarning.play(vec2(0, 0), 0.8); // Center, quieter
    }
}

// ============================================================================
// SCREEN SHAKE CONSTANTS (Feature 003: FR-030)
// ============================================================================
// Tuned values - ADJUSTED during playtesting for visibility
// Formula: shakePower = SHAKE_BASE + (objectValue * SHAKE_VALUE_MULTIPLIER)
const SHAKE_BASE = 0.3;                 // Min shake - increased from 0.05 for visibility
const SHAKE_VALUE_MULTIPLIER = 0.001;   // Multiplier - increased 10x for dramatic effect
const SHAKE_MAX = 5.0;                  // Max cumulative shake - increased for bigger impact
const SHAKE_TIER_UP = 1.0;              // Tier-up celebration shake (future)
const SHAKE_VICTORY = 2.0;              // Victory celebration shake - very dramatic

// Example calculations (adjusted values):
// Penny ($10):         0.3 + (10 * 0.001) = 0.31 (noticeable)
// Customer ($50):      0.3 + (50 * 0.001) = 0.35 (more visible)
// Yacht ($5,000,000):  0.3 + (5000000 * 0.001) = 5.3 → clamped to 5.0 (very dramatic)
// Rocket ($2B):        massive → clamped to 5.0 (extreme shake)

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

let player;
let gameInitCallCount = 0;

// Feature 002: Level Progression State
let currentLevel = 0;              // 0-indexed: 0 = Level 1, 1 = Level 2, 2 = Level 3
let levelState = STATE.PLAYING;    // Current game state
let levelStartTime = 0;            // LittleJS `time` when level began
let remainingTime = 0;             // Seconds remaining in level
let transitionStartTime = 0;       // LittleJS `time` when transition screen shown

// Feature 003: Screen shake system (FR-030-007)
let cameraShake = 0;               // Current shake intensity, decays automatically

// Feature 004: Sound system (FR-004-011)
let soundManager;                  // Global SoundManager instance
let lastTimerWarningTime = -1;     // Track last beep to prevent spam (FR-004-008)

// ============================================================================
// ENGINE CALLBACKS (LittleJS requires exactly these 5 functions)
// ============================================================================

function gameInit() {
    // Called when starting or restarting game
    console.log('Tiny Tycoon - Game initialized');

    // Feature 004: Initialize sound system (FR-004-011, T005)
    soundManager = new SoundManager();

    // Feature 005: Initialize particle colors (FR-005-003, FR-005-008)
    PARTICLE_COLORS = {
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

    // Initialize COLLECTIBLE_DATA now that LittleJS Color is available
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

    // Set camera (FR-001)
    cameraPos = vec2(0, 0);
    cameraScale = 32;

    // Feature 002: Start at Level 1 (T012)
    // startLevel() now handles collectible spawning per level (T025)
    startLevel(0);
}

function gameUpdate() {
    // Feature 005: Particle budget management (FR-005-013)
    updateParticleBudget();

    // Camera follow player with lerp (FR-013, research.md R3)
    if (player) {
        cameraPos = cameraPos.lerp(player.pos, 0.1);
    }

    // Feature 002: Timer countdown and lose condition (T015, will be enhanced in US3 T019)
    if (levelState === STATE.PLAYING) {
        const elapsed = time - levelStartTime;
        remainingTime = Math.max(0, LEVEL_CONFIG[currentLevel].timeLimit - elapsed);

        // Feature 004: Timer warning beep at last 10 seconds (FR-004-008, T021)
        if (remainingTime <= 10 && remainingTime > 0) {
            const currentSecond = Math.floor(remainingTime);
            const lastSecond = Math.floor(lastTimerWarningTime);

            // Play beep when second changes (prevents multiple beeps per second)
            if (currentSecond !== lastSecond) {
                if (soundManager) {
                    soundManager.playTimerWarning();
                }
                lastTimerWarningTime = remainingTime;
            }
        } else {
            lastTimerWarningTime = -1; // Reset when above 10 seconds
        }

        // Lose condition: time expired without reaching target
        if (remainingTime <= 0 && player && player.size.x < LEVEL_CONFIG[currentLevel].targetSize) {
            levelState = STATE.DEFEAT;
            transitionStartTime = time;

            // Feature 004: Stop timer warning (FR-004-009, T023)
            lastTimerWarningTime = -1;

            // Feature 004: Defeat sound (FR-004-007, T016)
            if (soundManager) {
                soundManager.playDefeat();
            }

            console.log('DEFEAT! Time expired!');
        }
    }

    // Feature 002: Skip input handling for transitions (T036)
    if ((levelState === STATE.VICTORY || levelState === STATE.DEFEAT) && keyWasPressed()) {
        handleTransition();
    }

    // Feature 002: Auto-advance timer for transitions (T014)
    if ((levelState === STATE.VICTORY || levelState === STATE.DEFEAT) &&
        time - transitionStartTime >= 2.5) {
        handleTransition();
    }
}

function gameUpdatePost() {
    // Post-update (after physics and object updates)

    // Feature 003: Apply screen shake to camera (FR-030-007)
    if (cameraShake > 0) {
        // Add random offset to camera based on shake intensity
        const shakeOffset = vec2(
            (Math.random() - 0.5) * cameraShake,
            (Math.random() - 0.5) * cameraShake
        );
        cameraPos = cameraPos.add(shakeOffset);

        // Decay shake over time (~0.5s to zero)
        cameraShake *= 0.9;
        if (cameraShake < 0.01) cameraShake = 0; // Stop when negligible
    }

    // Feature 002: Boundary enforcement (T029 - modified to hard boundaries for better gameplay)
    if (player) {
        const config = LEVEL_CONFIG[currentLevel];
        const playAreaHalfSize = config.playAreaSize / 2;

        // Clamp player position to play area (hard boundaries)
        const playerHalfSize = player.size.x / 2;
        player.pos.x = clamp(
            player.pos.x,
            -playAreaHalfSize + playerHalfSize,
            playAreaHalfSize - playerHalfSize
        );
        player.pos.y = clamp(
            player.pos.y,
            -playAreaHalfSize + playerHalfSize,
            playAreaHalfSize - playerHalfSize
        );
    }
}

function gameRender() {
    // World-space rendering (background, terrain)
    // Feature 002: Draw background scaled to current level's play area
    const config = LEVEL_CONFIG[currentLevel];
    const playAreaSize = config.playAreaSize;

    // Draw green background (much larger to cover entire play area)
    drawRect(vec2(0, 0), vec2(playAreaSize * 2, playAreaSize * 2), new Color(0.2, 0.6, 0.3));

    // Draw grid lines scaled to play area
    const halfSize = playAreaSize / 2;
    const gridStep = 5;
    for (let x = -halfSize; x <= halfSize; x += gridStep) {
        drawLine(vec2(x, -halfSize), vec2(x, halfSize), 0.1, new Color(0, 0, 0, 0.3));
    }
    for (let y = -halfSize; y <= halfSize; y += gridStep) {
        drawLine(vec2(-halfSize, y), vec2(halfSize, y), 0.1, new Color(0, 0, 0, 0.3));
    }

    // Draw origin marker (red dot at 0,0)
    drawRect(vec2(0, 0), vec2(1, 1), new Color(1, 0, 0));
}

function gameRenderPost() {
    // Screen-space rendering (HUD, UI)
    if (!player) return;

    // Calculate display values
    const sizeMultiplier = (player.size.x / 0.5).toFixed(1);
    const scoreFormatted = player.score.toLocaleString();

    // Feature 002: Victory screen (T013, T037 - enhanced with stats)
    if (levelState === STATE.VICTORY) {
        // Semi-transparent black overlay
        drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

        const centerX = mainCanvasSize.x / 2;
        const centerY = mainCanvasSize.y / 2;

        // Victory message
        drawTextScreen('LEVEL COMPLETE!', vec2(centerX, centerY + 60), 64, new Color(0, 1, 0));
        drawTextScreen(`Final Size: ${sizeMultiplier}x`, vec2(centerX, centerY + 10), 32, new Color(1, 1, 1));

        // Time remaining stat (T037)
        const timeRemaining = formatTime(remainingTime);
        drawTextScreen(`Time Remaining: ${timeRemaining}`, vec2(centerX, centerY - 30), 28, new Color(1, 1, 1));

        drawTextScreen('Press any key to continue...', vec2(centerX, centerY - 100), 24, new Color(0.7, 0.7, 0.7));
        return; // Skip normal HUD when showing victory screen
    }

    // Feature 002: Game Complete screen (T039)
    if (levelState === STATE.GAME_COMPLETE) {
        // Semi-transparent black overlay
        drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

        const centerX = mainCanvasSize.x / 2;
        const centerY = mainCanvasSize.y / 2;

        // Game complete message
        drawTextScreen('CONGRATULATIONS!', vec2(centerX, centerY + 80), 64, new Color(1, 1, 0));
        drawTextScreen('ALL LEVELS COMPLETE!', vec2(centerX, centerY + 20), 48, new Color(0, 1, 0));
        drawTextScreen(`Final Score: $${scoreFormatted}`, vec2(centerX, centerY - 30), 32, new Color(1, 1, 1));
        drawTextScreen(`Final Size: ${sizeMultiplier}x`, vec2(centerX, centerY - 70), 32, new Color(1, 1, 1));
        return; // Skip normal HUD
    }

    // Feature 002: Defeat screen (T016)
    if (levelState === STATE.DEFEAT) {
        // Semi-transparent black overlay
        drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

        const centerX = mainCanvasSize.x / 2;
        const centerY = mainCanvasSize.y / 2;
        const config = LEVEL_CONFIG[currentLevel];
        const targetMultiplier = (config.targetSize / 0.5).toFixed(1);

        // Defeat message
        drawTextScreen('TIME\'S UP!', vec2(centerX, centerY + 60), 64, new Color(1, 0, 0));
        drawTextScreen(
            `Size: ${sizeMultiplier}x / ${targetMultiplier}x`,
            vec2(centerX, centerY),
            32,
            new Color(1, 1, 1)
        );
        drawTextScreen('Try again!', vec2(centerX, centerY - 40), 32, new Color(1, 1, 1));
        drawTextScreen('Press any key to retry...', vec2(centerX, centerY - 100), 24, new Color(0.7, 0.7, 0.7));
        return; // Skip normal HUD when showing defeat screen
    }

    // Title (center top)
    drawTextScreen('Tiny Tycoon', vec2(mainCanvasSize.x/2, 50), 40, new Color(1, 1, 1));

    // Feature 002: Timer display (T020, T021)
    const displayTime = formatTime(remainingTime);
    const timerColor = remainingTime <= 10 ? new Color(1, 0.3, 0) : new Color(1, 1, 1); // Orange when urgent
    drawTextScreen(
        displayTime,
        vec2(mainCanvasSize.x / 2, mainCanvasSize.y - 40),  // Center bottom
        48,
        timerColor,
        0,
        'center',
        'monospace',
        new Color(0, 0, 0)  // Black outline
    );

    // Size display (top-left) - FR-014
    drawTextScreen(
        `Size: ${sizeMultiplier}x`,
        vec2(80, 100),  // Top-left area
        32,
        new Color(1, 1, 1),       // White
        0,
        'left',
        'monospace',
        new Color(0, 0, 0)         // Black outline
    );

    // Feature 002: Target size display (T032)
    const config = LEVEL_CONFIG[currentLevel];
    const targetMultiplier = (config.targetSize / 0.5).toFixed(1);
    const progress = parseFloat(sizeMultiplier) / parseFloat(targetMultiplier);
    const targetColor = progress >= 0.9 ? new Color(0, 1, 0) : new Color(1, 1, 1); // Green when close
    drawTextScreen(
        `Target: ${targetMultiplier}x`,
        vec2(80, 140),  // Below size display
        24,
        targetColor,
        0,
        'left',
        'monospace',
        new Color(0, 0, 0)
    );

    // Feature 002: Level indicator (T033)
    drawTextScreen(
        `Level ${config.levelNumber}`,
        vec2(mainCanvasSize.x - 120, 100),  // Top-right area
        32,
        new Color(1, 1, 1),
        0,
        'right',
        'monospace',
        new Color(0, 0, 0)
    );

    // Score display (top-right) - FR-015
    drawTextScreen(
        `$${scoreFormatted}`,
        vec2(mainCanvasSize.x - 120, 140),  // Below level indicator
        24,
        new Color(1, 1, 0),       // Yellow
        0,
        'right',
        'monospace',
        new Color(0, 0, 0)
    );
}

// ============================================================================
// FEATURE 005: PARTICLE EFFECTS UTILITY FUNCTIONS
// ============================================================================

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
        PI,                        // Angle
        0.2,                       // Emit size
        config.emitTime,           // Emit time (0.01s)
        particleCount,             // Emit rate (1-2)
        config.emitConeAngle,      // Emit cone angle (0.5)
        undefined,                 // Tile info (colored circles)
        colors.startA, colors.startB, colors.endA, colors.endB,  // Colors
        config.particleTime,       // Particle time (0.3s)
        config.sizeStart, config.sizeEnd,  // Size start/end
        config.speed               // Speed
    );

    // Track for budget management
    activeParticleCount += particleCount;
}

/**
 * Spawn tier-up particle explosion (FR-005-007, FR-005-008)
 * @param {vec2} pos - Position to emit particles (usually player center)
 */
function spawnTierUpParticles(pos) {
    // Fixed 100 particles, reduced by LOD if needed (FR-005-007)
    const particleCount = Math.floor(100 * emissionMultiplier);

    console.log('=== SPAWN TIER UP PARTICLES ===');
    console.log('Position:', pos);
    console.log('Particle count:', particleCount);
    console.log('Emission multiplier:', emissionMultiplier);
    console.log('PARTICLE_COLORS:', PARTICLE_COLORS);
    console.log('PARTICLE_CONFIG:', PARTICLE_CONFIG);

    if (particleCount < 1) {
        console.log('SKIPPING: particle count < 1');
        return; // Skip if LOD too aggressive
    }

    const config = PARTICLE_CONFIG.tierUp;
    const colors = PARTICLE_COLORS.tierUp;

    console.log('Config:', config);
    console.log('Colors:', colors);

    // Create massive explosion (FR-005-008-CLARIFIED: golden + rainbow variation)
    // Using tile(0,16) instead of undefined - may fix rendering issue
    const emitter = new ParticleEmitter(
        pos,                       // Position at player center
        0,                         // Angle
        1.0,                       // Emit size
        config.emitTime,           // Emit time (0.01s)
        particleCount,             // Emit rate (100 particles)
        config.emitConeAngle,      // Emit cone angle (PI*2)
        tile(0,16),                // Tile info (use player tile 0 as particle sprite)
        colors.startA, colors.startB, colors.endA, colors.endB,  // Colors
        config.particleTime,       // Particle time (1.0s)
        config.sizeStart, config.sizeEnd,  // Size start/end
        config.speed               // Speed
    );

    console.log('ParticleEmitter created:', emitter);

    // Track for budget management
    activeParticleCount += particleCount;
    console.log('Active particle count:', activeParticleCount);
}

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
        PI,                        // Angle
        0.5,                       // Emit size
        config.emitTime,           // Emit time (0.01s)
        particleCount,             // Emit rate (logarithmic)
        config.emitConeAngle,      // Emit cone angle (PI)
        undefined,                 // Tile info (colored circles)
        colors.startA, colors.startB, colors.endA, colors.endB,  // Colors
        config.particleTime,       // Particle time (0.5s)
        config.sizeStart, config.sizeEnd,  // Size start/end
        config.speed               // Speed
    );

    // Track for budget management
    activeParticleCount += particleCount;
}

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

// ============================================================================
// FEATURE 002: LEVEL PROGRESSION UTILITY FUNCTIONS
// ============================================================================

// Format seconds to MM:SS display (from research.md R2)
function formatTime(seconds) {
    const s = Math.floor(seconds);
    const minutes = Math.floor(s / 60);
    const secs = s % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Initialize a level (US1 T008-T010)
function startLevel(levelIndex) {
    currentLevel = levelIndex;
    const config = LEVEL_CONFIG[currentLevel];

    // Reset player to starting state (T008)
    if (!player) {
        player = new PlayerBall(vec2(0, 0));
    } else {
        player.pos = vec2(0, 0);
        player.size = vec2(config.startingPlayerSize);
        player.velocity = vec2(0, 0);
        player.score = 0;
        player.mass = config.startingPlayerSize * config.startingPlayerSize;
    }

    // Clear old collectibles (T024)
    engineObjects.forEach(obj => {
        if (obj instanceof Collectible) {
            obj.destroy();
        }
    });

    // Spawn new collectibles for this level (T025)
    spawnCollectiblesForLevel(config);

    // Reset timer (T009)
    levelStartTime = time;
    remainingTime = config.timeLimit;

    // Set state to playing (T010)
    levelState = STATE.PLAYING;

    console.log(`Level ${config.levelNumber} started - Target: ${config.targetSize}x, Time: ${config.timeLimit}s`);
}

// Handle transition between levels (US1 T011, US2 T017)
function handleTransition() {
    if (levelState === STATE.VICTORY) {
        // Victory: advance to next level or complete game (T011)
        if (currentLevel < LEVEL_CONFIG.length - 1) {
            startLevel(currentLevel + 1);
        } else {
            // Game complete (beat all 3 levels)
            levelState = STATE.GAME_COMPLETE;
            console.log('GAME COMPLETE! All 3 levels beaten!');
        }
    } else if (levelState === STATE.DEFEAT) {
        // Defeat: retry same level (T017)
        startLevel(currentLevel);
    }
}

// ============================================================================
// SPAWN SYSTEM
// ============================================================================

// Feature 002: Level-specific collectible spawning (T023, T026)
// Fixed to ensure progressive size distribution for winnable gameplay
function spawnCollectiblesForLevel(config) {
    const spawnCount = Math.floor(
        config.collectibleSpawnCount.min +
        Math.random() * (config.collectibleSpawnCount.max - config.collectibleSpawnCount.min + 1)
    );
    const gridSize = Math.ceil(Math.sqrt(spawnCount)); // Square grid
    const cellSize = config.playAreaSize / gridSize;
    const playAreaHalfSize = config.playAreaSize / 2;

    let spawned = 0;
    const playerStartSize = config.startingPlayerSize; // 0.5

    for (let i = 0; i < spawnCount; i++) {
        // Grid cell coordinates
        const gridX = i % gridSize;
        const gridY = Math.floor(i / gridSize);

        // Cell center in world coordinates
        const cellCenterX = -playAreaHalfSize + (gridX + 0.5) * cellSize;
        const cellCenterY = -playAreaHalfSize + (gridY + 0.5) * cellSize;

        // Randomize within cell (±40% of cell size to avoid edges)
        const offsetX = (Math.random() - 0.5) * cellSize * 0.8;
        const offsetY = (Math.random() - 0.5) * cellSize * 0.8;
        const spawnPos = vec2(cellCenterX + offsetX, cellCenterY + offsetY);

        // FIXED: Progressive size distribution to ensure winnable gameplay
        // Create size tiers: 40% small (immediately collectable), 40% medium, 20% large
        const tier = Math.random();
        let size;
        if (tier < 0.4) {
            // Small tier: Always collectable by starting player (0.3 to 0.45)
            size = playerStartSize * 0.6 + Math.random() * playerStartSize * 0.3;
        } else if (tier < 0.8) {
            // Medium tier: Collectable after some growth (0.5 to targetSize * 0.4)
            const midPoint = (playerStartSize + config.targetSize) / 2;
            size = playerStartSize + Math.random() * (midPoint - playerStartSize);
        } else {
            // Large tier: Collectable near end (targetSize * 0.4 to targetSize * 0.9)
            size = config.targetSize * 0.4 + Math.random() * config.targetSize * 0.5;
        }

        // Clamp to config range
        size = Math.max(config.collectibleSizeMin, Math.min(config.collectibleSizeMax, size));

        // Random type (60% coin, 40% customer from Feature 001)
        const type = Math.random() < 0.6 ? 'coin' : 'customer';

        // Boundary check: ensure collectible fits within play area
        const halfSize = size / 2;
        if (Math.abs(spawnPos.x) + halfSize < playAreaHalfSize &&
            Math.abs(spawnPos.y) + halfSize < playAreaHalfSize) {
            new Collectible(spawnPos, type, size);
            spawned++;
        }
    }

    console.log(`Level ${config.levelNumber}: Spawned ${spawned} collectibles with progressive sizing`);
}

// Legacy spawn function (Feature 001 - will be removed after full migration)
function spawnCollectibles() {
    const GRID_ROWS = 12;
    const GRID_COLS = 12;
    const CELL_SIZE = 2.5;
    const GRID_OFFSET = -15;      // Center grid at origin
    const RANDOMIZATION_RANGE = 1.0;

    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            // Base grid position
            const gridX = GRID_OFFSET + (col * CELL_SIZE) + (CELL_SIZE / 2);
            const gridY = GRID_OFFSET + (row * CELL_SIZE) + (CELL_SIZE / 2);

            // Random offset within cell
            const randomX = gridX + (Math.random() - 0.5) * 2 * RANDOMIZATION_RANGE;
            const randomY = gridY + (Math.random() - 0.5) * 2 * RANDOMIZATION_RANGE;
            const spawnPos = vec2(randomX, randomY);

            // Weighted type selection (60% coins, 40% customers)
            const type = Math.random() < 0.6 ? 'coin' : 'customer';

            // Random size within type range
            const sizeRange = COLLECTIBLE_DATA[type].sizeRange;
            const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);

            // Spawn collectible
            new Collectible(spawnPos, type, size);
        }
    }

    console.log(`Spawned ${GRID_ROWS * GRID_COLS} collectibles`);
}

// ============================================================================
// COLLECTIBLE CLASS
// ============================================================================

class Collectible extends EngineObject {
    constructor(pos, type, size) {
        super(pos, vec2(size, size));  // Square collectibles
        this.type = type;
        this.value = COLLECTIBLE_DATA[type].value;
        this.color = COLLECTIBLE_DATA[type].color;
        this.magnetActive = false;
        this.collideTiles = false;
        this.mass = 0.1;  // Small mass for collision detection
        this.damping = 0.9;  // Allow some movement for magnetic pull
        this.collideSolidObjects = true;  // Enable collision detection
    }

    update() {
        super.update();

        // Magnetic attraction (FR-012, from research.md R2)
        if (!player) return;

        const distanceToPlayer = this.pos.distance(player.pos);
        const sizeRatio = this.size.x / player.size.x;

        // Magnetic attraction: pull collectable objects when you're close
        // Only works on objects you CAN collect (smaller than you)
        const canCollect = player.size.x > this.size.x;

        // Scale magnetic range with player size (so it stays consistent as you grow)
        const magnetRange = 0.8 + (player.size.x * 0.3);  // Grows with player: 0.8 at start, 1.4 at size 2.0

        if (canCollect && distanceToPlayer < magnetRange) {
            // Stronger pull when very close, weaker when far
            const distanceFactor = 1.0 - (distanceToPlayer / magnetRange);
            const magnetForce = 0.2 * distanceFactor;

            // Apply gentle pull toward player
            const directionToPlayer = player.pos.subtract(this.pos).normalize();
            this.velocity = this.velocity.add(directionToPlayer.scale(magnetForce * 0.1));

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

    render() {
        // Code-based shape for P1
        drawRect(this.pos, this.size, this.color);

        // Optional: Glow when magnet active (will be used in Phase 6)
        if (this.magnetActive) {
            drawRect(this.pos, this.size.scale(1.2), this.color.scale(0.5, 0.1));
        }
    }
}

// ============================================================================
// PLAYER BALL CLASS
// ============================================================================

class PlayerBall extends EngineObject {
    constructor(pos) {
        super(pos, vec2(0.5, 0.5));  // Start at smallest size (FR-001)
        this.mass = 0.25;              // Area: 0.5 × 0.5
        this.damping = 0.5;            // 50% velocity retained (much faster stopping)
        this.score = 0;
        this.color = new Color(1, 0.8, 0);  // Golden yellow
        this.collideTiles = false;     // Free movement, no tile collision
        this.collideSolidObjects = true;  // Enable collision with other objects
    }

    update() {
        // WASD and Arrow key input (FR-002, FR-003)
        const moveSpeed = 0.08;  // Increased from 0.03 for better playability
        const moveInput = vec2(
            (keyIsDown('KeyD') || keyIsDown('ArrowRight')) -
            (keyIsDown('KeyA') || keyIsDown('ArrowLeft')),
            (keyIsDown('KeyW') || keyIsDown('ArrowUp')) -
            (keyIsDown('KeyS') || keyIsDown('ArrowDown'))
        );

        // Apply acceleration (momentum physics - FR-004)
        this.velocity = this.velocity.add(moveInput.scale(moveSpeed));

        // Parent update handles physics and damping (FR-005)
        super.update();

        // Manual collision check (LittleJS auto-collision might not trigger)
        engineObjects.forEach(obj => {
            if (obj instanceof Collectible && !obj.destroyed) {
                const dist = this.pos.distance(obj.pos);
                const minDist = (this.size.x + obj.size.x) / 2;

                if (dist < minDist) {
                    // Collision detected! Check size and collect
                    if (this.size.x > obj.size.x) {
                        this.collect(obj);
                    }
                }
            }
        });
    }

    collideWithObject(other) {
        // Only process Collectible objects (FR-008)
        if (!(other instanceof Collectible)) return false;

        // Size-based collection rule: Can only collect strictly smaller
        if (this.size.x > other.size.x) {
            this.collect(other);
        }

        return false; // No physics bounce
    }

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

        // Feature 003: Value-scaled screen shake (FR-030-001, FR-030-002, FR-030-003)
        const shakePower = SHAKE_BASE + (collectible.value * SHAKE_VALUE_MULTIPLIER);
        cameraShake = Math.min(cameraShake + shakePower, SHAKE_MAX); // Accumulate and clamp

        // Feature 002: Check win condition immediately after size update (T007)
        if (levelState === STATE.PLAYING &&
            this.size.x >= LEVEL_CONFIG[currentLevel].targetSize) {
            levelState = STATE.VICTORY;
            transitionStartTime = time;

            // Feature 004: Stop timer warning (FR-004-009, T022)
            lastTimerWarningTime = -1;

            // Feature 004: Victory sound (FR-004-006, T015)
            if (soundManager) {
                soundManager.playVictory();
            }

            // Feature 003: Victory shake (FR-030-005, FR-030-009)
            cameraShake = Math.min(cameraShake + SHAKE_VICTORY, SHAKE_MAX);

            console.log('VICTORY! Target size reached!');
        }

        // Optional: Log collection for debugging
        // console.log('Collected', collectible.type, '| Score:', this.score);
    }

    /**
     * Tier-up celebration - Placeholder for future tier system (FR-047)
     * Feature 005: Emits tier-up particles (FR-005-007, FR-005-008)
     * NOTE: This method is not automatically called yet (tier system not implemented)
     * Can be manually triggered for testing: player.onTierUp()
     */
    onTierUp() {
        // TEST: Ultra-simple particle test with LittleJS example pattern
        console.log('Creating test particles at position:', this.pos);
        const testEmitter = new ParticleEmitter(
            this.pos, 0,              // emitPos, emitAngle
            1, 0.1, 100, PI*2,        // emitSize, emitTime, rate, cone
            tile(0, 16),              // tileInfo
            new Color(1, 1, 0, 1),    // colorStartA
            new Color(1, 0.5, 0, 1),  // colorStartB
            new Color(1, 1, 0, 0),    // colorEndA
            new Color(1, 0, 0, 0),    // colorEndB
            1.0, 0.5, 0.1             // particleTime, sizeStart, sizeEnd
        );
        console.log('Test emitter created:', testEmitter);

        // Feature 005: Massive particle explosion (100 particles, golden-rainbow)
        spawnTierUpParticles(this.pos);

        // Feature 003: Screen shake for tier-up (FR-030-004)
        if (typeof SHAKE_TIER_UP !== 'undefined' && typeof cameraShake !== 'undefined') {
            cameraShake = Math.min(cameraShake + SHAKE_TIER_UP, SHAKE_MAX);
        }

        // Feature 004: Tier-up sound (FR-004-005)
        if (soundManager) {
            soundManager.playTierUp(this.pos);
        }

        console.log('TIER UP! (Feature 005 particles, Feature 004 sound)');
    }

    render() {
        // Code-based shape for P1 (sprites deferred to P3)
        drawRect(this.pos, this.size, this.color);
    }
}

// ============================================================================
// ERROR HANDLING
// ============================================================================
window.addEventListener('error', (e) => {
    console.error('WINDOW ERROR:', e.message, e.filename, e.lineno);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('UNHANDLED PROMISE REJECTION:', e.reason);
});

// ============================================================================
// START ENGINE
// ============================================================================
// Note: LittleJS requires explicit engineInit() call to start
// This is not a callback - it's the startup function that receives our callbacks
console.log('Starting LittleJS engine...');
// LittleJS signature: engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, imageSources, rootElement)
// There are only 5 callbacks - no separate engineInit callback!
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, [], document.body)
    .then(() => console.log('ENGINE INIT PROMISE RESOLVED'))
    .catch(err => console.error('ENGINE INIT PROMISE REJECTED:', err));
