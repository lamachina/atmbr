import * as React from 'react';
import styled from 'styled-components/macro';
interface Props {
  mintResult: any;
}

export function MintResultError({ mintResult }: Props) {
  return <Wrapper>Error!</Wrapper>;
}

const Wrapper = styled.div``;
 