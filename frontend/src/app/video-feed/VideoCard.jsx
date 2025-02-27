"use client";
//import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MessageCircle, Send, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { PiShareFatBold } from "react-icons/pi";
import VideoComments from './VideoComments';

const VideoCard = ({post}) => {
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
    const [showComments, setShowComments] = useState(false)

    const generateSharedLink = () => {
        return `http://localhost:3000/${post?.id}`;
    };
    const handleShare = (platform) => {
        const url = generateSharedLink();
        let shareUrl;
        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=}`;
                break;
            case "x":
                shareUrl = `https://twitter.com/intent/tweet?url=}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=}`;
                break;
            case "copy":
                navigator.clipboard.writeText(url);
                setIsShareDialogOpen(false);
                return;
            default:
                return;
        }
        window.open(shareUrl, "_blank");
        setIsShareDialogOpen(false);
    };

    return (
        <motion.div
            key={post?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 border border-gray-200"
        >
            <div>
                <div className="flex items-center justify-between my-3 px-3">
                    <div className="flex items-center">
                        <Avatar className="h-10 w-10 rounded-full mr-3 cursor-pointer">
                            <AvatarImage/>
                            <AvatarFallback className="bg-gray-200">P</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">
                                Võ Nhất Phương
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-xs">26-02-2025</span>
                    </div>
                </div>
                <div className="relative aspect-video bg-black mb-2">
                    {post?.mediaUrl && (
                        <video controls className="w-full h-[500px] rounded-lg mb-4">
                        <source src={post?.mediaUrl} type="video/mp4" />
                            Trình duyệt của bạn không hỗ trợ thẻ video
                        </video>
                    )}
                </div>
       
                <div className="md:flex justify-between px-2 mb-2 items-center">
                    <div className="flex">
                        <Button
                            variant="ghost"
                            className={`flex hover:bg-gray-100 items-center text-gray-500 hover:text-gray-500`}
                        >
                            <ThumbsUp style={{ width: "20px", height: "20px" }}/>
                            <span>Thích</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className={`flex hover:bg-gray-100 items-center text-gray-500 hover:text-gray-500`}
                        >
                            <MessageCircle style={{ width: "20px", height: "20px" }} /> 
                            <span>Bình luận</span>
                        </Button>
                        <Dialog
                            open={isShareDialogOpen}
                            onOpenChange={setIsShareDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex hover:bg-gray-100 items-center text-gray-500 hover:text-gray-500"
                                >
                                    <PiShareFatBold style={{ width: "20px", height: "20px" }}/> 
                                    <span>Chia sẻ</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Chia sẻ bài viết này</DialogTitle>
                                    <DialogDescription>
                                        Chọn cách bạn muốn chia sẻ bài viết này
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col space-y-4 ">
                                    <Button
                                        className="bg-gray-300 hover:bg-gray-200"
                                        onClick={() => handleShare("facebook")}
                                    >
                                        Chia sẻ trên Facebook
                                    </Button>
                                    <Button 
                                        className="bg-gray-300 hover:bg-gray-200"
                                        onClick={() => handleShare("x")}
                                    >
                                        Chia sẻ trên X
                                    </Button>
                                    <Button 
                                        className="bg-gray-300 hover:bg-gray-200"
                                        onClick={() => handleShare("linkedin")}
                                    >
                                        Chia sẻ trên Linkedin
                                    </Button>
                                    <Button 
                                        className="bg-gray-300 hover:bg-gray-200"
                                        onClick={() => handleShare("copy")}
                                    >
                                        Sao chép liên kết
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="flex ml-2 text-gray-500">
                        <Button variant="ghost" size="sm" className="font-normal text-[14px] hover:underline px-2">
                            3 lượt thích
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="font-normal text-[14px] hover:underline px-2"
                            onClick={() => setShowComments(!showComments)}
                        >
                            3 bình luận
                        </Button>
                        <Button variant="ghost" size="sm" className="font-normal text-[14px] hover:underline px-2">
                            3 lượt chia sẻ
                        </Button>
                    </div>
                </div>
                
                <AnimatePresence>
                    {showComments && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Separator className="border-b border-gray-300"/>
                            <ScrollArea className="h-[300px] w-full rounded-md px-4 py-2">
                                <VideoComments comments={post?.comments}/>
                            </ScrollArea>
                            <div className="flex items-center mt-4 p-2 border-t border-gray-300">
                                <Avatar className="h-10 w-10 rounded-full mr-3 cursor-pointer">
                                    <AvatarImage/>
                                    <AvatarFallback className="bg-gray-200">P</AvatarFallback>
                                </Avatar>
                                <Input
                                    className="flex-1 mr-2 bg-[#F0F2F5] rounded-xl border-none"
                                    // placeholder="Write a comment..."
                                    // value= {commentText}
                                    // ref={commentInputRef}
                                    // onChange={(e) => setCommentText(e.target.value)}
                                    // onKeyDown= {(e) => e.key === 'Enter' && handleCommentSubmit()}
                                />
                                <Button className="hover:bg-gray-100">
                                    <Send className="h-4 w-4"/>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default VideoCard