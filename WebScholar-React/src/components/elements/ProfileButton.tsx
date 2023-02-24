import { Avatar } from 'antd';
import { User } from 'react-feather';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { profileDropdownOpen, setProfileDropdown } from '../../state/reducers/navigationSlice';

export default function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const _profileDropdownOpen = useAppSelector(profileDropdownOpen)

  return <StyledAvatar 
            icon={<User style={{height: "30px", width: "30px"}}/>} 
            shape="circle" 
            onClick={e => dispatch(setProfileDropdown({open: !_profileDropdownOpen}))}
          />
}

const StyledAvatar = styled(Avatar)`
  height: 40px;
  width: 40px; 
  background-color: #2C9EB5;
  border: 1px solid #228092;
  color: white;
  cursor: pointer;
  display: flex; 
  justify-content: center; 
  align-items: center;

  &:hover {
    background-color: #2c9eb5d1;
  }
`;