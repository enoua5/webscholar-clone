import { Button, Input } from 'antd';
import { useState } from 'react';
import { Lock, User } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleLogin(username: string, password: string){
    //call API to validate user
    if(username === "test@test.com" && password === "Password123!"){
      navigate('/home');
    } else {
      setError(true);
    }
  }

  return <>
  <FormContainer>
    <Section>
      <Label>Log in</Label>
        <StyledInput 
          prefix={<User style={{height: "18px"}}/>}
          placeholder="Email address"
          value={username}
          status={error ? 'error' : ''}
          onChange={e => {setError(false); setUsername(e.target.value)}}
        />
        <StyledInputPassword 
          prefix={<Lock style={{height: "18px"}}/>}
          placeholder="Password"
          value={password}
          status={error ? 'error' : ''}
          onChange={e => {setError(false); setPassword(e.target.value)}}
        />
        <ButtonPanel>
          <ColoredButton
            onClick={e => handleLogin(username, password)}
          >
            Log in
          </ColoredButton>
          <ForgotPassButton 
            type="link"
            onClick={e => navigate("/account-recovery")}
          >
            Forgot your password?
          </ForgotPassButton>
        </ButtonPanel>
        {error && <Error>{"Username or Password incorrect"}</Error>}
      </Section>
      <Section>
        <Label>New to WebScholar?</Label>
        <ColoredButton
          onClick={e => navigate("/register")}
        >
          Register Now
        </ColoredButton>
      </Section>
    </FormContainer>
  </>
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 325px;
  width: 450px;
  border-radius: 3px;
  border: 1px solid #d9d9d9;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 25px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

const Label = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: black;
  width: 100%;
  text-align: left;
`;

const StyledInput = styled(Input)`
  border-radius: 3px;
  width: 80%;
`;

const StyledInputPassword = styled(Input.Password)`
  border-radius: 3px;
  width: 80%;
`;

const ButtonPanel = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
`;

const ColoredButton = styled(Button)`
  border-radius: 3px;
  width: 150px;
  background-color: #2C9EB5;
  border: 1px solid #2C9EB5;
  color: white;
  &:hover{
    color: white !important;
    background-color: #2c9eb5c7;
    border-color: #2c9eb5c7 !important;
  }
`;

const ForgotPassButton = styled(Button)`
  color: #2C9EB5;
  padding: 4px 0px;
  &:hover{
    color: #27abc6c5 !important;
  }
`;

const Error = styled.div`
  margin-bottom: -15px;
  color: red;
  font-size: 12px;
`;