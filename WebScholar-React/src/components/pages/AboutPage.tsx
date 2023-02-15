import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks'
import { setNavigationState } from '../../state/reducers/navigationSlice';
import { PageContainer } from '../elements/PageContainer'

export default function AboutPage() {
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(setNavigationState({
      menu: "About",
      submenu: "",
      popoutOpen: false
    }))
  })
  return <>
    <PageContainer>
      <Header>What is WebScholar?</Header>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempora excepturi 
        ea facilis eum, doloremque sit magnam eaque, perspiciatis aut molestiae ipsum quasi
        aliquid perferendis? Eveniet iusto quisquam officia laudantium. Lorem ipsum dolor 
        sit amet consectetur adipisicing elit. Necessitatibus explicabo dignissimos dicta 
        quae perspiciatis, provident ex odit iure ut distinctio asperiores in itaque? Iusto 
        dignissimos vel provident nulla, accusamus facilis.
      </Text>
      <Spacer/>

      <Header>What sets us apart?</Header>
      <GridLayout>
        <Feature>Main Feature 1 - </Feature>
        <Description>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempora excepturi 
        ea facilis eum, doloremque sit magnam eaque, perspiciatis aut molestiae ipsum quasi
        aliquid perferendis? Eveniet iusto quisquam officia laudantium. Lorem ipsum dolor 
        sit amet consectetur adipisicing elit. Necessitatibus explicabo dignissimos dicta 
        quae perspiciatis, provident ex odit iure ut distinctio asperiores in itaque? Iusto 
        dignissimos vel provident nulla, accusamus facilis.
        </Description>
        <Feature>Main Feature 2 - </Feature>
        <Description>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempora excepturi 
        ea facilis eum, doloremque sit magnam eaque, perspiciatis aut molestiae ipsum quasi
        aliquid perferendis? Eveniet iusto quisquam officia laudantium. Lorem ipsum dolor 
        sit amet consectetur adipisicing elit. Necessitatibus explicabo dignissimos dicta 
        quae perspiciatis, provident ex odit iure ut distinctio asperiores in itaque? Iusto 
        dignissimos vel provident nulla, accusamus facilis.
        </Description>
      </GridLayout>
      <Spacer/>

      <Header>Scholarships made simple!</Header>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempora excepturi 
        ea facilis eum, doloremque sit magnam eaque, perspiciatis aut molestiae ipsum quasi
        aliquid perferendis? Eveniet iusto quisquam officia laudantium. Lorem ipsum dolor 
        sit amet consectetur adipisicing elit. Necessitatibus explicabo dignissimos dicta 
        quae perspiciatis, provident ex odit iure ut distinctio asperiores in itaque? Iusto 
        dignissimos vel provident nulla, accusamus facilis.
      </Text>
    </PageContainer>
  </>
}

const Header = styled.div`
  font-size: 36px;
  font-weight: 200;
  font-family: sans-serif;
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: 200;
  font-family: sans-serif;
  text-align: center;
  padding: 25px;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
`;

const Feature = styled.div`
  font-size: 20px;
  font-weight: 200;
  font-family: sans-serif;
  padding: 10px;
`;

const Description = styled(Text)`
  font-size: 20px;
  padding: 10px;
  text-align: left;
`;

const Spacer = styled.div`
  height: 75px;
`;