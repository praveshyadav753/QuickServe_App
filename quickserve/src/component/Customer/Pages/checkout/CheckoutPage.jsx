import React, { useState } from "react";
import AddressSelector from "./address";
import PaymentPage from "./payment";

export default function CheckoutPage() {
  const [openSection, setOpenSection] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const totalAmount = 108.00;
  const shippingCost = 10.85;
  const finalTotal = totalAmount + shippingCost - discount;

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shopping Cart - Always Visible on the Left */}
        <div className="bg-white p-6 shadow-md rounded-lg md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Jeans Pant</span>
              <span className="font-semibold">$36.00</span>
            </div>
            <div className="flex justify-between">
              <span>Circular Sienna</span>
              <span className="font-semibold">$36.00</span>
            </div>
            <div className="flex justify-between">
              <span>Black T-shirt</span>
              <span className="font-semibold">$36.00</span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Personal Details, Address, and Payment */}
        <div className="md:col-span-2 space-y-4">
          {/* Personal Details Section */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <button
              onClick={() => toggleSection("personal")}
              className="w-full text-left font-semibold text-lg flex justify-between items-center"
            >
              Personal Details
              <span>{openSection === "personal" ? "▲" : "▼"}</span>
            </button>
            {openSection === "personal" && (
              <div className="mt-4 space-y-2">
                <input type="text" placeholder="Full Name" className="w-full p-2 border rounded-lg" />
                <input type="email" placeholder="Email Address" className="w-full p-2 border rounded-lg" />
                <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded-lg" />
              </div>
            )}
          </div>

          {/* Address Section */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <button
              onClick={() => toggleSection("address")}
              className="w-full text-left font-semibold text-lg flex justify-between items-center"
            >
              Shipping Address
              <span>{openSection === "address" ? "▲" : "▼"}</span>
            </button>
            {openSection === "address" && (
              <div className="mt-4">
                <AddressSelector />
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <button
              onClick={() => toggleSection("payment")}
              className="w-full text-left font-semibold text-lg flex justify-between items-center"
            >
              Payment
              <span>{openSection === "payment" ? "▲" : "▼"}</span>
            </button>
            {openSection === "payment" && (
              <div className="mt-4">
                <PaymentPage />
              </div>
            )}
          </div>
        </div>

        {/* Coupon Code Section */}
        <div className="bg-white p-6 shadow-md rounded-lg md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Coupon Code</h2>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full p-3 border rounded-l-lg"
            />
            <button
              onClick={applyCoupon}
              className="bg-indigo-600 text-white px-6 rounded-r-lg hover:bg-indigo-700"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
