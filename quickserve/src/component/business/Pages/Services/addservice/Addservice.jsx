import { useState } from "react";
import { useNavigate } from "react-router";

const NewService = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("General");
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    description: "",
    address: "",
    category: "",
    subcategory: "",
    price: "",
    availability: [], // Changed to an array to store selected days
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleAvailabilityChange = (day) => {
    setServiceData((prevState) => {
      const isSelected = prevState.availability.includes(day);
      return {
        ...prevState,
        availability: isSelected
          ? prevState.availability.filter((d) => d !== day)
          : [...prevState.availability, day],
      };
    });
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">New Service</h2>
        <div
          className="cursor-pointer"
          onClick={()=>navigate("/business/services")}
        >
          x
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab("General")}
          className={`flex-1 py-2 text-center ${
            activeTab === "General"
              ? "border-b-2 border-yellow-400 text-yellow-400"
              : "text-gray-400"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("Other")}
          className={`flex-1 py-2 text-center ${
            activeTab === "Other"
              ? "border-b-2 border-yellow-400 text-yellow-400"
              : "text-gray-400"
          }`}
        >
          Other
        </button>
      </div>

      {/* General Tab */}
      {activeTab === "General" && (
        <div>
          <label className="block text-sm mb-1">Service Name</label>
          <input
            type="text"
            name="serviceName"
            value={serviceData.serviceName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md mb-3"
          />

          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md mb-3"
          />

          <label className="block text-sm mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={serviceData.address}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md mb-3"
          />
        </div>
      )}

      {/* Other Tab */}
      {activeTab === "Other" && (
        <div>
          <label className="block text-sm mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={serviceData.category}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md mb-3"
          />

          <label className="block text-sm mb-1">Subcategory</label>
          <input
            type="text"
            name="subcategory"
            value={serviceData.subcategory}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md mb-3"
          />

          <label className="block text-sm mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={serviceData.price}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md mb-3"
          />

          {/* Updated Availability Section */}
          <label className="block text-sm mb-1">
            Availability (Select Days)
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => handleAvailabilityChange(day)}
                className={`px-3 py-1 rounded-md border transition-all ${
                  serviceData.availability.includes(day)
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <label className="block text-sm mb-1">Service Time</label>
          <input
            type="text"
            name="time"
            value={serviceData.time}
            onChange={handleChange}
            placeholder="e.g., 9 AM - 5 PM"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md mb-3"
          />
        </div>
      )}

      {/* Save Button */}
      <button
        className="w-full py-2 mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md"
        onClick={() => {
          navigate("/business/services");
        }}
      >
        Save Service
      </button>
    </div>
  );
};

export default NewService;
