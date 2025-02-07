import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "General", path: "general" },
    { name: "Category", path: "category" },
    { name: "Remove Service", path: "delete" },
  ];

  return (
    <>

<nav className="fixed top-17 left-0 right-0 bg-white shadow-md sm:hidden flex justify-around pl-3 pt-0">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-sm font-medium px-3 py-2 ${
                isActive ? "text-blue-500 font-bold" : "text-gray-500"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      {/* Sidebar for larger screens */}
      <aside className="w-64 bg-white rounded-sm text-gray-700 p-4 hidden sm:block">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path} className="cursor-pointer hover:text-blue-400 transition">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-2 py-2 rounded-md transition-all ${
                    isActive ? "text-cyan-950 font-bold" : "text-gray-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Horizontal Navbar for Mobile */}
      
    </>
  );
};

export default Sidebar;
