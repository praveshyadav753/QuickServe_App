import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { removeService } from "../../../../../../features/reducers/ServiceSlice";
import axios from "axios";

const DeleteService = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // ✅ Loading state

  const service = useSelector((state) =>
    state.services.service.find((s) => s.service_id == id)
  );

  const handleDelete = async (service_id) => {
    if (!service_id) {
      console.error("Service ID is undefined!");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true); // ✅ Set loading before request

      await axios.delete(`http://127.0.0.1:8000/business/services/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      dispatch(removeService(service_id)); // ✅ Remove from Redux store
      navigate("/business/services"); // ✅ Redirect after deletion
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete the service. Please try again.");
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center m-auto p-5">
      <div className="w-full bg-red-50 dark:bg-red-200 border border-red-200 rounded-lg shadow-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900">Delete Service</h2>
        <p className="text-gray-700 mt-2">
          The Service will be permanently deleted. This action is irreversible.
        </p>

        <hr className="my-2 border-gray-300" />

        <div className="flex items-center gap-4">
          <img
            src={service?.image_url}
            alt="Service"
            className="w-20 h-15 rounded border bg-gray-600"
          />
          <div>
            <h3 className="text-gray-900 font-medium">{service?.service_name}</h3>
            <p className="text-gray-600 text-sm">Last updated {service?.updated_at}</p>
          </div>
        </div>

        <div className="bg-red-100 p-2 mt-3 rounded-lg flex justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition disabled:bg-gray-400"
            onClick={() => handleDelete(id)}
            disabled={loading} // ✅ Disable button when loading
          >
            {loading ? "Deleting..." : "Delete"} {/* ✅ Show loading text */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteService;
