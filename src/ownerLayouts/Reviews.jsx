import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext';
import CounterBooking from '../components/CounterBooking';
import { AiFillStar } from 'react-icons/ai';
import { MdHotel } from "react-icons/md";
import { BarChart } from '@mui/x-charts/BarChart';
import { FaCalendarAlt } from "react-icons/fa";
import api from '../api/axiosConfig';

const Reviews = () => {
  const {isHotelAdded,ownerHotelDetails} = useContext(DataContext);

  let totalReviews = 0;
  let sumOfStarRates = 0; //to calculate avg review
  const [avgStars,setavgStars] = useState(0);

  //console.log('own',ownerHotelDetails);

  let onestar = 0;
  let twostar = 0;
  let threestar = 0;
  let fourstar = 0;
  let fivestar = 0;

  //FOR ALL REVIEWS
  const reviewedUserDetail = [];

  if (ownerHotelDetails?.bookings) {
    for (let i = 0; i < ownerHotelDetails.bookings.length; i++) {
      if (ownerHotelDetails?.bookings[i].starRate) {
        totalReviews+=1;
        sumOfStarRates = sumOfStarRates + ownerHotelDetails?.bookings[i].starRate;

        reviewedUserDetail.push(ownerHotelDetails?.bookings[i]);

        if (ownerHotelDetails?.bookings[i].starRate === 1) {
          onestar+=1;
        }
        if (ownerHotelDetails?.bookings[i].starRate === 2) {
          twostar+=1;
        }
        if (ownerHotelDetails?.bookings[i].starRate === 3) {
          threestar+=1;
        }
        if (ownerHotelDetails?.bookings[i].starRate === 4) {
          fourstar+=1;
        }
        if (ownerHotelDetails?.bookings[i].starRate === 5) {
          fivestar+=1;
        }
      }


    }
  }

  useEffect(()=>{
    const calculateAvgStars = () => {
      if (totalReviews > 0) {
        setavgStars(sumOfStarRates / totalReviews);
      }
    };
  
    calculateAvgStars();

    const updatedRec = {
      starRating: avgStars,
    }

    const updateHotelDetails = async () => {
    try {
      await api.put(`/hotelRoute/${ownerHotelDetails?._id}`,updatedRec,{
        withCredentials:true,
        headers:{
          'Content-Type':"application/json"
        }
      });
      

    } catch (error) {
      console.log(error.message);
    }
    }
    if (avgStars > 0) {
      updateHotelDetails();
    }

  },[avgStars,sumOfStarRates,totalReviews,ownerHotelDetails]);

  //console.log('tot',reviewedUserDetail);

  return (
    <div>
      {
      isHotelAdded
      ?
      <>
        <h1 className="text-4xl px-2 font-semibold mb-2 text-pink-800">Reviews</h1>
  
        <div className='text-center mx-auto w-1/4 p-5 rounded-full shadow'>
          <p className='text-3xl font-bold text-yellow-600'>Overall</p>
          <p className='text-9xl text-yellow-600 font-bold'>{avgStars}</p>
          <div className='justify-center flex '>
            {
                Array.from({length:avgStars}).map((_,index)=>(
                    <AiFillStar key={index} className='fill-yellow-400 text-4xl'/>
                ))
                
            }
            {
              Array.from({length:5-avgStars}).map((_,index)=>(
                <AiFillStar key={index} className='fill-gray-400 text-4xl'/>
            ))
            }
            </div>
                                
          <p className='flex justify-center mb-2 text-2xl text-pink-800'>
                    Based on <CounterBooking endValue={totalReviews} /> <span className='mr-2'></span> reviews
          </p>
        </div>

        <div className="flex mt-8">
          <div className='border shadow rounded w-1/2 p-3 py-6'>
            <h1 className="text-2xl text-gray-500 mb-3 flex"><MdHotel className='mr-3 text-3xl'/> Review Summary</h1>
            <p className="border-b-2 mb-3"></p>

            <div>
              <BarChart
                yAxis={[{ scaleType: 'band', data: ['1 Star','2 Star','3 Star','4 Star','5 Star'] }]}
                xAxis={[{label:'No. of Guests'}]}
                layout="horizontal"
                series={[{ data: [onestar,twostar,threestar,fourstar,fivestar] }]}
                width={700}
                height={300}
              />
            
            </div>
          </div>

          <div className="border shadow rounded p-3 py-6 w-1/2 " >
            <h1 className="text-2xl text-gray-500 mb-3 flex"><MdHotel className='mr-3 text-3xl'/> All Reviews</h1>
            <p className="border-b-2 mb-1"></p>

            <div className="overflow-y-scroll" style={{ height: 'fit-content', maxHeight: '450px' }}>
              
              {
                reviewedUserDetail?.map((eachuser,idx)=>(
                  <div className='border text-pink-800 p-2' key={idx}>
                    <div className="flex justify-between">
                      <p className='font-bold text-lg'>{eachuser.name}</p>
                      <p className='flex text-lg'><FaCalendarAlt className='mr-1 text-xl' /> {new Date(eachuser.checkOut).toDateString()}</p>
                    </div>

                    <div className='flex text-lg'>
                      <p className='mr-1'>Rated</p>
                      {
                        Array.from({length:eachuser.starRate}).map((_,index)=>(
                            <AiFillStar key={index} className='fill-yellow-400 text-xl mt-1'/>
                        ))
                
                      }
                      
                    </div>
                  </div>
                ))
                
              }

            </div>
             
          </div>


        </div>

      </>
      : <div>
          <p className='text-xl text-pink mb-2'>Add your hotel details in the My Hotel section to get reviews</p>
        </div>
    }
    </div>
  )
}

export default Reviews