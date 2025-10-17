---
description: Validate consistency across spec, plan, tasks, and code
---

# Spec-Kit: Analyze Cross-Artifact Consistency

Validate alignment between specification, plan, tasks, and implementation code.

## Prerequisites Check

Run prerequisite validation:
```bash
!./.specify/scripts/bash/check-prerequisites.sh --json --include-tasks
```

This ensures:
- Feature directory exists
- spec.md exists
- plan.md exists
- tasks.md exists (optional but recommended)

## Process

1. **Read all artifacts**: spec.md, plan.md, tasks.md, relevant code files
2. **Cross-validate** for consistency and coverage
3. **Generate analysis report**
4. **Identify contradictions** or gaps
5. **Recommend fixes**

## Validation Checks

### 1. Spec → Plan Alignment

**Check**:
- [ ] Plan addresses ALL user stories from spec
- [ ] Plan technical approach matches spec requirements
- [ ] Plan Constitution Check validates all relevant Articles
- [ ] Plan doesn't add scope beyond spec (no feature creep)

**Report**:
```markdown
## Spec → Plan Alignment

✅ User Story 1 (Feel Impact): Addressed in "Screen Shake Implementation" section
✅ User Story 2 (Celebrate Tier-Ups): Addressed in "Tier-Up Events" section
✅ User Story 3 (Victory Moments): Addressed in "Victory Handler" section
✅ All 8 Functional Requirements from spec.md covered in plan
❌ FR-030-008 (accumulate shakes) not mentioned in plan [GAP]

Recommendation: Add plan section "Multi-Collection Handling" for FR-030-008
```

### 2. Plan → Tasks Alignment

**Check**:
- [ ] Tasks cover ALL sections of plan
- [ ] Tasks are atomic (<1 hour each)
- [ ] Task dependencies match plan order
- [ ] No tasks implement features not in plan

**Report**:
```markdown
## Plan → Tasks Alignment

✅ "Screen Shake Implementation" section → TASK-001, TASK-002
✅ "Tier-Up Events" section → TASK-003
✅ "Victory Handler" section → TASK-004
✅ All plan sections have corresponding tasks
⚠️ TASK-002 estimated at 2 hours (should be <1 hour) [WARNING]

Recommendation: Split TASK-002 into TASK-002a and TASK-002b
```

### 3. Tasks → Code Alignment

**Check**:
- [ ] All [x] DONE tasks have code implementations
- [ ] Code files match task specifications
- [ ] Code implements task test criteria
- [ ] No code exists for [ ] TODO tasks

**Report**:
```markdown
## Tasks → Code Alignment

✅ TASK-001 [x] DONE: Code exists in src/game.js:612 (cameraShake = ...)
✅ TASK-002 [x] DONE: Formula matches spec (0.05 + value * 0.0001)
❌ TASK-003 [ ] TODO: No onTierUp() method found in code [GAP]
❌ TASK-004 [ ] TODO: Victory handler missing shake call [GAP]

Recommendation: Implement TASK-003 and TASK-004 to complete feature
```

### 4. Code → Constitution Compliance

**Check**:
- [ ] Code follows LittleJS idioms (FR-018)
- [ ] No prohibited patterns (FR-019)
- [ ] Meets performance standards (FR-021)
- [ ] Follows git workflow (FR-039, FR-040)

**Report**:
```markdown
## Constitution Compliance

✅ FR-018: All classes extend EngineObject
✅ FR-018: Uses vec2() for positions
✅ FR-018: Uses LittleJS cameraShake global
✅ FR-021: Maintains 60 FPS (tested)
✅ FR-024: No console errors
⚠️ FR-040: Commit message missing FR reference [MINOR]

Recommendation: Update commit message to reference FR-030
```

### 5. Theme Validation

**Check**:
- [ ] Feature reinforces "SMALL" theme (Article II)
- [ ] 30-second theme test passes
- [ ] Theme Success Criteria met

**Report**:
```markdown
## Theme Validation

✅ TSC-001: Shake intensity scales with size (SMALL object = small shake, BIG object = big shake)
✅ TSC-002: Players feel progression through shake (observable in playtesting)
✅ TSC-003: Theme is reinforced through mechanic (not just decoration)
✅ 30-second test: 3/3 playtesters identified growth through shake intensity

Status: THEME VALIDATED ✅
```

## Output Format

Generate analysis report in current feature directory:

```markdown
# Cross-Artifact Analysis Report

**Feature**: 003-add-screen-shake-feedback
**Generated**: [Date]
**Status**: [PASS/FAIL/PARTIAL]

## Summary

- Spec → Plan: [X/Y checks passed]
- Plan → Tasks: [X/Y checks passed]
- Tasks → Code: [X/Y checks passed]
- Constitution Compliance: [X/Y checks passed]
- Theme Validation: [PASS/FAIL]

## Detailed Findings

[Full reports from each validation check]

## Recommendations

1. [High priority fix]
2. [Medium priority fix]
3. [Low priority enhancement]

## Conclusion

[READY TO MERGE / NEEDS WORK / BLOCKED]
```

## Next Steps After Analysis

**If READY TO MERGE**:
- All alignments pass
- Constitution compliant
- Theme validated
- Merge feature branch

**If NEEDS WORK**:
- Fix identified gaps
- Re-run `/speckit.analyze` to verify
- Continue iteration

**If BLOCKED**:
- Resolve blocker (missing dependency, unclear requirement)
- Update spec/plan/tasks as needed
- Re-run workflow from appropriate step

---

**Current Feature**: Determined from git branch
**Output**: analysis-report.md in feature directory
