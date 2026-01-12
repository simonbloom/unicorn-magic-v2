import * as THREE from 'three';
import { Terrain } from '../entities/Terrain';

export type PowerUpType = 'speed' | 'multishot' | 'homing' | 'slowmo';

interface PowerUpConfig {
  color: number;
  duration: number;
  icon: string;
}

const POWERUP_CONFIGS: Record<PowerUpType, PowerUpConfig> = {
  speed: { color: 0xffff00, duration: 5, icon: '⚡' },
  multishot: { color: 0xff69b4, duration: 8, icon: '💕' },
  homing: { color: 0x00ffff, duration: 6, icon: '🎯' },
  slowmo: { color: 0x9370db, duration: 4, icon: '⏱️' }
};

class PowerUp {
  public mesh: THREE.Group;
  public position: THREE.Vector3;
  public type: PowerUpType;
  public isCollected: boolean = false;
  private bobPhase: number = 0;
  private rotationSpeed: number = 2;

  constructor(type: PowerUpType, position: THREE.Vector3) {
    this.type = type;
    this.position = position.clone();
    this.mesh = this.createMesh();
    this.mesh.position.copy(this.position);
  }

  private createMesh(): THREE.Group {
    const group = new THREE.Group();
    const config = POWERUP_CONFIGS[this.type];

    const mat = new THREE.MeshStandardMaterial({
      color: config.color,
      emissive: config.color,
      emissiveIntensity: 0.5,
      metalness: 0.3,
      roughness: 0.5
    });

    // Main cube
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), mat);
    group.add(cube);

    // Outer glow
    const glowMat = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: 0.3
    });
    const glow = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), glowMat);
    group.add(glow);

    // Icon indicator (smaller cubes forming pattern)
    const indicatorMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    if (this.type === 'speed') {
      // Lightning bolt shape
      const bolt = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 0.1), indicatorMat);
      bolt.rotation.z = 0.3;
      bolt.position.z = 0.45;
      group.add(bolt);
    } else if (this.type === 'multishot') {
      // Three dots
      [-0.15, 0, 0.15].forEach(x => {
        const dot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), indicatorMat);
        dot.position.set(x, 0, 0.45);
        group.add(dot);
      });
    } else if (this.type === 'homing') {
      // Target circle
      const ring = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.05), indicatorMat);
      ring.position.z = 0.45;
      group.add(ring);
    } else if (this.type === 'slowmo') {
      // Clock hands
      const hand1 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.2, 0.1), indicatorMat);
      hand1.position.set(0, 0.05, 0.45);
      group.add(hand1);
      const hand2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.1), indicatorMat);
      hand2.position.set(0.05, 0, 0.45);
      group.add(hand2);
    }

    return group;
  }

  update(delta: number): void {
    this.bobPhase += delta * 3;
    this.mesh.position.y = this.position.y + 1 + Math.sin(this.bobPhase) * 0.2;
    this.mesh.rotation.y += delta * this.rotationSpeed;
  }

  checkCollision(playerPos: THREE.Vector3): boolean {
    const dist = this.mesh.position.distanceTo(playerPos);
    return dist < 1.5;
  }
}

export class PowerUpManager {
  private powerUps: PowerUp[] = [];
  private activePowerUps: Map<PowerUpType, number> = new Map();
  private scene: THREE.Scene;
  private terrain: Terrain;
  private spawnTimer: number = 0;
  private spawnInterval: number = 15;

  constructor(scene: THREE.Scene, terrain: Terrain) {
    this.scene = scene;
    this.terrain = terrain;
  }

  update(delta: number, playerPos: THREE.Vector3): PowerUpType | null {
    let collectedType: PowerUpType | null = null;

    // Update spawn timer
    this.spawnTimer += delta;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnTimer = 0;
      this.spawnRandom();
    }

    // Update power-ups
    this.powerUps.forEach(powerUp => {
      powerUp.update(delta);

      if (!powerUp.isCollected && powerUp.checkCollision(playerPos)) {
        powerUp.isCollected = true;
        collectedType = powerUp.type;
        this.activate(powerUp.type);
      }
    });

    // Remove collected power-ups
    this.powerUps = this.powerUps.filter(p => {
      if (p.isCollected) {
        this.scene.remove(p.mesh);
        return false;
      }
      return true;
    });

    // Update active durations
    this.activePowerUps.forEach((time, type) => {
      const newTime = time - delta;
      if (newTime <= 0) {
        this.activePowerUps.delete(type);
      } else {
        this.activePowerUps.set(type, newTime);
      }
    });

    return collectedType;
  }

  private spawnRandom(): void {
    const types: PowerUpType[] = ['speed', 'multishot', 'homing', 'slowmo'];
    const type = types[Math.floor(Math.random() * types.length)];

    const x = (Math.random() - 0.5) * 60;
    const z = (Math.random() - 0.5) * 60;
    const y = this.terrain.getHeightAt(x, z);

    const powerUp = new PowerUp(type, new THREE.Vector3(x, y, z));
    this.powerUps.push(powerUp);
    this.scene.add(powerUp.mesh);
  }

  private activate(type: PowerUpType): void {
    const config = POWERUP_CONFIGS[type];
    this.activePowerUps.set(type, config.duration);
  }

  isActive(type: PowerUpType): boolean {
    return (this.activePowerUps.get(type) || 0) > 0;
  }

  getSpeedMultiplier(): number {
    return this.isActive('speed') ? 1.5 : 1.0;
  }

  getHorseSpeedMultiplier(): number {
    return this.isActive('slowmo') ? 0.5 : 1.0;
  }

  isMultiShotActive(): boolean {
    return this.isActive('multishot');
  }

  isHomingActive(): boolean {
    return this.isActive('homing');
  }

  getActivePowerUps(): Map<PowerUpType, number> {
    return this.activePowerUps;
  }

  clear(): void {
    this.powerUps.forEach(p => this.scene.remove(p.mesh));
    this.powerUps = [];
    this.activePowerUps.clear();
    this.spawnTimer = 0;
  }
}
