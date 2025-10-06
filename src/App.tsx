import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  const Profile = React.lazy(() => import("./src/Examples/Dashboard").then(module => ({ default: module.Profile })));
  const Settings = React.lazy(() => import("./src/Examples/Dashboard").then(module => ({ default: module.Settings })));
  
  return (
    <div>
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<div>Home
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
          </div>} />
        </Routes>
      </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
