import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { VideoProps } from "./types";
import { TitleScene } from "./components/TitleScene";
import { FeatureScene } from "./components/FeatureScene";

export const MainComposition: React.FC<VideoProps> = ({
  titleText,
  subtitleText,
  themeColor,
  features,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0b0f19",
        color: "#ffffff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Scene 1: Frame 0 sampai 90 (0 - 3 Detik) */}
      <Sequence from={0} durationInFrames={90}>
        <TitleScene
          title={titleText}
          subtitle={subtitleText}
          accentColor={themeColor}
        />
      </Sequence>

      {/* Scene 2: Frame 90 sampai 180 (3 - 6 Detik) */}
      <Sequence from={90} durationInFrames={90}>
        <FeatureScene items={features} accentColor={themeColor} />
      </Sequence>
    </AbsoluteFill>
  );
};

