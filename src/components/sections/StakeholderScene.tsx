"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrthographicCamera } from "@react-three/drei"
import * as THREE from "three"

/* ── Stakeholder config ── */
const STAKEHOLDERS = [
  { id: "contractors",  label: "Contractors",        angle: 0 },
  { id: "architects",   label: "Architects",         angle: Math.PI / 3 },
  { id: "government",   label: "Government Agencies", angle: (2 * Math.PI) / 3 },
  { id: "consultants",  label: "Consultants & PMs",  angle: Math.PI },
  { id: "engineers",    label: "Engineers",           angle: (4 * Math.PI) / 3 },
  { id: "owners",       label: "Owners & Developers", angle: (5 * Math.PI) / 3 },
]

const RADIUS = 3.2
const ACCENT = new THREE.Color("#47B5FF")
const ACCENT_DIM = new THREE.Color("#1a3a55")
const WHITE = new THREE.Color("#e8f0f8")
const DARK = new THREE.Color("#0a1520")

/* ── Connection line between center and node ── */
function ConnectionLine({ angle, active }: { angle: number; active: boolean }) {
  const ref = useRef<THREE.LineBasicMaterial>(null)
  const targetOpacity = active ? 0.7 : 0.15
  const targetColor = active ? ACCENT : ACCENT_DIM

  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 32; i++) {
      const t = i / 32
      const x = Math.cos(angle) * RADIUS * t
      const z = Math.sin(angle) * RADIUS * t
      const y = Math.sin(t * Math.PI) * 0.4
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [angle])

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  useFrame(() => {
    if (!ref.current) return
    ref.current.opacity = THREE.MathUtils.lerp(ref.current.opacity, targetOpacity, 0.08)
    ref.current.color.lerp(targetColor, 0.08)
  })

  return (
    <line>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial ref={ref} attach="material" color={ACCENT_DIM} transparent opacity={0.15} depthWrite={false} />
    </line>
  )
}

/* ── Stakeholder node ── */
function StakeholderNode({ angle, type, active }: { angle: number; type: string; active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const x = Math.cos(angle) * RADIUS
  const z = Math.sin(angle) * RADIUS

  const geometry = useMemo(() => {
    switch (type) {
      case "contractors": return new THREE.BoxGeometry(0.4, 0.3, 0.4)
      case "architects": return new THREE.BoxGeometry(0.28, 0.5, 0.28)
      case "government": return new THREE.BoxGeometry(0.5, 0.35, 0.3)
      case "consultants": return new THREE.BoxGeometry(0.32, 0.42, 0.32)
      case "engineers": return new THREE.OctahedronGeometry(0.25, 0)
      case "owners": return new THREE.CylinderGeometry(0.22, 0.22, 0.4, 6)
      default: return new THREE.BoxGeometry(0.3, 0.3, 0.3)
    }
  }, [type])

  useFrame((_, delta) => {
    if (!meshRef.current || !glowRef.current) return
    const targetScale = active ? 1.2 : 1
    const targetEmissive = active ? 0.6 : 0.1
    const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08)
    meshRef.current.scale.setScalar(s)
    meshRef.current.rotation.y += delta * (active ? 0.4 : 0.15)
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, 0.08)
    const glowMat = glowRef.current.material as THREE.MeshBasicMaterial
    glowMat.opacity = THREE.MathUtils.lerp(glowMat.opacity, active ? 0.25 : 0.05, 0.06)
  })

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.15} floatingRange={[-0.03, 0.03]}>
      <group position={[x, 0.25, z]}>
        {/* Glow disc */}
        <mesh ref={glowRef} position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.45, 16]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.05} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
        {/* Node shape */}
        <mesh ref={meshRef} geometry={geometry}>
          <meshStandardMaterial color={active ? "#a0d4ff" : "#4a7a9a"} emissive={ACCENT} emissiveIntensity={0.1} roughness={0.4} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Central hub ── */
function CentralHub({ anyActive }: { anyActive: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const pillarRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (coreRef.current) {
      const pulse = 0.95 + Math.sin(t * 2) * 0.05
      coreRef.current.scale.setScalar(pulse)
      const mat = coreRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, anyActive ? 0.8 : 0.4, 0.05)
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15
      const mat = ringRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, anyActive ? 0.35 : 0.15, 0.05)
    }
    if (pillarRef.current) {
      const mat = pillarRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.3 + Math.sin(t * 3) * 0.15
    }
  })

  return (
    <group>
      {/* Base platform disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[0.6, 2.8, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.04} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {/* Rotating ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.15} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {/* Core cylinder */}
      <mesh ref={coreRef} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.5, 16]} />
        <meshStandardMaterial color="#1a4a6a" emissive={ACCENT} emissiveIntensity={0.4} roughness={0.3} metalness={0.5} transparent opacity={0.9} />
      </mesh>
      {/* Light pillar */}
      <mesh ref={pillarRef} position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.06, 0.12, 1.2, 8]} />
        <meshStandardMaterial color="#47B5FF" emissive={ACCENT} emissiveIntensity={0.3} transparent opacity={0.5} roughness={0.2} />
      </mesh>
      {/* Top glow */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.2} depthWrite={false} />
      </mesh>
    </group>
  )
}

/* ── Ground grid ── */
function GroundGrid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[16, 16]} />
      <meshBasicMaterial color="#080e16" transparent opacity={0.5} depthWrite={false} />
    </mesh>
  )
}

/* ── Scene ── */
function Scene({ hoveredId }: { hoveredId: string | null }) {
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 5, 8]} zoom={75} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 8, 4]} intensity={0.5} />
      <directionalLight position={[-3, 4, -3]} intensity={0.2} />

      <group rotation={[0, 0, 0]}>
        <GroundGrid />
        <CentralHub anyActive={hoveredId !== null} />

        {STAKEHOLDERS.map((s) => (
          <ConnectionLine key={`line-${s.id}`} angle={s.angle} active={hoveredId === s.id} />
        ))}

        {STAKEHOLDERS.map((s) => (
          <StakeholderNode key={s.id} angle={s.angle} type={s.id} active={hoveredId === s.id} />
        ))}
      </group>
    </>
  )
}

/* ── Exported canvas wrapper ── */
export default function StakeholderScene({ hoveredId }: { hoveredId: string | null }) {
  return (
    <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]} style={{ width: "100%", height: "100%" }}>
      <Scene hoveredId={hoveredId} />
    </Canvas>
  )
}

export { STAKEHOLDERS }
