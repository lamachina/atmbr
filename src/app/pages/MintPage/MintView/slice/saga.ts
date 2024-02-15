import { put, select, takeLatest, delay } from 'redux-saga/effects';
import { profileOverviewActions as actions } from '.';
import { MintViewErrorType } from './types';
import { ElectrumApiInterface } from 'utils/builder/services/electrum-api.interface';
import { ElectrumApiFactory } from 'utils/builder/services/electrum-api-factory';
import { mockSearchRealmNameAndStatus } from './mocks';
import { selectPrimaryAddress } from 'app/slice/selectors';
import { detectAddressTypeToScripthash } from 'utils/builder/helpers/address-helpers';
  

/**
 * Root saga manages watcher lifecycle
 */
export function* mintviewSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  // yield takeLatest(actions.loadRealms.type, getRealms);
}
