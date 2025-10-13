# Spec-Driven Development - Methodology Overview

> **Navigation**: [← Knowledge Base Home](../README.md) | [Next: Slash Commands →](02-slash-commands.md)

## What is Spec-Driven Development (SDD)?

Spec-Driven Development **inverts the traditional software development paradigm**. Instead of code being the source of truth with specs as scaffolding, **specifications become executable artifacts** that directly generate implementations.

## 🔗 Contextual Connections

### → Game Jam Connection
- **31-Day Timeline**: Perfect for SDD's structured approach
- **Theme Interpretation**: `/speckit.specify` captures "SMALL" vision
- **Technical Planning**: `/speckit.plan` chooses LittleJS features
- **Task Breakdown**: `/speckit.tasks` organizes 31-day schedule
- **AI Tools Permitted**: Jam explicitly allows AI (SDD is AI-native)

### → LittleJS Connection
- **Simple Architecture**: Aligns with Article VII (Simplicity)
- **Direct API**: Matches Article VIII (Anti-Abstraction)
- **Modular Design**: Supports Article I (Library-First)
- **Game Objects**: Natural unit for test-first development

## The Power Inversion

### Traditional Development
```
Specifications → Guide Development → Code (Truth)
                                        ↓
                                   (Specs drift)
```

**Problems**:
- Specs become outdated
- Gap between intent and implementation
- Manual propagation of changes
- Documentation burden

### Spec-Driven Development
```
Specifications (Truth) → Generate → Implementation Plans → Code (Expression)
        ↑                                                      ↓
        └──────────── Feedback Loop ────────────────────────┘
```

**Advantages**:
- Specs stay synchronized
- No gap between intent and code
- Changes regenerate implementation
- Living documentation

## Core Philosophy

### 1. Specifications as Lingua Franca

The specification becomes the **primary artifact** of development:
- Product managers write user stories
- Designers describe interactions
- Engineers detail technical requirements
- All in natural language, not code

**Code becomes an expression** of the spec in a particular language/framework.

### 2. Intent-Driven Development

Focus on **WHAT** and **WHY**, not **HOW**:

```markdown
❌ Bad (Implementation Details):
"Create a React component with Redux state management and
WebSocket connection for real-time updates"

✅ Good (Intent):
"Users need to see task updates in real-time without
refreshing the page"
```

The **HOW** comes later in the technical plan, after intent is clear.

### 3. Multi-Step Refinement

Not one-shot generation from prompts, but **structured progression**:

```
Step 1: Constitution → Principles
Step 2: Specify      → What to build (intent)
Step 3: Clarify      → Resolve ambiguities
Step 4: Plan         → How to build (tech)
Step 5: Tasks        → Breakdown
Step 6: Implement    → Execute
```

Each step builds on previous, with validation gates.

### 4. AI-Native Process

SDD **requires advanced AI capabilities**:
- Understand complex natural language specifications
- Generate detailed implementation plans
- Create working code from structured descriptions
- Maintain consistency across artifacts

But **structure prevents chaos** - templates constrain AI output for quality.

### 5. Bidirectional Feedback

Production reality informs specification evolution:

```
Specs → Plans → Code → Deploy → Metrics/Incidents
  ↑                                      ↓
  └────────── Update Specs ──────────────┘
```

Performance bottlenecks become non-functional requirements.
Security vulnerabilities become constraints.
User feedback becomes user stories.

## The SDD Workflow

### Phase 0: Establish Constitution

**Command**: `/speckit.constitution`

Create project's **architectural DNA**:
```markdown
# Project Constitution

## Core Principles
- Library-First (Article I)
- CLI Interface (Article II)
- Test-First - NON-NEGOTIABLE (Article III)
- Simplicity (Article VII)
- Anti-Abstraction (Article VIII)

## Governance
All implementations must pass constitutional gates
```

**Purpose**: Ensures consistency across all generated code

**Game Jam Context**: Define your game's core principles
- Visual style (pixel art, minimal colors)
- Gameplay philosophy (one mechanic done well)
- Technical constraints (mobile-friendly, no external assets)

### Phase 1: Specification

**Command**: `/speckit.specify <description>`

Transform vague idea into **structured specification**:

**Input** (Natural Language):
```
Build a puzzle game where small blocks combine into
larger blocks. Players drag and drop blocks to merge
them. Score based on creating the largest block possible.
```

**Output** (Structured Spec):
```markdown
# Feature Specification: Block Merge Puzzle

## User Scenarios
### User Story 1 - Basic Merging (Priority: P1)
Given multiple small blocks on a grid
When player drags block A onto block B of same type
Then blocks merge into larger block
And score increases

### User Story 2 - Score System (Priority: P2)
...

## Requirements
- FR-001: System MUST detect adjacent blocks of same type
- FR-002: System MUST merge blocks on successful drop
- FR-003: System MUST track and display score

## Success Criteria
- SC-001: Players can complete merge in under 1 second
- SC-002: Visual feedback shows merge animation
```

**Key Features**:
- **Prioritized user stories** (P1, P2, P3)
- **Independently testable** scenarios
- **Measurable success criteria**
- **`[NEEDS CLARIFICATION]` markers** for ambiguities

### Phase 2: Clarification (Optional but Recommended)

**Command**: `/speckit.clarify`

AI asks structured questions to resolve ambiguities:

```
Q: What happens when grid is full?
A: Game over, show final score

Q: Can players undo moves?
A: No undo, increases challenge

Q: What sizes do blocks come in?
A: 1x1, 2x2, 4x4 (powers of 2)
```

Answers are **recorded in spec** for reference.

**Why Before Planning**: Reduces rework downstream. Better to clarify "what" before deciding "how".

### Phase 3: Technical Planning

**Command**: `/speckit.plan <tech stack>`

Convert spec into **implementation roadmap**:

**Input** (Tech Choices):
```
Use LittleJS engine. No external libraries.
Drag-and-drop with mouse/touch.
Grid-based tile system.
Procedural sounds with ZzFX.
```

**Output** (Implementation Plan):
```markdown
# Implementation Plan: Block Merge Puzzle

## Technical Context
- Language: JavaScript
- Engine: LittleJS 1.14.16
- Rendering: WebGL tile system
- Input: Mouse + Touch
- Audio: ZzFX procedural
- Storage: LocalStorage for high score

## Constitution Check
✅ Simplicity Gate: Single project, no abstractions
✅ Anti-Abstraction: Using LittleJS APIs directly
✅ Test-First: Contract tests for merge logic

## Project Structure
src/
├── game.js           # Main game loop
├── block.js          # Block class
├── grid.js           # Grid management
└── sounds.js         # ZzFX definitions

tests/
├── block.test.js
├── grid.test.js
└── merge.test.js

## Phase 0: Research
- Confirm LittleJS tile system supports grid
- Test touch input on mobile
- Design ZzFX sounds for merge

## Phase 1: Design
- Create data-model.md (Block, Grid entities)
- Define contracts (merge algorithm)
- Write quickstart.md (manual test scenarios)

## Phase 2: Implementation (via /speckit.tasks)
```

### Phase 4: Task Breakdown

**Command**: `/speckit.tasks`

Generate **actionable task list**:

```markdown
# Task List

## Prerequisite Validation
✅ spec.md exists
✅ plan.md exists
✅ Constitution gates passed

## Phase 0: Setup (Days 1-3)
1. [P] Create Block class with properties
2. [P] Create Grid class with tile layer
3. Write contract tests for merge logic (wait for 1, 2)
4. Create ZzFX sound effects

## Phase 1: Core Gameplay (Days 4-10)
5. Implement Block.merge() (wait for 3)
6. Implement Grid.canPlace() (wait for 3)
7. [P] Implement drag-and-drop input
8. [P] Implement score system
9. Integration test: drag, drop, merge, score (wait for 5,6,7,8)

## Phase 2: Polish (Days 11-15)
10. Add merge animation with particles
11. Add audio feedback
12. Implement high score persistence
...
```

**Features**:
- **`[P]` markers** for parallel tasks
- **Dependencies** clearly stated
- **TDD approach** (tests first)
- **File creation order** specified

### Phase 5: Implementation

**Command**: `/speckit.implement`

Execute the task list:
- Validates prerequisites
- Parses tasks from tasks.md
- Follows TDD approach
- Respects dependencies
- Provides progress updates

**AI Agent**:
1. Reads task 1
2. Creates test file
3. Writes failing tests
4. Implements feature
5. Verifies tests pass
6. Moves to task 2

### Phase 6: Quality Gates (Optional)

**Command**: `/speckit.analyze`

Cross-check artifacts for consistency:
- Spec ↔ Plan alignment
- Plan ↔ Tasks coverage
- Tasks ↔ Code traceability

**Command**: `/speckit.checklist`

Generate quality checklists:
```markdown
## Specification Quality
- [ ] No [NEEDS CLARIFICATION] markers
- [ ] All user stories have acceptance criteria
- [ ] Success criteria are measurable

## Implementation Quality
- [ ] All tests pass
- [ ] Code matches constitutional principles
- [ ] No over-engineering
```

## Template-Driven Quality

### How Templates Constrain AI

Templates act as **sophisticated prompts** that guide LLM behavior:

#### 1. Preventing Premature Implementation

Template explicitly forbids:
```markdown
- ✅ Focus on WHAT and WHY
- ❌ Avoid HOW (no tech stack, APIs, code)
```

**Result**: LLM stays at proper abstraction level

#### 2. Forcing Uncertainty Markers

```markdown
When unsure:
1. Mark: [NEEDS CLARIFICATION: specific question]
2. Don't guess
```

**Result**: AI makes assumptions explicit rather than hidden

#### 3. Structured Self-Review

```markdown
### Review Checklist
- [ ] All requirements testable
- [ ] No speculative features
- [ ] Measurable success criteria
```

**Result**: "Unit tests for English" - AI validates own output

#### 4. Constitutional Gates

```markdown
### Phase -1: Pre-Implementation Gates
#### Simplicity Gate (Article VII)
- [ ] Using ≤3 projects?
#### Anti-Abstraction Gate (Article VIII)
- [ ] Using framework directly?
```

**Result**: Must justify every layer of complexity

### The Compound Effect

Templates produce specifications that are:
- **Complete** - Checklists catch missing pieces
- **Unambiguous** - Forced clarifications
- **Testable** - Test-first thinking baked in
- **Maintainable** - Proper hierarchy
- **Implementable** - Clear deliverables

## Why SDD Matters for Game Jams

### Perfect Timing Alignment

**31-day jam** ↔ **SDD structured phases**:

| Jam Days | SDD Phase | Activities |
|----------|-----------|------------|
| Days 1-3 | Specify + Clarify | Define game concept, resolve ambiguities |
| Days 4-5 | Plan | Choose LittleJS features, tech decisions |
| Day 6 | Tasks | Break down into implementable chunks |
| Days 7-28 | Implement | Build systematically, test-first |
| Days 29-31 | Polish | Visual effects, audio, testing |

### Advantages Over Ad-Hoc Development

**Traditional Jam Approach**:
```
Day 1: Start coding immediately
Day 10: Realize design flaw, restart
Day 20: Scope creep, feature bloat
Day 31: Rush to finish, buggy submission
```

**SDD Approach**:
```
Days 1-6: Detailed planning (6 days of thinking)
Days 7-28: Focused execution (22 days of building)
Days 29-31: Polish (3 days of refinement)

Result: Complete, polished game
```

### AI Tool Synergy

**Both Jam and SDD permit AI tools**:
- Use AI to generate specifications
- Use AI to create implementation plans
- Use AI to write code from tasks
- Use AI for asset generation

**But structure prevents chaos**:
- Templates constrain AI output
- Gates enforce quality
- Constitutional principles ensure consistency

## Getting Started with SDD

### Installation

```bash
# Install Specify CLI
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Initialize project
specify init my-game-jam-project --ai claude

# Or in current directory
specify init --here --ai claude
```

### First Steps

1. **Define Constitution**
   ```bash
   /speckit.constitution Create principles for a game jam entry:
   simple gameplay, polished visuals, creative physics use, test-first
   ```

2. **Write Specification**
   ```bash
   /speckit.specify [paste game concept]
   ```

3. **Clarify Ambiguities**
   ```bash
   /speckit.clarify
   ```

4. **Create Technical Plan**
   ```bash
   /speckit.plan Use LittleJS engine, [specific features]
   ```

5. **Generate Tasks**
   ```bash
   /speckit.tasks
   ```

6. **Implement**
   ```bash
   /speckit.implement
   ```

## Constitutional Framework

### Nine Articles (Customizable)

**Article I: Library-First**
- Every feature begins as standalone library
- Forces modular design

**Article II: CLI Interface**
- Text in → text out
- Ensures observability

**Article III: Test-First** (NON-NEGOTIABLE)
- Tests written → approved → fail → then implement
- Completely inverts AI code generation

**Article VII: Simplicity**
- Maximum 3 projects initially
- Combat over-engineering

**Article VIII: Anti-Abstraction**
- Use framework features directly
- No unnecessary wrappers

**Article IX: Integration-First Testing**
- Prefer real instances over mocks
- Contract tests mandatory

### Game Jam Constitution Example

```markdown
# Game Jam 2025 Constitution

## Core Principles

### I. One Mechanic Done Well
All features must serve the core gameplay loop.
No feature creep. Deep, not wide.

### II. Visual Clarity
Pixel art style. Limited color palette (8 colors max).
Clear visual hierarchy. Readable at all resolutions.

### III. Test-First (NON-NEGOTIABLE)
All gameplay mechanics have tests.
Physics behaviors are validated.
Tests written before implementation.

### IV. Polish Over Content
Prefer fewer polished levels over many rough levels.
Particle effects required for all interactions.
Audio feedback for all actions.

### V. Mobile-Friendly
Works on touch devices.
Virtual controls if needed.
Performance: 60fps on mobile.

### VI. SMALL Theme Integration
Every design decision supports "SMALL" theme.
Justify features against theme.

## Governance
All PRs validated against these principles.
Constitution amendments require justification.
```

## Resources

### Official Spec Kit
- **GitHub**: https://github.com/github/spec-kit
- **Documentation**: [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- **Templates**: Auto-installed by Specify CLI

### Knowledge Base
- **Commands**: [02-slash-commands.md](02-slash-commands.md)
- **Templates**: [03-templates-guide.md](03-templates-guide.md)
- **Constitution**: [04-constitution-framework.md](04-constitution-framework.md)
- **AI Agents**: [05-ai-agent-integration.md](05-ai-agent-integration.md)

### Game Jam Integration
- **SDD for Games**: [../04-integration/01-sdd-for-game-dev.md](../04-integration/01-sdd-for-game-dev.md)
- **Game Specs**: [../04-integration/02-game-specification.md](../04-integration/02-game-specification.md)
- **Timeline**: [../04-integration/04-31-day-timeline.md](../04-integration/04-31-day-timeline.md)

## Next Steps

1. **Install Spec Kit**: Follow installation instructions
2. **Learn Commands**: Read [02-slash-commands.md](02-slash-commands.md)
3. **Study Templates**: Review [03-templates-guide.md](03-templates-guide.md)
4. **Practice**: Try SDD workflow on simple project
5. **Prepare for Jam**: Apply to game concept

---

**Key Insight**: SDD transforms the 31-day jam from chaos into structured execution. Specifications become your roadmap, not just documentation.

**Next**: [02-slash-commands.md →](02-slash-commands.md)
