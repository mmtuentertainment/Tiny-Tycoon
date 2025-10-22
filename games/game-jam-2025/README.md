# Tiny Tycoon

**Katamari-style business growth game for LittleJS Game Jam 2025**

## Theme: SMALL

Start SMALL (tiny entrepreneur) → Grow BIG (business empire)

Roll around collecting customers, coins, and competitors. The more you collect, the bigger you grow. Absorb your rivals and build your business empire through exponential Katamari-style growth!

**Ship Date**: November 3, 2025 (T-20 days from Oct 14, 2025)

---

## Quick Start

```bash
# Install dependencies (optional, only needed for build tools)
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:8000
```

## Development Workflow

This project uses **Spec-Driven Development** with the Spec-Kit system:

1. `/speckit.constitution` - View Tiny Tycoon principles (Theme-First, Katamari Mechanics, Timeline)
2. `/speckit.specify` - Create feature specifications with user stories
3. `/speckit.clarify` - Identify and resolve underspecified areas
4. `/speckit.plan` - Technical implementation approach
5. `/speckit.tasks` - Break down into atomic tasks (<1 hour each)
6. `/speckit.implement` - Execute tasks with continuous testing
7. `/speckit.analyze` - Verify consistency across artifacts

**See**: [`.specify/memory/constitution.md`](.specify/memory/constitution.md) for complete development principles.

**Important**: This project has its own Tiny Tycoon-specific constitution with 5 core principles. See [CONSTITUTION-LOCATION.md](CONSTITUTION-LOCATION.md) for clarification on workspace vs project constitutions.

---

## Documentation

### Research Documents (`docs/`)

All comprehensive research and implementation guides:

- **[ULTRA-DEEP-RESEARCH.md](docs/ULTRA-DEEP-RESEARCH.md)** (6,876 lines, PARTS 1-28)
  - Complete game design, psychology, and market analysis
  - **PART 15: Full implementation code** (all classes, complete integration)
  - PART 27: Build system and itch.io deployment
  - PART 28: Sprite sheet system (tiles 0-255 mapped)

- **[DAY-1-QUICKSTART.md](docs/DAY-1-QUICKSTART.md)** (246 lines)
  - 30-minute bootstrap guide from zero to playable
  - 7 steps with troubleshooting

- **[CODE-INTEGRATION-TEST.md](docs/CODE-INTEGRATION-TEST.md)** (432 lines)
  - Code assembly checklist with 13 verification checkpoints
  - Console testing commands for each system

- **[RESEARCH-TO-SPEC-PLAN.md](docs/RESEARCH-TO-SPEC-PLAN.md)**
  - Spec-driven workflow guide
  - Research → Specification → Implementation pipeline

**See**: [`docs/README.md`](docs/README.md) for complete documentation index.

---

## Build System

```bash
# Development (no build needed)
npm run dev

# Production build (full optimization)
node build.js

# Quick build (skip Closure Compiler, faster iteration)
node build.js --quick

# Test build locally
cd build && python3 -m http.server 8000
```

**Output**: `build/tiny-tycoon.zip` ready for itch.io upload (<200KB target)

---

## Project Structure

```
game-jam-2025/
├── .specify/              # Spec-Kit system
│   ├── memory/
│   │   └── constitution.md  # Tiny Tycoon principles
│   └── templates/         # Spec, plan, tasks templates
├── .claude/               # Claude Code slash commands
│   └── commands/          # /speckit.* commands
├── docs/                  # Research documentation
│   ├── ULTRA-DEEP-RESEARCH.md  # Complete design doc
│   ├── DAY-1-QUICKSTART.md     # Quick setup
│   └── CODE-INTEGRATION-TEST.md # Assembly checklist
├── src/
│   ├── game.js            # Main game code
│   ├── objects/           # Game entities (future)
│   └── levels/            # Level data (future)
├── assets/
│   └── sprites.png        # 256×256 tile sheet (16×16 tiles)
├── tests/                 # Manual test scripts
├── index.html             # Development entry point
├── build.js               # Production build script
└── package.json           # Build tool dependencies
```

---

## Testing

Manual testing workflow (time-constrained jam):

```bash
# Run game in development
npm run dev

# Manual test checklist
# See: docs/CODE-INTEGRATION-TEST.md for complete list
```

**Quality Gates** (every feature must pass):
- Playable without console errors
- Theme "SMALL" is immediately evident
- Runs at 60 FPS with 100+ entities on screen
- Works in Chrome + Firefox (desktop)
- Can be explained in <30 seconds

---

## LittleJS Framework

This game uses [LittleJS](https://github.com/KilledByAPixel/LittleJS) - a tiny, fast HTML5 game engine.

**Engine Location**: `../../LittleJS/dist/littlejs.release.js`

**Key Features Used**:
- Physics engine (momentum, collision)
- Particle system (collection effects)
- ZzFX sound system (procedural audio)
- Sprite sheet rendering (tile-based)

---

## Shared Resources

Available from workspace root:

- Physics helpers: `../../shared/components/physics-helpers.js`
- Particle presets: `../../shared/components/particle-presets.js`
- LittleJS engine: `../../LittleJS/dist/`

---

## Timeline & Milestones

**Week 1 (Oct 14-20)**: P1 - Core Katamari mechanic
**Week 2 (Oct 21-27)**: P2 - Level system, win/lose conditions
**Week 3 (Oct 28-Nov 2)**: P3 - Polish, juice, sound effects
**Nov 3, 2025**: Ship to itch.io

**Milestone Gates**:
- Oct 20 (Day 7): Playable core loop or pivot
- Oct 27 (Day 14): All 3 levels complete or reduce scope
- Nov 1 (Day 18): Feature freeze, polish only
- Nov 3 (Day 20): Submit to itch.io

---

## Goal

**Win LittleJS Game Jam 2025** through:
- Strong theme interpretation (40% weight)
- Fun gameplay with Katamari mechanics (30%)
- Innovation (Katamari + business = unique) (20%)
- Polish and presentation (10%)

**Competitive Advantages**:
- 6,876 lines of research-backed design
- Proven Katamari Damacy mechanics
- No existing Katamari-style business games on web
- LittleJS native implementation (uses framework strengths)

---

## License

MIT

---

**Status**: Ready for `/speckit.specify` - Begin feature specifications!
**Constitution**: See [.specify/memory/constitution.md](.specify/memory/constitution.md)
**Next Step**: Run `/speckit.constitution` to view project principles, then `/speckit.specify` to create your first feature spec.
