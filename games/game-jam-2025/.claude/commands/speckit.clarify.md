---
description: Ask clarifying questions to resolve underspecified areas
---

# Spec-Kit: Clarify Specification

Identify underspecified areas in the current feature spec and ask targeted clarifying questions.

## Prerequisites Check

Run prerequisite validation:
```bash
!./.specify/scripts/bash/check-prerequisites.sh --json
```

This ensures:
- Feature directory exists
- spec.md exists

## Process

1. **Read spec.md** from current feature directory
2. **Analyze for ambiguities**:
   - Vague requirements ("should be fast", "user-friendly")
   - Missing edge cases
   - Unclear acceptance criteria
   - Undefined terms
   - Contradictory statements
3. **Generate up to 5 targeted questions**
4. **Add Clarifications section** to spec.md
5. **Update spec.md** with answers

## Question Types

**Good Clarifying Questions**:
- "What should happen when [edge case]?"
- "Is [metric] measured by [method A] or [method B]?"
- "Should [component] support [capability] or defer to P4?"
- "Does [requirement] mean [interpretation A] or [interpretation B]?"

**Bad Questions** (too vague):
- "Can you explain the feature better?"
- "What should this do?"
- "Is this correct?"

## Output Format

Add to spec.md after Requirements section:

```markdown
## Clarifications

### Question 1
**Q**: What should happen when player collects object while combo is active - does multiplier apply immediately or on next collection?

**A**: Multiplier applies immediately to the collection that triggered it. If collecting 3rd object in combo, that object gets the 1.5x multiplier.

**Updated Requirement**: FR-050-006 clarified - "Combo x3 MUST set valueMultiplier to 1.5 BEFORE adding value to score"

---

### Question 2
**Q**: Should screen shake values accumulate when multiple objects collected in same frame, or should only highest shake value apply?

**A**: Shake values accumulate (additive). If collecting 5 objects simultaneously, shake power = sum of all 5 shake values (clamped to max 2.5).

**Updated Requirement**: FR-030-008 added - "Multiple shakes in same frame MUST accumulate (additive), not override"

---

[Continue for up to 5 questions]
```

## Identification Strategy

**Look for these patterns** in spec.md:

**Ambiguous Language**:
- "Should be intuitive" → **Q**: Define "intuitive" - what specific UX pattern?
- "Fast performance" → **Q**: Define "fast" - what FPS/latency target?
- "User-friendly" → **Q**: Which users? What makes it friendly for them?

**Missing Edge Cases**:
- Spec mentions "collect object" → **Q**: What if 10 objects collected in one frame?
- Spec says "timer warning" → **Q**: When exactly does it start? What if timer paused?

**Undefined Behavior**:
- "Particles burst" → **Q**: How many particles? What color? How long?
- "Sound plays" → **Q**: What volume? Positional or centered? Can it overlap?

**Contradictions**:
- "Must be fast" vs "Must have complex animation" → **Q**: Which takes priority if conflict?

## Output

Updates to current feature's spec.md:
- New "## Clarifications" section with Q&A pairs
- Updated requirements based on answers
- Resolved ambiguities

## Next Steps After Clarification

1. Review updated spec.md (ambiguities resolved?)
2. Use `/speckit.plan` to create technical plan with clarifications incorporated
3. Continue Spec-Kit workflow

---

**Note**: Clarification is OPTIONAL but recommended. Reduces rework during implementation.
