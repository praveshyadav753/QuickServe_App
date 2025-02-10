import React from 'react';

const FeedbackDashboard = () => {
  // Sample data
  const feedbackData = [
    { id: 1, user: 'John Doe', rating: 4, comment: 'Great service, very satisfied!' },
    { id: 2, user: 'Jane Smith', rating: 5, comment: 'Excellent experience, highly recommend!' },
    { id: 3, user: 'Alice Johnson', rating: 3, comment: 'Good, but could be better.' },
    { id: 4, user: 'Bob Brown', rating: 2, comment: 'Not satisfied with the service.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-700 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Service Feedback Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbackData.map((feedback) => (
          <div key={feedback.id} className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{feedback.user}</h2>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 ">{feedback.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackDashboard;