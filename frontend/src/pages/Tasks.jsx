const Tasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Follow up with John",
      status: "Pending",
      dueDate: "2025-11-27",
    },
    {
      id: 2,
      title: "Send proposal to Jane",
      status: "Completed",
      dueDate: "2025-11-25",
    },
  ];

  return (
    <div className="flex-1 p-8">
      <h2 className="text-3xl font-bold text-white mb-4">Tasks</h2>
      <div className="bg-[#232941] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1E2331]">
              <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                Title
              </th>
              <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-gray-300 font-semibold">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-t border-[#2c3250] hover:bg-[#1E2331] transition"
              >
                <td className="px-6 py-4 text-gray-200">{task.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      task.status === "Completed"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-200">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
