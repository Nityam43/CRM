import React, { useMemo, useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import EnquiryReminderCard from "../../components/EnquiryReminderCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnquiries, cancelEnquiry, moveEnquiryToDemo } from "../../redux/thunks";

const EnquiryReminders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [search, setSearch] = useState("");
  const { enquiries, status, error } = useSelector((state) => state.enquiries);

  useEffect(() => {
    dispatch(fetchEnquiries());
  }, [dispatch]);

  const reminders = useMemo(() => {
    return enquiries.filter(
      (e) => e.reminderDate && e.status !== "Cancelled" && e.status !== "Moved to Demo"
    );
  }, [enquiries]);

  const handleEditClick = (reminder) => {
    navigate(`/enquiry/edit/${reminder._id}`);
  };

  const handleDemoClick = (reminder) => {
    if (window.confirm("Are you sure you want to move this enquiry to a demo?")) {
      dispatch(moveEnquiryToDemo(reminder));
    }
  };

  const handleCancelClick = (reminder) => {
    if (window.confirm("Are you sure you want to cancel this enquiry?")) {
      dispatch(cancelEnquiry(reminder._id));
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return reminders;
    const q = search.toLowerCase();
    return reminders.filter((e) =>
      [
        e.studentName,
        e.firstMobile,
        e.secondMobile,
        e.education,
        e.createdAt,
        e.reminderDate,
        e.reference,
        e.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, reminders]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (status === "loading") {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex-1 px-4 sm:px-6 py-6">
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

        {isMobile ? (
          <div>
            {filtered.length === 0 ? (
              <p
                className={
                  "text-center py-4 " +
                  (isDark ? "text-gray-400" : "text-gray-500")
                }
              >
                No reminders due.
              </p>
            ) : (
              filtered.map((item) => (
                <EnquiryReminderCard
                  key={item._id}
                  reminder={{
                    ...item,
                    name: item.studentName,
                    contact1: item.firstMobile,
                    contact2: item.secondMobile,
                    course: item.education,
                    enquiryDate: formatDate(item.createdAt),
                    reminderDate: formatDate(item.reminderDate),
                    reference: item.reference,
                  }}
                  onEdit={handleEditClick}
                  onDemo={handleDemoClick}
                  onCancel={handleCancelClick}
                />
              ))
            )}
          </div>
        ) : (
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
                        (["MESSAGE", "STATUS", "RATINGS", "ACTIONS"].includes(
                          h
                        )
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
                    key={item._id}
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
                      {item.studentName}
                    </td>

                    {/* CONTACT */}
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      <div>{item.firstMobile}</div>
                      <div>{item.secondMobile}</div>
                    </td>

                    {/* COURSES */}
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {item.education}
                    </td>

                    {/* ENQUIRY DATE */}
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {formatDate(item.createdAt)}
                    </td>

                    {/* REMINDER DATE */}
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {formatDate(item.reminderDate)}
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
                        {item.enquiryRating || 'N/A'}
                      </span>
                    </td>

                    {/* ACTIONS (e.g., mark done / postpone) */}
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDemoClick(item)}
                          className="text-yellow-400 border border-yellow-500 px-3 py-1 rounded text-xs hover:bg-yellow-500 hover:text-white"
                        >
                          Demo
                        </button>
                        <button
                          onClick={() => handleCancelClick(item)}
                          className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white"
                        >
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
        )}

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
