import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Home,
  LogOut,
  MessageCircle,
  User,
  Users,
  Video,
} from "lucide-react";
import React from 'react'

const LeftSideBar = () => {
  return (
    <aside
      className={`fixed top-12 left-0 h-full w-64 p-4 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* navigation menu yaha pr */}
        <nav className="space-y-3 flex-grow">
          <div className="flex items-center space-x-2 cursor-pointer ">
            <Avatar className="h-10 w-10 ml-2">
              <AvatarImage />
              <AvatarFallback>V</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium leading-none">Võ Nhất Phương</p>
            </div>
            <Button
              variant="ghost"
              className="full justify-start">
              <img src="images/friend_sidebar.png" alt="friend" className="mr-2" /> 
               Bạn bè
            </Button>
            <Button
              variant="ghost"
              className="full justify-start">
                <img src="images/save_sidebar.png" alt="saved" className="mr-4" /> 
               Đã lưu
            </Button>
            <Button
              variant="ghost"
              className="full justify-start">
                <img src="images/video_sidebar.png" alt="video" className="mr-2" /> 
               Video
            </Button>
            <br></br>
            <Button
              variant="ghost"
              className="full justify-start">
                <img src="images/calendar_sidebar.png" alt="calendar" className="mr-4" /> 
               Lịch
            </Button>
            <br></br>
            <Button
              variant="ghost"
              className="full justify-start">
                <img src="images/document_sidebar.png" alt="document" className="mr-2" /> 
               Tài liệu
            </Button>
            <Button
              variant="ghost"
              className="full justify-start">
                <img src="images/pomodoro_sidebar.png" alt="pomodoro" className="mr-0" /> 
               Chế độ Pomodoro
            </Button>
            <Button
              variant="ghost"
              className="full justify-start">
                <img src="images/bookshop_sidebar.png" alt="bookshop" className="mr-0" /> 
               Mua sách
            </Button>
            <Button
              variant="ghost"
              className="full justify-start">
                <img src="images/game_sidebar.png" alt="game" className="mr-0" /> 
               Củng cố kiến thức
            </Button>
            
        </nav>

      </div>
    </aside>
  )
}

export default LeftSideBar
