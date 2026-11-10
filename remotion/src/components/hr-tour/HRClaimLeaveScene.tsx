import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HRClaimLeaveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient shift from neutral dark to vivid brand indigo
  const bgHue = interpolate(frame, [0, 40], [220, 240]);

  // Card lifting up with 3D perspective
  const cardEntry = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const cardY = interpolate(cardEntry, [0, 1], [100, 0]);
  const cardRotX = interpolate(cardEntry, [0, 1], [15, 0]);

  // Approval badge stamp animation (at frame 45)
  const stampProgress = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 10, stiffness: 150 },
  });
  const stampScale = interpolate(stampProgress, [0, 1], [2, 1]);

  // Claim words sequence
  const claimWords = ["Approval", "Cuti", "Instan.", "Tanpa", "Antri."];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 60% 40%, hsl(${bgHue}, 60%, 15%) 0%, #060911 80%)`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 100px",
      }}
    >
      {/* Left Column: Word-by-word punchy claim */}
      <div style={{ flex: 1, maxWidth: "650px" }}>
        <div
          style={{
            fontSize: "1.2rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#38bdf8",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          Klaim 01 · Efisiensi Waktu
        </div>

        <h2
          style={{
            fontSize: "4.8rem",
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          {claimWords.map((word, i) => {
            const wordDelay = i * 6;
            const wordProgress = spring({
              frame: Math.max(0, frame - wordDelay),
              fps,
              config: { damping: 14, stiffness: 140 },
            });
            const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1]);
            const wordY = interpolate(wordProgress, [0, 1], [30, 0]);
            const isHighlight = word === "Instan." || word === "Antri.";

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: wordOpacity,
                  transform: `translateY(${wordY}px)`,
                  marginRight: "16px",
                  color: isHighlight ? "#818cf8" : "#ffffff",
                  textShadow: isHighlight ? "0 0 30px rgba(129, 140, 248, 0.5)" : "none",
                }}
              >
                {word}
              </span>
            );
          })}
        </h2>

        <p
          style={{
            fontSize: "1.8rem",
            color: "#94a3b8",
            marginTop: "28px",
            lineHeight: 1.4,
          }}
        >
          Karyawan ajukan lewat smartphone, manajer setujui dalam 3 detik.
        </p>
      </div>

      {/* Right Column: Floating 3D Leave Card */}
      <div
        style={{
          width: "560px",
          transform: `translateY(${cardY}px) perspective(1000px) rotateX(${cardRotX}deg)`,
          backgroundColor: "#0f172a",
          border: "2px solid rgba(99, 102, 241, 0.4)",
          borderRadius: "24px",
          padding: "36px",
          boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.25)",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              DP
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#f8fafc" }}>
                Dimas Pratama
              </div>
              <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                Senior Engineer · Engineering
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "6px 14px",
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              color: "#38bdf8",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            Cuti Tahunan
          </div>
        </div>

        <div style={{ marginTop: "24px", padding: "18px", backgroundColor: "rgba(255, 255, 255, 0.03)", borderRadius: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "#94a3b8" }}>
            <span>Tanggal Pengajuan:</span>
            <span style={{ color: "#f8fafc", fontWeight: 600 }}>18 - 20 Nov 2026</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "#94a3b8", marginTop: "10px" }}>
            <span>Sisa Kuota Cuti:</span>
            <span style={{ color: "#10b981", fontWeight: 700 }}>9 Hari Tersedia</span>
          </div>
        </div>

        {/* Approval Stamp */}
        <div
          style={{
            marginTop: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "16px",
            backgroundColor: "#10b981",
            borderRadius: "14px",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: "1.2rem",
            transform: `scale(${stampScale})`,
            boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)",
          }}
        >
          <span>✓</span>
          <span>DISETUJUI OTOMATIS</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

