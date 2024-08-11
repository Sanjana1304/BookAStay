import React from 'react'
import StarRating from '../components/StarRating'
import TypeFilter from '../components/TypeFilter'
import FacilitiesFilter from '../components/FacilitiesFilter'
import MaxPriceFilter from '../components/MaxPriceFilter'

const FilterHotel = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by: </h3>
            
            <MaxPriceFilter />
            
            <StarRating />

            <TypeFilter />

            <FacilitiesFilter />

            


        </div>
      </div>
    </div>
  )
}

export default FilterHotel