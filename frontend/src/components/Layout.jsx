import Sidebar from "./Sidebar";
import { useTheme } from "../ThemeContext";

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={
        "flex min-h-screen transition-colors duration-300 " +
        (isDark ? "bg-[#1E2331] text-gray-200" : "bg-gray-100 text-gray-900")
      }
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div className="flex justify-end px-6 py-3">
          <button
            onClick={toggleTheme}
            className={
              "px-3 py-1 rounded text-sm border " +
              (isDark
                ? "bg-[#232941] text-gray-200 border-gray-500"
                : "bg-white text-gray-800 border-gray-300 shadow-sm")
            }
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <main className="flex-1 px-6 py-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
