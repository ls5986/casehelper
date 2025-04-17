import React, { useState } from 'react';

interface CaseNumberEntryProps {
  onSubmit: (caseNumber: string) => void;
  isLoading: boolean;
  error: string | null;
}

const CaseNumberEntry: React.FC<CaseNumberEntryProps> = ({ onSubmit, isLoading, error }) => {
  const [caseNumber, setCaseNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (caseNumber.trim()) {
      onSubmit(caseNumber.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Case Helper
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="caseNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Case Number
            </label>
            <input
              id="caseNumber"
              type="text"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              placeholder="e.g., 1013481"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!caseNumber.trim() || isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaseNumberEntry; 