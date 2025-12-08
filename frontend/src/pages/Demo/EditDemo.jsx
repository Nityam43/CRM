import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useTheme } from "../../ThemeContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const EditDemo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [demoData, setDemoData] = useState({
        studentName: "",
        firstMobile: "",
        secondMobile: "",
        course: "",
        reference: "",
        leadDate: "",
        time: "",
        note: "",
        status: "Demo",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDemo = async () => {
            try {
                            const response = await api.get(`/demo/${id}`);
                            const data = response.data;
                
                            // Ensure all expected fields are present
                            const sanitizedData = {
                                studentName: data.studentName || "",
                                firstMobile: data.firstMobile || "",
                                secondMobile: data.secondMobile || "",
                                course: data.course || "",
                                reference: data.reference || "",
                                leadDate: data.leadDate ? new Date(data.leadDate).toISOString().split('T')[0] : "",
                                time: data.time || "",
                                note: data.note || "",
                                status: data.status || "Demo",
                            };
                
                            setDemoData(sanitizedData);            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDemo();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDemoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sanitize demoData before sending
            const sanitizedDemoData = { ...demoData };
            for (const key in sanitizedDemoData) {
                if (sanitizedDemoData[key] === null || sanitizedDemoData[key] === undefined) {
                    sanitizedDemoData[key] = '';
                }
            }
            await api.put(`/demo/${id}`, sanitizedDemoData);
            navigate("/demo/list");
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    if (loading) {
        return <div className="text-center p-6">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-6 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex-1 px-4 sm:px-6 py-6">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className={`p-2 rounded-full transition-colors ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                    >
                        <ArrowLeftIcon className={`h-6 w-6 ${isDark ? "text-gray-300" : "text-gray-600"}`} />
                    </button>
                    <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                        Edit Demo
                    </h1>
                </div>

                {/* Form Card */}
                <div className={`rounded-xl p-6 sm:p-8 ${isDark ? "bg-[#232941]" : "bg-white shadow-lg"}`}>
                    <div className={`border-b pb-4 mb-6 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                        <h2 className={`text-xl font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                            Demo Information
                        </h2>
                        <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            Update the details for this demo session.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                            {/* Student Name */}
                            <div>
                                <label htmlFor="studentName" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Student Name</label>
                                <input
                                    type="text"
                                    name="studentName"
                                    id="studentName"
                                    value={demoData.studentName}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDark ? "bg-[#1E2331] border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                />
                            </div>

                            {/* Course */}
                            <div>
                                <label htmlFor="course" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Course</label>
                                <input
                                    type="text"
                                    name="course"
                                    id="course"
                                    value={demoData.course}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDark ? "bg-[#1E2331] border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                />
                            </div>

                            {/* First Mobile */}
                            <div>
                                <label htmlFor="firstMobile" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Contact 1</label>
                                <input
                                    type="tel"
                                    name="firstMobile"
                                    id="firstMobile"
                                    value={demoData.firstMobile}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDark ? "bg-[#1E2331] border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                />
                            </div>

                            {/* Second Mobile */}
                            <div>
                                <label htmlFor="secondMobile" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Contact 2</label>
                                <input
                                    type="tel"
                                    name="secondMobile"
                                    id="secondMobile"
                                    value={demoData.secondMobile}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDark ? "bg-[#1E2331] border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                />
                            </div>

                            {/* Lead Date */}
                            <div>
                                <label htmlFor="leadDate" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Date</label>
                                <input
                                    type="date"
                                    name="leadDate"
                                    id="leadDate"
                                    value={demoData.leadDate}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDark ? "bg-[#1E2331] border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                />
                            </div>

                            {/* Time */}
                            <div>
                                <label htmlFor="time" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Time</label>
                                <input
                                    type="text"
                                    name="time"
                                    id="time"
                                    value={demoData.time}
                                    onChange={handleChange}
                                    placeholder="e.g., 02:30 PM"
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDark ? "bg-[#1E2331] border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                />
                            </div>
                            
                            {/* Reference */}
                            <div className="md:col-span-2">
                                <label htmlFor="reference" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Reference</label>
                                <input
                                    type="text"
                                    name="reference"
                                    id="reference"
                                    value={demoData.reference}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDark ? "bg-[#1E2331] border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                />
                            </div>

                            {/* Note */}
                            <div className="md:col-span-2">
                                <label htmlFor="note" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Note</label>
                                <textarea
                                    name="note"
                                    id="note"
                                    value={demoData.note}
                                    onChange={handleChange}
                                    rows="4"
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${isDark ? "bg-[#1E2331] border-gray-600 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
                                ></textarea>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={`flex items-center justify-end gap-x-4 pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 bg-gray-100 hover:bg-gray-200"}`}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditDemo;
