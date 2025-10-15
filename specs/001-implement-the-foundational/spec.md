# Feature Specification: Core Katamari Mechanic

**Feature Branch**: `001-implement-the-foundational`
**Created**: 2025-10-14
**Status**: Draft
**Input**: User description: "Implement the foundational Katamari-style gameplay mechanic where players control a growing ball that collects objects smaller than itself. Start SMALL (0.5x0.5 units) as a tiny entrepreneur and grow BIG through exponential size progression. Includes: WASD/Arrow movement with momentum physics, size-based collision detection (can only collect smaller objects), magnetic attraction for near-size items, collectible spawning system (coins and customers), exponential growth on collection, smooth camera follow with lerp, and basic HUD showing size/score. Theme 'SMALL' must be evident within first 30 seconds of gameplay through dramatic visual scale changes."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Player Movement & Control (Priority: P1)

As a player, I want to control a ball using keyboard inputs so that I can navigate the game world to collect objects and grow my business empire.

**Why this priority**: This is the absolute foundation of the game. Without player movement, no other mechanics can function. This must be implemented first as all other user stories depend on a controllable player entity.

**Independent Test**: Can be fully tested by loading the game and using WASD/Arrow keys to move the player ball around the screen. Success is achieved when the ball responds to input, maintains momentum, and camera follows smoothly.

**Acceptance Scenarios**:

1. **Given** the game has loaded, **When** I press the W or Up Arrow key, **Then** the player ball accelerates upward
2. **Given** the game has loaded, **When** I press the A or Left Arrow key, **Then** the player ball accelerates left
3. **Given** the game has loaded, **When** I press the S or Down Arrow key, **Then** the player ball accelerates downward
4. **Given** the game has loaded, **When** I press the D or Right Arrow key, **Then** the player ball accelerates right
5. **Given** the player ball is moving, **When** I release all movement keys, **Then** the ball gradually slows down due to momentum/damping
6. **Given** the player ball is moving, **When** the ball changes position, **Then** the camera smoothly follows the ball's movement
7. **Given** the player ball exists, **When** I view the game, **Then** I see the ball starting at a very small size (0.5×0.5 units)

---

### User Story 2 - Size-Based Collection System (Priority: P1)

As a player, I want to collect objects that are smaller than my current size so that I can grow my ball and feel progression through the game.

**Why this priority**: This is the core Katamari mechanic that defines the entire game. Collection is the primary interaction and the source of all progression. Without this, the game has no gameplay loop.

**Independent Test**: Can be fully tested by spawning collectibles of various sizes and moving the player ball into them. Success is achieved when objects smaller than the player disappear on contact, objects larger than the player cannot be collected, and the player receives visual/audio feedback.

**Acceptance Scenarios**:

1. **Given** a collectible object is smaller than the player ball, **When** the player ball touches the collectible, **Then** the collectible is absorbed and disappears
2. **Given** a collectible object is larger than the player ball, **When** the player ball touches the collectible, **Then** the collectible is NOT absorbed and remains in place
3. **Given** a collectible object is exactly the same size as the player ball, **When** the player ball touches the collectible, **Then** the collectible cannot be absorbed (size must be strictly smaller)
4. **Given** multiple collectibles exist on screen, **When** the player ball is near a collectible that is slightly larger than absorbable size, **Then** the collectible shows no magnetic attraction
5. **Given** multiple collectibles exist on screen, **When** the player ball approaches a collectible that is nearly the same size (but still smaller), **Then** the collectible is magnetically pulled toward the player
6. **Given** the player has collected an object, **When** collection occurs, **Then** the player's score increases based on the object's value

---

### User Story 3 - Exponential Growth System (Priority: P1)

As a player, I want my ball to grow visually larger each time I collect objects so that I can see dramatic progress from "tiny entrepreneur" to "business empire" and experience the theme of "SMALL to BIG."

**Why this priority**: Growth is what makes the collection mechanic meaningful and embodies the jam theme. This creates the satisfying feedback loop and visual spectacle that makes Katamari games memorable. Essential for P1 as it's required for the Day 7 "Playable core loop" milestone.

**Independent Test**: Can be fully tested by collecting a sequence of objects and observing the player ball's size increase. Success is achieved when the ball visibly grows after each collection, the growth rate feels exponential (accelerating), and previously uncollectable objects become collectable.

**Acceptance Scenarios**:

1. **Given** the player ball starts at 0.5×0.5 units, **When** I collect a small coin (value 10), **Then** my ball grows by a noticeable amount
2. **Given** the player ball has grown to medium size, **When** I collect a customer (value 50), **Then** my ball grows by a proportionally larger amount than early-game collections
3. **Given** the player ball is very large, **When** I collect small objects, **Then** my ball still grows but the visual change is less dramatic relative to my total size
4. **Given** an object was previously too large to collect, **When** my ball grows large enough, **Then** that object now shows magnetic attraction and becomes collectable
5. **Given** the player ball grows, **When** viewing the game, **Then** the size progression is visually dramatic and immediately recognizable
6. **Given** the player starts the game, **When** I collect objects for 30 seconds, **Then** the theme "SMALL" is clearly evident through the dramatic scale change from tiny to large

---

### User Story 4 - Visual Feedback & HUD (Priority: P2)

As a player, I want to see my current size and score displayed on screen so that I can track my progress and understand my current state at a glance.

**Why this priority**: While important for player feedback, the HUD is not required for the core mechanic to function. Players can still move, collect, and grow without score display. This is P2 because it enhances the P1 core loop but isn't blocking for basic playability.

**Independent Test**: Can be fully tested by playing the game and observing the HUD elements. Success is achieved when size and score are clearly visible, update in real-time, and don't obstruct gameplay.

**Acceptance Scenarios**:

1. **Given** the game is running, **When** I view the screen, **Then** I see my current ball size displayed (e.g., "Size: 0.5x")
2. **Given** the game is running, **When** I view the screen, **Then** I see my current score displayed (e.g., "Score: $0")
3. **Given** I collect an object, **When** my size increases, **Then** the HUD size display updates immediately
4. **Given** I collect an object, **When** my score increases, **Then** the HUD score display updates immediately
5. **Given** the HUD is displayed, **When** gameplay is active, **Then** the HUD elements do not obscure the player ball or important collectibles
6. **Given** the camera is following the player, **When** the player moves, **Then** the HUD remains fixed in screen space (doesn't move with the world)

---

### Edge Cases

- **Same-size collision**: What happens when player ball and collectible are exactly the same size? (Cannot collect - size must be strictly smaller)
- **Magnetic attraction boundaries**: How close must a near-size collectible be to trigger magnetic pull? (Within 2-3 units distance, scales with object size)
- **Empty screen**: What if player collects all objects and none remain? (Level continues, player can still move, awaiting level completion trigger)
- **Maximum size**: Is there a cap on how large the player can grow? (No hard cap for P1, may add in P2 for level completion requirements)
- **Camera bounds**: Does the camera follow infinitely or is there a world boundary? (Camera follows infinitely for P1, world boundaries are P2 level design concern)
- **Collision overlap**: What if player ball overlaps multiple collectibles simultaneously? (All valid collectibles are absorbed in the same frame)
- **Zero velocity**: What if player doesn't move at all? (Ball remains stationary, collectibles do not move toward player unless magnetic attraction is active)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The game MUST spawn a player-controlled ball entity at the start position with an initial size of 0.5×0.5 units
- **FR-002**: The player ball MUST respond to WASD keyboard inputs (W=up, A=left, S=down, D=right) for directional movement
- **FR-003**: The player ball MUST respond to Arrow key inputs (↑=up, ←=left, ↓=down, →=right) as an alternative control scheme
- **FR-004**: The player ball MUST exhibit momentum-based physics where acceleration is applied when keys are held
- **FR-005**: The player ball MUST exhibit damping (gradual slowdown) when no movement keys are pressed
- **FR-006**: The game MUST spawn collectible objects of at least two types: coins (small, low value) and customers (medium, higher value)
- **FR-007**: Each collectible object MUST have a defined size and point value that determines collection behavior and score contribution
- **FR-007a**: Coins MUST spawn with sizes between 0.3-0.4 units and award 10 points when collected
- **FR-007b**: Customers MUST spawn with sizes between 0.6-0.8 units and award 50 points when collected
- **FR-008**: The player ball MUST only be able to collect objects that are strictly smaller than its current size
- **FR-009**: When the player ball touches a collectible smaller than itself, the collectible MUST be absorbed (removed from game world)
- **FR-010**: When the player ball collects an object, the player's score MUST increase by the object's point value
- **FR-011**: When the player ball collects an object, the player's size MUST increase proportionally based on an exponential growth formula
- **FR-012**: Collectible objects that are nearly the same size as the player (but still smaller) MUST exhibit magnetic attraction, pulling toward the player when within range
- **FR-013**: The camera MUST smoothly follow the player ball's position using interpolation (lerp) to avoid jarring movements
- **FR-014**: The HUD MUST display the player's current size in a readable format (e.g., "Size: 1.5x")
- **FR-015**: The HUD MUST display the player's current score in a readable format (e.g., "Score: $250")
- **FR-016**: The HUD MUST remain in screen space (fixed position on screen) rather than world space
- **FR-017**: The visual difference between starting size (0.5×0.5) and grown size MUST be immediately recognizable to communicate the "SMALL to BIG" theme
- **FR-018**: The game MUST demonstrate the theme "SMALL" within the first 30 seconds of gameplay through visible scale progression

### Key Entities

- **Player Ball**: Represents the player's growing business empire. Has position (x, y coordinates), size (width, height starting at 0.5×0.5 units), velocity (movement speed and direction), and score (accumulated points from collections). Grows exponentially as objects are collected.

- **Collectible Object**: Represents items in the game world that can be absorbed by the player. Has type (coin, customer), position (x, y coordinates), size (width, height - coins: 0.3-0.4 units, customers: 0.6-0.8 units), point value (score contribution - coins: 10 points, customers: 50 points), and collectable status (whether player is large enough to collect it). Can exhibit magnetic attraction to player when nearly same size.

- **Camera**: Represents the viewport that follows the player. Has position (x, y coordinates tracking player), scale (zoom level), and follow target (player ball). Uses smooth interpolation for natural movement.

- **HUD**: Represents on-screen information display. Contains size display (player's current size multiplier) and score display (accumulated points). Rendered in screen space rather than world space.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Players can understand the core mechanic (move to collect smaller objects) within 30 seconds of starting the game without tutorial or instructions
- **SC-002**: The game maintains smooth performance at 60 frames per second with at least 100 collectible objects visible on screen simultaneously
- **SC-003**: Players experience visible, dramatic size growth from starting size to 10x larger within 60 seconds of active collection
- **SC-004**: 90% of playtesters can successfully identify the "SMALL" theme within the first 30 seconds of gameplay without prompting
- **SC-005**: Players can successfully control the ball and collect objects on their first attempt without confusion about controls
- **SC-006**: The collection mechanic feels responsive with no more than 1 frame (16ms) delay between contact and object absorption
- **SC-007**: Camera follow feels smooth and natural with no visible stuttering or lag during player movement
- **SC-008**: The game functions correctly across modern desktop browsers (Chrome, Firefox, Safari - latest 2 versions)
- **SC-009**: Players can see and read HUD elements clearly without obstruction of gameplay elements
- **SC-010**: The exponential growth curve creates noticeable acceleration in size increase (later collections grow player faster than early collections)

### Game Jam Theme Validation

**Theme**: "SMALL"

**Theme Integration** (Constitution Article I - Theme Requirements):

- **Core Mechanic Connection**: The primary gameplay mechanic directly embodies the "SMALL" theme through the transformation from a tiny 0.5×0.5 unit entrepreneur ball to a massive business empire. Every core interaction (movement, collection, growth) reinforces the journey from small to large. The theme IS the mechanic, not a cosmetic layer.

- **Visual Representation**: The theme is communicated visually through dramatic scale progression. The player literally sees their ball start at the smallest possible size and grow exponentially larger. Objects that were initially obstacles become collectible items. The camera perspective shifts to emphasize changing scale. Visual contrast between starting size and grown size is the primary theme communication method.

- **Player Understanding**: Players can identify the "SMALL" theme within the first 30 seconds of play because the growth is immediate and dramatic. The first collection causes visible size increase, and within 30 seconds of active play, the player has grown noticeably larger, making the small-to-big transformation obvious without explanation.

- **Creative Interpretation**: This feature takes a unique angle on "SMALL" by applying it to business growth as a metaphor. Rather than just being "physically small," the player represents a small entrepreneur growing into a business tycoon. The Katamari mechanic (absorbing smaller entities to grow) maps perfectly to business concepts: starting small, absorbing customers and capital (coins), outgrowing competitors, and building an empire through accumulation.

**Theme Success Criteria**:

- **TSC-001**: Theme is immediately recognizable in gameplay - players see their size change from tiny to large within first minute
- **TSC-002**: Core mechanic directly relates to theme concept - size-based collection creates the "start small, grow big" experience
- **TSC-003**: 90% of playtesters can identify "SMALL" theme within 30 seconds without prompting
- **TSC-004**: Feature contributes to overall theme coherence - this core mechanic establishes theme foundation for entire game

## Clarifications

### Session 2025-10-14

- Q: How should collectibles be initially distributed when the game starts? → A: Randomized grid - Collectibles spawn on a loose grid with randomized positions within each cell, randomized sizes and types
- Q: What should be the relative size relationship between coins and customers at spawn? → A: Coins smaller than customers - Coins are 0.3-0.4 units, customers are 0.6-0.8 units (creates natural progression: collect coins first, then customers)

## Assumptions

- **Control Scheme**: WASD and Arrow keys are sufficient for desktop browser gameplay (mobile/touch controls deferred to P4 post-jam per constitution)
- **Growth Formula**: Exponential growth means later collections provide proportionally more size increase than early collections (exact formula to be determined during technical planning)
- **Magnetic Range**: "Near-size" for magnetic attraction means approximately 80-90% of player's current size, within 2-3 unit distance
- **Performance Target**: 60 FPS with 100+ objects is achievable based on LittleJS engine capabilities (engine handles 100k+ objects per constitution)
- **Browser Support**: Modern desktop browsers (Chrome, Firefox, Safari latest 2 versions) are sufficient for P1 game jam submission
- **HUD Positioning**: Screen-space HUD at top of screen (size top-left, score top-right) provides clear visibility without gameplay obstruction
- **Collectible Spawning**: Collectibles spawn on a loose grid pattern with randomized positions within each cell, with randomized sizes and types to provide good area coverage while maintaining variety
- **Theme Validation Timing**: 30-second threshold for theme recognition aligns with constitution Article I requirement and typical playtester attention span
- **Visual Style**: Code-based shapes (circles/rectangles) are acceptable for P1 per constitution Article V (Playable > Pretty) - sprite art deferred to P3 polish phase

## Dependencies

- LittleJS game engine setup completed (per DAY-1-QUICKSTART.md)
- Game development environment operational (browser, HTTP server)
- Constitution principles ratified (v1.0.0)

## Out of Scope

The following are explicitly excluded from this P1 feature specification:

- Sound effects and audio (deferred to P3 polish per constitution)
- Particle effects on collection (deferred to P3 polish)
- Screen shake or camera effects (deferred to P3 polish)
- Multiple levels or level progression (deferred to P2)
- Win/lose conditions (deferred to P2)
- Timer or time-based mechanics (deferred to P2)
- Competitor AI entities (deferred to P2)
- Sprite artwork (code-based shapes acceptable per constitution Article V)
- Mobile/touch controls (deferred to P4 post-jam)
- Advanced collectible types beyond coins and customers (deferred to P2)
- Leaderboards or score persistence (deferred to post-jam)
- Accessibility features beyond keyboard controls (deferred to P3)
