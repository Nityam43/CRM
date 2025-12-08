import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { useState, useEffect } from "react";
import AddListItemModal from "../../components/AddListItemModal";
import api from "../../api/axios";

const EditDemo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItemType, setModalItemType] = useState("");

  const [referenceOptions, setReferenceOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const fetchDemo = async () => {
      try {
        const response = await api.get(`/demo/${id}`);
        const demoData = response.data;
        setFormData({
          studentName: demoData.studentName || "",
          firstMobile: demoData.firstMobile || "",
          secondMobile: demoData.secondMobile || "",
          course: demoData.course || "",
          reference: demoData.reference || "",
          leadDate: demoData.leadDate
            ? new Date(demoData.leadDate).toISOString().split("T")[0]
            : "",
          time: demoData.time || "",
          note: demoData.note || "",
          status: demoData.status || "Demo",
        });
      } catch (error) {
        console.error("Error fetching demo data", error);
      }
    };

    if (id) {
      fetchDemo();
    }
  }, [id]);

  const fetchListItems = async (type, setter) => {
    try {
      const response = await api.get(`/listItem/list?type=${type}`);
      setter(response.data.data.map((item) => item.name));
    } catch (error) {
      console.error(`Error fetching ${type} list items`, error);
    }
  };

  useEffect(() => {
    fetchListItems("Reference", setReferenceOptions);
    fetchListItems("Course", setCourseOptions);
  }, []);

  const handleOpenModal = (itemType) => {
    setModalItemType(itemType);
    setIsModalOpen(true);
  };

  const handleAddItem = async (itemType, newItem) => {
    try {
      await api.post("/listItem/add", { name: newItem, type: itemType });
      switch (itemType) {
        case "Reference":
          fetchListItems("Reference", setReferenceOptions);
          break;
        case "Course":
          fetchListItems("Course", setCourseOptions);
          break;
        default:
          break;
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error adding ${itemType}`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/demo/${id}`, formData);
      navigate(-1);
    } catch (error) {
      console.error("Error updating demo", error);
    }
  };

  return (
    <div className="flex-1 flex justify-center px-4 sm:px-8 py-8">
      <div className="w-full max-w-6xl px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>

        <h2
          className={
            "text-3xl font-bold mb-4 transition-colors duration-300 " +
            (isDark ? "text-white" : "text-gray-900")
          }
        >
          Edit Demo
        </h2>

        <div
          className={
            "rounded-xl p-4 sm:p-6 transition-colors duration-300 " +
            (isDark ? "bg-[#232941]" : "bg-white shadow")
          }
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Top section title */}
            <h3
              className={
                "text-xl font-semibold mb-2 transition-colors duration-300 " +
                (isDark ? "text-white" : "text-gray-900")
              }
            >
              Edit Demo
            </h3>

            {/* GRID 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Name */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Student Name:
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Student Name"
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-white border-[#2c3250]"
                      : "bg-white text-gray-900 border-gray-300")
                  }
                />
              </div>

              {/* Course */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    className={
                      "block text-sm font-medium transition-colors duration-300 " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    Course:
                  </label>
                  <button
                    type="button"
                    onClick={() => handleOpenModal("Course")}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    Add List <span className="text-lg leading-none">+</span>
                  </button>
                </div>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                      : "bg-white text-gray-800 border-gray-300")
                  }
                >
                  <option value="">Select Course</option>
                  {courseOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* First Mobile */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  First Mobile No:
                </label>
                <div
                  className={
                    "flex items-center rounded border px-3 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] border-[#2c3250]"
                      : "bg-white border-gray-300")
                  }
                >
                  <span
                    className={
                      "mr-2 transition-colors duration-300 " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    name="firstMobile"
                    value={formData.firstMobile}
                    onChange={handleChange}
                    placeholder="Enter First Mobile"
                    className={
                      "flex-1 bg-transparent py-2 focus:outline-none " +
                      (isDark ? "text-white" : "text-gray-900")
                    }
                  />
                </div>
              </div>

              {/* Second Mobile */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Second Mobile No:
                </label>
                <div
                  className={
                    "flex items-center rounded border px-3 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] border-[#2c3250]"
                      : "bg-white border-gray-300")
                  }
                >
                  <span
                    className={
                      "mr-2 transition-colors duration-300 " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    name="secondMobile"
                    value={formData.secondMobile}
                    onChange={handleChange}
                    placeholder="Enter Second Mobile"
                    className={
                      "flex-1 bg-transparent py-2 focus:outline-none " +
                      (isDark ? "text-white" : "text-gray-900")
                    }
                  />
                </div>
              </div>

              {/* Lead Date */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Lead Date:
                </label>
                <input
                  type="date"
                  name="leadDate"
                  value={formData.leadDate}
                  onChange={handleChange}
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                      : "bg-white text-gray-800 border-gray-300")
                  }
                />
              </div>

              {/* Time */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Time:
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="e.g., 02:30 PM"
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-white border-[#2c3250]"
                      : "bg-white text-gray-900 border-gray-300")
                  }
                />
              </div>
            </div>

            {/* GRID 2 */}
            <div className="border-t border-[#2c3250] pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reference */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className={
                        "block text-sm font-medium transition-colors duration-300 " +
                        (isDark ? "text-gray-300" : "text-gray-700")
                      }
                    >
                      Reference:
                    </label>
                    <button
                      type="button"
                      onClick={() => handleOpenModal("Reference")}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Reference</option>
                    {referenceOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Note + Submit */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Note:
                </label>
                <textarea
                  rows="4"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Enter message here..."
                  className={
                    "w-full px-4 py-2 rounded border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-white border-[#2c3250]"
                      : "bg-white text-gray-900 border-gray-300")
                  }
                ></textarea>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors duration-200"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AddListItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemType={modalItemType}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default EditDemo;
