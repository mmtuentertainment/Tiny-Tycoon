# CODE INTEGRATION TEST CHECKLIST
**Purpose**: Verify all code pieces from ULTRA-DEEP-RESEARCH.md assemble correctly
**When**: Use after copying code examples into your project

---

## Pre-Integration Checklist

- [ ] Read ULTRA-DEEP-RESEARCH.md PART 15 (Complete Integration Example)
- [ ] Have `index.html` with LittleJS loaded
- [ ] Have empty `src/game.js` ready
- [ ] HTTP server ready for testing

---

## 1. File Structure Assembly

### game.js Order (CRITICAL - Must follow this sequence)
```javascript
// 1. 'use strict' directive (line 1)
// 2. Global variables (player, levelManager, sounds, etc.)
// 3. Configuration objects (COLLECTIBLE_DATA, LEVEL_DATA, etc.)
// 4. Sound data arrays (sound_collect_data, etc.)
// 5. engineInit() function
// 6. gameInit() function
// 7. gameUpdate() function
// 8. gameUpdatePost() function
// 9. gameRender() function
// 10. gameRenderPost() function
// 11. Class definitions (Player, Collectible, LevelManager, etc.)
```

**Verify**:
- [ ] Global variables declared BEFORE classes that use them
- [ ] Sound data defined BEFORE `engineInit()` loads them
- [ ] Configuration objects defined BEFORE classes reference them
- [ ] All 6 LittleJS callbacks present

---

## 2. Global Variables Test

**Location**: Top of `game.js` (after `'use strict'`)

### Required Globals
```javascript
let player;              // Player instance
let levelManager;        // Level manager instance
```

### Optional Globals (add as needed)
```javascript
let sound_collect;       // Sound: collect item
let sound_absorb;        // Sound: absorb competitor
let sound_level_complete; // Sound: level complete
```

**Test**:
```javascript
// In browser console after page loads:
console.log(typeof player);         // Should be 'object' after gameInit()
console.log(typeof levelManager);   // Should be 'object' after engineInit()
```

**✅ Pass**: Variables exist and are correct type
**❌ Fail**: `undefined` means variable not declared or not initialized

---

## 3. Sound System Test

**Location**: ULTRA-DEEP-RESEARCH.md PART 15 (lines 2451-2466) and PART 21 (sound design theory)

### Integration Steps
1. Copy sound data arrays from PART 15 (lines 2451-2466):
```javascript
const sound_collect_data = [,,400,.01,.01,.05,,.5,,,,,,.5];
const sound_absorb_data = [,,200,.1,.2,.3,,1,,,,,,.5];
```

2. Load in `engineInit()`:
```javascript
function engineInit() {
    sound_collect = new Sound(sound_collect_data);
    sound_absorb = new Sound(sound_absorb_data);
}
```

3. Play in classes:
```javascript
// In Collectible.collideWithObject():
sound_collect.play();
```

**Test**:
```javascript
// In console:
sound_collect.play();  // Should hear sound
```

**✅ Pass**: Sound plays without errors
**❌ Fail**: `TypeError: sound_collect.play is not a function` means sound not loaded

---

## 4. Sprite System Test

**Location**: ULTRA-DEEP-RESEARCH.md PART 28

### Integration Steps
1. Call `setTileImageSize()` in `engineInit()`:
```javascript
function engineInit() {
    setTileImageSize(vec2(256, 256));
    // ... sound loading
}
```

2. Create `COLLECTIBLE_DATA` configuration:
```javascript
const COLLECTIBLE_DATA = {
    coin: { sprite: 19, points: 10 },
    customer: { sprite: 16, points: 5 }
};
```

3. Use in classes:
```javascript
drawTile(this.pos, this.size, tile(this.sprite, 16));
```

**Test**:
```javascript
// In console:
drawTile(cameraPos, vec2(1), tile(19, 16));  // Should draw tile 19
```

**✅ Pass**: Tile draws from sprite sheet
**❌ Fail**: Blank square means `setTileImageSize()` not called or sprite sheet missing

---

## 5. Player Class Test

**Location**: ULTRA-DEEP-RESEARCH.md PART 15 (lines ~1889-2600, PlayerBall class)

### Required Elements
- [ ] `constructor(pos)` with `super(pos, vec2(1))`
- [ ] `this.mass = 1` and `this.damping = 0.9`
- [ ] `update()` with WASD input handling
- [ ] `collideWithObject(other)` for absorption
- [ ] `render()` with `drawTile()` or `drawRect()`

**Test**:
```javascript
// In console after gameInit():
player.pos;              // Should be Vector2
player.velocity;         // Should be Vector2
player.size;             // Should be Vector2 (starting at 1,1)
```

**Manual Test**:
- [ ] WASD moves player
- [ ] Player has momentum (keeps moving after key release)
- [ ] Player renders on screen

---

## 6. Collectible Class Test

**Location**: ULTRA-DEEP-RESEARCH.md PART 15 (lines ~2602-2627, Collectible class)

### Required Elements
- [ ] `constructor(pos, type, config)` with super call
- [ ] `this.type = type` and `this.config = config`
- [ ] `collideWithObject(other)` checking `other === player`
- [ ] `this.destroy()` when collected
- [ ] `render()` with correct sprite

**Test**:
```javascript
// In console after gameInit():
const testCoin = new Collectible(vec2(5, 5), 'coin', COLLECTIBLE_DATA.coin);
testCoin.pos;            // Should be Vector2(5, 5)
testCoin.type;           // Should be 'coin'
```

**Manual Test**:
- [ ] Create collectible: appears on screen
- [ ] Move player to it: collectible disappears
- [ ] Sound plays on collection

---

## 7. Level Manager Test

**Location**: ULTRA-DEEP-RESEARCH.md PART 15 (search for "class LevelManager")

### Required Elements
- [ ] `constructor()` initializing `this.currentLevel`
- [ ] `startLevel(levelIndex)` creating collectibles
- [ ] `checkLevelComplete()` counting remaining collectibles
- [ ] `getNextLevel()` returning next level config

**Test**:
```javascript
// In console after engineInit():
levelManager.currentLevel;           // Should be 0
levelManager.startLevel(0);          // Should spawn collectibles
engineObjects.length;                // Should include player + collectibles
```

**Manual Test**:
- [ ] Level starts: collectibles appear
- [ ] Collect all items: level advances
- [ ] New level: different number of collectibles

---

## 8. Camera System Test

**Location**: ULTRA-DEEP-RESEARCH.md PART 15 (gameUpdate function in integration example)

### Required Elements in gameUpdate()
```javascript
function gameUpdate() {
    if (player) {
        cameraPos = cameraPos.lerp(player.pos, 0.1);
    }
}
```

**Test**:
```javascript
// In console:
cameraPos;               // Should be Vector2 near player.pos
player.pos;              // Compare to cameraPos
```

**Manual Test**:
- [ ] Move player: camera follows smoothly
- [ ] Camera lags slightly behind player (smooth follow)

---

## 9. HUD System Test

**Location**: ULTRA-DEEP-RESEARCH.md PART 15 (gameRenderPost function) and PART 21 (HUD design theory)

### Required Elements in gameRenderPost()
```javascript
function gameRenderPost() {
    const x = mainCanvasSize.x / 2;
    drawTextScreen('Score: ' + player.score, vec2(x, 50), 40);
}
```

**Test**:
```javascript
// In console:
mainCanvasSize;          // Should be Vector2 (screen size in pixels)
```

**Manual Test**:
- [ ] Text renders at top of screen
- [ ] Text stays in same position when camera moves
- [ ] Score updates when collecting items

---

## 10. Collision Test

**Location**: Multiple parts (Player, Collectible classes)

### Required Elements
- [ ] Player has `collideWithObject(other)` method
- [ ] Collectible has `collideWithObject(other)` method
- [ ] Both objects have `collideTiles = false` (or omitted, defaults false)
- [ ] Both objects have `mass > 0` for physics

**Test**:
```javascript
// In console:
player.mass;             // Should be > 0
player.collideTiles;     // Should be false (no tile collision)
```

**Manual Test**:
- [ ] Player touches collectible: triggers collection
- [ ] Player touches competitor: triggers absorption (if implemented)

---

## 11. Performance Test

### Frame Rate Check
```javascript
// In console:
engineUpdateTime;        // Should be < 16ms (60fps)
drawCount;               // Number of draw calls per frame
```

**Manual Test**:
- [ ] Game runs at 60 FPS (smooth motion)
- [ ] No lag when moving camera
- [ ] No lag with 50+ collectibles on screen

---

## 12. Build System Test

**Location**: ULTRA-DEEP-RESEARCH.md PART 27

### Required Files
- [ ] `build.js` exists in project root
- [ ] `build.js` lists correct source files
- [ ] Node.js installed: `node --version`

**Test**:
```bash
node build.js --quick    # Fast build (no Closure Compiler)
```

**Verify**:
- [ ] `build/` directory created
- [ ] `build/index.html` exists
- [ ] `build/index.html` opens and runs
- [ ] `build/tiny-tycoon.zip` created

---

## 13. Final Integration Test

### Complete Gameplay Loop
1. [ ] Open `index.html` in browser
2. [ ] Game starts: player visible at center
3. [ ] Collectibles visible around player
4. [ ] WASD moves player smoothly
5. [ ] Camera follows player
6. [ ] Collecting items: sound plays, item disappears
7. [ ] HUD updates: score increases
8. [ ] All items collected: level advances
9. [ ] New level starts: new collectibles appear
10. [ ] No console errors (check F12 DevTools)

### Console Error Check
```javascript
// Common errors to watch for:
// ❌ "Uncaught ReferenceError: player is not defined"
//    → Move global declaration to top of file

// ❌ "TypeError: Cannot read property 'pos' of undefined"
//    → Check that gameInit() creates player

// ❌ "TypeError: sound_collect.play is not a function"
//    → Check that engineInit() loads sounds

// ❌ "ReferenceError: COLLECTIBLE_DATA is not defined"
//    → Move config object before class definitions
```

---

## Integration Sequence Flowchart

```
START
  ↓
[1] Copy 'use strict'
  ↓
[2] Copy global variables (player, levelManager, sounds)
  ↓
[3] Copy config objects (COLLECTIBLE_DATA, LEVEL_DATA)
  ↓
[4] Copy sound data arrays
  ↓
[5] Copy engineInit() - loads sounds, creates managers
  ↓
[6] Copy gameInit() - creates player, starts level
  ↓
[7] Copy gameUpdate() - camera follow
  ↓
[8] Copy gameUpdatePost() - level checks
  ↓
[9] Copy gameRender() - background
  ↓
[10] Copy gameRenderPost() - HUD
  ↓
[11] Copy Player class
  ↓
[12] Copy Collectible class
  ↓
[13] Copy LevelManager class
  ↓
TEST in browser
  ↓
✅ PASS → Continue to next feature
❌ FAIL → Check console, verify sequence above
```

---

## Quick Reference: Where to Find Code

| Component | PART | Lines (approx) |
|-----------|------|----------------|
| Complete Integration Example | 15 | 2407-3049 |
| PlayerBall class | 15 | ~1889-2600 |
| Collectible class | 15 | ~2602-2627 |
| Competitor class | 15 | ~2629-2690 |
| LevelManager class | 15 | Search "class LevelManager" |
| Sound data arrays | 15 | 2451-2466 |
| Sound design theory | 21 | Full part |
| Camera follow (gameUpdate) | 15 | Integration example |
| HUD rendering (gameRenderPost) | 15, 21 | PART 15: code, PART 21: theory |
| Build System | 27 | Full build.js script |
| Sprite Indices (tiles 0-255) | 28 | Complete tile map |

---

**Final Checklist**:
- [ ] All code from ULTRA-DEEP-RESEARCH.md assembled in correct order
- [ ] No console errors on page load
- [ ] Player moves with WASD
- [ ] Collectibles spawn and can be collected
- [ ] Sounds play on collection
- [ ] Camera follows player
- [ ] HUD displays correctly
- [ ] Level advances when complete
- [ ] Build system produces working `build/index.html`

**Result**: Fully integrated Tiny Tycoon ready for feature development!
