import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setTimeout(() => {
      navigate(`${role}`);
    }, 1000);
  };
  // const handleContinue = () => {
  //   if (selectedRole) {
  //     navigate(`${selectedRole}`); 
  //   } else {
  //     alert("Please select a role to continue!");
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen bg-gray-100"> 
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">Register as </h1>
      <div className='w-90 h-0.5 bg-blue-50'></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-25"> 
        {/* Customer Role Card */}
        <button
          className={`w-full min-h-25 sm:h-30 md:h-35 lg:h-40  flex flex-col items-center justify-center rounded-lg shadow-md transition-all duration-300 
          ${selectedRole === "customer" ? "bg-green-500 text-white scale-105" : "bg-white text-gray-700 hover:bg-green-100"}`}
          onClick={() => handleRoleSelect("customer")}
        >
          <span className="text-xl sm:text-2xl lg:text-3xl font-semibold">Customer</span>
          <p className="text-sm">Book services & explore options</p>
        </button>

        {/* Business Role Card */}
        <button
          className={`w-full min-h-25 sm:h-30 md:h-35 lg:h-40 p-2 flex flex-col items-center justify-center rounded-lg shadow-md transition-all duration-300 
          ${selectedRole === "business" ? "bg-blue-500 text-white scale-105" : "bg-white text-gray-700 hover:bg-blue-100"}`}
          onClick={() => handleRoleSelect("business")}
        >
          <span className="text-xl sm:text-2xl lg:text-3xl font-semibold">Business</span>
          <p className="text-sm">Offer services & manage bookings</p>
        </button>
      </div>

      {/* <button
        className="sm:w-sm lg:w-lg xl:w-xl mt-6 px-6 py-3 bg-gray-800 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 disabled:bg-gray-400"
        onClick={handleContinue}
        disabled={!selectedRole}
      >
        Continue
      </button> */}
    </div>
  );
};

export default RoleSelection;