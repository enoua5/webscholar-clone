import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks'
import { userState } from '../../state/reducers/userSlice'

export default function AccountRecoveryPage() {
  
  const [email, setEmail] = useState("");

  const sendEmail = () => {
    console.log("Email sent to reset password");
  }

  return <>
    <div>Account Recovery</div>
    <div>Please enter your email :</div>
    <Input 
      value={email} 
      onChange={e => setEmail(e.target.value)}
      placeholder="Email address"
    />
    <Button
      onChange={e => sendEmail()}
    > Send Email</Button>
  </>
}