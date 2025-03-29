import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  loginFailure,
  setLoading,
} from "../../features/reducers/Slice";
import axios from "axios";
import { syncCartOnLogin } from "../Customer/Pages/cart/synccart";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Capture location state to get previous route
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/",
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { access_token, user } = response.data;

      dispatch(loginSuccess(user));
      localStorage.setItem("token", access_token);
      
      // Sync cart items after login
      if(user.role === "customer")
      syncCartOnLogin(dispatch);

      // Redirect to previous page (if available) or default route
      let redirectPath;
      if (user.role === "Admin") {
        redirectPath = "/admin"; // Always redirect Admins to the admin panel
      } else if (user.role === "Service Provider") {
        redirectPath = "/business"; // Always redirect Service Providers to their dashboard
      } else {
        redirectPath = location.state?.from || "/"; // Regular users go back or to the homepage
      }
  
      navigate(redirectPath, { replace: true });
      // navigate(from, { replace: true });
    } catch (error) {
      dispatch(loginFailure("Invalid email or password"));
      alert(error.response?.data?.error || "Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <h1 className="text-center font-extrabold text-xl xl:text-4xl">
            QuickServe
          </h1>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            <form onSubmit={handleSubmit} className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-5"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  className="mt-5 font-semibold bg-indigo-500 text-white w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
