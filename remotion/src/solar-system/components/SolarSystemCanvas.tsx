import React, { useEffect, useMemo, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { renderSolarSystemScene } from "../renderer";
import { generateDeterministicStars } from "../utils";

interface SolarSystemCanvasProps {
  dayOffset: number;
  zoom: number;
}

export const SolarSystemCanvas: React.FC<SolarSystemCanvasProps> = ({
  dayOffset,
  zoom,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pre-generate 500 deterministic stars
  const stars = useMemo(
    () => generateDeterministicStars(500, width, height),
    [width, height]
  );

  // Redraw every frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderSolarSystemScene(ctx, width, height, dayOffset, zoom, stars);
  }, [frame, width, height, dayOffset, zoom, stars]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};

