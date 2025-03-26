import React from "react";
import DeleteService from "./Deleteservice";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchServices } from "../../../../../../features/reducers/ServiceSlice";

function Serviceinfo() {
  const {id}=useParams();

  // useEffect(() => {
  //   dispatch(fetchServices());
  // }, [dispatch]);
    const [serviceData,setServiceData]=useState([]);
  
    const service = useSelector((state) =>
    
      state.services.service.find((s) => s.service_id == id)
    );
    console.log("services:", JSON.stringify(service, null, 2));
    useEffect(() => {
      if (service) {
        setServiceData({
          service_id: service.service_id || "",
          service_name: service.service_name || "",
          description: service.description || "",
          image: service.image_url || "",
          address: service.address || "",
          category: service.Category || "",
          subcategory: service.subcategory || "",
          price: service.price || "",
          availability: service.availability || [],
          time: service.time || "",
        });
      }
    }, [service]);
  
  return (
    <div className="w-full h-full dark:text-gray-200  text-gray-900 flex flex-col items-center ">
      <div className="m-auto pt-0 p-3 w-full ">
      <h2 className="font-semibold text-3xl text-gray-700 dark:text-gray-200 mb-4">General</h2>
        <div className="p-6 flex flex-col bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg rounded-b-none">
          

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold " htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={serviceData.service_name}
                className="border border-gray-300 dark:border-gray-900 dark:bg-gray-700 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold " htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={serviceData.description}
                className="border border-gray-300 dark:border-gray-900 dark:bg-gray-700 rounded-md p-2 resize-none"
                rows="3"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold " htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                defaultValue={serviceData.address}
                name="address"
                className="border border-gray-300 dark:border-gray-900 dark:bg-gray-700 rounded-md p-2"
              />
            </div>
            <div className="flex gap-15 items-center overflow-hidden">
              <img className="bg-gray-400 h-15 w-15 rounded" src={serviceData.image} alt="" />
            <div className="flex flex-col gap-2">
              
              <label className="font-semibold " htmlFor="logo">
                Image URL
              </label>
              <input
                type="text"
                id="logo"
                defaultValue={serviceData.image}
                name="logo"
                className="border border-gray-300 dark:border-gray-900 dark:bg-gray-700 rounded-md p-2"
              />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold " htmlFor="pincode">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                defaultValue={serviceData.pincode}
                className="border border-gray-300 dark:border-gray-900 dark:bg-gray-700 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div className="p-4 flex justify-end bg-gray-50 rounded-b-lg border border-gray-300 dark:border-gray-900 dark:bg-gray-900">
          <button
            type="button"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Serviceinfo;
