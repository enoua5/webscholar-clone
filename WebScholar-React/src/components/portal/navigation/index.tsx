import React, { useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { navigationState, setNavigationState } from '../../../state/reducers/navigationSlice';
import NavButton from './navButton'

function Navigation() {
  const selectedTab = useAppSelector(state => state.navigation.menu);
  const dispatch = useAppDispatch();

  const handleClick = (menu: string, submenu: string, popoutOpen: boolean) => {
    dispatch(setNavigationState({
      menu: menu, 
      submenu: submenu, 
      popoutOpen: popoutOpen
    }))
  };

  return (
    <NavigationBar>
      <Section>
        <LogoButton>WebScholar</LogoButton>
        <NavButton label="Home" selected={selectedTab === "Home"} handleClick={handleClick}/>
        <NavButton label="About" selected={selectedTab === "About"} handleClick={handleClick}/>
        <NavButton label="Help" selected={selectedTab === "Help"} handleClick={handleClick}/>
      </Section>
      <Section>
        <NavButton label="Login" selected={selectedTab === "Login"} handleClick={handleClick}/>
        <NavButton label="Register" selected={selectedTab === "Register"} handleClick={handleClick}/>
      </Section>
    </NavigationBar>
  )
}

export default Navigation

const NavigationBar = styled.div`
  display: flex;
  height: 65px;
  justify-content: space-between;
  padding: 0 50px;
  width: auto;
  min-width: 900px;
  margin-bottom: 3px;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,0.25);
`;

const Section = styled.div`
  display: flex;
  gap: 25px;
`;

const LogoButton = styled.div`
  cursor: pointer;
  font-size: 22px;
  font-weight: 600;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  color: #711212;
  &:hover{
    color: #ad3636;
  }
`;