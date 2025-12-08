import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../ThemeContext";
import api from "../../api/axios";
import EnquiryCard from "../../components/EnquiryCard";
import { useMediaQuery } from "react-responsive";

const EnquiryList = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await api.get("/enquiry");
        setEnquiries(response.data.filter((e) => e.status !== "Cancelled"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleEditClick = (enquiry) => {
    navigate(`/enquiry/edit/${enquiry._id}`);
  };

  const handleDemoClick = async (enquiry) => {
    console.log("Moving enquiry to demo:", enquiry);
    try {
      await api.post("/demo", {
        ...enquiry,
        course: enquiry.education, // Map education to course
        status: "Demo",
      });
      navigate("/demo/list");
    } catch (err) {
      console.error("Failed to move to demo:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to move to demo"
      );
    }
  };

  const handleEnrollClick = (enquiry) => {
    navigate('/enroll/add', { state: { item: enquiry } });
  };

  const handleCancelClick = async (enquiry) => {
    if (
      !window.confirm(
        `Are you sure you want to cancel the enquiry for "${enquiry.studentName}"?`
      )
    )
      return;

    try {
      await api.put(`/enquiry/cancel/${enquiry._id}`);
      setEnquiries((prev) => prev.filter((e) => e._id !== enquiry._id));
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to cancel enquiry"
      );
    }
  };

  const filteredEnquiries = useMemo(() => {
    if (!search.trim()) return enquiries;
    const q = search.toLowerCase();
    return enquiries.filter((e) =>
      [
        e.studentName,
        e.firstMobile,
        e.secondMobile,
        e.education,
        e.reference,
        e.leadDate,
        e.reminderDate,
        e.visitingDate,
        e.status,
        e.enquiryRating,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, enquiries]);

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
      {/* back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-sm">Back</span>
      </button>

      {/* title */}
      <h2
        className={
          "text-2xl font-bold mb-4 transition-colors duration-300 " +
          (isDark ? "text-white" : "text-gray-900")
        }
      >
        Enquiry List
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
            {filteredEnquiries.map((item) => (
              <EnquiryCard
                key={item._id}
                enquiry={item}
                onEdit={handleEditClick}
                onCancel={handleCancelClick}
                onDemo={handleDemoClick}
                onEnroll={handleEnrollClick}
              />
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
                    "NAME",
                    "CONTACT",
                    "COURSES",
                    "ENQUIRY DATE",
                    "REMINDER DATE",
                    "VISITING DATE",
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
                {filteredEnquiries.map((item, index) => (
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

                    {/* COURSES (if you have a course field, otherwise '-') */}
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {item.education || "-"}
                    </td>

                    {/* ENQUIRY DATE (leadDate) */}
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {formatDate(item.leadDate)}
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

                    {/* VISITING DATE */}
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {formatDate(item.visitingDate)}
                    </td>

                    {/* REFERENCE */}
                    <td
                      className={
                        "px-4 py-3 " +
                        (isDark ? "text-gray-200" : "text-gray-800")
                      }
                    >
                      {item.reference || "-"}
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

                    {/* STATUS badge (use item.status if you set it, else 'Pending') */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={
                          "inline-block px-3 py-1 rounded-full border text-xs " +
                          (item.status === "Enrolled"
                            ? "border-green-500 text-green-500"
                            : "border-yellow-500 text-yellow-500")
                        }
                      >
                        {item.status || "Pending"}
                      </span>
                    </td>

                    {/* RATING pill – from enquiryRating */}
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded border border-red-500 text-red-500 text-xs">
                        {item.enquiryRating || "-"}
                      </span>
                    </td>

                    {/* ACTION buttons */}
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
                          onClick={() => handleEnrollClick(item)}
                          className="text-green-400 border border-green-500 px-3 py-1 rounded text-xs hover:bg-green-500 hover:text-white"
                        >
                          Enroll
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

                {filteredEnquiries.length === 0 && (
                  <tr>
                    <td
                      colSpan={12}
                      className={
                        "px-4 py-6 text-center " +
                        (isDark ? "text-gray-400" : "text-gray-500")
                      }
                    >
                      No enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* bottom info */}
        <div
          className={
            "flex flex-col md:flex-row md:items-center md:justify-between text-xs mt-3 transition-colors duration-300 " +
            (isDark ? "text-gray-400" : "text-gray-600")
          }
        >
          <span>
            Showing {filteredEnquiries.length} of {enquiries.length} entries
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

export default EnquiryList;
