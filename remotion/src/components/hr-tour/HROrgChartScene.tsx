import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HROrgChartScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Root tree entrance
  const rootSpring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const rootScale = interpolate(rootSpring, [0, 1], [0.8, 1]);

  // Children cards delay
  const child1Spring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 130 } });
  const child2Spring = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 12, stiffness: 130 } });
  const child3Spring = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 12, stiffness: 130 } });

  // Focus zoom on child 2 (Engineering lead) at frame 80
  const zoomEngine = interpolate(frame, [80, 140], [1, 1.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panY = interpolate(frame, [80, 140], [0, -70]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070b13",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "50px", left: "70px" }}>
        <div style={{ fontSize: "1.1rem", color: "#818cf8", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Tur Fitur 03 · Struktur Organisasi & Talenta
        </div>
        <h2 style={{ fontSize: "2.6rem", fontWeight: 800, margin: "6px 0 0", color: "#ffffff" }}>
          Visualisasi Hirarki & Jalur Karir Real-time
        </h2>
      </div>

      <div
        style={{
          transform: `scale(${zoomEngine}) translateY(${panY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          marginTop: "60px",
        }}
      >
        {/* Parent Node: VP of Technology */}
        <div
          style={{
            transform: `scale(${rootScale})`,
            backgroundColor: "#1e1b4b",
            border: "2px solid #6366f1",
            borderRadius: "16px",
            padding: "20px 36px",
            boxShadow: "0 15px 35px rgba(99, 102, 241, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
            IK
          </div>
          <div>
            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>Indra Kusuma</div>
            <div style={{ fontSize: "0.9rem", color: "#a5b4fc" }}>VP of Technology · 48 Anggota Tim</div>
          </div>
        </div>

        {/* Vertical SVG connector lines */}
        <div style={{ width: "2px", height: "30px", backgroundColor: "rgba(99, 102, 241, 0.4)" }} />

        {/* Children Row: 3 Department Leads */}
        <div style={{ display: "flex", gap: "36px" }}>
          {[
            { name: "Maya Lestari", role: "Frontend Lead", team: "14 Devs", progress: child1Spring, active: false },
            { name: "Dimas Pratama", role: "Sr. Backend Lead", team: "20 Devs · KPI 98%", progress: child2Spring, active: true },
            { name: "Bagus Setiawan", role: "QA Lead", team: "14 QA", progress: child3Spring, active: false },
          ].map((child, idx) => {
            const scale = interpolate(child.progress, [0, 1], [0.75, 1]);
            const opacity = interpolate(child.progress, [0, 1], [0, 1]);

            return (
              <div
                key={idx}
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  backgroundColor: child.active ? "#0f172a" : "rgba(15, 23, 42, 0.6)",
                  border: child.active ? "2px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  padding: "22px 28px",
                  width: "300px",
                  boxShadow: child.active ? "0 20px 40px rgba(56, 189, 248, 0.3)" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "#f8fafc" }}>{child.name}</div>
                  {child.active && (
                    <span style={{ fontSize: "0.75rem", backgroundColor: "#38bdf8", color: "#090d16", padding: "4px 8px", borderRadius: "6px", fontWeight: 800 }}>
                      FOKUS
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#94a3b8", marginTop: "6px" }}>{child.role}</div>
                <div style={{ fontSize: "0.85rem", color: child.active ? "#38bdf8" : "#64748b", marginTop: "12px", fontWeight: 600 }}>
                  {child.team}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

