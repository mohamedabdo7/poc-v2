import { Suspense } from "react";
import { Scene } from "./components/Scene";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Scene modelPath="/models/KAFD-Room3-compressed.glb" />
      </Suspense>
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
// const OFFICE_MODEL_PATH = "/models/KAFD-Room2.glb";

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
