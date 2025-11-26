import Sidebar from "../components/Sidebar";

const UsersList = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];

  return (
    <div className="flex-1 p-8">
      <h2 className="text-3xl font-bold text-white mb-4">Users</h2>
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
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-[#2c3250] hover:bg-[#1E2331] transition"
              >
                <td className="px-6 py-4 text-gray-200">{user.name}</td>
                <td className="px-6 py-4 text-gray-200">{user.email}</td>
                <td className="px-6 py-4 text-gray-200">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
