import React from 'react'
import styled from 'styled-components';

function Footer() {
  const thisYear: number = new Date().getFullYear();
  return (
    <>
    <FooterText>
      &copy; {thisYear  + " - WebScholar - CS 4760"}
    </FooterText>
    </>
  )
}

export default Footer

const FooterText = styled.div`
  width: 100%;
  text-align: center;
  border-top: 1px solid #d9d9d9;
  padding-top: 15px;
  margin-top: 15px;
  position: absolute;
  bottom: 15px;
`;