import React, { useContext } from 'react'
import DataContext from '../context/DataContext';

const MaxPriceFilter = () => {

    const {selectedmaxprice,setselectedmaxprice} = useContext(DataContext);
  return (
    <div className='border-b border-slate-300 pb-5'>
        <h4 className="text-md font-semibold mb-2">Max Price</h4>

        <select value={selectedmaxprice} onChange={(e)=>setselectedmaxprice(e.target.value ? parseInt(e.target.value) : undefined)}>
        <option value="">Select Max Price</option>
        {
            [50,100,200,300,500].map((price,idx)=>(
                <option value={price} key={idx}>{price}</option>
            ))
        }
        </select>
    </div>
  )
}

export default MaxPriceFilter