import * as React from 'react';
import styled from 'styled-components/macro';
import { UTXO } from 'utils/builder/services/electrum-api.interface';
import { ButtonPrimaryNew } from '../ButtonPrimaryNew';
interface Props {
  expectedSatoshis: number;
  fundingDepositUtxo: UTXO;
  onStartMint?: any;
  decryptedFundingKey?: string;
  onDecryptWallet: Function;
}

export function InitiateMint({
  expectedSatoshis,
  fundingDepositUtxo,
  decryptedFundingKey,
  onStartMint,
  onDecryptWallet,
}: Props) {
  const isFunded = () => {
    return expectedSatoshis >= 0 && !!fundingDepositUtxo;
  };
  const handleStartMint = e => {
    onStartMint();
    e.preventDefault();
  };

  const handleDecryptWallet = e => {
    onDecryptWallet();
    e.preventDefault();
  };

  return (
    <Wrapper>
      {isFunded() && (
        <>
          {decryptedFundingKey && (
            <ButtonPrimaryNew block={false} onClick={handleStartMint}>
              Start Mint
            </ButtonPrimaryNew>
          )}
           {!decryptedFundingKey && (
            <ButtonPrimaryNew block={false} onClick={handleDecryptWallet}>
              Decrypt Wallet
            </ButtonPrimaryNew>
          )}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
