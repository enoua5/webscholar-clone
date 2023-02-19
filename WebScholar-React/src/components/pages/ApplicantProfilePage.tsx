import { Space, Tabs } from 'antd'
import styled from 'styled-components'
import { Header } from '../elements/Header'

export default function ApplicantProfilePage() {
  return <>
  <Header>Application Profile</Header>
    <Spacer />
    <Tabs
      tabPosition='left'
      items={[
        { 
          label: "Personal Information",
          key: "personal",
          children: <></>
        },
        { 
          label: "Academic History",
          key: "academic",
          children: <></>
        },
        { 
          label: "Extracurricular Activities",
          key: "extracurricular",
          children: <></>
        },
        { 
          label: "Awards and Accomplishments",
          key: "awards",
          children: <></>
        },
        { 
          label: "About You",
          key: "about",
          children: <></>
        }
      ]}
    />
  </>
}


const Spacer = styled.div`
  height: 50px;
`;