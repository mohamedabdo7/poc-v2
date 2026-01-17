export enum LightType {
  RECT_AREA = "RectAreaLight",
  POINT = "PointLight",
  SPOT = "SpotLight",
  DIRECTIONAL = "DirectionalLight",
}

export interface InteriorLight {
  id: string;
  type: LightType;
  position: [number, number, number];
  intensity: number;
  color: string;
  width?: number;
  height?: number;
  rotation?: [number, number, number];
  distance?: number;
  decay?: number;
  castShadow?: boolean;
}

export const INTERIOR_LIGHTS: InteriorLight[] = [
  {
    id: "ceiling-main",
    type: LightType.RECT_AREA,
    position: [0, 2.8, 0],
    width: 3,
    height: 1.5,
    rotation: [-Math.PI / 2, 0, 0],
    intensity: 8,
    color: "#ffffff",
  },
  {
    id: "ceiling-secondary",
    type: LightType.RECT_AREA,
    position: [-2, 2.8, -2],
    width: 2,
    height: 1,
    rotation: [-Math.PI / 2, 0, 0],
    intensity: 6,
    color: "#ffffff",
  },
  {
    id: "desk-lamp-1",
    type: LightType.POINT,
    position: [1.5, 1.2, 1],
    intensity: 3,
    color: "#fff4e6",
    distance: 3,
    decay: 2,
    castShadow: true,
  },
  {
    id: "desk-lamp-2",
    type: LightType.POINT,
    position: [-1.5, 1.2, -1],
    intensity: 3,
    color: "#fff4e6",
    distance: 3,
    decay: 2,
    castShadow: true,
  },
];

export interface WorldLightConfig {
  sun: {
    position: [number, number, number];
    intensity: number;
    color: string;
  };
  windows: {
    id: string;
    position: [number, number, number];
    scale: [number, number, number];
    intensity: number;
    color: string;
    rotation?: [number, number, number];
  }[];
}

export const DAY_LIGHTING: WorldLightConfig = {
  sun: {
    position: [5, 8, 5],
    intensity: 2,
    color: "#ffffff",
  },
  windows: [
    {
      id: "window-north",
      position: [0, 2, -5],
      scale: [4, 3, 1],
      intensity: 4,
      color: "#d4e6f1",
      rotation: [0, 0, 0],
    },
    {
      id: "window-east",
      position: [5, 2, 0],
      scale: [1, 3, 3],
      intensity: 3,
      color: "#fef5e7",
      rotation: [0, -Math.PI / 2, 0],
    },
  ],
};

export const NIGHT_LIGHTING: WorldLightConfig = {
  sun: {
    position: [5, 8, 5],
    intensity: 0.1,
    color: "#1a1a2e",
  },
  windows: [
    {
      id: "window-north",
      position: [0, 2, -5],
      scale: [4, 3, 1],
      intensity: 0.2,
      color: "#0f3460",
      rotation: [0, 0, 0],
    },
    {
      id: "window-east",
      position: [5, 2, 0],
      scale: [1, 3, 3],
      intensity: 0.1,
      color: "#0f3460",
      rotation: [0, -Math.PI / 2, 0],
    },
  ],
};
