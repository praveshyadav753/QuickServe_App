import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current route

  // Prevent scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  // Function to close the menu
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gray-300 w-full text-white p-4 fixed top-0 left-0 z-50 sm:hidden shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-black">
          QuickServe
        </NavLink>

        {/* Hamburger Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <X size={28} className="text-black" /> : <Menu size={28} className="text-black" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed  left-0 w-full h-full bg-gray-300 text-black z-40 flex flex-col ">
          <ul className="space-y-6 text-xl p-5">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Contact", path: "/contact" },
              { name: "Book Now", path: "/book-now" }
            ].map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={closeMenu}
                  className={`block ${
                    location.pathname === item.path
                      ? "text-blue-500 font-bold "
                      : "hover:text-gray-600"
                  }`}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
