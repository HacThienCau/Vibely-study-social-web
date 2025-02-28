"use client";
import React from "react";
import './messenger.css';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Conversation from "../components/conversations/Conversation";
import Message from "../components/message/Message";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatOnline from "../components/chatOnline/ChatOnline";
const Messenger = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <div className="pt-14 messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <div className="relative w-full max-w-[300px] md:max-w-[400px] mb-4">                        
                        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-800" size={20} />
                        <Input
                        type="text"
                        placeholder="Tìm kiếm trên Messenger"
                        className="pl-10 w-40 md:w-64 h-10 bg-[#F0F2F5] rounded-full border-none chatMenuInput"
                        style={{ textIndent: '40px' }}
                        />
                    </div>
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message    />
                        <Message own={true}   />
                        <Message    />
                        <Message    />
                        <Message    />
                        <Message    />
                        <Message    />
                        <Message    />
                        <Message    />
                        <Message    />

                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="Aa"></textarea>
                        <img src="images/send.png" alt="send" className="chatSubmitButton" />
                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>

        </div>
    );
}

export default Messenger;
