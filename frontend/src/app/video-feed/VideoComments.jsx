"use client";
//import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const VideoComments = ({comments}) => {
    return (
        <>
            {comments?.map((comment,index)=>(
                <div key={comment?._id} className='flex items-start space-x-2 mb-4'>
                    <Avatar className="h-8 w-8">
                        <AvatarImage/>
                        <AvatarFallback className="bg-gray-200">P</AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                        <div className='bg-gray-100 rounded-lg p-2'>
                            <p className='font-semibold text-sm'>{comment?.user?.username}</p>
                            <p className='text-sm'>{comment?.user?.text}</p>
                        </div>
                        <div className='flex items-center mt-1 text-xs text-gray-400'>
                            <Button variant="ghost" size="sm">Thích</Button>
                            <Button variant="ghost" size="sm">Phản hồi</Button>
                            <span>{comment?.createdAt}</span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default VideoComments