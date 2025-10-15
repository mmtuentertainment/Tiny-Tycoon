<!--
=============================================================================
CONSTITUTION SYNC IMPACT REPORT
=============================================================================

Version Change: Initial ratification → 1.0.0
Date: October 14, 2025

SUMMARY:
Initial constitution ratified for Tiny Tycoon project (LittleJS Game Jam 2025).
All core principles, technical constraints, and governance policies established.

PRINCIPLES ESTABLISHED:
1. Theme-First Development (NON-NEGOTIABLE) - "SMALL" theme requirements
2. Katamari Mechanics (CORE IDENTITY) - Physics and gameplay foundations
3. Game Jam Timeline (SHIP BY NOV 3, 2025) - Priority hierarchy and milestones
4. LittleJS Native Development - Engine idioms and architecture
5. Playable > Pretty (PRIORITIZATION) - Quality gates and "done" definition

SECTIONS ADDED:
- Technical Constraints (Performance, Browser Support, Asset Budget)
- Development Workflow (Spec-Driven Development via Spec-Kit)
- Winning Strategy (Judging criteria, competitive advantages)
- Governance (Authority, amendment process, research references)

TEMPLATE CONSISTENCY STATUS:
✅ .specify/templates/plan-template.md - Aligned
   - Constitution Check section present
   - LittleJS-specific technical context included
   - Game jam theme validation integrated

✅ .specify/templates/spec-template.md - Aligned
   - Game Jam Theme Validation section present
   - Priority system (P1, P2, P3, P4) matches constitution hierarchy
   - User story independence matches spec-driven workflow requirements

✅ .specify/templates/tasks-template.md - Aligned
   - Physics testing requirements reference constitution Article II
   - Priority-based task organization matches constitution principles
   - User story-based organization supports independent delivery
   - LittleJS-specific path conventions documented

FOLLOW-UP ACTIONS:
None - All templates are consistent with constitution principles.

NEXT STEPS:
- Ready for /speckit.specify to begin feature specifications
- All spec-driven workflow commands are constitution-aware
- Timeline gates will be enforced per Article III (Game Jam Timeline)

=============================================================================
-->

# Tiny Tycoon Constitution

> Katamari-Style Business Growth Game for LittleJS Game Jam 2025

## Core Principles

### I. Theme-First Development (NON-NEGOTIABLE)

**Theme**: "SMALL" - LittleJS Game Jam 2025 (Oct 3 - Nov 3, 2025)

**Requirements**:

- Every feature MUST embody the "SMALL" theme through gameplay mechanics
- Core mechanic: Start SMALL (tiny entrepreneur) → Grow BIG (business empire)
- Visual scale progression: Must be immediately recognizable to players
- Theme validation: Can players identify "SMALL" theme within first 30 seconds of play?

**Implementation Rules**:

- Player starts at smallest possible scale (0.5×0.5 game units)
- Collectibles range from SMALL to progressively larger
- Growth must be exponential and visually dramatic
- Camera scale dynamically adjusts to emphasize size changes

### II. Katamari Mechanics (CORE IDENTITY)

Inspired by Katamari Damacy - The foundation of Tiny Tycoon

**Core Loop**:

1. Roll around as growing ball/entity
2. Collect objects smaller than yourself
3. Grow larger, unlock bigger collectibles
4. Exponential progression creates "Aha!" moments

**Physics Requirements**:

- Size-based collision: Can only collect objects smaller than player
- Momentum system: Larger size = harder to turn, more satisfying impacts
- Magnetic attraction: Near-size objects pulled toward player
- No traditional tile-based collision (top-down, free movement)

**Must Avoid**:

- Grid-based movement (breaks Katamari feel)
- Traditional platformer mechanics (wrong genre)
- Combat/damage systems (this is about growth, not fighting)

### III. Game Jam Timeline (SHIP BY NOV 3, 2025)

**Ship Date**: November 3, 2025 (**T-20 days from Oct 14, 2025**)

**Priority Hierarchy**:

1. **P1 (Week 1: Oct 14-20)**: Core Katamari mechanic - player movement, collection, growth
2. **P2 (Week 2: Oct 21-27)**: Level system, win/lose conditions, progression
3. **P3 (Week 3: Oct 28-Nov 2)**: Polish, juice, sound effects, particle effects
4. **P4 (Post-jam)**: Mobile support (only after web app fully functional)

**Decision Framework**:

- If feature takes >2 days to implement → CUT or simplify
- Playable > Pretty: Mechanics before art
- Manual testing > Automated testing (time-constrained)
- Code-based shapes acceptable over sprite art (if time is short)

**Milestone Gates**:

- **Oct 20 (Day 7)**: Playable core loop or pivot
- **Oct 27 (Day 14)**: All 3 levels complete or reduce scope
- **Nov 1 (Day 18)**: Feature freeze, polish only
- **Nov 3 (Day 20)**: Submit to itch.io

### IV. LittleJS Native Development

Use the framework's strengths, avoid over-engineering

**Engine Idioms**:

- Extend `EngineObject` for all game entities
- Use `vec2()` for all positions/sizes
- Use `tile()` for sprite sheet references (256×256 sheet, 16×16 tiles)
- Use ZzFX for procedural audio (no audio files)
- Use built-in particle system (no custom implementations)

**Architecture**:

- Single-file acceptable for jam (src/game.js can be 1000+ lines)
- Data-driven design: Configuration objects over hardcoded values
- Global variables acceptable (player, levelManager, sounds)
- Modern JavaScript fine (const/let, arrow functions, classes)

**Must Avoid**:

- External dependencies beyond LittleJS (no npm packages)
- Complex build tooling (simple concatenation/minification only)
- ECS architecture (overkill for 20-day project)
- TypeScript (adds complexity, no benefit for jam)

### V. Playable > Pretty (PRIORITIZATION)

Mechanics first, visuals second

**Priority Order**:

1. Game loop works (player moves, collects, grows)
2. Win/lose conditions function
3. Level progression exists
4. Visual feedback (particles, screen shake)
5. Sound effects (ZzFX only)
6. Sprite art (code-based shapes acceptable if time-constrained)
7. Polish (animations, tweening, juice)

**Definition of "Done"**:

- Feature is playable without bugs
- Feature contributes to theme
- Feature can be demonstrated in <30 seconds
- No placeholder code in main branch (`// TODO` / `// FIXME` not allowed)
- Runs at 60 FPS with 100+ entities

---

## Technical Constraints

### Performance Standards

- **Target**: 60 FPS on mid-range devices (2019+ laptops)
- **Test Device**: Chrome browser on 4GB RAM machine
- **Maximum Entities**: 500 simultaneous objects (LittleJS handles 100k+, we're safe)
- **File Size**: <200KB total game size (itch.io optimized)
- **Sprite Sheet**: Single 256×256 PNG (<50KB compressed)
- **Audio**: ZzFX only (procedural, ~20 bytes per sound)

### Browser Support

**Primary (P1)**:

- Chrome/Firefox/Safari (latest 2 versions, desktop)
- 1920×1080 and 1366×768 resolutions

**Secondary (P4 - Post-Jam)**:

- Mobile browsers (touch controls, responsive layout)
- Tablet support (iPad, Android tablets)
- Only implement AFTER web app is fully functional

### Asset Budget

- **Sprites**: Single 256×256 tileset (16×16 tiles = 256 total sprites)
- **Tile Map**: Documented in `docs/ULTRA-DEEP-RESEARCH.md` PART 28 (tiles 0-255)
- **Audio**: 5-10 ZzFX sound definitions (~20 bytes each)
- **Code**: Target ~1000 lines JavaScript (including comments)

---

## Development Workflow

### Spec-Driven Development (MANDATORY)

**Every feature follows this workflow**:

1. **Specify** (`/speckit.specify`)
   - Write user stories prioritized by importance (P1, P2, P3, P4)
   - Define acceptance criteria (Given/When/Then)
   - Validate theme integration ("SMALL" must be evident)
   - Estimate time (<2 days or reject)

2. **Clarify** (`/speckit.clarify`)
   - Identify underspecified areas (ask up to 5 targeted questions)
   - Resolve ambiguities before coding
   - Document decisions in spec.md

3. **Plan** (`/speckit.plan`)
   - Technical approach (LittleJS-specific)
   - File structure and integration points
   - Reference research docs for implementation details

4. **Task Breakdown** (`/speckit.tasks`)
   - Atomic tasks (<1 hour each)
   - Dependency ordering (critical path)
   - Test verification for each task

5. **Implement** (`/speckit.implement`)
   - Execute tasks sequentially
   - Manual testing after each task
   - Verify theme integration continuously

6. **Analyze** (`/speckit.analyze`)
   - Cross-artifact consistency check
   - Ensure spec/plan/tasks alignment
   - Identify contradictions before they become bugs

### Quality Gates

**Every feature must pass**:

- [ ] Playable without console errors
- [ ] Theme "SMALL" is immediately evident
- [ ] Runs at 60 FPS with 100+ entities on screen
- [ ] Works in Chrome + Firefox (desktop)
- [ ] Can be explained in <30 seconds to a new player
- [ ] Contributes to winning the jam (fun, polished, theme-appropriate)

### Testing Strategy

**Manual testing prioritized (time-constrained jam)**:

- Playtest after every major change
- Test win/lose conditions explicitly
- Verify physics feel correct (Katamari-style momentum)
- Check theme is recognizable
- Cross-browser testing (Chrome + Firefox minimum)

**Automated tests** (only if time permits P3):

- Physics collision edge cases
- Level data validation
- Sound system initialization

---

## Winning Strategy

### Goal: Win LittleJS Game Jam 2025

**Judging Criteria** (typical game jams):

- Theme interpretation (40%)
- Gameplay/Fun (30%)
- Innovation/Creativity (20%)
- Polish/Presentation (10%)

**Our Competitive Advantages**:

1. **Theme**: "SMALL" is PERFECT for Katamari mechanics (start small, grow big)
2. **Innovation**: No existing Katamari-style business games on web
3. **LittleJS Native**: Uses framework's strengths (physics, particles, performance)
4. **Research-Backed**: 6,876 lines of design research (ULTRA-DEEP-RESEARCH.md)
5. **Proven Concept**: Katamari Damacy is one of greatest games ever made

**Differentiation**:

- Unique theme interpretation (business growth metaphor)
- Polished physics feel (momentum, magnetic collection, screen shake)
- Exponential progression (dopamine-driven "Aha!" moments)
- Visual juice (particles, camera effects, growth animations)

**Risk Mitigation**:

- Timeline gates enforce scope control
- Research doc provides complete implementation blueprint
- Spec-driven workflow prevents feature creep
- P1/P2/P3/P4 prioritization ensures shippable product

---

## Governance

### Constitution Authority

- This constitution defines Tiny Tycoon's identity and constraints
- All features must comply with Core Principles
- Spec-Kit workflow is mandatory (no "quick fixes" without specs)
- Timeline gates are enforced (ship date: Nov 3, 2025, non-negotiable)

### Amendment Process

- Constitution changes require documentation of rationale
- Must not violate: Theme-First, Katamari Mechanics, or Ship Date
- Update all dependent templates (spec, plan, tasks) to stay in sync

### Complexity Justification

If a feature adds complexity, must document:

- Why complexity is necessary for winning
- How it serves the "SMALL" theme
- Timeline impact (must still ship by Nov 3)
- Simpler alternatives considered and rejected

### Research References

All implementation details are documented in:

- **`docs/ULTRA-DEEP-RESEARCH.md`** (6,876 lines, PARTS 1-28)
  - PART 1-14: Game design, psychology, market analysis
  - **PART 15: Complete implementation code** (all classes, integration)
  - PART 16-25: Advanced topics (flow, retention, accessibility)
  - PART 26: Project setup guide
  - PART 27: Build system and itch.io deployment
  - PART 28: Sprite sheet system (tiles 0-255)

- **`docs/DAY-1-QUICKSTART.md`** (246 lines)
  - 30-minute bootstrap guide
  - 7 steps from zero to playable

- **`docs/CODE-INTEGRATION-TEST.md`** (432 lines)
  - Code assembly checklist
  - 13 integration test checkpoints

- **`docs/RESEARCH-TO-SPEC-PLAN.md`**
  - Spec-driven workflow guide
  - Research → Specification → Implementation

---

**Version**: 1.0.0
**Ratified**: October 14, 2025
**Last Amended**: October 14, 2025
**Ship Date**: November 3, 2025 (T-20 days)
**Theme**: SMALL
**Target**: Win LittleJS Game Jam 2025
**Status**: Ready for `/speckit.specify`
