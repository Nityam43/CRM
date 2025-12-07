import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useTheme } from "../ThemeContext";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isSidebarOpen]);

  return (
    <div
      className={
        "flex min-h-screen transition-colors duration-300 " +
        (isDark ? "bg-[#1E2331] text-gray-200" : "bg-gray-100 text-gray-900")
      }
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Backdrop for hover expand on desktop */}
      {isExpanded && !isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 hidden md:block"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-3">
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex justify-end flex-1">
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
        </div>

        <main className="flex-1 px-6 py-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
