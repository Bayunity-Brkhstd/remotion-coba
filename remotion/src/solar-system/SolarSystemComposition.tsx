import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SolarSystemProps } from "./types";
import { SolarSystemCanvas } from "./components/SolarSystemCanvas";
import { SolarSystemOverlays } from "./components/SolarSystemOverlays";

export const SolarSystemComposition: React.FC<SolarSystemProps> = ({
  zoom = 1,
  totalDays = 365.25,
  startDateIso = "2025-01-01T00:00:00Z",
  title = "Solar System Orbital Motion",
  subtitle = "Full Year Planetary Simulation · 2025",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Linear progression mapping frame number to day offset
  const dayOffset = interpolate(
    frame,
    [0, Math.max(1, durationInFrames - 1)],
    [0, totalDays],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#08090d", overflow: "hidden" }}>
      {/* Canvas 2D render layer */}
      <SolarSystemCanvas dayOffset={dayOffset} zoom={zoom} />

      {/* HTML Overlay text & date layer */}
      <SolarSystemOverlays
        startDateIso={startDateIso}
        dayOffset={dayOffset}
        title={title}
        subtitle={subtitle}
      />
    </AbsoluteFill>
  );
};

