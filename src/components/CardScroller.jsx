import React, { useState } from 'react';
import { IoPeopleSharp } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";
import StarRatingBox from './StarRatingBox';
import api from '../api/axiosConfig';
import { AiFillStar } from 'react-icons/ai';


const CardScroller = ({ cards,checkMsg,review, onCancelBooking, reviewedCards, setReviewedCards }) => {

    const [ratings, setRatings] = useState({});
    
    const handleRatingChange = (cardId, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [cardId]: rating
        }));
    };

    const handleStarRating = async(hotelId,bookId,rate) =>{
        try {
            await api.put(`hotelRoute2/${hotelId}/bookings/${bookId}/rate`,{ givenStar: rate },{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            

            // Update reviewedCards state
            setReviewedCards(prevReviewed => ({
                ...prevReviewed,
                [bookId]: true
            }));

        } catch (error) {
            console.log(error);
        }
    }
    

  return (
    <div className="overflow-x-auto whitespace-nowrap p-4">
        {cards?.map((card, index) => (
            <div key={index} className="inline-block border m-2 mr-5 p-4 rounded-lg shadow-md">
                <div className="flex mb-3">
                    <div>
                        <img src={card.image} alt="" height="300px" width="300px" />
                    </div>
                    <div className='ml-5'>
                        <p className="text-xl font-semibold">{card.hotelname}</p>
                        <p className="text-gray-500">{card.city}, {card.country}</p>
                        <p className="font-semibold mb-2 mt-4">Amount Paid: ${card?.booking.totalCost}</p>

                        <div className="flex text-center w-full border mb-2">
                            <IoPeopleSharp className='text-2xl'/>
                            <p className="font-semibold mb-2 ml-3"> {card?.booking.adultcnt} Adults & {card?.booking.childcnt} children</p>

                        </div>

                        <div className="flex mb-1 bg-pink-800 p-2">
                        <p className="font-semibold text-sm text-white w-1/2">{checkMsg}</p>
                            {
                                review
                                ?
                                    <span className='bg-white p-1 px-3 text-sm text-pink-800 w-1/2'>{new Date(card?.booking.checkOut).toDateString()}</span>
                                : 
                                    <span className='bg-white p-1 px-3 text-sm text-pink-800 w-1/2'>{new Date(card?.booking.checkIn).toDateString()}</span>
                            }
                            </div>
                    
                    </div>
                </div>

                {
                    review
                    ?
                    reviewedCards[card.booking._id] || card?.booking?.starRate
                        ?
                        <div className='flex'>
                            <p className='flex text-xl text-red-700 text-lg font-bold'>You rated {card?.booking?.starRate || ratings[card.booking._id]} stars  <AiFillStar className="ml-2 text-yellow-500 text-3xl" /></p>
                        </div>
                        :
                            <div className='flex'>
                                <IoIosWarning className='text-yellow-400 text-xl mr-2 mt-1' />
                                <p className='text-yellow-700 text-lg mr-1'>Rate your Stay: </p>
                                    
                                <StarRatingBox 
                                    rating={ratings[card.booking._id] || 0} 
                                    onChange={(rating) => handleRatingChange(card.booking._id, rating)} 
                                />
                                <button 
                                    className='ml-2 mt-1 bg-yellow-500 text-sm p-1 text-black disabled:bg-yellow-200 disabled:text-gray-400' 
                                    disabled={!ratings[card.booking._id] > 0} 
                                    onClick={() =>handleStarRating(card.id,card.booking._id,ratings[card.booking._id])}>
                                        Done
                                </button>
                                
                            </div>
                    
                    :
                    <button className='bg-red-500 p-1 px-4 text-white rounded' onClick={()=>onCancelBooking(card.id,card.booking._id)}>Cancel Booking</button>
                }
                
                
            </div>
        ))}
    </div>
  )
}

export default CardScroller