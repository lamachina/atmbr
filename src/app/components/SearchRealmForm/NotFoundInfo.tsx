import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as StarIcon } from './assets/star.svg';
import { ReactComponent as NewWindowIcon } from './assets/new-window.svg';
import { A } from 'app/components/A';

interface Props {
  children: any;
}

export function NotFoundInfo({ children }: Props) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

const Lead = styled.p`
  color: ${p => p.theme.text};
`;

const Wrapper = styled.div`
  font-weight: 500;
  color: ${p => p.theme.text};
`;

const Name = styled.div`
  flex: 1;
  padding: 0.625rem 0;
`;

const Info = styled.div`
  display: flex;
`;

const StarCount = styled.div`
  display: flex;
  align-items: center;
  min-width: 6rem;
  .icon {
    margin-right: 0.125rem;
  }
`;
