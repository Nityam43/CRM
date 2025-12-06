import { useTheme } from "../ThemeContext";

const AddListItemModal = ({ isOpen, onClose, itemType, onAddItem }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isOpen) {
    return null;
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = e.target.elements.newItem.value;
    if (newItem) {
      onAddItem(itemType, newItem);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={
          "p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md " +
          (isDark ? "bg-[#232941] text-white" : "bg-white text-gray-900")
        }
      >
        <h2 className="text-2xl font-bold mb-4">Add New {itemType}</h2>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            name="newItem"
            placeholder={`Enter new ${itemType}`}
            className={
              "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 " +
              (isDark
                ? "bg-[#1E2331] text-white border-[#2c3250]"
                : "bg-white text-gray-900 border-gray-300")
            }
          />
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListItemModal;
