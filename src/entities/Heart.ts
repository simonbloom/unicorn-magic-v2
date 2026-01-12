import * as THREE from 'three';

const HEART_SPEED = 25;
const HEART_LIFETIME = 3;

export class Heart {
  public mesh: THREE.Group;
  public position: THREE.Vector3;
  public isActive: boolean = true;
  public isHoming: boolean = false;

  private direction: THREE.Vector3;
  private lifetime: number = HEART_LIFETIME;
  private pulsePhase: number = 0;
  private innerHeart!: THREE.Mesh;
  private homingTarget: THREE.Vector3 | null = null;

  constructor(startPos: THREE.Vector3, direction: THREE.Vector3, isHoming: boolean = false) {
    this.position = startPos.clone();
    this.direction = direction.clone().normalize();
    this.isHoming = isHoming;
    this.mesh = this.createMesh();
    this.mesh.position.copy(this.position);
  }

  private createMesh(): THREE.Group {
    const group = new THREE.Group();

    // Larger heart shape
    const heartShape = new THREE.Shape();
    const x = 0, y = 0, s = 0.5;

    heartShape.moveTo(x, y + s * 0.5);
    heartShape.bezierCurveTo(x, y + s * 0.5, x - s * 0.5, y + s * 0.8, x - s * 0.5, y + s * 0.5);
    heartShape.bezierCurveTo(x - s * 0.5, y + s * 0.2, x, y, x, y - s * 0.5);
    heartShape.bezierCurveTo(x, y, x + s * 0.5, y + s * 0.2, x + s * 0.5, y + s * 0.5);
    heartShape.bezierCurveTo(x + s * 0.5, y + s * 0.8, x, y + s * 0.5, x, y + s * 0.5);

    const geometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.25,
      bevelEnabled: true,
      bevelSize: 0.05,
      bevelThickness: 0.05
    });
    geometry.center();

    // Bright vibrant pink with strong glow
    const material = new THREE.MeshStandardMaterial({
      color: 0xff1493,
      emissive: 0xff1493,
      emissiveIntensity: 1.5,
      metalness: 0.5,
      roughness: 0.2
    });

    this.innerHeart = new THREE.Mesh(geometry, material);
    this.innerHeart.castShadow = true;
    group.add(this.innerHeart);

    // Outer glow layer
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff69b4,
      transparent: true,
      opacity: 0.4,
      side: THREE.BackSide
    });
    const glowHeart = new THREE.Mesh(geometry.clone(), glowMaterial);
    glowHeart.scale.setScalar(1.3);
    group.add(glowHeart);

    // Add sparkle points
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < 4; i++) {
      const sparkle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), sparkleMat);
      const angle = (i / 4) * Math.PI * 2;
      sparkle.position.set(Math.cos(angle) * 0.35, Math.sin(angle) * 0.35, 0.15);
      group.add(sparkle);
    }

    return group;
  }

  update(delta: number): void {
    // Homing behavior - curve toward target
    if (this.isHoming && this.homingTarget) {
      const toTarget = new THREE.Vector3()
        .subVectors(this.homingTarget, this.position)
        .normalize();
      
      // Gradually turn toward target (lerp direction)
      const turnSpeed = 3 * delta;
      this.direction.lerp(toTarget, turnSpeed).normalize();
    }

    this.position.addScaledVector(this.direction, HEART_SPEED * delta);
    this.mesh.position.copy(this.position);
    
    // Spinning rotation
    this.mesh.rotation.z += delta * 8;
    this.mesh.rotation.y += delta * 3;
    
    // Pulsing scale effect
    this.pulsePhase += delta * 12;
    const pulse = 1 + Math.sin(this.pulsePhase) * 0.15;
    this.innerHeart.scale.setScalar(pulse);

    this.lifetime -= delta;
    if (this.lifetime <= 0) {
      this.isActive = false;
    }
  }

  setHomingTarget(target: THREE.Vector3): void {
    this.homingTarget = target;
  }

  checkCollision(targetPos: THREE.Vector3, radius: number): boolean {
    const dx = this.position.x - targetPos.x;
    const dz = this.position.z - targetPos.z;
    const distance2D = Math.sqrt(dx * dx + dz * dz);
    return distance2D < radius;
  }

  deactivate(): void {
    this.isActive = false;
  }
}
