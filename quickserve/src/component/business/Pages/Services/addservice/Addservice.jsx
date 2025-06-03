import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useApi from "../../../../../apihook";
import Loader from "../../../../Customer/Pages/loader/loader";
import usePostApi from "../../../../../usePostApi";

const NewService = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("General");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [serviceData, setServiceData] = useState({
    service_id:"",
    service_name: "",
    description: "",
    image:"",
    address: "",
    category: "",
    subcategory: "",
    price: "",
    availability: [],
    time: "",
  });
  
  // Fetch categories
  let { loading, data } = useApi("/core/categories-get/");
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  // Fetch subcategories when category changes
  useEffect(() => {
    setSubcategories([]); // Reset subcategories
    setServiceData((prev) => ({ ...prev, subcategory: "" })); // Reset selected subcategory
    if (serviceData.category) {
      fetchSubcategories(serviceData.category);
    }
  }, [serviceData.category]);

  // Function to fetch subcategories
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(
        `https://quickserve.pythonanywhere.com/core/subcategory/${categoryId}/`
      );
      const result = await response.json();
      setSubcategories(result);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

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

  const {
    loading: postLoading,
    isError,
    error,
    data: pdata,
    postData,
  } = usePostApi();

  const handleSubmit = async () => {
    console.log("Service Data:", serviceData);
    const response = await postData("business/addservice/", serviceData);
    if (response) {
      navigate("/business/services/");
      
    }
    if(error)
    {
      return <div className="flex w-full justify-center text-red-500">An Error occurred ! please try again;
      </div>
    }
    // Add API call to submit the form
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

  if (loading) return <Loader />;

  return (
    <div className="max-w-lg mx-auto dark:bg-gray-900 bg-gray-100 dark:text-white text-black p-6 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">New Service</h2>
        <div
          className="cursor-pointer"
          onClick={() => navigate("/business/services")}
        >
          x
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 text-black dark:text-white mb-4">
        <button
          onClick={() => setActiveTab("General")}
          className={`flex-1 py-2 text-center ${
            activeTab === "General"
              ? "border-b-2 border-black dark:border-yellow-400"
              : "text-gray-400"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("Other")}
          className={`flex-1 py-2 text-center ${
            activeTab === "Other"
              ? "border-b-2 border-black dark:border-yellow-400 dark:text-yellow-400"
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
            name="service_name"
            value={serviceData.service_name}
            onChange={handleChange}
            className="w-full p-2 dark:bg-gray-800 bg-white border border-gray-700 rounded-md mb-3"
          />

          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            className="w-full p-2 dark:bg-gray-800 bg-white border border-gray-700 rounded-md mb-3"
          />

          <label className="block text-sm mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={serviceData.address}
            onChange={handleChange}
            className="w-full p-2 dark:bg-gray-800 bg-white border border-gray-700 rounded-md mb-3"
          />
        </div>
      )}

      {/* Other Tab */}
      {activeTab === "Other" && (
        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            name="category"
            value={serviceData.category}
            onChange={handleChange}
            className="w-full p-2 dark:bg-gray-800 bg-white border border-gray-700 rounded-md mb-3"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
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
                    ? "dark:bg-yellow-500 bg-gray-700 dark:text-black text-white dark:border-yellow-500"
                    : "dark:bg-gray-800 bg-white dark:text-white border-gray-600 hover:bg-gray-700"
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
            className="w-full p-2 dark:bg-gray-800 bg-white border border-gray-700 rounded-md mb-3"
          />
        </div>
      )}

      <button
        className="w-full py-2 mt-4 bg-gray-600 hover:bg-gray-800 text-white font-semibold rounded-md"
        onClick={
          activeTab === "General" ? () => setActiveTab("Other") : handleSubmit
        }
        disabled={postLoading}
      >
        {postLoading ? "Adding..." : activeTab === "General" ? "Next" : "Add"}
      </button>
    </div>
  );
};

export default NewService;
