import React from 'react'
import {  useNavigate } from 'react-router'

function ServicesHeader() {
  const navigate =useNavigate()
  return (
    <div className='w-full flex flex-row p-5 shadow-sm '>
        <div className='w-3/2 '>
        <input type="search"
        placeholder='Search service'
        className='border-1 border-gray-300 dark:border-gray-900 dark:bg-gray-900 px-4 py-2 w-full rounded-sm focus:outline-none'

        />
        </div>
        <div className='w-2/3 flex justify-end gap-5 sm:gap-10 '>
          
           <select className='border-2  border-gray-200 dark:border-gray-800 dark:bg-gray-900 hidden sm:block  px-4 rounded-sm focus:outline-none'>
            <option value='' disabled>sort</option>
            <option value='revenue'>sort by Revenue</option>
            <option value='rating'>Rating</option>
            <option value='price'>Price</option>
           </select>
           <button className="bg-cyan-900 pl-2 text-white cursor-pointer pr-2 md:pl-4 md:pr-4 rounded" onClick={() => navigate('newservice')}> New </button>
        </div>
         
    

    </div>
  )
}

export default ServicesHeader    