import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { selectRealms } from './slice/selectors';
import { useRealmsViewSlice } from './slice';
import { FooterBasic } from 'app/components/FooterBasic';
import { selectPrimaryAddress } from 'app/slice/selectors';
import { RealmItem } from './RealmItem';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

export function RealmsView() {
  const { actions } = useRealmsViewSlice();
  const realms = useSelector(selectRealms);
  const primaryAddress = useSelector(selectPrimaryAddress);
  const dispatch = useDispatch();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load repos
    dispatch(actions.loadRealms(primaryAddress as any));
  });

  const realmsFiltered = () => {
    if (!realms || !realms.length) {
      return [];
    }
    const filteredForRealmsOnly = realms.filter((item: any) => {
      if (item.subtype === 'realm') {
        return true;
      }
      return false;
    });
    return filteredForRealmsOnly;
  };

  return (
    <Wrapper className="mt-5">
      <Header className="mb-5">My Realms</Header>
      {realms &&
        realms.length &&
        realmsFiltered().map((item: any) => {
          return <RealmItem key={item.atomical_id} realmInfo={item}  />;
        })}
      {!realms && <LoadingIndicator />}
      <FooterBasic />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Header = styled.h2`
   color: #fff;
   font-size: 28px;
   p
`;
