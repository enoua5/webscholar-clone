import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../../../hooks';
import { navPopoutOpen } from '../../../../state/reducers/navigationSlice';

export default function NavPopout() {
  const _navPopoutOpen = useAppSelector(navPopoutOpen);
  return (
    <Container open={_navPopoutOpen}>
      <Link>Contact Us</Link>
      <Link>Known Issues</Link>
    </Container>
  )
}

const Container = styled.div<{open: boolean}>`
  position: absolute;
  top: 65px;
  left: 453px;
  display: none;
  flex-direction: column;
  min-width: 150px;
  height: 200px;
  z-index: 1;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

  ${({open}) => open && `
    display: flex !important;
  `}
`;

const Link = styled.div`
  cursor: pointer;
  margin: 5px 5px 0 5px;
  height: 20px;
  font-size: 18px;
  padding: 5px;
  font-family: sans-serif;
  transition: all .2s ease-in;
  &:hover{
    background-color: #dedada;
    color: #ad3636;
    border-radius: 5px;
  }
`
