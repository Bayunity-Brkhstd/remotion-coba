export interface PlanetConfig {
  name: string;
  au: number;
  periodDays: number;
  radiusPx: number; // visual planet size
  colorCore: string;
  colorHighlight: string;
  colorShadow: string;
  glowColor: string;
  glowRadius: number;
  initialAngleDeg: number;
  hasMoon?: boolean;
  hasRings?: boolean;
}

export interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinklePhase: number;
}

export interface SolarSystemProps {
  zoom?: number;
  totalDays?: number;
  startDateIso?: string;
  title?: string;
  subtitle?: string;
  showAllOrbits?: boolean;
  [key: string]: unknown;
}

