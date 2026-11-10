import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";

async function main() {
  const args = process.argv.slice(2);
  const compositionId = args[0] || "MainVideo";
  const outputRelativePath = args[1] || "out/video.mp4";

  let inputProps = {};
  const propsFileIndex = args.indexOf("--props-file");

  if (propsFileIndex !== -1 && args[propsFileIndex + 1]) {
    const filePath = path.resolve(process.cwd(), args[propsFileIndex + 1]);
    if (fs.existsSync(filePath)) {
      inputProps = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      console.log(`[Remotion Engine] Membaca props dari file: ${filePath}`);
    } else {
      console.warn(`[Remotion Engine] File props '${filePath}' tidak ditemukan, menggunakan props default.`);
    }
  } else if (args[2] && !args[2].startsWith("--")) {
    const candidatePath = path.resolve(process.cwd(), args[2]);
    if (fs.existsSync(candidatePath) && candidatePath.endsWith(".json")) {
      inputProps = JSON.parse(fs.readFileSync(candidatePath, "utf-8"));
      console.log(`[Remotion Engine] Membaca props dari file: ${candidatePath}`);
    } else {
      try {
        inputProps = JSON.parse(args[2]);
      } catch (e) {
        console.error("[Remotion Error] Gagal mem-parse JSON props:", e.message);
        process.exit(1);
      }
    }
  }

  const entryPath = path.resolve(process.cwd(), "remotion/src/index.ts");
  const outputLocation = path.resolve(process.cwd(), outputRelativePath);

  const outputDir = path.dirname(outputLocation);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`[Remotion Engine] Mem-bundle kode dari: ${entryPath}`);
  const bundleLocation = await bundle({
    entryPoint: entryPath,
    onProgress: (progress) => {
      if (progress % 25 === 0) {
        console.log(`[Bundler] Progress: ${progress}%`);
      }
    },
  });

  console.log(`[Remotion Engine] Memeriksa komposisi: "${compositionId}"`);
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
    inputProps,
  });

  if (!composition) {
    throw new Error(`Komposisi '${compositionId}' tidak ditemukan di Root.tsx`);
  }

  console.log(
    `[Remotion Engine] Render ${composition.durationInFrames} frame (${(
      composition.durationInFrames / composition.fps
    ).toFixed(1)}s) @ ${composition.fps} FPS [${composition.width}x${composition.height}]...`
  );

  let lastReported = -1;
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    inputProps,
    onProgress: ({ progress }) => {
      const percent = Math.round(progress * 100);
      if (percent % 20 === 0 && percent !== lastReported) {
        lastReported = percent;
        console.log(`[Renderer] Selesai: ${percent}%`);
      }
    },
  });

  console.log(`[Remotion Engine] Selesai! File video tersimpan di: ${outputLocation}`);
}

main().catch((err) => {
  console.error("[Remotion Fatal Error]:", err.message);
  process.exit(1);
});

