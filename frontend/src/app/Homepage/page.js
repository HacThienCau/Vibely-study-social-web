import React from 'react'
import LeftSideBar from '../components/LeftSideBar'
import RightSideBar from '../components/RightSideBar'

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-#E0F8FE text-foreground">
        <main className="pt-16 flex flex-1">
          <LeftSideBar />
          <div className="flex-1 px-4 py-6 md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mxx-auto">
          </div>
          <div className="hidden lg:block lg:w-64 xl:w-80 fixed top-16 right-0 bottom-0 overflow-y-auto p-4">
            <RightSideBar />
          </div>
        </main>
        
    </div>
  )
}

export default Homepage