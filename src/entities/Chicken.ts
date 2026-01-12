import * as THREE from 'three';
import { Terrain } from './Terrain';

export class Egg {
  public mesh: THREE.Group;
  public position: THREE.Vector3;
  public isActive: boolean = true;
  private direction: THREE.Vector3;
  private speed: number = 12;
  private lifetime: number = 5;
  private rotationSpeed: number;

  constructor(startPos: THREE.Vector3, targetPos: THREE.Vector3) {
    this.position = startPos.clone();
    this.direction = targetPos.clone().sub(startPos).normalize();
    this.rotationSpeed = 5 + Math.random() * 5;
    this.mesh = this.createMesh();
    this.mesh.position.copy(this.position);
  }

  private createMesh(): THREE.Group {
    const group = new THREE.Group();

    // Blocky egg shape
    const eggMat = new THREE.MeshStandardMaterial({ color: 0xfff8dc });
    const eggBody = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.35, 0.25), eggMat);
    group.add(eggBody);

    // Spots
    const spotMat = new THREE.MeshStandardMaterial({ color: 0xdeb887 });
    const spot1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.05), spotMat);
    spot1.position.set(0.1, 0.05, 0.12);
    group.add(spot1);

    const spot2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.05), spotMat);
    spot2.position.set(-0.08, -0.08, 0.12);
    group.add(spot2);

    return group;
  }

  update(delta: number): void {
    this.position.addScaledVector(this.direction, this.speed * delta);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.x += delta * this.rotationSpeed;
    this.mesh.rotation.z += delta * this.rotationSpeed * 0.7;

    this.lifetime -= delta;
    if (this.lifetime <= 0) {
      this.isActive = false;
    }
  }

  checkCollision(targetPos: THREE.Vector3, radius: number): boolean {
    const dx = this.position.x - targetPos.x;
    const dz = this.position.z - targetPos.z;
    return Math.sqrt(dx * dx + dz * dz) < radius;
  }

  deactivate(): void {
    this.isActive = false;
  }
}

export class Chicken {
  public mesh: THREE.Group;
  public position: THREE.Vector3;
  public collisionRadius: number = 0.5;
  public isAlive: boolean = true;
  public isRoasted: boolean = false;

  private velocity: THREE.Vector3 = new THREE.Vector3();
  private rotation: number = 0;
  private wanderTarget: THREE.Vector3 = new THREE.Vector3();
  private wanderTimer: number = 0;
  private throwTimer: number = 0;
  private throwCooldown: number = 3;
  private speed: number = 3;
  private wings: THREE.Mesh[] = [];
  private wingPhase: number = 0;
  private isFlapping: boolean = false;
  private flapTimer: number = 0;

  constructor() {
    this.mesh = this.createMesh();
    this.position = this.mesh.position;
    this.setNewWanderTarget();
    this.throwTimer = Math.random() * this.throwCooldown;
  }

  private createMesh(): THREE.Group {
    const group = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const beakMat = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const combMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x000000 });

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.6), bodyMat);
    body.position.y = 0.35;
    group.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), bodyMat);
    head.position.set(0, 0.65, 0.25);
    group.add(head);

    // Beak
    const beak = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.15), beakMat);
    beak.position.set(0, 0.6, 0.45);
    group.add(beak);

    // Comb
    const comb = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 0.2), combMat);
    comb.position.set(0, 0.85, 0.25);
    group.add(comb);

    // Wattle
    const wattle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 0.06), combMat);
    wattle.position.set(0, 0.52, 0.4);
    group.add(wattle);

    // Eyes
    const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.05), eyeMat);
    leftEye.position.set(-0.1, 0.7, 0.4);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.05), eyeMat);
    rightEye.position.set(0.1, 0.7, 0.4);
    group.add(rightEye);

    // Wings
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5 });
    const leftWing = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 0.35), wingMat);
    leftWing.position.set(-0.3, 0.4, 0);
    this.wings.push(leftWing);
    group.add(leftWing);

    const rightWing = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 0.35), wingMat);
    rightWing.position.set(0.3, 0.4, 0);
    this.wings.push(rightWing);
    group.add(rightWing);

    // Tail
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, 0.1), bodyMat);
    tail.position.set(0, 0.45, -0.35);
    tail.rotation.x = -0.3;
    group.add(tail);

    // Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.06), legMat);
    leftLeg.position.set(-0.12, 0.1, 0);
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.06), legMat);
    rightLeg.position.set(0.12, 0.1, 0);
    group.add(rightLeg);

    // Feet
    const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.15), legMat);
    leftFoot.position.set(-0.12, 0.02, 0.03);
    group.add(leftFoot);

    const rightFoot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.15), legMat);
    rightFoot.position.set(0.12, 0.02, 0.03);
    group.add(rightFoot);

    group.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    return group;
  }

  update(delta: number, playerPos: THREE.Vector3, terrain: Terrain): Egg | null {
    let egg: Egg | null = null;

    // Wander behavior
    this.wanderTimer += delta;
    if (this.wanderTimer > 3) {
      this.setNewWanderTarget();
      this.wanderTimer = 0;
    }

    const toTarget = this.wanderTarget.clone().sub(this.position);
    toTarget.y = 0;
    const dist = toTarget.length();

    if (dist > 1) {
      this.velocity.copy(toTarget.normalize().multiplyScalar(this.speed));
      this.position.addScaledVector(this.velocity, delta);

      const targetRot = Math.atan2(this.velocity.x, this.velocity.z);
      this.rotation = this.lerpAngle(this.rotation, targetRot, delta * 5);
      this.mesh.rotation.y = this.rotation;
    }

    // Throw egg at player
    this.throwTimer += delta;
    if (this.throwTimer >= this.throwCooldown) {
      this.throwTimer = 0;
      this.throwCooldown = 2.5 + Math.random() * 2;
      
      // Face player and throw
      const toPlayer = playerPos.clone().sub(this.position);
      this.rotation = Math.atan2(toPlayer.x, toPlayer.z);
      this.mesh.rotation.y = this.rotation;
      
      // Start flapping animation
      this.isFlapping = true;
      this.flapTimer = 0;

      // Create egg
      const eggStart = this.position.clone();
      eggStart.y += 0.6;
      egg = new Egg(eggStart, playerPos);
    }

    // Wing flapping animation
    if (this.isFlapping) {
      this.flapTimer += delta;
      this.wingPhase += delta * 20;
      const flapAngle = Math.sin(this.wingPhase) * 0.5;
      this.wings[0].rotation.z = flapAngle;
      this.wings[1].rotation.z = -flapAngle;

      if (this.flapTimer > 0.5) {
        this.isFlapping = false;
        this.wings[0].rotation.z = 0;
        this.wings[1].rotation.z = 0;
      }
    }

    // Ground following
    const groundY = terrain.getHeightAt(this.position.x, this.position.z);
    this.position.y = groundY;

    this.clampToWorldBounds();

    return egg;
  }

  private setNewWanderTarget(): void {
    const range = 15;
    this.wanderTarget.set(
      this.position.x + (Math.random() - 0.5) * range,
      0,
      this.position.z + (Math.random() - 0.5) * range
    );
  }

  private lerpAngle(a: number, b: number, t: number): number {
    let diff = b - a;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    return a + diff * t;
  }

  private clampToWorldBounds(): void {
    const WORLD_HALF = 40;
    this.position.x = Math.max(-WORLD_HALF, Math.min(WORLD_HALF, this.position.x));
    this.position.z = Math.max(-WORLD_HALF, Math.min(WORLD_HALF, this.position.z));
  }

  setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  }

  roast(): void {
    if (!this.isAlive || this.isRoasted) return;

    this.isAlive = false;
    this.isRoasted = true;

    // Remove all children and replace with roast chicken mesh
    while (this.mesh.children.length > 0) {
      this.mesh.remove(this.mesh.children[0]);
    }

    // Create roast chicken - golden brown blocky chicken on a plate
    const roastMat = new THREE.MeshStandardMaterial({ 
      color: 0xcd853f,
      roughness: 0.6,
      metalness: 0.1
    });

    // Roasted body (lying on side)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.5), roastMat);
    body.position.y = 0.25;
    body.rotation.z = Math.PI / 2;
    this.mesh.add(body);

    // Drumsticks
    const drumstick1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.12), roastMat);
    drumstick1.position.set(-0.25, 0.15, 0.2);
    drumstick1.rotation.z = 0.5;
    this.mesh.add(drumstick1);

    const drumstick2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.12), roastMat);
    drumstick2.position.set(-0.25, 0.15, -0.2);
    drumstick2.rotation.z = 0.5;
    this.mesh.add(drumstick2);

    // Bone tips (white)
    const boneMat = new THREE.MeshStandardMaterial({ color: 0xfff8dc });
    const bone1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.06), boneMat);
    bone1.position.set(-0.35, 0.05, 0.2);
    this.mesh.add(bone1);

    const bone2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.06), boneMat);
    bone2.position.set(-0.35, 0.05, -0.2);
    this.mesh.add(bone2);

    // Crispy skin highlights
    const crispyMat = new THREE.MeshStandardMaterial({ color: 0xdaa520 });
    const crispy1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.15), crispyMat);
    crispy1.position.set(0.15, 0.45, 0);
    this.mesh.add(crispy1);

    const crispy2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.1), crispyMat);
    crispy2.position.set(-0.1, 0.42, 0.1);
    this.mesh.add(crispy2);

    // Plate
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.7), plateMat);
    plate.position.y = 0.025;
    this.mesh.add(plate);

    // Garnish (green herbs)
    const herbMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    for (let i = 0; i < 4; i++) {
      const herb = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.08), herbMat);
      herb.position.set(
        (Math.random() - 0.5) * 0.6,
        0.06,
        (Math.random() - 0.5) * 0.4
      );
      this.mesh.add(herb);
    }

    // Steam particles (simple boxes going up)
    const steamMat = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.5 
    });
    for (let i = 0; i < 3; i++) {
      const steam = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 0.08), steamMat);
      steam.position.set(
        (Math.random() - 0.5) * 0.3,
        0.5 + i * 0.15,
        (Math.random() - 0.5) * 0.2
      );
      this.mesh.add(steam);
    }

    this.mesh.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  checkCollision(targetPos: THREE.Vector3, radius: number): boolean {
    if (!this.isAlive) return false;
    const dx = this.position.x - targetPos.x;
    const dz = this.position.z - targetPos.z;
    return Math.sqrt(dx * dx + dz * dz) < radius + this.collisionRadius;
  }
}
