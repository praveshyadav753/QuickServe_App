import React from "react";
import { FaInfoCircle, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";

const Cart = () => {
    const navigate = useNavigate()
    const checkouthandle =() => {
        navigate('/checkout');
  
    }
  const cartItems = [
    {
      id: 1,
      name: "makeup",
      price: 699.0,
      image: "https://th.bing.com/th/id/OIP.Pneh22uyXw_rJ8leBae8VwHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7",
      available: true,
    },
    
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg mb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="font-bold">₹{item.price.toFixed(2)}</p>
              {item.available ? <p className="text-green-600">✓ Available</p> : <p className="text-red-600">Not available</p>}
            </div>
            <div className="flex items-center space-x-4">
              <select className="border rounded p-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button className="text-red-500 hover:text-red-700">
                <FaTimes size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between text-gray-700">
          <p>Subtotal</p>
          <p>₹99.00</p>
        </div>
        <div className="flex justify-between text-gray-700 mt-2">
          
        </div>
        <div className="flex justify-between text-gray-700 mt-2">
          <p>Tax estimate <FaInfoCircle className="inline ml-1 text-gray-400" /></p>
          <p>₹8.32</p>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <p>Order total</p>
          <p>₹112.32</p>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition cursor-pointer " onClick={checkouthandle}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;