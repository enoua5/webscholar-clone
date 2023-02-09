import styled from 'styled-components';

function Footer() {
  const thisYear: number = new Date().getFullYear();
  return (
    <FooterBar>
      <FooterText>
        &copy; {thisYear  + " - WebScholar"}
      </FooterText>
    </FooterBar>
  )
}

export default Footer

const FooterBar = styled.div`
  width: 100%;
  height: 35px;
  background-color: #CDD7DF;
  display: flex;
  justify-self: flex-end;
`;

const FooterText = styled.div`
  display: flex;
  align-self: center;
  margin: 0 30px 0 auto;
  font-size: 13px;
  font-family: sans-serif;
  font-weight: 200;
`;