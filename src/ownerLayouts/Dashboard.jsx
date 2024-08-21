import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext';
import api from '../api/axiosConfig';
import { MdHotel } from "react-icons/md";
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import { FaSquare } from "react-icons/fa";
import CounterBooking from '../components/CounterBooking';
import { FaCalendarAlt } from "react-icons/fa";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

const Dashboard = ({data}) => {
  const {isHotelAdded,setisHotelAdded,ownerHotelDetails,setownerHotelDetails} = useContext(DataContext);

  //total bookings
  const [totalBookings,settotalBookings] = useState(0);

  //pie chart parameters
  const pieParams = { width: 400,height: 300, margin: { right: 5} };

  //RESERVATION
  //arrivals, checkedOut, guest-in house
  const [reservData,setreservData] = useState([]);
  const [arrivals,setarrivals] = useState([]);
  const [checkedOut,setcheckedOut] = useState([]);
  const [guestinhouse,setguestinhouse] = useState([]);

  //AVAILABILITY (TODAY)
  const [availData,setavailData] = useState([]);
  
  // OCCUPANCY RATE - BAR CHART

  // OCCUPANCY DATES
  const occudate = [];
  const occuRate = [];
  const now = new Date();
  const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const addNewDate = (newDate) =>{
    occudate.push(newDate);
  }

  for (let i = 0; i < 7; i++) {
    addNewDate(new Date(nowDateOnly));
    nowDateOnly.setDate(nowDateOnly.getDate() - 1);
  }

  //for OCCUPANCY rate
  
  for (let i = 0; i < occudate.length; i++) {
    const currentStayData = ownerHotelDetails?.bookings?.filter(deet => {
      const checkOutDate = new Date(deet.checkOut);
      const checkOutDateOnly = new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate());
      
      const checkInDate = new Date(deet.checkIn);
      const checkInDateOnly = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
      
      return checkOutDateOnly >= occudate[i] && checkInDateOnly <= occudate[i];
    });

    occuRate.push(currentStayData?.length);
    
  }

  //GUEST TYPE - RELATIONSHIP
  //TOTAL GUESTS
  let adulguest = 0;
  let childguest = 0;
  let guest = 0;


  //GUEST( SPECIFIC)
  let singleonly = 0; //adult
  let coupleonly = 0; //2adults 0 children
  let familyonly = 0; //atleast 1 adult n 1 child

  //TOTAL REVENUE
  let totRevenue = 0;

  //REVENUE ANALYTICS
  const revenues_5 = []; 

  if (ownerHotelDetails?.bookings) {
    for (let i = 0; i < ownerHotelDetails.bookings.length; i++) {
      if (ownerHotelDetails?.bookings[i].adultcnt>0) {
        adulguest=adulguest+(ownerHotelDetails?.bookings[i].adultcnt);
        guest=guest+(ownerHotelDetails?.bookings[i].adultcnt);
      }
      if (ownerHotelDetails?.bookings[i].childcnt>0){
        childguest=childguest+(ownerHotelDetails?.bookings[i].childcnt);
        guest=guest+(ownerHotelDetails?.bookings[i].childcnt);
      }
      if (ownerHotelDetails?.bookings[i].adultcnt === 1 && ownerHotelDetails?.bookings[i].childcnt === 0) {
        singleonly+=1;
      }
      if (ownerHotelDetails?.bookings[i].adultcnt === 2 && ownerHotelDetails?.bookings[i].childcnt === 0) {
        coupleonly+=1;
      }
      if (ownerHotelDetails?.bookings[i].adultcnt >= 1 && ownerHotelDetails?.bookings[i].childcnt >= 1) {
        familyonly+=1;
      }

      totRevenue+=ownerHotelDetails?.bookings[i].totalCost;
      
    }

    for (let i = 0; i < ownerHotelDetails.bookings.length; i++) {
      if (i===5) {
        break;
      }
      revenues_5.push(ownerHotelDetails.bookings[i].totalCost);
      
    }

  }

  
  //to fetch the hotel details
  useEffect(() => {
    if (data?.userId) {
      const fetchHotel = async() => {

        try {
          const response = await api.get(`/hotelRoute/${data?.userId}`);
          if (response.status === 200) {
            setownerHotelDetails(response.data);
            settotalBookings(response.data.bookings.length);
            setisHotelAdded(true);
          }
        } catch (error) {
          setisHotelAdded(false);
          console.error(error.message);
        }
      }

      (async () => await fetchHotel())()
    }
  }, [data?.userId,setownerHotelDetails,setisHotelAdded])


  const [remAmt, setRemAmt] = useState([]);

  //current stay, history, upcoming
  useEffect(()=>{
    const now = new Date();
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (ownerHotelDetails?.bookings) {
      const arrivalss = ownerHotelDetails.bookings.filter((deet)=>{
        const checkInDate = new Date(deet.checkIn);
        const checkInDateOnly = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
        return checkInDateOnly > nowDateOnly;
      })
      setarrivals(arrivalss);

      const bookingHistory = ownerHotelDetails.bookings.filter(deet => {
        const checkOutDate = new Date(deet.checkOut);
        const checkOutDateOnly = new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate());
        return checkOutDateOnly < nowDateOnly;
      });

      setcheckedOut(bookingHistory);

      const currentStayData = ownerHotelDetails.bookings.filter(deet => {
        const checkOutDate = new Date(deet.checkOut);
        const checkOutDateOnly = new Date(checkOutDate.getFullYear(), checkOutDate.getMonth(), checkOutDate.getDate());
        
        const checkInDate = new Date(deet.checkIn);
        const checkInDateOnly = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());
        
        //console.log(deet.totalCost);
        return checkOutDateOnly >= nowDateOnly && checkInDateOnly <= nowDateOnly;
      });
      setguestinhouse(currentStayData);

      
      const remainingAmounts = currentStayData?.map((stay) => {
            const checkInDate = new Date(stay.checkIn);
            const checkOutDate = new Date(stay.checkOut);
            const nyts = Math.abs(checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);

            const price = ownerHotelDetails.price || 0;
            const totalCost = stay.totalCost || 0;

            //console.log('CheckIn:', stay.checkIn, 'CheckOut:', stay.checkOut, 'Price:', price, 'TotalCost:', totalCost, 'Nights:', nyts);
            return (nyts * price - totalCost);
      });
      setRemAmt(remainingAmounts);
      //console.log('rem',remainingAmounts);
      

    }
  },[ownerHotelDetails,setarrivals]);



  //to set reservation and availablity data
  useEffect(()=>{
    const val1 = arrivals.length;
    const val2 = checkedOut.length;
    const val3 = guestinhouse.length;
    setreservData([{ value: val1 }, { value: val2 }, { value: val3 }])

    const val4 = ownerHotelDetails.numRooms - val3;
    setavailData([{ value: val3 }, { value: val4 }])

  },[arrivals,setreservData,checkedOut,guestinhouse,setavailData,ownerHotelDetails]);


  return (
    <div>
    {
      isHotelAdded
      ?
      <>
        <h1 className="text-4xl px-2 font-semibold mb-2 text-pink-800">Dashboard</h1>
        
        <p className='flex justify-center mb-2 text-4xl text-pink-800'>
                    Total Bookings: <CounterBooking endValue={totalBookings} />
        </p>

        <div className='flex text-center mt-4'>
          <div className='border shadow rounded w-1/3 p-3 py-6 rounded mx-auto mb-3'>
            <h1 className="text-2xl text-gray-500 mb-3 flex"><MdHotel className='mr-3 text-3xl'/> Revenue</h1>

            <p className="border-b-2 mb-3"></p>
 
            <p className="text-2xl font-bold text-orange-800 mb-1">Total Revenue</p>
            <p className='text-orange-800 text-5xl'>$<CounterBooking endValue={totRevenue} /></p>


          </div>
        </div>

        <div className="flex">
          <div className='border shadow rounded p-3 py-6 w-1/2' >
            <h1 className="text-2xl text-gray-500 mb-3 flex"><MdHotel className='mr-3 text-3xl'/> Reservations (in Total)</h1>
            <p className="border-b-2 mb-3"></p>
           
              <div className="flex justify-between">
                
                  <Box >
                    
                    <PieChart
                      series={[
                        { 
                          data:reservData,
                          highlightScope: { faded: 'global', highlighted: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                          
                        }
                      ]}
                      {...pieParams}
                      
                    />
                  </Box>
                
                

                <div className="w-1/2 flex flex-col justify-center">
                  <p className='flex text-xl mb-2'><FaSquare className='text-2xl mr-1 text-[#38b4af]'/> Arrivals</p>
                  <p className='flex text-xl mb-2'><FaSquare className='text-2xl mr-1 text-[#b10bef] '/> Guest In-house</p>
                  <p className='flex text-xl mb-2'><FaSquare className='text-2xl mr-1 text-[#0b99ef]'/> Checked Out</p>
                </div>
              </div>

              
          </div>

          <div className="border shadow rounded p-3 py-6 w-1/2 " >
            <h1 className="text-2xl text-gray-500 mb-3 flex"><MdHotel className='mr-3 text-3xl'/> Bookings Calendar</h1>
            <p className="border-b-2"></p>

            <div className="flex justify-between overflow-y-scroll" style={{ height: 'fit-content', maxHeight: '350px' }}>
              
              <div className='w-1/3 border  text-pink-800 p-1'>
                <span className='text-xl font-semibold'>Arrivals</span>
                <p className="mt-2"></p>
                {
                  arrivals.map((arrival,idx)=>(
                    <div key={idx} className='bg-pink-100 mb-2 rounded p-2 text-black'>
                      <p>{arrival.name}</p>
                      <p>{arrival.adultcnt} Adults and {arrival.childcnt} chil</p>
                      <p className='font-semibold flex mt-1'><FaCalendarAlt className='mr-1 text-xl' /> {new Date(arrival.checkIn).toDateString()}</p>
                    </div>
                  ))
                }
               
              </div>

              <div className='w-1/3 border text-pink-800 p-1'>
                
                <span className='text-xl font-semibold'>Guest In-House</span>
                <p className="mt-2"></p>
                {
                  guestinhouse.map((gih,idx)=>(
                    <div key={idx} className='bg-pink-100 mb-2 rounded p-2 text-black'>
                      <p>{gih.name}</p>
                      <p>{gih.adultcnt} Adults and {gih.childcnt} chil</p>
                      <p className='font-semibold flex mt-1'><FaCalendarAlt className='mr-1 text-xl' /> {new Date(gih.checkIn).toDateString()}</p>
                      <p>Rem. Amt to Pay: ${remAmt[idx]}</p>
                    </div>
                  ))
                }
              </div>

              <div className='w-1/3 border text-pink-800 p-1'>
                
                <span className='text-xl font-semibold'>Checked-Out</span>
                <p className="mt-2"></p>
                {
                  checkedOut.map((chkO,idx)=>(
                    <div key={idx} className='bg-pink-100 mb-2 rounded p-2 text-black'>
                      <p>{chkO.name}</p>
                      <p>{chkO.adultcnt} Adults and {chkO.childcnt} chil</p>
                      <p className='font-semibold flex mt-1'><FaCalendarAlt className='mr-1 text-xl' /> {new Date(chkO.checkOut).toDateString()}</p>
                    </div>
                  ))
                }
              </div>
            </div>
             
          </div>
        </div>


        {/* SECOND BOX - AVAILABILITY AND OCCUPANY */}
        <div className="flex mt-8">
          <div className='border shadow rounded w-1/2 p-3 py-6'>
            <h1 className="text-2xl text-gray-500 mb-3 flex"><MdHotel className='mr-3 text-3xl'/> Availability (Today)</h1>
            <p className="border-b-2 mb-3"></p>
            <div className="flex justify-between">
              
                <Box >
                  
                  <PieChart
                    series={[
                      { 
                        data:availData,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        innerRadius: 85,
                        outerRadius: 140,
                        
                      }
                    ]}
                    {...pieParams}
                    
                  />
                </Box>
              
              

              <div className="w-1/2 flex flex-col justify-center">
                <p className='flex text-xl mb-2'><FaSquare className='text-2xl mr-1 text-[#38b4af]'/> Occupied</p>
                <p className='flex text-xl mb-2'><FaSquare className='text-2xl mr-1 text-[#0b99ef]'/> Available</p>
              </div>
            </div>
          </div>

          <div className='border shadow rounded w-1/2 p-3 py-6'>
            <h1 className="text-2xl text-gray-500 mb-3 flex"><MdHotel className='mr-3 text-3xl'/> Occupancy Rate (For the Week)</h1>
            <p className="border-b-2 mb-3"></p>

            <BarChart
              xAxis={[{ scaleType: 'band', data: [`${occudate[0].toDateString().slice(0,10)}`,`${occudate[1].toDateString().slice(0,10)}`,`${occudate[2].toDateString().slice(0,10)}`,`${occudate[3].toDateString().slice(0,10)}`,`${occudate[4].toDateString().slice(0,10)}`,`${occudate[5].toDateString().slice(0,10)}`,`${occudate[6].toDateString().slice(0,10)}` ],label:'Days' }]}
              yAxis={[{label:'No. of Guests'}]}
              series={[{ data: occuRate }]}
              width={700}
              height={300}
            />

          </div>

        </div>


        <div className="flex mt-8">
          <div className='border shadow rounded w-1/2 p-3 py-6'>
            <h1 className="text-2xl text-gray-500 mb-3 flex"><MdHotel className='mr-3 text-3xl'/> Customer Analytics (Based on Relationship)</h1>
            <p className="border-b-2 mb-3"></p>

            <div className=" flex w-2/3 mx-auto">
              <div className="w-1/3 text-center">
                    <p className='text-gray-500 text-xl'>Guests</p>
                    <p className='font-bold text-2xl'>{guest}</p>
              </div>
              <div className="w-1/3 text-center">
                    <p className='text-gray-500 text-xl'>Adults</p>
                    <p className='font-bold text-2xl'>{adulguest}</p>
              </div>
              <div className="w-1/3 text-center">
                  <p className='text-gray-500 text-xl'>Children</p>
                  <p className='font-bold text-2xl'>{childguest}</p>
              </div>
            </div>

            <div>
              <BarChart
                yAxis={[{ scaleType: 'band', data: ['Single','Couple','Family'] }]}
                xAxis={[{label:'No. of Guests'}]}
                layout="horizontal"
                series={[{ data: [singleonly,coupleonly,familyonly] }]}
                width={700}
                height={300}
              />
            
            </div>
          </div>

          <div className='border shadow rounded w-1/2 p-3 py-6'>
            <h1 className="text-2xl text-gray-500 mb-3 flex"><MdHotel className='mr-3 text-3xl'/> Revenue Analyics (Past 5 bookings )</h1>

            <p className="border-b-2 mb-3"></p>

            <LineChart
              xAxis={[{ data: [1, 2, 3, 4,5],label:'Amount in $'  }]}
              series={[
                {
                  data: revenues_5,
                },
              ]}
              width={600}
              height={300}
            />
 
            

          </div>
        </div>
        
      </>
      : <div>
          <p className='text-xl text-pink mb-2'>Oops! You haven't added your Hotel Details yet. Add it in your My Hotel section</p>
        </div>
    }
    </div>
  )
}

export default Dashboard