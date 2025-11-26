import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AddEnquiry = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back
      </button>
      <h2 className="text-3xl font-bold text-white mb-4">Add Enquiry</h2>
      <div className="bg-[#232941] rounded-xl p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Customer Name
            </label>
            <input
              type="text"
              className="w-full bg-[#1E2331] text-white px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-[#1E2331] text-white px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              className="w-full bg-[#1E2331] text-white px-4 py-2 rounded border border-[#2c3250] focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter enquiry details"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEnquiry;
