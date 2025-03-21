import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch ,useSelector} from 'react-redux';

import { loginSuccess, loginFailure, setLoading } from '../../features/reducers/Slice';
import useApi from '../../apihook';
import axios from 'axios';
import { syncCartOnLogin } from '../Customer/Pages/cart/synccart';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading}=useSelector((state)=>state.auth)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const reqdata=JSON.stringify(formData);
    console.log(reqdata)
    e.preventDefault();
    dispatch(setLoading());
    
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/",reqdata
       ,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure credentials are sent
        }
      );
  
      const { access_token, user } = response.data; // Use access_token instead of access
      dispatch(loginSuccess(user));
  
      // Store JWT Token for authentication
      localStorage.setItem("token", access_token);
      //sync cart item with localstorage
      console.log(user)
      syncCartOnLogin(user.id, dispatch);
     
  
      // Redirect user based on role (if role exists)
      if (user.role === "Service Provider") {
        navigate("/business");
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch(loginFailure("Invalid email or password"));
  
      if (error.response) {
        alert(error.response.data.error || "Invalid email or password");
      } else {
        alert("Network error. Please try again.");
      }
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <h1 className="text-center font-extrabold text-xl xl:text-4xl">QuickServe</h1>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit}>
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button 
                    type="submit"
                    className="mt-5 cursor-pointer tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    {loading?"loading...":"Login"} 
                  </button>
                </div>
              </form>
            </div>
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
