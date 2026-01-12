# Unicorn Magic V2 - Isometric Edition

## Complete Product Requirements Document

*A whimsical 3D browser game where a princess transforms horses into unicorns by shooting magical hearts, now with an isometric camera and simplified controls.*

**Document Version:** 2.1  
**Last Updated:** 2026-01-11  
**Status:** Draft

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Goals & Success Metrics](#goals--success-metrics)
4. [Target Audience](#target-audience)
5. [Competitive Analysis](#competitive-analysis)
6. [User Stories](#user-stories)
7. [UX Journey Maps](#ux-journey-maps)
8. [Game Overview](#game-overview)
9. [Camera & View System](#camera--view-system)
10. [Controls](#controls)
11. [Princess Character](#princess-character)
12. [Heart Gun & Combat](#heart-gun--combat)
13. [Power-ups](#power-ups)
14. [Horse Types & AI](#horse-types--ai)
15. [Unicorn Transformation](#unicorn-transformation)
16. [Environment & Obstacles](#environment--obstacles)
17. [Day/Night Cycle](#daynight-cycle)
18. [Weather System](#weather-system)
19. [Collision & Physics](#collision--physics)
20. [Levels](#levels)
21. [UI & HUD](#ui--hud)
22. [Screen Effects](#screen-effects)
23. [Particle Effects](#particle-effects)
24. [Mobile Support](#mobile-support)
25. [Audio](#audio)
26. [Technical Specifications](#technical-specifications)
27. [Risks & Mitigations](#risks--mitigations)
28. [Launch Plan](#launch-plan)
29. [Open Questions](#open-questions)
30. [Asset Reference](#asset-reference)
31. [Implementation Checklist](#implementation-checklist)

---

## Executive Summary

Unicorn Magic V2 is a casual, family-friendly 3D browser game targeting children ages 5-12 and casual gamers. Players control a princess who transforms horses into unicorns by shooting magical hearts. The game features an isometric camera perspective, simplified 8-directional controls, and a charming Minecraft-inspired aesthetic with softer, rounded edges.

**Key Differentiators:**
- Zero-install browser gameplay (desktop & mobile)
- Non-violent, positive gameplay mechanics
- Simple controls accessible to young children
- Short, satisfying play sessions (5-15 minutes per level)

---

## Problem Statement

### Market Opportunity

Casual/kid-friendly 3D browser games are dominated by:
- Complex control schemes requiring gaming experience
- Aggressive monetization and ads disrupting gameplay
- Violent or competitive themes unsuitable for young children
- Poor mobile support requiring app downloads

### User Pain Points

| User | Pain Point | Our Solution |
|------|------------|--------------|
| Parents | Concern about game content and ads | Wholesome theme, no ads in core gameplay |
| Children (5-8) | Complex controls frustrate them | Simple 8-direction + fire controls |
| Children (9-12) | Games feel "too baby" or "too hard" | Progressive difficulty with optional challenges |
| Educators | Need engaging, accessible games | Works on school Chromebooks, no install |
| Casual gamers | Limited time for gaming | 5-15 min sessions, instant save progress |

### Why Now?

- WebGL/Three.js performance now supports rich 3D on mobile browsers
- Growing demand for screen-time-positive children's content
- Browser gaming resurgence as app fatigue increases
- Remote learning created demand for browser-based educational entertainment

---

## Goals & Success Metrics

### Product Goals

| Goal | Description | Priority |
|------|-------------|----------|
| G1 | Deliver engaging, age-appropriate gameplay | Critical |
| G2 | Achieve 60 FPS on mid-range devices | Critical |
| G3 | Support desktop and mobile with unified codebase | High |
| G4 | Create replayability through achievements and unlockables | Medium |
| G5 | Enable future content expansion (levels, characters) | Medium |

### Success Metrics (KPIs)

| Metric | Target | Measurement Method | Review Cadence |
|--------|--------|-------------------|----------------|
| Day 1 Retention | >40% | Analytics | Weekly |
| Day 7 Retention | >20% | Analytics | Weekly |
| Avg Session Length | 8-12 min | Analytics | Weekly |
| Level Completion Rate | >70% L1, >50% L3 | In-game events | Weekly |
| Mobile Play Rate | >30% of sessions | User agent analytics | Monthly |
| Performance (FPS) | 60 FPS median | Performance monitoring | Per release |
| Load Time | <3 seconds | Performance monitoring | Per release |
| Crash Rate | <0.1% | Error tracking | Daily |
| NPS Score | >50 | In-app survey | Quarterly |

### Non-Goals (Out of Scope)

- Multiplayer functionality (future consideration)
- User-generated content
- Virtual currency or in-app purchases (v1)
- Social features / friend lists
- Leaderboards (v1)

---

## Target Audience

### Primary Personas

```
┌─────────────────────────────────────────────────────────────────┐
│ PERSONA 1: LILY (Age 7)                                         │
├─────────────────────────────────────────────────────────────────┤
│ Context: Plays games on family iPad and mom's laptop            │
│ Goals: Have fun, feel accomplished, loves unicorns              │
│ Frustrations: Complex controls, scary games, losing progress    │
│ Tech Comfort: Can navigate touch interfaces, learning keyboard  │
│ Session Time: 10-20 minutes (parent-limited)                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PERSONA 2: MARCUS (Age 11)                                      │
├─────────────────────────────────────────────────────────────────┤
│ Context: Plays Minecraft, Roblox; wants games at school         │
│ Goals: Achievements, completion, showing friends                │
│ Frustrations: "Baby games," games blocked at school             │
│ Tech Comfort: Keyboard proficient, understands game mechanics   │
│ Session Time: 15-30 minutes                                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PERSONA 3: SARAH (Parent, Age 35)                               │
├─────────────────────────────────────────────────────────────────┤
│ Context: Looking for appropriate games for kids                 │
│ Goals: Safe content, no hidden costs, educational value         │
│ Frustrations: Ads, in-app purchases, violent content            │
│ Decision Factor: Can preview before child plays                 │
│ Session Time: N/A (facilitator)                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Secondary Audiences

- **Casual adult gamers**: Seeking relaxing, low-stakes gameplay
- **Streamers/Content creators**: Family-friendly content opportunity
- **Educators**: Reward/break-time activity for students

---

## Competitive Analysis

### Direct Competitors

| Game | Platform | Strengths | Weaknesses | Our Advantage |
|------|----------|-----------|------------|---------------|
| Minecraft | All | Beloved aesthetic, creativity | Complex, requires purchase | Free, simpler |
| Roblox | All | Social, user content | Quality varies, safety concerns | Curated, safe |
| Poki Games | Browser | Large catalog, free | Ad-heavy, inconsistent quality | Premium feel, no ads |
| CoolMath Games | Browser | Educational framing | Dated graphics | Modern 3D, engaging |

### Indirect Competitors

| Game | Why Relevant | Learning |
|------|--------------|----------|
| Animal Crossing | Wholesome aesthetic | Positive, non-violent tone |
| Stardew Valley | Casual appeal | Satisfying progression loops |
| Slime Rancher | Cute creature collection | Transformation as reward |

### Competitive Positioning

```
                    Complex Controls
                          │
                          │
    Minecraft ●           │           ● Fortnite
                          │
                          │
 Casual ──────────────────┼────────────────── Hardcore
                          │
           ● Unicorn      │
             Magic V2     │       ● Roblox
                          │
    ● CoolMath            │
                          │
                    Simple Controls
```

**Our Position:** Simple controls + casual gameplay + high production value

---

## User Stories

### Epic 1: Core Gameplay (MVP)

| ID | Priority | User Story | Acceptance Criteria |
|----|----------|------------|---------------------|
| US-001 | Must | As a player, I can move in 8 directions using QWEASDZXC keys so that I can navigate the meadow | Movement responds instantly; diagonal movement normalized; character faces movement direction |
| US-002 | Must | As a player, I can shoot hearts by pressing Space/clicking so that I can transform horses | Heart projectile spawns at gun; travels in facing direction; 0.2s cooldown between shots |
| US-003 | Must | As a player, I see horses flee when they spot me so that gameplay feels dynamic | Horses have vision cone; alert state visible; flee toward cover |
| US-004 | Must | As a player, I see horses transform into unicorns when hit so that I feel accomplishment | Transformation animation plays; particle effects; unicorn has horn and rainbow mane |
| US-005 | Must | As a player, I complete a level when all horses are transformed so that I can progress | Victory screen shows; time/stats displayed; next level unlocked |
| US-006 | Must | As a player, I see an isometric view of the play area so that I have spatial awareness | Camera at 45° rotation, 36° pitch; follows player smoothly |

### Epic 2: Horse AI & Variety

| ID | Priority | User Story | Acceptance Criteria |
|----|----------|------------|---------------------|
| US-007 | Must | As a player, I encounter different horse types so that gameplay has variety | 5 horse types with distinct colors, speeds, behaviors |
| US-008 | Must | As a player, I see horses hide behind obstacles so that I must strategize | Horses pathfind to cover; remain hidden until player leaves |
| US-009 | Should | As a player, I face Brave horses requiring 2 hits so that there's challenge | Hit counter visible; partial transformation effects |
| US-010 | Nice | As a player, I face Boss horses requiring 5 hits with phases so that there's climactic gameplay | Boss intro; phase transitions; unique attack patterns |

### Epic 3: Environment & World

| ID | Priority | User Story | Acceptance Criteria |
|----|----------|------------|---------------------|
| US-011 | Must | As a player, I navigate around obstacles (trees, bushes, castles) so that the world feels real | Collision detection working; obstacles provide horse cover |
| US-012 | Must | As a player, I stay within world boundaries so that I don't get lost | Hedge walls visible; player cannot pass through |
| US-013 | Should | As a player, I walk on undulating terrain so that the world feels natural | Terrain height affects Y position; smooth transitions |
| US-014 | Nice | As a player, I encounter interactive elements (mud, flowers, water) so that exploration is rewarded | Mud slows player; flowers attract horses; water blocks path |

### Epic 4: Power-ups & Progression

| ID | Priority | User Story | Acceptance Criteria |
|----|----------|------------|---------------------|
| US-015 | Should | As a player, I can collect power-ups for temporary abilities so that gameplay has variety | 4 power-up types spawn; visual pickup feedback; timed duration |
| US-016 | Should | As a player, I earn 1-3 stars based on performance so that I'm motivated to replay | Star criteria clear; display on level select |
| US-017 | Nice | As a player, I unlock achievements for milestones so that I have long-term goals | 10+ achievements; notification on unlock; persistent save |
| US-018 | Nice | As a player, I unlock gun skins through achievements so that I can customize | Skin selection in menu; visual change in gameplay |

### Epic 5: Visual Polish

| ID | Priority | User Story | Acceptance Criteria |
|----|----------|------------|---------------------|
| US-019 | Should | As a player, I see particle effects (hearts, sparkles, rainbows) so that the game feels magical | Trail on hearts; starburst on impact; ambient sparkles |
| US-020 | Should | As a player, I experience screen shake on transformations so that hits feel impactful | Configurable intensity; smooth recovery |
| US-021 | Nice | As a player, I experience day/night cycle so that the world feels alive | 4 phases; lighting changes; horse visibility affected |
| US-022 | Nice | As a player, I experience weather effects so that replay feels fresh | Rain, fog, rainbow; gameplay modifiers |

### Epic 6: UI & Accessibility

| ID | Priority | User Story | Acceptance Criteria |
|----|----------|------------|---------------------|
| US-023 | Must | As a player, I see a HUD with hearts, timer, and horse count so that I know my status | Clear, non-intrusive UI; updates in real-time |
| US-024 | Must | As a player, I see a minimap showing horse locations so that I can plan | Top-left position; zoom controls; legend clear |
| US-025 | Should | As a player, I can pause the game with Escape so that I can take breaks | Pause overlay; resume/quit options |
| US-026 | Must | As a mobile player, I can use touch controls so that I can play on my device | D-pad for movement; fire button; responsive touch |

### Epic 7: Audio

| ID | Priority | User Story | Acceptance Criteria |
|----|----------|------------|---------------------|
| US-027 | Should | As a player, I hear sound effects for actions so that the game feels responsive | Fire, hit, transform, footstep sounds |
| US-028 | Nice | As a player, I hear background music so that gameplay is immersive | Menu, gameplay, victory tracks; volume control |

---

## UX Journey Maps

### New Player First Session

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        NEW PLAYER JOURNEY (First 10 Minutes)                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Land on Page] ──► [Loading Screen] ──► [Title Screen]                    │
│       │                   │                    │                            │
│       │              "Loading..."         [Play Button]                     │
│       │              Progress bar              │                            │
│       ▼                                        ▼                            │
│  EMOTION: Curious              EMOTION: Anticipation                        │
│                                                                             │
│                                                                             │
│  [Title Screen] ──► [Level 1: Meadow] ──► [Tutorial Prompts]               │
│       │                    │                    │                           │
│   "Play" tap         Camera reveals        "Use WASD to move"              │
│                      princess & horses     "Space to shoot"                 │
│                                                 │                           │
│                                                 ▼                           │
│                                        [First Movement]                     │
│                                              │                              │
│                                         EMOTION: "I can do this!"           │
│                                              │                              │
│                                              ▼                              │
│                                        [First Shot]                         │
│                                              │                              │
│                                         Heart flies!                        │
│                                         EMOTION: Delight                    │
│                                              │                              │
│                                              ▼                              │
│                                        [Miss... Chase!]                     │
│                                              │                              │
│                                         Horse flees                         │
│                                         EMOTION: Excitement                 │
│                                              │                              │
│                                              ▼                              │
│                                     [First Transformation!]                 │
│                                              │                              │
│                                    ✨ UNICORN CREATED ✨                    │
│                                    Screen shake, particles                  │
│                                    EMOTION: JOY / ACCOMPLISHMENT            │
│                                              │                              │
│                                              ▼                              │
│                                    [Continue hunting...]                    │
│                                              │                              │
│                                              ▼                              │
│                                    [Level Complete!]                        │
│                                              │                              │
│                                    Stars awarded, stats shown               │
│                                    EMOTION: Pride, want more                │
│                                              │                              │
│                                              ▼                              │
│                                    [Next Level] or [Replay]                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Core Gameplay Loop

```
                    ┌─────────────────────────────────────────────────┐
                    │                  GAMEPLAY LOOP                  │
                    └─────────────────────────────────────────────────┘
                    
                                         START
                                           │
                                           ▼
                              ┌────────────────────────┐
                              │     EXPLORE / FIND     │
                              │        HORSE           │
                              └───────────┬────────────┘
                                          │
                           ┌──────────────┴──────────────┐
                           │                             │
                           ▼                             ▼
                    Horse Unaware                  Horse Spots You
                           │                             │
                           │                             ▼
                           │                   ┌─────────────────┐
                           │                   │   HORSE FLEES   │
                           │                   │   TO COVER      │
                           │                   └────────┬────────┘
                           │                            │
                           └──────────────┬─────────────┘
                                          │
                                          ▼
                              ┌────────────────────────┐
                              │    POSITION & AIM     │
                              │    (Move to aim)      │
                              └───────────┬────────────┘
                                          │
                                          ▼
                              ┌────────────────────────┐
                              │     SHOOT HEART       │
                              │     (Space / Click)   │
                              └───────────┬────────────┘
                                          │
                           ┌──────────────┴──────────────┐
                           │                             │
                           ▼                             ▼
                        ╔═══════╗                  ┌───────────┐
                        ║ MISS! ║                  │   HIT!    │
                        ╚═══╤═══╝                  └─────┬─────┘
                            │                            │
                            │                            ▼
                            │                   ┌─────────────────┐
                            │                   │  TRANSFORM TO   │
                            │                   │    UNICORN      │
                            │                   │  ✨ Effects ✨  │
                            │                   └────────┬────────┘
                            │                            │
                            │                            ▼
                            │                   ┌─────────────────┐
                            │                   │  ALL HORSES     │
                            │                   │  TRANSFORMED?   │
                            │                   └────────┬────────┘
                            │                            │
                            │              ┌─────────────┴─────────────┐
                            │              │                           │
                            │              ▼                           ▼
                            │           ╔═════════╗            ┌────────────┐
                            │           ║ LEVEL   ║            │   MORE     │
                            │           ║COMPLETE!║            │  HORSES    │
                            │           ╚════╤════╝            └──────┬─────┘
                            │                │                        │
                            │                ▼                        │
                            │         [Victory Screen]                │
                            │                                         │
                            └────────────────┬────────────────────────┘
                                             │
                                             ▼
                                       (Loop continues)
```

### Session Flow (Returning Player)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        RETURNING PLAYER SESSION                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Open Game] ──► [Title] ──► [Level Select]                                │
│                                   │                                         │
│                    ┌──────────────┼──────────────┐                         │
│                    │              │              │                          │
│                    ▼              ▼              ▼                          │
│              [Replay L1]   [Continue L3]  [Achievements]                   │
│              for 3 stars   (in progress)   (check unlocks)                 │
│                    │              │              │                          │
│                    ▼              ▼              ▼                          │
│               [Gameplay]    [Gameplay]    [View Progress]                  │
│                    │              │              │                          │
│                    └──────────────┼──────────────┘                         │
│                                   │                                         │
│                                   ▼                                         │
│                            [Session End]                                    │
│                            Save progress                                    │
│                            Show session stats                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Game Overview

### Concept
A little princess with blonde pigtails runs around a magical meadow shooting pink hearts from her heart gun. When hearts hit horses, they transform into beautiful unicorns with rainbow manes and sparkle trails. Horses flee and hide behind trees, bushes, and castles when they see the princess coming.

### Visual Art Style
All characters and items should be styled in a **Minecraft-inspired aesthetic** with the following modifications:

- **Blocky/voxel-based geometry**: Characters, horses, unicorns, and items use cube-based and rectangular forms similar to Minecraft
- **Softer, rounder corners**: Unlike Minecraft's sharp edges, all geometry should have **beveled or rounded corners** for a friendlier, more approachable look
- **Low-poly charm**: Maintain the charming simplicity of block-based design while softening harsh edges
- **Consistent corner radius**: Apply uniform rounding (approximately 10-15% of edge length) across all assets for visual cohesion

```
MINECRAFT vs UNICORN MAGIC STYLE:

Minecraft (sharp):          Unicorn Magic (rounded):
    ┌─────────┐                 ╭─────────╮
    │         │                 │         │
    │  ■   ■  │                 │  ●   ●  │
    │    ▬    │                 │    ◡    │
    └─────────┘                 ╰─────────╯
    
Sharp 90° corners           Soft beveled corners
```

### Core Loop
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    │
│  │  FIND   │───>│  CHASE  │───>│  SHOOT  │    │
│  │  HORSE  │    │  HORSE  │    │  HEART  │    │
│  └─────────┘    └─────────┘    └────┬────┘    │
│       ↑                             │          │
│       │         ┌─────────┐         │          │
│       │         │TRANSFORM│<────────┘          │
│       │         │   TO    │                    │
│       │         │ UNICORN │                    │
│       │         └────┬────┘                    │
│       │              │                         │
│       └──────────────┘                         │
│                                                 │
│  Win: All horses transformed into unicorns!    │
└─────────────────────────────────────────────────┘
```

### Gameplay Pacing

The game should feel **fast-moving and rapid** with responsive controls:

| Entity | Speed | Description |
|--------|-------|-------------|
| Princess | 8 u/s | Quick, responsive movement |
| Normal Horse | 6 u/s | Fast enough to require chase |
| Fast Horse | 9 u/s | Challenging to catch |
| Shy Horse | 6 u/s | Quick to flee |
| Brave Horse | 5 u/s | Slower but takes 2 hits |
| Baby Horse | 4 u/s | Easier for new players |
| Heart Projectile | 20 u/s | Fast-traveling shots |

**Pacing Guidelines:**
- Movement should feel **snappy and immediate** (no acceleration delay)
- Horses react and flee **quickly** when spotted
- Fire rate is rapid (0.2s cooldown) for action-packed gameplay
- Transformation animations are quick (0.8s) to maintain momentum
- Level par times encourage fast completion

### Platform
- Web browser (desktop & mobile)
- Built with Three.js + TypeScript + Vite

---

## Camera & View System

### Isometric Perspective

Unlike V1's over-the-shoulder camera, V2 uses a fixed isometric view that shows the play area from above at an angle.

```
ISOMETRIC VIEW ANGLE:
                    
        ╱╲         Camera looks down at ~30-45°
       ╱  ╲        Rotated 45° from world axes
      ╱    ╲       
     ╱  🌳  ╲      Player always visible
    ╱   👸   ╲     No camera rotation needed
   ╱    🐴    ╲    
  ╱____________╲   
        
  Ground plane visible as diamond shape
```

### Camera Configuration

```typescript
// Isometric camera settings
const CAMERA_CONFIG = {
  angle: Math.PI / 4,        // 45° rotation around Y
  pitch: Math.PI / 5,        // 36° down from horizontal
  distance: 25,              // Units from player
  followSpeed: 5,            // Smooth follow lerp speed
  fov: 50,                   // Field of view (perspective)
  // OR use OrthographicCamera for true isometric
};

// Camera position calculation (each frame)
function updateCamera(player: Vector3, delta: number) {
  const targetX = player.x + Math.sin(CAMERA_CONFIG.angle) * CAMERA_CONFIG.distance;
  const targetZ = player.z + Math.cos(CAMERA_CONFIG.angle) * CAMERA_CONFIG.distance;
  const targetY = CAMERA_CONFIG.distance * Math.tan(CAMERA_CONFIG.pitch);
  
  // Smooth follow
  camera.position.lerp(new Vector3(targetX, targetY, targetZ), delta * CAMERA_CONFIG.followSpeed);
  camera.lookAt(player);
}
```

### View Comparison

```
V1 (Over-the-Shoulder):          V2 (Isometric):
                                 
    ┌───────────────┐               ╱╲
    │               │              ╱  ╲
    │   🌳    🐴    │             ╱ 🌳 ╲
    │               │            ╱      ╲
    │      +        │           ╱  👸    ╲
    │  (crosshair)  │          ╱    🐴    ╲
    │               │         ╱____________╲
    │   👸 (back)   │        
    └───────────────┘        Full scene visible
    Camera behind player     Camera above at angle
```

---

## Controls

### Desktop Controls

**8-Directional Movement (Q/W/E/A/S/D/Z/X/C Grid)**

Movement uses a 3x3 key grid that maps directly to 8 directions plus stationary:

```
         SCREEN TOP (↑)
              
    ┌─────┬─────┬─────┐
    │  Q  │  W  │  E  │
    │ ↖   │  ↑  │  ↗  │
    ├─────┼─────┼─────┤
    │  A  │  S  │  D  │
    │ ←   │STOP │  →  │
    ├─────┼─────┼─────┤
    │  Z  │  X  │  C  │
    │ ↙   │  ↓  │  ↘  │
    └─────┴─────┴─────┘

Q = Up-Left (diagonal)      W = Up (north)           E = Up-Right (diagonal)
A = Left (west)             S = Stop/Stationary      D = Right (east)
Z = Down-Left (diagonal)    X = Down (south)         C = Down-Right (diagonal)
```

**Character Facing & Firing:**
- Character **automatically faces** the direction of movement
- **Fire key (Space/Click)** shoots in the direction the character is facing
- No separate aiming required - move to aim, then fire
- Character retains last facing direction when stopped

```
GAMEPLAY EXAMPLE:

  Press W → Character faces up, walks up
  Press E → Character faces up-right diagonal, walks that way
  Release → Character stops but still faces up-right
  Press Space → Heart fires in the up-right direction
```

**Movement to World Conversion**
```typescript
// 8-directional input mapping (screen-relative)
const DIRECTION_MAP: Record<string, Vector2> = {
  'Q': new Vector2(-1, -1),  // Up-Left
  'W': new Vector2(0, -1),   // Up
  'E': new Vector2(1, -1),   // Up-Right
  'A': new Vector2(-1, 0),   // Left
  'S': new Vector2(0, 0),    // Stop (no movement)
  'D': new Vector2(1, 0),    // Right
  'Z': new Vector2(-1, 1),   // Down-Left
  'X': new Vector2(0, 1),    // Down
  'C': new Vector2(1, 1),    // Down-Right
};

// Track current facing direction (persists when stopped)
let facingDirection: Vector3 = new Vector3(0, 0, 1);

// Screen-relative to world coordinates
function screenToWorld(screenDir: Vector2): Vector3 {
  if (screenDir.lengthSq() === 0) return new Vector3(); // Stopped
  
  const angle = CAMERA_CONFIG.angle;
  const normalized = screenDir.clone().normalize();
  
  // Rotate screen direction by camera angle
  const worldX = normalized.x * Math.cos(angle) - normalized.y * Math.sin(angle);
  const worldZ = normalized.x * Math.sin(angle) + normalized.y * Math.cos(angle);
  
  return new Vector3(worldX, 0, worldZ).normalize();
}

// Input handling
function handleMovement(activeKey: string, delta: number): void {
  const screenDir = DIRECTION_MAP[activeKey] || new Vector2(0, 0);
  const moveDir = screenToWorld(screenDir);
  
  if (moveDir.lengthSq() > 0) {
    // Move player
    player.position.addScaledVector(moveDir, speed * delta);
    
    // Update facing direction and rotation
    facingDirection.copy(moveDir);
    player.rotation.y = Math.atan2(moveDir.x, moveDir.z);
  }
  // When stopped (S key or no input), character retains last facing direction
}

// Fire in facing direction
function handleFire(): void {
  fireHeart(facingDirection.clone());
}
```

### Aiming System

**Movement-Based Aiming (Primary)**
- Character faces the direction of the last movement key pressed
- Fire button shoots a heart in the facing direction
- Simple and intuitive - no mouse aiming needed
- Great for keyboard-only play

**Optional: Mouse Override**
- If mouse is moved significantly, character can face cursor
- Allows precision aiming while stationary
- Click to fire toward cursor position

### Control Summary

| Action | Desktop | Mobile |
|--------|---------|--------|
| Move Up-Left | Q | D-pad diagonal |
| Move Up | W | D-pad Up |
| Move Up-Right | E | D-pad diagonal |
| Move Left | A | D-pad Left |
| Stop | S | Release D-pad |
| Move Right | D | D-pad Right |
| Move Down-Left | Z | D-pad diagonal |
| Move Down | X | D-pad Down |
| Move Down-Right | C | D-pad diagonal |
| Fire | Space / Left Click | Fire button |
| Minimap Zoom In | + or = | Pinch zoom |
| Minimap Zoom Out | - | Pinch zoom |
| Pause | Escape | Pause button |

---

## Princess Character

### Design Overview

A cute chibi-style princess with exaggerated proportions for maximum adorableness.

```
FRONT VIEW:              SIDE VIEW:
                         
    ◐═══◑               ○ ○  <- Pigtails
   ╱  ♥  ╲               \│
  (  ◕‿◕  )            ( ◕│)  <- Big eyes
   \  ‿  /               \│
    └───┘                 │
   ╭─────╮              ╭─┴─╮
  ╱  ♥♥♥  ╲            │   │══♥  <- Gun
 │ ═══════ │           │   │
 ╰────┬────╯           ╰─┬─╯
     / \                / \
    ◯   ◯              ◯   ◯
    
Height: ~2 units
Head: 40% of height
```

### Proportions

```
CHIBI PROPORTIONS:
┌─────────────────┐
│                 │
│   HEAD + HAIR   │  40% (~0.8 units)
│   - Large head  │
│   - Pigtails    │
│   - Crown       │
│                 │
├─────────────────┤
│                 │
│     TORSO       │  35% (~0.7 units)
│   - Dress       │
│   - Arms        │
│   - Gun         │
│                 │
├─────────────────┤
│      LEGS       │  25% (~0.5 units)
│   - Animated    │
│   - Pink shoes  │
└─────────────────┘
Total: ~2.0 units
```

### Color Palette

| Part | Color | Hex |
|------|-------|-----|
| Skin | Bisque | #FFE4C4 |
| Hair | Golden Blonde | #F4D03F |
| Eyes | Royal Blue | #4169E1 |
| Eye Highlights | White | #FFFFFF |
| Blush | Light Pink | #FFB6C1 |
| Dress | Hot Pink | #FF69B4 |
| Shoes | Deep Pink | #FF1493 |
| Crown | Gold | #FFD700 |
| Gun Body | Deep Pink | #FF1493 |
| Gun Accents | Gold | #FFD700 |

### Head Components

```typescript
function createHead(): THREE.Group {
  const head = new THREE.Group();
  
  // Main head (large sphere for chibi look)
  const headMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xffe4c4 })
  );
  head.add(headMesh);
  
  // Eyes (large, expressive)
  const eyeGeom = new THREE.SphereGeometry(0.08, 12, 12);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x4169e1 });
  
  const leftEye = new THREE.Mesh(eyeGeom, eyeMat);
  leftEye.position.set(-0.12, 0.02, 0.28);
  leftEye.scale.set(1, 1.2, 0.5);  // Oval shape
  head.add(leftEye);
  
  const rightEye = leftEye.clone();
  rightEye.position.x = 0.12;
  head.add(rightEye);
  
  // Eye highlights (white dots for sparkle)
  const highlightGeom = new THREE.SphereGeometry(0.025, 8, 8);
  const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  
  const leftHighlight = new THREE.Mesh(highlightGeom, highlightMat);
  leftHighlight.position.set(-0.1, 0.05, 0.32);
  head.add(leftHighlight);
  
  // Blush marks (pink circles on cheeks)
  const blushGeom = new THREE.SphereGeometry(0.05, 8, 8);
  const blushMat = new THREE.MeshStandardMaterial({
    color: 0xffb6c1,
    transparent: true,
    opacity: 0.6
  });
  
  const leftBlush = new THREE.Mesh(blushGeom, blushMat);
  leftBlush.position.set(-0.22, -0.05, 0.22);
  leftBlush.scale.set(1.5, 0.8, 0.3);
  head.add(leftBlush);
  
  // Smile (curved line)
  const smileGeom = new THREE.TorusGeometry(0.08, 0.015, 8, 12, Math.PI);
  const smileMat = new THREE.MeshBasicMaterial({ color: 0xcc6666 });
  const smile = new THREE.Mesh(smileGeom, smileMat);
  smile.position.set(0, -0.1, 0.3);
  smile.rotation.set(Math.PI, 0, Math.PI);
  head.add(smile);
  
  return head;
}
```

### Hair & Pigtails

```typescript
function createHair(): THREE.Group {
  const hair = new THREE.Group();
  const hairMat = new THREE.MeshStandardMaterial({ color: 0xf4d03f });
  
  // Hair cap (covers top of head)
  const capMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.38, 16, 16),
    hairMat
  );
  capMesh.position.set(0, 0.05, -0.05);
  capMesh.scale.set(1, 0.9, 1);
  hair.add(capMesh);
  
  // Bangs (front fringe)
  const bangsMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 12, 12),
    hairMat
  );
  bangsMesh.position.set(0, 0.2, 0.25);
  bangsMesh.scale.set(2, 0.4, 0.5);
  hair.add(bangsMesh);
  
  // Pigtails (2 spheres each, with physics)
  const createPigtail = (side: number) => {
    const pigtail = new THREE.Group();
    
    // Main ball
    const mainBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 12, 12),
      hairMat
    );
    pigtail.add(mainBall);
    
    // Secondary ball (hangs lower)
    const secondBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 10, 10),
      hairMat
    );
    secondBall.position.set(side * 0.1, -0.2, 0);
    pigtail.add(secondBall);
    
    // Hair tie (pink ring)
    const tieMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.08, 0.025, 8, 12),
      new THREE.MeshStandardMaterial({ color: 0xff69b4 })
    );
    tieMesh.position.set(-side * 0.08, 0, 0);
    tieMesh.rotation.y = Math.PI / 2;
    pigtail.add(tieMesh);
    
    pigtail.position.set(side * 0.35, 0.05, 0);
    return pigtail;
  };
  
  hair.add(createPigtail(-1));  // Left pigtail
  hair.add(createPigtail(1));   // Right pigtail
  
  return hair;
}
```

### Crown/Tiara

```typescript
function createCrown(): THREE.Group {
  const crown = new THREE.Group();
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.6,
    roughness: 0.3
  });
  
  // Base band
  const baseMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.15, 0.02, 8, 16, Math.PI),
    goldMat
  );
  baseMesh.rotation.set(-Math.PI / 2, 0, Math.PI);
  crown.add(baseMesh);
  
  // Three peaks
  const peakGeom = new THREE.ConeGeometry(0.04, 0.1, 4);
  [-1, 0, 1].forEach(i => {
    const peak = new THREE.Mesh(peakGeom, goldMat);
    peak.position.set(i * 0.1, 0.05, 0);
    crown.add(peak);
  });
  
  // Heart gem (center)
  const heartGem = createHeartMesh(0.06, 0xff69b4, true);
  heartGem.position.set(0, 0.08, 0.02);
  heartGem.rotation.z = Math.PI;
  crown.add(heartGem);
  
  crown.position.set(0, 0.35, 0.05);
  return crown;
}
```

### Animations

**Walk Cycle**
```typescript
private walkPhase: number = 0;

function updateWalkAnimation(delta: number, speed: number) {
  if (speed > 0.5) {
    this.walkPhase += delta * speed * 0.8;
    const amplitude = Math.min(0.5, speed * 0.06);
    
    // Legs - opposite phases (like horse)
    this.leftLeg.rotation.x = Math.sin(this.walkPhase) * amplitude;
    this.rightLeg.rotation.x = Math.sin(this.walkPhase + Math.PI) * amplitude;
    
    // Left arm swings opposite to left leg
    this.leftArm.rotation.x = Math.sin(this.walkPhase + Math.PI) * amplitude * 0.6;
    
    // Right arm holds gun, slight bob
    this.rightArm.rotation.x = -0.5 + Math.sin(this.walkPhase * 2) * 0.05;
    
    // Body bob
    this.head.position.y = 1.4 + Math.abs(Math.sin(this.walkPhase)) * 0.03;
  } else {
    // Return to idle smoothly
    this.leftLeg.rotation.x *= 0.9;
    this.rightLeg.rotation.x *= 0.9;
    this.leftArm.rotation.x *= 0.9;
  }
}
```

**Eye Blink**
```typescript
private blinkTimer: number = 0;
private blinkInterval: number = 4; // seconds
private isBlinking: boolean = false;

function updateBlink(delta: number) {
  this.blinkTimer += delta;
  
  if (!this.isBlinking && this.blinkTimer > this.blinkInterval) {
    this.isBlinking = true;
    this.blinkTimer = 0;
    this.blinkInterval = 3 + Math.random() * 2; // Random 3-5 seconds
  }
  
  if (this.isBlinking) {
    // Scale eyes Y: 1 -> 0.1 -> 1 over 0.15 seconds
    const blinkDuration = 0.15;
    const t = this.blinkTimer / blinkDuration;
    
    let eyeScale = 1;
    if (t < 0.3) {
      eyeScale = 1 - t * 3;          // Close
    } else if (t < 0.7) {
      eyeScale = 0.1;                 // Hold closed
    } else if (t < 1) {
      eyeScale = 0.1 + (t - 0.7) * 3; // Open
    } else {
      eyeScale = 1;
      this.isBlinking = false;
    }
    
    this.leftEye.scale.y = 1.2 * eyeScale;
    this.rightEye.scale.y = 1.2 * eyeScale;
  }
}
```

**Pigtail Physics**
```typescript
private pigtailVelocityL: number = 0;
private pigtailVelocityR: number = 0;
private lastRotation: number = 0;

function updatePigtailPhysics(delta: number) {
  const rotationDelta = this.rotation - this.lastRotation;
  
  // Spring physics
  const stiffness = 8;
  const damping = 0.85;
  
  // Apply rotation force
  this.pigtailVelocityL += rotationDelta * 2;
  this.pigtailVelocityR += rotationDelta * 2;
  
  // Spring back to center
  this.pigtailVelocityL -= this.leftPigtail.rotation.z * stiffness * delta;
  this.pigtailVelocityR -= this.rightPigtail.rotation.z * stiffness * delta;
  
  // Damping
  this.pigtailVelocityL *= damping;
  this.pigtailVelocityR *= damping;
  
  // Apply
  this.leftPigtail.rotation.z += this.pigtailVelocityL;
  this.rightPigtail.rotation.z += this.pigtailVelocityR;
  
  // Clamp
  this.leftPigtail.rotation.z = clamp(this.leftPigtail.rotation.z, -0.3, 0.3);
  this.rightPigtail.rotation.z = clamp(this.rightPigtail.rotation.z, -0.3, 0.3);
  
  this.lastRotation = this.rotation;
}
```

---

## Heart Gun & Combat

### Gun Design

```
SIDE VIEW:
                    ♥♥ <- Heart-shaped barrel (glows)
    ┌──────────────<♥♥>
    │  ♥  ═══  ♥   │══╗
    └──────────────────╝
         Body          Grip

Components:
- Main body: Deep pink cylinder
- Heart barrel: Extruded heart shape with emissive glow
- Gold trim: Two torus rings
- Decorative hearts: Small white hearts on body
- Grip: Cylinder below body
```

### Gun Implementation

```typescript
function createHeartGun(): THREE.Group {
  const gun = new THREE.Group();
  
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xff1493,
    metalness: 0.4,
    roughness: 0.5
  });
  
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.7,
    roughness: 0.3
  });
  
  // Main body
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.4, 12),
    pinkMat
  );
  body.rotation.x = Math.PI / 2;
  body.position.z = 0.1;
  gun.add(body);
  
  // Front/back caps
  const capGeom = new THREE.SphereGeometry(0.06, 12, 12);
  const frontCap = new THREE.Mesh(capGeom, pinkMat);
  frontCap.position.z = 0.3;
  gun.add(frontCap);
  
  const backCap = new THREE.Mesh(capGeom, pinkMat);
  backCap.position.z = -0.1;
  gun.add(backCap);
  
  // Gold trim rings
  const trimGeom = new THREE.TorusGeometry(0.07, 0.012, 8, 16);
  [0.05, 0.2].forEach(z => {
    const trim = new THREE.Mesh(trimGeom, goldMat);
    trim.position.z = z;
    gun.add(trim);
  });
  
  // Heart barrel (emissive)
  const heartBarrel = createHeartMesh(0.1, 0xff69b4, true);
  heartBarrel.position.z = 0.35;
  heartBarrel.rotation.z = Math.PI;
  gun.add(heartBarrel);
  
  // Grip
  const grip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.04, 0.12, 8),
    pinkMat
  );
  grip.position.set(0, -0.08, -0.02);
  gun.add(grip);
  
  gun.scale.setScalar(0.8);
  return gun;
}
```

### Heart Projectile

```typescript
class Heart {
  mesh: THREE.Mesh;
  position: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number = 20;          // Fast projectile for rapid gameplay
  lifetime: number = 3;
  isActive: boolean = true;
  
  constructor(startPos: THREE.Vector3, direction: THREE.Vector3) {
    this.position = startPos.clone();
    this.direction = direction.clone().normalize();
    this.mesh = this.createMesh();
    this.mesh.position.copy(this.position);
  }
  
  private createMesh(): THREE.Mesh {
    const heartShape = new THREE.Shape();
    const x = 0, y = 0, s = 0.15;
    
    heartShape.moveTo(x, y + s * 0.5);
    heartShape.bezierCurveTo(x, y + s * 0.5, x - s * 0.5, y + s * 0.8, x - s * 0.5, y + s * 0.5);
    heartShape.bezierCurveTo(x - s * 0.5, y + s * 0.2, x, y, x, y - s * 0.5);
    heartShape.bezierCurveTo(x, y, x + s * 0.5, y + s * 0.2, x + s * 0.5, y + s * 0.5);
    heartShape.bezierCurveTo(x + s * 0.5, y + s * 0.8, x, y + s * 0.5, x, y + s * 0.5);
    
    const geometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelSize: 0.02,
      bevelThickness: 0.02
    });
    geometry.center();
    
    const material = new THREE.MeshStandardMaterial({
      color: 0xff69b4,
      emissive: 0xff69b4,
      emissiveIntensity: 0.5,
      metalness: 0.3,
      roughness: 0.5
    });
    
    return new THREE.Mesh(geometry, material);
  }
  
  update(delta: number): void {
    this.position.addScaledVector(this.direction, this.speed * delta);
    this.mesh.position.copy(this.position);
    
    // Rotate heart as it flies
    this.mesh.rotation.z += delta * 5;
    
    // Lifetime countdown
    this.lifetime -= delta;
    if (this.lifetime <= 0) {
      this.isActive = false;
    }
  }
  
  checkCollision(targetPos: THREE.Vector3, radius: number): boolean {
    return this.position.distanceTo(targetPos) < radius;
  }
}
```

### Firing Mechanics

```typescript
// In GameScene
private fireCooldown: number = 0;
private fireRate: number = 0.2; // Rapid fire for fast-paced gameplay

function handleFire(aimDirection: THREE.Vector3): void {
  if (this.fireCooldown > 0) return;
  
  // Spawn position (gun barrel)
  const spawnPos = this.player.position.clone();
  spawnPos.y += 1.2;
  spawnPos.add(aimDirection.clone().multiplyScalar(0.5));
  
  // Create heart
  const heart = new Heart(spawnPos, aimDirection);
  this.hearts.push(heart);
  this.scene.add(heart.mesh);
  
  // Reset cooldown
  this.fireCooldown = this.fireRate;
  
  // Spawn muzzle particles
  this.particleSystem.emit('muzzleFlash', spawnPos, 10);
}

function update(delta: number): void {
  // Update cooldown
  if (this.fireCooldown > 0) {
    this.fireCooldown -= delta;
  }
  
  // Update hearts
  this.hearts.forEach(heart => {
    heart.update(delta);
    
    // Emit trail particles
    this.particleSystem.emit('heartTrail', heart.position, 2);
    
    // Check collisions with horses
    this.horses.forEach(horse => {
      if (!horse.isTransformed && heart.checkCollision(horse.position, 1.5)) {
        this.onHeartHit(horse, heart);
      }
    });
  });
  
  // Remove inactive hearts
  this.hearts = this.hearts.filter(h => h.isActive);
}
```

---

## Power-ups

Power-ups spawn randomly around the map and provide temporary boosts when collected.

### Power-up Types

| Power-up | Icon | Duration | Effect |
|----------|------|----------|--------|
| Speed Boost | ⚡ | 5s | Princess moves 50% faster |
| Multi-Shot | 💕 | 8s | Fire 3 hearts in a spread pattern |
| Homing Hearts | 🎯 | 6s | Hearts curve toward nearest horse |
| Slow-Mo | ⏱️ | 4s | All horses move at 50% speed |

### Power-up Implementation

```typescript
type PowerUpType = 'speed' | 'multishot' | 'homing' | 'slowmo';

interface PowerUp {
  type: PowerUpType;
  position: Vector3;
  mesh: THREE.Group;
  bobPhase: number;
}

const POWERUP_CONFIG: Record<PowerUpType, { color: number; duration: number }> = {
  speed:     { color: 0xffff00, duration: 5 },
  multishot: { color: 0xff69b4, duration: 8 },
  homing:    { color: 0x00ffff, duration: 6 },
  slowmo:    { color: 0x9370db, duration: 4 },
};

class PowerUpManager {
  private activePowerUps: Map<PowerUpType, number> = new Map(); // type -> remaining time
  
  collectPowerUp(type: PowerUpType): void {
    const config = POWERUP_CONFIG[type];
    this.activePowerUps.set(type, config.duration);
    
    // Visual/audio feedback
    this.playCollectEffect(type);
  }
  
  isActive(type: PowerUpType): boolean {
    return (this.activePowerUps.get(type) || 0) > 0;
  }
  
  update(delta: number): void {
    this.activePowerUps.forEach((time, type) => {
      const newTime = time - delta;
      if (newTime <= 0) {
        this.activePowerUps.delete(type);
      } else {
        this.activePowerUps.set(type, newTime);
      }
    });
  }
  
  getSpeedMultiplier(): number {
    return this.isActive('speed') ? 1.5 : 1.0;
  }
  
  getHorseSpeedMultiplier(): number {
    return this.isActive('slowmo') ? 0.5 : 1.0;
  }
}

// Multi-shot firing
function fireWithPowerUps(aimDir: Vector3): void {
  if (powerUpManager.isActive('multishot')) {
    // Fire 3 hearts in spread pattern
    const angles = [-0.2, 0, 0.2]; // radians
    angles.forEach(angle => {
      const rotatedDir = aimDir.clone().applyAxisAngle(new Vector3(0, 1, 0), angle);
      createHeart(rotatedDir, powerUpManager.isActive('homing'));
    });
  } else {
    createHeart(aimDir, powerUpManager.isActive('homing'));
  }
}

// Homing heart behavior
class HomingHeart extends Heart {
  private target: Horse | null = null;
  private turnSpeed: number = 3;
  
  update(delta: number, horses: Horse[]): void {
    // Find nearest horse
    if (!this.target || this.target.isTransformed) {
      this.target = this.findNearestHorse(horses);
    }
    
    if (this.target) {
      // Curve toward target
      const toTarget = this.target.position.clone().sub(this.position).normalize();
      this.direction.lerp(toTarget, this.turnSpeed * delta);
      this.direction.normalize();
    }
    
    super.update(delta);
  }
}
```

### Power-up Spawning

```typescript
// Spawn power-ups periodically
private powerUpSpawnTimer: number = 0;
private powerUpSpawnInterval: number = 15; // seconds

function updatePowerUpSpawning(delta: number): void {
  this.powerUpSpawnTimer += delta;
  
  if (this.powerUpSpawnTimer >= this.powerUpSpawnInterval) {
    this.powerUpSpawnTimer = 0;
    
    // Random position within world bounds
    const x = (Math.random() - 0.5) * 80;
    const z = (Math.random() - 0.5) * 80;
    const y = getTerrainHeight(x, z) + 1;
    
    // Random type
    const types: PowerUpType[] = ['speed', 'multishot', 'homing', 'slowmo'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    this.spawnPowerUp(type, new Vector3(x, y, z));
  }
}
```

---

## Horse Types & AI

### Horse Types

| Type | Color | Speed | Vision Angle | Vision Distance | Alert Time | Hits Required |
|------|-------|-------|--------------|-----------------|------------|---------------|
| Normal | Brown (#8B4513) | 6 u/s | 90° | 30 | 0.4s | 1 |
| Fast | White (#F5F5F5) | 9 u/s | 90° | 30 | 0.2s | 1 |
| Shy | Tan (#D2B48C) | 6 u/s | 120° | 40 | 0.6s | 1 |
| Brave | Dark (#2F2F2F) | 5 u/s | 60° | 20 | 0.15s | 2 |
| Baby | Cream (#DEB887) | 4 u/s | 70° | 25 | 0.8s | 1 |
| **Boss** | Gold (#FFD700) | 4 u/s | 180° | 50 | 0s | 5 |

### Boss Horse

Boss horses are special large horses that appear in later levels. They have unique attack patterns and require multiple hits to transform.

```
BOSS HORSE DESIGN:
        ╭━━━━╮
       ╱ ★  ★ ╲      <- Glowing eyes
      ╱   ▼    ╲     <- Crown/mane
     │  ┌────┐  │
     │  │BOSS│  │    <- 1.5x larger than normal
     │  └────┘  │
      ╲        ╱
       ╲______╱
       /│    │\
      / │    │ \
```

**Boss Behavior Patterns:**

| Phase | Health | Behavior |
|-------|--------|----------|
| Phase 1 | 5-4 hits | Normal fleeing, slightly faster |
| Phase 2 | 3-2 hits | Charges at player periodically |
| Phase 3 | 1 hit | Erratic movement, summons dust clouds |

```typescript
class BossHorse extends Horse {
  private phase: number = 1;
  private chargeTimer: number = 0;
  private chargeCooldown: number = 5;
  private isCharging: boolean = false;
  
  onHit(): void {
    this.hitCount++;
    this.updatePhase();
    
    // Screen shake on boss hit
    cameraShake(0.3, 0.5);
    
    // Flash effect
    this.flashWhite(0.2);
  }
  
  private updatePhase(): void {
    if (this.hitCount >= 4) this.phase = 3;
    else if (this.hitCount >= 2) this.phase = 2;
  }
  
  update(delta: number, playerPos: Vector3): void {
    switch (this.phase) {
      case 1:
        // Normal flee behavior
        super.update(delta, playerPos);
        break;
        
      case 2:
        // Charge attack pattern
        this.chargeTimer += delta;
        if (!this.isCharging && this.chargeTimer > this.chargeCooldown) {
          this.startCharge(playerPos);
        }
        if (this.isCharging) {
          this.updateCharge(delta);
        } else {
          super.update(delta, playerPos);
        }
        break;
        
      case 3:
        // Erratic movement
        this.updateErratic(delta, playerPos);
        this.spawnDustClouds(delta);
        break;
    }
  }
  
  private startCharge(playerPos: Vector3): void {
    this.isCharging = true;
    this.chargeDirection = playerPos.clone().sub(this.position).normalize();
    this.chargeTimer = 0;
    
    // Warning indicator
    this.showChargeWarning();
  }
}
```

### AI State Machine

```
                    ┌─────────────┐
                    │             │
            ┌──────>│   GRAZING   │<──────┐
            │       │   (idle)    │       │
            │       └──────┬──────┘       │
            │              │              │
            │         See Player          │
            │              │              │
            │              v              │
            │       ┌─────────────┐       │
            │       │             │       │
    Lost    │       │    ALERT    │       │ Lost player
    player  │       │  (looking)  │       │ for 3+ sec
            │       └──────┬──────┘       │
            │              │              │
            │        Alert timeout        │
            │              │              │
            │              v              │
            │       ┌─────────────┐       │
            │       │             │       │
            └───────│   FLEEING   │───────┘
                    │  (running)  │
                    └──────┬──────┘
                           │
                    Found obstacle
                           │
                           v
                    ┌─────────────┐
                    │             │
                    │   HIDING    │
                    │ (at cover)  │
                    └─────────────┘
```

### Horse Implementation

```typescript
type HorseState = 'grazing' | 'alert' | 'fleeing' | 'hiding';
type HorseType = 'normal' | 'fast' | 'shy' | 'brave' | 'baby';

interface HorseConfig {
  color: number;
  speed: number;
  visionAngle: number;      // degrees
  visionDistance: number;   // units
  alertDuration: number;    // seconds
  scale: number;
}

const HORSE_CONFIGS: Record<HorseType, HorseConfig> = {
  normal: { color: 0x8b4513, speed: 6, visionAngle: 90, visionDistance: 30, alertDuration: 0.4, scale: 1 },
  fast:   { color: 0xf5f5f5, speed: 9, visionAngle: 90, visionDistance: 30, alertDuration: 0.2, scale: 1 },
  shy:    { color: 0xd2b48c, speed: 6, visionAngle: 120, visionDistance: 40, alertDuration: 0.6, scale: 1 },
  brave:  { color: 0x2f2f2f, speed: 5, visionAngle: 60, visionDistance: 20, alertDuration: 0.15, scale: 1.1 },
  baby:   { color: 0xdeb887, speed: 4, visionAngle: 70, visionDistance: 25, alertDuration: 0.8, scale: 0.7 }
};

class Horse {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number = 0;
  state: HorseState = 'grazing';
  type: HorseType;
  hitCount: number = 0;
  isTransformed: boolean = false;
  
  private config: HorseConfig;
  private alertTimer: number = 0;
  private grazeTarget: THREE.Vector3;
  private hidingSpot: THREE.Vector3 | null = null;
  
  update(delta: number, playerPos: THREE.Vector3, obstacles: Obstacle[]): void {
    switch (this.state) {
      case 'grazing':
        this.updateGrazing(delta);
        if (this.canSeePlayer(playerPos)) {
          this.state = 'alert';
          this.alertTimer = 0;
        }
        break;
        
      case 'alert':
        this.alertTimer += delta;
        this.lookAtPlayer(playerPos);
        if (this.alertTimer > this.config.alertDuration) {
          this.state = 'fleeing';
          this.findHidingSpot(playerPos, obstacles);
        }
        break;
        
      case 'fleeing':
        this.updateFleeing(delta, playerPos);
        if (this.hidingSpot && this.position.distanceTo(this.hidingSpot) < 1) {
          this.state = 'hiding';
        }
        break;
        
      case 'hiding':
        // Stay hidden, peek occasionally
        if (!this.canSeePlayer(playerPos)) {
          this.state = 'grazing';
        }
        break;
    }
    
    // Update rotation to face movement direction
    if (this.velocity.length() > 0.01) {
      const targetRot = Math.atan2(this.velocity.x, this.velocity.z);
      this.rotation = lerpAngle(this.rotation, targetRot, delta * 8);
    }
    
    // Update leg animation
    this.updateLegAnimation(delta);
  }
  
  private canSeePlayer(playerPos: THREE.Vector3): boolean {
    const toPlayer = playerPos.clone().sub(this.position);
    const distance = toPlayer.length();
    
    if (distance > this.config.visionDistance) return false;
    
    // Check angle
    const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      this.rotation
    );
    const angle = Math.acos(forward.dot(toPlayer.normalize()));
    
    return angle < (this.config.visionAngle * Math.PI / 180) / 2;
  }
  
  private findHidingSpot(playerPos: THREE.Vector3, obstacles: Obstacle[]): void {
    // Find nearest obstacle that provides cover from player
    let bestSpot: THREE.Vector3 | null = null;
    let bestScore = Infinity;
    
    for (const obstacle of obstacles) {
      // Get cover point (opposite side from player)
      const toObstacle = obstacle.position.clone().sub(playerPos).normalize();
      const coverPoint = obstacle.position.clone().add(toObstacle.multiplyScalar(3));
      
      const distance = this.position.distanceTo(coverPoint);
      if (distance < bestScore) {
        bestScore = distance;
        bestSpot = coverPoint;
      }
    }
    
    this.hidingSpot = bestSpot;
  }
}
```

### Horse Mesh

```typescript
function createHorseMesh(config: HorseConfig): THREE.Group {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: config.color });
  
  // Body (ellipsoid)
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 16, 16),
    bodyMat
  );
  body.scale.set(1.5, 0.8, 0.8);
  body.position.y = 1;
  group.add(body);
  
  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 12, 12),
    bodyMat
  );
  head.position.set(1.1, 1.5, 0);
  group.add(head);
  
  // Snout
  const snout = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.2, 0.4, 8),
    bodyMat
  );
  snout.position.set(1.4, 1.35, 0);
  snout.rotation.z = Math.PI / 2;
  group.add(snout);
  
  // Ears
  const earGeom = new THREE.ConeGeometry(0.08, 0.2, 8);
  [-0.15, 0.15].forEach(z => {
    const ear = new THREE.Mesh(earGeom, bodyMat);
    ear.position.set(1.0, 1.85, z);
    group.add(ear);
  });
  
  // Legs (animated)
  const legGeom = new THREE.CylinderGeometry(0.1, 0.08, 1, 8);
  const legPositions = [
    { x: 0.6, z: 0.25, name: 'FL' },   // Front Left
    { x: 0.6, z: -0.25, name: 'FR' },  // Front Right
    { x: -0.6, z: 0.25, name: 'BL' },  // Back Left
    { x: -0.6, z: -0.25, name: 'BR' }  // Back Right
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeom, bodyMat);
    leg.position.set(pos.x, 0.5, pos.z);
    leg.userData.legName = pos.name;
    group.add(leg);
  });
  
  // Tail
  const tail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.1, 0.6, 8),
    new THREE.MeshStandardMaterial({ color: 0x4a3c31 })
  );
  tail.position.set(-1.2, 1.1, 0);
  tail.rotation.z = Math.PI / 4;
  group.add(tail);
  
  // Scale
  group.scale.setScalar(config.scale);
  
  return group;
}
```

### Leg Animation

```typescript
private legPhase: number = 0;
private legs: Record<string, THREE.Mesh>;

function updateLegAnimation(delta: number): void {
  const speed = this.velocity.length();
  
  if (speed < 0.1) {
    // Reset to standing
    Object.values(this.legs).forEach(leg => {
      leg.rotation.x *= 0.9;
    });
    return;
  }
  
  this.legPhase += delta * speed * 3;
  const amplitude = Math.min(0.5, speed * 0.1);
  
  // Diagonal pairs move together (horse trot gait)
  this.legs.FL.rotation.x = Math.sin(this.legPhase) * amplitude;
  this.legs.BR.rotation.x = Math.sin(this.legPhase) * amplitude;
  this.legs.FR.rotation.x = Math.sin(this.legPhase + Math.PI) * amplitude;
  this.legs.BL.rotation.x = Math.sin(this.legPhase + Math.PI) * amplitude;
}
```

---

## Unicorn Transformation

### Transformation Sequence

```
TIMELINE:
0.0s  Heart hits horse
      │
      ├─> Starburst particle effect
      ├─> Horse freezes
      ├─> Begin scale pulse
      │
0.3s  Flash of light
      │
      ├─> Horse mesh hidden
      ├─> Unicorn mesh appears
      ├─> Horn grows animation
      ├─> Mane color shifts to rainbow
      │
0.8s  Sparkle explosion
      │
      ├─> Unicorn released
      ├─> Rainbow trail begins
      │
1.0s  Transformation complete
```

### Unicorn Additions

```typescript
function transformToUnicorn(horse: Horse): Unicorn {
  const unicorn = new Unicorn(horse.position, horse.type);
  
  // Add horn
  const horn = new THREE.Mesh(
    new THREE.ConeGeometry(0.08, 0.5, 8),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffd700,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2
    })
  );
  horn.position.set(1.2, 1.9, 0);
  horn.rotation.z = -Math.PI / 6;
  unicorn.mesh.add(horn);
  
  // Rainbow mane
  const maneColors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x8b00ff];
  maneColors.forEach((color, i) => {
    const manePart = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 8, 8),
      new THREE.MeshStandardMaterial({ color })
    );
    manePart.position.set(0.8 - i * 0.15, 1.7 + Math.sin(i) * 0.1, 0);
    unicorn.mesh.add(manePart);
  });
  
  return unicorn;
}
```

### Rainbow Trail

```typescript
class RainbowTrail {
  private points: THREE.Vector3[] = [];
  private maxPoints: number = 50;
  private mesh: THREE.Line;
  
  constructor() {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      linewidth: 3
    });
    this.mesh = new THREE.Line(geometry, material);
  }
  
  update(position: THREE.Vector3): void {
    // Add new point
    this.points.unshift(position.clone());
    
    // Remove old points
    if (this.points.length > this.maxPoints) {
      this.points.pop();
    }
    
    // Update geometry
    const positions = new Float32Array(this.points.length * 3);
    const colors = new Float32Array(this.points.length * 3);
    
    this.points.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
      
      // Rainbow color based on position in trail
      const hue = (i / this.maxPoints) * 360;
      const color = new THREE.Color().setHSL(hue / 360, 1, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });
    
    this.mesh.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.mesh.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }
}
```

---

## Environment & Obstacles

### Terrain

```typescript
function createTerrain(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(200, 200, 100, 100);
  
  // Displace vertices for rolling hills
  const positions = geometry.attributes.position.array as Float32Array;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    
    // Multiple noise layers
    const height = 
      Math.sin(x * 0.05) * Math.cos(y * 0.05) * 3 +
      Math.sin(x * 0.1 + 1) * Math.cos(y * 0.08) * 1.5 +
      Math.sin(x * 0.02) * Math.cos(y * 0.03) * 5;
    
    positions[i + 2] = height;
  }
  
  geometry.computeVertexNormals();
  
  const material = new THREE.MeshStandardMaterial({
    color: 0x7cba5f, // Grass green
    roughness: 0.8,
    metalness: 0.1
  });
  
  const terrain = new THREE.Mesh(geometry, material);
  terrain.rotation.x = -Math.PI / 2;
  terrain.receiveShadow = true;
  
  return terrain;
}
```

### Obstacle Types & Scales

| Type | Base Size | Scale Multiplier | Final Size | Cover Capacity |
|------|-----------|------------------|------------|----------------|
| Tree | 3×6×3 | 2.0x | 6×12×6 | 1 horse |
| Bush | 2×1.5×2 | 1.5x | 3×2.5×3 | 1 horse |
| Castle | 10×12×10 | 2.5x | 25×30×25 | 5 horses |
| Mushroom | 2×3×2 | 1.8x | 3.6×5.4×3.6 | 1 horse |
| Crystal | 2×4×2 | 2.0x | 4×8×4 | 1 horse |

### Tree Variants

```typescript
function createTree(variant: number): THREE.Group {
  const tree = new THREE.Group();
  
  // Trunk
  const trunkGeom = new THREE.CylinderGeometry(0.3, 0.4, 2, 8);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const trunk = new THREE.Mesh(trunkGeom, trunkMat);
  trunk.position.y = 1;
  tree.add(trunk);
  
  // Foliage (varies by variant)
  const foliageColor = [0x228b22, 0x32cd32, 0x006400][variant];
  const foliageMat = new THREE.MeshStandardMaterial({ color: foliageColor });
  
  if (variant === 0) {
    // Round tree
    const foliage = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 12, 12),
      foliageMat
    );
    foliage.position.y = 3;
    tree.add(foliage);
  } else if (variant === 1) {
    // Cone tree (pine)
    const foliage = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 3, 8),
      foliageMat
    );
    foliage.position.y = 3.5;
    tree.add(foliage);
  } else {
    // Multi-sphere tree
    [0, 0.8, -0.5].forEach((offset, i) => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1 - i * 0.2, 10, 10),
        foliageMat
      );
      sphere.position.set(offset * 0.5, 2.5 + i * 0.6, offset * 0.3);
      tree.add(sphere);
    });
  }
  
  tree.scale.setScalar(2.0); // Apply scale multiplier
  return tree;
}
```

### Castle

```typescript
function createCastle(): THREE.Group {
  const castle = new THREE.Group();
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x808080 });
  
  // Main keep
  const keep = new THREE.Mesh(
    new THREE.BoxGeometry(4, 5, 4),
    stoneMat
  );
  keep.position.y = 2.5;
  castle.add(keep);
  
  // Towers (4 corners)
  const towerGeom = new THREE.CylinderGeometry(1, 1.2, 6, 8);
  [[-2.5, -2.5], [-2.5, 2.5], [2.5, -2.5], [2.5, 2.5]].forEach(([x, z]) => {
    const tower = new THREE.Mesh(towerGeom, stoneMat);
    tower.position.set(x, 3, z);
    castle.add(tower);
    
    // Tower roof
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.3, 1.5, 8),
      new THREE.MeshStandardMaterial({ color: 0x8b0000 })
    );
    roof.position.set(x, 6.75, z);
    castle.add(roof);
  });
  
  // Flags
  [[-2.5, -2.5], [2.5, 2.5]].forEach(([x, z]) => {
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 2, 8),
      stoneMat
    );
    pole.position.set(x, 7.5, z);
    castle.add(pole);
    
    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xff69b4, side: THREE.DoubleSide })
    );
    flag.position.set(x + 0.4, 8, z);
    castle.add(flag);
  });
  
  castle.scale.setScalar(2.5); // Apply scale multiplier
  return castle;
}
```

### Interactive Elements

The environment includes interactive elements that affect gameplay:

| Element | Effect | Visual |
|---------|--------|--------|
| Mud Patch | Slows player by 50% | Brown puddle with ripples |
| Flower Bed | Attracts nearby horses | Colorful flowers, sparkles |
| Water/Stream | Cannot cross, must go around | Blue animated water |
| Bridge | Allows crossing water | Wooden planks |

```typescript
interface InteractiveElement {
  type: 'mud' | 'flowers' | 'water' | 'bridge';
  position: Vector3;
  radius: number;
  mesh: THREE.Group;
}

// Mud patch - slows player
function checkMudPatch(playerPos: Vector3, mudPatches: InteractiveElement[]): number {
  for (const mud of mudPatches) {
    const dist = playerPos.distanceTo(mud.position);
    if (dist < mud.radius) {
      return 0.5; // 50% speed
    }
  }
  return 1.0; // Normal speed
}

// Flower bed - attracts horses
function updateFlowerAttraction(horses: Horse[], flowers: InteractiveElement[], delta: number): void {
  flowers.forEach(flower => {
    horses.forEach(horse => {
      if (horse.state === 'grazing') {
        const dist = horse.position.distanceTo(flower.position);
        if (dist < 20 && dist > 3) {
          // Gently pull horse toward flowers
          const toFlower = flower.position.clone().sub(horse.position).normalize();
          horse.position.addScaledVector(toFlower, delta * 0.5);
        }
      }
    });
  });
}

// Water collision - block movement
function checkWaterCollision(newPos: Vector3, waterAreas: InteractiveElement[]): boolean {
  for (const water of waterAreas) {
    if (newPos.distanceTo(water.position) < water.radius) {
      return true; // Blocked
    }
  }
  return false;
}

// Create mud patch mesh
function createMudPatch(radius: number): THREE.Group {
  const mud = new THREE.Group();
  
  const puddle = new THREE.Mesh(
    new THREE.CircleGeometry(radius, 16),
    new THREE.MeshStandardMaterial({ 
      color: 0x4a3728,
      roughness: 0.9,
      metalness: 0.1
    })
  );
  puddle.rotation.x = -Math.PI / 2;
  puddle.position.y = 0.02;
  mud.add(puddle);
  
  return mud;
}

// Create flower bed mesh
function createFlowerBed(radius: number): THREE.Group {
  const flowers = new THREE.Group();
  const colors = [0xff69b4, 0xffb6c1, 0xffd700, 0xff6347, 0xda70d6];
  
  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * radius;
    
    const flower = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 8, 8),
      new THREE.MeshStandardMaterial({ 
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    );
    flower.position.set(
      Math.cos(angle) * dist,
      0.2,
      Math.sin(angle) * dist
    );
    flowers.add(flower);
  }
  
  return flowers;
}
```

### World Boundaries

```typescript
function createBoundaries(): THREE.Group {
  const boundaries = new THREE.Group();
  const worldSize = 90;
  const halfSize = 45;
  const wallHeight = 4;
  
  // Hedge material
  const hedgeMat = new THREE.MeshStandardMaterial({ color: 0x2d5a27 });
  
  // 4 walls
  const walls = [
    { pos: [0, wallHeight/2, -halfSize], size: [worldSize, wallHeight, 2] },
    { pos: [0, wallHeight/2, halfSize], size: [worldSize, wallHeight, 2] },
    { pos: [-halfSize, wallHeight/2, 0], size: [2, wallHeight, worldSize] },
    { pos: [halfSize, wallHeight/2, 0], size: [2, wallHeight, worldSize] }
  ];
  
  walls.forEach(wall => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(...wall.size),
      hedgeMat
    );
    mesh.position.set(...wall.pos);
    boundaries.add(mesh);
    
    // Decorative flowers on top
    const flowerCount = Math.floor(wall.size[0] / 3) || Math.floor(wall.size[2] / 3);
    for (let i = 0; i < flowerCount; i++) {
      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 8, 8),
        new THREE.MeshStandardMaterial({
          color: [0xff69b4, 0xffb6c1, 0xffd700][i % 3]
        })
      );
      const offset = (i - flowerCount/2) * 3;
      if (wall.size[0] > wall.size[2]) {
        flower.position.set(offset, wallHeight + 0.3, wall.pos[2]);
      } else {
        flower.position.set(wall.pos[0], wallHeight + 0.3, offset);
      }
      boundaries.add(flower);
    }
  });
  
  return boundaries;
}
```

### Distant Mountains

```typescript
function createMountains(): THREE.Group {
  const mountains = new THREE.Group();
  const mountainMat = new THREE.MeshStandardMaterial({ color: 0x9370db });
  
  const configs = [
    { x: 0, z: -80, height: 40, width: 60 },
    { x: -50, z: -70, height: 35, width: 40 },
    { x: 50, z: -75, height: 45, width: 50 }
  ];
  
  configs.forEach(m => {
    const mountain = new THREE.Mesh(
      new THREE.ConeGeometry(m.width/2, m.height, 6),
      mountainMat
    );
    mountain.position.set(m.x, m.height/2 - 5, m.z);
    mountains.add(mountain);
  });
  
  return mountains;
}
```

---

## Day/Night Cycle

The game features a dynamic day/night cycle that affects visibility and atmosphere.

### Time Phases

| Phase | Duration | Lighting | Horse Visibility |
|-------|----------|----------|------------------|
| Day | 60s | Bright, warm | Full visibility |
| Dusk | 20s | Orange/pink | Reduced (silhouettes) |
| Night | 40s | Dark blue, stars | Low (glowing eyes only) |
| Dawn | 20s | Purple/pink | Increasing |

### Lighting Implementation

```typescript
class DayNightCycle {
  private timeOfDay: number = 0; // 0-1 representing full cycle
  private cycleDuration: number = 140; // seconds for full cycle
  
  private sunLight: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;
  private skyColor: THREE.Color = new THREE.Color();
  
  update(delta: number): void {
    this.timeOfDay = (this.timeOfDay + delta / this.cycleDuration) % 1;
    this.updateLighting();
  }
  
  private updateLighting(): void {
    const t = this.timeOfDay;
    
    // Sun intensity and color
    let sunIntensity: number;
    let sunColor: THREE.Color;
    let ambientIntensity: number;
    let skyColorHex: number;
    
    if (t < 0.43) {
      // Day (0 - 0.43)
      sunIntensity = 1.0;
      sunColor = new THREE.Color(0xffffee);
      ambientIntensity = 0.6;
      skyColorHex = 0x87ceeb;
    } else if (t < 0.57) {
      // Dusk (0.43 - 0.57)
      const duskT = (t - 0.43) / 0.14;
      sunIntensity = 1.0 - duskT * 0.7;
      sunColor = new THREE.Color(0xffaa44).lerp(new THREE.Color(0xff6644), duskT);
      ambientIntensity = 0.6 - duskT * 0.4;
      skyColorHex = lerpColor(0x87ceeb, 0x1a1a2e, duskT);
    } else if (t < 0.86) {
      // Night (0.57 - 0.86)
      sunIntensity = 0.1;
      sunColor = new THREE.Color(0x4444ff);
      ambientIntensity = 0.15;
      skyColorHex = 0x0a0a1a;
      this.showStars(true);
    } else {
      // Dawn (0.86 - 1.0)
      const dawnT = (t - 0.86) / 0.14;
      sunIntensity = 0.1 + dawnT * 0.9;
      sunColor = new THREE.Color(0xff88aa).lerp(new THREE.Color(0xffffee), dawnT);
      ambientIntensity = 0.15 + dawnT * 0.45;
      skyColorHex = lerpColor(0x0a0a1a, 0x87ceeb, dawnT);
      this.showStars(false);
    }
    
    this.sunLight.intensity = sunIntensity;
    this.sunLight.color = sunColor;
    this.ambientLight.intensity = ambientIntensity;
    this.skyColor.setHex(skyColorHex);
  }
  
  getPhase(): 'day' | 'dusk' | 'night' | 'dawn' {
    const t = this.timeOfDay;
    if (t < 0.43) return 'day';
    if (t < 0.57) return 'dusk';
    if (t < 0.86) return 'night';
    return 'dawn';
  }
}

// Horse visibility at night - glowing eyes
function updateHorseNightVisibility(horses: Horse[], phase: string): void {
  horses.forEach(horse => {
    if (phase === 'night') {
      horse.setEyeGlow(true, 0xff6600); // Orange glowing eyes
      horse.mesh.material.opacity = 0.3; // Silhouette
    } else if (phase === 'dusk' || phase === 'dawn') {
      horse.setEyeGlow(false);
      horse.mesh.material.opacity = 0.7;
    } else {
      horse.setEyeGlow(false);
      horse.mesh.material.opacity = 1.0;
    }
  });
}
```

---

## Weather System

Dynamic weather affects gameplay and visuals.

### Weather Types

| Weather | Effect | Visual |
|---------|--------|--------|
| Clear | Normal gameplay | Blue sky, sunshine |
| Rain | Terrain slippery (+drift) | Rain particles, puddles |
| Fog | Reduced visibility | White fog, glow effects |
| Rainbow | After rain, bonus points | Rainbow arc in sky |

### Weather Implementation

```typescript
type WeatherType = 'clear' | 'rain' | 'fog' | 'rainbow';

class WeatherSystem {
  private currentWeather: WeatherType = 'clear';
  private weatherTimer: number = 0;
  private weatherDuration: number = 60;
  
  private rainParticles: THREE.Points | null = null;
  private fog: THREE.Fog | null = null;
  
  update(delta: number, scene: THREE.Scene): void {
    this.weatherTimer += delta;
    
    if (this.weatherTimer > this.weatherDuration) {
      this.changeWeather();
    }
    
    if (this.currentWeather === 'rain') {
      this.updateRain(delta);
    }
  }
  
  private changeWeather(): void {
    this.weatherTimer = 0;
    
    // Random weather with weights
    const rand = Math.random();
    if (rand < 0.5) {
      this.setWeather('clear');
    } else if (rand < 0.75) {
      this.setWeather('rain');
    } else if (rand < 0.9) {
      this.setWeather('fog');
    } else {
      this.setWeather('rainbow');
    }
  }
  
  setWeather(type: WeatherType): void {
    this.currentWeather = type;
    
    switch (type) {
      case 'rain':
        this.startRain();
        break;
      case 'fog':
        this.startFog();
        break;
      case 'rainbow':
        this.showRainbow();
        break;
      case 'clear':
        this.clearEffects();
        break;
    }
  }
  
  // Rain causes movement drift (slippery)
  getMovementDrift(): number {
    return this.currentWeather === 'rain' ? 0.15 : 0;
  }
  
  private startRain(): void {
    // Create rain particle system
    const rainCount = 5000;
    const positions = new Float32Array(rainCount * 3);
    
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0xaaaaff,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });
    
    this.rainParticles = new THREE.Points(geometry, material);
  }
  
  private updateRain(delta: number): void {
    if (!this.rainParticles) return;
    
    const positions = this.rainParticles.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= delta * 30; // Fall speed
      if (positions[i + 1] < 0) {
        positions[i + 1] = 50; // Reset to top
      }
    }
    this.rainParticles.geometry.attributes.position.needsUpdate = true;
  }
  
  private startFog(): void {
    this.fog = new THREE.Fog(0xcccccc, 10, 50);
  }
}
```

---

## Collision & Physics

### Overview
The game world has finite boundaries and undulating terrain. All characters (princess, horses, unicorns) must properly collide with:
- **Terrain surface** (follow ground height, never clip through)
- **Obstacles** (trees, bushes, castles, crystals, mushrooms)
- **World boundaries** (edge walls)

### Terrain Height Sampling

Characters must stay on top of the undulating ground at all times:

```typescript
// Sample terrain height at any world position
function getTerrainHeight(x: number, z: number): number {
  // Match the terrain generation formula
  const height = 
    Math.sin(x * 0.05) * Math.cos(z * 0.05) * 3 +
    Math.sin(x * 0.1 + 1) * Math.cos(z * 0.08) * 1.5 +
    Math.sin(x * 0.02) * Math.cos(z * 0.03) * 5;
  
  return height;
}

// Apply terrain following to any entity
function updateEntityPosition(entity: Entity, delta: number): void {
  // Calculate intended new position
  const newX = entity.position.x + entity.velocity.x * delta;
  const newZ = entity.position.z + entity.velocity.z * delta;
  
  // Sample terrain height at new position
  const groundY = getTerrainHeight(newX, newZ);
  
  // Set entity Y to ground height + entity's ground offset
  entity.position.set(newX, groundY + entity.groundOffset, newZ);
}
```

### Obstacle Collision

All obstacles have collision radii. Characters cannot move through them:

```typescript
interface CollisionShape {
  position: Vector3;
  radius: number;      // Cylindrical collision radius
  height: number;      // For potential vertical checks
}

// Obstacle collision radii
const OBSTACLE_COLLISION: Record<ObstacleType, number> = {
  tree: 1.5,           // Trunk collision
  bush: 1.8,           // Full bush width
  castle: 12,          // Large structure
  mushroom: 1.2,       // Stem width
  crystal: 1.0,        // Crystal base
};

function checkObstacleCollision(
  entityPos: Vector3,
  entityRadius: number,
  obstacles: Obstacle[]
): Obstacle | null {
  for (const obstacle of obstacles) {
    const dx = entityPos.x - obstacle.position.x;
    const dz = entityPos.z - obstacle.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    const minDist = entityRadius + OBSTACLE_COLLISION[obstacle.type];
    
    if (distance < minDist) {
      return obstacle; // Collision detected
    }
  }
  return null;
}

// Resolve collision by pushing entity out
function resolveCollision(
  entity: Entity,
  obstacle: Obstacle,
  entityRadius: number
): void {
  const dx = entity.position.x - obstacle.position.x;
  const dz = entity.position.z - obstacle.position.z;
  const distance = Math.sqrt(dx * dx + dz * dz);
  const minDist = entityRadius + OBSTACLE_COLLISION[obstacle.type];
  
  if (distance < minDist && distance > 0) {
    // Push entity out along collision normal
    const pushX = (dx / distance) * (minDist - distance + 0.1);
    const pushZ = (dz / distance) * (minDist - distance + 0.1);
    
    entity.position.x += pushX;
    entity.position.z += pushZ;
    
    // Re-sample terrain height at new position
    entity.position.y = getTerrainHeight(entity.position.x, entity.position.z) + entity.groundOffset;
  }
}
```

### World Boundary Enforcement

The game world is **finite** (90x90 units). Characters cannot leave the play area:

```typescript
const WORLD_BOUNDS = {
  minX: -44,
  maxX: 44,
  minZ: -44,
  maxZ: 44,
};

function clampToWorldBounds(entity: Entity): void {
  entity.position.x = Math.max(WORLD_BOUNDS.minX, Math.min(WORLD_BOUNDS.maxX, entity.position.x));
  entity.position.z = Math.max(WORLD_BOUNDS.minZ, Math.min(WORLD_BOUNDS.maxZ, entity.position.z));
}

// Full collision update each frame
function updateCollisions(entity: Entity, obstacles: Obstacle[], delta: number): void {
  // 1. Apply movement
  updateEntityPosition(entity, delta);
  
  // 2. Check and resolve obstacle collisions
  const collision = checkObstacleCollision(entity.position, entity.collisionRadius, obstacles);
  if (collision) {
    resolveCollision(entity, collision, entity.collisionRadius);
  }
  
  // 3. Enforce world boundaries
  clampToWorldBounds(entity);
  
  // 4. Final terrain height correction
  entity.position.y = getTerrainHeight(entity.position.x, entity.position.z) + entity.groundOffset;
}
```

### Entity Collision Radii

| Entity | Collision Radius | Ground Offset |
|--------|-----------------|---------------|
| Princess | 0.4 | 0 |
| Horse | 0.8 | 0 |
| Unicorn | 0.8 | 0 |
| Heart Projectile | 0.15 | 0.8 |

---

## Levels

### Level Structure

```typescript
interface LevelConfig {
  name: string;
  horses: Array<{
    position: THREE.Vector3;
    type: HorseType;
  }>;
  obstacles: Array<{
    position: THREE.Vector3;
    type: ObstacleType;
    variant?: number;
  }>;
  parTime: number; // seconds
}
```

### Level 1: Meadow

```
┌────────────────────────────────────────────┐
│                                            │
│    🌳        🌳              🌳           │
│                   🐴                       │
│         🌿              🌳        🍄      │
│                                            │
│    🌳        👸                   💎      │
│         (start)      🐴                    │
│                                            │
│              🌿        🌳                  │
│    🌳                         🐴          │
│                    🌳                      │
│                                            │
└────────────────────────────────────────────┘

Horses: 3 (2 Normal, 1 Baby)
Obstacles: ~25 (12 trees, 8 bushes, 3 mushrooms, 2 crystals)
Par Time: 120 seconds
```

### Level 2: Forest

```
┌────────────────────────────────────────────┐
│                                            │
│  🌳🌳    🌳🌳         🌳🌳    💎          │
│    🐴              🌳                      │
│  🌳    🌿🌿    🌳🌳        🌳🌳          │
│                        🐴                  │
│       🌳        👸                 🌳      │
│  🍄                          🌿           │
│  🌳🌳      🐴        🌳           🌳🌳   │
│                 🐴                         │
│       🌳🌳             🌳     💎          │
│              🌳🌳           🐴            │
│  🌳                    🌳                  │
└────────────────────────────────────────────┘

Horses: 5 (3 Normal, 1 Fast, 1 Shy)
Obstacles: ~30 (16 trees, 6 bushes, 2 mushrooms, 2 crystals)
Par Time: 180 seconds
```

### Level 3: Castle

```
┌────────────────────────────────────────────┐
│                                            │
│    🌳        🏰🏰🏰        🌳     🐴      │
│            🏰     🏰                       │
│  🐴  🌳    🏰  👸  🏰    🌳              │
│            🏰     🏰           🌳         │
│    🌿      🏰🏰🏰      🌿        🐴      │
│                                            │
│  🌳    🐴        🌳        🌳     💎     │
│                        🐴                  │
│        🍄        🌳              🌳       │
│  💎                    🌳      🐴         │
│    🌳        🍄            🌳             │
└────────────────────────────────────────────┘

Horses: 7 (3 Normal, 1 Fast, 1 Shy, 1 Brave, 1 Baby)
Obstacles: ~35 (13 trees, 6 bushes, 1 castle, 3 mushrooms, 2 crystals)
Par Time: 240 seconds
```

---

## UI & HUD

### Isometric HUD Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ♥♥♥♥♥ Hearts: 15        Level 2: Forest      ⏱ 1:23      │
│                                                             │
│  ┌─────┐                                                   │
│  │ MAP │  Horses: 3/5                                      │
│  │  N  │  [🐴][🐴][🐴][🦄][🦄]                             │
│  │W E  │                                                   │
│  │  S  │                                                   │
│  └─────┘                                                   │
│                                                             │
│                    (game view)                              │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                  [Click to Shoot]                           │
└─────────────────────────────────────────────────────────────┘
```

### Minimap

The minimap displays in the **top-left corner** showing:
- Player position (always visible)
- All horses (brown dots)
- All unicorns (rainbow dots)
- Obstacles (gray squares)
- **World boundaries** (visible edge of map)

**Zoom Controls:**
- **`+` or `=` key**: Zoom in (see more detail, smaller area)
- **`-` key**: Zoom out (see more area, less detail)
- Zoom range: 1x to 10x scale

```
MINIMAP DISPLAY (top-left corner):
┌─────────────────┐
│ N               │
│    ┌───────┐    │
│  W │🐴  🦄 │ E  │  <- World boundary visible
│    │   👸  │    │
│    │ 🐴    │    │
│    └───────┘    │
│ S      [+][-]   │  <- Zoom indicator
└─────────────────┘

Legend:
  👸 = Player (pink triangle, always center)
  🐴 = Horse (brown circle)
  🦄 = Unicorn (rainbow gradient circle)
  ▪ = Obstacle (gray square)
  ─ = World boundary edge
```

```typescript
class Minimap {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private size: number = 150;
  private scale: number = 3;        // Units per pixel
  private minScale: number = 1;     // Zoomed in max
  private maxScale: number = 10;    // Zoomed out max
  
  constructor() {
    // Position in top-left corner
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '10px';
    this.canvas.style.left = '10px';
    this.canvas.style.borderRadius = '8px';
    this.canvas.style.border = '2px solid #fff';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    
    // Keyboard zoom controls
    window.addEventListener('keydown', (e) => {
      if (e.key === '+' || e.key === '=') {
        this.zoomIn();
      } else if (e.key === '-') {
        this.zoomOut();
      }
    });
  }
  
  zoomIn(): void {
    this.scale = Math.max(this.minScale, this.scale - 0.5);
  }
  
  zoomOut(): void {
    this.scale = Math.min(this.maxScale, this.scale + 0.5);
  }
  
  // Convert world position to minimap position
  private worldToMinimap(worldX: number, worldZ: number, playerX: number, playerZ: number): { x: number, y: number, visible: boolean } {
    const center = this.size / 2;
    const x = center + (worldX - playerX) / this.scale;
    const y = center + (worldZ - playerZ) / this.scale;
    const visible = x >= 0 && x <= this.size && y >= 0 && y <= this.size;
    return { x, y, visible };
  }
  
  render(player: Player, horses: Horse[], unicorns: Unicorn[], obstacles: Obstacle[]): void {
    const ctx = this.ctx;
    const center = this.size / 2;
    
    // Clear with dark green background
    ctx.fillStyle = 'rgba(0, 50, 0, 0.85)';
    ctx.fillRect(0, 0, this.size, this.size);
    
    // Draw world boundaries (90x90 world, edges at +/-45)
    const WORLD_HALF = 45;
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const topLeft = this.worldToMinimap(-WORLD_HALF, -WORLD_HALF, player.position.x, player.position.z);
    const topRight = this.worldToMinimap(WORLD_HALF, -WORLD_HALF, player.position.x, player.position.z);
    const bottomLeft = this.worldToMinimap(-WORLD_HALF, WORLD_HALF, player.position.x, player.position.z);
    const bottomRight = this.worldToMinimap(WORLD_HALF, WORLD_HALF, player.position.x, player.position.z);
    
    ctx.moveTo(topLeft.x, topLeft.y);
    ctx.lineTo(topRight.x, topRight.y);
    ctx.lineTo(bottomRight.x, bottomRight.y);
    ctx.lineTo(bottomLeft.x, bottomLeft.y);
    ctx.closePath();
    ctx.stroke();
    
    // Draw obstacles
    ctx.fillStyle = '#666';
    obstacles.forEach(obs => {
      const pos = this.worldToMinimap(obs.position.x, obs.position.z, player.position.x, player.position.z);
      if (pos.visible) {
        ctx.fillRect(pos.x - 2, pos.y - 2, 4, 4);
      }
    });
    
    // Draw horses (brown circles)
    ctx.fillStyle = '#8b4513';
    horses.forEach(horse => {
      if (!horse.isTransformed) {
        const pos = this.worldToMinimap(horse.position.x, horse.position.z, player.position.x, player.position.z);
        if (pos.visible) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    
    // Draw unicorns (rainbow gradient)
    unicorns.forEach(unicorn => {
      const pos = this.worldToMinimap(unicorn.position.x, unicorn.position.z, player.position.x, player.position.z);
      if (pos.visible) {
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 5);
        gradient.addColorStop(0, '#ff69b4');
        gradient.addColorStop(1, '#ffd700');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Draw player (always center, pink triangle pointing in facing direction)
    ctx.fillStyle = '#ff69b4';
    ctx.beginPath();
    ctx.moveTo(center, center - 6);
    ctx.lineTo(center - 4, center + 4);
    ctx.lineTo(center + 4, center + 4);
    ctx.closePath();
    ctx.fill();
    
    // Compass labels
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('N', center, 12);
    ctx.fillText('S', center, this.size - 4);
    ctx.textAlign = 'left';
    ctx.fillText('W', 4, center + 4);
    ctx.textAlign = 'right';
    ctx.fillText('E', this.size - 4, center + 4);
    
    // Zoom indicator
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '9px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`[+][-] ${this.scale.toFixed(1)}x`, this.size - 4, this.size - 4);
  }
}
```

### Win/Lose Screens

```
WIN SCREEN:
┌─────────────────────────────────────────┐
│                                         │
│            ✨ LEVEL COMPLETE! ✨        │
│                                         │
│         🦄 🦄 🦄 🦄 🦄 🦄 🦄           │
│                                         │
│           Time: 1:45 / 2:00             │
│           Hearts Used: 12               │
│           ⭐⭐⭐ 3 Stars!               │
│                                         │
│         [Next Level]  [Replay]          │
│                                         │
└─────────────────────────────────────────┘
```

### Star Rating System

Each level awards 1-3 stars based on performance:

| Stars | Criteria |
|-------|----------|
| ⭐ | Complete the level |
| ⭐⭐ | Complete under par time OR accuracy > 70% |
| ⭐⭐⭐ | Complete under par time AND accuracy > 85% |

```typescript
interface LevelScore {
  time: number;
  heartsUsed: number;
  heartsHit: number;
  horsesTransformed: number;
}

function calculateStars(score: LevelScore, parTime: number, totalHorses: number): number {
  const completed = score.horsesTransformed === totalHorses;
  if (!completed) return 0;
  
  const underPar = score.time <= parTime;
  const accuracy = score.heartsHit / score.heartsUsed;
  
  if (underPar && accuracy >= 0.85) return 3;
  if (underPar || accuracy >= 0.70) return 2;
  return 1;
}
```

### Achievement System

Achievements unlock as players reach milestones:

| Achievement | Requirement | Reward |
|-------------|-------------|--------|
| First Unicorn | Transform 1 horse | - |
| Speed Demon | Transform 5 horses in 10 seconds | Gun Skin: Lightning |
| Sharpshooter | 95% accuracy in a level | Gun Skin: Golden |
| Night Owl | Complete a level at night | - |
| Weather Warrior | Transform in rain, fog, and clear | Gun Skin: Rainbow |
| Boss Buster | Defeat a boss horse | Gun Skin: Crown |
| Completionist | 3-star all levels | Gun Skin: Diamond |
| Power Player | Collect all power-up types | - |
| Explorer | Visit all 4 corners of a map | - |
| Combo King | 10x transformation combo | Gun Skin: Flame |

```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: () => boolean;
  reward?: string; // Gun skin ID
  unlocked: boolean;
}

class AchievementManager {
  private achievements: Achievement[] = [];
  private unlockedSkins: Set<string> = new Set(['default']);
  
  checkAchievements(gameState: GameState): void {
    this.achievements.forEach(achievement => {
      if (!achievement.unlocked && achievement.requirement()) {
        this.unlock(achievement);
      }
    });
  }
  
  private unlock(achievement: Achievement): void {
    achievement.unlocked = true;
    
    // Show notification
    this.showUnlockNotification(achievement);
    
    // Unlock reward
    if (achievement.reward) {
      this.unlockedSkins.add(achievement.reward);
    }
    
    // Save progress
    this.saveProgress();
  }
}
```

---

## Gun Skins

Unlockable cosmetic skins for the heart gun, earned through achievements.

### Available Skins

| Skin | Unlock | Visual |
|------|--------|--------|
| Default | Start | Pink with gold trim |
| Lightning | Speed Demon achievement | Yellow with electric sparks |
| Golden | Sharpshooter achievement | Full gold, metallic shine |
| Rainbow | Weather Warrior achievement | Color-shifting, sparkles |
| Crown | Boss Buster achievement | Royal purple with crown emblem |
| Diamond | Completionist achievement | Crystal/glass appearance |
| Flame | Combo King achievement | Red/orange with fire particles |

### Skin Implementation

```typescript
interface GunSkin {
  id: string;
  name: string;
  bodyColor: number;
  trimColor: number;
  emissiveColor: number;
  particleEffect?: string;
  material?: 'standard' | 'metallic' | 'crystal';
}

const GUN_SKINS: Record<string, GunSkin> = {
  default: {
    id: 'default',
    name: 'Classic Pink',
    bodyColor: 0xff1493,
    trimColor: 0xffd700,
    emissiveColor: 0xff69b4,
    material: 'standard'
  },
  lightning: {
    id: 'lightning',
    name: 'Lightning Strike',
    bodyColor: 0xffff00,
    trimColor: 0xffffff,
    emissiveColor: 0xffff88,
    particleEffect: 'electric_sparks',
    material: 'metallic'
  },
  golden: {
    id: 'golden',
    name: 'Golden Glory',
    bodyColor: 0xffd700,
    trimColor: 0xffec8b,
    emissiveColor: 0xffd700,
    material: 'metallic'
  },
  rainbow: {
    id: 'rainbow',
    name: 'Rainbow Dream',
    bodyColor: 0xff69b4, // Shifts through rainbow
    trimColor: 0xffffff,
    emissiveColor: 0xffffff,
    particleEffect: 'rainbow_sparkles',
    material: 'standard'
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond Dazzle',
    bodyColor: 0xb9f2ff,
    trimColor: 0xffffff,
    emissiveColor: 0xffffff,
    material: 'crystal'
  }
};

function applyGunSkin(gun: THREE.Group, skinId: string): void {
  const skin = GUN_SKINS[skinId];
  
  // Update materials
  gun.traverse(child => {
    if (child instanceof THREE.Mesh) {
      if (child.userData.part === 'body') {
        child.material.color.setHex(skin.bodyColor);
        child.material.emissive.setHex(skin.emissiveColor);
        child.material.emissiveIntensity = 0.3;
        
        if (skin.material === 'metallic') {
          child.material.metalness = 0.8;
          child.material.roughness = 0.2;
        } else if (skin.material === 'crystal') {
          child.material.transparent = true;
          child.material.opacity = 0.8;
          child.material.metalness = 0.1;
          child.material.roughness = 0.1;
        }
      } else if (child.userData.part === 'trim') {
        child.material.color.setHex(skin.trimColor);
      }
    }
  });
}
```

---

## Screen Effects

### Screen Shake

Screen shake provides impactful feedback for transformations and boss hits.

```typescript
class ScreenShake {
  private intensity: number = 0;
  private duration: number = 0;
  private elapsed: number = 0;
  private originalPosition: Vector3 = new Vector3();
  
  shake(intensity: number, duration: number): void {
    this.intensity = intensity;
    this.duration = duration;
    this.elapsed = 0;
    this.originalPosition.copy(camera.position);
  }
  
  update(delta: number): void {
    if (this.elapsed >= this.duration) {
      camera.position.copy(this.originalPosition);
      return;
    }
    
    this.elapsed += delta;
    const progress = this.elapsed / this.duration;
    const currentIntensity = this.intensity * (1 - progress); // Decay
    
    // Random offset
    const offsetX = (Math.random() - 0.5) * currentIntensity;
    const offsetY = (Math.random() - 0.5) * currentIntensity;
    const offsetZ = (Math.random() - 0.5) * currentIntensity;
    
    camera.position.set(
      this.originalPosition.x + offsetX,
      this.originalPosition.y + offsetY,
      this.originalPosition.z + offsetZ
    );
  }
}

// Usage
const screenShake = new ScreenShake();

function onTransformation(): void {
  screenShake.shake(0.3, 0.4); // Medium shake
}

function onBossHit(): void {
  screenShake.shake(0.5, 0.6); // Strong shake
}
```

### Final Horse Slow-Mo

When the last horse is hit, time slows for dramatic effect:

```typescript
class SlowMotion {
  private targetTimeScale: number = 1;
  private currentTimeScale: number = 1;
  private slowMoDuration: number = 0;
  private slowMoElapsed: number = 0;
  
  triggerFinalHorseSloMo(): void {
    this.targetTimeScale = 0.2; // 20% speed
    this.slowMoDuration = 2.0;  // 2 seconds real-time
    this.slowMoElapsed = 0;
    
    // Also zoom camera slightly
    this.zoomToTarget(lastHorse.position);
  }
  
  update(realDelta: number): number {
    if (this.slowMoElapsed < this.slowMoDuration) {
      this.slowMoElapsed += realDelta;
      
      // Lerp time scale back to normal over duration
      const progress = this.slowMoElapsed / this.slowMoDuration;
      this.currentTimeScale = lerp(this.targetTimeScale, 1.0, easeOutQuad(progress));
    } else {
      this.currentTimeScale = 1.0;
    }
    
    // Return scaled delta for game logic
    return realDelta * this.currentTimeScale;
  }
}

// In game loop
function gameLoop(realDelta: number): void {
  const gameDelta = slowMotion.update(realDelta);
  
  // All game updates use gameDelta
  player.update(gameDelta);
  horses.forEach(h => h.update(gameDelta));
  particles.update(gameDelta);
  
  // Screen shake uses real delta for consistent feel
  screenShake.update(realDelta);
}

// Trigger on final transformation
function onHeartHit(horse: Horse): void {
  horse.transform();
  screenShake.shake(0.3, 0.4);
  
  const remainingHorses = horses.filter(h => !h.isTransformed);
  if (remainingHorses.length === 0) {
    slowMotion.triggerFinalHorseSloMo();
  }
}
```

---

## Particle Effects

### Particle System

```typescript
interface ParticleConfig {
  count: number;
  lifetime: number;
  size: number;
  color: number | number[];
  speed: number;
  gravity: number;
  fadeOut: boolean;
  emissive: boolean;
}

const PARTICLE_CONFIGS: Record<string, ParticleConfig> = {
  heartTrail: {
    count: 100,
    lifetime: 0.5,
    size: 0.1,
    color: [0xff69b4, 0xffb6c1],
    speed: 0.5,
    gravity: -0.5,
    fadeOut: true,
    emissive: true
  },
  starburst: {
    count: 200,
    lifetime: 1,
    size: 0.15,
    color: [0xff69b4, 0xffd700, 0xffffff, 0x87ceeb],
    speed: 5,
    gravity: 2,
    fadeOut: true,
    emissive: true
  },
  transformation: {
    count: 300,
    lifetime: 1.5,
    size: 0.2,
    color: [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x8b00ff],
    speed: 3,
    gravity: -1,
    fadeOut: true,
    emissive: true
  },
  ambient: {
    count: 50,
    lifetime: 5,
    size: 0.05,
    color: [0xffffff, 0xffd700, 0xff69b4],
    speed: 0.2,
    gravity: -0.1,
    fadeOut: false,
    emissive: true
  }
};
```

### Starburst Effect

```typescript
function createStarburstEffect(position: THREE.Vector3): void {
  const config = PARTICLE_CONFIGS.starburst;
  
  for (let i = 0; i < config.count; i++) {
    const particle = this.getParticle();
    
    // Random direction
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    particle.position.copy(position);
    particle.velocity.set(
      Math.sin(phi) * Math.cos(theta) * config.speed,
      Math.cos(phi) * config.speed,
      Math.sin(phi) * Math.sin(theta) * config.speed
    );
    
    particle.lifetime = config.lifetime * (0.5 + Math.random() * 0.5);
    particle.color = config.color[Math.floor(Math.random() * config.color.length)];
  }
}
```

---

## Mobile Support

### Touch Controls

```
MOBILE LAYOUT:
┌───────────────────────────────────────────┐
│  ♥15        Forest        ⏱ 1:23   [≡]   │
│                                           │
│                                           │
│                                           │
│          (isometric game view)            │
│                                           │
│                                           │
│                                           │
├───────────────────────────────────────────┤
│                                           │
│   ┌─────┐                    ┌───────┐   │
│   │  ↑  │      TAP TO        │       │   │
│ ┌─┼─────┼─┐    SHOOT        │   ♥   │   │
│ │←│  ●  │→│               │ FIRE  │   │
│ └─┼─────┼─┘                  │       │   │
│   │  ↓  │                    └───────┘   │
│   └─────┘                                 │
│   D-Pad                       Fire Btn    │
└───────────────────────────────────────────┘
```

### Touch Implementation

```typescript
class MobileControls {
  private dpad: HTMLElement;
  private fireButton: HTMLElement;
  private touchStart: Vector2 | null = null;
  
  public direction: Vector2 = new Vector2();
  public fire: boolean = false;
  
  constructor() {
    this.createDPad();
    this.createFireButton();
  }
  
  private createDPad(): void {
    const dpad = document.createElement('div');
    dpad.className = 'dpad';
    dpad.innerHTML = `
      <div class="dpad-up" data-dir="up">↑</div>
      <div class="dpad-left" data-dir="left">←</div>
      <div class="dpad-center"></div>
      <div class="dpad-right" data-dir="right">→</div>
      <div class="dpad-down" data-dir="down">↓</div>
    `;
    
    dpad.querySelectorAll('[data-dir]').forEach(btn => {
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const dir = btn.dataset.dir;
        if (dir === 'up') this.direction.y = -1;
        if (dir === 'down') this.direction.y = 1;
        if (dir === 'left') this.direction.x = -1;
        if (dir === 'right') this.direction.x = 1;
      });
      
      btn.addEventListener('touchend', () => {
        const dir = btn.dataset.dir;
        if (dir === 'up' || dir === 'down') this.direction.y = 0;
        if (dir === 'left' || dir === 'right') this.direction.x = 0;
      });
    });
    
    document.body.appendChild(dpad);
  }
  
  private createFireButton(): void {
    const btn = document.createElement('button');
    btn.className = 'fire-button';
    btn.innerHTML = '♥';
    
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.fire = true;
    });
    
    btn.addEventListener('touchend', () => {
      this.fire = false;
    });
    
    document.body.appendChild(btn);
  }
}
```

### Mobile Aiming

For mobile, use **tap-to-shoot**:
- Player taps on screen
- Raycast from tap position to ground
- Princess aims at that point
- Heart fires toward tap location

```typescript
function handleTap(screenPos: Vector2): void {
  // Convert tap to world position
  const raycaster = new Raycaster();
  raycaster.setFromCamera(screenPos, camera);
  
  const groundPlane = new Plane(new Vector3(0, 1, 0), 0);
  const tapWorld = new Vector3();
  raycaster.ray.intersectPlane(groundPlane, tapWorld);
  
  // Aim and fire
  const aimDir = tapWorld.sub(player.position).normalize();
  player.rotation = Math.atan2(aimDir.x, aimDir.z);
  
  fireHeart(aimDir);
}
```

---

## Audio

### Sound Effects (To Implement)

| Sound | Trigger | Description |
|-------|---------|-------------|
| heart_fire | Shoot heart | Magical "pew" sound |
| heart_hit | Heart hits horse | Sparkly impact |
| transformation | Horse → Unicorn | Musical flourish |
| horse_alert | Horse sees player | Surprised whinny |
| horse_flee | Horse runs | Galloping hooves |
| footstep | Player walks | Soft footsteps |
| level_complete | All horses transformed | Victory fanfare |
| ui_click | Menu interaction | Soft click |

### Background Music

- **Menu**: Gentle, whimsical melody
- **Gameplay**: Upbeat, magical adventure theme
- **Victory**: Triumphant celebration

---

## Technical Specifications

### Tech Stack

- **Engine**: Three.js
- **Language**: TypeScript
- **Build**: Vite
- **Target**: 60 FPS on mid-range devices

### Performance Targets

| Metric | Target |
|--------|--------|
| Frame Rate | 60 FPS |
| Draw Calls | < 100 |
| Triangles | < 50,000 |
| Texture Memory | < 64 MB |
| Load Time | < 3 seconds |

### Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

---

## Risks & Mitigations

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Performance on low-end mobile | High | High | Progressive quality settings; LOD system; particle limits; test on budget devices weekly |
| Three.js bundle size too large | Medium | Medium | Tree-shaking; dynamic imports; lazy load non-essential features |
| WebGL compatibility issues | Low | High | Feature detection; graceful fallback messaging; test matrix across browsers |
| Memory leaks from particles/entities | Medium | Medium | Object pooling; dispose patterns; automated memory profiling |

### UX Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Controls confusing for young children | Medium | High | Tutorial level; visual key hints; on-screen prompts; playtest with 5-8 year olds |
| Touch controls feel imprecise | Medium | High | Large touch targets (min 48px); aim assist on mobile; adjust based on feedback |
| Difficulty curve too steep | Medium | Medium | Analytics on completion rates; adjustable difficulty; hint system |
| Players get lost in large levels | Low | Medium | Minimap always visible; horse indicators; audio cues for nearby horses |

### Project Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Scope creep from feature richness | High | Medium | Strict MVP definition; phase features across releases; weekly scope reviews |
| Art asset delays | Medium | Medium | Procedural/simple geometric art first; placeholder system; parallel workstreams |
| Single point of failure (solo dev) | Medium | High | Documentation; modular architecture; code reviews; knowledge sharing |

### Risk Monitoring

- **Weekly**: Review performance metrics, crash rates, completion analytics
- **Bi-weekly**: Playtest sessions with target audience
- **Monthly**: Full risk register review and update

---

## Launch Plan

### Phase 1: Technical Foundation (Weeks 1-4)

**Goals:** Core engine, basic gameplay loop functional

| Week | Deliverables |
|------|--------------|
| 1 | Project setup (Vite + TS + Three.js); Isometric camera; Basic scene |
| 2 | Player movement (8-dir); Terrain rendering; World boundaries |
| 3 | Heart shooting; Basic horse (1 type); Collision detection |
| 4 | Transformation effect; Basic HUD; Level completion flow |

**Exit Criteria:**
- [ ] Player can move, shoot, transform horses
- [ ] 60 FPS on mid-range laptop
- [ ] Basic level completable end-to-end

### Phase 2: Content & Polish (Weeks 5-8)

**Goals:** Full horse variety, multiple levels, visual polish

| Week | Deliverables |
|------|--------------|
| 5 | All 5 horse types with AI behaviors |
| 6 | 3 level designs; Obstacle variety |
| 7 | Particle systems; Transformation effects; Screen shake |
| 8 | Minimap; Star rating; Level select screen |

**Exit Criteria:**
- [ ] All 5 horse types implemented
- [ ] 3 playable levels with distinct layouts
- [ ] Particle effects and screen feedback working
- [ ] Internal playtest positive feedback

### Phase 3: Features & Mobile (Weeks 9-12)

**Goals:** Power-ups, achievements, mobile support

| Week | Deliverables |
|------|--------------|
| 9 | 4 power-up types; Power-up spawning |
| 10 | Achievement system; Gun skins; Save/load |
| 11 | Mobile touch controls; Responsive UI |
| 12 | Day/night cycle; Weather effects (stretch) |

**Exit Criteria:**
- [ ] Power-ups functional and balanced
- [ ] Achievements triggering correctly
- [ ] Mobile playable with touch controls
- [ ] Closed beta ready (50-100 users)

### Phase 4: Beta & Launch (Weeks 13-16)

**Goals:** Bug fixes, performance, public release

| Week | Deliverables |
|------|--------------|
| 13 | Closed beta launch; Analytics integration |
| 14 | Bug fixes from beta feedback; Performance optimization |
| 15 | Sound effects; Background music |
| 16 | Open beta; Marketing push; Public launch |

**Exit Criteria:**
- [ ] <1% crash rate
- [ ] >40% Day 1 retention in beta
- [ ] All critical bugs fixed
- [ ] Launch announcement ready

### Feature Flags

Enable/disable features independently for testing and rollout:

```typescript
const FEATURE_FLAGS = {
  // Core features (always on after MVP)
  game_powerups_enabled: true,
  game_achievements_enabled: true,
  
  // Progressive features
  game_daynight_enabled: false,      // Enable in Phase 3
  game_weather_enabled: false,       // Enable in Phase 3
  game_boss_enabled: false,          // Enable after launch
  
  // Experimental
  game_multiplayer_preview: false,   // Future
  game_level_editor: false,          // Future
};
```

### Analytics Events

Track key events for product decisions:

| Event | Parameters | Purpose |
|-------|------------|---------|
| `session_start` | device, browser, referrer | User acquisition |
| `level_start` | level_id, attempt_number | Engagement |
| `level_complete` | level_id, time, stars, accuracy | Progression |
| `level_abandon` | level_id, time_played, horses_remaining | Drop-off analysis |
| `horse_transformed` | horse_type, power_up_active | Balance tuning |
| `achievement_unlocked` | achievement_id | Feature engagement |
| `power_up_collected` | power_up_type | Balance tuning |
| `session_end` | total_time, levels_played | Retention |

---

## Open Questions

### Design Decisions Needed

| Question | Options | Owner | Due Date |
|----------|---------|-------|----------|
| Should horses respawn after transformation for endless mode? | A) No respawn B) Respawn after delay C) Optional endless mode | Design | Week 2 |
| How to handle accessibility (colorblind modes)? | A) High contrast option B) Shape-based indicators C) Both | Design | Week 4 |
| Should there be a "story mode" with narrative? | A) Pure arcade B) Light story C) Full narrative | PM | Week 6 |
| Monetization strategy (if any)? | A) Free B) One-time purchase C) Optional cosmetics | PM/Business | Week 8 |

### Technical Decisions Needed

| Question | Options | Owner | Due Date |
|----------|---------|-------|----------|
| Orthographic vs Perspective camera for isometric view? | A) Ortho (true iso) B) Perspective (depth) | Dev | Week 1 |
| How to handle save data? | A) LocalStorage B) Cloud save C) Both | Dev | Week 3 |
| Physics library for collision? | A) Custom simple B) Cannon.js C) Rapier | Dev | Week 1 |
| Audio library? | A) Web Audio API B) Howler.js C) Three.js Audio | Dev | Week 14 |

### Research Needed

| Topic | Why | Owner | Due Date |
|-------|-----|-------|----------|
| COPPA compliance for children's game | Legal requirements for under-13 users | Legal/PM | Week 4 |
| Competitor analysis deep dive | Validate positioning, identify gaps | PM | Week 2 |
| Performance benchmarks on target devices | Establish baseline, set targets | Dev | Week 3 |
| Accessibility guidelines for games | WCAG for interactive content | Design | Week 4 |

---

## Asset Reference

### Complete Mesh List

**Princess (759 lines in Player.ts)**
- Head: SphereGeometry (0.35, 16, 16)
- Eyes: SphereGeometry (0.08, 12, 12) x2
- Eye Highlights: SphereGeometry (0.025, 8, 8) x2
- Blush: SphereGeometry (0.05, 8, 8) x2
- Smile: TorusGeometry (0.08, 0.015, 8, 12, π)
- Hair Cap: SphereGeometry (0.38, 16, 16)
- Bangs: SphereGeometry (0.15, 12, 12)
- Pigtails: SphereGeometry (0.18/0.12) x4
- Hair Ties: TorusGeometry (0.08, 0.025) x2
- Crown Base: TorusGeometry (0.15, 0.02, 8, 16, π)
- Crown Peaks: ConeGeometry (0.04, 0.1) x3
- Crown Gem: ExtrudeGeometry (heart shape)
- Dress: ConeGeometry (0.35, 0.7, 12)
- Bodice: CylinderGeometry (0.18, 0.22, 0.25)
- Sleeves: SphereGeometry (0.1) x2
- Collar: CircleGeometry (0.1, 12)
- Bow: SphereGeometry (0.04) x3
- Arms: CylinderGeometry (0.04, 0.05, 0.2) x2
- Hands: SphereGeometry (0.05) x2
- Legs: CylinderGeometry (0.06, 0.05, 0.25) x2
- Feet: SphereGeometry (0.07) x2
- Sparkles: SphereGeometry (0.025) x10

**Heart Gun**
- Body: CylinderGeometry (0.06, 0.06, 0.4)
- Caps: SphereGeometry (0.06) x2
- Trim: TorusGeometry (0.07, 0.012) x2
- Barrel: ExtrudeGeometry (heart)
- Mini Hearts: ExtrudeGeometry (heart) x2
- Grip: CylinderGeometry (0.03, 0.04, 0.12)

**Horse**
- Body: SphereGeometry (0.8) scaled
- Head: SphereGeometry (0.35)
- Snout: CylinderGeometry (0.15, 0.2, 0.4)
- Ears: ConeGeometry (0.08, 0.2) x2
- Legs: CylinderGeometry (0.1, 0.08, 1) x4
- Tail: CylinderGeometry (0.05, 0.1, 0.6)

**Unicorn Additions**
- Horn: ConeGeometry (0.08, 0.5)
- Mane: SphereGeometry (0.12) x6

**Obstacles** (see Obstacles section)

**Environment**
- Terrain: PlaneGeometry (200, 200, 100, 100)
- Boundaries: BoxGeometry x4
- Mountains: ConeGeometry x5
- Clouds: SphereGeometry clusters
- Rainbows: TorusGeometry segments

---

## Implementation Checklist

### Phase 1: Core Setup
- [ ] Project scaffolding (Vite + TS + Three.js)
- [ ] Isometric camera system
- [ ] Screen-relative WASD controls
- [ ] Basic scene with terrain

### Phase 2: Player
- [ ] Port princess mesh from V1
- [ ] Adapt for isometric viewing angle
- [ ] Mouse aim system
- [ ] Walk animation

### Phase 3: Combat
- [ ] Heart projectile
- [ ] Mouse-to-world aiming
- [ ] Collision detection
- [ ] Hit effects

### Phase 4: Horses
- [ ] Port horse meshes and types
- [ ] AI state machine
- [ ] Line-of-sight for isometric
- [ ] Cover seeking

### Phase 5: Environment
- [ ] Obstacles with scaled meshes
- [ ] World boundaries
- [ ] Sky/clouds/rainbows
- [ ] Ambient particles

### Phase 6: Polish
- [ ] Transformation effects
- [ ] Unicorn rainbow trails
- [ ] Eye blinks, pigtail physics
- [ ] Level progression

### Phase 7: UI
- [ ] HUD overlay
- [ ] Minimap
- [ ] Menu screens
- [ ] Mobile controls

### Phase 8: Audio
- [ ] Sound effects
- [ ] Background music
- [ ] Audio manager

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-01 | Original | Initial PRD |
| 2.0 | 2026-01-10 | Original | Isometric camera, simplified controls |
| 2.1 | 2026-01-11 | PM Review | Added: Problem statement, Goals/Metrics, User Stories, UX Journeys, Risks, Launch Plan, Open Questions |

---

*End of PRD - Version 2.1*
*Ready for implementation with product management framework*
