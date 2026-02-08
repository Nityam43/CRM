import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Dashboard from "../pages/Dashboard";
import UsersList from "../pages/UsersList";
import Tasks from "../pages/Tasks";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import AddEnquiry from "../pages/Enquiry/AddEnquiry";
import EditEnquiry from "../pages/Enquiry/EditEnquiry";
import EnquiryList from "../pages/Enquiry/EnquiryList";
import CancelList from "../pages/Enquiry/CancelList";
import DemoList from "../pages/Demo/DemoList";
import CancelDemoList from "../pages/Demo/CancelDemoList";
import EditDemo from "../pages/Demo/EditDemo";
import EnrollList from "../pages/Enroll/EnrollList";
import DNDList from "../pages/DNDList";
import CancelEnrollList from "../pages/Enroll/CancelEnrollList";
import EditEnroll from "../pages/Enroll/EditEnroll";
import FeesList from "../pages/Fees/FeesList";
import FeesPay from "../pages/Fees/FeesPay";
import FeesReceipt from "../pages/Fees/FeesReceipt";
import PaymentHistory from "../pages/Fees/PaymentHistory";
import EnquiryReminders from "../pages/Enquiry/EnquiryReminders";
import DemoReminder from "../pages/Demo/DemoReminder";
import AddEnrollment from "../pages/Enroll/AddEnrollment";
import AddWork from "../pages/Work/AddWork";

import WorkList from "../pages/Work/WorkList";
import FeesReminders from "../pages/Fees/FeesReminders";
import WorkReminders from "../pages/Work/WorkReminders";
import IncomeExpense from "../pages/IncomeExpense/IncomeExpense";

const Mainroutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
      <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />

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
        path="/enquiry/edit/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <EditEnquiry />
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
        path="/demo/edit/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <EditDemo />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/enroll/add"
        element={
          <ProtectedRoute>
            <Layout>
              <AddEnrollment />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/enroll/edit/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <EditEnroll />
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
        path="/fees/receipt/:enrollNo"
        element={
          <ProtectedRoute>
            <Layout>
              <FeesReceipt />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/fees/receipt/:enrollNo/:paymentId"
        element={
          <ProtectedRoute>
            <Layout>
              <FeesReceipt />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/fees/history/:enrollNo"
        element={
          <ProtectedRoute>
            <Layout>
              <PaymentHistory />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/work/add"
        element={
          <ProtectedRoute>
            <Layout>
              <AddWork />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/work/list"
        element={
          <ProtectedRoute>
            <Layout>
              <WorkList />
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
      <Route
        path="/demo/reminders"
        element={
          <ProtectedRoute>
            <Layout>
              <DemoReminder />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/fees/reminders"
        element={
          <ProtectedRoute>
            <Layout>
              <FeesReminders />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/work/reminders"
        element={
          <ProtectedRoute>
            <Layout>
              <WorkReminders />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/trash"
        element={
          <ProtectedRoute>
            <Layout>
              <DNDList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/income-expense"
        element={
          <ProtectedRoute>
            <Layout>
              <IncomeExpense />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Mainroutes;
