import React, { useState, useEffect, useRef } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { MapPin, LocateFixed } from "lucide-react"; // Icons for UI

const libraries = ["places"];

const LocationInput = () => {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Load Google Maps API
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Secure API key
    libraries,
  });

  // Handle manual location selection
  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        alert("Please select a valid location.");
        return;
      }
      setLocation(place.formatted_address);
      setCoordinates({
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
    }
  };

  // Get current location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });

        // Reverse Geocode to get address
        const geocoder = new window.google.maps.Geocoder();
        const latLng = { lat: latitude, lng: longitude };

        geocoder.geocode({ location: latLng }, (results, status) => {
          setLoading(false);
          if (status === "OK" && results[0]) {
            setLocation(results[0].formatted_address);
          } else {
            console.error("Geocoder failed:", status);
            alert("Failed to get address. Try again.");
          }
        });
      },
      (error) => {
        setLoading(false);
        console.error("Error getting location:", error);
        alert("Unable to fetch current location. Please allow location access.");
      }
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-72">
      {/* Input Box */}
      <div
        className="flex items-center border border-gray-400 rounded-lg p-2 cursor-pointer bg-white"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <MapPin size={18} className="text-gray-500 mr-2" />
        {isLoaded ? (
          <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Select Location"
              className="w-full focus:outline-none"
            />
          </Autocomplete>
        ) : (
          <input
            type="text"
            placeholder="Loading Google Maps..."
            className="w-full focus:outline-none"
            disabled
          />
        )}
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 p-4 z-10">
          {/* Detect Location */}
          <div
            className="flex items-center text-blue-600 cursor-pointer font-semibold mb-2"
            onClick={handleUseCurrentLocation}
          >
            <LocateFixed size={18} className="mr-2" />
            {loading ? "Detecting..." : "Detect Location"}
          </div>
        </div>
      )}

      {/* Coordinates Display */}
      
    </div>
  );
};

export default LocationInput;
