import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../ThemeContext";

const DemoReminderCard = ({ reminder, onEdit, onDone, onCancel }) => {
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
        <h3 className="text-lg font-bold">{reminder.name}</h3>
        <span
          className={
            "inline-block px-2 py-0.5 rounded-full text-xs " +
            (reminder.status === "Done"
              ? "bg-green-500 text-white"
              : "bg-yellow-500 text-black")
          }
        >
          {reminder.status}
        </span>
      </div>
      <div className="text-sm">
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Contact:
          </span>{" "}
          {reminder.contact1}
          {reminder.contact2 && `, ${reminder.contact2}`}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Course:
          </span>{" "}
          {reminder.course}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Reference:
          </span>{" "}
          {reminder.reference}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Reminder Date:
          </span>{" "}
          {reminder.reminder}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4 text-xl">
          <a
            href={`https://wa.me/${reminder.contact1}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href={`sms:${reminder.contact1}`} className="hover:text-sky-500">
            <FontAwesomeIcon icon={faCommentDots} />
          </a>
          <a href={`tel:${reminder.contact1}`} className="hover:text-blue-500">
            <FontAwesomeIcon icon={faPhone} />
          </a>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(reminder)}
            className="text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white"
          >
            Edit
          </button>
          <button
            onClick={() => onDone(reminder)}
            className="text-green-400 border border-green-500 px-3 py-1 rounded text-xs hover:bg-green-500 hover:text-white"
          >
            Done
          </button>
          <button
            onClick={() => onCancel(reminder)}
            className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoReminderCard;
