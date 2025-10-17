---
description: Execute tasks to implement the feature
---

# Spec-Kit: Implement Feature

Execute all tasks from tasks.md to build the feature according to the plan.

## Prerequisites Check

Run prerequisite validation:
```bash
!./.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks
```

This ensures:
- Feature directory exists
- spec.md exists
- plan.md exists
- tasks.md exists (created by `/speckit.tasks`)

## Process

1. **Read tasks.md** from current feature directory
2. **Execute tasks sequentially** in dependency order
3. **Test after each task** (manual verification per task's Test criteria)
4. **Update task status** ([ ] TODO → [x] DONE)
5. **Commit when complete** with descriptive message

## Implementation Strategy

### For Each Task:

**1. Read Task Definition**:
- Understand what needs to be implemented
- Note files to modify
- Check dependencies (wait for prerequisite tasks)
- Review test criteria

**2. Implement Code**:
- Follow LittleJS idioms (Constitution Article V, FR-018)
- Use patterns from ULTRA-DEEP-RESEARCH.md PART 15 if available
- Write clean, commented code
- Follow existing code style

**3. Manual Test**:
- Execute test criteria from task
- Verify feature works as specified
- Check no console errors
- Confirm 60 FPS maintained

**4. Update Status**:
- Mark task as [x] DONE in tasks.md
- Note any issues or deviations

**5. Commit** (after related tasks group):
- Use conventional commit format per Constitution FR-040
- Reference FR numbers if applicable

### Parallel Task Handling

Tasks marked with [P] can be implemented in parallel (no dependencies).

**Example**:
```
TASK-003: Add tier-up shake [P]
TASK-004: Add victory shake [P]

These can be done in either order or simultaneously.
```

## Testing Standards (Constitution FR-024)

Every task must pass "Definition of Done":
- [ ] Playable without bugs or console errors
- [ ] Theme "SMALL" is evident (if user-facing)
- [ ] Maintains 60 FPS with 100+ entities
- [ ] Works in Chrome + Firefox
- [ ] Can be demoed in <30 seconds
- [ ] No `// TODO` or `// FIXME` in code

## Code Quality (Constitution Article V)

### LittleJS Idioms (FR-018):
1. ✅ Extend EngineObject for all game entities
2. ✅ Use vec2() for positions/sizes
3. ✅ Use tile() for sprite references
4. ✅ Use ZzFX for audio (no audio files)
5. ✅ Use built-in ParticleEmitter

### Architecture (FR-019):
- ✅ Single-file (src/game.js) acceptable for jam
- ✅ Global variables OK (player, levelManager, soundManager)
- ✅ Data-driven config objects
- ✅ Modern JavaScript (const/let, arrow functions, classes)

### Prohibited (FR-019):
- ❌ External npm dependencies
- ❌ Complex build tooling
- ❌ TypeScript
- ❌ ECS architecture

## Commit Message Format (FR-040)

```bash
git commit -m "feat: add screen shake on collection (FR-030)

- Screen shake power scales with object value
- Subtle shake for small objects (penny: 0.05)
- Dramatic shake for large objects (rocket: 2.05)
- Fixed shake on tier-up (0.3) and victory (0.5)
- Implements Constitution FR-030 from Article VI

Completes TASK-001, TASK-002, TASK-003, TASK-004 from 003-add-screen-shake-feedback"
```

## Error Handling

If task fails or is blocked:
1. Document the blocker in tasks.md
2. Note workaround or alternative approach
3. Continue with parallel tasks if available
4. Return to blocked task after resolution

## Output

Updates:
- Code files (src/*.js) with implementations
- tasks.md with updated statuses ([x] DONE)
- Git commits for completed work

## Next Steps After Implementation

1. Run full playtest (all user stories working?)
2. Use `/speckit.analyze` to validate spec/plan/code alignment
3. Update Constitution Section 15.2 if feature complete
4. Merge feature branch if ready

---

**Current Feature**: Determined from git branch or SPECIFY_FEATURE env var
**Tasks**: .specify/specs/[feature]/tasks.md
**Code**: src/game.js (primary implementation file)
