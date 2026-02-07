import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../ThemeContext";
import { useMediaQuery } from "react-responsive";
import { fetchWorks, deleteWork } from "../../redux/thunks";

const WorkList = () => {
  const dispatch = useDispatch();
  const { works, status, error } = useSelector((state) => state.works);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchWorks());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this work?")) {
      dispatch(deleteWork(id));
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return works;
    const q = search.toLowerCase();
    return works.filter((w) =>
      [w.workName, w.personName, w.details]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, works]);

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  if (status === "loading") {
    return (
      <div className={`flex-1 px-6 py-6 text-center ${isDark ? "text-white" : "text-gray-900"}`}>
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex-1 px-6 py-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 sm:px-6 py-6">
      <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        Work List
      </h2>

      <div className={`rounded-xl p-4 shadow ${isDark ? "bg-[#1E2331]" : "bg-white"}`}>
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 text-sm">
          <div className={`flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <span>Show</span>
            <select className={`px-2 py-1 rounded border ${isDark ? "bg-[#2b324a] border-gray-600" : "bg-white border-gray-300"}`}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className={`flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <span>Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`px-3 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? "bg-[#2b324a] border-gray-600 text-white" : "bg-white border-gray-300"}`}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className={`${isDark ? "bg-[#2b324a] text-gray-300" : "bg-gray-100 text-gray-700"}`}>
              <tr>
                <th className="px-4 py-3 font-semibold uppercase">No</th>
                <th className="px-4 py-3 font-semibold uppercase">Name</th>
                <th className="px-4 py-3 font-semibold uppercase">Person Name</th>
                <th className="px-4 py-3 font-semibold uppercase">Details</th>
                <th className="px-4 py-3 font-semibold uppercase">Reminder Date</th>
                <th className="px-4 py-3 font-semibold uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className={`px-4 py-6 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    No data available in table
                  </td>
                </tr>
              ) : (
                filtered.map((work, index) => (
                  <tr key={work._id} className={`transition-colors border-b ${
                    isDark
                      ? "border-gray-700 text-gray-300 hover:bg-[#2b324a]"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}>
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{work.workName}</td>
                    <td className={`px-4 py-3 font-medium ${isDark ? "text-yellow-500" : "text-gray-900"}`}>{work.personName}</td>
                    <td className={`px-4 py-3 ${isDark ? "text-yellow-500" : "text-gray-600"}`}>{work.details || "-"}</td>
                    <td className={`px-4 py-3 ${isDark ? "text-yellow-500" : "text-gray-600"}`}>{formatDate(work.reminderDate)}</td>
                    <td className="px-4 py-3 text-center">
                       <button
                        onClick={() => handleDeleteClick(work._id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between text-xs mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            <span>Showing {filtered.length} of {works.length} entries</span>
            <div className="flex gap-2 mt-2 md:mt-0">
                <button className={`px-3 py-1 rounded border ${isDark ? "bg-[#2b324a] border-gray-600" : "bg-white border-gray-300"} disabled:opacity-50`}>Previous</button>
                <button className={`px-3 py-1 rounded border ${isDark ? "bg-[#2b324a] border-gray-600" : "bg-white border-gray-300"} disabled:opacity-50`}>Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WorkList;
