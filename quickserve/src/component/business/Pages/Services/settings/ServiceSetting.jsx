import React, { useState } from "react";
import { Outlet, useParams } from "react-router";
import Navigationtrail from "../../../components/navigationTrail/Navigationtrail";
import DeleteService from "./component/Deleteservice";
import Sidebar from "./component/sidebarsetting";
import Serviceinfo from "./component/Serviceinfo";

const initialServices = [
  {
    id: 1,
    name: "Service 1",
    description: "Service 1 Description",
    price: 100,
  },
  {
    id: 2,
    name: "Service 2",
    description: "Service 2 Description",
    price: 200,
  },
  {
    id: 3,
    name: "Service 3",
    description: "Service 3 Description",
    price: 300,
  },
];

function Servicesetting() {
  const { id } = useParams();
  const [services, setServices] = useState(initialServices);
  const [activeService, setActiveService] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleSettingsClick = (service) => {
    if (activeService === service.id) {
      setActiveService(null); // Close settings if already opened
    } else {
      setActiveService(service.id);
      setUpdatedData({
        name: service.name,
        description: service.description,
        price: service.price,
      });
    }
  };

  const handleUpdate = (id) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, ...updatedData } : service
      )
    );
    setActiveService(null);
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  return (
    <div className="flex flex-col overflow-hidden relative  flex-1  overflow-y-auto overflow-x-hidden"> 
    {/* Sticky Header */}
    <Navigationtrail  pageName="Service-Settings" />
    
    {/* Sidebar + Main Content */}
    <div className="flex  overflow-hidden">
      <Sidebar/>
      <div className="w-full mt-5 sm:mt-2 sm:w-2/3">
        <Outlet />
        </div>
     
    </div>
  </div>
  );
}

export default Servicesetting;
