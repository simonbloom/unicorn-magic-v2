import * as THREE from 'three';

const RAINBOW_COLORS = [
  0xff0000, // Red
  0xff7f00, // Orange
  0xffff00, // Yellow
  0x00ff00, // Green
  0x0000ff, // Blue
  0x4b0082, // Indigo
  0x8b00ff  // Violet
];

export class Rainbow {
  public mesh: THREE.Group;
  public isActive: boolean = true;
  private lifetime: number = 3;
  private fadeStart: number = 2;
  private materials: THREE.MeshStandardMaterial[] = [];

  constructor(position: THREE.Vector3) {
    this.mesh = this.createMesh();
    this.mesh.position.copy(position);
  }

  private createMesh(): THREE.Group {
    const group = new THREE.Group();
    const arcRadius = 4;
    const tubeRadius = 0.15;
    const segments = 32;

    RAINBOW_COLORS.forEach((color, i) => {
      const radius = arcRadius - i * 0.35;
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 1
      });
      this.materials.push(mat);

      // Create arc using boxes for Minecraft style
      for (let j = 0; j < segments; j++) {
        const angle = (j / segments) * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(tubeRadius * 2, tubeRadius * 2, tubeRadius * 2),
          mat
        );
        box.position.set(x, y + 0.5, 0);
        group.add(box);
      }
    });

    // Add sparkles
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < 20; i++) {
      const sparkle = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.1),
        sparkleMat
      );
      const angle = Math.random() * Math.PI;
      const radius = 1 + Math.random() * 3;
      sparkle.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius + 0.5,
        (Math.random() - 0.5) * 0.5
      );
      sparkle.userData.sparklePhase = Math.random() * Math.PI * 2;
      group.add(sparkle);
    }

    group.rotation.y = Math.random() * Math.PI * 2;
    return group;
  }

  update(delta: number): void {
    this.lifetime -= delta;

    if (this.lifetime <= 0) {
      this.isActive = false;
      return;
    }

    // Fade out
    if (this.lifetime < this.fadeStart) {
      const opacity = this.lifetime / this.fadeStart;
      this.materials.forEach(mat => {
        mat.opacity = opacity;
      });
    }

    // Animate sparkles
    this.mesh.children.forEach(child => {
      if (child.userData.sparklePhase !== undefined) {
        child.userData.sparklePhase += delta * 5;
        const scale = 0.5 + Math.sin(child.userData.sparklePhase) * 0.5;
        child.scale.setScalar(scale);
      }
    });

    // Slow rotation
    this.mesh.rotation.y += delta * 0.2;
  }
}

export class RainbowManager {
  private rainbows: Rainbow[] = [];
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  spawn(position: THREE.Vector3): void {
    const rainbow = new Rainbow(position);
    this.rainbows.push(rainbow);
    this.scene.add(rainbow.mesh);
  }

  update(delta: number): void {
    this.rainbows.forEach(rainbow => rainbow.update(delta));

    // Remove inactive rainbows
    this.rainbows = this.rainbows.filter(rainbow => {
      if (!rainbow.isActive) {
        this.scene.remove(rainbow.mesh);
        return false;
      }
      return true;
    });
  }
}
