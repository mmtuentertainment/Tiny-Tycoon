# Plan: Transform Research Doc to 100% Ready for Spec-Driven Development

**Created**: 2025-10-14
**Goal**: Make ULTRA-DEEP-RESEARCH.md 100% ready to begin Spec Kit workflow for Tiny Tycoon game jam project
**Current Status**: Research has design + working code, but missing project bootstrap, build system, and asset pipeline

---

## Gap Analysis Summary

### ✅ What We Have (95% Design Complete)

1. **Game Design** (100%)
   - Katamari-style mechanics fully defined
   - Progression system documented
   - Level design complete (3 levels)
   - Win/lose conditions clear

2. **Working Code** (75%)
   - PlayerBall class (~100 lines) ✅
   - Collectible class (~27 lines) ✅
   - Competitor AI class (~70 lines) ✅
   - LevelManager class (~97 lines) ✅
   - SoundManager + 5 ZzFX sounds (~157 lines) ✅
   - Total: ~768 lines of LittleJS code

3. **Architecture** (100%)
   - File structure defined
   - Module organization documented
   - Data-driven patterns established

### ❌ What's Missing (Critical Blockers)

1. **Project Bootstrap** (0%) - BLOCKS EVERYTHING
   - No folders exist at `games/game-jam-2025/`
   - No `index.html` entry point
   - No `package.json` with dependencies
   - No LittleJS engine setup
   - No git initialization

2. **Build System** (20%) - BLOCKS DEPLOYMENT
   - Knowledge base has info but NOT integrated
   - No build.js script
   - No minification process
   - No itch.io deployment guide

3. **Asset Pipeline** (30%) - BLOCKS RENDERING
   - Sprite tile indices undefined (tile(0,16) = what?)
   - No complete asset list
   - No placeholder sprite sheet
   - No asset creation workflow

4. **Integration Code** (50%) - BLOCKS EXECUTION
   - No complete main.js/game.js example
   - Classes defined but not connected
   - Global variable initialization unclear
   - Import/module system not shown

---

## Phase 1: Complete the Research Document

**Goal**: Make ULTRA-DEEP-RESEARCH.md a complete design + technical reference

### Task Group 1: Add Project Bootstrap Section

**New Section**: PART 26: PROJECT SETUP & INITIALIZATION

**Content to Add**:

```markdown
## PART 26: PROJECT SETUP & INITIALIZATION

### Prerequisites

- Node.js 18+ installed
- Git installed
- Modern web browser (Chrome/Firefox/Safari)
- Code editor (VS Code recommended)

### Step 1: Create Project Structure

```bash
# Navigate to workspace
cd "/home/matt/Game Development/games"

# Create game directory
mkdir -p game-jam-2025/{src,assets,tests,.specify}
cd game-jam-2025

# Initialize git
git init
```

### Step 2: Setup Package.json

```json
{
  "name": "tiny-tycoon",
  "version": "0.1.0",
  "description": "Katamari-style business growth game for LittleJS Game Jam 2025",
  "main": "src/game.js",
  "scripts": {
    "dev": "python3 -m http.server 8080",
    "build": "node build.js",
    "test": "echo 'Tests coming soon'"
  },
  "keywords": ["littlejs", "game-jam", "katamari", "tycoon"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {}
}
```

### Step 3: Create index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tiny Tycoon - LittleJS Game Jam 2025</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        canvas {
            image-rendering: pixelated;
            image-rendering: crisp-edges;
        }
    </style>
</head>
<body>
    <!-- LittleJS Engine -->
    <script src="../../LittleJS/dist/littlejs.min.js"></script>

    <!-- Game Code -->
    <script type="module" src="src/game.js"></script>
</body>
</html>
```

### Step 4: Get LittleJS Engine

```bash
# From workspace root
cd "/home/matt/Game Development"

# Clone LittleJS if not already present
if [ ! -d "LittleJS" ]; then
    git clone https://github.com/KilledByAPixel/LittleJS.git
fi
```

### Step 5: Create Minimal game.js

```javascript
// src/game.js - Minimal bootstrap to test setup

'use strict';

// Game config
const GAME_NAME = 'Tiny Tycoon';

// Engine init
function gameInit() {
    console.log(`${GAME_NAME} initialized!`);

    // Test object to verify engine works
    const testBall = new EngineObject(vec2(0, 0), vec2(1, 1));
    testBall.color = rgb(1, 0, 0); // Red
}

function gameUpdate() {
    // Game loop (runs every frame)
}

function gameUpdatePost() {
    // After physics
}

function gameRender() {
    // Custom rendering
}

function gameRenderPost() {
    // UI overlay
    drawText('Tiny Tycoon', vec2(0, 10), 2, WHITE);
}

// Start engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
```

### Step 6: Test the Setup

```bash
# Start dev server
cd "/home/matt/Game Development/games/game-jam-2025"
npm run dev

# Open browser to http://localhost:8080
# You should see black screen with red ball and "Tiny Tycoon" text
```

### Verification Checklist

- [ ] Folders exist: src/, assets/, tests/, .specify/
- [ ] package.json created
- [ ] index.html loads without errors
- [ ] LittleJS engine found and loaded
- [ ] Browser console shows "Tiny Tycoon initialized!"
- [ ] Red test ball visible on screen
- [ ] Text "Tiny Tycoon" renders at top
- [ ] No console errors

### Troubleshooting

**Problem**: "Cannot find littlejs.min.js"
- **Solution**: Check LittleJS path in index.html, ensure LittleJS cloned

**Problem**: "Module not found"
- **Solution**: Remove `type="module"` from script tag if not using ES6 modules

**Problem**: Black screen, no errors
- **Solution**: Check browser console, verify gameInit() is called
```

### Task Group 2: Add Build System Section

**New Section**: PART 27: BUILD SYSTEM & DEPLOYMENT

**Content to Add**:

```markdown
## PART 27: BUILD SYSTEM & DEPLOYMENT

### Build Process Overview

LittleJS games are built for web deployment. The build process:

1. Concatenates all JavaScript files
2. Minifies code with Terser/UglifyJS
3. Optimizes sprite sheet
4. Creates deployment package

### Option 1: Simple Build (Manual)

**For game jam**: Manual build is sufficient

```bash
# Combine all JS files manually
cat src/game.js src/objects/*.js src/sounds.js > dist/game.combined.js

# Minify (if you have terser installed)
npx terser dist/game.combined.js -o dist/game.min.js --compress --mangle

# Copy files for deployment
mkdir -p dist
cp index.html dist/
cp assets/sprites.png dist/assets/
cp -r ../../LittleJS/dist/littlejs.min.js dist/
```

### Option 2: Automated Build Script

**Create build.js** in project root:

```javascript
// build.js - Automated build script
const fs = require('fs');
const path = require('path');

console.log('Building Tiny Tycoon...');

// Create dist folder
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}
if (!fs.existsSync('dist/assets')) {
    fs.mkdirSync('dist/assets');
}

// Copy HTML
fs.copyFileSync('index.html', 'dist/index.html');
console.log('✓ Copied index.html');

// Copy assets
if (fs.existsSync('assets/sprites.png')) {
    fs.copyFileSync('assets/sprites.png', 'dist/assets/sprites.png');
    console.log('✓ Copied sprites.png');
}

// Copy LittleJS
fs.copyFileSync('../../LittleJS/dist/littlejs.min.js', 'dist/littlejs.min.js');
console.log('✓ Copied LittleJS engine');

// Concatenate all JS files
const srcFiles = [
    'src/game.js',
    // Add more files as you create them
];

let combined = '';
for (const file of srcFiles) {
    if (fs.existsSync(file)) {
        combined += fs.readFileSync(file, 'utf8') + '\n';
    }
}

fs.writeFileSync('dist/game.js', combined);
console.log('✓ Combined JavaScript files');

console.log('\nBuild complete! Files in dist/ folder');
console.log('Total size:', getSizeInKB('dist'));
```

Run with: `npm run build`

### Deployment to itch.io

**Step 1: Prepare ZIP**

```bash
# Build production version
npm run build

# Create deployment ZIP
cd dist
zip -r tiny-tycoon.zip *
```

**Step 2: Upload to itch.io**

1. Go to itch.io → Dashboard → Create New Project
2. Set **Project Type**: HTML
3. Upload `tiny-tycoon.zip`
4. Check "This file will be played in the browser"
5. Set viewport: 1280x720 (or your canvas size)
6. Set title, description, screenshots
7. Add game jam info: "LittleJS Game Jam 2025"
8. Set to Public when ready

**Step 3: Test Embedded Game**

- Click "View Page" to test
- Verify game loads in iframe
- Check fullscreen works
- Test on mobile if targeting mobile

### Build Optimization Tips

**Size Optimization**:
- Use single sprite sheet (don't duplicate sprites)
- Minify JavaScript (Terser/UglifyJS)
- Use ZzFX for audio (procedural, no files)
- Target <1MB total game size

**Performance**:
- Build with production mode (minified)
- Test on mid-range devices
- Check 60 FPS maintained
- Profile with browser DevTools

### Build Checklist

- [ ] `npm run build` completes without errors
- [ ] dist/ folder contains all necessary files
- [ ] Game loads from dist/index.html
- [ ] All assets present and loading
- [ ] Total size under 1MB (target: <500KB)
- [ ] No console errors in production build
- [ ] Game plays identically to dev version
```

### Task Group 3: Add Asset Pipeline Section

**New Section**: PART 28: ASSET CREATION & SPRITE SHEET

**Content to Add**:

```markdown
## PART 28: ASSET CREATION & SPRITE SHEET

### Sprite Sheet Structure

LittleJS uses tile-based sprite sheets. For Tiny Tycoon:

**Sprite Sheet**: `assets/sprites.png`
- Size: 256x256 pixels
- Tile Size: 16x16 pixels
- Total Tiles: 16x16 = 256 possible sprites
- Format: PNG with transparency

### Tile Index Reference

**How tile() Works**:
```javascript
tile(0, 16)  // Tile index 0, sprite sheet with 16 tiles per row
//   ^            ^
//   |            └─ Grid size (16x16 tiles)
//   └─ Tile number (0-255)
```

### Required Sprites for Tiny Tycoon

**Tile Index Map**:

```
Tile 0:  Player Ball (small)
Tile 1:  Customer (person icon)
Tile 2:  Coin ($)
Tile 3:  Competitor (rival business)
Tile 4:  Building (small shop)
Tile 5:  Building (medium)
Tile 6:  Building (large)
Tile 7:  Building (skyscraper)
Tile 8:  Particle (sparkle)
Tile 9:  Particle (star)
Tile 10: Ground tile
Tile 11: UI element (background)
Tile 12-15: [Reserved for future]
```

### Creating Placeholder Sprites

**Option 1: ASCII Placeholder (Fastest)**

```javascript
// Use text as temporary sprites
function drawTextSprite(text, pos, size, color) {
    drawText(text, pos, size, color);
}

// In your code:
drawTextSprite('O', playerPos, 1, RED);    // Player
drawTextSprite('P', customerPos, 0.8, BLUE); // Customer
drawTextSprite('$', coinPos, 0.5, YELLOW);  // Coin
```

**Option 2: Simple Pixel Art**

Use free tools:
- **Piskel** (https://www.piskelapp.com/) - Browser-based
- **Aseprite** (paid, $20) - Professional
- **GIMP** (free) - Any image editor

**Steps**:
1. Create 256x256 canvas
2. Set grid: 16x16 pixels
3. Draw each sprite in its tile
4. Export as PNG
5. Save to `assets/sprites.png`

**Minimal Sprite Sheet Example**:
```
Row 0: [Ball] [Person] [Coin] [Star] ...
Row 1: [Shop] [Building] [Tower] ...
...
```

### Creating Sprites in Code

**For game jam**, you can skip sprite sheet entirely:

```javascript
// Draw shapes directly
class PlayerBall extends EngineObject {
    render() {
        // Draw circle instead of sprite
        drawCircle(this.pos, this.size.x / 2, this.color);
    }
}

class Collectible extends EngineObject {
    render() {
        // Draw colored square
        drawRect(this.pos, this.size, this.color);
    }
}
```

**Advantages**:
- No sprite sheet needed
- Fast to prototype
- Easy to tweak colors
- Good for minimalist aesthetic

**Disadvantages**:
- Less visual variety
- May not look as polished

### Sprite Sheet Workflow

**Development**:
1. Start with code-based shapes (circles/rects)
2. Playtest core mechanics
3. Replace with simple pixel art
4. Polish in final week

**Production**:
1. Create final sprite sheet
2. Update tile indices in code
3. Test all sprites render correctly
4. Optimize PNG (crush compression)

### Asset Checklist

- [ ] sprites.png created (or shapes in code)
- [ ] All tile indices documented
- [ ] Sprites load without errors
- [ ] Player sprite visible
- [ ] Collectible sprites visible
- [ ] Particle sprites working
- [ ] Sprite sheet under 50KB (if using)
```

### Task Group 4: Add Integration Example Section

**Add to PART 15** (after existing architecture code):

```markdown
### Complete game.js Integration Example

**How all the classes work together**:

```javascript
// ============================================================================
// src/game.js - COMPLETE WORKING INTEGRATION
// ============================================================================

'use strict';

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

let player;              // PlayerBall instance
let levelManager;        // LevelManager instance
let soundManager;        // SoundManager instance

// ============================================================================
// GAME CONFIGURATION
// ============================================================================

const GAME_CONFIG = {
    name: 'Tiny Tycoon',
    canvasSize: vec2(1920, 1080),
    cameraScale: 32,
    enablePhysics: true,
    enableParticles: true,
    enableSound: true,
};

// ============================================================================
// [Insert all class definitions here from previous sections]
// - PlayerBall class
// - Collectible class
// - Competitor class
// - COLLECTIBLE_DATA
// - LevelManager class
// - LEVELS array
// - SoundManager class
// - All sound definitions
// ============================================================================

// ============================================================================
// ENGINE LIFECYCLE HOOKS
// ============================================================================

function gameInit() {
    console.log(`${GAME_CONFIG.name} initialized!`);

    // Setup canvas
    canvasFixedSize = GAME_CONFIG.canvasSize;
    cameraScale = GAME_CONFIG.cameraScale;

    // Create managers
    soundManager = new SoundManager();
    levelManager = new LevelManager();

    // Start first level
    levelManager.startLevel(0);
}

function gameUpdate() {
    // Update level manager (handles timer, win/lose)
    if (levelManager) {
        levelManager.update();
    }
}

function gameUpdatePost() {
    // After physics updates
}

function gameRender() {
    // Custom rendering (if needed)
}

function gameRenderPost() {
    // HUD rendering (already in LevelManager.gameRenderPost, but shown here for clarity)
    if (levelManager && levelManager.gameState === 'playing' && player) {
        // Timer (top center)
        const timeStr = levelManager.getTimeString();
        drawText(timeStr, mainCanvasSize.scale(0.5).add(vec2(0, -50)), 48, WHITE);

        // Score (top left)
        const scoreStr = `$${player.collectedValue}`;
        drawText(scoreStr, vec2(100, mainCanvasSize.y - 50), 40, rgb(1, 1, 0));

        // Size (top right)
        const sizeStr = `Size: ${player.size.x.toFixed(1)}x`;
        drawText(sizeStr, vec2(mainCanvasSize.x - 100, mainCanvasSize.y - 50), 40, rgb(0.5, 1, 0.5));
    }

    // Win/lose screens
    if (levelManager) {
        if (levelManager.gameState === 'won') {
            drawText('LEVEL COMPLETE!', mainCanvasSize.scale(0.5), 80, rgb(0, 1, 0));
        } else if (levelManager.gameState === 'lost') {
            drawText('TIME UP!', mainCanvasSize.scale(0.5), 80, rgb(1, 0, 0));
            drawText('Press R to Retry', mainCanvasSize.scale(0.5).add(vec2(0, -60)), 40, WHITE);
        }
    }
}

// ============================================================================
// START ENGINE
// ============================================================================

engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
```

**File Organization**:

For single-file (game jam):
- Everything in `src/game.js`

For multi-file (better organization):
```
src/
├── game.js              # Engine init + managers
├── player.js            # PlayerBall class
├── collectibles.js      # Collectible + Competitor
├── levels.js            # LevelManager + LEVELS
├── sounds.js            # SoundManager + sounds
└── config.js            # COLLECTIBLE_DATA + constants
```

Then in game.js:
```javascript
// Import all modules (if using ES6 modules)
import { PlayerBall } from './player.js';
import { Collectible, Competitor, COLLECTIBLE_DATA } from './collectibles.js';
import { LevelManager, LEVELS } from './levels.js';
import { SoundManager, sound_coin, sound_tierUp, ... } from './sounds.js';
```
```

---

## Phase 2: Create Day 1 Quickstart Guide

**Goal**: Standalone guide that takes user from empty folder to working skeleton in <30 minutes

**Create**: `docs/DAY-1-QUICKSTART.md`

**Content**:
1. Copy bootstrap instructions from PART 26
2. Add "First 5 Minutes" checklist
3. Add "Verify Setup Works" tests
4. Add "Next Steps" pointing to spec workflow
5. Include common pitfalls and solutions

---

## Phase 3: Integration Testing Document

**Goal**: Ensure research doc code actually works when assembled

**Create**: `docs/CODE-INTEGRATION-TEST.md`

**Content**:
1. Checklist of all code blocks to copy
2. Order of operations for assembly
3. Import statements needed
4. Global variable declarations
5. Verification that code runs without errors

---

## Execution Plan (Atomic Tasks)

### TASK GROUP A: Complete Research Document

- [ ] **A1**: Create PART 26: Project Setup & Initialization (~200 lines)
- [ ] **A2**: Create PART 27: Build System & Deployment (~150 lines)
- [ ] **A3**: Create PART 28: Asset Creation & Sprite Sheet (~120 lines)
- [ ] **A4**: Add Complete Integration Example to PART 15 (~80 lines)
- [ ] **A5**: Verify all code blocks have proper context and imports

### TASK GROUP B: Create Quickstart Guide

- [ ] **B1**: Create `docs/DAY-1-QUICKSTART.md` with project bootstrap
- [ ] **B2**: Add verification checklist to quickstart
- [ ] **B3**: Add troubleshooting section to quickstart
- [ ] **B4**: Add "Next Steps" section linking to spec workflow

### TASK GROUP C: Create Test Document

- [ ] **C1**: Create `docs/CODE-INTEGRATION-TEST.md`
- [ ] **C2**: List all copyable code blocks from research
- [ ] **C3**: Document assembly order
- [ ] **C4**: Add smoke test instructions

### TASK GROUP D: Final Verification

- [ ] **D1**: Read entire ULTRA-DEEP-RESEARCH.md top to bottom
- [ ] **D2**: Verify no "TODO" or "[NEEDS INFO]" placeholders remain
- [ ] **D3**: Check all code blocks are complete (no `// ...` truncations)
- [ ] **D4**: Ensure asset references (tile indices) are documented
- [ ] **D5**: Confirm build process is actionable

---

## Success Criteria

The research doc is 100% ready when:

✅ A developer can create working project skeleton in < 30 minutes
✅ All code blocks are copy-paste ready with no missing pieces
✅ Asset pipeline is documented (even if using placeholder shapes)
✅ Build/deployment process is clear and testable
✅ No questions remain about "how to start"

---

## Estimated Time

- **Task Group A**: 2-3 hours (writing comprehensive setup docs)
- **Task Group B**: 30-45 minutes (quickstart guide)
- **Task Group C**: 30 minutes (test document)
- **Task Group D**: 45 minutes (verification)

**Total**: ~4-5 hours to complete

---

## After This Plan Completes

The research doc will be ready for **Spec-Driven Development workflow**:

1. ✅ Research complete (this plan)
2. `/speckit.specify` - Create feature specs for:
   - Core Katamari Mechanic (Priority 1)
   - Collection & Growth System (Priority 2)
   - Level Progression (Priority 3)
3. `/speckit.plan` - Generate implementation plans
4. `/speckit.tasks` - Break into atomic tasks
5. `/speckit.implement` - Execute with TDD

---

**Status**: Plan Created ✅
**Next Action**: Execute Task Group A (Complete Research Document)
