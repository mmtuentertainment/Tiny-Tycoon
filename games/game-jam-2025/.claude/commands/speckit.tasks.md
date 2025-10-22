---
description: Break implementation plan into atomic tasks
---

# Spec-Kit: Generate Task Breakdown

Break the implementation plan into atomic, executable tasks.

## Prerequisites Check

Run prerequisite validation:
```bash
!./.specify/scripts/bash/check-prerequisites.sh --json
```

This ensures:
- Feature directory exists
- spec.md exists
- plan.md exists (created by `/speckit.plan`)

## Process

1. **Read plan.md** from current feature directory
2. **Read spec.md** to understand user stories
3. **Generate tasks.md** following template structure
4. **Organize by user story** (maintains independence)
5. **Order by dependency** (critical path)

## Task Requirements

Your tasks MUST follow (per .specify/templates/tasks-template.md):

### Task Organization
- **Group by User Story**: Each user story = separate task section
- **Atomic Size**: Each task <1 hour (ideally 15-30 minutes)
- **Dependencies**: Mark dependencies between tasks
- **Parallel Execution**: Mark tasks that can run in parallel with [P]

### Task Format
```markdown
### User Story 1 Tasks

**TASK-001**: [Description] (Priority: P3, Time: 30m)
**Status**: [ ] TODO / [x] DONE
**Test**: [How to verify this task is complete]
**Dependencies**: None or [TASK-XXX]
**Files**: src/game.js:123-145
```

### Task Types
- **Implementation**: Write code for feature
- **Testing**: Manual test verification
- **Integration**: Connect new code to existing systems
- **Documentation**: Update CLAUDE.md if new patterns added

## Task Breakdown Strategy

**For each user story**:
1. Identify required code changes (classes, methods, data structures)
2. Break into smallest testable increments
3. Order by dependency (data structures → classes → integration)
4. Add test tasks after each implementation task
5. Mark parallel-safe tasks with [P]

**Example**:
```
User Story 1: Add screen shake on collection

TASK-001: Add cameraShake assignment in PlayerBall.collect() (15min)
  Test: Collect object, screen shakes
  Files: src/game.js:608-630

TASK-002: Add value-scaled shake formula (10min)
  Test: Collect penny (subtle), collect yacht (dramatic)
  Dependencies: TASK-001
  Files: src/game.js:608-630

TASK-003: Add tier-up screen shake in onTierUp() (10min) [P]
  Test: Cross tier threshold, screen shakes (0.3 power)
  Files: src/game.js (new method or inline)

TASK-004: Add victory screen shake (5min) [P]
  Test: Win level, screen shakes (0.5 power)
  Files: src/game.js:622-628
```

## Output

Create in current feature directory:
- `tasks.md` - Atomic task breakdown

## Next Steps After Tasks Created

1. Review tasks.md for completeness
2. Verify task ordering (dependencies correct)
3. Use `/speckit.implement` to execute all tasks sequentially
4. Update task status as you complete each one

---

**Current Feature**: Determined from git branch or SPECIFY_FEATURE env var
**Tasks Template**: .specify/templates/tasks-template.md
**Prerequisites Script**: .specify/scripts/bash/check-prerequisites.sh
