import { useMediaQuery } from "react-responsive";
import { useTheme } from "../ThemeContext";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const tasks = [
    {
      id: 1,
      title: "Follow up with John",
      status: "Pending",
      dueDate: "2025-11-27",
    },
    {
      id: 2,
      title: "Send proposal to Jane",
      status: "Completed",
      dueDate: "2025-11-25",
    },
  ];

  return (
    <div className="flex-1 p-4 sm:p-8">
      <h2
        className={
          "text-3xl font-bold mb-4 " + (isDark ? "text-white" : "text-gray-900")
        }
      >
        Tasks
      </h2>
      {isMobile ? (
        <div>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div
          className={
            "rounded-xl overflow-hidden " +
            (isDark ? "bg-[#232941]" : "bg-white shadow-md")
          }
        >
          <table className="w-full">
            <thead>
              <tr className={isDark ? "bg-[#1E2331]" : "bg-gray-100"}>
                <th
                  className={
                    "px-6 py-3 text-left font-semibold " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Title
                </th>
                <th
                  className={
                    "px-6 py-3 text-left font-semibold " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 py-3 text-left font-semibold " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className={
                    "border-t transition " +
                    (isDark
                      ? "border-[#2c3250] hover:bg-[#1E2331]"
                      : "border-gray-200 hover:bg-gray-50")
                  }
                >
                  <td
                    className={
                      "px-6 py-4 " + (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {task.title}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        task.status === "Completed"
                          ? "bg-green-600 text-white"
                          : "bg-yellow-600 text-white"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td
                    className={
                      "px-6 py-4 " + (isDark ? "text-gray-200" : "text-gray-800")
                    }
                  >
                    {task.dueDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tasks;
