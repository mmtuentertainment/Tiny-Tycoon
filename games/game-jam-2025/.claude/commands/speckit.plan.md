---
description: Create technical implementation plan from specification
---

# Spec-Kit: Create Implementation Plan

Generate a technical implementation plan for the current feature specification.

## Prerequisites Check

Run prerequisite validation:
```bash
!./.specify/scripts/bash/check-prerequisites.sh --json
```

This ensures:
- Feature directory exists (`.specify/specs/[###-feature-name]/`)
- spec.md exists (created by `/speckit.specify`)
- On correct feature branch

## Process

1. **Read spec.md** from current feature directory
2. **Read Constitution** for technical constraints and patterns
3. **Create plan.md** following template structure
4. **Call setup script**: `.specify/scripts/bash/setup-plan.sh`

## Plan Requirements

Your plan MUST include (per .specify/templates/plan-template.md):

### Constitution Check (mandatory)
Validate feature against Constitution Articles:
- [ ] **Article II**: Theme-First - Does this embody "SMALL"?
- [ ] **Article III**: Katamari Mechanics - Physics compliance?
- [ ] **Article V**: Technical Standards - LittleJS idioms followed?
- [ ] **Article VIII**: Timeline - Can ship in <2 days?
- [ ] **Article XV**: Playable > Pretty - Is this core gameplay or polish?

### Technical Approach (mandatory)
- **Architecture**: Classes, modules, data structures needed
- **LittleJS Patterns**: Which engine features to use (EngineObject, ParticleEmitter, Sound, etc.)
- **File Organization**: Which files to modify/create (src/game.js, new classes, etc.)
- **Data Structures**: Configuration objects, enums, constants
- **Integration Points**: How this connects to existing code

### Implementation Details (mandatory)
- **Code Structure**: Pseudocode or class outlines
- **Algorithm Choices**: Specific approaches for complex logic
- **Performance Considerations**: 60 FPS requirement, entity limits
- **Testing Strategy**: Manual test steps for each user story

### Dependencies & Risks (recommended)
- **Dependencies**: What must exist before this can be built
- **Risks**: What could go wrong, mitigation strategies
- **Assumptions**: What we're assuming is true

## Reference Materials

During planning, reference:
- **Constitution**: .specify/memory/constitution.md (FRs, class specs, data structures)
- **Research**: docs/ULTRA-DEEP-RESEARCH.md PART 15 (complete implementation examples)
- **Current Code**: src/game.js (understand existing structure)
- **SOURCE-OF-TRUTH**: docs/SOURCE-OF-TRUTH.md (implementation patterns)

## Output

Create in current feature directory:
- `plan.md` - Technical implementation plan
- `research.md` - Additional research if needed
- `data-model.md` - Data structure definitions if complex
- `contracts/` - API contracts if applicable

## Next Steps After Plan Created

1. Review plan.md for completeness
2. Validate Constitution Check (all boxes checked)
3. Use `/speckit.tasks` to break plan into atomic tasks
4. Use `/speckit.implement` to execute tasks

---

**Current Feature**: Determined from git branch or SPECIFY_FEATURE env var
**Plan Template**: .specify/templates/plan-template.md
**Prerequisites Script**: .specify/scripts/bash/check-prerequisites.sh
