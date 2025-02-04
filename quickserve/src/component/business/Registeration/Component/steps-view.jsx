import React from 'react'

function Stepsview() {
  return (
    <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white  border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700 ">${step}</span>
                </div>
                <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 md:mt-10">
                  Register
                </h3>
                <p className="mt-3 sm:mt-4 text-base text-gray-600 ">
                  Register with your email or using sign up with goolgle
                </p>
    </div>
  )
}

export default Stepsview