# P3 Features Index - Week 3 Implementation Plan

**Created**: October 17, 2025
**Target Week**: October 28 - November 2, 2025
**Purpose**: Transform "mechanically solid" → "It Factor" achieved
**Status**: Ready for implementation

---

## Overview

These 5 specifications implement the missing "soul" features identified in ALIGNMENT-REPORT.md and Vision.md research. All specs follow GitHub Spec-Kit methodology and are ready for `/speckit.plan` → `/speckit.implement` workflow.

---

## The 5 P3 Features (Priority Order)

### **003: Screen Shake Feedback System** ⚡ HIGHEST IMPACT
**Spec**: [.specify/specs/003-add-screen-shake-feedback/spec.md](003-add-screen-shake-feedback/spec.md)

**What**: Add camera shake on collection (value-scaled), tier-ups, and victory
**Why**: "Juice" - makes every collection FEEL satisfying
**Time**: 30 minutes - 1 hour
**Impact**: 🔥🔥🔥 **CRITICAL** - Biggest feel improvement for minimal effort
**Dependencies**: None (uses LittleJS built-in cameraShake)

**Implements Constitution FRs**:
- FR-030: Screen Shake System

**Implements Vision.md Gaps**:
- Gap #2: Feedback Loops (shake component)

**User Stories**:
- US1: Feel impact when collecting objects (P3)
- US2: Celebrate tier-ups with shake (P3)
- US3: Amplify victory moments (P3)

**Next Step**: `/speckit.plan` to create technical implementation

---

### **004: ZzFX Sound System** 🔊 CRITICAL FOR JUICE
**Spec**: [.specify/specs/004-add-zzfx-sound-system/spec.md](004-add-zzfx-sound-system/spec.md)

**What**: Add 5 procedural sounds (collect, tier-up, victory, defeat, timer warning) with SoundManager class
**Why**: Game is 100% SILENT - audio is 50% of game feel
**Time**: 2 hours
**Impact**: 🔥🔥🔥 **CRITICAL** - Audio feedback transforms experience
**Dependencies**: None (LittleJS has ZzFX built-in)

**Implements Constitution FRs**:
- FR-033: Sound Effect Definitions
- FR-034: SoundManager Pattern

**Implements Vision.md Gaps**:
- Gap #2: Feedback Loops (sound component)

**User Stories**:
- US1: Hear feedback on every collection (P3)
- US2: Celebrate tier-ups with audio (P3)
- US3: Audio punctuation for win/lose (P3)
- US4: Timer warning audio urgency (P3)

**Next Step**: `/speckit.plan` to create SoundManager class implementation

---

### **005: Particle Effects System** ✨ VISUAL CELEBRATION
**Spec**: [.specify/specs/005-add-particle-effects/spec.md](005-add-particle-effects/spec.md)

**What**: Add particle bursts on collection (count scales with value), tier-up explosions, magnetic trail particles
**Why**: Visual feedback - makes each collection an EVENT
**Time**: 1-2 hours
**Impact**: 🔥🔥 **HIGH** - Visual spectacle, screenshot moments
**Dependencies**: None (LittleJS ParticleEmitter built-in)

**Implements Constitution FRs**:
- FR-031: Particle System Specification

**Implements Vision.md Gaps**:
- Gap #2: Feedback Loops (particle component)

**User Stories**:
- US1: See visual burst on collection (P3)
- US2: Massive celebration on tier-up (P3)
- US3: Magnetic pull visual indicator (P3)

**Next Step**: `/speckit.plan` to create particle emission points

---

### **006: Named Collectibles** 🎭 THE SOUL FIX
**Spec**: [.specify/specs/006-add-named-collectibles/spec.md](006-add-named-collectibles/spec.md)

**What**: Replace 2 generic types (coin, customer) with 15-20 named objects (PENNY, TEACHER, CAR, YACHT, ROCKET). Add absurdist escalation.
**Why**: THIS IS THE "SOULLESS" PROBLEM - generic shapes → specific objects with personality
**Time**: 2-3 hours
**Impact**: 🔥🔥🔥 **CRITICAL** - Transforms "eating shapes" → "CONSUMING TEACHERS!"
**Dependencies**: None (pure data expansion)

**Implements Constitution FRs**:
- FR-042: Named Collectibles Requirement
- FR-048: COLLECTIBLE_DATA Structure (partial - 15-20 of 33 objects)

**Implements Vision.md Gaps**:
- Gap #1: Visual Identity (naming component)
- Gap #3: Personality (object personality)

**User Stories**:
- US1: Collect recognizable named objects (P3)
- US2: Experience absurdist escalation (P3)
- US3: Expand object variety to 15-20 types (P3)

**Next Step**: `/speckit.plan` to expand COLLECTIBLE_DATA structure

---

### **007: Gen Alpha Personality** 😎 HUMOR LAYER
**Spec**: [.specify/specs/007-add-gen-alpha-personality/spec.md](007-add-gen-alpha-personality/spec.md)

**What**: Add ironic "sigma grindset" humor to victory/defeat screens and level intros. Use Gen Alpha slang sparingly (2-3 terms max).
**Why**: Generic "LEVEL COMPLETE!" → "UNCOMMON GRINDSET UNLOCKED ✅" = memorable and shareable
**Time**: 1-2 hours
**Impact**: 🔥🔥 **HIGH** - Personality makes game memorable, screenshot-worthy
**Dependencies**: Soft dependency on 006 (named objects for stats)

**Implements Constitution FRs**:
- FR-043: Gen Alpha Tone & Language

**Implements Vision.md Gaps**:
- Gap #3: Personality (humor/tone)
- Gap #5: Shareability (screenshot-worthy text)

**User Stories**:
- US1: Ironic victory celebrations (P3)
- US2: Self-aware tone throughout (P3)
- US3: Approved slang usage (P3)

**Next Step**: `/speckit.plan` to update text strings in victory/defeat handlers

---

### **BONUS: 008: Consumption Log** 📊 SHAREABILITY
**Spec**: [.specify/specs/008-add-consumption-log/spec.md](008-add-consumption-log/spec.md)

**What**: Track what player consumed during level. Display detailed stats on victory: "YOU CONSUMED: 🪙 12 Pennies, 👨‍🏫 8 TEACHERS (what), 🪑 1 Desk"
**Why**: Creates memory, narrative, shareable moments ("I ate 8 people!")
**Time**: 2 hours
**Impact**: 🔥 **MEDIUM-HIGH** - Shareability, memorable moments
**Dependencies**: Requires 006 (named objects to log)

**Implements Constitution FRs**:
- FR-051: Consumption Log

**Implements Vision.md Gaps**:
- Gap #5: Shareability (consumption logs + stats)

**User Stories**:
- US1: See what I consumed (P3)
- US2: Highlight absurd moments (P3)
- US3: Grindset level rating (P3)

**Next Step**: `/speckit.plan` to add consumption tracking

---

### **BONUS: 009: Combo System** 🔥 SKILL EXPRESSION
**Spec**: [.specify/specs/009-add-combo-system/spec.md](009-add-combo-system/spec.md)

**What**: Combo multiplier for rapid collections (3/5/10 in 2 seconds = 1.5x/2x/3x value). Show combo popups and HUD counter.
**Why**: Rewards skilled play, adds replayability ("beat my combo record")
**Time**: 2-3 hours
**Impact**: 🔥 **MEDIUM** - Engagement boost, skill ceiling
**Dependencies**: None (pure gameplay mechanic)

**Implements Constitution FRs**:
- FR-050: Combo System

**Implements Vision.md Gaps**:
- Gap #4: Progression (combo system)

**User Stories**:
- US1: Earn combo multipliers through skill (P3)
- US2: See combo status persistently (P3)
- US3: Feel value multiplier impact (P3)

**Next Step**: `/speckit.plan` to add combo tracking logic

---

## Implementation Timeline (Week 3: Oct 28-Nov 2)

### **Day 1 (Oct 28): Juice Foundation** - 3-4 hours
- ✅ Implement 003: Screen Shake (30 min)
- ✅ Implement 004: ZzFX Sound System (2 hrs)
- ✅ Implement 005: Particle Effects (1-2 hrs)
- **Result**: Game FEELS dramatically better

### **Day 2 (Oct 29): Personality** - 3-4 hours
- ✅ Implement 006: Named Collectibles (2-3 hrs)
- ✅ Implement 007: Gen Alpha Personality (1-2 hrs)
- **Result**: Game has CHARACTER

### **Day 3 (Oct 30): Engagement** - 2-4 hours
- ✅ Implement 008: Consumption Log (2 hrs)
- ✅ Implement 009: Combo System (2-3 hrs) - OPTIONAL
- **Result**: Game is SHAREABLE

### **Day 4-5 (Oct 31-Nov 1): Polish & Test** - 4-6 hours
- Cross-browser testing
- Balance tuning (combo window, spawn rates)
- Bug fixing
- Playtesting with fresh eyes
- **Result**: SHIP-READY

### **Day 6-7 (Nov 2-3): OPTIONAL Sprites** - 6-8 hours
- Create sprite sheet in Piskel (if time allows)
- Integrate sprites with tile() system
- **Result**: VISUAL IDENTITY (bonus, not required)

**Total Estimated Time**: 12-22 hours across 7 days
**Available Time**: 7 days × 3 hours/day = 21 hours
**Buffer**: Comfortable margin for unexpected issues

---

## Priority If Behind Schedule

**Must Have** (ship blockers):
1. ✅ 003: Screen Shake (30 min) - DO THIS FIRST
2. ✅ 004: Sound System (2 hrs) - CRITICAL
3. ✅ 006: Named Collectibles (2-3 hrs) - SOUL FIX

**Should Have** (big impact):
4. ✅ 005: Particle Effects (1-2 hrs)
5. ✅ 007: Gen Alpha Personality (1-2 hrs)

**Nice to Have** (polish):
6. ⏸️ 008: Consumption Log (2 hrs) - Skip if behind
7. ⏸️ 009: Combo System (2-3 hrs) - Skip if behind

**Scope Reduction**:
- If short on time: Ship with 003 + 004 + 006 (minimum viable "It Factor")
- If comfortable: Add 005 + 007 (full personality)
- If ahead: Add 008 + 009 (engagement systems)

---

## Success Metrics

**Before P3 Implementation**:
- Game works: ✅
- Game feels good: ❌
- Game has personality: ❌
- "It Factor": 40%

**After P3 Implementation**:
- Game works: ✅
- Game feels good: ✅ (shake + sound + particles)
- Game has personality: ✅ (named objects + Gen Alpha humor)
- "It Factor": 95%+ 🎉

**Validation**:
- Playtester feedback: "This is actually fun now!"
- Screenshot sharing: Players post victory screens
- Replay value: "One more run" compulsion increases
- Jam judges: "Great game feel" in feedback

---

## Spec-Kit Workflow Instructions

**For each spec (003-009)**:

1. **Navigate to spec folder**:
   ```bash
   cd .specify/specs/003-add-screen-shake-feedback
   ```

2. **Create technical plan**:
   ```bash
   /speckit.plan
   ```
   - Agent generates plan.md with technical approach
   - Includes Constitution Check section
   - References FR specifications

3. **Break into atomic tasks**:
   ```bash
   /speckit.tasks
   ```
   - Agent generates tasks.md
   - Tasks are <1 hour each
   - Ordered by dependency

4. **Implement**:
   ```bash
   /speckit.implement
   ```
   - Agent executes tasks sequentially
   - Tests after each task
   - Updates task status

5. **Validate**:
   ```bash
   /speckit.analyze
   ```
   - Check spec/plan/code alignment
   - Verify Constitution compliance

6. **Repeat for next spec** (004, 005, 006, 007, 008, 009)

---

## Verification Checklist

After implementing all P3 features:

**Juice**:
- [ ] Screen shakes on every collection
- [ ] Screen shake intensity scales with object value
- [ ] Sound plays on every collection
- [ ] Sound pitch scales with object value
- [ ] Particles burst from collected objects
- [ ] Tier-up has BIG celebration (shake + sound + particles)
- [ ] Victory has dramatic feedback

**Personality**:
- [ ] 15+ named object types exist
- [ ] Object names appear in popups ("CONSUMED: TEACHER!")
- [ ] Objects escalate absurdly (penny → teacher → rocket)
- [ ] Victory screens use Gen Alpha language
- [ ] Tone is consistently ironic/self-aware
- [ ] Slang usage is tasteful (2-3 per screen max)

**Engagement**:
- [ ] Consumption log shows what you ate
- [ ] "Most Cursed" and "Biggest Flex" stats display
- [ ] Grindset rating appears (COMMON/RARE/LEGENDARY)
- [ ] Combo system works (x3/x5/x10)
- [ ] Combo multipliers apply correctly
- [ ] Combo popups display

**Polish**:
- [ ] No console errors
- [ ] 60 FPS maintained
- [ ] Works in Chrome + Firefox
- [ ] Victory screens are screenshot-worthy

---

## Expected Transformation

**Before P3** (Current State):
```
- Yellow rectangle collected
- (silence)
- (no visual feedback)
- Size increases
- Generic "LEVEL COMPLETE!" screen
```

**After P3** (Target State):
```
- TEACHER collected
- *SCREEN SHAKES*
- *"BLING!" SOUND*
- *PARTICLE BURST*
- "CONSUMED: TEACHER! +$300" popup
- Size increases
- "UNCOMMON GRINDSET UNLOCKED ✅" screen
  "YOU CONSUMED: 8 TEACHERS (what)"
  "Portfolio: $523 (Bussin fr fr)"
```

**The Difference**: ❌ Soulless → ✅ It Factor Achieved! 🎮

---

**Status**: All 5 specs ready
**Total Specs Created**: 5 (plus 2 bonus)
**Estimated Total Time**: 8-15 hours
**Available Time**: 17 days (plenty of buffer)
**Next Action**: Start with 003 (screen shake) - call `/speckit.plan`
