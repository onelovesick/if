"use client";

import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Float, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

// --- Data ---

const NODES = [
  {
    id: "app1",
    label: "Application",
    sublabel: "Service A",
    role: "Frontend-facing microservice handling client requests and session management.",
    type: "app",
    position: [-3.2, 2.2, 0] as [number, number, number],
    connected: ["broker", "app2", "elk"],
  },
  {
    id: "app2",
    label: "Application",
    sublabel: "Service B",
    role: "Secondary application service for background processing and async workflows.",
    type: "app",
    position: [3.2, 2.2, 0] as [number, number, number],
    connected: ["broker", "worker", "elk"],
  },
  {
    id: "broker",
    label: "Message Broker",
    sublabel: "Event Bus",
    role: "Central event bus (e.g. Kafka / RabbitMQ) decoupling producers from consumers.",
    type: "infra",
    position: [0, 0.4, 0] as [number, number, number],
    connected: ["app1", "app2", "worker"],
  },
  {
    id: "worker",
    label: "Worker",
    sublabel: "Job Processor",
    role: "Distributed worker pool consuming queue messages and executing async tasks.",
    type: "app",
    position: [3.2, -1.2, 0] as [number, number, number],
    connected: ["broker", "reldb", "elk"],
  },
  {
    id: "elk",
    label: "ELK Stack",
    sublabel: "Observability",
    role: "Elasticsearch, Logstash, Kibana stack for centralised logging and metrics.",
    type: "infra",
    position: [-3.2, -1.2, 0] as [number, number, number],
    connected: ["app1", "app2", "worker"],
  },
  {
    id: "reldb",
    label: "Relational DB",
    sublabel: "PostgreSQL",
    role: "Primary ACID-compliant relational store for structured transactional data.",
    type: "db",
    position: [1.4, -3, 0] as [number, number, number],
    connected: ["worker", "txdb"],
  },
  {
    id: "txdb",
    label: "Transactional DB",
    sublabel: "Redis / Ledger",
    role: "High-throughput transactional store for real-time state, caching and ledger ops.",
    type: "db",
    position: [-1.4, -3, 0] as [number, number, number],
    connected: ["broker", "reldb"],
  },
];

const EDGES: [string, string][] = [
  ["app1", "broker"],
  ["app2", "broker"],
  ["broker", "worker"],
  ["app1", "elk"],
  ["app2", "elk"],
  ["worker", "elk"],
  ["worker", "reldb"],
  ["reldb", "txdb"],
  ["broker", "txdb"],
];

// --- Colour tokens (matched to project palette) ---

const TYPE_COLORS: Record<string, { bg: string; border: string; dot: string; label: string; sub: string }> = {
  app: {
    bg: "rgba(230,245,255,0.92)",
    border: "#47B5FF",
    dot: "#47B5FF",
    label: "#0B3C5D",
    sub: "#3A8AC4",
  },
  infra: {
    bg: "rgba(255,245,235,0.92)",
    border: "#D97A20",
    dot: "#D97A20",
    label: "#7A3A00",
    sub: "#C46A18",
  },
  db: {
    bg: "rgba(240,250,242,0.92)",
    border: "#2E9E5B",
    dot: "#2E9E5B",
    label: "#0F5A28",
    sub: "#3A8A50",
  },
};

const DIM_COLOR = new THREE.Color("#c8cdd8");
const ACTIVE_LINE = new THREE.Color("#47B5FF");
const BASE_LINE = new THREE.Color("#b8c4d8");

// --- Connection ---

function Connection({ fromPos, toPos, active, dimmed }: {
  fromPos: [number, number, number];
  toPos: [number, number, number];
  active: boolean;
  dimmed: boolean;
}) {
  const ref = useRef<THREE.LineBasicMaterial>(null);

  const mid = new THREE.Vector3(
    (fromPos[0] + toPos[0]) / 2,
    (fromPos[1] + toPos[1]) / 2,
    (fromPos[2] + toPos[2]) / 2 - 0.3
  );

  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...fromPos),
    mid,
    new THREE.Vector3(...toPos)
  );

  const points = curve.getPoints(32);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const targetColor = dimmed ? DIM_COLOR : active ? ACTIVE_LINE : BASE_LINE;
  const targetOpacity = dimmed ? 0.12 : active ? 0.9 : 0.45;

  useFrame(() => {
    if (!ref.current) return;
    ref.current.color.lerp(targetColor, 0.08);
    ref.current.opacity = THREE.MathUtils.lerp(ref.current.opacity, targetOpacity, 0.08);
  });

  return (
    <line>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial
        ref={ref}
        attach="material"
        color={BASE_LINE}
        transparent
        opacity={0.45}
        linewidth={1}
        depthWrite={false}
      />
    </line>
  );
}

// --- Node Mesh ---

function NodeMesh({ node, isActive, isHovered, isDimmed, onHover, onClick, prefersReducedMotion }: {
  node: typeof NODES[0];
  isActive: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
  onClick: (n: typeof NODES[0]) => void;
  prefersReducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const currentScale = useRef(1);
  const col = TYPE_COLORS[node.type];

  useFrame(() => {
    if (!meshRef.current || prefersReducedMotion) return;
    const target = isHovered || isActive ? 1.06 : 1.0;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, target, 0.12);
    meshRef.current.scale.setScalar(currentScale.current);
  });

  return (
    <Float
      speed={prefersReducedMotion ? 0 : 1.2}
      rotationIntensity={0}
      floatIntensity={prefersReducedMotion ? 0 : 0.25}
      floatingRange={[-0.04, 0.04]}
    >
      <group
        ref={meshRef}
        position={node.position}
        onPointerOver={(e) => { e.stopPropagation(); onHover(node.id); }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); onClick(node); }}
      >
        {/* Shadow */}
        <mesh position={[0.06, -0.22, -0.15]} rotation={[-Math.PI / 2, 0, 0.05]}>
          <planeGeometry args={[1.15, 0.65]} />
          <meshBasicMaterial color="#99aabb" transparent opacity={isDimmed ? 0.04 : 0.12} depthWrite={false} />
        </mesh>

        {/* Box */}
        <mesh>
          <boxGeometry args={[1.1, 0.58, 0.14]} />
          <meshStandardMaterial
            color={isDimmed ? "#dde2ee" : "#f4f7fc"}
            transparent
            opacity={isDimmed ? 0.25 : 1}
            roughness={0.3}
            metalness={0.05}
          />
        </mesh>

        {/* Accent top edge */}
        <mesh position={[0, 0.295, 0.07]}>
          <boxGeometry args={[1.1, 0.012, 0.004]} />
          <meshBasicMaterial color={isDimmed ? "#c8cdd8" : col.border} transparent opacity={isDimmed ? 0.2 : 1} />
        </mesh>

        {/* Label */}
        <Html
          position={[0, 0, 0.08]}
          center
          distanceFactor={6}
          style={{ pointerEvents: "none", userSelect: "none" }}
          zIndexRange={[10, 20]}
        >
          <div
            style={{
              width: 120,
              background: isDimmed ? "rgba(240,242,247,0.7)" : col.bg,
              border: `1px solid ${isDimmed ? "#c8d0de" : col.border}`,
              borderRadius: 8,
              padding: "7px 10px 8px",
              boxShadow: isActive || isHovered
                ? `0 0 0 2px ${col.border}33, 0 4px 16px rgba(0,0,0,0.08)`
                : "0 2px 8px rgba(0,0,0,0.06)",
              transition: "box-shadow 0.2s, opacity 0.2s",
              opacity: isDimmed ? 0.45 : 1,
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              cursor: "pointer",
              textAlign: "center" as const,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: isDimmed ? "#c0c8d8" : col.dot, flexShrink: 0 }} />
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const,
                color: isDimmed ? "#a0a8bc" : col.label,
                fontFamily: "'Inter', -apple-system, sans-serif",
              }}>
                {node.label}
              </span>
            </div>
            <div style={{ fontSize: 11, color: isDimmed ? "#b0b8cc" : col.sub, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              {node.sublabel}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// --- Info Panel ---

function InfoPanel({ node, onClose }: { node: typeof NODES[0] | null; onClose: () => void }) {
  if (!node) return null;
  const col = TYPE_COLORS[node.type];
  const connectedNodes = NODES.filter((n) => node.connected.includes(n.id));

  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        right: 24,
        width: 260,
        background: "rgba(248,250,254,0.97)",
        border: `1px solid ${col.border}`,
        borderRadius: 14,
        padding: "20px 20px 18px",
        boxShadow: "0 8px 40px rgba(11,60,93,0.12), 0 1px 4px rgba(0,0,0,0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 100,
        fontFamily: "'Inter', -apple-system, sans-serif",
        animation: "archPanelIn 0.18s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <style>{`@keyframes archPanelIn { from { opacity:0; transform:translateX(10px) scale(0.97); } to { opacity:1; transform:translateX(0) scale(1); } }`}</style>
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 12, right: 12, background: "none", border: "none",
          cursor: "pointer", color: "#8a96b0", fontSize: 18, lineHeight: 1, padding: "2px 4px",
        }}
      >
        &times;
      </button>

      <div style={{
        display: "inline-block", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
        color: col.label, background: col.bg, border: `1px solid ${col.border}44`, borderRadius: 4, padding: "2px 8px", marginBottom: 10,
      }}>
        {node.type}
      </div>

      <div style={{ fontSize: 17, fontWeight: 700, color: "#0B3C5D", marginBottom: 2, fontFamily: "'Outfit', sans-serif" }}>
        {node.label}
      </div>
      <div style={{ fontSize: 12, color: col.sub, marginBottom: 12, fontWeight: 500 }}>
        {node.sublabel}
      </div>

      <div style={{ height: 1, background: "rgba(11,60,93,0.08)", marginBottom: 12 }} />

      <div style={{ fontSize: 12, color: "#5a7a96", lineHeight: 1.65, marginBottom: 14 }}>
        {node.role}
      </div>

      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5a7a96", marginBottom: 8 }}>
        Connected systems
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
        {connectedNodes.map((cn) => {
          const cc = TYPE_COLORS[cn.type];
          return (
            <span key={cn.id} style={{
              fontSize: 10, fontWeight: 600, color: cc.label, background: cc.bg,
              border: `1px solid ${cc.border}55`, borderRadius: 5, padding: "3px 8px",
            }}>
              {cn.sublabel}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// --- Camera Rig ---

function CameraRig({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const { camera } = useThree();
  const mouse = useRef([0, 0]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useFrame(() => {
    if (prefersReducedMotion) return;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current[0] * 0.35, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current[1] * 0.2 + 0.5, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// --- Scene ---

function Scene({ hoveredId, setHoveredId, selectedNode, setSelectedNode, prefersReducedMotion }: {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  selectedNode: typeof NODES[0] | null;
  setSelectedNode: React.Dispatch<React.SetStateAction<typeof NODES[0] | null>>;
  prefersReducedMotion: boolean;
}) {
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  const activeConnections = hoveredId
    ? EDGES.filter(([a, b]) => a === hoveredId || b === hoveredId)
    : selectedNode
    ? EDGES.filter(([a, b]) => a === selectedNode.id || b === selectedNode.id)
    : [];

  const activeIds = new Set(activeConnections.flatMap(([a, b]) => [a, b]));
  const anyActive = activeIds.size > 0;

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0.5, 12]} zoom={90} />
      <CameraRig prefersReducedMotion={prefersReducedMotion} />

      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 8, 6]} intensity={0.6} />
      <directionalLight position={[-4, 2, 4]} intensity={0.2} />

      {EDGES.map(([fromId, toId]) => {
        const from = nodeMap[fromId];
        const to = nodeMap[toId];
        const isActive = activeConnections.some(([a, b]) => a === fromId && b === toId);
        const isDimmed = anyActive && !isActive;
        return (
          <Connection
            key={`${fromId}-${toId}`}
            fromPos={from.position}
            toPos={to.position}
            active={isActive}
            dimmed={isDimmed}
          />
        );
      })}

      {NODES.map((node) => {
        const isDimmed = anyActive && !activeIds.has(node.id);
        const isActive = activeIds.has(node.id) || selectedNode?.id === node.id;
        const isHovered = hoveredId === node.id;
        return (
          <NodeMesh
            key={node.id}
            node={node}
            isActive={isActive}
            isHovered={isHovered}
            isDimmed={isDimmed}
            onHover={setHoveredId}
            onClick={(n) => setSelectedNode((prev) => (prev?.id === n.id ? null : n))}
            prefersReducedMotion={prefersReducedMotion}
          />
        );
      })}
    </>
  );
}

// --- Legend ---

function Legend() {
  const items = [
    { type: "app", label: "Application" },
    { type: "infra", label: "Infrastructure" },
    { type: "db", label: "Database" },
  ];

  return (
    <div style={{
      position: "absolute", bottom: 20, left: 20, display: "flex", gap: 14,
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {items.map(({ type, label }) => {
        const col = TYPE_COLORS[type];
        return (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: col.dot, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#5a7a96", fontWeight: 500 }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

// --- Hint ---

function HintBar() {
  return (
    <div style={{
      position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
      fontSize: 11, color: "#5a7a96", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em",
      pointerEvents: "none", textTransform: "uppercase" as const,
    }}>
      Hover to highlight · Click to inspect
    </div>
  );
}

// --- Main Canvas Export ---

export default function SectionArchCanvas() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<typeof NODES[0] | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Suspense>
      </Canvas>

      <InfoPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      <Legend />
      <HintBar />
    </div>
  );
}
