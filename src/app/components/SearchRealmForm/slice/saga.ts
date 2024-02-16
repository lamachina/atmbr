import { put, select, takeLatest, delay } from 'redux-saga/effects';
import { selectName } from './selectors';
import { githubRepoFormActions as actions } from '.';
import { SearchRealmErrorType } from './types';
import { ElectrumApiInterface } from 'utils/builder/services/electrum-api.interface';
import {
  ElectrumApiFactory,
  ElectrumApiMockFactory,
} from 'utils/builder/services/electrum-api-factory';
import { getMockApi } from './mock-api';
import { isValidRealmName, isValidSubRealmName } from 'utils/builder/atomical-format-helpers';
import { extractAtomicalsidFromUrl } from 'utils/helpers';

const remoteElectrumxUrl = process.env.REACT_APP_ELECTRUMX_PROXY_BASE_URL;

export function* getRealmInfoRequest() {
  yield delay(200);
  // Select name from store
  const name: string = yield select(selectName);
  if (name.length === 0) {
    yield put(actions.repoError(SearchRealmErrorType.REALMNAME_EMPTY));
    return;
  }
  try {
    //isValidSubRealmName(name);
  } catch (err) {
    console.log(err);
    yield put(actions.repoError(SearchRealmErrorType.REALM_NAME_INVALID));
    return;
  }
  let client: ElectrumApiInterface;
  const mockFactory = new ElectrumApiMockFactory(getMockApi());
  const factory = new ElectrumApiFactory(remoteElectrumxUrl + '', mockFactory.getMock());
  client = factory.create();
  try {
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
        console.log(dataD);
        const processedDataD =
        dataD.startsWith("atom:")
          ? extractAtomicalsidFromUrl(dataD)
          : dataD;
          console.log(processedDataD);
          
        const profileInfo = yield client.atomicalsGetStateHistory(processedDataD);
        console.log(profileInfo);
        if (
          profileInfo &&
          profileInfo.result &&
          profileInfo.result.state &&
          profileInfo.result.state.history &&
          profileInfo.result.state.history.length > 0
        ) {
          const profileData = profileInfo.result.state.history[0].data;
          const pfpDelegate = profileData?.image;
          console.log(pfpDelegate);
          
          const urnPfp = extractAtomicalsidFromUrl(pfpDelegate);
          console.log(urnPfp);
          
          if(urnPfp){
            
            yield put(actions.urnPfpLoaded(urnPfp));
          }
          yield put(actions.profileDataLoaded(profileData));
        }
        
        // Enregistrez d'autres données si nécessaire
        yield put(actions.realmInfoLoaded(atomicalInfo));
        yield put(actions.delegateInfoLoaded(delegateInfo));
      }else {
        yield put(actions.repoError(SearchRealmErrorType.REALM_NOT_FOUND));
      }
    } else {
      yield put(actions.repoError(SearchRealmErrorType.REALM_NOT_FOUND));
    }
    yield client.close();
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(SearchRealmErrorType.REALM_NOT_FOUND));
    } else {
      yield put(actions.repoError(SearchRealmErrorType.RESPONSE_ERROR));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* searchRealmFormSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getRealmInfo.type, getRealmInfoRequest);
}
