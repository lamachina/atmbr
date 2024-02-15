import * as React from 'react';
import styled from 'styled-components/macro';
import { A } from '../A';
import { AllCentered } from '../AllCentered';
import { P } from 'app/pages/HomePage/components/P';
import { Highlight } from '../Highlight';
interface Props {
  name: string;
  mintResult: any;
}

export function MintResultSuccess({ name, mintResult }: Props) {
  const txLink = (txid: string) => {
    return `https://mempool.space/tx/${txid}`;
  };
  return (
    <Wrapper className="mt-3 mb-3">
      <div className="row">
        <AllCentered className="col">
          <CirclePulse>
            <Icon>
              <i className="fa fa-check fa-3x"></i>
            </Icon>
          </CirclePulse>
        </AllCentered>
      </div>
      <div className="row">
        <div className="col">
          <h3 className="text-center pt-3">Congratulations!</h3>
          <Subline className="text-center pt-1">
            Realm registration sent for <Highlight>+{name}</Highlight>. <br/>
            Wait 3 confirmations for the claim to be finalized.
          </Subline>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <div>
            <FieldLabel>Commit Tx:</FieldLabel>
            <FieldItem>
              <A href={txLink(mintResult.commitTxid)} target="_blank">
                {mintResult.commitTxid}
              </A>
            </FieldItem>
            <FieldLabel>Reveal Tx:</FieldLabel>
            <FieldItem>
              <A href={txLink(mintResult.revealTxid)} target="_blank">
                {mintResult.revealTxid}
              </A>
            </FieldItem>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Subline = styled.div`
  color: ${p => p.theme.textSecondary};
  font-size: 1.3em;
`;

const CirclePulse = styled.div`
  background: green;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 0px 1px 1px #0000001a;
`;

const Icon = styled.div`
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .fa {
    color: white;
  }
`;

const Divider = styled.div`
  color: ${p => p.theme.text};
  border-top: solid 1px #484848;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Lead = styled.p`
  color: ${p => p.theme.text};
`;

const FieldItem = styled.p`
  color: ${p => p.theme.text};
  margin-bottom: 10px;
`;

const FieldLabel = styled.div`
  color: ${p => p.theme.textSecondary};
  margin-bottom: 5px;
`;
