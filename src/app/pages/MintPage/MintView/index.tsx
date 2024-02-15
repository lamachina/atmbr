import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { TextButton } from './components/TextButton';
import { NftMinter } from 'app/components/NftMinter';
import { selectPrimaryAddress } from 'app/slice/selectors';
import { useSelector } from 'react-redux';
import { isValidRealmName } from 'utils/builder/atomical-format-helpers';
import { AllCentered } from 'app/components/AllCentered';

interface Props {
  name: string;
}
export function MintView({ name }: Props) {
  const primaryAddress = useSelector(selectPrimaryAddress);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load repos
  });
  const isValidName = () => {
    try {
      return isValidRealmName(name);
    } catch (err) {
      console.log(err);
    }
    return false;
  };
  return (
    <Wrapper>
      <div className="container my-5 px-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {!isValidName() && (
              <AllCentered>
                <Error>Invalid Realm name</Error>
              </AllCentered>
            )}
            {isValidName() && <NftMinter name={name} primaryAddress={primaryAddress as any} />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const Error = styled.div`
  color: #ff0000;
`;
