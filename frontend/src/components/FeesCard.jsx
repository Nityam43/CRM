import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../ThemeContext";

const FeesCard = ({ fee, sgst, cgst, onAction, onReceipt, onPayments }) => { // fee is an enrollment object
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
        <h3 className="text-lg font-bold">{fee.studentName}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            fee.pendingFees <= 0 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
        }`}>
            {fee.pendingFees <= 0 ? 'Paid' : 'Pending'}
        </span>
      </div>
      <div className="text-sm space-y-1">
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Enroll No:
          </span>{" "}
          {fee.enrollNo}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Course:
          </span>{" "}
          {fee.course}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Total Fees:
          </span>{" "}
          {(fee.totalFees || 0).toFixed(2)}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            SGST:
          </span>{" "}
          {sgst.toFixed(2)}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            CGST:
          </span>{" "}
          {cgst.toFixed(2)}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Paid Fees:
          </span>{" "}
          {(fee.paidFees || 0).toFixed(2)}
        </p>
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Pending Fees:
          </span>{" "}
          {(fee.pendingFees || 0).toFixed(2)}
        </p>
      </div>
      <div className="flex justify-end items-center mt-4 gap-2">
        <button onClick={onAction} className="flex items-center text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white">
            <CurrencyRupeeIcon className="h-4 w-4 mr-1" />
            Pay
        </button>
        <button onClick={onReceipt} className="flex items-center text-green-400 border border-green-500 px-3 py-1 rounded text-xs hover:bg-green-500 hover:text-white">
            Receipt
        </button>
        <button onClick={onPayments} className="flex items-center text-purple-400 border border-purple-500 px-3 py-1 rounded text-xs hover:bg-purple-500 hover:text-white">
            Payments
        </button>
      </div>
    </div>
  );
};

export default FeesCard;