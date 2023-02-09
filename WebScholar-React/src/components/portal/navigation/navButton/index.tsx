import React from 'react'
import styled from 'styled-components';
import { useAppSelector } from '../../../../hooks';
import { selectedMenuItem } from '../../../../state/reducers/navigationSlice';
import { ChevronDown} from 'react-feather';

export default function NavButton(props: { label: string, handleClick: Function, type: string }) {
  const {label, handleClick, type} = props;
  const _selectedNavItem = useAppSelector(selectedMenuItem);

  if(type === 'box')return (
    <AnimatedButton selected={_selectedNavItem === label} onClick={e => handleClick(label, "", false)} >
      {label === "Help" ? <>{label} <ChevronDown /></> : label}
    </AnimatedButton>
  )
  else if (type === 'round') return (
      <ButtonContainer>
        <RoundedText>{label}</RoundedText>
      </ButtonContainer>
  )
  return <></>
};

const AnimatedButton = styled.div<{selected: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  font-family: sans-serif;
  height: 65px;
  min-width: 90px;
  background-image: linear-gradient(
    to right,
    #ad3636,
    #ad3636 50%,
    #000 50%
  );
  background-size: 200% 100%;
  background-position: -100%;
  position: relative;
  background-clip: inherit;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.4s ease-in-out;
  
&:before{
  content: '';
  background: #ad3636;
  display: block;
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 0;
  height: 3px;
  transition: all 0.3s ease-in-out;
}

&:hover {
 background-position: 0;
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
  font-size: 18px;
  font-weight: 500;
  font-family: sans-serif;
  height: 65px;
  min-width: 90px;
  transition: all 0.1s ease-in;
`;

const RoundedText = styled.div`
  border-radius: 20px;
  height: 20px;
  padding: 5px 10px;
  background-color:#ad3636;
  color: white;
  transition: all 0.1s ease-in;

  &:hover {
    background: #ad3636cc;
  }
`;