import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const TPS_API_KEY = process.env.NEXT_PUBLIC_TPS_API_KEY;
export const crmAPI = createApi({
    reducerPath: 'crmApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tps.logiqs.com/publicapi/2020-02-22' }),
    endpoints: (builder) => ({
        getCaseData: builder.mutation({
            query: (caseId: string) => ({
                url: `/cases/caseinfo`,
                method: 'GET',
                params: {
                    apikey: TPS_API_KEY,
                    CaseID: caseId,
                }
            })
        }),
    }),
})

export const { useGetCaseDataMutation } = crmAPI
