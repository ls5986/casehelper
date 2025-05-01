import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import envConfig from '../../../config/env.config'
export const crmAPI = createApi({
    reducerPath: 'crmApi',
    baseQuery: fetchBaseQuery({ baseUrl: envConfig.CRM_API_URL }),
    endpoints: (builder) => ({
        getCaseData: builder.mutation({
            query: (caseId: string) => ({
                url: `/cases/caseinfo`,
                method: 'GET',
                params: {
                    apikey: envConfig.CRM_API_KEY,
                    CaseID: caseId,
                }
            })
        }),
    }),
})

export const { useGetCaseDataMutation } = crmAPI
