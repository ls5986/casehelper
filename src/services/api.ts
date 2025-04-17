import axios from 'axios';

const API_BASE_URL = 'https://tra-doc-scan.btdemo.biz';

interface AuthResponse {
  token: string;
}

export interface RequiredDoc {
  docName: string;
}

export interface ScanRequest {
  caseId: string;
  email: string;
  phone: string;
  linkLimitation: 'single' | 'multi';
  requireDocList: RequiredDoc[];
}

export const COMMON_TAX_DOCUMENTS = [
  'Tax Return Form',
  'W-2 Form',
  '1099 Forms',
  'Business Income Statement',
  'Balance Sheet',
  'Bank Statements',
  'Expense Receipts',
  'Investment Statements',
  'Property Tax Documents',
  'Previous Year Returns',
  'Charitable Donation Receipts',
  'Mortgage Interest Statements'
];

class ApiService {
  private token: string | null = null;

  async authenticate(email: string = 'admin@mailinator.com', password: string = 'Admin@123'): Promise<void> {
    try {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signin`, {
        email,
        password,
      });
      this.token = response.data.token;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }

  async scanDocument(request: ScanRequest): Promise<any> {
    if (!this.token) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/document/send-scan-request`,
        request,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Document scan failed:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }
}

export const apiService = new ApiService(); 