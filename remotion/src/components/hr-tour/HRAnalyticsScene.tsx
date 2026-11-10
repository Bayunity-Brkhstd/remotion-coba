import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HRAnalyticsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bar growth progress
  const chartProgress = interpolate(frame, [15, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const retentionVal = (chartProgress * 98.4).toFixed(1);
  const onboardingVal = Math.round(chartProgress * 65);

  const claimWords = ["Keputusan", "Berbasis", "Data", "Nyata."];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070c18",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 100px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{ fontSize: "1.2rem", color: "#10b981", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
          Klaim 03 · People Intelligence
        </div>

        <h2 style={{ fontSize: "4.8rem", fontWeight: 900, color: "#ffffff", margin: 0, letterSpacing: "-0.03em" }}>
          {claimWords.map((word, i) => {
            const delay = i * 7;
            const progress = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 140 } });
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const y = interpolate(progress, [0, 1], [30, 0]);
            const isHighlight = word === "Data" || word === "Nyata.";

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity,
                  transform: `translateY(${y}px)`,
                  margin: "0 12px",
                  color: isHighlight ? "#10b981" : "#ffffff",
                  textShadow: isHighlight ? "0 0 30px rgba(16, 185, 129, 0.5)" : "none",
                }}
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>

      {/* Two Metric Analytics Cards with Animated Bars */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", width: "100%", maxWidth: "1100px" }}>
        {/* Card 1: Retention Rate */}
        <div
          style={{
            backgroundColor: "#0f172a",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderBottom: "4px solid #10b981",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ fontSize: "1.1rem", color: "#94a3b8", fontWeight: 600 }}>Tingkat Retensi Talenta</div>
          <div style={{ fontSize: "4.5rem", fontWeight: 900, color: "#10b981", marginTop: "12px", letterSpacing: "-0.02em" }}>
            {retentionVal}%
          </div>
          <div style={{ fontSize: "1rem", color: "#64748b", marginTop: "8px" }}>
            Meningkat +14.2% setelah menggunakan PulseHR
          </div>

          {/* Bar indicator */}
          <div style={{ height: "12px", backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: "6px", marginTop: "24px", overflow: "hidden" }}>
            <div style={{ width: `${chartProgress * 98.4}%`, height: "100%", backgroundColor: "#10b981", borderRadius: "6px" }} />
          </div>
        </div>

        {/* Card 2: Onboarding Time Reduction */}
        <div
          style={{
            backgroundColor: "#0f172a",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderBottom: "4px solid #38bdf8",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ fontSize: "1.1rem", color: "#94a3b8", fontWeight: 600 }}>Waktu Onboarding Karyawan</div>
          <div style={{ fontSize: "4.5rem", fontWeight: 900, color: "#38bdf8", marginTop: "12px", letterSpacing: "-0.02em" }}>
            -{onboardingVal}%
          </div>
          <div style={{ fontSize: "1rem", color: "#64748b", marginTop: "8px" }}>
            Dari 14 hari kerja berkurang menjadi 3 hari instan
          </div>

          {/* Bar indicator */}
          <div style={{ height: "12px", backgroundColor: "rgba(255, 255, 255, 0.08)", borderRadius: "6px", marginTop: "24px", overflow: "hidden" }}>
            <div style={{ width: `${chartProgress * 65}%`, height: "100%", backgroundColor: "#38bdf8", borderRadius: "6px" }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

