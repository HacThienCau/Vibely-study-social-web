// import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, MoreHorizontal, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { PiShareFatBold } from "react-icons/pi"
import PostComments from './PostComments'
import { formatedDate } from '@/lib/utils'
import Image from 'next/image'
import toast from 'react-hot-toast'


const PostCard = ({post, reaction, onReact, onComment, onShare}) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showReactionChooser, setShowReactionChooser] = useState(false)
  const [isChoosing, setIsChoosing] = useState(false)
  const totalReact = post?.reactionStats?.like+post?.reactionStats?.love+post?.reactionStats?.haha+post?.reactionStats?.wow+post?.reactionStats?.sad+post?.reactionStats?.angry



  const userPlaceholder = post?.user?.username?.split(" ").map((name) => name[0]).join(""); // tên người đăng bài viết tắt




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
  const handleReaction = (reaction) => {
    console.log("(PostCard.jsx/handleReaction) Reaction in post that has id", post?._id,":", reaction)
    setIsChoosing(false)  //đã chọn được 'cảm xúc'
   // onReact(post?._id,reaction);






    setShowReactionChooser(false); // Ẩn thanh reaction sau khi chọn
  };
  return (
    <motion.div
      key={post?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-md rounded-lg border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Avatar>
              {post?.user?.profilePicture ? (
                <AvatarImage src={post?.user?.profilePicture} alt={post?.user?.username}/>
                ):(
                <AvatarFallback>{userPlaceholder}</AvatarFallback>
              )}
              </Avatar>
              <div>
                <p className="font-semibold">
                  {post?.user?.username} {/*tên người đăng bài*/}
                </p>
                <p className="font-sm text-gray-500 text-xs">
                  {formatedDate(post?.createdAt)} {/*thời gian đăng bài*/}
                </p>
              </div>
            </div>
            <Button variant="ghost" className="hover:bg-gray-100">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="mb-4">{post?.content}</p>
          {post?.mediaUrl && post.mediaType === "image" && (
            <img
              src={post?.mediaUrl}
              alt="post_image"
              className="w-full h-auto rounded-lg mb-2"
            />
          )}
          {post?.mediaUrl && post.mediaType === "video" && (
            <video controls className="w-full h-[500px] rounded-lg mb-3">
              <source src={post?.mediaUrl} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
          )}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[15px] text-gray-500 hover:underline border-gray-400 cursor-pointer">
              {
              totalReact>1000000?totalReact/1000000+" triệu":  //Nếu tổng lượt react >1tr thì hiển thị kiểu 1 triệu, 2 triệu,...
              totalReact>1000?totalReact/1000+" ngàn":totalReact  //Nếu tổng lượt react >1000 thì hiển thị kiểu 1 ngàn, 2 ngàn,...
              }
            </span>
            <div className="flex gap-3">
              <span
                className="text-[15px] text-gray-500 hover:underline border-gray-400 cursor-pointer"
                onClick={() => setShowComments(!showComments)}
              >
                3 bình luận








              </span>
              <span className="text-[15px] text-gray-500 hover:underline border-gray-400 cursor-pointer">
                4 lượt chia sẻ






              </span>
            </div>
          </div>
          <Separator className="mb-1 border-b border-gray-300"/>
          <div className="flex justify-between mb-1 relative" >
            <Button
              onMouseEnter={()=>setShowReactionChooser(true)} //mở bảng để mukbang cảm xúc :))
              onMouseLeave={() =>setTimeout(() => setShowReactionChooser(false), 500)}
              variant="ghost"
              className={`flex-1 hover:bg-gray-100 text-gray-500 hover:text-gray-500 text-[15px] h-8`}
            >
              <ThumbsUp style={{ width: "20px", height: "20px" }} /> {reaction?reaction:'Thích'}
            </Button>
            {(showReactionChooser||isChoosing) && ( //nếu đang để chuột ở nút mở bảng chọn hoặc trong bảng chọn thì bảng chọn sẽ luôn hiện
            <div
            className={"absolute bottom-10 bg-white flex shadow gap-1 transition-all opacity-100 scale-100 translate-y-0 rounded-2xl"}
            onMouseEnter={()=>setIsChoosing(true)}  //đang chọn
            onMouseLeave={() =>setTimeout(() => setIsChoosing(false), 500)}
            >
            <motion.button whileHover={{ scale: 2 }}  //phóng to biểu tượng lên
            className="px-2 py-2" onClick={()=>{
              handleReaction('Like')
            }}>
              <Image src={"/like.gif"} alt="like" width={30} height={30}/>
            </motion.button>
            <motion.button whileHover={{ scale: 2 }}
            className="px-2 py-2" onClick={()=>{
              handleReaction('Love')
            }}>
            <Image src={"/love.gif"} alt="love"  width={30} height={30}/>
            </motion.button>
            <motion.button whileHover={{ scale: 2 }}
            className="px-2 py-2" onClick={()=>{
              handleReaction('Haha')
            }}>
            <Image src={"/haha.gif"} alt="haha"  width={30} height={30}/>
            </motion.button>
            <motion.button whileHover={{ scale: 2 }}
            className="px-2 py-2" onClick={()=>{
              handleReaction('Wow')
            }}>
              <Image src={"/wow.gif"} alt="wow"  width={30} height={30}/>
            </motion.button>
            <motion.button whileHover={{ scale: 2 }}
            className="px-2 py-2" onClick={()=>{
              handleReaction('Sad')
            }}>
            <Image src={"/sad.gif"} alt="sad"  width={30} height={30}/>
            </motion.button>
            <motion.button whileHover={{ scale: 2 }}
            className="px-2 py-2" onClick={()=>{
              handleReaction('Angry')
            }}>
            <Image src={"/angry.gif"} alt="angry"  width={30} height={30}/>
            </motion.button>
            </div>
          )}
            <Button
              variant="ghost"
              className={`flex-1 hover:bg-gray-100 text-gray-500 hover:text-gray-500 text-[15px] h-8`}
            >
              <MessageCircle style={{ width: "20px", height: "20px" }} /> Bình luận
            </Button>







            <Dialog
              open={isShareDialogOpen}
              onOpenChange={setIsShareDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex-1 hover:bg-gray-100 text-gray-500 hover:text-gray-500 text-[15px] h-8"
                >
                  <PiShareFatBold style={{ width: "20px", height: "20px" }} /> Chia sẻ
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
          <Separator className="border-b border-gray-300" />
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PostComments
                  post={post}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default PostCard
