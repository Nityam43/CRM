import {
  ChartBarIcon,
  UsersIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
        </div>
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#232941] rounded-xl p-6 flex items-center shadow">
            <ChartBarIcon className="h-10 w-10 text-blue-400 mr-4" />
            <div>
              <p className="text-lg font-semibold text-white">153</p>
              <p className="text-xs text-gray-400">Analytics</p>
            </div>
          </div>
          <div className="bg-[#232941] rounded-xl p-6 flex items-center shadow">
            <UsersIcon className="h-10 w-10 text-blue-400 mr-4" />
            <div>
              <p className="text-lg font-semibold text-white">36</p>
              <p className="text-xs text-gray-400">Users</p>
            </div>
          </div>
          <div className="bg-[#232941] rounded-xl p-6 flex items-center shadow">
            <ClipboardIcon className="h-10 w-10 text-blue-400 mr-4" />
            <div>
              <p className="text-lg font-semibold text-white">74</p>
              <p className="text-xs text-gray-400">Tasks</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
