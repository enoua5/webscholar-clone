import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks';
import { setNavigationState } from '../../state/reducers/navigationSlice';
import { PageContainer } from '../elements/PageContainer';
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