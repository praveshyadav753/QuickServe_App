import React, { useState } from "react";
import useApi from "../../../../../../apihook";
import usePostApi from "../../../../../../usePostApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const Category = () => {
  const {id} = useParams();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [serviceData, setServiceData] = useState({
    service_id: "",
    service_name: "",
    description: "",
    image: "",
    address: "",
    category: "",
    subcategory: "",
    price: "",
    availability: [],
    time: "",
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  
  
  let { loading, data } = useApi("/core/categories-get/");
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);
  
  const service = useSelector((state) =>
  
    state.services.service.find((s) => s.service_id == id)
  );
  console.log("services:", JSON.stringify(service, null, 2));
  useEffect(() => {
    if (service) {
      setServiceData({
        service_id: service.service_id || "",
        service_name: service.service_name || "",
        description: service.description || "",
        image: service.image || "",
        address: service.address || "",
        category: service.Category || "",
        subcategory: service.subcategory || "",
        price: service.price || "",
        availability: service.availability || [],
        time: service.time || "",
      });
    }
  }, [service]);

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

  // Fetch subcategories when category changes
  useEffect(() => {
    setSubcategories([]); // Reset subcategories
    if (serviceData.category) {
      fetchSubcategories(serviceData.category);
    }
  }, [serviceData.category]);

  // Function to fetch subcategories
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/core/subcategory/${categoryId}/`
      );
      const result = await response.json();
      setSubcategories(result);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  


  return (
    <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white text-black min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Other Details
      </h2>

      <label className="block text-sm mb-1">Category</label>
      <select
        name="category"
        value={serviceData.category}
        onChange={handleChange}
        className="w-full p-2 dark:bg-gray-800 bg-white border border-gray-700 rounded-md mb-3"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>

      <label className="block text-sm mb-1">Subcategory</label>
      <select
        name="subcategory"
        value={serviceData.subcategory}
        onChange={handleChange}
        className="w-full p-2 dark:bg-gray-800 bg-white border border-gray-700 rounded-md mb-3"
      >
        <option value="">Select a subcategory</option>
        {subcategories.map((subcategory) => (
          <option
            key={subcategory.subcategory_id}
            value={subcategory.subcategory_id}
          >
            {subcategory.subcategory_name}
          </option>
        ))}
      </select>
      <label className="block text-sm mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={serviceData.price}
            onChange={handleChange}
            className="w-full p-2 dark:bg-gray-800 bg-white border border-gray-700 rounded-md mb-3"
          />
      <div className="space-y-4">
        <label className="block text-sm mb-1">Availability (Select Days)</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => handleAvailabilityChange(day)}
              className={`px-3 py-1 rounded-md border transition-all ${
                serviceData.availability.includes(day)
                  ? "dark:bg-yellow-500 bg-gray-700 dark:text-black text-white dark:border-yellow-500"
                  : "dark:bg-gray-800 bg-white dark:text-white border-gray-600 hover:bg-gray-700"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
