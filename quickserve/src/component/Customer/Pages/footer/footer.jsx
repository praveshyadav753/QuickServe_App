import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Company</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About us</a></li>
              <li><a href="#" className="hover:underline">Terms & conditions</a></li>
              <li><a href="#" className="hover:underline">Privacy policy</a></li>
              <li><a href="#" className="hover:underline">Anti-discrimination policy</a></li>
              <li><a href="#" className="hover:underline">Impact</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>

          {/* Customers Section */}
          <div>
            <h2 className="text-lg font-semibold mb-3">For customers</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Reviews</a></li>
              <li><a href="#" className="hover:underline">Categories near you</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Contact us</a></li>
            </ul>
          </div>

          {/* Partners Section */}
          <div>
            <h2 className="text-lg font-semibold mb-3">For partners</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Register as a professional</a></li>
            </ul>
          </div>

          {/* Social Links & App Downloads */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Social links</h2>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-black"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-black"><FaFacebookF size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-black"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-black"><FaLinkedinIn size={20} /></a>
            </div>

            <div className="space-y-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Google_Play_Store_badge_EN.svg" 
                   alt="Google Play" className="w-32 cursor-pointer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png" 
                   alt="App Store" className="w-28 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
          © Copyright 2024 QuickServe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
