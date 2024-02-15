import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Identicon from 'react-identicons';
import ToggleSwitch from 'app/components/ToggleSwitch/ToggleSwitch';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSlice } from '../slice';
import { ButtonPrimaryNew } from 'app/components/ButtonPrimaryNew';

export function GenerateScreen({
    addressIdentity,
    phrase,
    confirmedStored,
    confirmedPermanent,
    onChangeConfirmedStored,
    onChangeConfirmedPermanent,
    onResetConnect,
    onAccept,
}) {
    const { actions } = useSlice();
    const dispatch = useDispatch();
    const onLogin = (evt: any) => {
        dispatch(actions.clear());
        dispatch(push('/connect'));
        evt.preventDefault();
        return false;
    };
    return (
        <Wrapper>
            <Title>Confirm New Wallet</Title>
            <SubTitle className="d-none d-md-block">New wallet secret words created</SubTitle>
            <BoxShadow>
                <ProfilePreview className="d-none">
                    <Identicon string={addressIdentity} size="80" />
                </ProfilePreview>
                <ProfilePreview className="d-none">
                    <ProfileId>{addressIdentity}</ProfileId>
                </ProfilePreview>
                <BoxHeading>
                    <Label>Wallet Secret Words</Label>
                    <Info></Info>
                </BoxHeading>
                <ProfileSecretWords>{phrase}</ProfileSecretWords>
                <Warning className="d-none">
                    <WarningIcon className="fa fa-warning "></WarningIcon>
                    You must write down your Wallet Words someplace safe.
                </Warning>

                <WarningTermsBox>
                    <WarningLabel>
                        <WarningIcon className="fa fa-warning"></WarningIcon>
                        Warning: &nbsp;
                    </WarningLabel>
                    If you lose or share your Wallet Secret Words then{' '}
                    <em>your assets will be lost forever</em>.
                </WarningTermsBox>

                <LabelHeadng>
                    <Label>I have saved my Wallet Words</Label>
                    <Info>
                        <ToggleSwitch
                            id="confirmedStoredId"
                            checked={confirmedStored}
                            onChange={onChangeConfirmedStored}
                        />
                    </Info>
                </LabelHeadng>
                <LabelHeadng>
                    <Label>
                        I understand this is experimental which could lead to the loss of my funds.{' '}
                    </Label>
                    <Info>
                        <ToggleSwitch
                            id="confirmedPermanentId"
                            checked={confirmedPermanent}
                            onChange={onChangeConfirmedPermanent}
                        />
                    </Info>
                </LabelHeadng>

                <div className="mt-3"></div>
                <ButtonPrimaryNew
                    block={true}
                    classes="w-100 btn-lg"
                    onClick={onAccept}
                    disabled={!confirmedStored || !confirmedPermanent}
                >
                    Create wallet
                </ButtonPrimaryNew>

                <SubTitle className="mt-2 text-center">
                    <LoginLink onClick={onResetConnect}>Open different wallet</LoginLink>
                </SubTitle>
            </BoxShadow>
        </Wrapper>
    );
}

const DecoratedLink = styled.a`
    // F15D04
    color: #eee;
    text-decoration: underline;
    &:hover {
        color: #eee;
        text-decoration: underline;
    }
`;

const LoginLink = styled.a`
    color: #eee;
    text-decoration: underline;
    &:hover {
        color: #eee;
        text-decoration: underline;
    }
    cursor: pointer;
`;

const AgreeButton = styled.button`
    display: block;
    width: 100%;
`;

const Wrapper = styled.div`
    border: solid 1px rgb(60, 16, 105) !important;
    border-radius: 5px;
    padding: 40px;
`;

const WarningLabel = styled.strong`
    color: #eee;
`;

const Warning = styled.div`
    margin-top: 1em;
`;

const WarningTermsBox = styled.div`
    // border: dotted 1px rgb(245, 194, 199);
    padding: 0px;
    margin-top: 10px;
`;

const WarningIcon = styled.i`
    color: red;
`;

const ProfilePreview = styled.div`
    align-items: center;
    margin: 0 auto;
    text-align: center;
`;

const ProfileSecretWords = styled.div`
    padding: 20px;
    border: 3px dashed rgb(165, 165, 165) !important;
    border-radius: 2px;

    background-color: rgba(40, 49, 59, 1) !important;
`;

const ProfileId = styled.div``;

const BoxShadow = styled.div``;

const Title = styled.h3`
    text-align: left;
`;

const SubTitle = styled.div`
    text-align: left;
    color: #eee;
`;

const BoxHeading = styled.div`
    margin-top: 0em;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5em;
    align-items: center;
`;

const LabelHeadng = styled.div`
    margin-top: 1em;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5em;
    align-items: center;
`;

const Label = styled.div`
    font-weight: bold;
`;

const Info = styled.div``;
