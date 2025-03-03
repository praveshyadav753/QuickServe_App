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
    image: "data:image/jpeg;base64,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", // Replace with actual image
    location: "Glamour Salon, 123 Beauty St, indore, Vijay nagar",
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
  