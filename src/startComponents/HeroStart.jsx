import React from 'react'

const HeroStart = () => {
  return (
    <div className='container mx-auto h-screen items-center flex justify-between mb-7'>
        <div className='w-1/2'>
            <p className='text-8xl font-bold mb-10 text-pink-800'>Discover Your Next Getaway !</p>
            <p className="italic text-3xl font-bold text-gray-700">
                Explore top hotels and book your next unforgettable getaway
            </p>
        </div>
        <div className="w-1/2">
        <img src={`${process.env.PUBLIC_URL}/startpagemain.png`} alt="startpic" className='mb-5'/>
        </div>
    </div>
  )
}

export default HeroStart