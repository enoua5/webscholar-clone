import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface userState {
  name: string,
  role: string
}

const initialState: userState = {
  name: "Joe Shmoe",
  role: "student"
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    setDefault: state => {
      state.name = "",
      state.role = ""
    },
    setUserState: (state, action: PayloadAction<userState>) => {
      const {name, role} = action.payload;
      Object.assign(state, {name, role})
    }
  }
});


export const { setDefault, setUserState } = userSlice.actions;
export const userState = (state: RootState) => state.user;
export default userSlice.reducer;