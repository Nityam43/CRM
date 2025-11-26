import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const CancelList = () => {
  const navigate = useNavigate();

  // Sample data - replace with API call
  const cancelledEnquiries = [
    {
      id: 1,
      name: "Mark Wilson",
      email: "mark@example.com",
      cancelReason: "No longer interested",
      date: "2025-11-19",
    },
  ];

  return (
    <div className="flex-1 p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back
      </button>
      <h2 className="text-3xl font-bold text-white mb-4">Cancel List</h2>
      <div className="bg-[#232941] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1E2331]">
              <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                Email
              </th>
              <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                Cancel Reason
              </th>
              <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                Date
              </th>
              <th className="px-6 py-3 text-center text-gray-300 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cancelledEnquiries.map((enquiry) => (
              <tr
                key={enquiry.id}
                className="border-t border-[#2c3250] hover:bg-[#1E2331] transition"
              >
                <td className="px-6 py-4 text-gray-200">{enquiry.name}</td>
                <td className="px-6 py-4 text-gray-200">{enquiry.email}</td>
                <td className="px-6 py-4 text-gray-200">
                  {enquiry.cancelReason}
                </td>
                <td className="px-6 py-4 text-gray-200">{enquiry.date}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button className="text-green-400 hover:text-green-300 transition">
                  </button>
                  <button className="text-red-400 hover:text-red-300 transition">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CancelList;
