"use client";
//import React from "react";
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import LeftSideBar from "../components/LeftSideBar";
import VideoCard from "./VideoCard";

const Page = () => {
    const videoPosts = [{
        mediaUrl:"",
        mediaType:"video",
        comments:[{
            user:{
                username:"Võ Nhất Phương",
                text:"Ảnh đẹp quá"
            }
        }]
    }];
    return (
        <div className='mt-12 min-h-screen'>
            <LeftSideBar/>
            <main className='ml-0 md:ml-64 p-6'>
                <Button variant="ghost" className="mb-4">
                    <ChevronLeft className='mr-2 h-4 w-4'/> Quay lại bảng tin
                </Button>
                <div className='max-w-3xl mx-auto'>
                    {videoPosts.map((post) => (
                        <VideoCard
                            key={post?._id}
                            post={post}
                            // isLiked = {likePosts.has(post?._id)}
                            // onLike={() => handleLike(post?._id)}
                            // onComment={async(comment) => {
                            //     await handleCommentPost(post?._id,comment.text);
                            //     await fetchPost();
                            // }}
                            // onShare = {async() =>{
                            // await handleSharePost(post?._id)
                            // await fetchPost();
                            // }}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Page