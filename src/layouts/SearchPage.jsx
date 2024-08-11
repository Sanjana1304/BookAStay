import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext'
import { searchHotels } from '../apiclient';
import {useQuery} from "react-query"
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

const SearchPage = () => {
    const navig = useNavigate();
    const {setsearchValues,searchValues,selectedStars,selectedTypes,selectedFacilities,selectedmaxprice} = useContext(DataContext);

    const [sortOption,setSortOption] = useState('');

    const [page,setPage] = useState(1);
    
    useEffect(() => {
        const savedSearchValues = sessionStorage.getItem('searchValues');
        if (savedSearchValues) {
            const parsedValues = JSON.parse(savedSearchValues);
            if (parsedValues.checkIn) {
                parsedValues.checkIn = new Date(parsedValues.checkIn);
              }
              if (parsedValues.checkOut) {
                parsedValues.checkOut = new Date(parsedValues.checkOut);
              }
              setsearchValues(parsedValues);
        }
    },[setsearchValues]);

    const searchParams = {
        place:searchValues.place,
        checkIn:searchValues.checkIn?.toISOString(),
        checkOut:searchValues.checkOut?.toISOString(),
        adultcnt:searchValues.adultcnt.toString(),
        childCnt:searchValues.childCnt.toString(),
        page:page.toString(),
        facilities:selectedFacilities,
        types:selectedTypes,
        starRating:selectedStars,
        maxPrice:selectedmaxprice?.toString(),
        sortOption,
    }

    const {data} = useQuery(["searchHotels",searchParams],() => 
        searchHotels(searchParams)
    );

    const getFullHotelDetail = (id) =>{
        navig(`/singlehotel/${id}`);
    }
    return (
        
        <div>
            <div className="flex justify-between">
                <span className="text-xl font-bold">
                    {data?.pagination.total} Hotels found
                </span>

                <select value={sortOption} onChange={(e)=>setSortOption(e.target.value)} className='p-2 border rounded-md cursor-pointer '>
                <option value="">Sort By</option>
                <option value="starRating">Star Rating</option>
                <option value="priceAsc">Price (low to high)</option>
                <option value="priceDesc">Price (high to low)</option>
            </select>
            </div>
           

            {/* TODO SORT OPTIONS */}
           
            
            {
                data && data.data?
                data.data.map(hotel=>(
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
                :''
            }

            <div>
                <Pagination 
                    page={data?.pagination.page || 1} 
                    pages={data?.pagination.pages || 1}
                    onPageChange = {(page) => setPage(page)}
                />
            </div>
        </div>
       
    )
}

export default SearchPage