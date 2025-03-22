import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const AddressSelector = () => {
  const [position, setPosition] = useState([22.7196, 75.8577]); // Default: Indore
  const [address, setAddress] = useState({
    houseNumber: "",
    landmark: "",
    name: "",
    type: "Home",
  });

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return <Marker position={position}></Marker>;
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-2">New Address</h2>
      <p className="text-sm text-gray-500">
        New, Rani Bagh, Indore, Madhya Pradesh 452020, India
      </p>

      {/* Map Section */}
      <div className="w-full h-64 my-4 rounded-lg overflow-hidden">
        <MapContainer center={position} zoom={13} className="w-full h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </div>

      {/* Address Input Form */}
      <div className="w-full space-y-3">
        <input
          type="text"
          name="houseNumber"
          placeholder="House/Flat Number*"
          value={address.houseNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="landmark"
          placeholder="Landmark (Optional)"
          value={address.landmark}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={address.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        {/* Address Type Buttons */}
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 border rounded-lg ${
              address.type === "Home" ? "bg-indigo-600 text-white" : ""
            }`}
            onClick={() => setAddress({ ...address, type: "Home" })}
          >
            Home
          </button>
          <button
            className={`px-4 py-2 border rounded-lg ${
              address.type === "Other" ? "bg-indigo-600 text-white" : ""
            }`}
            onClick={() => setAddress({ ...address, type: "Other" })}
          >
            Other
          </button>
        </div>

        {/* Save Button */}
        <button
          className={`w-full p-3 rounded-lg ${
            address.houseNumber ? "bg-indigo-600 text-white" : "bg-gray-400"
          }`}
          disabled={!address.houseNumber}
        >
          Save and Proceed to Slots
        </button>
      </div>
    </div>
  );
};

export default AddressSelector;
