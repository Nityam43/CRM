import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useTheme } from "../../ThemeContext";
import api from "../../api/axios";
import { useMediaQuery } from "react-responsive";
import CancelCard from "../../components/CancelCard";

const CancelList = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [cancelledEnquiries, setCancelledEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCancelledEnquiries = async () => {
      try {
        const response = await api.get("/enquiry/status/Cancelled");
        setCancelledEnquiries(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledEnquiries();
  }, []);

  const handleDeleteClick = async (enquiryId) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?"))
      return;

    try {
      await api.delete(`/enquiry/${enquiryId}`);
      setCancelledEnquiries((prev) =>
        prev.filter((e) => e._id !== enquiryId)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete enquiry"
      );
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return cancelledEnquiries;
    const q = search.toLowerCase();
    return cancelledEnquiries.filter((e) =>
      [
        e.studentName,
        e.firstMobile,
        e.secondMobile,
        e.education,
        e.reference,
        e.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, cancelledEnquiries]);

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex-1 px-6 py-6 text-center">
        <p className={isDark ? "text-white" : "text-gray-900"}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 px-6 py-6 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 sm:px-6 py-6">
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

        {isMobile ? (
          <div>
            {filtered.map((e) => (
              <CancelCard key={e._id} enquiry={e} onDelete={handleDeleteClick} />
            ))}
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
                    "COURSES",
                    "ENQUIRY DATE",
                    "REMINDER DATE",
                    "REFERENCES",
                    "STATUS",
                    "RATINGS",
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
                    key={e._id}
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
                      {e.studentName}
                    </td>
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      <div>{e.firstMobile}</div>
                      <div>{e.secondMobile}</div>
                    </td>
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {e.education}
                    </td>
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {formatDate(e.leadDate)}
                    </td>
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {formatDate(e.reminderDate)}
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
                      {e.status}
                    </td>
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {e.enquiryRating}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDeleteClick(e._id)}
                          className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white flex items-center gap-1"
                        >
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
        )}

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
