# TINY TYCOON - SOURCE OF TRUTH

**Project**: Tiny Tycoon (Katamari-style business growth game)
**Game Jam**: LittleJS Game Jam 2025 (Theme: "SMALL")
**Timeline**: October 3 - November 3, 2025 (T-20 days remaining)
**Ship Date**: November 3, 2025 (NON-NEGOTIABLE)
**Methodology**: Spec-Kit Workflow (Constitution-Driven Development)
**Version**: 1.0.0
**Last Updated**: October 17, 2025

---

## 🎯 DOCUMENT PURPOSE

This is the **SINGLE SOURCE OF TRUTH** for Tiny Tycoon development. It synthesizes:

1. **ULTRA-DEEP-RESEARCH.md** (6,876 lines) - Complete game design research
2. **RESEARCH-TO-SPEC-PLAN.md** (774 lines) - Production workflow guide
3. **Constitution** (.specify/memory/constitution.md) - Project governance
4. **VISION.md** (2,054 lines) - Recent exhaustive research session

**All decisions, specifications, and implementations MUST reference this document.**

---

## 📋 QUICK NAVIGATION

### For Different Roles:

**🎮 Game Designers** → [Core Game Design](#core-game-design)
**💻 Developers** → [Implementation Guide](#implementation-guide)
**🎨 Artists** → [Visual Design](#visual-design)
**🎵 Audio Designers** → [Sound Design](#sound-design)
**📊 Project Managers** → [Development Workflow](#development-workflow)

### By Workflow Phase:

**Phase 1: Understanding** → [Project Overview](#project-overview)
**Phase 2: Specification** → [Spec-Kit Integration](#spec-kit-integration)
**Phase 3: Planning** → [Technical Architecture](#technical-architecture)
**Phase 4: Implementation** → [Code Reference](#code-reference)
**Phase 5: Testing** → [Quality Standards](#quality-standards)

---

## PROJECT OVERVIEW

### The Concept (30-Second Pitch)

**"Katamari Damacy meets Cookie Clicker meets Gen Alpha Hustle Culture"**

- Start as 0.5×0.5 unit entrepreneur (SMALL)
- Roll around collecting customers and coins
- Grow exponentially into business empire (BIG)
- Consume competitors, buildings, entire markets
- 3 levels: Schoolyard → Downtown → Luxury District
- Theme: Ironic capitalism satire with brain-rot energy

### Core Identity (Constitution Article I & II)

**Theme-First Development (NON-NEGOTIABLE)**:
- "SMALL" theme must be evident in first 30 seconds
- Visual scale: 0.5 units → 50+ units (100x growth)
- Exponential progression creates "Aha!" moments
- Camera dynamically adjusts to emphasize size changes

**Katamari Mechanics (CORE IDENTITY)**:
- Physics-based rolling ball/entity
- Size-gated collection (only eat smaller objects)
- Magnetic attraction for near-size items
- Momentum system (bigger = harder to turn, more satisfying)

### Success Criteria

**Game Jam Goals**:
- ✅ Win LittleJS Game Jam 2025
- ✅ Theme "SMALL" immediately recognizable
- ✅ Playable & bug-free at 60 FPS
- ✅ Ship by November 3, 2025

**Competitive Advantages**:
1. Perfect theme fit (Katamari = small→big)
2. Untapped market (no web-based Katamari business games)
3. Research-backed design (200+ research hours documented)
4. LittleJS-native implementation (uses framework strengths)

---

## CORE GAME DESIGN

### The Three Levels

**LEVEL 1: "BROKE ERA" - Schoolyard Hustle**
- Setting: Elementary school playground/classroom
- Start Size: 0.5×0.5 units (marble)
- World Size: 50×50 units
- Time Limit: 60 seconds
- Goal: Collect $500 worth of objects

**Objects Progression**:
```
0.3u: Penny ($1) → 0.4u: Gum ($10) → 0.8u: Backpack ($75)
→ 1.5u: Desk ($200) → 2.0u: TEACHER ($300) → 3.0u: SWING SET ($500)
```

**LEVEL 2: "INFLUENCER ARC" - Downtown Grind**
- Setting: City street/downtown area
- Start Size: 0.5×0.5 units (reset/rebirth)
- World Size: 100×100 units
- Time Limit: 90 seconds
- Goal: Collect $15,000 worth

**Objects Progression**:
```
3.0u: Coffee Cup ($100) → 5.0u: Office Chair ($300) → 8.0u: Sofa ($1,000)
→ 10.0u: Motorcycle ($2,500) → 12.0u: CAR ($5,000) → 15.0u: HOUSE ($20,000)
```

**LEVEL 3: "OLIGARCH ENDGAME" - Luxury District**
- Setting: Marina/mansions/helipads
- Start Size: 0.5×0.5 units (final rebirth)
- World Size: 150×150 units
- Time Limit: 120 seconds
- Goal: Collect $500,000 worth

**Objects Progression**:
```
10.0u: Yacht ($50K) → 20.0u: Mansion ($500K) → 30.0u: Helicopter ($1M)
→ 40.0u: Private Jet ($50M) → 45.0u: SKYSCRAPER ($100M) → 50.0u: ROCKET ($2B)
```

### Core Mechanics (From Research)

**1. Size-Based Collection** (Katamari Rule):
```javascript
// Can only collect if player is 80%+ of object's size threshold
if (player.size.x >= object.sizeThreshold * 0.8) {
    collect(object); // Magnetic pull + absorption
} else {
    bounce(object); // Too small - physics collision
}
```

**2. Magnetic Attraction**:
- Range: 2× player radius
- Strength: Increases as player grows
- Visual: Objects "shimmer" when in range
- Audio: Pitch-scales with object value

**3. Exponential Growth**:
```javascript
// Size formula (researched from Katamari)
newSize = 0.5 + (collectedValue * 0.02);
// $0 = 0.5 units, $100 = 2.5 units, $500 = 10.5 units
```

**4. Momentum Physics**:
- Larger size = higher mass
- Higher mass = slower turning
- Collisions feel "weighty" and satisfying
- Damping: 0.92 (rolls to stop gradually)

### Win/Lose Conditions

**Victory**:
- Reach target value before time expires
- Example: Level 1 = collect $500 in 60 seconds
- **Feedback**: "LEVEL COMPLETE!" + consumption log + next level button

**Defeat**:
- Time expires before reaching goal
- **Feedback**: "TIME UP!" + retry button + show how close you were
- No penalties (casual game)

**Progression**:
- Complete Level 1 → Unlock Level 2
- Complete Level 2 → Unlock Level 3
- Complete Level 3 → Victory screen + stats + social share

---

## SPEC-KIT INTEGRATION

### Workflow Alignment (Constitution Article IV)

**Every feature MUST follow this process**:

#### 1. `/speckit.specify` - Specification Phase
**Output**: `.specify/specs/[feature-id]/spec.md`

**Requirements**:
- [ ] User stories prioritized by importance (P1, P2, P3, P4)
- [ ] Acceptance criteria in Given/When/Then format
- [ ] Theme validation ("SMALL" theme check)
- [ ] Time estimate (<2 days or reject feature)
- [ ] Independence test (can this be built/tested alone?)

**Template Compliance**:
```markdown
### User Story 1 - [Title] (Priority: P1)
**Why this priority**: [Business value]
**Independent Test**: [How to verify standalone]
**Acceptance Scenarios**:
1. **Given** [state], **When** [action], **Then** [result]
```

**Example for Tiny Tycoon**:
```markdown
### User Story 1 - Player Can Collect Smaller Objects (Priority: P1)
**Why this priority**: Core Katamari mechanic - without this, game doesn't exist

**Independent Test**: Create player (size 1.0) + one collectible (size 0.5).
Player can move, touch collectible, collectible disappears, player grows to 1.01.

**Acceptance Scenarios**:
1. **Given** player size 1.0 and coin size 0.3, **When** player touches coin,
   **Then** coin is absorbed, player size increases, score increases by $1
2. **Given** player size 0.5 and desk size 1.5, **When** player touches desk,
   **Then** player bounces off (too small), desk does not move
```

#### 2. `/speckit.clarify` - Question Phase
**Output**: Clarifying questions added to spec.md

**Process**:
- Agent identifies underspecified areas
- Asks up to 5 targeted questions
- Questions logged in spec.md
- Answers incorporated before planning

#### 3. `/speckit.plan` - Planning Phase
**Output**: `.specify/specs/[feature-id]/plan.md`

**Requirements**:
- [ ] Technical approach (LittleJS-specific patterns)
- [ ] File structure and integration points
- [ ] Reference to research docs (ULTRA-DEEP-RESEARCH.md PART 15)
- [ ] Constitution check (does this violate any principles?)
- [ ] Dependencies and risks identified

**Template Section**:
```markdown
## Constitution Check
- [ ] Theme-First: Does this embody "SMALL"?
- [ ] Katamari Mechanics: Does this use physics properly?
- [ ] Timeline: Can this ship in <2 days?
- [ ] LittleJS Native: Does this use framework idioms?
- [ ] Playable > Pretty: Is this core gameplay or polish?
```

#### 4. `/speckit.tasks` - Task Breakdown Phase
**Output**: `.specify/specs/[feature-id]/tasks.md`

**Requirements**:
- [ ] Atomic tasks (<1 hour each)
- [ ] Dependency ordering (critical path)
- [ ] Test verification for each task
- [ ] User story grouping (maintains independence)

**Task Format**:
```markdown
### User Story 1 Tasks

**TASK-001**: [Description] (Priority: P1, Time: 30m)
**Status**: [ ] TODO / [x] DONE
**Test**: [Verification step]
**Dependencies**: [TASK-XXX] or None
**Files**: src/game.js:123-145
```

#### 5. `/speckit.implement` - Implementation Phase
**Output**: Code commits + working features

**Process**:
- Execute tasks sequentially
- Manual test after each task
- Commit with descriptive message
- Update task status in tasks.md

#### 6. `/speckit.analyze` - Consistency Check Phase
**Output**: Analysis report

**Checks**:
- Spec vs Plan alignment
- Plan vs Tasks alignment
- Tasks vs Code alignment
- Theme validation continuous

### Priority System (Constitution Article III)

**P1 (Week 1: Oct 14-20) - Core Mechanics**:
- Player movement (WASD/arrows)
- Collection system (size-gated)
- Growth mechanics (exponential)
- Basic collision physics

**P2 (Week 2: Oct 21-27) - Level System**:
- 3 levels with different maps
- Win/lose conditions
- Level progression
- Timer system

**P3 (Week 3: Oct 28-Nov 2) - Polish**:
- Screen shake, particles
- ZzFX sound effects
- Visual feedback (popups, effects)
- Consumption logs

**P4 (Post-Jam) - Future Features**:
- Mobile touch controls
- Leaderboards
- Additional levels
- Multiplayer modes

---

## TECHNICAL ARCHITECTURE

### LittleJS Engine Integration

**Framework Version**: LittleJS latest (from `/home/matt/Game Development/LittleJS/dist/littlejs.release.js`)

**Engine Capabilities We Use**:
- ✅ Physics system (`EngineObject` with collision, mass, velocity)
- ✅ Particle system (collection effects, celebrations)
- ✅ Sound system (ZzFX procedural audio)
- ✅ Sprite rendering (tile-based 256×256 sheet)
- ✅ Input handling (keyboard, mouse, touch)
- ✅ Camera system (follow player, screen shake)

**Engine Idioms (Constitution Article IV)**:

1. **Extend EngineObject for all entities**:
```javascript
class PlayerBall extends EngineObject {
    constructor(pos) {
        super(pos, vec2(0.5, 0.5), tile(0, 16));
        this.setCollision(true, true, false);
        // ...custom properties
    }
}
```

2. **Use vec2() for all positions/sizes**:
```javascript
const playerPos = vec2(0, 0);  // Center of world
const objectSize = vec2(1.5, 1.5);  // 1.5×1.5 units
```

3. **Use tile() for sprites** (256×256 sheet, 16×16 tiles):
```javascript
tile(0, 16)  // Tile index 0, grid size 16×16
//   ^            ^
//   |            └─ Tiles per row (256÷16 = 16)
//   └─ Tile number (0-255)
```

4. **Use ZzFX for audio** (no audio files):
```javascript
const sound_collect = new Sound([,,537,.02,.02,.22,1,1.59,-6.98,4.97]);
sound_collect.play(pos, volume, pitch);
```

### File Structure

**Single-File Approach** (Acceptable for jam):
```
game-jam-2025/
├── index.html           # Entry point
├── src/
│   └── game.js          # All code (1000-1500 lines OK)
├── assets/
│   └── sprites.png      # 256×256 tile sheet
└── .specify/
    ├── specs/           # Feature specifications
    ├── templates/       # Spec-Kit templates
    └── memory/
        └── constitution.md
```

**Multi-File Approach** (Better organization):
```
src/
├── game.js              # Engine init, managers, main loop
├── player.js            # PlayerBall class
├── collectibles.js      # Collectible, Competitor classes
├── levels.js            # LevelManager, LEVELS config
├── sounds.js            # SoundManager, ZzFX sounds
└── config.js            # COLLECTIBLE_DATA, constants
```

### Data-Driven Design Pattern

**Configuration Objects** (not hardcoded values):

```javascript
// GOOD: Data-driven
const COLLECTIBLE_DATA = {
    coin: { size: 0.3, value: 1, threshold: 0, sprite: 2 },
    teacher: { size: 2.0, value: 300, threshold: 1.6, sprite: 9 },
    yacht: { size: 10.0, value: 50000, threshold: 8.0, sprite: 22 }
};

const LEVELS = [
    { name: "Broke Era", time: 60, goal: 500, worldSize: 50 },
    { name: "Influencer Arc", time: 90, goal: 15000, worldSize: 100 },
    { name: "Oligarch Endgame", time: 120, goal: 500000, worldSize: 150 }
];
```

**Why This Matters**:
- Easy to balance (change numbers, not code)
- Easy to add content (new objects = new data entry)
- Easy to spec (specs reference data structures)
- Follows Constitution Article IV (LittleJS Native)

---

## IMPLEMENTATION GUIDE

### Complete Class Implementations

**See ULTRA-DEEP-RESEARCH.md PART 15 for full code** (lines 1889-3049).

Key classes already designed and ready to implement:

1. **PlayerBall** (~150 lines) - Player entity with Katamari mechanics
2. **Collectible** (~25 lines) - Objects to collect with magnetic attraction
3. **Competitor** (~60 lines) - AI entities that chase/flee
4. **LevelManager** (~100 lines) - Spawning, timer, win/lose logic
5. **SoundManager** (~50 lines) - ZzFX audio with 5+ sounds defined

### Integration Pattern

**Complete game.js structure**:

```javascript
// ============================================================================
// CONFIGURATION
// ============================================================================
const GAME_CONFIG = {
    name: 'Tiny Tycoon',
    canvasSize: vec2(1920, 1080),
    cameraScale: 32,
};

// ============================================================================
// DATA STRUCTURES
// ============================================================================
const COLLECTIBLE_DATA = { /* ... */ };
const LEVELS = [ /* ... */ ];

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================
let player;
let levelManager;
let soundManager;

// ============================================================================
// CLASSES (Insert class definitions here)
// ============================================================================
class PlayerBall extends EngineObject { /* ... */ }
class Collectible extends EngineObject { /* ... */ }
class Competitor extends EngineObject { /* ... */ }
class LevelManager { /* ... */ }
class SoundManager { /* ... */ }

// ============================================================================
// LITTLEJS LIFECYCLE HOOKS (Required by engine)
// ============================================================================
function gameInit() {
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
    // HUD rendering
    if (levelManager && levelManager.gameState === 'playing' && player) {
        // Timer (top center)
        const timeStr = levelManager.getTimeString();
        drawText(timeStr, vec2(960, 1000), 48, WHITE);

        // Score (top left)
        const scoreStr = `$${player.collectedValue}`;
        drawText(scoreStr, vec2(100, 1000), 40, rgb(1, 1, 0));

        // Size (top right)
        const sizeStr = `Size: ${player.size.x.toFixed(1)}x`;
        drawText(sizeStr, vec2(1820, 1000), 40, rgb(0.5, 1, 0.5));
    }

    // Win/lose screens
    if (levelManager) {
        if (levelManager.gameState === 'won') {
            drawText('LEVEL COMPLETE!', vec2(960, 540), 80, rgb(0, 1, 0));
        } else if (levelManager.gameState === 'lost') {
            drawText('TIME UP!', vec2(960, 540), 80, rgb(1, 0, 0));
            drawText('Press R to Retry', vec2(960, 480), 40, WHITE);
        }
    }
}

// ============================================================================
// START ENGINE (Must be at end of file)
// ============================================================================
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
```

### Quick Start (30-Minute Bootstrap)

**See docs/DAY-1-QUICKSTART.md for complete guide** (if it exists).

**7 Steps**:

1. Create project folders:
```bash
cd "/home/matt/Game Development/games"
mkdir -p game-jam-2025/{src,assets,tests,.specify}
cd game-jam-2025
```

2. Copy LittleJS engine:
```bash
# Verify LittleJS exists
ls ../../LittleJS/dist/littlejs.release.js
```

3. Create index.html (entry point)

4. Create package.json:
```json
{
  "name": "tiny-tycoon",
  "version": "0.1.0",
  "scripts": {
    "dev": "python3 -m http.server 8080"
  }
}
```

5. Create minimal src/game.js (test setup)

6. Run dev server:
```bash
npm run dev
# Open http://localhost:8080
```

7. Verify: See red ball + "Tiny Tycoon" text

**Success Criteria**:
- ✅ Browser loads without errors
- ✅ Console shows "Tiny Tycoon initialized!"
- ✅ Red test ball visible on screen
- ✅ No 404s in Network tab

---

## VISUAL DESIGN

### The "It Factor" (From VISION.md Research)

**Current Problem**: Abstract colored rectangles feel "soulless"

**Solution**: Named, recognizable sprites with personality

**Before** (soulless):
```
Yellow rectangle (#FFD700)
Blue rectangle (#0000FF)
```

**After** (with soul):
```
PENNY (copper coin sprite, shiny)
TEACHER (stick figure person, shocked face)
YACHT (white boat sprite, luxury details)
```

### Sprite System

**Sprite Sheet**: `assets/sprites.png`
- Size: 256×256 pixels
- Tile Size: 16×16 pixels per object
- Total Tiles: 256 possible sprites (16×16 grid)
- Format: PNG with transparency

**Tile Index Map** (See ULTRA-DEEP-RESEARCH.md PART 28 for complete list):

```
Row 0 (Tiles 0-15): Player + Level 1 Collectibles
├─ Tile 0: Player Ball (golden, $ symbol)
├─ Tile 1: Eraser (pink rectangle)
├─ Tile 2: Penny (copper circle)
├─ Tile 3: Gum (pink blob)
├─ Tile 4: Crayon (diagonal stick)
├─ Tile 5: Homework (paper with F grade)
├─ Tile 6: Lunchbox (colorful box)
├─ Tile 7: Backpack (bag with straps)
├─ Tile 8: Basketball (orange with lines)
├─ Tile 9: Desk (brown furniture)
├─ Tile 10: Teacher (stick figure person!)
├─ Tile 11: Bookshelf (tall with books)
└─ Tile 12: Swing Set (playground equipment)

Row 1 (Tiles 16-31): Level 2 Collectibles
├─ Tile 16: Coffee Cup (Starbucks-style)
├─ Tile 17: Laptop (MacBook-style)
├─ Tile 18: Office Chair (wheeled)
├─ Tile 19: Bicycle (two wheels)
├─ Tile 20: E-Scooter (Bird/Lime-style)
├─ Tile 21: Businessman (person in suit!)
├─ Tile 22: Sofa (furniture)
├─ Tile 23: Car (sedan with wheels)
├─ Tile 24: Food Truck (box truck)
└─ Tile 25: House (small building)

Row 2 (Tiles 32-47): Level 3 Collectibles
├─ Tile 32: Yacht (luxury boat)
├─ Tile 33: Limousine (stretch car)
├─ Tile 34: Mansion (large house)
├─ Tile 35: Helicopter (aircraft)
├─ Tile 36: Private Jet (plane)
├─ Tile 37: Office Building (skyscraper)
├─ Tile 38: Skyscraper (massive tower)
└─ Tile 39: Space Rocket (Elon Musk vibes)

Row 3 (Tiles 48-63): UI & Effects
├─ Tile 48: Particle (sparkle)
├─ Tile 49: Particle (star)
└─ Tiles 50-63: Reserved for future
```

**Sprite Design Principles** (From VISION.md research):

1. **Silhouette First**: Recognizable from outline alone at 16×16px
2. **2-3 Colors Max**: Use LittleJS color tinting for variation
3. **Top-Down 3/4 View**: Consistent perspective
4. **Icon Style**: Think emoji/icon, not realistic detail
5. **High Contrast**: Bold differences for tiny sprites

**Placeholder Strategy** (Constitution: Playable > Pretty):

**Option A**: Code-based shapes (acceptable for jam):
```javascript
class Collectible extends EngineObject {
    render() {
        // Draw colored shapes instead of sprites
        drawRect(this.pos, this.size, this.color);
    }
}
```

**Option B**: Simple pixel art (better):
- Use FREE tool: Piskel (https://www.piskelapp.com/) - browser-based
- Create 256×256 canvas with 16×16 grid
- Draw simple icons (circles, rectangles, stick figures)
- Export as PNG to assets/sprites.png

**Priority**:
- **P1**: Code-based shapes (ship-able)
- **P2**: Simple pixel art (better feel)
- **P3**: Polished sprites (ideal)

### Visual Feedback ("Juice")

**Screen Shake** (on collection):
```javascript
cameraShake = 0.1 + (objectValue * 0.01); // Bigger = more shake
```

**Particles** (on collection):
```javascript
new ParticleEmitter(
    pos, 0, 1, 0.5, 50, PI,  // Position, angle, emitSize, emitTime, particleCount, range
    tile(48, 16),             // Particle sprite
    rgb(1, 1, 0), rgb(1, 0.5, 0),  // Color start, color end
    rgb(1, 1, 0, 0), rgb(1, 0, 0, 0),  // Additional color
    0.5, 1, 0.1, 0.2, 0.1     // Size, speed, damping, angle damping, gravity
);
```

**Popup Text** (on collection):
```javascript
// Show "CONSUMED: DESK! +$200"
drawText(`CONSUMED: ${obj.name}! +$${obj.value}`, pos, 24, WHITE);
```

**Growth Animation** (smooth size change):
```javascript
// Lerp from current size to target size
this.size = this.size.lerp(targetSize, 0.1);
```

---

## SOUND DESIGN

### ZzFX Audio System

**Why ZzFX** (Constitution: LittleJS Native):
- Procedural sound (code, not files)
- ~20 bytes per sound definition
- Real-time parameter tweaking
- No asset loading delays

**Sound Designer Tool**: https://killedbyapixel.github.io/ZzFX

### Core Sounds (5 Required)

**1. Collect Sound** (pitch-scaled by value):
```javascript
const sound_collect = new Sound([,,537,.02,.02,.22,1,1.59,-6.98,4.97]);
// High pitch "bling!" for small items
// Lower pitch for big items (adjust frequency parameter)
```

**2. Tier Up Sound** (major achievement):
```javascript
const sound_tierUp = new Sound([,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]);
// Rising tone, celebratory
```

**3. Victory Sound** (level complete):
```javascript
const sound_victory = new Sound([1.5,,262,,.2,.4,1,1.8,,,,,,,,.5,.1]);
// Fanfare, ascending arpeggio
```

**4. Defeat Sound** (time up):
```javascript
const sound_defeat = new Sound([1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]);
// Descending sad trombone
```

**5. Timer Warning** (last 10 seconds):
```javascript
const sound_timerWarning = new Sound([,,400,.01,,.05,,1.5,,,,,,,,.1]);
// Beep beep beep (urgent)
```

### Sound Manager Pattern

```javascript
class SoundManager {
    constructor() {
        // Pre-load all sounds
        this.sounds = {
            collect: sound_collect,
            tierUp: sound_tierUp,
            victory: sound_victory,
            defeat: sound_defeat,
            timerWarning: sound_timerWarning
        };
    }

    playCollect(pos, value) {
        // Pitch scales with value
        const pitchScale = 1 + (value * 0.01);
        this.sounds.collect.play(pos, 1, pitchScale);
    }

    playTierUp(pos) {
        this.sounds.tierUp.play(pos);
    }

    // ... etc
}
```

---

## QUALITY STANDARDS

### Definition of "Done" (Constitution Article V)

Every feature must meet ALL criteria:

- [ ] **Playable** - Feature works without bugs or console errors
- [ ] **Theme** - "SMALL" theme is evident in feature
- [ ] **Performance** - Maintains 60 FPS with 100+ entities on screen
- [ ] **Cross-Browser** - Works in Chrome + Firefox (desktop)
- [ ] **Explainable** - Can be demoed in <30 seconds
- [ ] **Value** - Contributes to winning the jam (fun, polished, theme-appropriate)

### Testing Strategy (Constitution Article IV)

**Manual Testing** (prioritized for jam):
- Playtest after every major change
- Test win/lose conditions explicitly
- Verify physics feel correct (Katamari momentum)
- Check theme is recognizable
- Cross-browser test (Chrome + Firefox minimum)

**Automated Tests** (only if time permits in P3):
- Physics collision edge cases
- Level data validation
- Sound system initialization

### Performance Standards

**Target**: 60 FPS on mid-range devices
- **Test Device**: Chrome on 4GB RAM laptop (2019+)
- **Maximum Entities**: 500 simultaneous objects (LittleJS handles 100k+, we're safe)
- **File Size**: <200KB total game size
- **Sprite Sheet**: Single 256×256 PNG (<50KB compressed)
- **Audio**: ZzFX only (procedural, ~20 bytes per sound)

**Browser Support**:
- **Primary (P1)**: Chrome/Firefox/Safari latest 2 versions, desktop
- **Secondary (P4)**: Mobile browsers (post-jam)

---

## DEVELOPMENT WORKFLOW

### Timeline & Milestones (Constitution Article III)

**Ship Date**: November 3, 2025 (T-20 days from Oct 14)

**Week 1 (Oct 14-20) - P1 Features**:
- [ ] Project bootstrap complete
- [ ] Player movement working (WASD/arrows)
- [ ] Collection system functional (size-gated)
- [ ] Growth mechanics (exponential size increase)
- [ ] Basic collision physics
- **Milestone Gate (Oct 20)**: Playable core loop or pivot

**Week 2 (Oct 21-27) - P2 Features**:
- [ ] 3 levels implemented
- [ ] Win/lose conditions working
- [ ] Level progression (L1→L2→L3)
- [ ] Timer system functional
- **Milestone Gate (Oct 27)**: All levels complete or reduce scope

**Week 3 (Oct 28-Nov 2) - P3 Polish**:
- [ ] Screen shake + particles
- [ ] ZzFX sound effects (5 sounds)
- [ ] Visual feedback (popups, growth animation)
- [ ] Consumption logs
- **Milestone Gate (Nov 1)**: Feature freeze, polish only

**Final Day (Nov 3) - Submission**:
- [ ] Build production version
- [ ] Test on itch.io upload
- [ ] Submit to game jam
- [ ] Share on Discord/social

### Decision Framework

**When to CUT a feature**:
- Takes >2 days to implement → CUT or simplify
- Doesn't directly contribute to theme → CUT
- Requires external dependencies → CUT
- Adds complexity without fun → CUT

**Priority Order** (Constitution Article V):
1. Game loop works (move, collect, grow)
2. Win/lose conditions function
3. Level progression exists
4. Visual feedback (particles, screen shake)
5. Sound effects (ZzFX)
6. Sprite art (code shapes acceptable if time-constrained)
7. Polish (animations, tweening, juice)

---

## RESEARCH REFERENCES

### Comprehensive Documentation

**ULTRA-DEEP-RESEARCH.md** (6,876 lines):
- **PARTS 1-14**: Game design philosophy, psychology, market analysis
- **PART 15**: Complete implementation code (all classes, integration)
- **PARTS 16-25**: Advanced topics (flow, retention, accessibility, etc.)
- **PART 26**: Project setup guide (bootstrap instructions)
- **PART 27**: Build system and itch.io deployment
- **PART 28**: Sprite sheet system (tiles 0-255 documented)

**VISION.md** (2,054 lines):
- Latest exhaustive research (October 17, 2025)
- Gen Alpha games analysis (Roblox, agar.io, Cookie Clicker)
- LittleJS game jam ecosystem research
- Pixel art tutorials and sprite creation deep-dive
- Audio & juice systems (ZzFX, game feel theory)
- Addiction psychology (flow theory, operant conditioning)
- Narrative & humor (Katamari analysis, Gen Alpha slang)
- Competitor analysis (what works, what doesn't)

**RESEARCH-TO-SPEC-PLAN.md** (774 lines):
- Gap analysis (what research has vs what's missing)
- Production workflow guide
- Integration checklists
- Bootstrap procedures

**Constitution** (.specify/memory/constitution.md) (368 lines):
- 5 core principles (non-negotiable)
- Technical constraints
- Development workflow (Spec-Kit mandatory)
- Quality gates
- Winning strategy

### Key Insights Synthesis

**The "It Factor" Formula** (from VISION.md):
```
Theme (capitalism satire)
+ Mechanics (Katamari growth)
+ Juice (shake/sound/particles)
+ Progression (3 levels + combos)
+ Personality (named objects + Gen Alpha humor)
= IT FACTOR ✨
```

**Critical Gaps to Fix** (from all sources):
1. ❌ Visual Identity: Rectangles → Named Sprites
2. ❌ Feedback Loops: Silent → Shake + Sound + Particles
3. ❌ Personality: Generic → Gen Alpha ironic humor
4. ❌ Progression: Flat → Combo system + Rare objects
5. ❌ Share-ability: Forgettable → Consumption logs + Stats

**Implementation Priority** (synthesized):
1. **Phase 1: SOUL** (6-8 hrs) - Replace rectangles with sprites
2. **Phase 2: JUICE** (3-4 hrs) - Add shake, sound, particles
3. **Phase 3: PERSONALITY** (2-3 hrs) - Flavor text, consumption logs
4. **Phase 4: PROGRESSION** (4-5 hrs) - Combos, rare objects, bonuses

---

## APPENDICES

### A. Glossary

**Katamari Damacy**: PS2 game where you roll adhesive ball collecting objects to grow exponentially

**Spec-Kit**: Constitution-driven development workflow (specify→clarify→plan→tasks→implement→analyze)

**ZzFX**: Procedural audio engine built into LittleJS (20-parameter sound synthesis)

**EngineObject**: LittleJS base class for all game entities (has physics, rendering, collision)

**tile()**: LittleJS function to reference sprites in tile sheet (tile index, grid size)

**vec2()**: LittleJS 2D vector class (position, size, velocity)

**P1/P2/P3/P4**: Priority levels (P1 = critical, P2 = important, P3 = polish, P4 = post-jam)

**Gen Alpha**: Generation born 2010-2025 (largest generation, 90% mobile-first, entrepreneurial)

### B. Common Pitfalls

**Pitfall 1**: Starting to code without spec
- **Solution**: Always `/speckit.specify` first

**Pitfall 2**: Feature creep (adding "cool ideas")
- **Solution**: Check against Constitution principles, use priority system

**Pitfall 3**: Over-engineering architecture
- **Solution**: Single-file is OK for jam, data-driven patterns over abstractions

**Pitfall 4**: Perfectionism on art/audio
- **Solution**: Playable > Pretty (code shapes acceptable, polish in P3)

**Pitfall 5**: Not testing cross-browser
- **Solution**: Test Chrome + Firefox after every major change

### C. Quick Command Reference

**Spec-Kit Commands**:
```bash
/speckit.specify [feature description]  # Create spec
/speckit.clarify                        # Ask clarifying questions
/speckit.plan                           # Create implementation plan
/speckit.tasks                          # Break into atomic tasks
/speckit.implement                      # Execute tasks
/speckit.analyze                        # Check consistency
```

**Development Commands**:
```bash
npm run dev      # Start dev server (http://localhost:8080)
npm run build    # Build production version
npm test         # Run tests (if any)
```

**Git Workflow** (Constitution-aligned):
```bash
git checkout -b 001-feature-name    # Feature branch naming
git add .
git commit -m "feat: description"   # Conventional commits
git push origin 001-feature-name
```

---

## CHANGELOG

**v1.0.0** (October 17, 2025)
- Initial unified source of truth created
- Synthesized ULTRA-DEEP-RESEARCH.md, RESEARCH-TO-SPEC-PLAN.md, Constitution, VISION.md
- Aligned with Spec-Kit workflow
- Ready for `/speckit.specify` to begin feature development

---

**STATUS**: ✅ Ready for Production
**NEXT ACTION**: Begin `/speckit.specify` for first P1 feature (Core Katamari Mechanic)
**MAINTAINER**: Review every Friday or after major decisions
**AUTHORITY**: This document supersedes conflicting information in other docs
