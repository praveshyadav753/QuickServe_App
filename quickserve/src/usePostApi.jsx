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
  const [retryTrigger, setRetryTrigger] = useState(0); // ✅ Track retry attempts
  const [lastRequest, setLastRequest] = useState(null); // ✅ Store last request

  const postData = async (endpoint, body) => {
    setLoading(true);
    setIsError(false);
    setError(null);
    setLastRequest({ endpoint, body }); // ✅ Save last request

    try {
      console.log(`Sending POST request to: ${endpoint}`);
      const response = await apiClient.post(endpoint, body);
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
      setRetryTrigger((prev) => prev + 1); // ✅ Force re-execution
      postData(lastRequest.endpoint, lastRequest.body); // ✅ Re-execute last request
    }
  };

  return { data, loading, isError, error, postData, retry };
};

export default usePostApi;
