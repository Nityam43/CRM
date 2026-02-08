import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../ThemeContext";

const FeesReminderCard = ({ reminder, onViewProfile }) => {
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
        <h3 className="text-lg font-bold">{reminder.studentName}</h3>
        <span
          className={
            "inline-block px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-600 border border-red-200"
          }
        >
          Due: Rs. {reminder.pendingFees}
        </span>
      </div>
      <div className="text-sm space-y-1">
        <p>
          <span className={"font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")}>
            Enroll No:
          </span>{" "}
          {reminder.enrollNo}
        </p>
        <p>
          <span className={"font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")}>
            Course:
          </span>{" "}
          {reminder.course}
        </p>
        <p>
          <span className={"font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")}>
            Contact:
          </span>{" "}
          {reminder.contact}
        </p>
        <p>
          <span className={"font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")}>
            Reminder Date:
          </span>{" "}
          {reminder.reminderDate}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4 text-xl">
          <a
            href={`https://wa.me/${reminder.contact}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href={`sms:${reminder.contact}`} className="hover:text-sky-500">
            <FontAwesomeIcon icon={faCommentDots} />
          </a>
          <a href={`tel:${reminder.contact}`} className="hover:text-blue-500">
            <FontAwesomeIcon icon={faPhone} />
          </a>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onViewProfile(reminder)}
            className="text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeesReminderCard;
