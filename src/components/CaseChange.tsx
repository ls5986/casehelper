import React, { useState } from 'react';
import apiService from '../services/apiService';

interface CaseChangeProps {
  onSuccess: (newCaseNumber: string) => void;
  onCancel: () => void;
}

const CaseChange: React.FC<CaseChangeProps> = ({ onSuccess, onCancel }) => {
  const [newCaseNumber, setNewCaseNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const isValid = await apiService.validateCaseNumber(newCaseNumber);
      if (isValid) {
        onSuccess(newCaseNumber);
      } else {
        setError('Invalid case number. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while validating the case number.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Change Case Number</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="caseNumber" className="block text-sm font-medium text-gray-700 mb-1">
              New Case Number
            </label>
            <input
              type="text"
              id="caseNumber"
              value={newCaseNumber}
              onChange={(e) => setNewCaseNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter new case number"
              required
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Validating...' : 'Change Case'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseChange; 