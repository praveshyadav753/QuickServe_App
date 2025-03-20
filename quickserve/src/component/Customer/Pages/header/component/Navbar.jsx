import { NavLink } from "react-router-dom"; // Corrected import path
import React from "react";

function Navbar() {
  return (
    <nav className="bg-white py-4">
      <ul className="flex gap-6 items-center justify-center">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600"
            }
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600"
            }
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/book-now"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600"
            }
          >
            Book Now
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
