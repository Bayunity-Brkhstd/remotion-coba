import { PlanetConfig, Star } from "./types";

/**
 * Calculates visual orbit radius based on the specified piecewise scaling formula:
 * au <= 1.6: (40 + au * 70) * zoom
 * au > 1.6:  (40 + 1.6 * 70 + log2(au / 1.6) * 58) * zoom
 */
export function getOrbitRadius(au: number, zoom: number = 1): number {
  if (au <= 1.6) {
    return (40 + au * 70) * zoom;
  }
  return (40 + 1.6 * 70 + Math.log2(au / 1.6) * 58) * zoom;
}

/**
 * Generates 500 deterministic stars using seeded trigonometry functions.
 */
export function generateDeterministicStars(
  count: number = 500,
  width: number = 1920,
  height: number = 1080
): Star[] {
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    // Seeded pseudo-random coordinates
    const seedX = Math.abs(Math.sin(i * 127.1 + 42.17) * 43758.5453);
    const seedY = Math.abs(Math.sin(i * 269.5 + 183.3) * 43758.5453);
    const seedR = Math.abs(Math.sin(i * 419.2 + 71.9));
    const seedB = Math.abs(Math.sin(i * 311.7 + 99.1));

    const x = (seedX % 1) * width;
    const y = (seedY % 1) * height;
    const radius = 0.5 + (seedR % 1) * 1.5; // 0.5px to 2.0px
    const opacity = 0.25 + (seedB % 1) * 0.75; // 0.25 to 1.0

    stars.push({
      x,
      y,
      radius,
      opacity,
      twinklePhase: i * 0.05,
    });
  }

  return stars;
}

/**
 * Computes planet position given day offset from J2000 epoch simulation.
 */
export function getPlanetCoordinates(
  planet: PlanetConfig,
  dayOffset: number,
  zoom: number,
  centerX: number,
  centerY: number
): { x: number; y: number; radius: number; angleRad: number } {
  const orbitRadius = getOrbitRadius(planet.au, zoom);

  // Mean motion (degrees per day) = 360 / periodDays
  const degreesMoved = (360 / planet.periodDays) * dayOffset;
  const currentAngleDeg = (planet.initialAngleDeg + degreesMoved) % 360;
  const angleRad = (currentAngleDeg * Math.PI) / 180;

  const x = centerX + orbitRadius * Math.cos(angleRad);
  const y = centerY + orbitRadius * Math.sin(angleRad);

  return { x, y, radius: orbitRadius, angleRad };
}

/**
 * Formats a Date object into human-readable string: e.g. "March 15, 2025"
 */
export function formatSimulatedDate(startDateIso: string, dayOffset: number): string {
  const date = new Date(startDateIso);
  date.setDate(date.getDate() + Math.floor(dayOffset));

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${monthName} ${day}, ${year}`;
}

