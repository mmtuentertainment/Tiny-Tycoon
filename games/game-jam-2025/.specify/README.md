# Spec-Kit Workflow Guide

This directory contains the Spec-Kit workflow system for Tiny Tycoon development.

## ⚠️ IMPORTANT: Working Directory

**Always run Spec-Kit commands from the project directory**, not the workspace root!

```bash
# ✅ CORRECT - Run from project folder
cd /home/matt/Game\ Development/games/game-jam-2025
/speckit.specify "Add new feature"

# ❌ WRONG - Don't run from workspace root
cd /home/matt/Game\ Development
/speckit.specify "Add new feature"  # Will target wrong files!
```

## Why This Matters

Running from the wrong directory causes:
- ❌ Constitution overwrites (template replaces project-specific file)
- ❌ Specs created in wrong location
- ❌ Agent context points to wrong project

## Project Structure

```
.specify/
├── memory/
│   └── constitution.md          # PROJECT-OWNED - Do not overwrite!
├── specs/
│   └── 00X-feature-name/        # Feature specifications
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
├── scripts/
│   └── bash/                    # Workflow automation scripts
├── templates/                   # Templates for new specs/plans/tasks
└── README.md                    # This file
```

## Available Commands

From `/home/matt/Game Development/games/game-jam-2025/`:

- `/speckit.specify [description]` - Create new feature specification
- `/speckit.clarify` - Ask clarifying questions about spec
- `/speckit.plan` - Create implementation plan
- `/speckit.tasks` - Break down into atomic tasks
- `/speckit.implement` - Execute implementation
- `/speckit.analyze` - Validate consistency

## Constitution Safety

The `constitution.md` file has been protected with:

1. **Ownership header** - Warns against overwrites
2. **Safeguards in workflow** - Asks for confirmation before changes
3. **Size checks** - Detects project-owned vs template files

If you need to update the constitution:
- Make targeted edits manually
- DO NOT use `/speckit.constitution` on project-owned files
- Always commit/backup before running constitution commands

## Quick Start

```bash
# 1. Navigate to project
cd "/home/matt/Game Development/games/game-jam-2025"

# 2. Create a new feature
/speckit.specify "Add particle effects system"

# 3. Follow workflow
/speckit.clarify    # If needed
/speckit.plan       # Create implementation plan
/speckit.tasks      # Break into tasks
/speckit.implement  # Execute

# 4. Validate
/speckit.analyze    # Check consistency
```

## Troubleshooting

### "Constitution was overwritten!"
- Restore from git: `git checkout HEAD~1 .specify/memory/constitution.md`
- Verify you're in project directory before running commands
- Check ownership header is present

### "Feature specs in wrong location"
- Move to correct location under `.specify/specs/`
- Update numbering if needed
- Run from project directory next time

### "Agent context wrong"
- Run `.specify/scripts/bash/update-agent-context.sh`
- Verify working directory

## Best Practices

1. ✅ Always `cd` to project directory first
2. ✅ Commit constitution before running workflow commands
3. ✅ Use version control for all spec changes
4. ✅ Read prompts carefully (they contain safeguards)
5. ✅ Test workflow on non-critical files first

## Support

- File issues at project repository
- Check `.codex/prompts/` for command documentation
- Review constitution for project-specific requirements
