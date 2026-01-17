/**
 * محمّل GLB محسّن - نسخة مصلحة
 *
 * التغييرات:
 * - إزالة try/catch من useGLTF (كان بيسبب infinite loop)
 * - معالجة الأخطاء في useEffect بدلاً من render
 * - استخدام Suspense boundary للـ loading
 */

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import type { OfficeModel } from "../types";

interface OfficeModelProps {
  modelPath: string;
  onLoaded?: () => void;
}

export const OfficeModelComponent: React.FC<OfficeModelProps> = ({
  modelPath,
  onLoaded,
}) => {
  // تحميل الموديل - useGLTF يرمي Promise لو فشل التحميل
  // الـ Suspense boundary هيمسك الخطأ
  const { scene } = useGLTF(modelPath) as OfficeModel;

  useEffect(() => {
    if (!scene) return;

    console.log("⏳ Setting up model...");

    // المرور على كل objects
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        if (object.material instanceof MeshStandardMaterial) {
          object.material.envMapIntensity = 1.0;
          object.material.needsUpdate = true;
        }
      }
    });

    console.log("✅ Model loaded successfully");
    if (onLoaded) onLoaded();
  }, [scene, onLoaded]);

  return (
    <primitive
      object={scene}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={1}
    />
  );
};

/**
 * Preload مع console logging
 */
export const preloadOfficeModel = (modelPath: string) => {
  console.log("⏳ Preloading model:", modelPath);
  useGLTF.preload(modelPath);
  console.log("✅ Preload initiated");
};

// /**
//  * تحميل وعرض موديل المكتب
//  *
//  * لماذا هذا النهج؟
//  * - useGLTF: يحمل الموديل مع caching تلقائي
//  * - traverse: للوصول لكل mesh في الـ hierarchy
//  * - castShadow/receiveShadow: لتفعيل الظلال على كل الأجزاء
//  * - الحفاظ على الـ hierarchy الأصلي للموديل
//  */

// import { useGLTF } from "@react-three/drei";
// import { useEffect } from "react";
// import { Mesh, MeshStandardMaterial } from "three";
// import type { OfficeModel } from "../types";

// interface OfficeModelProps {
//   modelPath: string; // مسار ملف GLTF/GLB
//   onLoaded?: () => void; // callback لما الموديل يتحمل
// }

// export const OfficeModelComponent: React.FC<OfficeModelProps> = ({
//   modelPath,
//   onLoaded,
// }) => {
//   // تحميل الموديل - useGLTF يعمل caching تلقائياً
//   const { scene, nodes, materials } = useGLTF(modelPath) as OfficeModel;

//   useEffect(() => {
//     // المرور على كل الـ objects في الموديل
//     scene.traverse((object) => {
//       if (object instanceof Mesh) {
//         // تفعيل الظلال على كل mesh
//         object.castShadow = true; // الـ mesh يرسم ظل
//         object.receiveShadow = true; // الـ mesh يستقبل ظلال

//         // التأكد من أن المواد تستخدم PBR بشكل صحيح
//         if (object.material instanceof MeshStandardMaterial) {
//           // تفعيل خريطة البيئة للانعكاسات
//           object.material.envMapIntensity = 1.0;

//           // التأكد من أن المادة محدثة
//           object.material.needsUpdate = true;
//         }
//       }
//     });

//     // إخبار الـ parent component أن الموديل جاهز
//     if (onLoaded) {
//       onLoaded();
//     }
//   }, [scene, onLoaded]);

//   /**
//    * عرض الموديل كما هو مع الحفاظ على الـ hierarchy
//    * position, rotation, scale يمكن تعديلها حسب الحاجة
//    */
//   return (
//     <primitive
//       object={scene}
//       position={[0, 0, 0]} // الموضع الافتراضي
//       rotation={[0, 0, 0]} // بدون دوران
//       scale={1} // الحجم الأصلي
//     />
//   );
// };

// /**
//  * Preload function لتحميل الموديل مسبقاً
//  * استخدمها في بداية التطبيق لتحسين الأداء
//  */
// export const preloadOfficeModel = (modelPath: string) => {
//   useGLTF.preload(modelPath);
// };
