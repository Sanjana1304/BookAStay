import React, { useContext, useEffect } from 'react'
import DataContext from '../context/DataContext';
import {MdTravelExplore} from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const SearchBar = () => {
    const {searchValues,setsearchValues} = useContext(DataContext);

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

    useEffect(() => {
        const savedSearchValues = sessionStorage.getItem('searchValues');
        if (savedSearchValues) {
            setsearchValues(JSON.parse(savedSearchValues));
        }
    },[setsearchValues]);

    useEffect(() => {
        sessionStorage.setItem('searchValues', JSON.stringify(searchValues));
    
    }, [searchValues]);


    

    const handleSubmit = async(e) =>{
        e.preventDefault();
        //navig('/search');
    }

    const clearSearchData = (e) =>{
        e.preventDefault();
        setsearchValues({
            place:'',
            checkIn:null,
            checkOut:null,
            adultcnt:'',
            childCnt:''
        })
    }
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear()+1);
    return (
        <form onSubmit={handleSubmit} className='mt-6 p-3 rounded bg-pink-800 shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4'>
            <div className="flex flex-row items-center flex-1 bg-white p-2">
                <MdTravelExplore size={25} className='mr-2' />
                <input 
                    type="text"
                    name='place'
                    placeholder='Where are you going? '
                    className='text-md w-full focus:outline-none'
                    value={searchValues.place}
                    onChange={(e)=>handleChange(e)}
                 />
            </div>

            <div className="flex bg-white px-2 py-1 gap-2">
                <label className="items-center flex">
                    Adults:
                    <input 
                        type="number"
                        name='adultcnt'
                        min={1}
                        max={20}
                        className='w-full p-1 focus:outline-none font-bold'
                        value={searchValues.adultcnt}
                        onChange={(e)=>handleChange(e)}
                    />
                </label>

                <label className="items-center flex">
                    Children:
                    <input 
                        type="number"
                        name='childCnt'
                        min={0}
                        max={20}
                        className='w-full p-1 focus:outline-none font-bold'
                        value={searchValues.childCnt}
                        onChange={(e)=>handleChange(e)}
                    />
                </label>
            </div>

            <DatePicker 
                selected={searchValues.checkIn} 
                selectsStart
                startDate={searchValues.checkIn}
                endDate={searchValues.checkOut}
                minDate={minDate}
                maxDate={maxDate}
                onChange={date => handleDateChange(date, 'checkIn')}
                placeholderText='Check-in Date'
                className='min-w-full bg-white p-2 focus:outline-none'
                wrapperClassName='min-w-full'
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
            className='min-w-full bg-white p-2 focus:outline-none'
            wrapperClassName='min-w-full'
            />

            <div className="flex gap-2">
                <button type='submit' className="w-2/3 p-2 rounded bg-pink-600 text-white h-full  text-xl hover:bg-pink-300">
                    Search
                </button>

                <button onClick={(e)=>clearSearchData(e)} className="w-2/3 p-2 rounded bg-red-600 text-white h-full  text-xl hover:bg-red-300">
                    Clear
                </button>
            </div>
        </form>
    )
}

export default SearchBar