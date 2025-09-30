import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Analytics, Dashboard, Profile, Settings } from "./src/Examples/Dashboard";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = false;
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<h2>Login Page</h2>} />
        <Route
          path="/dashboard"
          element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile/>} />
          <Route path="settings" element={<Settings/>} />
          <Route path="analytics" element={<Analytics/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
