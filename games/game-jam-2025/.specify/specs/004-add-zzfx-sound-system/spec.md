# Feature Specification: ZzFX Sound System

**Feature Branch**: `004-add-zzfx-sound-system`
**Created**: October 17, 2025
**Status**: Draft
**Input**: User description: "Add ZzFX procedural audio system with 5 required sounds (collection with pitch-scaling, tier-up celebration, victory fanfare, defeat trombone, timer warning beep). Implement SoundManager class to handle all audio playback."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Hear Feedback on Every Collection (Priority: P3)

As a player, when I collect an object, I want to hear a satisfying sound effect so that each collection feels rewarding and I get audio confirmation of my actions.

**Why this priority**: P3 (Polish) - Game is currently 100% SILENT. Audio is critical component of "juice" per Vision.md research. Silent games feel incomplete and less satisfying.

**Independent Test**: Collect one object. Hear "bling!" sound. Sound pitch should vary with object value (high pitch for penny, low pitch for yacht). Can test with headphones, verifiable through browser audio inspector.

**Acceptance Scenarios**:

1. **Given** player collects penny (value $1), **When** collection occurs, **Then** high-pitched "bling!" sound plays at pitch scale 1.001
2. **Given** player collects teacher (value $300), **When** collection occurs, **Then** mid-pitched "bling!" sound plays at pitch scale 1.3
3. **Given** player collects yacht (value $5,000,000), **When** collection occurs, **Then** low-pitched "boom!" sound plays at pitch scale 5001.0
4. **Given** player collects object with sound disabled, **When** collection occurs, **Then** no sound plays (respects browser mute/volume)

---

### User Story 2 - Celebrate Tier-Ups With Audio (Priority: P3)

As a player, when I cross a size tier threshold and unlock new collectibles, I want to hear a celebratory fanfare sound so that tier-ups feel like major accomplishments.

**Why this priority**: P3 - Tier-ups are milestone moments that need audio punctuation. Different from collection sound to signify importance.

**Independent Test**: Manually trigger tier-up event. Hear rising fanfare sound (different from collection sound). Louder than collection sounds (volume 1.2 vs 1.0). Can test independently of collection mechanics.

**Acceptance Scenarios**:

1. **Given** player crosses tier threshold, **When** tier-up triggers, **Then** tier-up fanfare sound plays at volume 1.2 (louder than collections)
2. **Given** player crosses multiple tiers rapidly, **When** each tier-up occurs, **Then** each plays full fanfare (sounds can overlap)

---

### User Story 3 - Audio Punctuation for Win/Lose (Priority: P3)

As a player, when I complete a level or run out of time, I want to hear victory/defeat sounds so that game endings feel conclusive and emotionally resonant.

**Why this priority**: P3 - Session-ending moments need strong audio signals. Victory = positive reinforcement, Defeat = comedic relief (sad trombone).

**Independent Test**: Trigger victory condition. Hear ascending arpeggio (do-mi-sol). Trigger defeat condition. Hear descending sad trombone. Sounds play at center position (not positional). Can test by setting player size to target or timer to zero.

**Acceptance Scenarios**:

1. **Given** player reaches target size before timer expires, **When** victory triggers, **Then** victory fanfare plays at volume 1.5 (very loud, celebratory)
2. **Given** timer expires before reaching target, **When** defeat triggers, **Then** sad trombone sound plays at volume 1.0 (comedic, not harsh)

---

### User Story 4 - Timer Warning Audio Urgency (Priority: P3)

As a player, when timer reaches last 10 seconds, I want to hear urgent beeping so that I know time is running out and feel motivated to collect quickly.

**Why this priority**: P3 - Creates urgency and tension in final moments. Classic arcade game pattern.

**Independent Test**: Set timer to 11 seconds, wait. At exactly 10 seconds, beeping starts. Beep repeats every 1 second until timer hits zero. Can test by fast-forwarding timer.

**Acceptance Scenarios**:

1. **Given** timer reaches exactly 10 seconds remaining, **When** timer update occurs, **Then** warning beep sound plays at volume 0.8 (quieter than other sounds)
2. **Given** timer is below 10 seconds, **When** each second passes, **Then** warning beep plays again (repeating every second)
3. **Given** player completes level before timer expires, **When** victory triggers, **Then** timer warning beeps stop (don't play during victory screen)

---

### Edge Cases

- What happens if player collects 10 objects in one frame (cluster)? **→ Sound plays once per collection (10 sounds), LittleJS handles overlap gracefully**
- What if browser/device has sound disabled? **→ Graceful fallback - no errors, game still playable**
- What if sounds fail to load? **→ Catch errors in SoundManager constructor, log warning, game continues silently**
- What about mobile browsers that block autoplay audio? **→ First user interaction enables audio (standard web pattern)**
- What if player mutes tab? **→ Respects browser mute, no sound plays**

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-004-001**: System MUST implement SoundManager class with constructor that pre-caches all sounds
- **FR-004-002**: System MUST define 5 sound effects using ZzFX parameter arrays per Constitution FR-033
- **FR-004-003**: Collection sound MUST scale pitch based on object value: `pitchScale = 1 + (objectValue * 0.001)`
- **FR-004-004**: System MUST play collection sound at object's position (positional audio with distance falloff)
- **FR-004-005**: Tier-up sound MUST play at volume 1.2 (20% louder than default)
- **FR-004-006**: Victory sound MUST play at center position (vec2(0,0)) at volume 1.5
- **FR-004-007**: Defeat sound MUST play at center position at volume 1.0
- **FR-004-008**: Timer warning sound MUST play when `remainingTime === 10` and repeat every 1 second
- **FR-004-009**: Timer warning sound MUST stop when level state changes from PLAYING
- **FR-004-010**: All sounds MUST use procedural ZzFX (NO audio files, per Constitution FR-018)
- **FR-004-011**: SoundManager MUST be instantiated in gameInit() as global variable
- **FR-004-012**: System MUST handle browser audio restrictions gracefully (no crashes if blocked)

### Key Entities

- **SoundManager**: Class that manages all game audio, pre-caches Sound objects, provides play methods
- **Sound Objects**: LittleJS Sound instances created from ZzFX parameter arrays
- **ZzFX Parameters**: 20-parameter arrays that define waveform synthesis (see FR-033 in Constitution)

### Sound Definitions (From Constitution FR-033)

```javascript
// Collection Sound (pitch-scaled)
sound_collect: [,,537,.02,.02,.22,1,1.59,-6.98,4.97]

// Tier-Up Fanfare (rising tone)
sound_tierUp: [,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]

// Victory Fanfare (ascending arpeggio: do-mi-sol)
sound_victory: [1.5,,262,,.2,.4,1,1.8,,,,,,,,.5,.1]

// Defeat Sound (descending sad trombone)
sound_defeat: [1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]

// Timer Warning (beep)
sound_timerWarning: [,,400,.01,,.05,,1.5,,,,,,,,.1]
```

---

## Clarifications

### Question 1: Pitch Scaling Bounds
**Q**: The pitch scaling formula `pitchScale = 1 + (objectValue * 0.001)` would produce pitch 5001.0 for a $5M yacht. Is there a maximum/minimum pitch clamp to prevent extreme values that might sound distorted or be inaudible? Should very high-value objects have a reasonable pitch ceiling?

**A**: Based on research, pitch should be clamped to reasonable bounds. ZzFX processes raw frequency values through Web Audio API, which can technically handle any frequency but **human hearing range is 20Hz-20kHz**. More importantly, **Unreal Engine and other professional engines clamp pitch multipliers between 0.4x-2.0x** as industry standard to prevent distortion. For this game, clamp pitch between **0.5x-3.0x** to allow wider variation (penny = 1.001x ≈ normal, yacht = 3.0x = lower/boomy) while staying audible and pleasant.

**Updated Requirement**:
- **FR-004-003-CLARIFIED**: Pitch scaling formula becomes `pitchScale = clamp(1 + (objectValue * 0.001), 0.5, 3.0)` to prevent extreme/inaudible pitches
- **SC-002-CLARIFIED**: Collection sound pitch scales correctly with audible range (penny = ~1.0x high, building = ~1.5x mid, rocket = 3.0x low/boomy)

---

### Question 2: Collection Sound Overlap Management
**Q**: Edge cases mention "10 sounds in one frame, LittleJS handles overlap gracefully." Should there be a maximum simultaneous sound limit to prevent performance issues or audio clipping? For example, if player collects 50 objects in one frame (possible with large ball), should we limit to first N sounds or reduce volume per sound?

**A**: Based on 2025 industry standards, **Unity defaults to 32 voice limit** (max 255), **mobile games recommend 3 concurrent sounds**, and **major studios use ~32 simultaneous sounds**. Best practice: **leave -3dB headroom (-6dB for many simultaneous sounds)** and use **temporal offsetting** (microsecond delays) so 10 identical sounds don't phase-cancel. For this game: **NO arbitrary limit** (trust browser mixing), but **reduce volume per collection when multiple** using formula `volume = 1.0 / sqrt(collectionsThisFrame)` to prevent clipping. Max practical: ~20 collections/frame before performance degrades.

**Updated Requirement**:
- **FR-004-013**: System MUST scale collection sound volume inversely with simultaneous collections: `volume = 1.0 / Math.sqrt(collectionsThisFrame)` clamped to min 0.3
- **SC-008**: 20+ simultaneous collections play without audio clipping or distortion (verified by stress test)

---

### Question 3: Positional Audio Falloff Parameters
**Q**: FR-004-004 specifies "positional audio with distance falloff" for collection sounds. What are the specific falloff parameters? At what distance (in game units) should sound become inaudible? Does the camera zoom level affect perceived audio distance, or is it always relative to player position?

**A**: LittleJS documentation specifies: **`soundDefaultRange = 40`** (units where sound no longer plays) and **`soundDefaultTaper = 0.7`** (range percent to taper off, 0-1). Industry standard falloff curves: **Linear** (cheap, good for ambient), **Logarithmic** (realistic, expensive), **Inverse distance (1/d)** (natural physics). LittleJS uses **linear taper** by default. For this game: Use **LittleJS defaults (range=40, taper=0.7)** meaning sound audible 0-40 units from player, tapering at 70% mark (28 units). Sound is **relative to player position** (not camera) per LittleJS API `Sound.play(pos, volume, pitch)`.

**Updated Requirement**:
- **FR-004-014**: Collection sounds MUST use LittleJS default positional audio (range=40 units, taper=0.7) relative to player position
- **FR-004-015**: Sound volume at 0 units = full, at 28 units = starts fading, at 40+ units = silent
- **SC-009**: Sound audibility decreases with distance (verified: full volume at player, silent beyond 40 units)

---

### Question 4: Timer Warning During Pause State
**Q**: FR-004-009 says timer warning stops "when level state changes from PLAYING." If player pauses the game at 8 seconds remaining, should the beeping stop during pause and resume on unpause? Or should pause be considered a different state that doesn't stop the warning?

**A**: **2025 UX best practice**: Use **Pause/Resume Actions** (not Play/Stop) for smooth transitions. Research shows: **pause menu should stop/mute gameplay audio** to prevent immersion break and allow menu focus. **Web Audio API** supports `AudioListener.pause = true` for global pause. For this game: **Timer warning beeps STOP on pause** (silence during menu), **resume on unpause** (continue countdown audio). This prevents annoying beeping while reading pause menu and creates clear audio separation between gameplay/UI states.

**Updated Requirement**:
- **FR-004-016**: Timer warning beep MUST pause when game pauses (stop playing, not just mute)
- **FR-004-017**: Timer warning beep MUST resume when game unpauses (continue from same cadence)
- **SC-010**: Pausing at <10 seconds stops beeping, unpausing resumes beeping (verified manually)

---

### Question 5: Audio Failure User Feedback
**Q**: Edge cases specify "Catch errors in SoundManager constructor, log warning, game continues silently." Should there be any visual indication to the player that audio failed to initialize (e.g., muted speaker icon in HUD)? Or should it be completely transparent? Where should the warning be logged (console.warn, LittleJS debug overlay)?

**A**: **Web Audio API best practice** (MDN 2025): Use **try-catch blocks** for exceptions, **graceful degradation** for fallback, **user-centric feedback** for failures. Modern browsers require **user gesture before AudioContext.resume()** (autoplay policy). For this game: **Log to console.warn()** (developer visibility), **NO UI indicator** (avoid visual clutter for edge case), **create AudioContext on first user input** (comply with autoplay policy). Gmail-style graceful degradation: "everything else works fine" even if audio fails. Game is 100% playable without sound.

**Updated Requirement**:
- **FR-004-018**: SoundManager constructor MUST catch errors with try-catch, log `console.warn("Audio failed to initialize")`, continue silently
- **FR-004-019**: AudioContext MUST be created/resumed on first user interaction (click/keypress) per browser autoplay policy
- **FR-004-020**: NO visual UI indicator for audio failure (keep HUD clean, failure is rare edge case)
- **SC-011**: Game remains 100% playable if audio fails (no crashes, silent fallback, verified by disabling Web Audio API)

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 5 required sounds play without errors in Chrome/Firefox/Safari
- **SC-002**: Collection sound pitch scales correctly (penny = high, rocket = low) - verifiable by ear
- **SC-003**: Tier-up sound is distinctly different from collection sound (different waveform)
- **SC-004**: Victory sound plays on win condition 100% of the time
- **SC-005**: Timer warning starts at exactly 10 seconds (not 9 or 11)
- **SC-006**: Game remains playable if audio fails (no crashes, silent fallback)
- **SC-007**: Players in playtesting report "sounds make it way better" (qualitative)

### Game Jam Theme Validation

**Theme**: "SMALL"

**Theme Integration** (Constitution Article II):

- **Core Mechanic Connection**: Audio frequency scales with business size - high-pitched sounds for SMALL objects (pennies, gum), low-pitched sounds for BIG objects (yachts, rockets). Reinforces exponential growth theme through audio spectrum.
- **Visual Representation**: N/A (this is audio feature, but complements visual scale)
- **Player Understanding**: Within 30 seconds, players HEAR the progression from high → low pitch, mapping to SMALL → BIG growth.
- **Creative Interpretation**: "The sound of success changes as you grow" - audio evolution mirrors business evolution.

**Theme Success Criteria**:

- **TSC-001**: Pitch-scaling creates audible progression from SMALL (high) to BIG (low)
- **TSC-002**: Sound design reinforces theme without explicit explanation
- **TSC-003**: Audio feedback makes growth feel more dramatic and satisfying
- **TSC-004**: Procedural ZzFX (code-based sound) aligns with "small codebase" meta-theme

---

## Technical Context *(optional but recommended)*

### Related Constitution Articles

- **Article VII, Section 7.1, FR-033**: Sound Effect Definitions (exact ZzFX parameters)
- **Article VII, Section 7.1, FR-034**: SoundManager Pattern (class structure)
- **Article V, Section 5.1, FR-018**: Engine Idioms (must use LittleJS Sound class)

### Implementation References

- **ULTRA-DEEP-RESEARCH.md PART 15**: Sound integration examples
- **ULTRA-DEEP-RESEARCH.md PART 21**: Full audio design theory
- **Constitution FR-033**: Copy/paste ready ZzFX parameters

### Tool References

- **ZzFX Sound Designer**: https://killedbyapixel.github.io/ZzFX (tweak parameters by ear)
- **LittleJS Sound API**: new Sound([params]).play(pos, volume, pitch)

---

## Out of Scope *(clarity)*

- ❌ Background music/soundtrack (FR-035 - P4 post-jam)
- ❌ Magnetic pull hum (optional sound, not required)
- ❌ Bounce sound when too small (not in this spec)
- ❌ Menu navigation clicks (no menu in P1/P2/P3)
- ❌ Achievement unlock sounds (FR-052 not implemented yet)

---

## Notes & Context

**From Vision.md Research**:
> "ZzFX - 0.6KB sound engine. Pre-made sounds ready to copy/paste. Pitch-scaling for collection feedback creates satisfying progression."

**From ALIGNMENT-REPORT.md**:
> "Game is 100% SILENT - this is CRITICAL MISSING feature for 'It Factor'"

**Why This Matters**:
- Audio = 50% of game feel (research-backed)
- Silent games feel incomplete and amateur
- Sound effects are FREE (ZzFX procedural, no file size cost)
- LittleJS has ZzFX built-in (zero integration complexity)

**Implementation Strategy**:
1. Copy ZzFX parameters from Constitution FR-033 (exact values provided)
2. Create SoundManager class (50 lines total)
3. Add `soundManager.playCollect()` calls in PlayerBall.collect()
4. Add victory/defeat sound calls in state handlers
5. Add timer warning logic in gameUpdate()

**Expected Outcome**:
Game transforms from silent → rich audio feedback in 2 hours of work.

---

**Status**: Ready for `/speckit.plan`
**Priority**: P3 - Week 3
**Estimated Implementation**: 2 hours
**Impact**: CRITICAL (audio is 50% of "juice")
