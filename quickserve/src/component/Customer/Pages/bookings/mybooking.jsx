import React from "react";
import { CheckCircle, XCircle } from "lucide-react"; // For icons
import { Provider } from "react-redux";

const MyBookings = () => {
  const orders = [
    {
      id: 1,
      orderNumber: "WU8819111",
      datePlaced: "Jul 6, 2025",
      totalAmount: 160.0,
      status: "completed", // ✅ Completed Order
      items: [
        {
          id: 101,
          name: "Haircut",
          Provider: "sylish salon",
          price: 70.0,
          image: "https://via.placeholder.com/64",
          deliveryDate: "July 12, 2025",
        },
        {
          id: 102,
          name: "Massage",
          price: 90.0,
          Provider: "sylish salon",
          image: "https://via.placeholder.com/64",
          deliveryDate: "July 12, 2021",
        },
      ],
    },
    {
      id: 2,
      orderNumber: "WU8819222",
      datePlaced: "Aug 14, 2021",
      totalAmount: 90.0,
      status: "cancelled",
      items: [
        {
          id: 103,
          name: "Ac repair",
          price: 1990.0,
          image: "https://via.placeholder.com/64",

          deliveryDate: "Aug 20, 2025",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="border-b-2 border-gray-400">
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          <p className="text-gray-600 mb-6">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>

        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="border-b pb-4 mb-4 mt-3 bg-white p-6 shadow-md rounded-lg"
            >
              <div className="flex justify-between items-center mb-2 border-b-2 border-gray-300 pb-3">
                <div>
                  <p className="text-sm text-gray-500">Order number</p>
                  <p className="font-medium">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date placed</p>
                  <p className="font-medium">{order.datePlaced}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total amount</p>
                  <p className="font-semibold">₹{order.totalAmount}</p>
                </div>
                <div className="space-x-2">
                  <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
                    View Order
                  </button>
                  <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
                    View Invoice
                  </button>
                </div>
              </div>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col border-b-2 pb-4 border-gray-200"
                >
                  <div className="flex gap-10 mt-4">
                    <img
                      src={item.image}
                      className="w-16 h-16 rounded-md bg-gray-200"
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500 font-light text-sm"> {item?.Provider || ""}</p>

                      <p className="text-gray-500 text-base">
                        Qty: {item?.quantity || 1}
                      </p>
                    </div>
                    <p className="font-semibold mt-1">₹{item.price}</p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      {/* Status Icon */}
                      {order.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mr-2" />
                      )}
                      <p
                        className={`text-sm font-small ${
                          order.status === "completed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.status === "completed"
                          ? `Service Completed ${item.deliveryDate}`
                          : `Service Cancelled ${item.deliveryDate}`}
                      </p>
                    </div>
                    <div className="mt-2 space-x-4">
                      <button className="text-gray-800  cursor-pointer">
                        View product
                      </button>
                      <button className="text-gray-800 cursor-pointer">
                        Buy again
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">You have no bookings yet.</p>
            <button className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
