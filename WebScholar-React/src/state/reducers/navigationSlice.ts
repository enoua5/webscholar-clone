import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface navigationState {
  menu: string,
  submenu: string,
  popoutOpen: boolean
}

const initialState: navigationState = {
  menu: "Home",
  submenu: "",
  popoutOpen: false
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers:{
    setDefaultNavigation: state => {
      state.menu = "",
      state.submenu = "",
      state.popoutOpen = false
    },
    setNavigationState: (state, action: PayloadAction<navigationState>) => {
      const {menu, submenu, popoutOpen} = action.payload; 
      Object.assign(state, {menu, submenu, popoutOpen}) // assign state

      // This does the same thing
      // state.menu = menu;
      // state.submenu = submenu;
      // state.popoutOpen = popoutOpen;
    }
  }
});


export const { setDefaultNavigation, setNavigationState } = navigationSlice.actions;
export const navigationState = (state: RootState) => state.navigation;
export default navigationSlice.reducer;