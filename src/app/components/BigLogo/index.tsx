import * as React from 'react';
import styled from 'styled-components/macro';
import logo from './realmsicon.png';

export function BigLogo() {
  return (
    <Wrapper>
      <ImgLogo src={logo} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImgLogo = styled.img`
   max-width: 250px;

   @media (max-width: 768px) {
    max-width: 125px;
  }
`;

