import { ACESFilmicToneMapping, SRGBColorSpace } from "three";

export const rendererConfig = {
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 1.0,
  physicallyCorrectLights: true,
  shadows: true,
  antialias: true,
  alpha: true,
} as const;

export const shadowConfig = {
  mapSize: 2048,
  bias: -0.0001,
  normalBias: 0.02,
  radius: 2,
} as const;
