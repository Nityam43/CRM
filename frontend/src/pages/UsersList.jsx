import { useMediaQuery } from "react-responsive";
import { useTheme } from "../ThemeContext";
import UserCard from "../components/UserCard";

const UsersList = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];

  return (
    <div className="flex-1 p-4 sm:p-8">
      <h2
        className={
          "text-3xl font-bold mb-4 " + (isDark ? "text-white" : "text-gray-900")
        }
      >
        Users
      </h2>
      {isMobile ? (
        <div>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div
          className={
            "rounded-xl overflow-hidden " +
            (isDark ? "bg-[#232941]" : "bg-white shadow-md")
          }
        >
          <table className="w-full">
            <thead>
              <tr className={isDark ? "bg-[#1E2331]" : "bg-gray-100"}>
                <th
                  className={
                    "px-6 py-3 text-left font-semibold " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 py-3 text-left font-semibold " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 py-3 text-left font-semibold " +
                    (isDark ? "text-gray-300" : "text-gray-700")
                  }
                >
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={
                    "border-t transition " +
                    (isDark
                      ? "border-[#2c3250] hover:bg-[#1E2331]"
                      : "border-gray-200 hover:bg-gray-50")
                  }
                >
                  <td
                    className={"px-6 py-4 " + (isDark ? "text-gray-200" : "text-gray-800")}
                  >
                    {user.name}
                  </td>
                  <td
                    className={"px-6 py-4 " + (isDark ? "text-gray-200" : "text-gray-800")}
                  >
                    {user.email}
                  </td>
                  <td
                    className={"px-6 py-4 " + (isDark ? "text-gray-200" : "text-gray-800")}
                  >
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersList;
