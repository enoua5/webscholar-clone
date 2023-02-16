import { Avatar } from 'antd';
import { User } from 'react-feather';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function ProfileButton() {
  const navigate = useNavigate();

  return <StyledAvatar 
            icon={<User style={{height: "30px", width: "30px"}}/>} 
            shape="circle" 
            onClick={e => navigate("/profile")}
          />
}

const StyledAvatar = styled(Avatar)`
  height: 40px;
  width: 40px; 
  background-color: #2C9EB5; 
  color: white;
  cursor: pointer;
  display: flex; 
  justify-content: center; 
  align-items: center;

  &:hover {
    background-color: #2c9eb5d1;
  }
`;