"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy-load the 3D canvas to avoid SSR issues
const ArchCanvas = dynamic(() => import("./SectionArchCanvas"), { ssr: false });

export default function SectionArch() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        background: "#F4F7FA",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Top divider */}
      <div style={{ height: 1, background: "rgba(11,60,93,0.06)" }} />

      {/* Dot grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(11,60,93,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "clamp(48px,5vw,80px) 24px 0",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#47B5FF",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <span style={{ width: 28, height: 1, background: "#47B5FF", display: "inline-block" }} />
          System Architecture
          <span style={{ width: 28, height: 1, background: "#47B5FF", display: "inline-block" }} />
        </div>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(24px, 2.4vw, 40px)",
            fontWeight: 700,
            color: "#0B3C5D",
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            textTransform: "uppercase",
          }}
        >
          Infrastructure Overview
        </h2>
        <p
          style={{
            fontSize: "clamp(14px, 1vw, 17px)",
            color: "#5a7a96",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          Interactive diagram of services, brokers, and data systems.
          Hover a node to trace connections. Click to inspect.
        </p>
      </div>

      {/* 3D Canvas */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "clamp(440px, 55vh, 640px)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 0.2s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}
      >
        {isVisible && (
          <Suspense fallback={null}>
            <ArchCanvas />
          </Suspense>
        )}
      </div>

      {/* Bottom spacing */}
      <div style={{ height: "clamp(32px,3vw,56px)" }} />
    </section>
  );
}
