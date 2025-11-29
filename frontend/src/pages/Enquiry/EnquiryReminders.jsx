import React, { useMemo, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots, faPhone } from "@fortawesome/free-solid-svg-icons";

const reminders = [
  {
    id: 1,
    name: "Joshi Meetkumar",
    contact1: "9898929866",
    contact2: "9909854024",
    course: "Video Editing | Digital Marketing",
    enquiryDate: "09/10/2025 06:29 AM",
    reminderDate: "11/10/2025 06:29 AM",
    reference: "Social Media",
    status: "Enquiry",
    rating: 1,
  },
  // add more demo rows or leave empty for now
];

const EnquiryReminders = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return reminders;
    const q = search.toLowerCase();
    return reminders.filter((e) =>
      [
        e.name,
        e.contact1,
        e.contact2,
        e.course,
        e.enquiryDate,
        e.reminderDate,
        e.reference,
        e.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search]);

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

      {/* Title */}
      <h2
        className={
          "text-2xl font-bold mb-4 transition-colors duration-300 " +
          (isDark ? "text-white" : "text-gray-900")
        }
      >
        Enquiry Reminders
      </h2>

      {/* Card */}
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
                  "NAME",
                  "CONTACT",
                  "COURSES",
                  "ENQUIRY DATE",
                  "REMINDER DATE",
                  "REFERENCE",
                  "MESSAGE",
                  "STATUS",
                  "RATINGS",
                  "ACTIONS",
                ].map((h) => (
                  <th
                    key={h}
                    className={
                      "px-4 py-3 font-semibold " +
                      (["MESSAGE", "STATUS", "RATINGS", "ACTIONS"].includes(h)
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

                  {/* COURSES */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.course}
                  </td>

                  {/* ENQUIRY DATE */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.enquiryDate}
                  </td>

                  {/* REMINDER DATE */}
                  <td
                    className={
                      "px-4 py-3 " +
                      (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {item.reminderDate}
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

                  {/* MESSAGE icons */}
                  <td className="px-4 py-3 text-center">
                    <div
                      className={
                        "flex justify-center gap-3 text-lg transition-colors duration-300 " +
                        (isDark ? "text-gray-300" : "text-gray-600")
                      }
                    >
                      <button
                        className="hover:text-green-500 transition-colors"
                        title="WhatsApp"
                      >
                        <FontAwesomeIcon icon={faWhatsapp} />
                      </button>
                      <button
                        className="hover:text-sky-500 transition-colors"
                        title="Message"
                      >
                        <FontAwesomeIcon icon={faCommentDots} />
                      </button>
                      <button
                        className="hover:text-blue-500 transition-colors"
                        title="Call"
                      >
                        <FontAwesomeIcon icon={faPhone} />
                      </button>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={
                        "inline-block px-3 py-1 rounded-full border text-xs " +
                        (item.status === "Enrolled"
                          ? "border-green-500 text-green-500"
                          : "border-yellow-500 text-yellow-500")
                      }
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* RATING */}
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded border border-red-500 text-red-500 text-xs">
                      {item.rating}
                    </span>
                  </td>

                  {/* ACTIONS (e.g., mark done / postpone) */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white">
                        Edit
                      </button>
                      <button className="text-yellow-400 border border-yellow-500 px-3 py-1 rounded text-xs hover:bg-yellow-500 hover:text-white">
                        Demo
                      </button>
                      <button className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white">
                        Cancel
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
                    No reminders due.
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
            Showing {filtered.length} of {reminders.length} entries
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

export default EnquiryReminders;
