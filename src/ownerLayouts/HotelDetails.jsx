import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext'
import api from '../api/axiosConfig';

const HotelDetails = () => {
    const {ownerHotelDetails,errorMessage, setErrorMessage} = useContext(DataContext);
    const [successMsg,setsuccessMsg] = useState('');

    console.log('own',ownerHotelDetails);

    const [hotelname,sethotelname] = useState('');
    const [hotelcity,sethotelcity] = useState('');
    const [hotelcntry,sethotelcntry] = useState('');
    const [hoteldesc,sethoteldesc] = useState('');
    const [hotelprice,sethotelprice] = useState('');
    const [hoteladul,sethoteladul] = useState('');
    const [hotelchild,sethotelchild] = useState('');
    const [hoteltype,sethoteltype] = useState('');
    const [hotelfac,sethotelfac] = useState([]);

    const [isEdited,setisEdited] = useState(false);

    useEffect(()=>{
        setErrorMessage('');
        if (ownerHotelDetails) {
            sethotelname(ownerHotelDetails.name || '');
            sethotelcity(ownerHotelDetails.city || '');
            sethotelcntry(ownerHotelDetails.country || '');
            sethoteldesc(ownerHotelDetails.desc || '');
            sethotelprice(ownerHotelDetails.price || '');
            sethoteladul(ownerHotelDetails.adults || '');
            sethotelchild(ownerHotelDetails.child || '');
            sethoteltype(ownerHotelDetails.type || '');
            sethotelfac(ownerHotelDetails.facilities || '');

        }
    },[ownerHotelDetails,setErrorMessage])
    
    const enableEditing = (e,func) =>{
        func(e.target.value); //changing value in react
        setErrorMessage('');
        setisEdited(true);
    }
    const enableEditingFac = (e) => {
      const facstring = e.target.value;
      sethotelfac(facstring.split(','));
      setErrorMessage('');
      setisEdited(true);
    }

    const handleFormEdit = async(e) =>{
        e.preventDefault();
        if (hotelname.length>0 && hotelcity.length>0 && hotelcntry.length>0 &&  hoteldesc.length>0 && hotelprice>0 && hoteladul>0 && hoteltype.length>0 && hotelfac.length>0) {
          setErrorMessage('');
    
          const updatedRec = {
            name: hotelname,
            adults: hoteladul,
            child:hotelchild,
            city:hotelcity,
            country:hotelcntry,
            desc:hoteldesc,
            facilities: hotelfac,
            price:hotelprice,
            type:hoteltype,
            lastUpdated: new Date(),

          }
    
          try {
            const response = await api.put(`/hotelRoute/${ownerHotelDetails?._id}`,updatedRec,{
              withCredentials:true,
              headers:{
                'Content-Type':"application/json"
              }
            });
    
            if (response.status === 200) {
              console.log('idhan',response.data);
              sethotelname(response.data.name);
              sethotelcity(response.data.city);
              sethoteladul(response.data.adults);
              sethotelchild(response.data.child);
              sethotelcntry(response.data.country);
              sethoteldesc(response.data.desc);
              sethotelfac(response.data.facilities);
              sethotelprice(response.data.price);
              sethoteltype(response.data.type);
              setsuccessMsg('Sucessfully Modified !');
            }
            
    
          } catch (error) {
            console.log(error.message);
          }
          
        }
        else{
          setErrorMessage('Invalid Details !');
          setsuccessMsg('Error in editing !');
        }
        
      }

    return (
        <div className="shadow rounded-lg p-4 mb-4 mt-5">
            <h1 className='font-bold text-2xl mt-5 mb-5'>Hotel Details</h1>
            <div className="grid grid-cols-5 gap-4 mb-2">
                <div className="col-span-2 py-2 text-xl">Name</div>
                <input 
                    className="col-span-3 border p-2 shadow" 
                    type="text"
                    value={hotelname || ''}
                    onChange={(e)=>enableEditing(e,sethotelname)}
                />

                <div className="col-span-2 text-xl py-2">City</div>
                <input 
                    className="col-span-3 border p-2 shadow" 
                    type="text"
                    value={hotelcity || ''}
                    onChange={(e)=>enableEditing(e,sethotelcity)}
                />
                

                <div className="col-span-2 text-xl py-2">Country</div>
                <input 
                    className="col-span-3 border p-2 shadow" 
                    type="text"
                    value={hotelcntry || ''}
                    onChange={(e)=>enableEditing(e,sethotelcntry)}
                />

                <div className="col-span-2 text-xl py-2">Description</div>
                <input 
                    className="col-span-3 border p-2 shadow" 
                    type="text"
                    value={hoteldesc || ''}
                    onChange={(e)=>enableEditing(e,sethoteldesc)}
                />

                <div className="col-span-2 text-xl py-2">Price Per Night</div>
                <input 
                    className="col-span-3 border p-2 shadow" 
                    type="text"
                    value={hotelprice || ''}
                    onChange={(e)=>enableEditing(e,sethotelprice)}
                />

                <div className="col-span-2 text-xl py-2">Max Adults Permiited</div>
                <input 
                    className="col-span-3 border p-2 shadow" 
                    type="text"
                    value={hoteladul || ''}
                    onChange={(e)=>enableEditing(e,sethoteladul)}
                />

                <div className="col-span-2 text-xl py-2">Max Children Permiited</div>
                <input 
                    className="col-span-3 border p-2 shadow" 
                    type="text"
                    value={hotelchild || ''}
                    onChange={(e)=>enableEditing(e,sethotelchild)}
                />

                <div className="col-span-2 text-xl py-2">Stay Type</div>
                <input 
                    className="col-span-3 border p-2 shadow" 
                    type="text"
                    value={hoteltype || ''}
                    onChange={(e)=>enableEditing(e,sethoteltype)}
                />

                <div className="col-span-2 text-xl py-2">Facilities</div>
                <input 
                    className="col-span-3 border p-2 shadow" 
                    type="text"
                    value={hotelfac || ''}
                    onChange={(e)=>enableEditingFac(e)}
                />

            </div>

            {
              errorMessage?<p className='text-red mb-3 font-bold'>{errorMessage}</p>:''
            }
            {
              successMsg?<p className='text-green-700 mb-3 font-bold'>{successMsg}</p>:''
            }

            <button onClick={handleFormEdit} className='bg-pink-800 p-2 text-white px-6 text-lg disabled:bg-pink-300' disabled={!isEdited}>Edit</button>
        </div>
    )
}

export default HotelDetails