import React,{useContext, useEffect, useState} from 'react';
import api from '../api/axiosConfig';
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const HotelList = () => {
    const {allHotels,setallHotels} = useContext(DataContext);

    const navig = useNavigate();
    //fetch all hotels
    useEffect(() => {
      const fetchAllHotels = async() =>{
        try {
            const response = await api.get('/hotelRoute');
            setallHotels(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
      }
      
      (async () => await fetchAllHotels())()
      
    }, [setallHotels,allHotels])
  

    
    const getFullHotelDetail = (id) =>{
        console.log(id);
        navig(`/singlehotel/${id}`);
    }
const [search,setSearch] = useState('');
  return (
    <div>
        {/* hotel search */}
        <div className="flex justify-end w-full">
            <div className="p-2 flex w-1/2">
                <input 
                    type="text" 
                    placeholder='Search for Hotel Names'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='flex-grow p-2 border border-gray-400 rounded-l-lg mr-3' 
                    style={{width: '70%'}} />
                <button className='p-2 bg-pink-700 rounded-r-lg text-white' style={{width: '15%'}}>S</button>
            </div>
        </div>
        
        {
            allHotels.filter(hotel => (hotel.name.toLowerCase().includes(search))).map((hotel)=>(
                <div className="h-1/2 p-3 py-10 border w-full rounded flex shadow-lg mt-4 mb-10 cursor-pointer" key={hotel._id} onClick={()=>getFullHotelDetail(hotel._id)}>
                    <img className=" h-64 object-cover" src={hotel.imageUrls[0]} alt="Hotel Cover" style={{width:'35%'}}/>
                    <div className="ml-7  flex flex-col justify-between" style={{width:'65%'}}>
                       
                       <div>
                            <span className='flex'>
                                {
                                    Array.from({length:hotel.starRating}).map((_,index)=>(
                                        <AiFillStar key={index} className='fill-yellow-400'/>
                                    ))
                                }
                            </span>
                            
                            
                            <div className="font-semibold text-4xl mb-2">{hotel.name}</div>
                            <div className="text-xl font-semibold mt-5">{hotel.price}$ per Night</div>
                            <div className="text-lg">{hotel.city}, {hotel.country}</div>
                       
                       </div>
                       
                        <div className="w-max text-xl p-2 px-5 bg-gray-200 rounded font-bold">{hotel.type}</div>
                    </div>
                </div>

            ))
        }
    </div>
  )
}

export default HotelList