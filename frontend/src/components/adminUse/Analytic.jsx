import React from "react";

export default function Analytics() {
  // Dummy stats
  const stats = {
    totalUsers: 120,
    activeLeads: 45,
    customers: 60,
    prospects: 15,
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">CRM Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <p className="text-gray-600">Total Users</p>
          <h3 className="text-2xl font-bold text-blue-700">
            {stats.totalUsers}
          </h3>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
          <p className="text-gray-600">Active Leads</p>
          <h3 className="text-2xl font-bold text-yellow-700">
            {stats.activeLeads}
          </h3>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm">
          <p className="text-gray-600">Customers</p>
          <h3 className="text-2xl font-bold text-green-700">
            {stats.customers}
          </h3>
        </div>
        <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
          <p className="text-gray-600">Prospects</p>
          <h3 className="text-2xl font-bold text-indigo-700">
            {stats.prospects}
          </h3>
        </div>
      </div>
    </div>
  );
}
