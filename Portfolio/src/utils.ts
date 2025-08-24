import * as THREE from 'three';

export function lerpScalar(current: number, target: number, speed: number, delta: number): number {
  return current + (target - current) * Math.min(1, speed * delta);
}

export function lerpVector3(current: THREE.Vector3, target: THREE.Vector3, speed: number, delta: number): void {
  current.lerp(target, Math.min(1, speed * delta));
}

export function lerpEuler(current: THREE.Euler, target: THREE.Euler, speed: number, delta: number): void {
  current.x = lerpScalar(current.x, target.x, speed, delta);
  current.y = lerpScalar(current.y, target.y, speed, delta);
  current.z = lerpScalar(current.z, target.z, speed, delta);
}
