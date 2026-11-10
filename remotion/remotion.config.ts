import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setPixelFormat("yuv420p");

const isLinux = process.platform === "linux";

Config.setChromiumFlags([
  ...(isLinux ? ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"] : []),
  "--disable-gpu",
]);

