import * as THREE from 'three';
import { Terrain } from './Terrain';
import { Obstacle } from './Obstacle';

export type HorseType = 'normal' | 'fast' | 'shy' | 'brave' | 'baby';
export type HorseState = 'grazing' | 'alert' | 'fleeing' | 'hiding';

interface HorseConfig {
  color: number;
  speed: number;
  visionAngle: number;
  visionDistance: number;
  alertDuration: number;
  hitsRequired: number;
  scale: number;
}

const HORSE_CONFIGS: Record<HorseType, HorseConfig> = {
  normal: { color: 0x8b4513, speed: 12, visionAngle: 90, visionDistance: 30, alertDuration: 0.4, hitsRequired: 1, scale: 1 },
  fast: { color: 0xf5f5f5, speed: 18, visionAngle: 90, visionDistance: 30, alertDuration: 0.2, hitsRequired: 1, scale: 1 },
  shy: { color: 0xd2b48c, speed: 12, visionAngle: 120, visionDistance: 40, alertDuration: 0.6, hitsRequired: 1, scale: 1 },
  brave: { color: 0x2f2f2f, speed: 10, visionAngle: 60, visionDistance: 20, alertDuration: 0.15, hitsRequired: 2, scale: 1.1 },
  baby: { color: 0xdeb887, speed: 8, visionAngle: 70, visionDistance: 25, alertDuration: 0.8, hitsRequired: 1, scale: 0.7 }
};

const COLLISION_RADIUS = 0.8;

export class Horse {
  public mesh: THREE.Group;
  public position: THREE.Vector3;
  public isTransformed: boolean = false;
  public collisionRadius: number = COLLISION_RADIUS;

  private _type: HorseType;
  private config: HorseConfig;
  private state: HorseState = 'grazing';
  private hitCount: number = 0;
  private alertTimer: number = 0;
  private grazeTarget: THREE.Vector3 = new THREE.Vector3();
  private rotation: number = 0;
  private velocity: THREE.Vector3 = new THREE.Vector3();
  private legPhase: number = 0;
  private hidingSpot: THREE.Vector3 | null = null;

  private legs: THREE.Mesh[] = [];
  private body!: THREE.Mesh;
  private horn: THREE.Mesh | null = null;
  private mane: THREE.Mesh[] = [];

  constructor(type: HorseType = 'normal') {
    this._type = type;
    this.config = HORSE_CONFIGS[this._type];
    this.mesh = this.createMesh();
    this.position = this.mesh.position;
    this.setNewGrazeTarget();
  }

  private createMesh(): THREE.Group {
    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: this.config.color });

    // Blocky body - elongated box
    this.body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 0.9), bodyMat);
    this.body.position.y = 1;
    group.add(this.body);

    // Blocky head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), bodyMat);
    head.position.set(1.1, 1.3, 0);
    group.add(head);

    // Blocky snout
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.35), bodyMat);
    snout.position.set(1.5, 1.15, 0);
    group.add(snout);

    // Blocky ears
    const earGeom = new THREE.BoxGeometry(0.08, 0.2, 0.08);
    const leftEar = new THREE.Mesh(earGeom, bodyMat);
    leftEar.position.set(1.0, 1.65, -0.12);
    group.add(leftEar);

    const rightEar = new THREE.Mesh(earGeom, bodyMat);
    rightEar.position.set(1.0, 1.65, 0.12);
    group.add(rightEar);

    // Blocky eyes
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.05), eyeMat);
    leftEye.position.set(1.25, 1.35, -0.2);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.05), eyeMat);
    rightEye.position.set(1.25, 1.35, 0.2);
    group.add(rightEye);

    // Blocky legs - 4 pillars
    const legGeom = new THREE.BoxGeometry(0.15, 1, 0.15);
    const legPositions = [
      { x: 0.6, z: 0.25 },
      { x: 0.6, z: -0.25 },
      { x: -0.6, z: 0.25 },
      { x: -0.6, z: -0.25 }
    ];

    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(legGeom, bodyMat);
      leg.position.set(pos.x, 0.5, pos.z);
      this.legs.push(leg);
      group.add(leg);
    });

    // Blocky tail
    const tailMat = new THREE.MeshStandardMaterial({ color: 0x4a3c31 });
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.1), tailMat);
    tail.position.set(-1.1, 1.0, 0);
    tail.rotation.z = Math.PI / 6;
    group.add(tail);

    // Blocky mane
    const maneMat = new THREE.MeshStandardMaterial({ color: 0x4a3c31 });
    for (let i = 0; i < 5; i++) {
      const manePart = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, 0.08), maneMat);
      manePart.position.set(0.8 - i * 0.25, 1.5, 0);
      group.add(manePart);
    }

    group.scale.setScalar(this.config.scale);

    group.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return group;
  }

  update(delta: number, playerPos: THREE.Vector3, obstacles: Obstacle[], terrain: Terrain): void {
    if (this.isTransformed) return;

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
        this.lookAt(playerPos);
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
        if (!this.canSeePlayer(playerPos)) {
          this.state = 'grazing';
          this.setNewGrazeTarget();
        }
        break;
    }

    if (this.velocity.length() > 0.01) {
      const targetRot = Math.atan2(this.velocity.x, this.velocity.z);
      this.rotation = this.lerpAngle(this.rotation, targetRot, delta * 8);
      this.mesh.rotation.y = this.rotation;
    }

    this.updateLegAnimation(delta);

    const groundY = terrain.getHeightAt(this.position.x, this.position.z);
    this.position.y = groundY;

    this.clampToWorldBounds();
  }

  private updateGrazing(delta: number): void {
    const toTarget = this.grazeTarget.clone().sub(this.position);
    const distance = toTarget.length();

    if (distance < 1) {
      this.setNewGrazeTarget();
      return;
    }

    this.velocity.copy(toTarget.normalize().multiplyScalar(this.config.speed * 0.3));
    this.position.add(this.velocity.clone().multiplyScalar(delta));
  }

  private updateFleeing(delta: number, playerPos: THREE.Vector3): void {
    let targetPos: THREE.Vector3;

    if (this.hidingSpot) {
      targetPos = this.hidingSpot;
    } else {
      const awayFromPlayer = this.position.clone().sub(playerPos).normalize();
      targetPos = this.position.clone().add(awayFromPlayer.multiplyScalar(10));
    }

    const toTarget = targetPos.clone().sub(this.position).normalize();
    this.velocity.copy(toTarget.multiplyScalar(this.config.speed));
    this.position.add(this.velocity.clone().multiplyScalar(delta));
  }

  private canSeePlayer(playerPos: THREE.Vector3): boolean {
    const toPlayer = playerPos.clone().sub(this.position);
    const distance = toPlayer.length();

    if (distance > this.config.visionDistance) return false;

    const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      this.rotation
    );
    const dot = forward.dot(toPlayer.normalize());
    const angle = Math.acos(Math.max(-1, Math.min(1, dot)));

    return angle < (this.config.visionAngle * Math.PI / 180) / 2;
  }

  private findHidingSpot(playerPos: THREE.Vector3, obstacles: Obstacle[]): void {
    let bestSpot: THREE.Vector3 | null = null;
    let bestScore = Infinity;

    for (const obstacle of obstacles) {
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

  private setNewGrazeTarget(): void {
    const range = 10;
    this.grazeTarget.set(
      this.position.x + (Math.random() - 0.5) * range,
      0,
      this.position.z + (Math.random() - 0.5) * range
    );
  }

  private lookAt(target: THREE.Vector3): void {
    const direction = target.clone().sub(this.position);
    this.rotation = Math.atan2(direction.x, direction.z);
    this.mesh.rotation.y = this.rotation;
  }

  private updateLegAnimation(delta: number): void {
    const speed = this.velocity.length();

    if (speed < 0.1) {
      this.legs.forEach(leg => {
        leg.rotation.x *= 0.9;
      });
      return;
    }

    // Faster leg animation for galloping feel
    this.legPhase += delta * speed * 5;
    const amplitude = Math.min(0.7, speed * 0.06);

    this.legs[0].rotation.x = Math.sin(this.legPhase) * amplitude;
    this.legs[3].rotation.x = Math.sin(this.legPhase) * amplitude;
    this.legs[1].rotation.x = Math.sin(this.legPhase + Math.PI) * amplitude;
    this.legs[2].rotation.x = Math.sin(this.legPhase + Math.PI) * amplitude;
  }

  private lerpAngle(a: number, b: number, t: number): number {
    let diff = b - a;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    return a + diff * t;
  }

  private clampToWorldBounds(): void {
    const WORLD_HALF = 44;
    this.position.x = Math.max(-WORLD_HALF, Math.min(WORLD_HALF, this.position.x));
    this.position.z = Math.max(-WORLD_HALF, Math.min(WORLD_HALF, this.position.z));
  }

  hit(): boolean {
    this.hitCount++;
    return this.hitCount >= this.config.hitsRequired;
  }

  transform(): void {
    this.isTransformed = true;
    this.addUnicornFeatures();
  }

  private addUnicornFeatures(): void {
    // Change body to pink with magical glow
    const pinkMat = new THREE.MeshStandardMaterial({
      color: 0xff69b4,
      emissive: 0xff1493,
      emissiveIntensity: 0.3,
      metalness: 0.2,
      roughness: 0.5
    });

    // Update all body parts to pink
    this.mesh.traverse(child => {
      if (child instanceof THREE.Mesh && child !== this.horn) {
        const oldMat = child.material as THREE.MeshStandardMaterial;
        if (oldMat.color && oldMat.color.getHex() === this.config.color) {
          child.material = pinkMat;
        }
      }
    });

    // Also update legs
    this.legs.forEach(leg => {
      leg.material = pinkMat;
    });

    // Blocky golden horn
    const hornMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffd700,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2
    });

    this.horn = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.12), hornMat);
    this.horn.position.set(1.15, 1.85, 0);
    this.horn.rotation.z = -Math.PI / 8;
    this.mesh.add(this.horn);

    // Rainbow blocky mane
    const maneColors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x8b00ff];
    maneColors.forEach((color, i) => {
      const manePart = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.25, 0.12),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5 })
      );
      manePart.position.set(0.8 - i * 0.18, 1.6 + Math.sin(i) * 0.1, 0);
      this.mane.push(manePart);
      this.mesh.add(manePart);
    });
  }

  revertToHorse(): void {
    if (!this.isTransformed) return;

    this.isTransformed = false;
    this.hitCount = 0;
    this.state = 'grazing';

    // Remove horn
    if (this.horn) {
      this.mesh.remove(this.horn);
      this.horn = null;
    }

    // Remove rainbow mane
    this.mane.forEach(part => this.mesh.remove(part));
    this.mane = [];

    // Flash white first, then restore color
    const whiteMat = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      emissive: 0xffffff,
      emissiveIntensity: 1
    });
    
    // Set everything to white flash
    this.mesh.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material = whiteMat.clone();
      }
    });
    this.legs.forEach(leg => {
      leg.material = whiteMat.clone();
    });

    // After 200ms, restore original color
    setTimeout(() => {
      const originalMat = new THREE.MeshStandardMaterial({ color: this.config.color });
      this.mesh.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.material = originalMat.clone();
        }
      });
      this.legs.forEach(leg => {
        leg.material = originalMat.clone();
      });
    }, 200);

    this.setNewGrazeTarget();
  }

  setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  }
}
