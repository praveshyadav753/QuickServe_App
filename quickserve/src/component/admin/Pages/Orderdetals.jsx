import React, { useState } from "react";
import { Search } from "lucide-react";
import { useParams } from "react-router-dom";

const initialOrders = [
  {
    orderId: "ORD12345",
    customerId: "CUST001",
    customerName: "John Doe",
    service: "Car Repair",
    date: "2025-03-05",
    amount: "$120",
    status: "Completed",
    paymentStatus: "Paid",
    transactionId: "TXN56789",
  },
  {
    orderId: "ORD12346",
    customerId: "CUST002",
    customerName: "Jane Smith",
    service: "Home Cleaning",
    date: "2025-03-06",
    amount: "$80",
    status: "Pending",
    paymentStatus: "Unpaid",
    transactionId: "TXN67890",
  },
];

const OrderDetailsPage = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const [searchQuery, setSearchQuery] = useState("");

  // Find the specific order based on the orderId
  const order = initialOrders.find((order) => order.orderId === orderId);

  // Filter orders for search functionality (if displaying a list)
  const filteredOrders = initialOrders.filter((order) =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen space-y-6 bg-gray-100 text-gray-900 dark:bg-[#1a1d2b] dark:text-gray-200">
      <h3 className="text-xl font-semibold">Order Details Management</h3>

      {/* Search Bar (Optional: Only for list view) */}
      <div className="flex gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by Order ID"
            className="pl-8 p-2 border rounded-md dark:bg-[#252a3f] dark:border-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Order Details */}
      <div className="p-6 rounded-lg shadow-md bg-white dark:bg-[#252a3f]">
        {order ? (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Order ID: {order.orderId}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Customer ID</p>
                <p className="font-medium">{order.customerId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Customer Name</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Service</p>
                <p className="font-medium">{order.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                <p className="font-medium">{order.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                <p className="font-medium">{order.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
                <p
                  className={`font-semibold ${
                    order.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {order.paymentStatus}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Transaction ID</p>
                <p className="font-medium">{order.transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <p
                  className={`font-semibold ${
                    order.status === "Completed" ? "text-blue-500" : "text-yellow-500"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Order not found.</p>
        )}
      </div>

      {/* Optional: Display a list of filtered orders */}
      {!orderId && (
        <div className="p-6 rounded-lg shadow-md bg-white dark:bg-[#252a3f]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-300 dark:bg-[#2e334b]">
                <th className="p-2">Order ID</th>
                <th className="p-2">Customer ID</th>
                <th className="p-2">Customer Name</th>
                <th className="p-2">Service</th>
                <th className="p-2">Date</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Payment Status</th>
                <th className="p-2">Transaction ID</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId} className="text-center border-b">
                  <td className="p-2">{order.orderId}</td>
                  <td className="p-2">{order.customerId}</td>
                  <td className="p-2">{order.customerName}</td>
                  <td className="p-2">{order.service}</td>
                  <td className="p-2">{order.date}</td>
                  <td className="p-2">{order.amount}</td>
                  <td
                    className={`p-2 font-semibold ${
                      order.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </td>
                  <td className="p-2">{order.transactionId}</td>
                  <td
                    className={`p-2 font-semibold ${
                      order.status === "Completed" ? "text-blue-500" : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;