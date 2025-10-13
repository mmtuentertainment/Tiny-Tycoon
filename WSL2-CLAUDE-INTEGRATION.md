# WSL2 + Claude Code + Spec Kit Integration Guide

**Quick Reference for Game Development Workspace**

---

## 🎯 Key Concepts

### Two-Level Architecture

1. **Workspace Root** (`/home/matt/Game Development/`)
   - Contains `.claude/commands/` with Spec Kit slash commands
   - Contains `.specify/` with master constitution and templates
   - Shared by all games in `games/` subdirectories

2. **Game Subfolders** (`games/[game-name]/`)
   - Each game is a standalone project
   - Has own `.specify/` for game-specific specs/plans/tasks
   - Shares root `.claude/commands/` for slash commands
   - Imports shared resources from `../../shared/`

---

## 📂 Path Translation

| Context | Path |
|---------|------|
| **WSL2/Linux** | `/home/matt/Game Development` |
| **Windows** | `\\wsl.localhost\Ubuntu-22.04\home\matt\Game Development` |
| **Usage** | Both paths refer to the same location |

---

## 🚀 Quick Start Commands

### One-Time Setup (Root Level)

```bash
# Navigate to workspace root
cd "/home/matt/Game Development"

# Install Spec Kit CLI (if not installed)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Initialize Spec Kit with Claude Code integration
specify init --here --ai claude --force

# This creates:
# - .claude/commands/speckit.*.md (8 slash commands)
# - .specify/memory/, .specify/scripts/, .specify/templates/

# Verify installation
specify check

# Open in Claude Code
claude .
```

### Per-Game Setup

```bash
# Create new game (from workspace root)
cd "/home/matt/Game Development"
./tools/game-initializer.sh "my-game-name"

# Navigate to game
cd games/my-game-name

# Open game in Claude Code
claude .

# Start development with Spec-Driven workflow
# Type "/" in Claude Code to see /speckit.* commands
```

---

## 🔧 Available Slash Commands

When you open any directory in this workspace with Claude Code, you have access to:

| Command | Purpose |
|---------|---------|
| `/speckit.constitution` | Create/update governing principles |
| `/speckit.specify` | Define requirements & user stories |
| `/speckit.clarify` | Clarify underspecified areas |
| `/speckit.plan` | Create technical implementation plan |
| `/speckit.tasks` | Generate actionable task breakdown |
| `/speckit.implement` | Execute implementation |
| `/speckit.analyze` | Analyze consistency & coverage |
| `/speckit.checklist` | Generate quality checklists |

**These commands work from**:
- ✅ Workspace root (`/home/matt/Game Development`)
- ✅ Any game subdirectory (`games/my-game/`)
- ✅ Any nested directory in the workspace

---

## 🎮 Game Development Workflow

### Complete Flow

```bash
# 1. Create game
./tools/game-initializer.sh "gravity-escape"
cd games/gravity-escape
claude .

# 2. In Claude Code, define game principles
/speckit.constitution [Define game-specific principles]

# 3. Create first feature spec
/speckit.specify [Describe game concept, mechanics, goals]

# 4. Clarify requirements
/speckit.clarify

# 5. Create technical plan
/speckit.plan [Specify tech stack, architecture, LittleJS usage]

# 6. Generate tasks
/speckit.tasks

# 7. Implement
/speckit.implement

# 8. Test and iterate
npm run dev  # http://localhost:8000
npm test
```

---

## 🗂️ Directory Structure

```
/home/matt/Game Development/
├── .claude/
│   ├── settings.local.json
│   └── commands/              # Spec Kit slash commands (workspace-wide)
│       ├── speckit.constitution.md
│       ├── speckit.specify.md
│       ├── speckit.plan.md
│       └── ... (8 total)
│
├── .specify/                  # Root-level Spec Kit config
│   ├── memory/
│   │   └── constitution.md    # Master principles
│   ├── scripts/bash/
│   └── templates/
│
├── knowledge-base/            # Reference docs
├── LittleJS/                  # Engine source
├── spec-kit/                  # Spec Kit source
│
├── shared/                    # Shared resources
│   ├── components/
│   │   ├── physics-helpers.js
│   │   └── particle-presets.js
│   └── assets/
│
├── games/                     # Game projects (subfolders)
│   ├── game-jam-2025/
│   │   ├── .specify/          # Game-specific specs/plans/tasks
│   │   │   ├── memory/constitution.md
│   │   │   └── specs/001-core-game/
│   │   │       ├── spec.md
│   │   │       ├── plan.md
│   │   │       └── tasks.md
│   │   ├── src/
│   │   ├── assets/
│   │   ├── tests/
│   │   └── index.html
│   │
│   ├── practice-game-01/
│   └── practice-game-02/
│
├── prototypes/                # Quick experiments
├── docs/                      # Documentation
└── tools/                     # Scripts
    └── game-initializer.sh
```

---

## 🔍 How It Works

### Spec Kit Command Resolution

When you use `/speckit.*` commands in Claude Code:

1. **Claude Code looks for** `.claude/commands/` in workspace root
2. **Finds** `speckit.*.md` markdown files
3. **Executes** the command using context from current directory
4. **Reads/writes** to `.specify/` in current or parent directories

### Example: Creating a Spec in a Game

```bash
# You are in: /home/matt/Game Development/games/my-game/
# You run: /speckit.specify [requirements]

# Claude Code:
# 1. Uses .claude/commands/speckit.specify.md from root
# 2. Checks for .specify/ in current directory (games/my-game/.specify/)
# 3. Creates games/my-game/.specify/specs/001-feature/spec.md
# 4. Uses templates from games/my-game/.specify/templates/ (or root if not found)
```

---

## 💡 Best Practices

### Do's

- ✅ Keep all files in WSL2 filesystem (`/home/matt/...`)
- ✅ Open workspace root in Claude Code for multi-game work
- ✅ Open individual game folder for focused development
- ✅ Use `../../shared/components/` for reusable code
- ✅ Run scripts with proper permissions (`chmod +x tools/*.sh`)
- ✅ Commit often with descriptive messages

### Don'ts

- ❌ Don't store files in `/mnt/c/...` (slow Windows filesystem)
- ❌ Don't duplicate code - use shared components
- ❌ Don't skip the clarify step (`/speckit.clarify`)
- ❌ Don't manually create `.specify/` directories - use tools
- ❌ Don't forget to initialize git in game directories

---

## 🛠️ Troubleshooting

### Slash commands not appearing

**Problem**: Can't see `/speckit.*` commands in Claude Code

**Solution**: Open the workspace root, not a subdirectory
```bash
cd "/home/matt/Game Development"
claude .
```

### Permission denied on scripts

**Problem**: `./tools/game-initializer.sh: Permission denied`

**Solution**: Make scripts executable
```bash
chmod +x tools/*.sh
chmod +x .specify/scripts/bash/*.sh
```

### Can't find shared components

**Problem**: Import errors for `../../shared/components/physics-helpers.js`

**Solution**: Use correct relative path from game directory
```javascript
// In games/my-game/src/game.js
import { GravityWell } from '../../shared/components/physics-helpers.js';
```

### WSL2 path not found in Windows

**Problem**: Windows can't find `\\wsl.localhost\Ubuntu-22.04\...`

**Solution**: Ensure WSL2 is running
```bash
# In Windows PowerShell
wsl --list --running

# If not running, start it
wsl
```

---

## 📚 Additional Resources

- **Full Setup Plan**: [DIRECTORY-SETUP-PLAN.md](./DIRECTORY-SETUP-PLAN.md)
- **Knowledge Base**: [knowledge-base/README.md](./knowledge-base/README.md)
- **Quick Start**: [QUICK-START.md](./QUICK-START.md)
- **Spec Kit Docs**: [spec-kit/README.md](./spec-kit/README.md)
- **LittleJS Docs**: [LittleJS/README.md](./LittleJS/README.md)

---

## 🎯 Quick Reference Card

| Task | Command |
|------|---------|
| Install Spec Kit | `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git` |
| Init workspace | `specify init --here --ai claude --force` |
| Create game | `./tools/game-initializer.sh "game-name"` |
| Open workspace | `claude .` |
| Verify setup | `specify check` |
| Start dev server | `npm run dev` |
| Run tests | `npm test` |

---

**Last Updated**: October 13, 2025
**Environment**: WSL2 Ubuntu 22.04, Claude Code, LittleJS
**Purpose**: LittleJS Game Jam 2025 preparation
