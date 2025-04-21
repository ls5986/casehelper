import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { RequiredDoc, useSendScanRequestMutation } from '../lib/feature/api/traApi';

interface DocumentRequestProps {
  onBack: () => void;
  caseId: string;
  caseData: {
    email: string;
    phone: string;
  }
}

const DocumentRequest: React.FC<DocumentRequestProps> = ({ onBack, caseId, caseData }) => {
  const [email, setEmail] = useState(caseData.email || '');
  const [phone, setPhone] = useState(caseData.phone || '');
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'text' | 'both'>('email');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDocReqSend, setIsDocReqSend] = useState(false);

  const [sendScanRequest, { isLoading: isSending }] = useSendScanRequestMutation();



  const documentOptions = [
    'Tax Returns',
    'W-2 Forms',
    'Bank Statements',
    'Pay Stubs',
    'ID Verification',
    'Power of Attorney',
    'Financial Statement',
    'Other Documents'
  ];


  const handleSubmit = async () => {
    setError('');
    try {
      const documentListFormatted: RequiredDoc[] = selectedDocuments.map(doc => ({
        docName: doc
      }));
      const formattedPhone = phone.replace(/[^0-9]/g, '');
      const payload = {
        caseId,
        email: (deliveryMethod === 'text') ? '' : 'trushar.narodia@bytestechnolab.com',
        phone: (deliveryMethod === 'email') ? '' : formattedPhone,
        linkLimitation: 'single',
        requireDocList: documentListFormatted
      }
      const response = await sendScanRequest(payload).unwrap();
      if (response && response.statusCode === 200) {
        setIsDocReqSend(true);
      } else {
        setError(response.message || 'Failed to send document request');
        setIsDocReqSend(false);
      }

    } catch (err) {
      setError('Failed to submit document request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDocument = (doc: string) => {
    setSelectedDocuments(prev =>
      prev.includes(doc)
        ? prev.filter(d => d !== doc)
        : [...prev, doc]
    );
  };



  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 mr-4"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">Request Documents</h1>
      </div>


      {
        (isDocReqSend) ?
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Request Submitted Successfully!</h2>
              <p className="text-green-700 mb-4">The document request has been sent.</p>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Return to Dashboard
              </button>
            </div>
          </div> :
          <form className="space-y-6" action='#' method='POST'>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Method
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="email"
                    checked={deliveryMethod === 'email'}
                    onChange={(e) => setDeliveryMethod(e.target.value as 'email')}
                    className="mr-2"
                  />
                  Email
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="text"
                    checked={deliveryMethod === 'text'}
                    onChange={(e) => setDeliveryMethod(e.target.value as 'text')}
                    className="mr-2"
                  />
                  Text Message
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="both"
                    checked={deliveryMethod === 'both'}
                    onChange={(e) => setDeliveryMethod(e.target.value as 'both')}
                    className="mr-2"
                  />
                  Both
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Documents
              </label>
              <div className="grid grid-cols-2 gap-3">
                {documentOptions.map((doc, index: number) => (
                  <label key={index} className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc)}
                      onChange={() => toggleDocument(doc)}
                      className="mr-3"
                    />
                    {doc}
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={isLoading || selectedDocuments.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Sending Request...' : 'Send Request'}
              </button>
            </div>
          </form>
      }
    </div>
  );
};

export default DocumentRequest; 