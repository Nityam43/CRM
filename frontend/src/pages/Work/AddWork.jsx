import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWork } from "../../redux/thunks";
import { useTheme } from "../../ThemeContext";

const AddWork = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    workName: "",
    personName: "",
    reminderDate: "",
    details: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.workName || !formData.personName || !formData.reminderDate) {
        setError("Please fill in all required fields");
        return;
      }
      await dispatch(addWork(formData)).unwrap();
      navigate("/work/list");
    } catch (err) {
      setError(err.message || "Failed to add work");
    }
  };

  const inputClass = isDark
    ? "bg-[#2b324a] text-white border-transparent focus:ring-2 focus:ring-blue-500"
    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500";

  return (
    <div className={`p-6 ${isDark ? "text-white" : "text-gray-900"}`}>
      <div
        className={`max-w-4xl mx-auto rounded-lg shadow-lg p-8 ${
          isDark ? "bg-[#1E2331]" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6">Add Work</h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Work Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Name :</label>
              <input
                type="text"
                name="workName"
                placeholder="Work Name"
                value={formData.workName}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border outline-none transition-all ${inputClass}`}
              />
            </div>

            {/* Person Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Person name :</label>
              <input
                type="text"
                name="personName"
                placeholder="Person Name"
                value={formData.personName}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border outline-none transition-all ${inputClass}`}
              />
            </div>
          </div>

          {/* Reminder Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Reminder Date :</label>
            <input
              type="date"
              name="reminderDate"
              placeholder="Reminder Date"
              value={formData.reminderDate}
              onChange={handleChange}
              // Using showPicker on click as per previous general improvements
              onClick={(e) => e.target.showPicker && e.target.showPicker()}
              className={`w-full p-3 rounded-lg border outline-none transition-all ${inputClass} md:w-1/2`}
            />
          </div>

          {/* Details */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Details :</label>
            <textarea
              name="details"
              placeholder="Details."
              rows="3"
              value={formData.details}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border outline-none transition-all ${inputClass}`}
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWork;
