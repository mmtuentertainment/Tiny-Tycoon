# Applying Spec-Driven Development to Game Development

> **Navigation**: [← Knowledge Base Home](../README.md) | [Next: Game Specification →](02-game-specification.md)

## Why SDD for Game Jams?

Spec-Driven Development isn't just for enterprise software - it's **perfect for game jams** because:

1. **31-Day Timeline** = Structured execution beats chaos
2. **AI Tools Permitted** = SDD is AI-native methodology
3. **Theme Interpretation** = Specs capture creative vision
4. **Technical Complexity** = LittleJS has many systems to coordinate
5. **Team Collaboration** = Specs as shared understanding

## 🔗 The Perfect Storm

### LittleJS + Spec Kit + Game Jam

```
┌──────────────┐      ┌─────────────┐      ┌──────────────┐
│   LittleJS   │  ←→  │  Spec Kit   │  ←→  │  Game Jam    │
│              │      │             │      │              │
│ • Physics    │      │ • /specify  │      │ • Theme      │
│ • Rendering  │      │ • /plan     │      │ • 31 Days    │
│ • Audio      │      │ • /tasks    │      │ • Prizes     │
│ • Particles  │      │ • /implement│      │ • Community  │
└──────────────┘      └─────────────┘      └──────────────┘
     ↓                      ↓                     ↓
  Technical              Process              Context
  Foundation            Structure            & Goals
```

**The Synergy**:
- SDD structures your 31 days
- LittleJS provides technical foundation
- Game Jam gives theme and motivation
- AI tools amplify all three

## Game Development Workflow

### Traditional vs SDD Game Development

#### Traditional Game Jam Approach

```
Day 1-2: Brainstorm → Prototype
Day 3-10: Build features (no plan)
Day 11-20: Realize scope too large
Day 21-25: Cut features desperately
Day 26-30: Fix bugs, crunch time
Day 31: Submit incomplete game
```

**Problems**:
- No clear vision
- Scope creep
- Late-stage cuts
- Technical debt
- Burnout

#### SDD Game Jam Approach

```
Days 1-3: Specify → Clarify theme interpretation
Days 4-5: Plan → Choose LittleJS features
Day 6: Tasks → Break into 20-day schedule
Days 7-26: Implement → Follow task list
Days 27-31: Polish → Particles, audio, juice
```

**Advantages**:
- Clear vision from start
- Controlled scope
- Systematic execution
- Testable features
- Sustainable pace

### The SDD Game Development Cycle

```
┌─────────────────────────────────────────┐
│  Phase 1: Vision (Days 1-3)             │
├─────────────────────────────────────────┤
│  /speckit.constitution                  │
│  → Game principles & constraints        │
│                                         │
│  /speckit.specify                       │
│  → Game concept & theme interpretation  │
│                                         │
│  /speckit.clarify                       │
│  → Resolve ambiguities                  │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Phase 2: Architecture (Days 4-5)       │
├─────────────────────────────────────────┤
│  /speckit.plan                          │
│  → LittleJS systems to use              │
│  → Physics, rendering, audio choices    │
│  → Asset requirements                   │
│  → Test strategy                        │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Phase 3: Breakdown (Day 6)             │
├─────────────────────────────────────────┤
│  /speckit.tasks                         │
│  → 20-day implementation schedule       │
│  → Parallel task identification         │
│  → Dependency management                │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Phase 4: Execution (Days 7-26)         │
├─────────────────────────────────────────┤
│  /speckit.implement                     │
│  → Follow task list                     │
│  → Test-first development               │
│  → Daily progress commits               │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Phase 5: Polish (Days 27-31)           │
├─────────────────────────────────────────┤
│  • Particle effects                     │
│  • Audio feedback                       │
│  • Screen shake & juice                 │
│  • Performance optimization             │
│  • Browser testing                      │
│  • itch.io page setup                   │
└─────────────────────────────────────────┘
```

## Adapting SDD to Games

### Game-Specific Constitution

**Standard SDD Constitution** focuses on software architecture.
**Game Constitution** focuses on game design principles.

#### Example: Physics Puzzle Game Constitution

```markdown
# Physics Puzzle Game Constitution

## Core Game Design Principles

### Article I: One Mechanic, Infinite Depth
Every feature must expand the core physics mechanic.
No side mechanics or distractions.
Deep mastery over broad variety.

**Gate**: Can player master this in 5 minutes but spend 50 perfecting it?

### Article II: Visual Clarity
All physics interactions must be visually obvious.
Color-coded object types.
Clear visual feedback for every action.

**Gate**: Can new player understand rules without text?

### Article III: Test-First Gameplay (NON-NEGOTIABLE)
Every physics interaction has automated test.
Acceptance criteria verified before implementation.
Playtesting required for each feature.

**Gate**: Does test validate the "fun"?

### Article IV: Juice & Feedback
Every player action requires:
- Visual feedback (particles, screen shake)
- Audio feedback (ZzFX sound)
- Tactile feedback (vibration if mobile)

**Gate**: Does action feel satisfying?

### Article V: Progressive Challenge
Levels introduce ONE new concept at a time.
Early levels tutorial, late levels mastery test.
Difficulty curve: gradual, then steep.

**Gate**: Can player learn incrementally?

### Article VI: SMALL Theme Integration
Game concept embodies "SMALL":
- Small player character
- Small levels (fit on one screen)
- Small color palette (8 colors max)
- Small file size (<10MB goal)

**Gate**: How does this feature serve "SMALL"?

### Article VII: Mobile-First
Touch controls as primary input.
UI elements sized for fingers.
Performance target: 60fps on mobile.

**Gate**: Is it playable on phone?

### Article VIII: Physics Prize Focus
Creative physics implementation showcased.
Novel use of LittleJS physics system.
Technical excellence in collision response.

**Gate**: Does this highlight physics innovation?

## Governance
All feature decisions validated against these articles.
Physics prize requirements influence all choices.
```

### Game-Specific Specifications

**Software Spec** focuses on user stories and requirements.
**Game Spec** focuses on gameplay scenarios and feel.

#### Example: Bouncy Block Game Specification

```markdown
# Game Specification: Bouncy Blocks

**Theme**: SMALL
**Genre**: Physics Puzzle
**Target**: Physics Prize ($100)

## Core Game Loop

Given player controls small ball
When player aims and releases
Then ball bounces off blocks
And blocks change state
Until all blocks cleared

## Gameplay Scenarios

### Scenario 1: Basic Bounce (Priority: P1)
**Setup**: Ball at bottom, single block at top
**Action**: Player taps screen to launch ball
**Expected**:
- Ball launches with trajectory preview
- Ball bounces off block with elastic collision
- Block plays destruction animation
- Score increases by 10
- Ball returns to bottom

**Why P1**: Core mechanic must feel perfect

**Independent Test**: Can be verified with single block

**Acceptance Criteria**:
- Ball maintains energy on bounce (no damping)
- Trajectory preview shows accurate path
- Collision response feels "juicy"
- Sound plays on impact

### Scenario 2: Chain Reactions (Priority: P2)
**Setup**: Multiple blocks arranged in pattern
**Action**: Ball strikes first block
**Expected**:
- First block explodes into particles
- Particles push nearby blocks
- Chain reaction propagates
- Combo multiplier increases
- Special sound for combos

**Why P2**: Adds depth to core mechanic

**Independent Test**: Verify chain reaction logic

**Acceptance Criteria**:
- Explosion force calculated from velocity
- Particles affect other physics objects
- Combo system rewards planning
- Visual feedback escalates with combo

### Scenario 3: Gravity Zones (Priority: P3)
**Setup**: Some blocks create gravity wells
**Action**: Ball enters gravity zone
**Expected**:
- Ball trajectory curves toward gravity source
- Visual distortion shows gravity field
- Player can use gravity for trick shots
- Different ball paths possible

**Why P3**: Adds strategy layer

**Independent Test**: Gravity math verification

## Requirements

### Functional Requirements

**Physics (Prize Focus)**:
- FR-001: Ball MUST use LittleJS arcade physics
- FR-002: Collisions MUST calculate impulse based on velocity
- FR-003: Explosions MUST apply radial force to nearby objects
- FR-004: Gravity zones MUST affect ball trajectory realistically
- FR-005: All physics MUST run at 60fps

**Input**:
- FR-006: Touch input MUST show trajectory preview
- FR-007: Mouse input MUST support click-and-drag aiming
- FR-008: Keyboard MUST provide precise angle control

**Visual**:
- FR-009: Particles MUST spawn on all collisions
- FR-010: Screen shake MUST scale with impact force
- FR-011: Color palette MUST use only 8 colors (SMALL theme)

**Audio**:
- FR-012: ZzFX MUST generate all sounds procedurally
- FR-013: Pitch MUST vary with impact velocity
- FR-014: Combo sounds MUST layer harmonically

### Non-Functional Requirements

**Performance**:
- NFR-001: Maintain 60fps with 50+ physics objects
- NFR-002: Load time under 2 seconds
- NFR-003: Total bundle size under 10MB

**Compatibility**:
- NFR-004: Works in Chrome, Firefox, Safari
- NFR-005: Touch controls on iOS and Android
- NFR-006: Responsive layout for all screen sizes

**Theme**:
- NFR-007: Every feature serves "SMALL" theme
- NFR-008: Visual style reinforces smallness
- NFR-009: Limited scope (quality over quantity)

## Success Criteria

**Player Experience**:
- SC-001: Players grasp core mechanic in first launch
- SC-002: Successful bounce feels satisfying
- SC-003: Players say "one more try" after failure
- SC-004: 80% of players complete first 5 levels

**Technical Excellence** (Physics Prize):
- SC-005: Physics innovation evident in first 30 seconds
- SC-006: Novel use of collision response demonstrated
- SC-007: No physics bugs or glitches
- SC-008: Smooth 60fps maintained throughout

**Theme Integration**:
- SC-009: 3+ interpretations of "SMALL" present
- SC-010: Theme enhances gameplay, not just aesthetic
- SC-011: Players identify theme without prompting

## Visual Style

**Art Direction**:
- Minimalist pixel art
- 8-color palette (SMALL constraint)
- Simple shapes (circles, squares)
- High contrast for clarity

**Animation**:
- Smooth 60fps interpolation
- Particle effects for impact
- Squash and stretch on ball
- Screen shake on heavy hits

**UI**:
- Minimal HUD (score, lives)
- Finger-sized touch targets
- Clear iconography
- No text menus

## Audio Design

**Sound Effects** (ZzFX):
- Bounce: High pitch, short decay
- Explosion: Low rumble, long decay
- Combo: Ascending harmonic series
- Game Over: Descending chromatic scale

**Music** (Optional):
- Simple loop, 8 bars
- Minimalist instrumentation
- Doesn't distract from gameplay
- Or no music, focus on SFX

## Level Design

**Progression**:
1. Level 1: Single block (tutorial)
2. Level 2: Row of blocks (aiming)
3. Level 3: L-shape (ricochets)
4. Level 4: Moving blocks (timing)
5. Level 5: Gravity well (advanced)

**Structure**:
- 10 levels total (SMALL scope)
- Each fits on one screen
- Difficulty curve: gentle → steep
- Last 3 levels challenge mastery

## Technical Risks

**Risk 1: Physics Instability**
- Mitigation: Fixed timestep (LittleJS handles)
- Mitigation: Max velocity clamping
- Mitigation: Continuous collision detection

**Risk 2: Mobile Performance**
- Mitigation: Particle count limits
- Mitigation: Object pooling
- Mitigation: WebGL rendering

**Risk 3: Touch Input Precision**
- Mitigation: Trajectory preview
- Mitigation: Touch target size
- Mitigation: Input smoothing
```

### Game-Specific Implementation Plan

**Software Plan** focuses on architecture and APIs.
**Game Plan** focuses on systems and content.

#### Example: Implementation Plan

```markdown
# Implementation Plan: Bouncy Blocks

## Technical Context

**Engine**: LittleJS 1.14.16
**Language**: JavaScript (ES6)
**Rendering**: WebGL2 (instanced sprites)
**Physics**: LittleJS arcade physics
**Audio**: ZzFX procedural sounds
**Input**: Mouse + Touch
**Target**: Modern browsers (Chrome, Firefox, Safari)
**Performance**: 60fps, <10MB total

## LittleJS Systems Used

### Physics System (Prize Focus)
- EngineObject for ball and blocks
- Custom collision response for elasticity
- Radial force for explosions
- Gravity zones with custom force application

### Rendering System
- Tile-based sprites (8x8 blocks)
- Particle emitters for explosions
- Screen shake via camera offset
- Color palette shader (8 colors)

### Audio System
- ZzFX for all sound effects
- Pitch variation based on velocity
- Harmonic layering for combos

### Input System
- Mouse for desktop (click-drag)
- Touch for mobile (tap-drag)
- Keyboard for precision (arrow keys)

## Constitution Check

### Article I: One Mechanic
✅ Everything serves ball-bouncing mechanic
✅ No side gameplay modes
✅ Deep physics interactions

### Article III: Test-First
✅ Physics tests written first
✅ Collision response verified
✅ Acceptance criteria automated

### Article VI: SMALL Theme
✅ 8-color palette
✅ Small player (0.5 units)
✅ One-screen levels
✅ <10MB bundle

### Article VIII: Physics Prize
✅ Novel elastic collision tuning
✅ Explosion force propagation
✅ Gravity well trajectories
✅ Technical excellence focus

## Project Structure

```
bouncy-blocks/
├── src/
│   ├── game.js           # Main loop & initialization
│   ├── ball.js           # Ball physics object
│   ├── block.js          # Block physics object
│   ├── gravityWell.js    # Gravity zone object
│   ├── level.js          # Level loading & management
│   ├── particles.js      # Particle effects
│   ├── sounds.js         # ZzFX definitions
│   └── ui.js             # Score, lives, menus
├── tests/
│   ├── physics.test.js   # Ball & block physics
│   ├── collision.test.js # Collision response
│   ├── gravity.test.js   # Gravity calculations
│   └── levels.test.js    # Level loading
├── assets/
│   └── sprites.png       # 8x8 tile atlas
├── index.html
└── README.md
```

## Phase 0: Research & Validation

**LittleJS Physics Capabilities**:
- [x] Confirm elastic collision support (elasticity property)
- [x] Test radial force application (custom update loop)
- [x] Validate 60fps with 50+ objects (stress test)
- [x] Mobile touch input responsiveness (test on device)

**ZzFX Sound Design**:
- [x] Bounce sound (pitch: 200-800Hz)
- [x] Explosion sound (pitch: 50-150Hz, long decay)
- [x] Combo sound (harmonic series: 440, 550, 660Hz)

**Visual Style**:
- [x] 8-color palette defined
- [x] Sprite atlas designed (8x8 tiles)
- [x] Particle styles prototyped

## Phase 1: Core Mechanics (Days 7-16)

### Task 1-5: Physics Foundation
1. Create Ball class with LittleJS EngineObject
2. Implement elastic collision (elasticity = 1.0)
3. Add velocity-based bounce angle
4. Test: Ball maintains energy on bounce
5. Test: Collision angle calculation

### Task 6-10: Block System
6. Create Block class with health
7. Implement destruction on impact
8. Add particle explosion on destroy
9. Test: Block takes damage based on impact force
10. Test: Particles spawn with radial velocity

### Task 11-15: Input & Aiming
11. Implement trajectory preview line
12. Add touch input (tap-drag-release)
13. Add mouse input (click-drag-release)
14. Test: Preview shows accurate path
15. Test: Touch and mouse feel identical

## Phase 2: Advanced Features (Days 17-24)

### Task 16-20: Chain Reactions
16. Implement explosion force radius
17. Apply radial impulse to nearby objects
18. Add combo counter and multiplier
19. Test: Force decreases with distance
20. Test: Combo rewards strategic play

### Task 21-25: Gravity Wells
21. Create GravityWell class
22. Calculate gravity force (inverse square)
23. Apply force to ball in update loop
24. Add visual distortion effect
25. Test: Trajectory curves realistically

## Phase 3: Content & Polish (Days 25-26)

### Task 26-30: Levels
26. Create level data format
27. Implement level loader
28. Design 10 levels (progression)
29. Test: Each level teaches one concept
30. Playtest: Difficulty curve validation

### Task 31-35: Juice
31. Screen shake on collision
32. Particle effects tuning
33. ZzFX sound implementation
34. Color palette shader
35. UI polish (score, lives)

## Phase 4: Final Polish (Days 27-31)

### Performance Optimization
- Profile with 50+ objects
- Optimize particle counts
- Test on low-end mobile

### Browser Testing
- Chrome desktop/mobile
- Firefox desktop/mobile
- Safari iOS

### Submission Prep
- itch.io page (screenshots, description)
- Game embed setup
- Controls documentation
- Physics innovation showcase
```

## Game-Specific Tasks

**Software tasks** focus on implementation.
**Game tasks** focus on gameplay and feel.

```markdown
# Task Breakdown: Bouncy Blocks

## Parallel Tasks Identification

**Group A** (Physics - Sequential):
1. Ball physics
2. Block physics
3. Collision response
4. Tests for above

**Group B** (Content - Parallel with A):
5. [P] Sprite atlas creation
6. [P] ZzFX sound design
7. [P] Level data format

**Group C** (Polish - Parallel):
8. [P] Particle effect tuning
9. [P] UI layout design
10. [P] Color palette implementation

## Implementation Schedule (20 Days)

### Week 1: Core Mechanics (Days 7-13)
**Focus**: Make bouncing feel perfect

**Mon-Wed** (Days 7-9):
- Task 1: Ball class with EngineObject
- Task 2: Elastic collision tuning
- Task 3: Bounce tests
- **Goal**: Ball bounces satisfyingly

**Thu-Fri** (Days 10-11):
- Task 4: Block class
- Task 5: Destruction logic
- **Goal**: Blocks break on impact

**Weekend** (Days 12-13):
- Task 6: Trajectory preview
- Task 7: Input implementation
- **Goal**: Aiming feels precise
- **Playtest**: Core loop evaluation

### Week 2: Advanced Physics (Days 14-20)
**Focus**: Physics prize innovation

**Mon-Wed** (Days 14-16):
- Task 8: Explosion force
- Task 9: Radial impulse
- Task 10: Chain reaction tests
- **Goal**: Satisfying explosions

**Thu-Fri** (Days 17-18):
- Task 11: Gravity wells
- Task 12: Trajectory curves
- **Goal**: Strategic depth

**Weekend** (Days 19-20):
- Task 13: Combo system
- Task 14: Advanced tests
- **Goal**: Rewarding mastery
- **Playtest**: Physics showcase

### Week 3: Content & Polish (Days 21-26)
**Focus**: Complete game loop

**Mon-Wed** (Days 21-23):
- Task 15: Level system
- Task 16: 10 levels designed
- Task 17: Progression tests
- **Goal**: Full game arc

**Thu-Fri** (Days 24-25):
- Task 18: Particle polish
- Task 19: Screen shake
- Task 20: Audio implementation
- **Goal**: Maximum juice

**Weekend** (Day 26):
- Task 21: UI polish
- Task 22: Performance optimization
- **Goal**: Ready to ship
- **Playtest**: Final validation

### Week 4: Submission (Days 27-31)
**Focus**: Quality assurance & launch

**Mon-Wed** (Days 27-29):
- Browser testing (all platforms)
- Mobile testing (iOS, Android)
- Bug fixes
- Performance tuning

**Thu** (Day 30):
- itch.io page creation
- Screenshots and GIFs
- Game description
- Controls documentation

**Fri** (Day 31):
- Final submission
- Community engagement
- Discord post
- Social media (#LittleJS)

## Daily Commit Schedule

Each day ends with:
1. Commit working code
2. Update task status
3. Note blockers/questions
4. Plan next day

**Commit Message Format**:
```
Day X: [Task name]

- Implemented: [features]
- Tests: [pass/fail]
- Next: [tomorrow's focus]
- Blockers: [issues if any]
```

## Risk Mitigation

**Risk**: Physics feels wrong
- **Mitigation**: Daily playtesting
- **Backup**: Elasticity tuning parameters

**Risk**: Performance issues
- **Mitigation**: Target 50 objects max
- **Backup**: Reduce particle counts

**Risk**: Scope creep
- **Mitigation**: Constitution gates
- **Backup**: Cut P3 features if needed
```

## AI Tool Integration

### Using AI with SDD for Games

**Permitted in Jam**: ✅ AI tools explicitly allowed
**SDD Philosophy**: ✅ AI-native methodology

#### AI Workflow

```
1. Human: Define game vision (/speckit.specify)
   AI: Ask clarifying questions

2. Human: Answer clarifications (/speckit.clarify)
   AI: Generate detailed spec

3. Human: Provide tech choices (/speckit.plan)
   AI: Create implementation plan with LittleJS

4. Human: Request tasks (/speckit.tasks)
   AI: Break down into 20-day schedule

5. Human: Begin implementation (/speckit.implement)
   AI: Write code, tests, iterate

6. Human: Review and adjust
   AI: Refine based on feedback
```

#### What AI Generates

**Specifications**:
- User stories
- Acceptance criteria
- Success metrics

**Plans**:
- LittleJS system selection
- Technical architecture
- Risk assessment

**Code**:
- Game object classes
- Physics calculations
- Test suites
- ZzFX sounds

#### What Human Provides

**Vision**:
- Game concept
- Theme interpretation
- Target feel

**Decisions**:
- Scope boundaries
- Priority ordering
- Quality bar

**Validation**:
- Playtest feedback
- Feel assessment
- Strategic direction

### Claude Code Example

```bash
# In your game jam project directory

# 1. Establish principles
/speckit.constitution Create game jam principles:
physics innovation, visual clarity, test-first development,
SMALL theme integration

# 2. Define game
/speckit.specify Physics puzzle where player launches a ball
to break blocks. Chain reactions from explosions. Gravity wells
curve ball trajectory. Must feel satisfying and precise.
Theme: SMALL (tiny ball, compact levels, minimal colors)

# 3. Clarify details
/speckit.clarify
[AI asks questions about rules, scoring, difficulty]
[You answer interactively]

# 4. Technical plan
/speckit.plan Use LittleJS engine. EngineObject for physics.
Particle emitters for explosions. ZzFX for sounds.
WebGL rendering. Touch + mouse input. 10 levels total.

# 5. Generate tasks
/speckit.tasks

# 6. Implement
/speckit.implement
```

Claude Code will:
- Create project structure
- Write test files first
- Implement features to pass tests
- Use LittleJS APIs correctly
- Follow your constitution
- Commit progress regularly

## Success Patterns

### What Works

✅ **Clear Vision Early**: Spend days 1-3 on specification
✅ **Test-First**: Physics behaviors need tests
✅ **Daily Playtesting**: Feel trumps features
✅ **Controlled Scope**: 10 levels > 50 rough levels
✅ **Physics Focus**: Target the $100 prize specifically
✅ **Community**: Share progress on Discord
✅ **Constitution**: Refer back daily for decisions

### What Doesn't Work

❌ **Vague Specs**: "Make it fun" isn't testable
❌ **Skipping Planning**: Chaos by day 15
❌ **Feature Creep**: Constitution gates prevent this
❌ **No Tests**: Physics bugs ruin feel
❌ **Last-Minute Polish**: Start day 25, not day 30
❌ **Isolation**: Community helps motivation
❌ **Ignoring Constitution**: Ensures consistency

## Resources

### Knowledge Base
- **LittleJS**: [../01-littlejs/](../01-littlejs/) - Engine reference
- **Spec Kit**: [../02-spec-kit/](../02-spec-kit/) - Methodology
- **Game Jam**: [../03-game-jam/](../03-game-jam/) - Competition details

### Specific Guides
- **Game Specs**: [02-game-specification.md](02-game-specification.md)
- **Physics Prize**: [03-physics-prize-strategy.md](03-physics-prize-strategy.md)
- **31-Day Timeline**: [04-31-day-timeline.md](04-31-day-timeline.md)
- **AI Workflow**: [05-ai-workflow.md](05-ai-workflow.md)

### Templates
- **Game Spec Template**: [../06-examples/game-spec-template.md](../06-examples/game-spec-template.md)
- **Game Plan Template**: [../06-examples/game-plan-template.md](../06-examples/game-plan-template.md)
- **Physics Examples**: [../06-examples/physics-examples.md](../06-examples/physics-examples.md)

---

**Key Insight**: SDD transforms game jams from creative chaos into structured creativity. The structure frees you to focus on what matters: making great gameplay.

**Next**: [02-game-specification.md →](02-game-specification.md)
