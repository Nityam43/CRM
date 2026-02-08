import { useTheme } from "../ThemeContext";

const WorkReminderCard = ({ reminder, onEdit, onMarkDone }) => {
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
        <h3 className="text-lg font-bold">{reminder.workName}</h3>
        <span
          className={
            "inline-block px-2 py-0.5 rounded-full text-xs " +
            (reminder.status === "Completed"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600")
          }
        >
          {reminder.status}
        </span>
      </div>
      <div className="text-sm space-y-1">
        <p>
          <span className={"font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")}>
            Person:
          </span>{" "}
          {reminder.personName}
        </p>
        <p>
          <span className={"font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")}>
            Details:
          </span>{" "}
          {reminder.details}
        </p>
        <p>
          <span className={"font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")}>
            Date:
          </span>{" "}
          {reminder.date}
        </p>
        <p>
          <span className={"font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")}>
            Reminder Date:
          </span>{" "}
          {reminder.reminderDate}
        </p>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => onEdit(reminder)}
          className="text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white"
        >
          Edit
        </button>
        <button
          onClick={() => onMarkDone(reminder)}
          className="text-green-400 border border-green-500 px-3 py-1 rounded text-xs hover:bg-green-500 hover:text-white"
        >
          Mark Done
        </button>
      </div>
    </div>
  );
};

export default WorkReminderCard;
