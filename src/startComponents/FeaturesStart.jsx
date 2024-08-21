import React from 'react';
import { GrSecure } from "react-icons/gr";
import { MdPayment } from "react-icons/md";
import { FaSortAmountDown } from "react-icons/fa";
import { MdUpcoming } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";

const FeaturesStart = () => {
  return (
    <div>
        <h1 className='text-5xl text-pink-800 text-center font-bold'>Features</h1>
        <div className="container mx-auto mt-7 px-10 py-10">
            <div className="relative">
                <div className="absolute inset-y-0 left-1/2 w-1 bg-gray-300"></div>
                <div className="flex flex-col space-y-8">
                
                    <div className=" flex">
                        <div className="rounded-full text-white bg-pink-800 w-1/2 py-10">
                            <GrSecure className='text-4xl mx-auto mb-4' />
                            <h3 className="font-semibold text-2xl text-center">Secure Login & Registration</h3>
                        </div>
                    </div>
            
                    <div className=" flex flex-row-reverse space-x-reverse">
                        <div className=" rounded-full py-10 text-white bg-pink-800 w-1/2 p-2">
                            <MdPayment className='text-4xl mx-auto mb-4' />
                            <h3 className="font-semibold text-2xl text-center">Secure Payments using Stripe</h3>
                        </div>
                    </div>

                    <div className=" flex">
                        <div className=" rounded-full py-10 text-white bg-pink-800 w-1/2 p-2">
                            <FaSortAmountDown className='text-4xl mx-auto mb-4'/>
                            <h3 className="font-semibold text-2xl text-center">Search, Sort & Filter Hotels</h3>
                        </div>
                    </div>
            
                    <div className=" flex flex-row-reverse space-x-reverse">
                        <div className=" rounded-full py-10 text-white bg-pink-800 w-1/2 p-2">
                            <MdUpcoming className='text-4xl mx-auto mb-4' />
                            <h3 className="font-semibold text-2xl text-center">View Upcoming Bookings</h3>
                        </div>
                    </div>

                    <div className=" flex">
                        <div className=" rounded-full py-10 text-white bg-pink-800 w-1/2 p-2">
                            <FaHistory className='text-4xl mx-auto mb-4'/>
                            <h3 className="font-semibold text-2xl text-center">View Booking History</h3>
                        </div>
                    </div>

                    <div className=" flex flex-row-reverse space-x-reverse">
                        <div className=" rounded-full py-10 text-white bg-pink-800 w-1/2 p-2">
                            <BiCurrentLocation className='text-4xl mx-auto mb-4' />
                            <h3 className="font-semibold text-2xl text-center">View Current Stay</h3>
                        </div>
                    </div>
                
            </div>
        </div>
    </div>
    </div>
  )
}

export default FeaturesStart