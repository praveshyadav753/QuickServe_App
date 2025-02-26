import React from "react";
import LocationInput from "./component/Location";
import Navbar from "./component/Navbar";
export default function Header() {
  return (
    <div className=" hidden sm:flex flex-row p-5 h-18  shadow-lg justify-between ">
      <div className="">
        <h1 className="text-2xl mr-5 font-bold text-gray-800">QuickServe</h1>
      </div>
      <div>
        <div className="">
          <LocationInput />
        </div>
      </div>
      <div>
        <Navbar />
      </div>
      <div className="text-right">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sign In
        </button>
        <button className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
}
