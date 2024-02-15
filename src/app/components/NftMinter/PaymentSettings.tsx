import * as React from 'react';
import styled from 'styled-components/macro';
import { LoadingIndicator } from '../LoadingIndicator';
import { UTXO } from 'utils/builder/atomical-operation-builder';

interface Props {
  paymentAddress: string;
  satoshis: number;
  fundingDepositUtxo: UTXO;
}

export function PaymentSettings({ paymentAddress, satoshis, fundingDepositUtxo }: Props) {
  const formatSatoshis = satoshis => {
    return satoshis / 100000000;
  };

  return (
    <Wrapper>
      <Centered>Deposit {formatSatoshis(satoshis)} BTC</Centered>
      <AllCentered>
        {!fundingDepositUtxo && (
          <AllCentered>
            <LoadingIndicator />
          </AllCentered>
        )}
      </AllCentered>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
`;

const AllCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
