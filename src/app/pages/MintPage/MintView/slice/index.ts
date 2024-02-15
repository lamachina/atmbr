import { PayloadAction } from '@reduxjs/toolkit';
import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { mintviewSaga } from './saga';
import { MintViewState, MintViewErrorType } from './types';

export const initialState: MintViewState = {
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'mintViewState',
  initialState,
  reducers: {
    changeName(state, action: PayloadAction<string>) {},
    loadRealms(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    reposLoaded(state) {},
    repoError(state, action: PayloadAction<MintViewErrorType>) {},
    realmInfoLoaded(state, action: PayloadAction<Repo[]>) {},
  },
});

export const { actions: profileOverviewActions, reducer } = slice;

export const useMintViewState = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: mintviewSaga });
  return { actions: slice.actions };
};
