import React from 'react';
import { Avatar } from 'antd';
import NavButton from './NavButton';
import NavPopout from './NavPopout';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import WebScholarLogo from '../../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { userState } from '../../../state/reducers/userSlice';
import { navPopoutOpen, setNavigationState } from '../../../state/reducers/navigationSlice';
import ProfileButton from '../../elements/ProfileButton';
import ProfileDropdown from './ProfileDropdown';

function NavigationBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const _navPopoutOpen = useAppSelector(navPopoutOpen);
  const user = useAppSelector(userState);

  const handleClick = (menu: string, submenu: string, popoutOpen: boolean) => {
    dispatch(setNavigationState({
      menu: menu,
      submenu: submenu,
      popoutOpen: popoutOpen,
      profileDropdownOpen: false
    }))
  };

  let NavButtons: React.ReactElement[] = [
    <NavButton
      key="Home"
      label="Home"
      type="underline"
      onClick={() => {
        handleClick("Home", "", false);
        navigate("/");
      }}
    />,
  ];

  let noActiveUserNavigation: React.ReactElement[] = [
    <NavButton
      key="About"
      label="About"
      type="underline"
      onClick={() => {
        handleClick("About", "", false);
        navigate("/about");
      }}
    />
  ];

  let studentNavigation: React.ReactElement[] = [
    <NavButton
      key="Profile"
      label="Profile"
      type="underline"
      onClick={() => {
        handleClick("Profile", "", false);
        navigate("/profile")
      }}
    />,
    <NavButton
      key="Scholarships"
      label="Scholarships"
      type="underline"
      onClick={() => {
        handleClick("Scholarships", "", !_navPopoutOpen);
      }}
    />
  ];

  let administratorNavigation: React.ReactElement[] = [
    <NavButton
      key="Review"
      label="Review"
      type="underline"
      onClick={() => {
        handleClick("Review", "", false);
        navigate("/dummy");
      }}
    />,

    <NavButton
      key="scholarshipsAdministrator"
      label="Scholarships"
      type="underline"
      onClick={() => {
        handleClick("Scholarships", "", false);
        navigate("/scholarshipsAdministrator");
      }}
    />
  ];

  const Login_Register_Buttons: React.ReactElement[] = [
    <NavButton
      key="Log in"
      label="Log in"
      type="underline"
      onClick={() => {
        handleClick("Log in", "", false);
        navigate("/login");
      }}
    />,
    <NavButton
      key="Get Started"
      label="Get Started"
      type="box"
      onClick={() => {
        handleClick("Get Started", "", false);
        navigate("/register");
      }}
    />
  ];

  const Profile_Buttons: React.ReactElement[] = [
    <ProfileButton key="profile button" />,
    <ProfileDropdown key="profile dropdown" />
  ]

  if (user.email === "") {
    noActiveUserNavigation.forEach(button => NavButtons.push(button));
  }

  if (user.role === 'student') {
    studentNavigation.forEach(button => NavButtons.push(button));
  }

  if (user.role === 'administrator') {
    administratorNavigation.forEach(button => NavButtons.push(button));
  }

  return (
    <>
      <NavigationBarContainer id="navbarContainer">
        <Section>
          <Avatar src={WebScholarLogo} style={{ height: "65px", width: "65px" }} />
          <WebScholarButton onClick={() => navigate("/")}>WebScholar</WebScholarButton>
          {NavButtons}
        </Section>
        <Section>
          {user.active ? Profile_Buttons : Login_Register_Buttons}
        </Section>
      </NavigationBarContainer>

      <NavPopout />
    </>
  )
}

export default NavigationBar

const NavigationBarContainer = styled.div`
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