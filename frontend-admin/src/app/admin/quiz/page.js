'use client'

import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import QuizCard from './quiz-card/page'
import { FaSearch } from 'react-icons/fa';
import { ArrowDownWideNarrow } from "lucide-react";


// Mock data cho quiz
const mockQuizzes = [
    {
        id: 1,
        title: 'Ngữ văn lớp 12',
        questionCount: 2,
        createdAt: '2024-02-20T10:00:00Z',
        playCount: 150,
        averageScore: 8.5,
        imageUrl: '/images/quiz_image.png'
    },
];

const QuizPage = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Xử lý tìm kiếm tại đây
        console.log('Searching for:', searchQuery);
    };

    const handleCreateQuiz = () => {
        router.push('/admin/add-quiz');
    };

    return (
        <div className="flex w-full flex-row min-h-screen bg-[#F4F7FE]">
            <div className="w-1/5 flex-shrink-0">
                <Sidebar />
            </div>

            <div className="w-4/5 flex flex-col">

                {/* Content Area */}
                <div className="py-6 px-6 ml-[-20px] mr-[20px]">
                    <div className="max-w-7xl mx-auto">
                        {/* Search and Create Section */}
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-semibold text-[#333]">Quản lý bài viết</h1>
                            {/*Search & Filter*/}
                            <div className="flex h-[10px] items-center mb-10 py-3 px-3 md:px-6 justify-between">
                                <div className="flex w-3/5 items-center gap-2 justify-start">
                                    <Input
                                        type="text"
                                        placeholder="Tìm kiếm"
                                        className="w-xl border px-4 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300 italic"
                                    />

                                    <Button
                                        className="w-14 md:w-24 h-10 cursor-pointer md:ml-2 px-6 py-2 bg-[#086280] text-white rounded-lg hover:bg-gray-700 transition duration-200"

                                    >
                                        <FaSearch className="w-6 h-6" />
                                        Tìm
                                    </Button>
                                </div>
                                <div className="flex w-1/5 md:w-2/5 items-center justify-end md:gap-2 relative">
                                    <div className="lg:hidden ml-2 text-gray-500">
                                        <ArrowDownWideNarrow className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>

                            {/* Create Quiz Button */}
                            <button
                                onClick={handleCreateQuiz}
                                className="ml-4 px-6 py-3 bg-[#086280] text-white rounded-lg flex items-center space-x-2 hover:bg-[#064d63] transition-all duration-300 transform hover:scale-105"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                <span>Tạo Quiz</span>
                            </button>
                        </div>

                        {/* Quiz List Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium text-gray-800 mb-4">Danh sách Quiz đã tạo</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {mockQuizzes.map((quiz) => (
                                    <QuizCard key={quiz.id} quiz={quiz} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default QuizPage