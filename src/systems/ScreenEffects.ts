import * as THREE from 'three';

export class ScreenEffects {
  private camera: THREE.PerspectiveCamera;
  private originalPosition: THREE.Vector3 = new THREE.Vector3();
  
  private shakeIntensity: number = 0;
  private shakeDuration: number = 0;
  private shakeElapsed: number = 0;
  private isShaking: boolean = false;

  private slowMoActive: boolean = false;
  private slowMoDuration: number = 0;
  private slowMoElapsed: number = 0;
  private targetTimeScale: number = 1;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  shake(intensity: number, duration: number): void {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
    this.shakeElapsed = 0;
    this.isShaking = true;
    this.originalPosition.copy(this.camera.position);
  }

  triggerSlowMo(): void {
    this.slowMoActive = true;
    this.targetTimeScale = 0.2;
    this.slowMoDuration = 2.0;
    this.slowMoElapsed = 0;
  }

  update(realDelta: number): number {
    if (this.isShaking) {
      this.updateShake(realDelta);
    }

    let gameDelta = realDelta;

    if (this.slowMoActive) {
      this.slowMoElapsed += realDelta;

      if (this.slowMoElapsed < this.slowMoDuration) {
        const progress = this.slowMoElapsed / this.slowMoDuration;
        const currentScale = this.lerp(this.targetTimeScale, 1.0, this.easeOutQuad(progress));
        gameDelta = realDelta * currentScale;
      } else {
        this.slowMoActive = false;
      }
    }

    return gameDelta;
  }

  private updateShake(delta: number): void {
    this.shakeElapsed += delta;

    if (this.shakeElapsed >= this.shakeDuration) {
      this.isShaking = false;
      return;
    }

    const progress = this.shakeElapsed / this.shakeDuration;
    const currentIntensity = this.shakeIntensity * (1 - progress);

    const offsetX = (Math.random() - 0.5) * currentIntensity;
    const offsetY = (Math.random() - 0.5) * currentIntensity;
    const offsetZ = (Math.random() - 0.5) * currentIntensity;

    this.camera.position.x += offsetX;
    this.camera.position.y += offsetY;
    this.camera.position.z += offsetZ;
  }

  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  private easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t);
  }
}
