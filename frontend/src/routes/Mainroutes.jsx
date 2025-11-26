import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Dashboard from "../pages/Dashboard";
import AddEnquiry from "../pages/AddEnquiry";
import EnquiryList from "../pages/EnquiryList";
import CancelList from "../pages/CancelList";
import UsersList from "../pages/UsersList";
import Tasks from "../pages/Tasks";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes with Layout/Sidebar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/enquiry/add"
        element={
          <ProtectedRoute>
            <Layout>
              <AddEnquiry />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/enquiry/list"
        element={
          <ProtectedRoute>
            <Layout>
              <EnquiryList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/enquiry/cancel"
        element={
          <ProtectedRoute>
            <Layout>
              <CancelList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Layout>
              <UsersList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Layout>
              <Tasks />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
};

export default Mainroutes;
