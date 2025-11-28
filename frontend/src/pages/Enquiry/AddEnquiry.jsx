import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";

const AddEnquiry = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
          <form className="space-y-6">
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
                  className={
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                    (isDark
                      ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                      : "bg-white text-gray-800 border-gray-300")
                  }
                >
                  <option value="">Select Relationship</option>
                  <option>Single</option>
                  <option>Married</option>
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
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Reference</option>
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
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Area</option>
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
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Hobbies</option>
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
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Your Interest</option>
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
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Relationship</option>
                    <option>Hot</option>
                    <option>Warm</option>
                    <option>Cold</option>
                  </select>
                </div>

                {/* Counsellor */}
                <div>
                  <label
                    className={
                      "block text-sm font-medium mb-2 transition-colors duration-300 " +
                      (isDark ? "text-gray-300" : "text-gray-700")
                    }
                  >
                    Select Counsellor:
                  </label>
                  <select
                    className={
                      "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
                      (isDark
                        ? "bg-[#1E2331] text-gray-300 border-[#2c3250]"
                        : "bg-white text-gray-800 border-gray-300")
                    }
                  >
                    <option value="">Select Relationship</option>
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
    </div>
  );
};

export default AddEnquiry;
