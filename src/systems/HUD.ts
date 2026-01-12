import { GameState } from '../core/Game';

export class HUD {
  private container: HTMLElement;
  private heartsElement!: HTMLElement;
  private timerElement!: HTMLElement;
  private levelElement!: HTMLElement;
  private horseCountElement!: HTMLElement;
  private horseIconsElement!: HTMLElement;
  private victoryOverlay: HTMLElement | null = null;
  private onLevelChange: ((level: number) => void) | null = null;

  constructor() {
    this.container = document.getElementById('hud')!;
    this.createElements();
  }

  setOnLevelChange(callback: (level: number) => void): void {
    this.onLevelChange = callback;
  }

  private createElements(): void {
    this.container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; background: rgba(0,0,0,0.3); border-radius: 10px; margin: 10px;">
        <div id="hearts" style="font-size: 24px;">♥ 0</div>
        <div id="level" style="font-size: 20px; font-weight: bold;">Level 1: Meadow</div>
        <div id="timer" style="font-size: 24px;">⏱ 0:00</div>
      </div>
      <div style="display: flex; align-items: center; padding: 5px 20px;">
        <div id="horse-count" style="font-size: 18px; margin-right: 10px;">Horses: 0/0</div>
        <div id="horse-icons" style="font-size: 20px;"></div>
      </div>
      <div id="level-selector" style="position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 10px;">
        <button class="level-btn" data-level="1" title="Meadow">1🌿</button>
        <button class="level-btn" data-level="2" title="Forest">2🌲</button>
        <button class="level-btn" data-level="3" title="Castle">3🏰</button>
        <button class="level-btn" data-level="4" title="Desert">4🏜️</button>
        <button class="level-btn" data-level="5" title="Winter">5❄️</button>
        <button class="level-btn" data-level="6" title="Swamp">6🐸</button>
        <button class="level-btn" data-level="7" title="Volcano">7🌋</button>
        <button class="level-btn" data-level="8" title="Beach">8🏖️</button>
        <button class="level-btn" data-level="9" title="Haunted">9👻</button>
      </div>
      <style>
        .level-btn {
          width: 40px; height: 40px; font-size: 14px; cursor: pointer;
          border: 2px solid #fff; border-radius: 8px; background: rgba(255,255,255,0.2);
          color: #fff; transition: all 0.2s;
        }
        .level-btn:hover { background: rgba(255,255,255,0.4); transform: scale(1.1); }
        .level-btn.active { background: #ff69b4; border-color: #ff1493; }
      </style>
    `;

    // Add level button click handlers
    this.container.querySelectorAll('.level-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const level = parseInt((e.target as HTMLElement).dataset.level || '1');
        if (this.onLevelChange) {
          this.onLevelChange(level);
        }
      });
    });

    this.heartsElement = document.getElementById('hearts')!;
    this.timerElement = document.getElementById('timer')!;
    this.levelElement = document.getElementById('level')!;
    this.horseCountElement = document.getElementById('horse-count')!;
    this.horseIconsElement = document.getElementById('horse-icons')!;
  }

  update(state: GameState): void {
    this.heartsElement.textContent = `♥ ${state.heartsShot}`;
    this.timerElement.textContent = `⏱ ${this.formatTime(state.elapsedTime)}`;
    this.levelElement.textContent = `Level: ${state.levelName}`;
    this.horseCountElement.textContent = `Horses: ${state.horsesRemaining}/${state.totalHorses}`;
    this.updateHorseIcons(state.horses);
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  private updateHorseIcons(horses: { isTransformed: boolean }[]): void {
    this.horseIconsElement.innerHTML = horses
      .map(h => h.isTransformed ? '🦄' : '🐴')
      .join(' ');
  }

  showVictory(state: GameState): void {
    if (this.victoryOverlay) return;

    const accuracy = state.heartsShot > 0 
      ? ((state.totalHorses / state.heartsShot) * 100).toFixed(0) 
      : '100';

    let stars = 1;
    const parTime = 120;
    const underPar = state.elapsedTime <= parTime;
    const highAccuracy = parseFloat(accuracy) >= 70;
    const veryHighAccuracy = parseFloat(accuracy) >= 85;

    if (underPar && veryHighAccuracy) stars = 3;
    else if (underPar || highAccuracy) stars = 2;

    const starDisplay = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    this.victoryOverlay = document.createElement('div');
    this.victoryOverlay.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      padding: 40px 60px;
      border-radius: 20px;
      text-align: center;
      color: white;
      font-family: 'Segoe UI', Arial, sans-serif;
      z-index: 1000;
      border: 3px solid #ff69b4;
      box-shadow: 0 0 30px rgba(255, 105, 180, 0.5);
    `;

    this.victoryOverlay.innerHTML = `
      <h1 style="font-size: 36px; margin-bottom: 20px; color: #ff69b4;">✨ LEVEL COMPLETE! ✨</h1>
      <div style="font-size: 40px; margin: 20px 0;">🦄 🦄 🦄</div>
      <div style="font-size: 20px; margin: 10px 0;">Time: ${this.formatTime(state.elapsedTime)}</div>
      <div style="font-size: 20px; margin: 10px 0;">Hearts Used: ${state.heartsShot}</div>
      <div style="font-size: 20px; margin: 10px 0;">Accuracy: ${accuracy}%</div>
      <div style="font-size: 40px; margin: 20px 0;">${starDisplay}</div>
      <div style="margin-top: 30px;">
        <button id="next-level" style="
          background: linear-gradient(45deg, #ff69b4, #ffd700);
          border: none;
          padding: 15px 40px;
          font-size: 18px;
          border-radius: 25px;
          cursor: pointer;
          margin: 0 10px;
          font-weight: bold;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        ">Next Level</button>
        <button id="replay" style="
          background: #333;
          border: 2px solid #ff69b4;
          padding: 15px 40px;
          font-size: 18px;
          border-radius: 25px;
          cursor: pointer;
          margin: 0 10px;
          color: white;
        ">Replay</button>
      </div>
    `;

    document.body.appendChild(this.victoryOverlay);

    document.getElementById('next-level')?.addEventListener('click', () => {
      this.hideVictory();
      window.location.reload();
    });

    document.getElementById('replay')?.addEventListener('click', () => {
      this.hideVictory();
      window.location.reload();
    });
  }

  hideVictory(): void {
    if (this.victoryOverlay) {
      this.victoryOverlay.remove();
      this.victoryOverlay = null;
    }
  }
}
