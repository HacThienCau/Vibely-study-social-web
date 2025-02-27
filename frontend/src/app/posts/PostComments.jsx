//import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const PostComments = ({post}) => {
    const [showAllComments, setShowAllComments] = useState(false);

    const visibleComments = showAllComments ? post?.comments : post?.comments?.slice(0, 2);
    return (
        <div className="mt-2">
            <h3 className="font-semibold mb-3">Bình luận</h3>
            <div className="max-h-60 overflow-y-auto pr-2">
                {visibleComments?.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-2 mb-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage/>
                            <AvatarFallback className="bg-gray-200">P</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <div className='bg-[#F0F2F5] rounded-lg px-3 py-2'>
                                <p className='font-semibold text-[13px]'>{comment?.user?.username}</p>
                                <p className='text-[15px]'>{comment?.user?.text}</p>
                            </div>
                            <div className='flex items-center text-xs text-gray-500'>
                                <Button variant="ghost" size="sm" className="px-2 hover:underline">Thích</Button>
                                <Button variant="ghost" size="sm" className="px-2 hover:underline">Phản hồi</Button>
                                <span className="px-2 hover:underline">{comment?.createdAt}2 ngày</span>
                            </div>
                        </div>
                    </div>
                ))}
                {post?.comments?.length > 2 && (
                    <p
                        className="w-40 mt-2 text-blue-500 cursor-pointer"
                        onClick={() => setShowAllComments(!showAllComments)}
                    >
                        {showAllComments ? (
                            <>Rút gọn <ChevronUp className="ml-2 h-4 w-4" /></>
                        ) : (
                            <>Tất cả bình luận <ChevronDown className="ml-2 h-4 w-4" /></>
                        )}
                    </p>
                )}
            </div>
        </div>
    )
}

export default PostComments;