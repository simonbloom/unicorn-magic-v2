import * as THREE from 'three';

interface Particle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  lifetime: number;
  maxLifetime: number;
  active: boolean;
  configType: string;
}

interface ParticleConfig {
  count: number;
  lifetime: number;
  size: number;
  colors: number[];
  speed: number;
  gravity: number;
  fadeOut: boolean;
}

const CONFIGS: Record<string, ParticleConfig> = {
  heartTrail: {
    count: 100,
    lifetime: 0.5,
    size: 0.1,
    colors: [0xff69b4, 0xffb6c1],
    speed: 0.5,
    gravity: -0.5,
    fadeOut: true
  },
  starburst: {
    count: 200,
    lifetime: 1,
    size: 0.15,
    colors: [0xff69b4, 0xffd700, 0xffffff, 0x87ceeb],
    speed: 5,
    gravity: 2,
    fadeOut: true
  },
  transformation: {
    count: 300,
    lifetime: 1.5,
    size: 0.2,
    colors: [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x8b00ff],
    speed: 3,
    gravity: -1,
    fadeOut: true
  },
  muzzleFlash: {
    count: 50,
    lifetime: 0.3,
    size: 0.08,
    colors: [0xff69b4, 0xffd700],
    speed: 3,
    gravity: 0,
    fadeOut: true
  },
  confetti: {
    count: 200,
    lifetime: 3,
    size: 0.35,
    colors: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xff8800, 0xff69b4],
    speed: 10,
    gravity: 5,
    fadeOut: true
  },
  eggSplat: {
    count: 80,
    lifetime: 1.5,
    size: 0.25,
    colors: [0xffff00, 0xfff8dc, 0xffa500, 0xffcc00],
    speed: 7,
    gravity: 6,
    fadeOut: true
  },
  smoke: {
    count: 100,
    lifetime: 1.5,
    size: 0.5,
    colors: [0x888888, 0xaaaaaa, 0xcccccc, 0x666666, 0xffffff],
    speed: 4,
    gravity: -3,
    fadeOut: true
  },
  revert: {
    count: 150,
    lifetime: 1.2,
    size: 0.3,
    colors: [0x8b4513, 0xa0522d, 0xd2691e, 0xffffff, 0x888888, 0xffff00],
    speed: 7,
    gravity: 4,
    fadeOut: true
  },
  chickenPoof: {
    count: 60,
    lifetime: 1,
    size: 0.15,
    colors: [0xffffff, 0xfff8dc, 0xffa500, 0xff6600],
    speed: 4,
    gravity: 2,
    fadeOut: true
  }
};

export class ParticleSystem {
  private scene: THREE.Scene;
  private particles: Particle[] = [];
  private pool: Particle[] = [];
  private readonly POOL_SIZE = 1000;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.initPool();
  }

  private initPool(): void {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true
    });

    for (let i = 0; i < this.POOL_SIZE; i++) {
      const mesh = new THREE.Mesh(geometry.clone(), material.clone());
      mesh.visible = false;
      this.scene.add(mesh);

      this.pool.push({
        mesh,
        velocity: new THREE.Vector3(),
        lifetime: 0,
        maxLifetime: 1,
        active: false,
        configType: ''
      });
    }
  }

  private getParticle(): Particle | null {
    for (const p of this.pool) {
      if (!p.active) {
        return p;
      }
    }
    return null;
  }

  emit(type: string, position: THREE.Vector3, count?: number): void {
    const config = CONFIGS[type];
    if (!config) {
      console.warn('Unknown particle type:', type);
      return;
    }

    const emitCount = count ?? config.count;

    for (let i = 0; i < emitCount; i++) {
      const particle = this.getParticle();
      if (!particle) break;

      particle.active = true;
      particle.configType = type;
      particle.mesh.visible = true;
      
      // Position at entity center (Y + 1.5 to be at body height)
      particle.mesh.position.set(
        position.x + (Math.random() - 0.5) * 0.5,
        position.y + 1.5 + Math.random() * 0.5,
        position.z + (Math.random() - 0.5) * 0.5
      );
      
      particle.lifetime = config.lifetime * (0.7 + Math.random() * 0.6);
      particle.maxLifetime = particle.lifetime;

      // Explode outward in all directions
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.8; // Bias upward
      particle.velocity.set(
        Math.sin(phi) * Math.cos(theta) * config.speed * (0.7 + Math.random() * 0.6),
        Math.abs(Math.cos(phi)) * config.speed * (0.5 + Math.random()),
        Math.sin(phi) * Math.sin(theta) * config.speed * (0.7 + Math.random() * 0.6)
      );

      const color = config.colors[Math.floor(Math.random() * config.colors.length)];
      (particle.mesh.material as THREE.MeshBasicMaterial).color.setHex(color);
      (particle.mesh.material as THREE.MeshBasicMaterial).opacity = 1;

      // Bigger particles
      particle.mesh.scale.setScalar(config.size * (0.8 + Math.random() * 0.4));
      particle.mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      this.particles.push(particle);
    }
  }

  update(delta: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.lifetime -= delta;

      if (p.lifetime <= 0) {
        p.active = false;
        p.mesh.visible = false;
        this.particles.splice(i, 1);
        continue;
      }

      p.mesh.position.add(p.velocity.clone().multiplyScalar(delta));

      // Use correct gravity for this particle type
      const config = CONFIGS[p.configType];
      if (config) {
        p.velocity.y -= config.gravity * delta;
      }

      // Spin the particle
      p.mesh.rotation.x += delta * 3;
      p.mesh.rotation.z += delta * 2;

      const progress = 1 - (p.lifetime / p.maxLifetime);
      (p.mesh.material as THREE.MeshBasicMaterial).opacity = 1 - progress;
      
      const baseSize = config ? config.size : 0.15;
      p.mesh.scale.setScalar(baseSize * (1 - progress * 0.5));
    }
  }
}
