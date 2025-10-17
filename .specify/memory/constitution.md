<!--
  ============================================================================
  SYNC IMPACT REPORT
  ============================================================================
  Version Change: Initial template → 1.0.0 (MAJOR - First ratification)

  Modified Principles:
  - NEW: Article I - Library-First Development
  - NEW: Article II - Test-First Development (NON-NEGOTIABLE)
  - NEW: Article III - Physics Innovation Priority
  - NEW: Article IV - Simplicity & Scope Management
  - NEW: Article V - Anti-Abstraction Principle
  - NEW: Article VI - AI-Assisted Development
  - NEW: Article VII - Iterative Refinement
  - NEW: Article VIII - Code Quality Standards

  Added Sections:
  - Game Jam Constraints (Theme, timeline, prize targets)
  - Development Workflow (Spec-Driven Development process)
  - Governance (Amendment procedures, compliance)

  Templates Updated:
  - ✅ spec-template.md: Already aligned with user story priorities + ADDED theme validation section
  - ✅ plan-template.md: Already includes Constitution Check + ADDED LittleJS game-specific context
  - ✅ tasks-template.md: Already organized by user stories + ADDED physics testing guidelines

  Template Enhancements Applied:
  1. tasks-template.md:
     - Added "Physics Testing (LittleJS Games)" section with TDD guidance
     - Added LittleJS path convention to "Path Conventions" section
     - Includes references to physics test requirements from Article II

  2. plan-template.md:
     - Added "LittleJS Game-Specific" section to Technical Context
     - Includes engine version, physics requirements, asset budget fields
     - Added Game Jam theme integration tracking
     - Added physics innovation documentation field
     - Added Option 4: LittleJS Game project structure to source code layout

  3. spec-template.md:
     - Added "Game Jam Theme Validation" section to Success Criteria
     - Includes theme integration checklist (core mechanic, visual, player understanding)
     - Added theme-specific success criteria (TSC-001 through TSC-004)
     - References constitution Theme Requirements article

  Date: 2025-10-13
  ============================================================================
-->

# LittleJS Game Development Constitution

## Core Principles

### Article I: Library-First Development

Every game is a standalone project within the `games/` directory. Each game MUST:

- Be self-contained with its own `.specify/` configuration for specs, plans, and tasks
- Have independent source code (`src/`), assets (`assets/`), and tests (`tests/`)
- Be independently testable and deployable
- Have a clear purpose documented in its README.md

**Rationale**: Isolating games as standalone libraries ensures clean boundaries, prevents cross-contamination of game logic, and allows independent development of multiple game concepts in parallel.

### Article II: Test-First Development (NON-NEGOTIABLE)

All physics mechanics and gameplay systems MUST follow Test-Driven Development (TDD):

- Tests MUST be written before implementation
- Tests MUST fail initially (Red phase)
- Implementation makes tests pass (Green phase)
- Code is then refactored while keeping tests green (Refactor phase)
- Physics behaviors MUST be validated through automated tests
- User approval of test specifications REQUIRED before implementation begins

**Rationale**: Physics accuracy and gameplay reliability are critical for the physics prize and player experience. TDD ensures behaviors are specified, validated, and regression-protected throughout development.

### Article III: Physics Innovation Priority

Target the $100 physics innovation charity prize through:

- Novel physics mechanics as primary game differentiator
- Reusable physics components in `shared/components/physics-helpers.js`
- Weekly physics experiments in `prototypes/` directory
- Documentation of all physics innovations in `docs/physics-experiments.md`
- Educational accuracy where applicable (e.g., micro-scale physics, gravity wells, surface tension)

**Rationale**: The physics prize aligns with the game jam's educational goals and provides additional motivation to create mechanically interesting games beyond the standard prize pool.

### Article IV: Simplicity & Scope Management

Maintain manageable scope through:

- Maximum 3 feature specifications per game initially
- Time-box all prototypes to 4 hours maximum
- Focus on ONE game for game jam (game-jam-2025) with others as practice only
- Start simple, follow YAGNI (You Aren't Gonna Need It) principles
- Avoid feature creep during the 31-day jam timeline

**Rationale**: Game jams reward focused, polished execution over sprawling ambition. Limiting scope ensures completion and quality within the tight timeline.

### Article V: Anti-Abstraction Principle

Use LittleJS APIs directly without unnecessary abstraction layers:

- Call LittleJS engine functions directly in game code
- Avoid creating wrapper classes or abstraction frameworks around LittleJS
- Only extract shared utilities to `shared/components/` when proven reusable across 2+ games
- No "game frameworks" or "engines on top of engines"

**Rationale**: LittleJS is already an ultra-lightweight engine (15KB). Adding abstraction layers defeats its purpose and increases complexity without benefit. Direct API usage keeps code readable and maintainable.

### Article VI: AI-Assisted Development

Leverage Claude Code with Spec Kit workflow for all development:

- All game features follow Spec-Driven Development workflow: `/speckit.constitution` → `/speckit.specify` → `/speckit.clarify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`
- AI generates implementation code from specifications
- Human validates, tests, and refines AI-generated code
- Slash commands available workspace-wide from root `.claude/commands/`
- Constitution gates must pass before proceeding with implementation

**Rationale**: AI-assisted development accelerates implementation while maintaining quality through the disciplined Spec-Driven Development process. The constitution acts as a quality gate to prevent AI from generating over-complex solutions.

### Article VII: Iterative Refinement

Follow prototype-to-production workflow:

- Quick experiments in `prototypes/` directory (< 4 hours each)
- Successful prototypes graduate to full games in `games/`
- Failed prototypes documented for learning in `prototypes/README.md`
- Daily development journal entries in `docs/dev-journal.md`
- Regular commits with descriptive messages

**Rationale**: Rapid prototyping validates gameplay concepts before full investment. Iterative development with continuous documentation prevents rework and captures learnings.

### Article VIII: Code Quality Standards

Maintain consistent quality across all games:

- Modular game object design using LittleJS patterns
- WebGL rendering optimization (minimize draw calls)
- Procedural audio with ZzFX only (no audio assets to reduce bloat)
- Pixel art aesthetic for visual consistency
- Code reuse through `shared/components/` for proven patterns
- ES6 module imports for all shared code

**Rationale**: Consistency in code quality and artistic direction creates a recognizable style across games while ensuring performant execution within LittleJS's lightweight philosophy.

## Game Jam Constraints

### Theme Requirements

**Theme**: "SMALL"

All games MUST embody the "SMALL" theme creatively through:

- Core gameplay mechanics related to smallness
- Visual scale representation (tiny character, macro environments, etc.)
- Physics at small scale (surface tension, electrostatics, micro-gravity)
- Creative interpretation documented in game README.md

**Rationale**: Theme adherence is mandatory for game jam entry. Early theme validation prevents disqualification.

### Timeline & Milestones

**Jam Duration**: October 3 - November 3, 2025 (31 days)

Development phases:

- Week 1: Prototype validation and core mechanic testing
- Week 2-3: Main game implementation (game-jam-2025 project)
- Week 4: Polish, testing, community feedback
- Final days: Bug fixes and submission preparation

**Rationale**: The 31-day timeline requires disciplined milestone planning to ensure completion and polish.

### Prize Targets

**Primary Target**: $100 Physics Innovation Charity Prize

Secondary benefits:

- $100 cash prize eligibility
- Community recognition
- Portfolio piece for game development career

**Rationale**: Focusing on the physics prize differentiates our approach and aligns with the educational goals of game jams.

## Development Workflow

### Spec-Driven Development Process

All game features MUST follow this workflow:

1. **Constitution Review**: `/speckit.constitution` - Define or review game-specific principles (inherits from this root constitution)
2. **Specification**: `/speckit.specify` - Create feature spec with user stories and requirements
3. **Clarification**: `/speckit.clarify` - Resolve ambiguities through targeted questions
4. **Planning**: `/speckit.plan` - Generate technical implementation plan
5. **Task Breakdown**: `/speckit.tasks` - Create dependency-ordered task list
6. **Implementation**: `/speckit.implement` - Execute tasks with TDD discipline

**Checkpoint Gates**:

- Constitution Check (before Phase 0 research, re-check after Phase 1 design)
- Test specifications approved by human before implementation
- User story independence validated (each story deliverable as MVP)
- Physics innovation documented before moving to next feature

**Rationale**: The Spec-Driven Development workflow ensures features are well-specified, independently testable, and aligned with constitution principles before implementation begins.

### Game Project Structure

Each game in `games/` directory MUST contain:

**Required Files/Directories**:

- `.specify/` - Game-specific specs, plans, tasks
- `src/` - Source code (game.js as entry point)
- `assets/` - Sprite sheets, tilesets (sprites.png convention)
- `tests/` - Test files for physics and gameplay
- `index.html` - Game HTML entry point
- `package.json` - Dependencies and scripts
- `README.md` - Game documentation including theme interpretation

**Optional**:

- `dist/` - Build output
- `docs/` - Game-specific documentation

**Shared Resources**:

- Import from `../../shared/components/` for reusable utilities
- Link to `../../LittleJS/dist/littlejs.min.js` for engine
- Reference `../../knowledge-base/` for documentation

**Rationale**: Consistent structure across games enables tooling automation (game-initializer.sh) and makes codebase navigation predictable.

### Documentation Requirements

**Mandatory Documentation**:

- Daily entries in `docs/dev-journal.md` (format: Date, Hours, Goals, Accomplished, Blockers, Tomorrow, Learnings)
- Physics experiments logged in `docs/physics-experiments.md`
- Theme interpretations captured in `docs/theme-brainstorm.md`
- Prototype outcomes in `prototypes/README.md`
- Lessons learned in `docs/lessons-learned.md`

**Rationale**: Continuous documentation prevents knowledge loss, aids debugging, and provides material for post-mortems and portfolio presentations.

### Shared Component Management

**Extraction Criteria**:

- Code used in 2+ games → extract to `shared/components/`
- Physics utilities proven through prototypes → promote to `shared/components/physics-helpers.js`
- Particle effects with reuse potential → add to `shared/components/particle-presets.js`
- UI patterns repeated across games → include in `shared/components/ui-components.js`

**Import Convention**:

```javascript
// From game directory: games/[game-name]/src/game.js
import { GravityWell, applyExplosionForce } from '../../shared/components/physics-helpers.js';
```

**Rationale**: DRY (Don't Repeat Yourself) principle applied at workspace level. Shared components reduce duplication while maintaining game independence through ES6 module imports.

## Governance

### Amendment Procedure

This constitution can be amended through:

1. Identification of principle violation or missing guidance
2. Documentation of proposed amendment with rationale
3. Validation that amendment doesn't contradict existing principles
4. Version increment following semantic versioning:
   - **MAJOR**: Backward-incompatible principle removal/redefinition
   - **MINOR**: New principle/section added
   - **PATCH**: Clarifications, wording fixes, non-semantic refinements
5. Update to constitution file with Sync Impact Report
6. Propagation of changes to dependent templates

**Rationale**: Constitutions must evolve with project learnings, but changes should be deliberate and tracked to maintain consistency.

### Versioning Policy

**Current Version**: 1.0.0
**Ratification Date**: 2025-10-13
**Last Amended**: 2025-10-13

Version history:

- **1.0.0** (2025-10-13): Initial constitution ratification for LittleJS Game Jam 2025

**Rationale**: Semantic versioning provides clear signal about the impact of constitutional changes to all stakeholders.

### Compliance & Enforcement

**Constitution Gates**:

- `/speckit.plan` command MUST include Constitution Check section
- Plan cannot proceed to implementation if gates fail without documented justification
- Complexity violations require entry in "Complexity Tracking" table with justification

**Review Requirements**:

- All feature specs reviewed against constitution principles
- Physics innovations validated against Article III requirements
- Scope creep checked against Article IV limits
- Abstraction layers challenged per Article V

**Violation Handling**:

- Document violation in plan.md Complexity Tracking table
- Justify why violation is necessary
- Explain why simpler alternative was rejected
- Obtain explicit approval before proceeding

**Rationale**: Constitution without enforcement is merely documentation. Gates and review requirements ensure principles guide actual development decisions.

### Runtime Development Guidance

For runtime development guidance and agent-specific instructions, refer to:

- `.claude/commands/speckit.*.md` - Slash command implementations
- `.specify/templates/*.md` - Spec, plan, and task templates
- `knowledge-base/` - LittleJS, Spec Kit, and game jam reference materials

**Rationale**: Separating constitutional principles (WHY and WHAT) from execution guidance (HOW) keeps the constitution focused on governance while allowing implementation details to evolve.

---

**Version**: 1.0.0 | **Ratified**: 2025-10-13 | **Last Amended**: 2025-10-13
