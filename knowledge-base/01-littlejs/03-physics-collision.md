# LittleJS Physics & Collision System

> **Navigation**: [← Engine Overview](01-engine-overview.md) | [Knowledge Base Home](../README.md) | [Next: Audio System →](04-audio-system.md)

## 🏆 CRITICAL FOR GAME JAM

**$100 Charity Prize for Best Physics Use**

This system is your path to the physics prize! Understanding and creatively using these features can win you the special category award.

## 🔗 Contextual Connections

### → Game Jam Connection
- **Physics Prize**: $100 donated to charity of your choice
- **Judging Criteria**: Innovation, creativity, technical excellence
- **Perfect for 31 Days**: Time to polish physics interactions
- **Browser Showcase**: Physics runs smoothly in web browsers

### → Spec Kit Connection
- **Test-First**: Physics behaviors are easily testable (Article III)
- **Integration Tests**: Real physics interactions (Article IX)
- **Simplicity**: Arcade physics, not over-engineered (Article VII)

## Architecture Overview

LittleJS uses **arcade physics** - simple, fast, and perfect for 2D games. It's not a realistic physics simulator like Box2D, but that's the point: it's designed for responsive, fun game feel.

### Physics Pipeline

```
Each Frame (60fps):
1. Apply gravity
2. Apply velocity (position += velocity * deltaTime)
3. Apply damping (velocity *= damping)
4. Clamp to max speed
5. Check tile collisions
6. Check object collisions
7. Resolve collisions (bouncing, friction)
8. Update angle/angular velocity
```

## Core Physics Properties

### EngineObject Physics Members

Every `EngineObject` has these physics properties:

```javascript
class EngineObject {
    // Position & Movement
    pos = vec2(0, 0);           // World position
    velocity = vec2(0, 0);       // Movement per second
    acceleration = vec2(0, 0);   // Acceleration per second²
    angle = 0;                   // Rotation in radians
    angleVelocity = 0;           // Angular speed

    // Physical Properties
    mass = 1;                    // Mass for collisions
    damping = 0.99;              // Velocity damping (0-1)
    angleDamping = 0.99;         // Angular damping (0-1)
    gravityScale = 1;            // 0=no gravity, 1=normal
    elasticity = 0;              // Bounciness (0-1)
    friction = 0.8;              // Surface friction (0-1)

    // Collision
    size = vec2(1, 1);           // Collision box size
    collideTiles = false;        // Collide with tile layers
    collideSolidObjects = false; // Collide with objects
    isSolid = true;              // Can be collided with
}
```

## Setting Up Physics

### Basic Physics Object

```javascript
class Ball extends EngineObject {
    constructor(pos) {
        super(pos, vec2(1, 1), tile(0, 16));

        // Enable collision
        this.setCollision(true, true, true);
        // args: collideSolidObjects, isSolid, collideTiles

        // Physics properties
        this.elasticity = 0.8;    // Very bouncy
        this.damping = 0.99;      // Minimal air resistance
        this.mass = 1;            // Standard mass
        this.gravityScale = 1;    // Affected by gravity
    }

    update() {
        // Physics automatically applied by engine
        super.update();
    }
}
```

### No Gravity (Space Game)

```javascript
class Spaceship extends EngineObject {
    constructor(pos) {
        super(pos, vec2(2, 1), tile(1, 16));
        this.setCollision(true, true, false);

        this.gravityScale = 0;     // No gravity
        this.damping = 0.95;       // Drift in space
        this.angleDamping = 0.95;  // Spinning motion
    }

    update() {
        // Apply thrust
        if (keyIsDown('ArrowUp')) {
            const thrust = vec2().setAngle(this.angle, 0.01);
            this.velocity = this.velocity.add(thrust);
        }

        super.update();
    }
}
```

## Collision Detection

### Object-to-Object Collision

```javascript
class Player extends EngineObject {
    constructor(pos) {
        super(pos, vec2(1, 2), tile(0, 16));
        this.setCollision(true, true, true);
    }

    collideWithObject(object) {
        // Called when colliding with another object

        if (object instanceof Enemy) {
            this.takeDamage(10);
            return false;  // Don't apply physics response
        }

        if (object instanceof Coin) {
            object.collect();
            return false;  // Trigger only, no collision
        }

        return true;  // Apply standard collision physics
    }
}
```

### Mass-Based Collisions

When two solid objects collide, LittleJS applies elastic collision:

```javascript
// Heavy object
class Boulder extends EngineObject {
    constructor(pos) {
        super(pos, vec2(2, 2), tile(2, 16));
        this.setCollision(true, true, true);
        this.mass = 10;  // 10x heavier
        this.elasticity = 0.3;
    }
}

// Light object
class Player extends EngineObject {
    constructor(pos) {
        super(pos, vec2(1, 2), tile(0, 16));
        this.setCollision(true, true, true);
        this.mass = 1;  // Normal mass
    }
}

// Player bounces off boulder dramatically
// Boulder barely moves
```

### Collision Callback Details

```javascript
collideWithObject(object) {
    // 'object' is what we're colliding with
    // 'this' is the current object

    // Return values:
    // - true: Apply physics collision response
    // - false: Skip physics (trigger only)

    // Common patterns:
    if (object.isEnemy && this.isInvincible) {
        return false;  // Pass through
    }

    if (object.isPowerup) {
        object.collect();
        return false;  // No physics
    }

    return true;  // Normal collision
}

collideWithTile(tileData, pos) {
    // Called when hitting a tile
    // tileData: collision data (0 = empty, 1+ = solid)
    // pos: tile position in grid

    if (tileData === 2) {  // Special tile type
        // Bouncy tile
        this.elasticity = 1.5;
    }

    return true;  // Apply collision
}

collideWithTileRaycast(tileData, pos) {
    // Called during raycasting
    // Use for line-of-sight checks

    return tileData > 0;  // Stop at solid tiles
}
```

## Tile Collision

### Setting Up Tile Collision

```javascript
// In gameInit()
const tileLayer = new TileCollisionLayer(
    vec2(0, 0),        // position
    vec2(32, 32),      // size (tiles)
    tile(0, 16),       // tile info
    0                  // render order
);

// Set collision data (1 = solid, 0 = empty)
for (let x = 0; x < 32; x++) {
    tileLayer.setCollisionData(vec2(x, 0), 1);  // Floor
}

tileLayer.isSolid = true;  // Enable collision
```

### Raycasting

```javascript
// Check if path is clear
const start = player.pos;
const end = enemy.pos;

const hitPos = tileCollisionRaycast(start, end);
if (hitPos) {
    // Path blocked by tile at hitPos
    console.log('No line of sight');
} else {
    // Clear path
    enemy.shoot(player.pos);
}
```

## Advanced Physics Techniques

### Jump Physics (Platformer)

```javascript
class Player extends EngineObject {
    constructor(pos) {
        super(pos, vec2(1, 2), tile(0, 16));
        this.setCollision(true, true, true);

        this.jumpSpeed = 0.5;
        this.moveSpeed = 0.15;
        this.groundObject = null;
    }

    update() {
        // Horizontal movement
        const input = keyDirection();
        this.velocity.x = input.x * this.moveSpeed;

        // Jump only when grounded
        if (this.groundObject && keyWasPressed('Space')) {
            this.velocity.y = this.jumpSpeed;
        }

        super.update();
    }
}
```

### Wall Sliding

```javascript
class Player extends EngineObject {
    update() {
        // Check if against wall
        const leftWall = tileCollisionTest(
            this.pos.add(vec2(-0.6, 0)),
            vec2(0.1, 1)
        );
        const rightWall = tileCollisionTest(
            this.pos.add(vec2(0.6, 0)),
            vec2(0.1, 1)
        );

        const againstWall = leftWall || rightWall;

        if (againstWall && !this.groundObject) {
            // Slow falling when against wall
            this.velocity.y = max(this.velocity.y, -0.1);

            // Wall jump
            if (keyWasPressed('Space')) {
                const jumpDir = leftWall ? 1 : -1;
                this.velocity.x = jumpDir * 0.3;
                this.velocity.y = 0.5;
            }
        }

        super.update();
    }
}
```

### Grappling Hook

```javascript
class Player extends EngineObject {
    constructor(pos) {
        super(pos, vec2(1, 2), tile(0, 16));
        this.grapplePoint = null;
        this.grappleLength = 0;
    }

    update() {
        if (this.grapplePoint) {
            // Pull toward grapple point
            const toGrapple = this.grapplePoint.subtract(this.pos);
            const distance = toGrapple.length();

            if (distance > this.grappleLength) {
                // Too far - pull back
                const pullForce = toGrapple.normalize().scale(0.02);
                this.velocity = this.velocity.add(pullForce);
            }

            // Release
            if (keyWasPressed('Space')) {
                this.grapplePoint = null;
            }
        } else {
            // Fire grapple
            if (mouseWasPressed(0)) {
                const dir = mousePos.subtract(this.pos);
                const hit = tileCollisionRaycast(
                    this.pos,
                    this.pos.add(dir)
                );

                if (hit) {
                    this.grapplePoint = hit;
                    this.grappleLength = hit.subtract(this.pos).length();
                }
            }
        }

        super.update();
    }

    render() {
        super.render();

        if (this.grapplePoint) {
            // Draw rope
            drawLine(this.pos, this.grapplePoint, 0.1, WHITE);
        }
    }
}
```

### Projectile Physics

```javascript
class Projectile extends EngineObject {
    constructor(pos, velocity) {
        super(pos, vec2(0.3, 0.3), tile(3, 16));
        this.setCollision(false, false, true);

        this.velocity = velocity;
        this.gravityScale = 0.5;  // Slight arc
        this.damping = 1;         // No air resistance
        this.lifetime = 3;        // Destroy after 3 seconds
    }

    update() {
        this.lifetime -= 1/60;
        if (this.lifetime <= 0) {
            this.destroy();
        }

        super.update();
    }

    collideWithTile(tileData, pos) {
        if (tileData > 0) {
            // Hit wall - explode
            this.explode();
            this.destroy();
        }
        return true;
    }

    explode() {
        // Create explosion effect
        new ParticleEmitter(
            this.pos, 0, 1, 0.1, 50, PI,
            tile(4, 16),
            rgb(1, 0.5, 0), rgb(1, 0, 0),
            rgb(1, 1, 0, 0), rgb(0, 0, 0, 0),
            0.5, 0.5, 0.1, 0.1, 0.05
        );
    }
}
```

## Physics Prize Strategies

### What Judges Look For

1. **Innovation** - Novel use of physics
2. **Fun Factor** - Feels good to play
3. **Technical Excellence** - Smooth, bug-free
4. **Theme Integration** - Physics serves "SMALL" theme

### Winning Ideas

#### **1. Physics Puzzles**
```javascript
// Rube Goldberg machines
// Weight-based switches
// Domino effects
// Chain reactions
```

#### **2. Destruction Games**
```javascript
// Buildings that collapse realistically
// Objects break into pieces
// Particle debris
// Satisfying destruction
```

#### **3. Momentum-Based Gameplay**
```javascript
// Swinging mechanics
// Launch and trajectory prediction
// Billiards/pool mechanics
// Conservation of momentum showcases
```

#### **4. Unique Collision Responses**
```javascript
// Bouncy surfaces
// Sticky surfaces
// Magnetic attraction/repulsion
// Variable gravity zones
```

### Example: Bouncy Platformer

```javascript
class BouncyPlatform extends EngineObject {
    constructor(pos) {
        super(pos, vec2(3, 0.5), tile(5, 16));
        this.setCollision(false, true, false);
        this.elasticity = 2;  // Super bouncy!
    }

    collideWithObject(object) {
        if (object instanceof Player) {
            // Extra bounce based on fall speed
            const bounceMultiplier = min(-object.velocity.y * 2, 1);
            object.velocity.y *= (1 + bounceMultiplier);

            // Visual feedback
            new ParticleEmitter(
                object.pos, 0, 1, 0.1, 20, PI,
                null, WHITE, WHITE,
                rgb(1, 1, 1, 0), rgb(1, 1, 1, 0),
                0.3, 0.3, 0.1, 0.1, 0.05
            );

            // Audio feedback
            sound_bounce.play(this.pos);
        }
        return true;
    }
}
```

## Performance Optimization

### Spatial Queries

```javascript
// Get objects in area (efficient)
const nearbyObjects = engineObjectsGet(pos, radius);

// Check each one
for (const obj of nearbyObjects) {
    if (obj !== this && isOverlapping(this.pos, this.size, obj.pos, obj.size)) {
        // Handle collision
    }
}
```

### Sleep/Wake System

```javascript
class PhysicsObject extends EngineObject {
    constructor(pos) {
        super(pos, vec2(1, 1), tile(0, 16));
        this.sleeping = false;
        this.sleepThreshold = 0.01;
    }

    update() {
        if (this.sleeping) {
            // Check for wake conditions
            if (this.velocity.lengthSquared() > this.sleepThreshold) {
                this.sleeping = false;
            } else {
                return;  // Skip physics
            }
        }

        // Normal physics
        super.update();

        // Check for sleep
        if (this.velocity.lengthSquared() < this.sleepThreshold) {
            this.sleeping = true;
            this.velocity = vec2(0, 0);
        }
    }
}
```

## Testing Physics

### Unit Tests

```javascript
// Test collision detection
function testCollision() {
    const obj1 = new EngineObject(vec2(0, 0), vec2(1, 1));
    const obj2 = new EngineObject(vec2(0.5, 0), vec2(1, 1));

    const overlapping = isOverlapping(
        obj1.pos, obj1.size,
        obj2.pos, obj2.size
    );

    console.assert(overlapping, 'Objects should overlap');
}
```

### Debug Visualization

```javascript
class PhysicsDebugger {
    static drawCollisionBoxes() {
        engineObjects.forEach(obj => {
            if (obj.collideSolidObjects || obj.isSolid) {
                // Draw collision bounds
                const color = obj.collideSolidObjects ? RED : GREEN;
                drawRect(obj.pos, obj.size, color, 0, true);

                // Draw velocity vector
                const velEnd = obj.pos.add(obj.velocity.scale(10));
                drawLine(obj.pos, velEnd, 0.1, YELLOW);
            }
        });
    }
}

// In gameRenderPost()
function gameRenderPost() {
    if (debug) {
        PhysicsDebugger.drawCollisionBoxes();
    }
}
```

## Common Patterns

### One-Way Platforms

```javascript
class Platform extends EngineObject {
    constructor(pos) {
        super(pos, vec2(3, 0.3), tile(6, 16));
        this.setCollision(false, true, false);
    }

    collideWithObject(object) {
        // Only collide from above
        if (object.pos.y > this.pos.y && object.velocity.y < 0) {
            return true;  // Solid from top
        }
        return false;  // Pass through from sides/bottom
    }
}
```

### Moving Platforms

```javascript
class MovingPlatform extends EngineObject {
    constructor(pos, endPos) {
        super(pos, vec2(3, 0.5), tile(7, 16));
        this.setCollision(false, true, false);

        this.startPos = pos.copy();
        this.endPos = endPos;
        this.moveSpeed = 0.05;
        this.timer = 0;
    }

    update() {
        // Oscillate between start and end
        this.timer += this.moveSpeed;
        const t = Math.sin(this.timer) * 0.5 + 0.5;
        this.pos = this.startPos.lerp(this.endPos, t);

        super.update();
    }

    collideWithObject(object) {
        if (object.groundObject === this) {
            // Move object with platform
            object.pos.y = this.pos.y + this.size.y/2 + object.size.y/2;
        }
        return true;
    }
}
```

## Resources

### Further Reading
- [01-engine-overview.md](01-engine-overview.md) - Engine fundamentals
- [06-particles-effects.md](06-particles-effects.md) - Visual feedback for physics
- [07-tile-system.md](07-tile-system.md) - Tile collision setup

### Jam Strategy
- [../04-integration/03-physics-prize-strategy.md](../04-integration/03-physics-prize-strategy.md) - Win the $100 prize
- [../06-examples/physics-examples.md](../06-examples/physics-examples.md) - Game concepts

### Reference
- [../05-quick-reference/littlejs-api-cheatsheet.md](../05-quick-reference/littlejs-api-cheatsheet.md) - Physics API
- [LittleJS source](https://github.com/KilledByAPixel/LittleJS/blob/main/src/engineObject.js) - Full implementation

---

**Prize Reminder**: Innovative physics use = $100 to charity of your choice! 🏆
**Next**: [04-audio-system.md →](04-audio-system.md)
