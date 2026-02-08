import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTheme } from "../ThemeContext";

const AddExpenseModal = ({ isOpen, closeModal, onSave, initialData }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    amount: "",
    paymentMethod: "Cash",
    date: new Date().toISOString().split('T')[0],
    note: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        amount: initialData.amount || "",
        paymentMethod: initialData.paymentMethod || "Cash",
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        note: initialData.note || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        amount: "",
        paymentMethod: "Cash",
        date: new Date().toISOString().split('T')[0],
        note: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all ${
                  isDark ? "bg-[#1B2136] text-white" : "bg-white text-gray-900"
                }`}
              >
                <Dialog.Title
                  as="h3"
                  className={`text-lg font-medium leading-6 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {initialData ? "Edit Expense" : "Add Expense"}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                        isDark ? "bg-[#232941] border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                        isDark ? "bg-[#232941] border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      required
                      value={formData.amount}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                        isDark ? "bg-[#232941] border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                        isDark ? "bg-[#232941] border-gray-600 text-white" : "border-gray-300"
                      }`}
                    >
                      <option value="Cash">Cash</option>
                      <option value="Online">Online</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="date" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleChange}
                      onClick={(e) => e.target.showPicker && e.target.showPicker()}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm cursor-pointer ${
                        isDark ? "bg-[#232941] border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Note
                    </label>
                    <textarea
                      name="note"
                      rows={3}
                      value={formData.note}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                        isDark ? "bg-[#232941] border-gray-600 text-white placeholder-gray-400" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isDark
                          ? "border-gray-600 bg-transparent text-gray-300 hover:bg-gray-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {initialData ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddExpenseModal;
