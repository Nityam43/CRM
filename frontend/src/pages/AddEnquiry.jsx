import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AddEnquiry = () => {
  const navigate = useNavigate();

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

        <h2 className="text-3xl font-bold text-white mb-4">Add Enquiry</h2>

        <div className="bg-[#232941] rounded-xl p-6">
          <form className="space-y-6">
            {/* Top section title */}
            <h3 className="text-xl font-semibold text-white mb-2">
              Add Enquiry
            </h3>

            {/* GRID 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Name */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Student Name:
                </label>
                <input
                  type="text"
                  placeholder="Student Name"
                  className="w-full bg-[#1E2331] text-white px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#1E2331] text-white px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Select Gender:
                </label>
                <select className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Birth Date:
                </label>
                <input
                  type="date"
                  className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* First Mobile */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  First Mobile No:
                </label>
                <div className="flex items-center bg-[#1E2331] rounded border border-[#2c3250] px-3">
                  <span className="text-gray-300 mr-2">+91</span>
                  <input
                    type="tel"
                    placeholder="Enter First Mobile"
                    className="flex-1 bg-transparent text-white py-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Second Mobile */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Second Mobile No:
                </label>
                <div className="flex items-center bg-[#1E2331] rounded border border-[#2c3250] px-3">
                  <span className="text-gray-300 mr-2">+91</span>
                  <input
                    type="tel"
                    placeholder="Enter Second Mobile"
                    className="flex-1 bg-transparent text-white py-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Lead Date */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Lead Date:
                </label>
                <input
                  type="date"
                  className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Visiting Date */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Visiting Date:
                </label>
                <input
                  type="date"
                  className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Age:
                </label>
                <input
                  type="number"
                  placeholder="Age"
                  className="w-full bg-[#1E2331] text-white px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Education:
                </label>
                <input
                  type="text"
                  placeholder="Education"
                  className="w-full bg-[#1E2331] text-white px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Current Working */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Current Working:
                </label>
                <input
                  type="text"
                  placeholder="Current Work"
                  className="w-full bg-[#1E2331] text-white px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Relation Status */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Relation Status:
                </label>
                <select className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="">Select Relationship</option>
                  <option>Single</option>
                  <option>Married</option>
                </select>
              </div>
            </div>

            {/* GRID 2 – like second screenshot */}
            <div className="border-t border-[#2c3250] pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reference */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-gray-300 text-sm font-medium">
                      Reference:
                    </label>
                    <button
                      type="button"
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select Reference</option>
                  </select>
                </div>

                {/* Area */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-gray-300 text-sm font-medium">
                      Area:
                    </label>
                    <button
                      type="button"
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select Area</option>
                  </select>
                </div>

                {/* Hobbies */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-gray-300 text-sm font-medium">
                      Your Hobbies:
                    </label>
                    <button
                      type="button"
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select Hobbies</option>
                  </select>
                </div>

                {/* Interest */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-gray-300 text-sm font-medium">
                      Your Interest:
                    </label>
                    <button
                      type="button"
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Add List <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <select className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select Your Interest</option>
                  </select>
                </div>

                {/* Reminder Date */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Reminder Date:
                  </label>
                  <input
                    type="date"
                    className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Enquiry Rating */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Enquiry Rating:
                  </label>
                  <select className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select Relationship</option>
                    <option>Hot</option>
                    <option>Warm</option>
                    <option>Cold</option>
                  </select>
                </div>

                {/* Counsellor */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Select Counsellor:
                  </label>
                  <select className="w-full bg-[#1E2331] text-gray-300 px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select Relationship</option>
                  </select>
                </div>
              </div>

              {/* Note + Submit */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Note:
                </label>
                <textarea
                  rows="4"
                  placeholder="Enter message here..."
                  className="w-full bg-[#1E2331] text-white px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                ></textarea>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
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
