import React, { useState, useEffect } from "react";
import useApi from "../../../../apihook";
import { useParams } from "react-router";
import Loader from "../loader/loader";

export default function ServiceDetail() {
  const { service_id } = useParams();
  const { loading, error, isError, data } = useApi(
    `service/services/servicedetail/${service_id}`
  );

  const [service, setService] = useState({}); // Initialize as an object

  useEffect(() => {
    if (data) {
      setService(data);
    }
  }, [data]); // Update service state only when data changes

  if (loading) return <Loader/>;
  if (isError) return <p>Error loading service details: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Service Name & Provider */}
      <h1 className="text-3xl font-bold text-gray-900">
        {service?.service_name}
      </h1>
      <p className="text-gray-600 text-sm">
        Provided by{" "}
        <span className="font-medium text-purple-700">
          {service?.business_name}
        </span>
      </p>

      {/* Price & Duration */}
      <div className="mt-2 text-lg font-bold text-gray-900">
        ₹{service?.price}{" "}
        <span className="text-gray-600 text-sm font-normal">
          • {service?.duration}
        </span>
      </div>

      {/* Service Image */}
      {service?.image_url && (
        <img
          src={service.image_url}
          alt={service?.service_name}
          className="w-full h-64 object-cover rounded-lg mt-4 shadow-md"
        />
      )}

      {/* Features List */}
      <h2 className="text-xl font-semibold text-gray-900 mt-6">
        What's Included:
      </h2>
      <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
        {service?.description &&
          service.description.split(",").map((feature, index) => (
            <li key={index}>{feature.trim()}</li>
          ))}
      </ul>

      {/* Location Info (If Available) */}
      {service?.location && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">Location</h2>
          <p className="text-gray-600">{service?.location}</p>
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              service.location
            )}&output=embed`}
            className="w-full h-40 mt-2 rounded-lg shadow-md"
            loading="lazy"
          ></iframe>
        </div>
      )}

      {/* Customer Feedback */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Customer Reviews
        </h2>
        <div className="mt-2 space-y-4">
          {service?.reviews?.length > 0 ? (
            service.reviews.map((feedback, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm">
                <p className="text-gray-900 font-medium">{feedback.user_name}</p>
                <p className="text-sm text-gray-600">⭐ {feedback.rating} / 5</p>
                <p className="text-gray-700 mt-1">{feedback.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Booking Button */}
      <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg w-full text-lg font-medium hover:bg-purple-700 transition">
        Book Now
      </button>
    </div>
  );
}
