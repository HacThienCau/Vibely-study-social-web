"use client"
import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import UserDropdown from '../../components/dashboard/UserDropdown'
import { updateAdminPassword } from '../../../service/authAdmin.service'
import { Button } from '@/components/ui/button'
import toast from "react-hot-toast"

const SettingsPage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = async () => {
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            toast.error("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            const response = await updateAdminPassword({ oldPassword, newPassword });


            if (response?.status === 'success') {
                setSuccess(response.message || "Đổi mật khẩu thành công!");
                toast.success(` ${response.message || "Đổi mật khẩu thành công!"}`);

                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                console.log("⚠️ API trả về thất bại:", response);
                setError(response.message || "⚠️ Đổi mật khẩu thất bại!");
                toast.error(`⚠️ ${response.message || "Đổi mật khẩu thất bại!"}`);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Có lỗi xảy ra!';
            setError(errorMessage);
            toast.error(`${errorMessage}`);
        }
    };



    return (
        <div className="flex w-full flex-row min-h-screen bg-[#F4F7FE]">
            <div className="w-1/5 flex-shrink-0">
                <Sidebar />
            </div>
            <div className="w-4/5 ml-[-40px] flex flex-col">
                {/* Header Row */}
                <div className="w-full ml-[-20px] py-6 px-6 mb-[-15px] flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-[#333]">Cài đặt</h1>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <UserDropdown />
                    </div>
                </div>
                {/* Content Area */}
                <div className="w-full flex-grow p-6">
                    <div className="ml-[-20px] pr-4 mx-auto">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {/* Password Form Header */}
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Đổi mật khẩu ADMIN</h2>
                            </div>

                            <div className="p-6 border-b border-gray-200 space-y-4">
                                {error && <p className="text-red-500">{error}</p>}
                                {success && <p className="text-green-500">{success}</p>}
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Nhập mật khẩu cũ"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 input"
                                        value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Nhập mật khẩu mới"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 input"
                                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Xác nhận mật khẩu mới"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 input"
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="p-6 flex justify-end">
                                <Button onClick={handleChangePassword} className="px-6 py-3 bg-[#086280] text-white font-medium rounded-lg hover:bg-[#274F5D] transition duration-200 cursor-pointer">
                                    Đổi mật khẩu
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;
