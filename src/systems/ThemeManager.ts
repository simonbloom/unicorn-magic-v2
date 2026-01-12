import * as THREE from 'three';

export type ThemeName = 'meadow' | 'forest' | 'castle' | 'desert' | 'winter' | 'swamp' | 'volcano' | 'beach' | 'haunted';

export interface ThemeConfig {
  name: ThemeName;
  terrainColor: number;
  skyColor: number;
  ambientLight: { color: number; intensity: number };
  directionalLight: { color: number; intensity: number };
  fogDensity: number;
  fogColor: number;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  meadow: {
    name: 'meadow',
    terrainColor: 0x7cba5f,
    skyColor: 0x87ceeb,
    ambientLight: { color: 0xffffff, intensity: 0.6 },
    directionalLight: { color: 0xffffff, intensity: 1.0 },
    fogDensity: 0.008,
    fogColor: 0x87ceeb
  },
  forest: {
    name: 'forest',
    terrainColor: 0x5a8f3e,
    skyColor: 0x6b8e6b,
    ambientLight: { color: 0x90ee90, intensity: 0.5 },
    directionalLight: { color: 0xfffacd, intensity: 0.8 },
    fogDensity: 0.015,
    fogColor: 0x6b8e6b
  },
  castle: {
    name: 'castle',
    terrainColor: 0x7cba5f,
    skyColor: 0x87ceeb,
    ambientLight: { color: 0xffffff, intensity: 0.6 },
    directionalLight: { color: 0xffffff, intensity: 1.0 },
    fogDensity: 0.005,
    fogColor: 0x87ceeb
  },
  desert: {
    name: 'desert',
    terrainColor: 0xc2b280,
    skyColor: 0xffd699,
    ambientLight: { color: 0xffe4b5, intensity: 0.7 },
    directionalLight: { color: 0xffd700, intensity: 1.2 },
    fogDensity: 0.006,
    fogColor: 0xffd699
  },
  winter: {
    name: 'winter',
    terrainColor: 0xfffafa,
    skyColor: 0xc0c0c0,
    ambientLight: { color: 0xb0e0e6, intensity: 0.6 },
    directionalLight: { color: 0xe0ffff, intensity: 0.8 },
    fogDensity: 0.012,
    fogColor: 0xdcdcdc
  },
  swamp: {
    name: 'swamp',
    terrainColor: 0x3d5c3d,
    skyColor: 0x4a5a4a,
    ambientLight: { color: 0x6b8e6b, intensity: 0.4 },
    directionalLight: { color: 0x98fb98, intensity: 0.5 },
    fogDensity: 0.025,
    fogColor: 0x4a5a4a
  },
  volcano: {
    name: 'volcano',
    terrainColor: 0x2f2f2f,
    skyColor: 0xff6633,
    ambientLight: { color: 0xff4500, intensity: 0.5 },
    directionalLight: { color: 0xff6347, intensity: 0.9 },
    fogDensity: 0.018,
    fogColor: 0x4a2020
  },
  beach: {
    name: 'beach',
    terrainColor: 0xf4d03f,
    skyColor: 0x87ceeb,
    ambientLight: { color: 0xfffacd, intensity: 0.7 },
    directionalLight: { color: 0xffffff, intensity: 1.2 },
    fogDensity: 0.004,
    fogColor: 0x87ceeb
  },
  haunted: {
    name: 'haunted',
    terrainColor: 0x4a4a5a,
    skyColor: 0x1a1a2e,
    ambientLight: { color: 0x9370db, intensity: 0.3 },
    directionalLight: { color: 0xc0c0ff, intensity: 0.4 },
    fogDensity: 0.02,
    fogColor: 0x2a1a3a
  }
};

export class ThemeManager {
  private scene: THREE.Scene;
  private ambientLight: THREE.AmbientLight;
  private directionalLight: THREE.DirectionalLight;
  private currentTheme: ThemeName = 'meadow';

  constructor(scene: THREE.Scene, ambientLight: THREE.AmbientLight, directionalLight: THREE.DirectionalLight) {
    this.scene = scene;
    this.ambientLight = ambientLight;
    this.directionalLight = directionalLight;
  }

  applyTheme(themeName: ThemeName): ThemeConfig {
    const theme = THEMES[themeName];
    this.currentTheme = themeName;

    // Update sky/background
    this.scene.background = new THREE.Color(theme.skyColor);

    // Update fog
    this.scene.fog = new THREE.FogExp2(theme.fogColor, theme.fogDensity);

    // Update ambient light
    this.ambientLight.color.setHex(theme.ambientLight.color);
    this.ambientLight.intensity = theme.ambientLight.intensity;

    // Update directional light
    this.directionalLight.color.setHex(theme.directionalLight.color);
    this.directionalLight.intensity = theme.directionalLight.intensity;

    return theme;
  }

  getTerrainColor(): number {
    return THEMES[this.currentTheme].terrainColor;
  }

  getCurrentTheme(): ThemeName {
    return this.currentTheme;
  }

  getThemeConfig(themeName: ThemeName): ThemeConfig {
    return THEMES[themeName];
  }
}
