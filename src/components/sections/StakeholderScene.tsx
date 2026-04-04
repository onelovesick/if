"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const STAKEHOLDERS = [
  { id: "contractors",  angle: 0 },
  { id: "architects",   angle: Math.PI / 3 },
  { id: "government",   angle: (2 * Math.PI) / 3 },
  { id: "consultants",  angle: Math.PI },
  { id: "engineers",    angle: (4 * Math.PI) / 3 },
  { id: "owners",       angle: (5 * Math.PI) / 3 },
]

const RADIUS = 2.4
const ACCENT = new THREE.Color("#47B5FF")
const DIM = new THREE.Color("#1a3a55")

/* ── Platform rings ── */
function Platform() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.08
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.05
  })

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
      {/* Solid base disc */}
      <mesh>
        <circleGeometry args={[2.8, 64]} />
        <meshBasicMaterial color="#0a1825" transparent opacity={0.8} />
      </mesh>
      {/* Outer ring */}
      <mesh ref={ring1Ref} position={[0, 0, 0.01]}>
        <ringGeometry args={[2.5, 2.55, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.2} />
      </mesh>
      {/* Mid ring */}
      <mesh ref={ring2Ref} position={[0, 0, 0.01]}>
        <ringGeometry args={[1.6, 1.64, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.12} />
      </mesh>
      {/* Inner ring */}
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.7, 0.73, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.25} />
      </mesh>
      {/* Grid lines - radial */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2
        const pts = [new THREE.Vector3(Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0.02), new THREE.Vector3(Math.cos(a) * 2.6, Math.sin(a) * 2.6, 0.02)]
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        return (
          <line key={`rad-${i}`}>
            <bufferGeometry attach="geometry" {...geo} />
            <lineBasicMaterial attach="material" color={ACCENT} transparent opacity={0.06} />
          </line>
        )
      })}
    </group>
  )
}

/* ── Central core ── */
function Core({ anyActive }: { anyActive: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null)
  const beamRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.scale.setScalar(0.95 + Math.sin(t * 2) * 0.05)
      const mat = coreRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, anyActive ? 1.0 : 0.5, 0.05)
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + Math.sin(t * 3) * 0.08 + (anyActive ? 0.15 : 0)
    }
  })

  return (
    <group>
      {/* Core cylinder */}
      <mesh ref={coreRef} position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.3, 0.38, 0.6, 8]} />
        <meshStandardMaterial color="#1a5a8a" emissive={ACCENT} emissiveIntensity={0.5} roughness={0.3} metalness={0.5} transparent opacity={0.95} />
      </mesh>
      {/* Light beam */}
      <mesh ref={beamRef} position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.03, 0.15, 2.0, 8]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.2} depthWrite={false} />
      </mesh>
      {/* Top glow sphere */}
      <mesh position={[0, 2.6, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.5} />
      </mesh>
      {/* Base glow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 16]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </group>
  )
}

/* ── Connection arc ── */
function Arc({ angle, active }: { angle: number; active: boolean }) {
  const ref = useRef<THREE.LineBasicMaterial>(null)

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 40; i++) {
      const t = i / 40
      const x = Math.cos(angle) * RADIUS * t
      const z = Math.sin(angle) * RADIUS * t
      const y = Math.sin(t * Math.PI) * 0.5 + 0.05
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [angle])

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  useFrame(() => {
    if (!ref.current) return
    ref.current.opacity = THREE.MathUtils.lerp(ref.current.opacity, active ? 0.8 : 0.12, 0.08)
    ref.current.color.lerp(active ? ACCENT : DIM, 0.08)
  })

  return (
    <line>
      <bufferGeometry attach="geometry" {...geo} />
      <lineBasicMaterial ref={ref} attach="material" color={DIM} transparent opacity={0.12} depthWrite={false} />
    </line>
  )
}

/* ── Node ── */
function Node({ id, angle, active }: { id: string; angle: number; active: boolean }) {
  const ref = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const glowRef = useRef<THREE.MeshBasicMaterial>(null)
  const x = Math.cos(angle) * RADIUS
  const z = Math.sin(angle) * RADIUS

  const geo = useMemo(() => {
    switch (id) {
      case "contractors": return new THREE.BoxGeometry(0.35, 0.25, 0.35)
      case "architects": return new THREE.BoxGeometry(0.22, 0.45, 0.22)
      case "government": return new THREE.BoxGeometry(0.42, 0.28, 0.25)
      case "consultants": return new THREE.BoxGeometry(0.26, 0.36, 0.26)
      case "engineers": return new THREE.OctahedronGeometry(0.2, 0)
      case "owners": return new THREE.CylinderGeometry(0.18, 0.18, 0.35, 6)
      default: return new THREE.BoxGeometry(0.25, 0.25, 0.25)
    }
  }, [id])

  useFrame((_, delta) => {
    if (!ref.current || !matRef.current || !glowRef.current) return
    const s = THREE.MathUtils.lerp(ref.current.scale.x, active ? 1.3 : 1, 0.08)
    ref.current.scale.setScalar(s)
    ref.current.children[0].rotation.y += delta * (active ? 0.5 : 0.2)
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(matRef.current.emissiveIntensity, active ? 0.8 : 0.15, 0.08)
    matRef.current.color.lerp(active ? new THREE.Color("#a0d8ff") : new THREE.Color("#3a6a8a"), 0.06)
    glowRef.current.opacity = THREE.MathUtils.lerp(glowRef.current.opacity, active ? 0.3 : 0.06, 0.06)
  })

  return (
    <group ref={ref} position={[x, 0.3, z]}>
      {/* Shape */}
      <mesh geometry={geo}>
        <meshStandardMaterial ref={matRef} color="#3a6a8a" emissive={ACCENT} emissiveIntensity={0.15} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Ground glow */}
      <mesh position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 16]} />
        <meshBasicMaterial ref={glowRef} color={ACCENT} transparent opacity={0.06} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {/* Tiny top marker */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={active ? 0.8 : 0.2} />
      </mesh>
    </group>
  )
}

/* ── Floating particles ── */
function Particles() {
  const ref = useRef<THREE.Points>(null)
  const count = 60

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 0.5 + Math.random() * 2.8
      arr[i * 3] = Math.cos(a) * r
      arr[i * 3 + 1] = Math.random() * 2.5
      arr[i * 3 + 2] = Math.sin(a) * r
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={ACCENT} size={0.03} transparent opacity={0.3} depthWrite={false} sizeAttenuation />
    </points>
  )
}

/* ── Camera with subtle parallax ── */
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef([0, 0])

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current[0] * 0.3, 0.02)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 4.5 + mouse.current[1] * 0.2, 0.02)
    camera.lookAt(0, 0.5, 0)
  })

  return null
}

/* ── Scene ── */
function Scene({ hoveredId }: { hoveredId: string | null }) {
  return (
    <>
      <perspectiveCamera />
      <CameraRig />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={0.4} />
      <directionalLight position={[-3, 5, -3]} intensity={0.15} color="#4488cc" />
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#47B5FF" distance={6} decay={2} />

      <Platform />
      <Core anyActive={hoveredId !== null} />
      <Particles />

      {STAKEHOLDERS.map((s) => (
        <Arc key={`arc-${s.id}`} angle={s.angle} active={hoveredId === s.id} />
      ))}
      {STAKEHOLDERS.map((s) => (
        <Node key={s.id} id={s.id} angle={s.angle} active={hoveredId === s.id} />
      ))}
    </>
  )
}

export default function StakeholderScene({ hoveredId }: { hoveredId: string | null }) {
  return (
    <Canvas
      camera={{ position: [0, 4.5, 5.5], fov: 40, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <Scene hoveredId={hoveredId} />
    </Canvas>
  )
}

export { STAKEHOLDERS }
