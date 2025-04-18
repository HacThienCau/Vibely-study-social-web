'use client'
import React, { useEffect } from 'react';

const Page = () => {
    const handleClick = () => {
        window.location.href = '/study-plant/select-tree';
    };

    return (
        <div className="pt-20 min-h-screen flex flex-col items-center justify-center p-6 bg-[#F9FDFF]" style={{
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(200, 230, 255, 0.5) 0%, rgba(200, 230, 255, 0.3) 90%)'
        }}>
            <div className="max-w-4xl w-full text-center font-[Inter]">
                {/* Logo and Title */}
                <div className="mb-9">
                    <img
                        src="/study-plant/tree-page-1.png"
                        alt="Vibely Plant"
                        className="w-24 h-28 mx-auto mb-4"
                    />
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3498DB] to-[#2ECC71] mb-4">
                        Chọn loại cây trồng
                    </p>
                    <p className="text-xl text-[#34495E] max-w-2xl mx-auto">Hãy chọn loại cây trồng bạn thích để bắt đầu chăm sóc nó bằng thành quả học tập của mình nhé!</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow  cursor-pointer">
                        <div className="mb-4">
                            <img
                                src="/study-plant/xuongrong-chonloaicay.png"
                                alt="Cây xương rồng"
                                className="w-27 h-18 mx-auto"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">Cây xương rồng</h3>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow  cursor-pointer">
                        <div className="mb-4">
                            <img
                                src="/study-plant/cayxanh-chonloaicay.png"
                                alt="Cây xanh"
                                className="w-100 h-30 mx-auto "
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">Cây xanh</h3>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow  cursor-pointer">
                        <div className="mb-4">
                            <img
                                src="/study-plant/hoahuongduong-chonloaicay.png"
                                alt="Hoa hướng dương"
                                className="w-56 h-30 mx-auto"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">Hoa hướng dương</h3>
                    </div>
                </div>

                <button onClick={handleClick}
                    className="bg-gradient-to-r from-[#3498DB] to-[#2ECC71] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 transform">
                    Thực hiện mục tiêu <i className="fas fa-arrow-right ml-2" />
                </button>

                <p className="mt-8 text-[#7F8C8D] text-sm">
                    © 2025 Đây là tính năng mới và còn đang phát triển của Vibely
                </p>
            </div>
        </div>
    );
};

export default Page;
