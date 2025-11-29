import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Dashboard from "../pages/Dashboard";
import UsersList from "../pages/UsersList";
import Tasks from "../pages/Tasks";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import AddEnquiry from "../pages/Enquiry/AddEnquiry";
import EnquiryList from "../pages/Enquiry/EnquiryList";
import CancelList from "../pages/Enquiry/CancelList";
import DemoList from "../pages/Demo/DemoList";
import CancelDemoList from "../pages/Demo/CancelDemoList";
import EnrollList from "../pages/Enroll/EnrollList";
import CancelEnrollList from "../pages/Enroll/CancelEnrollList";
import FeesList from "../pages/Fees/FeesList";
import FeesPay from "../pages/Fees/FeesPay";
import EnquiryReminders from "../pages/Enquiry/EnquiryReminders";

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
        path="/demo/list"
        element={
          <ProtectedRoute>
            <Layout>
              <DemoList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/demo/cancel"
        element={
          <ProtectedRoute>
            <Layout>
              <CancelDemoList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/enroll/list"
        element={
          <ProtectedRoute>
            <Layout>
              <EnrollList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/enroll/cancel"
        element={
          <ProtectedRoute>
            <Layout>
              <CancelEnrollList />
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
      <Route
        path="/fees/list"
        element={
          <ProtectedRoute>
            <Layout>
              <FeesList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/fees/pay"
        element={
          <ProtectedRoute>
            <Layout>
              <FeesPay />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/enquiry/reminders"
        element={
          <ProtectedRoute>
            <Layout>
              <EnquiryReminders />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
};

export default Mainroutes;
