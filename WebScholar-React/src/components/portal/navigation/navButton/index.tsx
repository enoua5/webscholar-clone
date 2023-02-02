import React from 'react'
import styled from 'styled-components';

export default function NavButton(props: { label: string; selected: boolean; handleClick: Function; }) {
  const {label, selected, handleClick} = props;
  return (
    <AnimatedButton selected={selected} onClick={e => handleClick(label, "", false)} >{label}</AnimatedButton>
  )
};


const AnimatedButton = styled.div<({selected: boolean})>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  font-family: sans-serif;
  height: 65px;
  width: 100px;
  background-image: linear-gradient(
    to right,
    #ad3636,
    #ad3636 50%,
    #000 50%
  );
  background-size: 200% 100%;
  background-position: -100%;
  position: relative;
  background-clip: text;
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