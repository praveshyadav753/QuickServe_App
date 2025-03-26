import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Removeservice from "../../../../../../features/reducers/ServiceSlice"

const DeleteService = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
   const service = useSelector((state) =>
    
      state.services.service.find((s) => s.service_id == id)
    );

  const handleDelete = async (service_id) => {
    // const isDeleted = await deleteService(service_id);
    if (true) {
        dispatch(Removeservice(service_id));
        navigate("/services");  // Redirect after deletion
    }
};


  return (
    <div className="flex justify-center items-center   m-auto  p-5">
      <div className="w-full  bg-red-50 dark:bg-red-200 border border-red-200 rounded-lg shadow-lg p-5">
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
            src={service?.image_url} 
            alt="" 
            className="w-20 h-15 rounded border bg-gray-600 "
          />
          <div>
            <h3 className="text-gray-900 font-medium">{service?.service_name}</h3>
            <p className="text-gray-600 text-sm">Last updated {service?.updated_at}</p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-red-100 p-2 mt-3 rounded-lg flex justify-end">
          <button className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition" onClick={handleDelete}>
            Delete
          </button >
        </div>
      </div>
    </div>
  );
};

export default DeleteService;
