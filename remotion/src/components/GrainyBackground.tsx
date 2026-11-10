import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const GrainyBackground: React.FC<{
  primaryColor?: string;
  secondaryColor?: string;
}> = ({ primaryColor = "#0f172a", secondaryColor = "#1e1b4b" }) => {
  const frame = useCurrentFrame();

  // Subtle breathing rotation and scale for ambient background life
  const rot = interpolate(frame, [0, 180], [0, 8], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 90, 180], [1, 1.05, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050811",
        overflow: "hidden",
      }}
    >
      {/* Dynamic ambient mesh gradient */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          transform: `scale(${scale}) rotate(${rot}deg)`,
          background: `radial-gradient(circle at 30% 30%, ${secondaryColor} 0%, transparent 60%),
                       radial-gradient(circle at 75% 70%, ${primaryColor} 0%, transparent 65%)`,
          filter: "blur(60px)",
          opacity: 0.7,
        }}
      />

      {/* Horizon glow at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background:
            "linear-gradient(to top, rgba(99, 102, 241, 0.12), transparent)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

