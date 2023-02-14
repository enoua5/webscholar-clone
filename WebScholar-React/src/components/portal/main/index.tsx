import React from 'react'
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import AccountRecovery from '../../pages/AccountRecoveryPage';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';
import ProgressPage from '../../pages/progressPage';
import Footer from '../footer';

function Main() {

  let menu: React.ReactElement[] = [
    <Route key='/' path='/' element={<HomePage />} />,
    <Route key='/login' path="/login" element={<LoginPage />} />,
    <Route key='/register' path="/register" element={<RegistrationPage />} />,
    <Route key='/account-recovery' path='/account-recovery' element={<AccountRecovery />} />,
    <Route key='/progress-page' path='/progress-page' element={<ProgressPage/>} />,
  ];

  return (
    <MainContainer>
      <Routes>
       {menu}
      </Routes>
      <Footer />
    </MainContainer>
  );
}

export default Main

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 65px);
  width: 100%;
  min-width: 1000px;
  position: relative;
  overflow: auto;
  background-color: #f3f3f3;
`;