/* eslint-disable import/first */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ConnectViewState } from './types';
import * as bip39 from 'bip39';
var Buffer = require('buffer/').Buffer; // note: the trailing slash is important!
window['Buffer'] = window['Buffer'] || Buffer;
window['bitcoin'] = window['bitcoin'] || {};
// eslint-disable-next-line import/first
//import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import * as ecc from '@bitcoinerlab/secp256k1';
// eslint-disable-next-line import/first
window['bitcoin'].initEccLib(ecc);
var bitcoin = window['bitcoin'];
// eslint-disable-next-line import/first
import { createKeyPair, toXOnly } from 'utils/create-key-pair';
// eslint-disable-next-line import/first
import { getConnectSaga } from './saga';
// eslint-disable-next-line import/first
import { useInjectSaga } from 'redux-injectors';

export const generateKeysFromPhrase = async (phrase, path = `m/44'/0'/0'/0/0`): Promise<any> => {
  const ecPairPrimary = await createKeyPair(phrase, path);
  const childNodeXOnlyPubkeyPrimary = toXOnly(Buffer.from(ecPairPrimary.publicKey, 'hex'));
  const p2trPrimary = bitcoin.payments.p2tr({
    internalPubkey: childNodeXOnlyPubkeyPrimary,
  });

  if (!p2trPrimary.address || !p2trPrimary.output) {
    throw new Error('error creating p2tr primary');
  }

  return {
    phrase,
    addressPublicKey: ecPairPrimary.publicKey,
    addressPrivateKey: ecPairPrimary.privateKey,
    address: p2trPrimary.address,
    addressPath: path,
  };
};

export const initialState: ConnectViewState = {
  phrase: '',
  isValidPhrase: false,
  primary: {
    address: '',
    addressPath: '',
    addressPrivateKey: '',
    addressPublicKey: '',
  },
  funding: {
    address: '',
    addressPath: '',
    addressPrivateKey: '',
    addressPublicKey: '',
  },
  pathBase: `m/86'/0'/0'`,
  confirmedPermanent: false,
  confirmedStored: false,
  showLoginConfirm: 'CONNECT',
  newPassword: '',
  confirmPassword: '',
  isValidPassword: false,
  privKeyCipherText: '',
};

const slice = createSlice({
  name: 'connectViewState',
  initialState,
  reducers: {
    changePhrase(state, action: PayloadAction<string>) {
      throw new Error('not used anymore');
    },

    generateProfile(state) {
      throw new Error('not used anymore');
    },

    setChangePhrase(state, action) {
      const generatedKeys: any = action.payload;
      state.isValidPhrase = bip39.validateMnemonic(generatedKeys.phrase);
      state.phrase = generatedKeys.phrase;
      const primary = generatedKeys.primary;
      state.primary = {
        address: primary.address,
        addressPath: primary.addressPath,
        addressPrivateKey: primary.addressPrivateKey,
        addressPublicKey: primary.addressPublicKey,
      };
      const funding = generatedKeys.funding;
      state.funding = {
        address: funding.address,
        addressPath: funding.addressPath,
        addressPrivateKey: funding.addressPrivateKey,
        addressPublicKey: funding.addressPublicKey,
      };
    },

    setGenerateProfile(state, action) {
      const generatedKeys: any = action.payload;
      state.isValidPhrase = bip39.validateMnemonic(generatedKeys.phrase);
      state.phrase = generatedKeys.phrase;
      const primary = generatedKeys.primary;
      state.primary = {
        address: primary.address,
        addressPath: primary.addressPath,
        addressPrivateKey: primary.addressPrivateKey,
        addressPublicKey: primary.addressPublicKey,
      };
      const funding = generatedKeys.funding;
      state.funding = {
        address: funding.address,
        addressPath: funding.addressPath,
        addressPrivateKey: funding.addressPrivateKey,
        addressPublicKey: funding.addressPublicKey,
      };
      state.showLoginConfirm = 'GENERATED';
    },

    triggerGenerateProfile(state) {},

    triggerChangePhrase(state, action: PayloadAction<{ phrase: string }>) {},

    changePathBase(state, action: PayloadAction<{ pathBase: string }>) {
      state.pathBase = action.payload.pathBase;
    },

    changeConfirmPermanent(state, action: PayloadAction<boolean>) {
      state.confirmedPermanent = action.payload;
    },

    changeConfirmStored(state, action: PayloadAction<boolean>) {
      state.confirmedStored = action.payload;
    },

    changePassword(state, action: PayloadAction<string>) {
      state.newPassword = action.payload;
    },

    changePasswordConfirm(state, action: PayloadAction<string>) {
      state.confirmPassword = action.payload;
    },

    onAccept(state: any) {
      state.showLoginConfirm = 'PASSWORD';
    },

    clear(state: any) {
      state.phrase = '';
      state.isValidPhrase = false;
      state.primary = {};
      state.funding = {};
      state.confirmedPermanent = false;
      state.confirmedStored = false;
      state.showLoginConfirm = 'CONNECT';
      state.newPassword = '';
      state.confirmPassword = '';
      state.isValidPassword = false;
      state.privKeyCipherText = '';
    },
  },
});

export const { actions: connectViewActions, reducer } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: getConnectSaga });
  return { actions: slice.actions };
};
