/**
 * المشهد الرئيسي
 *
 * لماذا هذا الترتيب؟
 * - Canvas من R3F يوفر WebGL context
 * - الإعدادات في Canvas تطبق على الـ Renderer
 * - الترتيب: CameraController → Lighting → Model منطقي ومنظم
 */

/**
 * المشهد الرئيسي
 *
 * التحديثات:
 * - نظام إضاءة جديد (World + Interior منفصلين)
 * - SoftShadows للواقعية
 * - ContactShadows للتماس الواقعي
 */

import { Canvas } from "@react-three/fiber";
import { SoftShadows, ContactShadows } from "@react-three/drei";
import { FirstPersonCamera } from "./FirstPersonCamera";
import { WorldLighting } from "./WorldLighting";
import { InteriorLighting } from "./InteriorLighting";
import { OfficeModelComponent } from "./OfficeModel";
import { rendererConfig } from "../config/renderer";

interface SceneProps {
  modelPath: string;
}

export const Scene: React.FC<SceneProps> = ({ modelPath }) => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        gl={{
          antialias: rendererConfig.antialias,
          alpha: rendererConfig.alpha,
        }}
        shadows
        onCreated={({ gl }) => {
          gl.outputColorSpace = rendererConfig.outputColorSpace;
          gl.toneMapping = rendererConfig.toneMapping;
          gl.toneMappingExposure = rendererConfig.toneMappingExposure;
          gl.physicallyCorrectLights = rendererConfig.physicallyCorrectLights;
          gl.shadowMap.enabled = rendererConfig.shadows;
        }}
      >
        {/* الكاميرا */}
        <FirstPersonCamera />

        {/* 
          SoftShadows - ظلال ناعمة واقعية
          - size: حجم عينة الظل
          - samples: عدد العينات (أكثر = أنعم)
          - focus: التركيز
        */}
        <SoftShadows size={25} samples={10} focus={0.5} />

        {/* 
          الإضاءة الخارجية
          - الشمس والسماء
          - Lightformers للنوافذ
        */}
        <WorldLighting />

        {/* 
          الإضاءة الداخلية
          - لمبات السقف (RectAreaLight)
          - لمبات المكاتب (PointLight)
        */}
        <InteriorLighting />

        {/* موديل المكتب */}
        <OfficeModelComponent modelPath={modelPath} />

        {/* 
          ContactShadows - ظلال تماس واقعية
          - على الأرض تحت الأثاث
          - يحل مشكلة "الأجسام طايرة"
        */}
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.3}
          scale={20}
          blur={2}
          far={4}
          resolution={256}
          color="#000000"
        />
      </Canvas>
    </div>
  );
};
