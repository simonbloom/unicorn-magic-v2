export interface SaveData {
  version: number;
  levelsCompleted: number[];
  levelStars: Record<number, number>;
  achievements: string[];
  unlockedSkins: string[];
  selectedSkin: string;
  settings: {
    musicVolume: number;
    sfxVolume: number;
    showControlHints: boolean;
  };
  stats: {
    totalHorsesTransformed: number;
    totalHeartsShot: number;
    totalPlayTime: number;
  };
  lastPlayed: string;
}

const DEFAULT_SAVE: SaveData = {
  version: 1,
  levelsCompleted: [],
  levelStars: {},
  achievements: [],
  unlockedSkins: ['default'],
  selectedSkin: 'default',
  settings: {
    musicVolume: 0.5,
    sfxVolume: 0.7,
    showControlHints: true
  },
  stats: {
    totalHorsesTransformed: 0,
    totalHeartsShot: 0,
    totalPlayTime: 0
  },
  lastPlayed: new Date().toISOString()
};

export class SaveManager {
  private static STORAGE_KEY = 'unicorn-game-data';
  private data: SaveData;

  constructor() {
    this.data = this.load();
  }

  load(): SaveData {
    try {
      const raw = localStorage.getItem(SaveManager.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return this.migrate(parsed);
      }
    } catch (e) {
      console.warn('Failed to load save, using defaults');
    }
    return { ...DEFAULT_SAVE };
  }

  private migrate(data: SaveData): SaveData {
    const current = { ...DEFAULT_SAVE };
    
    if (data.version === current.version) {
      return data;
    }

    return {
      ...current,
      ...data,
      settings: { ...current.settings, ...data.settings },
      stats: { ...current.stats, ...data.stats },
      version: current.version
    };
  }

  save(): void {
    try {
      this.data.lastPlayed = new Date().toISOString();
      localStorage.setItem(
        SaveManager.STORAGE_KEY,
        JSON.stringify(this.data)
      );
    } catch (e) {
      console.warn('Failed to save game data');
    }
  }

  completeLevel(levelId: number, stars: number, heartsShot: number, horsesTransformed: number): void {
    if (!this.data.levelsCompleted.includes(levelId)) {
      this.data.levelsCompleted.push(levelId);
    }
    
    const currentStars = this.data.levelStars[levelId] || 0;
    this.data.levelStars[levelId] = Math.max(currentStars, stars);
    
    this.data.stats.totalHeartsShot += heartsShot;
    this.data.stats.totalHorsesTransformed += horsesTransformed;
    
    this.checkAchievements(heartsShot, horsesTransformed);
    this.save();
  }

  private checkAchievements(_heartsShot: number, horsesTransformed: number): void {
    if (horsesTransformed >= 1 && !this.data.achievements.includes('first_unicorn')) {
      this.data.achievements.push('first_unicorn');
    }

    if (this.data.stats.totalHorsesTransformed >= 100 && !this.data.achievements.includes('hundred_unicorns')) {
      this.data.achievements.push('hundred_unicorns');
    }

    const allLevelsComplete = [1, 2, 3].every(id => this.data.levelsCompleted.includes(id));
    if (allLevelsComplete && !this.data.achievements.includes('all_levels')) {
      this.data.achievements.push('all_levels');
    }

    const allThreeStars = [1, 2, 3].every(id => this.data.levelStars[id] === 3);
    if (allThreeStars && !this.data.achievements.includes('completionist')) {
      this.data.achievements.push('completionist');
      if (!this.data.unlockedSkins.includes('diamond')) {
        this.data.unlockedSkins.push('diamond');
      }
    }
  }

  isLevelUnlocked(levelId: number): boolean {
    if (levelId === 1) return true;
    return this.data.levelsCompleted.includes(levelId - 1);
  }

  getLevelStars(levelId: number): number {
    return this.data.levelStars[levelId] || 0;
  }

  getSettings(): SaveData['settings'] {
    return this.data.settings;
  }

  updateSettings(settings: Partial<SaveData['settings']>): void {
    this.data.settings = { ...this.data.settings, ...settings };
    this.save();
  }

  updatePlayTime(seconds: number): void {
    this.data.stats.totalPlayTime += seconds;
    this.save();
  }

  getStats(): SaveData['stats'] {
    return this.data.stats;
  }

  getAchievements(): string[] {
    return this.data.achievements;
  }

  reset(): void {
    this.data = { ...DEFAULT_SAVE };
    this.save();
  }
}
