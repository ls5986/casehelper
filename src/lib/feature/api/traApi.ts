import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const TRA_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsaW5hdG9yLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NTIzNjk2NCwiZXhwIjoxNzQ1MzIzMzY0fQ.x5ZRxBVjx4xtXCnm7tD-ZKVo-SRlOEwWrs0Q11ltkc0';

export interface RequiredDoc {
    docName: string;
}

export interface ScanRequest {
    caseId: string;
    email: string;
    phone: string;
    linkLimitation: string; // 'single' or 'multi'
    requireDocList: RequiredDoc[];
}

export const traAPI = createApi({
    reducerPath: 'traApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://tra-doc-scan.btdemo.biz',
        headers: {
            'Authorization': `Bearer ${TRA_API_KEY}`
        }
    }),
    endpoints: (builder) => ({
        sendScanRequest: builder.mutation({
            query: (body: ScanRequest) => ({
                url: `/document/send-scan-request`,
                method: 'POST',
                body: body
            })
        }),
    }),
})

export const { useSendScanRequestMutation } = traAPI
