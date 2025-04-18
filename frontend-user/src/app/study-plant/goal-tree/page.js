"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Cloud = ({ delay, position }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{
                opacity: [0.5, 1, 0.5],
                x: [0, 50, 0],
                y: [0, -20, 0]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
            className={`absolute ${position}`}
        >
            <img src="/study-plant/cloud.png" alt="Cloud" className="w-32 h-20" />
        </motion.div>
    );
};

const Butterfly = ({ delay, position, image }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: position === 'left' ? -100 : 100 }}
            animate={{
                opacity: 1,
                x: position === 'left'
                    ? [0, 200, 0, -200, 0]
                    : [0, -200, 0, 200, 0],
                y: [0, -20, 0, 20, 0]
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
            className="absolute"
            style={{
                top: '30%',
                left: position === 'left' ? '20%' : '60%'
            }}
        >
            <img src={`/study-plant/${image}`} alt="Butterfly" className="w-20 h-20" />
        </motion.div>
    );
};

const GoalTreePage = () => {
    const [goals, setGoals] = useState([
        { id: 1, title: "Hoàn thành Vibely", completed: false },
        { id: 2, title: "Hoàn thành Vibely", completed: false },
        { id: 3, title: "Hoàn thành Vibely", completed: false },
        { id: 4, title: "Hoàn thành Vibely", completed: false },
        { id: 5, title: "Hoàn thành Vibely", completed: false },
    ]);

    const [newGoal, setNewGoal] = useState("");

    const handleAddGoal = () => {
        if (newGoal.trim()) {
            setGoals([...goals, { id: goals.length + 1, title: newGoal, completed: false }]);
            setNewGoal("");
        }
    };

    const handleToggleGoal = (id) => {
        setGoals(goals.map(goal =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        ));
    };

    const handleDeleteGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    return (
        <div className="min-h-screen pt-14">
            <div className="flex h-full">
                {/* Left Panel */}
                <div className="w-[420px] bg-white shadow-lg p-6">
                    <div className="space-y-6">
                        <div>
                            <p className="text-xl font-bold mb-4">Mục tiêu học tập</p>
                            <p className="text-gray-600 mb-6 text-[14px]">
                                Hoàn thành các mục tiêu bạn đề ra để tưới nước cho cây của bạn và ngắm nhìn nó lớn lên!
                                Mỗi mục tiêu hoàn thành sẽ giúp cây của bạn tiến gần hơn đến độ trưởng thành 🌱
                            </p>

                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[16px] font-medium">Mức độ tăng trưởng của cây</span>
                                <span className="text-[16px] font-medium">0/5</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
                                <div className="h-full bg-gradient-to-r from-[#4ACFEF] to-[#476EFF] rounded-full" style={{ width: '0%' }}></div>
                            </div>

                            <div className="flex space-x-4 mb-8">
                                <Input
                                    placeholder="Thêm mục tiêu học tập"
                                    className="flex-1 "
                                    value={newGoal}
                                    onChange={(e) => setNewGoal(e.target.value)}
                                />
                                <Button
                                    className="bg-gradient-to-b from-[#4ACFEF] to-[#476EFF] text-white"
                                    onClick={handleAddGoal}
                                >
                                    Thêm
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {goals.map((goal) => (
                                <div key={goal.id} className="flex items-center text-[15px] justify-between p-2 bg-[#F8FDFF] border border-gray-300 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => handleToggleGoal(goal.id)}
                                            className={`w-6 h-6 rounded-full border-2 ${goal.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}
                                        />
                                        <span className={goal.completed ? 'line-through text-gray-500' : ''}>
                                            {goal.title}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteGoal(goal.id)}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <p className="text-gray-600 mt-8 text-[14px]">
                            Mẹo: Hoàn thành 5 mục tiêu để cây của bạn phát triển hoàn toàn! 🌿
                        </p>
                    </div>
                </div>

                {/* Right Panel - Tree Display */}
                <div className="flex-1 relative">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/study-plant/background-plant-tree.gif')" }}
                    />

                    {/* Sun */}
                    <div className="absolute top-4 right-4">
                        <img src="/study-plant/sun.gif" alt="Sun" className="w-28 h-28" />
                    </div>

                    {/* Watering Can */}
                    <div className="absolute bottom-24 left-8">
                        <img src="/study-plant/watering-can.png" alt="Watering Can" className="w-36 h-30" />
                    </div>

                    {/* Tree Pot */}
                    <div className="absolute bottom-[60px] left-1/2 transform -translate-x-1/2">
                        <img src="/study-plant/tree-pot.png" alt="Tree Pot" className="w-52 h-44" />
                    </div>

                    {/* Floating Clouds */}
                    <Cloud delay={0} position="top-10 left-10" />
                    <Cloud delay={2} position="top-20 right-20" />
                    <Cloud delay={4} position="top-5 left-1/3" />
                    <Cloud delay={6} position="top-15 right-1/3" />

                    {/* Butterflies */}
                    <Butterfly delay={0} position="left" image="butterfly-1.gif" />
                    <Butterfly delay={2} position="right" image="butterfly-2.gif" />


                </div>
            </div>
        </div>
    );
};

export default GoalTreePage;
