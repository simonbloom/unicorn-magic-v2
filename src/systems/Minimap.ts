import { Horse } from '../entities/Horse';
import { Obstacle } from '../entities/Obstacle';

export class Minimap {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private size: number = 150;
  private scale: number = 3;
  private minScale: number = 1;
  private maxScale: number = 10;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.canvas.id = 'minimap';
    this.canvas.style.cssText = `
      position: absolute;
      top: 80px;
      left: 10px;
      border: 2px solid #ffd700;
      border-radius: 8px;
      background: rgba(0, 50, 0, 0.85);
    `;
    this.ctx = this.canvas.getContext('2d')!;
    document.body.appendChild(this.canvas);

    window.addEventListener('keydown', (e) => {
      if (e.key === '+' || e.key === '=') this.zoomIn();
      if (e.key === '-' || e.key === '_') this.zoomOut();
    });
  }

  private zoomIn(): void {
    this.scale = Math.max(this.minScale, this.scale - 0.5);
  }

  private zoomOut(): void {
    this.scale = Math.min(this.maxScale, this.scale + 0.5);
  }

  render(
    playerX: number,
    playerZ: number,
    playerRotation: number,
    horses: Horse[],
    obstacles: Obstacle[]
  ): void {
    const ctx = this.ctx;
    const size = this.size;
    const center = size / 2;

    ctx.fillStyle = 'rgba(0, 50, 0, 0.9)';
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    const worldHalf = 44;
    const corners = [
      this.worldToMinimap(-worldHalf, -worldHalf, playerX, playerZ),
      this.worldToMinimap(worldHalf, -worldHalf, playerX, playerZ),
      this.worldToMinimap(worldHalf, worldHalf, playerX, playerZ),
      this.worldToMinimap(-worldHalf, worldHalf, playerX, playerZ)
    ];
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    for (let i = 1; i <= 4; i++) {
      const c = corners[i % 4];
      ctx.lineTo(c.x, c.y);
    }
    ctx.stroke();

    obstacles.forEach(obstacle => {
      const pos = this.worldToMinimap(obstacle.position.x, obstacle.position.z, playerX, playerZ);
      if (this.isInBounds(pos.x, pos.y)) {
        ctx.fillStyle = '#666666';
        const obstacleSize = Math.max(3, obstacle.collisionRadius / this.scale);
        ctx.fillRect(pos.x - obstacleSize/2, pos.y - obstacleSize/2, obstacleSize, obstacleSize);
      }
    });

    horses.forEach(horse => {
      const pos = this.worldToMinimap(horse.position.x, horse.position.z, playerX, playerZ);
      if (this.isInBounds(pos.x, pos.y)) {
        if (horse.isTransformed) {
          const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 5);
          gradient.addColorStop(0, '#ff0000');
          gradient.addColorStop(0.2, '#ff7f00');
          gradient.addColorStop(0.4, '#ffff00');
          gradient.addColorStop(0.6, '#00ff00');
          gradient.addColorStop(0.8, '#0000ff');
          gradient.addColorStop(1, '#8b00ff');
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = '#8b4513';
        }
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.fillStyle = '#ff69b4';
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(playerRotation);
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(4, 4);
    ctx.lineTo(-4, 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('N', center, 12);
    ctx.fillText('S', center, size - 4);
    ctx.fillText('W', 8, center + 3);
    ctx.fillText('E', size - 8, center + 3);

    ctx.fillStyle = '#aaaaaa';
    ctx.font = '9px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`${this.scale.toFixed(1)}x`, size - 5, size - 5);
  }

  private worldToMinimap(worldX: number, worldZ: number, playerX: number, playerZ: number): { x: number; y: number } {
    const center = this.size / 2;
    return {
      x: center + (worldX - playerX) / this.scale,
      y: center + (worldZ - playerZ) / this.scale
    };
  }

  private isInBounds(x: number, y: number): boolean {
    return x >= 0 && x <= this.size && y >= 0 && y <= this.size;
  }
}
