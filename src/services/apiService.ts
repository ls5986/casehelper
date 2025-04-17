import axios from 'axios';

const TPS_API_URL = 'https://tps.logiqs.com/publicapi/2020-02-22';
const TPS_API_KEY = '4917fa0ce4694529a9b97ead1a60c932';

const TRA_API_URL = 'https://tra-doc-scan.btdemo.biz';
const authCredentials = {
  email: 'admin@mailinator.com',
  password: 'Admin@123'
};

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

interface DocumentRequest {
  caseNumber: string;
  email?: string;
  phone?: string;
  deliveryMethod: 'email' | 'text' | 'both';
  documents: string[];
}

interface DocumentResponse {
  id: string;
  otpRequired: boolean;
}

let authToken: string | null = null;

const apiService = {
  // Authenticate with TRA API
  authenticate: async () => {
    try {
      const response = await axios.post(`${TRA_API_URL}/auth/signin`, authCredentials);
      authToken = response.data.access_token;
      // Set default authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  },

  // Fetch case data from TPS API
  getCaseData: async (caseId: string): Promise<TPSCaseData> => {
    try {
      const response = await axios.get(`${TPS_API_URL}/cases/caseinfo`, {
        params: {
          apikey: TPS_API_KEY,
          CaseID: caseId
        }
      });
      
      if (response.data.status === 'success') {
        return response.data.data;
      } else {
        throw new Error('Failed to fetch case data');
      }
    } catch (error) {
      console.error('Error fetching case data:', error);
      throw error;
    }
  },

  // Request documents through TRA API
  requestDocuments: async (request: DocumentRequest): Promise<DocumentResponse> => {
    try {
      // Ensure we're authenticated
      if (!authToken) {
        await apiService.authenticate();
      }

      // Create document request
      const response = await axios.post(`${TRA_API_URL}/api/document`, {
        caseId: request.caseNumber,
        email: request.email,
        phone: request.phone,
        linkLimitation: request.deliveryMethod === 'both' ? 'multi' : 'single',
        requireDocList: request.documents.map(doc => ({
          docName: doc
        }))
      });

      return {
        id: response.data.id,
        otpRequired: response.data.otpRequired
      };
    } catch (error) {
      console.error('Error requesting documents:', error);
      throw error;
    }
  },

  // Verify OTP for document request
  verifyDocumentOTP: async (documentId: string, otp: string): Promise<void> => {
    try {
      if (!authToken) {
        await apiService.authenticate();
      }

      await axios.post(`${TRA_API_URL}/api/document/${documentId}/verify`, {
        otp
      });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },

  // Validate case number with TPS API
  validateCaseNumber: async (caseNumber: string): Promise<boolean> => {
    try {
      const response = await axios.get(`${TPS_API_URL}/cases/caseinfo`, {
        params: {
          apikey: TPS_API_KEY,
          CaseID: caseNumber
        }
      });
      return response.data.status === 'success';
    } catch (error) {
      return false;
    }
  }
};

export default apiService; 