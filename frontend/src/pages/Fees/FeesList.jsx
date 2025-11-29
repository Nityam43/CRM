import React, { useState, useMemo } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";

const feesData = [
  // empty for now to match the "No data available" image
];

const FeesList = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) return feesData;
    const q = search.toLowerCase();
    return feesData.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="flex-1 px-6 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-sm">Back</span>
      </button>

      <h2
        className={
          "text-2xl font-bold mb-4 transition-colors duration-300 " +
          (isDark ? "text-white" : "text-gray-900")
        }
      >
        Simba Payments List
      </h2>

      <div
        className={
          "rounded-xl p-4 transition-colors duration-300 " +
          (isDark ? "bg-[#232941]" : "bg-white shadow")
        }
      >
        {/* Top controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 text-sm">
          <div
            className={
              "flex items-center gap-2 transition-colors duration-300 " +
              (isDark ? "text-gray-300" : "text-gray-700")
            }
          >
            <span>Show</span>
            <select
              className={
                "border px-2 py-1 rounded transition-colors duration-300 " +
                (isDark
                  ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                  : "bg-white border-gray-300 text-gray-800")
              }
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>

          <div
            className={
              "flex items-center gap-2 transition-colors duration-300 " +
              (isDark ? "text-gray-300" : "text-gray-700")
            }
          >
            <span>Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={
                "border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                (isDark
                  ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                  : "bg-white border-gray-300 text-gray-800")
              }
              placeholder="Type to filter..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead
              className={
                "transition-colors duration-300 " +
                (isDark ? "bg-[#1E2331]" : "bg-gray-100")
              }
            >
              <tr>
                {[
                  "NO", "ENROLL NO.", "PRINT", "STUDENT NAME", "CONTACT", 
                  "PAID FEES", "REMINDER FEES", "REMAINING FEES", 
                  "PAYMENT DATE", "PAYMENT METHOD", "ACTION"
                ].map((h) => (
                  <th
                    key={h}
                    className={
                      "px-4 py-3 font-semibold text-left " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className={
                      "px-4 py-6 text-center " +
                      (isDark ? "text-gray-400" : "text-gray-500")
                    }
                  >
                    No data available in table
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={
                      "border-t transition-colors duration-300 " +
                      (isDark
                        ? "border-[#2c3250] hover:bg-[#1E2331]"
                        : "border-gray-200 hover:bg-gray-50")
                    }
                  >
                    {/* You would render your table cells here */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom info */}
        <div
          className={
            "flex flex-col md:flex-row md:items-center md:justify-between text-xs mt-3 transition-colors duration-300 " +
            (isDark ? "text-gray-400" : "text-gray-600")
          }
        >
          <span>
            Showing {filteredData.length} to {feesData.length} of {feesData.length} entries
          </span>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              className={
                "px-3 py-1 rounded border transition-colors duration-300 " +
                (isDark
                  ? "bg-[#1E2331] border-[#2c3250] text-gray-200 hover:bg-gray-700"
                  : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100")
              }
            >
              Previous
            </button>
            <button
              className={
                "px-3 py-1 rounded border transition-colors duration-300 " +
                (isDark
                  ? "bg-[#1E2331] border-[#2c3250] text-gray-200 hover:bg-gray-700"
                  : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100")
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesList;