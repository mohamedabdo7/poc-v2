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
  const { scene } = useGLTF(modelPath) as OfficeModel;

  useEffect(() => {
    if (!scene) return;

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

    if (onLoaded) {
      onLoaded();
    }
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

export const preloadOfficeModel = (modelPath: string) => {
  useGLTF.preload(modelPath);
};
