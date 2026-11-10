import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const FeatureScene: React.FC<{
  items: string[];
  accentColor: string;
}> = ({ items, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "70%",
          maxWidth: "1100px",
        }}
      >
        {items.map((item, index) => {
          const delay = index * 8;
          const progress = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 14, stiffness: 120 },
          });

          const scale = interpolate(progress, [0, 1], [0.85, 1]);
          const itemOpacity = interpolate(progress, [0, 1], [0, 1]);

          return (
            <div
              key={index}
              style={{
                opacity: itemOpacity,
                transform: `scale(${scale})`,
                backgroundColor: "#1e293b",
                borderLeft: `8px solid ${accentColor}`,
                padding: "24px 32px",
                borderRadius: "12px",
                fontSize: "1.6rem",
                fontWeight: 600,
                color: "#f8fafc",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

