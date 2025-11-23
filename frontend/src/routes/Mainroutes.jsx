import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
};

export default Mainroutes;
