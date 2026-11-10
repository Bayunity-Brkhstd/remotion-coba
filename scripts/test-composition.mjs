import { bundle } from "@remotion/bundler";
import { getCompositions } from "@remotion/renderer";
import path from "node:path";

async function main() {
  const targetId = process.argv[2];
  const entryPath = path.resolve(process.cwd(), "remotion/src/index.ts");

  console.log("[Validator] Memeriksa ketersediaan komposisi...");
  const bundleLocation = await bundle({ entryPoint: entryPath });
  const compositions = await getCompositions(bundleLocation);

  console.log(`[Validator] Ditemukan ${compositions.length} komposisi:`);
  compositions.forEach((c) => {
    console.log(
      ` - ID: "${c.id}" | ${c.width}x${c.height} | ${c.durationInFrames} frame @ ${c.fps}fps (${(c.durationInFrames / c.fps).toFixed(1)}s)`
    );
  });

  if (targetId) {
    const match = compositions.find((c) => c.id === targetId);
    if (!match) {
      console.error(`\n[Validator Error] Komposisi target "${targetId}" TIDAK ditemukan!`);
      process.exit(1);
    }
    console.log(`\n[Validator] Komposisi target "${targetId}" VALID dan siap dirender.`);
  }
}

main().catch((err) => {
  console.error("[Validator Error]:", err.message);
  process.exit(1);
});

