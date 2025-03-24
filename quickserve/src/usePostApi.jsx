import { useState } from "react";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000", // Django backend URL
  withCredentials: true, // Include cookies if using session auth
});

const usePostApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [retryTrigger, setRetryTrigger] = useState(0);
  const [lastRequest, setLastRequest] = useState(null);
  const postData = async (endpoint, body, token = null) => {
    setLoading(true);
    setIsError(false);
    setError(null);
    setLastRequest({ endpoint, body });

    try {
      const token= localStorage.getItem('token');

      const response = await apiClient.post(endpoint, body, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token && { Authorization: `Bearer ${token}` }), // Add Bearer token if available
        },
      });

      setData(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred");
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError(error.message);
      }
      setIsError(true);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    if (lastRequest) {
      setRetryTrigger((prev) => prev + 1);
      postData(lastRequest.endpoint, lastRequest.body);
    }
  };

  return { data, loading, isError, error, postData, retry };
};

export default usePostApi;
