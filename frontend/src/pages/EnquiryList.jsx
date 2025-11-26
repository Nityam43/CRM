import { ArrowLeftIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const EnquiryList = () => {
  const navigate = useNavigate();

  // Sample data - replace with API call
  const enquiries = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      message: "Interested in your services",
      date: "2025-11-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Need more information",
      date: "2025-11-21",
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
      <h2 className="text-3xl font-bold text-white mb-4">Enquiry List</h2>
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
                Date
              </th>
              <th className="px-6 py-3 text-center text-gray-300 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr
                key={enquiry.id}
                className="border-t border-[#2c3250] hover:bg-[#1E2331] transition"
              >
                <td className="px-6 py-4 text-gray-200">{enquiry.name}</td>
                <td className="px-6 py-4 text-gray-200">{enquiry.email}</td>
                <td className="px-6 py-4 text-gray-200">{enquiry.date}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button className="text-blue-400 hover:text-blue-300 transition">
                    <EyeIcon className="h-5 w-5" />
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

export default EnquiryList;
