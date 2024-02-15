import * as React from 'react';
import styled from 'styled-components/macro';
import bplogo from  'app/assets/realmslogoplus.png';
//import bplogo from  './assets/b-logo-blue.png';
export function Logo() {
  return (
    <Wrapper>
      <ImgLogo src={bplogo} className="logo"/>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
`;
 
const Description = styled.div`
  font-size: 0.875rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;
`;

const ImgLogo = styled.img`
   max-width: 220px;

   @media (max-width: 768px) {
    max-width: 180px;
  }
`;

