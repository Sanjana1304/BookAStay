import React from 'react'

const AboutStart = () => {
  return (
    <div className='mb-10 mt-10'>
        <h1 className=' mb-10 text-5xl text-pink-800 text-center font-bold'>About Us</h1>
        <div className="flex container mx-auto">
            <img src={`${process.env.PUBLIC_URL}/aboutpic.jpg`} alt="startpic" className='mr-7 rounded'/>
            <div className='text-lg font-semibold text-pink-800'>
                <p>Welcome to BookAStay, your go-to platform for seamless hotel bookings and unforgettable stays. Our mission is to make finding and booking the perfect hotel as effortless and enjoyable as possible.
                </p>
                <br />
                <p>
                At BookAStay, we understand that every traveler has unique preferences and needs. That's why we've designed our app to offer a wide range of features tailored to enhance your experience. From exploring recently added hotels to filtering search results based on your preferences, we're here to help you discover accommodations that fit your style and budget.
                </p>
                <br />
                <p>
                For hotel owners, we provide a powerful suite of tools to manage bookings, track performance, and connect with guests. Our intuitive dashboard and advanced analytics give you the insights you need to optimize your property and deliver exceptional hospitality.
                </p>
                <br />
                <p>
                Whether you're planning a relaxing getaway or managing your hotel's operations, BookAStay is dedicated to making your journey smooth and enjoyable. Join us today and experience the convenience of modern hotel booking at your fingertips.
                </p>
                <br />
                <p>
                Thank you for choosing BookAStay. We're excited to help you find your next perfect stay!
                </p>
            </div>
        </div>
        
    </div>
  )
}

export default AboutStart