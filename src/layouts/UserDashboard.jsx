import React from 'react'
import Header from '../components/Header'
import UpcomingBookingsUser from '../components/UpcomingBookingsUser'
import BookingHistoryUser from '../components/BookingHistoryUser'
import UserProfileManagement from './UserProfileManagement'
import { useQuery } from 'react-query'
import { fetchUserData } from '../apiclient'
import { fetchMyBookings } from '../apiclient';
import CurrentStayUser from '../components/CurrentStayUser'

const UserDashboard = () => {

  //user data
  const {data : userdata} = useQuery('fetchUserData',fetchUserData);

  //all booking data
  const {data: bookingdata} = useQuery(
    ['fetchMyBookings',userdata?.userId],
    () => fetchMyBookings(userdata?.userId)
  )

  //transformed data
  const transformedData = bookingdata?.flatMap((fullbooking)=>
    fullbooking.bookings.map(booking => ({
      id: fullbooking._id,
      hotelname:fullbooking.name,
      city:fullbooking.city,
      country:fullbooking.country,
      staytype: fullbooking.type,
      price: fullbooking.price,
      starRating: fullbooking.starRating,
      image: fullbooking.imageUrls[0],
      booking:  booking

    }))
  )

  transformedData?.sort((a,b)=> new Date(b.booking.checkOut)-new Date(a.booking.checkOut));
  
    
  return (
    <>
    <Header home={true}/>

    <div className='container mx-auto mt-5 text-pink-800'>

      <CurrentStayUser transformedData={transformedData} />

      <UpcomingBookingsUser transformedData={transformedData}/>

      <BookingHistoryUser transformedData={transformedData} />

      {/* <WishListUser /> */}

      <UserProfileManagement userdata={userdata}/>
    </div>
    </>
  )
}

export default UserDashboard