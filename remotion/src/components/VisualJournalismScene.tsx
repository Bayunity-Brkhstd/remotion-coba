import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const VisualJournalismScene: React.FC<{
  editionTag?: string;
  headline: string;
  subHeadline?: string;
  accentColor?: string;
}> = ({
  editionTag = "INVESTIGASI VISUAL",
  headline,
  subHeadline,
  accentColor = "#e11d48",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy stamp entry
  const stampProgress = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 140, mass: 0.7 },
  });

  const opacity = interpolate(frame, [0, 8, 78, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cameraScale = interpolate(frame, [0, 90], [1.02, 0.98]);
  const stampScale = interpolate(stampProgress, [0, 1], [1.15, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#09090b",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `scale(${cameraScale})`,
      }}
    >
      {/* Editorial Grid / Line Texture */}
      <div
        style={{
          position: "absolute",
          inset: "5%",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          transform: `scale(${stampScale})`,
          textAlign: "center",
          maxWidth: "1200px",
          padding: "0 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Edition Tag / Stamp */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: accentColor,
            color: "#ffffff",
            padding: "8px 20px",
            fontSize: "1.2rem",
            fontWeight: 800,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            borderRadius: "4px",
          }}
        >
          {editionTag}
        </div>

        {/* Editorial Headline */}
        <h1
          style={{
            fontSize: "4.8rem",
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#fafafa",
            margin: 0,
            letterSpacing: "-0.03em",
            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
            textTransform: "uppercase",
          }}
        >
          {headline}
        </h1>

        {subHeadline && (
          <p
            style={{
              fontSize: "1.8rem",
              color: "#a1a1aa",
              maxWidth: "850px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {subHeadline}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};
