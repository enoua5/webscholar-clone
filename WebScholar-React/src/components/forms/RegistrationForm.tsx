import React, { useState } from 'react';
import { Button, Input, Radio } from 'antd';
import styled from 'styled-components';

export default function RegistrationForm() {

  interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
  }

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student"
  })

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleUserChange(property: string, value: string){
    setError(false);
    setUser({...user, [property]: value})
  }

  function checkPassword(password: string){
    var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regularExpression.test(password);
  }

  //this kind of validation should probably happen on the api
  const register = (user: User) => {
    setError(false)
    setErrorText("")
    if(user.firstName === ""){
      setError(true);
      setErrorText("Please provide your first name");
      return;
    } else if (user.lastName === ""){
      setError(true);
      setErrorText("Please provide your last name");
      return;
    } else if(user.email === "" || !['.com', '.org', '.edu', '.net'].some(domain => user.email.includes(domain))){
      setError(true);
      setErrorText("Please provide a valid email address");
      return;
    } else if(!checkPassword(user.password)){
      setError(true);
      setErrorText("Password must be at least eight characters, contain one uppercase letter, one lowercase letter, one number and one special character");
      return;
    } else if(confirmPassword !== user.password) {
      setError(true);
      setErrorText("Passwords must match")
    } else {
      setError(false)
      // call the API to create a new user
      console.log("Registered :", user)
    }

   
  }

  return <>
  <FormContainer>
    <Section>
      <Label>Create an account</Label>
      <Row>
        <Section>
          {(error && errorText.includes("first")) && <Error>{errorText}</Error>}
          <StyledInput 
            placeholder="First name"
            value={user.firstName}
            status={error && errorText.includes('first name') ? 'error' : ''}
            onChange={e => handleUserChange("firstName", e.target.value)}
          />
        </Section>
        <Section>
          {(error && errorText.includes("last name")) && <Error>{errorText}</Error>}
          <StyledInput 
            placeholder="Last name"
            value={user.lastName}
            status={error && errorText.includes('last name') ? 'error' : ''}
            onChange={e => handleUserChange("lastName", e.target.value)}
            />
        </Section>
      </Row>
      <Section>
        {(error && errorText.includes("email")) && <Error>{errorText}</Error>}
        <StyledInput 
          placeholder="Email address"
          value={user.email}
          status={error && errorText.includes('email address') ? 'error' : ''}
          onChange={e => handleUserChange("email", e.target.value)}
          />
        </Section>
      <Section>
        {(error && errorText.includes("special")) && <Error>{errorText}</Error>}
        <StyledInputPassword
          type='password'
          placeholder="Create password"
          value={user.password}
          status={error && errorText.includes('Password') ? 'error' : ''}
          onChange={e => handleUserChange("password", e.target.value)}
          />
      </Section>
      <Section>
        {(error && errorText.includes("match")) && <Error>{errorText}</Error>}
        <StyledInputPassword
          type='password'
          placeholder="Confirm password"
          value={confirmPassword}
          status={error && errorText.includes('match') ? 'error' : confirmPassword !== user.password ? 'warning' :  ''}
          onChange={e => {setError(false); setConfirmPassword(e.target.value)}}
        />
        </Section>
      <Radio.Group onChange={e => handleUserChange("role", e.target.value)} value={user.role}>
        <Radio value={"student"}>Student</Radio>
        <Radio value={"staff"}>Staff</Radio>
      </Radio.Group>
        <ColoredButton
          onClick={e => register(user)}
        >
          Register
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

const Row = styled.div`
  display: flex;
  gap: 0;
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
  width: 100%;
`;

const StyledInputPassword = styled(Input.Password)`
  border-radius: 3px;
  width: 100%;
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

const Error = styled.div`
  margin: -15px 0px;
  color: red;
  /* background-color: #fd83838d; */
  font-size: 12px;
`;