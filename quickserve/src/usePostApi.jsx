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

  const postData = async (endpoint, body) => {
    setLoading(true);
    setIsError(false);
    setError(null);

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

  return { data, loading, isError, error, postData };
};

export default usePostApi;
