import * as React from 'react';
import styled from 'styled-components/macro';
interface Props {}

export function MintInProcess({}: Props) {
  return (
    <Wrapper className="mt-5 pt-5 mb-3">
      <CirclePulse>
        <Icon>
          <i className="fa fa-bolt fa-2x"></i>
        </Icon>
        <Span1></Span1>
        <Span2></Span2>
        <Span3></Span3>
        <Span4></Span4>
        <Span5></Span5>
      </CirclePulse>
    </Wrapper>
  );
}

const Wrapper = styled.div`
display: flex;
justify-content: center
`;

const CirclePulse = styled.div`
  background: #ff5722;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 0px 1px 1px #0000001a;
  animation: pulse-animation 2s infinite;
  @keyframes pulse-animation {
    0% {
      box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
    }
    100% {
      box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
    }
  }
`;

const Icon = styled.div`
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .fa {
    color: yellow;
  }
  animation: pulse-animation 2s infinite;
  @keyframes pulse-animation {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.3;
    }
    100% {
      scale: 1;
    }
  }
`;

const Span1 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background: #ff5722;
  border-radius: 50%;
  display: inline-block;
  width: 100%;
  height: 100%;
  animation: animate 2.5s linear infinite;
  animation-delay: calc(-0.5s * 1);
  @keyframes animate {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    90% {
      transform: scale(3);
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const Span2 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background: #ff5722;
  border-radius: 50%;
  display: inline-block;
  width: 100%;
  height: 100%;
  animation: animate 2.5s linear infinite;
  animation-delay: calc(-0.5s * 2);
  @keyframes animate {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    90% {
      transform: scale(3);
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const Span3 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background: #ff5722;
  border-radius: 50%;
  display: inline-block;
  width: 100%;
  height: 100%;
  animation: animate 2.5s linear infinite;
  animation-delay: calc(-0.5s * 3);
  @keyframes animate {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    90% {
      transform: scale(3);
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const Span4 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background: #ff5722;
  border-radius: 50%;
  display: inline-block;
  width: 100%;
  height: 100%;
  animation: animate 2.5s linear infinite;
  animation-delay: calc(-0.5s * 4);
  @keyframes animate {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    90% {
      transform: scale(3);
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const Span5 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background: #ff5722;
  border-radius: 50%;
  display: inline-block;
  width: 100%;
  height: 100%;
  animation: animate 2.5s linear infinite;
  animation-delay: calc(-0.5s * 5);
  @keyframes animate {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    90% {
      transform: scale(3);
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
