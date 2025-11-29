import React, { useState, useMemo } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";

const cancelledEnrolls = [
  // Example shape; keep empty or add sample rows
  // {
  //   id: 1,
  //   enrollNo: "0019",
  //   name: "Borad Ayushi Ghanshyambhai",
  //   contact1: "9723540080",
  //   contact2: "8140180172",
  //   enrollDate: "12/08/2025 07:30 AM",
  //   course: "Digital Marketing - 3M",
  //   courseFees: 0,
  //   teacherName: "Kartik Sir",
  //   time: "3 PM",
  //   reason: "Not interested",
  // },
];

const CancelEnrollList = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return cancelledEnrolls;
    const q = search.toLowerCase();
    return cancelledEnrolls.filter((e) =>
      [
        e.enrollNo,
        e.name,
        e.contact1,
        e.contact2,
        e.enrollDate,
        e.course,
        e.teacherName,
        e.time,
        e.reason,
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
        Cancelled Enroll List
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
                  "ENROLL NO",
                  "NAME",
                  "CONTACT",
                  "ENROLL DATE",
                  "COURSE",
                  "COURSE FEES",
                  "TEACHER NAME",
                  "TIME",
                  "REASON",
                  "ACTIONS",
                ].map((h) => (
                  <th
                    key={h}
                    className={
                      "px-4 py-3 font-semibold " +
                      (h === "ACTIONS" ? "text-center" : "text-left") +
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
              {filtered.map((item, index) => (
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

                  {/* ENROLL NO */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-900")
                    }
                  >
                    {item.enrollNo}
                  </td>

                  {/* NAME */}
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

                  {/* ENROLL DATE */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.enrollDate}
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

                  {/* COURSE FEES */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.courseFees}
                  </td>

                  {/* TEACHER NAME */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.teacherName}
                  </td>

                  {/* TIME */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.time}
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

                  {/* ACTIONS */}
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

              {filtered.length === 0 && (
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
            Showing {filtered.length} of {cancelledEnrolls.length} entries
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

export default CancelEnrollList;
