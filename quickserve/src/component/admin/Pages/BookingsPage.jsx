import React, { useState } from "react";
import { Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialBookings = [
  { id: 1, orderId: "ORD12345", customer: "John Doe", service: "Car Repair", status: "Pending", date: "2025-03-05" },
  { id: 2, orderId: "ORD12346", customer: "Jane Smith", service: "Home Cleaning", status: "Confirmed", date: "2025-03-06" },
  { id: 3, orderId: "ORD12347", customer: "Mike Johnson", service: "Plumbing", status: "Completed", date: "2025-03-07" }
];

const BookingsPage = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  const handleNavigate = (orderId) => {
    navigate(`/admin/orderdetail/${orderId}`);
  };

  const filteredBookings = bookings.filter((booking) =>
    (statusFilter === "All" || booking.status === statusFilter) &&
    booking.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen space-y-6 bg-gray-100 text-gray-900 dark:bg-[#1a1d2b] dark:text-gray-200">
      <h3 className="text-xl font-semibold">Manage Customer Bookings</h3>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded border dark:border-gray-600 dark:bg-[#252a3f] dark:text-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 rounded border dark:border-gray-600 dark:bg-[#252a3f] dark:text-white"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="p-6 rounded-lg shadow-md bg-white dark:bg-[#252a3f]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-300 dark:bg-[#2e334b]">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Service</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="text-center border-b dark:border-gray-700">
                <td className="p-2">{booking.orderId}</td>
                <td className="p-2">{booking.customer}</td>
                <td className="p-2">{booking.service}</td>
                <td className="p-2">{booking.date}</td>
                <td
                  className={`p-2 font-semibold ${
                    booking.status === "Pending"
                      ? "text-yellow-500"
                      : booking.status === "Confirmed"
                      ? "text-green-500"
                      : booking.status === "Completed"
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {booking.status}
                </td>
                <td className="p-2 flex justify-center">
                  <button
                    className="bg-gray-500 p-2 rounded text-white hover:bg-gray-600 transition-colors"
                    onClick={() => handleNavigate(booking.orderId)}
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsPage;
