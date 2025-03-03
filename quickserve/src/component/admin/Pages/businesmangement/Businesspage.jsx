import React, { useState } from "react";
import { Search, CheckCircle, XCircle, Pencil } from "lucide-react";
import { useNavigate } from "react-router";

const businessesData = [
  { id: 1, name: "Tech Solutions", owner: "Alice Johnson", contact: "123-456-7890", address: "123 Tech Street", status: "Pending", date: "2024-02-20" },
  { id: 2, name: "Green Energy Ltd", owner: "Bob Smith", contact: "987-654-3210", address: "45 Solar Avenue", status: "Approved", date: "2024-01-15" },
  { id: 3, name: "Eco Cleaning Services", owner: "Charlie Brown", contact: "555-666-7777", address: "78 Eco Lane", status: "Rejected", date: "2023-12-10" }
];

const Businesspage = () => {
  const [businesses, setBusinesses] = useState(businessesData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const navigate=useNavigate();

  const handleStatusChange = (id, newStatus) => {
    setBusinesses(
      businesses.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };
  const viewdetailed=(id)=>{
    navigate("/admin/details/" + id);
  };
  const filteredBusinesses = businesses.filter((b) => {
    return (
      (filter === "All" || b.status === filter) &&
      b.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6 bg-gray-100 dark:bg-[#1f253b]  min-h-screen text-black dark:text-gray-300">

      <div className="mb-4 flex gap-4">
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-3 text-gray-800 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search businesses..."
            className="pl-10 p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="p-2 dark:bg-gray-800 bg-white dark:text-white rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <table className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead className=" bg-gray-300 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th className="p-3 text-left">Business Name</th>
            <th className="p-3 text-left">Owner</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBusinesses.map((b) => (
            <tr key={b.id} className="border-b border-gray-300 dark:border-gray-700">
              <td className="p-3">{b.name}</td>
              <td className="p-3">{b.owner}</td>
              <td className="p-3">{b.contact}</td>
              <td className="p-3">{b.address}</td>
              <td className={`p-3 font-bold ${b.status === "Approved" ? "text-green-400" : b.status === "Rejected" ? "text-red-400" : "text-yellow-400"}`}>{b.status}</td>
              <td className="p-3">{b.date}</td>
              <td className="p-3 flex gap-2">
                {b.status === "Pending" && (
                  <>
                    <button className="bg-green-600 p-2 rounded text-white" onClick={() => handleStatusChange(b.id, "Approved")}>
                      <CheckCircle size={20} />
                    </button>
                    <button className="bg-red-600 p-2 rounded text-white" onClick={() => handleStatusChange(b.id, "Rejected")}>
                      <XCircle size={20} />
                    </button>
                  </>
                )}
                <button className="bg-blue-600 p-2 rounded text-white"  onClick={() => viewdetailed(b.id)}>
                  <Pencil size={20} />
                 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Businesspage;


