import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axiosConfig';
import Header from '../components/Header';
import DataContext from '../context/DataContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import Booking from './Booking';

const HotelDetail = () => {
    
    const {uid} = useParams('uid');
    const {searchValues,setsearchValues,setErrorMessage,errorMessage} = useContext(DataContext);
    
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear()+1);

    const [hoteldeet,sethoteldeet] = useState([]);

    const [showConfirmation,setshowConfirmation] = useState(false);
    const bookingRef = useRef(null);

    const [guestinhouse,setguestinhouse] = useState([]);
    useEffect(()=>{
        const now = new Date(searchValues.checkIn);
        const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (hoteldeet?.bookings) {
            const currentStayData = hoteldeet.bookings.filter(deet => {
                const checkOutDate = new Date(deet.checkOut);
                const checkOutDateOnly = new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate());
                
                const checkInDate = new Date(deet.checkIn);
                const checkInDateOnly = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
                
                return checkOutDateOnly >= nowDateOnly && checkInDateOnly <= nowDateOnly;
              });
              setguestinhouse(currentStayData);
        }

    },[setguestinhouse,hoteldeet,searchValues.checkIn])

    const handleBooking = (e) =>{
        e.preventDefault();
        if (searchValues.adultcnt <= hoteldeet.adults && searchValues.childCnt <= hoteldeet.child && guestinhouse.length<hoteldeet.numRooms) {
            setshowConfirmation(true);
            setErrorMessage('');
            setTimeout(() => {
                if (bookingRef.current) {
                bookingRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        }
        else{
            if (!guestinhouse.length<hoteldeet.numRooms) {
                setErrorMessage('Oops! Hotel Rooms are full for the dates you are looking for !');
            }
            else{
                setErrorMessage('Refer above for Max Persons allowed');
            }
            
        }
        
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsearchValues(prevDetails => ({
          ...prevDetails,
          [name]: value
        }));
    };

    const handleDateChange = (date, name) => {
        setsearchValues(prevValues => ({
          ...prevValues,
          [name]: date
        }));
      };


    useEffect(()=>{
        const fetchHotel = async() =>{
            try {
                const response = await api.get(`/hotelRoute/hotel/${uid}`);
                if (response.status === 200) {
                    sethoteldeet(response.data);
                }
                
            } catch (error) {
                console.log(error);
            }
        }

        (async () => await fetchHotel())()
    },[sethoteldeet,hoteldeet,uid])

    useEffect(() => {
        const savedSearchValues = sessionStorage.getItem('searchValues');
        if (savedSearchValues) {
            setsearchValues(JSON.parse(savedSearchValues));
        }
    }, [setsearchValues]);

  return (
    <div>
        <Header/>
        
        <div className='rounded-lg shadow-xl container mx-auto'>
            <div className="flex flex-col md:flex-row mt-5 p-6 ">
                {hoteldeet && hoteldeet.imageUrls ? (
                    <img 
                    src={hoteldeet.imageUrls[0]} 
                    className='w-full md:w-1/2 h-auto rounded-lg mb-4 md:mb-0 md:mr-6' 
                    style={{ height: '50vh' }}
                    alt={hoteldeet.name}
                    />
                ) : (
                    <div className='w-full md:w-1/2 h-auto bg-gray-200 rounded-lg'></div>
                )}
    
                <div className='flex-1'>
                    <h1 className="text-4xl font-bold">{hoteldeet.name}</h1>
                    <p className="text-xl mb-4">{hoteldeet.city}, {hoteldeet.country}</p>
                    <p className='text-xl mb-4'>{hoteldeet.desc}</p>
                    <p className='text-3xl font-semibold mb-4 mt-10'>Price: {hoteldeet.price}$ / Night</p>
                    <br /><br />
                    <p className="text-xl mb-2 font-semibold">Contact :  {hoteldeet.phone}</p>
                    
                </div>
            
            </div>

            <div className=" ml-6 mb-4 p-6 bg-gray-200 rounded">
                <p className="text-2xl mb-4 font-semibold">Maximum Persons Allowed</p>
                <div className="flex">
                <p className="text-xl font-semibold bg-white w-1/2 p-2 mr-3">Adults: {hoteldeet.adults}</p>
                <p className="text-xl font-semibold bg-white w-1/2 p-2">Children: {hoteldeet.child}</p>
                </div>
                
            </div>

            <p className="text-3xl font-bold p-6 text-pink-700">Stay Type: {hoteldeet.type}</p>
                

            <div className='p-6 w-full'>
                <h1 className='font-bold text-4xl mt-5 mb-3'>Images</h1>
                {
                    hoteldeet.imageUrls ? 
                        <div className='flex flex-wrap'>
                            {
                                hoteldeet.imageUrls.map((img,idx)=>(
                                    <img key={idx} src={img} alt='kk' className='w-1/6 h-64 mr-10 mb-5'/>
                                ))
                            }
                        </div>
                        
                        :''  
                }
            </div>


            

            <div className="flex">
                <div className="p-6 w-2/3">
                    <h1 className='font-bold text-4xl mb-3'>Facilities</h1>
                
                    <div className="flex flex-wrap">
                        {
                            hoteldeet.facilities?
                            hoteldeet.facilities.map((fac,index)=>(
                                <div key={index} className="p-4 bg-gray-500 text-white m-2 rounded">{fac}</div>
                            )):''
                        }
                    </div>
                </div>
                
                <div className="p-6 bg-gray-200 mt-10 w-1/3 h-1/2 self-center">
                    <p className="font-semibold mb-4">{hoteldeet.price}$ per Night</p>
                    <form onSubmit={(e)=>handleBooking(e)}>

                        <DatePicker 
                            selected={searchValues.checkIn} 
                            selectsStart
                            startDate={searchValues.checkIn}
                            endDate={searchValues.checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            onChange={date => handleDateChange(date, 'checkIn')}
                            placeholderText='Check-in Date'
                            className='min-w-full bg-white p-2 mb-4 focus:outline-none'
                            wrapperClassName='min-w-full'
                            required
                        />

                        <DatePicker
                            selected={searchValues.checkOut}
                            selectsEnd
                            startDate={searchValues.checkIn}
                            endDate={searchValues.checkOut}
                            minDate={searchValues.checkIn}
                            maxDate={maxDate}
                            onChange={date => handleDateChange(date, 'checkOut')}
                            placeholderText='Check-out Date'
                            className='min-w-full bg-white p-2 mb-4 focus:outline-none'
                            wrapperClassName='min-w-full'
                            required
                            />

                        <div className="flex bg-white px-2 py-1 gap-2 mb-4">
                            <label className="items-center flex w-1/2">
                                Adults:
                                <input 
                                    type="number"
                                    name='adultcnt'
                                    min={1}
                                    max={20}
                                    className='w-full p-1 focus:outline-none font-bold'
                                    value={searchValues.adultcnt}
                                    onChange={(e)=>handleChange(e)}
                                    required
                                />
                            </label>

                            <label className="items-center flex w-1/2">
                                Children:
                                <input 
                                    type="number"
                                    name='childCnt'
                                    min={0}
                                    max={20}
                                    className='w-full p-1 focus:outline-none font-bold'
                                    value={searchValues.childCnt}
                                    onChange={(e)=>handleChange(e)}
                                    required
                                />
                            </label>
                        </div>
                        {errorMessage.length>0 && <p className='text-red-500 font-bold'>{errorMessage}</p> }
                        <button className='p-4 px-10 shadow-lg bg-pink-700 rounded text-white text-xl w-full mt-5'>Book Now</button>
                    
                    </form>
                </div>

            </div>

            <div ref={bookingRef} className='mt-10'>
                {showConfirmation && <Booking hoteldeet={hoteldeet} setshowConfirmation={setshowConfirmation} />}
                <br /><br /><br /> <br /><br /><br /> <br />
            </div>

            
            

           
            
            
       
        </div>
    </div>
  )
}

export default HotelDetail