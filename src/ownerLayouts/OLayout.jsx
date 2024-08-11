import React, { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Dashboard from './Dashboard';
import Reviews from './Reviews';
import Forum from './Forum';
import Settings from './Settings';
import {fetchUserData} from '../apiclient';
import { useQuery } from 'react-query';
import MyHotel from './MyHotel';

const OLayout = () => {
  const {data} =  useQuery('fetchUserData',fetchUserData);

  const [activeItem, setActiveItem] = useState("Dashboard");
  
    const renderContent = () => {
        switch (activeItem) {
            case "Hotel":
              return <MyHotel />
            case "Dashboard":
                return <Dashboard data={data}/>;
            case "Reviews":
                return <Reviews/>;
            
            case "Forum":
                return <Forum/>;
            case "Settings":
                return <Settings data={data}/>;
            default:
                return <Dashboard data={data}/>;
        }
    };

  return (
    <>
    {
    <div className='flex flex-col min-h-screen'>

      <Header owner={true}/>
      <div className="flex">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} data={data}/>
        <div className="flex-grow p-8">
                {renderContent()}
                
        </div>

      </div>
    </div>
    }
    </>
  )
}

export default OLayout