import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const TitleScene: React.FC<{
  title: string;
  subtitle: string;
  accentColor: string;
}> = ({ title, subtitle, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 15, 75, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(titleProgress, [0, 1], [40, 0]);

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
          transform: `translateY(${translateY}px)`,
          textAlign: "center",
          padding: "0 60px",
          maxWidth: "1400px",
        }}
      >
        <h1
          style={{
            fontSize: "4.5rem",
            fontWeight: 800,
            margin: 0,
            letterSpacing: "-0.02em",
            color: accentColor,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "2rem",
            color: "#94a3b8",
            marginTop: "24px",
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};

