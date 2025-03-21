'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import UserDropdown from '../../components/dashboard/UserDropdown';
import ChartSection from '../../components/dashboard/ChartSection';
import Image from 'next/image';
import { getTotalUsers, getTotalPosts, getTotalDocuments, getTotalQuestions, getDashboardStats } from '@/service/dashboardAdmin.service';
import './dashboard.css';

const Dashboard = () => {
    const [userStats, setUserStats] = useState([]);
    const [postStats, setPostStats] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [timeRange, setTimeRange] = useState("day");


    useEffect(() => {
        fetchData(timeRange);
    }, [timeRange]);

    const fetchData = async (range) => {
        try {
            const users = await getTotalUsers();
            const posts = await getTotalPosts();
            const documents = await getTotalDocuments();
            const questions = await getTotalQuestions();
            const stats = await getDashboardStats(range);

            console.log("Dashboard API Response:", stats);

            setTotalUsers(users);
            setTotalPosts(posts);
            setTotalDocuments(documents);
            setTotalQuestions(questions);

            if (!stats || !stats.usersStats || !stats.postsStats) {
                console.error("API response missing required data:", stats);
                return;
            }

            const formattedUserData = stats.usersStats.map(item => ({
                date: item._id.month ? `${item._id.year}-${item._id.month}` : item._id.date,
                count: item.count
            }));

            const formattedPostData = stats.postsStats.map(item => ({
                date: item._id.month ? `${item._id.year}-${item._id.month}` : item._id.date,
                count: item.count
            }));

            console.log("Formatted user stats:", formattedUserData);
            console.log("Formatted post stats:", formattedPostData);

            setUserStats(formattedUserData);
            setPostStats(formattedPostData);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
    };

    return (
        <div className="flex w-full flex-row min-h-screen bg-[#F4F7FE]">
            <div className="w-1/5 flex-shrink-0">
                <Sidebar />
            </div>
            <div className="w-4/5 ml-[-20px] py-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6 px-6">
                    <h1 className="text-2xl font-semibold text-[#333]">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <UserDropdown />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-6">
                    <DashboardCard title="Tổng số người dùng" count={totalUsers} imageSrc="/images/dashboard/users.png" />
                    <DashboardCard title="Tổng số bài viết" count={totalPosts} imageSrc="/images/dashboard/posts.png" />
                    <DashboardCard title="Tổng số tài liệu" count={totalDocuments} imageSrc="/images/dashboard/documents.png" />
                    <DashboardCard title="Tổng số thắc mắc" count={totalQuestions} imageSrc="/images/dashboard/questions.png" />
                </div>
                <div className="px-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-[#333]">Biểu đồ thống kê</h2>
                        <select
                            value={timeRange}
                            onChange={handleTimeRangeChange}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="day">Ngày</option>
                            <option value="month">Tháng</option>
                            <option value="year">Năm</option>
                        </select>
                    </div>
                    {userStats.length > 0 && postStats.length > 0 ? (
                        <ChartSection userStats={userStats} postStats={postStats} />
                    ) : (
                        <p className="text-gray-500">Đang tải dữ liệu...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const DashboardCard = ({ title, count, imageSrc }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center">
            <Image src={imageSrc} alt={title} width={50} height={50} />
            <div className="ml-3">
                <p className="text-gray-500 text-sm">{title}</p>
                <h2 className="text-2xl font-bold text-[#2B3674]">{count}</h2>
            </div>
        </div>
    </div>
);

export default Dashboard;