/**
 * التطبيق الرئيسي - نسخة محدثة
 *
 * مع إمكانية اختيار نوع الكاميرا
 */

import { Scene } from "./components/Scene";
import { preloadOfficeModel } from "./components/OfficeModel";

// ✅ خيارات المسار
const LOCAL_MODEL = "/models/KAFD-Room3-compressed.glb";
const EXTERNAL_MODEL = "https://your-google-drive-link.com/model.glb"; // استبدل بالرابط الحقيقي

// اختر المسار المناسب
const OFFICE_MODEL_PATH = LOCAL_MODEL;

// ✅ خيارات الكاميرا:
// - "orbit": تحكم بالماوس (سهل - مناسب للعروض)
// - "firstperson": تحكم WASD (متقدم - مناسب للـ walkthrough)
const CAMERA_MODE: "orbit" | "firstperson" = "orbit";

// تحميل مسبق للموديل
preloadOfficeModel(OFFICE_MODEL_PATH);

function App() {
  return (
    <div className="App">
      <Scene modelPath={OFFICE_MODEL_PATH} cameraMode={CAMERA_MODE} />
    </div>
  );
}

export default App;

// /**
//  * التطبيق الرئيسي
//  *
//  * نقطة الدخول للمشروع - ببساطة يعرض المشهد
//  */

// import { Scene } from "./components/Scene";
// import { preloadOfficeModel } from "./components/OfficeModel";

// // مسار موديل المكتب
// // ضع ملف GLTF/GLB في مجلد public/models/
// const OFFICE_MODEL_PATH = "/models/KAFD-Room3-compressed.glb";

// // تحميل الموديل مسبقاً لتحسين الأداء
// preloadOfficeModel(OFFICE_MODEL_PATH);

// function App() {
//   return (
//     <div className="App">
//       <Scene modelPath={OFFICE_MODEL_PATH} />
//     </div>
//   );
// }

// export default App;
