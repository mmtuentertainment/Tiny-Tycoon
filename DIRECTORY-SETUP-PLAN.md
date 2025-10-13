# Game Development Directory - Complete Setup Plan

**Created**: October 13, 2025
**Updated**: October 13, 2025
**Purpose**: Optimal directory structure for LittleJS game development using Spec-Driven Development methodology
**Location**: `/home/matt/Game Development/` (WSL2 Ubuntu 22.04)
**Windows Path**: `\\wsl.localhost\Ubuntu-22.04\home\matt\Game Development`

---

## 📋 Executive Summary

This directory is optimized for:
1. **LittleJS game development** (multiple game projects in subfolders)
2. **Spec-Driven Development** workflow with GitHub Spec Kit
3. **Claude Code integration** (Spec Kit slash commands available workspace-wide)
4. **WSL2 environment** (Ubuntu 22.04 on Windows)
5. **Game Jam 2025 preparation** (Theme: "SMALL")
6. **Physics prize targeting** ($100 charity prize)

### 🔧 How This Works

**Claude Code Integration**: When you initialize Spec Kit with `specify init --here --ai claude`, it creates:
- `.claude/commands/` directory with Spec Kit slash commands (`/speckit.*`)
- `.specify/` directory with templates, scripts, and memory (constitution)
- These commands are available **workspace-wide** in Claude Code

**Game Subfolder Structure**: Each game in `games/` subdirectory will:
- Have its own `.specify/` directory for game-specific specs, plans, and tasks
- **Share** the root `.claude/commands/` for slash command access
- Allow you to run `/speckit.specify`, `/speckit.plan`, etc. from any game directory

---

## 🎯 Design Principles

### From Spec Kit Constitution
- **Library-First** (Article I): Each game as standalone project
- **Test-First** (Article III): TDD for all gameplay mechanics
- **Simplicity** (Article VII): Maximum 3 projects per game initially
- **Anti-Abstraction** (Article VIII): Use LittleJS APIs directly

### From LittleJS Best Practices
- Modular game object design
- WebGL rendering optimization
- Physics-driven gameplay
- Procedural audio with ZzFX

### From Game Jam Strategy
- 31-day development cycles
- Physics innovation focus
- Theme interpretation clarity
- Community engagement

---

## 📁 Proposed Directory Structure

```
Game Development/
│
├── .claude/                          # ✅ EXISTS - Claude Code configuration
│   ├── settings.local.json          # Local Claude settings
│   └── commands/                    # WILL BE CREATED: Spec Kit slash commands
│       ├── speckit.constitution.md  # /speckit.constitution command
│       ├── speckit.specify.md       # /speckit.specify command
│       ├── speckit.plan.md          # /speckit.plan command
│       ├── speckit.tasks.md         # /speckit.tasks command
│       ├── speckit.implement.md     # /speckit.implement command
│       ├── speckit.clarify.md       # /speckit.clarify command
│       ├── speckit.analyze.md       # /speckit.analyze command
│       └── speckit.checklist.md     # /speckit.checklist command
│
├── .specify/                         # WILL BE CREATED: Spec Kit workspace root
│   ├── memory/
│   │   └── constitution.md          # Master game dev principles
│   ├── scripts/
│   │   ├── bash/                    # Unix/Mac/WSL scripts
│   │   │   ├── create-new-feature.sh
│   │   │   ├── setup-plan.sh
│   │   │   └── update-agent-context.sh
│   │   └── powershell/              # Windows scripts (optional)
│   └── templates/
│       ├── spec-template.md         # Game specification template
│       ├── plan-template.md         # Technical plan template
│       └── tasks-template.md        # Task breakdown template
│
├── knowledge-base/                   # ✅ COMPLETE - Reference material
│   ├── README.md
│   ├── 01-littlejs/
│   ├── 02-spec-kit/
│   ├── 03-game-jam/
│   ├── 04-integration/
│   ├── 05-quick-reference/
│   └── 06-examples/
│
├── LittleJS/                        # ✅ EXISTS - Engine source
│   ├── src/                         # Engine code
│   ├── dist/                        # Pre-built bundles
│   └── examples/                    # Example games
│
├── spec-kit/                        # ✅ EXISTS - Spec Kit source
│   ├── src/
│   ├── templates/
│   └── scripts/
│
├── shared/                          # INITIALIZE: Shared game resources
│   ├── assets/
│   │   ├── tilesets/               # Shared sprite sheets
│   │   ├── fonts/                  # Custom fonts
│   │   └── audio/                  # Reusable sound libraries
│   ├── components/
│   │   ├── physics-helpers.js      # Common physics utilities
│   │   ├── particle-presets.js     # Reusable particle configs
│   │   └── ui-components.js        # Shared UI elements
│   └── tools/
│       ├── texture-packer/         # Asset pipeline tools
│       └── level-editor/           # Custom level tools
│
├── prototypes/                      # INITIALIZE: Quick experiments
│   ├── 001-physics-bounce/
│   ├── 002-gravity-well/
│   ├── 003-chain-reactions/
│   └── README.md                    # Prototype log
│
├── games/                           # INITIALIZE: Full game projects (subfolders)
│   │
│   ├── game-jam-2025/              # Main jam entry
│   │   ├── .specify/               # Game-specific Spec Kit config
│   │   │   ├── memory/
│   │   │   │   └── constitution.md  # Game-specific principles
│   │   │   └── specs/              # Feature specifications
│   │   │       └── 001-core-game/
│   │   │           ├── spec.md     # Requirements & user stories
│   │   │           ├── plan.md     # Technical implementation plan
│   │   │           ├── tasks.md    # Task breakdown
│   │   │           ├── data-model.md
│   │   │           └── contracts/
│   │   ├── src/
│   │   │   ├── game.js            # Main game loop
│   │   │   ├── objects/           # Game objects
│   │   │   ├── levels/            # Level data
│   │   │   └── sounds.js          # ZzFX sounds
│   │   ├── assets/
│   │   │   └── sprites.png        # Game sprites
│   │   ├── tests/
│   │   │   ├── physics.test.js
│   │   │   └── gameplay.test.js
│   │   ├── dist/                  # Build output
│   │   ├── index.html
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── practice-game-01/           # Practice project (same structure)
│   └── practice-game-02/           # Practice project (same structure)
│
│   NOTE: Each game has its own .specify/ for specs/plans/tasks
│         but shares the root .claude/commands/ for slash commands
│
├── docs/                            # INITIALIZE: Project documentation
│   ├── dev-journal.md              # Daily development log
│   ├── lessons-learned.md          # Post-mortems & insights
│   ├── physics-experiments.md      # Physics R&D notes
│   └── theme-brainstorm.md         # "SMALL" theme ideas
│
├── tools/                           # INITIALIZE: Custom dev tools
│   ├── game-initializer.sh         # New game project setup
│   ├── asset-optimizer.sh          # Image/audio compression
│   └── deploy-itch.sh              # itch.io deployment
│
└── [Project Root Files]
    ├── .gitignore                   # Git ignore patterns
    ├── README.md                    # Workspace overview
    ├── QUICK-START.md              # ✅ EXISTS
    ├── DIRECTORY-SETUP-PLAN.md     # This file
    └── workspace-config.json        # Shared configuration
```

---

## 🔧 Detailed Setup Instructions

### Phase 1: Initialize Spec Kit Workspace (Root Level)

#### Step 1: Verify Spec Kit CLI Installation

Check if Spec Kit is already installed:
```bash
specify check
```

If not installed, install it:
```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

#### Step 2: Initialize Root Spec Kit Configuration for Claude Code

**IMPORTANT**: This step creates the `.claude/commands/` directory with Spec Kit slash commands that will be available workspace-wide in Claude Code.

```bash
# Navigate to the workspace root
cd "/home/matt/Game Development"

# Initialize Spec Kit with Claude Code integration
specify init --here --ai claude --force
```

**This creates**:
- `.claude/commands/` directory with 8 Spec Kit slash commands:
  - `speckit.constitution.md` - Define governing principles
  - `speckit.specify.md` - Create specifications
  - `speckit.plan.md` - Generate technical plans
  - `speckit.tasks.md` - Break down into tasks
  - `speckit.implement.md` - Execute implementation
  - `speckit.clarify.md` - Clarify requirements
  - `speckit.analyze.md` - Analyze consistency
  - `speckit.checklist.md` - Quality checklists
- `.specify/` directory at root level:
  - `memory/` - For constitution
  - `scripts/bash/` - Helper scripts
  - `templates/` - Spec, plan, and task templates
- Git initialization (if not already a repo)

#### Step 3: Verify Claude Code Can See Commands

Open Claude Code and verify you can see the `/speckit.*` commands:
```bash
# In Claude Code, type "/" and you should see:
# /speckit.constitution
# /speckit.specify
# /speckit.plan
# /speckit.tasks
# /speckit.implement
# /speckit.clarify
# /speckit.analyze
# /speckit.checklist
```

#### Step 4: Create Master Constitution

Now use the Claude Code command to create your master game development constitution:

```bash
/speckit.constitution Create master game development constitution for LittleJS Game Jam 2025:

PROJECT IDENTITY:
- Purpose: Develop games for LittleJS Game Jam 2025 (Oct 3 - Nov 3, 2025)
- Theme: "SMALL" - all games must embody this theme creatively
- Engine: LittleJS (ultra-lightweight HTML5 game engine)
- Target Prize: $100 physics innovation charity prize

DEVELOPMENT PRINCIPLES:
- Library-First (Article I): Each game is a standalone project in games/ subfolder
- Test-First (Article III): All physics mechanics require test coverage
- Physics Innovation: Prioritize novel physics mechanics for prize eligibility
- Simplicity (Article VII): Maximum 3 specs per game initially
- Anti-Abstraction (Article VIII): Use LittleJS APIs directly, avoid unnecessary layers
- AI-Assisted Development: Leverage Claude Code with Spec Kit workflow
- Iterative Refinement: Prototype in prototypes/, validate, then promote to games/

CODE QUALITY:
- Reusable components live in shared/components/
- Physics helpers must be documented and tested
- Follow LittleJS patterns and conventions
- ZzFX for all audio (procedural, no asset bloat)
- Pixel art aesthetic for consistency

WORKFLOW:
- Each game follows: /speckit.constitution → /speckit.specify → /speckit.clarify → /speckit.plan → /speckit.tasks → /speckit.implement
- Daily dev journal entries in docs/dev-journal.md
- Weekly physics experiments in prototypes/
- Community engagement on LittleJS Discord

GAME SUBFOLDER RULES:
- Each game in games/ has its own .specify/ directory for specs/plans/tasks
- Games share the root .claude/commands/ for slash commands
- Games can import from shared/components/ for reusable code
```

**Output**: `.specify/memory/constitution.md` at root level

This constitution will guide all game development in this workspace.

### Phase 2: Create Shared Resources

#### Step 1: Initialize Shared Assets
```bash
mkdir -p shared/{assets/{tilesets,fonts,audio},components,tools}
```

#### Step 2: Create Physics Helpers Library
```javascript
// shared/components/physics-helpers.js
/**
 * Reusable physics utilities for all games
 * Following Article I: Library-First
 */

// Explosion force helper
export function applyExplosionForce(objects, center, radius, force) {
    for (const obj of objects) {
        if (!obj.velocity) continue;

        const dir = obj.pos.subtract(center);
        const dist = dir.length();

        if (dist < radius && dist > 0) {
            const impulse = dir.normalize().scale(
                force * (1 - dist / radius)
            );
            obj.velocity = obj.velocity.add(impulse);
        }
    }
}

// Gravity well helper (for physics prize!)
export class GravityWell {
    constructor(pos, strength = 0.01, radius = 10) {
        this.pos = pos;
        this.strength = strength;
        this.radius = radius;
    }

    applyTo(obj) {
        if (!obj.velocity) return;

        const dir = this.pos.subtract(obj.pos);
        const dist = dir.length();

        if (dist < this.radius && dist > 0) {
            const force = dir.normalize().scale(
                this.strength / (dist * dist)
            );
            obj.velocity = obj.velocity.add(force);
        }
    }
}

// Chain reaction helper
export class ChainReaction {
    static trigger(origin, objects, callback) {
        const chain = [];
        const processed = new Set();

        function process(obj, depth = 0) {
            if (processed.has(obj)) return;
            processed.add(obj);
            chain.push({ obj, depth });

            // Find nearby objects
            const nearby = objects.filter(o =>
                !processed.has(o) &&
                o.pos.distance(obj.pos) < 3
            );

            nearby.forEach(n => process(n, depth + 1));
        }

        process(origin);

        // Execute callback with delay based on depth
        chain.forEach(({ obj, depth }) => {
            setTimeout(() => callback(obj), depth * 100);
        });
    }
}
```

#### Step 3: Create Particle Presets
```javascript
// shared/components/particle-presets.js
/**
 * Reusable particle effect configurations
 */

export const PARTICLE_PRESETS = {
    explosion: {
        emitSize: 1,
        emitTime: 0.1,
        emitRate: 50,
        emitCone: PI,
        colorStartA: rgb(1, 0.5, 0),
        colorStartB: rgb(1, 0, 0),
        colorEndA: rgb(1, 1, 0, 0),
        colorEndB: rgb(0, 0, 0, 0),
        particleTime: 0.5,
        sizeStart: 0.5,
        sizeEnd: 0.1,
        speed: 0.2,
        angleSpeed: 0.1,
        damping: 0.95,
        gravityScale: 0,
        fadeRate: 0.1,
        randomness: 0.3,
        additive: true
    },

    sparkles: {
        emitSize: 0.5,
        emitTime: 0.2,
        emitRate: 30,
        emitCone: PI * 2,
        colorStartA: rgb(1, 1, 1),
        colorStartB: rgb(1, 1, 0.5),
        colorEndA: rgb(1, 1, 1, 0),
        colorEndB: rgb(1, 0.5, 0, 0),
        particleTime: 0.3,
        sizeStart: 0.2,
        sizeEnd: 0.05,
        speed: 0.1,
        angleSpeed: 0.2,
        damping: 0.98,
        gravityScale: -0.01,
        fadeRate: 0.15,
        randomness: 0.4,
        additive: true
    },

    impact: {
        emitSize: 0.3,
        emitTime: 0.05,
        emitRate: 20,
        emitCone: PI,
        colorStartA: WHITE,
        colorStartB: rgb(0.8, 0.8, 1),
        colorEndA: rgb(1, 1, 1, 0),
        colorEndB: rgb(0.5, 0.5, 0.5, 0),
        particleTime: 0.2,
        sizeStart: 0.3,
        sizeEnd: 0.1,
        speed: 0.15,
        angleSpeed: 0.05,
        damping: 0.9,
        gravityScale: 0.5,
        fadeRate: 0.2,
        randomness: 0.3,
        additive: false
    }
};

export function createExplosion(pos, scale = 1) {
    const preset = PARTICLE_PRESETS.explosion;
    return new ParticleEmitter(
        pos, 0,
        preset.emitSize * scale,
        preset.emitTime,
        preset.emitRate * scale,
        preset.emitCone,
        undefined,
        preset.colorStartA,
        preset.colorStartB,
        preset.colorEndA,
        preset.colorEndB,
        preset.particleTime,
        preset.sizeStart * scale,
        preset.sizeEnd * scale,
        preset.speed * scale,
        preset.angleSpeed,
        preset.damping,
        1,
        preset.gravityScale,
        PI,
        preset.fadeRate,
        preset.randomness,
        false,
        preset.additive
    );
}
```

### Phase 3: Initialize Prototypes Directory

```bash
mkdir -p prototypes
cd prototypes
```

#### Create Prototype Template
```bash
cat > README.md << 'EOF'
# Prototypes Directory

Quick experiments and proof-of-concepts for physics mechanics.

## Purpose
- Test physics ideas before full implementation
- Validate "SMALL" theme interpretations
- Experiment with novel mechanics
- Learn LittleJS systems

## Guidelines
- Keep each prototype under 4 hours of work
- Focus on ONE mechanic per prototype
- Document learnings in this file
- Best ideas graduate to full games

## Prototype Log

### 001-physics-bounce
**Date**: TBD
**Goal**: Test elastic collision with variable bounciness
**Result**: [pending]
**Learnings**: [pending]

### 002-gravity-well
**Date**: TBD
**Goal**: Implement gravity well mechanics for physics prize
**Result**: [pending]
**Learnings**: [pending]

### 003-chain-reactions
**Date**: TBD
**Goal**: Test explosion propagation system
**Result**: [pending]
**Learnings**: [pending]
EOF
```

### Phase 4: Initialize Games Directory Structure

```bash
# Create games directory
mkdir -p games
cd games
```

**Important Note**: Each game will be in its own subdirectory and will have its own `.specify/` configuration for managing feature specs, plans, and tasks. However, the Spec Kit slash commands (`/speckit.*`) from the root `.claude/commands/` will be available in all game subdirectories when using Claude Code.

#### Understanding the Two-Level Structure

1. **Root Level** (`/home/matt/Game Development/`):
   - `.claude/commands/` - Spec Kit slash commands (shared by all games)
   - `.specify/memory/constitution.md` - Master constitution
   - `.specify/templates/` - Templates for specs/plans/tasks
   - `.specify/scripts/` - Helper bash scripts

2. **Game Level** (`/home/matt/Game Development/games/[game-name]/`):
   - `.specify/memory/constitution.md` - Game-specific constitution (inherits from root)
   - `.specify/specs/001-feature/` - Feature specifications
   - `.specify/specs/001-feature/spec.md` - Requirements & user stories
   - `.specify/specs/001-feature/plan.md` - Technical implementation plan
   - `.specify/specs/001-feature/tasks.md` - Task breakdown
   - `src/`, `assets/`, `tests/` - Game code and assets

#### Use Game Initializer Script (to be created)
```bash
# This will be automated by tools/game-initializer.sh
# See Phase 5 for the complete script
```

### Phase 5: Create Development Tools

#### Tool 1: Game Initializer

This script creates a new game subdirectory with proper Spec Kit integration:

```bash
cat > tools/game-initializer.sh << 'EOF'
#!/bin/bash
# Game Development/tools/game-initializer.sh
# Initializes new game project with Spec Kit + LittleJS in games/ subfolder

set -e

GAME_NAME="$1"
ROOT_DIR="/home/matt/Game Development"

if [ -z "$GAME_NAME" ]; then
    echo "Usage: ./game-initializer.sh <game-name>"
    echo "Example: ./game-initializer.sh my-platformer"
    exit 1
fi

GAME_DIR="$ROOT_DIR/games/$GAME_NAME"

if [ -d "$GAME_DIR" ]; then
    echo "❌ Error: Game directory already exists: $GAME_DIR"
    exit 1
fi

echo "🎮 Initializing game project: $GAME_NAME"
echo "📁 Location: $GAME_DIR"
echo ""

# Create directory structure
mkdir -p "$GAME_DIR"/{src/{objects,levels},assets,tests,dist}

# Initialize Spec Kit in game directory (this creates game-level .specify/)
cd "$GAME_DIR"
specify init --here --ai claude --force

echo ""
echo "✅ Spec Kit initialized in game directory"
echo "   Created: $GAME_DIR/.specify/"
echo "   Note: Game uses root .claude/commands/ for slash commands"

# Create package.json
cat > package.json << PKGJSON
{
  "name": "$GAME_NAME",
  "version": "0.1.0",
  "description": "LittleJS game for Game Jam 2025",
  "type": "module",
  "scripts": {
    "dev": "python3 -m http.server 8000",
    "test": "node --test tests/**/*.test.js",
    "build": "echo 'Build script TBD'"
  },
  "keywords": ["littlejs", "game", "jam"],
  "author": "",
  "license": "MIT"
}
PKGJSON

# Create index.html
cat > index.html << HTML
<!DOCTYPE html>
<html>
<head>
    <title>$GAME_NAME</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <script src="../../LittleJS/dist/littlejs.min.js"></script>
    <script type="module" src="src/game.js"></script>
</body>
</html>
HTML

# Create game.js stub
cat > src/game.js << GAMEJS
'use strict';

// Import shared utilities
// import { applyExplosionForce, GravityWell } from '../../shared/components/physics-helpers.js';

// Game globals
let player;

function gameInit() {
    // Initialize game
    console.log('$GAME_NAME initialized');
}

function gameUpdate() {
    // Update logic (60fps)
}

function gameUpdatePost() {
    // Post-update (after physics)
}

function gameRender() {
    // Background rendering
}

function gameRenderPost() {
    // UI rendering
}

// Start engine
engineInit(
    gameInit,
    gameUpdate,
    gameUpdatePost,
    gameRender,
    gameRenderPost,
    ['assets/sprites.png']
);
GAMEJS

# Create README
cat > README.md << README
# $GAME_NAME

LittleJS game project for Game Jam 2025.

## Theme: SMALL

[Describe theme interpretation]

## Setup

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:8000 in browser.

## Development

Use Spec-Driven Development workflow:
1. \`/speckit.specify\` - Define game concept
2. \`/speckit.plan\` - Technical approach
3. \`/speckit.tasks\` - Break down implementation
4. \`/speckit.implement\` - Build the game

## Testing

\`\`\`bash
npm test
\`\`\`
README

echo ""
echo "✅ Game project initialized successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. cd games/$GAME_NAME"
echo "   2. Open this directory in Claude Code"
echo "   3. Use /speckit.constitution to define game-specific principles"
echo "      (inherits from root constitution at ../../.specify/memory/constitution.md)"
echo "   4. Use /speckit.specify to create your first feature spec"
echo "   5. Follow the Spec-Driven Development workflow:"
echo "      /speckit.specify → /speckit.clarify → /speckit.plan → /speckit.tasks → /speckit.implement"
echo ""
echo "💡 Tips:"
echo "   - Import shared components: ../../shared/components/physics-helpers.js"
echo "   - Link to LittleJS engine: ../../LittleJS/dist/littlejs.min.js"
echo "   - Reference knowledge base: ../../knowledge-base/"
echo ""
echo "🎮 Happy game development!"
EOF

chmod +x tools/game-initializer.sh
```

**Usage Example**:
```bash
# From the workspace root
cd "/home/matt/Game Development"

# Create a new game project
./tools/game-initializer.sh "gravity-escape"

# Navigate to the new game
cd games/gravity-escape

# Open in Claude Code and start development
claude .
```

### Phase 6: Create Documentation Structure

```bash
mkdir -p docs
cd docs
```

#### Dev Journal Template
```markdown
# Development Journal

## Purpose
Daily log of development activities, decisions, and learnings.

## Format
### [Date] - [Game/Prototype Name]
**Hours**: X
**Goals**:
**Accomplished**:
**Blockers**:
**Tomorrow**:
**Learnings**:

---

## Log Entries

### 2025-01-13 - Setup
**Hours**: 2
**Goals**: Set up optimal directory structure
**Accomplished**: Complete directory plan created
**Blockers**: None
**Tomorrow**: Initialize Spec Kit workspace
**Learnings**: Organization before coding saves time
```

### Phase 7: Configuration Files

#### .gitignore
```.gitignore
# Dependencies
node_modules/
npm-debug.log*

# Build outputs
dist/
build/
*.min.js
*.map

# OS files
.DS_Store
Thumbs.db
*.swp
*.swo
*~

# IDE
.vscode/
.idea/
*.sublime-*

# Environment
.env
.env.local

# Test coverage
coverage/
.nyc_output/

# Temporary files
tmp/
temp/
*.tmp

# Game-specific
prototypes/*/dist/
games/*/dist/
games/*/node_modules/

# Keep structure folders
!.gitkeep
```

#### workspace-config.json
```json
{
  "version": "1.0.0",
  "workspace": "LittleJS Game Development",
  "created": "2025-01-13",

  "paths": {
    "littlejs": "./LittleJS",
    "specKit": "./spec-kit",
    "knowledgeBase": "./knowledge-base",
    "shared": "./shared",
    "prototypes": "./prototypes",
    "games": "./games",
    "tools": "./tools"
  },

  "settings": {
    "defaultAIAgent": "claude",
    "autoInitSpecKit": true,
    "physics": {
      "targetPrize": true,
      "innovationFocus": true
    },
    "gameJam": {
      "theme": "SMALL",
      "startDate": "2025-10-03",
      "endDate": "2025-11-03",
      "duration": 31
    }
  },

  "templates": {
    "gameSpec": ".specify/templates/game-spec-template.md",
    "gamePlan": ".specify/templates/game-plan-template.md",
    "gameTasks": ".specify/templates/game-tasks-template.md"
  },

  "shared": {
    "components": [
      "physics-helpers.js",
      "particle-presets.js",
      "ui-components.js"
    ],
    "assets": [
      "tilesets/",
      "fonts/",
      "audio/"
    ]
  }
}
```

---

## 🚀 Initialization Workflow

### Complete Setup Steps (Execute in Order)

#### Prerequisites Check

```bash
# Check if Spec Kit CLI is installed
specify check

# If not installed, install it
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

#### Phase 1: Initialize Root Spec Kit (Creates .claude/commands/)

```bash
# Navigate to workspace root
cd "/home/matt/Game Development"

# Initialize Spec Kit with Claude Code integration
# This creates .claude/commands/ with all Spec Kit slash commands
specify init --here --ai claude --force
```

**What this creates**:
- `.claude/commands/speckit.*.md` - 8 slash commands for Spec-Driven Development
- `.specify/memory/` - Directory for constitution
- `.specify/scripts/bash/` - Helper scripts
- `.specify/templates/` - Templates for specs, plans, tasks

#### Phase 2: Verify Claude Code Integration

Open Claude Code in this workspace:

```bash
# Option 1: From WSL2 terminal
claude .

# Option 2: From Windows
# Open VS Code, then: File → Open Folder → \\wsl.localhost\Ubuntu-22.04\home\matt\Game Development
# Or use Claude Code desktop app
```

Verify slash commands are available:
- Type `/` in Claude Code
- You should see: `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`, `/speckit.clarify`, `/speckit.analyze`, `/speckit.checklist`

#### Phase 3: Create Master Constitution

In Claude Code, use the slash command:

```
/speckit.constitution Create master game development constitution for LittleJS Game Jam 2025:

[Use the full constitution prompt from Phase 1, Step 4 above]
```

This creates `.specify/memory/constitution.md` that will guide all development.

#### Phase 4: Create Directory Structure

```bash
# Create shared resources
mkdir -p shared/{assets/{tilesets,fonts,audio},components,tools}

# Create prototypes directory
mkdir -p prototypes

# Create games directory (subfolders for individual games)
mkdir -p games

# Create documentation directory
mkdir -p docs

# Create tools directory
mkdir -p tools
```

#### Phase 5: Create Shared Components

```bash
# Create physics helpers (copy content from Phase 2 above)
# Create particle presets (copy content from Phase 2 above)
```

#### Phase 6: Create Development Tools

```bash
# Create game initializer script (copy content from Phase 5 above)
chmod +x tools/*.sh
```

#### Phase 7: Create Documentation Templates

```bash
# Create dev journal (copy template from Phase 6 above)
# Create other docs
```

#### Phase 8: Initialize Git (if needed)

```bash
# Check if already a git repo
git status

# If not, initialize
git init
git add .
git commit -m "Initial workspace setup for LittleJS game development with Spec Kit + Claude Code integration"
```

#### Phase 9: Create Your First Game

```bash
# Use the game initializer
./tools/game-initializer.sh "game-jam-2025"

# Navigate to the game
cd games/game-jam-2025

# Open in Claude Code and start development
claude .

# Use Spec-Driven Development workflow:
# /speckit.constitution → /speckit.specify → /speckit.clarify → /speckit.plan → /speckit.tasks → /speckit.implement
```

---

## 📊 Directory Purpose Matrix

| Directory | Purpose | SDD Phase | Frequency |
|-----------|---------|-----------|-----------|
| `.specify/` | Spec Kit workspace config | Pre-Dev | Once |
| `knowledge-base/` | Reference & learning | Study | Reference |
| `LittleJS/` | Engine source | Dev | Reference |
| `spec-kit/` | SDD tooling | Dev | Daily |
| `shared/` | Reusable components | Dev | Weekly |
| `prototypes/` | Quick experiments | Research | Weekly |
| `games/` | Full game projects | Dev | Daily |
| `docs/` | Documentation | All | Daily |
| `tools/` | Automation scripts | Dev | Weekly |

---

## 🔄 Development Workflow

### Creating New Game Project

```bash
# Step 1: Initialize game using the initializer script
cd "/home/matt/Game Development"
./tools/game-initializer.sh "my-game"

# This creates:
# - games/my-game/ directory
# - games/my-game/.specify/ for game-specific specs/plans/tasks
# - games/my-game/src/, assets/, tests/ directories
# - games/my-game/package.json, index.html, README.md

# Step 2: Navigate to game subdirectory
cd games/my-game

# Step 3: Open in Claude Code
claude .
# or from Windows: Open Folder → \\wsl.localhost\Ubuntu-22.04\home\matt\Game Development\games\my-game

# Step 4: Define game-specific constitution (inherits from root)
/speckit.constitution Create game constitution for "my-game":
- Theme Interpretation: SMALL means [your creative interpretation]
- Physics Focus: [Novel mechanic for physics prize - e.g., "micro-gravity puzzles"]
- Art Direction: Pixel art, 8-color palette
- Audio: Procedural ZzFX only
- Scope: Single-player, 10 levels, 15-minute playtime
- Innovation: [Unique gameplay hook]

# Step 5: Create first feature specification
/speckit.specify Create core game loop:
[Describe the game concept, mechanics, player goals, win/lose conditions, etc.]

Example:
Create a micro-platformer where the player is a tiny character navigating through everyday objects
that appear massive due to their SMALL size. Physics-based puzzles involve manipulating surface
tension on water droplets, using static electricity to attract/repel objects, and riding dust particles.
Target physics innovation: realistic micro-scale physics with educational accuracy.

# Step 6: Clarify underspecified areas
/speckit.clarify
# Claude will ask targeted questions about ambiguities
# Answer them to refine the spec

# Step 7: Create technical implementation plan
/speckit.plan
Use LittleJS engine for rendering and physics.
Implement custom micro-physics layer for surface tension and electrostatic forces.
Use shared physics helpers from ../../shared/components/physics-helpers.js.
Tilemap for levels, particle effects for dust/water droplets.
ZzFX for all audio.

# Step 8: Generate task breakdown
/speckit.tasks
# Claude creates detailed task list with TDD approach

# Step 9: Implement the game
/speckit.implement
# Claude executes all tasks in order

# Step 10: Test and iterate
npm run dev
# Open http://localhost:8000 in browser

npm test
# Run tests

# Step 11: Document learnings
# Add entry to ../../docs/dev-journal.md
```

**Key Points**:
- Each game is a **standalone subfolder** in `games/`
- Each game has its own `.specify/` for specs/plans/tasks
- All games share the root `.claude/commands/` for Spec Kit slash commands
- Games can import shared components from `../../shared/components/`
- Games link to LittleJS engine at `../../LittleJS/dist/littlejs.min.js`

### Creating Quick Prototype

```bash
# Step 1: Create prototype directory
mkdir prototypes/00X-prototype-name
cd prototypes/00X-prototype-name

# Step 2: Copy minimal template
cp ../../games/game-jam-2025/index.html .
mkdir src

# Step 3: Create quick game.js
# [Write experimental code]

# Step 4: Test
python3 -m http.server 8000

# Step 5: Document learnings in prototypes/README.md
```

---

## 🎯 Best Practices

### From Knowledge Base

1. **Constitution-Driven**
   - Every decision validated against constitution
   - Physics innovation focus
   - SMALL theme integration

2. **Test-First Development**
   - Write tests before implementation
   - Physics behaviors must be validated
   - TDD for all game mechanics

3. **Iterative Refinement**
   - Prototype → Test → Refine
   - Daily commits
   - Community feedback loops

4. **Physics Prize Focus**
   - Novel mechanics experiments in prototypes/
   - Reusable physics helpers in shared/
   - Documentation of innovations

5. **AI-Assisted Development**
   - Use Claude Code for all Spec Kit commands
   - AI generates code from specifications
   - Human validates and refines

### Directory Management

1. **Keep shared/ DRY**
   - Extract common code to shared/components/
   - Reuse across all games
   - Version shared libraries

2. **Prototypes Graduate**
   - Successful prototypes → games/
   - Failed prototypes documented for learning
   - Time-box all prototypes (4 hours max)

3. **One Game in Development**
   - Focus on game-jam-2025 initially
   - Other games for practice only
   - Avoid context switching

4. **Documentation Discipline**
   - Daily dev journal entries
   - Document all physics experiments
   - Track theme interpretations

---

## 🔗 Integration Points

### LittleJS Engine
- **Location**: `./LittleJS/`
- **Usage**: Linked from game projects
- **Updates**: Pull latest from GitHub regularly

### Spec Kit
- **Location**: `./spec-kit/` (source), `.specify/` (config)
- **Usage**: All game development workflows
- **Commands**: Available in all game directories

### Knowledge Base
- **Location**: `./knowledge-base/`
- **Usage**: Reference during development
- **Access**: Keep quick-reference open

### Shared Resources
- **Location**: `./shared/`
- **Usage**: Import in game projects
- **Pattern**: ES6 modules for reusability

---

## 📈 Success Metrics

### Directory Health
- [ ] All game projects have `.specify/` initialized
- [ ] Master constitution exists and is followed
- [ ] Shared components are used across projects
- [ ] Documentation is up-to-date
- [ ] Tools are executable and working

### Development Velocity
- [ ] New game project setup: <10 minutes
- [ ] New prototype setup: <5 minutes
- [ ] Shared component reuse: >50%
- [ ] Daily commits: Yes
- [ ] Physics experiments: Weekly

### Quality Indicators
- [ ] All games have test coverage
- [ ] Constitution gates passing
- [ ] No duplication across projects
- [ ] Clean git history
- [ ] Community engagement active

---

## 🆘 Troubleshooting

### Issue: Spec Kit commands not found
**Solution**: Ensure `.specify/` is initialized in game directory
```bash
cd games/[game-name]
specify init --here --ai claude --force
```

### Issue: Shared components not importing
**Solution**: Use relative paths from game directory
```javascript
import { GravityWell } from '../../shared/components/physics-helpers.js';
```

### Issue: LittleJS not loading
**Solution**: Check path in index.html
```html
<script src="../../LittleJS/dist/littlejs.min.js"></script>
```

### Issue: Tools not executable
**Solution**: Set permissions
```bash
chmod +x tools/*.sh
```

### Issue: Claude Code can't find Spec Kit commands
**Solution**: Ensure you're opening the workspace root, not a game subdirectory
```bash
# Correct: Open workspace root in Claude Code
cd "/home/matt/Game Development"
claude .

# The .claude/commands/ at root level contains all Spec Kit slash commands
# They will be available in all subdirectories
```

### Issue: WSL2 path access from Windows
**Solution**: Use the WSL network path
- Windows path: `\\wsl.localhost\Ubuntu-22.04\home\matt\Game Development`
- Linux path: `/home/matt/Game Development`
- Both refer to the same location

---

## 🖥️ WSL2-Specific Notes

### Path Translation

| Context | Path Format | Example |
|---------|-------------|---------|
| Linux/WSL2 Terminal | `/home/matt/Game Development` | Used in bash scripts, terminal commands |
| Windows Explorer | `\\wsl.localhost\Ubuntu-22.04\home\matt\Game Development` | Used when browsing from Windows |
| VS Code/Claude Code | Either format works | Opens the same workspace |

### Opening Workspace in Claude Code

**From WSL2 Terminal**:
```bash
cd "/home/matt/Game Development"
claude .
```

**From Windows**:
1. Open Claude Code / VS Code
2. File → Open Folder
3. Enter: `\\wsl.localhost\Ubuntu-22.04\home\matt\Game Development`

**From Windows Explorer**:
1. Navigate to `\\wsl.localhost\Ubuntu-22.04\home\matt\Game Development`
2. Right-click → "Open with Code" (if VS Code is installed)

### Git Configuration in WSL2

Ensure Git is configured in your WSL2 environment:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Optional: Configure line endings for cross-platform work
git config --global core.autocrlf input
```

### File Permissions in WSL2

Scripts and tools require execute permissions:

```bash
# Make all scripts in tools/ executable
chmod +x tools/*.sh

# Make Spec Kit scripts executable (created during init)
chmod +x .specify/scripts/bash/*.sh
```

### Performance Considerations

**Best Practices**:
- Keep all development files in WSL2 filesystem (`/home/matt/...`), not Windows filesystem (`/mnt/c/...`)
- This setup is already optimal - files are in `/home/matt/Game Development`
- WSL2 has much faster I/O for files in Linux filesystem vs. mounted Windows drives

**Why this matters**:
- ✅ `/home/matt/Game Development` - Fast (native Linux filesystem)
- ❌ `/mnt/c/Users/...` - Slow (Windows filesystem accessed through WSL2)

---

## 📞 Next Actions

### Immediate (Today)
1. ✅ Read this plan
2. ⏳ Execute Phase 1: Initialize Spec Kit workspace
3. ⏳ Execute Phase 2: Create directory structure
4. ⏳ Execute Phase 3: Create shared components

### This Week
1. ⏳ Execute Phase 4-7: Complete setup
2. ⏳ Initialize first prototype
3. ⏳ Test complete workflow
4. ⏳ Document any issues

### Ongoing
1. ⏳ Daily dev journal entries
2. ⏳ Weekly prototype experiments
3. ⏳ Community engagement on Discord
4. ⏳ Knowledge base refinement

---

## 📝 Summary of Key Integration Points

### Claude Code + Spec Kit Integration

1. **Root Level** (`/home/matt/Game Development/`):
   - `.claude/commands/` contains Spec Kit slash commands (workspace-wide)
   - `.specify/memory/constitution.md` contains master principles
   - `.specify/templates/` contains reusable templates
   - Available in Claude Code from any subdirectory

2. **Game Level** (`games/[game-name]/`):
   - Each game has own `.specify/` for feature specs/plans/tasks
   - Inherits slash commands from root `.claude/commands/`
   - Can be opened individually in Claude Code
   - Uses relative paths to shared resources (`../../shared/`, `../../LittleJS/`)

3. **Workflow**:
   - One-time: `specify init --here --ai claude --force` at root
   - Per-game: `./tools/game-initializer.sh "game-name"`
   - Development: `/speckit.constitution` → `/speckit.specify` → `/speckit.clarify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`

### WSL2 Integration

- **Linux path**: `/home/matt/Game Development` (fast, native)
- **Windows path**: `\\wsl.localhost\Ubuntu-22.04\home\matt\Game Development`
- **Best practice**: Keep all files in WSL2 filesystem for optimal performance
- **Access**: Both paths refer to the same location, use whichever is convenient

---

**Status**: PLAN UPDATED FOR WSL2 + CLAUDE CODE INTEGRATION
**Version**: 2.0 (Updated October 13, 2025)
**Next Step**: Execute Phase 1 - Initialize Root Spec Kit
**Estimated Setup Time**: 2-3 hours for complete workspace setup

---

*This directory structure is optimized for success in the LittleJS Game Jam 2025 using Spec-Driven Development methodology with Claude Code integration on WSL2 Ubuntu 22.04. Time to build something SMALL but MIGHTY!* 🚀🎮🏆
