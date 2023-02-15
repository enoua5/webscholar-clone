import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks'
import { setNavigationState } from '../../state/reducers/navigationSlice';
import { Header } from '../elements/Header';
import { PageContainer } from '../elements/PageContainer'
import { Text } from '../elements/Text';

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
        <Text>Main Feature 1 - </Text>
        <Text style={{textAlign: "left"}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempora excepturi 
        ea facilis eum, doloremque sit magnam eaque, perspiciatis aut molestiae ipsum quasi
        aliquid perferendis? Eveniet iusto quisquam officia laudantium. Lorem ipsum dolor 
        sit amet consectetur adipisicing elit. Necessitatibus explicabo dignissimos dicta 
        quae perspiciatis, provident ex odit iure ut distinctio asperiores in itaque? Iusto 
        dignissimos vel provident nulla, accusamus facilis.
        </Text>
        <Text>Main Feature 2 - </Text>
        <Text style={{textAlign: "left"}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempora excepturi 
        ea facilis eum, doloremque sit magnam eaque, perspiciatis aut molestiae ipsum quasi
        aliquid perferendis? Eveniet iusto quisquam officia laudantium. Lorem ipsum dolor 
        sit amet consectetur adipisicing elit. Necessitatibus explicabo dignissimos dicta 
        quae perspiciatis, provident ex odit iure ut distinctio asperiores in itaque? Iusto 
        dignissimos vel provident nulla, accusamus facilis.
        </Text>
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

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
`;

const Spacer = styled.div`
  height: 75px;
`;