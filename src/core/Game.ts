import * as THREE from 'three';
import { IsometricCamera } from './IsometricCamera';
import { GameLoop } from './GameLoop';
import { InputManager } from '../systems/InputManager';
import { Player } from '../entities/Player';
import { Horse } from '../entities/Horse';
import { Heart } from '../entities/Heart';
import { Terrain } from '../entities/Terrain';
import { Obstacle } from '../entities/Obstacle';
import { Chicken, Egg } from '../entities/Chicken';
import { HUD } from '../systems/HUD';
import { CollisionSystem } from '../systems/CollisionSystem';
import { ParticleSystem } from '../systems/ParticleSystem';
import { ScreenEffects } from '../systems/ScreenEffects';
import { Minimap } from '../systems/Minimap';
import { SaveManager } from '../systems/SaveManager';
import { Tutorial } from '../systems/Tutorial';
import { RainbowManager } from '../systems/Rainbow';
import { PowerUpManager } from '../systems/PowerUpManager';
import { DayNightCycle } from '../systems/DayNightCycle';
import { WeatherSystem } from '../systems/WeatherSystem';
import { ThemeManager } from '../systems/ThemeManager';
import { LEVELS } from './Levels';

export interface GameState {
  heartsShot: number;
  horsesRemaining: number;
  totalHorses: number;
  elapsedTime: number;
  levelName: string;
  horses: Horse[];
  isPaused: boolean;
  isLevelComplete: boolean;
}

export class Game {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: IsometricCamera;
  private gameLoop!: GameLoop;
  private inputManager!: InputManager;
  private hud!: HUD;
  private collisionSystem!: CollisionSystem;
  private particleSystem!: ParticleSystem;
  private screenEffects!: ScreenEffects;
  private minimap!: Minimap;
  private saveManager!: SaveManager;
  private tutorial!: Tutorial;
  private rainbowManager!: RainbowManager;
  private powerUpManager!: PowerUpManager;
  private dayNightCycle!: DayNightCycle;
  private weatherSystem!: WeatherSystem;
  private themeManager!: ThemeManager;
  private ambientLight!: THREE.AmbientLight;
  private directionalLight!: THREE.DirectionalLight;

  private player!: Player;
  private horses: Horse[] = [];
  private hearts: Heart[] = [];
  private chickens: Chicken[] = [];
  private eggs: Egg[] = [];
  private terrain!: Terrain;
  private obstacles: Obstacle[] = [];
  private playerHasMoved: boolean = false;

  private state: GameState = {
    heartsShot: 0,
    horsesRemaining: 0,
    totalHorses: 0,
    elapsedTime: 0,
    levelName: 'Meadow',
    horses: [],
    isPaused: false,
    isLevelComplete: false
  };

  private currentLevel: number = Math.floor(Math.random() * LEVELS.length) + 1;
  private fireCooldown: number = 0;
  private readonly FIRE_RATE: number = 0.2;

  async init(): Promise<void> {
    this.setupRenderer();
    this.setupScene();
    this.camera = new IsometricCamera();
    this.inputManager = new InputManager();
    this.collisionSystem = new CollisionSystem();
    this.particleSystem = new ParticleSystem(this.scene);
    this.screenEffects = new ScreenEffects(this.camera.camera);
    this.hud = new HUD();
    this.hud.setOnLevelChange((level) => this.changeLevel(level));
    this.minimap = new Minimap();
    this.saveManager = new SaveManager();
    this.tutorial = new Tutorial();

    this.terrain = new Terrain();
    this.scene.add(this.terrain.mesh);

    this.player = new Player();
    this.scene.add(this.player.mesh);

    this.rainbowManager = new RainbowManager(this.scene);
    this.powerUpManager = new PowerUpManager(this.scene, this.terrain);
    this.themeManager = new ThemeManager(this.scene, this.ambientLight, this.directionalLight);
    this.dayNightCycle = new DayNightCycle(this.scene, this.ambientLight, this.directionalLight);
    this.weatherSystem = new WeatherSystem(this.scene);

    this.loadLevel(this.currentLevel);

    this.gameLoop = new GameLoop(
      (delta) => this.update(delta),
      () => this.render()
    );
  }

  private setupRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.handleResize();
    });
  }

  private setupScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.FogExp2(0x87ceeb, 0.005);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffee, 1.0);
    this.directionalLight.position.set(50, 100, 50);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.shadow.camera.near = 10;
    this.directionalLight.shadow.camera.far = 200;
    this.directionalLight.shadow.camera.left = -50;
    this.directionalLight.shadow.camera.right = 50;
    this.directionalLight.shadow.camera.top = 50;
    this.directionalLight.shadow.camera.bottom = -50;
    this.scene.add(this.directionalLight);
  }

  changeLevel(levelId: number): void {
    if (levelId >= 1 && levelId <= LEVELS.length) {
      this.currentLevel = levelId;
      this.loadLevel(levelId);
    }
  }

  private loadLevel(levelId: number): void {
    this.clearLevel();

    const config = LEVELS[levelId - 1];
    if (!config) return;

    // Apply theme
    const theme = this.themeManager.applyTheme(config.theme);
    this.terrain.setColor(theme.terrainColor);

    this.state.levelName = config.name;
    this.state.totalHorses = config.horses.length;
    this.state.horsesRemaining = config.horses.length;
    this.state.elapsedTime = 0;
    this.state.heartsShot = 0;
    this.state.isLevelComplete = false;

    this.player.setPosition(config.playerStart.x, config.playerStart.y, config.playerStart.z);

    config.horses.forEach(h => {
      const horse = new Horse(h.type);
      const groundY = this.terrain.getHeightAt(h.position.x, h.position.z);
      horse.setPosition(h.position.x, groundY, h.position.z);
      this.horses.push(horse);
      this.scene.add(horse.mesh);
    });

    config.obstacles.forEach(o => {
      const obstacle = new Obstacle(o.type, o.variant);
      const groundY = this.terrain.getHeightAt(o.position.x, o.position.z);
      obstacle.setPosition(o.position.x, groundY, o.position.z);
      this.obstacles.push(obstacle);
      this.scene.add(obstacle.mesh);
    });

    // Spawn chickens (1 per level + level number)
    const chickenCount = levelId + 1;
    for (let i = 0; i < chickenCount; i++) {
      const chicken = new Chicken();
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      const groundY = this.terrain.getHeightAt(x, z);
      chicken.setPosition(x, groundY, z);
      this.chickens.push(chicken);
      this.scene.add(chicken.mesh);
    }

    this.state.horses = this.horses;
  }

  private clearLevel(): void {
    this.horses.forEach(h => this.scene.remove(h.mesh));
    this.horses = [];

    this.hearts.forEach(h => this.scene.remove(h.mesh));
    this.hearts = [];

    this.obstacles.forEach(o => this.scene.remove(o.mesh));
    this.obstacles = [];

    this.chickens.forEach(c => this.scene.remove(c.mesh));
    this.chickens = [];

    this.eggs.forEach(e => this.scene.remove(e.mesh));
    this.eggs = [];
  }

  start(): void {
    this.gameLoop.start();
  }

  private update(delta: number): void {
    if (this.state.isPaused || this.state.isLevelComplete) return;

    const gameDelta = this.screenEffects.update(delta);
    this.state.elapsedTime += gameDelta;

    this.handleInput(gameDelta);
    this.player.update(gameDelta, this.terrain);
    this.collisionSystem.resolvePlayerObstacles(this.player, this.obstacles, this.terrain);

    if (this.fireCooldown > 0) {
      this.fireCooldown -= gameDelta;
    }

    // Apply slow-mo multiplier to horse movement
    const horseSpeedMult = this.powerUpManager.getHorseSpeedMultiplier();
    this.horses.forEach(horse => {
      if (!horse.isTransformed) {
        horse.update(gameDelta * horseSpeedMult, this.player.position, this.obstacles, this.terrain);
        this.collisionSystem.resolveHorseObstacles(horse, this.obstacles, this.terrain);
      }
    });

    this.updateChickens(gameDelta);
    this.updateEggs(gameDelta);
    this.updateHearts(gameDelta);
    this.updateObstacles(gameDelta);
    this.particleSystem.update(gameDelta);
    this.rainbowManager.update(gameDelta);
    this.powerUpManager.update(gameDelta, this.player.position);
    this.dayNightCycle.update(gameDelta);
    this.weatherSystem.update(gameDelta);
    this.camera.follow(this.player.position, gameDelta);
    this.hud.update(this.state);
    this.minimap.render(
      this.player.position.x,
      this.player.position.z,
      this.player.mesh.rotation.y,
      this.horses,
      this.obstacles
    );
    this.tutorial.update(gameDelta);

    this.checkLevelComplete();
  }

  private updateObstacles(delta: number): void {
    this.obstacles.forEach(obstacle => obstacle.update(delta));
  }

  private updateChickens(delta: number): void {
    this.chickens.forEach(chicken => {
      if (chicken.isAlive) {
        const egg = chicken.update(delta, this.player.position, this.terrain);
        if (egg) {
          this.eggs.push(egg);
          this.scene.add(egg.mesh);
        }
      }
    });
  }

  private updateEggs(delta: number): void {
    const eggsToRemove: Egg[] = [];

    this.eggs.forEach(egg => {
      egg.update(delta);

      // Check collision with unicorns (transformed horses)
      this.horses.forEach(horse => {
        if (horse.isTransformed && egg.checkCollision(horse.position, 1.5)) {
          horse.revertToHorse();
          this.state.horsesRemaining++;
          egg.deactivate();
          
          // BIG visual feedback!
          this.particleSystem.emit('confetti', horse.position, 200);
          this.particleSystem.emit('eggSplat', horse.position, 50);
          this.particleSystem.emit('smoke', horse.position, 80);
          this.particleSystem.emit('revert', horse.position, 100);
          this.screenEffects.shake(0.4, 0.5);
        }
      });

      if (!egg.isActive) {
        eggsToRemove.push(egg);
      }
    });

    eggsToRemove.forEach(egg => {
      this.scene.remove(egg.mesh);
      const idx = this.eggs.indexOf(egg);
      if (idx > -1) this.eggs.splice(idx, 1);
    });
  }

  private handleInput(delta: number): void {
    // Mouse-based movement (click to move)
    if (this.inputManager.isMouseHeld()) {
      const worldTarget = this.getMouseWorldPosition();
      if (worldTarget) {
        this.player.setMoveTarget(worldTarget);
        if (!this.playerHasMoved) {
          this.playerHasMoved = true;
          this.tutorial.onPlayerMoved();
        }
      }
    } else {
      this.player.stopMoving();
    }

    // Update player movement (with acceleration)
    this.player.updateMovement(delta * this.powerUpManager.getSpeedMultiplier());

    // Keyboard movement still works as backup
    const moveDir = this.inputManager.getMoveDirection();
    if (moveDir.lengthSq() > 0) {
      const speedMult = this.powerUpManager.getSpeedMultiplier();
      this.player.move(moveDir, delta * speedMult);
      if (!this.playerHasMoved) {
        this.playerHasMoved = true;
        this.tutorial.onPlayerMoved();
      }
    }

    // Spacebar only for firing
    if (this.inputManager.isFirePressed() && this.fireCooldown <= 0) {
      this.fireHeart();
      this.tutorial.onPlayerShot();
    }
  }

  private getMouseWorldPosition(): THREE.Vector3 | null {
    const mousePos = this.inputManager.getMouseScreenPos();
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mousePos, this.camera.camera);

    // Create a ground plane at y=0
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersection = new THREE.Vector3();

    if (raycaster.ray.intersectPlane(groundPlane, intersection)) {
      return intersection;
    }
    return null;
  }

  private fireHeart(): void {
    const spawnPos = this.player.position.clone();
    spawnPos.y += 1.2;
    spawnPos.add(this.player.facingDirection.clone().multiplyScalar(0.5));

    const isHoming = this.powerUpManager.isHomingActive();
    const isMultiShot = this.powerUpManager.isMultiShotActive();

    if (isMultiShot) {
      // Fire 3 hearts in a spread pattern: -15°, 0°, +15°
      const angles = [-0.26, 0, 0.26]; // ~15 degrees in radians
      angles.forEach(angle => {
        const dir = this.player.facingDirection.clone();
        const rotatedDir = new THREE.Vector3(
          dir.x * Math.cos(angle) - dir.z * Math.sin(angle),
          dir.y,
          dir.x * Math.sin(angle) + dir.z * Math.cos(angle)
        );
        const heart = new Heart(spawnPos.clone(), rotatedDir, isHoming);
        this.hearts.push(heart);
        this.scene.add(heart.mesh);
      });
      this.state.heartsShot += 3;
    } else {
      const heart = new Heart(spawnPos, this.player.facingDirection.clone(), isHoming);
      this.hearts.push(heart);
      this.scene.add(heart.mesh);
      this.state.heartsShot++;
    }

    this.fireCooldown = this.FIRE_RATE;
    this.particleSystem.emit('muzzleFlash', spawnPos, isMultiShot ? 25 : 10);
  }

  private updateHearts(delta: number): void {
    const heartsToRemove: Heart[] = [];

    this.hearts.forEach(heart => {
      // Update homing target to nearest untransformed horse
      if (heart.isHoming) {
        let nearestDist = Infinity;
        let nearestPos: THREE.Vector3 | null = null;
        this.horses.forEach(horse => {
          if (!horse.isTransformed) {
            const dist = heart.position.distanceTo(horse.position);
            if (dist < nearestDist) {
              nearestDist = dist;
              nearestPos = horse.position;
            }
          }
        });
        if (nearestPos) {
          heart.setHomingTarget(nearestPos);
        }
      }

      heart.update(delta);
      this.particleSystem.emit('heartTrail', heart.position, 2);

      // Check collision with horses
      this.horses.forEach(horse => {
        if (!horse.isTransformed && heart.checkCollision(horse.position, 1.5)) {
          this.onHeartHit(horse, heart);
          heartsToRemove.push(heart);
        }
      });

      // Check collision with chickens
      this.chickens.forEach(chicken => {
        if (chicken.isAlive && chicken.checkCollision(heart.position, 0.5)) {
          this.onChickenHit(chicken, heart);
          heartsToRemove.push(heart);
        }
      });

      if (!heart.isActive) {
        heartsToRemove.push(heart);
      }
    });

    heartsToRemove.forEach(heart => {
      this.scene.remove(heart.mesh);
      const idx = this.hearts.indexOf(heart);
      if (idx > -1) this.hearts.splice(idx, 1);
    });
  }

  private onChickenHit(chicken: Chicken, heart: Heart): void {
    heart.deactivate();
    
    // Roast the chicken!
    chicken.roast();
    
    // Effects
    this.particleSystem.emit('chickenPoof', chicken.position, 60);
    this.particleSystem.emit('confetti', chicken.position, 100);
    this.screenEffects.shake(0.15, 0.2);
  }

  private onHeartHit(horse: Horse, heart: Heart): void {
    heart.deactivate();
    this.particleSystem.emit('starburst', horse.position, 200);

    if (horse.hit()) {
      horse.transform();
      this.state.horsesRemaining--;
      this.screenEffects.shake(0.3, 0.4);
      this.particleSystem.emit('transformation', horse.position, 300);
      this.rainbowManager.spawn(horse.position.clone());
      this.tutorial.onHorseTransformed();

      if (this.state.horsesRemaining === 0) {
        this.screenEffects.triggerSlowMo();
      }
    }
  }

  private checkLevelComplete(): void {
    if (this.state.horsesRemaining <= 0 && !this.state.isLevelComplete) {
      this.state.isLevelComplete = true;

      const accuracy = this.state.heartsShot > 0
        ? this.state.totalHorses / this.state.heartsShot
        : 1;
      const parTime = LEVELS[this.currentLevel - 1]?.parTime || 120;
      const underPar = this.state.elapsedTime <= parTime;
      
      let stars = 1;
      if (underPar && accuracy >= 0.85) stars = 3;
      else if (underPar || accuracy >= 0.70) stars = 2;

      this.saveManager.completeLevel(
        this.currentLevel,
        stars,
        this.state.heartsShot,
        this.state.totalHorses
      );

      this.hud.showVictory(this.state);
    }
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera.camera);
  }
}
