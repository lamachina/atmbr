import * as React from 'react';
import styled from 'styled-components/macro';
import { AllCentered } from '../AllCentered';
interface Props {
  progressNonces: number;
}

export function MintStatus({ progressNonces }: Props) {
  return (
    <Wrapper>
      <div className="text-center">Generated nonces: {progressNonces}</div>
      <Note className="text-center">
        Note: Refresh this page after 5 minutes and try again. It should take on average 64,000 nonces to mint a Realm on average, but it can 
        be as high as 300,000.
      </Note>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 120px;
`;

const Note = styled.div`
  margin-top: 10px;
  font-size: 0.9em;
`;
