import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HRSplitClaimScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split entrance slide
  const splitProgress = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const leftX = interpolate(splitProgress, [0, 1], [-100, 0]);
  const rightX = interpolate(splitProgress, [0, 1], [100, 0]);

  // Words for claim 2
  const claimWords = ["Payroll", "Tuntas.", "1", "Kali", "Klik."];

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row", backgroundColor: "#060a12" }}>
      {/* Left 52%: Clean UI Highlight Panel */}
      <div
        style={{
          width: "52%",
          height: "100%",
          backgroundColor: "#0f172a",
          borderRight: "2px solid rgba(99, 102, 241, 0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 70px",
          transform: `translateX(${leftX}px)`,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "1rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
              Status Distribusi Gaji
            </span>
            <span style={{ padding: "6px 12px", backgroundColor: "#10b981", borderRadius: "6px", fontWeight: 800, fontSize: "0.85rem", color: "#ffffff" }}>
              BERHASIL DITRANSFER
            </span>
          </div>

          <div style={{ fontSize: "3.2rem", fontWeight: 900, color: "#ffffff", marginTop: "20px" }}>
            Rp 1.248.000.000
          </div>
          <div style={{ fontSize: "1.1rem", color: "#38bdf8", marginTop: "8px", fontWeight: 600 }}>
            1,248 Rekening Karyawan Terbayar Langsung
          </div>

          <div style={{ marginTop: "28px", paddingTop: "24px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", gap: "24px" }}>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Waktu Eksekusi</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f8fafc", marginTop: "4px" }}>1.4 Detik</div>
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Bank Partner Terhubung</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f8fafc", marginTop: "4px" }}>BCA, Mandiri, BRI, BNI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right 48%: Vivid Brand Color Field with Claim */}
      <div
        style={{
          width: "48%",
          height: "100%",
          background: "linear-gradient(135deg, #312e81 0%, #1e1b4b 50%, #0f172a 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 70px",
          transform: `translateX(${rightX}px)`,
        }}
      >
        <div style={{ fontSize: "1.2rem", color: "#38bdf8", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}>
          Klaim 02 · Otomasi Finansial
        </div>

        <h2 style={{ fontSize: "4.5rem", fontWeight: 900, lineHeight: 1.15, color: "#ffffff", margin: 0, letterSpacing: "-0.03em" }}>
          {claimWords.map((word, i) => {
            const delay = i * 7;
            const progress = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 14, stiffness: 140 },
            });
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const y = interpolate(progress, [0, 1], [30, 0]);
            const isHighlight = word === "Tuntas." || word === "Klik.";

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity,
                  transform: `translateY(${y}px)`,
                  marginRight: "14px",
                  color: isHighlight ? "#38bdf8" : "#ffffff",
                  textShadow: isHighlight ? "0 0 25px rgba(56, 189, 248, 0.5)" : "none",
                }}
              >
                {word}
              </span>
            );
          })}
        </h2>

        <p style={{ fontSize: "1.7rem", color: "#c7d2fe", marginTop: "24px", lineHeight: 1.4 }}>
          Bebas salah hitung lembur, presensi, dan potongan pajak otomatis.
        </p>
      </div>
    </AbsoluteFill>
  );
};
