import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const CancelList = () => {
  const navigate = useNavigate();

  const cancelledEnquiries = [
    {
      id: 1,
      name: "Mark Wilson",
      contact1: "9876543210",
      contact2: "9876500000",
      course: "Digital Marketing - 3M",
      enquiryDate: "10/10/2025 09:30 AM",
      reminderDate: "12/10/2025 09:30 AM",
      reference: "Social Media",
      reason: "No longer interested",
      status: "Cancelled",
      rating: 1,
      register: "No",
    },
    {
      id: 2,
      name: "Sara Johnson",
      contact1: "9123456780",
      contact2: "9123400000",
      course: "Video Editing",
      enquiryDate: "08/10/2025 11:15 AM",
      reminderDate: "09/10/2025 11:15 AM",
      reference: "Friend",
      reason: "Joined other institute",
      status: "Cancelled",
      rating: 2,
      register: "No",
    },
  ];

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return cancelledEnquiries;
    const q = search.toLowerCase();
    return cancelledEnquiries.filter((e) =>
      [
        e.name,
        e.contact1,
        e.contact2,
        e.course,
        e.enquiryDate,
        e.reminderDate,
        e.reference,
        e.reason,
        e.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, cancelledEnquiries]);

  return (
    <div className="flex-1 px-6 py-6">
      {/* top bar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-sm">Back</span>
      </button>

      <h2 className="text-2xl font-bold text-white mb-4">
        Canceled Enquiry List
      </h2>

      {/* main card */}
      <div className="bg-[#232941] rounded-xl p-4">
        {/* top controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <span>Show</span>
            <select className="bg-[#1E2331] border border-[#2c3250] text-gray-200 px-2 py-1 rounded">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <span>Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#1E2331] border border-[#2c3250] text-gray-200 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder=""
            />
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1E2331]">
              <tr>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  NO
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  STUDENT NAME
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  CONTACT
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  COURSES
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  ENQUIRY DATE
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  REMINDER DATE
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  REFERENCES
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  REASON
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  STATUS
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  RATINGS
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  REGISTER
                </th>
                <th className="px-4 py-3 text-center text-gray-300 font-semibold">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={12}
                    className="px-4 py-6 text-center text-gray-400"
                  >
                    No data available in table
                  </td>
                </tr>
              )}

              {filtered.map((e, index) => (
                <tr
                  key={e.id}
                  className="border-t border-[#2c3250] hover:bg-[#1E2331] transition"
                >
                  <td className="px-4 py-3 text-gray-300">{index + 1}</td>
                  <td className="px-4 py-3 text-gray-200 whitespace-nowrap">
                    {e.name}
                  </td>
                  <td className="px-4 py-3 text-gray-200">
                    <div>{e.contact1}</div>
                    <div>{e.contact2}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-200">{e.course}</td>
                  <td className="px-4 py-3 text-gray-200">{e.enquiryDate}</td>
                  <td className="px-4 py-3 text-gray-200">{e.reminderDate}</td>
                  <td className="px-4 py-3 text-gray-200">{e.reference}</td>
                  <td className="px-4 py-3 text-gray-200">{e.reason}</td>
                  <td className="px-4 py-3 text-gray-200">{e.status}</td>
                  <td className="px-4 py-3 text-gray-200">{e.rating}</td>
                  <td className="px-4 py-3 text-gray-200">{e.register}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <button className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white flex items-center gap-1">
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* bottom info + pagination placeholder */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-400 mt-3">
          <span>
            Showing {filtered.length} to {filtered.length} of{" "}
            {cancelledEnquiries.length} entries
          </span>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button className="px-3 py-1 bg-[#1E2331] border border-[#2c3250] rounded">
              Previous
            </button>
            <button className="px-3 py-1 bg-[#1E2331] border border-[#2c3250] rounded">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelList;
