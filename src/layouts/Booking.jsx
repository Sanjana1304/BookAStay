import React,{ useContext, useEffect, useState} from 'react';
import { createPaymentIntent, fetchUserData } from '../apiclient';
import { useQuery } from 'react-query';
import BookingConfirmForm from './BookingConfirmForm';
import DataContext from '../context/DataContext';
import { Elements } from '@stripe/react-stripe-js';

const Booking = ({hoteldeet,setshowConfirmation}) => {
    const {searchValues,stripePromise} = useContext(DataContext);

    const [numNyts,setnumNyts] = useState(0);

    useEffect(()=>{
        if (searchValues.checkIn && searchValues.checkOut) {
            const checkInDate = new Date(searchValues.checkIn);
            const checkOutDate = new Date(searchValues.checkOut);
            const nyts = Math.abs(checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
            setnumNyts(nyts);
        }
    },[searchValues.checkIn,searchValues.checkOut]);

    //console.log("nytu",numNyts);
    const { data: paymentdata } = useQuery(["createPaymentIntent",hoteldeet._id, numNyts],()=>
        createPaymentIntent(hoteldeet._id,numNyts),
        {
            enabled: !!hoteldeet._id && numNyts > 0,
        }

    );

    //data contains user data who ever is booking right now
    const {data} = useQuery('fetchUserData',fetchUserData);
    
    return (

        <div className="grid md:grid-cols-[1fr_2fr]">
            <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
                <h2 className='text-xl font-bold'>Your booking Details</h2>
                <p className="font-bold">Hotel: {hoteldeet.name}</p>
                <div className="border-b py-2">
                    Location :
                    <span className="font-bold"> {hoteldeet.city}, {hoteldeet.country}</span>
                </div>
                <div className="flex justify-between">
                    <div>
                        Check in
                        <div className="font-bold">{new Date(searchValues.checkIn).toDateString()}</div>
                    </div>
                    <div>
                        Check Out
                        <div className="font-bold">{new Date(searchValues.checkOut).toDateString()}</div>
                    </div>
                </div>

                <div className="border-t border-b py-2">
                    Total Nights of Stay:
                    <div className="font-bold">
                        {numNyts}
                    </div>
                </div>

                <div>
                    Guests
                    <div className="font-bold">
                        {searchValues.adultcnt} adult(s) and {searchValues.childCnt} children
                    </div>
                </div>



            </div>
            
            {
                data && paymentdata && (
                    <Elements 
                        stripe={stripePromise}
                        options={{
                            clientSecret : paymentdata.clientSecret,
                        }}
                    >
                        <BookingConfirmForm currentUser={data} numNyts={numNyts} price={hoteldeet.price} paymentIntent={paymentdata} hoteldeet={hoteldeet} setshowConfirmation={setshowConfirmation} />
                    </Elements>
                )
            }
        </div>
        
    )
}

export default Booking