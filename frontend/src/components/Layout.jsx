import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#1E2331] text-gray-200 flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
