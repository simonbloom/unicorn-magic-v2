import * as THREE from 'three';

const CAMERA_CONFIG = {
  angle: Math.PI / 4,
  pitch: Math.PI / 5,
  distance: 12,
  followSpeed: 5,
  fov: 50
};

export class IsometricCamera {
  public camera: THREE.PerspectiveCamera;
  private targetPosition: THREE.Vector3 = new THREE.Vector3();

  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      CAMERA_CONFIG.fov,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.set(
      Math.sin(CAMERA_CONFIG.angle) * CAMERA_CONFIG.distance,
      CAMERA_CONFIG.distance * Math.tan(CAMERA_CONFIG.pitch),
      Math.cos(CAMERA_CONFIG.angle) * CAMERA_CONFIG.distance
    );
    this.camera.lookAt(0, 0, 0);
  }

  follow(target: THREE.Vector3, delta: number): void {
    this.targetPosition.set(
      target.x + Math.sin(CAMERA_CONFIG.angle) * CAMERA_CONFIG.distance,
      CAMERA_CONFIG.distance * Math.tan(CAMERA_CONFIG.pitch),
      target.z + Math.cos(CAMERA_CONFIG.angle) * CAMERA_CONFIG.distance
    );

    this.camera.position.lerp(this.targetPosition, delta * CAMERA_CONFIG.followSpeed);
    this.camera.lookAt(target.x, target.y + 1, target.z);
  }

  handleResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }
}
