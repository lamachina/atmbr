/* eslint-disable import/first */
import React, {useState } from 'react';
import styled from 'styled-components/macro';
import { FormLabel } from 'app/components/FormLabel';
import { ButtonPrimaryNew } from 'app/components/ButtonPrimaryNew';
import { InputPassword } from './InputPassword';
import CryptoJS from 'crypto-js';
import { AES_SALT, useAppGlobalStateSlice } from 'app/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectEncryptedFundingKey } from 'app/slice/selectors';
window['bitcoin'] = window['bitcoin'] || {};

//import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import * as ecc from '@bitcoinerlab/secp256k1';
import { ECPairFactory, ECPairAPI } from 'ecpair';
const ECPair: ECPairAPI = ECPairFactory(ecc);

interface Props {
  sha256d: string;
  onWalletDecrypted: Function;
}

export function DecryptWalletForm({ sha256d, onWalletDecrypted }: Props) {
  const globalSlice = useAppGlobalStateSlice();
  const encryptedFundingKey = useSelector(selectEncryptedFundingKey);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');

  const onChangePassword = (evt: any) => {
    setPassword(evt.target.value);
  };

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
    if (isPasswordCorrect()) {
      onDecryptWallet();
    }
  };

  const onDecryptWallet = () => {
    const bytesPhrase = CryptoJS.AES.decrypt(encryptedFundingKey, password + AES_SALT);
    const decrypted = bytesPhrase.toString(CryptoJS.enc.Utf8);
    const keypair = ECPair.fromPrivateKey(Buffer.from(decrypted, 'hex'));
    dispatch(globalSlice.actions.setDecryptedFundingKey(keypair.toWIF() as string));
    onWalletDecrypted();
  };

  const isPasswordCorrect = () => {
    if (sha256d) {
      const sha256dEnteredPassword = CryptoJS.SHA256(CryptoJS.SHA256(password)).toString();
      return sha256d === sha256dEnteredPassword;
    }
    return false;
  };

  return (
    <Wrapper>
      <FormGroup className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={onSubmitForm}>
        <Lead className="lead">
          <i className="fa fa-key"></i> Decrypt Wallet
        </Lead>
        <div className="form-floating">
          <InputPassword
            placeholder="Enter your password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        {isPasswordCorrect() && (
          <ButtonPrimaryNew block={false} onClick={onDecryptWallet} disabled={false}>
            {' '}
            Decrypt
          </ButtonPrimaryNew>
        )}

        {!isPasswordCorrect() && (
          <ButtonPrimaryNew block={false} disabled={true}>
            {' '}
            Decrypt
          </ButtonPrimaryNew>
        )}
        {!isPasswordCorrect() && (
          <Error className="mt-3">Enter the correct password to decrypt your wallet.</Error>
        )}
      </FormGroup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media (max-width: 767px) {
  }
  @media (min-width: 768px) {
    width: 500px;
  }

  @media (min-width: 1024px) {
    width: 500px;
  }
`;

const Lead = styled.p`
  color: ${p => p.theme.text};
`;

const Error = styled.p`
  color: ${p => p.theme.textSecondary};
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;

  border: none !important;
  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
  background-color: #181818 !important;
`;
