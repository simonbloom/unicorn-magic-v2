import * as THREE from 'three';

const TERRAIN_SIZE = 200;
const TERRAIN_SEGMENTS = 100;

export class Terrain {
  public mesh: THREE.Mesh;
  private material: THREE.MeshStandardMaterial;

  constructor(color: number = 0x7cba5f) {
    this.material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.8,
      metalness: 0.1
    });
    this.mesh = this.createMesh();
  }

  setColor(color: number): void {
    this.material.color.setHex(color);
  }

  private createMesh(): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, TERRAIN_SEGMENTS, TERRAIN_SEGMENTS);

    const positions = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      const height = this.calculateHeight(x, y);
      positions[i + 2] = height;
    }

    geometry.computeVertexNormals();

    const terrain = new THREE.Mesh(geometry, this.material);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;

    return terrain;
  }

  private calculateHeight(x: number, z: number): number {
    return Math.sin(x * 0.05) * Math.cos(z * 0.05) * 3 +
           Math.sin(x * 0.1 + 1) * Math.cos(z * 0.08) * 1.5 +
           Math.sin(x * 0.02) * Math.cos(z * 0.03) * 5;
  }

  getHeightAt(x: number, z: number): number {
    return this.calculateHeight(x, z);
  }
}
