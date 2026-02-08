import { useState, useEffect, useMemo } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";

import WorkReminderCard from "../../components/WorkReminderCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorks, updateWork } from "../../redux/thunks";

const WorkReminders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";


  const [search, setSearch] = useState("");
  const { works, status, error } = useSelector((state) => state.works);

  useEffect(() => {
    dispatch(fetchWorks());
  }, [dispatch]);

  const reminders = useMemo(() => {
    return works.filter(
      (w) => w.reminderDate && w.status !== "Completed" && w.status !== "Cancelled"
    );
  }, [works]);

  const filtered = useMemo(() => {
    if (!search.trim()) return reminders;
    const q = search.toLowerCase();
    return reminders.filter((w) =>
      [w.workName, w.personName, w.details].join(" ").toLowerCase().includes(q)
    );
  }, [search, reminders]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEdit = (reminder) => {
    // Assuming navigation to add page with edit state, or a dedicated edit page if it existed
    // Based on previous code analysis, we use /work/add with state
    navigate("/work/add", { state: { editWork: reminder } });
  };

  const handleMarkDone = (reminder) => {
    if (window.confirm("Mark this work as completed?")) {
      dispatch(
        updateWork({
          id: reminder._id,
          workData: { status: "Completed" },
        })
      );
    }
  };

  if (status === "loading") {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex-1 px-4 sm:px-6 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        <span className="text-sm">Back</span>
      </button>

      <h2
        className={
          "text-2xl font-bold mb-4 transition-colors duration-300 " +
          (isDark ? "text-white" : "text-gray-900")
        }
      >
        Work Reminders
      </h2>

      <div
        className={
          "rounded-xl p-4 transition-colors duration-300 " +
          (isDark ? "bg-[#232941]" : "bg-white shadow")
        }
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 text-sm">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <WorkReminderCard
                key={item._id}
                reminder={{
                  ...item,
                  reminderDate: formatDate(item.reminderDate),
                }}
                onEdit={handleEdit}
                onMarkDone={handleMarkDone}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkReminders;
