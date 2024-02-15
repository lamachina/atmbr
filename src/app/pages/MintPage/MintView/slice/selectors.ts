import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.mintViewState || initialState;

export const selectLoading = createSelector(
  [selectDomain],
  mintViewState => mintViewState.loading
);

export const selectError = createSelector(
  [selectDomain],
  mintViewState => mintViewState.error
);
