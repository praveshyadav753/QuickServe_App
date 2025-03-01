import React from 'react';

function BusinessStats({ businesses }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Business Statistics</h2>
      <p className="text-lg">Total Businesses Registered: <span className="font-bold">{businesses.length}</span></p>
    </div>
  );
}

export default BusinessStats;