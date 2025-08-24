// src/three/ThreeScene.ts
import * as THREE from 'three';
import { WaveShader, createWaveMaterial } from './shaders';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { setupPostProcessing } from './setupPostProcessing';
import { lerpScalar, lerpVector3, lerpEuler } from './utils';
export default class ThreeScene {
  private canvas: HTMLCanvasElement;
  private scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private object!: THREE.Mesh;
  private composer: EffectComposer;
  private animationId!: number;
  private uniforms: typeof WaveShader.uniforms;
  private lastTime = 0;
  private lastFov: number;
  private isVisible = true;
  private sceneSettings: any;

  private targets = {
    fov: 75,
    rotation: new THREE.Euler(0, 0, 0),
    scale: new THREE.Vector3(1, 1, 1),
    yaw: 0,
    pitch: 0,
  };

  private uniformTargets = {
    speed: 0,
    amplitude: 0,
    frequency: 0,
    color1: new THREE.Color(0xffffff),
    color2: new THREE.Color(0xffffff),
  };
  private lerpSpeed = 1.0;

  constructor(canvas: HTMLCanvasElement, uniforms: typeof WaveShader.uniforms, sceneSettings: any) {
    this.sceneSettings = sceneSettings;
    this.canvas = canvas;
    this.uniforms = uniforms;
    this.uniformTargets.speed = uniforms.speed.value;
    
    this.uniformTargets.amplitude = uniforms.amplitude.value;
    this.uniformTargets.frequency = uniforms.frequency.value;
  

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      sceneSettings.fov || 75,
      window.innerWidth / window.innerHeight,
      sceneSettings.near || 0.1,
      sceneSettings.far || 100
    );
    this.camera.position.z = 3;

    this.targets.fov = sceneSettings.fov || 75;
    this.targets.rotation.y = sceneSettings.yaw || 0;
    this.targets.rotation.x = sceneSettings.pitch || 0;


    this.camera.fov = this.targets.fov;
    this.camera.rotation.y = this.targets.yaw;
    this.camera.rotation.x =this.targets.pitch;
    this.camera.updateProjectionMatrix();

    this.lastFov = this.camera.fov;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.createObject();

    this.composer = setupPostProcessing(this.renderer, this.scene, this.camera);

    this.animate = this.animate.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);

    window.addEventListener('resize', this.onWindowResize);
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.animate();
  }

  private createObject(): void {
    const material = createWaveMaterial(this.uniforms);
    // Reduced geometry complexity
    this.object = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 128), material);
    this.object.scale.set(this.sceneSettings.scaleX,this.sceneSettings.scaleX,this.sceneSettings.scaleY)
    this.scene.add(this.object);
  }
private progress = 0; // Add this property to the class

private animate(): void {
  if (!this.isVisible) return;

  this.animationId = requestAnimationFrame(this.animate);

  const t = performance.now() * 0.001; // seconds
  let delta = t - this.lastTime;
  this.lastTime = t;
  delta = Math.min(delta, 0.05);

  // Clamp delta to avoid jumps after tab inactive
  delta = Math.min(delta, 0.05); // max 50ms per frame

  // Keep real time for any shader that needs it
  this.uniforms.time.value = t;

  // Smooth transitions for camera FOV
  const newFov = lerpScalar(this.camera.fov, this.targets.fov, this.lerpSpeed, delta);
  if (Math.abs(newFov - this.lastFov) > 0.01) {
    this.camera.fov = newFov;
    this.camera.updateProjectionMatrix();
    this.lastFov = newFov;
  }

  // Lerp scale if needed
  if (!this.object.scale.equals(this.targets.scale)) {
    lerpVector3(this.object.scale, this.targets.scale, this.lerpSpeed, delta);
  }

  // Lerp rotation
  if (
    Math.abs(this.object.rotation.x - this.targets.rotation.x) > 0.0001 ||
    Math.abs(this.object.rotation.y - this.targets.rotation.y) > 0.0001 ||
    Math.abs(this.object.rotation.z - this.targets.rotation.z) > 0.0001
  ) {
    lerpEuler(this.object.rotation, this.targets.rotation, this.lerpSpeed, delta);
  }

  // Camera yaw/pitch lerp
  this.camera.rotation.y = lerpScalar(this.camera.rotation.y, this.targets.yaw, this.lerpSpeed, delta);
  this.camera.rotation.x = lerpScalar(this.camera.rotation.x, this.targets.pitch, this.lerpSpeed, delta);

  // --- Smoothly interpolate speed ---
  this.uniforms.speed.value = lerpScalar(
    this.uniforms.speed.value,
    this.uniformTargets.speed,
    0.001, // smoothing factor for speed
    1
  );

  // Lerp other scalar uniforms
  this.uniforms.amplitude.value = lerpScalar(this.uniforms.amplitude.value, this.uniformTargets.amplitude, this.lerpSpeed, delta);
  this.uniforms.frequency.value = lerpScalar(this.uniforms.frequency.value, this.uniformTargets.frequency, this.lerpSpeed, delta);

  // Lerp colors
  this.uniforms.color1.value.lerp(this.uniformTargets.color1, this.lerpSpeed * delta);
  this.uniforms.color2.value.lerp(this.uniformTargets.color2, this.lerpSpeed * delta);

  // --- Continuous progress accumulation using current speed ---
  this.progress += this.uniforms.speed.value * delta;
  this.uniforms.progress.value = this.progress;

  this.uniforms.deltaTime.value = delta;


  // Render
  this.composer.render();
}



  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
  }

  private onVisibilityChange(): void {
    this.isVisible = !document.hidden;
    if (this.isVisible) this.animate();
    else cancelAnimationFrame(this.animationId);
  }

  // API Methods
  public setYaw(yaw: number) {
    this.targets.yaw = yaw;
  }
    public setPitch(pitch: number) {
    this.targets.pitch = pitch;
  }

  public setFov(fov: number) {
    this.targets.fov = fov;
  }

  public setRotation(x: number, y: number, z: number) {
    this.targets.rotation.set(x, y, z);
  }

  public setScale(x: number, y: number, z: number) {
    this.targets.scale.set(x, y, z);
  }
  public setUniforms(targets: Partial<typeof this.uniformTargets>) {
  if (targets.speed !== undefined) this.uniformTargets.speed = targets.speed;
  if (targets.amplitude !== undefined) this.uniformTargets.amplitude = targets.amplitude;
  if (targets.frequency !== undefined) this.uniformTargets.frequency = targets.frequency;
  if (targets.color1 !== undefined) this.uniformTargets.color1.copy(targets.color1);
  if (targets.color2 !== undefined) this.uniformTargets.color2.copy(targets.color2);
}

  public dispose(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.renderer.dispose();
    if (this.object.geometry) this.object.geometry.dispose();
    if (this.object.material) (this.object.material as THREE.Material).dispose();
    this.composer?.dispose();
  }
}
