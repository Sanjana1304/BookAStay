import React, { useState } from 'react';
import CardScroller from './CardScroller';

const BookingHistoryUser = ({transformedData}) => {
  const [reviewedCards, setReviewedCards] = useState({});

  const now = new Date();
  const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const bookingHistory = transformedData?.filter(data => {
    const checkOutDate = new Date(data.booking.checkOut);
    const checkOutDateOnly = new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate());
    return checkOutDateOnly < nowDateOnly;
  });

    if (!transformedData || transformedData.length === 0 || !bookingHistory) {
      return <><h1 className='font-semibold text-2xl mb-3'>Booking History</h1><h1 className='text-red-500 text-lg mb-3'>You haven't stayed in any hotels before :(</h1> </>
    }
  return (
    <div className=''>
        <h1 className='font-semibold text-2xl'>Booking History</h1>
        <div>
        <CardScroller 
          cards={bookingHistory} 
          checkMsg={'Checked Out On :'} 
          review={true}
          reviewedCards={reviewedCards}
          setReviewedCards = {setReviewedCards}
        />
        </div>
    </div>
  )
}

export default BookingHistoryUser