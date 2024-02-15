import { put, select, takeLatest, delay } from 'redux-saga/effects';
import { profileOverviewActions as actions } from '.';
import { RealmsViewErrorType } from './types';
import {
  ElectrumApiFactory,
  ElectrumApiMockFactory,
} from 'utils/builder/services/electrum-api-factory';
import { selectPrimaryAddress } from 'app/slice/selectors';
import { ElectrumApiInterface } from 'utils/builder/services/electrum-api.interface';
import { getMockApi } from './mock-api';
import { detectAddressTypeToScripthash } from 'utils/builder/helpers/address-helpers';

const remoteElectrumxUrl = process.env.REACT_APP_ELECTRUMX_PROXY_BASE_URL;

export function* getRealms() {
  yield delay(200);
  // Select username from store
  const primaryAddress: string = yield select(selectPrimaryAddress);
  console.log('primaryAddress', primaryAddress);
  const { scripthash } = detectAddressTypeToScripthash(primaryAddress);
  let client: ElectrumApiInterface;
  const mockFactory = new ElectrumApiMockFactory(getMockApi());
  const factory = new ElectrumApiFactory(remoteElectrumxUrl + '', mockFactory.getMock());
  client = factory.create();
  try {
    const atomicalsInfo = yield client.atomicalsByScripthash(scripthash);
    yield put(actions.setAtomicals(atomicalsInfo.atomicals));
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(RealmsViewErrorType.GENERAL_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.repoError(RealmsViewErrorType.GENERAL_ERROR));
    } else {
      yield put(actions.repoError(RealmsViewErrorType.GENERAL_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* realmsViewSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadRealms.type, getRealms);
}
