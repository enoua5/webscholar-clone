import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface userState {
  firstName: string,
  lastName: string,
  email: string,
  role: "student" | "administrator" | "committee" | "",
  active: boolean
}

const initialState: userState = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  active: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    setDefaultUser: state => {
      state.firstName = "",
      state.lastName = "",
      state.email = "",
      state.role = "",
      state.active = false
    },
    setUserState: (state, action: PayloadAction<userState>) => {
      const {firstName, lastName, email, role, active} = action.payload;
      Object.assign(state, {firstName, lastName, email, role, active})
    }
  }
});


export const { setDefaultUser, setUserState } = userSlice.actions;
export const userState = (state: RootState) => state.user;
export default userSlice.reducer;