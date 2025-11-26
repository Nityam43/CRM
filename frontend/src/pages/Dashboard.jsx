import {
  ChartBarIcon,
  UsersIcon,
  ClipboardIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect even if logout API fails
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#1E2331] text-gray-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#151824] flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-10 text-center tracking-wider text-blue-400">
          MyCRM
        </h1>
        <nav className="flex-1 space-y-4">
          <a
            href="#"
            className="flex items-center px-3 py-2 rounded bg-[#232941] hover:bg-blue-950 transition"
          >
            <ChartBarIcon className="h-5 w-5 mr-3 text-blue-400" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 rounded hover:bg-[#232941] transition"
          >
            <UsersIcon className="h-5 w-5 mr-3 text-blue-400" />
            Users
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2 rounded hover:bg-[#232941] transition"
          >
            <ClipboardIcon className="h-5 w-5 mr-3 text-blue-400" />
            Tasks
          </a>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-2 rounded bg-red-600 hover:bg-red-700 transition text-white mt-4"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
        </div>
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#232941] rounded-xl p-6 flex items-center shadow">
            <ChartBarIcon className="h-10 w-10 text-blue-400 mr-4" />
            <div>
              <p className="text-lg font-semibold text-white">153</p>
              <p className="text-xs text-gray-400">Analytics</p>
            </div>
          </div>
          <div className="bg-[#232941] rounded-xl p-6 flex items-center shadow">
            <UsersIcon className="h-10 w-10 text-blue-400 mr-4" />
            <div>
              <p className="text-lg font-semibold text-white">36</p>
              <p className="text-xs text-gray-400">Users</p>
            </div>
          </div>
          <div className="bg-[#232941] rounded-xl p-6 flex items-center shadow">
            <ClipboardIcon className="h-10 w-10 text-blue-400 mr-4" />
            <div>
              <p className="text-lg font-semibold text-white">74</p>
              <p className="text-xs text-gray-400">Tasks</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
