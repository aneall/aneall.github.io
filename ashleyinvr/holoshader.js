// Holographic shader registration

AFRAME.registerShader('holographic', {
  schema: {
    time: { type: 'time', is: 'uniform' }
  },
  vertexShader: `
    // Vertex Shader code
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    // Fragment Shader code
    varying vec2 vUv;
    uniform float time;
    void main() {
      float r = 0.5 + 0.5 * sin(vUv.x * 6.2831 + time);
      float g = 0.5 + 0.5 * sin(vUv.y * 6.2831 + time + 2.0);
      float b = 0.5 + 0.5 * sin(vUv.x * 6.2831 + vUv.y * 6.2831 + time + 4.0);
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
});

// Component to animate the 'time' uniform
AFRAME.registerComponent('shader-time', {
  tick: function (t) {
    this.el.components.material.material.uniforms.time.value = t / 100;
  }
});