import React from 'react'
import Header from '../header/Header'
import SearchBar from './component/Search'
import Footer from '../footer/footer'


const popularServices = [
  {
    id: 1,
    name: "AC Service and Repair",
    image: "/AC.png",
  },
  {
    id: 2,
    name: "Bathroom & Kitchen Cleaning",
    image: "/bathroomclean.png",
  },
  {
    id: 3,
    name: "Salon for Men & Women",
    image: "/salon.png",
  },
  {
    id: 4,
    name: "Massage Services for Men",
    image: "/massageservive.png",
  },
  {
    id: 4,
    name: "Massage Services for Men",
    image: "/massageservive.png",
  },
];

function CustomerHomepage() {

  const trendingServices = [
    {
      id: 1,
      name: "Spa",
      image: "/spavector.png",
    },
    {
      id: 2,
      name: "Cleaning",
      image: "/cleaning.png",
    },
    {
      id: 3,
      name: "Native Water Purifier",
      image: "https://th.bing.com/th/id/OIP.A2xf4S8elg7dd0MJnkm61QHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7",
    },
  ];
  return (
    <div className="p-0">
      {/* Banner/Tagline */}

      {/* <div className="  flex flex-col  justify-center gap-20 h-screen m-auto text-black text-center py-8 rounded-lg  lg:bg-gradient-to-from-blue-100 via-gray-800  to-white ">
        <img src="./service2.webp"/>
        <h1 className="text-3xl font-bold ">Book. Relax. Repeat – Services Made Simple!</h1>
        <SearchBar/>
      </div> */}

      <div
        className="relative sm:h-screen w-full bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/services.webp')" }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 text-white max-w-2xl px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find and Book Services with Ease!
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-80">
            Quality services at your fingertips, anytime, anywhere.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600">
            Book Now
          </button>
        </div>
      </div>
      {/* <Categories/>  */}

      <div className="container mx-auto px-1 py-4">
        {/* Service Ratings & Customer Stats */}
        <div className="flex justify-around mt-8 bg-gray-100 p-4 rounded-lg shadow">
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

        <SearchBar />

        {/* Key Services Display (Hero Section) */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Popular Services
          </h2>
          <div className="flex flex-col overflow-x-auto no-scrollbar gap-6">
  {/* First Row */}
  <div className="flex  space-x-6 no-scrollbar">
    {popularServices.slice(0, Math.ceil(popularServices.length / 2)).map((service) => (
      <div key={service.id} className="flex-none w-[40%] sm:w-[35%] md:w-[32%] lg:w-[30%] bg-white p-4 shadow-md rounded-lg text-center h-60">
        <img src={service.image} alt={service.name} className="w-full h-32 object-cover rounded-md mb-3" />
        <h3 className="text-lg font-semibold text-gray-800 truncate">{service.name}</h3>
        <button className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Book Now
        </button>
      </div>
    ))}
  </div>

  {/* Second Row */}
  <div className="flex overflow-x-auto space-x-6 no-scrollbar">
    {popularServices.slice(Math.ceil(popularServices.length / 2)).map((service) => (
      <div key={service.id} className="flex-nonew-[40%] sm:w-[35%] md:w-[32%] lg:w-[30%] bg-white p-4 shadow-md rounded-lg text-center h-60">
        <img src={service.image} alt={service.name} className="w-full h-32 object-cover rounded-md mb-3" />
        <h3 className="text-lg font-semibold text-gray-800 truncate">{service.name}</h3>
        <button className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Book Now
        </button>
      </div>
    ))}
  </div>
</div>

        </div>

        {/* Popular Service Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Trending Services
          </h2>
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {trendingServices.map((service) => (
              <div
                key={service.id}
                className="bg-white p-4 shadow-md rounded-lg text-center"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-30 object-contain rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.name}
                </h3>
                <button className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHomepage