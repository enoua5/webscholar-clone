import styled from 'styled-components';

function Footer() {
  const thisYear: number = new Date().getFullYear();
  return (
    <>
    <FooterText>
      &copy; {thisYear  + " - WebScholar"}
    </FooterText>
    </>
  )
}

export default Footer

const FooterText = styled.div`
  width: 75%;
  text-align: center;
  align-self: center;
  padding-top: 15px;
  margin: 15px auto auto auto;
  border-top: 1px solid #d9d9d9;
`;