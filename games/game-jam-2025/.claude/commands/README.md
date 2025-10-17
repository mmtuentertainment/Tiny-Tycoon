# Spec-Kit Slash Commands for Tiny Tycoon

**Status**: ✅ Installed and Ready
**Location**: `.claude/commands/`
**Auto-Discovery**: Claude Code automatically discovers these commands

---

## Available Commands

### Core Workflow (Use in Order):

1. **/speckit.specify** [feature description]
   - Creates feature specification with user stories
   - Generates `.specify/specs/[###-feature-name]/spec.md`
   - Creates feature branch
   - **Example**: `/speckit.specify Add screen shake feedback system`

2. **/speckit.clarify**
   - Asks up to 5 clarifying questions
   - Resolves ambiguities in spec
   - Updates spec.md with answers
   - **Use before planning** to reduce rework

3. **/speckit.plan**
   - Creates technical implementation plan
   - Generates `plan.md` in feature directory
   - Includes Constitution Check
   - **Use after spec is clarified**

4. **/speckit.tasks**
   - Breaks plan into atomic tasks (<1 hour each)
   - Generates `tasks.md` with dependencies
   - Orders by critical path
   - **Use after plan is validated**

5. **/speckit.implement**
   - Executes all tasks sequentially
   - Tests after each task
   - Updates task status
   - Commits code
   - **Use after tasks are generated**

### Optional Commands:

6. **/speckit.analyze**
   - Validates spec→plan→tasks→code alignment
   - Checks Constitution compliance
   - Generates analysis report
   - **Use after implementation** to verify quality

7. **/speckit.constitution** [principles]
   - Updates project Constitution
   - **Current**: v2.1.0 is complete
   - **Use only if**: Major change needed (rare!)

---

## Quick Start

**To implement a new feature**:

```bash
# 1. Specify what you want:
/speckit.specify Add screen shake visual feedback on object collection

# 2. Clarify any ambiguities (optional):
/speckit.clarify

# 3. Create technical plan:
/speckit.plan

# 4. Break into tasks:
/speckit.tasks

# 5. Implement:
/speckit.implement

# 6. Validate (optional):
/speckit.analyze
```

---

## For Tiny Tycoon: Ready-Made Specs

**You already have 7 P3 specs ready** (created manually, skip step 1):

1. **003-add-screen-shake-feedback** - Screen shake system ✅
2. **004-add-zzfx-sound-system** - Sound effects + SoundManager ✅
3. **005-add-particle-effects** - Particle bursts ✅
4. **006-add-named-collectibles** - Named objects (PENNY, TEACHER, YACHT) ✅
5. **007-add-gen-alpha-personality** - Ironic humor text ✅
6. **008-add-consumption-log** - Victory stats ✅
7. **009-add-combo-system** - Combo multipliers ✅

**To implement these**:

```bash
# Navigate to spec folder:
cd .specify/specs/003-add-screen-shake-feedback

# Start from step 3 (spec already exists):
/speckit.plan

# Then continue workflow...
/speckit.tasks
/speckit.implement
```

---

## Command Details

### /speckit.specify

**Purpose**: Create feature specification
**Input**: Feature description
**Output**: `spec.md` with user stories, requirements, success criteria
**Time**: 5-15 minutes (agent generates spec)

### /speckit.clarify

**Purpose**: Resolve ambiguities
**Input**: None (analyzes current spec)
**Output**: Clarifications section added to spec.md
**Time**: 2-5 minutes (agent asks questions)

### /speckit.plan

**Purpose**: Create technical approach
**Input**: Tech stack preferences (optional)
**Output**: `plan.md` with architecture, code structure, integration points
**Time**: 10-20 minutes (agent generates plan)

### /speckit.tasks

**Purpose**: Break into atomic tasks
**Input**: None (uses plan.md)
**Output**: `tasks.md` with ordered task list
**Time**: 5-10 minutes (agent breaks down plan)

### /speckit.implement

**Purpose**: Execute implementation
**Input**: None (uses tasks.md)
**Output**: Code files, updated tasks.md, git commits
**Time**: Varies (depends on feature complexity, 30min - 3hrs typical)

### /speckit.analyze

**Purpose**: Validate consistency
**Input**: None (analyzes all artifacts)
**Output**: Analysis report with recommendations
**Time**: 2-5 minutes (agent validates)

### /speckit.constitution

**Purpose**: Update governing principles
**Input**: Principles description
**Output**: Updated constitution.md
**Time**: 10-30 minutes (agent updates document)

---

## File Locations

```
.claude/
├── commands/                    # Slash commands (auto-discovered)
│   ├── speckit.specify.md      # /speckit.specify
│   ├── speckit.clarify.md      # /speckit.clarify
│   ├── speckit.plan.md         # /speckit.plan
│   ├── speckit.tasks.md        # /speckit.tasks
│   ├── speckit.implement.md    # /speckit.implement
│   ├── speckit.analyze.md      # /speckit.analyze
│   └── speckit.constitution.md # /speckit.constitution
├── agents/                      # Custom agents
│   ├── game-designer.md        # Game design specialist
│   └── tiny-tycoon-dev.md      # LittleJS developer specialist
└── settings.local.json          # Permissions

.specify/
├── memory/
│   └── constitution.md          # Project governance (v2.1.0)
├── scripts/bash/                # Helper scripts called by commands
│   ├── check-prerequisites.sh
│   ├── create-new-feature.sh
│   ├── setup-plan.sh
│   └── common.sh
├── specs/                       # Feature specifications
│   ├── 003-add-screen-shake-feedback/
│   ├── 004-add-zzfx-sound-system/
│   ├── 005-add-particle-effects/
│   ├── 006-add-named-collectibles/
│   ├── 007-add-gen-alpha-personality/
│   ├── 008-add-consumption-log/
│   ├── 009-add-combo-system/
│   └── P3-FEATURES-INDEX.md
└── templates/                   # Spec-Kit templates
    ├── spec-template.md
    ├── plan-template.md
    ├── tasks-template.md
    └── checklist-template.md
```

---

## Troubleshooting

**Commands not appearing in slash menu?**
- Restart Claude Code (commands are discovered on startup)
- Check `.claude/commands/` directory exists
- Verify each .md file has `description:` in frontmatter
- Check file permissions (should be readable)

**Commands error when called?**
- Check git branch (some commands require feature branch)
- Verify .specify/scripts/ are executable (`chmod +x .specify/scripts/bash/*.sh`)
- Check prerequisites: spec.md exists, plan.md exists, etc.

**Commands generate wrong output?**
- Review command .md file instructions
- Check Constitution for current requirements
- Verify templates in .specify/templates/ are correct

---

## Status

✅ **7 Spec-Kit commands installed**
✅ **7 P3 feature specs created**
✅ **Constitution v2.1.0 complete**
✅ **Templates configured**
✅ **Scripts operational**
✅ **Ready for implementation**

**Next Action**: Restart Claude Code or type `/` to see commands in slash menu

---

**Documentation**:
- Commands: This file
- Methodology: https://github.com/github/spec-kit
- Constitution: .specify/memory/constitution.md
- Specs: .specify/specs/*/spec.md
