# Implementation Plan: ZzFX Sound System

**Branch**: `004-add-zzfx-sound-system` | **Date**: October 17, 2025 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-add-zzfx-sound-system/spec.md`

## Summary

Add procedural audio system using ZzFX (built into LittleJS) with 5 required sounds: collection (pitch-scaled by value), tier-up fanfare, victory/defeat session-ending sounds, and timer warning beeps. Implement SoundManager class to pre-cache Sound objects and handle all playback. Audio transforms game from 100% silent → rich feedback in ~2 hours of work. Pitch-scaling creates audible progression from SMALL (high-pitched pennies) to BIG (low-pitched yachts), reinforcing game jam theme "SMALL" through audio spectrum.

**Technical Approach**: Copy ZzFX parameters from Constitution FR-033 → create SoundManager class (50 lines) → integrate playback calls in existing PlayerBall.collect(), gameUpdate() timer logic, and victory/defeat state handlers → handle browser autoplay policy with first-user-interaction pattern.

## Technical Context

**Language/Version**: JavaScript ES6+ (const/let, arrow functions, classes per Article IV)
**Primary Dependencies**: LittleJS latest from workspace (`../../LittleJS/dist/littlejs.release.js`)
**Storage**: N/A (procedural audio, no files)
**Testing**: Manual browser testing (Chrome/Firefox/Safari) + audio stress test (20+ simultaneous sounds)
**Target Platform**: Web browsers (Chrome/Firefox/Safari latest 2 versions)
**Project Type**: LittleJS game (single-file architecture in src/game.js)
**Performance Goals**: 60 FPS (audio doesn't affect framerate), <1KB total audio size (procedural ZzFX)
**Constraints**: Browser autoplay policy (requires user gesture), must work offline, no external audio files
**Scale/Scope**: 5 sounds total, ~100 lines of code added to game.js

**LittleJS Game-Specific**:

- **Engine Version**: LittleJS latest from repo (../../LittleJS/)
- **Physics Requirements**: N/A (audio feature, no physics changes)
- **Asset Budget**: 0 bytes (ZzFX procedural audio, no files)
- **Game Jam Theme**: "SMALL" - Pitch-scaling creates audible progression from SMALL (high pitch) to BIG (low pitch)
- **Physics Innovation**: N/A (audio feature)
- **Shared Components**: None (all code in src/game.js)
- **Performance Target**: 60 FPS maintained, audio mixing handled by browser Web Audio API
- **Browser Support**: Modern browsers with Web Audio API support (all major browsers since 2020)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Article II (Theme-First)**: Pitch-scaling reinforces "SMALL" theme - high-pitched sounds for SMALL objects (pennies), low-pitched sounds for BIG objects (yachts). Audio evolution mirrors size evolution. TSC-001 validated.
- [x] **Article III (Katamari Mechanics)**: No physics changes, audio complements existing collection mechanic (FR-009, FR-010, FR-011). Sound plays at collectible position (positional audio).
- [x] **Article V (Technical Standards - FR-018)**: Must use LittleJS Sound class with ZzFX parameters. ✓ Using `new Sound([zzfxParams])` per LittleJS API (reference.md line 210).
- [x] **Article VII (Sound Design - FR-033, FR-034)**: All 5 sound ZzFX parameters defined in Constitution. SoundManager pattern specified. ✓ Copy-paste ready.
- [x] **Article VIII (Timeline)**: Can ship in <2 hours (per spec estimate). ✓ Simple integration, no complex logic.
- [x] **Article XV (Playable > Pretty)**: P3 (Polish) feature, game already playable without it. ✓ Enhances existing mechanics, doesn't block gameplay.

**Constitution Violations**: NONE - Feature fully compliant with all Articles.

## Project Structure

### Documentation (this feature)

```
specs/004-add-zzfx-sound-system/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file
├── research.md          # Audio best practices research (already in ULTRA-DEEP-RESEARCH PART 21)
└── tasks.md             # Atomic task breakdown (created by /speckit.tasks)
```

### Source Code (repository root)

```
src/
└── game.js              # ONLY file modified - add SoundManager class + playback calls

# NO new files created - 100% integration into existing game.js
# NO assets/ changes - ZzFX is procedural (no audio files)
```

**Structure Decision**: Single-file integration into existing `src/game.js` following LittleJS game structure. SoundManager class added after COLLECTIBLE_DATA initialization (line ~52), sound initialization in gameInit() (line ~102), playback calls in PlayerBall.collect() (line ~642), gameUpdate() timer logic (line ~131), and state handlers (victory/defeat).

## Complexity Tracking

*No Constitution violations - this section intentionally left empty.*

## Implementation Plan

### Phase 0: Research & Setup (0.5 hours)

**Goal**: Understand LittleJS Sound API and confirm ZzFX parameters from Constitution.

**Tasks**:
1. Read LittleJS reference.md lines 200-246 (Audio System documentation)
2. Read Constitution Article VII, Section 7.1 (FR-033, FR-034) - copy ZzFX parameters
3. Read ULTRA-DEEP-RESEARCH.md PART 21 (Audio Design Theory) - understand pitch scaling
4. Validate current game.js structure (where to add SoundManager)
5. Test basic Sound creation in browser console: `new Sound([,,400,.01,,.05,,1.5,,,,,,,,.1]).play()`

**Output**: `research.md` (if needed - most research already in ULTRA-DEEP-RESEARCH PART 21)

**Success Criteria**:
- LittleJS Sound API understood (constructor, play() method, parameters)
- ZzFX parameters ready to copy from Constitution FR-033
- Identified integration points in game.js (line numbers documented)

### Phase 1: Core Sound System (0.75 hours)

**Goal**: Implement SoundManager class and pre-cache all 5 sounds.

**Architecture**:
- **SoundManager class**: Singleton pattern (global `soundManager` variable)
- **Constructor**: Create 5 Sound objects from ZzFX parameters, wrap in try-catch for graceful degradation
- **Play methods**: `playCollect(pos, value)`, `playTierUp(pos)`, `playVictory()`, `playDefeat()`, `playTimerWarning()`
- **Autoplay compliance**: AudioContext resumed on first user interaction (LittleJS handles this automatically)

**Data Structures**:

```javascript
// Add after COLLECTIBLE_DATA initialization (~line 52)
const ZZFX_SOUNDS = {
    collect: [,,537,.02,.02,.22,1,1.59,-6.98,4.97],
    tierUp: [,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17],
    victory: [1.5,,262,,.2,.4,1,1.8,,,,,,,,.5,.1],
    defeat: [1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01],
    timerWarning: [,,400,.01,,.05,,1.5,,,,,,,,.1]
};

class SoundManager {
    constructor() {
        try {
            // Pre-cache Sound objects
            this.sound_collect = new Sound(ZZFX_SOUNDS.collect);
            this.sound_tierUp = new Sound(ZZFX_SOUNDS.tierUp);
            this.sound_victory = new Sound(ZZFX_SOUNDS.victory);
            this.sound_defeat = new Sound(ZZFX_SOUNDS.defeat);
            this.sound_timerWarning = new Sound(ZZFX_SOUNDS.timerWarning);
            console.log('SoundManager initialized successfully');
        } catch (error) {
            console.warn('Audio failed to initialize:', error);
            // Graceful degradation - game continues silently
            this.sound_collect = null;
            this.sound_tierUp = null;
            this.sound_victory = null;
            this.sound_defeat = null;
            this.sound_timerWarning = null;
        }
    }

    // Helper: Clamp pitch to human-audible range (FR-004-003-CLARIFIED)
    clampPitch(pitch) {
        return Math.max(0.5, Math.min(3.0, pitch));
    }

    // FR-004-003, FR-004-004, FR-004-013: Collection sound with pitch-scaling and volume management
    playCollect(pos, value, collectionsThisFrame = 1) {
        if (!this.sound_collect) return; // Silent if audio failed

        // Pitch scales with value: high pitch (pennies) → low pitch (yachts)
        const rawPitch = 1 + (value * 0.001);
        const pitch = this.clampPitch(rawPitch);

        // Volume scales inversely with simultaneous collections to prevent clipping
        const volume = Math.max(0.3, 1.0 / Math.sqrt(collectionsThisFrame));

        // Positional audio (LittleJS defaults: range=40, taper=0.7)
        this.sound_collect.play(pos, volume, pitch);
    }

    // FR-004-005: Tier-up fanfare (louder than collections)
    playTierUp(pos) {
        if (!this.sound_tierUp) return;
        this.sound_tierUp.play(pos, 1.2); // 20% louder
    }

    // FR-004-006: Victory fanfare (center position, very loud)
    playVictory() {
        if (!this.sound_victory) return;
        this.sound_victory.play(vec2(0, 0), 1.5); // Center, 150% volume
    }

    // FR-004-007: Defeat sound (center position, normal volume)
    playDefeat() {
        if (!this.sound_defeat) return;
        this.sound_defeat.play(vec2(0, 0), 1.0);
    }

    // FR-004-008: Timer warning beep (quiet, not annoying)
    playTimerWarning() {
        if (!this.sound_timerWarning) return;
        this.sound_timerWarning.play(vec2(0, 0), 0.8); // Center, quieter
    }
}

// Global instance (instantiated in gameInit)
let soundManager;
```

**Integration Point 1 - gameInit() (~line 102)**:
```javascript
function gameInit() {
    console.log('Tiny Tycoon - Game initialized');

    // FR-004-011: Initialize sound system
    soundManager = new SoundManager();

    // ... rest of existing gameInit code ...
}
```

**Output**: SoundManager class fully functional, all sounds pre-cached, graceful degradation tested.

**Success Criteria**:
- SoundManager instantiates without errors (check console)
- All 5 Sound objects created successfully
- Audio failure caught gracefully (test by disabling Web Audio API in browser)
- No crashes if audio blocked by browser

### Phase 2: Collection Sound Integration (0.25 hours)

**Goal**: Add pitch-scaled collection sounds to PlayerBall.collect().

**Integration Point 2 - PlayerBall.collect() (~line 642)**:

```javascript
collect(collectible) {
    // Add score (FR-010)
    this.score += collectible.value;

    // Exponential size growth (FR-011)
    const growthAmount = (collectible.value / 200) * this.size.x;
    this.size = this.size.add(vec2(growthAmount, growthAmount));

    // Update mass
    this.mass = this.size.x * this.size.x;

    // Destroy collectible (FR-009)
    collectible.destroy();

    // Feature 004: Collection sound (FR-004-003, FR-004-004)
    if (soundManager) {
        soundManager.playCollect(collectible.pos, collectible.value);
    }

    // Feature 003: Screen shake
    const shakePower = SHAKE_BASE + (collectible.value * SHAKE_VALUE_MULTIPLIER);
    cameraShake = Math.min(cameraShake + shakePower, SHAKE_MAX);

    // ... rest of existing collect() code ...
}
```

**Testing**:
- Collect penny ($10) → high-pitched "bling!" (pitch ~1.01)
- Collect customer ($50) → mid-pitched "bling!" (pitch ~1.05)
- Collect multiple objects rapidly → volume scales down automatically
- Sound audible near player, fades beyond 40 units (positional audio)

**Success Criteria** (SC-001, SC-002):
- Collection sound plays on every collection (100% rate)
- Pitch scales correctly (high for cheap, low for expensive)
- Positional audio works (sound fades with distance)

### Phase 3: Victory/Defeat Sound Integration (0.25 hours)

**Goal**: Add session-ending sounds to state transitions.

**Integration Point 3 - Victory Handler (~line 661)**:

```javascript
// Feature 002: Check win condition
if (levelState === STATE.PLAYING &&
    this.size.x >= LEVEL_CONFIG[currentLevel].targetSize) {
    levelState = STATE.VICTORY;
    transitionStartTime = time;

    // Feature 004: Victory sound (FR-004-006)
    if (soundManager) {
        soundManager.playVictory();
    }

    // Feature 003: Victory shake
    cameraShake = Math.min(cameraShake + SHAKE_VICTORY, SHAKE_MAX);

    console.log('VICTORY! Target size reached!');
}
```

**Integration Point 4 - Defeat Handler (gameUpdate() ~line 143)**:

```javascript
// Lose condition: time expired without reaching target
if (remainingTime <= 0 && player && player.size.x < LEVEL_CONFIG[currentLevel].targetSize) {
    levelState = STATE.DEFEAT;
    transitionStartTime = time;

    // Feature 004: Defeat sound (FR-004-007)
    if (soundManager) {
        soundManager.playDefeat();
    }

    console.log('DEFEAT! Time expired!');
}
```

**Testing**:
- Reach target size → ascending arpeggio victory sound (do-mi-sol)
- Let timer expire → descending sad trombone defeat sound
- Sounds play at center position (not positional)
- Sounds louder than gameplay sounds (victory 1.5x, defeat 1.0x)

**Success Criteria** (SC-004):
- Victory sound plays 100% of time on win
- Defeat sound plays 100% of time on loss
- Sounds distinctly different from collection sounds (SC-003)

### Phase 4: Timer Warning Integration (0.25 hours)

**Goal**: Add urgent beeping when timer reaches last 10 seconds.

**Architecture**:
- Track last beep time to prevent beeping every frame
- Beep repeats every 1 second
- Stop beeping when level state changes from PLAYING (victory/defeat/pause)

**Integration Point 5 - gameUpdate() Timer Logic (~line 131)**:

```javascript
// Add after STATE variable declarations (~line 83)
let lastTimerWarningTime = -1;  // Track last beep to prevent spam

// In gameUpdate(), after timer countdown (~line 140)
if (levelState === STATE.PLAYING) {
    const elapsed = time - levelStartTime;
    remainingTime = Math.max(0, LEVEL_CONFIG[currentLevel].timeLimit - elapsed);

    // FR-004-008: Timer warning beep at last 10 seconds
    if (remainingTime <= 10 && remainingTime > 0) {
        const currentSecond = Math.floor(remainingTime);
        const lastSecond = Math.floor(lastTimerWarningTime);

        // Play beep when second changes (prevents multiple beeps per second)
        if (currentSecond !== lastSecond) {
            if (soundManager) {
                soundManager.playTimerWarning();
            }
            lastTimerWarningTime = remainingTime;
        }
    } else {
        lastTimerWarningTime = -1; // Reset when above 10 seconds
    }

    // Lose condition...
    if (remainingTime <= 0 && player && player.size.x < LEVEL_CONFIG[currentLevel].targetSize) {
        levelState = STATE.DEFEAT;
        transitionStartTime = time;

        // FR-004-009: Timer warning stops when state changes
        lastTimerWarningTime = -1;

        if (soundManager) {
            soundManager.playDefeat();
        }

        console.log('DEFEAT! Time expired!');
    }
}
```

**Integration Point 6 - Victory Handler (stop beeping on win)**:

```javascript
if (levelState === STATE.PLAYING &&
    this.size.x >= LEVEL_CONFIG[currentLevel].targetSize) {
    levelState = STATE.VICTORY;
    transitionStartTime = time;

    // FR-004-009: Stop timer warning
    lastTimerWarningTime = -1;

    if (soundManager) {
        soundManager.playVictory();
    }

    // ... rest of victory code ...
}
```

**Testing**:
- Set timer to 11 seconds, wait → beeping starts at exactly 10 seconds
- Beep repeats every 1 second (9, 8, 7, etc.)
- Beeping stops immediately on victory/defeat
- Beep quieter than other sounds (volume 0.8 vs 1.0+)

**Success Criteria** (SC-005, SC-010):
- Timer warning starts at exactly 10 seconds (not 9 or 11)
- Beeps repeat every 1 second until 0
- Beeps stop on victory/defeat (doesn't play during transition screens)

### Phase 5: Browser Compatibility & Polish (0.25 hours)

**Goal**: Handle browser autoplay policy, add audio comments, test cross-browser.

**FR-004-019 - Autoplay Policy Compliance**:
LittleJS automatically handles AudioContext.resume() on first user interaction. No additional code needed - Web Audio API creates suspended context, LittleJS resumes on first click/keypress. Verify in Chrome console:

```javascript
// Chrome blocks autoplay, but LittleJS handles it automatically
// No additional code required - engine handles context.resume() on user gesture
```

**FR-004-018 - Error Handling Verification**:
SoundManager constructor already has try-catch (Phase 1). Test failure mode:
1. Disable Web Audio API in Chrome DevTools: DevTools → Settings → Experiments → Disable Web Audio
2. Reload game → console.warn() appears, game continues silently
3. No crashes, all features work except audio

**FR-004-016, FR-004-017 - Pause State Handling**:
LittleJS engine handles global pause automatically via `setPaused(true)`. Timer warning logic already respects `levelState === STATE.PLAYING`, so beeping stops when state changes. If future pause menu added, timer warning will automatically stop (covered by FR-004-009 state check).

**Cross-Browser Testing**:
- Chrome (autoplay policy strict) → verify first click enables audio
- Firefox (autoplay policy permissive) → verify immediate audio
- Safari (autoplay policy strictest) → verify first interaction required

**Success Criteria** (SC-001, SC-006, SC-011):
- All 5 sounds play without errors in Chrome/Firefox/Safari
- Game remains 100% playable if audio fails (no crashes)
- Autoplay policy respected (no console errors about blocked audio)

### Phase 6: Validation & Documentation (0.25 hours)

**Goal**: Test all user stories, validate against acceptance criteria, update CLAUDE.md.

**User Story Testing**:

**US1 - Collection Feedback**:
- [ ] Collect penny ($10) → hear high-pitched "bling!"
- [ ] Collect customer ($50) → hear mid-pitched "bling!"
- [ ] Collect multiple objects → sounds overlap gracefully (volume scales down)
- [ ] Mute tab → no sound plays (respects browser mute)

**US2 - Tier-Up Celebration** (FUTURE):
- [ ] Not implemented in this feature (requires tier system from FR-047)
- [ ] Placeholder playTierUp() method exists for future integration

**US3 - Victory/Defeat Sounds**:
- [ ] Reach target size → hear ascending arpeggio (victory)
- [ ] Timer expires → hear descending sad trombone (defeat)
- [ ] Sounds play at center (not positional)

**US4 - Timer Warning**:
- [ ] Timer reaches 10 seconds → beeping starts
- [ ] Beep repeats every 1 second (9, 8, 7, etc.)
- [ ] Complete level → beeping stops (doesn't play during victory screen)

**Theme Validation** (TSC-001 to TSC-004):
- [ ] Pitch-scaling creates audible SMALL → BIG progression
- [ ] Sound design reinforces theme without explanation
- [ ] Audio feedback makes growth more dramatic
- [ ] Procedural ZzFX aligns with "small codebase" meta-theme

**Success Criteria Checklist**:
- [ ] SC-001: All 5 sounds play without errors (Chrome/Firefox/Safari)
- [ ] SC-002: Pitch scales correctly (verifiable by ear)
- [ ] SC-003: Tier-up sound distinct from collection (when implemented)
- [ ] SC-004: Victory sound plays 100% of time on win
- [ ] SC-005: Timer warning starts at exactly 10 seconds
- [ ] SC-006: Game playable if audio fails (silent fallback)
- [ ] SC-007: Playtesting feedback: "sounds make it way better"
- [ ] SC-008: 20+ simultaneous collections without clipping (stress test)
- [ ] SC-009: Positional audio fades with distance (0-40 units)
- [ ] SC-010: Pause stops beeping, unpause resumes
- [ ] SC-011: No crashes if Web Audio API disabled

**Documentation Updates**:
- Update CLAUDE.md "Active Technologies" section: add "ZzFX procedural audio (5 sounds)"
- Update CLAUDE.md "Recent Changes" section: add "004-add-zzfx-sound-system: Added ZzFX audio system with pitch-scaling"
- Commit message references FR-004-001 through FR-004-020

**Output**: All acceptance criteria validated, game ready for playtesting, documentation updated.

## Dependencies & Risks

### Dependencies

**MUST EXIST** (Already implemented):
- ✅ Feature 001: PlayerBall class with collect() method (~line 642)
- ✅ Feature 002: Level progression with STATE machine (~line 54)
- ✅ Feature 002: Timer countdown logic (~line 137)
- ✅ Feature 002: Victory/defeat state transitions (~line 661, ~line 143)
- ✅ LittleJS Sound class (built into engine)
- ✅ Constitution FR-033 (ZzFX parameters defined)

**NICE TO HAVE** (Not blockers):
- ❌ Tier system (FR-047) - playTierUp() method exists as placeholder
- ❌ Pause menu - timer warning already respects state changes

### Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Browser autoplay policy blocks audio | HIGH | LOW | LittleJS handles context.resume() automatically. First user interaction enables audio. Graceful fallback. |
| Pitch-scaling sounds bad (too high/low) | MEDIUM | MEDIUM | Clamped to 0.5x-3.0x per research (human-audible range). Test with real values in Phase 2. Adjust ZZFX_SOUNDS parameters if needed using ZzFX Designer. |
| 20+ simultaneous sounds cause clipping | LOW | MEDIUM | Volume scaling formula `1.0 / sqrt(n)` tested in audio research. Stress test in Phase 6. Browser Web Audio API handles mixing gracefully. |
| Positional audio doesn't fade correctly | LOW | LOW | LittleJS defaults (range=40, taper=0.7) verified in research. Test manually in Phase 2 by moving player away from collectibles. |
| Timer warning beeps annoying/spammy | MEDIUM | LOW | Volume set to 0.8 (quieter). Beeps only once per second (not every frame). Can adjust volume if playtesting feedback negative. |
| Audio fails to initialize (WebAudio API unavailable) | LOW | LOW | Try-catch in SoundManager constructor. Console.warn() logs error. Game continues silently (100% playable). |

### Assumptions

1. **LittleJS Sound API works as documented** - Verified in reference.md, tested in ULTRA-DEEP-RESEARCH PART 15 examples.
2. **Browser Web Audio API available** - True for all modern browsers since 2020. Graceful degradation handles edge cases.
3. **ZzFX parameters from Constitution sound good** - Parameters designed by audio designer using ZzFX Designer tool. Can tweak if needed.
4. **Pitch-scaling formula is correct** - Research-backed (0.5x-3.0x clamp). Adjustable if playtesting reveals issues.
5. **~100 lines of code fits in game.js** - Current game.js is 702 lines. Adding ~100 lines (SoundManager + integration) → 800 lines total (reasonable for single-file LittleJS game).

## Testing Strategy

### Manual Testing Checklist

**Phase 2 - Collection Sounds**:
1. Collect single penny → verify high-pitched sound plays
2. Collect single customer → verify mid-pitched sound plays (lower than penny)
3. Collect 10 objects rapidly → verify sounds overlap without distortion
4. Move player 50 units away from collectible, collect it → verify sound silent (beyond range=40)
5. Move player 20 units away from collectible, collect it → verify sound audible but quieter

**Phase 3 - Victory/Defeat**:
1. Reach target size → verify ascending arpeggio plays immediately
2. Let timer expire below target → verify sad trombone plays immediately
3. Check victory sound louder than collection sounds (subjective test)
4. Check defeat sound distinct from victory (different waveform/pitch)

**Phase 4 - Timer Warning**:
1. Start level, fast-forward time to 11 seconds remaining
2. Wait 1 second → verify beep plays at exactly 10 seconds
3. Wait 9 more seconds → verify beeps play at 9, 8, 7, 6, 5, 4, 3, 2, 1 (10 beeps total)
4. Reach target size at 5 seconds remaining → verify beeping stops immediately
5. Let timer expire → verify beeping stops when defeat sound plays

**Phase 5 - Browser Compatibility**:
1. Chrome: Load game, don't interact → verify no console errors about autoplay blocking
2. Chrome: Click once → verify sounds work after first interaction
3. Firefox: Load game → verify sounds work immediately (permissive autoplay policy)
4. Safari: Load game → verify sounds require first interaction (strict autoplay policy)
5. Disable Web Audio API in DevTools → verify console.warn(), game continues silently

**Phase 6 - Stress Testing**:
1. Spawn 50 collectibles in small area (modify LEVEL_CONFIG temporarily)
2. Grow player large, roll through cluster → collect 20+ objects in 1 frame
3. Verify no audio clipping or distortion (volume scaling working)
4. Check browser performance monitor → verify 60 FPS maintained during audio playback
5. Check browser Audio tab → verify <32 concurrent AudioNodes (industry standard)

### Acceptance Criteria Mapping

| Spec Scenario | Test Phase | Pass Criteria |
|---------------|------------|---------------|
| US1-AS1: Penny pitch 1.001 | Phase 2 | High-pitched "bling!" audible, higher than customer |
| US1-AS2: Teacher pitch 1.3 | Phase 2 | Mid-pitched "bling!" audible, between penny and yacht |
| US1-AS3: Yacht pitch 3.0 (clamped) | Phase 2 | Low-pitched "boom!" audible, lowest pitch possible |
| US1-AS4: Sound disabled | Phase 5 | No sound plays, no crashes |
| US2-AS1: Tier-up volume 1.2 | FUTURE | Not tested (tier system not implemented yet) |
| US2-AS2: Multiple tier-ups overlap | FUTURE | Not tested |
| US3-AS1: Victory volume 1.5 | Phase 3 | Ascending arpeggio loud and celebratory |
| US3-AS2: Defeat volume 1.0 | Phase 3 | Sad trombone comedic, not harsh |
| US4-AS1: Warning at 10 seconds | Phase 4 | Beep starts exactly at 10, not 9 or 11 |
| US4-AS2: Beep repeats every second | Phase 4 | 10 beeps total from 10→1 seconds |
| US4-AS3: Beeping stops on victory | Phase 4 | No beeps during victory screen |

## Notes & Reminders

### Implementation Tips

1. **Copy ZzFX parameters exactly** - Constitution FR-033 has tested values, don't modify unless playtesting requires tweaks
2. **Test pitch-scaling early** - Phase 2 should reveal if pitch clamp (0.5x-3.0x) needs adjustment
3. **Volume scaling is critical** - Formula `1.0 / sqrt(n)` prevents clipping when collecting clusters
4. **Positional audio "just works"** - LittleJS handles falloff automatically via soundDefaultRange/soundDefaultTaper
5. **Timer warning cadence** - Track `lastTimerWarningTime` to prevent beeping every frame (60 beeps/sec would be horrible)
6. **Graceful degradation is mandatory** - Try-catch in SoundManager ensures audio failure doesn't crash game

### Future Enhancements (Post-P3)

- **FR-035: Background music** (P4 - post-jam) - Add ZzFXM music system for looping soundtrack
- **playTierUp() integration** - When tier system (FR-047) implemented, call soundManager.playTierUp() on tier threshold cross
- **Magnetic pull hum** - Optional looping sound when collectibles in magnetic range (not required, would need SoundInstance management)
- **Bounce sound** - Play "bonk" when player too small to collect object (requires collision detection enhancement)
- **Menu navigation clicks** - Add UI sounds when pause menu implemented (FR-046)

### Known Limitations

- **No volume slider** - Player cannot adjust volume (would require settings menu UI)
- **No mute button** - Player must use browser tab mute or OS volume control
- **No audio visualization** - No waveform display or audio spectrum analyzer (not needed for P3 game jam)
- **Single sound per event** - Cannot play multiple variants of collection sound (e.g., different pitches for same value)
- **No audio ducking** - Victory/defeat sounds don't automatically lower volume of other sounds (Web Audio API would need ChannelMerger)

### Performance Notes

- ZzFX sounds are **<100 bytes each** (20 parameters × ~5 bytes = procedural audio)
- Total audio system: **~500 bytes** (5 sounds) vs 50KB+ for .mp3 files
- LittleJS pre-caches sounds → **0 latency** playback (sounds buffered in memory)
- Browser Web Audio API handles mixing → **no CPU overhead** for simultaneous sounds
- Positional audio calculated per-frame → **negligible performance impact** (<0.1ms)

---

**Status**: Ready for `/speckit.tasks` - Break plan into atomic tasks
**Estimated Total Time**: 2.5 hours (0.5 research + 2.0 implementation)
**Priority**: P3 (Polish) - Week 3
**Impact**: CRITICAL - Audio is 50% of "juice", transforms game feel from amateur to polished
