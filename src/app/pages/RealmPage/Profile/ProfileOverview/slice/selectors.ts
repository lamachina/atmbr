import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.profileOverview || initialState;

export const selectName = createSelector([selectDomain], profileViewState => profileViewState.name);

export const selectLoading = createSelector(
  [selectDomain],
  profileViewState => profileViewState.loading
);

export const selectError = createSelector(
  [selectDomain],
  profileViewState => profileViewState.error
);

export const selectRepos = createSelector(
  [selectDomain],
  profileViewState => profileViewState.repositories
);

export const selectRealmInfo = createSelector(
  [selectDomain],
  profileViewState => profileViewState.realmInfo
);

export const selectDelegateInfo = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.delegateInfo,
);
export const selectProfileData = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.profileData,
);
export const selecturnPfpLoaded = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.urnPfp,
);