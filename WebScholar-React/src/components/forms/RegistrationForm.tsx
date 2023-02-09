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

  return <>
  <FormContainer>
    <Section>
      <Label>Create an account</Label>
        <Row>
          <StyledInput 
            placeholder="First name"
            value={user.firstName}
            onChange={e => setUser({...user, firstName: e.target.value})}
          />
          <StyledInput 
            placeholder="Last name"
            value={user.lastName}
            onChange={e => setUser({...user, lastName: e.target.value})}
          />
        </Row>
        <StyledInput 
            placeholder="Email address"
            value={user.email}
            onChange={e => setUser({...user, email: e.target.value})}
          />
          <StyledInput
            type='password'
            placeholder="Create password"
            value={user.password}
            onChange={e => setUser({...user, password: e.target.value})}
          />
          <Radio.Group onChange={e => setUser({...user, role: e.target.value})} value={user.role}>
            <Radio value={"student"}>Student</Radio>
            <Radio value={"staff"}>Staff</Radio>
          </Radio.Group>
          <ColoredButton
            onClick={(e: any) => console.log("Register")}
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
  height: 300px;
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