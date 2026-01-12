interface TutorialStep {
  id: string;
  message: string;
  subMessage?: string;
  position: 'top' | 'center' | 'bottom';
  autoAdvanceTime?: number;
}

export class Tutorial {
  private container: HTMLElement;
  private messageEl: HTMLElement;
  private subMessageEl: HTMLElement;
  private skipButton: HTMLElement;
  private currentStep: number = 0;
  private isComplete: boolean = false;
  private isSkipped: boolean = false;
  private stepTimer: number = 0;

  private hasMoved: boolean = false;
  private hasShot: boolean = false;
  private hasTransformed: boolean = false;

  private readonly STEPS: TutorialStep[] = [
    {
      id: 'welcome',
      message: 'Welcome to Unicorn Magic! ✨',
      subMessage: 'Transform horses into magical unicorns!',
      position: 'center',
      autoAdvanceTime: 3
    },
    {
      id: 'movement',
      message: 'Use Q W E A D Z X C to move',
      subMessage: '8 directions around the S key (stop)',
      position: 'bottom'
    },
    {
      id: 'shooting',
      message: 'Press SPACE or CLICK to shoot hearts!',
      subMessage: 'Hearts transform horses into unicorns',
      position: 'bottom'
    },
    {
      id: 'chase',
      message: 'Chase the horses and hit them!',
      subMessage: 'They will try to run and hide',
      position: 'top'
    },
    {
      id: 'complete',
      message: 'Great job! Transform all horses to win!',
      subMessage: 'Good luck!',
      position: 'center',
      autoAdvanceTime: 2
    }
  ];

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'tutorial';
    this.container.style.cssText = `
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.85);
      padding: 20px 40px;
      border-radius: 15px;
      border: 2px solid #ff69b4;
      text-align: center;
      font-family: 'Segoe UI', Arial, sans-serif;
      z-index: 1000;
      transition: opacity 0.3s, top 0.3s, bottom 0.3s;
      pointer-events: auto;
    `;

    this.messageEl = document.createElement('div');
    this.messageEl.style.cssText = `
      color: white;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
    `;

    this.subMessageEl = document.createElement('div');
    this.subMessageEl.style.cssText = `
      color: #ffb6c1;
      font-size: 16px;
      margin-bottom: 12px;
    `;

    this.skipButton = document.createElement('button');
    this.skipButton.textContent = 'Skip Tutorial';
    this.skipButton.style.cssText = `
      background: transparent;
      border: 1px solid #666;
      color: #888;
      padding: 5px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
    `;
    this.skipButton.addEventListener('click', () => this.skip());

    this.container.appendChild(this.messageEl);
    this.container.appendChild(this.subMessageEl);
    this.container.appendChild(this.skipButton);

    if (this.shouldShowTutorial()) {
      document.body.appendChild(this.container);
      this.showStep(0);
    } else {
      this.isComplete = true;
    }
  }

  private shouldShowTutorial(): boolean {
    try {
      const shown = localStorage.getItem('unicorn-magic-tutorial-complete');
      return shown !== 'true';
    } catch {
      return true;
    }
  }

  private markComplete(): void {
    try {
      localStorage.setItem('unicorn-magic-tutorial-complete', 'true');
    } catch {
      // Ignore storage errors
    }
  }

  private showStep(index: number): void {
    if (index >= this.STEPS.length) {
      this.complete();
      return;
    }

    const step = this.STEPS[index];
    this.currentStep = index;
    this.stepTimer = 0;

    this.messageEl.textContent = step.message;
    this.subMessageEl.textContent = step.subMessage || '';

    this.container.style.top = '';
    this.container.style.bottom = '';

    switch (step.position) {
      case 'top':
        this.container.style.top = '100px';
        break;
      case 'bottom':
        this.container.style.bottom = '150px';
        break;
      case 'center':
        this.container.style.top = '50%';
        this.container.style.transform = 'translate(-50%, -50%)';
        break;
    }
  }

  update(delta: number): void {
    if (this.isComplete || this.isSkipped) return;

    const step = this.STEPS[this.currentStep];
    this.stepTimer += delta;

    if (step.autoAdvanceTime && this.stepTimer >= step.autoAdvanceTime) {
      this.showStep(this.currentStep + 1);
      return;
    }

    switch (step.id) {
      case 'movement':
        if (this.hasMoved) {
          this.showStep(this.currentStep + 1);
        }
        break;
      case 'shooting':
        if (this.hasShot) {
          this.showStep(this.currentStep + 1);
        }
        break;
      case 'chase':
        if (this.hasTransformed) {
          this.showStep(this.currentStep + 1);
        }
        break;
    }
  }

  onPlayerMoved(): void {
    this.hasMoved = true;
  }

  onPlayerShot(): void {
    this.hasShot = true;
  }

  onHorseTransformed(): void {
    this.hasTransformed = true;
  }

  skip(): void {
    this.isSkipped = true;
    this.complete();
  }

  private complete(): void {
    this.isComplete = true;
    this.markComplete();
    this.container.style.opacity = '0';
    setTimeout(() => {
      this.container.remove();
    }, 300);
  }

  isActive(): boolean {
    return !this.isComplete && !this.isSkipped;
  }
}
