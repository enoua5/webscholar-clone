import { Tabs } from 'antd';
import styled from 'styled-components';
import { Header } from '../elements/Header';
import AwardsForm from '../forms/AwardsForm';
import { useAppSelector } from '../../hooks';
import AboutYouForm from '../forms/AboutYouForm';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import AcademicHistoryForm from '../forms/AcademicHistoryForm';
import ExtracurricularActivityForm from '../forms/ExtracurricularActivityForm';
import { userAcademicInfo, userAwardsInfo, userExtracurricularInfo, userPersonalInfo } from '../../state/reducers/userSlice';

export default function ApplicantProfilePage() {
  const _userPersonalInfoNotComplete = useAppSelector(userPersonalInfo) === undefined;
  const _userAcademicInfoNotComplete = useAppSelector(userAcademicInfo) === undefined;
  const _userExtracurricularInfoNotComplete = useAppSelector(userExtracurricularInfo) === undefined;
  const _userAwardsInfoNotComplete = useAppSelector(userAwardsInfo) === undefined;

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
          disabled: _userPersonalInfoNotComplete,
        },
        { 
          label: "Extracurricular Activities",
          key: "extracurricular",
          children: <ExtracurricularActivityForm />,
          disabled: _userAcademicInfoNotComplete
        },
        { 
          label: "Awards and Accomplishments",
          key: "awards",
          children: <AwardsForm />,
          disabled: _userExtracurricularInfoNotComplete
        },
        { 
          label: "About You",
          key: "about",
          children: <AboutYouForm />,
          disabled: _userAwardsInfoNotComplete
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