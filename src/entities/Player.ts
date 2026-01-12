import * as THREE from 'three';
import { Terrain } from './Terrain';
import { screenToWorld } from '../utils/math';

const PLAYER_MAX_SPEED = 16;
const PLAYER_MIN_SPEED = 3;
const ACCELERATION = 30;
const DECELERATION = 40;
const COLLISION_RADIUS = 0.4;

export class Player {
  public mesh: THREE.Group;
  public position: THREE.Vector3;
  public facingDirection: THREE.Vector3 = new THREE.Vector3(0, 0, 1);
  public collisionRadius: number = COLLISION_RADIUS;

  private walkPhase: number = 0;
  private blinkTimer: number = 0;
  private blinkInterval: number = 4;
  private isBlinking: boolean = false;
  private currentSpeed: number = 0;
  private targetPosition: THREE.Vector3 | null = null;
  private isMovingToTarget: boolean = false;

  private head!: THREE.Group;
  private leftLeg!: THREE.Mesh;
  private rightLeg!: THREE.Mesh;
  private leftArm!: THREE.Mesh;
  private leftEye!: THREE.Mesh;
  private rightEye!: THREE.Mesh;

  constructor() {
    this.mesh = this.createMesh();
    this.position = this.mesh.position;
  }

  private createMesh(): THREE.Group {
    const group = new THREE.Group();

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffe4c4 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0xf4d03f });
    const dressMat = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x4169e1 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0xff1493 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.6, roughness: 0.3 });

    this.head = new THREE.Group();

    // Blocky head
    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), skinMat);
    this.head.add(headMesh);

    // Blocky eyes - flat boxes on face
    this.leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.05), eyeMat);
    this.leftEye.position.set(-0.12, 0.05, 0.3);
    this.head.add(this.leftEye);

    this.rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.05), eyeMat);
    this.rightEye.position.set(0.12, 0.05, 0.3);
    this.head.add(this.rightEye);

    // Eye highlights
    const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftHighlight = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.02), highlightMat);
    leftHighlight.position.set(-0.08, 0.08, 0.33);
    this.head.add(leftHighlight);

    const rightHighlight = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.02), highlightMat);
    rightHighlight.position.set(0.16, 0.08, 0.33);
    this.head.add(rightHighlight);

    // Blocky blush
    const blushMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, transparent: true, opacity: 0.7 });
    const leftBlush = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.02), blushMat);
    leftBlush.position.set(-0.22, -0.05, 0.3);
    this.head.add(leftBlush);

    const rightBlush = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.02), blushMat);
    rightBlush.position.set(0.22, -0.05, 0.3);
    this.head.add(rightBlush);

    // Blocky hair cap
    const hairCap = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.35, 0.65), hairMat);
    hairCap.position.set(0, 0.2, 0);
    this.head.add(hairCap);

    // Blocky bangs
    const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.1), hairMat);
    bangs.position.set(0, 0.15, 0.3);
    this.head.add(bangs);

    // Blocky pigtails
    const createPigtail = (side: number) => {
      const pigtail = new THREE.Group();
      const mainBlock = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), hairMat);
      pigtail.add(mainBlock);

      const secondBlock = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), hairMat);
      secondBlock.position.set(side * 0.08, -0.22, 0);
      pigtail.add(secondBlock);

      const tieMat = new THREE.MeshStandardMaterial({ color: 0xff69b4 });
      const tie = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.12), tieMat);
      tie.position.set(0, 0.08, 0);
      pigtail.add(tie);

      pigtail.position.set(side * 0.4, 0, 0);
      return pigtail;
    };

    this.head.add(createPigtail(-1));
    this.head.add(createPigtail(1));

    // Blocky crown
    const crown = new THREE.Group();
    const crownBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.15), goldMat);
    crown.add(crownBase);

    [-0.12, 0, 0.12].forEach(x => {
      const peak = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.1), goldMat);
      peak.position.set(x, 0.1, 0);
      crown.add(peak);
    });

    crown.position.set(0, 0.38, 0.1);
    this.head.add(crown);

    this.head.position.y = 1.5;
    group.add(this.head);

    // Blocky dress/body
    const dressTop = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.3), dressMat);
    dressTop.position.y = 1.05;
    group.add(dressTop);

    const dressBottom = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.4), dressMat);
    dressBottom.position.y = 0.72;
    group.add(dressBottom);

    // Blocky arms
    this.leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.35, 0.12), skinMat);
    this.leftArm.position.set(-0.3, 1.0, 0);
    group.add(this.leftArm);

    const rightArmGroup = new THREE.Group();
    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.35, 0.12), skinMat);
    rightArm.position.y = -0.1;
    rightArmGroup.add(rightArm);

    const gun = this.createGun();
    gun.position.set(0, -0.3, 0.15);
    gun.rotation.x = Math.PI / 2;
    rightArmGroup.add(gun);

    rightArmGroup.position.set(0.3, 1.05, 0);
    rightArmGroup.rotation.x = -0.3;
    group.add(rightArmGroup);

    // Blocky legs
    this.leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.4, 0.14), skinMat);
    this.leftLeg.position.set(-0.12, 0.35, 0);
    group.add(this.leftLeg);

    this.rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.4, 0.14), skinMat);
    this.rightLeg.position.set(0.12, 0.35, 0);
    group.add(this.rightLeg);

    // Blocky feet
    const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.18), shoeMat);
    leftFoot.position.set(-0.12, 0.12, 0.02);
    group.add(leftFoot);

    const rightFoot = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.18), shoeMat);
    rightFoot.position.set(0.12, 0.12, 0.02);
    group.add(rightFoot);

    group.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return group;
  }

  private createGun(): THREE.Group {
    const gun = new THREE.Group();

    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xff1493, metalness: 0.4, roughness: 0.5 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.7, roughness: 0.3 });
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xff69b4,
      emissive: 0xff69b4,
      emissiveIntensity: 0.5
    });

    // Blocky gun body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.25), pinkMat);
    gun.add(body);

    // Blocky barrel
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.08), heartMat);
    barrel.position.z = 0.15;
    gun.add(barrel);

    // Gold trim blocks
    const trim1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.02), goldMat);
    trim1.position.z = 0.05;
    gun.add(trim1);

    const trim2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.02), goldMat);
    trim2.position.z = -0.05;
    gun.add(trim2);

    // Blocky grip
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 0.06), pinkMat);
    grip.position.set(0, -0.08, -0.02);
    gun.add(grip);

    gun.scale.setScalar(0.8);
    return gun;
  }

  move(direction: THREE.Vector2, delta: number): void {
    if (direction.lengthSq() === 0) {
      // Decelerate when no input
      this.currentSpeed = Math.max(0, this.currentSpeed - DECELERATION * delta);
      this.updateWalkAnimation(delta, this.currentSpeed);
      return;
    }

    // Accelerate
    if (this.currentSpeed < PLAYER_MIN_SPEED) {
      this.currentSpeed = PLAYER_MIN_SPEED;
    }
    this.currentSpeed = Math.min(PLAYER_MAX_SPEED, this.currentSpeed + ACCELERATION * delta);

    const worldDir = screenToWorld(direction);

    this.position.x += worldDir.x * this.currentSpeed * delta;
    this.position.z += worldDir.z * this.currentSpeed * delta;

    this.facingDirection.copy(worldDir);
    this.mesh.rotation.y = Math.atan2(worldDir.x, worldDir.z);

    this.updateWalkAnimation(delta, this.currentSpeed);
  }

  setMoveTarget(target: THREE.Vector3 | null): void {
    this.targetPosition = target;
    this.isMovingToTarget = target !== null;
  }

  updateMovement(delta: number): void {
    if (!this.isMovingToTarget || !this.targetPosition) {
      // Decelerate when not moving to target
      if (this.currentSpeed > 0) {
        this.currentSpeed = Math.max(0, this.currentSpeed - DECELERATION * delta);
        this.updateWalkAnimation(delta, this.currentSpeed);
      }
      return;
    }

    // Calculate direction to target
    const dx = this.targetPosition.x - this.position.x;
    const dz = this.targetPosition.z - this.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    // Stop if very close to target
    if (distance < 0.5) {
      this.currentSpeed = Math.max(0, this.currentSpeed - DECELERATION * delta);
      this.updateWalkAnimation(delta, this.currentSpeed);
      return;
    }

    // Accelerate (start slow, get faster)
    if (this.currentSpeed < PLAYER_MIN_SPEED) {
      this.currentSpeed = PLAYER_MIN_SPEED;
    }
    this.currentSpeed = Math.min(PLAYER_MAX_SPEED, this.currentSpeed + ACCELERATION * delta);

    // Normalize direction
    const dirX = dx / distance;
    const dirZ = dz / distance;

    // Move toward target
    this.position.x += dirX * this.currentSpeed * delta;
    this.position.z += dirZ * this.currentSpeed * delta;

    // Update facing direction
    this.facingDirection.set(dirX, 0, dirZ);
    this.mesh.rotation.y = Math.atan2(dirX, dirZ);

    this.updateWalkAnimation(delta, this.currentSpeed);
  }

  stopMoving(): void {
    this.isMovingToTarget = false;
    this.targetPosition = null;
  }

  private updateWalkAnimation(delta: number, speed: number): void {
    if (speed > 0.5) {
      // Much faster leg animation for running feel
      this.walkPhase += delta * speed * 1.8;
      const amplitude = Math.min(0.8, speed * 0.05);

      this.leftLeg.rotation.x = Math.sin(this.walkPhase) * amplitude;
      this.rightLeg.rotation.x = Math.sin(this.walkPhase + Math.PI) * amplitude;
      this.leftArm.rotation.x = Math.sin(this.walkPhase + Math.PI) * amplitude * 0.8;
      this.head.position.y = 1.5 + Math.abs(Math.sin(this.walkPhase * 2)) * 0.06;
    } else {
      this.leftLeg.rotation.x *= 0.9;
      this.rightLeg.rotation.x *= 0.9;
      this.leftArm.rotation.x *= 0.9;
    }
  }

  update(delta: number, terrain: Terrain): void {
    this.updateBlink(delta);

    const groundY = terrain.getHeightAt(this.position.x, this.position.z);
    this.position.y = groundY;

    this.clampToWorldBounds();
  }

  private updateBlink(delta: number): void {
    this.blinkTimer += delta;

    if (!this.isBlinking && this.blinkTimer > this.blinkInterval) {
      this.isBlinking = true;
      this.blinkTimer = 0;
      this.blinkInterval = 3 + Math.random() * 2;
    }

    if (this.isBlinking) {
      const blinkDuration = 0.15;
      const t = this.blinkTimer / blinkDuration;

      let eyeScale = 1;
      if (t < 0.3) {
        eyeScale = 1 - t * 3;
      } else if (t < 0.7) {
        eyeScale = 0.1;
      } else if (t < 1) {
        eyeScale = 0.1 + (t - 0.7) * 3;
      } else {
        eyeScale = 1;
        this.isBlinking = false;
      }

      this.leftEye.scale.y = eyeScale;
      this.rightEye.scale.y = eyeScale;
    }
  }

  private clampToWorldBounds(): void {
    const WORLD_HALF = 44;
    this.position.x = Math.max(-WORLD_HALF, Math.min(WORLD_HALF, this.position.x));
    this.position.z = Math.max(-WORLD_HALF, Math.min(WORLD_HALF, this.position.z));
  }

  setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  }
}
