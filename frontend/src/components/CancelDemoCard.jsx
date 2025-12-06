import { useTheme } from "../ThemeContext";

const CancelDemoCard = ({ demo, onRestore, onDelete }) => {
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
        <h3 className="text-base sm:text-lg font-bold">{demo.name}</h3>
        <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-red-500 text-white">
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
          {demo.contact1}
          {demo.contact2 && `, ${demo.contact2}`}
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
            Demo Date:
          </span>{" "}
          {demo.demoDate}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Reason:
          </span>{" "}
          {demo.reason}
        </p>
      </div>
      <div className="flex justify-end items-center mt-4 gap-2">
        <button
          onClick={() => onRestore(demo)}
          className="text-green-400 border border-green-500 px-3 py-1 rounded text-xs hover:bg-green-500 hover:text-white"
        >
          Restore
        </button>
        <button
          onClick={() => onDelete(demo)}
          className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CancelDemoCard;
