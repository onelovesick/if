"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import dynamic from "next/dynamic"

const StakeholderScene = dynamic(() => import("./StakeholderScene"), { ssr: false })

const STAKEHOLDERS = [
  { id: "contractors",  label: "Contractors",         desc: "General contractors, subcontractors, and field teams executing digital work packages." },
  { id: "architects",   label: "Architects",          desc: "Design teams producing coordinated BIM models and design documentation." },
  { id: "government",   label: "Government Agencies",  desc: "Public owners, regulatory bodies, and permitting authorities." },
  { id: "consultants",  label: "Consultants & PMs",   desc: "Project managers, cost consultants, and digital delivery advisors." },
  { id: "engineers",    label: "Engineers",            desc: "Structural, mechanical, electrical, and civil engineering disciplines." },
  { id: "owners",       label: "Owners & Developers",  desc: "Asset owners, developers, and investment groups managing capital programmes." },
]

export default function Section6() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.08 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#060e18",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Blueprint grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(71,181,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(71,181,255,0.025) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "10%", left: "20%",
        width: "60%", height: "80%",
        background: "radial-gradient(ellipse at 35% 50%, rgba(71,181,255,0.06) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Content wrapper */}
      <div className="esk-grid" style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: 1400,
        margin: "0 auto",
        padding: "clamp(48px,5vw,80px) clamp(24px,5%,64px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px,4vw,64px)",
        alignItems: "center",
      }}>

        {/* Left: 3D scene */}
        <div style={{
          position: "relative",
          height: "clamp(400px, 50vh, 600px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.4s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {visible && (
            <Suspense fallback={null}>
              <StakeholderScene hoveredId={hoveredId} />
            </Suspense>
          )}
        </div>

        {/* Right: content */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.4s ease 0.15s, transform 1.6s cubic-bezier(0.16,1,0.3,1) 0.15s",
        }}>

          {/* Eyebrow */}
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11, fontWeight: 500,
            letterSpacing: "0.28em", textTransform: "uppercase" as const,
            color: "#47B5FF", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ width: 28, height: 1, background: "#47B5FF", opacity: 0.5, display: "inline-block" }} />
            Who We Serve
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Inter Tight', 'Inter', sans-serif",
            fontSize: "clamp(32px, 3.8vw, 56px)",
            fontWeight: 900, textTransform: "uppercase" as const,
            color: "#F0F4F7", lineHeight: 1,
            letterSpacing: "-0.03em", marginBottom: 20,
          }}>
            Empowering Every{" "}
            <span style={{ color: "#47B5FF" }}>Stakeholder</span>
          </h2>

          {/* Body */}
          <p style={{
            fontSize: "clamp(14px, 1.1vw, 17px)",
            color: "#93b1c8", lineHeight: 1.8,
            maxWidth: 520, marginBottom: 40,
          }}>
            From planning to post-construction, we align teams with data-driven clarity and integrated workflows. Every actor in the project ecosystem connects through one structured digital environment.
          </p>

          {/* Stakeholder grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            borderTop: "1px solid rgba(71,181,255,0.12)",
          }}>
            {STAKEHOLDERS.map((s, i) => (
              <div
                key={s.id}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: "18px 16px 18px 0",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(71,181,255,0.08)",
                  borderRight: i % 2 === 0 ? "1px solid rgba(71,181,255,0.08)" : "none",
                  paddingLeft: i % 2 === 1 ? 16 : 0,
                  transition: "background 0.25s ease",
                  background: hoveredId === s.id ? "rgba(71,181,255,0.04)" : "transparent",
                  position: "relative" as const,
                }}
              >
                {/* Active indicator */}
                {i % 2 === 0 && (
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
                    background: "#47B5FF",
                    transform: hoveredId === s.id ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "bottom",
                    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }} />
                )}

                <div style={{
                  display: "flex", alignItems: "center", gap: 10, marginBottom: 4,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: hoveredId === s.id ? "#47B5FF" : "rgba(71,181,255,0.3)",
                    transition: "background 0.3s, box-shadow 0.3s",
                    boxShadow: hoveredId === s.id ? "0 0 8px rgba(71,181,255,0.5)" : "none",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Inter Tight', 'Inter', sans-serif",
                    fontSize: "clamp(13px, 1vw, 15px)",
                    fontWeight: 700, textTransform: "uppercase" as const,
                    letterSpacing: "0.02em",
                    color: hoveredId === s.id ? "#fff" : "#93b1c8",
                    transition: "color 0.25s",
                  }}>
                    {s.label}
                  </span>
                </div>
                <p style={{
                  fontSize: 12, color: "rgba(147,177,200,0.6)",
                  lineHeight: 1.5, paddingLeft: 16,
                }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10, letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: "rgba(71,181,255,0.3)",
            marginTop: 24,
          }}>
            6 Stakeholder Groups · One Digital Ecosystem
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          .esk-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
