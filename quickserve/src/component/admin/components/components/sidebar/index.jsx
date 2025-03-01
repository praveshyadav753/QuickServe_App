import { HiX } from "react-icons/hi";
import routes from "../../../layouts/admin/routes";
import React from "react";
import SidebarLinks from "./components/Links";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`fixed z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl transition-all dark:bg-[#111C44] dark:text-gray-100 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX size={24} />
      </span>

      {/* Logo */}
      <div className="mx-14 mt-12 flex items-center">
        <div className="text-2xl font-bold text-navy-700 dark:text-white">
          QuickServe
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 mb-7 h-px bg-gray-300 dark:bg-white/30" />

      {/* Navigation Items */}
      <ul className="mb-auto pt-1 dark:text-gray-100 ">
        <SidebarLinks routes={routes} />

        {/* {routes.map((route, index) => (
          <li key={index} className="flex items-center gap-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
            {route.icon && React.createElement(route.icon, { size: 24 })}
            <span>{route.name}</span>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Sidebar;
