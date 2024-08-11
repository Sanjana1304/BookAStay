import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FilterHotel from './FilterHotel';
import SearchBar from './SearchBar';
import SearchPage from './SearchPage';


const Layout = () => {
  
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <Hero />

        <div className="container mx-auto">
          <SearchBar/>
        </div>
        

        
        <div className="flex container mx-auto mt-5">

          <FilterHotel/>

          <div className='flex-grow p-8'>
            {
              // isSearch?<SearchPage/>:<HotelList/>
              <SearchPage/>
            }
            
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Layout