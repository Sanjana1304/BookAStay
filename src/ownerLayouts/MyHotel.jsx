import React, { useContext } from 'react'
import DataContext from '../context/DataContext';
import AddHotel from '../components/AddHotel';

const MyHotel = () => {
    const {isHotelAdded,ownerHotelDetails} = useContext(DataContext);
    return (
      <div>
        {
        isHotelAdded
        ?
        <>
            <h1 className="text-4xl px-6 font-semibold">My Hotel</h1>
            <div className="flex flex-col md:flex-row mt-5 py-2 px-6 ">
                    {ownerHotelDetails && ownerHotelDetails.imageUrls ? (
                        <img 
                        src={ownerHotelDetails.imageUrls[0]} 
                        className='w-full md:w-1/2 h-auto rounded-lg mb-4 md:mb-0 md:mr-6' 
                        style={{ height: '50vh' }}
                        alt={ownerHotelDetails.name}
                        />
                    ) : (
                        <div className='w-full md:w-1/2 h-auto bg-gray-200 rounded-lg'></div>
                    )}
        
                    <div className='flex-1'>
                        <h1 className="text-4xl font-bold">{ownerHotelDetails.name}</h1>
                        <p className="text-xl mb-4 text-gray-500">{ownerHotelDetails.city}, {ownerHotelDetails.country}</p>
                        <p className='text-xl mb-4'>{ownerHotelDetails.desc}</p>
                        <p className='text-3xl font-semibold mb-4 mt-10'>Price: {ownerHotelDetails.price}$ / Night</p>
                        <br /><br />
                        <p className="text-xl mb-2 font-semibold">Contact :  {ownerHotelDetails.phone}</p>
                    
                    </div>
                
            </div>

            <div className=" ml-6 mb-4 p-6 bg-gray-200 rounded">
                <p className="text-2xl mb-4 font-semibold">Maximum Persons Allowed</p>
                <div className="flex">
                <p className="text-xl font-semibold bg-white w-1/2 p-2 mr-3">Adults: {ownerHotelDetails.adults}</p>
                <p className="text-xl font-semibold bg-white w-1/2 p-2">Children: {ownerHotelDetails.child}</p>
                </div>
                
            </div>

            <p className="text-3xl font-bold p-6 text-pink-700">Stay Type: {ownerHotelDetails.type}</p>
                

            <div className='p-6 w-full'>
                <h1 className='font-bold text-4xl mt-5 mb-3'>Images</h1>
                {
                    ownerHotelDetails.imageUrls ? 
                        <div className='flex flex-wrap'>
                            {
                                ownerHotelDetails.imageUrls.map((img,idx)=>(
                                    <img key={idx} src={img} alt='kk' className='w-1/6 h-64 mr-10 mb-5'/>
                                ))
                            }
                        </div>
                        
                        :''  
                }
            </div>

            <div className="p-6 w-2/3">
                    <h1 className='font-bold text-4xl mb-3'>Facilities</h1>
                
                    <div className="flex flex-wrap">
                        {
                            ownerHotelDetails.facilities?
                            ownerHotelDetails.facilities.map((fac,index)=>(
                                <div key={index} className="p-4 bg-gray-500 text-white m-2 rounded">{fac}</div>
                            )):''
                        }
                    </div>
                </div>

      </>
        : <div>
            <p className='text-xl text-pink mb-2'>Oops! You haven't added your Hotel Details yet. Add it below</p>
            <AddHotel/>
        </div>
      }
      </div>
    )
}

export default MyHotel