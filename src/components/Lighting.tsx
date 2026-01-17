/**
 * إعداد الإضاءة
 *
 * لماذا هذا النظام؟
 * - HDRI Environment: إضاءة واقعية 360° من صورة HDR
 * - Directional Light: محاكاة ضوء الشمس من النافذة
 * - Ambient Light: إضاءة محيطة ناعمة لملء الظلال
 */

import { Environment } from "@react-three/drei";
import { shadowConfig } from "../config/renderer";

export const Lighting: React.FC = () => {
  return (
    <>
      {/* 
        HDRI Environment Lighting
        - يوفر إضاءة واقعية وانعكاسات من صورة HDR
        - preset="studio" مناسب للمساحات الداخلية
        - يمكن استبداله بملف .hdr مخصص عبر files={['path/to/file.hdr']}
      */}
      <Environment
        preset="studio" // بيئة استوديو احترافية (يمكن تغييرها لـ warehouse, city, apartment)
        background={false} // عدم استخدام الـ HDRI كخلفية (فقط للإضاءة)
        blur={0} // عدم تشويش الانعكاسات للحصول على أقصى وضوح
      />

      {/* 
        Directional Light - محاكاة ضوء الشمس
        - يأتي من زاوية علوية لمحاكاة النافذة
        - intensity محسوبة فيزيائياً (مع physicallyCorrectLights)
      */}
      <directionalLight
        position={[5, 8, 5]} // من الأعلى والجانب (كأنها نافذة)
        intensity={2} // شدة معتدلة للضوء الداخلي
        castShadow // تفعيل الظلال
        shadow-mapSize-width={shadowConfig.mapSize}
        shadow-mapSize-height={shadowConfig.mapSize}
        shadow-bias={shadowConfig.bias}
        shadow-normalBias={shadowConfig.normalBias}
        shadow-radius={shadowConfig.radius}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />

      {/* 
        Ambient Light - إضاءة محيطة ناعمة
        - تملأ الظلال وتمنع السواد الكامل
        - intensity منخفضة لأن HDRI توفر معظم الإضاءة المحيطة
      */}
      <ambientLight intensity={0.3} />

      {/* 
        Hemisphere Light - إضاءة من السماء والأرض
        - skyColor: لون الضوء من الأعلى (سماء دافئة)
        - groundColor: لون الضوء من الأسفل (أرض محايدة)
        - يعطي إضاءة ناعمة وواقعية
      */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.4}
        position={[0, 10, 0]}
      />
    </>
  );
};
