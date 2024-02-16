import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.searchRealmForm || initialState;

export const selectName = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.name,
);

export const selectLoading = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.error,
);

export const selectRepos = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.repositories,
);


export const selectRealmInfo = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.realmInfo,
);

export const selectDelegateInfo = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.delegateInfo,
);
export const selectProfileData = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.profileData,
);
export const selectUrnPfp = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.urnPfp,
);
