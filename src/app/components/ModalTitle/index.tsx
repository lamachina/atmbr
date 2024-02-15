import * as React from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as XIcon } from 'app/assets/x.svg';
interface Props {
  title: string;
  onClick: any;
}
export function ModalTitle({ title, onClick }: Props) {
  var class_name = title.toLowerCase().split(' ').join('-');
  return (
    <Wrapper className={' ' + class_name}>
      <div></div>
      <Title>{title}</Title>
      <CloseButton>
        <XIcon onClick={onClick} />
      </CloseButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: solid 1px #ebe9ef;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5em;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-weight: bold;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;
