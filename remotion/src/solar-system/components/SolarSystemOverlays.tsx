import React from "react";
import { formatSimulatedDate } from "../utils";

interface SolarSystemOverlaysProps {
  startDateIso: string;
  dayOffset: number;
  title: string;
  subtitle: string;
}

export const SolarSystemOverlays: React.FC<SolarSystemOverlaysProps> = ({
  startDateIso,
  dayOffset,
  title,
  subtitle,
}) => {
  const currentDateString = formatSimulatedDate(startDateIso, dayOffset);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "48px 40px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Top Center: Always visible Title & Subtitle (No fade-in, no fade-out) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "8px",
        }}
      >
        <h1
          style={{
            fontSize: "2.6rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f8fafc",
            margin: 0,
            textShadow:
              "0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(251, 191, 36, 0.2)",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 500,
            color: "#94a3b8",
            margin: 0,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Bottom Center: Frosted-glass Pill with Golden Yellow Date */}
      <div
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(253, 224, 71, 0.25)",
          borderRadius: "9999px",
          padding: "14px 36px",
          boxShadow:
            "0 15px 35px -5px rgba(0, 0, 0, 0.6), 0 0 25px rgba(250, 204, 21, 0.15)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Pulsing golden status dot */}
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#facc15",
            boxShadow: "0 0 12px #facc15",
          }}
        />
        <span
          style={{
            color: "#fde047",
            fontSize: "1.45rem",
            fontWeight: 700,
            letterSpacing: "0.02em",
            fontVariantNumeric: "tabular-nums",
            textShadow: "0 0 15px rgba(253, 224, 71, 0.4)",
          }}
        >
          {currentDateString}
        </span>
      </div>
    </div>
  );
};

