import React from "react";
import { Composition } from "remotion";
import { MainComposition } from "./Composition";
import { CinematicComposition } from "./CinematicComposition";
import { HRProductTourComposition } from "./HRProductTourComposition";
import { SolarSystemComposition } from "./solar-system/SolarSystemComposition";
import { VideoProps, CinematicVideoProps } from "./types";
import { SolarSystemProps } from "./solar-system/types";

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

      {/* 30-second Solar System Orbital Motion (1 Full Year, 1920x1080 @ 30 FPS) */}
      <Composition
        id="SolarSystem"
        component={SolarSystemComposition}
        durationInFrames={900} // 30 detik pada 30 FPS
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          zoom: 1,
          totalDays: 365.25,
          startDateIso: "2025-01-01T00:00:00Z",
          title: "Solar System Orbital Motion",
          subtitle: "Full Year Planetary Motion Simulation (2025)",
        }}
      />

      {/* 30-second Inner Planets Close-Up (3 Months, zoom 2.5) */}
      <Composition
        id="InnerPlanets"
        component={SolarSystemComposition}
        durationInFrames={900} // 30 detik pada 30 FPS
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          zoom: 2.5,
          totalDays: 90,
          startDateIso: "2025-01-01T00:00:00Z",
          title: "Inner Planets Orbital Motion",
          subtitle: "3-Month Close-Up Simulation · Mercury to Mars",
        }}
      />
    </>
  );
};

