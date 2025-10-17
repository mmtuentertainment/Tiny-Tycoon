# TINY TYCOON - LIVING VISION DOCUMENT

**Last Updated**: 2025-10-17
**Status**: Active Development - Vision Evolving
**Purpose**: Track the creative vision, world design, and "it factor" for Tiny Tycoon

---

## 🎯 THE CORE PROBLEM (Why It Feels Soulless)

**Current State:**
- Abstract colored rectangles (yellow = coin, blue = customer)
- No visual identity
- No world context
- Mechanical but emotionless
- "Eating shapes to make number go up"

**What's Missing:**
- REAL recognizable objects (people, cars, trees, buildings)
- Visual variety and personality
- A living, breathing miniature world
- Objects you can NAME and RECOGNIZE
- The joy of "I just ate a TREE!" moments

---

## 🌍 THE WORLD VISION - Miniature LittleJS City

### Core Concept: **Isometric Top-Down Miniature City**

A tiny living world where you're a rolling ball of CAPITALISM consuming everything in your path.

**Visual Style:**
- Top-down 2D (like original Katamari)
- Pixel art sprites
- Each object recognizable at a glance
- Color-coded by value/size tier
- Simple but characterful

### The Three Worlds (One Per Level):

#### **LEVEL 1: "SCHOOLYARD HUSTLE"** (50×50 units)
**Setting**: Elementary school playground/classroom
**You Start As**: A marble (literally 0.5 units)
**Atmosphere**: Colorful, chaotic, childhood nostalgia

**Objects to Consume (Size Progression):**

| Size | Object | Sprite Idea | Value | Why It Works |
|------|--------|-------------|-------|--------------|
| 0.3 | Penny | Tiny copper circle | $1 | Universal "broke" symbol |
| 0.35 | Crayon | Colored stick | $2 | Childhood item, recognizable |
| 0.4 | Eraser | Pink rectangle | $5 | Simple but identifiable |
| 0.45 | Gum | Pink blob | $10 | Sticky = ironic consumption |
| 0.6 | Lunchbox | Colorful rectangle | $20 | Relatable kid object |
| 0.7 | Homework | Paper sheet | $25 | "Eating homework" = fantasy |
| 0.8 | Backpack | Backpack sprite | $50 | Getting bigger |
| 1.0 | Basketball | Orange circle | $75 | Sports equipment scale |
| 1.5 | Desk | Brown furniture | $100 | EATING FURNITURE! |
| 2.0 | Teacher | Stick figure person! | $200 | EATING PEOPLE! Absurd! |
| 2.5 | Bookshelf | Tall furniture | $300 | Building scale |
| 3.0 | SWING SET | Playground equipment | $500 | "I ate the playground" |

**Environmental Objects (background, not collectable):**
- Hopscotch grid on ground
- Tiny classroom windows
- Flagpole
- Tetherball pole

---

#### **LEVEL 2: "DOWNTOWN GRIND"** (100×100 units)
**Setting**: City street/downtown area
**You Start As**: Still small (reset to 0.5) but now in bigger world
**Atmosphere**: Urban, hustle, concrete jungle

**Objects to Consume:**

| Size | Object | Sprite Idea | Value | Why It Works |
|------|--------|-------------|-------|--------------|
| 3.0 | Coffee Cup | Starbucks cup | $100 | Hustle culture icon |
| 4.0 | Laptop | Rectangle screen | $200 | Work/creator tool |
| 5.0 | Office Chair | Wheeled chair | $300 | Corporate world |
| 6.0 | Bicycle | Bike sprite | $500 | Transportation tier |
| 7.0 | E-Scooter | Scooter sprite | $750 | Modern city vibes |
| 8.0 | Sofa | Furniture | $1,000 | Home goods tier |
| 9.0 | Businessman | Person in suit! | $1,500 | Eating the workforce |
| 10.0 | Motorcycle | Vehicle sprite | $2,500 | Vehicle tier begins |
| 12.0 | CAR | Sedan sprite | $5,000 | EATING CARS! |
| 14.0 | Food Truck | Truck sprite | $10,000 | Business tier |
| 15.0 | SMALL HOUSE | House sprite | $20,000 | Eating buildings! |

**Environmental Objects:**
- Street lamps
- Fire hydrants
- Park benches
- Crosswalks painted on ground

---

#### **LEVEL 3: "OLIGARCH MODE"** (150×150 units)
**Setting**: Luxury district / marina / suburbs
**You Start As**: Back to 0.5 (the rebirth!) but in MASSIVE world
**Atmosphere**: Opulent, absurd, late-stage capitalism satire

**Objects to Consume:**

| Size | Object | Sprite Idea | Value | Why It Works |
|------|--------|-------------|-------|--------------|
| 10.0 | Yacht | Boat sprite | $50,000 | Luxury tier begins |
| 15.0 | Limousine | Long car | $100,000 | Excessive wealth |
| 20.0 | Mansion | Large building | $500,000 | Eating real estate |
| 25.0 | Helicopter | Helicopter sprite | $1M | Transportation absurdity |
| 30.0 | Startup Office | Office building | $5M | Consuming companies |
| 35.0 | Superyacht | MASSIVE boat | $10M | Ultra luxury |
| 40.0 | Private Jet | Plane sprite | $50M | Peak absurdity |
| 45.0 | SKYSCRAPER | Tall building | $100M | EATING ARCHITECTURE |
| 50.0 | SPACE ROCKET | Rocket sprite | $500M | Elon Musk vibes |

**Environmental Objects:**
- Palm trees
- Fountains
- Helipads
- Golf courses

---

## 🎨 VISUAL IDENTITY - The "LittleJS Miniature World" Aesthetic

### Art Style Direction:

**Reference Games for Inspiration:**
- **Katamari Damacy**: Colorful, whimsical, recognizable objects
- **Crossy Road**: Simple pixel sprites, immediate recognition
- **Mini Motorways/Metro**: Minimalist but expressive
- **A Short Hike**: Cozy pixel world

**Sprite Requirements:**
- 8×8 to 32×32 pixels per object (tiny!)
- Top-down view (easier than isometric for jam timeline)
- 2-3 colors per object MAX (clarity)
- Silhouette must be recognizable

**Visual Hierarchy:**
```
TINY (0.3-1.0):   Items (coins, crayons, gum) - 8×8px
SMALL (1.0-5.0):  Objects (backpacks, chairs) - 16×16px
MEDIUM (5.0-15.0): Furniture/Vehicles (cars, sofas) - 24×24px
LARGE (15.0-50.0): Buildings/Mega objects (yachts, jets) - 32×32px+
```

---

## 🎭 PERSONALITY & NARRATIVE HOOKS

### **The Opening (Game Start):**

```
╔════════════════════════════════════╗
║    TINY TYCOON: GRINDSET SIMULATOR ║
╠════════════════════════════════════╣
║                                    ║
║  YOU: Broke with $0.50             ║
║  GOAL: Consume everything          ║
║  WHY: Numbers go up = serotonin    ║
║                                    ║
║  Press any key to start grinding   ║
║  (it's not a phase mom)            ║
╚════════════════════════════════════╝
```

### **Level Intro Cards:**

**Level 1:**
```
BROKE ERA
Playground Economics
Target: Eat $500 worth of stuff
GO CRAZY GO STUPID
```

**Level 2:**
```
INFLUENCER ARC
Downtown Consumption
Target: $15,000 portfolio
MONETIZED ✅
```

**Level 3:**
```
OLIGARCH ENDGAME
Luxury District Raid
Target: $500,000 net worth
GENERATIONAL WEALTH SPEEDRUN
```

### **Victory Text Evolution:**

**Level 1 Win:**
```
UNCOMMON GRINDSET UNLOCKED
You consumed: 47 objects
Biggest flex: SWING SET
Your mom is proud (maybe)
```

**Level 2 Win:**
```
MID-TIER INFLUENCER ACHIEVED
Portfolio: $15,234
Most expensive eat: TESLA
10k followers when?
```

**Level 3 Win:**
```
🚀 BILLIONAIRE UNLOCKED 🚀
Net Worth: $523,000,000
You consumed: LITERAL SKYSCRAPER
Touch grass? Never heard of it.
YOU ARE NOW UNGOVERNABLE.
```

---

## 🔊 AUDIO IDENTITY

### Sound Palette (ZzFX - Procedural):

**Collection Sounds** (pitch scales with size):
- Tiny items (0.3-1.0): High pitch "bling!" (piano)
- Medium items (1.0-5.0): Mid "ka-ching!" (cash register)
- Large items (5.0-15.0): Deep "CHUNK!" (bass)
- Mega items (15.0+): "BOOM!" with screen shake

**UI Sounds:**
- Victory: Fanfare (major chord arpeggio)
- Defeat: Sad trombone (comedic)
- Timer urgent: Beep beep at <10s
- Level transition: Woosh/sweep

**Music** (OPTIONAL - may not be needed):
- Simple 8-bit loop per level
- OR just ambient city sounds
- OR ironic lo-fi beats (gen alpha study music meme)

---

## 📊 OBJECT TAXONOMY - The Consumption Hierarchy

### **The Philosophy:**

Objects should tell a story of escalating absurdity:
- Start: Childhood pocket change
- Middle: Adult possessions
- End: Consuming the infrastructure of capitalism itself

### **Emotional Beats:**

1. **Relatable** (0.3-1.0): "I had these as a kid"
2. **Aspirational** (1.0-5.0): "I want this someday"
3. **Impressive** (5.0-15.0): "Whoa, I'm eating CARS now?!"
4. **Absurd** (15.0-30.0): "This is ridiculous (I love it)"
5. **Cosmic** (30.0-50.0): "I am consuming reality itself"

### **Value = Story Progression:**

Not just random numbers - each tier represents:
- **$1-$100**: Broke kid era
- **$100-$1,000**: Side hustle unlocked
- **$1,000-$10,000**: Small business owner
- **$10,000-$100,000**: Success story
- **$100,000-$1M**: Influencer/entrepreneur
- **$1M+**: Billionaire mindset achieved

---

## 🎮 GAMEPLAY ENHANCEMENTS (Beyond Visuals)

### **Consumption Feedback Loop:**

**When you eat something:**
1. Screen shake (scaled to object value)
2. Popup text: "CONSUMED: SKATEBOARD! +$100"
3. Sound effect (pitch = size)
4. Particle burst (color = object color)
5. Object name added to "consumption log"

**Why this matters:**
- EVERY collection becomes an EVENT
- You REMEMBER eating the yacht
- Each consumption is a dopamine hit
- Creates "I can't believe I just ate that" moments

### **Combo System (Engagement Multiplier):**

```
Eat 3 objects in 2 seconds:
"COMBO x3 🔥 GRINDSET ACTIVATED"
Bonus: +50% value

Eat 5 objects:
"COMBO x5 ⚡ UNGOVERNABLE MODE"
Bonus: +100% value

Eat 10 objects:
"COMBO x10 💎 LEGENDARY CONSUMER"
Bonus: +200% value
```

**Why:** Rewards aggressive play, creates skill expression, MORE DOPAMINE

### **Consumption Log (Memory/Story):**

On victory screen, show:
```
YOU CONSUMED:
🪙 12 Pennies
📝 8 Homework sheets
🎒 5 Backpacks
🚲 2 Bicycles
🪑 1 DESK

MOST IMPRESSIVE: Desk
TOTAL OBJECTS: 28
GRINDSET LEVEL: Uncommon
```

**Why:** Creates narrative, screenshot-able moments, flex potential

---

## 🎨 SPRITE DESIGN PHILOSOPHY - LITTLEJS IMPLEMENTATION

### **Technical Foundation from LittleJS Examples:**

**How LittleJS Sprites Work:**
```javascript
// From platformer example:
const spriteAtlas = {
    coin: tile(5, 16),          // Tile index 5, size 16×16
    crate: tile(1, 16),         // Tile index 1
    player: tile(2, 16),        // Tile index 2
    enemy: tile(4, 16)          // Tile index 4
};

// Usage in EngineObject:
new Collectible(pos, vec2(size), spriteAtlas.coin);
```

**Sprite Sheet Structure:**
- 256×256px total (our budget from assets/sprites.png)
- 16×16px per tile = 16×16 grid = 256 total tiles available
- Each object gets 1 tile (16×16px)
- Colors can be tinted programmatically via `this.color = hsl()`

### **Challenge: 256×256 Sprite Sheet Budget**

**Given:**
- 256 tiles total (16×16 grid)
- Need ~30-40 recognizable objects across 3 levels
- Each object = 1 tile (16×16px)

**Solution: Icon-Based Minimalist Sprites**

**Design Principles:**
1. **Silhouette First**: Object recognizable from outline alone at 16×16px
2. **2-3 Colors Max**: Base sprite in white/gray, tint via code
3. **Top-Down View**: Consistent 2D perspective (like Zelda/Pokemon)
4. **Icon Style**: Think emoji/icon, not realistic detail
5. **Exaggerated Features**: Big simplified shapes (wheel = circle, window = square)

### **Sprite Size Strategy (ALL 16×16px, vary visual scale):**

Since LittleJS uses 16×16 tiles, ALL sprites are same pixel size but represent different world sizes:

```
TIER 1 (Tiny objects):     16×16px tile, size 0.3-1.0 in game
TIER 2 (Small objects):    16×16px tile, size 1.0-5.0 in game
TIER 3 (Medium objects):   16×16px tile, size 5.0-15.0 in game
TIER 4 (Large objects):    16×16px tile, size 15.0-30.0 in game
TIER 5 (Mega objects):     16×16px tile, size 30.0-50.0 in game
```

**The trick:** Same pixel size, different WORLD size via `vec2(size)` parameter!

**Tile Budget (FITS NOW):**
- Level 1: 12 unique sprites (penny, gum, backpack, desk, teacher, etc.)
- Level 2: 11 unique sprites (coffee, laptop, car, house, etc.)
- Level 3: 10 unique sprites (yacht, mansion, jet, rocket, etc.)
- UI elements: 5 sprites (player ball variations, particles)
- **Total: ~38 tiles** (leaves 218 tiles for future content!)

**Optimization:**
- Programmatic color tinting (one sprite, many colors)
- Rotation variations (car facing different directions = same sprite rotated)
- Size scaling (one "person" sprite, different sizes = kid/adult/CEO)

---

## 🎓 SPRITE DESIGN MASTERCLASS - Professional Techniques

### **Key Lessons from SLYNYRD (Professional Pixel Artist):**

**Source**: [Pixelblog 21 - Top Down Objects](https://www.slynyrd.com/blog/2019/9/18/pixelblog-21-top-down-objects)

**Critical Principles for 16×16 Top-Down Sprites:**

1. **Simple Shapes with Symmetry**
   - Ball-shaped trees, blocky rocks, geometric chests
   - Symmetrical balance creates visual stability
   - Fits together nicely on tilemap
   - Looks good when used in repetition
   - Color swap variations create variety from one base sprite

2. **Blocking Technique (For Small Sprites)**
   - Start with basic shapes in solid colors
   - Progressively refine details
   - Add shading with limited colors (2-3 per object)
   - Works best for low-res sprites like 16×16

3. **Perspective Consistency (3/4 Top-Down)**
   - All objects must follow same projection rules
   - Man-made objects especially show perspective issues
   - Natural objects (trees, rocks) more forgiving
   - See tops/roofs of objects, slight angle on sides

4. **Cast Shadows**
   - Make objects feel connected to ground
   - Keep subtle, don't cast long
   - Can bake into sprite OR separate layer
   - Minimize conflicts with overlapping tiles

5. **Tilemap Integration**
   - Objects should fit cleanly into 16×16 tiles
   - Rare/special objects can break rules (2×2 tiles)
   - Consistent sizing allows clean placement
   - Staggered rows for forests, clusters for villages

**Application to Tiny Tycoon:**

- **People**: Stick figure style, 16×16, simple symmetrical shapes
- **Cars**: Blocky geometric vehicles, clear wheels/windows
- **Buildings**: Simple rectangular structures, window patterns
- **Trees**: Ball-shaped canopy, stick trunk
- **Coins/Items**: Circular/simple shapes, high contrast

---

## 🏗️ WORLD BUILDING - Environmental Design

### **Living World Elements:**

Not everything is collectable - some objects create CONTEXT and ATMOSPHERE

**Level 1 Background (Schoolyard):**
- Hopscotch grid painted on ground
- Tetherball pole (static)
- Drinking fountain
- Trash cans
- Painted playground zones (four square, kickball diamond)
- Grass vs pavement texture difference

**Level 2 Background (Downtown):**
- Crosswalks and road lines
- Parked cars (static, background layer)
- Street lamps
- Fire hydrants
- Storefronts
- Sidewalk café tables

**Level 3 Background (Luxury District):**
- Palm trees lining streets
- Fountains
- Marble/tile ground patterns
- Yacht docks/marina
- Helipad markings
- Golf course greens

**Why Environmental Objects Matter:**
- Creates PLACE and CONTEXT
- "I'm in a playground" vs "I'm on a yacht dock"
- Makes the world feel ALIVE
- Screenshot-able moments ("look at this tiny world!")

---

## 🎪 OBJECT PERSONALITY - Making Things Memorable

### **The Katamari Lesson:**

Every object in Katamari has:
1. A unique model (visual identity)
2. A specific name (shows on collection)
3. A sound/reaction (cows moo, cars honk)
4. Size-appropriate placement in world

### **Our Approach:**

**Each collectible needs:**
- **Sprite**: Recognizable visual
- **Name**: Specific (not "customer" but "TEACHER", "BUSINESSMAN", "CEO")
- **Collection Text**: "CONSUMED: SKATEBOARD!"
- **Value**: Reflects real-world absurdity ($500 for skateboard, $500M for rocket)
- **Audio**: Size-scaled pitch (tiny = high, mega = low)

### **People Are Critical:**

**Why people/characters matter:**
- They move (can have idle animations)
- They react (shocked face when you approach)
- They're ABSURD to consume ("I just ate my teacher")
- They create moral absurdity (eating people = capitalism satire)

**People Types:**
- Level 1: Teacher, Student, Lunch Lady, Principal
- Level 2: Businessman, Barista, Cop, Influencer
- Level 3: CEO, Politician, Yacht Captain, Billionaire

**Visual Differentiation:**
- Different colored clothes
- Different accessories (briefcase, coffee cup)
- Different sizes (kid < adult < CEO)

---

## 💡 THE "IT FACTOR" - Deeper Analysis

### **What Makes Something Memeable/Viral:**

Based on research findings:

**1. Absurdist Escalation**
- Skibidi Toilet: Singing heads in toilets fighting camera-heads
- Katamari: Roll up thumbtack → roll up continent
- **Tiny Tycoon**: Eat penny → eat SKYSCRAPER

**2. Ironic Self-Awareness**
- Game KNOWS it's absurd
- Text acknowledges the ridiculousness
- "Why are you eating a yacht?" "Numbers go up = dopamine"

**3. Screenshot Moments**
- Balatro: "Look at this insane combo!"
- Cookie Clicker: "I have 1 quadrillion cookies"
- **Tiny Tycoon**: "I consumed 3 teachers and a helicopter"

**4. Rebirth Fantasy**
- Roblox tycoons: Reset to grow faster (permanent upgrades)
- Cookie Clicker: Ascension makes you god-tier
- **Tiny Tycoon**: Each level = rebirth (start small, prove yourself again)

**5. Rule-Breaking Moments**
- Balatro: "Wait, I can MULTIPLY jokers?!"
- Vampire Survivors: "I can become INVINCIBLE?!"
- **Tiny Tycoon**: "I can eat PEOPLE?! I can eat BUILDINGS?!"

---

## 🚀 IMPLEMENTATION PHASES

### **Phase A: Visual World (PRIORITY 1)**

**Goal**: Replace rectangles with recognizable sprites

**Tasks:**
1. Create 256×256 sprite sheet with 30-40 objects
2. Implement sprite rendering in Collectible class
3. Add object name/type data to LEVEL_CONFIG
4. Test: Objects visually distinct and recognizable

**Estimated Time**: 4-6 hours (sprite creation is bulk of time)

---

### **Phase B: Juice & Feedback (PRIORITY 2)**

**Goal**: Make every collection feel AMAZING

**Tasks:**
1. Add collection popup text ("CONSUMED: YACHT!")
2. Implement screen shake on collection
3. Add ZzFX sound effects (collection, victory, defeat)
4. Add particle bursts on collection
5. Implement combo counter

**Estimated Time**: 2-3 hours

---

### **Phase C: Narrative Layer (PRIORITY 3)**

**Goal**: Add context and humor

**Tasks:**
1. Update level names ("BROKE ERA", "INFLUENCER ARC", "OLIGARCH MODE")
2. Enhanced transition text with personality
3. Consumption log on victory screen
4. Opening splash screen with narrative hook

**Estimated Time**: 1-2 hours

---

### **Phase D: World Building (POLISH)**

**Goal**: Add environmental context

**Tasks:**
1. Background objects/decorations per level
2. Ground textures (grass, pavement, marble)
3. Level-specific atmosphere

**Estimated Time**: 2-3 hours

---

## 🎯 CREATIVE DIRECTION QUESTIONS (To Be Answered)

### **Visual Style:**
- [ ] Pixel art? (retro, nostalgic, easier to create)
- [ ] Vector/geometric? (modern, scalable)
- [ ] Hand-drawn? (unique but time-intensive)
- **DECISION NEEDED**: _______________

### **Tone:**
- [ ] Ironic/satirical (mocking hustle culture)
- [ ] Celebratory (unironically pro-grindset)
- [ ] Absurdist (no explanation, pure chaos)
- [ ] Mix of all three?
- **DECISION NEEDED**: _______________

### **Object Selection Priority:**
- [ ] Realistic progression (penny → dollar → car)
- [ ] Absurdist chaos (gum → teacher → spaceship)
- [ ] Meme-focused (Stanley cup, NFT, Cybertruck)
- [ ] Balanced mix?
- **DECISION NEEDED**: _______________

### **Environmental vs Collectible Ratio:**
- [ ] 80% collectable, 20% environment (dense gameplay)
- [ ] 50/50 (balanced world building)
- [ ] 20% collectable, 80% environment (sparse, strategic)
- **DECISION NEEDED**: _______________

---

## 📝 RESEARCH NOTES - Continuous Learning

### **Games to Study:**

**For Object Design:**
- [ ] Katamari Damacy - object variety and absurdity
- [ ] Crossy Road - minimal but expressive sprites
- [ ] A Short Hike - cozy world building
- [ ] Untitled Goose Game - object interactions

**For Engagement:**
- [ ] Vampire Survivors - visual chaos and feedback
- [ ] Balatro - "holy shit" moments and combos
- [ ] Cookie Clicker - prestige mechanics
- [ ] Roblox Pet Simulator - rebirth dopamine

**For Gen Alpha Culture:**
- [ ] Skibidi Toilet - absurdist humor, no explanation needed
- [ ] TikTok POV memes - first-person narrative ("POV: you discovered side hustles")
- [ ] Sigma grindset memes - ironic hustle culture

---

## 🔮 VISION EVOLUTION LOG

### **Session 1: 2025-10-17**

**Problem Identified**: "Game feels soulless, no 'it factor'"

**Root Cause**: Abstract shapes with no personality, no world context, no feedback, mechanical without emotion

**Research Findings**:
- Katamari = absurd objects with personality + narrative hook
- Gen Alpha = ironic brain rot culture, dopamine, memes, consumption satire
- Roblox tycoons = rebirth mechanics, numbers go up, meta-progression
- Successful games = JUICE (screen shake, sound, particles, text feedback)

**Key Insight**: "Eating shapes to make numbers go up" ≠ engaging. "Eating a YACHT to become BILLIONAIRE" = engaging.

**Next Steps**: Create sprite-based miniature world with named objects and feedback systems

---

## 💭 OPEN QUESTIONS & EXPLORATIONS

1. **Should we add pets/companions?** (Roblox influence - your "grindset mascot")
2. **Should objects have reactions?** (People run away when you approach? Cars honk?)
3. **Environmental storytelling?** (Billboard text, signs, graffiti with jokes)
4. **Easter eggs?** (Hidden objects, secret combos, references)
5. **Multiplier persistence?** (Rebirth mechanic - keep some power between levels?)

---

## 🎬 THE PITCH (One Sentence)

"Katamari Damacy meets Cookie Clicker meets Ironic Gen Alpha Hustle Culture - consume everything from pennies to skyscrapers in a 3-level capitalism speedrun with rebirth mechanics and brain rot energy."

---

**STATUS**: Vision crystallizing - ready for sprite creation phase
**BLOCKERS**: None - mechanics work, just need SOUL
**NEXT SESSION**: Sprite sheet design or continue deepening vision?

---

*This is a living document. Add notes, insights, and evolution as the game develops.*

---

## 📐 CONCRETE SPRITE DESIGN GUIDE - Object-by-Object

### **Sprite Design Philosophy (Synthesized from Research):**

**From Mini Metro/Motorways**: Shape + Color dual-coding, extreme minimalism, geometric clarity
**From SLYNYRD**: Symmetry, blocking technique, consistent 3/4 perspective, subtle shadows
**From LittleJS Examples**: 16×16 tiles, programmatic color tinting, simple recognizable forms
**From Katamari**: Object personality, absurd escalation, named collectibles

### **The Tiny Tycoon Visual Style:**

**"Minimalist Icon Realism"** - Each sprite is:
- Geometric and simplified (Mini Metro influence)
- But clearly represents REAL object (Katamari influence)
- Top-down 3/4 perspective (SLYNYRD technique)
- 16×16px, 2-3 colors, symmetrical where possible
- Instantly recognizable silhouette

---

## 🎨 LEVEL 1 SPRITE DESIGNS - "Schoolyard Hustle"

### **Tier 1: Tiny Collectibles (Size 0.3-0.5)**

**PENNY** - Tile 0
```
16×16px, circular
Colors: Copper brown (#D2691E), highlight (#FFB366)
Design: Circle with subtle shine highlight (top-right)
Shadow: Small oval underneath
Name Display: "PENNY" (+$1)
```

**ERASER** - Tile 1
```
16×16px, rectangular
Colors: Pink (#FFB6C1), white edge
Design: Simple rectangle, slightly rounded corners
Name Display: "ERASER" (+$5)
```

**GUM** - Tile 2
```
16×16px, blob shape
Colors: Bright pink (#FF69B4), darker shadow
Design: Organic rounded blob, slight highlights
Name Display: "GUM" (+$10)
```

### **Tier 2: Small Collectibles (Size 0.6-1.5)**

**CRAYON** - Tile 3
```
16×16px, diagonal stick
Colors: Random vibrant (red/blue/green/yellow) + wrapper
Design: Diagonal orientation, pointed tip, wrapper band
Name Display: "CRAYON" (+$15)
```

**HOMEWORK** - Tile 4
```
16×16px, paper sheet
Colors: White (#FFF), black text lines, red F grade
Design: Rectangular paper with 3-4 horizontal lines, big "F" visible
Name Display: "HOMEWORK" (+$25)
```

**LUNCHBOX** - Tile 5
```
16×16px, rectangular box
Colors: Bright color (red/blue), handle dark, highlight
Design: Rectangular with handle on top, simple clasp detail
Name Display: "LUNCHBOX" (+$50)
```

**BACKPACK** - Tile 6
```
16×16px, rounded rectangle
Colors: Primary color (blue/red), straps darker
Design: Rounded bag shape, two shoulder straps visible
Name Display: "BACKPACK" (+$75)
```

### **Tier 3: Medium Collectibles (Size 1.5-3.0)**

**BASKETBALL** - Tile 7
```
16×16px, circle
Colors: Orange (#FF8C00), black lines
Design: Circle with characteristic curved lines pattern
Name Display: "BASKETBALL" (+$100)
```

**DESK** - Tile 8
```
16×16px, rectangle with legs
Colors: Brown wood (#8B4513), darker legs
Design: Top-down view showing rectangular surface, 4 leg dots
Name Display: "DESK" (+$200)
```

**TEACHER** (PERSON!) - Tile 9
```
16×16px, stick figure from above
Colors: Skin tone head circle, clothing color body
Design: Circle head (lighter), oval body (darker), two arm ovals
CRITICAL: First "living" object player can eat!
Name Display: "TEACHER" (+$300)
```

**BOOKSHELF** - Tile 10
```
16×16px, tall rectangle
Colors: Brown (#A0522D), colorful book spines
Design: Vertical rectangle with horizontal shelf lines, colored rectangles (books)
Name Display: "BOOKSHELF" (+$400)
```

**SWING SET** - Tile 11
```
16×16px or 24×24px (rare large object)
Colors: Metal gray, yellow/red swings
Design: A-frame structure, chain lines, seat rectangles
Name Display: "SWING SET" (+$500)
```

---

## 🎨 LEVEL 2 SPRITE DESIGNS - "Downtown Grind"

### **Tier 1: Small Urban Objects (Size 3.0-6.0)**

**COFFEE CUP** - Tile 12
```
16×16px, cylinder from above
Colors: White cup, brown coffee, green logo
Design: Circle (cup rim), darker inner circle (coffee), small logo
Name Display: "COFFEE" (+$100)
```

**LAPTOP** - Tile 13
```
16×16px, rectangle
Colors: Gray/silver (#C0C0C0), black screen, white apple logo
Design: Rounded rectangle (laptop body), darker inner rectangle (screen)
Name Display: "MACBOOK" (+$1,500) (Gen Alpha knows brands!)
```

**OFFICE CHAIR** - Tile 14
```
16×16px, circular with base
Colors: Black seat, gray base with wheels
Design: Circle (seat), star pattern (5-wheel base)
Name Display: "OFFICE CHAIR" (+$300)
```

### **Tier 2: Medium Urban Objects (Size 6.0-10.0)**

**BICYCLE** - Tile 15
```
16×16px, two circles
Colors: Frame color (varied), black wheels
Design: Two circles (wheels), connecting frame lines
Name Display: "BICYCLE" (+$500)
```

**E-SCOOTER** - Tile 16
```
16×16px, slim vertical
Colors: Black/silver, LED lights
Design: Platform rectangle, vertical handlebar, small wheel circles
Name Display: "BIRD SCOOTER" (+$750) (Gen Alpha meme!)
```

**BUSINESSMAN** - Tile 17
```
16×16px, person sprite
Colors: Black suit, skin tone head, brown briefcase
Design: Similar to teacher but black body, small rectangle (briefcase)
Name Display: "SUIT" (+$2,000) (dehumanizing = satire!)
```

**SOFA** - Tile 18
```
16×16px, rectangle
Colors: Fabric color (gray/brown), darker cushion lines
Design: Rectangle with 2-3 horizontal lines (cushions), arm rests
Name Display: "COUCH" (+$1,200)
```

### **Tier 3: Large Urban Objects (Size 10.0-15.0)**

**CAR** (SEDAN) - Tile 19
```
24×24px or 16×16 simplified
Colors: Body color (varied), black windows, wheels
Design: Rounded rectangle (body), 4 circles (wheels), windshield
Name Display: "HONDA CIVIC" (+$25,000) (specific = funny!)
```

**FOOD TRUCK** - Tile 20
```
24×24px, box truck
Colors: Bright color, serving window, wheels
Design: Rectangle body, window cutout, wheel circles, awning
Name Display: "TACO TRUCK" (+$50,000)
```

**SMALL HOUSE** - Tile 21
```
24×24px, building
Colors: Walls (beige/white), roof (gray/red), door/window
Design: Square base, triangular roof, door rectangle, window squares
Name Display: "STARTER HOME" (+$200,000)
```

---

## 🎨 LEVEL 3 SPRITE DESIGNS - "Oligarch Endgame"

### **Tier 1: Luxury Items (Size 10.0-20.0)**

**YACHT** - Tile 22
```
32×32px, boat
Colors: White hull, blue deck details, gold railings
Design: Elongated oval (hull), multiple deck levels, mast line
Name Display: "YACHT" (+$5M)
```

**LIMOUSINE** - Tile 23
```
32×32px, stretched car
Colors: Black body, dark windows, chrome details
Design: LONG rectangle (exaggerated), wheels, partition line
Name Display: "STRETCH LIMO" (+$250,000)
```

**MANSION** - Tile 24
```
32×32px, large building
Colors: White/cream, multiple windows, columns
Design: Large rectangle, symmetrical, many window squares, entrance
Name Display: "MCMANSION" (+$10M)
```

### **Tier 2: Mega Objects (Size 20.0-35.0)**

**HELICOPTER** - Tile 25
```
24×24px, aircraft from above
Colors: Body color, windows, rotor blades
Design: Oval body, circular window, X-shaped rotors
Name Display: "HELICOPTER" (+$15M)
```

**PRIVATE JET** - Tile 26
```
32×32px, plane from above
Colors: White body, wing gray, engines
Design: Elongated oval fuselage, triangular wings, engine circles
Name Display: "GULFSTREAM" (+$50M) (luxury brand = Gen Alpha flex)
```

**OFFICE BUILDING** - Tile 27
```
32×32px or larger, skyscraper
Colors: Glass (blue-ish), concrete (gray), window grid
Design: Tall rectangle, grid pattern of windows, rooftop
Name Display: "STARTUP HQ" (+$100M)
```

### **Tier 3: Cosmic Objects (Size 35.0-50.0)**

**SKYSCRAPER** - Tile 28
```
48×48px, massive building
Colors: Steel/glass, window pattern, spire
Design: Tall rectangle, dense window grid, distinctive top
Name Display: "SKYSCRAPER" (+$500M)
```

**SPACE ROCKET** - Tile 29
```
32×48px, vertical rocket
Colors: White body, red accents, flame cone
Design: Pointed top, cylindrical body, fins at base, "SPACEX" text
Name Display: "SPACE ROCKET" (+$2B) (Elon meme!)
```

**ISLAND** - Tile 30
```
48×48px or irregular
Colors: Green landmass, blue water border, sand beach
Design: Organic island shape, palm tree dots, beach outline
Name Display: "PRIVATE ISLAND" (+$100M)
```

---

## 🎨 SPECIAL SPRITES - Player & UI

**PLAYER BALL** - Tile 31
```
16×16px, circular with personality
Design: Golden/yellow sphere, dollar sign symbol $, shine effect
Variations: Could show $ signs multiplying as you grow
Renders at variable size: vec2(player.size.x)
```

**PARTICLE / SPARKLE** - Tile 32
```
8×8px, star/diamond
Colors: Yellow/gold, white center
Design: 4-point star or diamond, used for collection bursts
```

---

## 🎯 IMPLEMENTATION PRIORITY - Sprite Roadmap

### **MVP Sprite Set (10 sprites, ~2-3 hours):**

Critical for initial visual identity proof:

1. PENNY (tiny, round, copper)
2. GUM (tiny, blob, pink)
3. BACKPACK (small, bag, primary color)
4. DESK (medium, furniture, brown)
5. TEACHER (medium, PERSON!, stick figure)
6. COFFEE (small, cup, white)
7. CAR (large, vehicle, colorful)
8. BUSINESSMAN (medium, PERSON!, suit)
9. YACHT (large, boat, white)
10. PLAYER BALL (variable size, golden, $ symbol)

**Why these 10:** Represent all size tiers, show absurd escalation (penny → teacher → yacht), prove the visual system works, enough for Level 1 + samples from L2/L3

### **Full Sprite Set Phase 1 (30 sprites, ~6-8 hours):**

Complete coverage for all 3 levels:
- Level 1: 11 sprites (penny through swing set)
- Level 2: 11 sprites (coffee through small house)
- Level 3: 8 sprites (yacht through rocket)

### **Polish Phase 2 (Environmental, ~4-6 hours):**

- Background tiles (grass, pavement, water)
- Static decorations (trees, lamps, fountains)
- Shadow tiles
- Particle effects

---

## 💾 SPRITE SHEET LAYOUT - 256×256px Tile Map

### **Proposed Organization (16×16 grid = 256 tiles):**

```
Row 0-1: Level 1 Collectibles (Tiles 0-31: Penny, Eraser, Gum, Crayon, Homework, Lunchbox, Backpack, Basketball, Desk, Teacher, Bookshelf, Swing Set + variations)

Row 2-3: Level 2 Collectibles (Tiles 32-63: Coffee, Laptop, Chair, Bicycle, Scooter, Businessman, Sofa, Motorcycle, Car, Food Truck, House + variations)

Row 4-5: Level 3 Collectibles (Tiles 64-95: Yacht, Limo, Mansion, Helicopter, Private Jet, Office Building, Skyscraper, Rocket, Island + variations)

Row 6: Player & UI (Tiles 96-111: Player ball variations, particles, effects)

Row 7-8: Environmental (Tiles 112-143: Trees, lamps, benches, decorations)

Row 9-10: Ground Tiles (Tiles 144-175: Grass, pavement, water, dirt variations)

Rows 11-15: RESERVED (Tiles 176-255: Future expansion)
```

**Tile Budget Check:**
- Collectibles: ~33 base sprites (with color variations reusing same tile)
- Player/UI: ~8 sprites
- Environmental: ~20 sprites
- Ground: ~15 tiles
- **Total Used: ~76 tiles (30% of budget)**
- **Remaining: 180 tiles (70% for future content!)**

---

## 🔧 TECHNICAL IMPLEMENTATION - Sprite Integration

### **Step 1: Create Sprite Atlas (Like Platformer Example)**

```javascript
// After LittleJS loads in gameInit()
const spriteAtlas = {
    // Level 1 Collectibles
    penny: tile(0, 16),
    eraser: tile(1, 16),
    gum: tile(2, 16),
    crayon: tile(3, 16),
    homework: tile(4, 16),
    lunchbox: tile(5, 16),
    backpack: tile(6, 16),
    basketball: tile(7, 16),
    desk: tile(8, 16),
    teacher: tile(9, 16),
    bookshelf: tile(10, 16),
    swingset: tile(11, 24), // Larger sprite

    // Level 2 Collectibles
    coffee: tile(12, 16),
    laptop: tile(13, 16),
    chair: tile(14, 16),
    bicycle: tile(15, 16),
    scooter: tile(16, 16),
    businessman: tile(17, 16),
    sofa: tile(18, 16),
    car: tile(19, 24),
    foodtruck: tile(20, 24),
    house: tile(21, 24),

    // Level 3 Collectibles
    yacht: tile(22, 32),
    limo: tile(23, 32),
    mansion: tile(24, 32),
    helicopter: tile(25, 24),
    jet: tile(26, 32),
    office: tile(27, 32),
    skyscraper: tile(28, 48),
    rocket: tile(29, 48),
    island: tile(30, 48),

    // Player
    playerBall: tile(31, 16)
};
```

### **Step 2: Object Data with Names**

```javascript
const OBJECT_LIBRARY = {
    // Level 1
    penny: { name: "PENNY", value: 1, size: 0.3, tile: spriteAtlas.penny, color: hsl(.08, .7, .5) },
    eraser: { name: "ERASER", value: 5, size: 0.35, tile: spriteAtlas.eraser, color: hsl(.9, .7, .8) },
    gum: { name: "GUM", value: 10, size: 0.4, tile: spriteAtlas.gum, color: hsl(.9, .9, .7) },
    crayon: { name: "CRAYON", value: 15, size: 0.45, tile: spriteAtlas.crayon, color: 'random' },
    homework: { name: "HOMEWORK", value: 25, size: 0.6, tile: spriteAtlas.homework, color: hsl(0, 0, 1) },
    lunchbox: { name: "LUNCHBOX", value: 50, size: 0.7, tile: spriteAtlas.lunchbox, color: 'random' },
    backpack: { name: "BACKPACK", value: 75, size: 0.8, tile: spriteAtlas.backpack, color: hsl(.6, .8, .5) },
    basketball: { name: "BASKETBALL", value: 100, size: 1.0, tile: spriteAtlas.basketball, color: hsl(.08, 1, .5) },
    desk: { name: "DESK", value: 200, size: 1.5, tile: spriteAtlas.desk, color: hsl(.08, .5, .3) },
    teacher: { name: "TEACHER", value: 300, size: 2.0, tile: spriteAtlas.teacher, color: hsl(.1, .6, .7) },
    bookshelf: { name: "BOOKSHELF", value: 400, size: 2.5, tile: spriteAtlas.bookshelf, color: hsl(.08, .4, .4) },
    swingset: { name: "SWING SET", value: 500, size: 3.0, tile: spriteAtlas.swingset, color: hsl(0, 0, .6) },

    // Level 2 (add all from table above...)
    // Level 3 (add all from table above...)
};
```

### **Step 3: Modify Collectible Class**

```javascript
class Collectible extends EngineObject {
    constructor(pos, objectData) {
        // Use sprite tile instead of drawRect!
        super(pos, vec2(objectData.size), objectData.tile);

        this.objectName = objectData.name;
        this.value = objectData.value;
        this.baseColor = objectData.color === 'random' ?
            hsl(rand(), .8, .6) : objectData.color;
        this.color = this.baseColor;

        // ... rest same as before
    }

    render() {
        // LittleJS automatically renders sprite from tileInfo!
        // Just call super.render()
        super.render();

        // Optional: glow when magnet active
        if (this.magnetActive) {
            drawTile(this.pos, this.size.scale(1.2), this.tileInfo, this.color.scale(0.5, 0.1));
        }
    }
}
```

### **Step 4: Update Spawning**

```javascript
function spawnCollectiblesForLevel(config) {
    // ... grid calculation same ...

    // Instead of random size, pick from OBJECT_LIBRARY
    const levelObjects = getObjectsForLevel(config.levelNumber);
    const randomObject = levelObjects[randInt(levelObjects.length)];

    new Collectible(spawnPos, randomObject);
}

function getObjectsForLevel(levelNum) {
    if (levelNum === 1) return [
        OBJECT_LIBRARY.penny,
        OBJECT_LIBRARY.eraser,
        OBJECT_LIBRARY.gum,
        // ... etc
    ];
    // Level 2, 3 similar
}
```

---

## 🎬 NEXT STEPS - Bringing the World to Life

### **Immediate Action Items:**

1. **Create sprites.png** (256×256) with MVP 10 sprites
2. **Implement sprite atlas** in gameInit()
3. **Update Collectible class** to use tiles instead of drawRect
4. **Update OBJECT_LIBRARY** with all data
5. **Test in browser** - see REAL objects instead of rectangles!

### **Expected Impact:**

**Before**: Yellow rectangle, blue rectangle
**After**: PENNY, TEACHER, YACHT (with real visuals!)

**Engagement transformation:**
- "I'm collecting shapes" → "I'M EATING A TEACHER!"
- Abstract grinding → Absurd object consumption
- Soulless → PERSONALITY

---

**Research Session Complete**: Vision is now CONCRETE and ACTIONABLE
**Ready for**: Sprite creation phase or continue deepening other aspects?

*Continue adding research findings, visual references, and design iterations below*

---

## 📚 RESEARCH SOURCES ARCHIVE

- SLYNYRD Pixelblog 21: Top-down object design, blocking technique, shadows
- LittleJS Platformer Example: Sprite atlas system, tile() function usage
- Mini Metro/Motorways: Shape+color dual-coding, minimalist clarity
- Katamari Damacy: Object personality, absurd escalation, named collectibles
- Gen Alpha Research: Brain rot culture, ironic humor, dopamine loops, meme-ability
- Roblox Tycoons: Rebirth mechanics, number escalation, progression fantasy

---

*This is a living document. Add notes, insights, and evolution as the game develops.*

