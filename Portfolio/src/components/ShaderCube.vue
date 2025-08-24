<template>
  <div class="scene-container">
    <!-- Fullscreen canvas -->
    <canvas ref="canvas" class="background-canvas"></canvas>
<!--
    <div class="controls">
     
   
      <button @click="logCurrentSettings">Copy Current Settings</button>
       <label>
        Scene:
        <input type="number" v-model.number="currentSceneIndex" :min="0" :max="scenes.length - 1" />
      </label>
      <label>
        Speed {{ sliders.speed }}:
        <input type="range" min="0.1" max="4" step="0.01" v-model.number="sliders.speed" />
      </label>
      <label>
        Amplitude {{ sliders.amplitude }}:
        <input type="range" min="0" max="4" step="0.01" v-model.number="sliders.amplitude" />
      </label>
      <label>
        frequency: {{ sliders.frequency }}
        <input type="range" min="0" max="10" step="0.01" v-model.number="sliders.frequency" />
      </label>
      <label>
        fov: {{ sliders.fov }}

        <input type="range" min="10" max="120" step="1" v-model.number="sliders.fov" />
      </label>
      <label>
        YAW:
        <input type="range" min="-0.7" max="0.7" step="0.01" v-model.number="sliders.yaw" />
      </label>
      <label>
        PITCH:
        <input type="range" min="-0.7" max="0.7" step="0.01" v-model.number="sliders.pitch" />
      </label>
      <label>
        ROTATION SPEED X:
        <input type="range"  min="-100" max="100"  step="0.17453" v-model.number="sliders.rotationX" />
      </label>
      <label>
        ROTATION Y:
        <input type="range"  min="-100" max="100"  step="0.17453" v-model.number="sliders.rotationY" />
      </label>
      <label>
        ROTATION Z:
        <input type="range" min="-100" max="100" step="0.17453" v-model.number="sliders.rotationZ" />
      </label>
      <label>
        Scale X:
        <input type="range"  min="0.1" max="5" step="0.01" value="1" v-model.number="sliders.scaleX" />
      </label>

      <label>
        Scale X:
        <input type="range"  min="0.1" max="5" step="0.01" value="1"  v-model.number="sliders.scaleY" />
      </label>

      <label>
        Scale X:
        <input type="range"  min="0.1" max="5" step="0.01" value="1"  v-model.number="sliders.scaleZ" />
      </label>
      
    <label>
  Color1:
  <input type="color" v-model="sliders.color1" />
</label> 
<label>
  Color2:
  <input type="color" v-model="sliders.color2" />
    </label>
    </div>-->
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue';
import * as THREE from 'three';
import ThreeScene from '../threeScene.ts';
import { scenes } from '../sceneConfig';


const props = defineProps<{
  currentPage: number
}>();

watch(() => props.currentPage, (newPage) => {
  console.log('Page changed:', newPage);
  applyScene(newPage);
});
const canvas = ref<HTMLCanvasElement | null>(null);

const currentSceneIndex = ref(0);

const sliders = reactive({
  amplitude: 0,
  frequency: 0,
  speed: 0,
  fov: 75,     
  yaw: 0,
  pitch: 0,
  time: 0,
  color1: '#ffffff',
  color2: '#ffffff', 
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0, 
  scaleX: 0,
  scaleY: 0,
  scaleZ: 0, 
});

// Three.js uniforms
const uniforms = reactive({
  speed: { value: sliders.speed },
  amplitude: { value: sliders.amplitude },
  frequency: { value: sliders.frequency },
  time: { value: sliders.time },
  color1: { value: new THREE.Color(sliders.color1) },
  color2: { value: new THREE.Color(sliders.color2) },
  progress: {value: 0},
  deltaTime: {value: 0}
});

const sceneSettings = reactive(scenes[0].settings);

let sceneInstance: ThreeScene;

function applyScene(sceneIndex: number) {
  const scene = scenes[sceneIndex];

  // Update sliders (for UI)
  sliders.speed = scene.uniforms.speed.value;
  sliders.amplitude = scene.uniforms.amplitude.value;
  sliders.frequency = scene.uniforms.frequency.value;
  sliders.color1 = `#${scene.uniforms.color1.value.getHexString()}`;
  sliders.color2 = `#${scene.uniforms.color2.value.getHexString()}`;
  sliders.fov = scene.settings.fov;
  sliders.yaw = scene.settings.yaw;
  sliders.pitch = scene.settings.pitch
  sliders.scaleX = scene.settings.scaleX;
  sliders.scaleY = scene.settings.scaleY;
  sliders.scaleZ = scene.settings.scaleZ;
  sliders.rotationX = scene.settings.rotationX;
  sliders.rotationY = scene.settings.rotationY;
  sliders.rotationZ = scene.settings.rotationZ;

  // Set targets in ThreeScene using lerp-friendly API
  sceneInstance.setUniforms({
    speed: scene.uniforms.speed.value,
    amplitude: scene.uniforms.amplitude.value,
    frequency: scene.uniforms.frequency.value,
    color1: scene.uniforms.color1.value,
    color2: scene.uniforms.color2.value,
  });

  sceneInstance.setFov(scene.settings.fov);
  sceneInstance.setYaw(scene.settings.yaw);
  sceneInstance.setYaw(scene.settings.pitch);
  sceneInstance.setScale(scene.settings.scaleX, scene.settings.scaleY, scene.settings.scaleZ);
  sceneInstance.setRotation(scene.settings.rotationX, scene.settings.rotationY, scene.settings.rotationZ);
}
onMounted(() => {
  sceneInstance = new ThreeScene(canvas.value!, uniforms, sceneSettings);
  applyScene(currentSceneIndex.value);
  watch(currentSceneIndex, (newIndex) => {
    applyScene(newIndex);
  });

 watch(sliders, (val) => {
  // Use setUniforms so ThreeScene lerps values
  sceneInstance.setUniforms({
    speed: val.speed,
    amplitude: val.amplitude,
    frequency: val.frequency,
    color1: new THREE.Color(val.color1),
    color2: new THREE.Color(val.color2),
  });

  // Scene settings still update targets
  sceneInstance.setFov(val.fov);
  sceneInstance.setYaw(val.yaw);
  sceneInstance.setPitch(val.pitch);
  sceneInstance.setScale(val.scaleX, val.scaleY, val.scaleZ);
  sceneInstance.setRotation(val.rotationX, val.rotationY, val.rotationZ);
}, { deep: true });

});

onBeforeUnmount(() => {
  sceneInstance.dispose();
});
</script>

<style scoped>


.scene-container {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background-canvas {
  position: fixed; /* fixed so it stays behind content */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* behind UI */
}

.controls {
position: fixed;
  top: 20px;
  left: 20px;
  z-index: 99999; /* above canvas */
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.controls label {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.controls input[type="range"] {
  flex: 1;
}
canvas {
  pointer-events: none; /* allow scroll/touch events to pass */
}
</style>