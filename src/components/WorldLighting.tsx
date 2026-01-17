import { Environment, Lightformer } from "@react-three/drei";
import { DAY_LIGHTING, type WorldLightConfig } from "../types/LightingTypes";
import { shadowConfig } from "../config/renderer";

interface WorldLightingProps {
  config?: WorldLightConfig;
}

export const WorldLighting: React.FC<WorldLightingProps> = ({
  config = DAY_LIGHTING,
}) => {
  const { sun, windows } = config;

  return (
    <>
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

      <Environment preset="studio" background={false} blur={0}>
        {windows.map((window) => (
          <Lightformer
            key={window.id}
            position={window.position}
            scale={window.scale}
            intensity={window.intensity}
            color={window.color}
            rotation={window.rotation}
            form="rect"
          />
        ))}
      </Environment>

      <ambientLight intensity={0.2} />

      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.3}
        position={[0, 10, 0]}
      />
    </>
  );
};
