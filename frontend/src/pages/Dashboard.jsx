import {
  ChartBarIcon,
  UsersIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../ThemeContext";

const Dashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div>
      {/* Page title */}
      <h2
        className={
          isDark
            ? "text-2xl font-bold text-white mb-4"
            : "text-2xl font-bold text-gray-900 mb-4"
        }
      >
        Admin Dashboard
      </h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Analytics */}
        <div
          className={
            "rounded-xl px-6 py-4 flex items-center shadow " +
            (isDark ? "bg-[#232941]" : "bg-white")
          }
        >
          <ChartBarIcon
            className={
              "h-10 w-10 mr-4 " + (isDark ? "text-blue-400" : "text-blue-600")
            }
          />
          <div>
            <p
              className={
                isDark
                  ? "text-lg font-semibold text-white"
                  : "text-lg font-semibold text-gray-900"
              }
            >
              153
            </p>
            <p
              className={
                isDark ? "text-xs text-gray-400" : "text-xs text-gray-500"
              }
            >
              Analytics
            </p>
          </div>
        </div>

        {/* Users */}
        <div
          className={
            "rounded-xl px-6 py-4 flex items-center shadow " +
            (isDark ? "bg-[#232941]" : "bg-white")
          }
        >
          <UsersIcon
            className={
              "h-10 w-10 mr-4 " + (isDark ? "text-blue-400" : "text-blue-600")
            }
          />
          <div>
            <p
              className={
                isDark
                  ? "text-lg font-semibold text-white"
                  : "text-lg font-semibold text-gray-900"
              }
            >
              36
            </p>
            <p
              className={
                isDark ? "text-xs text-gray-400" : "text-xs text-gray-500"
              }
            >
              Users
            </p>
          </div>
        </div>

        {/* Tasks */}
        <div
          className={
            "rounded-xl px-6 py-4 flex items-center shadow " +
            (isDark ? "bg-[#232941]" : "bg-white")
          }
        >
          <ClipboardIcon
            className={
              "h-10 w-10 mr-4 " + (isDark ? "text-blue-400" : "text-blue-600")
            }
          />
          <div>
            <p
              className={
                isDark
                  ? "text-lg font-semibold text-white"
                  : "text-lg font-semibold text-gray-900"
              }
            >
              74
            </p>
            <p
              className={
                isDark ? "text-xs text-gray-400" : "text-xs text-gray-500"
              }
            >
              Tasks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
