import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const TRA_API_KEY = import.meta.env.VITE_TRA_API_KEY;

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
