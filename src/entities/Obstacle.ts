import * as THREE from 'three';

export type ObstacleType = 
  // Common
  'tree' | 'bush' | 'castle' | 'mushroom' | 'crystal' | 'river' | 'bridge' | 'mud' | 'flowers' |
  // Desert
  'cactus' | 'sandDune' | 'oasis' | 'pyramid' |
  // Winter
  'snowman' | 'iceCrystal' | 'frozenPond' | 'snowPine' |
  // Swamp
  'deadTree' | 'lilyPad' | 'swampGas' |
  // Volcano
  'lavaPool' | 'volcanicRock' | 'obsidian' |
  // Beach
  'palmTree' | 'beachUmbrella' | 'sandcastle' | 'tidePool' |
  // Haunted
  'tombstone' | 'ghostTree' | 'pumpkin' | 'cobweb';

const COLLISION_RADII: Record<ObstacleType, number> = {
  tree: 1.5, bush: 1.8, castle: 12, mushroom: 1.2, crystal: 1.0,
  river: 0, bridge: 0, mud: 0, flowers: 0,
  // Desert
  cactus: 1.0, sandDune: 3.0, oasis: 0, pyramid: 4.0,
  // Winter
  snowman: 1.2, iceCrystal: 1.0, frozenPond: 0, snowPine: 1.5,
  // Swamp
  deadTree: 1.2, lilyPad: 0, swampGas: 0,
  // Volcano
  lavaPool: 0, volcanicRock: 2.0, obsidian: 1.0,
  // Beach
  palmTree: 1.0, beachUmbrella: 0.8, sandcastle: 1.5, tidePool: 0,
  // Haunted
  tombstone: 0.8, ghostTree: 1.2, pumpkin: 0.6, cobweb: 0
};

export interface ObstacleEffect {
  blocksMovement: boolean;
  slowsMovement: boolean;
  attractsHorses: boolean;
}

const OBSTACLE_EFFECTS: Record<ObstacleType, ObstacleEffect> = {
  tree: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  bush: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  castle: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  mushroom: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  crystal: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  river: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  bridge: { blocksMovement: false, slowsMovement: false, attractsHorses: false },
  mud: { blocksMovement: false, slowsMovement: true, attractsHorses: false },
  flowers: { blocksMovement: false, slowsMovement: false, attractsHorses: true },
  // Desert
  cactus: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  sandDune: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  oasis: { blocksMovement: false, slowsMovement: false, attractsHorses: true },
  pyramid: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  // Winter
  snowman: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  iceCrystal: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  frozenPond: { blocksMovement: false, slowsMovement: true, attractsHorses: false },
  snowPine: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  // Swamp
  deadTree: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  lilyPad: { blocksMovement: false, slowsMovement: false, attractsHorses: false },
  swampGas: { blocksMovement: false, slowsMovement: true, attractsHorses: false },
  // Volcano
  lavaPool: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  volcanicRock: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  obsidian: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  // Beach
  palmTree: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  beachUmbrella: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  sandcastle: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  tidePool: { blocksMovement: false, slowsMovement: true, attractsHorses: false },
  // Haunted
  tombstone: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  ghostTree: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  pumpkin: { blocksMovement: true, slowsMovement: false, attractsHorses: false },
  cobweb: { blocksMovement: false, slowsMovement: true, attractsHorses: false }
};

export class Obstacle {
  public mesh: THREE.Group;
  public position: THREE.Vector3;
  public type: ObstacleType;
  public collisionRadius: number;
  public effect: ObstacleEffect;
  public width: number = 1;
  public length: number = 1;
  private animationPhase: number = 0;

  constructor(type: ObstacleType, variant: number = 0) {
    this.type = type;
    this.collisionRadius = COLLISION_RADII[type];
    this.effect = OBSTACLE_EFFECTS[type];
    this.mesh = this.createMesh(type, variant);
    this.position = this.mesh.position;
  }

  update(delta: number): void {
    if (this.type === 'river') {
      this.animationPhase += delta * 2;
      this.mesh.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y = 0.1 + Math.sin(this.animationPhase + i * 0.5) * 0.05;
        }
      });
    }
  }

  private createMesh(type: ObstacleType, variant: number): THREE.Group {
    switch (type) {
      case 'tree': return this.createTree(variant);
      case 'bush': return this.createBush();
      case 'castle': return this.createCastle();
      case 'mushroom': return this.createMushroom();
      case 'crystal': return this.createCrystal();
      case 'river': return this.createRiver(variant);
      case 'bridge': return this.createBridge();
      case 'mud': return this.createMud();
      case 'flowers': return this.createFlowers();
      // Desert
      case 'cactus': return this.createCactus();
      case 'sandDune': return this.createSandDune();
      case 'oasis': return this.createOasis();
      case 'pyramid': return this.createPyramid();
      // Winter
      case 'snowman': return this.createSnowman();
      case 'iceCrystal': return this.createIceCrystal();
      case 'frozenPond': return this.createFrozenPond();
      case 'snowPine': return this.createSnowPine();
      // Swamp
      case 'deadTree': return this.createDeadTree();
      case 'lilyPad': return this.createLilyPad();
      case 'swampGas': return this.createSwampGas();
      // Volcano
      case 'lavaPool': return this.createLavaPool();
      case 'volcanicRock': return this.createVolcanicRock();
      case 'obsidian': return this.createObsidian();
      // Beach
      case 'palmTree': return this.createPalmTree();
      case 'beachUmbrella': return this.createBeachUmbrella();
      case 'sandcastle': return this.createSandcastle();
      case 'tidePool': return this.createTidePool();
      // Haunted
      case 'tombstone': return this.createTombstone(variant);
      case 'ghostTree': return this.createGhostTree();
      case 'pumpkin': return this.createPumpkin();
      case 'cobweb': return this.createCobweb();
      default: return new THREE.Group();
    }
  }

  private createTree(variant: number): THREE.Group {
    const tree = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });

    // Blocky trunk
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.5, 0.5), trunkMat);
    trunk.position.y = 1.25;
    trunk.castShadow = true;
    tree.add(trunk);

    const foliageColors = [0x228b22, 0x32cd32, 0x006400];
    const foliageMat = new THREE.MeshStandardMaterial({ color: foliageColors[variant] });

    if (variant === 0) {
      // Oak-style: stacked cubes
      const foliage1 = new THREE.Mesh(new THREE.BoxGeometry(3, 1.5, 3), foliageMat);
      foliage1.position.y = 3;
      foliage1.castShadow = true;
      tree.add(foliage1);

      const foliage2 = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.5, 2.5), foliageMat);
      foliage2.position.y = 4.3;
      foliage2.castShadow = true;
      tree.add(foliage2);

      const foliage3 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1, 1.5), foliageMat);
      foliage3.position.y = 5.3;
      foliage3.castShadow = true;
      tree.add(foliage3);
    } else if (variant === 1) {
      // Pine-style: stacked decreasing cubes
      for (let i = 0; i < 4; i++) {
        const size = 2.5 - i * 0.5;
        const foliage = new THREE.Mesh(new THREE.BoxGeometry(size, 1, size), foliageMat);
        foliage.position.y = 2.5 + i * 0.9;
        foliage.castShadow = true;
        tree.add(foliage);
      }
    } else {
      // Birch-style: offset cubes
      const positions = [
        { x: 0, y: 3.2, z: 0, s: 2 },
        { x: 0.8, y: 3.5, z: 0.5, s: 1.5 },
        { x: -0.5, y: 3.8, z: -0.3, s: 1.8 },
        { x: 0.3, y: 4.2, z: -0.4, s: 1.3 }
      ];
      positions.forEach(p => {
        const foliage = new THREE.Mesh(new THREE.BoxGeometry(p.s, p.s * 0.6, p.s), foliageMat);
        foliage.position.set(p.x, p.y, p.z);
        foliage.castShadow = true;
        tree.add(foliage);
      });
    }

    tree.scale.setScalar(2.0);
    return tree;
  }

  private createBush(): THREE.Group {
    const bush = new THREE.Group();
    const bushMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });

    // Cluster of cubes
    const positions = [
      { x: 0, y: 0.5, z: 0, s: 0.8 },
      { x: 0.5, y: 0.4, z: 0.3, s: 0.6 },
      { x: -0.4, y: 0.45, z: 0.4, s: 0.65 },
      { x: 0.3, y: 0.5, z: -0.4, s: 0.7 },
      { x: -0.3, y: 0.55, z: -0.3, s: 0.55 }
    ];

    positions.forEach(p => {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(p.s, p.s, p.s), bushMat);
      cube.position.set(p.x, p.y, p.z);
      cube.castShadow = true;
      bush.add(cube);
    });

    // Blocky flowers
    const flowerMat = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
    for (let i = 0; i < 3; i++) {
      const flower = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), flowerMat);
      flower.position.set(
        (Math.random() - 0.5) * 1.2,
        0.9 + Math.random() * 0.2,
        (Math.random() - 0.5) * 1.2
      );
      bush.add(flower);
    }

    bush.scale.setScalar(1.5);
    return bush;
  }

  private createCastle(): THREE.Group {
    const castle = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x808080 });

    // Main keep - blocky
    const keep = new THREE.Mesh(new THREE.BoxGeometry(4, 5, 4), stoneMat);
    keep.position.y = 2.5;
    keep.castShadow = true;
    castle.add(keep);

    // Corner towers - blocky
    const towerPositions = [[-2.5, -2.5], [-2.5, 2.5], [2.5, -2.5], [2.5, 2.5]];

    towerPositions.forEach(([x, z]) => {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(1.5, 6, 1.5), stoneMat);
      tower.position.set(x, 3, z);
      tower.castShadow = true;
      castle.add(tower);

      // Blocky battlements
      for (let i = 0; i < 4; i++) {
        const battlement = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.4), stoneMat);
        const angle = (i / 4) * Math.PI * 2;
        battlement.position.set(
          x + Math.cos(angle) * 0.6,
          6.3,
          z + Math.sin(angle) * 0.6
        );
        castle.add(battlement);
      }

      // Blocky roof
      const roofMat = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
      const roof = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 1.8), roofMat);
      roof.position.set(x, 6.4, z);
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      castle.add(roof);
    });

    // Flags
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const flagMat = new THREE.MeshStandardMaterial({ color: 0xff69b4, side: THREE.DoubleSide });

    [[-2.5, -2.5], [2.5, 2.5]].forEach(([x, z]) => {
      const pole = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2, 0.1), poleMat);
      pole.position.set(x, 7.5, z);
      castle.add(pole);

      const flag = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.05), flagMat);
      flag.position.set(x + 0.4, 8, z);
      castle.add(flag);
    });

    castle.scale.setScalar(2.5);
    return castle;
  }

  private createMushroom(): THREE.Group {
    const mushroom = new THREE.Group();

    // Blocky stem
    const stemMat = new THREE.MeshStandardMaterial({ color: 0xfff8dc });
    const stem = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.5, 0.5), stemMat);
    stem.position.y = 0.75;
    stem.castShadow = true;
    mushroom.add(stem);

    // Blocky cap
    const capMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cap = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 1.4), capMat);
    cap.position.y = 1.75;
    cap.castShadow = true;
    mushroom.add(cap);

    // Blocky spots
    const spotMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const spotPositions = [
      { x: 0.3, z: 0.3 },
      { x: -0.3, z: 0.3 },
      { x: 0.3, z: -0.3 },
      { x: -0.3, z: -0.3 },
      { x: 0, z: 0.4 },
      { x: 0.4, z: 0 }
    ];

    spotPositions.forEach(p => {
      const spot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.2), spotMat);
      spot.position.set(p.x, 2.02, p.z);
      mushroom.add(spot);
    });

    mushroom.scale.setScalar(1.8);
    return mushroom;
  }

  private createCrystal(): THREE.Group {
    const crystal = new THREE.Group();

    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x9370db,
      emissive: 0x9370db,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.8,
      metalness: 0.1,
      roughness: 0.1
    });

    // Main tall crystal - rotated box
    const mainCrystal = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 0.4), crystalMat);
    mainCrystal.position.y = 1;
    mainCrystal.rotation.set(0.1, 0.2, 0.05);
    mainCrystal.castShadow = true;
    crystal.add(mainCrystal);

    // Smaller crystals
    for (let i = 0; i < 4; i++) {
      const smallCrystal = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1, 0.25), crystalMat);
      const angle = (i / 4) * Math.PI * 2 + 0.3;
      smallCrystal.position.set(
        Math.cos(angle) * 0.5,
        0.5,
        Math.sin(angle) * 0.5
      );
      smallCrystal.rotation.set(
        (Math.random() - 0.5) * 0.4,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.4
      );
      smallCrystal.castShadow = true;
      crystal.add(smallCrystal);
    }

    crystal.scale.setScalar(2.0);
    return crystal;
  }

  private createRiver(variant: number): THREE.Group {
    const river = new THREE.Group();
    const length = 12 + variant * 4;
    this.width = 3;
    this.length = length;

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x4169e1,
      transparent: true,
      opacity: 0.7,
      metalness: 0.3,
      roughness: 0.2
    });

    // Create wave segments
    for (let i = 0; i < length; i += 1.5) {
      const segment = new THREE.Mesh(new THREE.BoxGeometry(3, 0.3, 1.5), waterMat);
      segment.position.set(0, 0.1, i - length / 2);
      segment.receiveShadow = true;
      river.add(segment);
    }

    // River banks
    const bankMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const leftBank = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, length), bankMat);
    leftBank.position.set(-1.75, 0.2, 0);
    river.add(leftBank);

    const rightBank = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, length), bankMat);
    rightBank.position.set(1.75, 0.2, 0);
    river.add(rightBank);

    return river;
  }

  private createBridge(): THREE.Group {
    const bridge = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x654321 });

    // Bridge planks
    for (let i = 0; i < 5; i++) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.15, 0.6), woodMat);
      plank.position.set(0, 0.5, i * 0.7 - 1.4);
      plank.castShadow = true;
      bridge.add(plank);
    }

    // Support beams
    const beam1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 3.5), darkWoodMat);
    beam1.position.set(-1.5, 0.1, 0);
    bridge.add(beam1);

    const beam2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 3.5), darkWoodMat);
    beam2.position.set(1.5, 0.1, 0);
    bridge.add(beam2);

    // Railings
    const railMat = new THREE.MeshStandardMaterial({ color: 0xa0522d });
    [-1.6, 1.6].forEach(x => {
      const post1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1, 0.15), railMat);
      post1.position.set(x, 1, -1.5);
      bridge.add(post1);

      const post2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1, 0.15), railMat);
      post2.position.set(x, 1, 1.5);
      bridge.add(post2);

      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 3.5), railMat);
      rail.position.set(x, 1.3, 0);
      bridge.add(rail);
    });

    return bridge;
  }

  private createMud(): THREE.Group {
    const mud = new THREE.Group();
    this.width = 4;
    this.length = 4;

    const mudMat = new THREE.MeshStandardMaterial({
      color: 0x5c4033,
      roughness: 0.9,
      metalness: 0.1
    });

    // Main mud patch
    const base = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 4), mudMat);
    base.position.y = 0.05;
    base.receiveShadow = true;
    mud.add(base);

    // Mud bubbles
    const bubbleMat = new THREE.MeshStandardMaterial({ color: 0x4a3728 });
    for (let i = 0; i < 6; i++) {
      const bubble = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.3), bubbleMat);
      bubble.position.set(
        (Math.random() - 0.5) * 3,
        0.12,
        (Math.random() - 0.5) * 3
      );
      mud.add(bubble);
    }

    return mud;
  }

  private createFlowers(): THREE.Group {
    const flowers = new THREE.Group();
    this.width = 3;
    this.length = 3;

    // Grass base
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x90ee90 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 3), grassMat);
    base.position.y = 0.05;
    base.receiveShadow = true;
    flowers.add(base);

    // Colorful flowers
    const flowerColors = [0xff69b4, 0xff1493, 0xffff00, 0xff6347, 0xee82ee, 0xffa500];
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });

    for (let i = 0; i < 12; i++) {
      const x = (Math.random() - 0.5) * 2.5;
      const z = (Math.random() - 0.5) * 2.5;

      // Stem
      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.4, 0.05), stemMat);
      stem.position.set(x, 0.25, z);
      flowers.add(stem);

      // Flower head
      const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      const flowerMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.2 });
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.2), flowerMat);
      head.position.set(x, 0.5, z);
      flowers.add(head);

      // Center
      const centerMat = new THREE.MeshStandardMaterial({ color: 0xffff00 });
      const center = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), centerMat);
      center.position.set(x, 0.55, z);
      flowers.add(center);
    }

    return flowers;
  }

  // === DESERT OBSTACLES ===
  private createCactus(): THREE.Group {
    const cactus = new THREE.Group();
    const cactusMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });

    // Main trunk
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4, 0.8), cactusMat);
    trunk.position.y = 2;
    trunk.castShadow = true;
    cactus.add(trunk);

    // Left arm
    const armL = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.6, 0.6), cactusMat);
    armL.position.set(-1.1, 2.5, 0);
    cactus.add(armL);
    const armLUp = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.5, 0.6), cactusMat);
    armLUp.position.set(-1.5, 3.5, 0);
    cactus.add(armLUp);

    // Right arm
    const armR = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 0.6), cactusMat);
    armR.position.set(0.9, 1.8, 0);
    cactus.add(armR);
    const armRUp = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.2, 0.6), cactusMat);
    armRUp.position.set(1.2, 2.8, 0);
    cactus.add(armRUp);

    cactus.scale.setScalar(1.5);
    return cactus;
  }

  private createSandDune(): THREE.Group {
    const dune = new THREE.Group();
    const sandMat = new THREE.MeshStandardMaterial({ color: 0xc2b280 });

    // Large mound
    const main = new THREE.Mesh(new THREE.BoxGeometry(6, 2, 6), sandMat);
    main.position.y = 1;
    main.rotation.y = Math.PI / 6;
    dune.add(main);

    const top = new THREE.Mesh(new THREE.BoxGeometry(4, 1.5, 4), sandMat);
    top.position.y = 2.5;
    dune.add(top);

    const peak = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 2), sandMat);
    peak.position.y = 3.5;
    dune.add(peak);

    return dune;
  }

  private createOasis(): THREE.Group {
    const oasis = new THREE.Group();
    this.width = 5;
    this.length = 5;

    // Water pool
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x4169e1, transparent: true, opacity: 0.7 });
    const pool = new THREE.Mesh(new THREE.BoxGeometry(5, 0.2, 5), waterMat);
    pool.position.y = 0.1;
    oasis.add(pool);

    // Palm tree in center
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3, 0.4), trunkMat);
    trunk.position.set(0, 1.5, 0);
    oasis.add(trunk);

    const leafMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    for (let i = 0; i < 6; i++) {
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 2), leafMat);
      const angle = (i / 6) * Math.PI * 2;
      leaf.position.set(Math.cos(angle) * 0.8, 3.2, Math.sin(angle) * 0.8);
      leaf.rotation.set(0.3, angle, 0);
      oasis.add(leaf);
    }

    return oasis;
  }

  private createPyramid(): THREE.Group {
    const pyramid = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xdaa520 });

    // Stacked layers
    for (let i = 0; i < 5; i++) {
      const size = 8 - i * 1.5;
      const layer = new THREE.Mesh(new THREE.BoxGeometry(size, 1.5, size), stoneMat);
      layer.position.y = i * 1.5 + 0.75;
      layer.castShadow = true;
      pyramid.add(layer);
    }

    return pyramid;
  }

  // === WINTER OBSTACLES ===
  private createSnowman(): THREE.Group {
    const snowman = new THREE.Group();
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xfffafa });

    // Three balls
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), snowMat);
    bottom.position.y = 0.9;
    snowman.add(bottom);

    const middle = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), snowMat);
    middle.position.y = 2.4;
    snowman.add(middle);

    const head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), snowMat);
    head.position.y = 3.5;
    snowman.add(head);

    // Hat
    const hatMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const brim = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 1.2), hatMat);
    brim.position.y = 4;
    snowman.add(brim);
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), hatMat);
    top.position.y = 4.4;
    snowman.add(top);

    // Carrot nose
    const noseMat = new THREE.MeshStandardMaterial({ color: 0xff6600 });
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.5), noseMat);
    nose.position.set(0, 3.5, 0.6);
    snowman.add(nose);

    // Coal eyes
    const coalMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    [-0.2, 0.2].forEach(x => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), coalMat);
      eye.position.set(x, 3.7, 0.5);
      snowman.add(eye);
    });

    snowman.scale.setScalar(1.5);
    return snowman;
  }

  private createIceCrystal(): THREE.Group {
    const crystal = new THREE.Group();
    const iceMat = new THREE.MeshStandardMaterial({
      color: 0x87ceeb, transparent: true, opacity: 0.8,
      emissive: 0x87ceeb, emissiveIntensity: 0.3
    });

    // Main spire
    const main = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 0.5), iceMat);
    main.position.y = 1.5;
    crystal.add(main);

    // Smaller spires
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const spire = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.5 + Math.random(), 0.3), iceMat);
      spire.position.set(Math.cos(angle) * 0.6, 0.8, Math.sin(angle) * 0.6);
      spire.rotation.set((Math.random() - 0.5) * 0.3, 0, (Math.random() - 0.5) * 0.3);
      crystal.add(spire);
    }

    crystal.scale.setScalar(2);
    return crystal;
  }

  private createFrozenPond(): THREE.Group {
    const pond = new THREE.Group();
    this.width = 6;
    this.length = 6;

    const iceMat = new THREE.MeshStandardMaterial({
      color: 0xb0e0e6, transparent: true, opacity: 0.7, metalness: 0.8, roughness: 0.1
    });

    const ice = new THREE.Mesh(new THREE.BoxGeometry(6, 0.2, 6), iceMat);
    ice.position.y = 0.1;
    pond.add(ice);

    // Cracks
    const crackMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
    for (let i = 0; i < 5; i++) {
      const crack = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 2 + Math.random() * 2), crackMat);
      crack.position.set((Math.random() - 0.5) * 4, 0.2, (Math.random() - 0.5) * 4);
      crack.rotation.y = Math.random() * Math.PI;
      pond.add(crack);
    }

    return pond;
  }

  private createSnowPine(): THREE.Group {
    const tree = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xfffafa });

    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.5, 0.5), trunkMat);
    trunk.position.y = 1.25;
    tree.add(trunk);

    // Snow-covered pine layers
    for (let i = 0; i < 4; i++) {
      const size = 2.5 - i * 0.5;
      const layer = new THREE.Mesh(new THREE.BoxGeometry(size, 1, size), snowMat);
      layer.position.y = 2.5 + i * 0.9;
      tree.add(layer);
    }

    tree.scale.setScalar(2);
    return tree;
  }

  // === SWAMP OBSTACLES ===
  private createDeadTree(): THREE.Group {
    const tree = new THREE.Group();
    const deadMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a });

    // Twisted trunk
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.6, 4, 0.6), deadMat);
    trunk.position.y = 2;
    trunk.rotation.z = 0.1;
    tree.add(trunk);

    // Dead branches
    const branches = [
      { x: 0.8, y: 3, z: 0, rx: 0, rz: 0.5 },
      { x: -0.6, y: 3.5, z: 0.3, rx: 0.2, rz: -0.4 },
      { x: 0.3, y: 2.5, z: -0.7, rx: -0.3, rz: 0.3 }
    ];

    branches.forEach(b => {
      const branch = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.2, 0.2), deadMat);
      branch.position.set(b.x, b.y, b.z);
      branch.rotation.set(b.rx, 0, b.rz);
      tree.add(branch);
    });

    tree.scale.setScalar(1.8);
    return tree;
  }

  private createLilyPad(): THREE.Group {
    const lily = new THREE.Group();
    this.width = 2;
    this.length = 2;

    const padMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const pad = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 2), padMat);
    pad.position.y = 0.1;
    lily.add(pad);

    // Flower
    const flowerMat = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
    const flower = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.4), flowerMat);
    flower.position.set(0.3, 0.25, 0.3);
    lily.add(flower);

    return lily;
  }

  private createSwampGas(): THREE.Group {
    const gas = new THREE.Group();
    this.width = 3;
    this.length = 3;

    const gasMat = new THREE.MeshStandardMaterial({
      color: 0x90ee90, transparent: true, opacity: 0.4, emissive: 0x90ee90, emissiveIntensity: 0.5
    });

    for (let i = 0; i < 8; i++) {
      const bubble = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), gasMat);
      bubble.position.set(
        (Math.random() - 0.5) * 2.5,
        0.3 + Math.random() * 1.5,
        (Math.random() - 0.5) * 2.5
      );
      gas.add(bubble);
    }

    return gas;
  }

  // === VOLCANO OBSTACLES ===
  private createLavaPool(): THREE.Group {
    const lava = new THREE.Group();
    this.width = 5;
    this.length = 5;

    const lavaMat = new THREE.MeshStandardMaterial({
      color: 0xff4500, emissive: 0xff4500, emissiveIntensity: 0.8
    });

    const pool = new THREE.Mesh(new THREE.BoxGeometry(5, 0.3, 5), lavaMat);
    pool.position.y = 0.15;
    lava.add(pool);

    // Bubbles
    const bubbleMat = new THREE.MeshStandardMaterial({
      color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 1
    });
    for (let i = 0; i < 5; i++) {
      const bubble = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.4), bubbleMat);
      bubble.position.set((Math.random() - 0.5) * 4, 0.35, (Math.random() - 0.5) * 4);
      lava.add(bubble);
    }

    return lava;
  }

  private createVolcanicRock(): THREE.Group {
    const rock = new THREE.Group();
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x2f2f2f });

    // Jagged rocks
    for (let i = 0; i < 4; i++) {
      const size = 1 + Math.random() * 1.5;
      const boulder = new THREE.Mesh(new THREE.BoxGeometry(size, size * 1.2, size), rockMat);
      boulder.position.set(
        (Math.random() - 0.5) * 2,
        size * 0.6,
        (Math.random() - 0.5) * 2
      );
      boulder.rotation.set(Math.random() * 0.3, Math.random() * Math.PI, Math.random() * 0.3);
      rock.add(boulder);
    }

    return rock;
  }

  private createObsidian(): THREE.Group {
    const obsidian = new THREE.Group();
    const obsMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e, metalness: 0.9, roughness: 0.1
    });

    // Main spire
    const main = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4, 0.8), obsMat);
    main.position.y = 2;
    main.rotation.set(0.1, 0.2, 0.05);
    obsidian.add(main);

    // Smaller spires
    for (let i = 0; i < 3; i++) {
      const spire = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2 + Math.random(), 0.5), obsMat);
      spire.position.set((Math.random() - 0.5) * 1.5, 1, (Math.random() - 0.5) * 1.5);
      spire.rotation.set((Math.random() - 0.5) * 0.3, 0, (Math.random() - 0.5) * 0.3);
      obsidian.add(spire);
    }

    obsidian.scale.setScalar(1.5);
    return obsidian;
  }

  // === BEACH OBSTACLES ===
  private createPalmTree(): THREE.Group {
    const palm = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0xdeb887 });

    // Curved trunk (segments)
    for (let i = 0; i < 5; i++) {
      const seg = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.2, 0.5), trunkMat);
      seg.position.set(i * 0.15, i * 1.1 + 0.6, 0);
      seg.rotation.z = -0.1;
      palm.add(seg);
    }

    // Fronds
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    for (let i = 0; i < 7; i++) {
      const frond = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 3), leafMat);
      const angle = (i / 7) * Math.PI * 2;
      frond.position.set(0.6, 5.8, 0);
      frond.rotation.set(0.5, angle, 0);
      palm.add(frond);
    }

    // Coconuts
    const cocoMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    for (let i = 0; i < 3; i++) {
      const coco = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), cocoMat);
      coco.position.set(0.5 + (Math.random() - 0.5) * 0.3, 5.3, (Math.random() - 0.5) * 0.3);
      palm.add(coco);
    }

    palm.scale.setScalar(1.3);
    return palm;
  }

  private createBeachUmbrella(): THREE.Group {
    const umbrella = new THREE.Group();

    // Pole
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const pole = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3, 0.15), poleMat);
    pole.position.y = 1.5;
    umbrella.add(pole);

    // Canopy (striped)
    const colors = [0xff0000, 0xffffff];
    for (let i = 0; i < 8; i++) {
      const slice = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.1, 0.4),
        new THREE.MeshStandardMaterial({ color: colors[i % 2] })
      );
      const angle = (i / 8) * Math.PI * 2;
      slice.position.set(Math.cos(angle) * 0.5, 3, Math.sin(angle) * 0.5);
      slice.rotation.y = angle;
      umbrella.add(slice);
    }

    umbrella.scale.setScalar(1.5);
    return umbrella;
  }

  private createSandcastle(): THREE.Group {
    const castle = new THREE.Group();
    const sandMat = new THREE.MeshStandardMaterial({ color: 0xf4d03f });

    // Base
    const base = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 3), sandMat);
    base.position.y = 0.5;
    castle.add(base);

    // Towers
    const towerPos = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    towerPos.forEach(([x, z]) => {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.5, 0.8), sandMat);
      tower.position.set(x, 1.75, z);
      castle.add(tower);
    });

    // Central tower
    const central = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), sandMat);
    central.position.y = 2;
    castle.add(central);

    // Flag
    const flagMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const pole = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1, 0.05), new THREE.MeshStandardMaterial({ color: 0x8b4513 }));
    pole.position.y = 3.5;
    castle.add(pole);
    const flag = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.02), flagMat);
    flag.position.set(0.25, 3.8, 0);
    castle.add(flag);

    return castle;
  }

  private createTidePool(): THREE.Group {
    const pool = new THREE.Group();
    this.width = 3;
    this.length = 3;

    const waterMat = new THREE.MeshStandardMaterial({ color: 0x40e0d0, transparent: true, opacity: 0.6 });
    const water = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 3), waterMat);
    water.position.y = 0.1;
    pool.add(water);

    // Rocks around edge
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x808080 });
    for (let i = 0; i < 8; i++) {
      const rock = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.5), rockMat);
      const angle = (i / 8) * Math.PI * 2;
      rock.position.set(Math.cos(angle) * 1.3, 0.2, Math.sin(angle) * 1.3);
      pool.add(rock);
    }

    return pool;
  }

  // === HAUNTED OBSTACLES ===
  private createTombstone(variant: number): THREE.Group {
    const tomb = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x696969 });

    if (variant === 0) {
      // Classic tombstone
      const stone = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0.3), stoneMat);
      stone.position.y = 1;
      tomb.add(stone);
      const top = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 0.3), stoneMat);
      top.position.y = 2.25;
      top.rotation.z = Math.PI / 4;
      top.scale.set(0.7, 0.7, 1);
      tomb.add(top);
    } else if (variant === 1) {
      // Cross
      const vertical = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), stoneMat);
      vertical.position.y = 1.25;
      tomb.add(vertical);
      const horizontal = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 0.3), stoneMat);
      horizontal.position.y = 2;
      tomb.add(horizontal);
    } else {
      // Obelisk
      const obelisk = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3, 0.8), stoneMat);
      obelisk.position.y = 1.5;
      tomb.add(obelisk);
    }

    tomb.scale.setScalar(1.5);
    return tomb;
  }

  private createGhostTree(): THREE.Group {
    const tree = new THREE.Group();
    const ghostMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });

    // Pale trunk
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.6, 4, 0.6), ghostMat);
    trunk.position.y = 2;
    tree.add(trunk);

    // Twisted branches
    for (let i = 0; i < 5; i++) {
      const branch = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 0.2), ghostMat);
      branch.position.set((Math.random() - 0.5) * 1.5, 2 + Math.random() * 2, 0);
      branch.rotation.set(0, Math.random() * Math.PI, (Math.random() - 0.5) * 0.5);
      tree.add(branch);
    }

    tree.scale.setScalar(1.8);
    return tree;
  }

  private createPumpkin(): THREE.Group {
    const pumpkin = new THREE.Group();
    const pumpMat = new THREE.MeshStandardMaterial({ color: 0xff6600 });

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1, 1.2), pumpMat);
    body.position.y = 0.5;
    pumpkin.add(body);

    // Stem
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const stem = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.4, 0.2), stemMat);
    stem.position.y = 1.2;
    pumpkin.add(stem);

    // Glowing face
    const glowMat = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 1 });
    // Eyes
    [-0.25, 0.25].forEach(x => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.1), glowMat);
      eye.position.set(x, 0.6, 0.6);
      pumpkin.add(eye);
    });
    // Mouth
    const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.1), glowMat);
    mouth.position.set(0, 0.35, 0.6);
    pumpkin.add(mouth);

    pumpkin.scale.setScalar(1.5);
    return pumpkin;
  }

  private createCobweb(): THREE.Group {
    const web = new THREE.Group();
    this.width = 3;
    this.length = 3;

    const webMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });

    // Radial strands
    for (let i = 0; i < 8; i++) {
      const strand = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 2), webMat);
      const angle = (i / 8) * Math.PI * 2;
      strand.position.set(Math.cos(angle) * 0.8, 1.5, Math.sin(angle) * 0.8);
      strand.rotation.y = angle;
      web.add(strand);
    }

    // Circular strands
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 8; i++) {
        const arc = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 0.02), webMat);
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.4 + r * 0.4;
        arc.position.set(Math.cos(angle) * radius, 1.5, Math.sin(angle) * radius);
        arc.rotation.y = angle + Math.PI / 2;
        web.add(arc);
      }
    }

    return web;
  }

  setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  }

  isPointInside(x: number, z: number): boolean {
    const dx = Math.abs(x - this.position.x);
    const dz = Math.abs(z - this.position.z);
    return dx < this.width / 2 && dz < this.length / 2;
  }
}
