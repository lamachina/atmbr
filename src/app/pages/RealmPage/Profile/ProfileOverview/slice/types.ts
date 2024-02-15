import { Repo } from 'types/Repo';

/* --- STATE --- */
export interface ProfileOverviewState {
  name: string;
  loading: boolean;
  error?: ProfileErrorType | null;
  repositories: Repo[];
  realmInfo: any;
  delegateInfo: any;
  profileData: any;
  urnPfp: any;
}

export const enum ProfileErrorType {
  RESPONSE_ERROR = 1,
  REALM_NOT_FOUND = 2,
  REALMNAME_EMPTY = 3,
  USER_HAS_NO_REPO = 4,
  GITHUB_RATE_LIMIT = 5,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = ProfileOverviewState;
