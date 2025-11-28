import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useTheme } from "../ThemeContext";

const CancelList = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cancelledEnquiries = [
    {
      id: 1,
      name: "Mark Wilson",
      contact1: "9876543210",
      contact2: "9876500000",
      course: "Digital Marketing - 3M",
      enquiryDate: "10/10/2025 09:30 AM",
      reminderDate: "12/10/2025 09:30 AM",
      reference: "Social Media",
      reason: "No longer interested",
      status: "Cancelled",
      rating: 1,
      register: "No",
    },
    {
      id: 2,
      name: "Sara Johnson",
      contact1: "9123456780",
      contact2: "9123400000",
      course: "Video Editing",
      enquiryDate: "08/10/2025 11:15 AM",
      reminderDate: "09/10/2025 11:15 AM",
      reference: "Friend",
      reason: "Joined other institute",
      status: "Cancelled",
      rating: 2,
      register: "No",
    },
  ];

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return cancelledEnquiries;
    const q = search.toLowerCase();
    return cancelledEnquiries.filter((e) =>
      [
        e.name,
        e.contact1,
        e.contact2,
        e.course,
        e.enquiryDate,
        e.reminderDate,
        e.reference,
        e.reason,
        e.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, cancelledEnquiries]);

  return (
    <div className="flex-1 px-6 py-6">
      {/* top bar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-sm">Back</span>
      </button>

      <h2
        className={
          "text-2xl font-bold mb-4 transition-colors  " +
          (isDark ? "text-white" : "text-gray-900")
        }
      >
        Canceled Enquiry List
      </h2>

      {/* main card */}
      <div
        className={
          "rounded-xl p-4 transition-colors duration-300 " +
          (isDark ? "bg-[#232941]" : "bg-white shadow")
        }
      >
        {/* top controls */}
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
                "px-2 py-1 rounded border transition-colors duration-300 " +
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
                "px-3 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                (isDark
                  ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                  : "bg-white border-gray-300 text-gray-800")
              }
              placeholder=""
            />
          </div>
        </div>

        {/* table */}
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
                  "COURSES",
                  "ENQUIRY DATE",
                  "REMINDER DATE",
                  "REFERENCES",
                  "REASON",
                  "STATUS",
                  "RATINGS",
                  "REGISTER",
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
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={12}
                    className={
                      "px-4 py-6 text-center " +
                      (isDark ? "text-gray-400" : "text-gray-500")
                    }
                  >
                    No data available in table
                  </td>
                </tr>
              )}

              {filtered.map((e, index) => (
                <tr
                  key={e.id}
                  className={
                    "border-t transition-colors duration-300 " +
                    (isDark
                      ? "border-[#2c3250] hover:bg-[#1E2331]"
                      : "border-gray-200 hover:bg-gray-50")
                  }
                >
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    className={
                      "px-4 py-3 whitespace-nowrap " +
                      (isDark ? "text-gray-200" : "text-gray-900")
                    }
                  >
                    {e.name}
                  </td>
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    <div>{e.contact1}</div>
                    <div>{e.contact2}</div>
                  </td>
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {e.course}
                  </td>
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {e.enquiryDate}
                  </td>
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {e.reminderDate}
                  </td>
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {e.reference}
                  </td>
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {e.reason}
                  </td>
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {e.status}
                  </td>
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {e.rating}
                  </td>
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {e.register}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <button className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white flex items-center gap-1">
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* bottom info + pagination placeholder */}
        <div
          className={
            "flex flex-col md:flex-row md:items-center md:justify-between text-xs mt-3 transition-colors duration-300 " +
            (isDark ? "text-gray-400" : "text-gray-600")
          }
        >
          <span>
            Showing {filtered.length} to {filtered.length} of{" "}
            {cancelledEnquiries.length} entries
          </span>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              className={
                "px-3 py-1 rounded border transition-colors duration-300 " +
                (isDark
                  ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                  : "bg-white border-gray-300 text-gray-800")
              }
            >
              Previous
            </button>
            <button
              className={
                "px-3 py-1 rounded border transition-colors duration-300 " +
                (isDark
                  ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                  : "bg-white border-gray-300 text-gray-800")
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

export default CancelList;
