import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext';
import api from '../api/axiosConfig';

const ProfileOwner = ({data}) => {
  const {errorMessage, setErrorMessage} = useContext(DataContext);
  const [successMsg,setsuccessMsg] = useState('');

  const [username,setusername] = useState('');
  const [usermail,setusermail] = useState('');
  const [isEdited,setisEdited] = useState(false);
    
  useEffect(()=>{
    setErrorMessage('');
    if (data) {
      setusername(data.name || '');
      setusermail(data.email || '');
    }
  },[data,setErrorMessage])

  const enableEditing = (e,func) =>{
    func(e.target.value); //changing value in react
    setErrorMessage('');
    setisEdited(true);
  }

  const handleFormEdit = async(e) =>{
    e.preventDefault();
    if (username.length>0 && usermail.length>3) {
      setErrorMessage('');

      const updatedRec = {
        name: username,
        email: usermail
      }

      try {
        const response = await api.put('/userRoute/editMe',updatedRec,{
          withCredentials:true,
          headers:{
            'Content-Type':"application/json"
          }
        });

        if (response.status === 200) {
          console.log('idhan',response.data);
          setusermail(response.data.email);
          setusername(response.data.name);
          setsuccessMsg('Sucessfully Modified !');
        }
        

      } catch (error) {
        console.log(error.message);
      }
      
    }
    else{
      setErrorMessage('Invalid Name/Email !');
      setsuccessMsg('Error in editing !');
    }
    
  }

  return (
    <div className="shadow rounded-lg p-4 mb-4 mt-5">
          <h1 className='font-bold text-2xl mt-5 mb-5'>Profile</h1>
          <div className="grid grid-cols-5 gap-4 mb-2">

            <div className="col-span-2 text-xl py-2">UserID</div>
            <input 
                  className="col-span-3 border p-2 shadow bg-gray-200" 
                  type="text"
                  value={data?.userId || ''}
                  readOnly
                  disabled
              />

            <div className="col-span-2 py-2 text-xl">Name</div>
            <input 
                  className="col-span-3 border p-2 shadow" 
                  type="text"
                  value={username || ''}
                  onChange={(e)=>enableEditing(e,setusername)}
              />

            <div className="col-span-2 text-xl py-2">Email</div>
            <input 
                  className="col-span-3 border p-2 shadow" 
                  type="text"
                  value={usermail || ''}
                  onChange={(e)=>enableEditing(e,setusermail)}
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

export default ProfileOwner