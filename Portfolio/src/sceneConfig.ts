// sceneConfig.ts
import * as THREE from 'three';

export interface Uniforms {
  speed: { value: number };
  amplitude: { value: number };
  frequency: { value: number };
  time: { value: number };
  color1: { value: THREE.Color };
  color2: { value: THREE.Color };
}

export interface SceneSettings {
  fov: number;
  yaw: number;
  pitch: number,
  backgroundColor: number;
  near: number;
  far: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}

export interface SceneConfig {
  uniforms: Uniforms;
  settings: SceneSettings;
}

// Example scenes array
export const scenes: SceneConfig[] = [
    
{
  uniforms: {
    speed: { value: 0.41 },
    amplitude: { value: 0.2 },
    frequency: { value: 4.68 },
    time: { value: 0 },
    color1: { value: new THREE.Color('#3366CC') },
    color2: { value: new THREE.Color('#CC3366') }
  },
  settings: {
    fov: 40,
    yaw: 0,
    pitch: 0,
    backgroundColor: 0x000000,
    near: 0.1,
    far: 1000,
        scaleX: 5,
    scaleY: 0.58,
    scaleZ: 0.92,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0
  }
},
  {
  uniforms: {
    speed: { value: 1 },
    amplitude: { value: 0.5 },
    frequency: { value: 2 },
    time: { value: 0 },
color1: { value: new THREE.Color('#a62f1aff') },
    color2: { value: new THREE.Color('#E68F19') }
  },
  settings: {
    fov: 65,
    yaw: 0,
    pitch: 0,
    backgroundColor: 0x000000,
    near: 0.1,
    far: 1000,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0
  }
},
{
  uniforms: {
    speed: { value: 0.39 },
    amplitude: { value: 0.04 },
    frequency: { value: 0.51 },
    time: { value: 0 },
    color1: { value: new THREE.Color('#8050B3') },
    color2: { value: new THREE.Color('#33CC99') }
  },
  settings: {
    fov: 25,
    yaw: 0.22,
    pitch: 0,
    backgroundColor: 0x000000,
    near: 0.1,
    far: 1000,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    rotationX: 1,
    rotationY: 1,
    rotationZ: 1
  }
},
{
  uniforms: {
    speed: { value: 1.45 },
    amplitude: { value: 0.75 },
    frequency: { value: 4.66 },
    time: { value: 0 },
    color1: { value: new THREE.Color('#3366cc') },
    color2: { value: new THREE.Color('#cc3366') }
  },
  settings: {
    fov: 20,
    yaw: 0,
    pitch: 0.3,
    backgroundColor: 0x000000,
    near: 0.1,
    far: 1000,
    scaleX: 0.53,
    scaleY: 0.58,
    scaleZ: 0.62,
    rotationX: 0,
    rotationY: 6.4633,
    rotationZ: 0
  }
}
  // Add more pages/scenes as needed
];
