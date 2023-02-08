import React from 'react'
import { Route, RouteObject, Routes } from 'react-router-dom';
import AccountRecovery from '../../pages/accountRecovery';
import ScholarshipStatusPage from '../../pages/scholarshipStatusPage';
import Footer from '../footer';
import "./index.less";

function Main() {

  let menu: React.ReactElement[] = [
    <Route key='/forgotPassword' path='/forgotPassword' element={<AccountRecovery />} />,
    <Route key='/scholarshipStatus' path='/scholarshipStatus' element={<ScholarshipStatusPage />} />,
    <Route key='/' path='/' element={<>HOME PAGE</>} />
  ];

  return (
    <div className="main_container" id="main_container">
      <Routes>
        {menu}
      </Routes>
      <Footer />
    </div>
  );
}

export default Main