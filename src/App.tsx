import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import DocumentRequest from './components/DocumentRequest';
import CaseNumberEntry from './components/CaseNumberEntry';
import apiService from './services/apiService';
import { useGetCaseDataMutation } from './lib/feature/api/crmApi';

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
  const [error, setError] = useState<string | null>(null);
  const [caseData, setCaseData] = useState<TPSCaseData | null>(null);
  const [getCaseData, { isLoading, isError }] = useGetCaseDataMutation();
  const handleCaseNumberSubmit = async (caseNumber: string) => {
    setError(null);
    
    try {
      const data = await getCaseData(caseNumber).unwrap();
      if (data && data.status === 'success') {
        setCaseData(data.data);
        setCurrentPage('dashboard');  
      }
    } catch (err) {
      setError('Failed to load case data. Please try again.');
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
  } else if (currentPage === 'dashboard' && caseData) {
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
        ) : null}
      </div>
    );
  } else if (currentPage === 'documentRequest') {
    return (
      <div className="w-[800px] min-h-screen bg-gray-50">
        <DocumentRequest
          onBack={() => setCurrentPage('dashboard')}
          caseId={caseData?.CaseID.toString() || ''}
          caseData={{ email: caseData?.Email || '', phone: caseData?.CellPhone || caseData?.HomePhone || caseData?.WorkPhone || '' }} 
        />
      </div>
    );
  } else {
    return (
      <div className="w-[800px] min-h-screen bg-gray-50">
        <h1 className="text-center text-2xl font-bold">Welcome to the Case Management System</h1>
        <p className="text-center text-gray-600">Please enter a case number to get started.</p>
        <CaseNumberEntry
          onSubmit={handleCaseNumberSubmit}
          isLoading={isLoading}
          error={error}
        />
      </div>
    );
  }




}

export default App; 