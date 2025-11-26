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

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [enquiryDropdownOpen, setEnquiryDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`bg-[#151824] flex flex-col p-4 h-screen sticky top-0 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      } overflow-y-auto overflow-x-hidden`}
    >
      <div className="flex justify-center mb-8 h-10">
        <h1
          className={`text-2xl font-bold tracking-wider text-blue-400 whitespace-nowrap transition-opacity duration-300 ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          CRM
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {/* Dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className={`w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded transition relative group ${
            isActive("/dashboard") ? "bg-[#232941]" : "hover:bg-[#232941]"
          }`}
          title="Dashboard"
        >
          <ChartBarIcon className="h-6 w-6 text-blue-400 shrink-0" />
          <span
            className={`ml-4 whitespace-nowrap transition-opacity duration-300 hidden lg:block ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Dashboard
          </span>
          {!isExpanded && (
            <div className="absolute left-20 bg-[#232941] text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Dashboard
            </div>
          )}
        </button>

        {/* Enquiry Dropdown */}
        <div>
          <button
            onClick={() => setEnquiryDropdownOpen(!enquiryDropdownOpen)}
            className="w-full flex items-center px-3 py-3 rounded hover:bg-[#232941] transition relative group"
            title="Enquiry"
          >
            <ClipboardIcon className="h-6 w-6 text-blue-400 shrink-0" />
            <span
              className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              Enquiry
            </span>
            {isExpanded && (
              <ChevronDownIcon
                className={`h-4 w-4 text-blue-400 transition-transform shrink-0 ml-auto ${
                  enquiryDropdownOpen ? "rotate-180" : ""
                }`}
              />
            )}
            {!isExpanded && (
              <div className="absolute left-20 bg-[#232941] text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Enquiry
              </div>
            )}
          </button>

          {/* Enquiry Dropdown Menu */}
          {enquiryDropdownOpen && isExpanded && (
            <div className="mt-2 ml-6 space-y-2 bg-[#0d0f15] rounded p-2">
              {enquiryOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.path}
                    onClick={() => {
                      navigate(option.path);
                      setEnquiryDropdownOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 rounded transition text-sm ${
                      isActive(option.path)
                        ? "bg-blue-600 text-white"
                        : "hover:bg-[#232941] text-gray-300"
                    }`}
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
          className={`w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded transition relative group ${
            isActive("/users") ? "bg-[#232941]" : "hover:bg-[#232941]"
          }`}
          title="Users"
        >
          <UsersIcon className="h-6 w-6 text-blue-400 shrink-0" />
          <span
            className={`ml-4 whitespace-nowrap transition-opacity duration-300 hidden lg:block ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Users
          </span>
          {!isExpanded && (
            <div className="absolute left-20 bg-[#232941] text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Users
            </div>
          )}
        </button>

        {/* Tasks */}
        <button
          onClick={() => navigate("/tasks")}
          className={`w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded transition relative group ${
            isActive("/tasks") ? "bg-[#232941]" : "hover:bg-[#232941]"
          }`}
          title="Tasks"
        >
          <ClipboardIcon className="h-6 w-6 text-blue-400 shrink-0" />
          <span
            className={`ml-4 whitespace-nowrap transition-opacity duration-300 hidden lg:block ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Tasks
          </span>
          {!isExpanded && (
            <div className="absolute left-20 bg-[#232941] text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Tasks
            </div>
          )}
        </button>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center lg:justify-start px-3 py-3 rounded bg-red-600 hover:bg-red-700 transition text-white mt-4 w-full relative group"
        title="Logout"
      >
        <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" />
        <span
          className={`ml-4 whitespace-nowrap transition-opacity duration-300 hidden lg:block ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
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
