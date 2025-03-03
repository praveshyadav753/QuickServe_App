import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, User, Building2, CheckCircle, Edit, Layers, ClipboardList, Users, Clock, Mail, Globe, Phone ,TrendingUp,XCircle } from "lucide-react";

const businessData = {
  id: 1,
  name: "Tech Solutions",
  owner: "Alice Johnson",
  contact: "123-456-7890",
  email: "contact@techsolutions.com",
  website: "www.techsolutions.com",
  address: "123 Tech Street",
  status: "Approved",
  dateRegistered: "2024-02-20",
  servicesRegistered: [
    { id: 101, name: "IT Support", category: "Technology", subcategory: "Software", acceptedBy: "Admin1", acceptedDate: "2024-02-27" },
    { id: 102, name: "Web Development", category: "Technology", subcategory: "Web Services", acceptedBy: "Admin2", acceptedDate: "2024-03-02" }
  ],
  serviceRequests: [
    { id: 301, name: "Cloud Hosting", category: "Technology", subcategory: "Cloud Services", price: "$50", status: "Pending" },
    { id: 302, name: "Cyber Security", category: "Technology", subcategory: "Security", price: "$70", status: "Pending" }
  ],

  customers: [
    { id: 401, name: "John Doe", service: "IT Support", bookedOn: "2024-02-28", status: "Completed", paymentStatus: "Paid" },
    { id: 402, name: "Jane Smith", service: "Web Development", bookedOn: "2024-03-03", status: "Pending", paymentStatus: "Unpaid" }
  ],
  adminLogs: [
    { id: 501, action: "Approved IT Support service", performedBy: "Admin1", date: "2024-02-27" },
    { id: 502, action: "Updated business contact details", performedBy: "Admin2", date: "2024-03-01" }
  ],
  performance: {
    totalServices: 5,
    completed: 3,
    pending: 2,
    rejected: 1
  }
  
  
};

const BusinessDetailPage = () => {
  const { id } = useParams();
  const [editableBusiness, setEditableBusiness] = useState(businessData);
  const [editMode, setEditMode] = useState(false);


  const handleAction = (id, action) => {
    setEditableBusiness(prevState => ({
      ...prevState,
      serviceRequests: prevState.serviceRequests.map(request =>
        request.id === id ? { ...request, status: action } : request
      )
    }));
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-[#1f253b] text-gray-800 dark:text-gray-200 space-y-6">
      <div className="dark:bg-[#252a3f] bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black dark:text-white">{editableBusiness.name}</h2>
          <button className="bg-blue-500 p-2 rounded text-white" onClick={() => setEditMode(!editMode)}>
            <Edit size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2"><User className="text-blue-400" /><p><span className="font-semibold">Owner:</span> {editableBusiness.owner}</p></div>
          <div className="flex items-center gap-2"><Building2 className="text-yellow-400" /><p><span className="font-semibold">Address:</span> {editableBusiness.address}</p></div>
          <div className="flex items-center gap-2"><Phone className="text-red-400" /><p><span className="font-semibold">Contact:</span> {editableBusiness.contact}</p></div>
          <div className="flex items-center gap-2"><Mail className="text-purple-400" /><p><span className="font-semibold">Email:</span> {editableBusiness.email}</p></div>
          <div className="flex items-center gap-2"><Globe className="text-green-400" /><p><span className="font-semibold">Website:</span> {editableBusiness.website}</p></div>
          <div className="flex items-center gap-2"><Calendar className="text-green-400" /><p><span className="font-semibold">Registered:</span> {editableBusiness.dateRegistered}</p></div>
        </div>
      </div> 
      <div className="bg-white dark:bg-[#252a3f] p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold dark:    text-black dark:text-white">Performance Metrics</h3>
          <p><TrendingUp className="inline text-blue-400" /> Total Services: {editableBusiness.performance.totalServices}</p>
          <p><CheckCircle className="inline text-green-400" /> Completed: {editableBusiness.performance.completed}</p>
          <p><Clock className="inline text-yellow-400" /> Pending: {editableBusiness.performance.pending}</p>
          <p><XCircle className="inline text-red-400" /> Rejected: {editableBusiness.performance.rejected}</p>
        </div>
      
      <div className="dark:bg-[#252a3f] bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2"><Layers /> Services Registered</h3>
        <table className="w-full text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Subcategory</th>
              <th className="p-3 text-left">Accepted By</th>
              <th className="p-3 text-left">Accepted Date</th>
            </tr>
          </thead>
          <tbody>
            {editableBusiness.servicesRegistered.map(service => (
              <tr key={service.id} className="border-b text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700">
                <td className="p-3">{service.name}</td>
                <td className="p-3">{service.category}</td>
                <td className="p-3">{service.subcategory}</td>
                <td className="p-3">{service.acceptedBy}</td>
                <td className="p-3">{service.acceptedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       
      <div className=" dark:bg-[#1a1d2b] bg-white text-gray-900  dark:text-gray-200 ">
      <div className="dark:bg-[#252a3f]  bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Layers /> Service Requests</h3>
        <table className="w-full text-gray-800 dark:text-gray-300">
          <thead className="dark:bg-gray-700 bg-gray-200 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Subcategory</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {editableBusiness.serviceRequests.map(request => (
              <tr key={request.id} className="border-b border-gray-300 dark:border-gray-700">
                <td className="p-3">{request.name}</td>
                <td className="p-3">{request.category}</td>
                <td className="p-3">{request.subcategory}</td>
                <td className="p-3">{request.price}</td>
                <td className={`p-3 ${request.status === "Accepted" ? "text-green-400" : request.status === "Rejected" ? "text-red-400" : "text-yellow-400"}`}>{request.status}</td>
                <td className="p-3">
                  {request.status === "Pending" && (
                    <>
                      <button className="bg-green-500 p-2 rounded text-white mr-2" onClick={() => handleAction(request.id, "Accepted")}>Accept</button>
                      <button className="bg-red-500 p-2 rounded text-white" onClick={() => handleAction(request.id, "Rejected")}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


      <div className="dark:bg-[#252a3f] bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2"><ClipboardList /> Customer Bookings</h3>
        <table className="w-full dark:text-gray-300">
          <thead className="dark:bg-gray-700 bg-gray-300 dark:text-gray-200 text-gray-800">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Booked On</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {editableBusiness.customers.map(customer => (
              <tr key={customer.id} className="border-b border-gray-300 dark:border-gray-700">
                <td className="p-3">{customer.name}</td>
                <td className="p-3">{customer.service}</td>
                <td className="p-3">{customer.bookedOn}</td>
                <td className={`p-3 ${customer.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>{customer.status}</td>
                <td className={`p-3 ${customer.paymentStatus === "Paid" ? "text-green-400" : "text-red-400"}`}>{customer.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessDetailPage;
