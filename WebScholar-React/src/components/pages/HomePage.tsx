import React from 'react'
import { useAppSelector } from '../../hooks'
import { userState } from '../../state/reducers/userSlice'
import { PageContainer } from '../elements/PageContainer'

export default function HomePage() {
  const user = useAppSelector(userState);

  return <>
    <PageContainer>
      <div>Welcome back, {user.firstName}</div>
    </PageContainer>
  </>
}
