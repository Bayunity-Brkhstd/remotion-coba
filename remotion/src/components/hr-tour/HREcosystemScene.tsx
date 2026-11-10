import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HREcosystemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central convergence spring
  const converge = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const spreadDist = interpolate(converge, [0, 1], [180, 0]);
  const centerScale = interpolate(converge, [0, 1], [0.85, 1]);

  const claimWords = ["Satu", "Tempat.", "Seluruh", "Karyawan."];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070b14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "4.5rem", fontWeight: 900, color: "#ffffff", margin: 0, letterSpacing: "-0.03em" }}>
          {claimWords.map((word, i) => {
            const delay = i * 6;
            const progress = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 140 } });
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const y = interpolate(progress, [0, 1], [25, 0]);
            const isHighlight = word === "Tempat." || word === "Karyawan.";

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity,
                  transform: `translateY(${y}px)`,
                  margin: "0 10px",
                  color: isHighlight ? "#6366f1" : "#ffffff",
                  textShadow: isHighlight ? "0 0 30px rgba(99, 102, 241, 0.5)" : "none",
                }}
              >
                {word}
              </span>
            );
          })}
        </h2>
        <p style={{ fontSize: "1.6rem", color: "#94a3b8", marginTop: "16px" }}>
          Semua operasi SDM saling terhubung otomatis tanpa aplikasi terpisah.
        </p>
      </div>

      {/* 4 Converging Feature Tiles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 240px)",
          gap: "24px",
          transform: `scale(${centerScale})`,
        }}
      >
        {[
          { title: "Presensi GPS", desc: "Anti fake-GPS & Face-ID", icon: "📍", deltaX: -spreadDist },
          { title: "Payroll 1-Klik", desc: "Pajak & BPJS Sinkron", icon: "💳", deltaX: -spreadDist * 0.3 },
          { title: "Cuti Mandiri", desc: "Approval instan manajer", icon: "🗓️", deltaX: spreadDist * 0.3 },
          { title: "KPI & Kinerja", desc: "Review 360° terukur", icon: "🎯", deltaX: spreadDist },
        ].map((module, idx) => (
          <div
            key={idx}
            style={{
              transform: `translateX(${module.deltaX}px)`,
              backgroundColor: "#0f172a",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: "18px",
              padding: "28px 24px",
              textAlign: "center",
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ fontSize: "2.8rem", marginBottom: "16px" }}>{module.icon}</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#f8fafc" }}>{module.title}</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "8px" }}>{module.desc}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
