import React from "react";

const Step1 = ({ formData, onChange ,error }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-3/2 w-full">
        <form className="space-y-4">
          <fieldset className="border border-gray-300 p-7 rounded flex flex-col gap-4">
            <legend className="text-lg font-semibold text-gray-700">
              Personal Details
            </legend>
            <div className="w-full text-normal text-red-600 "> 
            {error && <p>{error}</p>}
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-1/2">
                <fieldset className="border border-gray-300 rounded">
                  <legend className="block text-gray-700 font-semibold">
                    Full Name *
                  </legend>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    className="w-full outline-0 p-1 pt-0"
                    required
                    onChange={(e) => onChange({ fullName: e.target.value })}
                  />
                </fieldset>
              </div>
              <div className="w-1/2">
                <fieldset className="border border-gray-300 rounded">
                  <legend className="block text-gray-700 font-semibold">
                    Email *
                  </legend>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full outline-none p-1 pt-0"
                    required
                    onChange={(e) => onChange({ email: e.target.value })}
                  />
                </fieldset>
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
                    checked={formData.gender === "male"}
                    onChange={(e) => onChange({ gender: e.target.value })}
                    required
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) => onChange({ gender: e.target.value })}
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={(e) => onChange({ gender: e.target.value })}
                  />{" "}
                  Other
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                Phone Number *
              </label>
              <div className="flex">
                <select
                  name="countryCode"
                  className="border border-gray-300 p-2 rounded rounded-r-none focus:ring focus:ring-indigo-200"
                  value={formData.countryCode}
                  required
                  onChange={(e) => onChange({ countryCode: e.target.value })}
                >
                  <option value="">Select Code</option>
                  <option value="+1">+1 (USA)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+44">+44 (UK)</option>
                </select>
                <div className="flex flex-row gap-2 align-center justify-center border border-gray-300 rounded-l-none rounded-sm">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    className="w-full outline-none p-2"
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    onChange={(e) => onChange({ phoneNumber: e.target.value })}
                  />
                  <span className="text-red-500 cursor-pointer px-2 py-2 whitespace-nowrap">
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
                  value={formData.otp}
                  className="border border-gray-300 p-2 rounded"
                  onChange={(e) => onChange({ otp: e.target.value })}
                />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Step1;
