import React, { useMemo, useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import DemoReminderCard from "../../components/DemoReminderCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchDemos, cancelDemo } from "../../redux/thunks";

const DemoReminder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [search, setSearch] = useState("");
  const { demos, status, error } = useSelector((state) => state.demos);

  useEffect(() => {
    dispatch(fetchDemos());
  }, [dispatch]);

  const reminders = useMemo(() => {
    return demos.filter(
      (d) =>
        d.reminder &&
        d.status !== "Done" &&
        d.status !== "Cancelled"
    );
  }, [demos]);

  const handleEditClick = (reminder) => {
    navigate(`/demo/edit/${reminder._id}`);
  };

  const handleDoneClick = (reminder) => {
    console.log("Mark as done:", reminder);
    // You might want to dispatch an action to update the status to "Done"
    // e.g., dispatch(updateDemo({ id: reminder._id, demoData: { status: 'Done' } }));
  };

  const handleCancelClick = (reminder) => {
    if (window.confirm("Are you sure you want to cancel this demo?")) {
      dispatch(cancelDemo(reminder._id));
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return reminders;
    const q = search.toLowerCase();
    return reminders.filter((d) =>
      [
        d.studentName,
        d.firstMobile,
        d.secondMobile,
        d.course,
        d.reference,
        d.reminder,
        d.status,
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
        Reminder Demo List
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
                No data available
              </p>
            ) : (
              filtered.map((item) => (
                <DemoReminderCard
                  key={item._id}
                  reminder={{
                    ...item,
                    name: item.studentName,
                    contact1: item.firstMobile,
                    contact2: item.secondMobile,
                  }}
                  onEdit={handleEditClick}
                  onDone={handleDoneClick}
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
                    "STUDENT NAME",
                    "CONTACT",
                    "COURSE",
                    "REFERENCE",
                    "REMINDER DATE",
                    "MESSAGE",
                    "STATUS",
                    "ACTIONS",
                  ].map((h) => (
                    <th
                      key={h}
                      className={
                        "px-4 py-3 font-semibold " +
                        (["MESSAGE", "STATUS", "ACTIONS"].includes(h)
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

                    {/* STUDENT NAME */}
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

                    {/* REMINDER DATE */}
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {formatDate(item.reminder)}
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
                          (item.status === "Done"
                            ? "border-green-500 text-green-500"
                            : item.status === "Cancelled"
                            ? "border-red-500 text-red-500"
                            : "border-yellow-500 text-yellow-500")
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* ACTIONS (Edit / Done / Cancel) */}
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDoneClick(item)}
                          className="text-green-400 border border-green-500 px-3 py-1 rounded text-xs hover:bg-green-500 hover:text-white"
                        >
                          Done
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

export default DemoReminder;
