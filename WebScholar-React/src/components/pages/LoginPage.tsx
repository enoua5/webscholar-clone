import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { setNavigationState } from '../../state/reducers/navigationSlice';
import LoginForm from '../forms/LoginForm';

export default function LoginPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNavigationState({
      menu: "Log in",
      submenu: "",
      popoutOpen: false
    }))
  })

  return <>
    <PageContainer>
      <LoginForm />
    </PageContainer>
  </>
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  align-self: center;
  height: 85%;
  min-height: 550px;
  width: 75%;
  min-width: 1000px;
  background-color: white;
`;