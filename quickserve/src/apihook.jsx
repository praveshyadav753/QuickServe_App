// import { useEffect, useState } from "react";
// import axios from "axios";

// // Create an Axios instance with a base URL
// const apiClient = axios.create({
//   baseURL: "https://quickserve.pythonanywhere.com", // Set your base URL
//   withCredentials: true, // Include credentials (cookies, auth tokens)
// });

// const useApi = (endpoint) => {
//   const [error, setError] = useState(null);
//   const [isError, setIsError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     if (!endpoint) return;

//     const controller = new AbortController(); // To cancel the request

//     (async () => {
//       setLoading(true);
//       setIsError(false);
//       setError(null);

//       try {
//         //         const response = await apiClient.get(endpoint, { signal: controller.signal });
//         setData(response.data);
//       } catch (error) {
//         if (!axios.isCancel(error)) {
//           if (error.response) {
//             setError(error.response.data.message || "An error occurred");
//           } else if (error.request) {
//             setError("Network error. Please check your connection.");
//           } else {
//             setError(error.message);
//           }
//           setIsError(true);
//         }
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => {
//       controller.abort(); // Cleanup on unmount
//     };
//   }, [endpoint]);

//   return { data, loading, isError, error };
// };

// export default useApi;
//-----------------------------------------------------------------------
import { useEffect, useState } from "react";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://quickserve.pythonanywhere.com", // Django backend URL
  withCredentials: true, // Include cookies if needed
});

const useApi = (endpoint) => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [retryTrigger, setRetryTrigger] = useState(0); // Track retries

  const fetchData = async () => {
    setLoading(true);
    setIsError(false);
    setError(null);

    try {
            const token = localStorage.getItem("token"); // Get stored token

      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Add Bearer token if available

      const response = await apiClient.get(endpoint, { headers });
      setData(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred");
      } else if (error.request) {
        setError("Server unreachable. Please check your connection.");
      } else if (error.message.includes("ERR_CONNECTION_REFUSED")) {
        setError("Server is down. Try again later.");
      } else {
        setError(error.message);
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) {
      fetchData();
    }
  }, [endpoint, retryTrigger]); // Re-fetch when retryTrigger changes

  const retry = () => setRetryTrigger((prev) => prev + 1); // Force re-fetch

  return { data, loading, isError, error, retry };
};

export default useApi;
