import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const PunchyFeatureScene: React.FC<{
  statement: string;
  metric: string;
  metricLabel: string;
  accentColor?: string;
}> = ({ statement, metric, metricLabel, accentColor = "#38bdf8" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const cardProgress = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const opacity = interpolate(frame, [0, 10, 80, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(progress, [0, 1], [40, 0]);
  const cardScale = interpolate(cardProgress, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "36px",
          textAlign: "center",
        }}
      >
        {/* Anti-PPT: Single punchy statement (≤ 5 kata) */}
        <h2
          style={{
            fontSize: "3.5rem",
            fontWeight: 700,
            color: "#f8fafc",
            margin: 0,
            transform: `translateY(${translateY}px)`,
            letterSpacing: "-0.02em",
          }}
        >
          {statement}
        </h2>

        {/* Hero Metric / Visual Object */}
        <div
          style={{
            transform: `scale(${cardScale})`,
            background: "rgba(15, 23, 42, 0.75)",
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            borderBottom: `4px solid ${accentColor}`,
            borderRadius: "24px",
            padding: "40px 80px",
            boxShadow: `0 20px 40px -15px ${accentColor}33`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              fontSize: "6rem",
              fontWeight: 900,
              color: accentColor,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {metric}
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              color: "#94a3b8",
              marginTop: "16px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {metricLabel}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

