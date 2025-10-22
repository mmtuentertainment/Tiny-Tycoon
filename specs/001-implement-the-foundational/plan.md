# Implementation Plan: Core Katamari Mechanic

**Branch**: `001-implement-the-foundational` | **Date**: 2025-10-14 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/home/matt/Game Development/specs/001-implement-the-foundational/spec.md`

**Note**: This plan follows the Tiny Tycoon constitution principles and targets the Day 7 (Oct 20) playable core loop milestone.

## Summary

Implement the foundational Katamari-style gameplay mechanic where players control a growing ball (starting at 0.5×0.5 units) that collects objects smaller than itself. Core systems include WASD/Arrow movement with momentum physics, size-based collision detection, exponential growth formula, magnetic attraction for near-size items (80-90% player size within 2-3 units), randomized grid collectible spawning (coins 0.3-0.4 units worth 10 points, customers 0.6-0.8 units worth 50 points), smooth camera follow using lerp interpolation, and basic HUD displaying size multiplier and score. The "SMALL" theme must be immediately evident through dramatic visual scale changes, achieving 10x growth within 60 seconds of active collection. Technical approach leverages LittleJS native physics (EngineObject extension, vec2(), built-in collision) with code-based shapes for P1 (sprite artwork deferred to P3 polish per constitution Article V).

## Technical Context

**Language/Version**: JavaScript ES6+ (const/let, arrow functions, classes per constitution Article IV)
**Primary Dependencies**: LittleJS latest from workspace (`../../LittleJS/dist/littlejs.release.js`)
**Storage**: N/A (no persistence for P1, deferred to post-jam)
**Testing**: Manual playtesting after each change (constitution Article V: manual > automated for time-constrained jam)
**Target Platform**: Web browsers desktop (Chrome/Firefox/Safari latest 2 versions per constitution)
**Project Type**: Game (LittleJS single-file jam structure)
**Performance Goals**: 60 FPS with 100+ simultaneous collectibles (constitution performance standard)
**Constraints**: <2 days implementation (constitution Article III), <200KB total size, no external dependencies beyond LittleJS, no TypeScript
**Scale/Scope**: Single level P1, 2 collectible types (coins/customers), 100+ spawned objects

**LittleJS Game-Specific**:

- **Engine Version**: LittleJS latest from workspace repository
- **Physics Requirements**: Momentum-based movement (velocity accumulation + damping), size-based AABB collision with strict smaller-than check, magnetic attraction force inversely proportional to distance for 80-90% size ratio objects within 2-3 unit range
- **Asset Budget**: Code-based shapes P1 (drawRect/drawCircle), 256×256 sprite sheet prepared but unused until P3 polish, ZzFX audio deferred to P3
- **Game Jam Theme**: "SMALL" - Core mechanic embodies theme through exponential size progression from 0.5×0.5 starting size to 10x growth, visually dramatic scale changes evident within first 30 seconds
- **Physics Innovation**: Exponential growth coupled with magnetic attraction creates satisfying progression arc - objects transition from obstacle → magnetic pull → instant collection as player grows
- **Shared Components**: None (self-contained P1 implementation)
- **Performance Target**: 60 FPS mid-range devices, <200KB total game size
- **Browser Support**: Chrome/Firefox/Safari latest 2 versions desktop only (mobile deferred to P4 post-jam)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Article I: Theme-First Development ✅ PASS

- ✅ Feature embodies "SMALL" theme through core mechanic (start 0.5×0.5, grow exponentially)
- ✅ Visual scale progression immediately recognizable (FR-017, SC-003: 10x growth in 60s)
- ✅ Theme validation within 30 seconds (SC-004: 90% playtesters identify theme)
- ✅ Implementation rules: Player starts at smallest scale, exponential growth, dynamic camera

### Article II: Katamari Mechanics ✅ PASS

- ✅ Core loop: Roll → Collect smaller → Grow → Unlock bigger (all P1 user stories)
- ✅ Size-based collision: FR-008 only collect strictly smaller objects
- ✅ Momentum system: FR-004 acceleration, FR-005 damping on release
- ✅ Magnetic attraction: FR-012 near-size objects pulled to player
- ✅ No grid movement, no combat/damage

### Article III: Game Jam Timeline ✅ PASS

- ✅ P1 priority (Week 1: Oct 14-20)
- ✅ <2 day implementation estimate (Oct 14-16 target)
- ✅ Day 7 milestone enabler (this IS the playable core loop)
- ✅ Code-based shapes acceptable P1 (spec assumption)
- ✅ Manual testing only

### Article IV: LittleJS Native ✅ PASS

- ✅ Extend EngineObject (PlayerBall, Collectible)
- ✅ Use vec2() all positions/sizes
- ✅ Single file game.js acceptable (constitution allows 1000+ lines)
- ✅ Data-driven: COLLECTIBLE_DATA config object
- ✅ Global variables: player, collectibles
- ✅ No external dependencies, no TypeScript

### Article V: Playable > Pretty ✅ PASS

- ✅ Priority 1: Game loop (movement/collection/growth) - all P1 user stories
- ✅ Priority 2-3: Win/lose, levels deferred to P2
- ✅ Priority 4-7: Effects, sounds, sprites, polish deferred to P3
- ✅ Definition of Done: Playable (SC-006 16ms response), theme evident (SC-001 30s), 60 FPS (SC-002)

**CONSTITUTION CHECK RESULT: ✅ ALL 5 PRINCIPLES PASS - PROCEED TO PHASE 0**

## Project Structure

### Documentation (this feature)

```
specs/001-implement-the-foundational/
├── spec.md              # ✅ Complete (validated, clarified)
├── plan.md              # This file (Phase 0 pending)
├── research.md          # Phase 0 output (pending)
├── data-model.md        # Phase 1 output (pending)
├── quickstart.md        # Phase 1 output (pending)
└── tasks.md             # Phase 2 (/speckit.tasks - NOT created by /speckit.plan)
```

### Source Code (games/game-jam-2025/)

```
src/
├── game.js              # Main entry: engineInit, gameInit, gameUpdate, gameUpdatePost,
│                        #   gameRender, gameRenderPost callbacks
│                        # PlayerBall class (~100-150 lines)
│                        # Collectible class (~50-80 lines)
│                        # COLLECTIBLE_DATA config (~20 lines)
│                        # Spawn logic (~40 lines)
│                        # Camera follow (~5 lines in gameUpdate)
│                        # HUD rendering (~30 lines in gameRenderPost)
│                        # Total estimate: 300-400 lines for P1
├── objects/             # (Future P2 if game.js exceeds 1000 lines)
└── levels/              # (Future P2 multi-level support)

assets/
└── sprites.png          # 256×256 placeholder (unused P1, ready for P3)

tests/
└── manual-checklist.md  # Playtest procedures

index.html               # Loads LittleJS + src/game.js
build.js                 # Production build (P3 submission)
package.json             # npm run dev script
```

**Structure Decision**: Single-file game (LittleJS Option 4) per constitution Article IV allowing `src/game.js` up to 1000+ lines for jams. P1 feature adds ~300-400 lines to existing skeleton (commit 8083c63 has callbacks defined). Multi-file refactor only if exceeds 1000 lines in P2.

## Phase 0: Research & Technical Decisions

**Status**: Requires execution
**Output**: `research.md`

### Research Tasks

#### R1: Exponential Growth Formula ⚠️ CRITICAL

**Question**: What formula creates satisfying exponential growth from 0.5×0.5 to 10x (5.0×5.0) within 60 seconds?

**Context**:
- FR-011: Size increases "proportionally based on exponential growth formula"
- SC-003: "10x larger within 60 seconds of active collection"
- SC-010: "Later collections grow player faster than early collections"

**Research Approach**:
1. Reference ULTRA-DEEP-RESEARCH.md PART 15 PlayerBall.collect() method
2. Test formula: `newSize = currentSize + (collectibleValue / scalingFactor) * currentSize`
3. Calculate scaling factor: For 60s to reach 10x with mixed coins (10pts) and customers (50pts)
4. Playtest feel: Growth should be noticeable per collection but not instant

**Deliverable**: Concrete formula with scaling factor value, validation that 10x achieved in ~60s

---

#### R2: Magnetic Attraction Force ⚠️ CRITICAL

**Question**: What force formula and strength constant creates satisfying magnetic pull?

**Context**:
- FR-012: "Magnetic attraction, pulling toward player when within range"
- Assumption: 80-90% player size, 2-3 units distance
- Should feel "pull" but not instant teleport

**Research Approach**:
1. Formula proposal: `force = strength / (distance + 0.1) * sizeRatioFactor`
2. Size ratio factor: Linear 0-1 scale where 0.8 player size = 0, 0.95 = 1.0
3. Test strength constants: 0.5, 1.0, 2.0
4. Validate smooth acceleration toward player

**Deliverable**: Force formula with strength constant, distance falloff curve

---

#### R3: Camera Lerp Factor ⚠️ IMPORTANT

**Question**: What lerp factor (0-1) provides smooth camera follow without lag?

**Context**:
- FR-013: "Smoothly follow using interpolation (lerp)"
- SC-007: "No visible stuttering or lag during player movement"
- Common range: 0.05 (very smooth) to 0.2 (responsive)

**Research Approach**:
1. Test factors: 0.08, 0.1, 0.15
2. Validate at 60 FPS with rapid WASD direction changes
3. Check no "rubber band" effect when player stops

**Deliverable**: Single lerp factor value (likely 0.1 for balance)

---

#### R4: Grid Spawn Parameters ⚠️ IMPORTANT

**Question**: Grid dimensions, cell size, randomization range to spawn 100+ collectibles?

**Context**:
- Clarification: Randomized grid spawning
- SC-002: 100+ collectible objects minimum
- Need good coverage without clustering/gaps

**Research Approach**:
1. Assume visible area: 30×30 game units (at cameraScale=32)
2. Propose grid: 12×12 = 144 cells, each 2.5×2.5 units
3. Randomize position ±1.0 units within cell
4. Randomize type: 60% coins (sizeRange 0.3-0.4), 40% customers (0.6-0.8)
5. Randomize size within type range

**Deliverable**: Grid cell count, cell size, randomization parameters, type distribution

---

#### R5: HUD Layout ⚠️ MINOR

**Question**: Exact screen positions for size and score displays?

**Context**:
- FR-014: Size display "readable format" (e.g. "Size: 1.5x")
- FR-015: Score display "readable format" (e.g. "Score: $250")
- Assumption: Size top-left, score top-right

**Research Approach**:
1. Size: `drawTextScreen('Size: ${multiplier}x', vec2(80, mainCanvasSize.y - 40), 32)`
2. Score: `drawTextScreen('$${score}', vec2(mainCanvasSize.x - 150, mainCanvasSize.y - 40), 32)`
3. Validate no obstruction of player ball or collectibles

**Deliverable**: Exact vec2 positions and font sizes

---

### Expected Research Outcomes

**research.md** will contain:
- Growth formula with scaling factor
- Magnetic force formula with constants
- Camera lerp factor value
- Grid spawn algorithm with parameters
- HUD layout specifications

All values ready for direct implementation in Phase 1 data model and code.

---

## Phase 1: Data Model & Design Artifacts

**Status**: Pending (awaits Phase 0 research completion)
**Output**: `data-model.md`, `quickstart.md`

### Data Model Preview

#### PlayerBall Entity (extends EngineObject)

**Attributes**:
- `pos`: vec2 (world position)
- `size`: vec2 (starts vec2(0.5, 0.5))
- `velocity`: vec2 (inherited)
- `mass`: number (starts 1, scales with size)
- `damping`: number (0.9 constant)
- `score`: number (accumulated points)
- `sizeMultiplier`: number (display value, size.x / 0.5)

**Methods**:
- `update()`: WASD input → velocity, super.update()
- `collideWithObject(other)`: Check Collectible, compare sizes
- `collect(collectible)`: Apply growth formula, add score, destroy collectible
- `render()`: drawRect(pos, size, color) for P1

---

#### Collectible Entity (extends EngineObject)

**Attributes**:
- `pos`: vec2
- `size`: vec2 (from COLLECTIBLE_DATA[type].sizeRange random)
- `type`: string ('coin' or 'customer')
- `value`: number (from COLLECTIBLE_DATA[type].value)
- `magnetActive`: boolean

**Methods**:
- `update()`: Calculate distance to player, apply magnetic force if conditions met
- `collideWithObject(other)`: If PlayerBall && player.size > this.size → mark collected
- `render()`: drawRect(pos, size, COLLECTIBLE_DATA[type].color)

---

#### COLLECTIBLE_DATA Configuration

```javascript
const COLLECTIBLE_DATA = {
  coin: {
    sizeRange: [0.3, 0.4],
    value: 10,
    color: rgb(1, 1, 0),      // Yellow
    spawnWeight: 0.6
  },
  customer: {
    sizeRange: [0.6, 0.8],
    value: 50,
    color: rgb(0, 0.5, 1),    // Blue
    spawnWeight: 0.4
  }
};
```

---

### Quickstart Guide Preview

**quickstart.md** will document:
1. Prerequisites: Node.js, LittleJS at workspace root
2. Setup: `cd games/game-jam-2025 && npm run dev`
3. Verification: WASD moves, collectibles spawn, collision works
4. Troubleshooting: CORS, path issues, console errors

---

## Phase 2: Task Breakdown (NOT EXECUTED HERE)

**Note**: `/speckit.plan` stops after Phase 1. Task breakdown created by `/speckit.tasks`.

Next command: `/speckit.tasks` will generate atomic tasks (<1 hour each) organized by user story (US1: Movement, US2: Collection, US3: Growth, US4: HUD).

---

## Implementation Estimate

**Total Time**: 1.5-2 days (within constitution <2 day P1 constraint)

**Breakdown**:
- Phase 0 Research: 2-3 hours (formulas, parameters)
- Phase 1 Data Model: 1 hour (document entities)
- PlayerBall Implementation: 4-5 hours (movement, collision, growth)
- Collectible Implementation: 3-4 hours (spawning, magnetic, collision)
- Camera & HUD: 2 hours (lerp follow, screen text)
- Manual Testing & Tuning: 3-4 hours (playtest, adjust parameters)

**Target Completion**: October 16, 2025 (Day 3) - 4 days before Day 7 milestone buffer

---

## Success Validation

Feature complete when:
- ✅ All 26 acceptance scenarios pass (4 user stories)
- ✅ All 10 success criteria validated
- ✅ All 4 theme success criteria validated
- ✅ Manual playtest confirms "fun" and theme evident in 30s
- ✅ 60 FPS maintained with 100+ objects on screen
- ✅ Works in Chrome + Firefox without errors

---

**Plan Status**: Constitution validated, awaiting Phase 0 research execution
**Next Step**: Execute research tasks R1-R5 → generate research.md
**Then**: Generate data-model.md with concrete specifications
**Finally**: Ready for `/speckit.tasks` command
