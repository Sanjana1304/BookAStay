import React, { useContext } from 'react'
import DataContext from '../context/DataContext';

const Forum = () => {
  const {isHotelAdded} = useContext(DataContext);
  return (
    <div>
      {
      isHotelAdded
      ?
      <>
        <p>hotel is there </p>
      </>
      : <div>
          <p className='text-xl text-pink mb-2'>Add your hotel details in the dashboard to view your reviews</p>
        </div>
    }
    </div>
  )
}

export default Forum