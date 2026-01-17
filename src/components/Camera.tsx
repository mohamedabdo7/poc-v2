/**
 * إعداد الكاميرا
 *
 * لماذا هذه الإعدادات؟
 * - الارتفاع 1.6m يحاكي مستوى عين الإنسان
 * - FOV 50° مناسب للمساحات الداخلية (أقل تشويه من 75°)
 * - Near/Far planes محسّنة للمساحات الداخلية
 */

import { PerspectiveCamera } from "@react-three/drei";
import { CameraConfig } from "../types";

// إعدادات الكاميرا الافتراضية
const cameraConfig: CameraConfig = {
  // الموضع: [x, y, z]
  // y = 1.6 (ارتفاع عين إنسان)
  // z = 5 (بعيد قليلاً عن مركز الغرفة للحصول على رؤية جيدة)
  position: [0, 1.6, 5],

  // FOV 50° - زاوية رؤية طبيعية للمساحات الداخلية
  // أقل من 50° = ضيقة جداً، أكثر من 60° = تشويه ملحوظ
  fov: 50,

  // Near clipping: قريب بما يكفي لرؤية الأشياء القريبة
  near: 0.1,

  // Far clipping: بعيد بما يكفي لرؤية الغرفة كاملة
  far: 100,
};

export const Camera: React.FC = () => {
  return (
    <PerspectiveCamera
      makeDefault // جعل هذه الكاميرا هي الافتراضية
      position={cameraConfig.position}
      fov={cameraConfig.fov}
      near={cameraConfig.near}
      far={cameraConfig.far}
    />
  );
};
