import React from "react";

const RightSideBar = () => {
  return (
    <aside className="w-full max-w-sm space-y-4">
      {/* Card Đếm Ngược Ngày Thi */}
      <div className="p-3 bg-white shadow-md rounded-xl text-center ">
      <div className="text-base font-semibold flex justify-center items-center">
            Đếm ngược ngày thi Đại học 📢
        </div>
        <p className="text-2xl font-bold mt-2 ">300 NGÀY</p>
        <p className="text-xs text-gray-500 mt-1">
          Luyện mãi thành tài, miệt mài tất giỏi
        </p>
      </div>

      {/* Card Thống Kê */}
      <div className="p-4 bg-white shadow-md rounded-xl">
        <div className="text-lg font-semibold flex items-center">
          <span className="text-blue-500 mr-1">📊</span> Thống kê
        </div>
        <div className="h-72 bg-gray-100 rounded-lg shadow-inner mt-3"></div>
      </div>
    </aside>
  );
};

export default RightSideBar;
