import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { useSlice } from '../slice';
import { ButtonPrimaryNew } from 'app/components/ButtonPrimaryNew';

export function PasswordScreen({
    addressIdentity,
    newPassword,
    confirmPassword,
    onChangePassword,
    onChangePasswordConfirm,
    onResetConnect,
    onAcceptPassword,
}) {
    const { actions } = useSlice();
    const dispatch = useDispatch();

    const phrase = '';

    function isPasswordValid(): boolean {
        if (newPassword.length < 6) {
            return false;
        }
        return newPassword && newPassword !== '' && newPassword === confirmPassword;
    }

    return (
        <Wrapper>
            <Title>Set a password</Title>
            <SubTitle>Secure your wallet secret words with a strong password.</SubTitle>
            <form onSubmit={onAcceptPassword}>
                <BoxShadow>
                    <LabelHeading className="mt-3">
                        <Label>New password (minimum 6 chars)</Label>
                    </LabelHeading>

                    <Input
                        type="password"
                        className="form-control"
                        placeholder="Set new password"
                        onChange={onChangePassword}
                    ></Input>

                    <LabelHeading className="mt-3">
                        <Label>Confirm password</Label>
                    </LabelHeading>
                    <Input
                        type="password"
                        className="form-control"
                        placeholder="Confirm new password"
                        onChange={onChangePasswordConfirm}
                    ></Input>

                    <div className="mt-3"></div>
                    <ButtonPrimaryNew
                        block={true}
                        classes="w-100 btn-lg"
                        onClick={onAcceptPassword}
                        disabled={!isPasswordValid()}
                    >
                        Set password
                    </ButtonPrimaryNew>

                    <SubTitle className="mt-3 text-center">
                        <LoginLink onClick={onResetConnect}>Open different wallet</LoginLink>
                    </SubTitle>
                </BoxShadow>
                </form>
        </Wrapper>
    );
}

const LoginLink = styled.a`
    cursor: pointer;
    text-align: center;
    color: #eee;
    text-decoration: underline;
    &:hover {
        color: #eee;
        text-decoration: underline;
    }
`;

const Wrapper = styled.div`
    border: solid 1px rgb(60, 16, 105) !important;
    border-radius: 5px;
    padding: 40px;
`;

const BoxShadow = styled.div``;

const Title = styled.h3`
    text-align: left;
`;

const SubTitle = styled.p`
    text-align: left;
    color: #eee;
    padding-bottom: 1em;
`;

const LabelHeading = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5em;
`;

const Label = styled.div`
    font-weight: bold;
`;

const Input = styled.input``;
