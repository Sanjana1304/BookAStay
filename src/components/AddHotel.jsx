import React, { useContext, useState } from 'react';
import DataContext from '../context/DataContext';
import AlertIdModal from './AlertIdModal';
import api from '../api/axiosConfig';
import { useQuery } from 'react-query';
import { fetchUserData } from '../apiclient';

const AddHotel = () => {
    const {data} = useQuery('fetchUserData',fetchUserData);

    const {hotelphone,sethotelphone,hotelnumRooms,sethotelnumRooms,imageFiles,setImageFiles,setisHotelAdded,hotelname,sethotelname,hotelcity,sethotelcity,hotelcountry,sethotelcountry,hoteldesc,sethoteldesc,hotelprice,sethotelprice,selectedType,setSelectedType,hotelfac,sethotelfac,hoteladul,sethoteladul,hotelchild,sethotelchild} = useContext(DataContext);

    const hotelTypes = ["Budget","Boutique","Luxury","Ski Resort","Business","Romantic","Family","Hiking Resort","Cabin","Beach Resort","Golf Resort","Motel","All Inclusive","Pet Friendly","Self Catering"];

    const Facilities = ["Free Wifi", "Parking","Airport Shuttle","Family Rooms","Non Smoking Rooms","Outdoor Pool","Camp Fire","Spa","Fitness Centre","Golf Ground","Snookers"];

    const [validationError, setValidationError] = useState(false);
    const [validationError2, setValidationError2] = useState(false);

    const [showModal, setShowModal] = useState(false);

    //facility validation
    const hotelfacc = [];
    const handleFacilityChange = (e) =>{
        const { value, checked } = e.target;
        if (checked) {
            //sethotelfac(prev => [...prev, value]);
            hotelfacc.push(value);
        } 
        // else {
        //     sethotelfac(prev => prev.filter(option => option !== value));
        // }
        setValidationError(false);
    }

    //stay type validation
    const handleRadioChange = (e) =>{
        setSelectedType(e.target.value);
        setValidationError2(false);
    }

    const handleAddHotel = async(e) =>{
        e.preventDefault();
        if (hotelfac.length === 0) {
            setValidationError(true);
        }
        else if(!selectedType){
            setValidationError2(true);
        }
        else{
            const newHotel = {
                userId: data?.userId,
                name : hotelname,
                city : hotelcity,
                country : hotelcountry,
                desc : hoteldesc,
                price : hotelprice,
                type : selectedType,
                facilities : hotelfacc,
                adults : hoteladul,
                child : hotelchild,
                numRooms : hotelnumRooms,
                phone: hotelphone
            }
            // Create form data
            const formdata = new FormData();
            for(const key in newHotel){
                formdata.append(key,newHotel[key]);
            }

            for (let i = 0; i < imageFiles.length; i++) {
                formdata.append('imageFiles',imageFiles[i]);
                
            }
            try {
                await api.post(`/hotelRoute`,formdata,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                }
                });
                setisHotelAdded(true);
                setShowModal(true);
                window.alert("Woohoo! Hotel Successfully added")
                
            } catch (error) {
                console.log(error.message);
            }
            sethotelname('');
            sethotelcity('');
            sethotelcountry('');
            sethoteldesc('');
            sethotelprice('');
            setSelectedType(null);
            sethotelfac([]);
            sethoteladul('');
            sethotelchild('');
            sethotelnumRooms('');
            sethotelphone('');
            
        }
    }
  return (
    <div>
        <p className='font-bold text-4xl text-pink'>Add a New Hotel</p>
        <br />
        <form onSubmit={(e)=>handleAddHotel(e)} className='flex flex-col'>
        <label htmlFor="" className='font-bold text-2xl text-pink mb-2'>Stay Name </label>
        <input 
            type="text" 
            value={hotelname}
            required
            onChange={(e)=>sethotelname(e.target.value)}
            className='hotel-input mb-2'/>

        <label htmlFor="" className='font-bold text-2xl text-pink mb-2'>Contact </label>
        <input 
            type="number" 
            value={hotelphone}
            required
            onChange={(e)=>sethotelphone(e.target.value)}
            className='hotel-input mb-2 w-1/2'/>


        <div className="flex justify-between">
            <div className='flex flex-col w-1/2 pr-3'>
                <label htmlFor="" className='font-bold text-2xl text-pink mb-2'>City </label>
                <input 
                    type="text" 
                    value={hotelcity}
                    onChange={(e)=>sethotelcity(e.target.value)}
                    required
                    className='hotel-input mb-2'/>
            </div>

            <div className='flex flex-col w-1/2'>
                <label htmlFor="" className='font-bold text-2xl text-pink mb-2'>Country </label>
                <input 
                    type="text" 
                    value={hotelcountry}
                    onChange={(e)=>sethotelcountry(e.target.value)}
                    required
                    className='hotel-input mb-2'/>
            </div>
        </div>

        <label htmlFor="" className='font-bold text-2xl text-pink mb-2'>Description</label>
        <textarea 
            className='hotel-input mb-2' 
            value={hoteldesc}
            onChange={(e)=>sethoteldesc(e.target.value)}
            required
            rows={7}/>
        
        <label htmlFor="" className='font-bold text-2xl text-pink mb-2'>Price per Night ($)</label>
        <input 
            type="number" 
            value={hotelprice}
            onChange={(e)=>sethotelprice(e.target.value)}
            required
            className='hotel-input mb-2 w-1/2'/>

        <label htmlFor="" className='font-bold text-2xl text-pink mb-2'>Number of Rooms</label>
        <input 
            type="number" 
            value={hotelnumRooms}
            onChange={(e)=>sethotelnumRooms(e.target.value)}
            required
            className='hotel-input mb-2 w-1/2'/>


        <label htmlFor="" className='font-bold text-2xl text-pink mb-2'>Type </label>
        <div className="grid grid-cols-5 gap-2">
            {
                hotelTypes.map(htype=>(
                    <label
                        key={htype}
                        className={`cursor-pointer text-lg rounded-full p-4 font-semibold 
                            ${selectedType === htype ? 'bg-pink-400 text-white' : 'bg-pink-100'}`}
                    >
                        <input 
                            type="radio"
                            value={htype}
                            required
                            checked={selectedType === htype}
                            onChange={(e)=>handleRadioChange(e)}
                            className="hidden"
                        />
                        <span>{htype}</span>
                    </label>
                ))
            }
        </div>
        {validationError2 && (
                <p className="text-red-500 mt-2"> !! Please select at least one option !!</p>
            )}

        <label htmlFor="" className='font-bold text-2xl text-pink mb-4 mt-6'>Facilities </label>
        <div className="grid grid-cols-5 gap-2">
            {
                Facilities.map((fac)=>(
                    
                <label className='text-xl' key={fac}>
                <input 
                    type='checkbox'
                    value={fac} 
                    checked={hotelfacc.includes(fac)}
                    onChange={handleFacilityChange}
                    className='mr-2'/>
                {fac}
                </label>
                ))
            }
            
        </div>
        {validationError && (
                <p className="text-red-500 mt-2"> !! Please select at least one option !!</p>
            )}

        <label htmlFor="" className='font-bold text-2xl text-pink mb-4 mt-6'>Guests </label>
        <div className="flex justify-around bg-pink-200 p-4">
            <div className='flex flex-col w-1/3 pr-3'>
                <label htmlFor="" className='font-bold text-xl text-pink mb-2'>Adults </label>
                <input 
                    type="number" 
                    required
                    value={hoteladul}
                    onChange={(e)=>sethoteladul(e.target.value)}
                    className='hotel-input mb-2'/>
            </div>

            <div className='flex flex-col w-1/3'>
                <label htmlFor="" className='font-bold text-xl text-pink mb-2'>Children </label>
                <input 
                    type="number" 
                    value={hotelchild}
                    required
                    onChange={(e)=>sethotelchild(e.target.value)}
                    className='hotel-input mb-2'/>
            </div>
        </div>

        <label htmlFor="" className='font-bold text-2xl text-pink mb-4 mt-6'>Images </label>
        <div className="border rounded p-4 flex flex-col gap-4">
            <input 
                type="file"
                multiple
                accept='image/*'
                onChange={(e)=>setImageFiles(e.target.files)}
                required
              />
        </div>
        
        <button className='bg-pink-600 w-32 flex justify-center p-3 text-white mt-10'>Register</button>

        </form>

        <AlertIdModal 
                show={showModal} 
                msg = "Success"
                message="Hotel Successfully Added"
                handleClose={() => setShowModal(false)} 
        />
    </div>
  )
}

export default AddHotel