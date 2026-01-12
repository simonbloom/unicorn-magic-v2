import * as THREE from 'three';

const CAMERA_ANGLE = -Math.PI / 4;

export function screenToWorld(screenDir: THREE.Vector2): THREE.Vector3 {
  if (screenDir.lengthSq() === 0) {
    return new THREE.Vector3();
  }

  const normalized = screenDir.clone().normalize();

  const worldX = normalized.x * Math.cos(CAMERA_ANGLE) - normalized.y * Math.sin(CAMERA_ANGLE);
  const worldZ = normalized.x * Math.sin(CAMERA_ANGLE) + normalized.y * Math.cos(CAMERA_ANGLE);

  return new THREE.Vector3(worldX, 0, worldZ).normalize();
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function lerpAngle(a: number, b: number, t: number): number {
  let diff = b - a;
  while (diff < -Math.PI) diff += Math.PI * 2;
  while (diff > Math.PI) diff -= Math.PI * 2;
  return a + diff * t;
}
