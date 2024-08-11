import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext';
import api from '../api/axiosConfig';

const UserProfileManagement = ({userdata}) => {
  const {errorMessage, setErrorMessage} = useContext(DataContext);
  const [successMsg,setsuccessMsg] = useState('');

  const [username,setusername] = useState('');
  const [usermail,setusermail] = useState('');

  const [isEdited,setisEdited] = useState(false);

  useEffect(()=>{
    setErrorMessage('');
    if (userdata) {
      setusername(userdata.name || '');
      setusermail(userdata.email || '');
    }
  },[userdata,setErrorMessage])

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
    <div>
        <h1 className='font-semibold text-2xl mb-5'>My Profile</h1>
        <form className='border rounded p-2' onSubmit={handleFormEdit}>

            <label className="text-gray-700 text-lg font-bold flex-1">
              UserID
              <input 
                  className="mt-1 border mb-3 rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal" 
                  type="text"
                  value={userdata?.userId || ''}
                  readOnly
                  disabled
              />
            </label>
            
            <label className="text-gray-700 text-lg font-bold flex-1">
              Name
              <input 
                  className="mt-1 border mb-3 rounded w-full py-2 px-3 text-gray-700 font-normal" 
                  type="text"
                  value={username}
                  onChange={(e)=>enableEditing(e,setusername)}
              />
            </label>
            

            <label className="text-gray-700 text-lg font-bold flex-1">
              E-mail
              <input 
                  className="mt-1 border mb-6 rounded w-full py-2 px-3 text-gray-700 font-normal" 
                  type="text"
                  value={usermail}
                  onChange={(e)=>enableEditing(e,setusermail)}
              />
            </label>

            {
              errorMessage?<p className='text-red mb-3 font-bold'>{errorMessage}</p>:''
            }
            {
              successMsg?<p className='text-green-700 mb-3 font-bold'>{successMsg}</p>:''
            }

            <button className='bg-pink-700 p-1 text-white px-6 text-lg disabled:bg-pink-300' disabled={!isEdited}>Edit</button>


         
           
        </form>
    </div>
  )
}

export default UserProfileManagement