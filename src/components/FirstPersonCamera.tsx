import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { Vector3 } from "three";

export const FirstPersonCamera: React.FC = () => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const moveSpeed = 0.1;
  const velocity = useRef(new Vector3());
  const direction = useRef(new Vector3());

  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });

  useEffect(() => {
    camera.position.set(0, 1.6, 5);

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          moveState.current.forward = true;
          break;
        case "KeyS":
          moveState.current.backward = true;
          break;
        case "KeyA":
          moveState.current.left = true;
          break;
        case "KeyD":
          moveState.current.right = true;
          break;
        case "Space":
          moveState.current.up = true;
          break;
        case "ShiftLeft":
          moveState.current.down = true;
          break;
        case "KeyP":
          console.log("📍 CAMERA POSITION:");
          console.log(
            `position: [${camera.position.x.toFixed(
              2
            )}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(
              2
            )}]`
          );
          console.log(
            `rotation: [${camera.rotation.x.toFixed(
              2
            )}, ${camera.rotation.y.toFixed(2)}, ${camera.rotation.z.toFixed(
              2
            )}]`
          );
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW":
          moveState.current.forward = false;
          break;
        case "KeyS":
          moveState.current.backward = false;
          break;
        case "KeyA":
          moveState.current.left = false;
          break;
        case "KeyD":
          moveState.current.right = false;
          break;
        case "Space":
          moveState.current.up = false;
          break;
        case "ShiftLeft":
          moveState.current.down = false;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [camera]);

  useFrame(() => {
    const { forward, backward, left, right, up, down } = moveState.current;

    direction.current.set(0, 0, 0);

    if (forward) direction.current.z -= 1;
    if (backward) direction.current.z += 1;
    if (left) direction.current.x -= 1;
    if (right) direction.current.x += 1;
    if (up) direction.current.y += 1;
    if (down) direction.current.y -= 1;

    direction.current.normalize();
    direction.current.multiplyScalar(moveSpeed);

    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    const right_vector = new Vector3();
    right_vector.crossVectors(camera.up, cameraDirection).normalize();

    velocity.current.set(0, 0, 0);

    velocity.current.addScaledVector(cameraDirection, -direction.current.z);
    velocity.current.addScaledVector(right_vector, -direction.current.x);
    velocity.current.y = direction.current.y;

    camera.position.add(velocity.current);
  });

  return <PointerLockControls ref={controlsRef} />;
};
