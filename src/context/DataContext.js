import React from 'react';
import { createContext,useState } from 'react';

import {loadStripe} from '@stripe/stripe-js'

const STRIPE_PUB_KEY = process.env.REACT_APP_STRIPE_PUB_KEY;
const DataContext = createContext({});


const stripePromise = loadStripe(STRIPE_PUB_KEY);


export const DataProvider = ({children}) => {

    //for registeration
    const [userId,setuserId] = useState('');
    const [name,setName] = useState('');
    const [userType,setUserType] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPwd] = useState('');

    //for login authentication
    const [logUserId,setlogUserId] = useState('');
    const [logPwd,setlogPwd] = useState('');

    //USER VARIABLES

    //for users to search for a hotel based on:
    const [searchValues,setsearchValues] = useState({
        place:'',
        checkIn:null,
        checkOut:null,
        adultcnt:'',
        childCnt:'',
        
    });

    //for filters in the left of the homepage
    const [selectedStars,setselectedStars] = useState([]);
    const [selectedTypes,setselectedTypes] = useState([]);
    const [selectedFacilities,setselectedFacilities] = useState([]);
    const [selectedmaxprice,setselectedmaxprice] = useState();
    
    //user deets once logged in
    const [loggedinUser,setloggedinUser] = useState(null);


    //USER DASHBOARD

    //for displaying error messages
    const [errorMessage, setErrorMessage] = useState('');

    
    //HOTEL OWNER VARIABLES

    //to see if the hotel details are added by the owner
    const [isHotelAdded,setisHotelAdded] = useState(false);

    //for adding hotel if not added
    const [hotelId,sethotelId] = useState('');
    const [hotelname,sethotelname] = useState('');
    const [hotelcity,sethotelcity]= useState('');
    const [hotelcountry,sethotelcountry] = useState('');
    const [hoteldesc,sethoteldesc] = useState('');
    const [hotelprice,sethotelprice] = useState('');
    const [selectedType,setSelectedType] = useState(null);
    const [hotelfac,sethotelfac] = useState([]);
    const [hoteladul,sethoteladul] = useState('');
    const [hotelchild,sethotelchild] = useState('');
    const [hotelnumRooms,sethotelnumRooms] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [hotelphone,sethotelphone] = useState('');


    //if the hotel is added, retreive and show to the hotel owner's page
    const [ownerHotelDetails,setownerHotelDetails] = useState('');
 

    return (
        <DataContext.Provider value={{
            stripePromise,
            selectedmaxprice,setselectedmaxprice,
            selectedFacilities,setselectedFacilities,
            selectedTypes,setselectedTypes,
            selectedStars,setselectedStars,
            searchValues,setsearchValues,
            imageFiles, setImageFiles,
            errorMessage, setErrorMessage,
            loggedinUser,setloggedinUser,
            isHotelAdded,setisHotelAdded,
            ownerHotelDetails,setownerHotelDetails,
            logUserId,setlogUserId,logPwd,setlogPwd,
            userId,setuserId,name,setName,userType,setUserType,email,setEmail,password,setPwd,
            hotelId,sethotelId,hotelname,sethotelname,hotelcity,sethotelcity,hotelcountry,sethotelcountry,
            hoteldesc,sethoteldesc,hotelprice,sethotelprice,hotelphone,sethotelphone,hotelnumRooms,sethotelnumRooms,selectedType,setSelectedType,
            hotelfac,sethotelfac,hoteladul,sethoteladul,hotelchild,sethotelchild
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;