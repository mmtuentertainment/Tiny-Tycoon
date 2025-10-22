# CLAUDE.md - AI Development Guide for Tiny Tycoon

<!--
╔════════════════════════════════════════════════════════════════════════════╗
║                    TINY TYCOON AI ASSISTANT RULES                          ║
║                   LittleJS Game Jam 2025 - Theme: "SMALL"                  ║
║                     Ship Date: November 3, 2025 (T-12 days)                ║
╚════════════════════════════════════════════════════════════════════════════╝

This document is the SINGLE SOURCE OF TRUTH for AI assistants (Claude, Copilot,
etc.) working on Tiny Tycoon. It unifies:
- Constitution.md (2,464 lines, 60 FRs, 16 Articles)
- Spec-Kit Workflow (8 commands: specify→clarify→plan→tasks→implement→analyze)
- LittleJS Game Jam Requirements (Theme, Judging, Technical Constraints)
- Priority System (P1→P2→P3→P4, no feature creep)
- Research Foundation (10,503 lines across 7 docs)

Last Updated: 2025-10-22
Version: 1.0.0
-->

---

## 🎯 MISSION STATEMENT

**Build Tiny Tycoon to win LittleJS Game Jam 2025 by shipping a polished, theme-perfect Katamari business growth game on November 3, 2025.**

**Core Loop**: Start SMALL (0.5×0.5 units) → Collect objects → Grow exponentially → Reach 50+ units BIG
**Theme**: "SMALL" (40% of judging score)
**Status**: P1/P2 complete, P3 polish in progress (Features 001-006 done, 007-009 remaining)

---

## 📋 TABLE OF CONTENTS

1. [Quick Start (30 Seconds)](#quick-start-30-seconds)
2. [Working Directory Rules (CRITICAL)](#working-directory-rules-critical)
3. [Spec-Kit Workflow (MANDATORY)](#spec-kit-workflow-mandatory)
4. [Constitution Compliance](#constitution-compliance)
5. [Priority System (P1→P2→P3→P4)](#priority-system-p1p2p3p4)
6. [Game Jam Constraints](#game-jam-constraints)
7. [Technical Standards](#technical-standards)
8. [Decision Framework](#decision-framework)
9. [Common Tasks & Commands](#common-tasks--commands)
10. [Error Prevention](#error-prevention)

---

## 🚀 QUICK START (30 SECONDS)

### If you're NEW to this project:
1. **Read this entire file** (10 min investment saves hours)
2. **Navigate to project**: `cd "/home/matt/Game Development/games/game-jam-2025"`
3. **Read Constitution**: `.specify/memory/constitution.md` (2,464 lines - skim Articles I-III)
4. **Check status**: Section "Current Implementation Status" below
5. **Start workflow**: Pick a feature from P3 remaining list → `/speckit.specify [description]`

### If you're RETURNING:
1. **Navigate to project**: `cd "/home/matt/Game Development/games/game-jam-2025"`
2. **Check git status**: `git status` (see what changed)
3. **Check progress**: Review `.specify/specs/` for in-progress features
4. **Resume workflow**: Continue from where you left off

### If you're STUCK:
1. **Read Article VIII** (Constitution: Development Workflow)
2. **Use Decision Tree** (Section below: "When to Do What")
3. **Check Error Prevention** (Section 10)
4. **Ask user** before guessing

---

## ⚠️ WORKING DIRECTORY RULES (CRITICAL)

### THE #1 MISTAKE TO AVOID

**ALWAYS run commands from the PROJECT directory, NOT the workspace root!**

```bash
# ✅ CORRECT - Project directory
cd "/home/matt/Game Development/games/game-jam-2025"
/speckit.specify "Add feature"

# ❌ WRONG - Workspace root
cd "/home/matt/Game Development"
/speckit.specify "Add feature"  # Will target wrong files!
```

### Why This Matters

Running from wrong directory causes:
- ❌ Constitution overwrites (template replaces project file)
- ❌ Specs created in wrong location
- ❌ Agent context points to wrong project
- ❌ File paths resolve incorrectly

### Before EVERY Command

```bash
# 1. Verify current directory
pwd
# Expected: /home/matt/Game Development/games/game-jam-2025

# 2. If wrong, navigate first
cd "/home/matt/Game Development/games/game-jam-2025"

# 3. Then run Spec-Kit commands
/speckit.specify "Add particle effects"
```

### Protected Files

These files have ownership headers - NEVER overwrite:
- `.specify/memory/constitution.md` (2,464 lines, project-owned)
- `src/game.js` (1,508 lines, implementation)
- `package.json` (project configuration)

---

## 🔄 SPEC-KIT WORKFLOW (MANDATORY)

### The 6-Step Process

**Every feature MUST follow this workflow. No exceptions. No shortcuts.**

```
SPECIFY → CLARIFY → PLAN → TASKS → IMPLEMENT → ANALYZE
   ↓         ↓        ↓       ↓         ↓          ↓
 spec.md  questions plan.md tasks.md   code   validation
```

### Step 1: SPECIFY (`/speckit.specify [description]`)

**When**: Starting ANY new feature
**Creates**: `.specify/specs/[###-feature-name]/spec.md`
**Duration**: 5-10 minutes

**What it does**:
- Generates user stories (prioritized P1/P2/P3/P4)
- Creates acceptance criteria (Given/When/Then format)
- Validates theme compliance (Section 2.3 test)
- Estimates time (<2 days or reject)
- References Constitution FRs

**Example**:
```bash
cd "/home/matt/Game Development/games/game-jam-2025"
/speckit.specify "Add combo multiplier system that rewards collecting multiple objects quickly"
```

**Output**: `.specify/specs/007-add-combo-system/spec.md`

### Step 2: CLARIFY (`/speckit.clarify`)

**When**: Spec has ambiguities or questions
**Creates**: Updated spec.md with clarifications
**Duration**: 5-10 minutes

**What it does**:
- Agent asks up to 5 targeted questions
- Resolves edge cases before planning
- Prevents rework and wasted time
- Updates spec.md with answers

**When to skip**: Spec is crystal clear, no questions

### Step 3: PLAN (`/speckit.plan`)

**When**: Spec is approved and clear
**Creates**: `.specify/specs/[###-feature-name]/plan.md`
**Duration**: 10-20 minutes

**What it does**:
- Creates technical approach (LittleJS-specific)
- Validates Constitution compliance (checks FRs)
- References research docs (ULTRA-DEEP-RESEARCH PART 15)
- Identifies dependencies and risks
- Specifies file changes

**Constitution Check** (automatic):
- ✅ Validates against Article V (Technical Standards)
- ✅ Validates against Article XII (Class Specifications)
- ✅ Checks FR compliance
- ✅ References correct LittleJS patterns

### Step 4: TASKS (`/speckit.tasks`)

**When**: Plan is approved
**Creates**: `.specify/specs/[###-feature-name]/tasks.md`
**Duration**: 5-10 minutes

**What it does**:
- Breaks plan into atomic tasks (<1 hour each)
- Orders by dependency (critical path)
- Groups by user story (maintains independence)
- Creates testing checkpoints

**Task Format**:
```markdown
## TASK-001: Initialize SoundManager class
- [ ] Create src/SoundManager.js
- [ ] Add constructor with 5 sound pre-caching
- [ ] Test: Verify sounds load without errors
Time: 30 minutes
```

### Step 5: IMPLEMENT (`/speckit.implement`)

**When**: Tasks are ready
**Creates**: Code changes, git commits
**Duration**: Varies by feature (max 2 days per Constitution)

**What it does**:
- Executes tasks sequentially
- Manual test after EACH task
- Git commit after each task with descriptive message
- Updates task status (pending → in_progress → completed)

**Commit Message Format** (FR-040):
```bash
feat: implement size-based collision detection
fix: player bounces correctly when too small
docs: update Constitution with sprite tile map
```

**Testing Protocol**:
- ✅ Manual test after each task
- ✅ Verify in browser (run `npm run dev`)
- ✅ Check console for errors
- ✅ Test gameplay feel
- ❌ NO automated tests (time-constrained jam)

### Step 6: ANALYZE (`/speckit.analyze`)

**When**: Feature is complete
**Creates**: Analysis report
**Duration**: 5 minutes

**What it does**:
- Validates spec/plan/tasks/code alignment
- Identifies contradictions
- Ensures Constitution compliance
- Flags missing requirements

**Pass Criteria**:
- ✅ All acceptance criteria met
- ✅ Theme validation passes
- ✅ Constitution FRs satisfied
- ✅ No console errors
- ✅ Gameplay feels good

---

## 📜 CONSTITUTION COMPLIANCE

### The Constitution is LAW

**File**: `.specify/memory/constitution.md` (2,464 lines)
**Authority**: Supersedes all other documentation
**Structure**: 16 Articles, 40 Sections, 61 Functional Requirements (FR-001 to FR-060)

### Critical Articles (Read These)

| Article | Title | Audience | Why Critical |
|---------|-------|----------|--------------|
| **I** | Project Identity | All | Defines what we're building |
| **II** | Theme-First Development | All | 40% of judging = theme |
| **III** | Katamari Mechanics | Game Designers, Devs | Core gameplay loop |
| **V** | Technical Standards | Developers | Code must follow LittleJS patterns |
| **VIII** | Development Workflow | All | Mandatory Spec-Kit process |
| **XII** | Class Specifications | Developers | PlayerBall, Collectible implementations |
| **XV** | Priority System | All | P1→P2→P3→P4, no feature creep |

### Functional Requirements (FRs)

**Every feature must reference applicable FRs:**

**Core Mechanics (P1)**:
- FR-001: Player movement (WASD/arrows)
- FR-002: Momentum physics
- FR-003: Size-based collision (can only eat smaller)
- FR-004: Bounce when too small
- FR-005: Exponential growth formula
- FR-006: Magnetic attraction

**Level System (P2)**:
- FR-010: 3 levels (50×50, 100×100, 150×150)
- FR-011: Level progression
- FR-012: Win condition (reach size goal before timer)
- FR-013: Lose condition (timer expires)
- FR-014: Timer system

**Polish (P3)**:
- FR-030: Screen shake (value-scaled)
- FR-031: Particle effects
- FR-032: Popup text
- FR-033: ZzFX sound definitions
- FR-042: Named collectibles (20+ objects)

### Constitution Validation Checklist

Before implementing ANY feature, ask:
- [ ] Which FRs does this relate to?
- [ ] Which Article(s) govern this?
- [ ] Does this align with theme requirements (Article II)?
- [ ] Does this follow technical standards (Article V)?
- [ ] Is this the right priority (Article XV)?

---

## 🎯 PRIORITY SYSTEM (P1→P2→P3→P4)

### The Iron Law: Follow Priority Order

**P1 BEFORE P2. P2 BEFORE P3. P3 BEFORE P4. NO EXCEPTIONS.**

### P1 (CRITICAL - Week 1: Oct 14-20) ✅ COMPLETE

**Definition**: MUST ship for game to exist
**Status**: ✅ Done (Features 001-002)

**Features**:
- ✅ Player movement (WASD/arrows, momentum)
- ✅ Size-based collection (can only eat smaller objects)
- ✅ Exponential growth formula
- ✅ Magnetic attraction
- ✅ Basic collision physics

### P2 (IMPORTANT - Week 2: Oct 21-27) ✅ COMPLETE

**Definition**: Needed to win jam
**Status**: ✅ Done (Features 001-002)

**Features**:
- ✅ 3 levels with increasing difficulty
- ✅ Win condition (reach target size before timer)
- ✅ Lose condition (time expired)
- ✅ Level progression system
- ✅ Timer countdown
- ✅ Progressive spawning distribution

### P3 (POLISH - Week 3: Oct 28-Nov 2) ⚠️ IN PROGRESS

**Definition**: Differentiates good from great
**Status**: 🔄 78% complete (Features 003-007 done, 008-009 remaining)

**Completed** ✅:
- ✅ FR-030: Screen shake system (Feature 003)
- ✅ FR-033/034: ZzFX sound effects (Feature 004)
- ✅ FR-031: Particle effects (Feature 005)
- ✅ FR-042: Named collectibles - 20 objects (Feature 006)
- ✅ FR-043: Gen Alpha personality/tone (Feature 007) - **JUST DEPLOYED**

**Remaining** ⚠️:
- ⚠️ FR-051: Consumption log (Feature 008 - NOT STARTED)
- ⚠️ FR-050: Combo multiplier system (Feature 009 - NOT STARTED)

### P4 (POST-JAM - After Nov 3)

**Definition**: Future roadmap, not for jam submission
**Status**: ⏸️ Deferred

**Features**:
- Mobile touch controls
- Achievement system
- Leaderboards
- Additional levels (4-5)
- Multiplayer
- Social sharing

### Priority Decision Rules

**If feature takes >2 days**: CUT IT or simplify to <2 days
**If behind schedule**: Cut P3 features, preserve P1/P2
**If ahead of schedule**: Add more P3 polish, NOT P4 features
**If unsure**: Ask user which priority tier

---

## ⏰ GAME JAM CONSTRAINTS

### Non-Negotiable Deadlines

**Event**: LittleJS Game Jam 2025
**Theme**: "SMALL"
**Ship Date**: **November 3, 2025** (12 days remaining)
**Current Date**: October 22, 2025 (T-12 days)

### Milestone Gates (From Constitution Article VIII)

**✅ Week 1 Gate (Oct 20)**: P1 complete - Playable core loop exists
**✅ Week 2 Gate (Oct 27)**: P2 complete - All 3 levels working
**🔄 Week 3 Gate (Nov 1)**: P3 complete - Feature freeze, polish only
**🎯 Submission (Nov 3)**: Build, test, submit before deadline

### Judging Criteria (Constitution Article I, Section 1.2)

| Criteria | Weight | Our Strategy |
|----------|--------|--------------|
| **Theme Interpretation** | 40% | SMALL→BIG via Katamari mechanics |
| **Gameplay/Fun** | 30% | Katamari gameplay (proven fun) |
| **Innovation/Creativity** | 20% | Business theme + absurdist humor |
| **Polish/Presentation** | 10% | P3 features (shake, sound, particles) |

**Critical**: Theme is 40% of score. Every feature MUST validate against Article II, Section 2.3 (Theme Integration Test).

### Theme Validation Test (Article II, Section 2.3)

**Protocol**:
1. Player starts game with NO instructions
2. Plays for 30 seconds
3. Ask: "What is the theme?"
4. **Success**: 90%+ say "small to big", "growing", "starting small"

**Feature Checklist** (every feature):
- [ ] Does this make player feel SMALL at start?
- [ ] Does this create contrast between SMALL and BIG?
- [ ] Does this reward exponential growth?
- [ ] Can I explain how this relates to "SMALL" in one sentence?

### Time Management Rules

**From Constitution Article VIII, FR-038**:

**If Feature Takes >2 Days**:
1. CUT feature OR
2. Simplify to <2 days OR
3. Move to P4 backlog

**Scope Reduction Protocol** (if falling behind):
- **Day 7 (Oct 20)**: If core loop not playable → Reduce to single level ✅ Passed
- **Day 14 (Oct 27)**: If 3 levels not done → Ship with 2 levels ✅ Passed
- **Day 18 (Nov 1)**: If bugs remain → Fix bugs, cut polish features ⚠️ Critical Gate

### What to Ship On Nov 3

**Minimum Viable Jam Entry**:
- ✅ P1 features (core loop)
- ✅ P2 features (3 levels, progression)
- ⚠️ P3 features (as many as time allows)
- ❌ P4 features (cut completely)

**Quality Bar**:
- ✅ No console errors
- ✅ Runs at 60 FPS on mid-range devices
- ✅ Theme is obvious within 30 seconds
- ✅ Playable start-to-finish without bugs
- ✅ Fun for 5-10 minute session

---

## 💻 TECHNICAL STANDARDS

### LittleJS Engine Requirements (Article V, FR-018)

**Engine**: LittleJS from `/home/matt/Game Development/LittleJS/dist/littlejs.release.js`
**Version**: Latest (from workspace)
**Platform**: Browser (HTML5)
**Target**: 60 FPS, <1MB bundle size

### Code Standards (Constitution Compliance)

**Language**: JavaScript ES6+ (const/let, arrow functions, classes)
**Style**: 4-space indent, descriptive names, comments for complex logic
**Classes**: Use `class X extends EngineObject` pattern
**State**: Avoid globals, use class properties

### LittleJS Idioms (MANDATORY - Article V, FR-018)

```javascript
// ✅ CORRECT - LittleJS idioms
class PlayerBall extends EngineObject {
    constructor(pos) {
        super(pos, vec2(0.5, 0.5));  // Use vec2 for vectors
        this.mass = 0.25;
        this.damping = 0.5;
    }

    update() {
        super.update();  // MUST call parent update
        // Custom logic here
    }
}

// ✅ CORRECT - Use LittleJS's built-in functions
const moveInput = vec2(
    keyIsDown('ArrowRight') - keyIsDown('ArrowLeft'),
    keyIsDown('ArrowUp') - keyIsDown('ArrowDown')
);

// ❌ WRONG - Don't reinvent LittleJS wheels
const moveInput = {
    x: (keys['ArrowRight'] ? 1 : 0) - (keys['ArrowLeft'] ? 1 : 0),
    y: (keys['ArrowUp'] ? 1 : 0) - (keys['ArrowDown'] ? 1 : 0)
};  // Don't do this!
```

### Class Specifications (Article XII)

**Required Classes**:
1. **PlayerBall** (FR-053) - Player character, extends EngineObject
2. **Collectible** (FR-055) - Objects to collect, extends EngineObject

**Optional Classes** (if needed):
3. **SoundManager** (FR-034) - Manages ZzFX sounds
4. **PopupTextManager** (FR-032) - Collection feedback popups
5. **LevelManager** (FR-057) - Level state and transitions

### File Structure

```
game-jam-2025/
├── src/
│   └── game.js                    # Main game file (1,508 lines)
├── assets/
│   └── sprites.png                # 256×256 sprite sheet (if used)
├── docs/                          # Research documentation (10,503 lines)
│   ├── ULTRA-DEEP-RESEARCH.md     # Implementation guide (6,876 lines)
│   ├── SOURCE-OF-TRUTH.md         # Core specs (1,033 lines)
│   └── [6 other docs]
├── .specify/
│   ├── memory/
│   │   └── constitution.md        # Single source of truth (2,464 lines)
│   ├── specs/
│   │   └── 00X-feature-name/      # Feature specifications
│   └── scripts/                   # Workflow automation
├── index.html                     # Entry point
├── package.json                   # Dependencies
└── CLAUDE.md                      # This file (YOU ARE HERE)
```

### Performance Requirements (Article V, FR-020)

**Targets**:
- 60 FPS on mid-range devices (2019+ laptops)
- <1MB total bundle size (LittleJS + game code + assets)
- <200ms load time
- Works in Chrome, Firefox, Safari (latest 2 versions)

**Optimization Rules**:
- Use object pooling for collectibles
- Limit particle count (FR-005-013: max 500 particles)
- Avoid `Array.filter()` in game loop (use for loops)
- Cache expensive calculations
- Profile with browser DevTools if FPS drops

---

## 🧭 DECISION FRAMEWORK

### When to Do What

```
┌─────────────────────────────────────────────────────────────┐
│ SITUATION: Starting new feature                             │
├─────────────────────────────────────────────────────────────┤
│ 1. Check if feature is P1/P2/P3/P4 priority                │
│ 2. If P4 → REJECT (post-jam only)                          │
│ 3. If P3 and time is short → Ask user to confirm           │
│ 4. If P1/P2 → Proceed with /speckit.specify                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SITUATION: Feature is taking >2 days                        │
├─────────────────────────────────────────────────────────────┤
│ 1. STOP immediately                                         │
│ 2. Ask: "Can we simplify this to <2 days?"                 │
│ 3. If YES → Simplify and continue                          │
│ 4. If NO → CUT feature, move to P4                         │
│ 5. Document cut decision in constitution changelog         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SITUATION: User asks to skip Spec-Kit workflow             │
├─────────────────────────────────────────────────────────────┤
│ 1. Politely REFUSE                                          │
│ 2. Explain: Constitution Article VIII, FR-036 mandates it  │
│ 3. Offer: "I can run the workflow quickly (20 min total)"  │
│ 4. If user insists → Get explicit written confirmation     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SITUATION: Constitution conflicts with user request        │
├─────────────────────────────────────────────────────────────┤
│ 1. Point out conflict (cite Article + FR number)           │
│ 2. Explain WHY Constitution has this rule                  │
│ 3. Suggest alternative that satisfies both                 │
│ 4. If user wants to override → Amend constitution first    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SITUATION: Unsure if feature fits theme                    │
├─────────────────────────────────────────────────────────────┤
│ 1. Run Article II, Section 2.3 checklist                   │
│ 2. Ask: "Does this make player feel SMALL?"                │
│ 3. Ask: "Does this create SMALL→BIG contrast?"             │
│ 4. If both NO → Feature doesn't support theme              │
│ 5. Suggest alternatives that reinforce theme               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SITUATION: Bug found in existing code                      │
├─────────────────────────────────────────────────────────────┤
│ 1. Assess severity: Game-breaking? Annoying? Minor?        │
│ 2. If game-breaking → FIX IMMEDIATELY                      │
│ 3. If annoying → Add to task list, fix in priority order   │
│ 4. If minor → Document, defer to post-jam                  │
│ 5. Use commit message: "fix: [description]"                │
└─────────────────────────────────────────────────────────────┘
```

### Priority Trade-Off Rules (From Constitution Article VIII)

When in doubt, follow these:
1. **Playable > Pretty** - Mechanics before art
2. **Manual testing > Automated testing** - Time-constrained
3. **Code shapes > Sprite art** - If time is short
4. **3 levels minimum > 5 levels ideal** - Ship what works
5. **Core loop > Polish** - P1/P2 before P3/P4

---

## 🛠️ COMMON TASKS & COMMANDS

### Daily Workflow

```bash
# 1. START OF SESSION - Navigate to project
cd "/home/matt/Game Development/games/game-jam-2025"

# 2. Check what changed
git status
git log --oneline -5

# 3. Check current progress
ls .specify/specs/  # See all features
cat .specify/specs/00X-feature-name/tasks.md  # Check task status

# 4. Pick next task
# If starting new feature:
/speckit.specify "Feature description"

# If continuing feature:
/speckit.implement  # Continue from last task

# 5. Test changes
# Testing happens AUTOMATICALLY via Vercel deployment!
# Every push triggers automatic deployment to Vercel
# Check live game at: https://game-jam-2025.vercel.app

# Optional: Local testing
npm run dev  # Start local server on port 8000
# Open browser to http://localhost:8000

# 6. Commit changes
git add .
git commit -m "feat: descriptive message"
git push origin 00X-feature-name

# 7. DEPLOY TO PRODUCTION (merge to master)
git checkout master
git merge 00X-feature-name
# Resolve conflicts if needed (see Vercel Deployment Workflow section)
git push origin master  # ← Triggers Vercel auto-deploy!

# 8. TEST ON LIVE URL
# Wait 30-60 seconds, then visit: https://game-jam-2025.vercel.app
# Hard refresh browser: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

# 9. END OF SESSION - Update status
# Update constitution.md Section 15.2 if major milestone reached
```

### Spec-Kit Commands (Full Reference)

```bash
# 1. Create new feature specification
/speckit.specify "Add combo multiplier that rewards fast collection"

# 2. Ask clarifying questions about spec
/speckit.clarify

# 3. Create technical implementation plan
/speckit.plan

# 4. Break plan into atomic tasks
/speckit.tasks

# 5. Execute implementation tasks
/speckit.implement

# 6. Validate alignment (spec → plan → tasks → code)
/speckit.analyze

# 7. Manage project constitution (CAREFUL - protected file)
/speckit.constitution

# 8. Generate quality checklist
/speckit.checklist
```

### Git Workflow

```bash
# Create feature branch (format: ###-feature-name)
git checkout -b 007-add-gen-alpha-personality

# Stage changes
git add src/game.js
git add .specify/specs/007-add-gen-alpha-personality/

# Commit with conventional format
git commit -m "feat: add Gen Alpha flavor text to victory screens

- Replace generic victory text with brain-rot energy phrases
- Add skibidi references and ironic capitalism commentary
- Passes Article II theme validation
- Implements FR-043 (Gen Alpha Tone)

Refs: #007"

# Push to remote
git push origin 007-add-gen-alpha-personality

# When feature complete, merge to master
git checkout master
git merge 007-add-gen-alpha-personality
git push origin master
```

### Vercel Deployment Workflow

**IMPORTANT**: Vercel auto-deploys ONLY from `master` branch!

**Standard Workflow** (Feature Branch → Master → Auto-Deploy):

```bash
# 1. Work on feature branch
git checkout 00X-feature-name
git add src/game.js
git commit -m "feat: add new feature"
git push origin 00X-feature-name  # Creates preview deployment (optional)

# 2. Merge to master (REQUIRED for production auto-deploy)
git checkout master
git merge 00X-feature-name

# If conflicts occur (common when master has skeleton):
git checkout --theirs src/game.js .specify/ .claude/  # Take feature branch versions
git add -A
git commit -m "Merge branch '00X-feature-name'"

# 3. Push to master (triggers AUTO-DEPLOY)
git push origin master  # ← Vercel deploys automatically!

# 4. Wait 30-60 seconds for deployment

# 5. Test live game at production URL
# https://game-jam-2025.vercel.app
```

**Live Testing URLs**:
- **Production**: https://game-jam-2025.vercel.app (← Test here!)
- **Alt 1**: https://game-jam-2025-matthew-utts-projects-89452c41.vercel.app
- **Alt 2**: https://game-jam-2025-mmtuentertainment-matthew-utts-projects-89452c41.vercel.app

**Check Deployment Status**:
```bash
vercel ls  # List recent deployments
vercel inspect [deployment-url]  # Check specific deployment
```

**Manual Deploy** (if auto-deploy fails):
```bash
git checkout master  # Ensure on master
vercel --prod --yes  # Deploy to production immediately
```

**Common Merge Conflicts Resolution**:
```bash
# When merging feature branch to master (skeleton conflicts):
git checkout master
git merge 00X-feature-name  # Conflicts appear

# Resolve by taking feature branch version (our code, not skeleton):
git checkout --theirs src/game.js          # Take our implementation
git checkout --theirs .specify/            # Take our specs
git checkout --theirs .claude/commands/    # Take our commands
git checkout --theirs index.html build.js  # Take our build files
git add -A
git commit -m "Merge feature branch (resolved conflicts)"
git push origin master  # Auto-deploys!
```

**Browser Cache**: Always hard refresh (Ctrl+Shift+R) after deployment to see changes!

### Testing Checklist

After implementing ANY feature:
- [ ] No console errors (F12 in browser)
- [ ] Game runs at 60 FPS (check DevTools Performance tab)
- [ ] Feature works as specified (test acceptance criteria)
- [ ] Theme is still obvious (30-second test)
- [ ] All 3 levels still playable
- [ ] Win/lose conditions still work
- [ ] No regression bugs
- [ ] **Test on live Vercel URL** (https://game-jam-2025.vercel.app)

---

## 🚨 ERROR PREVENTION

### Common Mistakes & How to Avoid

#### 1. Working Directory Wrong

**Symptom**: Spec-Kit commands target wrong files, constitution gets overwritten
**Prevention**:
- ALWAYS `cd "/home/matt/Game Development/games/game-jam-2025"` first
- Run `pwd` to verify
- Check for ownership header in constitution.md

#### 2. Skipping Spec-Kit Workflow

**Symptom**: Code doesn't align with Constitution, rework required
**Prevention**:
- NEVER code without spec
- Follow all 6 steps (no shortcuts)
- Constitution Article VIII, FR-036 mandates this

#### 3. Feature Creep

**Symptom**: Adding P4 features when P3 isn't done
**Prevention**:
- Check priority before starting feature
- If P4 → REJECT
- Focus on P3 remaining: Features 007-009

#### 4. Ignoring Theme

**Symptom**: Feature doesn't support "SMALL" theme
**Prevention**:
- Run Article II, Section 2.3 checklist for EVERY feature
- Ask: "Does this make player feel SMALL?"
- Theme is 40% of judging score

#### 5. Time Blindness

**Symptom**: Feature taking >2 days, deadline at risk
**Prevention**:
- Estimate before starting (in spec.md)
- Check time daily
- If >2 days → CUT or simplify

#### 6. LittleJS Anti-Patterns

**Symptom**: Code doesn't work, fights framework
**Prevention**:
- Read Article V, FR-018 (LittleJS idioms)
- Use `vec2()` for vectors (not `{x, y}`)
- Extend EngineObject for game objects
- Call `super.update()` in update methods

#### 7. Constitution Violations

**Symptom**: Code rejected by `/speckit.analyze`
**Prevention**:
- Reference Constitution FRs in every spec
- Run Constitution Check in plan.md
- Validate against Article V (Technical Standards)

### What to Do When Stuck

1. **Read Constitution** - Article relevant to your task
2. **Check Research Docs** - ULTRA-DEEP-RESEARCH.md PART 15 has code examples
3. **Run `/speckit.clarify`** - Agent will ask targeted questions
4. **Ask User** - Explain what you're stuck on, suggest options
5. **Check Examples** - Look at Features 001-006 for patterns

---

## 📊 CURRENT IMPLEMENTATION STATUS

### ✅ COMPLETED (Features 001-006)

**P1 (Core Loop)** - Week 1:
- ✅ Feature 001: Foundational Katamari Mechanic
  - Player movement (WASD/arrows)
  - Size-based collection
  - Exponential growth
  - Magnetic attraction
  - FR-001 to FR-009

**P2 (Full Game)** - Week 2:
- ✅ Feature 002: Level Progression System
  - 3 levels (50×50, 100×100, 150×150)
  - Win/lose conditions
  - Timer countdown
  - Progressive spawning
  - FR-010 to FR-017

**P3 (Polish)** - Week 3 (PARTIAL):
- ✅ Feature 003: Screen Shake Feedback
  - Value-scaled shake on collection
  - Victory shake
  - FR-030

- ✅ Feature 004: ZzFX Sound System
  - 5 sounds (collect, tierUp, victory, defeat, timerWarning)
  - Pitch scaling by value
  - FR-033, FR-034

- ✅ Feature 005: Particle Effects
  - Collection bursts
  - Tier-up explosions
  - Magnetic trail
  - FR-031

- ✅ Feature 006: Named Collectibles
  - 20 objects (penny → space rocket)
  - Popup text with currency formatting
  - FR-042, FR-032 (partial)

- ✅ Feature 007: Gen Alpha Personality
  - Level-specific victory text (Broke Era → Influencer → Oligarch)
  - Game complete maximum absurdity ("YOU WON CAPITALISM")
  - Defeat screen minimal irony ("GRIND INTERRUPTED 💀")
  - HUD level subtitles
  - "Biggest W" stat tracking
  - FR-043

### ⚠️ REMAINING (Features 008-009)

**Current Focus**: Complete final 2 P3 polish features

**Feature 008: Consumption Log** (NOT STARTED):
- Victory screen shows what you collected
- "You consumed: TEACHER, YACHT, ROCKET"
- Shareability moment
- FR-051
- **Estimate**: 6 hours

**Feature 009: Combo Multiplier System** (NOT STARTED):
- Reward fast collection (multi-collect within 300ms)
- Multiplier display
- Audio/visual feedback
- FR-050
- **Estimate**: 8 hours

### 📅 Remaining Schedule

**Today (Oct 22)** - UPDATED:
- ✅ Feature 007 COMPLETE (took 1.5 hours)
- Feature 008 (6 hours remaining today)

**Tomorrow (Oct 23-Oct 31)**:
- Feature 009 (8 hours)
- Bug fixes (4 hours)
- Playtesting (4 hours)
- **Total**: 16 hours

**Final Sprint (Nov 1-3)**:
- Feature freeze (Nov 1)
- Polish & optimization (8 hours)
- Build production (2 hours)
- Submit to jam (Nov 3)

---

## 🎓 LEARNING RESOURCES

### Key Documents (Read in Order)

1. **This file** (CLAUDE.md) - Start here
2. **Constitution** (.specify/memory/constitution.md) - Articles I, II, III, VIII, XV
3. **ULTRA-DEEP-RESEARCH** (docs/ULTRA-DEEP-RESEARCH.md PART 15) - Code examples
4. **SOURCE-OF-TRUTH** (docs/SOURCE-OF-TRUTH.md) - Core specifications
5. **Spec-Kit README** (.specify/README.md) - Workflow details

### External Resources

- **LittleJS Docs**: https://github.com/KilledByAPixel/LittleJS
- **LittleJS Examples**: Check workspace `../../LittleJS/examples/`
- **ZzFX Sound Designer**: https://killedbyapixel.github.io/ZzFX/
- **Piskel Sprite Editor**: https://www.piskelapp.com/
- **Game Jam Page**: https://itch.io/jam/littlejs-game-jam-2025

### Constitution Quick Reference

**Most Important FRs**:
- FR-001 to FR-009: Core mechanics (P1)
- FR-030: Screen shake (P3)
- FR-031: Particles (P3)
- FR-032: Popup text (P3)
- FR-033/034: Sound system (P3)
- FR-042: Named collectibles (P3)
- FR-043: Gen Alpha tone (P3)

**Most Important Articles**:
- Article II: Theme validation (40% of judging)
- Article V: Technical standards (LittleJS idioms)
- Article VIII: Workflow enforcement (Spec-Kit)
- Article XV: Priority system (P1→P2→P3→P4)

---

## 🚀 FINAL REMINDERS

### Before EVERY Task

1. ✅ Navigate to project directory
2. ✅ Check current branch (`git branch`)
3. ✅ Verify working directory (`pwd`)
4. ✅ Review Constitution (relevant Articles)
5. ✅ Follow Spec-Kit workflow (no shortcuts)

### Quality Bar

**Every feature MUST**:
- ✅ Support "SMALL" theme (Article II, Section 2.3)
- ✅ Follow LittleJS idioms (Article V, FR-018)
- ✅ Complete in <2 days (Article VIII, FR-038)
- ✅ Reference Constitution FRs
- ✅ Pass manual testing
- ✅ No console errors
- ✅ Maintain 60 FPS

### The Mission

**Ship Tiny Tycoon on November 3, 2025 with:**
- ✅ Perfect theme execution (40% of score)
- ✅ Katamari gameplay (30% of score - proven fun)
- ✅ Business twist (20% of score - innovative)
- ✅ Polish and juice (10% of score - P3 features)

**We have 12 days. Let's win this jam.**

---

**End of CLAUDE.md v1.0.0**
**Questions? Check Constitution Article XIII (Governance) or ask user.**
**Uncertain? Check Decision Framework (Section 8) or ask user.**
**Stuck? Check Error Prevention (Section 10) or ask user.**

**Let's build something amazing. 🎮🚀**
