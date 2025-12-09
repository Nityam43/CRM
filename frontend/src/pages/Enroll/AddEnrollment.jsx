import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { useState, useEffect } from "react";
import api from "../../api/axios";

const AddEnrollment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // The demo or enquiry data is passed in the location state
    const sourceData = location.state?.item;

    const [formData, setFormData] = useState({
        // Pre-filled data from demo/enquiry
        studentName: "",
        email: "",
        firstMobile: "",
        secondMobile: "",
        course: "",
        reference: "",
        counsellor: "",
        // New data for enrollment
        courseFees: "",
        teacherName: "",
        time: "",
        placementStatus: "Pending",
        // IDs to link back
        demoId: null,
        enquiryId: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (sourceData) {
            setFormData(prev => ({
                ...prev,
                studentName: sourceData.studentName || "",
                email: sourceData.email || "",
                firstMobile: sourceData.firstMobile || "",
                secondMobile: sourceData.secondMobile || "",
                course: sourceData.course || "",
                reference: sourceData.reference || "",
                counsellor: sourceData.counsellor || "",
                time: sourceData.time || "",
                // Check if it's a demo or enquiry to set the correct ID
                demoId: sourceData.status === 'Demo' ? sourceData._id : null,
                enquiryId: sourceData.status === 'Enquiry' ? sourceData._id : null,
            }));
        } else {
            console.error("No source data provided for enrollment.");
        }
    }, [sourceData, setFormData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before submission
        try {
            const res = await api.post("/enroll", formData);
            navigate("/enroll/list"); // Navigate to the enroll list after success
        } catch (err) {
            if (err.response?.status === 409) {
                setError("This student is already enrolled in this course.");
            } else {
                setError("An unexpected error occurred. Please try again.");
                console.error("Error creating enrollment:", err.response?.data || err.message);
            }
        }
    };

    if (!sourceData) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center text-white p-8">
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <p>No student data was provided to create an enrollment.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors duration-200"
                >
                    Go Back
                </button>
            </div>
        );
    }

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
                    Enroll Student
                </h2>

                <div className={"rounded-xl p-6 " + (isDark ? "bg-[#232941]" : "bg-white shadow")}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* --- Pre-filled Info --- */}
                        <div className="border-b pb-6 mb-6 border-gray-600">
                            <h3 className={"text-xl font-semibold mb-4 " + (isDark ? "text-white" : "text-gray-900")}>
                                Student Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <p><strong className="text-gray-400">Name:</strong> {formData.studentName}</p>
                                <p><strong className="text-gray-400">Email:</strong> {formData.email}</p>
                                <p><strong className="text-gray-400">Course:</strong> {formData.course}</p>
                                <p><strong className="text-gray-400">Counsellor:</strong> {formData.counsellor}</p>
                            </div>
                        </div>

                        {/* --- New Enrollment Info --- */}
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
                                Confirm Enrollment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default AddEnrollment;
