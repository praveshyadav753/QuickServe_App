import React from 'react';

function OnboardRequests({ requests, onAccept }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Onboard Service Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{request.name}</p>
                <p className="text-sm text-gray-500">{request.service}</p>
              </div>
              <button
                onClick={() => onAccept(request.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Accept
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OnboardRequests;