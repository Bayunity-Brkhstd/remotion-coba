import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const KineticTitleScene: React.FC<{
  punchline: string;
  highlightWord?: string;
  tagline?: string;
  accentColor?: string;
}> = ({
  punchline,
  highlightWord,
  tagline,
  accentColor = "#38bdf8",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entryProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.8 },
  });

  // Camera push (cinematic breathing)
  const cameraScale = interpolate(frame, [0, 90], [0.95, 1.04], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [0, 10, 75, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entryProgress, [0, 1], [60, 0]);

  // Split punchline into words to highlight target word
  const words = punchline.split(" ");

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `scale(${cameraScale})`,
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          textAlign: "center",
          maxWidth: "1300px",
          padding: "0 40px",
        }}
      >
        {tagline && (
          <div
            style={{
              fontSize: "1.4rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#94a3b8",
              marginBottom: "18px",
              fontWeight: 600,
            }}
          >
            {tagline}
          </div>
        )}

        <h1
          style={{
            fontSize: "5.5rem",
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          {words.map((word, i) => {
            const isHighlight =
              highlightWord &&
              word.toLowerCase().includes(highlightWord.toLowerCase());
            return (
              <span
                key={i}
                style={{
                  color: isHighlight ? accentColor : "#ffffff",
                  display: "inline-block",
                  margin: "0 12px",
                  textShadow: isHighlight
                    ? `0 0 35px ${accentColor}66`
                    : "0 4px 20px rgba(0,0,0,0.5)",
                }}
              >
                {word}
              </span>
            );
          })}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

