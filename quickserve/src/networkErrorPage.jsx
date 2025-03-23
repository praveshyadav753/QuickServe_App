import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ message, onRetry }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryKey, setRetryKey] = useState(0); // ✅ Force re-render on retry

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  // ✅ Retry function: Increments `retryKey` to force re-fetch
  const handleRetry = () => {
    setRetryKey(prev => prev + 1);
    if (onRetry) onRetry(); // Ensure onRetry is called
  };

  return (
    <div key={retryKey} className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center text-center z-50">
      <img src="/error-page.png" alt="Error" className="w-48 h-48" />

      <h1 className="text-3xl font-bold text-red-600 mt-4">
        {isOnline ? "Server Error!" : "OOPS! No Internet Connection"}
      </h1>
      <p className="text-lg font-semibold text-gray-900">
        {isOnline ? message : "Your internet connection is down. Please check it."}
      </p>
      <p className="text-gray-600 mx-8 mt-2">
        {isOnline
          ? "This is not you, this is us. Our servers are currently down. Please try again later."
          : "Please fix your internet connection and try again."}
      </p>
      <button
        onClick={handleRetry}
        className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorBoundary;
