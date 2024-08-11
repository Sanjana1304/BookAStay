import React, { useContext } from 'react'
import DataContext from '../context/DataContext';

const FacilitiesFilter = () => {
    const {selectedFacilities,setselectedFacilities} = useContext(DataContext);

    const handleFacChange = (e) =>{
        const HotelFaci = e.target.value;
    
        setselectedFacilities((prevFaci)=>
          e.target.checked
          ? [...prevFaci,HotelFaci]
          : prevFaci.filter((fac)=>fac!==HotelFaci)
        );
      }

  return (
    <div className='border-b border-slate-300 pb-5'>
        <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>
        {["Free Wifi", "Parking","Airport Shuttle","Family Rooms","Non Smoking Rooms","Outdoor Pool","Camp Fire","Spa","Fitness Centre","Golf Ground","Snookers"].map((fac)=>(
            <label className='flex items-center space-x-2' key={fac}>
                <input 
                    type="checkbox" 
                    className='rounded' 
                    value={fac} 
                    checked={selectedFacilities.includes(fac)}
                    onChange={handleFacChange}
                />
                <span>{fac}</span>
               
            </label>
        ))
        }
    </div>
  )
}

export default FacilitiesFilter