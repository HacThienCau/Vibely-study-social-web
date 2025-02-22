import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import EmojiPicker from 'emoji-picker-react'
import { AnimatePresence } from 'framer-motion'
import { motion } from "framer-motion";
import { FileType, ImageIcon, Plus, XIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import React from 'react'

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })
const NewPostForm = ( {isPostFormOpen, setIsPostFormOpen}) => {
  const [filePreview, setFilePreview] = React.useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
  const [postContent, setPostContent] = React.useState('')
  const handleEmojiClick = (emojiObject) => {
    setPostContent(prev => prev + emojiObject.emoji)
  }
  return (
    <Card className="bg-white border-none">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <Dialog open={isPostFormOpen} onOpenChange={setIsPostFormOpen}>
            <DialogTrigger className="w-full">
              <Input
              placeholder={`Phương ơi, bạn đang cần gì?`}
              readOnly
              className="cursor-pointer rounded-full h-12 bg-[#DCE0EA] border-none"
              style={{ backgroundColor: "rgba(220, 224, 234, 0.5)" }} 
              />
              <div className="border-t border-gray-300 my-4"></div>
              <div className="flex justify-between">
                <Button  variant="ghost" className="flex items-center justify-center">
                  <img src="/images/video_newpost.png" alt="video" className="h-4 w-6"/>
                  <span>Video</span>
                </Button>
                <Button  variant="ghost" className="flex items-center justify-center">
                  <img src="/images/image_newpost.png" alt="image" className="h-5 w-5"/>
                  <span>Ảnh</span>
                </Button>
                <Button  variant="ghost" className="flex items-center justify-center">
                  <img src="/images/emotion_newpost.png" alt="emotion" className="h-6 w-6"/>
                  <span>Cảm xúc</span>
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto bg-white">
              <DialogHeader>
                <DialogTitle className="text-center mb-3">Tạo bài viết mới</DialogTitle>
                <div className="border-t border-gray-300 my-4 "></div>
                <div className="flex items-center space-x-3 py-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    Võ Nhất Phương
                  </p>
                </div>
                </div>
                <Textarea
                  placeholder="Bạn muốn hỏi bài hay chia sẻ điều gì về học tập?"
                  className="min-h-[100px] text-sm relative -top-3"
                  />
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className='relative mt-4 border-2 border-gray-300 rounded-lg p-8 flex items-center justify-between'
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2">
                    </Button>
                    {filePreview? (
                      FileType.startsWith('image') ? (
                        <img/>
                    ):(
                      <video/>
                    )
                  ):(<>
                  <Plus className='h-12 w-12 text-gray-400 mb-2 cursor-pointer'/>
                  <p className='text-center text-gray-500'>Thêm ảnh hoặc video</p>
                  </>
                  )
                  }
                  <input type="file" accept="image/*, video/*" className="hidden"/>
                  </motion.div>
                </AnimatePresence>
                  <div className="bg-bray-200 p-4 rounded-lg mt-4 ">
                    <p className="font-semibold mb-2">Thêm bài viết</p>
                    <div className="flex space-x-2">
                    <Button  variant="ghost" className="flex items-center justify-center">
                      <img src="/images/video_newpost.png" alt="video" className="h-3 w-5"/>
                      <span className=''>Video</span>
                    </Button>
                    <Button  variant="ghost" className="flex items-center justify-center">
                      <img src="/images/image_newpost.png" alt="image" className="h-5 w-5"/>
                      <span>Ảnh</span>
                    </Button>
                    <Button  variant="ghost" className="flex items-center justify-center"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <img src="/images/emotion_newpost.png" alt="emotion" className="h-6 w-6"/>
                      <span>Cảm xúc</span>
                    </Button>
                </div>
              </div>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y:20 }}
                  animate={{ opacity: 1, y:0 }}
                  exit={{ opacity: 0, y:20 }}
                  className="relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => setShowEmojiPicker(false)}
                    >
                    
                  </Button>
                  <Picker onEmojiClick={handleEmojiClick}/>
                </motion.div>
              )}
              <div className="flex justify-end mt-4">
                <Button className="bg-blue-500 text-white">
                  Đăng
                </Button>
              </div>

              </DialogHeader>

            </DialogContent>
          </Dialog>
        </div>

      </CardContent>
    </Card>
  )
}

export default NewPostForm
