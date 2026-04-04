"use client"
import { useEffect, useRef, useState } from 'react'

const STAKEHOLDERS = [
  { id: "contractors",  label: "Contractors",          desc: "General contractors, subcontractors, and field teams executing digital work packages.", angle: -Math.PI / 2 },
  { id: "architects",   label: "Architects",           desc: "Design teams producing coordinated BIM models and design documentation.", angle: -Math.PI / 2 + Math.PI / 3 },
  { id: "government",   label: "Government Agencies",  desc: "Public owners, regulatory bodies, and permitting authorities.", angle: -Math.PI / 2 + (2 * Math.PI) / 3 },
  { id: "consultants",  label: "Consultants & PMs",    desc: "Project managers, cost consultants, and digital delivery advisors.", angle: -Math.PI / 2 + Math.PI },
  { id: "engineers",    label: "Engineers",             desc: "Structural, mechanical, electrical, and civil engineering disciplines.", angle: -Math.PI / 2 + (4 * Math.PI) / 3 },
  { id: "owners",       label: "Owners & Developers",  desc: "Asset owners, developers, and investment groups managing capital programmes.", angle: -Math.PI / 2 + (5 * Math.PI) / 3 },
]

const sectionHtml = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;900&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

.esk *, .esk *::before, .esk *::after { box-sizing: border-box; margin: 0; padding: 0; }

.esk {
  --accent: #47B5FF;
  --navy: #0B3C5D;
  --bg: #060e18;
  --text: #F0F4F7;
  --muted: #93b1c8;
  --mono: 'DM Mono', monospace;

  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* Grid bg */
.esk::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(71,181,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,181,255,0.02) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
}

/* Glow */
.esk::after {
  content: '';
  position: absolute; top: 10%; left: 15%;
  width: 50%; height: 80%;
  background: radial-gradient(ellipse at 50% 50%, rgba(71,181,255,0.05) 0%, transparent 60%);
  pointer-events: none;
}

.esk-wrap {
  position: relative; z-index: 1;
  width: 100%; max-width: 1400px;
  margin: 0 auto;
  padding: clamp(48px,5vw,80px) clamp(24px,5%,64px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px,4vw,64px);
  align-items: center;
}

/* Canvas */
.esk-canvas {
  width: 100%;
  aspect-ratio: 1;
  max-height: 580px;
}

/* Right content */
.esk-right {
  display: flex; flex-direction: column;
}

.esk-eyebrow {
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
  display: flex; align-items: center; gap: 12px;
}
.esk-eyebrow::before {
  content: ''; width: 28px; height: 1px;
  background: var(--accent); opacity: 0.5;
}

.esk-headline {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(32px,3.8vw,56px);
  font-weight: 900; text-transform: uppercase;
  color: var(--text); line-height: 1;
  letter-spacing: -0.03em; margin-bottom: 20px;
}
.esk-accent { color: var(--accent); }

.esk-body {
  font-size: clamp(14px,1.1vw,17px);
  color: var(--muted); line-height: 1.8;
  max-width: 520px; margin-bottom: 36px;
}

/* Stakeholder items */
.esk-list {
  display: grid; grid-template-columns: 1fr 1fr;
  border-top: 1px solid rgba(71,181,255,0.12);
}
.esk-item {
  padding: 16px 14px 16px 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(71,181,255,0.08);
  position: relative;
  transition: background 0.25s;
}
.esk-item:nth-child(odd) {
  border-right: 1px solid rgba(71,181,255,0.08);
}
.esk-item:nth-child(even) {
  padding-left: 14px;
}
.esk-item:hover, .esk-item.esk-active {
  background: rgba(71,181,255,0.04);
}

/* Accent bar */
.esk-item::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: var(--accent);
  transform: scaleY(0); transform-origin: bottom;
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
}
.esk-item:nth-child(odd):hover::before,
.esk-item:nth-child(odd).esk-active::before { transform: scaleY(1); }

.esk-item-head {
  display: flex; align-items: center; gap: 10px; margin-bottom: 4px;
}
.esk-item-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(71,181,255,0.3);
  transition: background 0.3s, box-shadow 0.3s;
  flex-shrink: 0;
}
.esk-item:hover .esk-item-dot,
.esk-item.esk-active .esk-item-dot {
  background: var(--accent);
  box-shadow: 0 0 8px rgba(71,181,255,0.5);
}
.esk-item-label {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(12px,0.9vw,14px);
  font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--muted); transition: color 0.25s;
}
.esk-item:hover .esk-item-label,
.esk-item.esk-active .esk-item-label { color: #fff; }

.esk-item-desc {
  font-size: 11.5px; color: rgba(147,177,200,0.55);
  line-height: 1.5; padding-left: 16px;
}

.esk-footer {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(71,181,255,0.3); margin-top: 24px;
}

/* Scroll reveal */
.esk-reveal {
  opacity: 0; transform: translateY(30px);
  transition: opacity 1.4s ease, transform 1.6s cubic-bezier(0.16,1,0.3,1);
}
.esk-reveal.esk-vis { opacity: 1; transform: translateY(0); }
.esk-reveal-d1 { transition-delay: 0.12s; }

/* Responsive */
@media (max-width: 1024px) {
  .esk-wrap { grid-template-columns: 1fr; }
  .esk-canvas { max-height: 420px; margin: 0 auto; }
}
@media (min-width: 1800px) {
  .esk-wrap { max-width: 1600px; }
}
</style>

<section class="esk" id="eskRoot">
  <div class="esk-wrap">

    <div class="esk-reveal" id="eskLeft">
      <canvas class="esk-canvas" id="eskCanvas"></canvas>
    </div>

    <div class="esk-right esk-reveal esk-reveal-d1" id="eskRight">
      <div class="esk-eyebrow">Who We Serve</div>
      <h2 class="esk-headline">Empowering Every <span class="esk-accent">Stakeholder</span></h2>
      <p class="esk-body">From planning to post-construction, we align teams with data-driven clarity and integrated workflows. Every actor in the project ecosystem connects through one structured digital environment.</p>

      <div class="esk-list" id="eskList">
        ${STAKEHOLDERS.map((s, i) => `
        <div class="esk-item" data-id="${s.id}">
          <div class="esk-item-head">
            <span class="esk-item-dot"></span>
            <span class="esk-item-label">${s.label}</span>
          </div>
          <p class="esk-item-desc">${s.desc}</p>
        </div>`).join('')}
      </div>

      <div class="esk-footer">6 Stakeholder Groups · One Digital Ecosystem</div>
    </div>

  </div>
</section>`

export default function Section6() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const hoveredRef = useRef<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(false)

  // Keep ref in sync with state for the animation loop
  useEffect(() => { hoveredRef.current = hoveredId }, [hoveredId])

  useEffect(() => {
    const root = document.getElementById('eskRoot')
    const canvas = document.getElementById('eskCanvas') as HTMLCanvasElement
    if (!root || !canvas) return
    canvasRef.current = canvas

    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0, cx = 0, cy = 0, radius = 0
    let time = 0

    // Current animated values per node (for smooth lerp)
    const nodeGlow = STAKEHOLDERS.map(() => 0)

    function resize() {
      const rect = canvas.getBoundingClientRect()
      W = rect.width; H = rect.height
      canvas.width = W * dpr; canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = W / 2; cy = H / 2
      radius = Math.min(W, H) * 0.36
    }

    function draw() {
      if (!visibleRef.current) { rafRef.current = requestAnimationFrame(draw); return }
      time += 0.006
      ctx.clearRect(0, 0, W, H)

      const hovered = hoveredRef.current

      // Lerp node glow
      STAKEHOLDERS.forEach((s, i) => {
        const target = hovered === s.id ? 1 : 0
        nodeGlow[i] += (target - nodeGlow[i]) * 0.08
      })

      const anyActive = hovered !== null

      // ── Outer rings ──
      for (let r = 0; r < 3; r++) {
        const ringR = radius * (0.55 + r * 0.22)
        const rot = time * (r % 2 === 0 ? 1 : -1) * 0.3
        ctx.beginPath()
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(71,181,255,${0.04 + r * 0.02})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Dashes on rings
        const dashCount = 24 + r * 12
        for (let d = 0; d < dashCount; d++) {
          const a = (d / dashCount) * Math.PI * 2 + rot
          const len = 3
          const x1 = cx + Math.cos(a) * (ringR - len)
          const y1 = cy + Math.sin(a) * (ringR - len)
          const x2 = cx + Math.cos(a) * (ringR + len)
          const y2 = cy + Math.sin(a) * (ringR + len)
          ctx.beginPath()
          ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
          ctx.strokeStyle = `rgba(71,181,255,${0.06 + r * 0.02})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // ── Radial lines from center to each node ──
      STAKEHOLDERS.forEach((s, i) => {
        const nx = cx + Math.cos(s.angle) * radius
        const ny = cy + Math.sin(s.angle) * radius
        const glow = nodeGlow[i]
        const baseAlpha = 0.06 + glow * 0.25

        // Line
        ctx.beginPath()
        ctx.moveTo(cx, cy); ctx.lineTo(nx, ny)
        ctx.strokeStyle = `rgba(71,181,255,${baseAlpha})`
        ctx.lineWidth = 1 + glow * 1.5
        ctx.stroke()

        // Traveling dots (2 per line at different offsets)
        for (let d = 0; d < 2; d++) {
          const speed = 0.3 + d * 0.15
          const t = ((time * speed + d * 0.5 + i * 0.17) % 1)
          const dx = cx + (nx - cx) * t
          const dy = cy + (ny - cy) * t
          const dotAlpha = 0.2 + glow * 0.6
          const dotR = 1.5 + glow * 1.5

          ctx.beginPath()
          ctx.arc(dx, dy, dotR, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(71,181,255,${dotAlpha})`
          ctx.fill()

          // Dot glow
          if (glow > 0.1) {
            ctx.beginPath()
            ctx.arc(dx, dy, dotR + 4, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(71,181,255,${glow * 0.15})`
            ctx.fill()
          }
        }
      })

      // ── Central hub ──
      const hubPulse = 0.85 + Math.sin(time * 3) * 0.15
      const hubAlpha = anyActive ? 0.2 : 0.1

      // Outer glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.35)
      grad.addColorStop(0, `rgba(71,181,255,${hubAlpha * hubPulse})`)
      grad.addColorStop(1, 'rgba(71,181,255,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 0.35, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // Hub circle
      ctx.beginPath()
      ctx.arc(cx, cy, 28, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(71,181,255,${0.15 + (anyActive ? 0.15 : 0)})`
      ctx.fill()
      ctx.strokeStyle = `rgba(71,181,255,${0.3 + (anyActive ? 0.2 : 0)})`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Hub inner
      ctx.beginPath()
      ctx.arc(cx, cy, 12, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(71,181,255,${0.4 + (anyActive ? 0.3 : 0)})`
      ctx.fill()

      // Hub text
      ctx.font = "600 7px 'DM Mono', monospace"
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = `rgba(71,181,255,${0.6 + (anyActive ? 0.3 : 0)})`
      ctx.fillText('IF', cx, cy)

      // ── Node endpoints ──
      STAKEHOLDERS.forEach((s, i) => {
        const nx = cx + Math.cos(s.angle) * radius
        const ny = cy + Math.sin(s.angle) * radius
        const glow = nodeGlow[i]
        const nodeR = 18 + glow * 8

        // Node glow
        if (glow > 0.05) {
          const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, nodeR + 20)
          ng.addColorStop(0, `rgba(71,181,255,${glow * 0.2})`)
          ng.addColorStop(1, 'rgba(71,181,255,0)')
          ctx.beginPath()
          ctx.arc(nx, ny, nodeR + 20, 0, Math.PI * 2)
          ctx.fillStyle = ng
          ctx.fill()
        }

        // Node circle
        ctx.beginPath()
        ctx.arc(nx, ny, nodeR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(10,20,35,${0.85 + glow * 0.15})`
        ctx.fill()
        ctx.strokeStyle = `rgba(71,181,255,${0.15 + glow * 0.55})`
        ctx.lineWidth = 1 + glow
        ctx.stroke()

        // Node inner dot
        ctx.beginPath()
        ctx.arc(nx, ny, 4 + glow * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(71,181,255,${0.25 + glow * 0.6})`
        ctx.fill()

        // Label
        const labelR = radius + 32 + glow * 8
        const lx = cx + Math.cos(s.angle) * labelR
        const ly = cy + Math.sin(s.angle) * labelR

        ctx.font = `${glow > 0.3 ? '600' : '500'} ${9 + glow * 2}px 'DM Mono', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = `rgba(147,177,200,${0.45 + glow * 0.55})`
        ctx.fillText(s.label.toUpperCase(), lx, ly)
      })

      // ── Ambient particles ──
      for (let p = 0; p < 30; p++) {
        const pa = (p / 30) * Math.PI * 2 + time * 0.2
        const pr = radius * (0.3 + Math.sin(time + p * 1.3) * 0.5 + 0.5) * 0.9
        const px = cx + Math.cos(pa) * pr
        const py = cy + Math.sin(pa) * pr
        const alpha = 0.08 + Math.sin(time * 2 + p) * 0.06
        ctx.beginPath()
        ctx.arc(px, py, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(71,181,255,${alpha})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    // Visibility
    const io = new IntersectionObserver(([e]) => {
      visibleRef.current = e.isIntersecting
      if (e.isIntersecting) {
        document.getElementById('eskLeft')?.classList.add('esk-vis')
        document.getElementById('eskRight')?.classList.add('esk-vis')
      }
    }, { threshold: 0.08 })
    io.observe(root)

    // Hover events
    const items = document.querySelectorAll('.esk-item')
    items.forEach((item) => {
      const id = item.getAttribute('data-id')
      item.addEventListener('mouseenter', () => { setHoveredId(id); item.classList.add('esk-active') })
      item.addEventListener('mouseleave', () => { setHoveredId(null); item.classList.remove('esk-active') })
    })

    resize()
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      io.disconnect()
    }
  }, [])

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: sectionHtml }}
    />
  )
}
