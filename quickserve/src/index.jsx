import "./assets/css/home.css";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Desktop = () => {
  const navigate = useNavigate();

  return (
    <div className="Home relative bg-white flex flex-col   text-17xl text-white font-italiana">
      {/* Hero Section */}
      <div className="w-full h-[600px] bg-gradient-radial from-[#1a3323] to-[rgba(6,15,116,0.65)] flex flex-col  justify-start p-5">
        {/* Logo Section */}

        <div className="flex flex-row ">
          <div className="w-[129px] h-[59px] text-black font-sans text-4xl font-bold tracking-wide">
            Quickserve
          </div>
        </div>

        {/* Main Content Section */}
        <div className="Main-content-section flex flex-row items-center text-center text-black font-inter">
          {/* Heading */}
          <div className="flex flex-col gap-5 items-center">
            <p className=" text-black text-3xl w-[80%] max-w-[788px]">
              Join our platform to streamline your experience whether you're
              managing, serving, or exploring. Register today and unlock a world
              of possibilities!
            </p>
            {/* Buttons */}
            <div className=" flex flex-row gap-8">
              {/* Login Button */}
              <button
                className="shadow-[2px_4px_10.2px_3px_rgba(0,0,0,0.34)_inset] rounded-2xl bg-green-400 w-[220px] h-[70px] flex items-center justify-center py-3.5 px-6 text-white font-bold text-lg cursor-pointer"
                onClick={() => navigate('/Login')}
              >
                Login
              </button>

              {/* Register Button */}
              <button
                className="shadow-[2px_4px_10.2px_3px_rgba(0,0,0,0.34)_inset] rounded-2xl bg-red-500 w-[220px] h-[70px] flex items-center justify-center py-3.5 px-6 text-white font-bold text-lg cursor-pointer  "
                onClick={() => navigate('/Register')}
              >
                Register
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <img
            className="hero-section-img w-150"
            src="/hero-section.png"
            alt="Hero Section"
          />
        </div>
      </div>
    </div>
  );
};

export default Desktop;
