import React, { useState } from "react";
import LocationInput from "./component/Location";
import Navbar from "./component/Navbar";
import { useNavigate } from "react-router";
import Carticon from "./component/carticon";
import { useSelector } from "react-redux";
import { User } from "lucide-react";
import ProfileDropdown from "./component/Profiledropdown";

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);


  const signin = () => navigate("/login");
  const signup = () => navigate("/register");
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="hidden sm:flex flex-row p-3 h-18 z-50 bg-white shadow-lg justify-between">
      <h1 className="text-2xl mr-5 font-bold text-gray-800">QuickServe</h1>
      <LocationInput />
      <Navbar />
      <Carticon />
      {isAuthenticated ? (
        <div className="relative flex items-center mr-5">
          <div className="cursor-pointer" onClick={() => setOpen((pv) => !pv)}>
            <User size={24} className="text-gray-600"  />
          </div>
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <ProfileDropdown open={open} setOpen={setOpen}/>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={signin}>
            Sign In
          </button>
          <button className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={signup}>
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}
