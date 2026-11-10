import React from "react";
import { Audio, staticFile } from "remotion";

export const AudioLayer: React.FC<{
  audioSrc?: string;
  volume?: number;
}> = ({ audioSrc, volume = 0.6 }) => {
  if (!audioSrc) return null;

  const resolvedSrc =
    audioSrc.startsWith("http://") || audioSrc.startsWith("https://")
      ? audioSrc
      : staticFile(audioSrc);

  return <Audio src={resolvedSrc} volume={volume} />;
};
