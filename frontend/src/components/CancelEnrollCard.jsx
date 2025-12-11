import { useTheme } from "../ThemeContext";

const CancelEnrollCard = ({ enroll, onRestore, onDelete }) => {
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
        <h3 className="text-lg font-bold">{enroll.studentName}</h3>
        <span className="text-sm font-semibold">{enroll.enrollNo}</span>
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
          {enroll.firstMobile}
          {enroll.secondMobile && `, ${enroll.secondMobile}`}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Enroll Date:
          </span>{" "}
          {formatDate(enroll.enrollDate)}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Course:
          </span>{" "}
          {enroll.course}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Course Fees:
          </span>{" "}
          {enroll.courseFees}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Teacher:
          </span>{" "}
          {enroll.teacherName}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Time:
          </span>{" "}
          {enroll.time}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Reason:
          </span>{" "}
          {enroll.reason}
        </p>
      </div>
      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          onClick={() => onRestore(enroll)}
          className="text-green-400 border border-green-500 px-3 py-1 rounded text-xs hover:bg-green-500 hover:text-white"
        >
          Restore
        </button>
        <button
          onClick={() => onDelete(enroll)}
          className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CancelEnrollCard;
