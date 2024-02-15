import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { TextButton } from './components/TextButton';
import { selectDelegateInfo, selectError, selectLoading, selectProfileData, selectRealmInfo, selecturnPfpLoaded } from './slice/selectors';
import { ProfileErrorType } from './slice/types';
import { useProfileOverviewSlice } from './slice';
import { NotFoundInfo } from './NotFoundInfo';
import { useParams } from 'react-router-dom';
import { Title } from '../../components/Title';
import { FooterBasic } from 'app/components/FooterBasic';
import { RealmInfo } from 'app/components/RealmInfo';
import { FirstClaimBox } from 'app/components/FirstClaimBox';
import { selectPrimaryAddress } from 'app/slice/selectors';
import { AllCentered } from 'app/components/AllCentered';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import * as punycode from 'punycode';

export function ProfileOverview() {
  const { actions } = useProfileOverviewSlice();
  const realmInfo = useSelector(selectRealmInfo);
  const delegateInfo = useSelector(selectDelegateInfo);
  const profileData = useSelector(selectProfileData);
  const pfpUrn = useSelector(selecturnPfpLoaded);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { name }: any = useParams();
  const dispatch = useDispatch();
  const primaryAddress = useSelector(selectPrimaryAddress);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    // When initial state username is not null, submit the form to load repos
    dispatch(actions.changeName(name));
    dispatch(actions.loadRepos());
  });

  const fullName = () => {
    if (realmInfo) {

      // Decode with punycode if we can
      return punycode.toUnicode(realmInfo?.$full_realm_name);
    }
    return '';
  };
 
  return (
    <Wrapper className="pt-5">
        {loading && (
        <AllCentered className="pt-5">
          <LoadingIndicator />
        </AllCentered>
      )}
      {realmInfo ? (
        <>
          
          <RealmInfo key={realmInfo} data={realmInfo} pfpUrn={pfpUrn} delegateInfo={delegateInfo} profileData={profileData} />
        </>
      ) : error ? (
        <div className="mt-5">
          <NotFoundInfo>
            <FirstClaimBox name={name} primaryAddress={primaryAddress} />
          </NotFoundInfo>
        </div>
      ) : null}
      <FooterBasic />
    </Wrapper>
  );
}
export const repoErrorText = (error: ProfileErrorType) => {
  switch (error) {
    case ProfileErrorType.REALM_NOT_FOUND:
      return 'That Realm name is not yet claimed!';
    case ProfileErrorType.REALMNAME_EMPTY:
      return 'Type any Realm name';
    case ProfileErrorType.USER_HAS_NO_REPO:
      return 'Realm has no data';
    case ProfileErrorType.GITHUB_RATE_LIMIT:
      return 'Rate limited';
    default:
      return 'An error has occurred!';
  }
};



const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;
