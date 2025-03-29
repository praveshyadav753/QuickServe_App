import React, { useState, useEffect } from "react";
import { Search, CheckCircle, XCircle, Pencil } from "lucide-react";
import { useNavigate } from "react-router";
import useApi from "../../../../apihook";

const ShimmerRow = () => (
  <tr className="animate-pulse">
    {[...Array(7)].map((_, index) => (
      <td key={index} className="px-3 py-6">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

const Businesspage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [businesses, setBusinesses] = useState([]);

  const { loading, data } = useApi("/adminpanel/manage/business/");
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.businesses) {
      setBusinesses(data.businesses);
    }
  }, [data]);

  const handleStatusChange = (id, newStatus) => {
    setBusinesses((prevBusinesses) =>
      prevBusinesses.map((b) =>
        b.business_id === id ? { ...b, status: newStatus } : b
      )
    );
  };

  const viewDetailed = (id) => {
    navigate(`/admin/details/${id}`);
  };

  const filteredBusinesses = businesses.filter(
    (b) =>
      (filter === "All" || b.status === filter) &&
      b.business_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 dark:bg-[#1f253b] min-h-screen text-black dark:text-gray-300">
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
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <table className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-300 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th className="p-3 text-left">Id</th>
            <th className="p-3 text-left">Business Name</th>
            <th className="p-3 text-left">Owner</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(6)].map((_, index) => <ShimmerRow key={index} />)
          ) : filteredBusinesses.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-3 text-center">
                No businesses found.
              </td>
            </tr>
          ) : (
            filteredBusinesses.map((b) => (
              <tr key={b.business_id} className="border-b border-gray-300 dark:border-gray-700">
                <td className="p-3">{b.business_id}</td>
                <td className="p-3">{b.business_name}</td>
                <td className="p-3">{b.user__first_name}</td>
                <td className="p-3">{b.contact_info}</td>
                <td className="p-3">{b.address}</td>
                <td
                  className={`p-3 font-bold ${
                    b.status === "Approved"
                      ? "text-green-400"
                      : b.status === "Rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {b.status}
                </td>
                <td className="p-3 flex gap-2">
                  {b.status === "Pending" && (
                    <>
                      <button
                        className="bg-green-600 p-2 rounded text-white"
                        onClick={() => handleStatusChange(b.business_id, "Approved")}
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        className="bg-red-600 p-2 rounded text-white"
                        onClick={() => handleStatusChange(b.business_id, "Rejected")}
                      >
                        <XCircle size={20} />
                      </button>
                    </>
                  )}
                  <button
                    className="bg-blue-600 p-2 rounded text-white"
                    onClick={() => viewDetailed(b.business_id)}
                  >
                    <Pencil size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Businesspage;
