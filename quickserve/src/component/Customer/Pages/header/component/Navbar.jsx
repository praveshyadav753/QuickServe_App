import { NavLink } from "react-router";
import React from "react";


function Navbar() {
  return (
    <nav>
      <ul className="flex gap-3">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">Services</NavLink>
        </li>
        <li>
          <NavLink to="/services">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/Book-now">Book Now</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar