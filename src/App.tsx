import { Scene } from "./components/Scene";
import { preloadOfficeModel } from "./components/OfficeModel";

const MODEL_PATH = "/models/KAFD-Room3.glb";

preloadOfficeModel(MODEL_PATH);

function App() {
  return <Scene modelPath={MODEL_PATH} />;
}

export default App;
