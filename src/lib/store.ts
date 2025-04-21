import { configureStore } from '@reduxjs/toolkit'
import { crmAPI } from './feature/api/crmApi'
import { traAPI } from './feature/api/traApi'

export const store = configureStore({
    reducer: {
        [crmAPI.reducerPath]: crmAPI.reducer,
        [traAPI.reducerPath]: traAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(crmAPI.middleware)
    .concat(traAPI.middleware),
        
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
