import { useTheme } from "../ThemeContext";

const EnrollCard = ({ enroll, onEdit, onCancel }) => {
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
        <h3 className="text-lg font-bold">{enroll.name}</h3>
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
          {enroll.contact1}
          {enroll.contact2 && `, ${enroll.contact2}`}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Enroll Date:
          </span>{" "}
          {enroll.enrollDate}
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
            Reference:
          </span>{" "}
          {enroll.reference}
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
            Counsellor:
          </span>{" "}
          {enroll.counsellor}
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
            Placement:
          </span>{" "}
          <span className="inline-block px-2 py-0.5 rounded-full border border-green-500 text-green-500 text-xs">
            {enroll.placementStatus}
          </span>
        </p>
      </div>
      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          onClick={() => onEdit(enroll)}
          className="text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white"
        >
          Edit
        </button>
        <button
          onClick={() => onCancel(enroll)}
          className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EnrollCard;
