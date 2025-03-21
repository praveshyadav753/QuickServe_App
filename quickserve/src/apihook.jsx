// import { useEffect, useState } from "react";
// import axios from "axios";

// // Create an Axios instance with a base URL
// const apiClient = axios.create({
//   baseURL: "http://127.0.0.1:8000", // Set your base URL
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
//         console.log("fetching.....");
//         const response = await apiClient.get(endpoint, { signal: controller.signal });
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


import { useEffect, useState } from "react";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000", // Django backend URL
  withCredentials: true, // Include cookies (if using session auth)
});

const useApi = (endpoint, method = "GET", body = null) => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!endpoint) return;
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setIsError(false);
      setError(null);

      try {
        console.log(`Fetching: ${endpoint} with ${method}`);
        let response;

        if (method === "POST") {
          response = await apiClient.post(endpoint, body, { signal: controller.signal });
        } else {
          response = await apiClient.get(endpoint, { signal: controller.signal });
        }

        setData(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          if (error.response) {
            setError(error.response.data.message || "An error occurred");
          } else if (error.request) {
            setError("Network error. Please check your connection.");
          } else {
            setError(error.message);
          }
          setIsError(true);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [endpoint, method, body]);

  return { data, loading, isError, error };
};

export default useApi;
