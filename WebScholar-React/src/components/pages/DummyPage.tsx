import React from 'react'
import Loading from '../elements/Loading'
import { PageContainer } from '../elements/PageContainer'

export default function DummyPage() {
  return <>
    <PageContainer>
      <h1>This is a test page.</h1>
      <Loading/>
    </PageContainer>
  </>
}
