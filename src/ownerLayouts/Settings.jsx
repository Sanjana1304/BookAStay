import React, { useContext } from 'react'
import DataContext from '../context/DataContext';
import ProfileOwner from './ProfileOwner';
import HotelDetails from './HotelDetails';
const Settings = ({data}) => {

  const {isHotelAdded} = useContext(DataContext);

  return (
    <div>
      <h1 className='font-bold text-3xl'>Account Information</h1>
    {
      isHotelAdded
      ?
      <>

        <ProfileOwner data={data}/>
        <HotelDetails/>
      </>
      
      : <div>
          <ProfileOwner/>
        </div>
    }
    </div>
  )
}

export default Settings