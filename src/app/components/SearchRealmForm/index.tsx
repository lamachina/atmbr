import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { FormLabel } from 'app/components/FormLabel';
import { TextButton } from './components/TextButton';
import {
  selectName,
  selectRepos,
  selectLoading,
  selectError,
  selectRealmInfo,
  selectProfileData,
  selectDelegateInfo,
} from './slice/selectors';
import { SearchRealmErrorType } from './slice/types';
import { useSearchRealmFormSlice } from './slice';
import { ButtonPrimaryNew } from 'app/components/ButtonPrimaryNew';
import { InputSearchRealms } from './InputSearchRealms';
import { NotFoundInfo } from './NotFoundInfo';
import { RealmInfo } from 'app/components/RealmInfo';
import { selectPrimaryAddress } from 'app/slice/selectors';
import { FirstClaimBox } from 'app/components/FirstClaimBox';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingIndicator } from '../LoadingIndicator';
import { AllCentered } from '../AllCentered';
import { selecturnPfpLoaded } from 'app/pages/RealmPage/Profile/ProfileOverview/slice/selectors';
interface Props {
  redirectOnly?: boolean;
  redirectPath?: string;
}

export function SearchRealmForm({ redirectOnly, redirectPath }: Props) {
  const { actions } = useSearchRealmFormSlice();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const name = useSelector(selectName);
  const realmInfo = useSelector(selectRealmInfo);
  const delegateInfo = useSelector(selectDelegateInfo);
  const profileData = useSelector(selectProfileData);
  const pfpUrn = useSelector(selecturnPfpLoaded);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const primaryAddress = useSelector(selectPrimaryAddress);

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.changeName(evt.currentTarget.value));
    dispatch(actions.clearError());
  };

  const onSearchName = () => {
    navigate(`/${name}`);
    /* if (redirectOnly) {
      navigate({
        pathname: redirectPath as any,
        search: `?${createSearchParams({
          q: name,
        })}`,
      });
    } else {
      dispatch(actions.getRealmInfo());
    } */
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    const q = searchParams.get('q');
    if (q) {
      dispatch(actions.changeName(q));
      dispatch(actions.getRealmInfo());
    } else {
      dispatch(actions.changeName(''));
      dispatch(actions.clearRealmInfo());
      dispatch(actions.clearError());
    }
  });

  const onSubmitForm = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
    
  };


  return (
    <Wrapper>
      <FormGroup className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={onSubmitForm}>
        <Lead className="lead">
          {' '}
          <i className="fa fa-search"></i> Search Realms
        </Lead>
        <div className="form-floating">
          <InputSearchRealms
            placeholder="Type any Realm name"
            value={name}
            onChange={onChangeName}
          />
        </div>

        <ButtonPrimaryNew block={false} onClick={onSearchName}>
          {' '}
          Search
        </ButtonPrimaryNew>
      </FormGroup>
      {loading && (
        <AllCentered className="pt-5">
          <LoadingIndicator />
        </AllCentered>
      )}
      {realmInfo ? (
        <RealmInfo key={realmInfo} data={realmInfo} pfpUrn={pfpUrn} delegateInfo={delegateInfo} profileData={profileData} profileLink={true} />
      ) : error ? (
        error === SearchRealmErrorType.REALM_NOT_FOUND ? (
          <NotFoundInfo>
            <FirstClaimBox name={name} primaryAddress={primaryAddress} />
          </NotFoundInfo>
        ) : (
          <ErrorTextSpan>{repoErrorText(error)}</ErrorTextSpan>
        )
      ) : null}
    </Wrapper>
  );
}

export const repoErrorText = (error: SearchRealmErrorType) => {
  switch (error) {
    case SearchRealmErrorType.REALM_NOT_FOUND:
      return 'That Realm name is not yet claimed!';
    case SearchRealmErrorType.REALMNAME_EMPTY:
      return 'Type any Realm name';
    case SearchRealmErrorType.REALM_NAME_INVALID:
      return 'Invalid Realm name';
    default:
      return 'An error has occurred!';
  }
};

const ErrorTextSpan = styled.span`
  color: red;
`;

const Wrapper = styled.div`
  ${TextButton} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const Lead = styled.p`
  color: ${p => p.theme.text};
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  border: solid 2px rgb(239,221,59) !important;
  ${FormLabel} {
    margin-bottom: 0.25rem;
    margin-left: 0.125rem;
  }
  background-color: #181818 !important;
`;
