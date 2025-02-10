import React from "react";
const  StatsComponent = ({ title, value, children }) => {
  return (
    <div className="bg-white dark:bg-gray-600 dark:text-white shadow-lg rounded-2xl p-4 flex items-center space-x-4">
      <div className="p-3 bg-purple-100 rounded-full">{children}</div>
      <div>
        <h3 className="text-lg font-semibold ">{title}</h3>
        <p className="text-xl font-bold text-purple-600">{value}</p>
      </div>
    </div>
  );
};

export default StatsComponent;