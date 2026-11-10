import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CinematicVideoProps } from "./types";
import { GrainyBackground } from "./components/GrainyBackground";
import { KineticTitleScene } from "./components/KineticTitleScene";
import { PunchyFeatureScene } from "./components/PunchyFeatureScene";

export const CinematicComposition: React.FC<CinematicVideoProps> = ({
  hookTagline,
  hookHeadline,
  highlightWord,
  featureStatement,
  featureMetric,
  featureMetricLabel,
  themeColor,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050811",
        color: "#ffffff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Persistent Multi-Layer Ambient Background */}
      <GrainyBackground
        primaryColor={themeColor}
        secondaryColor="#1e1b4b"
      />

      {/* Shot 1 (0s - 3s): Kinetic Hook Statement */}
      <Sequence from={0} durationInFrames={90}>
        <KineticTitleScene
          tagline={hookTagline}
          punchline={hookHeadline}
          highlightWord={highlightWord}
          accentColor={themeColor}
        />
      </Sequence>

      {/* Shot 2 (3s - 6s): Anti-PPT Hero Metric Statement */}
      <Sequence from={90} durationInFrames={90}>
        <PunchyFeatureScene
          statement={featureStatement}
          metric={featureMetric}
          metricLabel={featureMetricLabel}
          accentColor={themeColor}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

