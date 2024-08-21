import React from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from '../api/axiosConfig';
import { IoIosArrowRoundBack } from "react-icons/io";

const Header = ({owner,home}) => {
  const navig = useNavigate();
  
  const logoutUser = async () => {
    try {
        await axios.post('/authRoute/logout');
        // Clear any client-side state if necessary
        navig('/');
    } catch (error) {
        console.error('Error logging out:', error);
    }finally{
      window.alert("Logged Out Successfully");
    }
  };

  const goToHome = () =>{
    navig(-1);
  }

  return (
    <div className='bg-pink-800 py-6'>
        <div className="container mx-auto flex justify-between mb-7">
            <span className='text-3xl mt-1 text-white font-bold tracking-tight'>
                BookAStay
            </span>
            
            <span className='flex space-x-2'>
            {!owner
              ?
                <>
                  {home?<button className='text-white font-bold mr-3 mt-2 flex' onClick={goToHome}><IoIosArrowRoundBack className='text-3xl' />Back To Home</button>:''}
                  <Link to="/userprofile" className='text-white mt-2 font-bold mr-3'>My Dashboard</Link> 
                </> :''}
              <button className='text-white font-bold border border-white rounded-md p-2' onClick={()=>logoutUser()}>Sign Out</button>
           </span>
        </div>
    </div>

  )
}

export default Header