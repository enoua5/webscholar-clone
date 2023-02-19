import { Button } from 'antd';
import { LogOut, Settings } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { profileDropdownOpen } from '../../../state/reducers/navigationSlice';
import { setDefaultUser } from '../../../state/reducers/userSlice';

export default function ProfileDropdown() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const _profileDropdownOpen = useAppSelector(profileDropdownOpen);

  return <>
    <Triangle open={_profileDropdownOpen} />
    <Container open={_profileDropdownOpen}>
      <Layout>
        <LinkButton
          onClick={() => {
            navigate("/profile")
          }}
          >
          <Settings/>
          Account Settings
        </LinkButton>
        <LinkButton
          onClick={() => {
            dispatch(setDefaultUser());
            navigate("/");
          }}
        >
          <LogOut /> 
          Logout
        </LinkButton>
      </Layout>
    </Container>
    </>
}

const Triangle = styled.div<{open: boolean}>`
  position: absolute;
  top: 70px;
  right: 50px;
  height: 0px;
  width: 0px;
  transform: rotate(45deg);
  transition: all .3s ease-out;
  z-index: 9;

  ${({open}) => open && `
    height: 30px;
    width: 30px;
    right: 35px;
    background-color: #ffffff;
  `}
`;

const Container = styled.div<{open: boolean}>`
  position: absolute;
  top: 75px;
  right: 10px;
  height: 0px;
  width: fit-content;
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  transition: all .3s ease-out;
  overflow: hidden;
  padding: 0px;
  z-index: 10;

  ${({open}) => open && `
    height: fit-content;
    background-color: #ffffff;
    padding: 15px;
  `}
`;

const Layout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: left;
`;

const LinkButton = styled.div`
  padding: 5px;
  color: black;
  display: flex;
  gap: 7px;
  font-size: 16px;
  font-family: sans-serif;
  
  cursor: pointer;

  &:hover {
    color: #878787;
  }
`;