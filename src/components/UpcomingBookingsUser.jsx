import React, { useEffect, useState } from 'react'
import CardScroller from './CardScroller';
import { cancelABooking } from '../apiclient';
import ModalConfirmation from './ModalConfirmation';

const UpcomingBookingsUser = ({transformedData}) => {

  const [upcBookings,setupcBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  
  useEffect(()=>{
    const now = new Date();
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const upcomingBookings = transformedData?.filter(data => {
      const checkInDate = new Date(data.booking.checkIn);
      const checkInDateOnly = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
      return checkInDateOnly > nowDateOnly;
    });
    
    upcomingBookings?.sort((a,b)=> new Date(a.booking.checkIn)-new Date(b.booking.checkIn));
    
    setupcBookings(upcomingBookings);
   
  },[transformedData]);

  const handleCancelBooking = async(hotelId,bookId) =>{
    try {
      const res = await cancelABooking(hotelId,bookId);
      if (res) {
        setupcBookings(prevBookings => prevBookings.filter(booking => booking.booking._id !==bookId));
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
    }

  }

  const openModal = (hotelId, bookId) => {
    setBookingToCancel({ hotelId, bookId });
    setIsModalOpen(true);
  };

  const confirmCancelBooking = () => {
    if (bookingToCancel) {
      handleCancelBooking(bookingToCancel.hotelId, bookingToCancel.bookId);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
  }, [upcBookings]);
  

    if (!transformedData || transformedData.length === 0 || upcBookings?.length === 0) {
      return <><h1 className='font-semibold text-2xl mb-3'>Upcoming Bookings</h1><h1 className='text-red-500 mb-3 text-lg'>No bookings found :(</h1> </>
    }

  return (
    <div className=''>
    <h1 className='font-semibold text-2xl'>Upcoming Bookings</h1>
    <div>
      <CardScroller 
        cards={upcBookings} 
        checkMsg={'Check - Innn On :'}
        onCancelBooking = {openModal} 
      />
    </div>

    <ModalConfirmation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmCancelBooking}
        message="Are you sure you want to cancel this booking?"
      />
</div>
  )
}

export default UpcomingBookingsUser