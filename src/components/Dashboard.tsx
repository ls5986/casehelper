import React from 'react';

interface DashboardProps {
  caseData: {
    caseNumber: string;
    clientName: string;
    status: string;
    address: string;
    email: string;
    phone: string;
  };
  onRequestDocuments: () => void;
  onCaseChange: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ caseData, onRequestDocuments, onCaseChange }) => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">Case #{caseData.caseNumber}</h1>
            <button
              onClick={onCaseChange}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Change Case
            </button>
          </div>
          <h2 className="text-xl text-gray-600">{caseData.clientName}</h2>
        </div>
        <div className="bg-yellow-50 px-4 py-1 rounded-full">
          <span className="text-yellow-800">Status: {caseData.status}</span>
        </div>
      </div>

      {/* Case Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Address:</span>
            <span className="font-medium">{caseData.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Email:</span>
            <span className="font-medium">{caseData.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Phone:</span>
            <span className="font-medium">{caseData.phone}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onRequestDocuments}
            className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
          >
            <span className="text-2xl">📥</span>
            <span>Request Documents</span>
          </button>
          <button className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2">
            <span className="text-2xl">📝</span>
            <span>Update Case Notes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 