import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HROutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.85, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // CTA button spring at frame 30
  const ctaSpring = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 12, stiffness: 130 } });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050811",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Concentric ambient background rings */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          border: "1px solid rgba(99, 102, 241, 0.15)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "1100px",
          height: "1100px",
          borderRadius: "50%",
          border: "1px solid rgba(99, 102, 241, 0.08)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Brand Icon + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #6366f1, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "2.4rem",
              color: "#ffffff",
              boxShadow: "0 15px 35px rgba(99, 102, 241, 0.4)",
            }}
          >
            P
          </div>
          <span style={{ fontSize: "4.8rem", fontWeight: 900, letterSpacing: "-0.04em", color: "#ffffff" }}>
            Pulse<span style={{ color: "#6366f1" }}>HR</span>
          </span>
        </div>

        <p style={{ fontSize: "2rem", color: "#94a3b8", margin: "8px 0 24px", fontWeight: 500 }}>
          Solusi Operasi SDM & Payroll Paling Modern di Indonesia
        </p>

        {/* CTA Button & URL */}
        <div style={{ transform: `scale(${ctaScale})`, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              padding: "20px 48px",
              borderRadius: "16px",
              fontWeight: 800,
              fontSize: "1.4rem",
              boxShadow: "0 15px 35px rgba(79, 70, 229, 0.4)",
            }}
          >
            Mulai Uji Coba Gratis 14 Hari
          </div>
          <div style={{ fontSize: "1.2rem", color: "#64748b", fontWeight: 600, letterSpacing: "0.05em" }}>
            www.pulsehr.id · Tanpa Kartu Kredit
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

