"use client"
import StorySection from '@/app/story/StorySection'
import { useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import RightSideBar from '../components/RightSideBar'
import NewPostForm from '../posts/NewPostForm'
import PostCard from '../posts/PostCard'

const Homepage = () => {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false)
  const posts = [{
    _id: 1,
    content: 'Hello World',
    mediaUrl: "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600",
    mediaType: 'image'
  }]
  return (
    <div className="flex flex-col min-h-screen text-foreground">
        <main className="pt-16 flex flex-1">
          <LeftSideBar />
          <div className="flex-1 px-4 py-6 md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mxx-auto">
            <div className="lg:ml-2 xl:ml-28">
              <StorySection />
              <NewPostForm 
                isPostFormOpen={isPostFormOpen}
                setIsPostFormOpen={setIsPostFormOpen}
              />

              <div className='mt-6 space-y-6'>
                {posts.map(post => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:w-64 xl:w-80 fixed top-16 right-0 bottom-0 overflow-y-auto p-4">
            <RightSideBar />              
          </div>
        </main>
        
    </div>
  )
}

export default Homepage