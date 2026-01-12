import * as THREE from 'three';

export type WeatherType = 'clear' | 'rain' | 'fog';

export class WeatherSystem {
  private scene: THREE.Scene;
  private currentWeather: WeatherType = 'clear';
  private rainParticles: THREE.Points | null = null;
  private weatherTimer: number = 0;
  private weatherDuration: number = 60;
  private targetFogDensity: number = 0;
  private currentFogDensity: number = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  update(delta: number): void {
    this.weatherTimer += delta;

    // Random weather change
    if (this.weatherTimer >= this.weatherDuration) {
      this.weatherTimer = 0;
      this.weatherDuration = 45 + Math.random() * 60;
      this.changeWeather();
    }

    // Update rain
    if (this.rainParticles) {
      this.updateRain(delta);
    }

    // Smooth fog transition
    if (this.currentFogDensity !== this.targetFogDensity) {
      const diff = this.targetFogDensity - this.currentFogDensity;
      this.currentFogDensity += diff * delta * 0.5;
      if (this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.density = Math.max(0.005, this.currentFogDensity);
      }
    }
  }

  private changeWeather(): void {
    const weathers: WeatherType[] = ['clear', 'clear', 'rain', 'fog'];
    const newWeather = weathers[Math.floor(Math.random() * weathers.length)];
    this.setWeather(newWeather);
  }

  setWeather(weather: WeatherType): void {
    // Clean up previous weather
    if (this.rainParticles) {
      this.scene.remove(this.rainParticles);
      this.rainParticles = null;
    }

    this.currentWeather = weather;

    switch (weather) {
      case 'clear':
        this.targetFogDensity = 0.005;
        break;
      case 'rain':
        this.targetFogDensity = 0.01;
        this.createRain();
        break;
      case 'fog':
        this.targetFogDensity = 0.04;
        break;
    }
  }

  private createRain(): void {
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      velocities[i] = 15 + Math.random() * 10;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));

    const material = new THREE.PointsMaterial({
      color: 0x88aaff,
      size: 0.15,
      transparent: true,
      opacity: 0.6
    });

    this.rainParticles = new THREE.Points(geometry, material);
    this.scene.add(this.rainParticles);
  }

  private updateRain(delta: number): void {
    if (!this.rainParticles) return;

    const positions = this.rainParticles.geometry.attributes.position.array as Float32Array;
    const velocities = this.rainParticles.geometry.attributes.velocity.array as Float32Array;

    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3 + 1] -= velocities[i] * delta;

      // Reset rain drop when it hits ground
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = 25 + Math.random() * 5;
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      }
    }

    this.rainParticles.geometry.attributes.position.needsUpdate = true;
  }

  getCurrentWeather(): WeatherType {
    return this.currentWeather;
  }

  isRaining(): boolean {
    return this.currentWeather === 'rain';
  }

  isFoggy(): boolean {
    return this.currentWeather === 'fog';
  }

  clear(): void {
    if (this.rainParticles) {
      this.scene.remove(this.rainParticles);
      this.rainParticles = null;
    }
    this.currentWeather = 'clear';
    this.targetFogDensity = 0.005;
  }
}
