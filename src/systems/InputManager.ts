import * as THREE from 'three';

const DIRECTION_MAP: Record<string, THREE.Vector2> = {
  'KeyQ': new THREE.Vector2(-1, -1),
  'KeyW': new THREE.Vector2(0, -1),
  'KeyE': new THREE.Vector2(1, -1),
  'KeyA': new THREE.Vector2(-1, 0),
  'KeyS': new THREE.Vector2(0, 0),
  'KeyD': new THREE.Vector2(1, 0),
  'KeyZ': new THREE.Vector2(-1, 1),
  'KeyX': new THREE.Vector2(0, 1),
  'KeyC': new THREE.Vector2(1, 1)
};

export class InputManager {
  private keysPressed: Set<string> = new Set();
  private firePressed: boolean = false;
  private mouseHeld: boolean = false;
  private mouseScreenPos: THREE.Vector2 = new THREE.Vector2();

  constructor() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    window.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private onKeyDown(e: KeyboardEvent): void {
    this.keysPressed.add(e.code);

    if (e.code === 'Space') {
      this.firePressed = true;
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    this.keysPressed.delete(e.code);

    if (e.code === 'Space') {
      this.firePressed = false;
    }
  }

  private onMouseDown(e: MouseEvent): void {
    if (e.button === 0) {
      this.mouseHeld = true;
      this.updateMousePos(e);
    }
  }

  private onMouseUp(e: MouseEvent): void {
    if (e.button === 0) {
      this.mouseHeld = false;
    }
  }

  private onMouseMove(e: MouseEvent): void {
    this.updateMousePos(e);
  }

  private updateMousePos(e: MouseEvent): void {
    this.mouseScreenPos.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
  }

  isMouseHeld(): boolean {
    return this.mouseHeld;
  }

  getMouseScreenPos(): THREE.Vector2 {
    return this.mouseScreenPos.clone();
  }

  getMoveDirection(): THREE.Vector2 {
    const result = new THREE.Vector2(0, 0);

    for (const [code, dir] of Object.entries(DIRECTION_MAP)) {
      if (this.keysPressed.has(code) && code !== 'KeyS') {
        result.add(dir);
      }
    }

    if (result.lengthSq() > 0) {
      result.normalize();
    }

    return result;
  }

  isFirePressed(): boolean {
    return this.firePressed;
  }

  isKeyPressed(code: string): boolean {
    return this.keysPressed.has(code);
  }
}
