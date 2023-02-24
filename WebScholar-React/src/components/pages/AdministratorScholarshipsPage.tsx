import { Tabs } from 'antd';
import styled from 'styled-components';
import { Header } from '../elements/Header';
import { userState } from '../../state/reducers/userSlice';
import { useAppSelector } from '../../hooks';
import CreateScholashipForm from '../forms/CreateScholarshipForm'


export default function AdministratorHomePage() {
    const user = useAppSelector(userState);
    return <>
        <Header>Scholarships</Header>

        <StyledTabs
            tabPosition='left'
            items={[
                {
                    label: "Active Scholarships",
                    key: "activeScholarship",
                    // children: <CreateScholashipForm />,
                    disabled: false
                },
                {
                    label: "Create A Scholarship",
                    key: "createScholarship",
                    children: <CreateScholashipForm />,
                    disabled: false
                },
                {
                    label: "Edit Scholarship",
                    key: "editScholarship",
                    // children: <CreateScholashipForm />,
                    disabled: false
                },
                {
                    label: "Remove Scholarship",
                    key: "removeScholarship",
                    // children: <CreateScholashipForm />,
                    disabled: false
                },

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