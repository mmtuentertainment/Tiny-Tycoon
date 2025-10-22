# Lessons Learned: Feature 001 - Core Katamari Mechanic

**Date**: 2025-10-15
**Feature**: 001-implement-the-foundational
**Outcome**: Playable game achieved, but process violated Spec-Kit principles

---

## Critical Issue: Spec Scope Violation

### What Happened

Created **ONE massive specification** containing:
- 4 user stories (US1-US4)
- 20 functional requirements
- 88 atomic tasks
- 8 implementation phases
- Estimated 9 hours implementation

### What Should Have Happened

**Proper Spec-Kit approach**: One spec per independently deliverable feature

**Should have been 4 separate specs:**

**Spec 001: Player Movement & Control**
- User Story: Control ball with WASD/Arrow keys
- Scope: PlayerBall class, input handling, camera follow
- Tasks: ~18 tasks (T001-T018)
- Time: 2-3 hours
- Deliverable: Controllable player with camera

**Spec 002: Collision & Collection System**
- User Story: Collect objects smaller than player
- Scope: Collectible class, spawning, collision detection
- Tasks: ~15 tasks (T019-T031 equivalent)
- Time: 3-4 hours
- Deliverable: Collectibles spawn, can be collected
- **Dependency**: Requires Spec 001 (needs player to collide with)

**Spec 003: Exponential Growth System**
- User Story: Grow exponentially when collecting
- Scope: Growth formula in collect() method
- Tasks: ~10 tasks (T032-T039 equivalent)
- Time: 2 hours
- Deliverable: Visual size progression, theme demonstration
- **Dependency**: Requires Spec 002 (needs collection events)

**Spec 004: Visual Enhancements (Magnetic + HUD)**
- User Stories: Magnetic attraction + HUD display
- Scope: Magnetic force in Collectible.update(), HUD in gameRenderPost()
- Tasks: ~20 tasks (T040-T057 equivalent)
- Time: 2-3 hours
- Deliverable: Polish and player feedback
- **Dependency**: Requires Spec 003 (needs growth for proper magnet behavior)

---

## Impact of Scope Violation

### Negative Consequences

1. **Testing Shortcuts** (46 of 88 tasks skipped)
   - Skipped comprehensive validation (Phase 8: 31 tasks)
   - Skipped detailed measurements (growth rate, FPS, theme timing)
   - Skipped edge case testing
   - Skipped cross-browser validation

2. **Quality Trade-offs**
   - Iterative tuning instead of planned testing (physics values changed 4 times)
   - Magnetic attraction heavily modified from research specs (3 different implementations)
   - Manual collision detection added as workaround (not in original plan)

3. **Documentation Mismatch**
   - Tasks.md describes 88 tasks but only 42 actually completed
   - Research.md parameters (strength 1.5, range 2.5) not used (changed to 0.2, 1.2)
   - Quickstart.md steps don't match actual implementation sequence

4. **Workflow Breakdown**
   - `/speckit.implement` incomplete (stopped at 48% instead of 100%)
   - Can't claim "feature complete" honestly
   - Validation phase entirely skipped

### Positive Outcomes (Despite Violations)

1. **Human-in-Loop Saved Us**
   - User testing caught overshoot issue (led to physics tuning)
   - User feedback refined magnetic attraction (3 iterations to "feels right")
   - Interactive debugging found LittleJS initialization bug

2. **Playable Result**
   - Core gameplay works and is fun
   - Theme "SMALL to BIG" is evident
   - All functional requirements technically implemented

3. **Rapid Prototyping**
   - Got to playable in ~6 hours instead of planned 9
   - Iterative tuning faster than extensive pre-planning
   - Game jam timeline benefits from speed over perfection

---

## Why This Happened

### Root Causes

1. **User Request Was Compound**
   - Initial input included ALL mechanics in one description
   - I should have recognized this and suggested splitting
   - Instead, I created one spec matching the compound request

2. **Constitution Misinterpretation**
   - Constitution Article III says "P1: Core Katamari mechanic - player movement, collection, growth"
   - I interpreted this as ONE feature
   - Should have interpreted as "P1 THEME containing multiple specs"

3. **Time Pressure Bias**
   - Game jam deadline (Nov 3) created urgency
   - "Get it working fast" overrode "do it properly"
   - Skipped validation to reach playable faster

---

## Correct Approach Going Forward

### Spec-Kit Principles (Constitution Article for future reference)

**One Spec = One Independently Deliverable Feature**

**Criteria for "one spec"**:
- Can be developed independently (minimal dependencies)
- Can be tested independently
- Can be deployed independently
- Delivers user value on its own
- Takes <2 days to implement (constitution Article III)

**Multi-story specs only when**:
- Stories are tightly coupled (cannot exist without each other)
- Breaking apart creates more complexity than value
- Stories are trivially small (each <1 hour implementation)

### New Workflow for P2 Features

**Next features should be**:

**Spec 005: Level System**
- ONE feature: Multi-level progression
- User story: Complete level, advance to next
- Independent: Works with existing core mechanic
- Deliverable: 3 playable levels

**Spec 006: Win/Lose Conditions**
- ONE feature: Timer and goal system
- User story: Reach target size before time runs out
- Independent: Works with existing levels
- Deliverable: Victory and defeat screens

**NOT**: "Spec 005: Level System + Win/Lose + Timer + More Objects" (compound spec)

---

## Validation Task Completion Strategy

### For Current Spec 001

**Recommendation**: Execute remaining Phase 8 tasks (T062-T088) to:
- Validate performance claims (60 FPS with 100+ objects)
- Test edge cases formally
- Cross-browser verification
- Theme playtester validation
- Constitution compliance check

**Time Required**: 2-3 hours
**Benefit**: Can honestly claim "feature 100% complete per Spec-Kit"

### For Future Specs

**Build validation into workflow**:
- Don't skip Phase 8
- Test each acceptance criterion explicitly
- Measure performance claims (don't assume)
- Document test results in spec.md

---

## Metrics: Spec 001 Reality Check

| Metric | Plan | Actual | Variance |
|--------|------|--------|----------|
| **Specs Created** | 1 | 1 | - |
| **User Stories** | 4 | 4 | Should have been 4 specs |
| **Tasks Generated** | 88 | 88 | Too many for one spec |
| **Tasks Completed** | 88 (100%) | 42 (48%) | -46 tasks |
| **Implementation Time** | 9 hours | ~6 hours | -3 hours (skipped testing) |
| **Testing Coverage** | Comprehensive | Basic only | Skipped 46 test tasks |
| **Physics Iterations** | 0 (planned) | 4 (actual) | Tuning not in plan |
| **Constitution Compliance** | Validated | Assumed | Not formally checked |

---

## Action Items for Next Session

### Immediate (Before P2)

1. **Complete Phase 8 validation** (T062-T088, 31 tasks)
   - Performance: Measure actual FPS, object count
   - Theme: 30-second playtester observation
   - Edge cases: Same-size collision, empty screen, max growth
   - Cross-browser: Chrome + Firefox minimum
   - Constitution: Verify all 5 articles complied with

2. **Update TASK-COMPLETION-AUDIT.md** with Phase 8 results

3. **Mark tasks.md with actual completion** (checkboxes updated)

### Process Changes (P2 and Beyond)

1. **Split compound requests** into separate specs
   - Ask user: "This sounds like 3 features - should I create 3 specs?"
   - Default to smallest reasonable spec scope
   - Link related specs with dependencies

2. **Enforce <2 day rule per spec** (constitution Article III)
   - If tasks exceed ~25-30, split the spec
   - One spec = one PR = one review cycle

3. **Don't skip validation phases**
   - Phase 8 is not optional
   - Build test time into estimates
   - Manual testing counts as "tasks completed"

4. **Update constitution** with "Spec Scope Principle"
   - Add explicit guidance on spec granularity
   - Define when to split vs combine
   - Reference this lessons-learned doc

---

## What We Learned About This Project

### LittleJS-Specific Insights

1. **Initialization**: `engineInit()` must be called explicitly (doesn't auto-start in 2021 version)
2. **Color objects**: Can't use `new Color()` at top level (LittleJS not loaded yet)
3. **Collision detection**: Auto-collision unreliable, manual distance checks work better
4. **Coordinate system**: Y=0 at bottom, increasing upward (opposite intuition)
5. **Physics tuning**: Required 4 iterations (0.2→0.08→0.03 moveSpeed, 0.9→0.75→0.5 damping)

### Game Design Insights

1. **Magnetic attraction**: Very sensitive to tuning
   - Too strong: vacuums everything, no skill
   - Too weak: invisible, no effect
   - Sweet spot: Short range (0.8-1.4 units), gentle pull
   - Must scale with player size to stay consistent

2. **Physics feel**: Precision beats realism for collection games
   - Katamari games have MORE damping than realistic (for control)
   - Lower acceleration = better aim at small targets
   - Player tolerance for "ice skating" is low

3. **Visual feedback critical**:
   - Grid reference made movement understandable
   - HUD made progression clear
   - Without references, player couldn't tell they were moving (camera follow illusion)

---

## Conclusion

**Spec 001 violated Spec-Kit principles by being too large**, but human-in-loop testing created a working, fun game despite the process breakdown.

**For P2**: Split features properly, complete all validation tasks, build quality into workflow.

**Status**: Feature functional but process needs improvement for next iteration.

---

**Next Step**: Complete Phase 8 validation (31 tasks) OR accept current state and document as "Functionally Complete, Comprehensive Testing Deferred"
