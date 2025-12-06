import { TrashIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../ThemeContext";

const CancelCard = ({ enquiry, onDelete }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={
        "rounded-lg p-4 mb-4 " +
        (isDark ? "bg-[#232941] text-white" : "bg-white shadow-md")
      }
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{enquiry.studentName}</h3>
        <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-red-500 text-white">
          {enquiry.status}
        </span>
      </div>
      <div className="text-sm space-y-1">
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Contact:
          </span>{" "}
          {enquiry.firstMobile}
          {enquiry.secondMobile && `, ${enquiry.secondMobile}`}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Course:
          </span>{" "}
          {enquiry.education}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Enquiry Date:
          </span>{" "}
          {new Date(enquiry.leadDate).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={() => onDelete(enquiry._id)}
          className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white flex items-center gap-1"
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default CancelCard;
