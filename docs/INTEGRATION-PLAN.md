# Knowledge Base → Research Document Integration Plan

**Created:** October 14, 2025
**Purpose:** Systematically integrate knowledge-base/ LittleJS implementation code into ULTRA-DEEP-RESEARCH.md

---

## AUDIT RESULTS

### Research Document Structure (25 PARTS, 3,359 lines)
1. PART 1: Katamari Damacy Deep Dive
2. PART 2: Business Tycoon Games Analysis
3. PART 3: Gen Alpha Psychology
4. PART 4: Game Juice & Polish
5. PART 5: Progression Systems
6. PART 6: LittleJS Engine Technical Deep Dive ⚠️ **NEEDS INTEGRATION**
7. PART 7: Level Design & Content
8. PART 8: Viral Mechanics
9. PART 9: Development Roadmap
10. PART 10: Competitive Analysis
11. PART 11: Risk Analysis
12. PART 12: Market Opportunity
13. PART 13: Final Concept Refinement
14. PART 14: Post-Jam Vision
15. PART 15: Game Architecture & Code Structure ⚠️ **NEEDS INTEGRATION**
16. PART 16: Difficulty Curves & Flow State
17. PART 17: Player Psychology & Retention
18. PART 18: Community Building
19. PART 19: Accessibility
20. PART 20: Onboarding & FTUE
21. PART 21: Sound Design & Adaptive Music ⚠️ **NEEDS INTEGRATION**
22. PART 22: Ethical Monetization
23. PART 23: Speedrunning
24. PART 24: Environmental Storytelling
25. PART 25: Analytics & Data-Driven Design

### Knowledge Base Files (9 files, 4,796 lines)
1. `01-littlejs/01-engine-overview.md` (12,825 lines of data)
2. `01-littlejs/03-physics-collision.md` (16,958 lines of data)
3. `02-spec-kit/01-methodology-overview.md`
4. `03-game-jam/01-jam-overview.md`
5. `04-integration/01-sdd-for-game-dev.md`
6. `05-quick-reference/game-jam-checklist.md`
7. `05-quick-reference/littlejs-api-cheatsheet.md`
8. `KNOWLEDGE-BASE-COMPLETE.md`
9. `README.md`

---

## INTEGRATION MAPPING MATRIX

### HIGH PRIORITY (Code-Heavy Sections)

| Research Section | Knowledge Base Source | Integration Type | Lines | Status |
|-----------------|----------------------|------------------|-------|--------|
| PART 6: LittleJS Engine | `01-littlejs/01-engine-overview.md` | Full code replacement | ~350 | 🔴 TODO |
| PART 15: Game Architecture | `01-littlejs/01-engine-overview.md` + `03-physics-collision.md` | Add working classes | ~200 | 🔴 TODO |
| PART 21: Sound Design | `01-littlejs/01-engine-overview.md` (Audio section) | Add ZzFX examples | ~100 | 🔴 TODO |
| PART 1: Physics (lines 93-103) | `01-littlejs/03-physics-collision.md` | Replace with real API | ~150 | 🔴 TODO |

### MEDIUM PRIORITY (Enhancement Sections)

| Research Section | Knowledge Base Source | Integration Type | Status |
|-----------------|----------------------|------------------|--------|
| PART 4: Game Juice | `01-littlejs/03-physics-collision.md` (Particle examples) | Add particle code | 🟡 Optional |
| PART 7: Level Design | `05-quick-reference/littlejs-api-cheatsheet.md` | Add tile system code | 🟡 Optional |
| PART 9: Development Roadmap | `03-game-jam/01-jam-overview.md` | Cross-reference dates | 🟡 Optional |

### LOW PRIORITY (Reference Only)

| Research Section | Knowledge Base Source | Integration Type | Status |
|-----------------|----------------------|------------------|--------|
| PART 14: Post-Jam Vision | `04-integration/01-sdd-for-game-dev.md` | Add SpecKit workflow | 🟢 Nice-to-have |
| PART 13: Final Refinement | `05-quick-reference/game-jam-checklist.md` | Add checklist reference | 🟢 Nice-to-have |

---

## ATOMIC INTEGRATION TASKS

### TASK GROUP 1: Fix Physics Section (PART 1 & PART 6)
**Goal:** Replace conceptual physics with real LittleJS code

#### Task 1.1: Read Current Physics Section
- [ ] Read lines 75-130 of ULTRA-DEEP-RESEARCH.md (PART 1, Physics subsection)
- [ ] Identify all placeholder code blocks
- [ ] Note current line numbers for replacement

#### Task 1.2: Extract Physics Code from Knowledge Base
- [ ] Read `01-littlejs/03-physics-collision.md` lines 1-300
- [ ] Extract EngineObject class structure (lines 44-71)
- [ ] Extract collision callback examples (lines 130-225)
- [ ] Extract mass-based collision code (lines 154-180)

#### Task 1.3: Replace Physics Section in Research Doc
- [ ] Replace lines 93-103 (LittleJS capabilities list) with real EngineObject class
- [ ] Replace lines 106-130 (Technical Implementation) with working PlayerBall + Collectible classes
- [ ] Add collision detection code from knowledge base
- [ ] Verify code compiles (syntax check)

#### Task 1.4: Verify Physics Integration
- [ ] Re-read updated section
- [ ] Confirm all code blocks are valid LittleJS
- [ ] Check that no placeholder comments remain
- [ ] Cross-reference with knowledge base for accuracy

---

### TASK GROUP 2: Expand LittleJS Engine Section (PART 6)
**Goal:** Add comprehensive engine documentation with code

#### Task 2.1: Audit Current PART 6
- [ ] Read lines 589-890 of ULTRA-DEEP-RESEARCH.md
- [ ] Identify subsections that exist
- [ ] Identify missing subsections (audio, particles, input)
- [ ] Map to knowledge base content

#### Task 2.2: Add Engine Overview Content
- [ ] Read `01-littlejs/01-engine-overview.md` lines 1-200
- [ ] Extract "Getting Started" section (lines 136-193)
- [ ] Extract "Creating Game Objects" section (lines 195-end)
- [ ] Integrate into PART 6 at appropriate location

#### Task 2.3: Add Complete Game Initialization Code
- [ ] Extract full game structure from knowledge base (lines 157-192)
- [ ] Add engineInit() example with all callbacks
- [ ] Add complete EngineObject class example
- [ ] Add gameInit/gameUpdate/gameRender pattern

#### Task 2.4: Verify Engine Section
- [ ] Re-read updated PART 6
- [ ] Confirm it matches knowledge base structure
- [ ] Check for completeness (all major systems covered)

---

### TASK GROUP 3: Complete Game Architecture (PART 15)
**Goal:** Add working class implementations for Tiny Tycoon

#### Task 3.1: Read Current Architecture Section
- [ ] Read lines 1694-1868 of ULTRA-DEEP-RESEARCH.md
- [ ] Identify conceptual vs. implementable code
- [ ] Note folder structure section (needs verification)

#### Task 3.2: Create PlayerBall Class (Full Implementation)
- [ ] Use knowledge base physics patterns
- [ ] Add collision detection (collideWithObject)
- [ ] Add growth mechanics (collect(), checkTierUp())
- [ ] Add celebration effects (particles, sound, shake)
- [ ] Add size-based movement speed scaling
- [ ] Include complete constructor with all physics properties

#### Task 3.3: Create Collectible Class (Full Implementation)
- [ ] Use EngineObject pattern from knowledge base
- [ ] Add magnetic attraction logic
- [ ] Add size threshold checking
- [ ] Add data-driven COLLECTIBLE_DATA structure
- [ ] Include sprite/rendering setup

#### Task 3.4: Create Competitor Class (AI Component)
- [ ] Add AI state machine (patrol, chase, flee)
- [ ] Add collision detection for player
- [ ] Add size comparison logic
- [ ] Include pathfinding logic

#### Task 3.5: Create Level Manager
- [ ] Add level data structure
- [ ] Add spawn system for collectibles
- [ ] Add tier gates/triggers
- [ ] Include level progression logic

#### Task 3.6: Verify Architecture Section
- [ ] Compile-check all classes
- [ ] Ensure parent-child relationships work
- [ ] Cross-reference with knowledge base patterns
- [ ] Verify folder structure matches workspace-config.json

---

### TASK GROUP 4: Sound System Implementation (PART 21)
**Goal:** Add ZzFX code examples and audio system

#### Task 4.1: Read Current Sound Section
- [ ] Read lines 2479-2617 of ULTRA-DEEP-RESEARCH.md
- [ ] Identify ZzFX references
- [ ] Note placeholder sound code

#### Task 4.2: Add ZzFX Sound Definitions
- [ ] Create sound_collect with pitch scaling
- [ ] Create sound_tierUp celebration
- [ ] Create sound_collision for bouncing
- [ ] Create sound_ambient background
- [ ] Add volume/pitch/pan examples

#### Task 4.3: Add Adaptive Music System
- [ ] Extract music layer code from knowledge base if available
- [ ] Add layer mixing based on tier
- [ ] Add crossfade logic
- [ ] Include ZzFXM integration pattern

#### Task 4.4: Verify Sound Section
- [ ] Check all ZzFX arrays are valid
- [ ] Verify positional audio code
- [ ] Cross-reference with LittleJS audio API

---

### TASK GROUP 5: Build System Documentation (NEW SECTION)
**Goal:** Add missing build system info to research doc

#### Task 5.1: Extract Build Info from Knowledge Base
- [ ] Read engine-overview.md for build system
- [ ] Note NPM scripts
- [ ] Note build.js information
- [ ] Note compression tools (Closure, UglifyJS, ECT)

#### Task 5.2: Add Build Section to Research Doc
- [ ] Add "PART 26: BUILD & DEPLOYMENT" section
- [ ] Include package.json structure
- [ ] Include build.js script
- [ ] Include dev server setup (Python http.server)
- [ ] Include compression pipeline

#### Task 5.3: Verify Build Section
- [ ] Cross-reference with actual game-jam-2025/package.json
- [ ] Ensure all scripts are accurate
- [ ] Verify tool versions/availability

---

## VERIFICATION CHECKLIST

After completing all tasks, perform final verification:

### Code Quality Checks
- [ ] All code blocks use correct LittleJS API
- [ ] All classes extend EngineObject properly
- [ ] All vec2() calls use correct syntax
- [ ] All tile() calls use correct parameters
- [ ] All setCollision() calls use correct boolean order

### Completeness Checks
- [ ] Every PART with code has working examples
- [ ] No placeholder comments like "// TODO" remain
- [ ] All knowledge base code patterns are represented
- [ ] Physics section has full collision code
- [ ] Architecture section has complete classes
- [ ] Sound section has real ZzFX arrays

### Cross-Reference Checks
- [ ] Research doc matches knowledge base API
- [ ] Research doc matches workspace-config.json structure
- [ ] Research doc matches actual game-jam-2025 folder
- [ ] All file paths reference correct locations

### Final Read-Through
- [ ] Read entire ULTRA-DEEP-RESEARCH.md start to finish
- [ ] Note any remaining inconsistencies
- [ ] Verify flow and coherence
- [ ] Check that document is now actionable (can code from it)

---

## EXECUTION ORDER

Execute task groups in this order for maximum efficiency:

1. **TASK GROUP 1** (Physics) - Foundation for everything else
2. **TASK GROUP 3** (Architecture) - Builds on physics
3. **TASK GROUP 2** (Engine) - Reference material
4. **TASK GROUP 4** (Sound) - Polish layer
5. **TASK GROUP 5** (Build) - Deployment info
6. **VERIFICATION** - Final quality check

**Estimated Time:** 2-3 hours for complete integration
**Priority:** Complete Groups 1-3 for minimum viable integration

---

## SUCCESS CRITERIA

Integration is complete when:
1. ✅ All code in research doc is copy-paste ready LittleJS code
2. ✅ Knowledge base patterns are fully represented
3. ✅ No placeholder or conceptual code remains in implementation sections
4. ✅ Document can be used to build Tiny Tycoon without external references
5. ✅ Cross-verification passes 100%
