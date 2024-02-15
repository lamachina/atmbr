import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.nftMinterState || initialState;

export const selectName = createSelector([selectDomain], nftMinterState => nftMinterState.name);

export const selectEstimateFee = createSelector(
  [selectDomain],
  nftMinterState => nftMinterState.estimateFee
);

export const selectLoading = createSelector(
  [selectDomain],
  nftMinterState => nftMinterState.loading
);

export const selectError = createSelector([selectDomain], nftMinterState => nftMinterState.error);

export const selectRequiredFundingSatoshis = createSelector(
  [selectDomain],
  nftMinterState => nftMinterState.requiredFundingSatoshis
);

export const selectFundingDepositUtxo = createSelector(
  [selectDomain],
  nftMinterState => nftMinterState.fundingDepositUtxo
);

export const selectMintStarted = createSelector(
  [selectDomain],
  nftMinterState => nftMinterState.mintStarted
);

export const selectRealmMintResult = createSelector(
  [selectDomain],
  nftMinterState => nftMinterState.realmMintResult
);

export const selectRealmMintProgressNonces = createSelector(
  [selectDomain],
  nftMinterState => nftMinterState.realmMintProgressNonces
);
