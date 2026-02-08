import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../ThemeContext";
import { fetchFees, fetchExpenses, addExpense, updateExpense, deleteExpense } from "../../redux/thunks";
import AddExpenseModal from "../../components/AddExpenseModal";
import { PencilIcon, TrashIcon, PlusIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";

const IncomeExpense = () => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { fees } = useSelector((state) => state.fees);
    const { expenses } = useSelector((state) => state.expenses);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(fetchFees());
        dispatch(fetchExpenses());
    }, [dispatch]);

    // Calculate Totals
    const totalIncome = fees.reduce((acc, fee) => acc + (Number(fee.amount) || 0), 0);
    const totalExpenses = expenses.reduce((acc, expense) => acc + (Number(expense.amount) || 0), 0);
    const netProfit = totalIncome - totalExpenses;

    // Filter and Pagination
    const filteredExpenses = expenses.filter(expense =>
        expense.name.toLowerCase().includes(search.toLowerCase()) ||
        expense.category.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

    const handleAddExpense = (data) => {
        dispatch(addExpense(data));
    };

    const handleUpdateExpense = (data) => {
        if (editingExpense) {
            dispatch(updateExpense({ id: editingExpense._id, expenseData: data }));
            setEditingExpense(null);
        }
    };

    const handleDeleteExpense = (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            dispatch(deleteExpense(id));
        }
    };

    const openAddModal = () => {
        setEditingExpense(null);
        setIsModalOpen(true);
    };

    const openEditModal = (expense) => {
        setEditingExpense(expense);
        setIsModalOpen(true);
    };

    return (
        <div className={`p-6 min-h-screen ${isDark ? "bg-[#0f172a] text-white" : "bg-gray-50 text-gray-900"}`}>
            <h1 className="text-2xl font-bold mb-6">Net Profit</h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className={`p-6 rounded-xl shadow-lg border-l-4 border-l-green-500 ${isDark ? "bg-[#1B2136]" : "bg-white"}`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400 font-semibold mb-1">Total Income</p>
                            <p className="text-2xl font-bold text-green-500">₹ {totalIncome.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                             <CurrencyRupeeIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className={`p-6 rounded-xl shadow-lg border-l-4 border-l-red-500 ${isDark ? "bg-[#1B2136]" : "bg-white"}`}>
                    <div className="flex justify-between items-center">
                         <div>
                            <p className="text-sm text-gray-400 font-semibold mb-1">Total Expenses</p>
                            <p className="text-2xl font-bold text-red-500">₹ {totalExpenses.toLocaleString()}</p>
                        </div>
                         <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                             <CurrencyRupeeIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className={`p-6 rounded-xl shadow-lg border-l-4 ${netProfit >= 0 ? "border-l-blue-500" : "border-l-orange-500"} ${isDark ? "bg-[#1B2136]" : "bg-white"}`}>
                     <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400 font-semibold mb-1">Net Profit</p>
                            <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-blue-500" : "text-orange-500"}`}>
                                ₹ {netProfit.toLocaleString()}
                            </p>
                        </div>
                         <div className={`p-3 rounded-full ${netProfit >= 0 ? "bg-blue-500/10 text-blue-500" : "bg-orange-500/10 text-orange-500"}`}>
                             <CurrencyRupeeIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold">Expenses</h2>
                 <button
                    onClick={openAddModal}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                 >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Expenses
                 </button>
            </div>

            {/* Expenses Table */}
            <div className={`rounded-xl shadow-lg overflow-hidden border ${isDark ? "bg-[#1B2136] border-[#2c3250]" : "bg-white border-gray-200"}`}>
                 <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                     <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Show</span>
                        <select
                            className={`px-2 py-1 rounded border text-sm focus:outline-none ${isDark ? "bg-[#232941] border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                            disabled
                        >
                            <option>10</option>
                        </select>
                        <span className="text-sm text-gray-400">entries</span>
                     </div>
                     <div className="flex items-center gap-2">
                         <span className="text-sm text-gray-400">Search:</span>
                         <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`px-3 py-1 rounded border text-sm focus:outline-none focus:border-blue-500 ${isDark ? "bg-[#232941] border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-900"}`}
                         />
                     </div>
                 </div>

                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className={`uppercase text-xs font-semibold ${isDark ? "bg-[#15192B] text-gray-400" : "bg-gray-100 text-gray-600"}`}>
                            <tr>
                                <th className="px-6 py-3">No</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Payment Method</th>
                                <th className="px-6 py-3">Create Date</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                             {currentExpenses.length > 0 ? (
                                currentExpenses.map((expense, index) => (
                                    <tr key={expense._id} className={`hover:bg-opacity-50 transition-colors ${isDark ? "hover:bg-[#232941]" : "hover:bg-gray-50"}`}>
                                        <td className="px-6 py-4">{startIndex + index + 1}</td>
                                        <td className="px-6 py-4 font-medium">{expense.name}</td>
                                        <td className="px-6 py-4 text-yellow-500 font-medium">{expense.category}</td>
                                        <td className="px-6 py-4 font-medium">₹ {expense.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                expense.paymentMethod === 'Cash' ? 'bg-green-500/10 text-green-500' :
                                                expense.paymentMethod === 'Online' ? 'bg-blue-500/10 text-blue-500' :
                                                'bg-purple-500/10 text-purple-500'
                                            }`}>
                                                {expense.paymentMethod}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">{new Date(expense.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-yellow-500">{new Date(expense.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-3">
                                                <button onClick={() => openEditModal(expense)} className="text-blue-500 hover:text-blue-400 transition-colors">
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleDeleteExpense(expense._id)} className="text-red-500 hover:text-red-400 transition-colors">
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                             ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                        No data available in table
                                    </td>
                                </tr>
                             )}
                        </tbody>
                    </table>
                 </div>

                 {/* Pagination */}
                 <div className="p-4 border-t border-gray-700 flex justify-between items-center">
                     <p className="text-sm text-gray-400">
                        Showing {currentExpenses.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredExpenses.length)} of {filteredExpenses.length} entries
                     </p>
                     <div className="flex gap-2">
                         <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded text-sm ${isDark ? "bg-[#232941] text-gray-300 hover:bg-[#2c3250]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} disabled:opacity-50`}
                         >
                            Previous
                         </button>
                         <button
                             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                             disabled={currentPage === totalPages || totalPages === 0}
                             className={`px-3 py-1 rounded text-sm ${isDark ? "bg-[#232941] text-gray-300 hover:bg-[#2c3250]" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} disabled:opacity-50`}
                         >
                            Next
                         </button>
                     </div>
                 </div>
            </div>

            <AddExpenseModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                onSave={editingExpense ? handleUpdateExpense : handleAddExpense}
                initialData={editingExpense}
            />
        </div>
    );
};

export default IncomeExpense;
