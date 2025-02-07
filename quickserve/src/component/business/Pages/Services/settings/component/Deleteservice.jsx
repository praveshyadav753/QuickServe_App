import React from "react";

const DeleteService = () => {
  return (
    <div className="flex justify-center items-center   m-auto  p-5">
      <div className="w-full  bg-red-50 border border-red-200 rounded-lg shadow-lg p-5">
        {/* Header Section */}
        <h2 className="text-lg font-semibold text-gray-900">Delete Service</h2>
        <p className="text-gray-700 mt-2">
          The Service will be permanently deleted. 
          This action is irreversible and cannot be undone.
        </p>

        {/* Divider */}
        <hr className="my-2 border-gray-300" />

        {/* Project Info Section */}
        <div className="flex items-center gap-4">
          <img 
            src="" 
            alt="Thumbnail" 
            className="w-20 h-10 rounded border "
          />
          <div>
            <h3 className="text-gray-900 font-medium">maintanance</h3>
            <p className="text-gray-600 text-sm">Last updated 25/12/24</p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-red-100 p-2 mt-3 rounded-lg flex justify-end">
          <button className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteService;
