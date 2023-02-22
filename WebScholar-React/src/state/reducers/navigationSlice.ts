import { parseStyle } from '@ant-design/cssinjs/lib/hooks/useStyleRegister';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface navigationState {
  menu: string,
  submenu: string,
  popoutOpen: boolean,
  profileDropdownOpen: boolean,
}

const initialState: navigationState = {
  menu: "Home",
  submenu: "",
  popoutOpen: false,
  profileDropdownOpen: false,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers:{
    setDefaultNavigation: state => {
      state.menu = "",
      state.submenu = "",
      state.popoutOpen = false,
      state.profileDropdownOpen = false
    },
    setNavigationState: (state, action: PayloadAction<navigationState>) => {
      const {menu, submenu, popoutOpen, profileDropdownOpen} = action.payload; 
      Object.assign(state, {menu, submenu, popoutOpen, profileDropdownOpen})
      // This does the same thing
      // state.menu = menu;
      // state.submenu = submenu;
      // state.popoutOpen = popoutOpen;
    },
    setNavPopout: (state, action: PayloadAction<any>) => {
      const { open } = action.payload;
      state.popoutOpen = open;
    },
    setProfileDropdown: (state, action: PayloadAction<any>) => {
      const { open } = action.payload;
      state.profileDropdownOpen = open;
    }
  }
});


export const { setDefaultNavigation, setNavigationState, setNavPopout, setProfileDropdown } = navigationSlice.actions;
export const navigationState = (state: RootState) => state.navigation;
export const selectedMenuItem = (state: RootState) => state.navigation.menu;
export const selectedSubMenuItem = (state: RootState) => state.navigation.submenu;
export const navPopoutOpen = (state: RootState) => state.navigation.popoutOpen;
export const profileDropdownOpen = (state: RootState) => state.navigation.profileDropdownOpen;
export default navigationSlice.reducer;