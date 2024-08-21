import React from 'react'

const HeaderStart = ({openModal}) => {
  return (
    <div>

        <div className="container mx-auto mt-7 flex justify-between mb-7">
            <span className='text-3xl mt-1 text-pink-800 font-bold tracking-tight'>
                BookAStay
            </span>

            <nav>
                <ul className="flex space-x-8">
                    <li className='mt-2'>
                        <p className="text-2xl  text-pink-800 hover:text-pink-400 cursor-pointer">Features</p>
                    </li>
                    <li className='mt-2'>
                    <p className="text-2xl text-pink-800 hover:text-pink-400 cursor-pointer">Testimonals</p>
                    </li>
                    <li className='mt-2'>
                        <p className="text-2xl text-pink-800   hover:text-pink-400 cursor-pointer">About</p>
                    </li>

                    <li>
                        <button 
                            className='rounded-full bg-pink-800 p-2 px-8 text-white text-2xl'
                            onClick={openModal}>Sign In</button>
                    </li>
                    
                </ul>
                
            </nav>
            
        </div>
    </div>
  )
}

export default HeaderStart