import { Game } from './core/Game';

const loadingEl = document.getElementById('loading');
const progressEl = document.getElementById('progress');

function updateProgress(percent: number) {
  if (progressEl) {
    progressEl.style.width = `${percent}%`;
  }
}

updateProgress(20);

const game = new Game();

updateProgress(60);

game.init().then(() => {
  updateProgress(100);
  
  setTimeout(() => {
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
    game.start();
  }, 300);
});
