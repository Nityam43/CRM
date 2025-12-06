import { useTheme } from "../ThemeContext";

const UserCard = ({ user }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={
        "rounded-lg p-4 mb-4 " +
        (isDark ? "bg-[#232941] text-white" : "bg-white shadow-md")
      }
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{user.name}</h3>
        <span
          className={
            "inline-block px-2 py-0.5 rounded-full text-xs " +
            (user.role === "Admin"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white")
          }
        >
          {user.role}
        </span>
      </div>
      <div className="text-sm">
        <p>
          <span
            className={
              "font-semibold " + (isDark ? "text-gray-400" : "text-gray-600")
            }
          >
            Email:
          </span>{" "}
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
