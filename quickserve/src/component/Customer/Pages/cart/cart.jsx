import React from "react";
import { FaInfoCircle, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../../../features/reducers/cartslice"; // Adjust import path

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkoutHandle = () => {
    navigate('/checkout');
  };

  // Function to update item quantity
  const changeQuantity = (service_id, newQuantity) => {
    console.log(service_id)
    dispatch(updateQuantity({ id: service_id, quantity: Number(newQuantity) }));
  };

  // Function to remove item from cart
  const removeCartItem = (item) => {
    dispatch(removeFromCart(item.service_id));
  };

  // Calculate subtotal dynamically
  const subtotal = items.reduce((acc, item) => acc + Number(item.price || 0) * (item.quantity || 1), 0);
  const tax = subtotal * 0.08; // Assuming 8% tax
  const total = subtotal + tax;

  // If cart is empty, show a message
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Book services</h2>
        {items.map((item) => (
          <div key={item.service_id} className="flex items-center justify-between p-4 border rounded-lg mb-4">
            <img src={item.image} alt={item.service_name} className="w-16 h-16 rounded" />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{item.service_name}</h3>
              <p className="font-bold">₹{Number(item.price || 0).toFixed(2)}</p>
              {item.available ? <p className="text-green-600">✓ Available</p> : <p className="text-red-600">Not available</p>}
            </div>
            <div className="flex items-center space-x-4">
              {/* Quantity Selector */}
              <select
                className="border rounded p-1"
                value={item.quantity || 1}
                onChange={(e) => changeQuantity(item.service_id, e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              {/* Remove Item Button */}
              <button className="text-red-500 hover:text-red-700" onClick={() => removeCartItem(item)}>
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
          <p>₹{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-gray-700 mt-2">
          <p>Tax estimate <FaInfoCircle className="inline ml-1 text-gray-400" /></p>
          <p>₹{tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <p>Order total</p>
          <p>₹{total.toFixed(2)}</p>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition cursor-pointer" onClick={checkoutHandle}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
