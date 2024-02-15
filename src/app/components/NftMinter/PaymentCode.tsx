import * as React from 'react';
import styled from 'styled-components/macro';
import { QRCodeSVG } from 'qrcode.react';
interface Props {
  paymentAddress: string;
}

export function PaymentCode({ paymentAddress }: Props) {
  return (
    <Wrapper>
      <QRCodeSVG value={paymentAddress} fgColor="#000" size={200} bgColor="#fff" includeMargin={true} />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
