import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";

const FeesPay = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [enrollNo, setEnrollNo] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search fees for enroll no:", enrollNo);
  };

  return (
    <div className="flex-1 px-6 py-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-sm">Back</span>
      </button>

      {/* Card */}
      <div
        className={
          "max-w-4xl mx-auto rounded-xl p-6 transition-colors duration-300 " +
          (isDark ? "bg-[#232941]" : "bg-white shadow")
        }
      >
        <h2
          className={
            "text-xl font-bold mb-6 transition-colors duration-300 " +
            (isDark ? "text-white" : "text-gray-900")
          }
        >
          Add Fees
        </h2>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4"
        >
          <div className="flex-1">
            <label
              className={
                "block text-sm mb-1 transition-colors duration-300 " +
                (isDark ? "text-gray-300" : "text-gray-700")
              }
            >
              Enroll No :
            </label>
            <input
              type="text"
              value={enrollNo}
              onChange={(e) => setEnrollNo(e.target.value)}
              placeholder="Enroll No"
              className={
                "w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                (isDark
                  ? "bg-[#1E2331] border-[#2c3250] text-gray-200 placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400")
              }
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeesPay;
