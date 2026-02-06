import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolls } from "../../redux/thunks";
import { ArrowLeftIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../ThemeContext";
import "../../print.css";

const FeesReceipt = () => {
  const { enrollNo, paymentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { enrolls, status } = useSelector((state) => state.enrolls);
  const enrollment = enrolls.find((e) => e.enrollNo === enrollNo) || null;

  useEffect(() => {
    if (enrolls.length === 0) {
      dispatch(fetchEnrolls());
    }
  }, [dispatch, enrolls.length]);

  const handlePrint = () => {
    window.print();
  };

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
        Receipt not found.
      </div>
    );
  }

  const { studentName, course, totalFees, paidFees, pendingFees, payments } =
    enrollment;

  const payment = paymentId
    ? payments.find((p) => p._id === paymentId)
    : payments && payments.length > 0
    ? payments[payments.length - 1]
    : null;

  const paymentAmount = payment ? payment.amount : 0;
  const baseAmount = paymentAmount / 1.18;
  const sgst = baseAmount * 0.09;
  const cgst = baseAmount * 0.09;

  const paymentIndex = payment ? payments.indexOf(payment) + 1 : 0;

  return (
    <div className="flex-1 bg-white text-black px-0 py-0">
      <div className="max-w-5xl mx-auto">
        {/* Controls (hidden on print) */}
        <div className="flex justify-between items-center px-4 pt-4 pb-2 print-hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            <span className="text-sm">Back</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            <PrinterIcon className="h-5 w-5 mr-2" />
            Print
          </button>
        </div>

        <div id="receipt">
          {/* Top title */}
          <div className="text-center font-bold text-lg py-2">INVOICE</div>

          {/* Header band with light gray bg */}
          <div className="flex items-center px-6 py-4 bg-gray-200">
            {/* Left: logo + invoice info */}
            <div className="flex items-center">
              <div className="flex flex-col items-start">
                <img
                  src="/simba_logo.png"
                  alt="SIMBA INSTITUTE"
                  className="h-24 w-40 object-contain"
                />

                <div className="mt-3 text-xs">
                  <p className="font-semibold">
                    Invoice No: <span className="font-normal">{enrollNo}</span>
                  </p>
                  <p className="mt-1">
                    Name: <span className="font-semibold">{studentName}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: heading block */}
            <div className="ml-auto text-right text-xs leading-4">
              <p className="font-bold text-sm text-[#f37021]">
                SIMBA INFOTECH AND INSTITUTE LLP
              </p>
              <p>406, MBH-1, Sarthana Jakatnaka,</p>
              <p>Surat, Gujarat. - 395006</p>
              <p className="mt-1">
                DATE:{" "}
                <span className="font-semibold">
                  {payment
                    ? new Date(payment.paymentDate).toLocaleDateString()
                    : ""}
                </span>
              </p>
              <p className="mt-1">
                GST NO:{" "}
                <span className="font-semibold">
                  {payment?.gstNo || "No GST No available"}
                </span>
              </p>
            </div>
          </div>

          {/* BODY */}
          <div className="px-6 pt-4 pb-8 text-xs">
            {/* Course + tax table */}
            <table className="w-full border-t border-b border-gray-300">
              <thead className="bg-gray-200">
                <tr className="text-[11px]">
                  <th className="w-10 text-left py-2">NO.</th>
                  <th className="text-left py-2">COURSE</th>
                  <th className="text-right py-2">FEES</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr>
                  <td className="py-2 border-b border-gray-200">1</td>
                  <td className="py-2 border-b border-gray-200">{course}</td>
                  <td className="py-2 text-right border-b border-gray-200">
                    {Number(baseAmount).toFixed(2)}
                  </td>
                </tr>

                {/* empty space row */}
                <tr>
                  <td className="py-4" colSpan={3}></td>
                </tr>

                {/* SGST / CGST / TOTAL with only bottom borders */}
                <tr>
                  <td></td>
                  <td className="py-1 text-right font-semibold border-b border-gray-200">
                    SGST (9%) :
                  </td>
                  <td className="py-1 text-right border-b border-gray-200">
                    {Number(sgst).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1 text-right font-semibold border-b border-gray-200">
                    CGST (9%) :
                  </td>
                  <td className="py-1 text-right border-b border-gray-200">
                    {Number(cgst).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-2 text-right font-bold border-b border-gray-300">
                    Paid Amount :
                  </td>
                  <td className="py-2 text-right font-bold border-b border-gray-300">
                    {Number(paymentAmount).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-2 text-right font-bold border-b border-gray-300">
                    TOTAL :
                  </td>
                  <td className="py-2 text-right font-bold border-b border-gray-300">
                    {Number(totalFees).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-2 text-right font-bold border-b border-gray-300">
                    PAID :
                  </td>
                  <td className="py-2 text-right font-bold border-b border-gray-300">
                    {Number(paidFees).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-2 text-right font-bold border-b border-gray-300">
                    PENDING :
                  </td>
                  <td className="py-2 text-right font-bold border-b border-gray-300">
                    {Number(pendingFees).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Installment / remark */}
            <div className="mt-6 text-[11px]">
              <p className="font-semibold">
                Installment No:{" "}
                <span className="font-normal">
                  {String(paymentIndex).padStart(2, "0")}
                </span>
              </p>
              <p className="mt-3">
                <span className="font-semibold">Remark :</span>{" "}
                {payment?.paymentType}
              </p>
            </div>

            {/* Terms */}
            <div className="mt-8 mb-6 text-[10px] leading-4">
              <p className="font-bold mb-1">TERMS &amp; CONDITION :</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>All Subject to Surat Jurisdiction.</li>
                <li>
                  Service Tax and Other tax liabilities will be additional.
                </li>
                <li>Payment will not pay return to you for any condition.</li>
                <li>The Company will able to decide the last descision.</li>
                <li>
                  I fully understand that the amount I have paid either partial
                  or full is absolutely non-refundable under any circumstances
                  whatsoever.
                </li>
                <li>
                  I understand that on major national / regional holidays the
                  Institute office premise will remain closed.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesReceipt;
