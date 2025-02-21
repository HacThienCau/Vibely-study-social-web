import React from 'react'
import LeftSideBar from '../components/LeftSideBar'

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-#E0F8FE text-foreground">
        <main className="pt-16 flex flex-1">
          <LeftSideBar />
        </main>
        
    </div>
  )
}

export default Homepage