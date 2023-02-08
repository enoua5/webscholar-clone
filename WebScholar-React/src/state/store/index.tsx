import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import navigationReducer from '../reducers/navigationSlice';

export const store =  configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {user: userState}
export type AppDispatch = typeof store.dispatch

