import React from 'react';
import { Avatar } from 'antd';
import NavButton from './navButton';
import NavPopout from './navPopout';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import WebScholarLogo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setDefaultUser, userState } from '../../../state/reducers/userSlice';
import { navPopoutOpen, setNavigationState } from '../../../state/reducers/navigationSlice';

function Navigation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const _navPopoutOpen = useAppSelector(navPopoutOpen);
  const user = useAppSelector(userState);

  const handleClick = (menu: string, submenu: string, popoutOpen: boolean) => {
    dispatch(setNavigationState({
      menu: menu, 
      submenu: submenu, 
      popoutOpen: popoutOpen
    }))
  };

  let NavButtons: React.ReactElement[] = [
    <NavButton
      key="Home"
      label="Home"
      type="underline"
      onClick={() => {
        handleClick("Home", "", !_navPopoutOpen);
        navigate("/");
      }}
    />,
    <NavButton
      key="About"
      label="About"
      type="underline"
      onClick={() => {
        handleClick("About", "", !_navPopoutOpen);
        navigate("/about");
      }}
    />
  ];

  let studentNavigation: React.ReactElement[] = [
    <NavButton
      key="Scholarships" 
      label="Scholarships"
      type="underline"
      onClick={() => {
        handleClick("Scholarships", "", !_navPopoutOpen);
        navigate("/dummy");
      }}
    />
  ];

  let staffNavigation: React.ReactElement[] = [
    <NavButton
      key="Review" 
      label="Review"
      type="underline"
      onClick={() => {
        handleClick("Review", "", !_navPopoutOpen);
        navigate("/dummy");
      }}
    />
  ];

  const LoginRegisterButtons: React.ReactElement[] = [
    <NavButton
      key="Log in" 
      label="Log in"
      type="underline" 
      onClick={() => {
        handleClick("Log in", "", !_navPopoutOpen);
        navigate("/login");
      }}
    />,
    <NavButton
      key="Start for free"
      label="Start for free"
      type="box" 
      onClick={() => {
        handleClick("Start for free", "", !_navPopoutOpen);
        navigate("/register");
      }}
    />
  ];

  const LogoutButton = 
    <NavButton 
      label="Logout"
      type="box" 
      onClick={() => {
        dispatch(setDefaultUser());
        navigate("/");
      }}
    />

  if(user.role === 'student'){
    studentNavigation.forEach(button => NavButtons.push(button))
  }

  if(user.role === 'staff'){
    staffNavigation.forEach(button => NavButtons.push(button))
  }

  return (
  <>
    <NavigationBar>
      <Section>
        <Avatar src={WebScholarLogo} style={{height: "65px", width: "65px"}}/>
        <WebScholarButton onClick={() => navigate("/")}>WebScholar</WebScholarButton>
        {NavButtons}
      </Section>
      <Section>
       {user.active ? LogoutButton : LoginRegisterButtons}
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
  background-color: white;
  z-index: 10;
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