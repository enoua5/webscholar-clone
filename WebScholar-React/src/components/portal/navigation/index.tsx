import { Avatar } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { navPopoutOpen, setNavigationState } from '../../../state/reducers/navigationSlice';
import NavButton from './navButton';
import NavPopout from './navPopout';
import WebScholarLogo from '../../../assets/logo.png';

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
        <Avatar src={WebScholarLogo} style={{height: "65px", width: "65px"}}/>
        <WebScholarButton onClick={() => navigate("/")}>WebScholar</WebScholarButton>
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
      </Section>
      <Section>
      
        <NavButton 
          label="Log in"
          type="box" 
          handleClick={() => {
            handleClick("Log in", "", false);
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
  position: sticky;
  top: 0;
  width: auto;
  display: flex;
  height: 65px;
  justify-content: space-between;
  padding: 0 30px;
  min-width: 900px;
  box-shadow: 0px 6px 10px #b9b9b9;
  z-index: 1;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const WebScholarButton = styled.div`
  cursor: pointer;
  font-size: 22px;
  font-weight: 200;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  color: black;
  &:hover{
    color: #2C9EB5;
  }
`;