import { Html, useProgress } from "@react-three/drei";

export const Loader: React.FC = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "200px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #4CAF50, #8BC34A)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div
          style={{
            color: "white",
            fontSize: "14px",
            fontFamily: "monospace",
          }}
        >
          Loading {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
};
