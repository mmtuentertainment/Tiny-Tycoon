# LittleJS Engine - Overview

> **Navigation**: [← Knowledge Base Home](../README.md) | [Next: Rendering System →](02-rendering-system.md)

## What is LittleJS?

LittleJS is an ultra-lightweight, fast, feature-rich HTML5 game engine with **zero dependencies**, designed for maximum performance and simplicity.

### Core Statistics

- **Size**: ~20KB minified + gzipped (full engine)
- **Source Code**: ~8,268 lines across 14 modules
- **Performance**: 100,000+ sprites at 60fps
- **License**: MIT (completely open source)
- **Version**: 1.14.16 (active development)
- **Created By**: Frank Force ([@KilledByAPixel](https://frankforce.com/))

## 🔗 Contextual Connections

### → Game Jam Connection
- **Theme "SMALL"**: Engine philosophy matches theme perfectly
- **31-day Duration**: Enough time to learn and master the engine
- **Browser Requirement**: LittleJS is built for web deployment
- **Physics Prize**: Engine has robust physics system [$100 charity prize]

### → Spec Kit Connection
- **Library-First**: LittleJS modules are self-contained (Article I)
- **Simple API**: Matches simplicity gate requirements (Article VII)
- **No Abstraction**: Direct framework usage (Article VIII)
- **Test Examples**: Supports test-first development (Article III)

## Architecture Overview

### 14 Core Modules

```
LittleJS/
├── src/
│   ├── engine.js              # 701 lines - Main loop & initialization
│   ├── engineSettings.js      # 556 lines - Configuration
│   ├── engineObject.js        # 473 lines - Base game object class
│   ├── engineDraw.js          # 987 lines - Rendering system
│   ├── engineWebGL.js         # 760 lines - WebGL2 batching
│   ├── engineUtilities.js     # 1,046 lines - Vector2, Color, Timer
│   ├── engineInput.js         # 620 lines - Input handling
│   ├── engineAudio.js         # 672 lines - Sound system (ZzFX)
│   ├── engineTileLayer.js     # 659 lines - Tile rendering
│   ├── engineParticles.js     # 378 lines - Particle system
│   ├── engineDebug.js         # 624 lines - Debug tools
│   ├── engineExport.js        # 331 lines - Video/screenshot
│   ├── engineMedals.js        # 192 lines - Achievements
│   └── engineRelease.js       # 40 lines - Production mode
```

### System Dependencies

```
┌─────────────────┐
│  Engine Core    │ ← Main loop (60fps fixed timestep)
└────────┬────────┘
         │
    ┌────┴────┬──────────┬────────────┬──────────┐
    ↓         ↓          ↓            ↓          ↓
┌───────┐ ┌───────┐ ┌────────┐ ┌─────────┐ ┌────────┐
│ Input │ │ Audio │ │ Render │ │ Physics │ │  Tiles │
└───────┘ └───────┘ └────────┘ └─────────┘ └────────┘
                         │
                    ┌────┴────┐
                    ↓         ↓
                ┌───────┐ ┌────────┐
                │ WebGL │ │Canvas2D│
                └───────┘ └────────┘
```

## Core Features by Category

### Rendering
- **Hybrid WebGL2 + Canvas2D**
- Batched sprite rendering (45,000+ instances/call)
- Texture atlas support (4096×4096)
- Tile layer caching
- Particle systems
- Debug primitives

→ Detailed: [02-rendering-system.md](02-rendering-system.md)

### Physics & Collision
- **Arcade physics** (velocity, acceleration, damping)
- AABB collision detection
- Mass-based collisions
- Tile-based collision layers
- Raycasting support
- Ground detection

→ Detailed: [03-physics-collision.md](03-physics-collision.md)
→ **Prize Strategy**: [../04-integration/03-physics-prize-strategy.md](../04-integration/03-physics-prize-strategy.md)

### Audio
- **ZzFX** procedural sound generation
- Positional audio (distance, panning)
- MP3/OGG/WAV file support
- Music system (ZzFXM)
- Speech synthesis
- Instance control

→ Detailed: [04-audio-system.md](04-audio-system.md)

### Input
- Keyboard (key states, WASD mapping)
- Mouse (buttons, position, wheel, delta)
- Gamepad (4 controllers, analog sticks)
- Touch (mobile support, virtual gamepad)
- Vibration API

→ Detailed: [05-input-handling.md](05-input-handling.md)

### Particles & Effects
- Particle emitters (circle/rect shapes)
- Color gradients
- Trail rendering
- Collision with tiles
- Local/world space
- Visual designer tool

→ Detailed: [06-particles-effects.md](06-particles-effects.md)

### Tile System
- Off-screen canvas caching
- Collision layers
- Tiled Editor compatibility
- Dynamic tile modification
- Multiple layers with render ordering

→ Detailed: [07-tile-system.md](07-tile-system.md)

## Getting Started

### Installation

**Option 1: Include from CDN**
```html
<script src="https://killedbyapixel.github.io/LittleJS/dist/littlejs.min.js"></script>
```

**Option 2: NPM**
```bash
npm install littlejsengine
```

**Option 3: Clone Repository**
```bash
git clone https://github.com/KilledByAPixel/LittleJS.git
```

### Basic Game Structure

```javascript
// Define game callbacks
function gameInit() {
    // Called once at startup
    // Initialize your game objects
}

function gameUpdate() {
    // Called every frame (60fps)
    // Update game logic
}

function gameUpdatePost() {
    // Called after physics/collision
    // UI updates, camera follow
}

function gameRender() {
    // Called for custom rendering
    // Draw backgrounds, custom effects
}

function gameRenderPost() {
    // Called after object rendering
    // Draw UI overlays
}

// Start the engine
engineInit(
    gameInit,
    gameUpdate,
    gameUpdatePost,
    gameRender,
    gameRenderPost,
    ['tiles.png']  // Images to preload
);
```

### Creating Game Objects

```javascript
class Player extends EngineObject {
    constructor(pos) {
        // position, size, tile info
        super(pos, vec2(1, 1), tile(0, 16));

        // Enable physics
        this.setCollision(true, true, true);
    }

    update() {
        // Handle input
        const direction = keyDirection();
        this.velocity = direction.scale(0.1);

        // Call parent update (applies physics)
        super.update();
    }

    render() {
        // Custom rendering
        super.render();
    }
}

// Instantiate in gameInit()
function gameInit() {
    new Player(vec2(0, 0));
}
```

## Engine Loop

### Fixed Timestep (60 FPS)

```
┌─────────────────────────────────────┐
│         Frame (16.67ms)             │
├─────────────────────────────────────┤
│ 1. Input Update                     │
│ 2. gameUpdate()                     │
│ 3. Object Physics & Collision       │
│ 4. gameUpdatePost()                 │
├─────────────────────────────────────┤
│ 5. gameRender()                     │
│ 6. Sort objects by renderOrder      │
│ 7. Render all objects               │
│ 8. gameRenderPost()                 │
│ 9. Flush WebGL batches              │
│ 10. Debug overlay                   │
└─────────────────────────────────────┘
```

### Coordinate Systems

**World Space** - Physics and game logic
```javascript
const pos = vec2(10, 5);  // 10 units right, 5 units up
```

**Screen Space** - UI and overlays
```javascript
const screenPos = worldToScreen(pos);
```

**Local Space** - Parent-child transforms
```javascript
child.parent = parentObject;
child.localPos = vec2(1, 0);  // Relative to parent
```

## Key Classes

### EngineObject
Base class for all game entities. Provides:
- Position, velocity, acceleration
- Collision detection
- Rendering (sprite or custom)
- Lifecycle management (update, render, destroy)
- Parent-child hierarchies

**Example**:
```javascript
class Enemy extends EngineObject {
    constructor(pos) {
        super(pos, vec2(1, 1), tile(1, 16));
        this.health = 100;
    }

    update() {
        // AI logic
        super.update();
    }

    damage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.destroy();
        }
    }
}
```

### Vector2
2D vector math class. Essential for all position/movement:
```javascript
const v1 = vec2(3, 4);
const v2 = vec2(1, 0);

v1.add(v2);           // Addition
v1.length();          // Magnitude: 5
v1.normalize();       // Unit vector
v1.angle();           // Angle in radians
v1.rotate(PI/4);      // Rotate by angle
```

### Color
RGBA color with HSL support:
```javascript
const red = rgb(1, 0, 0);
const transparent = rgb(1, 1, 1, 0.5);
const fromHex = new Color().setHex('#ff0000');

red.lerp(blue, 0.5);  // Blend colors
```

### Timer
Automatic time tracking:
```javascript
const timer = new Timer(2);  // 2 seconds

if (timer.elapsed()) {
    // Timer finished
}

const progress = timer.percent();  // 0.0 to 1.0
```

## Configuration

All settings in `engineSettings.js` can be modified:

```javascript
// Camera
cameraPos = vec2(0, 0);
cameraScale = 32;  // pixels per world unit

// Display
canvasPixelated = true;  // Crisp pixel art
glEnable = true;         // Use WebGL

// Physics
gravity = vec2(0, -0.01);
objectMaxSpeed = 1;

// Audio
soundEnable = true;
soundVolume = 1;
```

## Performance Characteristics

### Strengths
✅ **Rendering**: 100,000+ sprites at 60fps
✅ **Physics**: Thousands of active objects
✅ **Particles**: Massive particle counts
✅ **Load Time**: Instant (small bundle size)
✅ **Memory**: Very low footprint

### Best Practices
- Use texture atlases (single image for all sprites)
- Enable WebGL for sprite-heavy games
- Use tile layers for static backgrounds
- Pool particles (automatic in system)
- Batch draw calls via object render order

## Example Games

**Included in Repository**:
1. **Starter** - Clean template
2. **Breakout** - Block breaker with post-processing
3. **Puzzle** - Match-3 with high scores
4. **Platformer** - Full platformer with Tiled levels
5. **Stress Test** - 100k sprites benchmark
6. **Particle Designer** - Visual particle editor

**Shipped Games**:
- [Space Huggers](https://www.newgrounds.com/portal/view/819609) - Roguelike shooter
- [Isletopia](https://store.steampowered.com/app/1861260/Isletopia) - On Steam!
- Multiple JS13kGames winners

## Resources

### Official Links
- **GitHub**: https://github.com/KilledByAPixel/LittleJS
- **Documentation**: https://killedbyapixel.github.io/LittleJS/docs
- **Examples**: https://killedbyapixel.github.io/LittleJS/examples/
- **Discord**: https://discord.gg/zb7hcGkyZe

### Learning Path
1. Read this overview ✅
2. Study [starter example](https://killedbyapixel.github.io/LittleJS/examples/starter/)
3. Build simple game following examples
4. Explore advanced features (physics, particles, tiles)
5. Review [reference.md](https://github.com/KilledByAPixel/LittleJS/blob/main/reference.md)

## Next Steps

### For Game Jam Preparation
1. **Deep Dive Systems**: Read detailed docs for each system
2. **Physics Focus**: Study collision system for prize category
3. **Theme Exploration**: Consider "SMALL" interpretations
4. **Practice**: Build prototype before jam starts

### Recommended Reading Order
1. [02-rendering-system.md](02-rendering-system.md) - Visual output
2. [03-physics-collision.md](03-physics-collision.md) - **Prize category!**
3. [05-input-handling.md](05-input-handling.md) - Player interaction
4. [06-particles-effects.md](06-particles-effects.md) - Visual polish
5. [04-audio-system.md](04-audio-system.md) - Sound design
6. [07-tile-system.md](07-tile-system.md) - Level creation

### Integration with Spec Kit
- **Game Specification**: [../04-integration/02-game-specification.md](../04-integration/02-game-specification.md)
- **SDD for Games**: [../04-integration/01-sdd-for-game-dev.md](../04-integration/01-sdd-for-game-dev.md)
- **Development Timeline**: [../04-integration/04-31-day-timeline.md](../04-integration/04-31-day-timeline.md)

---

**Quick Reference**: [../05-quick-reference/littlejs-api-cheatsheet.md](../05-quick-reference/littlejs-api-cheatsheet.md)
**Troubleshooting**: [../05-quick-reference/troubleshooting-guide.md](../05-quick-reference/troubleshooting-guide.md)
**Next**: [02-rendering-system.md →](02-rendering-system.md)
