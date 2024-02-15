import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { selectIsValidPhrase, selectPathBase } from '../slice/selectors';
import { ButtonPrimaryNew } from 'app/components/ButtonPrimaryNew';
import { ButtonSecondaryNew } from 'app/components/ButtonSecondaryNew';
import { ChangeWalletInitSection } from 'app/components/ChangeWalletInitSection';

export function LoginScreen({ phrase, onChangePhrase, onGenerateProfile, onLogin, onChangePath }) {
  const isValidPhrase = useSelector(selectIsValidPhrase);
  const pathBase = useSelector(selectPathBase);

  let [isLogin, setIsLogin] = useState(false);

  return (
    <Wrapper>
      <BoxShadow>
        <Title>Connect Wallet</Title>
        <SubTitle>Create a new wallet or open your existing wallet.</SubTitle>

        <ButtonPrimaryNew onClick={onGenerateProfile} classes="w-100 btn-lg">
          Create new wallet
        </ButtonPrimaryNew>
        <OrDivider>
          <ThinLine />
          <OR>OR</OR>
          <ThinLine />
        </OrDivider>

        {!isLogin && (
          <ButtonSecondaryNew onClick={() => setIsLogin(!isLogin)} classes="w-100 btn-lg">
            Open existing wallet
          </ButtonSecondaryNew>
        )}

        {isLogin && (
          <LoginWrapper>
            <LabelHeadng>
              <Label>Wallet Secret Words</Label>
              <Info>(Required)</Info>
            </LabelHeadng>
            <TextArea
              className="form-control"
              placeholder="Enter your wallet's secret words. These are the 12 random words that were generated for your wallet."
              onChange={onChangePhrase}
              value={phrase}
            />

            <div className="mt-3"></div>

            <ButtonSecondaryNew
              block={true}
              classes="w-100 btn-lg"
              onClick={onLogin}
              disabled={!isValidPhrase}
            >
              Open wallet
            </ButtonSecondaryNew>
          </LoginWrapper>
        )}
        {!isLogin && <ChangeWalletInitSection pathBase={pathBase} onChangePath={onChangePath} />}
      </BoxShadow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: solid 1px rgb(60, 16, 105) !important;
  border-radius: 5px;
  padding: 40px;
`;

const LoginWrapper = styled.div`
  animation: ease-in 0.5s slideDown;

  @keyframes slideDown {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const BoxShadow = styled.div``;

const OR = styled.div`
  color: #eee;
`;

const ThinLine = styled.div`
  border: 1px solid rgb(238, 238, 238);
  margin: 20px;
  width: 50%;
`;

const OrDivider = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  color: #eee;
`;

const Title = styled.h3`
  text-align: center;
`;

const SubTitle = styled.p`
  text-align: center;
  color: #eee;
  font-size: 1.1em;
`;

const LabelHeadng = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Info = styled.div``;

const TextArea = styled.textarea`
  margin-bottom: 1em;
`;
