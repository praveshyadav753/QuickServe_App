// import React, { useState } from "react";
// import { CheckCircle, XCircle, Pencil, Search } from "lucide-react";

// const serviceRequestsData = [
//   { id: 1, customer: "John Doe", service: "Plumbing Repair", business: "", status: "Pending", date: "2024-02-25" },
//   { id: 2, customer: "Jane Smith", service: "House Cleaning", business: "Eco Cleaners", status: "In Progress", date: "2024-02-20" },
//   { id: 3, customer: "Alice Brown", service: "Electrician", business: "", status: "Pending", date: "2024-02-18" }
// ];

// const approvedBusinesses = ["Eco Cleaners", "Fix It Fast", "Reliable Plumbers"];

// const ServiceRequests = () => {
//   const [requests, setRequests] = useState(serviceRequestsData);
//   const [search, setSearch] = useState("");

//   const handleAssignBusiness = (id, business) => {
//     setRequests(
//       requests.map((r) => (r.id === id ? { ...r, business, status: "In Progress" } : r))
//     );
//   };

//   const handleStatusChange = (id, newStatus) => {
//     setRequests(
//       requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
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
//             <tr key={r.id} className="border-b border-gray-700">
//               <td className="p-3">{r.customer}</td>
//               <td className="p-3">{r.service}</td>
//               <td className="p-3">
//                 {r.business ? (
//                   r.business
//                 ) : (
//                   <select
//                     className="p-2 bg-gray-800 text-white rounded"
//                     onChange={(e) => handleAssignBusiness(r.id, e.target.value)}
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
//                     onClick={() => handleStatusChange(r.id, "Completed")}
//                   >
//                     <CheckCircle size={20} />
//                   </button>
//                 )}
//                 <button className="bg-blue-600 p-2 rounded text-white">
//                   <Pencil size={20} />
//                 </button>
//                 <button
//                   className="bg-red-600 p-2 rounded text-white"
//                   onClick={() => handleStatusChange(r.id, "Cancelled")}
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
import React, { useState } from "react";
import { CheckCircle, XCircle, Pencil } from "lucide-react";
import useApi from "../../../apihook";
import { useEffect, } from "react";

const serviceRequestsData = [
  {
    id: 1,
    serviceName: "Web Development",
    businessName: "Tech Solutions",
    category: "IT Services",
    description: "Full-stack development for web applications.",
    status: "Pending",
    date: "2024-02-25",
  },
  {
    id: 2,
    serviceName: "Solar Panel Installation",
    businessName: "Green Energy Ltd",
    category: "Renewable Energy",
    description: "Professional installation of solar energy solutions.",
    status: "Approved",
    date: "2024-01-15",
  },
];

const ServiceRequests = () => {
  const [requests, setRequests] = useState(serviceRequestsData);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  const { loading, data } = useApi("/adminpanel/service-requests/");
 

  useEffect(() => {
    if (data) {
      setRequests(data);
    }
  }, [data]);

  const handleStatusChange = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const handleEditClick = (request) => {
    setEditing(request.id);
    setEditData(request);
  };

  const handleSaveEdit = () => {
    setRequests(
      requests.map((req) => (req.id === editData.id ? editData : req))
    );
    setEditing(null);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-[#1f253b] min-h-screen text-gray-300">
      <h2 className="text-2xl mb-4">Service Requests</h2>
      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700 text-gray-200">
          <tr>
            <th className="p-3 text-left"> Id</th>
            <th className="p-3 text-left">Business</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>

            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-b border-gray-700">
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
                {req.status === "pending" && (
                  <>
                    <button
                      className="bg-green-600 p-2 rounded text-white"
                      onClick={() => handleStatusChange(req.id, "Approved")}
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button
                      className="bg-red-600 p-2 rounded text-white"
                      onClick={() => handleStatusChange(req.id, "Rejected")}
                    >
                      <XCircle size={20} />
                    </button>
                  </>
                )}
                <button
                  className="bg-blue-600 p-2 rounded text-white"
                  onClick={() => handleEditClick(req)}
                >
                  <Pencil size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="mt-6 p-4 bg-gray-700 rounded">
          <h3 className="text-xl mb-4">Edit Business Request</h3>
          <input
            type="text"
            className="w-full p-2 mb-2 bg-gray-800 text-white rounded"
            value={editData.serviceName}
            onChange={(e) =>
              setEditData({ ...editData, serviceName: e.target.value })
            }
          />
          <input
            type="text"
            className="w-full p-2 mb-2 bg-gray-800 text-white rounded"
            value={editData.category}
            onChange={(e) =>
              setEditData({ ...editData, category: e.target.value })
            }
          />
          <textarea
            className="w-full p-2 mb-2 bg-gray-800 text-white rounded"
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
          <button
            className="bg-green-500 p-2 rounded text-white mr-2"
            onClick={handleSaveEdit}
          >
            Save
          </button>
          <button
            className="bg-gray-500 p-2 rounded text-white"
            onClick={() => setEditing(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};



export default ServiceRequests;


