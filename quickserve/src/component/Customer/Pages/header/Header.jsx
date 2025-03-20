import React from "react";
import LocationInput from "./component/Location";
import Navbar from "./component/Navbar";
import { useNavigate } from "react-router";
import Carticon from './component/carticon'


export default function Header() {
 const navigate = useNavigate()
const signin =()=>{
   navigate('/login');
}
const signup=()=>{
   navigate('/register');
}
  return (
    <div className=" hidden sm:flex flex-row p-3 h-18 z-50 bg-white shadow-lg justify-between ">
      <div className="">
        <h1 className="text-2xl mr-5 font-bold text-gray-800">QuickServe</h1>
      </div>
      <div>
        <div className="">
          <LocationInput />
        </div>
      </div>
      <div className="flex items-center">
        <Navbar />
        
      </div>
      <Carticon/>
      <div className="text-right flex justify-center items-center overflow-hidden">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={signin}>
          Sign In
        </button>
        <button className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={signup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
