import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolls } from "../../redux/thunks";
import { useTheme } from "../../ThemeContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const PaymentHistory = () => {
  const { enrollNo } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { enrolls, status } = useSelector((state) => state.enrolls);
  const [enrollment, setEnrollment] = useState(null);

  useEffect(() => {
    if (enrolls.length === 0) {
      dispatch(fetchEnrolls());
    }
  }, [dispatch, enrolls.length]);

  useEffect(() => {
    if (enrolls.length > 0) {
      const selectedEnrollment = enrolls.find((e) => e.enrollNo === enrollNo);
      setEnrollment(selectedEnrollment);
    }
  }, [enrolls, enrollNo]);

  if (status === "loading") {
    return (
      <div
        className={`text-center py-10 ${isDark ? "text-white" : "text-black"}`}
      >
        Loading...
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div
        className={`text-center py-10 ${isDark ? "text-white" : "text-black"}`}
      >
        Enrollment not found.
      </div>
    );
  }

  const { payments } = enrollment;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-sm">Back</span>
      </button>
      <h1
        className={`text-3xl font-bold mb-6 ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        Payment History for {enrollment.studentName} ({enrollNo})
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead
            className={`bg-gray-50 dark:bg-gray-700 ${
              isDark ? "text-gray-300" : "text-gray-600"
            } text-left text-sm font-semibold uppercase tracking-wider`}
          >
            <tr>
              <th className="px-5 py-3">Installment No.</th>
              <th className="px-5 py-3">Payment Date</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Payment Type</th>
              <th className="px-5 py-3">Receipt</th>
            </tr>
          </thead>
          <tbody className={isDark ? "text-gray-300" : "text-gray-700"}>
            {payments && payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-5 py-5">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-5 py-5">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-5">{payment.amount}</td>
                  <td className="px-5 py-5">{payment.paymentType}</td>
                  <td className="px-5 py-5">
                    <Link
                      to={`/fees/receipt/${enrollNo}/${payment._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Receipt
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
