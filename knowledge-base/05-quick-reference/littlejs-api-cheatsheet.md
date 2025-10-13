# LittleJS API Quick Reference

> **Navigation**: [← Knowledge Base Home](../README.md) | [Troubleshooting →](troubleshooting-guide.md)

## Essential Functions (Copy-Paste Ready)

### Game Loop Setup

```javascript
// Minimal game setup
function gameInit() {
    // Called once at startup
}

function gameUpdate() {
    // Called every frame (60fps)
}

function gameUpdatePost() {
    // After physics
}

function gameRender() {
    // Custom rendering
}

function gameRenderPost() {
    // UI overlays
}

// Start engine
engineInit(gameInit, gameUpdate, gameUpdatePost,
           gameRender, gameRenderPost, ['tiles.png']);
```

### Vector2 (Most Used)

```javascript
// Creation
vec2(x, y)              // New vector
vec2()                  // Zero vector (0, 0)

// Common operations
v.add(v2)               // v + v2
v.subtract(v2)          // v - v2
v.multiply(v2)          // v * v2 (component-wise)
v.scale(s)              // v * scalar
v.length()              // Magnitude
v.normalize()           // Unit vector
v.distance(v2)          // Distance to v2
v.angle()               // Angle in radians
v.setAngle(a, length)   // Set from angle
v.rotate(a)             // Rotate by angle
v.lerp(v2, t)           // Linear interpolation
v.copy()                // Clone vector
```

### EngineObject (Game Entities)

```javascript
class MyObject extends EngineObject {
    constructor(pos) {
        super(
            pos,            // Position (vec2)
            vec2(1, 1),     // Size (vec2)
            tile(0, 16)     // Tile info (or undefined)
        );

        // Enable collision
        this.setCollision(
            true,  // collideSolidObjects
            true,  // isSolid
            true   // collideTiles
        );

        // Physics properties
        this.mass = 1;
        this.damping = 0.99;
        this.elasticity = 0;
        this.friction = 0.8;
        this.gravityScale = 1;
    }

    update() {
        // Your logic here
        super.update();  // Apply physics
    }

    render() {
        // Custom rendering
        super.render();  // Default sprite rendering
    }

    collideWithObject(obj) {
        // Handle object collision
        return true;  // Apply physics response
    }

    collideWithTile(data, pos) {
        // Handle tile collision
        return true;  // Apply collision
    }
}
```

### Input

```javascript
// Keyboard
keyIsDown('KeyW')           // Is key down now?
keyWasPressed('Space')      // Was pressed this frame?
keyWasReleased('Escape')    // Was released this frame?

// Direction (WASD or arrows)
keyDirection()              // vec2 with -1/0/1 components

// Mouse
mouseIsDown(0)              // Button down (0=left, 1=middle, 2=right)
mouseWasPressed(0)          // Button pressed this frame
mouseWasReleased(0)         // Button released this frame
mousePos                    // World position (vec2)
mousePosScreen              // Screen position (vec2)
mouseWheel                  // Wheel delta this frame

// Gamepad (gamepad index 0-3)
gamepadIsDown(0, 0)         // Button down (button, gamepad)
gamepadWasPressed(0, 0)     // Button pressed
gamepadStick(0, 0)          // Stick value (stick, gamepad) returns vec2
```

### Drawing

```javascript
// Sprites
drawTile(pos, size, tileInfo, color, angle, mirror, additiveColor)

// Shapes
drawRect(pos, size, color, angle)
drawLine(posA, posB, thickness, color)
drawCircle(pos, radius, color, filled)
drawPoly(points, color, filled, angle)

// Text
drawText('Hello', pos, size, color, lineWidth, outlineColor, font)
drawTextScreen('Score: 10', vec2(10, 10), 20)  // Screen space

// Colors
rgb(r, g, b, a)         // RGBA (0-1)
hsl(h, s, l, a)         // HSL (0-1)
const RED = rgb(1, 0, 0)
const WHITE = rgb(1, 1, 1)
const BLACK = rgb(0, 0, 0)
```

### Particles

```javascript
new ParticleEmitter(
    pos,                // Position
    0,                  // Angle
    1,                  // Emit size (circle radius or vec2 for rect)
    0.1,                // Emit time (0 = infinite)
    50,                 // Emit rate (particles/sec)
    PI,                 // Emit cone angle
    tile(0, 16),        // Tile info (or undefined)
    rgb(1,1,1),         // Color start A
    rgb(1,1,1),         // Color start B
    rgb(1,1,1,0),       // Color end A
    rgb(0,0,0,0),       // Color end B
    0.5,                // Particle time (lifespan)
    0.5,                // Size start
    0.1,                // Size end
    0.1,                // Speed
    0.05,               // Angle speed
    0.99,               // Damping
    1,                  // Angle damping
    0,                  // Gravity scale
    PI,                 // Particle cone angle
    0.1,                // Fade rate
    0.2,                // Randomness
    false,              // Collide with tiles
    false,              // Additive blending
    true,               // Random color linear
    0                   // Render order
);
```

### Tile Layers

```javascript
// Create tile layer
const layer = new TileLayer(
    vec2(0, 0),         // Position
    vec2(32, 32),       // Size in tiles
    tile(0, 16)         // Tile info
);

// Set tile
layer.setData(vec2(x, y), new TileLayerData(
    tileIndex,          // Tile index in atlas
    direction,          // 0-3 (rotation)
    mirror,             // Flip horizontally
    color               // Tint color
));

// Collision layer
const collisionLayer = new TileCollisionLayer(
    vec2(0, 0),
    vec2(32, 32),
    tile(0, 16),
    0                   // Render order
);

// Set collision
collisionLayer.setCollisionData(vec2(x, y), 1);  // 1=solid, 0=empty
collisionLayer.isSolid = true;

// Query collision
tileCollisionTest(pos, size)  // Returns layer if collision
tileCollisionRaycast(start, end)  // Returns hit position
```

### Audio (ZzFX)

```javascript
// Define sound (ZzFX parameters)
const sound_jump = new Sound([
    1,      // Volume
    .05,    // Randomness
    220,    // Frequency
    .01,    // Attack
    .2,     // Sustain
    .3,     // Release
    0,      // Shape
    1,      // Shape curve
    0,      // Slide
    0,      // Delta slide
    0,      // Pitch jump
    0,      // Pitch jump time
    0,      // Repeat time
    0,      // Noise
    0,      // Mod
    0,      // Mod envelope
    0,      // Decay
    .5,     // Tremolo
    0,      // Tremolo speed
    0       // Lowpass
]);

// Play sound
sound_jump.play();                  // Global
sound_jump.play(pos);               // Positional
sound_jump.play(pos, volume, pitch);  // With params
```

### Utility Functions

```javascript
// Math
rand(min, max)          // Random float
randInt(min, max)       // Random int (max exclusive)
randSign()              // -1 or 1
randBool(chance)        // Boolean (chance 0-1)
randVec2(length)        // Random direction vector

clamp(value, min, max)  // Constrain value
lerp(a, b, percent)     // Linear interpolation
percent(value, a, b)    // Get percentage
mod(n, divisor)         // Modulo (handles negatives)
wave(frequency, amplitude, time)  // Sine wave

// Collision
isOverlapping(posA, sizeA, posB, sizeB)  // AABB test
isIntersecting(start, end, pos, size)    // Line-box test

// Timing
const timer = new Timer(2);  // 2 second timer
timer.elapsed()         // Has timer finished?
timer.percent()         // 0-1 progress
timer.active()          // Is timer running?
timer.set(1)            // Reset to 1 second
```

### Camera

```javascript
// Global settings
cameraPos = vec2(x, y);     // Camera center
cameraScale = 32;           // Pixels per world unit
cameraAngle = 0;            // Camera rotation

// Coordinate conversion
worldToScreen(worldPos)     // World → screen space
screenToWorld(screenPos)    // Screen → world space

// Effects
setCameraPos(pos)           // Set camera position
setCameraAngle(angle)       // Set camera rotation
```

### Settings (Global)

```javascript
// Display
gravity = vec2(0, -0.01);   // World gravity
canvasPixelated = true;     // Crisp pixels
glEnable = true;            // Use WebGL
glCircleSides = 12;         // Circle quality

// Physics
objectMaxSpeed = 1;         // Max object velocity
enablePhysicsSolver = true; // Mass-based collisions

// Debug
debug = false;              // Show debug overlay
debugParticles = false;     // Show particle bounds
```

### Common Patterns

#### Movement
```javascript
update() {
    // Keyboard
    const input = keyDirection();
    this.velocity.x = input.x * 0.2;

    // Mouse follow
    const toMouse = mousePos.subtract(this.pos);
    this.velocity = toMouse.normalize().scale(0.1);

    super.update();
}
```

#### Shooting
```javascript
shoot() {
    const dir = mousePos.subtract(this.pos).normalize();
    new Bullet(this.pos, dir.scale(0.5));
}
```

#### Health System
```javascript
constructor(pos) {
    super(pos, vec2(1, 1), tile(0, 16));
    this.health = 100;
    this.maxHealth = 100;
}

takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
        this.destroy();
    }
}
```

#### Timer-Based Actions
```javascript
constructor(pos) {
    super(pos, vec2(1, 1), tile(0, 16));
    this.shootTimer = new Timer(1);  // 1 second
}

update() {
    if (this.shootTimer.elapsed()) {
        this.shoot();
        this.shootTimer.set(1);  // Reset
    }
    super.update();
}
```

#### Screen Shake
```javascript
function screenShake(intensity = 0.1) {
    cameraPos.x += rand(-intensity, intensity);
    cameraPos.y += rand(-intensity, intensity);
}
```

## Physics Prize Specific

### Elastic Collisions
```javascript
constructor(pos) {
    super(pos, vec2(1, 1), tile(0, 16));
    this.setCollision(true, true, true);
    this.elasticity = 1.0;  // Perfect bounce
    this.damping = 1.0;     // No energy loss
}
```

### Custom Collision Response
```javascript
collideWithObject(obj) {
    if (obj instanceof Wall) {
        // Calculate bounce angle
        const normal = this.pos.subtract(obj.pos).normalize();
        const speed = this.velocity.length();
        this.velocity = normal.scale(speed * 1.2);  // Boost on bounce

        // Particles and sound
        new ParticleEmitter(this.pos, ...);
        sound_bounce.play(this.pos);
    }
    return true;
}
```

### Explosion Force
```javascript
explode(radius = 5, force = 0.5) {
    const nearby = engineObjectsGet(this.pos, radius);
    for (const obj of nearby) {
        if (obj === this) continue;

        const dir = obj.pos.subtract(this.pos);
        const dist = dir.length();
        if (dist < radius && obj.velocity) {
            const impulse = dir.normalize().scale(
                force * (1 - dist / radius)  // Falloff
            );
            obj.velocity = obj.velocity.add(impulse);
        }
    }
}
```

### Gravity Wells
```javascript
class GravityWell extends EngineObject {
    constructor(pos, strength = 0.01) {
        super(pos, vec2(2, 2), tile(5, 16));
        this.strength = strength;
    }

    update() {
        // Pull nearby objects
        const nearby = engineObjectsGet(this.pos, 10);
        for (const obj of nearby) {
            if (obj === this || !obj.velocity) continue;

            const dir = this.pos.subtract(obj.pos);
            const dist = dir.length();
            if (dist > 0) {
                const force = dir.normalize().scale(
                    this.strength / (dist * dist)  // Inverse square
                );
                obj.velocity = obj.velocity.add(force);
            }
        }
        super.update();
    }
}
```

## Debug Helpers

```javascript
// In gameRenderPost()
function gameRenderPost() {
    if (debug) {
        // Draw collision boxes
        engineObjects.forEach(obj => {
            if (obj.size) {
                drawRect(obj.pos, obj.size, RED.scale(1, 0.3), 0, true);
            }
        });

        // Draw FPS
        drawTextScreen(`FPS: ${engineFPS|0}`, vec2(10, 10), 20);
    }
}
```

## Performance Tips

```javascript
// Object pooling (built-in for particles)
// Spatial queries (efficient)
const nearby = engineObjectsGet(pos, radius);

// Render order (batch similar objects)
constructor(pos) {
    super(pos, vec2(1, 1), tile(0, 16));
    this.renderOrder = 1;  // Same order = batched
}

// Disable off-screen objects
update() {
    if (!isOverlapping(this.pos, this.size, cameraPos, vec2(20, 15))) {
        return;  // Skip update if off-screen
    }
    super.update();
}
```

## Quick Start Template

```javascript
'use strict';

// Game globals
let player;

function gameInit() {
    // Create player
    player = new Player(vec2(0, 5));
}

function gameUpdate() {
    // Game logic
}

function gameUpdatePost() {
    // Camera follow
    cameraPos = cameraPos.lerp(player.pos, 0.1);
}

function gameRender() {
    // Background
    drawRect(cameraPos, vec2(100, 100), rgb(0.2, 0.2, 0.3));
}

function gameRenderPost() {
    // UI
    drawTextScreen(`Score: ${player.score}`, vec2(10, 10), 30);
}

class Player extends EngineObject {
    constructor(pos) {
        super(pos, vec2(1, 2), tile(0, 16));
        this.setCollision(true, true, true);
        this.score = 0;
    }

    update() {
        // Movement
        const input = keyDirection();
        this.velocity.x = input.x * 0.2;

        // Jump
        if (this.groundObject && keyWasPressed('Space')) {
            this.velocity.y = 0.5;
        }

        super.update();
    }
}

engineInit(gameInit, gameUpdate, gameUpdatePost,
           gameRender, gameRenderPost, ['tiles.png']);
```

## Resources

- **Full API**: https://killedbyapixel.github.io/LittleJS/docs
- **Source**: https://github.com/KilledByAPixel/LittleJS
- **Examples**: https://killedbyapixel.github.io/LittleJS/examples/
- **Discord**: https://discord.gg/zb7hcGkyZe

---

**Print this sheet and keep it next to your keyboard during the jam!** 🎮
