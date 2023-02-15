import { Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch } from '../../hooks';
import { setNavigationState } from '../../state/reducers/navigationSlice';
import { PageContainer } from '../elements/PageContainer'

export default function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNavigationState({
      menu: "Home",
      submenu: "",
      popoutOpen: false
    }))
  })

  return <>
    <PageContainer>
      <Header>Welcome to WebScholar!</Header>
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit libero quia eum ullam deleniti! 
        Commodi eos aut harum cum, dolor sint iusto sunt tempora aperiam, nihil, veniam pariatur autem sapiente.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit libero quia eum ullam deleniti! 
        Commodi eos aut harum cum, dolor sint iusto sunt tempora aperiam, nihil, veniam pariatur autem sapiente.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit libero quia eum ullam deleniti! 
        Commodi eos aut harum cum, dolor sint iusto sunt tempora aperiam, nihil, veniam pariatur autem sapiente.
      </Text>
      <ButtonPanel>
        <ColoredButton
          onClick={e => navigate('/login')}
          type='primary'
        >
          Log in
        </ColoredButton>
        <ColoredButton 
          type="primary"
          onClick={e => navigate("/register")}
        >
          Create an account
        </ColoredButton>
      </ButtonPanel>
      <Header>How does it work?</Header>
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit libero quia eum ullam deleniti! 
        Commodi eos aut harum cum, dolor sint iusto sunt tempora aperiam, nihil, veniam pariatur autem sapiente.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit libero quia eum ullam deleniti! 
        Commodi eos aut harum cum, dolor sint iusto sunt tempora aperiam, nihil, veniam pariatur autem sapiente.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit libero quia eum ullam deleniti! 
        Commodi eos aut harum cum, dolor sint iusto sunt tempora aperiam, nihil, veniam pariatur autem sapiente.
      </Text>
      <ColoredButton 
        type="primary"
        onClick={e => navigate("/about")}
      >
        Learn more
      </ColoredButton>
    </PageContainer>
  </>
}

const Header = styled.div`
  font-size: 36px;
  font-weight: 200;
  font-family: sans-serif;
  margin-top: 75px;
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: 200;
  font-family: sans-serif;
  text-align: center;
  padding: 25px 50px;
`;

const ButtonPanel = styled.div`
  display: flex;
  width: 350px;
  justify-content: space-between;
`;

const ColoredButton = styled(Button)`
  border-radius: 3px;
  width: 150px;
`;