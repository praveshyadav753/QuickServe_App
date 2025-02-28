import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function ServicePackages() {
  const navigate = useNavigate();

  const viewdetails = () => {
    navigate("/viewDetails");
  };

  const packages = [
    {
      id: 1,
      name: "Basic makeup package",
      rating: "4.71",
      reviews: "13K",
      price: "2,099",
      duration: "2 hrs",
      features: [
        "Base & eye makeup with top brands like Kryolan/LA Girl",
        "Includes basic hairstyling",
      ],
      image: "https://via.placeholder.com/100", // Replace with actual image
    },
    {
      id: 2,
      name: "Luxe makeup package",
      rating: "4.65",
      reviews: "2K",
      price: "3,599",
      duration: "2 hrs",
      features: [
        "Premium makeup with luxury brands",
        "Hairstyling & skin preparation included",
      ],
      image: "https://via.placeholder.com/100", // Replace with actual image
    },
  ];
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Packages</h2>

      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="flex justify-between items-center border-b pb-4 mb-4"
        >
          {/* Left Section - Package Details */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{pkg.name}</h3>

            {/* Rating & Reviews */}
            <div className="flex items-center text-gray-600 text-sm space-x-2">
              <span className="text-purple-600">⭐ {pkg.rating}</span>
              <span>({pkg.reviews} reviews)</span>
            </div>

            {/* Price & Duration */}
            <div className="text-lg font-bold text-gray-900 mt-1">
              ₹{pkg.price}{" "}
              <span className="text-gray-600 text-sm font-normal">
                • {pkg.duration}
              </span>
            </div>

            {/* Features List */}
            <ul className="text-gray-600 text-sm mt-2 list-disc list-inside">
              {pkg.features.map((feature, index) => (
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
              src={pkg.image}
              alt={pkg.name}
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
