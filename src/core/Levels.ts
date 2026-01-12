import * as THREE from 'three';
import { HorseType } from '../entities/Horse';
import { ObstacleType } from '../entities/Obstacle';
import { ThemeName } from '../systems/ThemeManager';

export interface LevelConfig {
  id: number;
  name: string;
  theme: ThemeName;
  parTime: number;
  playerStart: THREE.Vector3;
  horses: Array<{
    position: THREE.Vector3;
    type: HorseType;
  }>;
  obstacles: Array<{
    position: THREE.Vector3;
    type: ObstacleType;
    variant?: number;
  }>;
}

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: 'Meadow',
    theme: 'meadow',
    parTime: 120,
    playerStart: new THREE.Vector3(0, 0, 0),
    horses: [
      { position: new THREE.Vector3(15, 0, 10), type: 'normal' },
      { position: new THREE.Vector3(-12, 0, 8), type: 'normal' },
      { position: new THREE.Vector3(5, 0, -18), type: 'baby' }
    ],
    obstacles: [
      { position: new THREE.Vector3(10, 0, 5), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(-8, 0, 12), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(20, 0, -5), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(-15, 0, -10), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(0, 0, 20), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(-20, 0, 0), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(25, 0, 15), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(-5, 0, -22), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(18, 0, -15), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(-22, 0, 18), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(8, 0, 25), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(-18, 0, -20), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(5, 0, 8), type: 'bush' },
      { position: new THREE.Vector3(-10, 0, 5), type: 'bush' },
      { position: new THREE.Vector3(12, 0, -8), type: 'bush' },
      { position: new THREE.Vector3(-6, 0, -12), type: 'bush' },
      { position: new THREE.Vector3(0, 0, 15), type: 'bush' },
      { position: new THREE.Vector3(-15, 0, 15), type: 'bush' },
      { position: new THREE.Vector3(22, 0, 0), type: 'bush' },
      { position: new THREE.Vector3(-25, 0, -5), type: 'bush' },
      { position: new THREE.Vector3(15, 0, -20), type: 'mushroom' },
      { position: new THREE.Vector3(-8, 0, 22), type: 'mushroom' },
      { position: new THREE.Vector3(0, 0, -25), type: 'mushroom' },
      { position: new THREE.Vector3(25, 0, 20), type: 'crystal' },
      { position: new THREE.Vector3(-20, 0, -18), type: 'crystal' },
      { position: new THREE.Vector3(8, 0, -5), type: 'flowers' },
      { position: new THREE.Vector3(-12, 0, -15), type: 'flowers' },
      { position: new THREE.Vector3(20, 0, 12), type: 'flowers' },
      { position: new THREE.Vector3(-5, 0, 18), type: 'mud' },
      { position: new THREE.Vector3(15, 0, -12), type: 'mud' }
    ]
  },
  {
    id: 2,
    name: 'Forest',
    theme: 'forest',
    parTime: 180,
    playerStart: new THREE.Vector3(0, 0, 0),
    horses: [
      { position: new THREE.Vector3(-18, 0, 12), type: 'normal' },
      { position: new THREE.Vector3(20, 0, -8), type: 'normal' },
      { position: new THREE.Vector3(8, 0, 18), type: 'normal' },
      { position: new THREE.Vector3(-10, 0, -15), type: 'fast' },
      { position: new THREE.Vector3(0, 0, -25), type: 'shy' }
    ],
    obstacles: [
      { position: new THREE.Vector3(-15, 0, 8), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(-12, 0, 10), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(15, 0, 5), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(18, 0, 8), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(-8, 0, -5), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(-5, 0, -8), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(10, 0, -12), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(12, 0, -10), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(0, 0, 15), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(-20, 0, 0), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(22, 0, 0), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(-25, 0, -12), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(25, 0, 15), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(5, 0, -20), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(-5, 0, 22), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(0, 0, -28), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(-5, 0, 5), type: 'bush' },
      { position: new THREE.Vector3(5, 0, -5), type: 'bush' },
      { position: new THREE.Vector3(-18, 0, -8), type: 'bush' },
      { position: new THREE.Vector3(15, 0, 12), type: 'bush' },
      { position: new THREE.Vector3(0, 0, 8), type: 'bush' },
      { position: new THREE.Vector3(-10, 0, 18), type: 'bush' },
      { position: new THREE.Vector3(-15, 0, -20), type: 'mushroom' },
      { position: new THREE.Vector3(20, 0, -18), type: 'mushroom' },
      { position: new THREE.Vector3(28, 0, 5), type: 'crystal' },
      { position: new THREE.Vector3(-28, 0, 10), type: 'crystal' },
      { position: new THREE.Vector3(0, 0, 0), type: 'river', variant: 0 },
      { position: new THREE.Vector3(0, 0, 0), type: 'bridge' },
      { position: new THREE.Vector3(-20, 0, 15), type: 'flowers' },
      { position: new THREE.Vector3(20, 0, -15), type: 'flowers' },
      { position: new THREE.Vector3(10, 0, 20), type: 'mud' }
    ]
  },
  {
    id: 3,
    name: 'Castle',
    theme: 'castle',
    parTime: 240,
    playerStart: new THREE.Vector3(0, 0, 0),
    horses: [
      { position: new THREE.Vector3(25, 0, 5), type: 'normal' },
      { position: new THREE.Vector3(-20, 0, 10), type: 'normal' },
      { position: new THREE.Vector3(15, 0, -18), type: 'normal' },
      { position: new THREE.Vector3(-8, 0, -22), type: 'fast' },
      { position: new THREE.Vector3(0, 0, 25), type: 'shy' },
      { position: new THREE.Vector3(-25, 0, -15), type: 'brave' },
      { position: new THREE.Vector3(20, 0, 20), type: 'baby' }
    ],
    obstacles: [
      { position: new THREE.Vector3(0, 0, 0), type: 'castle' },
      { position: new THREE.Vector3(-18, 0, 5), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(18, 0, -5), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(-12, 0, -18), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(12, 0, 18), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(-25, 0, 20), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(25, 0, -20), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(0, 0, -25), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(0, 0, 28), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(-28, 0, 0), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(28, 0, 0), type: 'tree', variant: 0 },
      { position: new THREE.Vector3(-20, 0, -25), type: 'tree', variant: 1 },
      { position: new THREE.Vector3(20, 0, 25), type: 'tree', variant: 2 },
      { position: new THREE.Vector3(15, 0, 8), type: 'bush' },
      { position: new THREE.Vector3(-15, 0, -8), type: 'bush' },
      { position: new THREE.Vector3(8, 0, -15), type: 'bush' },
      { position: new THREE.Vector3(-8, 0, 15), type: 'bush' },
      { position: new THREE.Vector3(22, 0, 12), type: 'bush' },
      { position: new THREE.Vector3(-22, 0, -12), type: 'bush' },
      { position: new THREE.Vector3(-5, 0, -28), type: 'mushroom' },
      { position: new THREE.Vector3(5, 0, 28), type: 'mushroom' },
      { position: new THREE.Vector3(-28, 0, -10), type: 'mushroom' },
      { position: new THREE.Vector3(28, 0, 10), type: 'crystal' },
      { position: new THREE.Vector3(-15, 0, 25), type: 'crystal' }
    ]
  },
  // === DESERT OASIS ===
  {
    id: 4,
    name: 'Desert Oasis',
    theme: 'desert',
    parTime: 150,
    playerStart: new THREE.Vector3(0, 0, 0),
    horses: [
      { position: new THREE.Vector3(20, 0, 10), type: 'normal' },
      { position: new THREE.Vector3(-15, 0, 15), type: 'normal' },
      { position: new THREE.Vector3(10, 0, -20), type: 'fast' },
      { position: new THREE.Vector3(-20, 0, -10), type: 'normal' }
    ],
    obstacles: [
      { position: new THREE.Vector3(15, 0, 5), type: 'cactus' },
      { position: new THREE.Vector3(-10, 0, 8), type: 'cactus' },
      { position: new THREE.Vector3(5, 0, -15), type: 'cactus' },
      { position: new THREE.Vector3(-18, 0, -5), type: 'cactus' },
      { position: new THREE.Vector3(25, 0, -10), type: 'cactus' },
      { position: new THREE.Vector3(-25, 0, 15), type: 'cactus' },
      { position: new THREE.Vector3(0, 0, 20), type: 'sandDune' },
      { position: new THREE.Vector3(-20, 0, -20), type: 'sandDune' },
      { position: new THREE.Vector3(20, 0, -25), type: 'sandDune' },
      { position: new THREE.Vector3(10, 0, 10), type: 'oasis' },
      { position: new THREE.Vector3(-15, 0, -15), type: 'oasis' },
      { position: new THREE.Vector3(0, 0, -30), type: 'pyramid' }
    ]
  },
  // === FROZEN TUNDRA ===
  {
    id: 5,
    name: 'Frozen Tundra',
    theme: 'winter',
    parTime: 180,
    playerStart: new THREE.Vector3(0, 0, 0),
    horses: [
      { position: new THREE.Vector3(18, 0, 12), type: 'normal' },
      { position: new THREE.Vector3(-15, 0, 8), type: 'shy' },
      { position: new THREE.Vector3(8, 0, -18), type: 'normal' },
      { position: new THREE.Vector3(-20, 0, -12), type: 'shy' },
      { position: new THREE.Vector3(0, 0, 25), type: 'normal' }
    ],
    obstacles: [
      { position: new THREE.Vector3(12, 0, 5), type: 'snowPine' },
      { position: new THREE.Vector3(-8, 0, 10), type: 'snowPine' },
      { position: new THREE.Vector3(20, 0, -8), type: 'snowPine' },
      { position: new THREE.Vector3(-15, 0, -15), type: 'snowPine' },
      { position: new THREE.Vector3(5, 0, 20), type: 'snowPine' },
      { position: new THREE.Vector3(-25, 0, 5), type: 'snowPine' },
      { position: new THREE.Vector3(0, 0, 8), type: 'snowman' },
      { position: new THREE.Vector3(-10, 0, -5), type: 'snowman' },
      { position: new THREE.Vector3(15, 0, 15), type: 'iceCrystal' },
      { position: new THREE.Vector3(-20, 0, 18), type: 'iceCrystal' },
      { position: new THREE.Vector3(8, 0, -10), type: 'frozenPond' },
      { position: new THREE.Vector3(-12, 0, 20), type: 'frozenPond' }
    ]
  },
  // === MURKY SWAMP ===
  {
    id: 6,
    name: 'Murky Swamp',
    theme: 'swamp',
    parTime: 200,
    playerStart: new THREE.Vector3(0, 0, 0),
    horses: [
      { position: new THREE.Vector3(15, 0, 10), type: 'brave' },
      { position: new THREE.Vector3(-18, 0, 8), type: 'normal' },
      { position: new THREE.Vector3(10, 0, -15), type: 'brave' },
      { position: new THREE.Vector3(-12, 0, -18), type: 'normal' },
      { position: new THREE.Vector3(25, 0, -5), type: 'normal' },
      { position: new THREE.Vector3(-25, 0, 15), type: 'brave' }
    ],
    obstacles: [
      { position: new THREE.Vector3(10, 0, 5), type: 'deadTree' },
      { position: new THREE.Vector3(-8, 0, 12), type: 'deadTree' },
      { position: new THREE.Vector3(18, 0, -10), type: 'deadTree' },
      { position: new THREE.Vector3(-15, 0, -8), type: 'deadTree' },
      { position: new THREE.Vector3(5, 0, 18), type: 'deadTree' },
      { position: new THREE.Vector3(-22, 0, -15), type: 'deadTree' },
      { position: new THREE.Vector3(0, 0, 10), type: 'lilyPad' },
      { position: new THREE.Vector3(-10, 0, -5), type: 'lilyPad' },
      { position: new THREE.Vector3(12, 0, -18), type: 'lilyPad' },
      { position: new THREE.Vector3(8, 0, 0), type: 'swampGas' },
      { position: new THREE.Vector3(-5, 0, 15), type: 'swampGas' },
      { position: new THREE.Vector3(0, 0, -12), type: 'mud' },
      { position: new THREE.Vector3(-18, 0, 0), type: 'mud' },
      { position: new THREE.Vector3(20, 0, 12), type: 'mud' }
    ]
  },
  // === VOLCANIC RIM ===
  {
    id: 7,
    name: 'Volcanic Rim',
    theme: 'volcano',
    parTime: 180,
    playerStart: new THREE.Vector3(0, 0, 0),
    horses: [
      { position: new THREE.Vector3(20, 0, 8), type: 'fast' },
      { position: new THREE.Vector3(-15, 0, 12), type: 'brave' },
      { position: new THREE.Vector3(12, 0, -18), type: 'fast' },
      { position: new THREE.Vector3(-20, 0, -8), type: 'brave' },
      { position: new THREE.Vector3(0, 0, 25), type: 'fast' },
      { position: new THREE.Vector3(-25, 0, -20), type: 'brave' }
    ],
    obstacles: [
      { position: new THREE.Vector3(10, 0, 10), type: 'lavaPool' },
      { position: new THREE.Vector3(-12, 0, -8), type: 'lavaPool' },
      { position: new THREE.Vector3(18, 0, -15), type: 'lavaPool' },
      { position: new THREE.Vector3(-8, 0, 18), type: 'lavaPool' },
      { position: new THREE.Vector3(5, 0, 0), type: 'volcanicRock' },
      { position: new THREE.Vector3(-15, 0, 5), type: 'volcanicRock' },
      { position: new THREE.Vector3(15, 0, -5), type: 'volcanicRock' },
      { position: new THREE.Vector3(-5, 0, -15), type: 'volcanicRock' },
      { position: new THREE.Vector3(25, 0, 0), type: 'obsidian' },
      { position: new THREE.Vector3(-25, 0, 10), type: 'obsidian' },
      { position: new THREE.Vector3(0, 0, -25), type: 'obsidian' }
    ]
  },
  // === BEACH PARADISE ===
  {
    id: 8,
    name: 'Beach Paradise',
    theme: 'beach',
    parTime: 120,
    playerStart: new THREE.Vector3(0, 0, 0),
    horses: [
      { position: new THREE.Vector3(15, 0, 10), type: 'normal' },
      { position: new THREE.Vector3(-12, 0, 8), type: 'baby' },
      { position: new THREE.Vector3(8, 0, -15), type: 'normal' },
      { position: new THREE.Vector3(-18, 0, -5), type: 'baby' }
    ],
    obstacles: [
      { position: new THREE.Vector3(10, 0, 5), type: 'palmTree' },
      { position: new THREE.Vector3(-8, 0, 12), type: 'palmTree' },
      { position: new THREE.Vector3(18, 0, -8), type: 'palmTree' },
      { position: new THREE.Vector3(-15, 0, -12), type: 'palmTree' },
      { position: new THREE.Vector3(5, 0, 18), type: 'palmTree' },
      { position: new THREE.Vector3(-22, 0, 8), type: 'palmTree' },
      { position: new THREE.Vector3(0, 0, 8), type: 'beachUmbrella' },
      { position: new THREE.Vector3(-10, 0, -5), type: 'beachUmbrella' },
      { position: new THREE.Vector3(12, 0, 12), type: 'sandcastle' },
      { position: new THREE.Vector3(-15, 0, 15), type: 'sandcastle' },
      { position: new THREE.Vector3(8, 0, -20), type: 'tidePool' },
      { position: new THREE.Vector3(-20, 0, -15), type: 'tidePool' }
    ]
  },
  // === HAUNTED GRAVEYARD ===
  {
    id: 9,
    name: 'Haunted Graveyard',
    theme: 'haunted',
    parTime: 240,
    playerStart: new THREE.Vector3(0, 0, 0),
    horses: [
      { position: new THREE.Vector3(18, 0, 10), type: 'normal' },
      { position: new THREE.Vector3(-15, 0, 12), type: 'shy' },
      { position: new THREE.Vector3(12, 0, -15), type: 'fast' },
      { position: new THREE.Vector3(-20, 0, -8), type: 'brave' },
      { position: new THREE.Vector3(25, 0, -20), type: 'normal' },
      { position: new THREE.Vector3(-25, 0, 18), type: 'fast' },
      { position: new THREE.Vector3(0, 0, 28), type: 'baby' }
    ],
    obstacles: [
      { position: new THREE.Vector3(8, 0, 5), type: 'tombstone', variant: 0 },
      { position: new THREE.Vector3(-6, 0, 8), type: 'tombstone', variant: 1 },
      { position: new THREE.Vector3(12, 0, -8), type: 'tombstone', variant: 2 },
      { position: new THREE.Vector3(-10, 0, -10), type: 'tombstone', variant: 0 },
      { position: new THREE.Vector3(5, 0, 15), type: 'tombstone', variant: 1 },
      { position: new THREE.Vector3(-15, 0, -5), type: 'tombstone', variant: 2 },
      { position: new THREE.Vector3(20, 0, 12), type: 'ghostTree' },
      { position: new THREE.Vector3(-18, 0, 15), type: 'ghostTree' },
      { position: new THREE.Vector3(15, 0, -18), type: 'ghostTree' },
      { position: new THREE.Vector3(-22, 0, -15), type: 'ghostTree' },
      { position: new THREE.Vector3(0, 0, 10), type: 'pumpkin' },
      { position: new THREE.Vector3(-8, 0, -15), type: 'pumpkin' },
      { position: new THREE.Vector3(18, 0, 0), type: 'pumpkin' },
      { position: new THREE.Vector3(10, 0, 8), type: 'cobweb' },
      { position: new THREE.Vector3(-12, 0, 12), type: 'cobweb' },
      { position: new THREE.Vector3(8, 0, -12), type: 'cobweb' }
    ]
  }
];
