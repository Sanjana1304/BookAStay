import React, { useState } from 'react';
import { IoPeopleSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from '../api/axiosConfig';

const CurrentStayUser = ({transformedData}) => {
    const [isExtendClicked,setisExtendClicked] = useState(false);
    const [newcheckout,setnewcheckout] = useState(null);

    const now = new Date();
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

   //useEffect(()=>{
      const currentStayData = transformedData?.filter(data => {
        const checkOutDate = new Date(data.booking.checkOut);
        const checkOutDateOnly = new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate());
        
        const checkInDate = new Date(data.booking.checkIn);
        const checkInDateOnly = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
        
        return checkOutDateOnly >= nowDateOnly && checkInDateOnly <= nowDateOnly;
      });
      

      const currentStayDataa = currentStayData?.length > 0 ? currentStayData[0] : null;
     
    //},[transformedData])
    const handleDateChange = (date, name) => {
        setnewcheckout(date);
       
    };

    const handleExtend = () =>{
        setisExtendClicked(true);
    }

    const updateCheckOut = async() =>{

        try {
            console.log(newcheckout);
            await api.put(`/hotelRoute2/${currentStayDataa.id}/bookings/${currentStayDataa.booking._id}/extendstay`,{ newcheckout: newcheckout},{
            headers:{
                'Content-Type':'application/json'
            }
            });

            window.alert('Woohoo! Stay extended')
        } catch (error) {
            console.error(error.message);
        }
        
    }

    if (!transformedData || transformedData.length === 0) {
      return
    }


    return (
        currentStayDataa && 
        <div className="flex items-center justify-center border-b-2 border-b-gray-300 pb-8 mb-10">
            <div className="text-center w-3/4">
                <h1 className="font-semibold text-4xl mb-10">Your Current Stay</h1>
                <p className="mb-5">.</p>
                <div className='flex justify-between'>
                    <div className=''>
                        <img src={currentStayDataa?.image} alt="Hotel" className='rounded-full' />
                    </div>
                    <div className="">
                        <p className="font-semibold text-3xl">{currentStayDataa?.hotelname}</p>
                        <p className="text-gray-500 mb-3">{currentStayDataa?.city}, {currentStayDataa?.country}</p>
                        <p className="font-semibold text-xl mb-2">Amount Paid: ${currentStayDataa?.booking.totalCost}</p>

                        <div className="flex text-center w-full justify-center mb-3">
                            <IoPeopleSharp className='text-3xl'/>
                            <p className="font-semibold text-xl mb-2 ml-3"> {currentStayDataa?.booking.adultcnt} Adults & {currentStayDataa?.booking.childcnt} children</p>
                        
                        </div>
                       
                        <div className="bg-pink-800 p-2 w-max m-auto">
                            <div className="flex mb-1">
                            <p className="font-semibold text-xl mb-1 text-white w-1/2">Checked In : </p>
                            <span className='bg-gray-200 p-1 px-2 text-pink-800 w-1/2'>{new Date(currentStayDataa?.booking.checkIn).toDateString()}</span>
                            </div>

                            <div className="flex">
                            <p className="font-semibold text-xl mb-1 text-white w-1/2"> Check Out : </p>
                            <span className='bg-white p-1 px-2 text-pink-800 w-1/2'>{new Date(currentStayDataa?.booking.checkOut).toDateString()}</span>
                            </div>
                        
                        </div>
                        
                        
                       <button className="w-full bg-yellow-400 text-xl text-pink-800 p-3 px-10 mt-10 hover:bg-yellow-600" onClick={handleExtend}>Extend</button>
                        {
                            isExtendClicked &&
                               <div>
                                    <DatePicker
                                        selected={newcheckout}
                                        selectsEnd
                                        startDate={new Date(currentStayDataa?.booking.checkOut)}
                                        
                                        minDate={new Date(currentStayDataa?.booking.checkOut)}
                                        
                                        onChange={date => handleDateChange(date, 'checkOut')}
                                        placeholderText='Enter New Check-out Date'
                                        className='mt-2 min-w-full border  p-2 focus:outline-none'
                                        wrapperClassName='min-w-full'
                                    />
                                    <button className='mt-3 bg-pink-800 p-2 text-sm text-white' onClick={updateCheckOut}>Update</button>
                               </div>
                            
                        }
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CurrentStayUser