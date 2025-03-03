import React from "react";
import { LayoutDashboard, Building, ClipboardCheck, ListTree, Users, FileBarChart, Settings } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS,CategoryScale , LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement,CategoryScale, PointElement, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
  const visitorData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Visitors",
        data: [120, 200, 300, 400, 500, 600, 700],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1f253b] p-6">
      {/* Header */}
      

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Businesses" count={120} icon={<Building size={32} />} color="bg-blue-100 " />
        <DashboardCard title="Pending Approvals" count={15} icon={<ClipboardCheck size={32} />} color="bg-yellow-100" />
        <DashboardCard title="Total Categories" count={10} icon={<ListTree size={32} />} color="bg-green-100" />
        <DashboardCard title="Total Users" count={500} icon={<Users size={32} />} color="bg-purple-100" />
        <DashboardCard title="Reports Generated" count={45} icon={<FileBarChart size={32} />} color="bg-red-100" />
      </div>

      {/* Visitors Graph */}
      <div className="mt-8 p-6 bg-white dark:bg-[#343c58] rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-4">Visitor Analytics</h2>
        <Line data={visitorData} />
      </div>

      {/* Recent Activities */}
      <div className="mt-8 p-6 bg-white dark:bg-[#343c58] rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Recent Activities</h2>
        <ul className="divide-y divide-gray-200 dark:text-gray-200" >
          <li className="py-2">✅ Business "QuickFix Services" was approved.</li>
          <li className="py-2">⚠️ "EcoClean" pending approval.</li>
          <li className="py-2">📊 Monthly report generated for February.</li>
        </ul>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count, icon, color }) => {
  return (
    <div className={`flex items-center space-x-4 p-6 ${color} rounded-lg shadow-md transition transform hover:scale-105 duration-300`}>
      <div className="text-blue-600">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
};

export default Dashboard;
