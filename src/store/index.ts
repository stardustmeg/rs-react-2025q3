import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from '@/store/slices/countriesSlice';
import formReducer from '@/store/slices/formSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  reducer: {
    countries: countriesReducer,
    form: formReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
