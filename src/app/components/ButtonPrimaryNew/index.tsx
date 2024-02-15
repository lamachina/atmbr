import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  disabled?: boolean;
  onClick?: any;
  classes?: string;
  children: any;
  block?: boolean;
}

export function ButtonPrimaryNew({
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
  width: 100%;
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  border: solid 2px transparent;
  text-align: center;
  font-weight: normal;
  display: block;
  color: #eee;
  width: 100%;
  &:hover {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }

  background-color: rgb(89, 36, 143);
  background-image: rgb(89, 36, 143);
  color: #fff;

  &:hover {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    background-color: rgb(89, 36, 143, 0.9);
    background-image: rgba(89, 36, 143, 0.9);
  }

  &.disabled {
    opacity: 0.5;
    color: #fff;
    &:hover {
      cursor: not-allowed;
      background-image: linear-gradient(
        270deg,
        hsl(210, 85%, 45%) 0%,
        #0abcf9 95%
      );
    }
    border: dashed 2px #eee;
  }
`;
