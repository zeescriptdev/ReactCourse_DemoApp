import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  const Dashboard = lazy(() => import("./src/Examples/Dashboard").then(module => ({ default: module.Dashboard })));
  
  return (
    <BrowserRouter>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Dashboard />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
