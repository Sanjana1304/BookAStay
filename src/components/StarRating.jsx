import React, { useContext } from 'react'
import DataContext from '../context/DataContext';

const StarRating = () => {
    const {selectedStars,setselectedStars} = useContext(DataContext);

    const handleStarsChange = (e) =>{
        const starRating = e.target.value;
    
        setselectedStars((prevStars)=>
          e.target.checked
          ? [...prevStars,starRating]
          : prevStars.filter((star)=>star!==starRating)
        );
      }

  return (
    <div className='border-b border-slate-300 pb-5'>
        <h4 className="text-md font-semibold mb-2">Property Rating</h4>
        {["5","4","3","2","1"].map((star)=>(
            <label className='flex items-center space-x-2' key={star}>
                <input 
                    type="checkbox" 
                    className='rounded' 
                    value={star} 
                    checked={selectedStars.includes(star)}
                    onChange={handleStarsChange}
                />
                <span>{star}</span>
               
            </label>
        ))
        }
    </div>
  )
}

export default StarRating