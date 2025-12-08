import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../ThemeContext";

const DemoCard = ({ demo, onEdit, onEnroll, onCancel, onDelete }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  return (
    <div
      className={
        "rounded-lg p-4 mb-4 " +
        (isDark ? "bg-[#232941] text-white" : "bg-white shadow-md")
      }
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{demo.studentName}</h3>
        <span
          className={
            "inline-block px-2 py-0.5 rounded-full text-xs " +
            (demo.status === "Enrolled"
              ? "bg-green-500 text-white"
              : "bg-yellow-500 text-black")
          }
        >
          {demo.status}
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
          {demo.firstMobile}
          {demo.secondMobile && `, ${demo.secondMobile}`}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Course:
          </span>{" "}
          {demo.course}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Reference:
          </span>{" "}
          {demo.reference}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Date:
          </span>{" "}
          {formatDate(demo.leadDate)}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Time:
          </span>{" "}
          {demo.time}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4 text-xl">
          <a
            href={`https://wa.me/${demo.firstMobile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href={`tel:${demo.firstMobile}`} className="hover:text-blue-500">
            <FontAwesomeIcon icon={faPhone} />
          </a>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(demo)}
            className="text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white"
          >
            Edit
          </button>
          <button
            onClick={() => onEnroll(demo)}
            className="text-green-400 border border-green-500 px-3 py-1 rounded text-xs hover:bg-green-500 hover:text-white"
          >
            Enroll
          </button>
          <button
            onClick={() => onCancel(demo._id)}
            className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete(demo._id)}
            className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoCard;