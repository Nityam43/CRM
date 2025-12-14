import React, { useState, useMemo, useEffect } from "react";
import { ArrowLeftIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { useMediaQuery } from "react-responsive";
import FeesCard from "../../components/FeesCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolls } from "../../redux/thunks";

const FeesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [search, setSearch] = useState("");
  const { enrolls, status, error } = useSelector((state) => state.enrolls);

  useEffect(() => {
    // We fetch enrolls and the page component derives fee information.
    dispatch(fetchEnrolls());
  }, [dispatch]);

  const handleAction = (enrollNo) => {
    navigate(`/fees/pay?enrollNo=${enrollNo}`);
  };

  const filteredData = useMemo(() => {
    if (!search.trim()) return enrolls;
    const q = search.toLowerCase();
    return enrolls.filter((item) =>
      (item.studentName?.toLowerCase() || "").includes(q) ||
      (item.enrollNo?.toLowerCase() || "").includes(q) ||
      (item.course?.toLowerCase() || "").includes(q)
    );
  }, [search, enrolls]);

  return (
    <div className="flex-1 px-4 sm:px-6 py-6">
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
        Student Fee Status
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
              placeholder="Filter by name, enroll no, course..."
            />
          </div>
        </div>

        {isMobile ? (
          <div>
            {status === 'loading' ? (
              <p className={"text-center py-4 " + (isDark ? "text-gray-400" : "text-gray-500")}>Loading...</p>
            ) : status === 'failed' ? (
              <p className={"text-center py-4 text-red-500"}>{error}</p>
            ) : filteredData.length === 0 ? (
              <p
                className={
                  "text-center py-4 " +
                  (isDark ? "text-gray-400" : "text-gray-500")
                }
              >
                No data available
              </p>
            ) : (
              filteredData.map((item) => <FeesCard key={item._id} fee={item} onAction={() => handleAction(item.enrollNo)} />)
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
                    "ENROLL NO.",
                    "STUDENT NAME",
                    "COURSE",
                    "TOTAL FEES",
                    "PAID FEES",
                    "PENDING FEES",
                    "STATUS",
                    "ACTION",
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
                {status === 'loading' ? (
                  <tr><td colSpan={8} className={"px-4 py-6 text-center " + (isDark ? "text-gray-400" : "text-gray-500")}>Loading...</td></tr>
                ) : status === 'failed' ? (
                  <tr><td colSpan={8} className="px-4 py-6 text-center text-red-500">{error}</td></tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className={
                        "px-4 py-6 text-center " +
                        (isDark ? "text-gray-400" : "text-gray-500")
                      }
                    >
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr
                      key={item._id}
                      className={
                        "border-t transition-colors duration-300 " +
                        (isDark
                          ? "border-[#2c3250] hover:bg-[#1E2331]"
                          : "border-gray-200 hover:bg-gray-50")
                      }
                    >
                      <td className="px-4 py-2">{item.enrollNo}</td>
                      <td className="px-4 py-2">{item.studentName}</td>
                      <td className="px-4 py-2">{item.course}</td>
                      <td className="px-4 py-2">{item.totalFees}</td>
                      <td className="px-4 py-2">{item.paidFees}</td>
                      <td className="px-4 py-2">{item.pendingFees}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                            item.pendingFees <= 0 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                            {item.pendingFees <= 0 ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button onClick={() => handleAction(item.enrollNo)} className="text-blue-500 hover:text-blue-700 flex items-center">
                          <CurrencyRupeeIcon className="h-5 w-5 mr-1" />
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))
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
            Showing {filteredData.length} of {enrolls.length} entries
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