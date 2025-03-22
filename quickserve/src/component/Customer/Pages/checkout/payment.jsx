import React, { useState } from "react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>

      {/* Order Summary */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        <p>Items: <span className="font-medium">3</span></p>
        <p>Subtotal: <span className="font-medium">$108</span></p>
        <p>Shipping: <span className="font-medium">$10.85</span></p>
        <p>Discount: <span className="font-medium">-$9</span></p>
        <hr className="my-2" />
        <p className="text-xl font-bold">Total: $88.15</p>
      </div>

      {/* Payment Methods */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Select Payment Method</h2>

        {/* Payment Options */}
        <div className="space-y-2">
          <button
            className={`w-full p-2 rounded-lg border ${paymentMethod === "card" ? "bg-indigo-600 text-white" : ""}`}
            onClick={() => setPaymentMethod("card")}
          >
            Credit/Debit Card
          </button>
          <button
            className={`w-full p-2 rounded-lg border ${paymentMethod === "upi" ? "bg-indigo-600 text-white" : ""}`}
            onClick={() => setPaymentMethod("upi")}
          >
            UPI / QR Code
          </button>
          <button
            className={`w-full p-2 rounded-lg border ${paymentMethod === "wallet" ? "bg-indigo-600 text-white" : ""}`}
            onClick={() => setPaymentMethod("wallet")}
          >
            Wallet (Paytm, PhonePe)
          </button>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === "card" && (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChange={handleCardChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <div className="flex space-x-2">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleCardChange}
                className="w-1/2 p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardChange}
                className="w-1/2 p-3 border rounded-lg"
                required
              />
            </div>
          </div>
        )}

        {/* UPI Payment */}
        {paymentMethod === "upi" && (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              name="upiId"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <p className="text-sm text-gray-500">Or scan the QR code below</p>
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-lg">
              <p className="text-gray-600">QR Code Placeholder</p>
            </div>
          </div>
        )}

        {/* Wallet Payment */}
        {paymentMethod === "wallet" && (
          <p className="mt-4 text-gray-600">You will be redirected to your wallet for payment.</p>
        )}

        {/* Place Order Button */}
        <button className="w-full p-3 mt-4 bg-green-600 text-white rounded-lg">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
