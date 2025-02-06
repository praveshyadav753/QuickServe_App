import React from 'react';

const Step2 = ({ formData, onChange ,error}) => {
  return (
    <div>
      <div className="w-full text-normal text-red-600 "> 
            {error && <p>{error}</p>}
            </div>
      <div>
        <label htmlFor="password" className="block text-gray-700 font-semibold">
          Password *
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => onChange({ password: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">
          Confirm Password *
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => onChange({ confirmPassword: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-indigo-200"
          required
        />
      </div>
    </div>
  );
};

export default Step2;
