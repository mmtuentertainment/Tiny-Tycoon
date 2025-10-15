# Constitution Location Guide

## Tiny Tycoon Project Constitution

**Location**: `games/game-jam-2025/.specify/memory/constitution.md`

This is the **Tiny Tycoon specific constitution** with 5 core principles:

1. **Theme-First Development (NON-NEGOTIABLE)** - "SMALL" theme requirements
2. **Katamari Mechanics (CORE IDENTITY)** - Physics and gameplay foundations
3. **Game Jam Timeline (SHIP BY NOV 3, 2025)** - Priority hierarchy (P1-P4) and milestones
4. **LittleJS Native Development** - Engine idioms and architecture
5. **Playable > Pretty (PRIORITIZATION)** - Quality gates and definition of "done"

## Workspace Constitution (Different!)

**Location**: `.specify/memory/constitution.md` (workspace root)

This is a **generic LittleJS Game Development Constitution** with different principles:

- Article I: Library-First Development
- Article II: Test-First Development (NON-NEGOTIABLE)
- Article III: Physics Innovation Priority
- Article IV: Simplicity & Scope Management
- Article V-VIII: Additional development principles

## Which One to Use?

**For Tiny Tycoon features**: ALWAYS use `games/game-jam-2025/.specify/memory/constitution.md`

The Tiny Tycoon constitution defines:
- Specific theme requirements ("SMALL")
- Katamari-specific mechanics
- Nov 3, 2025 ship date
- P1/P2/P3/P4 priority system for game jam

## Why Two Constitutions?

- **Workspace constitution**: Generic guidelines for any LittleJS game in the workspace
- **Tiny Tycoon constitution**: Specific rules for the game jam 2025 project

When running `/speckit.*` commands from the Tiny Tycoon directory, the game-specific constitution takes precedence.

## Verification

To verify you're using the correct constitution:

```bash
# Should show "Tiny Tycoon Constitution"
head -70 games/game-jam-2025/.specify/memory/constitution.md | grep "Tiny Tycoon"

# Should show the 5 principles with "SMALL" theme
grep -A2 "### I\." games/game-jam-2025/.specify/memory/constitution.md
```

---

**Version**: 1.0
**Date**: 2025-10-14
**Purpose**: Prevent constitution confusion between workspace and project-specific rules
