/**
 * التحكم في الكاميرا بذكاء
 *
 * لماذا هذا Component؟
 * - يحسب مركز الموديل تلقائياً (Bounding Box Center)
 * - يضع الكاميرا على بعد مناسب حسب حجم الموديل
 * - يضيف OrbitControls للتحكم اليدوي
 */

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import * as THREE from "three";

interface CameraControllerProps {
  modelLoaded?: boolean; // هل الموديل اتحمل؟
  autoCenter?: boolean; // هل نحسب المركز تلقائياً؟
}

export const CameraController: React.FC<CameraControllerProps> = ({
  modelLoaded = false,
  autoCenter = true,
}) => {
  const { scene, camera } = useThree();
  const controlsRef = useRef<any>(null);
  const hasCalculated = useRef(false);

  useEffect(() => {
    // لما الموديل يتحمل، نحسب المركز والحجم
    if (modelLoaded && autoCenter && !hasCalculated.current) {
      calculateOptimalCameraPosition();
      hasCalculated.current = true;
    }
  }, [modelLoaded, autoCenter, scene]);

  /**
   * حساب أفضل موضع للكاميرا بناءً على حجم الموديل
   */
  const calculateOptimalCameraPosition = () => {
    // 1. حساب Bounding Box للمشهد كله
    const box = new Box3();
    const center = new Vector3();
    const size = new Vector3();

    // نمر على كل الـ meshes ونحسب الـ bounding box
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        // تحديث الـ world matrix
        object.updateMatrixWorld(true);

        // حساب bounding box للـ mesh
        const meshBox = new Box3().setFromObject(object);
        box.union(meshBox);
      }
    });

    // 2. حساب المركز والحجم
    box.getCenter(center);
    box.getSize(size);

    // 3. حساب أقصى بُعد (للتأكد أن الموديل كله يظهر)
    const maxDim = Math.max(size.x, size.y, size.z);

    // 4. حساب المسافة المناسبة بناءً على FOV
    const fov = (camera as THREE.PerspectiveCamera).fov;
    const fovRad = (fov * Math.PI) / 180;

    // المسافة = (أقصى بُعد / 2) / tan(FOV/2)
    // مضروب في 1.5 لإعطاء مساحة مريحة
    const distance = (maxDim / 2 / Math.tan(fovRad / 2)) * 1.5;

    // 5. وضع الكاميرا
    // نضعها في زاوية جميلة (45° من الجانب والأعلى)
    const cameraX = center.x + distance * 0.7; // 0.7 ≈ cos(45°)
    const cameraY = center.y + distance * 0.5; // على ارتفاع مناسب
    const cameraZ = center.z + distance * 0.7;

    camera.position.set(cameraX, cameraY, cameraZ);

    // 6. توجيه الكاميرا للمركز
    camera.lookAt(center);

    // 7. تحديث OrbitControls target للمركز
    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }

    console.log("📐 Camera Auto-Positioned:");
    console.log(
      `  - Model Center: (${center.x.toFixed(2)}, ${center.y.toFixed(
        2
      )}, ${center.z.toFixed(2)})`
    );
    console.log(
      `  - Model Size: (${size.x.toFixed(2)}, ${size.y.toFixed(
        2
      )}, ${size.z.toFixed(2)})`
    );
    console.log(`  - Camera Distance: ${distance.toFixed(2)}`);
  };

  return (
    <>
      {/* 
        الكاميرا الرئيسية
        - FOV 50° مناسب للمساحات الداخلية
        - makeDefault لجعلها الكاميرا الافتراضية
      */}
      <PerspectiveCamera
        makeDefault
        position={[0, 1.6, 5]} // موضع افتراضي (سيتم تحديثه تلقائياً)
        fov={50}
        near={0.1}
        far={1000}
      />

      {/* 
        OrbitControls - للتحكم في الكاميرا
        - target: النقطة اللي الكاميرا بتبص عليها
        - enableDamping: حركة ناعمة
        - dampingFactor: درجة النعومة
        - minDistance/maxDistance: حدود الـ zoom
      */}
      <OrbitControls
        ref={controlsRef}
        enableDamping // حركة ناعمة وواقعية
        dampingFactor={0.05} // درجة نعومة الحركة
        minDistance={0.5} // أقرب zoom
        maxDistance={100} // أبعد zoom
        maxPolarAngle={Math.PI * 0.9} // منع الدوران تحت الأرض
        minPolarAngle={0} // السماح بالرؤية من الأعلى
        enablePan={true} // السماح بالتحريك (Pan)
        panSpeed={0.5} // سرعة التحريك
        rotateSpeed={0.5} // سرعة الدوران
        zoomSpeed={0.8} // سرعة الـ zoom
      />
    </>
  );
};
