import { PayloadAction } from '@reduxjs/toolkit';
import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { profileOverviewSaga } from './saga';
import { ProfileOverviewState, ProfileErrorType } from './types';

export const initialState: ProfileOverviewState = {
  name: '',
  repositories: [],
  loading: false,
  error: null,
  realmInfo: null,
  delegateInfo: null,
  profileData: null,
  urnPfp: ''
};

const slice = createSlice({
  name: 'profileOverview',
  initialState,
  reducers: {
    changeName(state, action: PayloadAction<string>) {
      state.realmInfo = null;
      state.name = action.payload;
    },
    loadRepos(state) {
      state.loading = true;
      state.error = null;
      state.repositories = [];
    },
    reposLoaded(state, action: PayloadAction<Repo[]>) {
      const repos = action.payload;
      state.repositories = repos;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<ProfileErrorType>) {
      state.error = action.payload;
      state.realmInfo = null;
      state.loading = false;
    },
    realmInfoLoaded(state, action: PayloadAction<Repo[]>) {
      const realmInfo: any = action.payload;
      state.realmInfo = realmInfo.result;
      state.loading = false;
    },
    delegateInfoLoaded(state, action: PayloadAction<Repo[]>) {
      const delegateInfo: any = action.payload;
      state.delegateInfo = delegateInfo.result;
      state.loading = false;
    },
    profileDataLoaded(state, action: PayloadAction<Repo[]>) {
      const profileData: any = action.payload;
      state.profileData = profileData;
      state.loading = false;
    },
    urnPfpLoaded(state, action: PayloadAction<string>) {
      const urnPfp: string = action.payload;
      state.urnPfp = urnPfp;
      state.loading = false;
    },
  },
});

export const { actions: profileOverviewActions, reducer } = slice;

export const useProfileOverviewSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileOverviewSaga });
  return { actions: slice.actions };
};
