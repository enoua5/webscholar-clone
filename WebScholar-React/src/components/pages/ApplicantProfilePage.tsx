import { Tabs } from 'antd';
import styled from 'styled-components';
import { Header } from '../elements/Header';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import AcademicHistoryForm from '../forms/AcademicHistoryForm';
import ExtracurricularActivityForm from '../forms/ExtracurricularActivityForm';
import AwardsForm from '../forms/AwardsForm';
import AboutYouForm from '../forms/AboutYouForm';

export default function ApplicantProfilePage() {
  return <>
  <Header style={{paddingBottom: "20px", marginTop: "-20px"}}>Application Profile</Header>
    <StyledTabs
      tabPosition='left'
      items={[
        { 
          label: "Personal Information",
          key: "personal",
          children: <PersonalInfoForm />,
          disabled: false
        },
        { 
          label: "Academic History",
          key: "academic",
          children: <AcademicHistoryForm />,
          disabled: false
        },
        { 
          label: "Extracurricular Activities",
          key: "extracurricular",
          children: <ExtracurricularActivityForm />,
          disabled: false
        },
        { 
          label: "Awards and Accomplishments",
          key: "awards",
          children: <AwardsForm />,
          disabled: false
        },
        { 
          label: "About You",
          key: "about",
          children: <AboutYouForm />,
          disabled: false
        }
      ]}
    >
      
    </StyledTabs>
  </>
}

const StyledTabs = styled(Tabs)`
  height: fit-content;

  .ant-tabs-nav {
    background-color: white;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    height: 100%;
  }
  .ant-tabs-content-holder {
    border-left: none;
  }
`;