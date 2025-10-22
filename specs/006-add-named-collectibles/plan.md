# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75, JavaScript ES6+ or NEEDS CLARIFICATION]
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM, LittleJS or NEEDS CLARIFICATION]
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files, localStorage or N/A]
**Testing**: [e.g., pytest, XCTest, cargo test, Node test runner or NEEDS CLARIFICATION]
**Target Platform**: [e.g., Linux server, iOS 15+, WASM, Web browsers (Chrome/Firefox/Safari) or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile/game - determines source structure]
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps, 13KB bundle size or NEEDS CLARIFICATION]
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable, browser-compatible or NEEDS CLARIFICATION]
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens, 10 game levels, 5 enemy types or NEEDS CLARIFICATION]

**LittleJS Game-Specific** (include only for LittleJS game projects):

- **Engine Version**: LittleJS [version or "latest from repo"]
- **Physics Requirements**: [e.g., custom micro-scale physics, gravity wells, collision detection complexity]
- **Asset Budget**: [e.g., single sprite sheet <50KB, ZzFX audio only (procedural)]
- **Game Jam Theme**: [if applicable, e.g., "SMALL" - how does this feature relate to theme?]
- **Physics Innovation**: [if targeting physics prize, describe novel mechanic being implemented]
- **Shared Components**: [list any shared/components/*.js files being used or created]
- **Performance Target**: 60 FPS on mid-range devices, <1MB total game size
- **Browser Support**: Modern browsers (Chrome/Firefox/Safari latest 2 versions)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]

# [REMOVE IF UNUSED] Option 4: LittleJS Game (when "LittleJS" or "game" detected)
src/
├── game.js              # Main game entry point (engineInit)
├── objects/             # Game object classes (enemies, player, etc.)
├── levels/              # Level data and generation
└── sounds.js            # ZzFX sound definitions

assets/
└── sprites.png          # Single sprite sheet (tile-based)

tests/
├── physics.test.js      # Physics behavior validation (TDD)
└── gameplay.test.js     # Gameplay mechanic tests

# Shared components imported from workspace root
# import from '../../shared/components/physics-helpers.js'
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
