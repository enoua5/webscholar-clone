import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks';
import { setNavigationState } from '../../state/reducers/navigationSlice';
import { PageContainer } from '../elements/PageContainer';
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