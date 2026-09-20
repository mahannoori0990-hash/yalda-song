(() => {
  'use strict';
  const canvas = document.getElementById('yalda3d');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero) return;

  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  if (!gl) {
    document.documentElement.classList.add('no-webgl');
    return;
  }

  const vertexSource = `
    attribute vec3 aPosition;
    attribute vec3 aColor;
    attribute float aSize;
    uniform float uTime;
    uniform vec2 uPointer;
    uniform float uAspect;
    uniform float uSide;
    uniform float uPixelRatio;
    varying vec3 vColor;
    varying float vGlow;
    void main() {
      vec3 p = aPosition;
      float yaw = uTime * .075 + uPointer.x * .34;
      float pitch = uPointer.y * .18;
      mat3 ry = mat3(cos(yaw),0.,-sin(yaw), 0.,1.,0., sin(yaw),0.,cos(yaw));
      mat3 rx = mat3(1.,0.,0., 0.,cos(pitch),-sin(pitch), 0.,sin(pitch),cos(pitch));
      p = rx * ry * p;
      p.x += uSide * 1.48;
      p.y += sin(uTime * .7) * .055;
      float depth = p.z + 5.25;
      gl_Position = vec4((p.x / uAspect) * 2.28 / depth, p.y * 2.28 / depth, 0., 1.);
      gl_PointSize = min(26., aSize * uPixelRatio * (6.6 / depth));
      vColor = aColor;
      vGlow = aSize;
    }
  `;
  const fragmentSource = `
    precision mediump float;
    varying vec3 vColor;
    varying float vGlow;
    void main() {
      vec2 uv = gl_PointCoord - .5;
      float d = length(uv);
      if (d > .5) discard;
      float core = smoothstep(.5, .03, d);
      float halo = smoothstep(.5, .16, d) * .45;
      gl_FragColor = vec4(vColor * (1. + core * .45), max(core, halo) * .92);
    }
  `;

  function shader(type, source) {
    const value = gl.createShader(type);
    gl.shaderSource(value, source);
    gl.compileShader(value);
    if (!gl.getShaderParameter(value, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(value));
    return value;
  }

  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  } catch (error) {
    document.documentElement.classList.add('no-webgl');
    return;
  }

  const positions = [];
  const colors = [];
  const sizes = [];
  const add = (x, y, z, color, size) => {
    positions.push(x, y, z);
    colors.push(...color);
    sizes.push(size);
  };
  const crimson = [0.82, 0.055, 0.17];
  const ruby = [1.0, 0.16, 0.3];
  const wine = [0.4, 0.018, 0.09];
  const gold = [1.0, 0.68, 0.22];
  const blush = [1.0, 0.46, 0.5];

  // A point-cloud pomegranate: a softly faceted sphere plus a five-point crown.
  for (let i = 0; i < 2300; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = Math.PI * 2 * u;
    const phi = Math.acos(2 * v - 1);
    const radius = .95 + Math.random() * .13;
    const x = Math.sin(phi) * Math.cos(theta) * radius;
    const y = Math.cos(phi) * radius - .08;
    const z = Math.sin(phi) * Math.sin(theta) * radius;
    const light = .44 + (x * -.18 + y * .22 + z * .12);
    const palette = Math.random() > .84 ? ruby : (light > .48 ? crimson : wine);
    add(x, y, z, palette, 1.2 + Math.random() * 2.7);
  }
  for (let spike = 0; spike < 5; spike++) {
    const angle = spike / 5 * Math.PI * 2;
    for (let i = 0; i < 90; i++) {
      const t = Math.random();
      const spread = (1 - t) * .23;
      add(
        Math.cos(angle) * (.25 + t * .28) + (Math.random() - .5) * spread,
        .9 + t * .62,
        Math.sin(angle) * (.25 + t * .28) + (Math.random() - .5) * spread,
        Math.random() > .75 ? gold : ruby,
        1.3 + Math.random() * 2.1
      );
    }
  }
  // Orbiting golden dust gives the object depth even before pointer movement.
  for (let i = 0; i < 540; i++) {
    const angle = Math.random() * Math.PI * 2;
    const ring = 1.28 + Math.random() * .55;
    add(Math.cos(angle) * ring, (Math.random() - .5) * .72, Math.sin(angle) * ring * .55, Math.random() > .25 ? gold : blush, .7 + Math.random() * 1.8);
  }

  const stride = new Float32Array(positions.length / 3 * 7);
  for (let i = 0; i < positions.length / 3; i++) {
    const o = i * 7;
    stride[o] = positions[i * 3];
    stride[o + 1] = positions[i * 3 + 1];
    stride[o + 2] = positions[i * 3 + 2];
    stride[o + 3] = colors[i * 3];
    stride[o + 4] = colors[i * 3 + 1];
    stride[o + 5] = colors[i * 3 + 2];
    stride[o + 6] = sizes[i];
  }

  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, stride, gl.STATIC_DRAW);
  const bytes = Float32Array.BYTES_PER_ELEMENT;
  const bind = (name, amount, offset) => {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, amount, gl.FLOAT, false, 7 * bytes, offset * bytes);
  };
  bind('aPosition', 3, 0);
  bind('aColor', 3, 3);
  bind('aSize', 1, 6);

  const uniforms = {
    time: gl.getUniformLocation(program, 'uTime'),
    pointer: gl.getUniformLocation(program, 'uPointer'),
    aspect: gl.getUniformLocation(program, 'uAspect'),
    side: gl.getUniformLocation(program, 'uSide'),
    pixelRatio: gl.getUniformLocation(program, 'uPixelRatio')
  };
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = true;

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const rect = hero.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(uniforms.aspect, rect.width / Math.max(rect.height, 1));
    gl.uniform1f(uniforms.pixelRatio, ratio);
  }
  resize();
  new ResizeObserver(resize).observe(hero);
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    pointer.tx = (event.clientX - rect.left) / rect.width * 2 - 1;
    pointer.ty = ((event.clientY - rect.top) / rect.height * 2 - 1) * -1;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { pointer.tx = 0; pointer.ty = 0; });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(hero);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  function render(ms) {
    if (!reduceMotion) requestAnimationFrame(render);
    if (!visible && !reduceMotion) return;
    pointer.x += (pointer.tx - pointer.x) * .035;
    pointer.y += (pointer.ty - pointer.y) * .035;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uniforms.time, reduceMotion ? 0 : ms * .001);
    gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
    gl.uniform1f(uniforms.side, innerWidth < 680 ? 0 : (document.documentElement.dir === 'rtl' ? -1 : 1));
    gl.drawArrays(gl.POINTS, 0, positions.length / 3);
  }
  requestAnimationFrame(render);
})();
