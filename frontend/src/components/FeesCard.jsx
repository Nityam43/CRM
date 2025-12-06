import { useTheme } from "../ThemeContext";

const FeesCard = ({ fee }) => {
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
        <h3 className="text-lg font-bold">{fee.studentName}</h3>
        <span className="text-sm font-semibold">{fee.enrollNo}</span>
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
          {fee.contact}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Paid Fees:
          </span>{" "}
          {fee.paidFees}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Reminder Fees:
          </span>{" "}
          {fee.reminderFees}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Remaining Fees:
          </span>{" "}
          {fee.remainingFees}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Payment Date:
          </span>{" "}
          {fee.paymentDate}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Payment Method:
          </span>{" "}
          {fee.paymentMethod}
        </p>
      </div>
      <div className="flex justify-end items-center mt-4 gap-2">
        <button className="text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white">
          Print
        </button>
        <button className="text-yellow-400 border border-yellow-500 px-3 py-1 rounded text-xs hover:bg-yellow-500 hover:text-white">
          Action
        </button>
      </div>
    </div>
  );
};

export default FeesCard;
