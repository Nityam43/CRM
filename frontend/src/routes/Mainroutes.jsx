import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
};

export default Mainroutes;
