import * as React from 'react';
import styled from 'styled-components/macro';
import { A } from 'app/components/A';
import { FormLabel } from 'app/components/FormLabel';
import { ButtonPrimaryNew } from '../ButtonPrimaryNew';
import { useNavigate } from 'react-router-dom';
import { useNftMinterSlice } from '../NftMinter/slice';
import { useDispatch } from 'react-redux';

interface Props {
  primaryAddress: any;
  name: string;
}

export function FirstClaimBox({ primaryAddress, name }: Props) {
  const { actions } = useNftMinterSlice();
  const dispatch = useDispatch();
 
  const navigate = useNavigate();
  function gotoConnect() {
    navigate('/_wallet');
  }

  function openMinter(e) {
    dispatch(actions.initMintResult());
    navigate('/_mint/' + name);
    e.preventDefault();
  }

  function isLoggedIn() {
    return primaryAddress;
  }

  return (
    <Wrapper>
      <FormGroupClaim className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
        <LeadClaim className="lead">
          Great news!
          <br />
          Realm <Highlight>+{name}</Highlight> is still available to claim!
        </LeadClaim>
        <LeadClaim className="text-center"></LeadClaim>
        {!isLoggedIn() && (
          <Lead>
            Connect your wallet and be the first to claim the Realm before someone else takes it.
          </Lead>
        )}

        {!isLoggedIn() && (
          <ButtonPrimaryNew block={false} onClick={gotoConnect}>
            Connect Wallet
          </ButtonPrimaryNew>
        )}
        {isLoggedIn() && (
          <ButtonPrimaryNew block={false} onClick={openMinter}>
            Mint Realm
          </ButtonPrimaryNew>
        )}
        <div className="text-center my-3">
          <A href="https://docs.atomicals.xyz/realm-names" target="_blank">
            ...or claim Realm with the CLI instead
          </A>
        </div>
      </FormGroupClaim>
    </Wrapper>
  );
}

const Highlight = styled.span`
  color: #ff914d;
`;

const LeadClaim = styled.p`
  color: ${p => p.theme.text};
  font-weight: bold;
`;

const Lead = styled.p`
  color: ${p => p.theme.text};
`;

const Wrapper = styled.div`
  font-weight: 500;
  color: ${p => p.theme.text};
`;

const FormGroupClaim = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-color: none;
  border: none !important;
  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
  background-color: #000 !important;
`;
