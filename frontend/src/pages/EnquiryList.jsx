import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots, faPhone } from "@fortawesome/free-solid-svg-icons";

const EnquiryList = () => {
  const navigate = useNavigate();

  const enquiries = [
    {
      id: 1,
      name: "Joshi Meetkumar",
      contact1: "9898929866",
      contact2: "9909854024",
      course: "Video Editing | Digital Marketing",
      enquiryDate: "09/10/2025 06:29 AM",
      reminderDate: "11/10/2025 06:29 AM",
      visitingDate: "09/10/2025 06:29",
      reference: "Social Media",
      status: "Enquiry",
      rating: 1,
    },
    {
      id: 2,
      name: "Patel Pritesh Dhaneshbhai",
      contact1: "9021132895",
      contact2: "7387013877",
      course: "Digital Marketing",
      enquiryDate: "17/09/2025 04:43 AM",
      reminderDate: "19/09/2025 04:43 AM",
      visitingDate: "17/09/2025 04:43",
      reference: "Social Media",
      status: "Enquiry",
      rating: 1,
    },
    {
      id: 3,
      name: "Borad Ayushi Ghanshyambhai",
      contact1: "9723540080",
      contact2: "8140180172",
      course: "Digital Marketing - 3M",
      enquiryDate: "07/08/2025 06:41 AM",
      reminderDate: "07/08/2025 06:41 AM",
      visitingDate: "07/08/2025 06:41",
      reference: "Happy Bhanderi - SS - REF",
      status: "Enrolled",
      rating: 1,
    },
  ];

  const [search, setSearch] = useState("");

  const filteredEnquiries = useMemo(() => {
    if (!search.trim()) return enquiries;
    const q = search.toLowerCase();
    return enquiries.filter((e) =>
      [
        e.name,
        e.contact1,
        e.contact2,
        e.course,
        e.reference,
        e.enquiryDate,
        e.reminderDate,
        e.visitingDate,
        e.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, enquiries]); // filtering pattern using Array.filter[web:40][web:46]

  return (
    <div className="flex-1 px-6 py-6">
      {/* back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-sm">Back</span>
      </button>

      {/* title */}
      <h2 className="text-2xl font-bold text-white mb-4">Enquiry List</h2>

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
              placeholder="Type to filter..."
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
                  NAME
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
                  VISITING DATE
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  REFERENCE
                </th>
                <th className="px-4 py-3 text-center text-gray-300 font-semibold">
                  MESSAGE
                </th>
                <th className="px-4 py-3 text-center text-gray-300 font-semibold">
                  STATUS
                </th>
                <th className="px-4 py-3 text-center text-gray-300 font-semibold">
                  RATINGS
                </th>
                <th className="px-4 py-3 text-center text-gray-300 font-semibold">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEnquiries.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-[#2c3250] hover:bg-[#1E2331] transition"
                >
                  {/* NO */}
                  <td className="px-4 py-3 text-gray-300">{index + 1}</td>

                  {/* NAME */}
                  <td className="px-4 py-3 text-gray-200 whitespace-nowrap">
                    {item.name}
                  </td>

                  {/* CONTACT */}
                  <td className="px-4 py-3 text-gray-200">
                    <div>{item.contact1}</div>
                    <div>{item.contact2}</div>
                  </td>

                  {/* COURSES */}
                  <td className="px-4 py-3 text-gray-200">{item.course}</td>

                  {/* ENQUIRY DATE */}
                  <td className="px-4 py-3 text-gray-200">
                    {item.enquiryDate}
                  </td>

                  {/* REMINDER DATE */}
                  <td className="px-4 py-3 text-gray-200">
                    {item.reminderDate}
                  </td>

                  {/* VISITING DATE */}
                  <td className="px-4 py-3 text-gray-200">
                    {item.visitingDate}
                  </td>

                  {/* REFERENCE */}
                  <td className="px-4 py-3 text-gray-200">{item.reference}</td>

                  {/* Message Symbols */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3 text-gray-300 text-lg">
                      <button
                        className="hover:text-green-400 transition"
                        title="WhatsApp"
                      >
                        <FontAwesomeIcon icon={faWhatsapp} />
                      </button>
                      <button
                        className="hover:text-sky-400 transition"
                        title="Message"
                      >
                        <FontAwesomeIcon icon={faCommentDots} />
                      </button>
                      <button
                        className="hover:text-blue-400 transition"
                        title="Call"
                      >
                        <FontAwesomeIcon icon={faPhone} />
                      </button>
                    </div>
                  </td>

                  {/* STATUS badge */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full border text-xs ${
                        item.status === "Enrolled"
                          ? "border-green-500 text-green-400"
                          : "border-yellow-500 text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* RATING pill */}
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded border border-red-500 text-red-400 text-xs">
                      {item.rating}
                    </span>
                  </td>

                  {/* ACTION buttons */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-400 border border-blue-500 px-3 py-1 rounded text-xs hover:bg-blue-500 hover:text-white">
                        Edit
                      </button>
                      <button className="text-yellow-400 border border-yellow-500 px-3 py-1 rounded text-xs hover:bg-yellow-500 hover:text-white">
                        Demo
                      </button>
                      <button className="text-red-400 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEnquiries.length === 0 && (
                <tr>
                  <td
                    colSpan={12}
                    className="px-4 py-6 text-center text-gray-400"
                  >
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* bottom info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-400 mt-3">
          <span>
            Showing {filteredEnquiries.length} of {enquiries.length} entries
          </span>
          <div className="flex gap-1 mt-2 md:mt-0">
            <button className="px-2 py-1 bg-[#1E2331] border border-[#2c3250] rounded">
              1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryList;
