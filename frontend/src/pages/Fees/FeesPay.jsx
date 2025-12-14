import { useState, useEffect } from "react";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { addFee, updateEnroll, deleteFee, fetchEnrolls } from "../../redux/thunks";

const FeesPay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [enrollNo, setEnrollNo] = useState("");
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [payAmount, setPayAmount] = useState("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [gstNo, setGstNo] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [note, setNote] = useState("");
  const [bankName, setBankName] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  // State for editing total fees
  const [isEditingFees, setIsEditingFees] = useState(false);
  const [newTotalFees, setNewTotalFees] = useState("");
  const [feeEditLoading, setFeeEditLoading] = useState(false);

  const performSearch = async (searchEnrollNo) => {
    if (!searchEnrollNo) return;
    setLoading(true);
    setError(null);
    setEnrollment(null);
    try {
      const response = await api.get(`/enroll/enrollno/${searchEnrollNo}`);
      setEnrollment(response.data);
      setNote(response.data.note || "");
      setNewTotalFees(response.data.totalFees);
    } catch (err) {
      setError("Enrollment not found");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const enrollNoFromUrl = params.get('enrollNo');
    if (enrollNoFromUrl) {
        setEnrollNo(enrollNoFromUrl);
        performSearch(enrollNoFromUrl);
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(enrollNo);
  };

  const handleFeeSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    const paymentData = {
      amount: Number(payAmount),
      paymentType,
      gstNo,
      paymentDate,
      reminderDate,
      note,
      bankName,
      chequeNo,
      chequeDate,
    };

    try {
      const updatedEnrollment = await dispatch(addFee({ id: enrollment._id, paymentData })).unwrap();
      setEnrollment(updatedEnrollment);
      await dispatch(fetchEnrolls());
      // Clear payment form
      setPayAmount("");
      setPaymentType("Cash");
      setBankName("");
      setChequeNo("");
      setChequeDate("");
      setPaymentDate("");
    } catch (err) {
      setError("Failed to submit fees. Please try again.");
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleFeeEditSave = async () => {
    setFeeEditLoading(true);
    setError(null);
    try {
        const updated = await dispatch(updateEnroll({
            id: enrollment._id,
            enrollData: { totalFees: Number(newTotalFees) }
        })).unwrap();
        setEnrollment(updated);
        setIsEditingFees(false);
    } catch (error) {
        setError("Failed to update fees.");
        console.error(error);
    } finally {
        setFeeEditLoading(false);
    }
  };

  const handleFeeEditCancel = () => {
    setIsEditingFees(false);
    setNewTotalFees(enrollment.totalFees);
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
        try {
            const updatedEnrollment = await dispatch(deleteFee({ id: enrollment._id, paymentId })).unwrap();
            setEnrollment(updatedEnrollment);
        } catch (error) {
            setError("Failed to delete payment.");
            console.error(error);
        }
    }
  };

  return (
    <div className="flex-1 px-4 sm:px-6 py-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-sm">Back</span>
      </button>

      {/* Card */}
      <div
        className={
          "max-w-4xl mx-auto rounded-xl p-4 sm:p-6 transition-colors duration-300 " +
          (isDark ? "bg-[#232941]" : "bg-white shadow")
        }
      >
        <h2
          className={
            "text-xl font-bold mb-6 transition-colors duration-300 " +
            (isDark ? "text-white" : "text-gray-900")
          }
        >
          Add Fees
        </h2>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 mb-6"
        >
          <div className="flex-1">
            <label
              className={
                "block text-sm mb-1 transition-colors duration-300 " +
                (isDark ? "text-gray-300" : "text-gray-700")
              }
            >
              Enroll No :
            </label>
            <input
              type="text"
              value={enrollNo}
              onChange={(e) => setEnrollNo(e.target.value)}
              placeholder="Enroll No"
              className={
                "w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                (isDark
                  ? "bg-[#1E2331] border-[#2c3250] text-gray-200 placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400")
              }
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {enrollment && (
          <div className="mt-6 space-y-6">
            {/* Top details card */}
            <div
              className={
                "rounded-xl border border-[#2c3250] p-5 md:p-6 " +
                (isDark
                  ? "bg-[#1B2136] text-gray-200"
                  : "bg-white text-gray-900")
              }
            >
              {/* Enroll details */}
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-2 text-sm">
                <div>
                  <p className="font-semibold mb-1">
                    Enroll No :{" "}
                    <span className="font-normal">{enrollment.enrollNo}</span>
                  </p>
                  <p className="font-semibold mb-1">
                    Email Address :{" "}
                    <span className="font-normal">{enrollment.email}</span>
                  </p>
                  <p className="font-semibold mb-1">
                    First Mobile No :{" "}
                    <span className="font-normal">
                      {enrollment.firstMobile}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-1">
                    Student :{" "}
                    <span className="font-normal">
                      {enrollment.studentName}
                    </span>
                  </p>
                  <p className="font-semibold mb-1">
                    Second Mobile No :{" "}
                    <span className="font-normal">
                      {enrollment.secondMobile}
                    </span>
                  </p>
                  <p className="font-semibold mb-1">
                    Register Date :{" "}
                    <span className="font-normal">
                      {new Date(enrollment.enrollDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>

              {/* Course status table */}
              <div className="mt-6">
                <p className="font-semibold text-sm mb-3">Course Status :</p>
                <div className="overflow-hidden rounded-md border border-[#2c3250]">
                  <table className="w-full text-xs md:text-sm">
                    <thead
                      className={
                        isDark
                          ? "bg-[#15192B] text-gray-300"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      <tr>
                        <th className="text-left py-2 px-4">Course</th>
                        <th className="text-right py-2 px-4">Fees</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? "bg-[#1B2136]" : "bg-white"}>
                      <tr className="border-t border-[#2c3250]">
                        <td className="py-2 px-4">{enrollment.course}</td>
                        <td className="py-2 px-4 text-right">
                          {enrollment.totalFees}
                        </td>
                      </tr>
                      <tr className="border-t border-[#2c3250]">
                        <td className="py-2 px-4 font-semibold">Total</td>
                        <td className="py-2 px-4 text-right font-semibold">
                          {enrollment.totalFees}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Fees Payment table */}
            <div
              className={
                "rounded-xl border border-[#2c3250] " +
                (isDark ? "bg-[#1B2136]" : "bg-white")
              }
            >
              <div className="px-5 pt-4 pb-3 border-b border-[#2c3250]">
                <p
                  className={
                    "font-semibold text-sm " +
                    (isDark ? "text-gray-200" : "text-gray-900")
                  }
                >
                  Fees Payment
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead
                    className={
                      isDark
                        ? "bg-[#15192B] text-gray-300"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    <tr>
                      <th className="py-2 px-4 text-left">Payment Date</th>
                      <th className="py-2 px-4 text-left">Fees Amount</th>
                      <th className="py-2 px-4 text-left">Payment Method</th>
                      <th className="py-2 px-4 text-left">Bank Name</th>
                      <th className="py-2 px-4 text-left">Cheque No</th>
                      <th className="py-2 px-4 text-left">Cheque Date</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody
                    className={
                      isDark ? "bg-[#1B2136] text-gray-200" : "bg-white"
                    }
                  >
                    {enrollment.payments?.length ? (
                      enrollment.payments.map((p) => (
                        <tr key={p._id} className="border-t border-[#2c3250]">
                          <td className="py-2 px-4">
                            {new Date(p.paymentDate).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4">{p.amount}</td>
                          <td className="py-2 px-4">{p.paymentType}</td>
                          <td className="py-2 px-4">{p.bankName}</td>
                          <td className="py-2 px-4">{p.chequeNo}</td>
                          <td className="py-2 px-4">
                            {p.chequeDate
                              ? new Date(p.chequeDate).toLocaleDateString()
                              : ""}
                          </td>
                          <td className="py-2 px-4">
                            <button onClick={() => handleDeletePayment(p._id)} className="text-red-500 hover:text-red-700">
                                <TrashIcon className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-t border-[#2c3250]">
                        <td
                          className="py-3 px-4 text-center text-gray-400"
                          colSpan={7}
                        >
                          No payments yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fees Status */}
            <div
              className={
                "rounded-xl border border-[#2c3250] " +
                (isDark ? "bg-[#1B2136]" : "bg-white")
              }
            >
              <div className="flex justify-between items-center px-5 pt-4 pb-3 border-b border-[#2c3250]">
                <p
                  className={
                    "font-semibold text-sm " +
                    (isDark ? "text-gray-200" : "text-gray-900")
                  }
                >
                  Fees Status
                </p>
                {!isEditingFees && (
                  <button onClick={() => setIsEditingFees(true)} className={"text-sm flex items-center " + (isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800")}>
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead
                    className={
                      isDark
                        ? "bg-[#15192B] text-gray-300"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    <tr>
                      <th className="py-2 px-4 text-left">Course Name</th>
                      <th className="py-2 px-4 text-left">Fees</th>
                      <th className="py-2 px-4 text-left">Paid Fees</th>
                      <th className="py-2 px-4 text-left">Remaining Fees</th>
                    </tr>
                  </thead>
                  <tbody
                    className={
                      isDark ? "bg-[#1B2136] text-gray-200" : "bg-white"
                    }
                  >
                    <tr className="border-t border-[#2c3250]">
                      <td className="py-2 px-4">{enrollment.course}</td>
                      <td className="py-2 px-4">
                        {isEditingFees ? (
                            <input
                            type="number"
                            value={newTotalFees}
                            onChange={(e) => setNewTotalFees(e.target.value)}
                            className={"w-24 px-2 py-1 rounded-md border text-sm " + (isDark ? "bg-[#1E2331] border-[#2c3250] text-gray-200" : "bg-white border-gray-300 text-gray-900")}
                            />
                        ) : (
                            enrollment.totalFees
                        )}
                      </td>
                      <td className="py-2 px-4">{enrollment.paidFees}</td>
                      <td className="py-2 px-4">
                        {isEditingFees
                            ? (Number(newTotalFees) || 0) - (enrollment.paidFees || 0)
                            : enrollment.pendingFees
                        }
                        </td>
                    </tr>
                    <tr className="border-t border-[#2c3250]">
                      <td className="py-2 px-4 font-semibold">Total</td>
                      <td className="py-2 px-4 font-semibold">
                      {isEditingFees ? (
                            <input
                            type="number"
                            value={newTotalFees}
                            onChange={(e) => setNewTotalFees(e.target.value)}
                            className={"w-24 px-2 py-1 rounded-md border text-sm " + (isDark ? "bg-[#1E2331] border-[#2c3250] text-gray-200" : "bg-white border-gray-300 text-gray-900")}
                            />
                        ) : (
                            enrollment.totalFees
                        )}
                      </td>
                      <td className="py-2 px-4 font-semibold">
                        {enrollment.paidFees}
                      </td>
                      <td className="py-2 px-4 font-semibold">
                        {isEditingFees
                            ? (Number(newTotalFees) || 0) - (enrollment.paidFees || 0)
                            : enrollment.pendingFees
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {isEditingFees && (
                <div className="p-4 flex justify-end gap-3">
                    <button onClick={handleFeeEditCancel} className={"px-4 py-1 rounded-md text-sm " + (isDark ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300")}>Cancel</button>
                    <button onClick={handleFeeEditSave} disabled={feeEditLoading} className="px-4 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400">
                        {feeEditLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
              )}
            </div>

            {/* Fees Pay form (bottom card) */}
            <form
              onSubmit={handleFeeSubmit}
              className={
                "rounded-xl border border-[#2c3250] p-5 md:p-6 " +
                (isDark ? "bg-[#1B2136]" : "bg-white")
              }
            >
              <p
                className={
                  "font-semibold text-sm mb-4 " +
                  (isDark ? "text-gray-200" : "text-gray-900")
                }
              >
                Fees Pay
              </p>

              <div className="grid md:grid-cols-2 gap-5 text-sm">
                {/* Payment Type */}
                <div className="md:col-span-2">
                  <label
                    className={
                      isDark ? "text-gray-300 text-xs" : "text-gray-700 text-xs"
                    }
                  >
                    Select Payment Type :
                  </label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className={
                      "mt-1 w-full px-4 py-2 rounded-md border text-sm " +
                      (isDark
                        ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                        : "bg-[#1f2937]/5 border-gray-300 text-gray-900")
                    }
                  >
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>Online</option>
                  </select>
                </div>

                {paymentType === "Cheque" && (
                  <>
                    <div>
                      <label
                        className={
                          isDark
                            ? "text-gray-300 text-xs"
                            : "text-gray-700 text-xs"
                        }
                      >
                        Bank Name :
                      </label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className={
                          "mt-1 w-full px-4 py-2 rounded-md border text-sm " +
                          (isDark
                            ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                            : "bg-white border-gray-300 text-gray-900")
                        }
                      />
                    </div>
                    <div>
                      <label
                        className={
                          isDark
                            ? "text-gray-300 text-xs"
                            : "text-gray-700 text-xs"
                        }
                      >
                        Cheque No :
                      </label>
                      <input
                        type="text"
                        value={chequeNo}
                        onChange={(e) => setChequeNo(e.target.value)}
                        className={
                          "mt-1 w-full px-4 py-2 rounded-md border text-sm " +
                          (isDark
                            ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                            : "bg-white border-gray-300 text-gray-900")
                        }
                      />
                    </div>
                    <div>
                      <label
                        className={
                          isDark
                            ? "text-gray-300 text-xs"
                            : "text-gray-700 text-xs"
                        }
                      >
                        Cheque Date :
                      </label>
                      <input
                        type="date"
                        value={chequeDate}
                        onChange={(e) => setChequeDate(e.target.value)}
                        className={
                          "mt-1 w-full px-4 py-2 rounded-md border text-sm " +
                          (isDark
                            ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                            : "bg-white border-gray-300 text-gray-900")
                        }
                      />
                    </div>
                  </>
                )}

                {/* GST */}
                <div className="md:col-span-2">
                  <label
                    className={
                      isDark ? "text-gray-300 text-xs" : "text-gray-700 text-xs"
                    }
                  >
                    Student GST NO:
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    value={gstNo}
                    onChange={(e) => setGstNo(e.target.value)}
                    className={
                      "mt-1 w-full px-4 py-2 rounded-md border text-sm " +
                      (isDark
                        ? "bg-[#1E2331] border-[#2c3250] text-gray-200 placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400")
                    }
                    placeholder="Enter the 15 Digit student's gst"
                  />
                </div>

                {/* Select course */}
                <div className="md:col-span-2">
                  <label
                    className={
                      isDark ? "text-gray-300 text-xs" : "text-gray-700 text-xs"
                    }
                  >
                    Select Course :
                  </label>
                  <input
                    type="text"
                    value={enrollment.course}
                    disabled
                    className={
                      "mt-1 w-full px-4 py-2 rounded-md border text-sm " +
                      (isDark
                        ? "bg-[#1E2331] border-[#2c3250] text-gray-400"
                        : "bg-gray-100 border-gray-300 text-gray-500")
                    }
                  />
                </div>

                {/* Courses small table */}
                <div className="md:col-span-2">
                  <p
                    className={
                      "text-xs mb-1 " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    Courses :
                  </p>
                  <div className="overflow-hidden rounded-md border border-[#2c3250]">
                    <table className="w-full text-xs">
                      <thead
                        className={
                          isDark
                            ? "bg-[#15192B] text-gray-300"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        <tr>
                          <th className="py-1 px-3 text-left">Course Name</th>
                          <th className="py-1 px-3 text-left">Fees</th>
                          <th className="py-1 px-3 text-left">Reminder Fees</th>
                        </tr>
                      </thead>
                      <tbody
                        className={
                          isDark ? "bg-[#1B2136] text-gray-200" : "bg-white"
                        }
                      >
                        <tr>
                          <td className="py-1 px-3">{enrollment.course}</td>
                          <td className="py-1 px-3">{enrollment.totalFees}</td>
                          <td className="py-1 px-3">
                            {enrollment.pendingFees}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment / reminder date */}
                <div>
                  <label
                    className={
                      isDark ? "text-gray-300 text-xs" : "text-gray-700 text-xs"
                    }
                  >
                    Payment Date :
                  </label>
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className={
                      "mt-1 w-full px-4 py-2 rounded-md border text-sm " +
                      (isDark
                        ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                        : "bg-white border-gray-300 text-gray-900")
                    }
                  />
                </div>
                <div>
                  <label
                    className={
                      isDark ? "text-gray-300 text-xs" : "text-gray-700 text-xs"
                    }
                  >
                    Fees Reminder :
                  </label>
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className={
                      "mt-1 w-full px-4 py-2 rounded-md border text-sm " +
                      (isDark
                        ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                        : "bg-white border-gray-300 text-gray-900")
                    }
                  />
                </div>

                {/* Pay amount */}
                <div className="md:col-span-2">
                  <label
                    className={
                      isDark ? "text-gray-300 text-xs" : "text-gray-700 text-xs"
                    }
                  >
                    Pay Amount :
                  </label>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className={
                      "mt-1 w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 " +
                      (isDark
                        ? "bg-[#1E2331] border-[#2c3250] text-gray-200"
                        : "bg-white border-gray-300 text-gray-900")
                    }
                  />
                </div>

                {/* Note */}
                <div className="md:col-span-2">
                  <label
                    className={
                      isDark ? "text-gray-300 text-xs" : "text-gray-700 text-xs"
                    }
                  >
                    Note:
                  </label>
                  <textarea
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className={
                      "mt-1 w-full px-4 py-2 rounded-md border text-xs md:text-sm " +
                      (isDark
                        ? "bg-[#1E2331] border-[#2c3250] text-teal-300"
                        : "bg-[#0f172a] text-teal-300 border-gray-700")
                    }
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  disabled={!payAmount || submitLoading}
                  className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {submitLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeesPay;