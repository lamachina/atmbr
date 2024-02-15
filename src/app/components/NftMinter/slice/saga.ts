import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { nftMinterActions as actions } from '.';
import {
  ElectrumApiInterface,
  filterUtxosForAtomicals,
} from 'utils/builder/services/electrum-api.interface';
import {
  ElectrumApiFactory,
  ElectrumApiMockFactory,
} from 'utils/builder/services/electrum-api-factory';
import { NftMinterErrorType } from './types';
import { Atomicals } from 'utils/builder/atomicals-api';
import { BaseRequestOptions } from 'utils/builder/atomicals-api.interface';
import { CommandInterface } from 'utils/builder/commands/command.interface';
import { MintInteractiveRealmCommand } from 'utils/builder/commands/mint-interactive-realm-command';
import { selectEstimateFee, selectName } from './selectors';
import { selectDecryptedFundingKey, selectPrimaryAddress } from 'app/slice/selectors';
import {
  AtomicalOperationBuilder,
  AtomicalsOperationResult,
} from 'utils/builder/atomical-operation-builder';
import { CommandResultInterface } from 'utils/builder/commands/command-result.interface';
import eventEmitter from './eventEmitter';

const remoteElectrumxUrl = process.env.REACT_APP_ELECTRUMX_PROXY_BASE_URL;
export function* getEstimateFeeRequest() {
  yield delay(400);
  let client: ElectrumApiInterface;
  const mockFactory = new ElectrumApiMockFactory(undefined);
  const factory = new ElectrumApiFactory(remoteElectrumxUrl + '', mockFactory.getMock());
  client = factory.create();
  try {
    const res = yield client.estimateFee(1);
    yield put(actions.estimateFeeLoaded(res.result));
    yield put(actions.getRequiredSatoshisAmount());
  } catch (err: any) {
    yield put(actions.setError(NftMinterErrorType.GENERAL_ERROR));
  }
}

export function* getRequiredSatoshisAmountRequest() {
  const feeEstimate = yield select(selectEstimateFee);
  const primaryAddress = yield select(selectPrimaryAddress);
  let client: ElectrumApiInterface;
  const mockFactory = new ElectrumApiMockFactory(undefined);
  const factory = new ElectrumApiFactory(remoteElectrumxUrl + '', mockFactory.getMock());
  client = factory.create();
  let estimatedSatsByte = Math.ceil((feeEstimate / 1000) * 100000000);
  if (isNaN(estimatedSatsByte)) {
    estimatedSatsByte = 30; // Something went wrong, just default to 30 bytes sat estimate
  }
  const options: BaseRequestOptions = {
    satsbyte: estimatedSatsByte + 1,
    satsoutput: 1000,
    bitworkc: '7777',
  };
  const fundingWIFCallback = () => {
    return 'Kx3QSEdEVjxSCqPevx8LtpoNzx3hKTwdC7Yso1SHaka1Z6jwg6Mh'; // mock sample to simulate fee
  };
  const address = primaryAddress;
  // Get the atomicals operation builder
  const command: CommandInterface = new MintInteractiveRealmCommand(
    client,
    'a01234567890123456789', // Just simulate with a long realm name
    address,
    fundingWIFCallback,
    options,
    true
  );
  const result: AtomicalOperationBuilder = yield command.run();
  const startSetup = yield result.prepareStartSetup();
  yield put(actions.setRequiredFundingSatoshis(startSetup.fees.commitAndRevealFeePlusOutputs));
}

export function* getFundingDepositUtxoRequest(action) {
  yield delay(200);
  let client: ElectrumApiInterface;
  const mockFactory = new ElectrumApiMockFactory(undefined);
  const factory = new ElectrumApiFactory(remoteElectrumxUrl + '', mockFactory.getMock());
  client = factory.create();
  try {
    const { address, satoshis } = action.payload;
    console.log('getFundingDepositRequest', action.payload);
    const response: any = yield client.getUnspentAddress(address);
    const utxos = response.utxos;
    const utxo = filterUtxosForAtomicals(utxos, satoshis, false);
    if (utxo) {
      yield put(actions.setFundingDepositUtxo(utxo));
    }
  } catch (err: any) {
    yield put(actions.setError(NftMinterErrorType.GENERAL_ERROR));
  }
}

export function* startMintRequest(action) {
  yield delay(200);
  const feeEstimate = yield select(selectEstimateFee);
  const primaryAddress = yield select(selectPrimaryAddress);
  const realmName = yield select(selectName);
  const decryptedFundingKey = yield select(selectDecryptedFundingKey);
  let client: ElectrumApiInterface;
  const mockFactory = new ElectrumApiMockFactory(undefined);
  const factory = new ElectrumApiFactory(remoteElectrumxUrl + '', mockFactory.getMock());
  client = factory.create();
  let estimatedSatsByte = Math.ceil((feeEstimate / 1000) * 100000000);
  if (isNaN(estimatedSatsByte)) {
    estimatedSatsByte = 200; // Something went wrong, just default to 30 bytes sat estimate
  }

  function callbackProgress(progress) {
    console.log('callbackProgress', progress);
    eventEmitter.emit('MINT_OPERATION', progress);
  }

  const options: BaseRequestOptions = {
    satsbyte: estimatedSatsByte + 1,
    satsoutput: 1000,
    bitworkc: '7777',
    sleepEvery: 10,
    callbackProgress: p => callbackProgress(p),
  };
  const fundingWIFCallback = () => {
    return decryptedFundingKey; // mock sample to simulate fee
  };
  const address = primaryAddress;
  // Get the atomicals operation builder
  const command: CommandInterface = new MintInteractiveRealmCommand(
    client,
    realmName, // Just simulate with a long realm name
    address,
    fundingWIFCallback,
    options
  );
  try {
    const result: CommandResultInterface = yield command.run();
    if (!result || !result.success) {
      throw new Error('Error minting: ' + result);
    }
    const mintInformation: AtomicalsOperationResult = result.data.data;
    console.log('mintInformation', mintInformation);
    yield put(actions.setMintSuccess(mintInformation));
  } catch (err: any) {
    yield put(actions.setError(NftMinterErrorType.GENERAL_ERROR));
    yield put(actions.mintStopped());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* nftMinterSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getEstimateFee.type, getEstimateFeeRequest);
  yield takeLatest(actions.getFundingDepositUtxo.type, getFundingDepositUtxoRequest);
  yield takeLatest(actions.getRequiredSatoshisAmount.type, getRequiredSatoshisAmountRequest);
  yield takeLatest(actions.startMint.type, startMintRequest);
}
