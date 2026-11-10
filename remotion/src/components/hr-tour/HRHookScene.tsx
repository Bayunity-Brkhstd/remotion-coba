import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HRHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entry = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const translateY = interpolate(entry, [0, 1], [50, 0]);

  // Radial zoom punch in the last second into the mini card (Frame 95 to 135)
  const zoomProgress = interpolate(frame, [95, 135], [1, 2.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blurAmount = interpolate(frame, [95, 130, 135], [0, 8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sceneOpacity = interpolate(frame, [120, 135], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070b14",
        justifyContent: "center",
        alignItems: "center",
        opacity: sceneOpacity,
      }}
    >
      {/* Dynamic ambient background glow */}
      <div
        style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div
        style={{
          transform: `scale(${zoomProgress}) translateY(${translateY}px)`,
          filter: `blur(${blurAmount}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: "1.2rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#818cf8",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          People Operations Platform
        </div>

        {/* Title with UI card between words */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
          }}
        >
          <span
            style={{
              fontSize: "6.2rem",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.04em",
            }}
          >
            People
          </span>

          {/* Mini UI floating card in the gap */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              border: "2px solid #6366f1",
              borderRadius: "16px",
              padding: "16px 22px",
              boxShadow: "0 15px 35px rgba(99, 102, 241, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              transform: "rotate(-3deg)",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                boxShadow: "0 0 10px #10b981",
              }}
            />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f8fafc" }}>
                1,248 Karyawan
              </div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                Semua Terhubung
              </div>
            </div>
          </div>

          <span
            style={{
              fontSize: "6.2rem",
              fontWeight: 900,
              color: "#6366f1",
              letterSpacing: "-0.04em",
            }}
          >
            Sederhana.
          </span>
        </div>

        <p
          style={{
            fontSize: "2rem",
            color: "#94a3b8",
            marginTop: "32px",
            maxWidth: "750px",
            lineHeight: 1.4,
          }}
        >
          Satu dasbor terpadu untuk cuti, payroll, dan analitik talenta.
        </p>
      </div>
    </AbsoluteFill>
  );
};

