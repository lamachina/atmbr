import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.realmsViewState || initialState;

export const selectRealms = createSelector(
  [selectDomain],
  profileViewState => profileViewState.realms
);

export const selectLoading = createSelector(
  [selectDomain],
  profileViewState => profileViewState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  profileViewState => profileViewState.error,
);