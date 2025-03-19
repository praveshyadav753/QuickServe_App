import { useNavigate } from "react-router";
import { Link } from "react-router-dom";



export default function ServicePackages({services}) {
  const navigate = useNavigate();

  const viewdetails = () => {
    navigate("/viewDetails");
  };

  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Packages</h2>

      {services.map((service) => (
        <div
          key={service.id}
          className="flex justify-between items-center border-b pb-4 mb-4"
        >
          {/* Left Section - Package Details */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{service.service_name}</h3>
            <span>({service.business_name})</span>

            {/* Rating & Reviews */}
            <div className="flex items-center text-gray-600 text-sm space-x-2">
              <span className="text-purple-600">⭐ {service.rating}</span>
              <span>({service?.reviews} reviews)</span>
            </div>

            {/* Price & Duration */}
            <div className="text-lg font-bold text-gray-900 mt-1">
              ₹{service.price}{" "}
              <span className="text-gray-600 text-sm font-normal">
                • {service?.duration}
              </span>
            </div>

            {/* Features List */}
            <ul className="text-gray-600 text-sm mt-2 list-disc list-inside">
              {service.discription?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            {/* View Details Link */}
            <Link
              to="/viewDetails"
              className="text-purple-600 font-medium mt-2 inline-block"
            >
              View details
            </Link>
          </div>

          {/* Right Section - Image & Button */}
          <div className="flex flex-col items-center">
            <img
              src={service.image_url}
              alt={service.service_name}
              className="w-24 h-24 object-cover rounded-lg shadow-md mb-2"
            />
            <button className="px-4 py-1 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-100 transition">
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
