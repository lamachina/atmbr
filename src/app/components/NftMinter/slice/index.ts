import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { NftMinterErrorType, NftMinterState } from './types';
import { nftMinterSaga } from './saga';

export const initialState: NftMinterState = {
  name: '',
  estimateFee: undefined,
  fundingDepositUtxo: undefined,
  requiredFundingSatoshis: 0,
  realmMintResult: {
    commitNonces: 0,
    commitTxid: undefined,
    commitRawtx: undefined,
    revealTxid: undefined,
    revealRawtx: undefined,
    atomicalId: undefined,
    startTime: undefined,
    unixtime: undefined,
    success: false,
  },
  realmMintProgressNonces: 0,
  commitBroadcastLog: [],
  revealBroadcastLog: [],
  mintStarted: false,
  nftType: 'realm',
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'nftMinterState',
  initialState,
  reducers: {
 
    setMintName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },

    clearError(state) {
      state.error = undefined;
    },

    initMintResult(state) {
      state.realmMintResult = Object.assign({}, {}, initialState.realmMintResult);
      state.mintStarted = false;
      state.fundingDepositUtxo = undefined;
      state.requiredFundingSatoshis = 0;
    },

    setMintSuccess(state, action: PayloadAction<any>) {
      state.realmMintResult = Object.assign({}, state.realmMintResult, {
        commitTxid: action.payload.commitTxid,
        revealTxid: action.payload.revealTxid,
        atomicalId: action.payload.atomicalId,
        success: true,
      });
    },

    setMintProgressNonces(state, action: PayloadAction<number>) {
      state.realmMintProgressNonces = action.payload;
    },


    getEstimateFee(state) {},
    getRequiredSatoshisAmount(state) {},
    startMint(
      state,
      action: PayloadAction<{
        realmName: string;
        initialAddress: string;
        satoshisRequired: number;
        fundingWIF: string; 
      }>
    ) {
      state.mintStarted = true;
    },

    mintStopped(state) {
      state.mintStarted = false;
    },

    getFundingDepositUtxo(state, action: PayloadAction<{ address?: string; satoshis?: number }>) {},

    setRequiredFundingSatoshis(state, action: PayloadAction<number>) {
      state.requiredFundingSatoshis = action.payload;
    },

    setFundingDepositUtxo(state, action: PayloadAction<any>) {
      state.fundingDepositUtxo = action.payload;
    },

    setRealmMintResult(state, action: PayloadAction<any>) {
      state.realmMintResult = action.payload;
    },

    estimateFeeLoaded(state, action: PayloadAction<any>) {
      state.estimateFee = action.payload;
    },
    setError(state, action: PayloadAction<NftMinterErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: nftMinterActions, reducer } = slice;

export const useNftMinterSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: nftMinterSaga });
  return { actions: slice.actions };
};
