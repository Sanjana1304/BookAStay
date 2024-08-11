import React, { useContext } from 'react'
import DataContext from '../context/DataContext';

const TypeFilter = () => {
    const {selectedTypes,setselectedTypes} = useContext(DataContext);

    const handleTypesChange = (e) =>{
        const Hoteltypes = e.target.value;
    
        setselectedTypes((prevTypes)=>
          e.target.checked
          ? [...prevTypes,Hoteltypes]
          : prevTypes.filter((typ)=>typ!==Hoteltypes)
        );
      }

  return (
    <div className='border-b border-slate-300 pb-5'>
        <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
        {["Budget","Boutique","Luxury","Ski Resort","Business","Romantic","Family","Hiking Resort","Cabin","Beach Resort","Golf Resort","Motel","All Inclusive","Pet Friendly","Self Catering"].map((typ)=>(
            <label className='flex items-center space-x-2' key={typ}>
                <input 
                    type="checkbox" 
                    className='rounded' 
                    value={typ} 
                    checked={selectedTypes.includes(typ)}
                    onChange={handleTypesChange}
                />
                <span>{typ}</span>
               
            </label>
        ))
        }
    </div>
  )
}

export default TypeFilter