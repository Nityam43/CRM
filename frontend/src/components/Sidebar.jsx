import { useState } from "react";
import {
  ChartBarIcon,
  UsersIcon,
  ClipboardIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  DocumentPlusIcon,
  ListBulletIcon,
  XCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import { useTheme } from "../ThemeContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [enquiryDropdownOpen, setEnquiryDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };

  const enquiryOptions = [
    { label: "Add Enquiry", path: "/enquiry/add", icon: DocumentPlusIcon },
    { label: "Enquiry List", path: "/enquiry/list", icon: ListBulletIcon },
    { label: "Cancel List", path: "/enquiry/cancel", icon: XCircleIcon },
  ];

  const demoOptions = [
    { label: "Demo List", path: "/demo/list", icon: ListBulletIcon },
    { label: "Cancel Demo List", path: "/demo/cancel", icon: XCircleIcon },
  ];

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={
        `flex flex-col p-4 h-screen sticky top-0 overflow-y-auto overflow-x-hidden 
     transition-[width] duration-300 ease-in-out
     ${isExpanded ? "w-64" : "w-20"}` +
        (isDark
          ? " bg-[#151824] text-gray-200"
          : " bg-white text-gray-900 border-r border-gray-200")
      }
    >
      {/* Logo / title */}
      <div className="flex justify-center mb-8 h-10">
        <h1
          className={
            "text-2xl font-bold tracking-wider whitespace-nowrap transition-opacity duration-300 " +
            (isExpanded ? "opacity-100" : "opacity-0") +
            (isDark ? " text-blue-400" : " text-blue-600")
          }
        >
          CRM
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {/* Dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className={
            "w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded transition relative group " +
            (isActive("/dashboard")
              ? isDark
                ? "bg-[#232941]"
                : "bg-blue-100"
              : isDark
              ? "hover:bg-[#232941]"
              : "hover:bg-gray-100")
          }
          title="Dashboard"
        >
          <ChartBarIcon
            className={
              "h-6 w-6 shrink-0 " + (isDark ? "text-blue-400" : "text-blue-600")
            }
          />
          <span
            className={
              "ml-4 whitespace-nowrap transition-opacity duration-300 hidden lg:block " +
              (isExpanded ? "opacity-100" : "opacity-0")
            }
          >
            Dashboard
          </span>
          {!isExpanded && (
            <div
              className={
                "absolute left-20 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap " +
                (isDark ? "bg-[#232941] text-white" : "bg-gray-900 text-white")
              }
            >
              Dashboard
            </div>
          )}
        </button>

        {/* Enquiry Dropdown */}
        <div>
          <button
            onClick={() => setEnquiryDropdownOpen(!enquiryDropdownOpen)}
            className={
              "w-full flex items-center px-3 py-3 rounded transition relative group " +
              (isDark ? "hover:bg-[#232941]" : "hover:bg-gray-100")
            }
            title="Enquiry"
          >
            <ClipboardIcon
              className={
                "h-6 w-6 shrink-0 " +
                (isDark ? "text-blue-400" : "text-blue-600")
              }
            />
            <span
              className={
                "ml-4 whitespace-nowrap transition-opacity duration-300 " +
                (isExpanded ? "opacity-100" : "opacity-0 hidden")
              }
            >
              Enquiry
            </span>
            {isExpanded && (
              <ChevronDownIcon
                className={
                  "h-4 w-4 shrink-0 ml-auto " +
                  (isDark ? "text-blue-400" : "text-blue-600") +
                  (enquiryDropdownOpen ? " rotate-180" : "")
                }
              />
            )}
            {!isExpanded && (
              <div
                className={
                  "absolute left-20 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap " +
                  (isDark
                    ? "bg-[#232941] text-white"
                    : "bg-gray-900 text-white")
                }
              >
                Enquiry
              </div>
            )}
          </button>

          {/* Dropdown menu */}
          {enquiryDropdownOpen && isExpanded && (
            <div
              className={
                "mt-2 ml-6 space-y-2 rounded p-2 " +
                (isDark ? "bg-[#0d0f15]" : "bg-gray-100")
              }
            >
              {enquiryOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.path}
                    onClick={() => {
                      navigate(option.path);
                      setEnquiryDropdownOpen(false);
                    }}
                    className={
                      "w-full flex items-center px-3 py-2 rounded transition text-sm " +
                      (isActive(option.path)
                        ? "bg-blue-600 text-white"
                        : isDark
                        ? "hover:bg-[#232941] text-gray-300"
                        : "hover:bg-white text-gray-800")
                    }
                  >
                    <IconComponent className="h-4 w-4 mr-2 shrink-0" />
                    <span className="whitespace-nowrap">{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Demo Dropdown */}
        <div>
          <button
            onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
            className={
              "w-full flex items-center px-3 py-3 rounded transition relative group " +
              (isDark ? "hover:bg-[#232941]" : "hover:bg-gray-100")
            }
            title="Demo"
          >
            <ClipboardIcon
              className={
                "h-6 w-6 shrink-0 " +
                (isDark ? "text-blue-400" : "text-blue-600")
              }
            />
            <span
              className={
                "ml-4 whitespace-nowrap transition-opacity duration-300 " +
                (isExpanded ? "opacity-100" : "opacity-0 hidden")
              }
            >
              Demo
            </span>
            {isExpanded && (
              <ChevronDownIcon
                className={
                  "h-4 w-4 shrink-0 ml-auto " +
                  (isDark ? "text-blue-400" : "text-blue-600") +
                  (demoDropdownOpen ? " rotate-180" : "")
                }
              />
            )}
            {!isExpanded && (
              <div
                className={
                  "absolute left-20 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap " +
                  (isDark
                    ? "bg-[#232941] text-white"
                    : "bg-gray-900 text-white")
                }
              >
                Demo
              </div>
            )}
          </button>

          {/* Demo dropdown menu */}
          {demoDropdownOpen && isExpanded && (
            <div
              className={
                "mt-2 ml-6 space-y-2 rounded p-2 " +
                (isDark ? "bg-[#0d0f15]" : "bg-gray-100")
              }
            >
              {demoOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.path}
                    onClick={() => {
                      navigate(option.path);
                      setDemoDropdownOpen(false);
                    }}
                    className={
                      "w-full flex items-center px-3 py-2 rounded transition text-sm " +
                      (isActive(option.path)
                        ? "bg-blue-600 text-white"
                        : isDark
                        ? "hover:bg-[#232941] text-gray-300"
                        : "hover:bg-white text-gray-800")
                    }
                  >
                    <IconComponent className="h-4 w-4 mr-2 shrink-0" />
                    <span className="whitespace-nowrap">{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Users */}
        <button
          onClick={() => navigate("/users")}
          className={
            "w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded transition relative group " +
            (isActive("/users")
              ? isDark
                ? "bg-[#232941]"
                : "bg-blue-100"
              : isDark
              ? "hover:bg-[#232941]"
              : "hover:bg-gray-100")
          }
          title="Users"
        >
          <UsersIcon
            className={
              "h-6 w-6 shrink-0 " + (isDark ? "text-blue-400" : "text-blue-600")
            }
          />
          <span
            className={
              "ml-4 whitespace-nowrap transition-opacity duration-300 hidden lg:block " +
              (isExpanded ? "opacity-100" : "opacity-0")
            }
          >
            Users
          </span>
          {!isExpanded && (
            <div
              className={
                "absolute left-20 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap " +
                (isDark ? "bg-[#232941] text-white" : "bg-gray-900 text-white")
              }
            >
              Users
            </div>
          )}
        </button>

        {/* Tasks */}
        <button
          onClick={() => navigate("/tasks")}
          className={
            "w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded transition relative group " +
            (isActive("/tasks")
              ? isDark
                ? "bg-[#232941]"
                : "bg-blue-100"
              : isDark
              ? "hover:bg-[#232941]"
              : "hover:bg-gray-100")
          }
          title="Tasks"
        >
          <ClipboardIcon
            className={
              "h-6 w-6 shrink-0 " + (isDark ? "text-blue-400" : "text-blue-600")
            }
          />
          <span
            className={
              "ml-4 whitespace-nowrap transition-opacity duration-300 hidden lg:block " +
              (isExpanded ? "opacity-100" : "opacity-0")
            }
          >
            Tasks
          </span>
          {!isExpanded && (
            <div
              className={
                "absolute left-20 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap " +
                (isDark ? "bg-[#232941] text-white" : "bg-gray-900 text-white")
              }
            >
              Tasks
            </div>
          )}
        </button>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center lg:justify-start px-3 py-3 rounded bg-red-600 hover:bg-red-700 transition text-white mt-4 w-full relative group"
        title="Logout"
      >
        <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" />
        <span
          className={
            "ml-4 whitespace-nowrap transition-opacity duration-300 hidden lg:block " +
            (isExpanded ? "opacity-100" : "opacity-0")
          }
        >
          Logout
        </span>
        {!isExpanded && (
          <div className="absolute left-20 bg-red-700 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Logout
          </div>
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
