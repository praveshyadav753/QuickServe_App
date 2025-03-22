import React, { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mailingAddress: "",
    city: "",
    postCode: "",
    country: "",
    state: "",
    sameAddress: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section: Shopping Cart */}
        

        {/* Right Section: Personal Details Form */}
        <div className="bg-white p-6 shadow-md rounded-lg md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Your Personal Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <input
              type="text"
              name="mailingAddress"
              placeholder="Mailing Address"
              value={formData.mailingAddress}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="postCode"
                placeholder="Post Code"
                value={formData.postCode}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="Region/State"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="sameAddress"
                checked={formData.sameAddress}
                onChange={handleChange}
                className="mr-2"
              />
              <span>My delivery and mailing addresses are the same.</span>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
            >
              Next Step
            </button>
          </form>
        </div>

        {/* Coupon Code Section */}
        <div className="bg-white p-6 shadow-md rounded-lg md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Coupon Code</h2>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter code"
              className="w-full p-3 border rounded-l-lg"
            />
            <button className="bg-indigo-600 text-white px-6 rounded-r-lg hover:bg-indigo-700">
              Apply
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
