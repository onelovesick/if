import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

/* ═══════════════════════════════════════
   SIMPLEX NOISE (GLSL)
   ═══════════════════════════════════════ */
const SNOISE_GLSL = `
vec3 mod289v3(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289v4(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289v4(((x*34.0)+1.0)*x); }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g, l.zxy);
  vec3 i2 = max(g, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289v3(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 *
    vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

/* ═══════════════════════════════════════
   MATERIALS
   ═══════════════════════════════════════ */
function createLetterMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uDissolve: { value: 0 },
    },
    vertexShader: `
      ${SNOISE_GLSL}
      uniform float uTime;
      uniform float uDissolve;
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      varying vec3 vViewPos;
      varying float vNoise;
      void main() {
        vec3 pos = position;
        float n = snoise(pos * 3.0 + uTime * 0.15) * 0.015;
        pos += normal * n;
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPos = worldPos.xyz;
        vNormal = normalize(normalMatrix * normal);
        vec4 viewPos = viewMatrix * worldPos;
        vViewPos = viewPos.xyz;
        vNoise = snoise(position * 4.0 + uTime * 0.1) * 0.5 + 0.5;
        gl_Position = projectionMatrix * viewPos;
      }
    `,
    fragmentShader: `
      ${SNOISE_GLSL}
      uniform float uTime;
      uniform float uDissolve;
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      varying vec3 vViewPos;
      varying float vNoise;
      void main() {
        if (uDissolve > 0.01) {
          float nv = snoise(vWorldPos * 3.0 + uTime * 0.3) * 0.5 + 0.5;
          if (nv < uDissolve - 0.05) discard;
          float edge = 1.0 - smoothstep(uDissolve - 0.05, uDissolve + 0.08, nv);
          if (edge > 0.01) {
            vec3 glow = vec3(0.08, 0.55, 0.65) * edge * 4.0;
            gl_FragColor = vec4(glow, 1.0);
            return;
          }
        }
        vec3 N = normalize(vNormal);
        vec3 V = normalize(-vViewPos);
        vec3 L = normalize(vec3(5.0, 6.0, 12.0) - vWorldPos);
        vec3 H = normalize(L + V);
        float diff = max(dot(N, L), 0.0);
        float spec = pow(max(dot(N, H), 0.0), 180.0) * 2.5;
        float fresnel = pow(1.0 - max(dot(N, V), 0.0), 4.0);
        vec3 baseCol = vec3(0.72, 0.74, 0.78);
        float ambient = 0.42;
        vec3 col = baseCol * (diff * 0.65 + ambient);
        vec3 L2 = normalize(vec3(-8.0, 3.0, 10.0) - vWorldPos);
        float diff2 = max(dot(N, L2), 0.0);
        col += baseCol * diff2 * 0.3;
        col += vec3(0.35, 0.5, 0.55) * fresnel * 0.35;
        col += vec3(0.9, 0.92, 0.95) * spec * 0.6;
        col = min(col, vec3(0.88));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.FrontSide,
  })
}

function createOMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uZoom: { value: 0 },
    },
    vertexShader: `
      ${SNOISE_GLSL}
      uniform float uTime;
      uniform float uZoom;
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      varying vec3 vViewPos;
      varying float vFresnel;
      void main() {
        vec3 pos = position;
        float wave = snoise(position * 3.0 + uTime * 0.25) * 0.01 * (0.5 + uZoom * 0.5);
        pos += normal * wave;
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPos = worldPos.xyz;
        vNormal = normalize(normalMatrix * normal);
        vec4 viewPos = viewMatrix * worldPos;
        vViewPos = viewPos.xyz;
        vec3 viewN = normalize(normalMatrix * normal);
        vec3 viewV = normalize(-viewPos.xyz);
        vFresnel = pow(1.0 - max(dot(viewN, viewV), 0.0), 3.5);
        gl_Position = projectionMatrix * viewPos;
      }
    `,
    fragmentShader: `
      ${SNOISE_GLSL}
      uniform float uTime;
      uniform float uZoom;
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      varying vec3 vViewPos;
      varying float vFresnel;
      void main() {
        vec3 N = normalize(vNormal);
        vec3 V = normalize(-vViewPos);
        vec3 L = normalize(vec3(5.0, 6.0, 12.0) - vWorldPos);
        vec3 H = normalize(L + V);
        float diff = max(dot(N, L), 0.0);
        float spec = pow(max(dot(N, H), 0.0), 220.0) * 3.0;
        float spec2 = pow(max(dot(N, H), 0.0), 40.0) * 0.35;
        vec3 base = vec3(0.72, 0.75, 0.80);
        vec3 edgeCol = vec3(0.3, 0.55, 0.6);
        vec3 col = base * (diff * 0.65 + 0.42);
        vec3 L2 = normalize(vec3(-8.0, 3.0, 10.0) - vWorldPos);
        float diff2 = max(dot(N, L2), 0.0);
        col += base * diff2 * 0.3;
        col += edgeCol * vFresnel * (0.35 + uZoom * 0.5);
        col += vec3(0.9, 0.92, 0.95) * spec * 0.5;
        col += edgeCol * spec2 * 0.3;
        col = min(col, vec3(0.9));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.FrontSide,
  })
}

/* ═══════════════════════════════════════
   PARTICLE SYSTEM
   ═══════════════════════════════════════ */
function createParticleSystem(geometry: THREE.BufferGeometry, count: number) {
  count = count || 320
  const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
  const idx = geometry.index
  const triCount = idx ? idx.count / 3 : Math.floor(posAttr.count / 3)
  const actual = Math.min(count, triCount)
  const step = Math.max(1, Math.floor(triCount / actual))

  const origins: number[] = []
  const velocities: number[] = []
  const sizes: number[] = []
  const delays: number[] = []

  const va = new THREE.Vector3(), vb = new THREE.Vector3(), vc = new THREE.Vector3(), ctr = new THREE.Vector3()

  for (let t = 0, s = 0; t < triCount && s < actual; t += step, s++) {
    const i0 = idx ? idx.getX(t * 3) : t * 3
    const i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1
    const i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2
    va.fromBufferAttribute(posAttr, i0)
    vb.fromBufferAttribute(posAttr, i1)
    vc.fromBufferAttribute(posAttr, i2)
    ctr.copy(va).add(vb).add(vc).divideScalar(3)

    origins.push(ctr.x, ctr.y, ctr.z)
    const vel = new THREE.Vector3(
      (ctr.x + (Math.random() - 0.5) * 2) * 0.6,
      (ctr.y + (Math.random() - 0.5) * 1.5) * 0.4 + 0.2,
      (Math.random() - 0.5) * 3 + 1.5
    ).normalize().multiplyScalar(0.8 + Math.random() * 1.5)
    velocities.push(vel.x, vel.y, vel.z)
    sizes.push(1.0 + Math.random() * 2.5)
    delays.push(Math.random() * 0.3)
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(origins), 3))
  geo.setAttribute('aOrigin', new THREE.Float32BufferAttribute(new Float32Array(origins), 3))
  geo.setAttribute('aVel', new THREE.Float32BufferAttribute(new Float32Array(velocities), 3))
  geo.setAttribute('aSize', new THREE.Float32BufferAttribute(new Float32Array(sizes), 1))
  geo.setAttribute('aDelay', new THREE.Float32BufferAttribute(new Float32Array(delays), 1))

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uProg: { value: 0 },
      uTime: { value: 0 },
    },
    vertexShader: `
      attribute vec3 aOrigin, aVel;
      attribute float aSize, aDelay;
      uniform float uProg;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        float t = clamp((uProg - aDelay) / max(1.0 - aDelay, 0.001), 0.0, 1.0);
        float ease = t * t * (3.0 - 2.0 * t);
        vec3 pos = aOrigin + aVel * ease * 9.0;
        pos.x += sin(uTime * 1.2 + aDelay * 10.0) * ease * 0.5;
        pos.y += cos(uTime * 0.9 + aDelay * 8.0) * ease * 0.35;
        pos.z += sin(uTime * 0.7 + aDelay * 6.0) * ease * 0.25;
        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * (5.0 / -mvPos.z) * (1.0 - ease * 0.3);
        gl_Position = projectionMatrix * mvPos;
        float fadeIn = min(1.0, t * 5.0);
        vAlpha = fadeIn * 0.7;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float core = smoothstep(0.5, 0.0, d);
        float innerCore = smoothstep(0.3, 0.0, d);
        vec3 col = mix(vec3(0.4, 0.6, 0.7), vec3(0.85, 0.92, 0.98), core);
        col += vec3(0.5, 0.8, 0.85) * innerCore * innerCore * 0.6;
        gl_FragColor = vec4(col, core * vAlpha * 1.6);
      }
    `,
  })

  return new THREE.Points(geo, mat)
}

/* ═══════════════════════════════════════
   SHARD SYSTEM
   ═══════════════════════════════════════ */
function createShardSystem(geometry: THREE.BufferGeometry, shardCount: number) {
  shardCount = shardCount || 140
  const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
  const idx = geometry.index
  const triCount = idx ? idx.count / 3 : Math.floor(posAttr.count / 3)
  const actual = Math.min(shardCount, triCount)
  const step = Math.max(1, Math.floor(triCount / actual))

  const shardGeo = new THREE.TetrahedronGeometry(0.035, 0)
  const shardMat = new THREE.MeshStandardMaterial({
    color: 0x99a4b8,
    metalness: 0.75,
    roughness: 0.2,
    emissive: new THREE.Color(0x0a2530),
    emissiveIntensity: 0.3,
  })

  const instMesh = new THREE.InstancedMesh(shardGeo, shardMat, actual)
  instMesh.frustumCulled = false

  const origins = new Float32Array(actual * 3)
  const vels = new Float32Array(actual * 3)
  const rotAxes = new Float32Array(actual * 3)
  const dly = new Float32Array(actual)
  const scl = new Float32Array(actual)

  const va = new THREE.Vector3(), vb = new THREE.Vector3(), vc = new THREE.Vector3(), ctr = new THREE.Vector3()

  for (let t = 0, s = 0; t < triCount && s < actual; t += step, s++) {
    const i0 = idx ? idx.getX(t * 3) : t * 3
    const i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1
    const i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2
    va.fromBufferAttribute(posAttr, i0)
    vb.fromBufferAttribute(posAttr, i1)
    vc.fromBufferAttribute(posAttr, i2)
    ctr.copy(va).add(vb).add(vc).divideScalar(3)

    origins[s * 3] = ctr.x
    origins[s * 3 + 1] = ctr.y
    origins[s * 3 + 2] = ctr.z

    const vel = new THREE.Vector3(
      (ctr.x + (Math.random() - 0.5) * 2) * 0.5,
      (ctr.y + (Math.random() - 0.5) * 1.5) * 0.3 + 0.1,
      (Math.random() - 0.5) * 3 + 1.2
    ).normalize().multiplyScalar(0.8 + Math.random() * 2.0)
    vels[s * 3] = vel.x
    vels[s * 3 + 1] = vel.y
    vels[s * 3 + 2] = vel.z

    rotAxes[s * 3] = Math.random() - 0.5
    rotAxes[s * 3 + 1] = Math.random() - 0.5
    rotAxes[s * 3 + 2] = Math.random() - 0.5

    dly[s] = Math.random() * 0.2
    scl[s] = 0.6 + Math.random() * 1.8
  }

  instMesh.userData = { origins, velocities: vels, rotAxes, delays: dly, scales: scl, count: actual }

  const dummy = new THREE.Object3D()
  for (let i = 0; i < actual; i++) {
    dummy.position.set(origins[i * 3], origins[i * 3 + 1], origins[i * 3 + 2])
    dummy.scale.setScalar(0)
    dummy.updateMatrix()
    instMesh.setMatrixAt(i, dummy.matrix)
  }
  instMesh.instanceMatrix.needsUpdate = true

  return instMesh
}

/* ═══════════════════════════════════════
   TRAIL SYSTEM
   ═══════════════════════════════════════ */
const TRAIL_HISTORY = 24
const WISP_HISTORY = 40

function createTrailSystem(shardCount: number) {
  const totalVerts = shardCount * TRAIL_HISTORY
  const positions = new Float32Array(totalVerts * 3)
  const alphas = new Float32Array(totalVerts)

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('aAlpha', new THREE.Float32BufferAttribute(alphas, 1))

  const indices: number[] = []
  for (let s = 0; s < shardCount; s++) {
    const base = s * TRAIL_HISTORY
    for (let t = 0; t < TRAIL_HISTORY - 1; t++) {
      indices.push(base + t, base + t + 1)
    }
  }
  geo.setIndex(indices)

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uGlobalAlpha: { value: 0 } },
    vertexShader: `
      attribute float aAlpha;
      uniform float uGlobalAlpha;
      varying float vAlpha;
      void main() {
        vAlpha = aAlpha * uGlobalAlpha;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        if (vAlpha < 0.002) discard;
        vec3 col = mix(vec3(0.15, 0.45, 0.55), vec3(0.55, 0.82, 0.9), vAlpha);
        gl_FragColor = vec4(col, vAlpha * 0.65);
      }
    `,
  })

  const lines = new THREE.LineSegments(geo, mat)
  lines.frustumCulled = false
  lines.visible = false

  const history: THREE.Vector3[][] = []
  for (let s = 0; s < shardCount; s++) {
    history[s] = []
    for (let t = 0; t < TRAIL_HISTORY; t++) {
      history[s][t] = new THREE.Vector3()
    }
  }
  lines.userData = { history, shardCount }

  return lines
}

function createWispSystem(shardCount: number) {
  const wispIndices: number[] = []
  for (let i = 0; i < shardCount; i++) {
    if (Math.random() < 0.2) wispIndices.push(i)
  }
  const actual = wispIndices.length
  if (actual === 0) return null

  const totalVerts = actual * WISP_HISTORY
  const positions = new Float32Array(totalVerts * 3)
  const alphas = new Float32Array(totalVerts)

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('aAlpha', new THREE.Float32BufferAttribute(alphas, 1))

  const indices: number[] = []
  for (let s = 0; s < actual; s++) {
    const base = s * WISP_HISTORY
    for (let t = 0; t < WISP_HISTORY - 1; t++) {
      indices.push(base + t, base + t + 1)
    }
  }
  geo.setIndex(indices)

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uGlobalAlpha: { value: 0 } },
    vertexShader: `
      attribute float aAlpha;
      uniform float uGlobalAlpha;
      varying float vAlpha;
      void main() {
        vAlpha = aAlpha * uGlobalAlpha;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        if (vAlpha < 0.001) discard;
        vec3 col = mix(vec3(0.08, 0.3, 0.4), vec3(0.35, 0.65, 0.75), vAlpha);
        gl_FragColor = vec4(col, vAlpha * 0.35);
      }
    `,
  })

  const lines = new THREE.LineSegments(geo, mat)
  lines.frustumCulled = false
  lines.visible = false

  const history: THREE.Vector3[][] = []
  for (let s = 0; s < actual; s++) {
    history[s] = []
    for (let t = 0; t < WISP_HISTORY; t++) {
      history[s][t] = new THREE.Vector3()
    }
  }
  lines.userData = { history, wispIndices, wispCount: actual }

  return lines
}

function updateTrails(trailMesh: THREE.LineSegments, shardInstMesh: THREE.InstancedMesh, progress: number) {
  const td = trailMesh.userData as any
  const posAttr = trailMesh.geometry.getAttribute('position') as THREE.BufferAttribute
  const alphaAttr = trailMesh.geometry.getAttribute('aAlpha') as THREE.BufferAttribute
  const posArr = posAttr.array as Float32Array
  const alphaArr = alphaAttr.array as Float32Array
  const tmpMat = new THREE.Matrix4()
  const tmpPos = new THREE.Vector3()

  for (let s = 0; s < td.shardCount; s++) {
    for (let t = 0; t < TRAIL_HISTORY - 1; t++) {
      td.history[s][t].copy(td.history[s][t + 1])
    }
    shardInstMesh.getMatrixAt(s, tmpMat)
    tmpPos.setFromMatrixPosition(tmpMat)
    tmpPos.add(shardInstMesh.position)
    td.history[s][TRAIL_HISTORY - 1].copy(tmpPos)
  }

  for (let s = 0; s < td.shardCount; s++) {
    const base = s * TRAIL_HISTORY
    for (let t = 0; t < TRAIL_HISTORY; t++) {
      const idx3 = (base + t) * 3
      posArr[idx3] = td.history[s][t].x
      posArr[idx3 + 1] = td.history[s][t].y
      posArr[idx3 + 2] = td.history[s][t].z
      alphaArr[base + t] = (t / (TRAIL_HISTORY - 1)) ** 2
    }
  }

  posAttr.needsUpdate = true
  alphaAttr.needsUpdate = true
  ;(trailMesh.material as THREE.ShaderMaterial).uniforms.uGlobalAlpha.value = Math.min(1, progress * 3)
}

function updateWisps(wispMesh: THREE.LineSegments, shardInstMesh: THREE.InstancedMesh, progress: number) {
  const wd = wispMesh.userData as any
  const posAttr = wispMesh.geometry.getAttribute('position') as THREE.BufferAttribute
  const alphaAttr = wispMesh.geometry.getAttribute('aAlpha') as THREE.BufferAttribute
  const posArr = posAttr.array as Float32Array
  const alphaArr = alphaAttr.array as Float32Array
  const tmpMat = new THREE.Matrix4()
  const tmpPos = new THREE.Vector3()

  for (let w = 0; w < wd.wispCount; w++) {
    const shardIdx = wd.wispIndices[w]
    for (let t = 0; t < WISP_HISTORY - 1; t++) {
      wd.history[w][t].copy(wd.history[w][t + 1])
    }
    shardInstMesh.getMatrixAt(shardIdx, tmpMat)
    tmpPos.setFromMatrixPosition(tmpMat)
    tmpPos.add(shardInstMesh.position)
    wd.history[w][WISP_HISTORY - 1].copy(tmpPos)
  }

  for (let w = 0; w < wd.wispCount; w++) {
    const base = w * WISP_HISTORY
    for (let t = 0; t < WISP_HISTORY; t++) {
      const idx3 = (base + t) * 3
      posArr[idx3] = wd.history[w][t].x
      posArr[idx3 + 1] = wd.history[w][t].y
      posArr[idx3 + 2] = wd.history[w][t].z
      alphaArr[base + t] = (t / (WISP_HISTORY - 1)) ** 3
    }
  }

  posAttr.needsUpdate = true
  alphaAttr.needsUpdate = true
  ;(wispMesh.material as THREE.ShaderMaterial).uniforms.uGlobalAlpha.value = Math.min(1, progress * 3)
}

/* ═══════════════════════════════════════
   UPDATE SHARDS
   ═══════════════════════════════════════ */
const _dummy = new THREE.Object3D()
const _euler = new THREE.Euler()
const _quat = new THREE.Quaternion()

function updateShards(instMesh: THREE.InstancedMesh, progress: number, time: number) {
  const d = instMesh.userData as any
  if (!d || !d.count) return

  for (let i = 0; i < d.count; i++) {
    const rawT = (progress - d.delays[i]) / Math.max(1 - d.delays[i], 0.001)
    const t = Math.max(0, Math.min(1, rawT))
    const ease = t * t * (3.0 - 2.0 * t)
    const ease2 = ease * ease

    const drift = Math.sin(time * 0.6 + i * 0.5) * ease2
    const drift2 = Math.cos(time * 0.45 + i * 0.37) * ease2

    _dummy.position.set(
      d.origins[i * 3] + d.velocities[i * 3] * ease2 * 9 + drift * 0.5,
      d.origins[i * 3 + 1] + d.velocities[i * 3 + 1] * ease2 * 9 + drift2 * 0.4,
      d.origins[i * 3 + 2] + d.velocities[i * 3 + 2] * ease2 * 9 + Math.sin(time * 0.3 + i) * ease2 * 0.3
    )

    _euler.set(
      d.rotAxes[i * 3] * ease * Math.PI * 4,
      d.rotAxes[i * 3 + 1] * ease * Math.PI * 4,
      d.rotAxes[i * 3 + 2] * ease * Math.PI * 4
    )
    _quat.setFromEuler(_euler)
    _dummy.quaternion.copy(_quat)

    const fadeIn = Math.min(1, t * 5)
    const s = d.scales[i] * (1 - ease * 0.15) * fadeIn
    _dummy.scale.setScalar(Math.max(0, s))
    _dummy.updateMatrix()
    instMesh.setMatrixAt(i, _dummy.matrix)
  }
  instMesh.instanceMatrix.needsUpdate = true
  ;(instMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + progress * 2.0
}

/* ═══════════════════════════════════════
   EASINGS
   ═══════════════════════════════════════ */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

/* ═══════════════════════════════════════
   ANIMATION PHASES
   ═══════════════════════════════════════ */
const PHASE = {
  explodeStart: 0.01,
  explodeEnd: 0.62,
  zoomStart: 0.55,
  zoomEnd: 0.78,
}

/* ═══════════════════════════════════════
   MAIN INIT — called by React component
   ═══════════════════════════════════════ */
interface LetterEntry {
  mesh: THREE.Mesh
  shards: THREE.InstancedMesh | null
  particles: THREE.Points | null
  trails: THREE.LineSegments | null
  wisps: THREE.LineSegments | null
  origX: number
  isO: boolean
  index: number
  delay: number
  explodeDir: THREE.Vector3
  explodeSpd: number
  rotAxis: THREE.Vector3
}

export function initOmma(container: HTMLElement, onComplete: () => void): () => void {
  /* ── Auto-scroll config ── */
  const DURATION = 6       // seconds for rawScroll 0→1
  const SETTLE_DELAY = 1.2 // extra seconds after rawScroll reaches 1
  const FADE_MS = 800      // CSS fade-out duration

  let rawScroll = 0
  let smoothScroll = 0
  let mouseX = 0, mouseY = 0, smoothMouseX = 0, smoothMouseY = 0
  let smoothTiltX = 0, smoothTiltY = 0
  let autoStartTime = -1
  let fadingTriggered = false
  let disposed = false

  const onMouseMove = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true })

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x03040a, 1)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  container.appendChild(renderer.domElement)
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.inset = '0'

  /* ── Scene + Camera ── */
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x03040a)
  scene.fog = new THREE.FogExp2(0x03040a, 0.012)

  const CAM_START_Z = 20
  const CAM_END_Z = 0.3
  const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.01, 500)
  camera.position.set(0, 0, CAM_START_Z)

  /* ── Post-processing ── */
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.1, 0.3, 0.88
  )
  composer.addPass(bloomPass)

  const vignetteShader = {
    uniforms: {
      tDiffuse: { value: null },
      uVignette: { value: 0.4 },
      uFade: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float uVignette;
      uniform float uFade;
      varying vec2 vUv;
      void main() {
        vec3 col = texture2D(tDiffuse, vUv).rgb;
        float d = length(vUv - 0.5);
        col *= 1.0 - d * d * uVignette * 2.5;
        col = mix(col, vec3(0.012, 0.015, 0.025), uFade);
        gl_FragColor = vec4(col, 1.0);
      }
    `
  }
  const vigPass = new ShaderPass(vignetteShader)
  composer.addPass(vigPass)

  /* ── Lights ── */
  scene.add(new THREE.AmbientLight(0xb0c0d0, 1.4))

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
  keyLight.position.set(5, 6, 12)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0xc0ccdd, 1.6)
  fillLight.position.set(-8, 3, 10)
  scene.add(fillLight)

  const leftEdgeLight = new THREE.PointLight(0xd0e0f0, 2.5, 40)
  leftEdgeLight.position.set(-12, 1, 8)
  scene.add(leftEdgeLight)

  const rimLight = new THREE.PointLight(0x4090a0, 1.5, 80)
  rimLight.position.set(0, 0, 5)
  scene.add(rimLight)

  const topLight = new THREE.DirectionalLight(0xd0dce8, 1.0)
  topLight.position.set(0, 10, 5)
  scene.add(topLight)

  const backLight = new THREE.DirectionalLight(0x6080a0, 0.8)
  backLight.position.set(0, -2, -5)
  scene.add(backLight)

  /* ── Dust ── */
  const dustCount = 2000
  const dustGeo = new THREE.BufferGeometry()
  const dustPos = new Float32Array(dustCount * 3)
  const dustSizes = new Float32Array(dustCount)
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 100
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 60
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10
    dustSizes[i] = Math.random() * 1.0 + 0.2
  }
  dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(dustPos, 3))
  dustGeo.setAttribute('aSize', new THREE.Float32BufferAttribute(dustSizes, 1))

  const dustMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uAlpha: { value: 0.1 } },
    vertexShader: `
      attribute float aSize;
      uniform float uTime;
      void main() {
        vec3 pos = position;
        pos.y += sin(uTime * 0.04 + position.x * 0.1) * 0.5;
        pos.x += cos(uTime * 0.03 + position.z * 0.07) * 0.3;
        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * (5.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform float uAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.0, d) * uAlpha;
        gl_FragColor = vec4(0.1, 0.25, 0.3, a);
      }
    `,
  })
  const dustPoints = new THREE.Points(dustGeo, dustMat)
  scene.add(dustPoints)

  /* ── Void disc ── */
  const voidGeo = new THREE.CircleGeometry(0.65, 64)
  const voidMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: { uZoom: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      uniform float uZoom;
      varying vec2 vUv;
      void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        float r = length(uv);
        float voidCenter = smoothstep(0.6, 0.0, r);
        float ring = smoothstep(1.0, 0.3, r) * smoothstep(0.0, 0.1, r);
        vec3 dark = vec3(0.005, 0.006, 0.012);
        vec3 edgeTint = vec3(0.015, 0.035, 0.045);
        vec3 col = mix(edgeTint, dark, voidCenter);
        float a = clamp(uZoom * 0.9, 0.0, 0.92) * (ring * 0.25 + voidCenter * 0.75);
        a = clamp(a, 0.0, 0.95);
        gl_FragColor = vec4(col, a);
      }
    `,
  })
  const voidDisc = new THREE.Mesh(voidGeo, voidMat)
  voidDisc.visible = false

  /* ── UI overlay elements ── */
  const uiLayer = document.createElement('div')
  uiLayer.style.cssText = 'position:absolute;inset:0;z-index:2;pointer-events:none;'
  container.appendChild(uiLayer)

  const brandEl = document.createElement('span')
  brandEl.textContent = 'INFRAFORMA'
  brandEl.style.cssText = `
    position:absolute;top:clamp(24px,3vw,40px);left:clamp(24px,4vw,48px);
    font-family:'DM Mono',monospace;font-size:8px;letter-spacing:6px;
    text-transform:uppercase;color:rgba(255,255,255,0.12);opacity:0;
    transition:opacity 1s ease;
  `
  uiLayer.appendChild(brandEl)
  setTimeout(() => { brandEl.style.opacity = '1' }, 300)

  const enterEl = document.createElement('span')
  enterEl.textContent = 'Enter the System'
  enterEl.style.cssText = `
    position:absolute;bottom:clamp(80px,12vh,140px);left:50%;
    transform:translateX(-50%);font-family:'DM Mono',monospace;
    font-size:10px;letter-spacing:5px;text-transform:uppercase;
    color:rgba(255,255,255,0);transition:color 0.8s ease;white-space:nowrap;
  `
  uiLayer.appendChild(enterEl)

  // Corner brackets
  const cornerStyles = [
    'top:clamp(20px,2.5vw,36px);left:clamp(20px,3.5vw,44px);border-top:1px solid rgba(71,181,255,0.15);border-left:1px solid rgba(71,181,255,0.15);',
    'top:clamp(20px,2.5vw,36px);right:clamp(20px,3.5vw,44px);border-top:1px solid rgba(71,181,255,0.15);border-right:1px solid rgba(71,181,255,0.15);',
    'bottom:clamp(20px,2.5vw,36px);left:clamp(20px,3.5vw,44px);border-bottom:1px solid rgba(71,181,255,0.08);border-left:1px solid rgba(71,181,255,0.08);',
    'bottom:clamp(20px,2.5vw,36px);right:clamp(20px,3.5vw,44px);border-bottom:1px solid rgba(71,181,255,0.08);border-right:1px solid rgba(71,181,255,0.08);',
  ]
  cornerStyles.forEach((cs) => {
    const c = document.createElement('div')
    c.style.cssText = `position:absolute;width:24px;height:24px;opacity:0;transition:opacity 0.6s ease;${cs}`
    uiLayer.appendChild(c)
    setTimeout(() => { c.style.opacity = '1' }, 600)
  })

  /* ── Build text ── */
  const WORD = 'INFRAFORMA'
  const O_IDX = 6

  const letterData: LetterEntry[] = []
  let oWorldX = 0
  let sceneReady = false

  const oGroup = new THREE.Group()
  scene.add(oGroup)
  oGroup.add(voidDisc)

  const fontLoader = new FontLoader()
  fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
    if (disposed) return

    const SIZE = 1.4
    const DEPTH = 0.38
    const BEVEL_T = 0.03
    const BEVEL_S = 0.025
    const SPACING = 0.08

    const geoInfos: { geo: THREE.BufferGeometry; w: number; h: number }[] = []
    let totalWidth = 0

    for (let i = 0; i < WORD.length; i++) {
      const geo = new TextGeometry(WORD[i], {
        font,
        size: SIZE,
        depth: DEPTH,
        curveSegments: 14,
        bevelEnabled: true,
        bevelThickness: BEVEL_T,
        bevelSize: BEVEL_S,
        bevelSegments: 4,
      })
      geo.computeBoundingBox()
      const bb = geo.boundingBox!
      const w = bb.max.x - bb.min.x
      const h = bb.max.y - bb.min.y
      geoInfos.push({ geo, w, h })
      totalWidth += w + (i < WORD.length - 1 ? SPACING : 0)
    }

    const fovRad = (camera.fov * Math.PI) / 180
    const visibleWidth = 2 * Math.tan(fovRad / 2) * CAM_START_Z * camera.aspect
    const scale = (visibleWidth * 0.78) / totalWidth

    let xCursor = -(totalWidth * scale) / 2

    for (let i = 0; i < WORD.length; i++) {
      const { geo, w, h } = geoInfos[i]
      const letterWidth = w * scale

      const cx = xCursor + letterWidth / 2

      const bb = geo.boundingBox!
      geo.translate(-(bb.min.x + w / 2), -(bb.min.y + h / 2), -(bb.min.z + DEPTH / 2))
      geo.scale(scale, scale, scale)
      geo.computeBoundingBox()
      geo.computeVertexNormals()

      const isO = i === O_IDX
      const mat = isO ? createOMaterial() : createLetterMaterial()
      const mesh = new THREE.Mesh(geo, mat)

      const distFromO = Math.abs(i - O_IDX)
      const dirSign = cx >= 0 ? 1 : -1

      const entry: LetterEntry = {
        mesh,
        shards: null,
        particles: null,
        trails: null,
        wisps: null,
        origX: cx,
        isO,
        index: i,
        delay: distFromO * 0.06,
        explodeDir: new THREE.Vector3(
          dirSign * (0.5 + Math.random() * 0.5),
          (Math.random() - 0.5) * 0.6,
          -(0.3 + Math.random() * 1.0)
        ).normalize(),
        explodeSpd: 4 + Math.random() * 4,
        rotAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
      }

      if (isO) {
        oWorldX = cx
        oGroup.position.set(cx, 0, 0)
        mesh.position.set(0, 0, 0)
        oGroup.add(mesh)
        voidDisc.position.set(0, 0, -DEPTH * scale * 0.5 - 0.12)
      } else {
        mesh.position.set(cx, 0, 0)
        scene.add(mesh)

        const shards = createShardSystem(geo, 140)
        shards.position.set(cx, 0, 0)
        shards.visible = false
        scene.add(shards)
        entry.shards = shards

        const trails = createTrailSystem(shards.userData.count)
        trails.visible = false
        scene.add(trails)
        entry.trails = trails

        const wisps = createWispSystem(shards.userData.count)
        if (wisps) {
          wisps.visible = false
          scene.add(wisps)
        }
        entry.wisps = wisps

        const particles = createParticleSystem(geo, 320)
        particles.position.set(cx, 0, 0)
        particles.visible = false
        scene.add(particles)
        entry.particles = particles
      }

      letterData.push(entry)
      xCursor += letterWidth + SPACING * scale
    }

    sceneReady = true
  })

  /* ── Resize ── */
  const onResize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    composer.setSize(w, h)
    bloomPass.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  /* ── Animation loop ── */
  const clock = new THREE.Clock()

  function animate() {
    if (disposed) return

    const time = clock.getElapsedTime()

    // Auto-drive scroll progress once scene is ready
    if (sceneReady && autoStartTime < 0) {
      autoStartTime = time
    }
    if (autoStartTime >= 0) {
      const elapsed = time - autoStartTime
      rawScroll = Math.min(1, elapsed / DURATION)

      // Trigger fade-out after animation settles
      if (elapsed > DURATION + SETTLE_DELAY && !fadingTriggered) {
        fadingTriggered = true
        container.style.transition = `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
        container.style.opacity = '0'
        setTimeout(() => {
          if (!disposed) onComplete()
        }, FADE_MS + 50)
      }
    }

    // Smooth interpolation
    smoothScroll += (rawScroll - smoothScroll) * 0.1
    const sp = smoothScroll

    smoothMouseX += (mouseX - smoothMouseX) * 0.04
    smoothMouseY += (mouseY - smoothMouseY) * 0.04
    smoothTiltX += (mouseY - smoothTiltX) * 0.05
    smoothTiltY += (mouseX - smoothTiltY) * 0.05

    // Phase calculations
    const rawExpl = (sp - PHASE.explodeStart) / (PHASE.explodeEnd - PHASE.explodeStart)
    const rawZoom = (sp - PHASE.zoomStart) / (PHASE.zoomEnd - PHASE.zoomStart)
    const explP = Math.max(0, Math.min(1, rawExpl))
    const zoomP = Math.max(0, Math.min(1, rawZoom))
    const expl = easeInOutCubic(explP)
    const zoom = easeOutQuart(zoomP)

    // Dust
    dustMat.uniforms.uTime.value = time
    dustMat.uniforms.uAlpha.value = 0.1 * (1 - zoom * 0.8)
    dustPoints.position.x = smoothMouseX * 0.3
    dustPoints.position.y = smoothMouseY * 0.15

    if (sceneReady) {
      const focusBlend = easeInOutCubic(Math.max(0, Math.min(1, (sp - 0.01) / 0.35)))

      for (const entry of letterData) {
        if (entry.isO) {
          const oAnimScale = 1 - easeOutQuart(Math.max(0, Math.min(1, (zoom - 0.8) / 0.2)))
          ;(entry.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time * oAnimScale
          ;(entry.mesh.material as THREE.ShaderMaterial).uniforms.uZoom.value = zoom
          entry.mesh.position.y = Math.sin(time * 0.4) * 0.006 * (1 - zoom) * oAnimScale
        } else {
          const mat = entry.mesh.material as THREE.ShaderMaterial
          mat.uniforms.uTime.value = time

          const lp = (expl - entry.delay) / Math.max(1 - entry.delay, 0.001)
          const le = Math.max(0, Math.min(1, lp))
          const leEased = easeInOutCubic(le)

          mat.uniforms.uDissolve.value = leEased

          const dist = leEased * leEased * entry.explodeSpd * 1.5
          entry.mesh.position.set(
            entry.origX + entry.explodeDir.x * dist,
            entry.explodeDir.y * dist,
            entry.explodeDir.z * dist
          )

          if (leEased > 0.001) {
            entry.mesh.quaternion.identity()
            entry.mesh.rotateOnAxis(entry.rotAxis, leEased * Math.PI * 2.5)
          }

          entry.mesh.scale.setScalar(Math.max(0, 1 - leEased * 0.95))
          entry.mesh.visible = leEased < 0.98

          const parallaxStr = leEased * 0.6
          const pxOff = smoothMouseX * parallaxStr
          const pyOff = smoothMouseY * parallaxStr * 0.5

          if (entry.shards) {
            entry.shards.visible = le > 0.01
            if (entry.shards.visible) {
              const depthFactor = 1.0 + Math.abs(entry.origX) * 0.08
              entry.shards.position.set(entry.origX + pxOff * depthFactor, pyOff * depthFactor, 0)
              updateShards(entry.shards, le, time)
            }
          }

          if (entry.trails && entry.shards) {
            entry.trails.visible = le > 0.02
            if (entry.trails.visible) {
              updateTrails(entry.trails, entry.shards, le)
            }
          }

          if (entry.wisps && entry.shards) {
            entry.wisps.visible = le > 0.03
            if (entry.wisps.visible) {
              updateWisps(entry.wisps, entry.shards, le)
            }
          }

          if (entry.particles) {
            entry.particles.visible = le > 0.01
            if (entry.particles.visible) {
              const depthFactor = 1.0 + Math.abs(entry.origX) * 0.08
              entry.particles.position.set(
                entry.origX + pxOff * depthFactor * 0.8,
                pyOff * depthFactor * 0.8,
                0
              )
              ;(entry.particles.material as THREE.ShaderMaterial).uniforms.uProg.value = le
              ;(entry.particles.material as THREE.ShaderMaterial).uniforms.uTime.value = time
            }
          }
        }
      }

      // Void disc
      voidDisc.visible = zoom > 0.12
      voidMat.uniforms.uZoom.value = zoom

      // Camera
      const settleOut = 1 - easeOutQuart(Math.max(0, Math.min(1, (zoom - 0.85) / 0.15)))
      const idleSwayX = Math.sin(time * 0.05) * 0.12 * (1 - zoom) * settleOut
      const idleSwayY = Math.sin(time * 0.07) * 0.06 * (1 - zoom) * settleOut

      const camX = oWorldX * focusBlend + idleSwayX
      const camY = idleSwayY
      const explPull = expl * 2.5 * (1 - zoom)
      const camZ = CAM_START_Z - explPull + (CAM_END_Z - CAM_START_Z + explPull) * zoom

      camera.position.set(camX, camY, camZ)
      camera.lookAt(oWorldX * focusBlend, 0, 0)

      const tiltMax = 0.00873 * settleOut
      const tiltX = -smoothTiltX * tiltMax
      const tiltY = smoothTiltY * tiltMax
      const tiltQuat = new THREE.Quaternion()
      tiltQuat.setFromEuler(new THREE.Euler(tiltX, tiltY, 0, 'XYZ'))
      camera.quaternion.multiply(tiltQuat)

      camera.fov = 48 + zoom * 8
      camera.updateProjectionMatrix()

      // Post-processing
      bloomPass.strength = 0.12 + expl * 0.1 + zoom * 0.15
      bloomPass.radius = 0.3 + zoom * 0.12
      vigPass.uniforms.uVignette.value = 0.35 + zoom * 0.4

      const endFade = Math.max(0, (sp - 0.85) / 0.15)
      vigPass.uniforms.uFade.value = endFade * 0.85

      // Rim light
      rimLight.intensity = 1.4 + Math.sin(time * 1.2) * 0.15 * settleOut + zoom * 0.6
      rimLight.position.x = oWorldX * focusBlend
      rimLight.position.z = 5 - zoom * 3

      // Background
      const bgLum = Math.max(0.005, 0.012 * (1 - zoom * 0.5))
      scene.background = new THREE.Color(bgLum * 0.8, bgLum * 0.9, bgLum + 0.002)

      // UI
      brandEl.style.opacity = String(Math.max(0, 1 - expl * 2.5))
      const enterAlpha = zoom > 0.4 ? Math.min(0.3, (zoom - 0.4) * 0.5) : 0
      enterEl.style.color = `rgba(255,255,255,${enterAlpha})`
    }

    composer.render()
  }

  renderer.setAnimationLoop(animate)

  /* ── Cleanup function ── */
  return () => {
    disposed = true
    renderer.setAnimationLoop(null)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)

    // Dispose all scene objects
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose()
      const m = (obj as THREE.Mesh).material
      if (m) {
        if (Array.isArray(m)) m.forEach((mat) => mat.dispose())
        else (m as THREE.Material).dispose()
      }
    })
    renderer.dispose()
    composer.dispose()

    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement)
    }
    if (container.contains(uiLayer)) {
      container.removeChild(uiLayer)
    }
  }
}
