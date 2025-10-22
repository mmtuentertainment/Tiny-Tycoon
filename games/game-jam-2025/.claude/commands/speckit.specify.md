---
description: Create feature specification following Spec-Kit methodology
argument-hint: feature description
---

# Spec-Kit: Specify Feature

Create a detailed feature specification following the Spec-Driven Development methodology.

## Input

Feature description: **$ARGUMENTS**

## Process

1. **Read Constitution** (.specify/memory/constitution.md) to understand project principles and constraints
2. **Create feature branch** with naming convention: `[###-feature-name]` (auto-increment number)
3. **Generate spec.md** in `.specify/specs/[###-feature-name]/spec.md` following template
4. **Call Spec-Kit script** to handle setup: `.specify/scripts/bash/create-new-feature.sh`

## Specification Requirements

Your specification MUST include (per .specify/templates/spec-template.md):

### User Scenarios & Testing (mandatory)
- **Prioritized user stories** (P1/P2/P3/P4) ordered by importance
- **Why this priority** rationale for each story
- **Independent Test** description (can validate standalone)
- **Acceptance Scenarios** in Given/When/Then format (BDD style)
- **Edge Cases** with handling strategies

### Requirements (mandatory)
- **Functional Requirements** (FR-XXX-001, FR-XXX-002, etc.) - specific, testable
- **Key Entities** (data structures, classes, components)
- **Clear constraints** (what MUST happen, what MUST NOT happen)

### Success Criteria (mandatory)
- **Measurable Outcomes** (SC-001, SC-002, etc.) - quantifiable metrics
- **Game Jam Theme Validation** (for Tiny Tycoon):
  - Theme: "SMALL"
  - Core mechanic connection to theme
  - Visual representation of theme
  - Player understanding (30-second test)
  - Creative interpretation
  - Theme Success Criteria (TSC-001 to TSC-004)

### Technical Context (recommended)
- Related Constitution Articles and FRs
- Dependencies (what must exist first)
- Implementation constraints (time, complexity, files)
- Out of Scope (what this does NOT include)
- Tool/framework references

## Constitution Validation

Every spec MUST validate against Constitution v2.1.0:

- **Article II**: Theme-First Development (30-second "SMALL" test)
- **Article III**: Katamari Mechanics (physics compliance)
- **Article V**: Technical Constraints (LittleJS idioms, performance)
- **Article VIII**: Timeline (can ship in <2 days or reject)
- **Article XV**: Priority System (P1=Week 1, P2=Week 2, P3=Week 3, P4=Post-jam)

## Output Structure

Create in `.specify/specs/[###-feature-name]/`:
- `spec.md` - Feature specification (following template)
- Create feature branch: `git checkout -b [###-feature-name]`

## Next Steps After Spec Created

1. Review spec.md for completeness
2. Use `/speckit.clarify` to resolve ambiguities (optional but recommended)
3. Use `/speckit.plan` to create technical implementation plan
4. Use `/speckit.tasks` to break into atomic tasks
5. Use `/speckit.implement` to execute implementation

---

**Reference Documents**:
- Constitution: .specify/memory/constitution.md
- Template: .specify/templates/spec-template.md
- Research: docs/ULTRA-DEEP-RESEARCH.md, docs/SOURCE-OF-TRUTH.md, VISION.md
