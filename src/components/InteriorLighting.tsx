/**
 * الإضاءة الداخلية (لمبات المكتب)
 *
 * لماذا component منفصل؟
 * - تمثل اللمبات الحقيقية داخل المكتب
 * - كل لمبة لها ID/name للتحكم الفردي
 * - تشغيلها/إطفاؤها يؤثر بوضوح على الغرفة
 * - المصدر الأساسي للإضاءة في الليل
 */

import { INTERIOR_LIGHTS, LightType } from "../types/LightingTypes";

interface InteriorLightingProps {
  // في المستقبل: يمكن إضافة enabledLights: string[] للتحكم
}

export const InteriorLighting: React.FC<InteriorLightingProps> = () => {
  return (
    <>
      {INTERIOR_LIGHTS.map((light) => {
        // لمبات السقف - rectAreaLight
        // Note: R3F يوفر rectAreaLight مباشرة بدون import
        if (light.type === LightType.RECT_AREA) {
          return (
            <rectAreaLight
              key={light.id}
              name={light.id} // مهم للتحكم لاحقاً
              position={light.position}
              width={light.width!}
              height={light.height!}
              intensity={light.intensity}
              color={light.color}
              rotation={light.rotation}
            />
          );
        }

        // لمبات المكاتب - PointLight
        if (light.type === LightType.POINT) {
          return (
            <pointLight
              key={light.id}
              name={light.id} // مهم للتحكم لاحقاً
              position={light.position}
              intensity={light.intensity}
              color={light.color}
              distance={light.distance}
              decay={light.decay}
              castShadow={light.castShadow}
            />
          );
        }

        // SpotLight (لو احتجناه لاحقاً)
        if (light.type === LightType.SPOT) {
          return (
            <spotLight
              key={light.id}
              name={light.id}
              position={light.position}
              intensity={light.intensity}
              color={light.color}
              distance={light.distance}
              decay={light.decay}
              castShadow={light.castShadow}
            />
          );
        }

        return null;
      })}

      {/* 
        Note: في المستقبل يمكن إضافة:
        - Helper visuals لكل لمبة (في dev mode)
        - تحكم في تشغيل/إطفاء كل لمبة
        - تغيير الـ intensity ديناميكياً
        - تغيير اللون
      */}
    </>
  );
};
