const service = {
    id: 1,
    name: "Basic Makeup Package",
    provider: "Glamour Salon & Spa",
    price: "2,099",
    duration: "2 hrs",
    features: [
      "Base & eye makeup with top brands like Kryolan/LA Girl",
      "Includes basic hairstyling",
      "Skin preparation and consultation",
    ],
    image: "https://via.placeholder.com/600", // Replace with actual image
    location: "Glamour Salon, 123 Beauty St, New York, NY",
    feedbacks: [
      { customer: "Aisha Sharma", rating: 4.8, comment: "Amazing service, loved the makeup!" },
      { customer: "Neha Kapoor", rating: 4.5, comment: "Great experience, but could improve timing." },
    ],
  };
  
  
export default function ServiceDetail() {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* Service Name & Provider */}
        <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
        <p className="text-gray-600 text-sm">Provided by <span className="font-medium text-purple-700">{service.provider}</span></p>
  
        {/* Price & Duration */}
        <div className="mt-2 text-lg font-bold text-gray-900">
          ₹{service.price} <span className="text-gray-600 text-sm font-normal">• {service.duration}</span>
        </div>
  
        {/* Service Image */}
        <img src={service.image} alt={service.name} className="w-full h-64 object-cover rounded-lg mt-4 shadow-md" />
  
        {/* Features List */}
        <h2 className="text-xl font-semibold text-gray-900 mt-6">What's Included:</h2>
        <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
          {service.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
  
        {/* Location Info (If Available) */}
        {service.location && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Location</h2>
            <p className="text-gray-600">{service.location}</p>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(service.location)}&output=embed`}
              className="w-full h-40 mt-2 rounded-lg shadow-md"
              loading="lazy"
            ></iframe>
          </div>
        )}
  
        {/* Customer Feedback */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
          <div className="mt-2 space-y-4">
            {service.feedbacks.length > 0 ? (
              service.feedbacks.map((feedback, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-sm">
                  <p className="text-gray-900 font-medium">{feedback.customer}</p>
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
  