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

// ============================================================================
// ENGINE CALLBACKS (LittleJS requires exactly these 5 functions)
// ============================================================================

function gameInit() {
    // Called when starting or restarting game
    console.log('Tiny Tycoon - Game initialized');

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
    // Camera follow player with lerp (FR-013, research.md R3)
    if (player) {
        cameraPos = cameraPos.lerp(player.pos, 0.1);
    }

    // Feature 002: Timer countdown and lose condition (T015, will be enhanced in US3 T019)
    if (levelState === STATE.PLAYING) {
        const elapsed = time - levelStartTime;
        remainingTime = Math.max(0, LEVEL_CONFIG[currentLevel].timeLimit - elapsed);

        // Lose condition: time expired without reaching target
        if (remainingTime <= 0 && player && player.size.x < LEVEL_CONFIG[currentLevel].targetSize) {
            levelState = STATE.DEFEAT;
            transitionStartTime = time;
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

        // Feature 002: Check win condition immediately after size update (T007)
        if (levelState === STATE.PLAYING &&
            this.size.x >= LEVEL_CONFIG[currentLevel].targetSize) {
            levelState = STATE.VICTORY;
            transitionStartTime = time;
            console.log('VICTORY! Target size reached!');
        }

        // Optional: Log collection for debugging
        // console.log('Collected', collectible.type, '| Score:', this.score);
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
