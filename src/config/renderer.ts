/**
 * إعدادات الـ Renderer الأساسية
 *
 * لماذا هذه الإعدادات؟
 * - sRGB: لضمان عرض الألوان بشكل صحيح على الشاشة
 * - ACESFilmic: أفضل tone mapping للمشاهد الداخلية الواقعية
 * - physicallyCorrectLights: لحساب الإضاءة بطريقة فيزيائية دقيقة
 */

import { ACESFilmicToneMapping, SRGBColorSpace } from "three";

export const rendererConfig = {
  // إدارة الألوان - sRGB هو المعيار للويب
  outputColorSpace: SRGBColorSpace,

  // Tone Mapping - ACES Filmic يعطي نتائج سينمائية واقعية
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 1.0, // التعرض الافتراضي (يمكن تعديله لاحقاً)

  // تفعيل الإضاءة الفيزيائية الصحيحة
  // هذا يجعل الإضاءة تتصرف كما في الواقع (inverse square law)
  physicallyCorrectLights: true,

  // تفعيل الظلال
  shadows: true,

  // Anti-aliasing للحصول على حواف ناعمة
  antialias: true,

  // Alpha channel شفاف للخلفية
  alpha: true,
} as const;

// إعدادات الظلال الافتراضية
export const shadowConfig = {
  // دقة عالية لخريطة الظل (2048x2048)
  // رقم أعلى = جودة أفضل لكن أداء أقل
  mapSize: 2048,

  // تقليل shadow acne (النقاط السوداء غير المرغوبة)
  bias: -0.0001,

  // تحسين جودة الظلال على الأسطح المائلة
  normalBias: 0.02,

  // نعومة حواف الظل (PCF soft shadows)
  radius: 2,
} as const;
