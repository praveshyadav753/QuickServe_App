import React, { useState } from "react";

const addresses = [
  { id: 1, name: "Pravesh", pincode: "452020", type: "HOME", address: "Saraswati Kirana Store, Kushwah Ka Bagicha" },
  { id: 2, name: "Pravesh", pincode: "452020", type: "HOME", address: "Saraswati Kirana Store, Kushwah Ka Bagicha" },
  { id: 3, name: "Harshita Verma", pincode: "454001", type: "HOME", address: "Dharashwar Malushya Bawdi, Dhareshwar" },
];

const LocationPopup = ({ isOpen, onClose }) => {
  const [pincode, setPincode] = useState("");

  const handlePincodeSubmit = () => {
    alert(`Checking delivery for pincode: ${pincode}`);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
        },
        (error) => {
          alert("Error getting location. Enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 w-full bg-white p-5 rounded-t-lg shadow-lg transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold">Select Delivery Address</h2>
        <button onClick={onClose} className="text-gray-500 text-xl">×</button>
      </div>

      {/* Address List */}
      <div className="mt-4 space-y-3">
        {addresses.map((addr) => (
          <div key={addr.id} className="p-3 border rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{addr.name}, {addr.pincode} <span className="text-sm text-blue-500 px-2 bg-blue-100 rounded">{addr.type}</span></h3>
              <p className="text-gray-600 text-sm">{addr.address}</p>
            </div>
          </div>
        ))}
        <p className="text-blue-500 text-sm cursor-pointer mt-2">See more...</p>
      </div>

      {/* Pincode Input */}
      <div className="mt-5">
        <p className="text-gray-700 text-sm">Use pincode to check delivery info</p>
        <div className="flex gap-2 mt-2">
          <input type="text" className="border p-2 rounded w-full" placeholder="Enter pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handlePincodeSubmit}>Submit</button>
        </div>
      </div>

      {/* Current Location */}
      <div className="mt-5 text-blue-600 text-sm flex items-center gap-2 cursor-pointer" onClick={getCurrentLocation}>
        <span>📍</span> Use my current location
      </div>
    </div>
  );
};

export default LocationPopup;
