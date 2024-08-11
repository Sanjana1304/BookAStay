import React from "react";
import { fetchUserData } from '../apiclient';
import { useQuery } from 'react-query';

const Hero = () => {
  const {data} = useQuery('fetchUserData',fetchUserData);
  return (
    <div className="bg-pink-800 pb-16">
      <div className="container mx-auto flex flex-col gap-2">
        <p className="text-white text-xl">Hi, {data?.name}</p>
        <h1 className="text-5xl text-white font-bold">Discover Your Next Getaway</h1>

        <p className="text-2xl text-white">
        Explore top hotels and book your next unforgettable getaway !
        </p>
      </div>
    </div>
  )
}

export default Hero
