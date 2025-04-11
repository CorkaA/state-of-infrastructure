import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { infrastructureApi } from '../api/infrastructureAPI';
import { infrastructureReducer } from '../features/infrastructureSlice';

export const store = configureStore({
  reducer: {
    infrastructure: infrastructureReducer,
    [infrastructureApi.reducerPath]: infrastructureApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(infrastructureApi.middleware),
});

setupListeners(store.dispatch);