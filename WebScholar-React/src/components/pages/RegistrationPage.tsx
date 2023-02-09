import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { setNavigationState } from '../../state/reducers/navigationSlice';
import RegistrationForm from '../forms/RegistrationForm';

export default function RegistrationPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNavigationState({
      menu: "Register", 
      submenu: "", 
      popoutOpen: false
    }))
  }, [])

  return (
    <PageContainer>
      <RegistrationForm />
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  align-self: center;
  height: 85%;
  min-height: 500px;
  width: 75%;
  min-width: 1000px;
  background-color: white;
`;