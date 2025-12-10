import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDemos, fetchEnquiries, updateEnroll } from "../../redux/thunks";
import { unwrapResult } from "@reduxjs/toolkit";
import api from "../../api/axios";

const EditEnroll = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [formData, setFormData] = useState({
        studentName: "",
        email: "",
        firstMobile: "",
        secondMobile: "",
        course: "",
        reference: "",
        counsellor: "",
        courseFees: "",
        teacherName: "",
        time: "",
        placementStatus: "Pending",
        demoId: null,
        enquiryId: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnroll = async () => {
            try {
                const response = await api.get(`/enroll/${id}`);
                const enrollData = response.data;
                setFormData({
                    studentName: enrollData.studentName || "",
                    email: enrollData.email || "",
                    firstMobile: enrollData.firstMobile || "",
                    secondMobile: enrollData.secondMobile || "",
                    course: enrollData.course || "",
                    reference: enrollData.reference || "",
                    counsellor: enrollData.counsellor || "",
                    courseFees: enrollData.courseFees || "",
                    teacherName: enrollData.teacherName || "",
                    time: enrollData.time || "",
                    placementStatus: enrollData.placementStatus || "Pending",
                    demoId: enrollData.demoId,
                    enquiryId: enrollData.enquiryId,
                });
            } catch (error) {
                console.error("Error fetching enroll data", error);
            }
        };

        if (id) {
            fetchEnroll();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const resultAction = await dispatch(updateEnroll({ id, enrollData: formData }));
            unwrapResult(resultAction);
            dispatch(fetchDemos());
            dispatch(fetchEnquiries());
            navigate("/enroll/list");
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error("Error updating enrollment:", err.response?.data || err.message);
        }
    };

    return (
        <div className="flex-1 flex justify-center px-4 sm:px-8 py-8">
            <div className="w-full max-w-4xl px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back
                </button>

                <h2 className={"text-3xl font-bold mb-4 " + (isDark ? "text-white" : "text-gray-900")}>
                    Edit Enrollment
                </h2>

                <div className={"rounded-xl p-6 " + (isDark ? "bg-[#232941]" : "bg-white shadow")}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="border-b pb-6 mb-6 border-gray-600">
                            <h3 className={"text-xl font-semibold mb-4 " + (isDark ? "text-white" : "text-gray-900")}>
                                Student Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={"block text-sm font-medium mb-2 " + (isDark ? "text-gray-300" : "text-gray-700")}>
                                        Student Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleChange}
                                        className={"w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 " + (isDark ? "bg-[#1E2331] text-white border-[#2c3250]" : "bg-white text-gray-900 border-gray-300")}
                                    />
                                </div>
                                <div>
                                    <label className={"block text-sm font-medium mb-2 " + (isDark ? "text-gray-300" : "text-gray-700")}>
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={"w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 " + (isDark ? "bg-[#1E2331] text-white border-[#2c3250]" : "bg-white text-gray-900 border-gray-300")}
                                    />
                                </div>
                                <div>
                                    <label className={"block text-sm font-medium mb-2 " + (isDark ? "text-gray-300" : "text-gray-700")}>
                                        Course:
                                    </label>
                                    <input
                                        type="text"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        className={"w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 " + (isDark ? "bg-[#1E2331] text-white border-[#2c3250]" : "bg-white text-gray-900 border-gray-300")}
                                    />
                                </div>
                                <div>
                                    <label className={"block text-sm font-medium mb-2 " + (isDark ? "text-gray-300" : "text-gray-700")}>
                                        Counsellor:
                                    </label>
                                    <input
                                        type="text"
                                        name="counsellor"
                                        value={formData.counsellor}
                                        onChange={handleChange}
                                        className={"w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 " + (isDark ? "bg-[#1E2331] text-white border-[#2c3250]" : "bg-white text-gray-900 border-gray-300")}
                                    />
                                </div>
                            </div>
                        </div>

                        <h3 className={"text-xl font-semibold mb-4 " + (isDark ? "text-white" : "text-gray-900")}>
                            Enrollment Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={"block text-sm font-medium mb-2 " + (isDark ? "text-gray-300" : "text-gray-700")}>
                                    Course Fees:
                                </label>
                                <input
                                    type="number"
                                    name="courseFees"
                                    value={formData.courseFees}
                                    onChange={handleChange}
                                    placeholder="Enter course fees"
                                    required
                                    className={"w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 " + (isDark ? "bg-[#1E2331] text-white border-[#2c3250]" : "bg-white text-gray-900 border-gray-300")}
                                />
                            </div>
                            <div>
                                <label className={"block text-sm font-medium mb-2 " + (isDark ? "text-gray-300" : "text-gray-700")}>
                                    Teacher Name:
                                </label>
                                <input
                                    type="text"
                                    name="teacherName"
                                    value={formData.teacherName}
                                    onChange={handleChange}
                                    placeholder="Assign a teacher"
                                    required
                                    className={"w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 " + (isDark ? "bg-[#1E2331] text-white border-[#2c3250]" : "bg-white text-gray-900 border-gray-300")}
                                />
                            </div>
                             <div>
                                <label className={"block text-sm font-medium mb-2 " + (isDark ? "text-gray-300" : "text-gray-700")}>
                                    Lab/Class Time:
                                </label>
                                <input
                                    type="text"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    placeholder="e.g., 3:00 PM - 4:00 PM"
                                    className={"w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 " + (isDark ? "bg-[#1E2331] text-white border-[#2c3250]" : "bg-white text-gray-900 border-gray-300")}
                                />
                            </div>
                            <div>
                                <label className={"block text-sm font-medium mb-2 " + (isDark ? "text-gray-300" : "text-gray-700")}>
                                    Placement Status:
                                </label>
                                <select
                                    name="placementStatus"
                                    value={formData.placementStatus}
                                    onChange={handleChange}
                                    className={"w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 " + (isDark ? "bg-[#1E2331] text-gray-300 border-[#2c3250]" : "bg-white text-gray-800 border-gray-300")}
                                >
                                    <option>Pending</option>
                                    <option>Placement</option>
                                    <option>Not-required</option>
                                </select>
                            </div>
                        </div>
                        
                        {error && (
                            <div className="text-red-500 text-sm text-center mt-4">
                                {error}
                            </div>
                        )}
                        
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors duration-200"
                            >
                                Update Enrollment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEnroll;