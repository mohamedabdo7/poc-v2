import { INTERIOR_LIGHTS, LightType } from "../types/LightingTypes";

export const InteriorLighting: React.FC = () => {
  return (
    <>
      {INTERIOR_LIGHTS.map((light) => {
        if (light.type === LightType.RECT_AREA) {
          return (
            <rectAreaLight
              key={light.id}
              name={light.id}
              position={light.position}
              width={light.width!}
              height={light.height!}
              intensity={light.intensity}
              color={light.color}
              rotation={light.rotation}
            />
          );
        }

        if (light.type === LightType.POINT) {
          return (
            <pointLight
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
    </>
  );
};
