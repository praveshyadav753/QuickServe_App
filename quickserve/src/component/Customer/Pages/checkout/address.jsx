import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const AddressSelector = ({ onSave }) => {
  const [position, setPosition] = useState([22.7196, 75.8577]); // Default: Indore
  const [address, setAddress] = useState({
    houseNumber: "",
    landmark: "",
    name: "",
    type: "Home",
    fullAddress: "New, Rani Bagh, Indore, Madhya Pradesh 452020, India"
  });
  const [isLoading, setIsLoading] = useState(false);

  // Reverse geocode when position changes
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`
        );
        const data = await response.json();
        if (data.address) {
          setAddress(prev => ({
            ...prev,
            fullAddress: data.display_name || prev.fullAddress
          }));
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    
    fetchAddress();
  }, [position]);

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      },
      locationfound(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, 15);
      }
    });

    return position ? (
      <Marker position={position}>
        <Popup>Your selected location</Popup>
      </Marker>
    ) : null;
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fullAddressData = {
        ...address,
        coordinates: position,
        fullAddress: address.fullAddress
      };
      onSave(fullAddressData);
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-2">New Address</h2>
      <p className="text-sm text-gray-500 mb-4">{address.fullAddress}</p>

      {/* Map Section with Controls */}
      <div className="w-full h-64 my-4 rounded-lg overflow-hidden relative">
        <MapContainer 
          center={position} 
          zoom={13} 
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
        <button
          onClick={locateUser}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-[1000]"
          title="Locate me"
        >
          📍
        </button>
      </div>

      {/* Address Input Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-3">
        <input
          type="text"
          name="houseNumber"
          placeholder="House/Flat Number*"
          value={address.houseNumber}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
        <input
          type="text"
          name="landmark"
          placeholder="Landmark (Optional)"
          value={address.landmark}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <input
          type="text"
          name="name"
          placeholder="Name for this address"
          value={address.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />

        {/* Address Type Buttons */}
        <div className="flex space-x-4">
          {["Home", "Work", "Other"].map((type) => (
            <button
              key={type}
              type="button"
              className={`flex-1 py-2 border rounded-lg transition-colors ${
                address.type === type 
                  ? "bg-indigo-600 text-white border-indigo-600" 
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setAddress({ ...address, type })}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className={`w-full p-3 rounded-lg transition-colors ${
            address.houseNumber 
              ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
              : "bg-gray-300 cursor-not-allowed"
          } flex justify-center items-center`}
          disabled={!address.houseNumber || isLoading}
        >
          {isLoading ? (
            <span className="animate-pulse">Saving...</span>
          ) : (
            "Save and Proceed to Slots"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddressSelector;  