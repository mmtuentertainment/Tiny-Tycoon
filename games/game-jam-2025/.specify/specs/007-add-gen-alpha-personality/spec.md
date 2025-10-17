# Feature Specification: Gen Alpha Personality & Humor Layer

**Feature Branch**: `007-add-gen-alpha-personality`
**Created**: October 17, 2025
**Status**: Draft
**Input**: User description: "Add Gen Alpha ironic hustle culture personality to victory/defeat screens, level intros, and UI text. Use approved slang sparingly (bussin, sigma grindset, no cap). Replace generic 'LEVEL COMPLETE!' with 'UNCOMMON GRINDSET UNLOCKED' style text. Add self-aware ironic tone."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ironic Victory Celebrations (Priority: P3)

As a player, when I complete a level, I want to see ironic "grindset" humor in the victory text so that the game feels self-aware and entertaining rather than generic, and I want to screenshot/share these moments.

**Why this priority**: P3 (Polish) - Personality layer that makes game memorable. Generic "LEVEL COMPLETE!" is forgettable. "UNCOMMON GRINDSET UNLOCKED ✅" is shareable and meme-able. Critical for Gen Alpha target audience.

**Independent Test**: Trigger victory on Level 1. Screen shows ironic text ("Portfolio: $523 (Bussin fr fr)", "Biggest W: DESK", "Ratio: 27:0 💀"). Text uses 2-3 Gen Alpha slang terms max (not overloaded). Tone is ironic/humorous. Can verify text strings independently.

**Acceptance Scenarios**:

1. **Given** player completes Level 1 (Broke Era), **When** victory screen displays, **Then** text includes "UNCOMMON GRINDSET UNLOCKED" or similar ironic phrase
2. **Given** Level 1 victory screen shows, **When** displaying stats, **Then** uses Gen Alpha language: "Portfolio: $X (Bussin fr fr)" or "Biggest W: [object]"
3. **Given** victory screen text is displayed, **When** counting slang terms, **Then** maximum 2-3 slang terms used (not overwhelming/cringe)
4. **Given** player completes Level 3 (Oligarch Endgame), **When** victory screen displays, **Then** text includes cosmic absurdity: "YOU ARE NOW UNGOVERNABLE" or "GENERATIONAL WEALTH UNLOCKED"

---

### User Story 2 - Self-Aware Tone Throughout (Priority: P3)

As a player, I want the game to acknowledge its own absurdity through text so that the humor comes from self-awareness rather than taking itself seriously, making the capitalism satire work.

**Why this priority**: P3 - Katamari Damacy's charm comes from self-aware absurdity. Game knows it's ridiculous. Our game should too. "This is fine. Capitalism has no brakes." creates knowing humor.

**Independent Test**: Read level intro texts, victory texts, defeat texts. Tone should be consistently ironic/self-aware. Example: "You just consumed a TEACHER. This is normal." Humor comes from acknowledging absurdity.

**Acceptance Scenarios**:

1. **Given** player enters Level 1, **When** level intro displays, **Then** text includes self-aware framing: "BROKE ERA - Playground Economics - GO CRAZY GO STUPID"
2. **Given** player enters Level 3, **When** level intro displays, **Then** text includes ironic commentary: "OLIGARCH ENDGAME - Luxury District Raid - GENERATIONAL WEALTH SPEEDRUN"
3. **Given** player sees any game text, **When** reading tone, **Then** text is self-aware ironic (not sincere/earnest)

---

### User Story 3 - Approved Slang Usage (Priority: P3)

As a player who is part of Gen Alpha, I want to see familiar slang used tastefully so that the game feels culturally relevant and "gets it" without being cringe or trying too hard.

**Why this priority**: P3 - Slang creates cultural resonance with target demographic. BUT overuse = cringe. Constitution FR-043 specifies "use SPARINGLY (2-3 per screen)" to avoid forcing memes.

**Independent Test**: Count slang terms per screen. Max 2-3 terms. Terms are from approved list (bussin, no cap, sigma grindset, ratio, caught in 4K, it's giving). Usage feels natural not forced. Can verify string content independently.

**Acceptance Scenarios**:

1. **Given** any text screen (victory, defeat, intro), **When** counting slang terms, **Then** maximum 2-3 terms used (not 10)
2. **Given** slang is used, **When** checking against approved list, **Then** only approved terms appear (bussin, no cap, sigma grindset, ratio, caught in 4K, it's giving)
3. **Given** Gen Alpha player (age 12-18) reads text, **When** evaluating, **Then** slang usage feels natural not forced (playtesting feedback)
4. **Given** non-Gen Alpha player reads text, **When** evaluating, **Then** humor still works even without knowing slang (doesn't alienate)

---

### Edge Cases

- What if slang becomes outdated (2026+)? **→ Easy to update text strings, no code changes needed**
- What about players who don't know Gen Alpha slang? **→ Context makes meaning clear ("Bussin" near "success" implies positive)**
- What if we use slang wrong (cringe)? **→ Playtest with Gen Alpha target audience, iterate based on feedback**
- What about emoji in text (💀, 🔥, ✅)? **→ Use sparingly (1-2 per screen), ensure cross-browser rendering**
- What if text doesn't fit on screen? **→ Use multi-line text with drawText(), max 80 characters per line**

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-007-001**: Level 1 victory screen MUST use ironic grindset language ("UNCOMMON GRINDSET UNLOCKED" or similar)
- **FR-007-002**: Level 2 victory screen MUST reference influencer/creator culture ("MID-TIER INFLUENCER ACHIEVED" or similar)
- **FR-007-003**: Level 3 victory screen MUST reference oligarch/billionaire status ("OLIGARCH ENDGAME COMPLETE" or similar)
- **FR-007-004**: All victory screens MUST include stats with Gen Alpha framing (e.g., "Portfolio: $X (Bussin fr fr)")
- **FR-007-005**: Text MUST use maximum 2-3 slang terms per screen (not overwhelming)
- **FR-007-006**: Slang terms MUST be from approved list only (bussin, no cap, sigma grindset, ratio, caught in 4K, it's giving)
- **FR-007-007**: Level intro texts MUST include self-aware subtitles ("GO CRAZY GO STUPID", "MONETIZED ✅", etc.)
- **FR-007-008**: Defeat screen MAY include ironic commentary (optional, not required)
- **FR-007-009**: All text MUST maintain readable contrast (white text on dark overlay) per Constitution FR-023

### Key Entities

- **Victory Screen Text**: Multi-line text displayed on level completion
- **Level Intro Text**: Text shown when entering new level
- **Gen Alpha Slang**: Culturally specific language (bussin, sigma grindset, etc.)
- **Ironic Tone**: Self-aware humor that acknowledges absurdity

### Approved Slang Terms (Constitution FR-043)

- "Bussin" (good/successful)
- "No cap" (truth/seriously)
- "Sigma grindset" (entrepreneurial hustle)
- "Ratio" (win metric)
- "Caught in 4K" (screenshot moment)
- "It's giving..." (vibes description)

### Example Victory Screens (From Constitution)

**Level 1**:
```
LEVEL 1 COMPLETE
UNCOMMON GRINDSET UNLOCKED ✅

Portfolio: $523 (Bussin fr fr)
Biggest W: DESK
You consumed: 27 objects
Ratio: 27:0 💀

Press SPACE for next level
```

**Level 3**:
```
OLIGARCH ENDGAME COMPLETE
Net worth: $500M (It's giving billionaire)
You ate: SPACE ROCKET
Sigma status: CONFIRMED ✅
Touch grass? Nah, touch ASSETS 💎

GENERATIONAL WEALTH UNLOCKED
```

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 3 levels have unique victory text (not copy/paste "LEVEL COMPLETE")
- **SC-002**: Each victory screen uses 2-3 slang terms maximum (count words)
- **SC-003**: Gen Alpha playtesters (age 12-18) report "this is funny" or "relatable" (qualitative)
- **SC-004**: Non-Gen Alpha playtesters report "I get the joke even without knowing slang" (accessibility check)
- **SC-005**: Victory screens are screenshot-worthy (players want to share) - social media test
- **SC-006**: Text is readable on all supported screen sizes (1920×1080, 1366×768, 1280×720)

### Game Jam Theme Validation

**Theme**: "SMALL"

**Theme Integration** (Constitution Article II):

- **Core Mechanic Connection**: "UNCOMMON GRINDSET" → "INFLUENCER" → "OLIGARCH" progression mirrors SMALL→BIG business growth.
- **Visual Representation**: Text reinforces theme through language (Portfolio → Net Worth scaling)
- **Player Understanding**: Victory text explicitly references growth ("$523" → "$500M")
- **Creative Interpretation**: Ironic hustle culture = satirical take on "starting small, thinking big" entrepreneur narrative.

**Theme Success Criteria**:

- **TSC-001**: Language progression (Portfolio→Net Worth→Generational Wealth) reinforces SMALL→BIG
- **TSC-002**: Humor emerges from absurd escalation (eating pennies→eating rockets = theme embodied)
- **TSC-003**: Self-aware tone ("Touch grass? Nah, touch ASSETS") comments on endless growth theme
- **TSC-004**: Players understand theme through text even without visual sprites

---

## Technical Context *(optional but recommended)*

### Related Constitution Articles

- **Article IX, Section 9.1, FR-043**: Gen Alpha Tone & Language specification
- **Article IX, FR-042**: Named Collectibles (provides object names for stats)
- **Article X, FR-044**: Flow State (text doesn't interrupt gameplay)

### Dependencies

- **Soft dependency**: Named collectibles (FR-042) - Text references object names, but can fallback to types
- **Depends on**: Victory/defeat state system (Feature 002 - implemented)
- **Depends on**: LittleJS drawText() or drawTextScreen() (built-in, always available)

### Implementation Constraints

- **Time Estimate**: 1-2 hours (pure text string changes)
- **Files Modified**: src/game.js (gameRenderPost() victory/defeat/intro text sections)
- **No New Files**: Text strings inline in render code
- **No Assets**: Text only (no images, fonts use LittleJS default)

---

## Out of Scope *(clarity)*

- ❌ Level intro screens (animated, separate screen) - Just update existing text
- ❌ Consumption log (detailed stats) - Different spec: 008-add-consumption-log
- ❌ Achievement popups - Different spec if needed (FR-052)
- ❌ Localization (other languages) - English only for jam, P4 for translations
- ❌ Dynamic text generation (procedural humor) - Static strings sufficient
- ❌ Voice acting / text-to-speech - Not needed, text only

---

## Notes & Context

**From Vision.md Research**:
> "Gen Alpha Humor - Brain Rot Culture Analysis"
> "Tone: Self-aware irony ('This is fine. Capitalism has no brakes.')"
> "Victory screens: Ironic celebration ('YOU ARE NOW UNGOVERNABLE')"
> "Warning: Don't overuse slang or it becomes cringe. Subtle references > forcing memes."

**From Constitution FR-043**:
> "Use Gen Alpha slang SPARINGLY (comedic effect, not cringe)"
> "Max 2-3 per screen"
> "Tone: Self-aware irony"

**Why This Matters**:
- Personality = differentiation (many jam games have generic text)
- Gen Alpha is target demographic (2B people, 90% mobile-first, entrepreneurial)
- Ironic humor = shareable (screenshot moments)
- Self-awareness = charm (Katamari Damacy lesson)

**Implementation Note**:
This is PURE TEXT changes. No new systems, no complex code. Just replace:
- "LEVEL COMPLETE!" → "UNCOMMON GRINDSET UNLOCKED ✅"
- "Score: $500" → "Portfolio: $500 (Bussin fr fr)"
- "TIME'S UP!" → "Grind interrupted. Retry?"

Simple find/replace with personality injection.

---

**Status**: Ready for `/speckit.plan`
**Priority**: P3 - Week 3 (Oct 28-Nov 2)
**Estimated Implementation**: 1-2 hours
**Impact**: MEDIUM-HIGH (adds character, makes game memorable)
