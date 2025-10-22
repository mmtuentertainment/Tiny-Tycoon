# Tiny Tycoon Constitution

<!--
╔════════════════════════════════════════════════════════════════════════════╗
║ ⚠️  PROJECT-OWNED FILE - DO NOT OVERWRITE WITH GENERIC TEMPLATE          ║
║                                                                            ║
║ This file contains 2,447 lines of Tiny Tycoon-specific requirements,      ║
║ including 60 Functional Requirements (FR-001 to FR-060), complete game    ║
║ design, data structures, and technical specifications.                    ║
║                                                                            ║
║ If updating via Spec-Kit workflow:                                        ║
║ • Run commands FROM games/game-jam-2025/ directory (not workspace root)   ║
║ • Use merge/append operations, NOT blind overwrites                       ║
║ • Backup before ANY automated changes                                     ║
║                                                                            ║
║ Last Verified: 2025-10-22 | Lines: 2447 | Status: Production-Ready       ║
╚════════════════════════════════════════════════════════════════════════════╝
-->

> **Katamari-Style Business Growth Game for LittleJS Game Jam 2025**
>
> **Theme**: "SMALL" | **Ship Date**: November 3, 2025 | **Status**: Production-Ready

---

## Preamble

This Constitution establishes the **immutable principles**, **technical specifications**, and **governance framework** for Tiny Tycoon development. All features, code, and decisions MUST align with these principles. This document supersedes conflicting information in other documentation.

**Authority**: This Constitution governs all development via Spec-Kit workflow (specify→clarify→plan→tasks→implement→analyze).

---

## 📖 CONSTITUTION USAGE GUIDE (READ THIS FIRST!)

### **What Is This Document?**

The Constitution is your **single source of truth** containing:
- ✅ **60 Functional Requirements** (FR-001 to FR-060) - exact specifications
- ✅ **16 Articles** - organized by concern (theme, mechanics, levels, technical, etc.)
- ✅ **Complete data structures** - COLLECTIBLE_DATA (33 objects), LEVELS (3 levels)
- ✅ **Agent integration** - clear guidance on when to call which Spec-Kit command
- ✅ **Role-based sections** - marked with 🎮🎨🎵💻📊 so you know what's relevant

### **How to Use This (30-Second Version)**:

**If you're NEW** → Read "Quick Start by Role" section below (jumps to relevant Articles)
**If you're IMPLEMENTING** → Find FR-### number, copy code, call `/speckit.implement`
**If you're DESIGNING** → Read Articles I-IV + IX-X, call `/speckit.specify` to create spec
**If you're STUCK** → Read "Agent Call Decision Tree" or "Practical Agent Workflows"

### **Cheat Sheet - Most Important Sections**:

| I Need... | Go To... | Call This... |
|-----------|----------|--------------|
| Game concept understanding | Article I (Project Identity) | No agent - just read |
| Physics formula (how growth works) | Article III, FR-005 (Growth Formula) | `/speckit.implement` to code |
| List of all collectibles | Article XI, FR-048 (COLLECTIBLE_DATA) | Copy into src/config.js |
| Sprite tile map (what tile is what) | Article VI, FR-027 (Tile Map) | Piskel tool for creation |
| Sound effect parameters | Article VII, FR-033 (Sound Definitions) | ZzFX Designer for tweaking |
| Timeline and deadlines | Article VIII, FR-037 (Schedule) | No agent - track manually |
| Class code structure | Article XII, FR-053/055/057/059 | ULTRA-DEEP-RESEARCH PART 15 |
| Priority of features | Article XV, Section 15.1 (P1/P2/P3/P4) | `/speckit.specify` with priority |
| Current project status | Article XV, Section 15.2 (Status) | Update this weekly |

---

## 🎯 ROLE-BASED NAVIGATION & AGENT CONTEXT

### **QUICK START BY ROLE** (Jump to Relevant Sections):

**🎮 You're a Game Designer?**
1. Read: Article I (Identity) → Article II (Theme) → Article III (Mechanics) → Article IV (Levels)
2. Skip: Articles V, XII (developer-only implementation details)
3. Study: Article IX (It Factor) + Article X (Psychology) for engagement design
4. When ready: Call `/speckit.specify [your feature idea]` to create specification

**💻 You're a Developer?**
1. Read: Article V (Technical Standards) → Article XII (Class Specs)
2. Reference: FR-001 to FR-060 for exact implementation requirements
3. Code from: ULTRA-DEEP-RESEARCH.md PART 15 (complete class implementations)
4. Workflow: `/speckit.plan` → `/speckit.tasks` → `/speckit.implement` → `/speckit.analyze`

**🎨 You're an Artist?**
1. Read: Article VI (Visual Design) → FR-027 (Tile Map) → FR-028 (Design Principles)
2. Tool: Piskel (https://www.piskelapp.com/) - FREE browser-based sprite editor
3. Create: 256×256 sprite sheet with 16×16 tiles, following tile map (Tile 0 = Player, Tile 2 = Penny, etc.)
4. Hand off: Give sprites.png to Developer, they'll call `/speckit.implement` to integrate

**🎵 You're an Audio Designer?**
1. Read: Article VII (Sound Design) → FR-033 (Sound Definitions)
2. Tool: ZzFX Designer (https://killedbyapixel.github.io/ZzFX) - FREE browser-based sound creator
3. Create: 5 required sounds (collect, tierUp, victory, defeat, timerWarning), tweak parameters by ear
4. Hand off: Give ZzFX parameters to Developer, they'll add to SoundManager (FR-034)

**📊 You're a Project Manager?**
1. Read: Article VIII (Workflow) → Section 8.2 (Timeline) → Article XV (Priorities)
2. Track: Milestone gates (Oct 20, Oct 27, Nov 1, Nov 3)
3. Enforce: P1→P2→P3→P4 priority system, no feature creep
4. Monitor: Section 15.2 (Current Status) - update weekly with team

### **How to Read This Constitution by Role**:

Each section is marked with team role indicators showing **who should read this** and **which agent/specialist to call** for implementation.

**Role Indicators**:
- 🎮 **Game Designer** - Game mechanics, psychology, level design, balance
- 💻 **Developer** - Code implementation, architecture, integration
- 🎨 **Artist** - Visual design, sprites, animations, UI
- 🎵 **Audio Designer** - Sound effects, music, audio implementation
- 📊 **Project Manager** - Workflow, timeline, priorities, gates

### **When to Call Which Agent/Specialist**:

| Reading Section | Your Role | Call This Agent/Tool |
|----------------|-----------|---------------------|
| Article I (Identity) | 🎮 📊 | General understanding - no agent needed |
| Article II (Theme) | 🎮 📊 | `/speckit.specify` when creating theme-related features |
| Article III (Mechanics) | 🎮 💻 | `/speckit.plan` for physics implementation |
| Article IV (Levels) | 🎮 💻 | `/speckit.specify` for level design features |
| Article V (Technical) | 💻 | `/speckit.implement` for coding tasks |
| Article VI (Visual) | 🎨 💻 | Piskel tool + `/speckit.implement` for sprite integration |
| Article VII (Sound) | 🎵 💻 | ZzFX Designer + `/speckit.implement` for audio |
| Article VIII (Workflow) | 📊 💻 | Spec-Kit commands for process management |
| Article IX (Design) | 🎮 🎨 | `/speckit.specify` for engagement features |
| Article X (Psychology) | 🎮 | General understanding - informs all design |
| Article XI (Data) | 💻 | `/speckit.implement` for data structure coding |
| Article XII (Classes) | 💻 | `/speckit.implement` for class implementation |
| Article XIII (Governance) | 📊 | Process management - no agent needed |
| Article XIV (Research) | 🎮 💻 🎨 🎵 | Reference material - navigate to relevant docs |
| Article XV (Priorities) | 📊 | `/speckit.specify` to create prioritized features |

### **Agent Call Decision Tree**:

```
Need to understand game concept?
└─→ Read Article I, II, III (no agent needed)

Need to implement feature?
├─→ Is it specified? NO → Call `/speckit.specify [description]`
└─→ Is it specified? YES → Call `/speckit.plan` then `/speckit.implement`

Need to create sprites?
├─→ Open Piskel (https://www.piskelapp.com/)
├─→ Reference Article VI, Section 6.1, FR-027 (tile map)
└─→ When done, call `/speckit.implement` to integrate sprites

Need to create sounds?
├─→ Open ZzFX Designer (https://killedbyapixel.github.io/ZzFX)
├─→ Reference Article VII, Section 7.1, FR-033 (sound params)
└─→ When done, call `/speckit.implement` to integrate sounds

Need to check timeline?
└─→ Read Article VIII, Section 8.2, FR-037 (no agent, just reference)

Need to validate against Constitution?
└─→ Call `/speckit.analyze` to check spec/plan/code alignment

Confused about priorities?
└─→ Read Article XV, Section 15.1 (P1/P2/P3/P4 definitions)
```

---

## 🤖 PRACTICAL AGENT WORKFLOWS (By Role)

### **🎮 Game Designer Workflow**:

**When designing new feature**:
1. Read relevant Article (I-IV for mechanics, IX-X for engagement)
2. Call `/speckit.specify [feature description]`
3. Agent will generate spec.md with:
   - User stories prioritized by P1/P2/P3/P4 (from Article XV)
   - Theme validation section (checks Article II requirements)
   - References to Constitution FRs
4. Review spec.md, answer clarifying questions with `/speckit.clarify`
5. Hand off to Developer for `/speckit.plan` and `/speckit.implement`

**Example**:
```bash
# You want to add combo system:
/speckit.specify "Add combo multiplier system that rewards collecting multiple objects quickly"

# Agent will:
# - Reference FR-050 (Combo System specification)
# - Check Article IX (It Factor requirements)
# - Generate spec with P3 priority (polish feature)
# - Include acceptance criteria from FR-050
```

### **💻 Developer Workflow**:

**When implementing feature**:
1. Check if spec exists in `.specify/specs/[###-feature-name]/`
   - If NO: Cannot code! Ask Game Designer to call `/speckit.specify` first
   - If YES: Proceed to step 2
2. Call `/speckit.plan` (generates technical approach)
3. Agent will create plan.md with:
   - Constitution Check section (validates FR compliance)
   - Code structure (references Article XII class specs)
   - File organization (references Article V, FR-020)
4. Call `/speckit.tasks` (breaks plan into atomic tasks)
5. Call `/speckit.implement` (executes tasks, writes code)
6. Call `/speckit.analyze` (validates against Constitution)

**Example**:
```bash
# Implementing player collection system:
cd .specify/specs/001-core-katamari-mechanic/
/speckit.plan
# Agent generates plan.md with Constitution Check:
# - FR-001: Size-based collection ✅
# - FR-002: Magnetic attraction ✅
# - FR-053: PlayerBall class structure ✅

/speckit.tasks
# Agent breaks into tasks: TASK-001, TASK-002, etc.

/speckit.implement
# Agent executes tasks, writes code, tests each step
```

### **🎨 Artist Workflow**:

**When creating sprites**:
1. Read Article VI (Visual Design Specifications)
2. Open Piskel tool: https://www.piskelapp.com/
3. Create new sprite (256×256 canvas, 16×16 grid)
4. Reference FR-027 (Tile Allocation Map) for what to draw where:
   - Tile 0: Player Ball
   - Tile 2: Penny
   - Tile 10: Teacher
   - etc. (complete map in Section 6.1)
5. Follow FR-028 design principles:
   - Silhouette-first
   - 2-3 colors max
   - Top-down 3/4 view
   - High contrast
6. Export as PNG to `assets/sprites.png`
7. Ask Developer to call `/speckit.implement` to integrate sprites into game

**No agent call for art creation** - use external tool (Piskel).
**Agent call for integration** - Developer uses `/speckit.implement`.

### **🎵 Audio Designer Workflow**:

**When creating sound effects**:
1. Read Article VII (Sound Design Specifications)
2. Open ZzFX Designer: https://killedbyapixel.github.io/ZzFX
3. Reference FR-033 (Sound Effect Definitions) for starting parameters:
   - sound_collect: `[,,537,.02,.02,.22,1,1.59,-6.98,4.97]`
   - sound_tierUp: `[,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]`
   - etc.
4. Copy parameters into ZzFX Designer, tweak by ear
5. Export new parameters
6. Give parameters to Developer
7. Developer calls `/speckit.implement` to add sounds to SoundManager (FR-034 pattern)

**No agent call for sound design** - use external tool (ZzFX Designer).
**Agent call for integration** - Developer uses `/speckit.implement`.

### **📊 Project Manager Workflow**:

**Tracking progress**:
1. Read Article VIII, Section 8.2 (Timeline & Milestone Gates)
2. Check current date against milestones:
   - Oct 20: Core loop playable? (P1 complete)
   - Oct 27: All 3 levels done? (P2 complete)
   - Nov 1: Feature freeze? (P3 complete)
3. Read Article XV, Section 15.2 (Current Feature Status)
4. Identify missing features (✅ vs ❌ checklist)
5. Prioritize work for team using P1/P2/P3/P4 system

**When behind schedule**:
1. Reference Article VIII, FR-038 (Decision Framework)
2. Apply scope reduction protocol:
   - Day 7: Reduce to 1 level if needed
   - Day 14: Ship with 2 levels if needed
   - Day 18: Cut polish, fix bugs only

**No agent calls for PM role** - pure process management.
**Exception**: Can call `/speckit.analyze` to validate project health.

---

## ARTICLE I: Project Identity
> **Audience**: 🎮 Game Designers, 📊 Project Managers
> **Agent Context**: General understanding - reference material for all `/speckit.specify` calls

### Section 1.1 - Core Concept

**Official Definition**:
> "Katamari Damacy meets Cookie Clicker meets Gen Alpha Hustle Culture"

**Elevator Pitch** (30 seconds):
- Start as 0.5×0.5 unit entrepreneur (SMALL)
- Roll around playground/city/luxury district
- Collect objects smaller than yourself (coins, people, cars, buildings)
- Grow exponentially into business empire (BIG - 50+ units, 100x growth)
- 3 levels with escalating absurdity (penny → teacher → yacht → rocket)
- Ironic capitalism satire with brain-rot energy

### Section 1.2 - Game Jam Context

**Event**: LittleJS Game Jam 2025
**Theme**: "SMALL"
**Start Date**: October 3, 2025
**End Date**: November 3, 2025 (NON-NEGOTIABLE)
**Current Status**: T-17 days remaining (as of Oct 17, 2025)
**Platform**: Browser (HTML5)
**Engine**: LittleJS (from `/home/matt/Game Development/LittleJS/dist/littlejs.release.js`)

**Judging Criteria** (typical game jams):
- **40%** Theme interpretation
- **30%** Gameplay/Fun
- **20%** Innovation/Creativity
- **10%** Polish/Presentation

**Prize Structure**:
- $100 for 1st place overall
- $100 charity donation for best physics usage
- Top 3: Newgrounds front page + Copilot Pro 3 months
- Top 3: Physical mailing with certificate

### Section 1.3 - Competitive Positioning

**Unique Value Propositions**:
1. **Perfect Theme Fit**: Katamari = small→big (obviousto judges in <30 seconds)
2. **Untapped Market**: No web-based Katamari business games exist
3. **Research-Backed**: 10,000+ lines of research (ULTRA-DEEP-RESEARCH, VISION, SOURCE-OF-TRUTH)
4. **LittleJS-Native**: Uses framework's physics/particle/sound systems optimally
5. **Proven Concept**: Katamari Damacy is critically acclaimed (one of greatest games ever)

**Differentiation from Competitors**:
- vs agar.io/slither.io: Physical objects + theme (not abstract blobs)
- vs Cookie Clicker: Active gameplay (not passive clicking)
- vs Roblox tycoons: Browser-based (no install), complete in 10 minutes
- vs Other jam entries: 200+ hours research, polished physics feel

---

## ARTICLE II: Theme-First Development (NON-NEGOTIABLE)
> **Audience**: 🎮 Game Designers, 📊 Project Managers
> **Agent Context**: Use `/speckit.specify` to create theme-compliant features. Every spec MUST validate against Section 2.3 (Theme Integration Test).

### Section 2.1 - Theme Requirements

**Theme**: "SMALL"

**Validation Criteria** (MUST pass all):
- [ ] Can players identify "SMALL" theme within first 30 seconds of play?
- [ ] Does core mechanic embody theme through gameplay (not just narrative)?
- [ ] Is visual scale progression immediately recognizable?
- [ ] Does theme drive design decisions (not just decoration)?

**Implementation Mandates**:
1. Player MUST start at smallest possible scale: **0.5×0.5 game units** (marble/penny size)
2. Growth MUST be exponential and visually dramatic: **0.5 → 50+ units** (100x)
3. Camera MUST dynamically adjust to emphasize size changes (zoom out as player grows)
4. Collectibles MUST range from tiny (0.3u) to massive (50u) with clear visual hierarchy
5. "Aha!" moments MUST occur when previously-impossible objects become collectable

### Section 2.2 - Visual Scale Specification

**Size Tiers** (exponential progression):

| Tier | Player Size | Description | Example Objects | Visual Impact |
|------|-------------|-------------|-----------------|---------------|
| 0 | 0.5-1.0u | Tiny | Penny, Gum, Crayon | Fits in palm |
| 1 | 1.0-3.0u | Small | Backpack, Basketball, Desk | Hand-held to furniture |
| 2 | 3.0-8.0u | Medium | Coffee, Chair, Sofa | Furniture to vehicles |
| 3 | 8.0-15.0u | Large | Bicycle, Car, Food Truck | Vehicle scale |
| 4 | 15.0-30.0u | Huge | House, Yacht, Limo | Building scale |
| 5 | 30.0-50.0u | Mega | Jet, Skyscraper, Rocket | Megastructure scale |

**Camera Scaling Formula**:
```javascript
// Camera zooms out as player grows
cameraScale = 32 / (1 + player.size.x * 0.05);
// 0.5u: cameraScale = 31 (zoomed in)
// 10u: cameraScale = 21 (zoomed out)
// 50u: cameraScale = 11 (max zoom out)
```

### Section 2.3 - Theme Integration Test

**Playtester Protocol**:
1. Give player game with NO instructions
2. Let them play for 30 seconds
3. Ask: "What is the theme of this game?"
4. **Success**: 90%+ say "small to big", "growing", "starting small", or similar

**Developer Checklist** (every feature):
- [ ] Does this feature make the player feel SMALL at start?
- [ ] Does this feature create contrast between SMALL and BIG?
- [ ] Does this feature reward exponential growth?
- [ ] Can I explain how this relates to "SMALL" in one sentence?

---

## ARTICLE III: Katamari Mechanics (CORE IDENTITY)
> **Audience**: 🎮 Game Designers, 💻 Developers
> **Agent Context**:
> - **Game Designers**: Reference these mechanics when designing features with `/speckit.specify`
> - **Developers**: Use `/speckit.plan` to implement physics per FR-001 to FR-009. Code examples in Section 3.1-3.3.

### Section 3.1 - Physics Specification

**Inspired by**: Katamari Damacy (Keita Takahashi, Namco, 2004)

**Core Loop** (NON-NEGOTIABLE):
1. Roll around as growing ball/entity
2. Collect objects smaller than yourself
3. Grow larger, unlock bigger collectibles
4. Exponential progression creates "Aha!" moments

**Physics Requirements**:

**FR-001**: Size-Based Collection (Katamari Rule)
> 💻 **Developer Action**: Implement in `PlayerBall.collideWithObject()` method. See ULTRA-DEEP-RESEARCH.md PART 15 for complete implementation. Call `/speckit.implement` to code this.

```javascript
// SPECIFICATION:
// Player can ONLY collect object if: player.size >= object.threshold * 0.8
// Otherwise: Physics collision bounces player away

if (player.size.x >= object.sizeThreshold * 0.8) {
    collect(object);      // Magnetic pull, absorption, growth
    return false;         // No physics collision
} else {
    bounce(object);       // Too small - full physics response
    return true;          // Apply collision forces
}
```

**FR-002**: Magnetic Attraction System
- **Range**: 2× player radius (increases as player grows)
- **Activation**: When player is 90%+ of object's size threshold (almost can collect)
- **Force**: 0.05 units/frame toward player
- **Visual**: Objects "shimmer" or glow when in magnetic range
- **Audio**: Low hum increases in pitch as object approaches

**FR-003**: Momentum & Mass System
- **Specification**:
  ```javascript
  player.mass = 1 + (player.size.x * 0.1);  // Mass increases with size
  player.damping = 0.92;                     // Rolling friction (constant)
  moveSpeed = 0.1 / (1 + player.size.x * 0.1);  // Slower when bigger
  turnSpeed = 1.0 / (1 + player.size.x * 0.05);  // Harder to turn when bigger
  ```
- **Result**: Larger player feels "heavier" and more satisfying to control

**FR-004**: Collision Response (when too small)
- Player bounces off object with **elasticity: 0.3** (slight bounce)
- Object's mass determines knockback (heavy competitor barely moves, light coin bounces)
- **No damage** - this is growth game, not combat
- **Visual feedback**: Player squashes briefly (squash & stretch animation)

### Section 3.2 - Growth Formula Specification

**FR-005**: Exponential Growth Calculation
```javascript
// SIZE FORMULA (researched from Katamari Damacy):
newSize = START_SIZE + (collectedValue * GROWTH_RATE);

// CONSTANTS:
const START_SIZE = 0.5;          // Always start at 0.5×0.5 units
const GROWTH_RATE = 0.02;        // Size per $1 collected

// EXAMPLES:
// $0 collected   → 0.5 units (marble)
// $100 collected → 2.5 units (basketball)
// $500 collected → 10.5 units (desk)
// $1000 collected → 20.5 units (car)
// $25,000 collected → 500.5 units (building)
```

**FR-006**: Tier System (unlocks new collectibles)
```javascript
// TIER THRESHOLDS:
const TIERS = [
    { threshold: 0,     name: "BROKE",        unlocks: ['penny', 'gum', 'eraser'] },
    { threshold: 1.0,   name: "SIDE HUSTLE", unlocks: ['backpack', 'basketball'] },
    { threshold: 3.0,   name: "ENTREPRENEUR", unlocks: ['desk', 'teacher'] },
    { threshold: 8.0,   name: "INFLUENCER",  unlocks: ['car', 'sofa'] },
    { threshold: 15.0,  name: "CEO",         unlocks: ['house', 'yacht'] },
    { threshold: 30.0,  name: "OLIGARCH",    unlocks: ['jet', 'skyscraper', 'rocket'] }
];

// Tier up triggers:
// - Screen shake (0.3 power, 0.5 duration)
// - Particle explosion (100 particles, rainbow colors)
// - Sound effect (tier-up fanfare)
// - Text popup: "ENTREPRENEUR UNLOCKED!"
```

### Section 3.3 - Control Specification

**FR-007**: Input Handling (Desktop - P1 Priority)
- **WASD**: Move in 8 directions
- **Arrow Keys**: Alternative movement
- **Both**: Supported simultaneously (accessibility)
- **Response**: Immediate (zero-frame latency feel)

**FR-008**: Input Handling (Mobile - P4 Priority, Post-Jam)
- **Touch & Drag**: Ball rolls toward finger
- **Dynamic Joystick**: Appears where you first touch
- **Large Touch Zones**: 80% of screen is active touch area
- **Haptic Feedback**: Vibrate on collection (if browser supports)

**FR-009**: Movement Physics
```javascript
// SPECIFICATION:
const moveInput = keyDirection();  // LittleJS built-in, returns vec2(-1 to 1)
const moveSpeed = 0.1 / (1 + this.size.x * 0.1);  // Decreases with size
this.velocity = this.velocity.add(moveInput.scale(moveSpeed));

// CONSTRAINTS:
// - Maximum speed: capped at 5 units/second (prevent infinite acceleration)
// - Damping: 0.92 (feels like rolling, gradual stop)
// - No grid locking (free 360° movement)
```

### Section 3.4 - Prohibited Anti-Patterns

**MUST AVOID** (violates Katamari identity):
- ❌ Grid-based movement (breaks rolling feel)
- ❌ Platformer mechanics (jumping, gravity)
- ❌ Combat/damage systems (this is about growth, not fighting)
- ❌ Traditional tile-based collision (we use object-to-object)
- ❌ Resource management UI (no menus, pure physical gameplay)
- ❌ Click-to-move (not Katamari, that's agar.io)

---

## ARTICLE IV: Game Structure & Content
> **Audience**: 🎮 Game Designers, 💻 Developers
> **Agent Context**:
> - **Game Designers**: Use this for level design decisions. Call `/speckit.specify` to add/modify levels.
> - **Developers**: Implement levels per FR-010. Use LEVELS array from FR-047. Call `/speckit.implement` for coding.

### Section 4.1 - Level Specification

**FR-010**: Three-Level Progression System

**LEVEL 1: "BROKE ERA" - Schoolyard Hustle**
- **Setting**: Elementary school playground/classroom
- **World Size**: 50×50 units (confined space)
- **Start Size**: 0.5×0.5 units (marble)
- **Time Limit**: 60 seconds
- **Goal**: Collect $500 worth of objects
- **Collectibles**: 12 unique types (penny, gum, crayon, eraser, homework, lunchbox, backpack, basketball, desk, teacher, bookshelf, swing set)
- **Theme Context**: Childhood nostalgia, relatable objects, "I ate my teacher" absurdity
- **Difficulty**: Easy (tutorial level, forgiving timing)

**LEVEL 2: "INFLUENCER ARC" - Downtown Grind**
- **Setting**: City street/downtown urban area
- **World Size**: 100×100 units (2x bigger)
- **Start Size**: 0.5×0.5 units (RESET/REBIRTH - critical for theme!)
- **Time Limit**: 90 seconds
- **Goal**: Collect $15,000 worth
- **Collectibles**: 11 unique types (coffee cup, laptop, office chair, bicycle, e-scooter, businessman, sofa, motorcycle, car, food truck, house)
- **Theme Context**: Urban hustle, corporate satire, vehicle scale, "eating cars"
- **Difficulty**: Medium (balanced challenge, flow state)

**LEVEL 3: "OLIGARCH ENDGAME" - Luxury District**
- **Setting**: Marina/mansions/helipads/luxury
- **World Size**: 150×150 units (3x bigger)
- **Start Size**: 0.5×0.5 units (FINAL REBIRTH)
- **Time Limit**: 120 seconds
- **Goal**: Collect $500,000 worth
- **Collectibles**: 10 unique types (yacht, limousine, mansion, helicopter, startup office, superyacht, private jet, skyscraper, space rocket, island)
- **Theme Context**: Late-stage capitalism, absurd wealth, "eating infrastructure"
- **Difficulty**: Hard (mastery test, tight timing)

**FR-011**: Level Progression Rules
- Complete Level 1 → Unlock Level 2
- Complete Level 2 → Unlock Level 3
- Complete Level 3 → Victory screen + final stats + "NEW GAME+" option
- Fail any level → Retry same level (no progression penalty)
- **No level skipping** (must complete sequentially)

### Section 4.2 - Win/Lose Conditions

**FR-012**: Victory Condition
```javascript
// SPECIFICATION:
if (player.collectedValue >= level.goalValue && level.timeRemaining > 0) {
    triggerVictory();
}

// Victory Triggers:
// 1. Freeze game state
// 2. Play victory fanfare sound
// 3. Show "LEVEL COMPLETE!" text (80px, green)
// 4. Show consumption log (list of objects eaten)
// 5. Show stats (total $, objects consumed, time taken)
// 6. Show "NEXT LEVEL" button (if not final level)
// 7. Show "REPLAY" button
```

**FR-013**: Defeat Condition
```javascript
// SPECIFICATION:
if (level.timeRemaining <= 0 && player.collectedValue < level.goalValue) {
    triggerDefeat();
}

// Defeat Triggers:
// 1. Freeze game state
// 2. Play defeat sound (sad trombone)
// 3. Show "TIME UP!" text (80px, red)
// 4. Show how close player was: "You got $437 / $500 (87%)"
// 5. Show "RETRY" button (restart same level)
// 6. Show "MENU" button (return to level select)
// 7. NO PENALTIES (casual game, no punishment)
```

**FR-014**: Timer System
```javascript
// SPECIFICATION:
level.timeRemaining = level.timeLimit;  // Set on level start (60/90/120 seconds)

// Each frame:
level.timeRemaining -= 1/60;  // Decrease by 1 second per 60 frames

// Display format:
if (level.timeRemaining >= 10) {
    display: "0:47"  // MM:SS
} else {
    display: "0:07" (RED TEXT + WARNING SOUND)  // Last 10 seconds = urgent
}

// Warning behavior:
if (level.timeRemaining === 10) {
    playSound(sound_timerWarning);  // Beep beep beep
    flashTimerRed();                 // Visual urgency
}
```

### Section 4.3 - Collectible Object Specification

**FR-015**: Object Data Structure (Data-Driven Design)
```javascript
// SPECIFICATION:
const COLLECTIBLE_DATA = {
    [objectType]: {
        name: string,        // Display name ("PENNY", "TEACHER", "YACHT")
        size: float,         // World size in units (0.3 to 50.0)
        value: int,          // Dollar value ($1 to $2,000,000,000)
        threshold: float,    // Player size required to collect (0 to 40.0)
        sprite: int,         // Tile index (0-255) in sprite sheet
        level: int,          // Which level this appears in (1, 2, or 3)
        rarity: string       // 'common' | 'uncommon' | 'rare' | 'legendary'
    }
};

// EXAMPLE OBJECTS:
penny:      { name: "PENNY",     size: 0.3,  value: 1,      threshold: 0,    sprite: 2,  level: 1 }
teacher:    { name: "TEACHER",   size: 2.0,  value: 300,    threshold: 1.6,  sprite: 10, level: 1 }
car:        { name: "HONDA CIVIC", size: 12.0, value: 25000,  threshold: 9.6,  sprite: 23, level: 2 }
yacht:      { name: "YACHT",     size: 32.0, value: 5000000, threshold: 25.6, sprite: 32, level: 3 }
rocket:     { name: "SPACE ROCKET", size: 50.0, value: 2000000000, threshold: 40.0, sprite: 39, level: 3 }
```

**FR-016**: Spawning System
```javascript
// SPECIFICATION:
// On level start:
// 1. Clear all existing collectibles
// 2. Spawn initial batch (density based on world size)
// 3. Continuous spawning as objects are collected

const SPAWN_DENSITY = 0.8;  // Objects per square unit
const MAX_OBJECTS = 200;     // Cap to prevent performance issues

// Spawn grid (prevent clustering):
for (x = 0; x < worldSize; x += cellSize) {
    for (y = 0; y < worldSize; y += cellSize) {
        if (rand() < SPAWN_DENSITY) {
            spawnRandomCollectible(vec2(x, y), currentLevel);
        }
    }
}

// Progressive spawning (new objects appear as player grows):
if (collectiblesCount < MAX_OBJECTS && player.sizeTier > previousTier) {
    spawnHigherTierObjects(player.sizeTier);
}
```

**FR-017**: Collectible Distribution (Per Level)
```javascript
// SPECIFICATION:
// Level 1 distribution (Schoolyard):
const LEVEL_1_WEIGHTS = {
    penny: 40%,      // Very common
    gum: 25%,        // Common
    crayon: 15%,     // Uncommon
    backpack: 10%,   // Uncommon
    desk: 7%,        // Rare
    teacher: 2%,     // Very rare
    swingset: 1%     // Ultra rare
};

// Level 2 distribution (Downtown):
const LEVEL_2_WEIGHTS = {
    coffee: 30%,
    chair: 20%,
    bicycle: 15%,
    sofa: 12%,
    car: 10%,
    foodtruck: 8%,
    house: 5%
};

// Level 3 distribution (Luxury):
const LEVEL_3_WEIGHTS = {
    yacht: 25%,
    limo: 20%,
    mansion: 18%,
    helicopter: 15%,
    jet: 12%,
    office: 7%,
    skyscraper: 2%,
    rocket: 1%        // Ultra rare, high value
};
```

---

## ARTICLE V: Technical Constraints & Standards
> **Audience**: 💻 Developers
> **Agent Context**:
> - Reference FR-018 to FR-025 when implementing ANY feature.
> - Call `/speckit.implement` to execute coding tasks.
> - Use `/speckit.analyze` to validate engine idiom compliance.
> - **CRITICAL**: All code MUST follow Section 5.1 patterns or it violates Constitution.

### Section 5.1 - LittleJS Engine Requirements

**FR-018**: Engine Idioms (MANDATORY - Constitution Compliance)

**1. Extend EngineObject for ALL game entities**:
```javascript
// CORRECT:
class PlayerBall extends EngineObject { }
class Collectible extends EngineObject { }
class Competitor extends EngineObject { }

// WRONG (violates Constitution):
class PlayerBall { }  // Not extending EngineObject
```

**2. Use vec2() for ALL positions/sizes**:
```javascript
// CORRECT:
const pos = vec2(0, 0);
const size = vec2(1.5, 1.5);
player.velocity = player.velocity.add(vec2(0.1, 0));

// WRONG:
const pos = {x: 0, y: 0};  // Object literal
const size = [1.5, 1.5];   // Array
```

**3. Use tile() for sprite references**:
```javascript
// CORRECT:
tile(0, 16)   // Tile index 0, 16×16 grid (256 total tiles)
tile(23, 16)  // Tile index 23

// WRONG:
sprite[0]       // Array access
getTile(0)      // Custom function
```

**4. Use ZzFX for audio** (NO audio files):
```javascript
// CORRECT:
const sound_collect = new Sound([,,537,.02,.02,.22,1,1.59,-6.98,4.97]);
sound_collect.play(pos, volume, pitch);

// WRONG:
<audio src="collect.mp3"></audio>  // No audio files allowed
howlerJS.play('collect');           // No external libraries
```

**5. Use built-in particle system**:
```javascript
// CORRECT:
new ParticleEmitter(pos, 0, 1, 0.5, 50, PI, tile(48,16), WHITE, YELLOW, ...);

// WRONG:
class CustomParticleSystem { }  // Don't reinvent the wheel
```

**FR-019**: Architecture Patterns (Constitution Article IV)

**Acceptable for Jam**:
- ✅ Single file (src/game.js can be 1000-1500 lines)
- ✅ Global variables (player, levelManager, soundManager)
- ✅ Data-driven configuration objects (COLLECTIBLE_DATA, LEVELS)
- ✅ Modern JavaScript (const/let, arrow functions, classes)

**Prohibited** (over-engineering):
- ❌ External npm dependencies beyond LittleJS
- ❌ Complex build tooling (Webpack, Rollup, etc.)
- ❌ ECS architecture (overkill for 20-day project)
- ❌ TypeScript (adds complexity, no benefit for jam)
- ❌ State management libraries (Redux, MobX)

**FR-020**: File Organization Options

**Option A - Single File** (simple, jam-approved):
```
src/
└── game.js    # Everything (1000-1500 lines, totally acceptable)
```

**Option B - Multi-File** (better organization):
```
src/
├── game.js           # Engine init, managers (200 lines)
├── player.js         # PlayerBall class (150 lines)
├── collectibles.js   # Collectible, Competitor (100 lines)
├── levels.js         # LevelManager, LEVELS (150 lines)
├── sounds.js         # SoundManager, sound definitions (100 lines)
└── config.js         # COLLECTIBLE_DATA, constants (300 lines)
```

**Decision Rule**: Use Option A unless file exceeds 1500 lines, then split into Option B.

### Section 5.2 - Performance Standards

**FR-021**: Performance Requirements (MANDATORY)
- **Target FPS**: 60 FPS (16.67ms per frame)
- **Test Device**: Chrome browser on 4GB RAM machine (2019+ laptop)
- **Maximum Entities**: 500 simultaneous objects on screen
- **Degradation**: If FPS drops below 55, reduce spawning rate
- **Profile**: Use browser DevTools Performance tab to identify bottlenecks

**FR-022**: Asset Budget
- **Total Game Size**: <200KB (target: <150KB)
  - Sprite sheet: <50KB (256×256 PNG compressed)
  - JavaScript: <100KB (minified)
  - HTML: <5KB
  - Total: ~155KB ✅
- **Sprite Sheet**: Single 256×256 PNG
  - Tile size: 16×16 pixels
  - Total tiles: 256 (16×16 grid)
  - Format: PNG-8 with transparency
  - Compression: pngcrush or TinyPNG
- **Audio**: ZzFX only (procedural, ~20 bytes per sound × 10 sounds = 200 bytes)
- **Code**: Target 1000-1500 lines JavaScript (including comments)

**FR-023**: Browser Support Matrix

**Primary Support (P1 - MUST WORK)**:
- Chrome 120+ (desktop)
- Firefox 120+ (desktop)
- Safari 17+ (desktop)
- Resolutions: 1920×1080, 1366×768, 1280×720

**Secondary Support (P4 - Post-Jam)**:
- Mobile Chrome (Android)
- Mobile Safari (iOS)
- Tablet browsers
- Touch controls
- Portrait orientation

**NOT Supported** (acceptable trade-off):
- Internet Explorer (deprecated)
- Browsers without WebGL2 (show fallback message)
- Screen readers (P4 accessibility)

### Section 5.3 - Quality Gates

**FR-024**: Definition of "Done" (Every Feature MUST Pass)

Checklist:
- [ ] **Playable**: Feature works without bugs or console errors
- [ ] **Theme**: "SMALL" theme is evident in feature (30-second test)
- [ ] **Performance**: Maintains 60 FPS with 100+ entities on screen
- [ ] **Cross-Browser**: Works in Chrome + Firefox (desktop)
- [ ] **Explainable**: Can be demonstrated in <30 seconds to new player
- [ ] **Value**: Contributes to winning the jam (fun, polished, theme-appropriate)
- [ ] **No Placeholders**: No `// TODO` or `// FIXME` in main branch code
- [ ] **Documented**: Code has comments explaining non-obvious logic

**FR-025**: Testing Strategy (Constitution Compliance)

**Manual Testing** (PRIORITIZED for jam timeline):
- Playtest after every major change
- Test win/lose conditions explicitly
- Verify physics feel correct (Katamari momentum)
- Check theme is recognizable (30-second test with fresh eyes)
- Cross-browser test (Chrome + Firefox minimum)

**Automated Tests** (ONLY if time permits in P3):
- Physics collision edge cases
- Level data validation (COLLECTIBLE_DATA integrity)
- Sound system initialization

---

## ARTICLE VI: Visual Design Specifications
> **Audience**: 🎨 Artists, 💻 Developers
> **Agent Context**:
> - **Artists**: Use Piskel (https://www.piskelapp.com/) to create sprites per FR-027 tile map.
> - **Artists**: Follow FR-028 design principles (silhouette-first, 2-3 colors, top-down view).
> - **Developers**: Integrate sprites with `/speckit.implement`. Use tile() references from FR-027.
> - **Tool**: Piskel for sprite creation, TinyPNG for compression.

### Section 6.1 - Sprite Sheet System

**FR-026**: Sprite Sheet Technical Specification

**File**: `assets/sprites.png`
- **Dimensions**: 256×256 pixels (EXACT)
- **Tile Size**: 16×16 pixels per sprite
- **Grid**: 16×16 grid = 256 total tiles
- **Format**: PNG-8 with alpha transparency
- **Color Depth**: 256 colors max (8-bit palette)
- **Compression**: pngcrush or TinyPNG (<50KB target)

**Tile Index Reference System**:
```javascript
// HOW tile() WORKS:
tile(tileIndex, gridSize)
//   ^           ^
//   |           └─ Tiles per row (16 for 256×256 sheet with 16×16 tiles)
//   └─ Tile number (0-255)

// CALCULATION:
// Row 0: Tiles 0-15   (y=0)
// Row 1: Tiles 16-31  (y=1)
// Row 2: Tiles 32-47  (y=2)
// Formula: tileIndex = (row * 16) + column
```

**FR-027**: Tile Allocation Map
> 🎨 **Artist Action**: Create sprites at these exact tile positions in Piskel. Use this map as your sprite sheet layout guide.
> 💻 **Developer Action**: Reference these tile numbers when coding (e.g., `tile(2, 16)` for Penny).

**Row 0 (Tiles 0-15): Player + Level 1 Collectibles**
- Tile 0: Player Ball (golden sphere with $ symbol)
- Tile 1: Eraser (pink rectangle)
- Tile 2: Penny (copper circle)
- Tile 3: Gum (pink blob)
- Tile 4: Crayon (diagonal stick, varied colors)
- Tile 5: Homework (paper sheet with "F" grade)
- Tile 6: Lunchbox (colorful box with handle)
- Tile 7: Backpack (bag with straps)
- Tile 8: Basketball (orange with black lines)
- Tile 9: Desk (brown furniture, top-down)
- Tile 10: Teacher (stick figure person)
- Tile 11: Bookshelf (tall rectangle with books)
- Tile 12: Swing Set (playground equipment)
- Tiles 13-15: Reserved

**Row 1 (Tiles 16-31): Level 2 Collectibles**
- Tile 16: Coffee Cup (Starbucks-style)
- Tile 17: Laptop (MacBook-style)
- Tile 18: Office Chair (wheeled)
- Tile 19: Bicycle (two wheels visible)
- Tile 20: E-Scooter (Bird/Lime style)
- Tile 21: Businessman (person in suit)
- Tile 22: Sofa (furniture)
- Tile 23: Car (sedan, wheels visible)
- Tile 24: Food Truck (box truck)
- Tile 25: House (small building)
- Tiles 26-31: Reserved

**Row 2 (Tiles 32-47): Level 3 Collectibles**
- Tile 32: Yacht (luxury boat)
- Tile 33: Limousine (stretch car)
- Tile 34: Mansion (large house)
- Tile 35: Helicopter (aircraft from above)
- Tile 36: Private Jet (plane from above)
- Tile 37: Office Building (mid-rise)
- Tile 38: Skyscraper (massive tower)
- Tile 39: Space Rocket (vertical rocket with SpaceX branding)
- Tiles 40-47: Reserved

**Row 3 (Tiles 48-63): UI & Particles**
- Tile 48: Particle - Sparkle (star shape)
- Tile 49: Particle - Coin (gold circle)
- Tile 50: Particle - Heart (satisfaction)
- Tiles 51-63: Reserved for future UI

**Rows 4-15 (Tiles 64-255): RESERVED**
- Environmental tiles (grass, pavement, water)
- Additional collectibles (future levels)
- Animation frames (if needed)
- **180 tiles available for expansion**

### Section 6.2 - Visual Style Requirements

**FR-028**: Sprite Design Principles (From Research)

**Mandatory Design Rules**:
1. **Silhouette First**: Object MUST be recognizable from outline alone at 16×16px
2. **2-3 Colors Maximum**: Base sprite uses limited palette, variation via code tinting
3. **Top-Down 3/4 Perspective**: Consistent viewing angle (like Zelda/Pokemon)
4. **Icon Style**: Think emoji/icon, not photorealistic detail
5. **High Contrast**: Bold color differences for tiny sprites (black outlines acceptable)

**Pixel Art Techniques** (From PixelJoint research):
- ✅ Manual anti-aliasing (smooth curves with intermediate colors)
- ✅ Directional lighting (top-left light source convention)
- ✅ Hue-shifting in shadows (cooler/bluer shadows, warmer/yellower highlights)
- ❌ NO pillow shading (don't just lighten center, darken edges)
- ❌ NO banding (avoid parallel lines of shading)
- ❌ NO automatic blur/smudge tools

**FR-029**: Placeholder Strategy (Playable > Pretty)

**Option A: Code-Based Shapes** (P1 - Ship-able):
```javascript
// Acceptable for jam if time-constrained:
class Collectible extends EngineObject {
    render() {
        drawRect(this.pos, this.size, this.color);  // Simple colored rectangles
    }
}

// Current game already uses this - IT'S OK FOR P1!
```

**Option B: Simple Pixel Art** (P2 - Better Feel):
- Use FREE tool: Piskel (https://www.piskelapp.com/) - browser-based
- Create 256×256 canvas with 16×16 grid
- Draw minimalist icons (circles, stick figures, simple shapes)
- Export as PNG to assets/sprites.png
- **Time estimate**: 6-8 hours for 30-40 sprites

**Option C: Polished Sprites** (P3 - Ideal):
- Professional pixel art with shading, detail, personality
- **Time estimate**: 15-20 hours
- **Only if P1+P2 complete early**

**Decision Rule**: Ship with Option A if needed. Upgrade to B/C only if timeline permits.

### Section 6.3 - Visual Feedback ("Juice") Specification

**FR-030**: Screen Shake System
```javascript
// SPECIFICATION:
// LittleJS has built-in cameraShake global variable

// On collection:
cameraShake = 0.05 + (objectValue * 0.0001);
// $1 penny:   0.05 shake (subtle)
// $300 teacher: 0.08 shake (noticeable)
// $5M yacht:   0.55 shake (dramatic)
// $2B rocket:  2.05 shake (screen goes crazy!)

// On tier-up:
cameraShake = 0.3;  // Fixed medium shake

// On level complete:
cameraShake = 0.5;  // Fixed large shake
```

**FR-031**: Particle System Specification
```javascript
// SPECIFICATION:
// Collection particles (spawns on every collection):
new ParticleEmitter(
    collectible.pos,    // Position
    0,                  // Angle (0 = up)
    1,                  // Emit size
    0.1,                // Emit time (0.1 seconds)
    20,                 // Particle count (scales with value: small=10, big=50)
    PI,                 // Cone angle (PI = 180° spread)
    tile(48, 16),       // Particle sprite (sparkle)
    rgb(1, 1, 0),       // Color start (yellow)
    rgb(1, 0.5, 0),     // Color end (orange)
    rgb(1, 1, 0, 0),    // Additive start (transparent yellow)
    rgb(1, 0, 0, 0),    // Additive end (transparent red)
    0.5,                // Particle time (0.5 seconds lifespan)
    1,                  // Size start
    0.1,                // Size end
    0.2,                // Speed
    0.1,                // Angle velocity
    0.9,                // Damping
    0,                  // Gravity scale
    PI,                 // Cone angle
    0                   // Fade rate
);
```

**FR-032**: Popup Text System
```javascript
// SPECIFICATION:
// On collection, show floating text:
showPopup(text, pos, duration, color) {
    // Text: "CONSUMED: TEACHER! +$300"
    // Position: Object position, floats upward
    // Duration: 1.5 seconds
    // Color: WHITE or value-based (green for high value)

    // Implementation:
    // 1. Create temporary text object
    // 2. Animate upward (pos.y += 2 units/second)
    // 3. Fade out (alpha: 1.0 → 0.0 over duration)
    // 4. Destroy after duration
}

// Usage:
on_collect: showPopup(`CONSUMED: ${obj.name}! +$${obj.value}`, obj.pos, 1.5, WHITE);
on_tierUp:  showPopup(`${tier.name} UNLOCKED!`, player.pos, 2.0, YELLOW);
```

---

## ARTICLE VII: Sound Design Specifications
> **Audience**: 🎵 Audio Designers, 💻 Developers
> **Agent Context**:
> - **Audio Designers**: Use ZzFX Designer (https://killedbyapixel.github.io/ZzFX) to create sounds.
> - **Audio Designers**: Copy parameters from FR-033 as starting point, tweak in designer tool.
> - **Developers**: Integrate sounds with `/speckit.implement`. Use SoundManager pattern from FR-034.
> - **Tool**: ZzFX Designer for sound creation (browser-based, free).

### Section 7.1 - ZzFX Audio Requirements

**FR-033**: Sound Effect Definitions (5 Required, 10 Optional)
> 🎵 **Audio Designer Action**: Copy these parameters into ZzFX Designer (https://killedbyapixel.github.io/ZzFX), tweak by ear, export refined versions.
> 💻 **Developer Action**: Add refined sounds to SoundManager per FR-034 pattern. Call `/speckit.implement` to integrate.

**Required Sounds** (P2 Priority):
```javascript
// 1. Collection Sound (pitch-scaled by object value)
const sound_collect = new Sound([,,537,.02,.02,.22,1,1.59,-6.98,4.97]);
// Pitch scaling: basePitch + (objectValue * 0.01)
// Tiny ($1):    High pitch "bling!"
// Medium ($100): Mid pitch "cha-ching!"
// Large ($1000): Low pitch "BOOM!"

// 2. Tier-Up Sound (size threshold crossed)
const sound_tierUp = new Sound([,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]);
// Rising fanfare, celebratory

// 3. Victory Sound (level complete)
const sound_victory = new Sound([1.5,,262,,.2,.4,1,1.8,,,,,,,,.5,.1]);
// Ascending arpeggio (3 notes: do-mi-sol)

// 4. Defeat Sound (time up)
const sound_defeat = new Sound([1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]);
// Descending sad trombone (comedic)

// 5. Timer Warning (last 10 seconds)
const sound_timerWarning = new Sound([,,400,.01,,.05,,1.5,,,,,,,,.1]);
// Beep beep beep (urgent, repeating every second)
```

**Optional Sounds** (P3 Polish):
- Magnetic pull hum (continuous when object in range)
- Bounce sound (when too small to collect)
- Menu navigation click
- Achievement unlock fanfare
- Combo multiplier notification

**FR-034**: Sound Manager Pattern
```javascript
// SPECIFICATION:
class SoundManager {
    constructor() {
        // Pre-cache all sounds on game init
        this.sounds = {
            collect: new Sound([,,537,.02,.02,.22,1,1.59,-6.98,4.97]),
            tierUp: new Sound([,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]),
            victory: new Sound([1.5,,262,,.2,.4,1,1.8,,,,,,,,.5,.1]),
            defeat: new Sound([1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]),
            timerWarning: new Sound([,,400,.01,,.05,,1.5,,,,,,,,.1])
        };
    }

    playCollect(pos, objectValue) {
        // Pitch scales with value
        const pitchScale = 1 + (objectValue * 0.001);
        this.sounds.collect.play(pos, 1, pitchScale);
    }

    playTierUp(pos) {
        this.sounds.tierUp.play(pos, 1.2, 1);  // Louder than collect
    }

    playVictory() {
        this.sounds.victory.play(vec2(0, 0), 1.5, 1);  // Center, very loud
    }

    playDefeat() {
        this.sounds.defeat.play(vec2(0, 0), 1, 1);
    }

    playTimerWarning() {
        this.sounds.timerWarning.play(vec2(0, 0), 0.8, 1);  // Quieter (repeating)
    }
}

// Global instance:
let soundManager;

// Usage:
gameInit() {
    soundManager = new SoundManager();
}

// In game code:
soundManager.playCollect(obj.pos, obj.value);
```

### Section 7.2 - Music Specification (Optional)

**FR-035**: Background Music (P4 - Post-Jam)
- **Option A**: ZzFXM (procedural music, <5KB)
- **Option B**: No music (let players play their own)
- **Option C**: Simple ambient loop (city sounds, wind)
- **Decision**: No music for jam (focus on SFX), add post-jam if requested

---

## ARTICLE VIII: Development Workflow (MANDATORY)
> **Audience**: 📊 Project Managers, 💻 Developers, 🎮 Game Designers
> **Agent Context**:
> - **CRITICAL**: Every feature MUST follow 6-step workflow (specify→clarify→plan→tasks→implement→analyze).
> - **Cannot skip steps** - No coding without spec!
> - **PM**: Use this to track milestone gates (Section 8.2, FR-037).
> - **Developer**: Call commands in order: `/speckit.specify` → `/speckit.clarify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement` → `/speckit.analyze`

### Section 8.1 - Spec-Kit Workflow Enforcement

**FR-036**: Every Feature MUST Follow This Process

**1. Specify** (`/speckit.specify [description]`):
- Creates `.specify/specs/[###-feature-name]/spec.md`
- Contains user stories (P1/P2/P3/P4 prioritized)
- Contains acceptance criteria (Given/When/Then format)
- Contains theme validation section
- Contains time estimate (<2 days or reject)

**2. Clarify** (`/speckit.clarify`):
- Agent asks up to 5 targeted questions
- Resolves ambiguities before planning
- Prevents rework and wasted time

**3. Plan** (`/speckit.plan`):
- Creates `.specify/specs/[###-feature-name]/plan.md`
- Contains technical approach (LittleJS-specific)
- Contains Constitution check (validates compliance)
- References research docs (ULTRA-DEEP-RESEARCH PART 15, SOURCE-OF-TRUTH)

**4. Tasks** (`/speckit.tasks`):
- Creates `.specify/specs/[###-feature-name]/tasks.md`
- Breaks plan into atomic tasks (<1 hour each)
- Orders by dependency (critical path)
- Assigns user story grouping (maintains independence)

**5. Implement** (`/speckit.implement`):
- Executes tasks sequentially
- Manual test after each task
- Commits with descriptive message
- Updates task status in tasks.md

**6. Analyze** (`/speckit.analyze`):
- Validates spec/plan/tasks/code alignment
- Identifies contradictions
- Ensures Constitution compliance

**NO EXCEPTIONS**: Cannot skip steps, cannot code without spec.

### Section 8.2 - Timeline & Milestone Gates

**FR-037**: Schedule (Ship Date: November 3, 2025 NON-NEGOTIABLE)

**Week 1: October 14-20 (P1 Features)**
- [ ] Project bootstrap complete (folders, index.html, package.json, minimal game.js)
- [ ] Player movement working (WASD/arrows, momentum physics)
- [ ] Collection system functional (size-gated, magnetic attraction)
- [ ] Growth mechanics (exponential size increase, collectedValue tracking)
- [ ] Basic collision physics (bounce when too small)
- **MILESTONE GATE (Oct 20)**: Playable core loop exists OR pivot to simpler concept

**Week 2: October 21-27 (P2 Features)**
- [ ] 3 levels implemented (50×50, 100×100, 150×150 world sizes)
- [ ] Win condition working (reach goal value before timer expires)
- [ ] Lose condition working (timer expires before goal)
- [ ] Level progression (L1→L2→L3 unlock system)
- [ ] Timer system functional (countdown, display, warning)
- [ ] Collectible spawning per level (progressive difficulty)
- **MILESTONE GATE (Oct 27)**: All 3 levels complete OR reduce to 2 levels

**Week 3: October 28-November 2 (P3 Polish)**
- [ ] Screen shake on collection (value-scaled)
- [ ] ZzFX sound effects (5 required sounds integrated)
- [ ] Particle bursts on collection
- [ ] Visual feedback (popups, growth animation)
- [ ] Consumption logs on victory screen
- [ ] Gen Alpha flavor text (victory screens, level intros)
- **MILESTONE GATE (Nov 1)**: Feature freeze - POLISH ONLY from here

**Final Day: November 3 (Submission)**
- [ ] Build production version (minified, optimized)
- [ ] Test on itch.io upload (embedded iframe)
- [ ] Verify all features work in production build
- [ ] Submit to jam before deadline
- [ ] Share on Discord/social media

**FR-038**: Decision Framework (When Behind Schedule)

**If Feature Takes >2 Days**:
- → CUT feature or simplify to <2 days
- → Document why it was cut (for post-jam roadmap)
- → Move to P4 backlog

**Priority Trade-Offs**:
- Playable > Pretty (mechanics before art)
- Manual testing > Automated testing (time-constrained)
- Code-based shapes > Sprite art (if time is short)
- 3 levels minimum > 5 levels ideal (ship what works)

**Scope Reduction Protocol** (if falling behind):
1. **Day 7 (Oct 20)**: If core loop not playable → Reduce to single level
2. **Day 14 (Oct 27)**: If 3 levels not done → Ship with 2 levels
3. **Day 18 (Nov 1)**: If bugs remain → Fix bugs, cut polish features

### Section 8.3 - Git Workflow Specification

**FR-039**: Branch Naming Convention
```bash
# SPECIFICATION:
# Format: [###-feature-name]
# ### = Zero-padded feature number (001, 002, 003, ...)

# Examples:
001-implement-core-katamari-mechanic
002-implement-level-progression-system
003-add-screen-shake-and-particles
004-create-sprite-sheet-and-integrate

# Rules:
# - All lowercase
# - Hyphens separate words (no underscores)
# - Descriptive but concise (<50 characters)
# - Numbers MUST match .specify/specs/[###-feature-name]/ folder
```

**FR-040**: Commit Message Convention
```bash
# SPECIFICATION:
# Format: <type>: <description>
#
# Types:
# feat:     New feature
# fix:      Bug fix
# docs:     Documentation changes
# style:    Code style (formatting, no logic change)
# refactor: Code refactoring (no behavior change)
# perf:     Performance improvement
# test:     Adding/updating tests
# chore:    Build process, tooling

# Examples:
git commit -m "feat: implement size-based collision detection"
git commit -m "fix: player bounces correctly when too small to collect"
git commit -m "docs: update Constitution with sprite tile map"
git commit -m "perf: optimize collectible spawning to maintain 60 FPS"

# Body (optional but encouraged):
git commit -m "feat: add magnetic attraction to collectibles

- Objects within 2× player radius are pulled toward player
- Only activates when player is 90%+ of size threshold
- Adds satisfying anticipation before collection
- Implements FR-002 from Constitution Article III"
```

---

## ARTICLE IX: Game Design Specifications
> **Audience**: 🎮 Game Designers, 🎨 Artists
> **Agent Context**:
> - **Game Designers**: Reference "It Factor" formula (FR-041) when designing features.
> - **Artists**: Use FR-042 (Named Collectibles) and FR-043 (Gen Alpha Tone) for visual/narrative design.
> - **Implementation**: Call `/speckit.specify` to create engagement features (combos, consumption logs, achievements).

### Section 9.1 - "It Factor" Requirements (From VISION.md Research)

**FR-041**: The Five Pillars of Engagement

**Formula**:
```
Theme (capitalism satire)
+ Mechanics (Katamari growth)
+ Juice (shake/sound/particles)
+ Progression (3 levels + combos)
+ Personality (named objects + Gen Alpha humor)
= IT FACTOR ✨
```

**Implementation Checklist**:
1. **Theme** - Ironic capitalism satire, hustle culture, "SMALL to BIG" entrepreneurship
2. **Mechanics** - Katamari physics, magnetic collection, exponential growth
3. **Juice** - Screen shake, particles, sound on EVERY action
4. **Progression** - 3 levels (rebirth mechanic), combo system, rare objects
5. **Personality** - Named collectibles (PENNY, TEACHER, YACHT), Gen Alpha slang

**FR-042**: Named Collectibles Requirement (Not Abstract Shapes)

**Specification**:
- EVERY collectible MUST have specific name (not generic "object" or "item")
- Names MUST be culturally recognizable (PENNY, TEACHER, HONDA CIVIC, YACHT)
- Names MUST escalate in absurdity (penny → teacher → space rocket)
- Names MUST appear in collection popup text ("CONSUMED: TEACHER! +$300")

**Examples**:
```
BAD (abstract):           GOOD (specific):
"Blue rectangle"    →     "TEACHER"
"Large object"      →     "HONDA CIVIC"
"Expensive item"    →     "YACHT"
"Vehicle"           →     "SPACE ROCKET"
```

**Why This Matters**:
- Creates emotional attachment ("I ate a teacher!" vs "I collected blue rectangle")
- Makes game memorable and shareable
- Supports Gen Alpha humor (absurdist escalation)

**FR-043**: Gen Alpha Tone & Language (Ironic Hustle Culture)

**Specification**:
- Use Gen Alpha slang SPARINGLY (comedic effect, not cringe)
- Tone: Self-aware irony ("This is fine. Capitalism has no brakes.")
- Victory screens: Ironic celebration ("YOU ARE NOW UNGOVERNABLE")

**Approved Slang** (use max 2-3 per screen):
- "Bussin" (good/successful)
- "No cap" (truth/seriously)
- "Sigma grindset" (entrepreneurial hustle)
- "Ratio" (win metric)
- "Caught in 4K" (screenshot moment)
- "It's giving..." (vibes description)

**Victory Screen Example**:
```
LEVEL 1 COMPLETE
UNCOMMON GRINDSET UNLOCKED ✅

Portfolio: $523 (Bussin fr fr)
Biggest W: DESK
You consumed: 27 objects
Ratio: 27:0 💀

Press SPACE for next level
```

**Warning**: Don't overuse slang or it becomes cringe. Subtle references > forcing memes.

---

## ARTICLE X: Psychology & Engagement Specifications
> **Audience**: 🎮 Game Designers
> **Agent Context**:
> - **Understanding phase** - No agent needed, pure design knowledge.
> - Use these principles when creating specs with `/speckit.specify`.
> - Flow state (FR-044): Ensure challenge/skill balance in level design.
> - Compulsion loops (FR-045): Design for constant trigger→action→reward cycles.
> - **Ethical note**: FR-046 sets boundaries on addiction mechanics.

### Section 10.1 - Flow State Requirements (From Research)

**FR-044**: Flow Theory Application (Mihály Csíkszentmihályi)

**6 Factors for Flow State** (game MUST trigger these):

1. **Intense Focus on Present Moment**
   - Implementation: Fast-paced, constant decisions ("which object to collect next?")
   - No interruptions: 60-120 second levels maintain focus

2. **Merging of Action and Awareness**
   - Implementation: Direct control (you ARE the ball), immediate response
   - No menus: Pure physical gameplay

3. **Loss of Self-Consciousness**
   - Implementation: Absorbing gameplay, "forget you're playing"
   - Time distortion: "I played 5 minutes but it was 30!"

4. **Sense of Control**
   - Implementation: Mastery of mechanics, predictable physics
   - Player skill matters: Better movement = better score

5. **Time Distortion**
   - Implementation: 60-second levels feel shorter when in flow
   - Countdown timer creates urgency

6. **Intrinsically Rewarding**
   - Implementation: Fun for its own sake, not just winning
   - Collection is satisfying regardless of outcome

**Flow Channel Specification**:
```
Challenge/Skill Balance:

High Challenge
     │        Anxiety (Level 3)
     │       ╱
     │     ╱ FLOW (Level 2)
     │   ╱  ╱
     │ ╱  ╱
     │╱  ╱ Bored
─────┼─────────── High Skill
   Low

Level 1: Easy (below flow, tutorial)
Level 2: Balanced (IN FLOW, optimal)
Level 3: Hard (above flow, mastery test)
```

**FR-045**: Compulsion Loop Specification (Dopamine System)

**5-Stage Loop** (MUST be present in every gameplay minute):

1. **Trigger**: See opportunity (collectible spawns, appears in view)
2. **Action**: Do thing (move toward object, collect)
3. **Reward**: Get payoff (size increase, score, sound, particles)
4. **Investment**: Progress toward goal (closer to level target)
5. **Trigger**: See new opportunity (next collectible, repeat)

**Dopamine Triggers Implemented**:
- **Novelty**: New object types as you grow (penny → car → yacht)
- **Uncertainty**: Random spawns, rare objects (will I find legendary item?)
- **Anticipation**: Magnetic pull before collection (dopamine releases BEFORE reward!)
- **Achievement**: Tier-up celebrations, combo streaks, milestones

**FR-046**: Addiction Psychology (Ethical Boundaries)

**Variable Ratio Rewards** (Skinner Box - USE RESPONSIBLY):
- Can add "rare" objects (Golden Penny = 10x value, 1% spawn rate)
- Can add "lucky" bonuses (random 2x value, 5% chance)
- **ETHICAL LIMIT**: No monetization, no exploitation, 20-minute game experience maximum
- **Purpose**: Engagement for jam, not whale hunting

**Compulsion Mitigation**:
- Game has ENDING (not infinite)
- No daily login rewards (no FOMO)
- No energy systems (no pay-to-play-more)
- **Pure arcade experience**: Play, enjoy, finish, done.

---

## ARTICLE XI: Data Specifications
> **Audience**: 💻 Developers, 🎮 Game Designers
> **Agent Context**:
> - **Developers**: Copy/paste FR-047 (LEVELS) and FR-048 (COLLECTIBLE_DATA) into src/config.js or src/game.js.
> - **Game Designers**: Modify values in these data structures for balance tuning (no code changes needed).
> - **Implementation**: Call `/speckit.implement` to code data structures.
> - **Tool**: JSON/JavaScript object literals - data-driven design pattern.

### Section 11.1 - Level Configuration Data

**FR-047**: LEVELS Array Structure
> 💻 **Developer Action**: Copy this exact structure into src/config.js or src/game.js. Call `/speckit.implement` to integrate.
> 🎮 **Game Designer Action**: Modify timeLimit, goalValue, spawnWeights for balance tuning (no code changes needed - data-driven).

```javascript
// SPECIFICATION:
const LEVELS = [
    {
        id: 0,
        name: "Broke Era",
        subtitle: "Schoolyard Hustle",
        timeLimit: 60,        // Seconds
        goalValue: 500,       // Dollars
        worldSize: 50,        // Units (50×50 world)
        spawnDensity: 0.8,    // Objects per square unit
        collectibles: [       // Allowed objects this level
            'penny', 'eraser', 'gum', 'crayon', 'homework',
            'lunchbox', 'backpack', 'basketball', 'desk',
            'teacher', 'bookshelf', 'swingset'
        ],
        spawnWeights: {       // Spawn probability distribution
            penny: 0.40,      // 40% of spawns
            gum: 0.25,        // 25%
            crayon: 0.15,     // 15%
            backpack: 0.10,   // 10%
            desk: 0.07,       // 7%
            teacher: 0.02,    // 2% (rare!)
            swingset: 0.01    // 1% (ultra rare!)
        }
    },
    {
        id: 1,
        name: "Influencer Arc",
        subtitle: "Downtown Grind",
        timeLimit: 90,
        goalValue: 15000,
        worldSize: 100,
        spawnDensity: 0.7,    // Slightly sparser (bigger objects)
        collectibles: [
            'coffee', 'laptop', 'chair', 'bicycle', 'scooter',
            'businessman', 'sofa', 'motorcycle', 'car', 'foodtruck', 'house'
        ],
        spawnWeights: {
            coffee: 0.30,
            chair: 0.20,
            bicycle: 0.15,
            sofa: 0.12,
            car: 0.10,
            foodtruck: 0.08,
            house: 0.05
        }
    },
    {
        id: 2,
        name: "Oligarch Endgame",
        subtitle: "Luxury District",
        timeLimit: 120,
        goalValue: 500000,
        worldSize: 150,
        spawnDensity: 0.6,
        collectibles: [
            'yacht', 'limo', 'mansion', 'helicopter', 'jet',
            'office', 'skyscraper', 'rocket', 'island'
        ],
        spawnWeights: {
            yacht: 0.25,
            limo: 0.20,
            mansion: 0.18,
            helicopter: 0.15,
            jet: 0.12,
            office: 0.07,
            skyscraper: 0.02,
            rocket: 0.01       // Ultra rare, $2B value!
        }
    }
];
```

### Section 11.2 - Collectible Data Specification

**FR-048**: COLLECTIBLE_DATA Structure (Complete Definition)
> 💻 **Developer Action**: Copy all 33 object definitions into src/config.js. This is your game content database. Call `/speckit.implement`.
> 🎮 **Game Designer Action**: Tune size, value, threshold for balance. Add new objects by copying pattern.
> 🎨 **Artist Action**: Use 'sprite' values (2, 10, 24, 32, 39) to know which tiles to draw in sprite sheet (cross-reference FR-027).

```javascript
// SPECIFICATION:
const COLLECTIBLE_DATA = {
    // LEVEL 1: Schoolyard Objects
    penny:      { name: "PENNY",       size: 0.3,  value: 1,          threshold: 0,    sprite: 2,  level: 1, rarity: 'common' },
    eraser:     { name: "ERASER",      size: 0.35, value: 5,          threshold: 0,    sprite: 1,  level: 1, rarity: 'common' },
    gum:        { name: "GUM",         size: 0.4,  value: 10,         threshold: 0.2,  sprite: 3,  level: 1, rarity: 'common' },
    crayon:     { name: "CRAYON",      size: 0.45, value: 15,         threshold: 0.3,  sprite: 4,  level: 1, rarity: 'common' },
    homework:   { name: "HOMEWORK",    size: 0.6,  value: 25,         threshold: 0.4,  sprite: 5,  level: 1, rarity: 'uncommon' },
    lunchbox:   { name: "LUNCHBOX",    size: 0.7,  value: 50,         threshold: 0.5,  sprite: 6,  level: 1, rarity: 'uncommon' },
    backpack:   { name: "BACKPACK",    size: 0.8,  value: 75,         threshold: 0.6,  sprite: 7,  level: 1, rarity: 'uncommon' },
    basketball: { name: "BASKETBALL",  size: 1.0,  value: 100,        threshold: 0.8,  sprite: 8,  level: 1, rarity: 'uncommon' },
    desk:       { name: "DESK",        size: 1.5,  value: 200,        threshold: 1.2,  sprite: 9,  level: 1, rarity: 'rare' },
    teacher:    { name: "TEACHER",     size: 2.0,  value: 300,        threshold: 1.6,  sprite: 10, level: 1, rarity: 'rare' },
    bookshelf:  { name: "BOOKSHELF",   size: 2.5,  value: 400,        threshold: 2.0,  sprite: 11, level: 1, rarity: 'rare' },
    swingset:   { name: "SWING SET",   size: 3.0,  value: 500,        threshold: 2.4,  sprite: 12, level: 1, rarity: 'legendary' },

    // LEVEL 2: Downtown Objects
    coffee:     { name: "COFFEE",      size: 3.0,  value: 100,        threshold: 2.4,  sprite: 16, level: 2, rarity: 'common' },
    laptop:     { name: "MACBOOK",     size: 4.0,  value: 1500,       threshold: 3.2,  sprite: 17, level: 2, rarity: 'uncommon' },
    chair:      { name: "OFFICE CHAIR", size: 5.0, value: 300,        threshold: 4.0,  sprite: 18, level: 2, rarity: 'common' },
    bicycle:    { name: "BICYCLE",     size: 6.0,  value: 500,        threshold: 4.8,  sprite: 19, level: 2, rarity: 'uncommon' },
    scooter:    { name: "BIRD SCOOTER", size: 7.0, value: 750,        threshold: 5.6,  sprite: 20, level: 2, rarity: 'uncommon' },
    businessman: { name: "SUIT",       size: 8.0,  value: 2000,       threshold: 6.4,  sprite: 21, level: 2, rarity: 'uncommon' },
    sofa:       { name: "COUCH",       size: 9.0,  value: 1200,       threshold: 7.2,  sprite: 22, level: 2, rarity: 'uncommon' },
    motorcycle: { name: "MOTORCYCLE",  size: 10.0, value: 8000,       threshold: 8.0,  sprite: 23, level: 2, rarity: 'rare' },
    car:        { name: "HONDA CIVIC", size: 12.0, value: 25000,      threshold: 9.6,  sprite: 24, level: 2, rarity: 'rare' },
    foodtruck:  { name: "TACO TRUCK",  size: 14.0, value: 50000,      threshold: 11.2, sprite: 25, level: 2, rarity: 'rare' },
    house:      { name: "STARTER HOME", size: 15.0, value: 200000,    threshold: 12.0, sprite: 26, level: 2, rarity: 'legendary' },

    // LEVEL 3: Luxury Objects
    yacht:      { name: "YACHT",       size: 20.0, value: 5000000,    threshold: 16.0, sprite: 32, level: 3, rarity: 'uncommon' },
    limo:       { name: "STRETCH LIMO", size: 22.0, value: 250000,    threshold: 17.6, sprite: 33, level: 3, rarity: 'uncommon' },
    mansion:    { name: "MCMANSION",   size: 25.0, value: 10000000,   threshold: 20.0, sprite: 34, level: 3, rarity: 'uncommon' },
    helicopter: { name: "HELICOPTER",  size: 28.0, value: 15000000,   threshold: 22.4, sprite: 35, level: 3, rarity: 'rare' },
    jet:        { name: "GULFSTREAM",  size: 32.0, value: 50000000,   threshold: 25.6, sprite: 36, level: 3, rarity: 'rare' },
    office:     { name: "STARTUP HQ",  size: 35.0, value: 100000000,  threshold: 28.0, sprite: 37, level: 3, rarity: 'rare' },
    skyscraper: { name: "SKYSCRAPER",  size: 45.0, value: 500000000,  threshold: 36.0, sprite: 38, level: 3, rarity: 'legendary' },
    rocket:     { name: "SPACE ROCKET", size: 50.0, value: 2000000000, threshold: 40.0, sprite: 39, level: 3, rarity: 'legendary' }
};
```

**FR-049**: Rarity System (Variable Ratio Rewards)
- **Common**: 80% spawn rate, low value ($1-$100)
- **Uncommon**: 15% spawn rate, medium value ($100-$5K)
- **Rare**: 4% spawn rate, high value ($5K-$100K)
- **Legendary**: 1% spawn rate, ultra high value ($100K+)

**Purpose**: Creates "special moment" dopamine spikes when rare object spawns.

### Section 11.3 - Progression Systems

**FR-050**: Combo System (Skill Expression)
```javascript
// SPECIFICATION:
// Track collections within time window:
const COMBO_WINDOW = 2.0;  // 2 seconds to maintain combo

// Combo tiers:
if (collectionsInWindow >= 3) {
    showComboText("COMBO x3 🔥 GRINDSET ACTIVATED");
    valueMultiplier = 1.5;  // +50% value
}
if (collectionsInWindow >= 5) {
    showComboText("COMBO x5 ⚡ UNGOVERNABLE MODE");
    valueMultiplier = 2.0;  // +100% value
}
if (collectionsInWindow >= 10) {
    showComboText("COMBO x10 💎 LEGENDARY CONSUMER");
    valueMultiplier = 3.0;  // +200% value
}

// Reset combo if no collection for COMBO_WINDOW seconds:
if (timeSinceLastCollection > COMBO_WINDOW) {
    comboCount = 0;
    valueMultiplier = 1.0;
}
```

**FR-051**: Consumption Log (Memory/Shareability)
```javascript
// SPECIFICATION:
// Track what player collected during level:
const consumptionLog = {
    penny: 12,      // Collected 12 pennies
    teacher: 8,     // Collected 8 teachers (!!!)
    desk: 1,        // Collected 1 desk
    // ...
};

// On victory screen, display:
"YOU CONSUMED:
🪙 12 Pennies
👨‍🏫 8 TEACHERS (what)
🪑 1 Desk

Most Cursed: Ate 8 people
Total Objects: 21
Grindset Level: UNCOMMON"
```

**FR-052**: Achievement System (P3 - Polish)
```javascript
// SPECIFICATION (if time permits):
const ACHIEVEMENTS = [
    { id: 'first_person',  name: "FIRST PERSON EATEN!",   trigger: 'collect teacher/businessman/CEO' },
    { id: 'combo_master',  name: "COMBO x10 ACHIEVED",    trigger: 'combo >= 10' },
    { id: 'speed_demon',   name: "LEVEL IN UNDER 45 SEC", trigger: 'level complete, time < 45' },
    { id: 'completionist', name: "ALL OBJECTS COLLECTED", trigger: 'collect every type in level' },
    { id: 'billionaire',   name: "NET WORTH: $1B+",       trigger: 'collectedValue >= 1000000000' }
];

// Display as popup when earned:
showAchievement(achievement.name);  // Flash on screen, sound effect, particle burst
```

---

## ARTICLE XII: Implementation Class Specifications
> **Audience**: 💻 Developers
> **Agent Context**:
> - **PRIMARY REFERENCE**: See ULTRA-DEEP-RESEARCH.md PART 15 for complete class code (1000+ lines).
> - Use FR-053 to FR-059 as specification contracts (what each class MUST do).
> - Call `/speckit.implement` to code these classes.
> - **Pattern**: Copy class structure from Constitution → Fill implementation from ULTRA-DEEP-RESEARCH.md.

### Section 12.1 - PlayerBall Class Requirements

**FR-053**: PlayerBall Class Specification
> 💻 **Developer Action**: Create src/player.js (or add to game.js). Copy structure below, fill methods from ULTRA-DEEP-RESEARCH.md PART 15 lines 1889-2040. Call `/speckit.implement` to code and test.

```javascript
// MANDATORY CLASS STRUCTURE:
class PlayerBall extends EngineObject {
    // CONSTRUCTOR REQUIREMENTS:
    constructor(pos) {
        super(pos, vec2(0.5, 0.5), tile(0, 16));  // Start at 0.5×0.5, use tile 0

        // Physics setup (REQUIRED):
        this.setCollision(true, true, false);  // Collide with objects, is solid, no tile collision
        this.mass = 1;              // Base mass (increases with size)
        this.damping = 0.92;        // Rolling friction
        this.elasticity = 0.3;      // Slight bounce
        this.gravityScale = 0;      // No gravity (top-down view)

        // Game properties (REQUIRED):
        this.collectedValue = 0;    // Total $ collected
        this.sizeTier = 0;          // Current tier (0-5)
        this.magnetRange = 2;       // Magnetic pull range
        this.collectedObjects = []; // Array of consumed objects (for consumption log)
        this.comboCount = 0;        // Current combo streak
        this.timeSinceLastCollection = 0;  // For combo timing
    }

    // REQUIRED METHODS:
    update()                    // Movement input, physics, combo tracking
    collideWithObject(object)   // Size-based collection vs bounce
    collect(collectible)        // Absorption, growth, effects
    onTierUp()                  // Celebration when crossing size threshold
    celebrateCollection(obj)    // Particles, sound, popup text
}
```

**FR-054**: PlayerBall Physics Behavior
- **Movement**: Responds to WASD/Arrow keys via `keyDirection()`
- **Speed**: Inversely proportional to size (bigger = slower)
- **Turning**: Inversely proportional to size (bigger = harder to turn)
- **Mass**: Increases with size (more momentum when large)
- **Damping**: Constant 0.92 (feels like rolling ball)

### Section 12.2 - Collectible Class Requirements

**FR-055**: Collectible Class Specification
```javascript
// MANDATORY CLASS STRUCTURE:
class Collectible extends EngineObject {
    constructor(pos, type) {
        const data = COLLECTIBLE_DATA[type];
        super(pos, vec2(data.size, data.size), tile(data.sprite, 16));

        // Physics setup:
        this.setCollision(true, true, false);
        this.mass = data.size * 0.5;  // Mass proportional to size

        // Game properties:
        this.type = type;
        this.name = data.name;
        this.value = data.value;
        this.sizeThreshold = data.threshold;
        this.collected = false;       // Track if already absorbed
        this.magnetActive = false;    // Track if in magnetic range

        // Rendering:
        this.renderOrder = -this.pos.y;  // Render by Y position (pseudo-depth)
    }

    // REQUIRED METHODS:
    update()           // Magnetic attraction, idle animation
    onCollected()      // Called when absorbed by player
}
```

**FR-056**: Magnetic Attraction Behavior
```javascript
// SPECIFICATION:
// In Collectible.update():
if (!this.collected && player) {
    const distToPlayer = this.pos.distance(player.pos);
    const isAlmostBigEnough = player.size.x >= this.sizeThreshold * 0.9;
    const inMagnetRange = distToPlayer < player.magnetRange;

    if (isAlmostBigEnough && inMagnetRange && distToPlayer > 0.1) {
        // Activate magnetic pull
        this.magnetActive = true;
        const pullDirection = player.pos.subtract(this.pos).normalize();
        const pullForce = pullDirection.scale(0.05);
        this.velocity = this.velocity.add(pullForce);

        // Visual feedback: Glow/shimmer
        this.color = this.baseColor.lerp(WHITE, 0.3);
    } else {
        this.magnetActive = false;
        this.color = this.baseColor;
    }
}
```

### Section 12.3 - LevelManager Class Requirements

**FR-057**: LevelManager Class Specification
```javascript
// MANDATORY CLASS STRUCTURE:
class LevelManager {
    constructor() {
        this.currentLevel = null;
        this.currentLevelIndex = 0;
        this.gameState = 'menu';  // 'menu' | 'playing' | 'won' | 'lost'
        this.timeRemaining = 0;
        this.collectibles = [];
    }

    // REQUIRED METHODS:
    startLevel(levelIndex)        // Initialize level, spawn player, spawn collectibles
    update()                      // Update timer, check win/lose, update game state
    spawnCollectibles(level)      // Create collectibles based on LEVELS config
    checkVictory()                // Check if goal reached
    checkDefeat()                 // Check if time expired
    onVictory()                   // Trigger victory sequence
    onDefeat()                    // Trigger defeat sequence
    getTimeString()               // Format time as "M:SS"
    cleanup()                     // Destroy all objects when changing levels
}
```

**FR-058**: Spawning Algorithm
```javascript
// SPECIFICATION:
spawnCollectibles(level) {
    const cellSize = 5;  // Grid cell size for spacing
    let spawned = 0;
    const maxObjects = 200;

    for (let x = -level.worldSize/2; x < level.worldSize/2; x += cellSize) {
        for (let y = -level.worldSize/2; y < level.worldSize/2; y += cellSize) {
            if (spawned >= maxObjects) break;

            // Random spawn based on density:
            if (rand() < level.spawnDensity) {
                // Pick random collectible type based on weights:
                const type = weightedRandom(level.spawnWeights);
                const spawnPos = vec2(x + rand(-2, 2), y + rand(-2, 2));  // Add jitter
                new Collectible(spawnPos, type);
                spawned++;
            }
        }
    }
}

// Helper function:
function weightedRandom(weights) {
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = rand() * totalWeight;

    for (const [type, weight] of Object.entries(weights)) {
        random -= weight;
        if (random <= 0) return type;
    }
}
```

### Section 12.4 - SoundManager Class Requirements

**FR-059**: SoundManager Class Specification
```javascript
// MANDATORY CLASS STRUCTURE:
class SoundManager {
    constructor() {
        // Pre-cache all sounds on init:
        this.sounds = {
            collect: new Sound([,,537,.02,.02,.22,1,1.59,-6.98,4.97]),
            tierUp: new Sound([,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]),
            victory: new Sound([1.5,,262,,.2,.4,1,1.8,,,,,,,,.5,.1]),
            defeat: new Sound([1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]),
            timerWarning: new Sound([,,400,.01,,.05,,1.5,,,,,,,,.1])
        };
    }

    // REQUIRED METHODS:
    playCollect(pos, value)   // Pitch-scaled by value
    playTierUp(pos)           // Tier-up celebration
    playVictory()             // Level complete fanfare
    playDefeat()              // Time up sad trombone
    playTimerWarning()        // Last 10 seconds beep
}
```

---

## ARTICLE XIII: Governance & Process
> **Audience**: 📊 Project Managers, All Team Members
> **Agent Context**:
> - **PM**: Enforce Constitution authority - all decisions reference this document.
> - **All**: No agent call needed - this defines the rules everyone must follow.
> - **Amendments**: Document rationale, update version, sync templates (Section 13.2).

### Section 13.1 - Constitution Authority

**Constitutional Supremacy**:
- This Constitution defines Tiny Tycoon's **immutable identity and constraints**
- All features, code, and decisions MUST comply with Core Principles (Articles I-V)
- Spec-Kit workflow (Article VIII) is MANDATORY (no "quick fixes" without specs)
- Timeline gates (Article VIII, Section 8.2) are ENFORCED (ship date: Nov 3, NON-NEGOTIABLE)
- This document SUPERSEDES conflicting information in other docs

**Hierarchy of Authority**:
1. **Constitution** (this document) - Highest authority
2. **SOURCE-OF-TRUTH.md** (docs/) - Implementation reference
3. **ULTRA-DEEP-RESEARCH.md** (docs/) - Design research
4. **VISION.md** (project root) - Latest research findings
5. **Feature specs** (.specify/specs/) - Individual feature details

### Section 13.2 - Amendment Process

**Constitutional Amendments**:
- Changes to Core Principles (Articles I-V) require **written rationale**
- CANNOT violate: Theme-First, Katamari Mechanics, or Ship Date
- Must update VERSION number (semantic versioning)
- Must update CHANGELOG section
- Must update all dependent templates to maintain consistency

**Template Synchronization** (REQUIRED after amendment):
- `.specify/templates/spec-template.md` - Update if user story format changes
- `.specify/templates/plan-template.md` - Update if Constitution check changes
- `.specify/templates/tasks-template.md` - Update if priority system changes

**Amendment Format**:
```markdown
**Version**: 1.1.0 (MAJOR.MINOR.PATCH)
**Amended**: [Date]
**Rationale**: [Why this change is necessary]
**Impact**: [What changes in workflow/code]
**Validation**: [How we verify this doesn't break existing features]
```

### Section 13.3 - Complexity Justification Protocol

**When Adding Complexity** (new systems, abstractions, dependencies):

Must document:
1. **Why necessary**: How does this help win the jam?
2. **Theme alignment**: How does this serve "SMALL" theme?
3. **Timeline impact**: Can we still ship by Nov 3?
4. **Alternatives considered**: What simpler options were rejected and why?
5. **Rollback plan**: If this fails, how do we remove it quickly?

**Example**:
```markdown
**Proposed**: Add Box2D physics plugin for realistic collisions

**Justification**:
1. Why: Could win "Best Physics" prize ($100 charity donation)
2. Theme: Better weight simulation emphasizes SMALL→BIG growth
3. Timeline: +1 day integration, ships Oct 25 (within Week 2 gate)
4. Alternatives: LittleJS built-in physics (simpler but less realistic)
5. Rollback: Keep LittleJS physics as fallback, Box2D is additive

**Decision**: [APPROVED/REJECTED with rationale]
```

---

## ARTICLE XIV: Research & Knowledge Base
> **Audience**: All Team Members
> **Agent Context**:
> - **Navigation guide** - Points you to right document for your role.
> - **No agent call** - This is reference material only.
> - Use FR-060 hierarchy to find implementation details:
>   - 🎮 Game Design → ULTRA-DEEP-RESEARCH.md PARTS 1-14
>   - 💻 Code Examples → ULTRA-DEEP-RESEARCH.md PART 15
>   - 🎨 Sprite Creation → VISION.md sprite design sections
>   - 🎵 Audio → VISION.md audio & juice systems
>   - 📊 Workflow → SOURCE-OF-TRUTH.md development workflow

### Section 14.1 - Reference Documentation

**FR-060**: Research Documentation Hierarchy

**Primary References** (READ THESE):
1. **Constitution** (.specify/memory/constitution.md) - THIS DOCUMENT
   - Core principles, specifications, governance
   - ~1,200 lines, comprehensive authority

2. **SOURCE-OF-TRUTH.md** (docs/) - Unified Implementation Guide
   - Synthesizes all research (10,000+ lines analyzed)
   - Implementation patterns, code examples
   - Quick reference for developers
   - ~1,000 lines, production-ready

3. **ULTRA-DEEP-RESEARCH.md** (docs/) - Complete Game Design
   - 6,876 lines across 28 parts
   - PART 15: Complete class implementations
   - PART 26-28: Setup, build, deployment guides
   - Deep research into Katamari, Gen Alpha, psychology

4. **VISION.md** (project root) - Latest Research Session
   - 2,054 lines, October 17, 2025
   - "It Factor" research, sprite design, audio systems
   - Gen Alpha games analysis, addiction psychology
   - Competitor analysis

**Secondary References** (if needed):
5. **RESEARCH-TO-SPEC-PLAN.md** (docs/) - Workflow Guide
   - Gap analysis, production checklist
   - 774 lines

**Navigation Guide**:
- **New developer?** Read: Constitution → SOURCE-OF-TRUTH → Start coding
- **Game designer?** Read: ULTRA-DEEP-RESEARCH PARTS 1-14
- **Need code?** Jump to: ULTRA-DEEP-RESEARCH PART 15
- **Need setup help?** See: ULTRA-DEEP-RESEARCH PART 26

### Section 14.2 - Key Insights & Patterns

**From All Research** (10,000+ lines synthesized):

**The "It Factor" Formula**:
```
Theme (capitalism satire)
+ Mechanics (Katamari growth)
+ Juice (shake/sound/particles)
+ Progression (3 levels + combos)
+ Personality (named objects + Gen Alpha humor)
= IT FACTOR ✨
```

**Critical Success Factors** (LittleJS Jam Winners):
1. **Game Feel/Juice**: Screen shake, particles, sound on EVERY action
2. **Theme Execution**: "SMALL" evident in first 30 seconds
3. **Polish**: No bugs, 60 FPS, smooth experience
4. **Replayability**: Combo system, score attack, speedrun potential
5. **Visual Identity**: Distinct art style (even if simple)

**Katamari Damacy Lessons**:
- Novelty + Ease of Understanding + Enjoyment + Humor = Cult Classic
- One mechanic, infinite depth
- No tutorial needed (learn by playing)
- Absurd escalation IS the narrative

**Gen Alpha Psychology**:
- 90% mobile-first (but desktop OK for jam)
- Entrepreneurial aspirations (tycoon theme resonates)
- Shareable moments > long campaigns
- Ironic humor > sincere narratives
- "Sigma grindset" meme culture = our tone

**Incremental Game Psychology**:
- Exponential growth feels good (numbers go up = dopamine)
- Variable ratio rewards = most addictive (rare objects spawn)
- Prestige/rebirth mechanics = "one more run" compulsion
- Meta-progression = long-term engagement

---

## ARTICLE XV: Priority System & Roadmap
> **Audience**: 📊 Project Managers, 🎮 Game Designers, 💻 Developers
> **Agent Context**:
> - **PM**: Use Section 15.2 to track current status vs remaining work.
> - **Game Designer**: Use P1/P2/P3/P4 to prioritize features when calling `/speckit.specify`.
> - **Developer**: Focus on P1 features first (Week 1), then P2 (Week 2), then P3 (Week 3).
> - **All**: If behind schedule, reference Section 15.2 for scope reduction protocol.

### Section 15.1 - Feature Priority Definitions

**P1 (CRITICAL - Week 1: Oct 14-20)**:
- MUST ship for game to exist
- Core gameplay loop
- Theme demonstration
- Playable proof-of-concept

**P1 Features**:
- FR-001 to FR-009: Player movement, collection, growth, physics
- FR-010: Level 1 implementation (can ship with 1 level if needed)
- FR-012/FR-013: Win/lose conditions
- FR-053: PlayerBall class
- FR-055: Collectible class

**P2 (IMPORTANT - Week 2: Oct 21-27)**:
- Needed to win jam
- Full game experience
- Level progression
- Complete core content

**P2 Features**:
- FR-010: Levels 2 and 3 implementation
- FR-011: Level progression system
- FR-014: Timer system
- FR-016/FR-017: Spawning system
- FR-057: LevelManager class
- FR-015/FR-048: Complete COLLECTIBLE_DATA for all levels

**P3 (POLISH - Week 3: Oct 28-Nov 2)**:
- Differentiates good from great
- "Juice" and feel
- Memorable moments
- Shareability

**P3 Features**:
- FR-030: Screen shake system
- FR-031: Particle effects
- FR-032: Popup text
- FR-033/FR-034: ZzFX sound effects and SoundManager
- FR-042: Named collectibles (replace rectangles with sprites)
- FR-043: Gen Alpha tone and language
- FR-050: Combo system
- FR-051: Consumption log

**P4 (POST-JAM - After Nov 3)**:
- Future roadmap
- Mobile support
- Social features
- Monetization (ethical)

**P4 Features**:
- FR-008: Mobile touch controls
- FR-023: Mobile browser support
- FR-052: Achievement system
- Leaderboards, multiplayer, additional levels

### Section 15.2 - Current Feature Status

**✅ IMPLEMENTED (Feature 001 + 002)**:
- Player movement with momentum
- Size-based collection (can only eat smaller objects)
- Exponential growth formula
- Magnetic attraction
- 3 levels with timer
- Win/lose conditions
- Level progression
- Spawning system with progressive distribution

**❌ MISSING (Critical Gaps from VISION.md)**:
1. Visual Identity: Rectangles → Named Sprites (FR-042)
2. Feedback Loops: Silent → Shake + Sound + Particles (FR-030, FR-031, FR-033)
3. Personality: Generic → Gen Alpha humor (FR-043)
4. Progression: Flat → Combo system (FR-050)
5. Shareability: Forgettable → Consumption logs (FR-051)

**Current Priority**: Implement missing P3 features to achieve "It Factor"

---

## ARTICLE XVI: Changelog & Version History

### Version 2.0.0 (October 17, 2025)

**MAJOR UPDATE**: Constitution rebuilt with comprehensive specifications from SOURCE-OF-TRUTH.md

**Added Specifications**:
- FR-001 to FR-060: 60 functional requirements extracted from research
- Complete COLLECTIBLE_DATA specification (33 objects, 3 levels)
- Complete LEVELS array specification (timing, goals, spawn rates)
- Complete class specifications (PlayerBall, Collectible, LevelManager, SoundManager)
- Sprite sheet tile allocation map (256 tiles, 0-255 indexed)
- ZzFX sound definitions (5 required sounds with exact parameters)
- Visual feedback specifications (screen shake, particles, popups)
- Flow state requirements (6 factors for engagement)
- Combo system specification (multipliers, timing windows)
- Git workflow (branch naming, commit messages)

**Removed (Outdated)**:
- ❌ Vague "implement Katamari mechanics" (replaced with FR-001 to FR-009 specifics)
- ❌ Generic "add sound effects" (replaced with FR-033 exact ZzFX params)
- ❌ Abstract "create sprites" (replaced with FR-027 tile map)
- ❌ Unclear "research references" (replaced with FR-060 hierarchy)

**Updated**:
- Article III: Now includes exact milestone dates and gate criteria
- Article IV: Added complete 3-level specification with object lists
- Article V: Expanded with 60 functional requirements
- Article XIV: Reorganized with clear documentation hierarchy

**Impact**:
- Constitution is now **production-ready specification document**
- Every feature has **concrete, testable requirements**
- Spec-Kit workflow can generate precise specs from Constitution
- No ambiguity: Developers know EXACTLY what to build

**Validation**:
- ✅ All SOURCE-OF-TRUTH.md specifications extracted
- ✅ All VISION.md research insights integrated
- ✅ All ULTRA-DEEP-RESEARCH.md patterns referenced
- ✅ Spec-Kit methodology fully aligned
- ✅ No conflicting requirements
- ✅ All FRs are testable and measurable

---

### Version 1.0.0 (October 14, 2025)

**Initial Ratification**:
- 5 Core Principles established
- Basic technical constraints
- Spec-Kit workflow integration
- Timeline and milestone gates

---

## Appendices

### Appendix A: Glossary

**Katamari Damacy**: PS2 game (2004) where you roll adhesive ball collecting objects to grow exponentially. Cult classic, one of greatest games ever made.

**Spec-Kit**: Constitution-driven development workflow (specify→clarify→plan→tasks→implement→analyze). GitHub repository with methodology documentation.

**LittleJS**: Tiny JavaScript game engine (15KB core) by Frank Force. Perfect for game jams, includes physics, particles, sound (ZzFX), sprite rendering.

**ZzFX**: Procedural audio synthesizer (0.6KB). Generate sounds from 20-parameter arrays, no audio files needed.

**EngineObject**: LittleJS base class for all game entities. Includes physics (mass, velocity, collision), rendering, parent/child hierarchy.

**tile()**: LittleJS function to reference sprites in tile sheet. Format: tile(index, gridSize). Index 0-255 for 256×256 sheet with 16×16 tiles.

**vec2()**: LittleJS 2D vector class. Used for positions, sizes, velocities. Example: vec2(10, 5) = x:10, y:5.

**P1/P2/P3/P4**: Priority levels. P1 = critical (Week 1), P2 = important (Week 2), P3 = polish (Week 3), P4 = post-jam.

**Gen Alpha**: Generation born 2010-2025. Largest generation (2B people), 90% mobile-first, entrepreneurial aspirations, "brain rot" humor culture.

**FR-###**: Functional Requirement number. Example: FR-001 = Size-Based Collection specification.

### Appendix B: Quick Reference

**Spec-Kit Commands**:
```bash
/speckit.specify [description]  # Create specification
/speckit.clarify                # Ask clarifying questions
/speckit.plan                   # Create implementation plan
/speckit.tasks                  # Break into atomic tasks
/speckit.implement              # Execute tasks
/speckit.analyze                # Check consistency
```

**Development Commands**:
```bash
npm run dev                     # Start dev server (localhost:8080)
npm run build                   # Build production version
npm test                        # Run tests (if any)
git checkout -b 001-feature     # Create feature branch
```

**Key Files**:
- `index.html` - Entry point
- `src/game.js` - Main game code
- `assets/sprites.png` - Sprite sheet (256×256)
- `.specify/memory/constitution.md` - This document
- `docs/SOURCE-OF-TRUTH.md` - Implementation guide

**Code Patterns**:
```javascript
// Player creation:
player = new PlayerBall(vec2(0, 0));

// Collectible spawning:
new Collectible(vec2(x, y), 'penny');

// Sound playing:
soundManager.playCollect(pos, value);

// Particle burst:
new ParticleEmitter(pos, 0, 1, 0.5, 50, PI, tile(48,16), YELLOW, ORANGE, ...);

// Screen shake:
cameraShake = 0.3;
```

### Appendix C: Real-World Usage Examples (By Role)

**Example 1: Game Designer wants to add new feature**
```
Scenario: "I want to add a speed boost power-up"

Step 1: Read Article IX (Game Design) to understand engagement patterns
Step 2: Call `/speckit.specify "Add speed boost power-up that player can activate"`
Step 3: Agent generates spec.md with:
        - User stories (P2 priority - enhancement)
        - Theme check (does boost relate to "SMALL"? Maybe "small businesses move faster")
        - References FR-041 (It Factor - adds to Progression pillar)
Step 4: Review spec, call `/speckit.clarify` if questions arise
Step 5: Hand to Developer for implementation
```

**Example 2: Developer implementing physics feature**
```
Scenario: "Spec says 'implement magnetic attraction'"

Step 1: Check .specify/specs/001-core-mechanic/spec.md exists (yes)
Step 2: Read FR-002 in Article III for exact specification:
        - Range: 2× player radius
        - Activation: Player is 90%+ of threshold
        - Force: 0.05 units/frame
Step 3: Call `/speckit.plan`
        - Agent creates plan.md with Constitution Check (validates FR-002)
        - References FR-056 for implementation details
Step 4: Call `/speckit.tasks` → Get TASK-001, TASK-002, etc.
Step 5: Call `/speckit.implement` → Agent writes code per FR-002 spec
Step 6: Test: Player approaches penny, penny is pulled toward player ✅
```

**Example 3: Artist creating sprite sheet**
```
Scenario: "I need to create the sprite sheet"

Step 1: Read Article VI, Section 6.1 (Sprite Sheet System)
Step 2: Open Piskel: https://www.piskelapp.com/
Step 3: Create 256×256 canvas, 16×16 grid
Step 4: Reference FR-027 (Tile Allocation Map):
        Row 0, Tile 0: Draw Player Ball (golden sphere with $ symbol)
        Row 0, Tile 2: Draw Penny (copper circle with shine)
        Row 0, Tile 10: Draw Teacher (stick figure person)
        ... (follow map for all 33 objects)
Step 5: Follow FR-028 design principles:
        - Silhouette-first (recognizable outline)
        - 2-3 colors max
        - Top-down 3/4 view
Step 6: Export as PNG → Save to assets/sprites.png
Step 7: Tell Developer "sprites ready" → Developer calls `/speckit.implement` to integrate
```

**Example 4: Audio Designer creating sounds**
```
Scenario: "Game needs collection sound effects"

Step 1: Read Article VII, Section 7.1 (ZzFX Audio)
Step 2: Copy FR-033 parameters for sound_collect:
        [,,537,.02,.02,.22,1,1.59,-6.98,4.97]
Step 3: Open ZzFX Designer: https://killedbyapixel.github.io/ZzFX
Step 4: Paste parameters, click "Play" to preview
Step 5: Tweak parameters by ear (adjust pitch, duration, etc.)
Step 6: Export refined parameters: [,,600,.03,.03,.25,1,1.5,-7.0,5.0]
Step 7: Give to Developer → Developer adds to SoundManager (FR-034 pattern)
        → Developer calls `/speckit.implement` to integrate
```

**Example 5: PM checking if project is on track**
```
Scenario: "It's October 22, are we on schedule?"

Step 1: Read Article VIII, Section 8.2, FR-037 (Timeline)
Step 2: Check Week 1 gate (Oct 20): Should have P1 features done
Step 3: Read Article XV, Section 15.2 (Current Status)
Step 4: Compare:
        ✅ Player movement (done)
        ✅ Collection system (done)
        ✅ Growth mechanics (done)
        ❌ Visual sprites (missing - P3 feature, OK)
        ❌ Sound effects (missing - P3 feature, OK)
Step 5: Conclusion: ON TRACK (P1 done, P2 in progress, P3 upcoming)
Step 6: Check Week 2 gate (Oct 27): Need all 3 levels by then
        Current: 3 levels implemented ✅
Step 7: Status: AHEAD OF SCHEDULE
```

### Appendix D: Common Pitfalls & Solutions

**Pitfall 1**: Coding without specification
- **Solution**: Always `/speckit.specify` first, no exceptions

**Pitfall 2**: Feature creep ("wouldn't it be cool if...")
- **Solution**: Check against P1/P2/P3/P4 priorities, defer to P4 if not critical

**Pitfall 3**: Over-engineering architecture
- **Solution**: Single-file OK for jam, data-driven patterns over abstractions

**Pitfall 4**: Perfectionism on visuals/audio
- **Solution**: Playable > Pretty (code shapes + no music is acceptable for P1)

**Pitfall 5**: Ignoring milestone gates
- **Solution**: Hard pivot at Day 7, 14, 18 if falling behind. Ship > Perfect.

**Pitfall 6**: Not testing cross-browser
- **Solution**: Test Chrome + Firefox after every major change

**Pitfall 7**: Breaking Constitution compliance
- **Solution**: Every spec includes Constitution Check section, run `/speckit.analyze` regularly

---

**Version**: 2.0.0
**Ratified**: October 14, 2025
**Last Amended**: October 17, 2025
**Ship Date**: November 3, 2025 (T-17 days remaining)
**Theme**: SMALL
**Target**: Win LittleJS Game Jam 2025
**Status**: ✅ Production-Ready with Complete Specifications
**Authority**: SUPREME - Supersedes all other documentation
