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
  const [open, setOpen] = useState(false);

  const signin = () => navigate("/login");
  const signup = () => navigate("/register");

  return (
    <header className="sticky top-0 left-0 w-full  z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate("/")}>
          QuickServe
        </h1>

        {/* Location Input */}
        <div className="hidden md:block">
          <LocationInput />
        </div>

        {/* Navbar */}
        <nav className="hidden lg:flex">
          <Navbar />
        </nav>
        <Carticon  size={20}/>
        {/* Cart & User Section */}
        <div className="flex items-center gap-10 ">
          

          {isAuthenticated ? (
            <div className="relative">
              <div className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
                <User size={26} className="text-gray-600" />
              </div>
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <ProfileDropdown open={open} setOpen={setOpen} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md" onClick={signin}>
                Sign In
              </button>
              <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md" onClick={signup}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
