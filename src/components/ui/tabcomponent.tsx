import React, { useState } from "react";

const tabComponent = () => {
  // State để theo dõi tab hiện tại
  const [activeTab, setActiveTab] = useState(1);

  // Hàm để thay đổi tab khi bấm vào button
  const handleTabChange = (tabIndex: React.SetStateAction<number>) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Các button tương ứng với các tab */}
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleTabChange(1)}
        >
          Tab 1
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleTabChange(2)}
        >
          Tab 2
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 3 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleTabChange(3)}
        >
          Tab 3
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 4 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleTabChange(4)}
        >
          Tab 4
        </button>
      </div>

      {/* Nội dung tương ứng với tab hiện tại */}
      <div className="mt-4">
        {activeTab === 1 && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-xl text-left">Nội dung của Tab 1</h3>
            <p className="text-left">Đây là nội dung của Tab 1.</p>
          </div>
        )}
        {activeTab === 2 && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-xl text-left">Nội dung của Tab 2</h3>
            <p className="text-left">Đây là nội dung của Tab 2.</p>
          </div>
        )}
        {activeTab === 3 && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-xl text-left">Nội dung của Tab 3</h3>
            <p className="text-left">Đây là nội dung của Tab 3.</p>
          </div>
        )}
        {activeTab === 4 && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-xl text-left">Nội dung của Tab 4</h3>
            <p className="text-left">Đây là nội dung của Tabllllllllllll 4.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default tabComponent;
