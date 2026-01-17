/**
 * أنواع نظام الإضاءة
 *
 * لماذا هذا الملف؟
 * - تحديد واضح لكل نوع إضاءة
 * - تسهيل التحكم المستقبلي
 * - Type safety للأسماء والمواصفات
 */

// أنواع اللمبات المتاحة
export enum LightType {
  RECT_AREA = "RectAreaLight",
  POINT = "PointLight",
  SPOT = "SpotLight",
  DIRECTIONAL = "DirectionalLight",
}

// معلومات لمبة داخلية
export interface InteriorLight {
  id: string; // معرّف فريد للتحكم لاحقاً
  type: LightType;
  position: [number, number, number];
  intensity: number;
  color: string;
  // خصائص RectAreaLight
  width?: number;
  height?: number;
  rotation?: [number, number, number];
  // خصائص PointLight/SpotLight
  distance?: number;
  decay?: number;
  castShadow?: boolean;
}

// مصادر الإضاءة الداخلية
export const INTERIOR_LIGHTS: InteriorLight[] = [
  // لمبات السقف الرئيسية
  {
    id: "ceiling-main",
    type: LightType.RECT_AREA,
    position: [0, 2.8, 0],
    width: 3,
    height: 1.5,
    rotation: [-Math.PI / 2, 0, 0], // موجهة للأسفل
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

  // لمبات المكاتب
  {
    id: "desk-lamp-1",
    type: LightType.POINT,
    position: [1.5, 1.2, 1],
    intensity: 3,
    color: "#fff4e6", // دافئ قليلاً
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

// إعدادات الإضاءة الخارجية
export interface WorldLightConfig {
  // الشمس (DirectionalLight)
  sun: {
    position: [number, number, number];
    intensity: number;
    color: string;
  };

  // النوافذ (Lightformers)
  windows: {
    id: string;
    position: [number, number, number];
    scale: [number, number, number];
    intensity: number;
    color: string;
    rotation?: [number, number, number];
  }[];
}

// إعدادات النهار الافتراضية
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
      color: "#d4e6f1", // أزرق سماء خفيف
      rotation: [0, 0, 0],
    },
    {
      id: "window-east",
      position: [5, 2, 0],
      scale: [1, 3, 3],
      intensity: 3,
      color: "#fef5e7", // أصفر شمس خفيف
      rotation: [0, -Math.PI / 2, 0],
    },
  ],
};

// إعدادات الليل (للاستخدام لاحقاً)
export const NIGHT_LIGHTING: WorldLightConfig = {
  sun: {
    position: [5, 8, 5],
    intensity: 0.1, // شبه معطّل
    color: "#1a1a2e",
  },
  windows: [
    {
      id: "window-north",
      position: [0, 2, -5],
      scale: [4, 3, 1],
      intensity: 0.2, // ضوء قمر خفيف جداً
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
