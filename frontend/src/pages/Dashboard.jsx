import {
  ChartBarIcon,
  UsersIcon,
  ClipboardIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../ThemeContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEnquiries,
  fetchEnrolls,
  fetchDemos,
  fetchFees,
} from "../redux/thunks";

const Dashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const dispatch = useDispatch();

  const { enquiries } = useSelector((state) => state.enquiries);
  const { enrolls } = useSelector((state) => state.enrolls);
  const { demos } = useSelector((state) => state.demos);
  const { fees } = useSelector((state) => state.fees);

  useEffect(() => {
    dispatch(fetchEnquiries());
    dispatch(fetchEnrolls());
    dispatch(fetchDemos());
    dispatch(fetchFees());
  }, [dispatch]);

  const enquiredCount = enquiries.length;
  const cancelledEnquiryCount = enquiries.filter(
    (e) => e.status === "Cancelled"
  ).length;
  const enrolledCount = enrolls.length;
  const cancelledEnrollCount = enrolls.filter(
    (e) => e.status === "Cancelled"
  ).length;
  const demoCount = demos.length;
  const cancelledDemoCount = demos.filter(
    (d) => d.status === "Cancelled"
  ).length;
  
  // Calculate the number of unique students from the fees data
  const uniqueStudents = new Set(fees.map((fee) => fee.studentName));
  const feesCount = uniqueStudents.size;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page title */}
      <h2
        className={
          "text-2xl font-bold mb-4 " +
          (isDark ? "text-white" : "text-gray-900")
        }
      >
        Admin Dashboard
      </h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Enquiries */}
        <div
          className={
            "rounded-xl px-6 py-4 flex items-center shadow " +
            (isDark ? "bg-[#232941]" : "bg-white")
          }
        >
          <ClipboardIcon
            className={
              "h-10 w-10 mr-4 " + (isDark ? "text-blue-400" : "text-blue-600")
            }
          />
          <div>
            <p
              className={
                "text-lg font-semibold " +
                (isDark ? "text-white" : "text-gray-900")
              }
            >
              {enquiredCount}
            </p>
            <p
              className={
                "text-xs " + (isDark ? "text-gray-400" : "text-gray-500")
              }
            >
              Enquiries
            </p>
          </div>
        </div>

        {/* Cancelled Enquiries */}
        <div
          className={
            "rounded-xl px-6 py-4 flex items-center shadow " +
            (isDark ? "bg-[#232941]" : "bg-white")
          }
        >
          <ClipboardIcon
            className={
              "h-10 w-10 mr-4 " + (isDark ? "text-red-400" : "text-red-600")
            }
          />
          <div>
            <p
              className={
                "text-lg font-semibold " +
                (isDark ? "text-white" : "text-gray-900")
              }
            >
              {cancelledEnquiryCount}
            </p>
            <p
              className={
                "text-xs " + (isDark ? "text-gray-400" : "text-gray-500")
              }
            >
              Cancelled Enquiries
            </p>
          </div>
        </div>

        {/* Demos */}
        <div
          className={
            "rounded-xl px-6 py-4 flex items-center shadow " +
            (isDark ? "bg-[#232941]" : "bg-white")
          }
        >
          <UsersIcon
            className={
              "h-10 w-10 mr-4 " + (isDark ? "text-green-400" : "text-green-600")
            }
          />
          <div>
            <p
              className={
                "text-lg font-semibold " +
                (isDark ? "text-white" : "text-gray-900")
              }
            >
              {demoCount}
            </p>
            <p
              className={
                "text-xs " + (isDark ? "text-gray-400" : "text-gray-500")
              }
            >
              Demos
            </p>
          </div>
        </div>

        {/* Cancelled Demos */}
        <div
          className={
            "rounded-xl px-6 py-4 flex items-center shadow " +
            (isDark ? "bg-[#232941]" : "bg-white")
          }
        >
          <UsersIcon
            className={
              "h-10 w-10 mr-4 " + (isDark ? "text-red-400" : "text-red-600")
            }
          />
          <div>
            <p
              className={
                "text-lg font-semibold " +
                (isDark ? "text-white" : "text-gray-900")
              }
            >
              {cancelledDemoCount}
            </p>
            <p
              className={
                "text-xs " + (isDark ? "text-gray-400" : "text-gray-500")
              }
            >
              Cancelled Demos
            </p>
          </div>
        </div>

        {/* Enrolls */}
        <div
          className={
            "rounded-xl px-6 py-4 flex items-center shadow " +
            (isDark ? "bg-[#232941]" : "bg-white")
          }
        >
          <ChartBarIcon
            className={
              "h-10 w-10 mr-4 " +
              (isDark ? "text-purple-400" : "text-purple-600")
            }
          />
          <div>
            <p
              className={
                "text-lg font-semibold " +
                (isDark ? "text-white" : "text-gray-900")
              }
            >
              {enrolledCount}
            </p>
            <p
              className={
                "text-xs " + (isDark ? "text-gray-400" : "text-gray-500")
              }
            >
              Enrolls
            </p>
          </div>
        </div>

        {/* Cancelled Enrolls */}
        <div
          className={
            "rounded-xl px-6 py-4 flex items-center shadow " +
            (isDark ? "bg-[#232941]" : "bg-white")
          }
        >
          <ChartBarIcon
            className={
              "h-10 w-10 mr-4 " + (isDark ? "text-red-400" : "text-red-600")
            }
          />
          <div>
            <p
              className={
                "text-lg font-semibold " +
                (isDark ? "text-white" : "text-gray-900")
              }
            >
              {cancelledEnrollCount}
            </p>
            <p
              className={
                "text-xs " + (isDark ? "text-gray-400" : "text-gray-500")
              }
            >
              Cancelled Enrolls
            </p>
          </div>
        </div>
        
        {/* Fees */}
        <div
          className={
            "rounded-xl px-6 py-4 flex items-center shadow " +
            (isDark ? "bg-[#232941]" : "bg-white")
          }
        >
          <BanknotesIcon
            className={
              "h-10 w-10 mr-4 " +
              (isDark ? "text-yellow-400" : "text-yellow-600")
            }
          />
          <div>
            <p
              className={
                "text-lg font-semibold " +
                (isDark ? "text-white" : "text-gray-900")
              }
            >
              {feesCount}
            </p>
            <p
              className={
                "text-xs " + (isDark ? "text-gray-400" : "text-gray-500")
              }
            >
              Fees
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
