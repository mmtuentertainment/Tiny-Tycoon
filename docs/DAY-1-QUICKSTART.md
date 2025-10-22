# DAY-1 QUICKSTART: Tiny Tycoon Setup
**Goal**: Working Tiny Tycoon skeleton in <30 minutes
**Full Details**: See ULTRA-DEEP-RESEARCH.md PART 26

---

## Prerequisites Checklist
- [ ] Node.js installed (verify: `node --version`)
- [ ] Git installed (verify: `git --version`)
- [ ] Text editor ready (VS Code recommended)
- [ ] Web browser with DevTools

---

## Step 1: Project Structure (5 min)
```bash
mkdir tiny-tycoon
cd tiny-tycoon
git init
```

Create this folder structure:
```
tiny-tycoon/
├── index.html
├── src/
│   └── game.js
├── assets/
│   └── tiles.png
└── build.js
```

---

## Step 2: Get LittleJS (2 min)
```bash
git clone https://github.com/KilledByAPixel/LittleJS.git
```

**Result**: `LittleJS/dist/littlejs.release.js` is now available

---

## Step 3: Create index.html (3 min)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Tiny Tycoon</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body style="margin:0;overflow:hidden;background:#000">
    <script src="LittleJS/dist/littlejs.release.js"></script>
    <script src="src/game.js"></script>
</body>
</html>
```

---

## Step 4: Create Minimal game.js (10 min)
```javascript
'use strict';

// ===== GLOBAL VARIABLES =====
let player;

// ===== ENGINE CALLBACKS =====

function engineInit() {
    // Called once at startup
    console.log('Engine initialized');
}

function gameInit() {
    // Called when starting or restarting game
    cameraPos = vec2(0, 0);
    cameraScale = 32;

    // Create player at origin
    player = new Player(vec2(0, 0));
}

function gameUpdate() {
    // Update camera to follow player
    if (player) {
        cameraPos = cameraPos.lerp(player.pos, 0.1);
    }
}

function gameUpdatePost() {
    // Called after physics/objects update
}

function gameRender() {
    // Draw background
    drawRect(cameraPos, vec2(100), new Color(0.2, 0.6, 0.3));
}

function gameRenderPost() {
    // Draw HUD in screen space
    drawTextScreen('Tiny Tycoon', vec2(mainCanvasSize.x/2, 50), 40, new Color(1,1,1), 0, 'center');
}

// ===== PLAYER CLASS =====

class Player extends EngineObject {
    constructor(pos) {
        super(pos, vec2(1)); // 1x1 size
        this.color = new Color(1, 0.8, 0);
        this.mass = 1;
        this.damping = 0.9;
    }

    update() {
        // WASD movement
        const moveSpeed = 0.2;
        const moveInput = vec2(
            (keyIsDown('KeyD') || keyIsDown('ArrowRight')) - (keyIsDown('KeyA') || keyIsDown('ArrowLeft')),
            (keyIsDown('KeyW') || keyIsDown('ArrowUp')) - (keyIsDown('KeyS') || keyIsDown('ArrowDown'))
        );

        this.velocity = this.velocity.add(moveInput.scale(moveSpeed));

        super.update();
    }

    render() {
        // Draw placeholder circle
        drawRect(this.pos, this.size, this.color);
    }
}
```

---

## Step 5: Test Run (5 min)

### Option A: Python HTTP Server
```bash
python3 -m http.server 8000
```

### Option B: Node.js http-server
```bash
npx http-server -p 8000
```

### Option C: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

**Open**: http://localhost:8000

---

## Step 6: Verify Functionality (5 min)

### Visual Checks
- [ ] Green background renders
- [ ] Yellow square (player) visible at center
- [ ] "Tiny Tycoon" title at top
- [ ] No console errors (F12 DevTools)

### Interaction Checks
- [ ] WASD moves player
- [ ] Arrow keys move player
- [ ] Camera follows player smoothly
- [ ] Player has momentum/damping

### Console Verification
```javascript
// Type in browser console:
player.pos           // Should show Vector2 {x, y}
cameraPos            // Should match player position
cameraScale          // Should be 32
```

---

## Step 7: Create Placeholder Sprites (Optional, 5 min)

If you need a quick tile sheet for testing:

1. Create 256×256 PNG with 16×16 grid
2. Save as `assets/tiles.png`
3. Update `gameInit()`:
```javascript
setTileImageSize(vec2(256, 256));
```

4. Update Player `render()`:
```javascript
render() {
    drawTile(this.pos, this.size, tile(0, 16)); // Use tile 0
}
```

**Tile Index Reference**: See ULTRA-DEEP-RESEARCH.md PART 28 for complete tile map (0-255).

---

## Troubleshooting

### "Uncaught ReferenceError: engineInit is not defined"
- **Fix**: Ensure `game.js` is loaded AFTER `littlejs.release.js` in `index.html`

### Player doesn't move
- **Check**: Open console and type `player` - should not be `undefined`
- **Check**: Verify `gameInit()` creates player: `player = new Player(vec2(0, 0));`

### CORS errors with file://
- **Fix**: Must use HTTP server (python, http-server, or Live Server)

### Black screen
- **Check**: Console for errors (F12)
- **Check**: `engineInit()` runs: add `console.log('Engine initialized');`
- **Check**: `gameInit()` runs: add `console.log('Game initialized');`

---

## Next Steps

You now have a working foundation! Continue with:

1. **Add Collectibles**: See ULTRA-DEEP-RESEARCH.md PART 15 (lines 2602-2627, Collectible class)
2. **Add Growth Mechanics**: See PART 15 (lines 2534-2600, PlayerBall.collect() method)
3. **Add Levels**: See PART 15 (lines 2750-2850, LevelManager class - search for "class LevelManager")
4. **Add Sounds**: See PART 15 (lines 2451-2466, sound definitions) and PART 21 (full sound design theory)
5. **Test Integration**: See CODE-INTEGRATION-TEST.md

---

## File Locations Reference

- **Research**: `docs/ULTRA-DEEP-RESEARCH.md` (6,800+ lines, PARTS 1-28)
- **Setup Details**: ULTRA-DEEP-RESEARCH.md PART 26 (full setup)
- **Integration Guide**: CODE-INTEGRATION-TEST.md (code assembly checklist)
- **Sprite Map**: ULTRA-DEEP-RESEARCH.md PART 28 (tile indices 0-255)

---

**Time Target**: 30 minutes
**Result**: Playable character moving on screen with camera follow
**Build System**: See `build.js` setup in ULTRA-DEEP-RESEARCH.md PART 27
