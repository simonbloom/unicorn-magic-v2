import * as THREE from 'three';
import { Player } from '../entities/Player';
import { Horse } from '../entities/Horse';
import { Obstacle } from '../entities/Obstacle';
import { Terrain } from '../entities/Terrain';

const WORLD_BOUNDS = {
  minX: -44,
  maxX: 44,
  minZ: -44,
  maxZ: 44
};

export class CollisionSystem {
  resolvePlayerObstacles(player: Player, obstacles: Obstacle[], terrain: Terrain): void {
    for (const obstacle of obstacles) {
      const dx = player.position.x - obstacle.position.x;
      const dz = player.position.z - obstacle.position.z;
      const distance = Math.sqrt(dx * dx + dz * dz);
      const minDist = player.collisionRadius + obstacle.collisionRadius;

      if (distance < minDist && distance > 0) {
        const pushX = (dx / distance) * (minDist - distance + 0.1);
        const pushZ = (dz / distance) * (minDist - distance + 0.1);

        player.position.x += pushX;
        player.position.z += pushZ;
      }
    }

    this.clampToWorldBounds(player.position);
    player.position.y = terrain.getHeightAt(player.position.x, player.position.z);
  }

  resolveHorseObstacles(horse: Horse, obstacles: Obstacle[], terrain: Terrain): void {
    for (const obstacle of obstacles) {
      const dx = horse.position.x - obstacle.position.x;
      const dz = horse.position.z - obstacle.position.z;
      const distance = Math.sqrt(dx * dx + dz * dz);
      const minDist = horse.collisionRadius + obstacle.collisionRadius;

      if (distance < minDist && distance > 0) {
        const pushX = (dx / distance) * (minDist - distance + 0.1);
        const pushZ = (dz / distance) * (minDist - distance + 0.1);

        horse.position.x += pushX;
        horse.position.z += pushZ;
      }
    }

    this.clampToWorldBounds(horse.position);
    horse.position.y = terrain.getHeightAt(horse.position.x, horse.position.z);
  }

  private clampToWorldBounds(position: THREE.Vector3): void {
    position.x = Math.max(WORLD_BOUNDS.minX, Math.min(WORLD_BOUNDS.maxX, position.x));
    position.z = Math.max(WORLD_BOUNDS.minZ, Math.min(WORLD_BOUNDS.maxZ, position.z));
  }
}
