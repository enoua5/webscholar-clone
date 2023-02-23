import React from 'react'
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import AboutPage from '../../pages/AboutPage';
import AccountRecoveryPage from '../../pages/AccountRecoveryPage';
import WelcomePage from '../../pages/WelcomePage';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';
import ProgressPage from '../../pages/ProgressPage';
import Footer from '../footer';
import HomePage from '../../pages/HomePage';
import { useAppSelector } from '../../../hooks';
import { userState } from '../../../state/reducers/userSlice';
import DummyPage from '../../pages/DummyPage';
import ApplicantProfilePage from '../../pages/ApplicantProfilePage';

function Main() {
  const user = useAppSelector(userState);

  // default paths available to anyone
  let menu: React.ReactElement[] = [
    <Route key='/' path='/' element={user.email !== "" ? <HomePage /> : <WelcomePage />} />,
    <Route key='/login' path="/login" element={<LoginPage />} />,
  ];

  // paths available to users who are not logged in
  const noActiveUserMenu: React.ReactElement[] = [
    <Route key='/register' path="/register" element={<RegistrationPage />} />,
    <Route key='/about' path="/about" element={<AboutPage />} />,
  ]

  // paths available to logged/active users
  const activeUserMenu: React.ReactElement[] = [
    <Route key='/account-recovery' path='/account-recovery' element={<AccountRecoveryPage />} />,
    <Route key='/account-settings' path='/account-settings' element={user.role === 'student' ? <></> : <></>} />,
  ]

  // paths available to Student users
  const studentMenu: React.ReactElement[] = [
    <Route key='/scholarships' path='/dummy' element={<DummyPage />} />,
    <Route key='/profile' path='/profile' element={<ApplicantProfilePage />} />,
    <Route key='/progress' path='/progress' element={<ProgressPage />} />,
  ];

  // paths available to Administrator users
  const administratorMenu: React.ReactElement[] = [
    <Route key='/review-applicants' path="/dummy" element={<DummyPage />} />,
  ]

  // add routes based on active user
  if(user.email === ""){
    noActiveUserMenu.forEach(route => menu.push(route));
  } else {
    activeUserMenu.forEach(route => menu.push(route));
  }

  // add student roles if student
  if(user?.role === 'student'){
    studentMenu.forEach(route => menu.push(route));
  }

  // add administrator paths if administrator
  if(user?.role === 'staff'){
    administratorMenu.forEach(route => menu.push(route));
  }

  return (
    <MainContainer>
      <Routes>
       {menu}
      </Routes>
      <Footer/>
    </MainContainer>
  );
}

export default Main

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 138px);
  width: 94%;
  min-width: 1000px;
  position: absolute;
  top: 65px;
  left: 0;
  overflow: auto;
  background-color: #f3f3f3;
  padding: 3%;
`;