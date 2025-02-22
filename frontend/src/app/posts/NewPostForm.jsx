import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import * as Popover from '@radix-ui/react-popover'
import { motion } from 'framer-motion'
import { ImageIcon, XIcon, Smile} from 'lucide-react'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })

const NewPostForm = ({ isPostFormOpen, setIsPostFormOpen }) => {
  const [filePreview, setFilePreview] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [postContent, setPostContent] = useState('')

  const handleEmojiClick = (emojiObject) => {
    setPostContent((prev) => prev + emojiObject.emoji)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const previewURL = URL.createObjectURL(file)
      setFilePreview({ url: previewURL, type: file.type })
    }
  }

  return (
    <Card className="bg-white border-none shadow-md rounded-lg">
      <CardContent className="p-4">
        <div className="flex space-x-4 items-center">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <Dialog open={isPostFormOpen} onOpenChange={setIsPostFormOpen}>
            <DialogTrigger className="w-full">
              <Input
                placeholder="Phương ơi, bạn đang nghĩ gì?"
                readOnly
                className="cursor-pointer rounded-full h-12 bg-gray-100 border-none px-4"
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-white rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-center text-lg font-semibold">Tạo bài viết</DialogTitle>
              </DialogHeader>
              <div className="border-t border-gray-200"></div>
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <p className="font-medium">Võ Nhất Phương</p>
              </div>
              <Textarea
                placeholder="Bạn muốn chia sẻ điều gì hôm nay?"
                className="w-full min-h-[100px] text-sm bg-gray-100 p-2 rounded-md"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              {filePreview && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative mt-4"
                >
                  {filePreview.type.startsWith('image') ? (
                    <img src={filePreview.url} alt="Preview" className="w-full rounded-md" />
                  ) : (
                    <video src={filePreview.url} controls className="w-full rounded-md" />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white rounded-full p-1"
                    onClick={() => setFilePreview(null)}
                  >
                    <XIcon className="h-5 w-5 text-gray-500" />
                  </Button>
                </motion.div>
              )}
              <div className="flex justify-between mt-4">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <ImageIcon className="h-5 w-5 text-green-500" />
                  <span>Ảnh/Video</span>
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
                </Button>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Smile className="h-5 w-5 text-yellow-500" />
                      <span>Biểu cảm</span>
                    </Button>
                  </Popover.Trigger>
                  <Popover.Portal>
                  <Popover.Content className="bg-white shadow-lg rounded-md p-2 w-64 z-50" side="top" align="center">
                  <Picker onEmojiClick={handleEmojiClick} />
                      <Popover.Arrow className="fill-white" />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>

              </div>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="relative mt-2"
                >
                  <Picker onEmojiClick={handleEmojiClick} />
                </motion.div>
              )}
              <div className="flex justify-end mt-4">
                <Button className="bg-blue-500 text-white w-full py-2 rounded-md">Đăng</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

export default NewPostForm
