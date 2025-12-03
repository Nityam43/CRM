import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { useState, useEffect } from "react";
import AddListItemModal from "../../components/AddListItemModal";
import api from "../../api/axios";

const AddEnquiry = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItemType, setModalItemType] = useState("");

  const [referenceOptions, setReferenceOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [hobbiesOptions, setHobbiesOptions] = useState([]);
  const [interestOptions, setInterestOptions] = useState([]);
  const [counsellorOptions, setCounsellorOptions] = useState([]);

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    gender: "",
    birthDate: "",
    firstMobile: "",
    secondMobile: "",
    leadDate: "",
    visitingDate: "",
    age: "",
    education: "",
    currentWorking: "",
    relationStatus: "",
    reference: "",
    area: "",
    hobbies: "",
    interest: "",
    reminderDate: "",
    enquiryRating: "",
    counsellor: "",
    note: "",
  });

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
    fetchListItems("Area", setAreaOptions);
    fetchListItems("Hobbies", setHobbiesOptions);
    fetchListItems("Interest", setInterestOptions);
    fetchListItems("Counsellor", setCounsellorOptions);
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
        case "Area":
          fetchListItems("Area", setAreaOptions);
          break;
        case "Hobbies":
          fetchListItems("Hobbies", setHobbiesOptions);
          break;
        case "Interest":
          fetchListItems("Interest", setInterestOptions);
          break;
        case "Counsellor":
          fetchListItems("Counsellor", setCounsellorOptions);
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
      console.log("payload =>", formData);
      const res = await api.post("/enquiry/add", formData);
      console.log("response =>", res.data);
      navigate(-1);
    } catch (error) {
      console.log("status =>", error.response?.status);
      console.log("data =>", error.response?.data);
    }
  };

  return (
    <div className="flex-1 flex justify-center px-8 py-8">
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
          Add Enquiry
        </h2>

        <div
          className={
            "rounded-xl p-6 transition-colors duration-300 " +
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
              Add Enquiry
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

              {/* Email */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-white border-[#2c3250]"
                      : "bg-white text-gray-900 border-gray-300")
                  }
                />
              </div>

              {/* Gender */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Select Gender:
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                      : "bg-white text-gray-800 border-gray-300")
                  }
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Birth Date */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Birth Date:
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                      : "bg-white text-gray-800 border-gray-300")
                  }
                />
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

              {/* Visiting Date */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Visiting Date:
                </label>
                <input
                  type="date"
                  name="visitingDate"
                  value={formData.visitingDate}
                  onChange={handleChange}
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                      : "bg-white text-gray-800 border-gray-300")
                  }
                />
              </div>

              {/* Age */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Age:
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-white border-[#2c3250]"
                      : "bg-white text-gray-900 border-gray-300")
                  }
                />
              </div>

              {/* Education */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Education:
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Education"
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-white border-[#2c3250]"
                      : "bg-white text-gray-900 border-gray-300")
                  }
                />
              </div>

              {/* Current Working */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Current Working:
                </label>
                <input
                  type="text"
                  name="currentWorking"
                  value={formData.currentWorking}
                  onChange={handleChange}
                  placeholder="Current Work"
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-white border-[#2c3250]"
                      : "bg-white text-gray-900 border-gray-300")
                  }
                />
              </div>

              {/* Relation Status */}
              <div>
                <label
                  className={
                    "block text-sm font-medium mb-2 transition-colors duration-300 " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Relation Status:
                </label>
                <select
                  name="relationStatus"
                  value={formData.relationStatus}
                  onChange={handleChange}
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                      : "bg-white text-gray-800 border-gray-300")
                  }
                >
                  <option value="">Select Relationship</option>
                  <option>Married</option>
                  <option>UnMarried</option>
                </select>
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

                {/* Area */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className={
                        "block text-sm font-medium transition-colors duration-300 " +
                        (isDark ? "text-gray-300" : "text-gray-700")
                      }
                    >
                      Area:
                    </label>
                    <button
                      type="button"
                      onClick={() => handleOpenModal("Area")}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Area</option>
                    {areaOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hobbies */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className={
                        "block text-sm font-medium transition-colors duration-300 " +
                        (isDark ? "text-gray-300" : "text-gray-700")
                      }
                    >
                      Your Hobbies:
                    </label>
                    <button
                      type="button"
                      onClick={() => handleOpenModal("Hobbies")}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Hobbies</option>
                    {hobbiesOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interest */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className={
                        "block text-sm font-medium transition-colors duration-300 " +
                        (isDark ? "text-gray-300" : "text-gray-700")
                      }
                    >
                      Your Interest:
                    </label>
                    <button
                      type="button"
                      onClick={() => handleOpenModal("Interest")}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Your Interest</option>
                    {interestOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reminder Date */}
                <div>
                  <label
                    className={
                      "block text-sm font-medium mb-2 transition-colors duration-300 " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    Reminder Date:
                  </label>
                  <input
                    type="date"
                    name="reminderDate"
                    value={formData.reminderDate}
                    onChange={handleChange}
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  />
                </div>

                {/* Enquiry Rating */}
                <div>
                  <label
                    className={
                      "block text-sm font-medium mb-2 transition-colors duration-300 " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    Enquiry Rating:
                  </label>
                  <select
                    name="enquiryRating"
                    value={formData.enquiryRating}
                    onChange={handleChange}
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Rating</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>

                {/* Counsellor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className={
                        "block text-sm font-medium transition-colors duration-300 " +
                        (isDark ? "text-gray-300" : "text-gray-700")
                      }
                    >
                      Select Counsellor:
                    </label>
                    <button
                      type="button"
                      onClick={() => handleOpenModal("Counsellor")}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select
                    name="counsellor"
                    value={formData.counsellor}
                    onChange={handleChange}
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Counsellor</option>
                    {counsellorOptions.map((option, index) => (
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
                  Submit
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

export default AddEnquiry;
