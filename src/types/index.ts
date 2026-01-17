import { GLTF } from "three-stdlib";

export type OfficeModel = GLTF & {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: THREE.Material };
};

export interface CameraConfig {
  position: [number, number, number];
  fov: number;
  near: number;
  far: number;
}

export interface ShadowConfig {
  mapSize: number;
  bias: number;
  normalBias: number;
  radius: number;
}
