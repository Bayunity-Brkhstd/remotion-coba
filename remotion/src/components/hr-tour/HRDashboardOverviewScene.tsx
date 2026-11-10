import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { HRDashboardLayout } from "./HRDashboardLayout";

export const HRDashboardOverviewScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Camera choreography: starts slightly close, slowly zooms out, then pushes into bottom left widget (Cuti & Izin)
  const cameraZoom = interpolate(frame, [0, 60, 150], [1.12, 1.0, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cameraTranslateX = interpolate(frame, [0, 60, 150], [0, 0, 120]);
  const cameraTranslateY = interpolate(frame, [0, 60, 150], [0, 0, -80]);

  // Subtle label pill indicating the live tour
  const pillOpacity = interpolate(frame, [15, 30, 130, 145], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#090d16" }}>
      <HRDashboardLayout
        activeTab="Dashboard"
        cameraZoom={cameraZoom}
        cameraTranslateX={cameraTranslateX}
        cameraTranslateY={cameraTranslateY}
      />

      {/* Floating HUD tour badge */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "50px",
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          border: "1px solid rgba(99, 102, 241, 0.4)",
          backdropFilter: "blur(12px)",
          padding: "10px 20px",
          borderRadius: "999px",
          color: "#c7d2fe",
          fontSize: "1.05rem",
          fontWeight: 700,
          opacity: pillOpacity,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
        }}
      >
        <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#38bdf8" }} />
        Tur Fitur 01 · Dasbor Utama
      </div>
    </AbsoluteFill>
  );
};

