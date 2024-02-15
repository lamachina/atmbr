import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.connectViewState || initialState;

export const selectPhrase = createSelector(
    [selectDomain],
    connectViewState => connectViewState.phrase,
);

export const selectIsValidPhrase = createSelector(
    [selectDomain],
    connectViewState => connectViewState.isValidPhrase,
);

export const selectPrivKeyCipherText = createSelector(
    [selectDomain],
    connectViewState => connectViewState.privKeyCipherText,
);

export const selectIsValidPassword = createSelector(
    [selectDomain],
    connectViewState => connectViewState.isValidPassword,
);

export const selectConfirmPassword = createSelector(
    [selectDomain],
    connectViewState => connectViewState.confirmPassword,
);

export const selectNewPassword = createSelector(
    [selectDomain],
    connectViewState => connectViewState.newPassword,
);

export const selectShowLoginConfirm = createSelector(
    [selectDomain],
    connectViewState => connectViewState.showLoginConfirm,
);

export const selectPrimary = createSelector(
    [selectDomain],
    connectViewState => connectViewState.primary,
);

export const selectFunding = createSelector(
    [selectDomain],
    connectViewState => connectViewState.funding,
);

export const selectConfirmedStored = createSelector(
    [selectDomain],
    connectViewState => connectViewState.confirmedStored,
);

export const selectConfirmedPermanent = createSelector(
    [selectDomain],
    connectViewState => connectViewState.confirmedPermanent,
);

export const selectPathBase = createSelector(
    [selectDomain],
    connectViewState => connectViewState.pathBase,
);
