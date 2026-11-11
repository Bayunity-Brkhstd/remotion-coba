import { MOON_CONFIG, PLANETS_DATA, SUN_CONFIG } from "./constants";
import { PlanetConfig, Star } from "./types";
import { getOrbitRadius, getPlanetCoordinates } from "./utils";

export function renderSolarSystemScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  dayOffset: number,
  zoom: number,
  stars: Star[]
) {
  const centerX = width / 2;
  const centerY = height / 2;

  // 1. Clear & Background (#08090d)
  ctx.fillStyle = "#08090d";
  ctx.fillRect(0, 0, width, height);

  // 2. Draw 500 Deterministic Stars
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();
  }

  // 3. Draw Orbit Paths (rgba(255, 255, 255, 0.08))
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  for (const planet of PLANETS_DATA) {
    const orbitRadius = getOrbitRadius(planet.au, zoom);
    ctx.beginPath();
    ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 4. Draw Sun at Center
  drawSun(ctx, centerX, centerY, zoom);

  // 5. Draw Planets, Moons, Rings & Labels
  for (const planet of PLANETS_DATA) {
    const coords = getPlanetCoordinates(planet, dayOffset, zoom, centerX, centerY);
    drawPlanet(ctx, planet, coords.x, coords.y, zoom);

    // Saturn rings
    if (planet.hasRings) {
      drawSaturnRings(ctx, coords.x, coords.y, planet.radiusPx, zoom);
    }

    // Earth's moon
    if (planet.hasMoon) {
      drawMoon(ctx, coords.x, coords.y, dayOffset, zoom);
    }

    // Label
    drawPlanetLabel(ctx, planet.name, coords.x, coords.y, planet.radiusPx);
  }
}

function drawSun(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  zoom: number
) {
  const visualSunRadius = SUN_CONFIG.radiusPx * Math.min(1.3, Math.max(0.8, Math.sqrt(zoom)));
  const haloRadius = SUN_CONFIG.haloRadiusPx * Math.min(1.3, Math.max(0.8, Math.sqrt(zoom)));

  // Ambient outer glow halo
  const outerGlow = ctx.createRadialGradient(cx, cy, visualSunRadius, cx, cy, haloRadius);
  outerGlow.addColorStop(0, "rgba(251, 146, 60, 0.35)");
  outerGlow.addColorStop(0.4, "rgba(251, 146, 60, 0.12)");
  outerGlow.addColorStop(1, "rgba(251, 146, 60, 0)");

  ctx.beginPath();
  ctx.arc(cx, cy, haloRadius, 0, Math.PI * 2);
  ctx.fillStyle = outerGlow;
  ctx.fill();

  // Core radial gradient (bright white core -> golden yellow -> orange)
  const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, visualSunRadius);
  sunGrad.addColorStop(0, SUN_CONFIG.coreColor);
  sunGrad.addColorStop(0.35, SUN_CONFIG.innerColor);
  sunGrad.addColorStop(0.85, SUN_CONFIG.outerColor);
  sunGrad.addColorStop(1, "#ea580c");

  ctx.beginPath();
  ctx.arc(cx, cy, visualSunRadius, 0, Math.PI * 2);
  ctx.fillStyle = sunGrad;
  ctx.shadowColor = "rgba(253, 224, 71, 0.8)";
  ctx.shadowBlur = 24;
  ctx.fill();
  ctx.shadowBlur = 0; // reset
}

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  planet: PlanetConfig,
  x: number,
  y: number,
  zoom: number
) {
  const r = planet.radiusPx * Math.min(1.4, Math.max(0.85, Math.sqrt(zoom)));

  // 1. Planet Glow Halo
  const haloGrad = ctx.createRadialGradient(x, y, r * 0.5, x, y, planet.glowRadius * 1.4);
  haloGrad.addColorStop(0, planet.glowColor);
  haloGrad.addColorStop(1, "rgba(0,0,0,0)");

  ctx.beginPath();
  ctx.arc(x, y, planet.glowRadius * 1.4, 0, Math.PI * 2);
  ctx.fillStyle = haloGrad;
  ctx.fill();

  // 2. Planet Sphere with 3D Radial Gradient (highlight upper-left, shadow lower-right)
  const grad = ctx.createRadialGradient(
    x - r * 0.35,
    y - r * 0.35,
    r * 0.1,
    x,
    y,
    r
  );
  grad.addColorStop(0, planet.colorHighlight);
  grad.addColorStop(0.55, planet.colorCore);
  grad.addColorStop(1, planet.colorShadow);

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

function drawSaturnRings(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  zoom: number
) {
  const r = radius * Math.min(1.4, Math.max(0.85, Math.sqrt(zoom)));
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((-25 * Math.PI) / 180);

  // Outer ring
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 2.3, r * 0.72, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(253, 224, 71, 0.65)";
  ctx.lineWidth = 2.4;
  ctx.stroke();

  // Inner ring
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 1.7, r * 0.52, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(254, 240, 138, 0.4)";
  ctx.lineWidth = 1.6;
  ctx.stroke();

  ctx.restore();
}

function drawMoon(
  ctx: CanvasRenderingContext2D,
  earthX: number,
  earthY: number,
  dayOffset: number,
  zoom: number
) {
  // Moon orbit period: 27.32 days
  const moonAngleRad = ((dayOffset * (360 / MOON_CONFIG.periodDays)) * Math.PI) / 180;
  const distance = MOON_CONFIG.distancePx * Math.min(1.5, Math.max(0.9, zoom * 0.7));

  const moonX = earthX + distance * Math.cos(moonAngleRad);
  const moonY = earthY + distance * Math.sin(moonAngleRad);

  // Faint moon orbit track around Earth
  ctx.beginPath();
  ctx.arc(earthX, earthY, distance, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Moon dot
  ctx.beginPath();
  ctx.arc(moonX, moonY, MOON_CONFIG.radiusPx, 0, Math.PI * 2);
  ctx.fillStyle = MOON_CONFIG.color;
  ctx.shadowColor = MOON_CONFIG.glowColor;
  ctx.shadowBlur = 6;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function drawPlanetLabel(
  ctx: CanvasRenderingContext2D,
  name: string,
  x: number,
  y: number,
  radius: number
) {
  ctx.save();
  ctx.font = "600 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";

  // Subtle dark background for legibility
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 6;
  ctx.fillStyle = "rgba(241, 245, 249, 0.95)";
  ctx.fillText(name, x, y - radius - 7);
  ctx.restore();
}

