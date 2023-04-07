import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import navigationReducer from '../reducers/navigationSlice';
import scholarshipReducer from '../reducers/scholarshipSlice';

export const store =  configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    scholarships: scholarshipReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {user: userState}
export type AppDispatch = typeof store.dispatch

