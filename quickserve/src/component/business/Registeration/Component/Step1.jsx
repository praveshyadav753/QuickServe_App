import { useState } from "react";

export const Step1 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    countryCode: "",
    address: "",
    designation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-2/3 w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset className="border border-gray-300 p-10 rounded">
            <legend className="text-lg font-semibold text-gray-700">
              Personal Details
            </legend>
            <div className="flex flex-row gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-indigo-200"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-semibold">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-indigo-200"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">
                Gender *
              </label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    required
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    onChange={handleChange}
                  />{" "}
                  Other
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Phone Number *
              </label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  className="border border-gray-300 p-2 rounded focus:ring focus:ring-indigo-200"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Code</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+44">+44 (UK)</option>
                </select>
                <div className="flex flex-row gap-2 align-center justify-center outline-1 rounded-sm">
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="w-full outline-0 p-2 "
                    required
                    onChange={handleChange}
                  />
                  <span className="text-red-500 cursor-pointer px-4 py-2">
                    Send OTP
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <label
                  className="block text-gray-700 font-semibold"
                  htmlFor="otp"
                >
                  Enter OTP:
                </label>
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};
