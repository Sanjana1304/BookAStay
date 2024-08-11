import React from 'react'

const Sidebar = ({activeItem,setActiveItem,data}) => {
    
    
    const options = ["Hotel","Dashboard","Reviews","Settings"]
    return (
        <div className="w-64  bg-pink-800 text-white flex flex-col">
                <div className="p-4 font-bold text-xl">
                    {data?.name}'s
                </div>
                <nav className="flex-grow">
                    <ul>
                        {
                            options.map((opt)=>(
                                <li
                                key={opt}
                                className={`p-5 text-xl cursor-pointer ${activeItem === opt ? 'bg-pink-700' : 'hover:bg-pink-700'}`}
                                onClick={() => setActiveItem(opt)}
                            >
                                {opt}
                            </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
    )
}

export default Sidebar