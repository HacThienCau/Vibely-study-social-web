import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";
import './rightsidebar.css';
const RightSideBar = () => {
  const [countdown, setCountdown] = useState(300);
  const [quote, setQuote] = useState("Đang tải...");
  const [author, setAuthor] = useState("Khuyết danh");

  // Đếm ngược ngày thi (26/06/2025)
  useEffect(() => {
    const examDate = new Date("2025-06-26");
    const today = new Date();
    const diffTime = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    setCountdown(diffTime);
  }, []);

  // Lấy danh ngôn từ MongoDB
  useEffect(() => {
    axios.get("https://vibely-study-social-web.onrender.com/quotations/random")
      .then((response) => {
        console.log("✅ API trả về:", response.data);
        if (response.data.text) {
          setQuote(response.data.text);
          setAuthor(response.data.author || "Khuyết danh");
        } else {
          console.warn("⚠️ API không có dữ liệu hợp lệ!");
        }
      })
      .catch((error) => {
        console.error("❌ Lỗi khi gọi API:", error);
      });
  }, []);


  return (
    <aside className="w-full max-w-sm space-y-4">
      {/* Card Đếm Ngược Ngày Thi */}
      <div className="p-3 bg-white shadow-md rounded-xl text-center">
        <div className="text-base font-semibold flex justify-center items-center">
          Đếm ngược ngày thi Đại học 📢
        </div>
        <p className="text-2xl font-bold mt-2">{countdown} NGÀY</p>
        <p className="text-xs text-gray-500 mt-1">{quote} - {author}</p>
      </div>

      <div className="p-4 bg-white shadow-md rounded-xl w-full h-[500px] relative">
        <Canvas>
          <directionalLight position={[-5, -5, 5]} intensity={4} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Canvas>

      </div>


    </aside>
  );
};

export default RightSideBar;