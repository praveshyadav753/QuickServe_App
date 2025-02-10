import React, { useState } from "react";



const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, service: "Haircut", category: "Grooming", subcategory: "Men's Haircut", status: "Pending", expectedTime: "" },
    { id: 2, service: "Car Repair", category: "Automobile", subcategory: "Engine Service", status: "Pending", expectedTime: "" },
  ]);

  const acceptAppointment = (id, time) => {
    setAppointments(appointments.map(app => app.id === id ? { ...app, status: "Accepted", expectedTime: time } : app));
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50 mb-4">Appointment Requests</h2>
      <ul className="space-y-4">
        {appointments.map((app) => (
          <li key={app.id} className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow flex flex-col space-y-2">
            <p><strong>Service:</strong> {app.service}</p>
            <p><strong>Category:</strong> {app.category}</p>
            <p><strong>Subcategory:</strong> {app.subcategory}</p>
            <p><strong>Status:</strong> <span className={`font-bold ${app.status === "Pending" ? "text-red-500" : "text-green-500"}`}>{app.status}</span></p>
            {app.status === "Pending" && (
              <button 
                onClick={() => acceptAppointment(app.id, "30 mins")}
                className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Accept & Allocate Time
              </button>
            )}
            {app.expectedTime && <p><strong>Expected Time:</strong> {app.expectedTime}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentDashboard