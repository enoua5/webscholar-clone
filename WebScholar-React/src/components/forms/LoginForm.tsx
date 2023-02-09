import { Button, Input } from 'antd'
import { useState } from 'react'
import { Lock, User } from 'react-feather'
import styled from 'styled-components'

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return <>
  <FormContainer>
    <FormTitle>Welcome back</FormTitle>
      <StyledInput 
        addonBefore={<User />}
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <StyledInput 
        addonBefore={<Lock />}
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <ForgotPassButton 
        type="link"
        onClick={e => console.log("forgot password")}
      >
        Forgot your password?
      </ForgotPassButton>
      <SignInButton
        onClick={e => console.log("sign in")}
      >
        Sign in
      </SignInButton>
    </FormContainer>
  </>
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  height: 500px;
  width: 450px;
  border-radius: 50px;
  border: 1px solid #d9d9d9;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 25px;
`;

const FormTitle = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: #ad3636;
  /* color: white; */
  /* background: linear-gradient(to right, #581111, #ad3636, #f06868); */
  width: 100%;
  text-align: center;
`;

const StyledInput = styled(Input)`
  border-radius: 5px;
  width: 80%;
  margin: 10px;
`;

const SignInButton = styled(Button)`
  border-radius: 5px;
  width: 50%;
  &:hover{
    color: #ad3636 !important;
    border-color: #ad3636 !important;
  }
`;

const ForgotPassButton = styled(Button)`
  color: #ad3636;
  &:hover{
    color: #ad3636bc !important;
  }
`;