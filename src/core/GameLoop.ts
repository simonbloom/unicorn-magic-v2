export class GameLoop {
  private lastTime: number = 0;
  private isRunning: boolean = false;
  private updateCallback: (delta: number) => void;
  private renderCallback: () => void;
  private animationId: number = 0;

  constructor(
    onUpdate: (delta: number) => void,
    onRender: () => void
  ) {
    this.updateCallback = onUpdate;
    this.renderCallback = onRender;
  }

  start(): void {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private loop = (currentTime: number): void => {
    if (!this.isRunning) return;

    const delta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    const cappedDelta = Math.min(delta, 0.1);

    this.updateCallback(cappedDelta);
    this.renderCallback();

    this.animationId = requestAnimationFrame(this.loop);
  };
}
