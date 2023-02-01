import React, { useEffect } from 'react'
import { useAppSelector } from '../../../hooks'
import { userState } from '../../../state/reducers/userSlice'

function AccountRecovery() {
  
  const user = useAppSelector(userState)

  return (
    <div>{user.role.toUpperCase()} Account Recovery for {user.name.toUpperCase()}</div>
  )
}

export default AccountRecovery