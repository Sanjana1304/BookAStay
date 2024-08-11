import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react'
import DataContext from '../context/DataContext';
import { bookHotelRoom } from '../apiclient';
import AlertIdModal from '../components/AlertIdModal';

const BookingConfirmForm = ({currentUser,numNyts,price,paymentIntent,hoteldeet,setshowConfirmation}) => {

    const {searchValues,setsearchValues} = useContext(DataContext);
    const [showModal, setShowModal] = useState(false);
    const [headmodalMessage,setheadmodalMessage] = useState('');
    const [modalMessage,setModalMessage] = useState('');
    const total_price = numNyts*price;

    const stripe = useStripe();
    const elements = useElements();

    const handleConfirmBooking = async(e) =>{
        e.preventDefault();
        const newBooking = {
            name: currentUser?.name,
            email: currentUser?.email,
            userId: currentUser?.userId,
            adultcnt:searchValues?.adultcnt,
            childcnt:searchValues?.childCnt,
            checkIn:new Date(searchValues.checkIn).toISOString(),
            checkOut: new Date(searchValues.checkOut).toISOString(),
            totalCost: total_price,
        }
        if (!stripe || !elements) {
            return;
        }
        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret,{
            payment_method:{
                card : elements.getElement(CardElement)
            }
        });

        //if success, we should book the room
        if (result.paymentIntent?.status === "succeeded") {
            await bookHotelRoom(hoteldeet._id,{...newBooking,paymentIntentId:result.paymentIntent.id});

            setShowModal(true);
            setheadmodalMessage('Booking Confirmed! ');
            setModalMessage('Your booking is successful, you can view in your dashboard');

            const initialSearchValues = {
                adultcnt: '',
                childCnt: '',
                checkIn: null,
                checkOut: null
            };
    
            setsearchValues(initialSearchValues);
            sessionStorage.setItem('searchValues', JSON.stringify(initialSearchValues));
            setTimeout(() => {
                setshowConfirmation(false);
            }, 5000);

            //navig('/temp');
        }
    }
    return (
        <form onSubmit={(e)=>handleConfirmBooking(e)} className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
            <span className='text-3xl font-bold'>Confirm Your Details</span>
            <div className="grid gap-6">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Name
                    <input 
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" 
                        type="text"
                        value={currentUser.name}
                        readOnly
                        disabled
                    />
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input 
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" 
                        type="text"
                        value={currentUser.email}
                        readOnly
                        disabled
                    />
                </label>

                <h1 className='text-gray-700 text-xl font-bold'>Total Price to Pay</h1>
                <div className="bg-gray-200 p-3 rounded ">
                    <p className='font-bold text-2xl'>$ {total_price}</p> 
                    <p className='text-gray-700'>Includes taxes and charges</p>
                </div>

                <h1 className='text-gray-700 text-xl font-bold'>Payment Information</h1>
                <CardElement id='payment-element' className='border rounded-md p-2 text-sm' />

                <button 
                    type='submit' 
                    
                    className='bg-pink-700 text-white p-3 disabled:bg-gray-500'
                >
                    {/* {isLoading? "Saving..." : "cONFIRM booking"} */}
                    Book Your Stay 
                </button>
            </div>

            <AlertIdModal
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                message={modalMessage}
                msg={headmodalMessage}/>
        </form>
    )
}
// 4242 4242 4242 4242
// 10/2 434 222
export default BookingConfirmForm