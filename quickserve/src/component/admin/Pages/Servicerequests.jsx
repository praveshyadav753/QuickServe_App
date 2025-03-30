// import React, { useState } from "react";
// import { CheckCircle, XCircle, Pencil, Search } from "lucide-react";

// const serviceRequestsData = [
//   { business_id: 1, customer: "John Doe", service: "Plumbing Repair", business: "", status: "Pending", date: "2024-02-25" },
//   { business_id: 2, customer: "Jane Smith", service: "House Cleaning", business: "Eco Cleaners", status: "In Progress", date: "2024-02-20" },
//   { business_id: 3, customer: "Alice Brown", service: "Electrician", business: "", status: "Pending", date: "2024-02-18" }
// ];

// const approvedBusinesses = ["Eco Cleaners", "Fix It Fast", "Reliable Plumbers"];

// const ServiceRequests = () => {
//   const [requests, setRequests] = useState(serviceRequestsData);
//   const [search, setSearch] = useState("");

//   const handleAssignBusiness = (business_id, business) => {
//     setRequests(
//       requests.map((r) => (r.business_id === business_id ? { ...r, business, status: "In Progress" } : r))
//     );
//   };

//   const handleStatusChange = (business_id, newStatus) => {
//     setRequests(
//       requests.map((r) => (r.business_id === business_id ? { ...r, status: newStatus } : r))
//     );
//   };

//   const filteredRequests = requests.filter((r) =>
//     r.customer.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-navy-900 min-h-screen text-gray-300">
//       <div className="mb-4 flex gap-4">
//         <div className="relative w-1/3">
//           <Search className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search service requests..."
//             className="pl-10 p-2 bg-gray-800 text-white rounded w-full"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>
//       <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
//         <thead className="bg-gray-700 text-gray-200">
//           <tr>
//             <th className="p-3 text-left">Customer</th>
//             <th className="p-3 text-left">Service</th>
//             <th className="p-3 text-left">Assigned Business</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Date</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRequests.map((r) => (
//             <tr key={r.business_id} className="border-b border-gray-700">
//               <td className="p-3">{r.customer}</td>
//               <td className="p-3">{r.service}</td>
//               <td className="p-3">
//                 {r.business ? (
//                   r.business
//                 ) : (
//                   <select
//                     className="p-2 bg-gray-800 text-white rounded"
//                     onChange={(e) => handleAssignBusiness(r.business_id, e.target.value)}
//                   >
//                     <option value="">Assign Business</option>
//                     {approvedBusinesses.map((b) => (
//                       <option key={b} value={b}>{b}</option>
//                     ))}
//                   </select>
//                 )}
//               </td>
//               <td className={`p-3 font-bold ${r.status === "Completed" ? "text-green-400" : r.status === "In Progress" ? "text-yellow-400" : "text-red-400"}`}>{r.status}</td>
//               <td className="p-3">{r.date}</td>
//               <td className="p-3 flex gap-2">
//                 {r.status !== "Completed" && (
//                   <button
//                     className="bg-green-600 p-2 rounded text-white"
//                     onClick={() => handleStatusChange(r.business_id, "Completed")}
//                   >
//                     <CheckCircle size={20} />
//                   </button>
//                 )}
//                 <button className="bg-blue-600 p-2 rounded text-white">
//                   <Pencil size={20} />
//                 </button>
//                 <button
//                   className="bg-red-600 p-2 rounded text-white"
//                   onClick={() => handleStatusChange(r.business_id, "Cancelled")}
//                 >
//                   <XCircle size={20} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Pencil } from "lucide-react";
import useApi from "../../../apihook";
import usePostApi from "../../../usePostApi";

const ServiceRequests = () => {
  const { postData, loading: postLoading, isError, error } = usePostApi();

  const { loading, data } = useApi("/adminpanel/service-requests/");
  const [requests, setRequests] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (data) {
      setRequests(data);
    }
  }, [data]);

  // Function to update status via API
  const handleStatusChange = async (business_id, newStatus) => {
    const response = await postData("/adminpanel/service-requests/", { business_id, status: newStatus });

    if (response) {
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.business_id === business_id ? { ...req, status: newStatus } : req
        )
      );
    }
  };

  return (
    <>
    {postLoading  && 
      <div className="flex justify-center items-center z-50  absolute left-110  h-screen ">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
      </div> 
    }
<div className={`p-6 bg-gray-100 ${postLoading ? "opacity-30" : "opacity-100"} dark:bg-[#1f253b] min-h-screen text-gray-300`}>
<h2 className="text-2xl mb-4">Business Requests</h2>

      {/* Shimmer Loading Effect */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-700 h-12 w-full rounded-md"></div>
          ))}
        </div>
      ) : (
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Business</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.business_id} className="border-b border-gray-700">
                <td className="p-3">{req.business_id}</td>
                <td className="p-3">{req.business_name}</td>
                <td className="p-3">{req.created_at}</td>
                <td
                  className={`p-3 font-bold ${
                    req.status === "Approved"
                      ? "text-green-400"
                      : req.status === "Rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {req.status}
                </td>
                <td className="p-3 flex gap-2">
                  {req.status.toLowerCase() === "pending" && (
                    <>
                      <button
                        className="bg-green-600 p-2 rounded text-white"
                        onClick={() => handleStatusChange(req.business_id, "Approved")}
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        className="bg-red-600 p-2 rounded text-white"
                        onClick={() => handleStatusChange(req.business_id, "Rejected")}
                      >
                        <XCircle size={20} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default ServiceRequests;
