import { useTheme } from "../ThemeContext";

const TaskCard = ({ task }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={
        "rounded-lg p-4 mb-4 " +
        (isDark ? "bg-[#232941] text-white" : "bg-white shadow-md")
      }
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            task.status === "Completed"
              ? "bg-green-600 text-white"
              : "bg-yellow-600 text-white"
          }`}
        >
          {task.status}
        </span>
      </div>
      <div className="text-sm">
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Due Date:
          </span>{" "}
          {task.dueDate}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
