import React from 'react'
import Header from '../header/Header'
import Categories from './component/Category'
import SearchBar from './component/Search'
import Footer from '../footer/footer'

function CustomerHomepage() {
  return (
    <div className='p-0'>
     {/* Banner/Tagline */}
     <div className=" flex flex-col justify-center gap-20 h-screen m-auto text-black text-center py-8 rounded-lg  lg:bg-gradient-to-from-blue-100 via-gray-800  to-white ">
        <h1 className="text-3xl font-bold ">Book. Relax. Repeat – Services Made Simple!</h1>
        <SearchBar/>
      </div>
      
    {/* <Categories/>  */}
    
    <div className="container mx-auto px-4 py-8">
     

      {/* Service Ratings & Customer Stats */}
      <div className="flex justify-around mt-8 bg-gray-100 p-6 rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Total Services Booked</h2>
          <p className="text-2xl font-bold">15,000+</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Average Satisfaction</h2>
          <p className="text-2xl font-bold">4.8/5</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">User Ratings</h2>
          <p className="text-2xl font-bold">★★★★★</p>
        </div>
      </div>

      {/* Key Services Display (Hero Section) */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Popular Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["AC Service and Repair", "Bathroom & Kitchen Cleaning", "Salon for Men & Women", "Massage Services for Men"].map((service, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-lg text-center">
              <p className="font-semibold">{service}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Book Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Service Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Trending Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Spa", "Cleaning", "Native Water Purifier"].map((service, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-lg text-center">
              <p className="font-semibold">{service}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  
    

    </div>
  )
}

export default CustomerHomepage