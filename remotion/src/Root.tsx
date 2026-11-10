import React from "react";
import { Composition } from "remotion";
import { MainComposition } from "./Composition";
import { CinematicComposition } from "./CinematicComposition";
import { HRProductTourComposition } from "./HRProductTourComposition";
import { VideoProps, CinematicVideoProps } from "./types";

export const RemotionRoot: React.FC = () => {
  const defaultProps: VideoProps = {
    titleText: "Programmatic Video Generation",
    subtitleText: "Powered by Gemini, Antigravity & Remotion",
    themeColor: "#6366f1",
    features: [
      "Deterministic Rendering",
      "React-Based Physics",
      "High Resolution Output",
    ],
  };

  const cinematicProps: CinematicVideoProps = {
    hookTagline: "Bang Motion × Remotion",
    hookHeadline: "Bukan Slide Presentasi",
    highlightWord: "Bukan",
    featureStatement: "Render Video Tanpa PPT",
    featureMetric: "60 FPS",
    featureMetricLabel: "Sinematik & Terprogram",
    themeColor: "#06b6d4",
  };

  return (
    <>
      {/* 16:9 Landscape Video (1920x1080) */}
      <Composition
        id="MainVideo"
        component={MainComposition}
        durationInFrames={180} // 6 detik pada 30 FPS
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
      />

      {/* 9:16 Portrait Reel / Shorts (1080x1920) */}
      <Composition
        id="MainVideoPortrait"
        component={MainComposition}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />

      {/* Cinematic Bang Motion Style (16:9) */}
      <Composition
        id="CinematicVideo"
        component={CinematicComposition}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={cinematicProps}
      />

      {/* Cinematic Bang Motion Style Portrait (9:16) */}
      <Composition
        id="CinematicVideoPortrait"
        component={CinematicComposition}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={cinematicProps}
      />

      {/* 45-second HR Dashboard Product Tour with Claims (16:9, 1350 frames @ 30 FPS) */}
      <Composition
        id="HRProductTour"
        component={HRProductTourComposition}
        durationInFrames={1350} // 45 detik pada 30 FPS
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

