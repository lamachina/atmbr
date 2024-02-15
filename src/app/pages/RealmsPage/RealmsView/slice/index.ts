import { PayloadAction } from '@reduxjs/toolkit';
import { Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { realmsViewSaga } from './saga';
import { RealmsViewState, RealmsViewErrorType, RealmSummary } from './types';

export const initialState: RealmsViewState = {
  atomicals: {},
  realms: [],
  requestRealms: [],
  subrealms: [],
  requestSubrealms: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'realmsViewState',
  initialState,
  reducers: {
    changeName(state, action: PayloadAction<string>) {},
    setAtomicals(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
      state.atomicals = action.payload;

      const realms: any = [];
      const requestRealms: any = [];
      const subrealms: any = [];
      const requestSubrealms: any = [];
      for (const atomicalId in action.payload) {
        if (!action.payload.hasOwnProperty(atomicalId)) {
          continue;
        }
        const atomical = action.payload[atomicalId];
        if (atomical.type === 'NFT' && atomical.subtype === 'realm') {
          realms.push(atomical);
        } else if (atomical.type === 'NFT' && atomical.subtype === 'request_realm') {
          requestRealms.push(atomical);
        } else  if (atomical.type === 'NFT' && atomical.subtype === 'subrealm') {
          subrealms.push(atomical);
        } else  if (atomical.type === 'NFT' && atomical.subtype === 'request_subrealm') {
          requestSubrealms.push(atomical);
        }
      }
      state.realms = realms;
      state.requestRealms = requestRealms;
      state.subrealms = subrealms;
      state.requestSubrealms = requestSubrealms;
    },
    loadRealms(state, action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
      state.realms = [];
    },
    reposLoaded(state, action: PayloadAction<RealmSummary[]>) {
      const repos = action.payload;
      state.realms = repos;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<RealmsViewErrorType>) {
      // state.error = action.payload;
      // state.realmInfo = null;
      // state.loading = false;
    },
    realmInfoLoaded(state, action: PayloadAction<Repo[]>) {
      // const realmInfo: any = action.payload;
      // state.realmInfo = realmInfo.result;
      // state.loading = false;
    },
  },
});

export const { actions: profileOverviewActions, reducer } = slice;

export const useRealmsViewSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: realmsViewSaga });
  return { actions: slice.actions };
};
