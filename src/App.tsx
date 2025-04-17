import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import DocumentRequest from './components/DocumentRequest';
import CaseNumberEntry from './components/CaseNumberEntry';
import apiService from './services/apiService';

interface TPSCaseData {
  CaseID: number;
  FirstName: string;
  LastName: string;
  StatusID: number;
  StatusName: string;
  SaleDate: string;
  CellPhone: string;
  HomePhone: string;
  WorkPhone: string;
  Email: string;
  City: string;
  State: string;
  Zip: string;
  Address: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'caseEntry' | 'dashboard' | 'documentRequest'>('caseEntry');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseData, setCaseData] = useState<TPSCaseData | null>(null);

  const handleCaseNumberSubmit = async (caseNumber: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getCaseData(caseNumber);
      setCaseData(data);
      setCurrentPage('dashboard');
    } catch (err) {
      setError('Failed to load case data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (currentPage === 'caseEntry') {
    return (
      <div className="w-[800px] min-h-screen bg-gray-50">
        <CaseNumberEntry 
          onSubmit={handleCaseNumberSubmit}
          isLoading={isLoading}
          error={error}
        />
      </div>
    );
  }

  return (
    <div className="w-[800px] min-h-screen bg-gray-50">
      {currentPage === 'dashboard' && caseData ? (
        <Dashboard 
          caseData={{
            caseNumber: caseData.CaseID.toString(),
            clientName: `${caseData.FirstName} ${caseData.LastName}`,
            status: caseData.StatusName,
            address: `${caseData.Address}, ${caseData.City}, ${caseData.State} ${caseData.Zip}`,
            email: caseData.Email,
            phone: caseData.CellPhone || caseData.HomePhone || caseData.WorkPhone
          }}
          onRequestDocuments={() => setCurrentPage('documentRequest')}
          onCaseChange={() => setCurrentPage('caseEntry')}
        />
      ) : (
        <DocumentRequest 
          onBack={() => setCurrentPage('dashboard')}
          caseId={caseData?.CaseID.toString() || ''}
        />
      )}
    </div>
  );
}

export default App; 