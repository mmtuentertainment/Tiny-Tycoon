---
description: Create or update project Constitution with governing principles
argument-hint: principles description
---

# Spec-Kit: Constitution Management

Create or update the project Constitution with governing principles and development guidelines.

## Purpose

The Constitution (.specify/memory/constitution.md) establishes:
- **Immutable principles** that guide all development
- **Technical specifications** (FRs) that all features must follow
- **Governance framework** for decision-making
- **Quality gates** and definition of "done"

## For Tiny Tycoon

**Current Constitution**: v2.1.0 (2,447 lines, 60 FRs)

**Status**: ✅ **COMPLETE** - Do not modify unless:
1. Adding new core principle
2. Updating technical constraint
3. Amending timeline/priorities
4. Fixing contradiction

## If Modifying Existing Constitution

### Amendment Process (Article XIII, Section 13.2):

1. **Document rationale**: Why is this change necessary?
2. **Check violations**: Does this violate Theme-First, Katamari Mechanics, or Ship Date?
3. **Update version**: Increment MAJOR.MINOR.PATCH semantically
4. **Update changelog**: Add entry to Article XVI
5. **Sync templates**: Update affected templates in .specify/templates/

### Amendment Format:
```markdown
## Article XVI: Changelog & Version History

### Version 2.2.0 (Date)

**Amendment**: [What changed]

**Rationale**: [Why change was necessary]

**Impact**: [What this affects in workflow/code]

**Validation**: [How we verify this doesn't break existing features]
```

## If Creating New Constitution

**Input**: Principles description from $ARGUMENTS

### Process:

1. **Define Core Principles** (5-7 foundational rules)
2. **Technical Constraints** (performance, browser support, asset budget)
3. **Development Workflow** (Spec-Kit process)
4. **Quality Gates** (definition of "done")
5. **Priority System** (P1/P2/P3/P4 definitions)

### Constitution Structure:

```markdown
# [Project Name] Constitution

> [Tagline and key info]

## Preamble
[Authority and purpose]

## ARTICLE I: Project Identity
- Core concept
- Target audience
- Competitive positioning

## ARTICLE II: [Core Principle 1]
[Non-negotiable rule with specifications]

## ARTICLE III: [Core Principle 2]
[Core mechanic or pattern with FRs]

... [Continue for all principles]

## ARTICLE N: Governance & Process
- Amendment process
- Authority hierarchy
- Complexity justification

## Appendices
- Glossary
- Quick reference
- Common pitfalls
```

## For Tiny Tycoon - DO NOT MODIFY

**Current Constitution is production-ready**:
- ✅ 16 Articles with comprehensive governance
- ✅ 60 Functional Requirements (FR-001 to FR-060)
- ✅ Complete COLLECTIBLE_DATA spec (33 objects)
- ✅ Complete LEVELS spec (3 levels)
- ✅ Role-based navigation (🎮🎨🎵💻📊)
- ✅ Agent context (when to call which command)
- ✅ Timeline with milestone gates

**Only modify if**:
- New research findings require principle update
- Major architectural change needed
- Timeline shifts (unlikely - Nov 3 is non-negotiable)
- Technical constraint changes

**If in doubt**: Don't modify Constitution. Add details to feature specs instead.

## Output

Creates or updates:
- `.specify/memory/constitution.md`
- Version number incremented
- Changelog updated
- Templates synced if needed

---

**Current Constitution**: .specify/memory/constitution.md (v2.1.0)
**Status**: Production-ready, no changes needed for current scope
**Next Action**: Use `/speckit.specify` to create feature specs instead
