import * as THREE from 'three';

export const WaveShader = {
    uniforms: {
    time: { value: 0.0 },
    amplitude: { value: 0.2 },
    frequency: { value: 2.0 },
    speed: { value: 1.0 },
    color1: { value: new THREE.Color(0.2, 0.4, 0.8) }, // ✅ Color object
    color2: { value: new THREE.Color(0.8, 0.2, 0.4) }, // ✅ Color object
    progress: { value: 0 },
    deltaTime: { value: 0 },
  },

  vertexShader: `
    uniform float progress;
    uniform float amplitude;
    uniform float frequency;
    uniform float speed;
    varying vec3 vPos;
    varying vec3 vNormal;
    varying vec3 vViewDir;
      uniform float time;

    void main() {
      vec3 pos = position;
      vPos = position;
      vNormal = normalMatrix * normal;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewDir = -mvPosition.xyz;
      float phase = mod(progress, 10.0);
      pos.y += sin(pos.x * frequency * 2.0 + phase) * amplitude;
      pos.y += 0.5 * sin(pos.z * frequency * 2.0 + phase * 1.5) * amplitude;
      pos.x += 0.3 * cos(pos.y * frequency * 1.5 + phase * 0.8) * amplitude;
      vPos = pos;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,

  fragmentShader: `
    uniform float time;
    uniform float amplitude;
    uniform float frequency;
    uniform float speed;
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec3 vPos;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    uniform float progress;

    void main() {
      float mixFactor = sin(vPos.y * frequency * 0.25 + progress) * 0.5 + 0.5;

      vec3 waveColor = mix(color1, color2, mixFactor);

      float dist = length(vPos.xy);
      vec3 radialColor = vec3(dist * 0.5 + 0.5);

      float rim = 1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0);
      rim = pow(rim, 2.5);
      vec3 glowColor = vec3(1.0, 0.8, 0.5) * rim;

      vec3 finalColor = waveColor * radialColor * 0.6 + glowColor * 0.4;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};


export function createWaveMaterial(customUniforms: typeof WaveShader.uniforms): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: customUniforms, // ✅ Use the passed uniforms directly
    vertexShader: WaveShader.vertexShader,
    fragmentShader: WaveShader.fragmentShader,
     //wireframe: true
  });
}