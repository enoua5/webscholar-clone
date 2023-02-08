import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { navPopoutOpen, setNavigationState } from '../../../state/reducers/navigationSlice';
import NavButton from './navButton';
import NavPopout from './navPopout';

function Navigation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const _navPopoutOpen = useAppSelector(navPopoutOpen);

  const handleClick = (menu: string, submenu: string, popoutOpen: boolean) => {
    dispatch(setNavigationState({
      menu: menu, 
      submenu: submenu, 
      popoutOpen: popoutOpen
    }))
  };

  return (
  <>
    <NavigationBar>
      <Section>
        <LogoButton onClick={() => navigate("/")}>WebScholar</LogoButton>
        <NavButton 
          label="Home"
          type="box"
          handleClick={() => {
            handleClick("Home", "", false);
            navigate("/");
          }}
        />
        <NavButton 
          label="About"
          type="box"
          handleClick={() => {
            handleClick("About", "", false);
            navigate("/about");
          }}
        />
        <NavButton 
          label="Help"
          type="box" 
          handleClick={() => {
            handleClick("Help", "", !_navPopoutOpen);
            navigate("/help");
          }}
        />
      </Section>
      <Section>
      
        <NavButton 
          label="Login"
          type="box" 
          handleClick={() => {
            handleClick("Login", "", false);
            navigate("/login");
          }}
        />
        <NavButton 
          label="Start for free"
          type="round" 
          handleClick={() => {
            handleClick("Start for free", "", false);
            navigate("/register");
          }}
        />
      </Section>
    </NavigationBar>

    {_navPopoutOpen && <NavPopout />}
  </>
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
  box-shadow: 0px 6px 50px rgb(220 220 220);
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