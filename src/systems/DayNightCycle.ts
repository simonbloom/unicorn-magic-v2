import * as THREE from 'three';

export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

interface TimePhaseConfig {
  ambientColor: number;
  ambientIntensity: number;
  directionalColor: number;
  directionalIntensity: number;
  fogColor: number;
  fogDensity: number;
}

const PHASE_CONFIGS: Record<TimeOfDay, TimePhaseConfig> = {
  dawn: {
    ambientColor: 0xffa07a,
    ambientIntensity: 0.4,
    directionalColor: 0xffcc88,
    directionalIntensity: 0.6,
    fogColor: 0xffe4b5,
    fogDensity: 0.01
  },
  day: {
    ambientColor: 0xffffff,
    ambientIntensity: 0.6,
    directionalColor: 0xfffacd,
    directionalIntensity: 1.0,
    fogColor: 0x87ceeb,
    fogDensity: 0.005
  },
  dusk: {
    ambientColor: 0xdda0dd,
    ambientIntensity: 0.35,
    directionalColor: 0xff69b4,
    directionalIntensity: 0.5,
    fogColor: 0xffb6c1,
    fogDensity: 0.015
  },
  night: {
    ambientColor: 0x191970,
    ambientIntensity: 0.35,
    directionalColor: 0x6688cc,
    directionalIntensity: 0.5,
    fogColor: 0x0a0a2e,
    fogDensity: 0.015
  }
};

export class DayNightCycle {
  private scene: THREE.Scene;
  private ambientLight: THREE.AmbientLight;
  private directionalLight: THREE.DirectionalLight;
  private cycleTime: number = 0;
  private cycleDuration: number = 300; // 5 minutes per full cycle
  private currentPhase: TimeOfDay = 'day';
  private isEnabled: boolean = true;

  constructor(scene: THREE.Scene, ambientLight: THREE.AmbientLight, directionalLight: THREE.DirectionalLight) {
    this.scene = scene;
    this.ambientLight = ambientLight;
    this.directionalLight = directionalLight;
  }

  update(delta: number): void {
    if (!this.isEnabled) return;

    this.cycleTime += delta;
    if (this.cycleTime >= this.cycleDuration) {
      this.cycleTime = 0;
    }

    const progress = this.cycleTime / this.cycleDuration;
    this.updateLighting(progress);
  }

  private updateLighting(progress: number): void {
    // Determine phase (0-0.25: dawn, 0.25-0.5: day, 0.5-0.75: dusk, 0.75-1: night)
    let fromPhase: TimeOfDay;
    let toPhase: TimeOfDay;
    let t: number;

    if (progress < 0.25) {
      fromPhase = 'night';
      toPhase = 'dawn';
      t = progress / 0.25;
      this.currentPhase = 'dawn';
    } else if (progress < 0.5) {
      fromPhase = 'dawn';
      toPhase = 'day';
      t = (progress - 0.25) / 0.25;
      this.currentPhase = 'day';
    } else if (progress < 0.75) {
      fromPhase = 'day';
      toPhase = 'dusk';
      t = (progress - 0.5) / 0.25;
      this.currentPhase = 'dusk';
    } else {
      fromPhase = 'dusk';
      toPhase = 'night';
      t = (progress - 0.75) / 0.25;
      this.currentPhase = 'night';
    }

    const from = PHASE_CONFIGS[fromPhase];
    const to = PHASE_CONFIGS[toPhase];

    // Interpolate colors
    const ambientColor = new THREE.Color(from.ambientColor).lerp(new THREE.Color(to.ambientColor), t);
    const directionalColor = new THREE.Color(from.directionalColor).lerp(new THREE.Color(to.directionalColor), t);
    const fogColor = new THREE.Color(from.fogColor).lerp(new THREE.Color(to.fogColor), t);

    // Apply
    this.ambientLight.color = ambientColor;
    this.ambientLight.intensity = from.ambientIntensity + (to.ambientIntensity - from.ambientIntensity) * t;

    this.directionalLight.color = directionalColor;
    this.directionalLight.intensity = from.directionalIntensity + (to.directionalIntensity - from.directionalIntensity) * t;

    // Update directional light position for sun angle
    const sunAngle = progress * Math.PI * 2;
    this.directionalLight.position.set(
      Math.cos(sunAngle) * 50,
      Math.sin(sunAngle) * 30 + 20,
      30
    );

    // Update fog
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color = fogColor;
      this.scene.fog.density = from.fogDensity + (to.fogDensity - from.fogDensity) * t;
    }

    // Update background
    this.scene.background = fogColor;
  }

  getCurrentPhase(): TimeOfDay {
    return this.currentPhase;
  }

  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  setTime(phase: TimeOfDay): void {
    switch (phase) {
      case 'dawn':
        this.cycleTime = 0;
        break;
      case 'day':
        this.cycleTime = this.cycleDuration * 0.25;
        break;
      case 'dusk':
        this.cycleTime = this.cycleDuration * 0.5;
        break;
      case 'night':
        this.cycleTime = this.cycleDuration * 0.75;
        break;
    }
    this.updateLighting(this.cycleTime / this.cycleDuration);
  }

  getVisibilityMultiplier(): number {
    // Reduced visibility at night
    if (this.currentPhase === 'night') return 0.75;
    if (this.currentPhase === 'dusk' || this.currentPhase === 'dawn') return 0.8;
    return 1.0;
  }
}
