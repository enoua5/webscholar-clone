import { CornerRightUp } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { navigationState, navPopoutOpen, selectedSubMenuItem, setNavPopout } from '../../../../state/reducers/navigationSlice';

export default function NavPopout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {menu, submenu, popoutOpen} = useAppSelector(navigationState);

  let submenuItems: any[] = [];

  if(menu === "Help") submenuItems = HelpItems;
  if(menu === "Scholarships") submenuItems = ScholarshipItems;

  return (
    <Container open={popoutOpen}>
      {submenuItems.map((item, index) => 
      <UnderlinedButton selected={submenu === item.label} onClick={e => navigate(item.path)} key={index}>
        {item.label}
      </UnderlinedButton>)}
      <CloseButton onClick={e => dispatch(setNavPopout({open: false}))}/>
    </Container>
  )
}


const HelpItems = [
  {label: "Contact", path: "/contact"},
  {label: "Known Issues", path: "/known-issues"},
]

const ScholarshipItems = [
  {label: "View Applicants", path: "/dummy1"},
  {label: "Add Scholarship", path: "/dummy2"},
  {label: "Award", path: "/dummy3"},
]

const Container = styled.div<{open: boolean}>`
  position: sticky;
  top: 65px;
  left: 0px;
  display: none;
  flex-direction: column;
  width: 100%;
  height: 150px;
  z-index: 1;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(3, auto);
  gap: 10px;

  ${({open}) => open && `
    display: grid !important;
  `}
`;

const CloseButton = styled(CornerRightUp)`
  height: 25px;
  width: 25px;
  position: absolute;
  bottom: 5px;
  right: 5px; 
  grid-column: span 4;
  cursor: pointer;
  &:hover{
    color: #00000093;
  }
`;

const UnderlinedButton = styled.div<{selected: boolean}>`
  grid-column: span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: 300;
  font-family: sans-serif;
  height: 65px;
  min-width: 90px;
  color: black;
  position: relative;
  transition: all 0.4s ease-in-out;
  
&:before{
  content: '';
  background: #32c4e191;
  display: block;
  position: absolute;
  bottom: 0px;
  left: 15%;
  width: 0;
  height: 3px;
  transition: all 0.3s ease-in-out;
}

&:hover::before{
  width: 70%;
}

${({selected}) => selected && `
  &:before{
    content: '';
    display: block;
    position: absolute;
    bottom: 0px;
    left: 15%;
    width: 70%;
    height: 3px;
    background: #2C9EB5;
  }
  color: #2C9EB5;
  background-position: 0;
`}
`;