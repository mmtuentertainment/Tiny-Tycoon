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

// ============================================================================
// FEATURE 006: UTILITY FUNCTIONS (FR-006-018, FR-006-021)
// ============================================================================

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

// ============================================================================
// FEATURE 006: POPUP TEXT MANAGER (FR-006-012, FR-006-014)
// ============================================================================

/**
 * PopupTextManager - Manages collection popup text (simplified for jam)
 * FR-006-012: 1.0s duration with upward float + fade animation
 * FR-006-014: Max 5 simultaneous popups, oldest removed first
 * NOTE: Aggregation removed for simplicity (faster to ship)
 */
class PopupTextManager {
    constructor() {
        this.activePopups = [];
        this.maxPopups = 5;             // Max simultaneous (FR-006-014)
        this.popupDuration = 1.0;       // 1 second (FR-006-012)
        this.floatDistance = 40;        // Pixels upward (FR-006-012)
    }

    /**
     * Show collection popup
     * @param {string} objectName - Name to display (e.g., "PENNY")
     * @param {number} value - Dollar value for formatting
     * @param {vec2} worldPos - World position where collection occurred
     */
    showCollection(objectName, value, worldPos) {
        // Truncate name if needed (defensive)
        const truncatedName = truncateName(objectName, 20);

        // Format currency
        const formattedValue = formatCurrency(value);

        // Create popup text
        const text = `${truncatedName}! +${formattedValue}`;

        // Create new popup
        const popup = {
            text: text,
            value: value,
            startTime: time,
            worldPos: worldPos.copy(),
            yOffset: 0,
            alpha: 1.0
        };

        this.activePopups.push(popup);

        // Enforce max popup limit (FR-006-014)
        if (this.activePopups.length > this.maxPopups) {
            this.activePopups.shift();  // Remove oldest
        }
    }

    /**
     * Update all active popups (called per frame in gameUpdate)
     */
    update() {
        const now = time;

        // Update each popup (reverse loop for safe removal)
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
            popup.yOffset = this.floatDistance * progress;

            // Fade out in last 30% of lifetime
            popup.alpha = progress > 0.7 ? 1.0 - ((progress - 0.7) / 0.3) : 1.0;
        }
    }

    /**
     * Render all active popups (called in gameRenderPost)
     */
    render() {
        const baseYOffset = 100;  // Distance above screen center
        const stackSpacing = 30;  // Vertical spacing between popups

        for (let i = 0; i < this.activePopups.length; i++) {
            const popup = this.activePopups[i];

            // Screen center + offset for stacking
            const screenX = mainCanvasSize.x / 2;
            const screenY = mainCanvasSize.y / 2 - baseYOffset - (i * stackSpacing) - popup.yOffset;

            // Color based on value (white/yellow/orange)
            const color = this.getPopupColor(popup.value);
            const colorWithAlpha = color.scale(1, popup.alpha);

            // Font size based on value
            const fontSize = popup.value > 1000 ? 32 : 24;

            // Render text with outline
            drawTextScreen(
                popup.text,
                vec2(screenX, screenY),
                fontSize,
                colorWithAlpha,
                0,           // angle
                'center',    // textAlign
                'monospace', // font
                new Color(0, 0, 0, popup.alpha * 0.8)  // Outline
            );
        }
    }

    /**
     * Color-code popups by value
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

    /**
     * Clear all active popups (for level transitions)
     */
    clear() {
        this.activePopups = [];
    }
}

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
        const valueMagnitude = Math.log10(Math.max(1, value));
        const rawPitch = 1.5 - (valueMagnitude * 0.1);
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

// Feature 006: Popup text system (FR-006-012)
let popupTextManager;              // Global PopupTextManager instance

// ============================================================================
// ENGINE CALLBACKS (LittleJS requires exactly these 5 functions)
// ============================================================================

function gameInit() {
    // Called when starting or restarting game
    console.log('Tiny Tycoon - Game initialized');

    // Feature 004: Initialize sound system (FR-004-011, T005)
    soundManager = new SoundManager();

    // Feature 006: Initialize popup text system (FR-006-012, T003)
    popupTextManager = new PopupTextManager();

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
    // Feature 006: Named Collectibles with Personality (FR-006-001, FR-006-002, FR-006-003)
    // 20 objects: Level 1 (schoolyard), Level 2 (urban), Level 3 (luxury)
    COLLECTIBLE_DATA = {
        // === LEVEL 1: SCHOOLYARD (8 objects) ===
        penny: {
            name: 'PENNY',
            value: 1,
            level: 1,
            sizeRange: [0.3, 0.35],
            color: new Color(0.8, 0.5, 0.2)  // Copper
        },
        gum: {
            name: 'GUM',
            value: 10,
            level: 1,
            sizeRange: [0.35, 0.4],
            color: new Color(1, 0.4, 0.6)    // Pink
        },
        crayon: {
            name: 'CRAYON',
            value: 15,
            level: 1,
            sizeRange: [0.35, 0.4],
            color: new Color(0.2, 0.4, 1)    // Blue
        },
        homework: {
            name: 'HOMEWORK',
            value: 25,
            level: 1,
            sizeRange: [0.4, 0.5],
            color: new Color(0.9, 0.9, 0.9)  // White paper
        },
        backpack: {
            name: 'BACKPACK',
            value: 75,
            level: 1,
            sizeRange: [0.5, 0.6],
            color: new Color(0.3, 0.3, 0.8)  // Blue
        },
        basketball: {
            name: 'BASKETBALL',
            value: 100,
            level: 1,
            sizeRange: [0.55, 0.65],
            color: new Color(1, 0.5, 0)      // Orange
        },
        desk: {
            name: 'DESK',
            value: 200,
            level: 1,
            sizeRange: [0.7, 0.9],
            color: new Color(0.6, 0.4, 0.2)  // Brown wood
        },
        teacher: {
            name: 'TEACHER',
            value: 300,
            level: 1,
            sizeRange: [0.8, 1.0],
            color: new Color(0.9, 0.7, 0.5)  // Skin tone (absurdity begins!)
        },

        // === LEVEL 2: URBAN/DOWNTOWN (7 objects) ===
        // Add some smaller starter objects for Level 2
        pennyL2: {
            name: 'PENNY',
            value: 1,
            level: 2,
            sizeRange: [0.3, 0.35],
            color: new Color(0.8, 0.5, 0.2)  // Copper
        },
        gumL2: {
            name: 'GUM',
            value: 10,
            level: 2,
            sizeRange: [0.35, 0.4],
            color: new Color(1, 0.4, 0.6)    // Pink
        },
        coffee: {
            name: 'COFFEE',
            value: 100,
            level: 2,
            sizeRange: [0.6, 0.7],
            color: new Color(0.4, 0.2, 0.1)  // Coffee brown
        },
        officeChair: {
            name: 'OFFICE CHAIR',
            value: 300,
            level: 2,
            sizeRange: [0.8, 1.0],
            color: new Color(0.2, 0.2, 0.2)  // Black
        },
        bicycle: {
            name: 'BICYCLE',
            value: 500,
            level: 2,
            sizeRange: [1.0, 1.3],
            color: new Color(0.8, 0, 0)      // Red
        },
        laptop: {
            name: 'LAPTOP',
            value: 1500,
            level: 2,
            sizeRange: [0.7, 0.9],
            color: new Color(0.7, 0.7, 0.7)  // Silver
        },
        businessman: {
            name: 'BUSINESSMAN',
            value: 2000,
            level: 2,
            sizeRange: [0.9, 1.1],
            color: new Color(0.2, 0.2, 0.3)  // Dark suit
        },
        car: {
            name: 'CAR',
            value: 5000,
            level: 2,
            sizeRange: [1.5, 2.0],
            color: new Color(0.1, 0.3, 0.6)  // Blue car
        },
        house: {
            name: 'HOUSE',
            value: 20000,
            level: 2,
            sizeRange: [2.5, 3.5],
            color: new Color(0.8, 0.6, 0.4)  // Beige house
        },

        // === LEVEL 3: LUXURY/OLIGARCH (5 objects) ===
        // Add smaller starter objects for Level 3 (must be < 0.4 to be in small pool!)
        pennyL3: {
            name: 'PENNY',
            value: 1,
            level: 3,
            sizeRange: [0.3, 0.35],
            color: new Color(0.8, 0.5, 0.2)  // Copper
        },
        gumL3: {
            name: 'GUM',
            value: 10,
            level: 3,
            sizeRange: [0.35, 0.4],
            color: new Color(1, 0.4, 0.6)    // Pink
        },
        coffeeL3: {
            name: 'COFFEE',
            value: 100,
            level: 3,
            sizeRange: [0.6, 0.7],
            color: new Color(0.4, 0.2, 0.1)  // Coffee brown
        },
        bicycleL3: {
            name: 'BICYCLE',
            value: 500,
            level: 3,
            sizeRange: [1.0, 1.3],
            color: new Color(0.8, 0, 0)      // Red
        },
        carL3: {
            name: 'CAR',
            value: 5000,
            level: 3,
            sizeRange: [1.5, 2.0],
            color: new Color(0.1, 0.3, 0.6)  // Blue car
        },
        yacht: {
            name: 'YACHT',
            value: 500000,
            level: 3,
            sizeRange: [3.0, 4.5],
            color: new Color(0.9, 0.9, 1)    // White yacht
        },
        mansion: {
            name: 'MANSION',
            value: 1000000,
            level: 3,
            sizeRange: [4.0, 5.5],
            color: new Color(0.9, 0.8, 0.6)  // Cream mansion
        },
        helicopter: {
            name: 'HELICOPTER',
            value: 15000000,
            level: 3,
            sizeRange: [3.5, 5.0],
            color: new Color(0.3, 0.3, 0.3)  // Dark grey
        },
        privateJet: {
            name: 'PRIVATE JET',
            value: 50000000,
            level: 3,
            sizeRange: [5.0, 7.0],
            color: new Color(0.8, 0.8, 0.9)  // Light grey/white
        },
        spaceRocket: {
            name: 'SPACE ROCKET',
            value: 2000000000,
            level: 3,
            sizeRange: [7.0, 10.0],
            color: new Color(0.9, 0.9, 0.9)  // White rocket
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

    // Feature 006: Update popup text animations (FR-006-012, T003)
    if (popupTextManager) {
        popupTextManager.update();
    }

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

    // Feature 006: Render popup text (FR-006-012, T003)
    if (popupTextManager) {
        popupTextManager.render();
    }

    // Calculate display values
    const sizeMultiplier = (player.size.x / 0.5).toFixed(1);
    const levelScoreFormatted = player.score.toLocaleString();
    const totalScoreFormatted = player.totalScore.toLocaleString();

    // Feature 007: Victory screen with Gen Alpha personality (FR-007-001/002/003/004)
    if (levelState === STATE.VICTORY) {
        // Semi-transparent black overlay
        drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

        const centerX = mainCanvasSize.x / 2;
        const centerY = mainCanvasSize.y / 2;
        const config = LEVEL_CONFIG[currentLevel];
        const levelNum = config.levelNumber;

        // Get biggest W stat (FR-007-022)
        const biggestW = player.biggestCollectedName || '(none)';
        const timeRemaining = formatTime(remainingTime);

        // Level-specific personality text (FR-007-001, FR-007-002, FR-007-003)
        let titleText, subtitleText, scoreLabel, sizeLabel, flavorText;

        if (levelNum === 1) {
            // Level 1: Broke Era - Uncommon grindset
            titleText = 'LEVEL 1 COMPLETE';
            subtitleText = 'UNCOMMON GRINDSET UNLOCKED ✅';
            scoreLabel = `Portfolio: $${levelScoreFormatted} (Bussin fr fr)`;
            sizeLabel = `Size: ${sizeMultiplier}x (Growing fr)`;
            flavorText = 'Press SPACE for next level';
        } else if (levelNum === 2) {
            // Level 2: Mid-tier - Influencer status
            titleText = 'LEVEL 2 COMPLETE';
            subtitleText = 'MID-TIER INFLUENCER ACHIEVED 📱';
            scoreLabel = `Net Worth: $${levelScoreFormatted} (It\'s giving hustle)`;
            sizeLabel = `Size: ${sizeMultiplier}x (Massive W)`;
            flavorText = 'Press SPACE for oligarch status';
        } else {
            // Level 3: Oligarch - Generational wealth
            titleText = 'LEVEL 3 COMPLETE';
            subtitleText = 'OLIGARCH STATUS: CONFIRMED ✅';
            scoreLabel = `Portfolio: $${levelScoreFormatted} (No cap legendary)`;
            sizeLabel = `Size: ${sizeMultiplier}x (UNGOVERNABLE)`;
            flavorText = 'Press SPACE to flex';
        }

        // Render victory text (FR-007-004)
        drawTextScreen(titleText, vec2(centerX, centerY + 100), 48, new Color(0, 1, 0));
        drawTextScreen(subtitleText, vec2(centerX, centerY + 50), 36, new Color(1, 1, 0));
        drawTextScreen(scoreLabel, vec2(centerX, centerY), 28, new Color(1, 1, 1));
        drawTextScreen(sizeLabel, vec2(centerX, centerY - 35), 28, new Color(1, 1, 1));
        drawTextScreen(`Biggest W: ${biggestW}`, vec2(centerX, centerY - 70), 24, new Color(1, 1, 0));
        drawTextScreen(`Time: ${timeRemaining} remaining`, vec2(centerX, centerY - 105), 24, new Color(0.8, 0.8, 0.8));
        drawTextScreen(flavorText, vec2(centerX, centerY - 150), 24, new Color(0.7, 0.7, 0.7));
        return; // Skip normal HUD when showing victory screen
    }

    // Feature 007: Game complete screen with maximum absurdity (FR-007-014/015/016)
    if (levelState === STATE.GAME_COMPLETE) {
        // Semi-transparent black overlay
        drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

        const centerX = mainCanvasSize.x / 2;
        const centerY = mainCanvasSize.y / 2;
        const biggestW = player.biggestCollectedName || 'NOTHING';

        // Maximum absurdity text
        drawTextScreen('🎮 GAME COMPLETE 🎮', vec2(centerX, centerY + 120), 54, new Color(1, 1, 0));
        drawTextScreen('YOU WON CAPITALISM', vec2(centerX, centerY + 70), 48, new Color(0, 1, 0));
        drawTextScreen(`Size: ${sizeMultiplier}x (COSMIC)`, vec2(centerX, centerY + 20), 32, new Color(1, 1, 1));
        drawTextScreen(`Total: $${totalScoreFormatted} (Generational)`, vec2(centerX, centerY - 20), 32, new Color(1, 1, 0));
        drawTextScreen(`Biggest W: ${biggestW}`, vec2(centerX, centerY - 60), 28, new Color(1, 1, 1));
        drawTextScreen('UNGOVERNABLE STATUS: ACHIEVED ✅', vec2(centerX, centerY - 100), 28, new Color(0, 1, 0));
        drawTextScreen('Touch grass? Nah, touch ASSETS 💎', vec2(centerX, centerY - 140), 24, new Color(0.9, 0.9, 0.9));
        drawTextScreen('You are now INEVITABLE', vec2(centerX, centerY - 180), 22, new Color(0.7, 0.7, 0.7));
        return; // Skip normal HUD
    }

    // Feature 007: Defeat screen with minimal irony (FR-007-012, FR-007-013)
    if (levelState === STATE.DEFEAT) {
        // Semi-transparent black overlay
        drawRect(cameraPos, vec2(1000, 1000), new Color(0, 0, 0, 0.7));

        const centerX = mainCanvasSize.x / 2;
        const centerY = mainCanvasSize.y / 2;
        const config = LEVEL_CONFIG[currentLevel];
        const targetMultiplier = (config.targetSize / 0.5).toFixed(1);

        // Minimal irony (encouraging tone maintained)
        drawTextScreen('GRIND INTERRUPTED 💀', vec2(centerX, centerY + 80), 56, new Color(1, 0.3, 0));
        drawTextScreen(
            `Size: ${sizeMultiplier}x / ${targetMultiplier}x (Not enough)`,
            vec2(centerX, centerY + 20),
            28,
            new Color(1, 1, 1)
        );
        drawTextScreen(`Portfolio: $${levelScoreFormatted} (Rare L moment)`, vec2(centerX, centerY - 20), 28, new Color(1, 1, 1));
        drawTextScreen('Run it back? Press SPACE to retry', vec2(centerX, centerY - 70), 24, new Color(0.8, 0.8, 0.8));
        drawTextScreen('Sigma tip: Collect bigger objects first', vec2(centerX, centerY - 110), 20, new Color(0.6, 0.6, 0.6));
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

    // Feature 007: Level indicator with personality subtitle (FR-007-010)
    const levelSubtitles = ['BROKE ERA', 'MID-TIER GRIND', 'OLIGARCH MODE'];
    const levelText = `Level ${config.levelNumber} - ${levelSubtitles[currentLevel]}`;
    drawTextScreen(
        levelText,
        vec2(mainCanvasSize.x - 120, 90),  // Top-right area
        26,  // Slightly smaller to fit subtitle
        new Color(1, 1, 1),
        0,
        'right',
        'monospace',
        new Color(0, 0, 0)
    );

    // Score displays (top-right) - FR-015
    drawTextScreen(
        `Level: $${levelScoreFormatted}`,
        vec2(mainCanvasSize.x - 120, 130),
        22,
        new Color(1, 1, 1),
        0,
        'right',
        'monospace',
        new Color(0, 0, 0)
    );
    drawTextScreen(
        `Total: $${totalScoreFormatted}`,
        vec2(mainCanvasSize.x - 120, 160),
        24,
        new Color(1, 1, 0),       // Yellow highlight for total
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

    // Create subtle trail particles - working 24-parameter pattern (FR-005-010-CLARIFIED)
    new ParticleEmitter(
        pos, PI,                   // emitPos, emitAngle
        0.3, 0.01,                 // emitSize, emitTime
        particleCount, 0.5,        // emitRate (1-2), emitConeAngle (narrow)
        tile(0, 16),               // tileInfo
        hsl(0.15,1,0.6,0.6), hsl(0.17,1,0.6,0.6),  // colorStartA, colorStartB (pale yellow, semi-transparent)
        hsl(0.15,1,0.5,0), hsl(0.17,1,0.5,0),      // colorEndA, colorEndB (fade)
        0.4,                       // particleTime (0.4s - quick but visible)
        0.25, 0.1,                 // sizeStart, sizeEnd (small trail particles)
        1, 0,                      // speed (1 = slow drift), angleSpeed
        .95, 1,                    // damping, angleDamping
        0, 0.5,                    // gravityScale, particleConeAngle
        .1, .3,                    // fadeRate, randomness
        false, true                // collideTiles, additive (glow!)
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

    if (particleCount < 1) return; // Skip if LOD too aggressive

    // Use ULTRA MASSIVE settings for visibility (FR-005-008-CLARIFIED)
    new ParticleEmitter(
        pos, 0,                    // emitPos, emitAngle
        3, 0.2,                    // emitSize (3 = MASSIVE!), emitTime
        particleCount, PI*2,       // emitRate (100), emitConeAngle (360°)
        tile(0, 16),               // tileInfo
        hsl(0.1,1,0.6), hsl(0.15,1,0.6),   // colorStartA, colorStartB (BRIGHT golden)
        hsl(0.1,1,0.3,0), hsl(0.15,1,0.3,0), // colorEndA, colorEndB (fade)
        5,                         // particleTime (5s - VERY LONG!)
        3, 2,                      // sizeStart (3 = GIGANTIC!), sizeEnd (2 = still huge)
        1, 0,                      // speed (1 = slow drift), angleSpeed
        .98, 1,                    // damping (.98 = barely slows), angleDamping
        0, PI*2,                   // gravityScale, particleConeAngle
        .01, .5,                   // fadeRate (.01 = VERY slow fade), randomness
        false, true                // collideTiles, additive (glow effect!)
    );

    // Track for budget management
    activeParticleCount += particleCount;
}

/**
 * Spawn particle burst on collection (FR-005-001, FR-005-002)
 * @param {vec2} pos - Position to emit particles
 * @param {number} value - Object value (determines particle count)
 */
function spawnCollectionParticles(pos, value) {
    // PERFORMANCE FIX: Drastically reduce particle count to prevent lag
    const baseCount = Math.floor(3 + Math.log10(value + 1) * 2);  // Was 10+log*15, now 3+log*2
    const particleCount = Math.floor(baseCount * emissionMultiplier);

    if (particleCount < 1) return; // Skip if LOD too aggressive

    // Create particle burst - working 24-parameter pattern (FR-005-003, FR-005-006)
    new ParticleEmitter(
        pos, PI,                   // emitPos, emitAngle (PI = upward burst)
        1, 0.1,                    // emitSize, emitTime
        particleCount, PI,         // emitRate (logarithmic), emitConeAngle (180°)
        tile(0, 16),               // tileInfo
        hsl(0.15,1,0.5), hsl(0.1,1,0.5),      // colorStartA (yellow), colorStartB (golden)
        hsl(0.08,1,0.4,0), hsl(0.05,1,0.3,0), // colorEndA (orange fade), colorEndB
        0.8,                       // particleTime (0.8s - visible but quick)
        0.4, 0.2,                  // sizeStart, sizeEnd (medium particles)
        3, 0,                      // speed (3 = good burst), angleSpeed
        .92, 1,                    // damping, angleDamping
        0, PI,                     // gravityScale, particleConeAngle
        .05, .5,                   // fadeRate, randomness
        false, true                // collideTiles, additive (glow!)
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
function startLevel(levelIndex, options = {}) {
    const {
        preservePlayerSize = false,
        carryForwardScore = false
    } = options;

    currentLevel = levelIndex;
    const config = LEVEL_CONFIG[currentLevel];

    // Reset player to starting state (T008)
    if (!player) {
        player = new PlayerBall(vec2(0, 0));
    }

    if (player) {
        // Roll back level earnings when retrying the same level
        if (!carryForwardScore && player.score) {
            player.totalScore = Math.max(0, player.totalScore - player.score);
        }

        player.score = 0;

        // Feature 007: Reset "Biggest W" tracking for new level
        player.biggestCollectedValue = 0;
        player.biggestCollectedName = '';

        const targetSize = preservePlayerSize
            ? Math.max(player.size.x, config.startingPlayerSize)
            : config.startingPlayerSize;

        player.size = vec2(targetSize, targetSize);
        player.mass = targetSize * targetSize;
        player.pos = vec2(0, 0);
        player.velocity = vec2(0, 0);
    }

    // Clear old collectibles (T024)
    engineObjects.forEach(obj => {
        if (obj instanceof Collectible) {
            obj.destroy();
        }
    });

    // Feature 006: Clear popup text on level transitions (FR-006-017, T003)
    if (popupTextManager) {
        popupTextManager.clear();
    }

    // Spawn new collectibles for this level (T025)
    spawnCollectiblesForLevel(config);

    // Set state to playing FIRST (T010)
    levelState = STATE.PLAYING;

    // BUGFIX: Start timer on NEXT frame (not immediately) to prevent black screen time loss
    // Use setTimeout to delay timer start by 1 frame (~16ms)
    setTimeout(() => {
        levelStartTime = time;
        remainingTime = config.timeLimit;
    }, 100);  // 100ms delay ensures first frame renders before timer starts

    console.log(`Level ${config.levelNumber} started - Target: ${config.targetSize}x, Time: ${config.timeLimit}s`);
    console.log(`  Player actual size: ${player.size.x.toFixed(2)} units`);
}

// Handle transition between levels (US1 T011, US2 T017)
function handleTransition() {
    if (levelState === STATE.VICTORY) {
        // Victory: advance to next level or complete game (T011)
        if (currentLevel < LEVEL_CONFIG.length - 1) {
            // BUGFIX: Reset player size each level so objects are collectable
            startLevel(currentLevel + 1, {
                preservePlayerSize: false,  // Reset to 0.5 each level
                carryForwardScore: true
            });
        } else {
            // Game complete (beat all 3 levels)
            levelState = STATE.GAME_COMPLETE;
            console.log('GAME COMPLETE! All 3 levels beaten!');
        }
    } else if (levelState === STATE.DEFEAT) {
        // Defeat: retry same level (T017)
        startLevel(currentLevel, {
            preservePlayerSize: false,
            carryForwardScore: false
        });
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
    const playerReferenceSize = player ? player.size.x : config.startingPlayerSize;

    let objectsForLevel = Object.entries(COLLECTIBLE_DATA)
        .filter(([, data]) => data.level === config.levelNumber);

    if (!objectsForLevel.length) {
        console.warn(`No collectibles tagged for level ${config.levelNumber}; falling back to full pool.`);
        objectsForLevel = Object.entries(COLLECTIBLE_DATA);
    }

    // BUGFIX: Create pools based on COLLECTIBLE vs PLAYER size for winnable levels
    // Small pool: Objects player can IMMEDIATELY collect (smaller than current player size)
    const smallPool = objectsForLevel.filter(([, data]) => data.sizeRange[0] < playerReferenceSize * 0.8);
    // Medium pool: Objects player can collect after moderate growth
    const mediumPool = objectsForLevel.filter(([, data]) =>
        data.sizeRange[0] >= playerReferenceSize * 0.8 && data.sizeRange[1] < config.targetSize * 0.7
    );
    // Large pool: Objects player can collect when near victory
    const largePool = objectsForLevel.filter(([, data]) => data.sizeRange[0] >= config.targetSize * 0.5);

    const chooseFromPool = (pool) => {
        const source = pool.length ? pool : objectsForLevel;
        return source[Math.floor(Math.random() * source.length)];
    };

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

        // Create size tiers: 40% small (immediately collectable), 40% medium, 20% large
        const tier = Math.random();
        let entry;
        if (tier < 0.4) {
            entry = chooseFromPool(smallPool);
        } else if (tier < 0.8) {
            entry = chooseFromPool(mediumPool);
        } else {
            entry = chooseFromPool(largePool);
        }

        const [type, data] = entry;
        const [minSize, maxSize] = data.sizeRange;
        const span = Math.max(0, maxSize - minSize);

        // BUGFIX: Spawn sizes that are actually collectable
        // Small tier (40%): Spawn at MINIMUM of range (immediately collectable)
        // Medium tier (40%): Spawn in middle of range (moderate growth needed)
        // Large tier (20%): Spawn near maximum of range (near-victory needed)
        let sizeRatio;
        if (tier < 0.4) {
            sizeRatio = Math.random() * 0.2;  // 0-20% of range (near minimum)
        } else if (tier < 0.8) {
            sizeRatio = 0.4 + Math.random() * 0.3;  // 40-70% of range (middle)
        } else {
            sizeRatio = 0.7 + Math.random() * 0.3;  // 70-100% of range (near maximum)
        }

        const size = span ? minSize + span * clamp(sizeRatio, 0, 1) : minSize;

        // Boundary check: ensure collectible fits within play area
        const halfSize = size / 2;
        if (Math.abs(spawnPos.x) + halfSize < playAreaHalfSize &&
            Math.abs(spawnPos.y) + halfSize < playAreaHalfSize) {
            new Collectible(spawnPos, type, size);
            spawned++;
        }
    }

    console.log(`Level ${config.levelNumber}: Spawned ${spawned} collectibles with progressive sizing`);
    console.log(`  Player size: ${playerReferenceSize.toFixed(2)}, Target: ${config.targetSize}`);
    console.log(`  Small pool: ${smallPool.length}, Medium: ${mediumPool.length}, Large: ${largePool.length}`);
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

        // PERFORMANCE: Disable magnetic attraction temporarily to fix lag
        // Will re-enable after optimizing spatial partitioning
        // Magnetic attraction was running for all 40-80 objects every frame
        // Each doing distance calc + normalize + velocity updates = lag
        this.magnetActive = false;
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
        this.score = 0;                // Level earnings
        this.totalScore = 0;           // Cumulative earnings across levels
        this.biggestCollectedValue = 0;  // Feature 007: Track highest value object (FR-007-020)
        this.biggestCollectedName = '';  // Feature 007: Track object name for "Biggest W" stat
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

        // PERFORMANCE: Optimized collision check - only check nearby objects
        // Use spatial culling to reduce checks from 80 to ~5-10
        const checkRadius = this.size.x * 3;  // Only check objects within 3x player size

        for (let i = 0; i < engineObjects.length; i++) {
            const obj = engineObjects[i];
            if (obj instanceof Collectible && !obj.destroyed) {
                // Quick distance check (spatial culling)
                const dx = Math.abs(this.pos.x - obj.pos.x);
                const dy = Math.abs(this.pos.y - obj.pos.y);

                // Skip if too far (Manhattan distance approximation - faster than sqrt)
                if (dx > checkRadius || dy > checkRadius) continue;

                // Precise distance check only for nearby objects
                const dist = this.pos.distance(obj.pos);
                const minDist = (this.size.x + obj.size.x) / 2;

                if (dist < minDist && this.size.x > obj.size.x) {
                    this.collect(obj);
                }
            }
        }
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
        // Get object data for name display
        const objectData = COLLECTIBLE_DATA[collectible.type];
        const objectName = objectData ? objectData.name : collectible.type.toUpperCase();

        // Add score (FR-010)
        this.score += collectible.value;
        this.totalScore += collectible.value;

        // Feature 007: Track biggest collected object (FR-007-020, FR-007-021)
        if (collectible.value > this.biggestCollectedValue) {
            this.biggestCollectedValue = collectible.value;
            this.biggestCollectedName = objectName;
        }

        // Exponential size growth (FR-011, from research.md R1)
        // BUGFIX: Growth based on OBJECT SIZE with higher multiplier for faster progression
        const growthAmount = collectible.size.x * 0.5;  // Grow by 50% of collected object's size (was 15%, too slow)
        console.log(`Collected ${objectName} (size ${collectible.size.x.toFixed(2)}) → growth: ${growthAmount.toFixed(3)}, new size: ${(this.size.x + growthAmount).toFixed(2)}`);
        this.size = this.size.add(vec2(growthAmount, growthAmount));

        // Update mass to match new size (area-based for momentum)
        this.mass = this.size.x * this.size.x;

        // Destroy collectible (FR-009)
        collectible.destroy();

        // Feature 006: Show collection popup (FR-006-003, T004)
        if (popupTextManager) {
            popupTextManager.showCollection(objectName, collectible.value, collectible.pos);
        }

        // Feature 005: Particle burst on collection (FR-005-001, FR-005-002)
        // PERFORMANCE TEST: Temporarily disabled to diagnose lag
        // spawnCollectionParticles(collectible.pos, collectible.value);

        // Feature 004: Collection sound (FR-004-003, FR-004-004, T007)
        // PERFORMANCE TEST: Temporarily disabled to diagnose lag
        // if (soundManager) {
        //     soundManager.playCollect(collectible.pos, collectible.value);
        // }

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
