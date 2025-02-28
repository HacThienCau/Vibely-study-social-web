import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, PenLine, SquarePlus } from "lucide-react";
import React from "react";

const ProfileHeader = () => {
  return (
    <div className="relative">
      <div className="relative h-64 md:h-80 bg-gray-300 overflow-hidden ">
        <img src="/images/BG.png" alt="cover" className="w-full h-full object-cover" />

        <Button
          className="absolute bottom-4 right-4 flex items-center"
          variant="secondary"
          size="sm"
        >
          <Camera className=" mr-0 md:mr-2 h-4 w-4" />
          <span className="hidden md:block">Chỉnh sửa ảnh bìa</span>
        </Button>
      </div>
      {/* profile section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-5 ">
          <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-700">
            <AvatarImage src="/images/phuong.jpg" />
            <AvatarFallback className="dark:bg-gray-400">P</AvatarFallback>
          </Avatar>
          <div className="mt-4 mdLmt-0 text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold">Võ Nhất Phương</h1>
            <p className="text-gray-400 font-semibold">@phuong.vonhat.tuhy</p>
          </div>
          <div className="flex flex-col">
          <Button className="mt-4 md:mt-0 bg-[#086280] text-white cursor-pointer">
            <SquarePlus className="w-4 h-4 mr-2" />
            Thêm bài viết
          </Button>
          <Button className="mt-4 md:mt-1 font-semibold cursor-pointer">
            <PenLine className="w-4 h-4 mr-2" />
            Chỉnh sửa trang cá nhân
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
