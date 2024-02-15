import { put, select, takeLatest, delay } from 'redux-saga/effects';
import { profileOverviewActions as actions } from '.';
import { ProfileErrorType } from './types';
import { ElectrumApiInterface } from 'utils/builder/services/electrum-api.interface';
import { ElectrumApiFactory } from 'utils/builder/services/electrum-api-factory';
import { mockSearchRealmNameAndStatus } from './mocks';
import { selectName } from './selectors';
import { extractAtomicalsidFromUrl } from 'utils/helpers';

const remoteElectrumxUrl = process.env.REACT_APP_ELECTRUMX_PROXY_BASE_URL;
/**
 * Github repos request/response handler
 */
export function* getRepos() {
  yield delay(200);
  // Select username from store
  const name: string = yield select(selectName);
  if (name.length === 0) {
    yield put(actions.repoError(ProfileErrorType.REALMNAME_EMPTY));
    return;
  }
  let client: ElectrumApiInterface;
  let apiMock: ElectrumApiInterface | undefined = undefined
  if (process.env.REACT_APP_ELECTRUMX_API_MOCK === 'true') {
    if (name === 'notfound') {
      apiMock = mockSearchRealmNameAndStatus(true)
    } else {
      apiMock = mockSearchRealmNameAndStatus()
    }
  }
  const factory = new ElectrumApiFactory(remoteElectrumxUrl + '', apiMock)
  client = factory.create();
  yield client.open();
  try {
    // Call our request helper (see 'utils/request')
    const res = yield client.atomicalsGetRealmInfo(name);
    console.log('result', res);
    if (res && res.result && res.result.atomical_id) {
      const res = yield client.atomicalsGetRealmInfo(name);
      if (res && res.result && res.result.atomical_id) {
        //const data
        const atomicalInfo = yield client.atomicalsGetLocation(res.result.atomical_id);
        const delegateInfo = yield client.atomicalsGetStateHistory(res.result.atomical_id);
        if (
          delegateInfo &&
          delegateInfo.result &&
          delegateInfo.result.state &&
          delegateInfo.result.state.history &&
          delegateInfo.result.state.history.length > 0
        ) {
          // Obtenez la valeur de 'd' de la première entrée dans l'historique d'état
          const dataD = delegateInfo.result.state.history[0].data.d;
          const profileInfo = yield client.atomicalsGetStateHistory(dataD);
          if (
            profileInfo &&
            profileInfo.result &&
            profileInfo.result.state &&
            profileInfo.result.state.history &&
            profileInfo.result.state.history.length > 0
          ) {
            const profileData = profileInfo.result.state.history[0].data;
            const pfpDelegate = profileData?.image;
            const urnPfp = extractAtomicalsidFromUrl(pfpDelegate);
            if(urnPfp){
              yield put(actions.urnPfpLoaded(urnPfp));
            }

            yield put(actions.profileDataLoaded(profileData));
          }
          
          // Enregistrez d'autres données si nécessaire
          yield put(actions.realmInfoLoaded(atomicalInfo));
          yield put(actions.delegateInfoLoaded(delegateInfo));
        } else {
          yield put(actions.repoError(ProfileErrorType.NOT_PROFIL));
        }
      }
    } else {
      yield put(actions.repoError(ProfileErrorType.REALM_NOT_FOUND));
    }
    yield client.close();
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(ProfileErrorType.REALM_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.repoError(ProfileErrorType.GITHUB_RATE_LIMIT));
    } else {
      yield put(actions.repoError(ProfileErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* profileOverviewSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadRepos.type, getRepos);
}
