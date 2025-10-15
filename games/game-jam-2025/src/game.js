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

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

let player;
let gameInitCallCount = 0;

// ============================================================================
// ENGINE CALLBACKS (LittleJS requires exactly these 5 functions)
// ============================================================================

function gameInit() {
    // Called when starting or restarting game (this is the FIRST callback!)
    gameInitCallCount++;
    console.log('===> GAME INIT CALLED #' + gameInitCallCount + ' <===');

    try {
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
        console.log('COLLECTIBLE_DATA initialized:', COLLECTIBLE_DATA);

        // Set camera (FR-001)
        cameraPos = vec2(0, 0);
        cameraScale = 32;
        console.log('Camera set:', cameraPos, cameraScale);

        // Create player at origin (FR-001)
        console.log('About to create PlayerBall...');
        player = new PlayerBall(vec2(0, 0));
        console.log('Player created successfully:', player);

        console.log('Player position:', player.pos);
        console.log('Player size:', player.size);

        // Spawn collectibles (FR-006, from research.md R4)
        console.log('Spawning collectibles...');
        spawnCollectibles();
    } catch (error) {
        console.error('ERROR IN GAME INIT:', error);
    }

    console.log('===> GAME INIT COMPLETE <===');
}

function gameUpdate() {
    // Camera follow player with lerp (FR-013, research.md R3)
    if (player) {
        cameraPos = cameraPos.lerp(player.pos, 0.1);
    }
}

function gameUpdatePost() {
    // Post-update (after physics and object updates)
}

function gameRender() {
    // World-space rendering (background, terrain)
    // Draw green background
    drawRect(cameraPos, vec2(100), new Color(0.2, 0.6, 0.3));

    // Draw grid lines as reference (so you can see movement)
    for (let x = -50; x <= 50; x += 5) {
        drawLine(vec2(x, -50), vec2(x, 50), 0.1, new Color(0, 0, 0, 0.3));
    }
    for (let y = -50; y <= 50; y += 5) {
        drawLine(vec2(-50, y), vec2(50, y), 0.1, new Color(0, 0, 0, 0.3));
    }

    // Draw origin marker (red dot at 0,0)
    drawRect(vec2(0, 0), vec2(1, 1), new Color(1, 0, 0));
}

function gameRenderPost() {
    // Screen-space rendering (HUD, UI)
    // Draw title to verify rendering works
    drawTextScreen('Tiny Tycoon', vec2(mainCanvasSize.x/2, 50), 40, new Color(1, 1, 1));
}

// ============================================================================
// SPAWN SYSTEM
// ============================================================================

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
        this.damping = 1.0;  // No movement damping (static objects)
        this.collideSolidObjects = true;  // Enable collision detection
    }

    update() {
        super.update();
        // Magnetic attraction will be added in Phase 6 (T040-T048)
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
        const moveSpeed = 0.03;  // Very slow for precise control
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

        const sizeMultiplier = (this.size.x / 0.5).toFixed(2);
        console.log('Collected', collectible.type, '| Score:', this.score, '| Size:', sizeMultiplier + 'x');
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
