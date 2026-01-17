/**
 * TypeScript type definitions for Office 3D project
 */

import { GLTF } from "three-stdlib";

// نوع موديل المكتب المحمل من GLTF
export type OfficeModel = GLTF & {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: THREE.Material };
};

// إعدادات الكاميرا
export interface CameraConfig {
  position: [number, number, number]; // موضع الكاميرا في المشهد
  fov: number; // زاوية الرؤية (مناسبة للمساحات الداخلية)
  near: number; // المسافة القريبة للـ clipping plane
  far: number; // المسافة البعيدة للـ clipping plane
}

// إعدادات الظلال
export interface ShadowConfig {
  mapSize: number; // دقة خريطة الظل (كلما زادت، زادت الجودة)
  bias: number; // لتجنب shadow acne
  normalBias: number; // لتحسين جودة الظلال
  radius: number; // نعومة حواف الظل
}
