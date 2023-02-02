import React from 'react'
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import AccountRecovery from '../../pages/accountRecoveryPage';
import Footer from '../footer';

function Main() {

  let menu: React.ReactElement[] = [
    <Route key='/forgotPassword' path='/forgotPassword' element={<AccountRecovery />} />,
    <Route key='/' path='/' element={<>HOME PAGE</>} />
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
  height: calc(100vh - 65px);
  width: 100%;
  min-width: 1000px;
  position: relative;
  overflow: auto;
  background-color: #f0f2f5;
`