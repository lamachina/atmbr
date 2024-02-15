import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  disabled?: boolean;
  onClick?: any;
  classes?: string;
  children: any;
  block?: boolean;
}

export function ButtonSecondaryNew({
  disabled,
  block,
  onClick,
  classes,
  children,
}: Props) {
  return (
    <Div>
      <Button
        className={
          `btn ${classes ? classes : ''}` +
          (+!!block ? ' w-100 ' : '') +
          (disabled ? ' disabled ' : ' ')
        }
        onClick={onClick}
      >
        {children}
      </Button>
    </Div>
  );
}

const Div = styled.div`
  background-color: #5c636a;
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  text-align: center;
  font-weight: normal;
  color: #eee;

  &:hover {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    opacity: 0.9;
  }

  &.disabled {
    opacity: 0.5;
    &:hover {
      cursor: not-allowed;
    }
  }
`;
