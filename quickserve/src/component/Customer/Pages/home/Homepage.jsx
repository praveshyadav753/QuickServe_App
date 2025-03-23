import React from "react";
import Header from "../header/Header";
import SearchBar from "./component/Search";
import { MapPin } from "lucide-react";

import Footer from "../footer/footer";
import LocationPopup from "./component/locationslider";
import { AnimatedNumber, Animatedstar } from "./component/stats";
import { useState } from "react";

const popularServices = [
  { id: 1, name: "AC Service and Repair", image: "/AC.png" },
  { id: 2, name: "Bathroom & Kitchen Cleaning", image: "/bathroomclean.png" },
  { id: 3, name: "Salon for Men & Women", image: "/salon.png" },
  { id: 4, name: "Massage Services for Men", image: "/massageservice.png" },
];

const trendingServices = [
  { id: 1, name: "Spa", image: "/spavector.png" },
  { id: 2, name: "Cleaning", image: "/cleaning.png" },
  {
    id: 3,
    name: "Native Water Purifier",
    image:
      "https://th.bing.com/th/id/OIP.A2xf4S8elg7dd0MJnkm61QHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7",
  },
];

function CustomerHomepage() {
  const [isLocationPopupOpen, setLocationPopupOpen] = useState(false);

  return (
    <div className="p-0 flex-grow">
<div className={`flex flex-col gap-5 ${isLocationPopupOpen ? "opacity-10 pointer-events-none" : "opacity-100"}`}>
{/* Desktop Banner with Background Image */}
      <div
        className="relative hidden sm:flex h-screen w-full bg-cover bg-center items-center"
        style={{ backgroundImage: "url('/services.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
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

      <div>
        <button
          className="sticky top-5 left-0 transform   text-gray-800 px-6 py-3  flex items-center gap-2 transition"
          onClick={() => setLocationPopupOpen(true)}
        >
          <MapPin size={20} /> Select Address
        </button>

        
      </div>
      <div className="block sm:hidden  "> 

      <SearchBar />
      </div>
      {/* Mobile Banner without Background Image */}
      <div className="sm:hidden flex flex-col items-center text-center p-6 bg-gray-100">
        <h1 className="text-2xl font-bold">
          Book. Relax. Repeat – Services Made Simple!
        </h1>
        
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Service Ratings & Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-lg shadow">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Total Services Booked</h2>
            <AnimatedNumber value={15000} decimals={0} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">Average Satisfaction</h2>
            <AnimatedNumber value={4.8} /> / 5
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">User Ratings</h2>
            <Animatedstar value={4.8} />
          </div>
        </div>
        <div className="hidden sm:block  "> 
        <SearchBar /></div>

        {/* Popular Services Section */}
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          Popular Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-4 shadow-md rounded-lg text-center"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {service.name}
              </h3>
              <button className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Trending Services Section */}
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          Trending Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {trendingServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-4 shadow-md rounded-lg text-center"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-32 object-contain rounded-md mb-3"
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

      {/* <Footer /> */}
      </div>
      {isLocationPopupOpen && (
          <LocationPopup
            isOpen={isLocationPopupOpen}
            onClose={() => setLocationPopupOpen(false)}
          />
        )}
    </div>
  );
}

export default CustomerHomepage;
