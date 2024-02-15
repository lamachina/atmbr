export interface MintViewState {
  loading: boolean;
  error?: MintViewErrorType | null;
}

export const enum MintViewErrorType {
  GENERAL_ERROR = 1,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = MintViewState;
