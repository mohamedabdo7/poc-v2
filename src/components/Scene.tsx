// /**
//  * المشهد الرئيسي - مع خيار نوع الكاميرا
//  *
//  * يدعم نوعين من التحكم:
//  * 1. OrbitControls (Mouse): سهل - دوران بالماوس
//  * 2. FirstPerson (WASD): متقدم - حركة FPS
//  */

// import { Canvas } from "@react-three/fiber";
// import React, { Suspense, Component, ErrorInfo, ReactNode } from "react";
// import { SoftShadows, ContactShadows, Html } from "@react-three/drei";
// import { CameraController } from "./CameraController";
// import { FirstPersonCamera } from "./FirstPersonCamera";
// import { WorldLighting } from "./WorldLighting";
// import { InteriorLighting } from "./InteriorLighting";
// import { OfficeModelComponent } from "./OfficeModel";
// import { rendererConfig } from "../config/renderer";

// interface SceneProps {
//   modelPath: string;
//   cameraMode?: "orbit" | "firstperson"; // نوع التحكم
// }

// // Loading component
// const LoadingScreen = () => (
//   <Html center>
//     <div
//       style={{
//         padding: "20px 40px",
//         background: "rgba(0,0,0,0.8)",
//         borderRadius: "10px",
//         color: "white",
//         fontFamily: "Arial, sans-serif",
//         textAlign: "center",
//       }}
//     >
//       <div style={{ fontSize: "24px", marginBottom: "10px" }}>⏳</div>
//       <div>جاري التحميل...</div>
//       <div style={{ fontSize: "12px", marginTop: "5px", opacity: 0.7 }}>
//         Loading 3D Model
//       </div>
//     </div>
//   </Html>
// );

// // Error Boundary Class Component
// interface ErrorBoundaryProps {
//   children: ReactNode;
//   fallback?: ReactNode;
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
//   error?: Error;
// }

// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     console.error("❌ Scene Error:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         this.props.fallback || (
//           <Html center>
//             <div
//               style={{
//                 padding: "30px",
//                 background: "rgba(220,53,69,0.9)",
//                 borderRadius: "10px",
//                 color: "white",
//                 fontFamily: "Arial, sans-serif",
//                 maxWidth: "400px",
//                 textAlign: "center",
//               }}
//             >
//               <div style={{ fontSize: "48px", marginBottom: "15px" }}>⚠️</div>
//               <h2 style={{ margin: "0 0 10px 0" }}>فشل تحميل الموديل</h2>
//               <p
//                 style={{ fontSize: "14px", opacity: 0.9, marginBottom: "15px" }}
//               >
//                 {this.state.error?.message || "حدث خطأ غير متوقع"}
//               </p>
//               <div
//                 style={{
//                   fontSize: "12px",
//                   background: "rgba(0,0,0,0.2)",
//                   padding: "10px",
//                   borderRadius: "5px",
//                   textAlign: "right",
//                   direction: "rtl",
//                 }}
//               >
//                 <strong>الحلول الممكنة:</strong>
//                 <ul style={{ margin: "10px 0", paddingRight: "20px" }}>
//                   <li>تأكد من وجود الملف في public/models/</li>
//                   <li>جرب استخدام رابط Google Drive مباشر</li>
//                   <li>افحص Console للمزيد من التفاصيل</li>
//                 </ul>
//               </div>
//               <button
//                 onClick={() => window.location.reload()}
//                 style={{
//                   marginTop: "15px",
//                   padding: "10px 20px",
//                   background: "white",
//                   color: "#dc3545",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                 }}
//               >
//                 🔄 إعادة المحاولة
//               </button>
//             </div>
//           </Html>
//         )
//       );
//     }

//     return this.props.children;
//   }
// }

// export const Scene: React.FC<SceneProps> = ({
//   modelPath,
//   cameraMode = "orbit", // orbit بشكل افتراضي
// }) => {
//   const [modelLoaded, setModelLoaded] = React.useState(false);

//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <Canvas
//         gl={{
//           antialias: rendererConfig.antialias,
//           alpha: rendererConfig.alpha,
//         }}
//         shadows
//         onCreated={({ gl }) => {
//           gl.outputColorSpace = rendererConfig.outputColorSpace;
//           gl.toneMapping = rendererConfig.toneMapping;
//           gl.toneMappingExposure = rendererConfig.toneMappingExposure;
//           gl.physicallyCorrectLights = rendererConfig.physicallyCorrectLights;
//           gl.shadowMap.enabled = rendererConfig.shadows;
//         }}
//       >
//         {/* اختيار نوع الكاميرا */}
//         {cameraMode === "orbit" ? (
//           <CameraController modelLoaded={modelLoaded} autoCenter={true} />
//         ) : (
//           <FirstPersonCamera />
//         )}

//         {/* ظلال ناعمة */}
//         <SoftShadows size={25} samples={10} focus={0.5} />

//         {/* الإضاءة الخارجية */}
//         <WorldLighting />

//         {/* الإضاءة الداخلية */}
//         <InteriorLighting />

//         {/*
//           Suspense + ErrorBoundary للموديل
//           - Suspense: يعرض loading screen أثناء التحميل
//           - ErrorBoundary: يمسك أي أخطاء ويعرض رسالة واضحة
//         */}
//         <ErrorBoundary>
//           <Suspense fallback={<LoadingScreen />}>
//             <OfficeModelComponent
//               modelPath={modelPath}
//               onLoaded={() => setModelLoaded(true)}
//             />
//           </Suspense>
//         </ErrorBoundary>

//         {/* ظلال التماس */}
//         <ContactShadows
//           position={[0, 0, 0]}
//           opacity={0.3}
//           scale={20}
//           blur={2}
//           far={4}
//           resolution={256}
//           color="#000000"
//         />
//       </Canvas>

//       {/* مؤشر نوع التحكم */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: "20px",
//           left: "20px",
//           padding: "10px 15px",
//           background: "rgba(0,0,0,0.7)",
//           color: "white",
//           borderRadius: "8px",
//           fontSize: "12px",
//           fontFamily: "monospace",
//         }}
//       >
//         {cameraMode === "orbit" ? (
//           <>
//             🖱️ Orbit Mode
//             <br />
//             • Drag: Rotate
//             <br />
//             • Scroll: Zoom
//             <br />• Right-click: Pan
//           </>
//         ) : (
//           <>
//             🎮 FPS Mode
//             <br />
//             • WASD: Move
//             <br />
//             • Mouse: Look
//             <br />
//             • Space/Shift: Up/Down
//             <br />• Click to lock cursor
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

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
