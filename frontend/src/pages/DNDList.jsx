import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import { 
  fetchDeletedEnquiries, restoreEnquiry, permanentDeleteEnquiry,
  fetchDeletedDemos, restoreDemo, permanentDeleteDemo,
  fetchDeletedEnrolls, restoreDeletedEnroll, permanentDeleteEnroll
} from '../redux/thunks';
import { useTheme } from '../ThemeContext';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import PageTransition from '../components/PageTransition';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DNDList = () => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const { deletedEnquiries } = useSelector(state => state.enquiries);
    const { deletedDemos } = useSelector(state => state.demos);
    const { deletedEnrolls } = useSelector(state => state.enrolls);

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        dispatch(fetchDeletedEnquiries());
        dispatch(fetchDeletedDemos());
        dispatch(fetchDeletedEnrolls());
    }, [dispatch]);

    const handleRestore = (id, type) => {
        if (window.confirm("Are you sure you want to restore this item?")) {
            if (type === 'enquiry') dispatch(restoreEnquiry(id));
            if (type === 'demo') dispatch(restoreDemo(id));
            if (type === 'enroll') dispatch(restoreDeletedEnroll(id));
        }
    };

    const handleDelete = (id, type) => {
        if (window.confirm("Are you sure you want to PERMANENTLY delete this item? This action cannot be undone.")) {
            if (type === 'enquiry') dispatch(permanentDeleteEnquiry(id));
            if (type === 'demo') dispatch(permanentDeleteDemo(id));
            if (type === 'enroll') dispatch(permanentDeleteEnroll(id));
        }
    };

    const renderList = (items, type) => {
        if (!items || items.length === 0) {
            return <div className={`p-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No deleted items found.</div>;
        }

        return (
            <div className="overflow-x-auto">
                <table className={`min-w-full divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Contact</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date Deleted</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-gray-700 bg-gray-900' : 'divide-gray-200 bg-white'}`}>
                        {items.map((item) => (
                            <tr key={item._id}>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {item.studentName}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {item.firstMobile || item.email}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {new Date(item.updatedAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleRestore(item._id, type)}
                                        className="text-green-600 hover:text-green-900 mr-4"
                                        title="Restore"
                                    >
                                        <ArrowPathIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id, type)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete Permanently"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <PageTransition>
            <div className={`p-6 ${isDark ? "bg-[#1f2937]" : "bg-white"} rounded-lg shadow min-h-screen`}>
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                    DND List (Recycle Bin)
                </h2>
                
                <Tab.Group onChange={setActiveTab}>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
                        {['Enquiries', 'Demos', 'Enrollments'].map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-blue-600 text-white shadow'
                                            : `text-blue-500 hover:bg-blue-600/[0.12] ${isDark ? 'hover:text-blue-300' : 'hover:text-blue-600'}`
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>{renderList(deletedEnquiries, 'enquiry')}</Tab.Panel>
                        <Tab.Panel>{renderList(deletedDemos, 'demo')}</Tab.Panel>
                        <Tab.Panel>{renderList(deletedEnrolls, 'enroll')}</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </PageTransition>
    );
};

export default DNDList;
