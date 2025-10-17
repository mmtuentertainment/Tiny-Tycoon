# Physics Experiments

R&D notes for physics innovation targeting the $100 charity prize.

---

## Goal
Develop novel physics mechanics that are:
1. **Innovative**: Not seen in typical web games
2. **Educational**: Demonstrate real physics concepts
3. **Fun**: Enhance gameplay meaningfully
4. **SMALL-themed**: Align with game jam theme

---

## Experiment Ideas

### 1. Micro-Scale Physics
**Concept**: Simulate physics at tiny scales (surface tension, electrostatics, Brownian motion)
**Real-World Examples**:
- Water droplet surface tension
- Static electricity attraction/repulsion
- Dust particles in air currents
- Capillary action

**Game Applications**:
- Player navigates water droplets using surface tension
- Electrostatic puzzles (charge objects to attract/repel)
- Ride dust particles influenced by air currents
- Climb surfaces via capillary adhesion

**Technical Implementation**:
- Modify gravity based on scale
- Add surface tension constraints
- Implement electrostatic force fields
- Create fluid dynamics simulation

**Status**: Idea phase

---

### 2. Orbital Mechanics
**Concept**: Realistic orbital physics at micro scale
**Real-World Examples**:
- Satellites orbiting planets
- Electrons orbiting atoms (simplified)
- Moons orbiting asteroids

**Game Applications**:
- Player orbits around "planets" (everyday objects)
- Gravity wells and slingshot maneuvers
- Multi-body gravitational systems
- Stable vs. unstable orbits

**Technical Implementation**:
- `applyOrbitalForce()` from physics-helpers.js
- Multiple gravity wells with additive forces
- Orbit decay simulation
- Energy conservation mechanics

**Status**: Helper function implemented

---

### 3. Chain Reaction Systems
**Concept**: Complex causality chains with physics propagation
**Real-World Examples**:
- Domino effects
- Nuclear chain reactions
- Epidemic spread models

**Game Applications**:
- Trigger explosions that propagate to nearby objects
- Set up elaborate Rube Goldberg machines
- Puzzle solving through chain reactions
- Time-delayed cascading effects

**Technical Implementation**:
- `ChainReaction.trigger()` from physics-helpers.js
- Depth-based delay system
- Proximity detection for propagation
- Visual feedback for chain progress

**Status**: Helper class implemented

---

### 4. Rope & Spring Physics
**Concept**: Constraint-based physics with elastic and rigid connections
**Real-World Examples**:
- Grappling hooks
- Bungee jumping
- Spider webs
- Catapults

**Game Applications**:
- Grappling hook movement
- Spring-based platforming
- Web-slinging mechanics
- Elastic collision systems

**Technical Implementation**:
- `RopeConstraint` and `Spring` classes from physics-helpers.js
- Distance constraint solving
- Spring force calculations with damping
- Integration with LittleJS physics

**Status**: Helper classes implemented

---

### 5. Magnetic Fields
**Concept**: Attraction and repulsion forces
**Real-World Examples**:
- Magnets
- Electromagnetic fields
- Charged particles

**Game Applications**:
- Magnetic puzzles (attract/repel objects)
- Charge switching mechanics
- Magnetic platforming
- Force field barriers

**Technical Implementation**:
- `applyMagneticForce()` from physics-helpers.js
- Inverse square law force calculation
- Polarity switching
- Field visualization

**Status**: Helper function implemented

---

## Experiment Log

### [Experiment Date]
**Physics Concept**:
**Implementation Approach**:
**Results**:
**Fun Factor** (1-10):
**Innovation Score** (1-10):
**Technical Challenges**:
**Reusability**:
**Next Steps**:

---

## Winning Strategy

### Criteria for Charity Prize
According to [itch.io/jam/littlejs-game-jam-2025](https://itch.io/jam/littlejs-game-jam-2025):
> A $100 charity prize goes to the game with the best use of physics

**Interpretation**:
- "Best use" likely means creative/innovative rather than just technically correct
- Educational value may be appreciated
- Integration with gameplay (not just showcase)
- Visual polish to demonstrate physics clearly

### Our Approach
1. **Novel mechanics**: Focus on under-explored physics (micro-scale, complex systems)
2. **Clear demonstration**: Make physics visible and understandable
3. **Gameplay integration**: Physics as core mechanic, not gimmick
4. **Educational angle**: Teach real concepts while being fun
5. **Polish**: Particle effects and visual feedback to highlight physics

### Competition Analysis
- Most entries will likely use basic gravity + collision
- Opportunity: Go beyond standard platformer physics
- Differentiation: Educational accuracy + innovation

---

## Resources

### Physics References
- [Khan Academy - Physics](https://www.khanacademy.org/science/physics)
- [PhET Interactive Simulations](https://phet.colorado.edu/)
- [The Physics Classroom](https://www.physicsclassroom.com/)

### Game Physics
- [Gaffer on Games - Integration Basics](https://gafferongames.com/post/integration_basics/)
- [2D Game Physics Tutorials](http://www.iforce2d.net/b2dtut/)

### LittleJS Physics
- `engine.js` - Core physics loop
- `engineObject.js` - Object physics implementation
- `enginePhysics.js` - Collision and physics utilities

---

## Notes

- All experiments should use shared/components/physics-helpers.js
- Document learnings in this file
- Successful experiments graduate to prototypes/
- Best prototype becomes core mechanic for game-jam-2025
- Physics innovation is our competitive advantage
