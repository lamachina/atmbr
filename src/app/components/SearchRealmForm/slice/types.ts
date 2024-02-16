import { Repo } from 'types/Repo';

/* --- STATE --- */
export interface SearchRealmFormState {
  name: string;
  loading: boolean;
  error?: SearchRealmErrorType | null;
  repositories: Repo[];
  realmInfo: any;
  delegateInfo: any;
  profileData: any;
  urnPfp: any;
}

export const enum SearchRealmErrorType {
  RESPONSE_ERROR = 1,
  REALM_NOT_FOUND = 2,
  REALMNAME_EMPTY = 3,
  REALM_NAME_INVALID = 4,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = SearchRealmFormState;
