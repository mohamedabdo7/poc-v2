import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SoftShadows, ContactShadows } from "@react-three/drei";
import { FirstPersonCamera } from "./FirstPersonCamera";
import { WorldLighting } from "./WorldLighting";
import { InteriorLighting } from "./InteriorLighting";
import { OfficeModelComponent } from "./OfficeModel";
import { Loader } from "./Loader";
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
        <Suspense fallback={<Loader />}>
          <FirstPersonCamera />

          <SoftShadows size={25} samples={10} focus={0.5} />

          <WorldLighting />
          <InteriorLighting />

          <OfficeModelComponent modelPath={modelPath} />

          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.3}
            scale={20}
            blur={2}
            far={4}
            resolution={256}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
