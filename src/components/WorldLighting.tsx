/**
 * الإضاءة الخارجية (الشمس والسماء)
 *
 * لماذا component منفصل؟
 * - تمثل مصادر الضوء خارج المكتب
 * - تتأثر بالوقت (نهار/ليل)
 * - تتأثر بالستارة (كمية الضوء الداخل)
 * - يمكن تعطيلها بالكامل في سيناريو الليل
 */

import { Environment, Lightformer } from "@react-three/drei";
import { DAY_LIGHTING, type WorldLightConfig } from "../types/LightingTypes";
import { shadowConfig } from "../config/renderer";

interface WorldLightingProps {
  config?: WorldLightConfig; // للتغيير لاحقاً (نهار/ليل)
}

export const WorldLighting: React.FC<WorldLightingProps> = ({
  config = DAY_LIGHTING,
}) => {
  const { sun, windows } = config;

  return (
    <>
      {/* 
        الشمس - DirectionalLight
        - مصدر الضوء الخارجي الرئيسي
        - intensity قابل للتغيير (نهار: 2, ليل: 0.1)
        - يتأثر بالستارة في المستقبل
      */}
      <directionalLight
        position={sun.position}
        intensity={sun.intensity}
        color={sun.color}
        castShadow
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
        السماء والنوافذ - Environment + Lightformers
        - HDRI للسماء (انعكاسات واقعية)
        - Lightformers تحاكي النوافذ
        - كل نافذة لها intensity ولون خاص
      */}
      <Environment
        preset="studio" // بيئة استوديو (يمكن تغييرها)
        background={false} // لا نستخدمها كخلفية
        blur={0}
      >
        {/* النوافذ - مصادر ضوء داخل الـ Environment */}
        {windows.map((window) => (
          <Lightformer
            key={window.id}
            position={window.position}
            scale={window.scale}
            intensity={window.intensity}
            color={window.color}
            rotation={window.rotation}
            form="rect" // شكل مستطيل (نافذة)
          />
        ))}
      </Environment>

      {/* 
        إضاءة محيطة ناعمة
        - تملأ الظلال الداكنة
        - intensity منخفضة لأن HDRI توفر معظم الإضاءة المحيطة
        - في الليل ممكن تزيد شويه
      */}
      <ambientLight intensity={0.2} />

      {/* 
        Hemisphere Light - من السماء والأرض
        - يعطي إضاءة ناعمة وطبيعية
        - skyColor: لون من الأعلى
        - groundColor: لون من الأسفل
      */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.3}
        position={[0, 10, 0]}
      />
    </>
  );
};
