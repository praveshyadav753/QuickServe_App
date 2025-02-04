import { useState } from "react";

export const Step2 = () => {
  const [formData, setFormData] = useState({
    confirmPassword: "",
    password: " ",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="  flex  justify-center">
      <div className="bg-white p-5 rounded-lg  max-w-2/3 w-full">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
          Password creation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 font-semibold">Password *</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-indigo-200"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-indigo-200"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
