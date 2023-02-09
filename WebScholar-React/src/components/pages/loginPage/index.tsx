import React from 'react';
import styled from 'styled-components';
import LoginForm from '../../forms/LoginForm';

export default function LoginPage() {
  return <>
    <PageContainer>
      <LoginForm />
    </PageContainer>
  </>
}

const PageContainer = styled.div`
  
`;