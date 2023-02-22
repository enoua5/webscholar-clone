import React from 'react'
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks';
import { selectedMenuItem } from '../../../state/reducers/navigationSlice';
import { ChevronDown} from 'react-feather';

export default function NavButton(props: { label: string, onClick: Function, type: string }) {
  const {label, onClick, type} = props;
  const _selectedNavItem = useAppSelector(selectedMenuItem);

  if(type === 'underline')return (
    <UnderlinedButton selected={_selectedNavItem === label} onClick={e => onClick()} >
      {label === "Help" ? <>{label} <ChevronDown /></> : label}
    </UnderlinedButton>
  )
  else if (type === 'box') return (
      <ButtonContainer onClick={e => onClick()}>
        <BoxText>{label}</BoxText>
      </ButtonContainer>
  )
  return <></>
};

const UnderlinedButton = styled.div<{selected: boolean}>`
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
  color: #2C9EB5;
  position: relative;
  transition: all 0.4s ease-in-out;
  
&:before{
  content: '';
  background: #2C9EB5;
  display: block;
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 0;
  height: 3px;
  transition: all 0.3s ease-in-out;
}

&:hover::before{
  width: 100%;
}

${({selected}) => selected && `
  &:before{
    content: '';
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 3px;

  }
  background-position: 0;
`}
`;

const ButtonContainer = styled.div`
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
  transition: all 0.1s ease-in;
`;

const BoxText = styled.div`
  border-radius: 3px;
  height: 20px;
  padding: 5px 10px;
  background-color:#2C9EB5;
  color: white;
  transition: all 0.1s ease-in;

  &:hover {
    background: #2c9eb5bc;
  }
`;