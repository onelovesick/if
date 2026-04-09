import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

const MODEL_URL = 'https://rrzvgzjttmyseqsmmyvn.supabase.co/storage/v1/object/public/published/bridge-construction-scroll-experience-hx14qv/assets/bridge_1_fbx2.FBX'

/* ═══════════════════════════════════════
   COMPONENT CLASSIFICATION & COLORS
   ═══════════════════════════════════════ */
const COMPONENT_COLORS: Record<string, { base: number[]; top: number[] }> = {
  arc:     { base: [0.25, 0.45, 0.72], top: [0.38, 0.68, 1] },
  deck:    { base: [0.65, 0.48, 0.15], top: [0.92, 0.72, 0.28] },
  pier:    { base: [0.52, 0.38, 0.18], top: [0.75, 0.58, 0.28] },
  cable:   { base: [0.85, 0.58, 0.12], top: [1, 0.78, 0.25] },
  rail:    { base: [0.58, 0.44, 0.18], top: [0.82, 0.65, 0.3] },
  road:    { base: [0.5, 0.38, 0.14], top: [0.72, 0.55, 0.22] },
  guard:   { base: [0.55, 0.42, 0.18], top: [0.78, 0.62, 0.28] },
  lamp:    { base: [0.9, 0.72, 0.25], top: [1, 0.88, 0.42] },
  plane:   { base: [0.25, 0.2, 0.1],  top: [0.4, 0.32, 0.16] },
  object:  { base: [0.48, 0.36, 0.16], top: [0.68, 0.52, 0.24] },
  default: { base: [0.5, 0.38, 0.16],  top: [0.72, 0.55, 0.25] },
}

const MESH_COMPONENTS = new Set(['deck', 'road'])

function classifyMesh(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('arc')) return 'arc'
  if (n.includes('deck') || n.includes('bot36') || n === 'object04') return 'deck'
  if (n.includes('chamfer') || n.includes('pier')) return 'pier'
  if (n.includes('cable') || /object72[3-6]/i.test(n)) return 'cable'
  if (n.includes('rail')) return 'rail'
  if (n.includes('road')) return 'road'
  if (n.includes('guard')) return 'guard'
  if (n.includes('lamp') || n.includes('light')) return 'lamp'
  if (n.includes('plane')) return 'plane'
  if (n.includes('object')) return 'object'
  return 'default'
}

function getDensity(c: string): number {
  if (MESH_COMPONENTS.has(c)) return 0
  const map: Record<string, number> = { cable: 6000, rail: 900, guard: 600, lamp: 400, arc: 55, pier: 50, plane: 12, object: 30, default: 25 }
  return map[c] || 25
}

function isBridgeMesh(name: string): boolean {
  const n = name.toLowerCase()
  return !n.includes('water') && !n.includes('watter') && !n.includes('ground') && !n.includes('terrain') && !n.includes('earth')
}

/* ═══════════════════════════════════════
   TIMING
   ═══════════════════════════════════════ */
const T_TRICKLE_START = 0.3
const T_TRICKLE_DUR = 3.5
const T_STAGGER = 0.5
const T_SETTLED = T_TRICKLE_START + T_TRICKLE_DUR + 0.5
const T_DECK_START = T_TRICKLE_START + T_TRICKLE_DUR * 0.88
const T_DECK_DUR = 2.2

/* ═══════════════════════════════════════
   INIT BRIDGE SCENE
   ═══════════════════════════════════════ */
export function initBridgeScene(
  container: HTMLElement,
  onReady: () => void,
  onProgress?: (pct: number) => void,
): () => void {
  let disposed = false

  /* ── Renderer ── */
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:block;'
  container.appendChild(canvas)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
  renderer.setSize(innerWidth, innerHeight)
  renderer.setClearColor(0x040507, 1)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.72
  renderer.outputColorSpace = THREE.SRGBColorSpace

  /* ── Scene + Camera ── */
  const scene = new THREE.Scene()
  const cam = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.5, 5000)
  const CAM_POS = new THREE.Vector3(16.6, 11.85, 53.02)
  const CAM_TARGET = new THREE.Vector3(-20.24, 1.5, 17.84)
  cam.position.copy(CAM_POS)
  cam.lookAt(CAM_TARGET)

  /* ── Post-processing ── */
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, cam))

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(Math.floor(innerWidth / 2), Math.floor(innerHeight / 2)),
    0.25, 0.4, 0.92
  )
  composer.addPass(bloomPass)

  const cinematicShader = {
    uniforms: {
      tDiffuse: { value: null },
      uTime: { value: 0 },
      uVignette: { value: 0.55 },
      uGrain: { value: 0.008 },
    },
    vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `
      uniform sampler2D tDiffuse; uniform float uTime,uVignette,uGrain;
      varying vec2 vUv;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      void main(){
        vec3 col=texture2D(tDiffuse,vUv).rgb;
        vec2 vigUV=vUv-0.5; vigUV.x*=1.15;
        col*=1.0-smoothstep(0.15,0.90,length(vigUV))*uVignette;
        col+=(hash(vUv*900.0+uTime*80.0)-0.5)*uGrain;
        float lum=dot(col,vec3(0.299,0.587,0.114));
        col=mix(col+vec3(0.05,0.07,0.13)*0.06,col*vec3(1.02,0.98,0.95),smoothstep(0.0,0.5,lum));
        gl_FragColor=vec4(col,1.0);
      }`,
  }
  composer.addPass(new ShaderPass(cinematicShader))
  composer.addPass(new OutputPass())

  /* ── Lights ── */
  scene.add(new THREE.AmbientLight(0x080a18, 0.15))
  const kl = new THREE.DirectionalLight(0x998844, 0.3)
  kl.position.set(60, 90, 70)
  scene.add(kl)
  const rl = new THREE.DirectionalLight(0x1a1408, 0.15)
  rl.position.set(-50, 30, -60)
  scene.add(rl)
  const al = new THREE.PointLight(0x806010, 0.15, 200)
  al.position.set(0, -10, 0)
  scene.add(al)

  /* ── Dust ── */
  const dustCount = 500
  const dustGeo = new THREE.BufferGeometry()
  const dP = new Float32Array(dustCount * 3)
  const dA = new Float32Array(dustCount)
  for (let i = 0; i < dustCount; i++) {
    dP[i * 3] = (Math.random() - 0.5) * 400
    dP[i * 3 + 1] = (Math.random() - 0.5) * 120
    dP[i * 3 + 2] = (Math.random() - 0.5) * 400
    dA[i] = 0.008 + Math.random() * 0.018
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dP, 3))
  dustGeo.setAttribute('aAlpha', new THREE.BufferAttribute(dA, 1))
  const dustMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `attribute float aAlpha;varying float vAlpha;uniform float uTime;
      void main(){vAlpha=aAlpha;vec3 p=position;float t=uTime*0.05;
      p.y+=sin(t+p.x*0.006)*4.0;p.x+=cos(t*0.7+p.z*0.005)*3.0;
      vec4 mv=modelViewMatrix*vec4(p,1.0);gl_PointSize=max(0.6,1.2*(120.0/-mv.z));gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `varying float vAlpha;void main(){float d=length(gl_PointCoord-0.5);if(d>0.5)discard;
      gl_FragColor=vec4(0.3,0.45,0.65,smoothstep(0.5,0.0,d)*vAlpha);}`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  scene.add(new THREE.Points(dustGeo, dustMat))

  /* ── Ground grid ── */
  const groundMat = new THREE.ShaderMaterial({
    vertexShader: `varying vec2 vUv;varying float vDist;void main(){vUv=uv;vec4 wP=modelMatrix*vec4(position,1.0);vDist=length(wP.xz);gl_Position=projectionMatrix*viewMatrix*wP;}`,
    fragmentShader: `varying vec2 vUv;varying float vDist;void main(){float fade=1.0-smoothstep(10.0,220.0,vDist);vec2 g=abs(fract(vUv*140.0-0.5)-0.5);float line=min(g.x,g.y);float grid=(1.0-smoothstep(0.0,0.03,line))*0.025*fade;gl_FragColor=vec4(vec3(0.06,0.08,0.12)*fade*0.2+grid,fade*0.08);}`,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -1.5
  ground.renderOrder = -5
  scene.add(ground)

  /* ── Atmospheric haze ── */
  const hazeMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;varying vec3 vWorldPos;
      void main(){vUv=uv;vWorldPos=(modelMatrix*vec4(position,1.0)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(vWorldPos,1.0);}
    `,
    fragmentShader: `
      uniform float uTime;varying vec2 vUv;varying vec3 vWorldPos;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
        float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
        return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
      void main(){
        float t=uTime*0.02;vec2 uv=vWorldPos.xz*0.008;
        float n=noise(uv+t)*0.5+noise(uv*2.3-t*0.7)*0.3+noise(uv*5.1+t*0.3)*0.2;
        float dist=length(vWorldPos.xz);float density=smoothstep(20.0,180.0,dist)*0.12;
        float heightFade=smoothstep(8.0,-2.0,vWorldPos.y);
        vec3 fogCol=mix(vec3(0.06,0.05,0.04),vec3(0.12,0.09,0.05),n);
        float a=density*heightFade*(0.5+n*0.5);gl_FragColor=vec4(fogCol,a);}
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.NormalBlending,
  })
  const hazeQuad = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), hazeMat)
  hazeQuad.rotation.x = -Math.PI / 2
  hazeQuad.position.y = 0.5
  hazeQuad.name = 'atmosphericHaze'
  hazeQuad.renderOrder = 8
  scene.add(hazeQuad)

  /* ── State ── */
  let bridgePoints: THREE.Points | null = null
  let bridgeSpheres: THREE.InstancedMesh | null = null
  let animStart = -1
  let bMinX = 0, bMaxX = 0, bMinZ = 0, bMaxZ = 0
  const deckMeshes: THREE.Mesh[] = []
  const clock = new THREE.Clock()
  const mouseNDC = { x: 0, y: 0 }
  const smoothMouse = { x: 0, y: 0 }

  const onMouseMove = (e: MouseEvent) => {
    mouseNDC.x = (e.clientX / innerWidth) * 2 - 1
    mouseNDC.y = -(e.clientY / innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true })

  /* ── Surface sampling ── */
  function sampleSurface(mesh: THREE.Mesh, density: number) {
    const geo = mesh.geometry
    if (!geo?.attributes.position) return []
    mesh.updateMatrixWorld(true)
    const wm = mesh.matrixWorld
    const p = geo.attributes.position as THREE.BufferAttribute
    const idx = geo.index
    const vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3()
    const tris: number[][] = []
    if (idx) {
      for (let i = 0; i < idx.count; i += 3) tris.push([idx.getX(i), idx.getX(i + 1), idx.getX(i + 2)])
    } else {
      for (let i = 0; i < p.count; i += 3) tris.push([i, i + 1, i + 2])
    }
    let totalA = 0
    const td: { a: THREE.Vector3; b: THREE.Vector3; c: THREE.Vector3; area: number }[] = []
    for (const [a, b, c] of tris) {
      vA.fromBufferAttribute(p, a).applyMatrix4(wm)
      vB.fromBufferAttribute(p, b).applyMatrix4(wm)
      vC.fromBufferAttribute(p, c).applyMatrix4(wm)
      const area = new THREE.Triangle(vA.clone(), vB.clone(), vC.clone()).getArea()
      totalA += area
      td.push({ a: vA.clone(), b: vB.clone(), c: vC.clone(), area })
    }
    const n = Math.max(8, Math.floor(totalA * density))
    const cum: number[] = []
    let s = 0
    for (const t of td) { s += t.area; cum.push(s) }
    const pts: { pos: THREE.Vector3 }[] = []
    for (let i = 0; i < n; i++) {
      const r = Math.random() * totalA
      let lo = 0, hi = cum.length - 1
      while (lo < hi) { const m = (lo + hi) >> 1; if (cum[m] < r) lo = m + 1; else hi = m }
      const t = td[lo]
      let u = Math.random(), v = Math.random()
      if (u + v > 1) { u = 1 - u; v = 1 - v }
      const w = 1 - u - v
      pts.push({ pos: new THREE.Vector3(t.a.x * w + t.b.x * u + t.c.x * v, t.a.y * w + t.b.y * u + t.c.y * v, t.a.z * w + t.b.z * u + t.c.z * v) })
    }
    return pts
  }

  /* ── Deck glow mesh ── */
  function createGlowMesh(mesh: THREE.Mesh, comp: string) {
    mesh.updateMatrixWorld(true)
    const geo = mesh.geometry.clone()
    geo.applyMatrix4(mesh.matrixWorld)
    const pal = COMPONENT_COLORS[comp] || COMPONENT_COLORS.default
    const col = new THREE.Color(pal.base[0], pal.base[1], pal.base[2])
    const topCol = new THREE.Color(pal.top[0], pal.top[1], pal.top[2])
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRevealX: { value: -9999 },
        uBaseColor: { value: new THREE.Vector3(col.r, col.g, col.b) },
        uTopColor: { value: new THREE.Vector3(topCol.r, topCol.g, topCol.b) },
        uOpacity: { value: 0 },
        uBridgeMinX: { value: 0 },
        uBridgeMaxX: { value: 1 },
        uRevealEdgeWidth: { value: 8 },
      },
      vertexShader: `
        varying vec3 vWorldPos;varying vec3 vNormal;
        void main(){vWorldPos=position;vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*viewMatrix*vec4(position,1.0);}
      `,
      fragmentShader: `
        uniform float uTime,uOpacity,uBridgeMinX,uBridgeMaxX;
        uniform vec3 uBaseColor,uTopColor;
        varying vec3 vWorldPos;varying vec3 vNormal;
        void main(){
          float xNorm=clamp((vWorldPos.z-uBridgeMinX)/(uBridgeMaxX-uBridgeMinX),0.0,1.0);
          vec3 baseCol=mix(uBaseColor,uTopColor,xNorm*0.5+0.25);
          vec3 lightDir=normalize(vec3(0.5,1.0,0.3));
          float diff=max(dot(vNormal,lightDir),0.0)*0.25+0.65;
          float pulse=0.95+0.05*sin(uTime*0.4+vWorldPos.x*0.04);
          float emissive=0.1*pulse;
          vec3 col=baseCol*diff*0.7+baseCol*emissive;
          vec3 viewDir=normalize(cameraPosition-vWorldPos);
          float fresnel=pow(1.0-max(dot(vNormal,viewDir),0.0),3.0);
          col+=baseCol*fresnel*0.12;
          gl_FragColor=vec4(col,uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })
    const glowMesh = new THREE.Mesh(geo, mat)
    glowMesh.renderOrder = 1
    glowMesh.frustumCulled = false
    scene.add(glowMesh)
    deckMeshes.push(glowMesh)
  }

  /* ── Create bridge point cloud ── */
  function createBridgeCloud(fbx: THREE.Group) {
    const all: { pos: THREE.Vector3; component: string }[] = []
    let minY = Infinity, maxY = -Infinity
    fbx.traverse((ch) => {
      if (!(ch as THREE.Mesh).isMesh || !isBridgeMesh(ch.name)) return
      const comp = classifyMesh(ch.name)
      if (MESH_COMPONENTS.has(comp)) { createGlowMesh(ch as THREE.Mesh, comp); return }
      const pts = sampleSurface(ch as THREE.Mesh, getDensity(comp))
      for (const p of pts) {
        if (p.pos.y < minY) minY = p.pos.y
        if (p.pos.y > maxY) maxY = p.pos.y
        all.push({ ...p, component: comp })
      }
    })

    const yRange = maxY - minY || 1
    const count = all.length
    const box = new THREE.Box3()
    for (const s of all) box.expandByPoint(s.pos)
    bMinX = box.min.x; bMaxX = box.max.x; bMinZ = box.min.z; bMaxZ = box.max.z

    for (const dm of deckMeshes) {
      (dm.material as THREE.ShaderMaterial).uniforms.uBridgeMinX.value = bMinX;
      (dm.material as THREE.ShaderMaterial).uniforms.uBridgeMaxX.value = bMaxX
    }

    const xRange = bMaxX - bMinX || 1
    const positions = new Float32Array(count * 3)
    const startPos = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const delays = new Float32Array(count)
    const randoms = new Float32Array(count)
    const sizeVars = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const { pos, component } = all[i]
      const i3 = i * 3, ny = (pos.y - minY) / yRange
      positions[i3] = pos.x; positions[i3 + 1] = pos.y; positions[i3 + 2] = pos.z
      startPos[i3] = bMinX - 80 - Math.random() * 40
      startPos[i3 + 1] = pos.y + (Math.random() - 0.5) * 25
      startPos[i3 + 2] = pos.z + (Math.random() - 0.5) * 30
      delays[i] = Math.max(0, Math.min(1, (pos.x - bMinX) / xRange + (Math.random() - 0.5) * 0.03))
      const sc = Math.random()
      if (sc < 0.08) sizeVars[i] = 2 + Math.random() * 0.8
      else if (sc < 0.3) sizeVars[i] = 1 + Math.random() * 0.5
      else sizeVars[i] = 0.3 + Math.random() * 0.5
      const pal = COMPONENT_COLORS[component] || COMPONENT_COLORS.default
      const nz = (Math.random() - 0.5) * 0.06
      colors[i3] = Math.min(1, pal.base[0] + (pal.top[0] - pal.base[0]) * ny + nz)
      colors[i3 + 1] = Math.min(1, pal.base[1] + (pal.top[1] - pal.base[1]) * ny + nz)
      colors[i3 + 2] = Math.min(1, pal.base[2] + (pal.top[2] - pal.base[2]) * ny + nz)
      const thin = ['cable', 'rail', 'guard', 'lamp'].includes(component)
      sizes[i] = thin ? 0.8 + Math.random() * 0.8 : 0.3 + Math.random() * 0.5
      randoms[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aStartPos', new THREE.BufferAttribute(startPos, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aDelay', new THREE.BufferAttribute(delays, 1))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    geo.setAttribute('aSizeVar', new THREE.BufferAttribute(sizeVars, 1))

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPR: { value: renderer.getPixelRatio() },
        uProgress: { value: 0 },
        uStagger: { value: T_STAGGER },
        uSettled: { value: 0 },
        uBridgeMinX: { value: bMinX },
        uBridgeMaxX: { value: bMaxX },
        uBridgeMinZ: { value: bMinZ },
        uBridgeMaxZ: { value: bMaxZ },
      },
      vertexShader: `
        attribute vec3 aStartPos,aColor;
        attribute float aSize,aDelay,aRandom,aSizeVar;
        uniform float uTime,uPR,uProgress,uStagger,uSettled;
        uniform float uBridgeMinX,uBridgeMaxX,uBridgeMinZ,uBridgeMaxZ;
        varying vec3 vColor;varying float vAlpha,vSzClass;
        float easeOutQuart(float t){float it=1.0-t;return 1.0-it*it*it*it;}
        void main(){
          float pDelay=aDelay*uStagger;
          float pProgress=clamp((uProgress-pDelay)/(1.0-pDelay*0.85+0.001),0.0,1.0);
          if(pProgress<=0.0){gl_Position=vec4(0,0,-999,1);gl_PointSize=0.0;vAlpha=0.0;vColor=vec3(0);vSzClass=0.0;return;}
          float eased=easeOutQuart(pProgress);
          vec3 pos=mix(aStartPos,position,eased);
          if(uSettled>0.1){
            float bWave=sin(uTime*0.35+position.x*0.018+aRandom*6.28)*0.5+sin(uTime*0.17+position.z*0.025+aRandom*3.14)*0.3+sin(uTime*0.73+position.x*0.04+position.z*0.03)*0.2;
            pos.y+=bWave*0.06*uSettled;
            pos.x+=sin(uTime*0.22+position.y*0.03+aRandom*4.5)*0.015*uSettled;
          }
          vec4 mv=modelViewMatrix*vec4(pos,1.0);float dist=-mv.z;
          float sz=aSize*aSizeVar*100.0/dist*uPR;gl_PointSize=clamp(sz,0.5,8.0);
          vec3 neutralCol=vec3(0.75,0.6,0.35);float colorT=smoothstep(0.3,0.9,pProgress);
          vColor=mix(neutralCol,aColor,colorT);
          float edgeFade=1.0;
          if(uSettled>0.1){
            float xR=uBridgeMaxX-uBridgeMinX,zR=uBridgeMaxZ-uBridgeMinZ;
            float xN=smoothstep(uBridgeMinX,uBridgeMinX+xR*0.18,position.x);
            float xF=smoothstep(uBridgeMaxX,uBridgeMaxX-xR*0.18,position.x);
            float zN=smoothstep(uBridgeMinZ,uBridgeMinZ+zR*0.18,position.z);
            float zF=smoothstep(uBridgeMaxZ,uBridgeMaxZ-zR*0.18,position.z);
            edgeFade=mix(1.0,pow(min(min(xN,xF),min(zN,zF)),0.55),uSettled);
          }
          float arrivalAlpha=smoothstep(0.0,0.15,pProgress);
          vAlpha=smoothstep(600.0,15.0,dist)*0.85*edgeFade*arrivalAlpha;
          if(uSettled>0.5) vAlpha*=0.92+0.08*sin(uTime*0.5+aRandom*50.0);
          vSzClass=aSizeVar;gl_Position=projectionMatrix*mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;varying float vAlpha,vSzClass;
        void main(){
          vec2 c=gl_PointCoord-0.5;float d=length(c);if(d>0.5)discard;
          float cS=mix(45.0,22.0,clamp(vSzClass/2.0,0.0,1.0));
          float core=exp(-d*d*cS);float mid=exp(-d*d*12.0);float soft=exp(-d*d*4.0);
          vec3 col=vColor*0.5*soft+vColor*1.3*mid*0.8+vec3(1.0,0.97,0.92)*core*0.25;
          float a=(soft*0.3+mid*0.5+core*0.2)*vAlpha;
          a*=mix(1.0,0.65,clamp((vSzClass-1.5)/1.5,0.0,1.0));
          gl_FragColor=vec4(col,a);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    })

    bridgePoints = new THREE.Points(geo, mat)
    bridgePoints.renderOrder = 2
    bridgePoints.frustumCulled = false
    scene.add(bridgePoints)

    /* ── Instanced spheres ── */
    const sphereCount = Math.min(2500, Math.floor(count * 0.1))
    const sphereGeo = new THREE.SphereGeometry(0.08, 4, 3)
    const sphereMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uProgress: { value: 0 }, uStagger: { value: T_STAGGER }, uSettled: { value: 0 } },
      vertexShader: `
        attribute vec3 aTargetPos,aSphereStartPos,aSphereColor;attribute float aSphereDelay;
        uniform float uTime,uProgress,uStagger,uSettled;varying vec3 vColor;varying float vAlpha;
        float easeOutQuart(float t){float it=1.0-t;return 1.0-it*it*it*it;}
        void main(){
          float pDelay=aSphereDelay*uStagger;float pProgress=clamp((uProgress-pDelay)/(1.0-pDelay*0.85+0.001),0.0,1.0);
          if(pProgress<=0.0){gl_Position=vec4(0,0,-999,1);vAlpha=0.0;vColor=vec3(0);return;}
          float eased=easeOutQuart(pProgress);vec3 worldP=mix(aSphereStartPos,aTargetPos,eased);
          if(uSettled>0.1){float bW=sin(uTime*0.35+aTargetPos.x*0.018)*0.5+sin(uTime*0.17+aTargetPos.z*0.025)*0.3+sin(uTime*0.73+aTargetPos.x*0.04+aTargetPos.z*0.03)*0.2;
            worldP.y+=bW*0.06*uSettled;worldP.x+=sin(uTime*0.22+aTargetPos.y*0.03)*0.015*uSettled;}
          vec3 transformed=position+worldP;vec4 mv=modelViewMatrix*vec4(transformed,1.0);float dist=-mv.z;
          vec3 neutralCol=vec3(0.7,0.6,0.4);float colorT=smoothstep(0.3,0.9,pProgress);vColor=mix(neutralCol,aSphereColor,colorT);
          float arrivalAlpha=smoothstep(0.0,0.15,pProgress);vAlpha=smoothstep(500.0,20.0,dist)*0.7*arrivalAlpha;
          gl_Position=projectionMatrix*mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;varying float vAlpha;
        void main(){if(vAlpha<0.001)discard;vec3 N=normalize(vec3(0,0,1));vec3 L=normalize(vec3(0.4,0.8,0.5));
          float diff=max(dot(N,L),0.0)*0.5+0.5;vec3 col=vColor*diff+vColor*0.3;gl_FragColor=vec4(col,vAlpha);}
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const iMesh = new THREE.InstancedMesh(sphereGeo, sphereMat, sphereCount)
    iMesh.frustumCulled = false
    iMesh.renderOrder = 2

    const sTargets = new Float32Array(sphereCount * 3)
    const sStarts = new Float32Array(sphereCount * 3)
    const sColors = new Float32Array(sphereCount * 3)
    const sDelays = new Float32Array(sphereCount)
    const stride = Math.max(1, Math.floor(count / sphereCount))
    const dummyMatrix = new THREE.Matrix4()

    for (let i = 0; i < sphereCount; i++) {
      const si = (i * stride) % count
      const i3 = i * 3
      sTargets[i3] = positions[si * 3]; sTargets[i3 + 1] = positions[si * 3 + 1]; sTargets[i3 + 2] = positions[si * 3 + 2]
      sStarts[i3] = startPos[si * 3]; sStarts[i3 + 1] = startPos[si * 3 + 1]; sStarts[i3 + 2] = startPos[si * 3 + 2]
      sColors[i3] = colors[si * 3]; sColors[i3 + 1] = colors[si * 3 + 1]; sColors[i3 + 2] = colors[si * 3 + 2]
      sDelays[i] = delays[si]
      dummyMatrix.identity()
      const sc2 = 0.6 + Math.random() * 1.2
      dummyMatrix.makeScale(sc2, sc2, sc2)
      iMesh.setMatrixAt(i, dummyMatrix)
    }
    iMesh.instanceMatrix.needsUpdate = true
    sphereGeo.setAttribute('aTargetPos', new THREE.InstancedBufferAttribute(sTargets, 3))
    sphereGeo.setAttribute('aSphereStartPos', new THREE.InstancedBufferAttribute(sStarts, 3))
    sphereGeo.setAttribute('aSphereColor', new THREE.InstancedBufferAttribute(sColors, 3))
    sphereGeo.setAttribute('aSphereDelay', new THREE.InstancedBufferAttribute(sDelays, 1))
    scene.add(iMesh)
    bridgeSpheres = iMesh

    /* ── Wire connections ── */
    const lc = Math.min(800, Math.floor(count * 0.002))
    const lv = new Float32Array(lc * 6)
    const used = new Set<string>()
    let li = 0
    for (let at = 0; at < lc * 5 && li < lc; at++) {
      const i1 = Math.floor(Math.random() * count), i2 = i1 + 1 + Math.floor(Math.random() * 20)
      if (i2 >= count) continue
      const k = `${Math.min(i1, i2)}-${Math.max(i1, i2)}`
      if (used.has(k)) continue
      const p1 = all[i1].pos, p2 = all[i2].pos
      const d = p1.distanceTo(p2)
      if (d > 3.5 || d < 0.15) continue
      used.add(k)
      lv[li * 6] = p1.x; lv[li * 6 + 1] = p1.y; lv[li * 6 + 2] = p1.z
      lv[li * 6 + 3] = p2.x; lv[li * 6 + 4] = p2.y; lv[li * 6 + 5] = p2.z
      li++
    }
    if (li > 0) {
      const lg = new THREE.BufferGeometry()
      lg.setAttribute('position', new THREE.BufferAttribute(lv.slice(0, li * 6), 3))
      const lm = new THREE.LineBasicMaterial({ color: 0x223a2a, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })
      const wires = new THREE.LineSegments(lg, lm)
      wires.name = 'wires'
      wires.renderOrder = 0
      scene.add(wires)
    }

    /* ── Glow halos ── */
    const gc = Math.min(500, Math.floor(count * 0.002))
    const gp = new Float32Array(gc * 3), gcol = new Float32Array(gc * 3), gsz = new Float32Array(gc)
    const gs = Math.max(1, Math.floor(count / gc))
    for (let i = 0; i < gc; i++) {
      const sidx = (i * gs) % count
      const s = all[sidx]
      const ny3 = (s.pos.y - minY) / yRange
      gp[i * 3] = s.pos.x; gp[i * 3 + 1] = s.pos.y; gp[i * 3 + 2] = s.pos.z
      const pal3 = COMPONENT_COLORS[s.component] || COMPONENT_COLORS.default
      gcol[i * 3] = pal3.base[0] + (pal3.top[0] - pal3.base[0]) * ny3
      gcol[i * 3 + 1] = pal3.base[1] + (pal3.top[1] - pal3.base[1]) * ny3
      gcol[i * 3 + 2] = pal3.base[2] + (pal3.top[2] - pal3.base[2]) * ny3
      gsz[i] = 2 + Math.random() * 3
    }
    const gg = new THREE.BufferGeometry()
    gg.setAttribute('position', new THREE.BufferAttribute(gp, 3))
    gg.setAttribute('aColor', new THREE.BufferAttribute(gcol, 3))
    gg.setAttribute('aSize', new THREE.BufferAttribute(gsz, 1))
    const gm = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() }, uGlowAlpha: { value: 0 } },
      vertexShader: `attribute vec3 aColor;attribute float aSize;uniform float uTime,uPR,uGlowAlpha;
        varying vec3 vC;varying float vA;
        void main(){vC=aColor;vec3 p=position;p.y+=sin(uTime*0.2+p.x*0.02)*0.08;
        vec4 mv=modelViewMatrix*vec4(p,1.0);float d=-mv.z;
        gl_PointSize=clamp(aSize*200.0/d*uPR,2.0,18.0);
        vA=smoothstep(500.0,30.0,d)*0.08*uGlowAlpha;gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 vC;varying float vA;void main(){float d=length(gl_PointCoord-0.5);if(d>0.5)discard;gl_FragColor=vec4(vC,exp(-d*d*4.0)*vA);}`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const glowPts = new THREE.Points(gg, gm)
    glowPts.name = 'glowHalos'
    glowPts.renderOrder = 3
    scene.add(glowPts)
  }

  /* ── Load FBX ── */
  new FBXLoader().load(
    MODEL_URL,
    (fbx) => {
      if (disposed) return
      const box = new THREE.Box3().setFromObject(fbx)
      const size = box.getSize(new THREE.Vector3())
      const ctr = box.getCenter(new THREE.Vector3())
      const sc = 160 / Math.max(size.x, size.y, size.z)
      fbx.rotation.x = -Math.PI / 2
      fbx.scale.setScalar(sc)
      fbx.position.copy(ctr.multiplyScalar(-sc))
      fbx.updateMatrixWorld(true)
      const b2 = new THREE.Box3().setFromObject(fbx)
      const c2 = b2.getCenter(new THREE.Vector3())
      fbx.position.x -= c2.x + (b2.max.x - b2.min.x) * 0.12
      fbx.position.z -= c2.z
      fbx.position.y -= b2.min.y
      fbx.updateMatrixWorld(true)
      fbx.traverse((ch) => { if ((ch as THREE.Mesh).isMesh) ch.visible = false })
      scene.add(fbx)
      createBridgeCloud(fbx)
      animStart = clock.getElapsedTime()
      onReady()
    },
    (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100))
    },
    (e) => { console.error('Bridge model load error:', e) }
  )

  /* ── Animation loop ── */
  function animate() {
    if (disposed) return
    const elapsed = clock.getElapsedTime()
    const T = animStart >= 0 ? elapsed - animStart : 0
    const deckT = Math.max(0, Math.min(1, (T - T_DECK_START) / T_DECK_DUR))
    const breathingActive = deckT >= 1
    const breatheIn = breathingActive ? Math.min(1, (T - (T_DECK_START + T_DECK_DUR)) / 1.5) : 0
    const breathA = Math.sin(elapsed * 0.35) * 0.4 + Math.sin(elapsed * 0.17 + 1.2) * 0.35 + Math.sin(elapsed * 0.73 + 2.8) * 0.25
    const breathNorm = breathA * breatheIn

    smoothMouse.x += (mouseNDC.x - smoothMouse.x) * 0.03
    smoothMouse.y += (mouseNDC.y - smoothMouse.y) * 0.03
    const camBreathScale = 1 + breatheIn * 0.4

    cam.position.set(
      CAM_POS.x + Math.sin(elapsed * 0.08) * 0.4 * camBreathScale + smoothMouse.x * 0.6,
      CAM_POS.y + Math.cos(elapsed * 0.06) * 0.2 * camBreathScale + smoothMouse.y * 0.3,
      CAM_POS.z + Math.sin(elapsed * 0.05 + 1) * 0.3 * camBreathScale
    )
    cam.lookAt(CAM_TARGET)

    const trickleT = Math.max(0, Math.min(1, (T - T_TRICKLE_START) / T_TRICKLE_DUR))
    const isSettled = T >= T_SETTLED
    const settleP = Math.max(0, Math.min(1, (T - (T_TRICKLE_START + T_TRICKLE_DUR)) / 0.5))

    if (bridgePoints) {
      const u = (bridgePoints.material as THREE.ShaderMaterial).uniforms
      u.uTime.value = elapsed; u.uProgress.value = trickleT; u.uSettled.value = settleP
    }
    if (bridgeSpheres) {
      const u = (bridgeSpheres.material as THREE.ShaderMaterial).uniforms
      u.uTime.value = elapsed; u.uProgress.value = trickleT; u.uSettled.value = settleP
    }

    const deckEased = 1 - Math.pow(1 - deckT, 3)
    for (const dm of deckMeshes) {
      const u = (dm.material as THREE.ShaderMaterial).uniforms
      u.uTime.value = elapsed
      if (deckT <= 0) { u.uOpacity.value = 0 }
      else {
        const fadeOpacity = Math.min(0.5, deckT * 2.5)
        const settleT2 = deckT >= 0.2 ? Math.min(1, (deckT - 0.2) / 0.5) : 0
        const deckBase = THREE.MathUtils.lerp(fadeOpacity, 0.2, settleT2)
        u.uOpacity.value = Math.max(0, deckBase + breathNorm * 0.03 * breatheIn)
      }
    }

    const deckPeaked = deckT >= 0.2
    const peakTime = T_DECK_START + T_DECK_DUR * 0.2
    const dropT = deckPeaked ? Math.min(1, (T - peakTime) / 0.35) : 0
    const baseBloom = THREE.MathUtils.lerp(0.23, 0.12, dropT)
    bloomPass.strength = deckPeaked ? baseBloom + breathNorm * 0.018 : 0.2 + 0.03 * trickleT
    renderer.toneMappingExposure = deckPeaked ? THREE.MathUtils.lerp(0.72, 0.6, dropT) : 0.72

    const glowObj = scene.getObjectByName('glowHalos') as THREE.Points | undefined
    if (glowObj) {
      (glowObj.material as THREE.ShaderMaterial).uniforms.uTime.value = elapsed
      const glowBase = isSettled ? Math.min(1, settleP * 1.2) : 0
      ;(glowObj.material as THREE.ShaderMaterial).uniforms.uGlowAlpha.value = Math.max(0, glowBase + breathNorm * 0.12 * breatheIn)
    }
    const wireObj = scene.getObjectByName('wires') as THREE.LineSegments | undefined
    if (wireObj) {
      const wireBase = isSettled ? Math.min(0.018, settleP * 0.018) : 0
      ;(wireObj.material as THREE.LineBasicMaterial).opacity = wireBase + breathNorm * 0.004 * breatheIn
    }
    const hazeObj = scene.getObjectByName('atmosphericHaze') as THREE.Mesh | undefined
    if (hazeObj) {
      (hazeObj.material as THREE.ShaderMaterial).uniforms.uTime.value = elapsed
    }

    dustMat.uniforms.uTime.value = elapsed
    cinematicShader.uniforms.uTime.value = elapsed
    cinematicShader.uniforms.uVignette.value = 0.55 + breathNorm * 0.04 * breatheIn

    composer.render()
  }

  /* ── Pause when hero is scrolled out of view ── */
  let heroVisible = true
  const onScroll = () => {
    const nowVisible = window.scrollY < window.innerHeight
    if (nowVisible !== heroVisible) {
      heroVisible = nowVisible
      renderer.setAnimationLoop(heroVisible && !disposed ? animate : null)
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  renderer.setAnimationLoop(animate)

  /* ── Resize ── */
  const onResize = () => {
    cam.aspect = innerWidth / innerHeight
    cam.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
    composer.setSize(innerWidth, innerHeight)
    bloomPass.resolution.set(Math.floor(innerWidth / 2), Math.floor(innerHeight / 2))
    if (bridgePoints) (bridgePoints.material as THREE.ShaderMaterial).uniforms.uPR.value = renderer.getPixelRatio()
  }
  window.addEventListener('resize', onResize)

  /* ── Cleanup ── */
  return () => {
    disposed = true
    renderer.setAnimationLoop(null)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('scroll', onScroll)
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose()
      const m = (obj as THREE.Mesh).material
      if (m) { if (Array.isArray(m)) m.forEach((mt) => mt.dispose()); else (m as THREE.Material).dispose() }
    })
    renderer.dispose()
    composer.dispose()
    if (container.contains(canvas)) container.removeChild(canvas)
  }
}
