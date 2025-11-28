import React, { useState, useMemo } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";

const cancelledDemos = [
  {
    id: 1,
    name: "Student Name",
    contact1: "9876543210",
    contact2: "9876543211",
    course: "Digital Marketing - 3M",
    reference: "Social Media",
    demoDate: "12/08/2025 06:54 AM",
    reason: "Not interested",
    status: "Cancelled",
  },
];

const CancelDemoList = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");

  const filteredDemos = useMemo(() => {
    if (!search.trim()) return cancelledDemos;
    const q = search.toLowerCase();
    return cancelledDemos.filter((d) =>
      [
        d.name,
        d.contact1,
        d.contact2,
        d.course,
        d.reference,
        d.demoDate,
        d.reason,
        d.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search]);

  return (
    <div className="flex-1 px-6 py-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-sm">Back</span>
      </button>

      {/* Title */}
      <h2
        className={
          "text-2xl font-bold mb-4 transition-colors duration-300 " +
          (isDark ? "text-white" : "text-gray-900")
        }
      >
        Cancelled Demo List
      </h2>

      {/* Main card */}
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
                  "NO",
                  "STUDENT NAME",
                  "CONTACT",
                  "COURSE",
                  "REFERENCE",
                  "DEMO DATE",
                  "REASON",
                  "STATUS",
                  "ACTIONS",
                ].map((h) => (
                  <th
                    key={h}
                    className={
                      "px-4 py-3 font-semibold " +
                      (["STATUS", "ACTIONS"].includes(h)
                        ? "text-center"
                        : "text-left") +
                      " " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredDemos.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    "border-t transition-colors duration-300 " +
                    (isDark
                      ? "border-[#2c3250] hover:bg-[#1E2331]"
                      : "border-gray-200 hover:bg-gray-50")
                  }
                >
                  {/* NO */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    {index + 1}
                  </td>

                  {/* STUDENT NAME */}
                  <td
                    className={
                      "px-4 py-3 whitespace-nowrap " +
                      (isDark ? "text-gray-200" : "text-gray-900")
                    }
                  >
                    {item.name}
                  </td>

                  {/* CONTACT */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    <div>{item.contact1}</div>
                    <div>{item.contact2}</div>
                  </td>

                  {/* COURSE */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.course}
                  </td>

                  {/* REFERENCE */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.reference}
                  </td>

                  {/* DEMO DATE */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.demoDate}
                  </td>

                  {/* REASON */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.reason}
                  </td>

                  {/* STATUS badge */}
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-full border text-xs border-red-500 text-red-500">
                      {item.status}
                    </span>
                  </td>
                  {/* ACTION buttons */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button className="text-green-400 border border-green-500 px-3 py-1 rounded text-xs hover:bg-green-500 hover:text-white">
                        Restore
                      </button>
                      <button className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDemos.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className={
                      "px-4 py-6 text-center " +
                      (isDark ? "text-gray-400" : "text-gray-500")
                    }
                  >
                    No data available in table
                  </td>
                </tr>
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
            Showing {filteredDemos.length} of {cancelledDemos.length} entries
          </span>
          <div className="flex gap-1 mt-2 md:mt-0">
            <button
              className={
                "px-2 py-1 rounded border transition-colors duration-300 " +
                (isDark
                  ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                  : "bg-white border-gray-300 text-gray-800")
              }
            >
              1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelDemoList;
