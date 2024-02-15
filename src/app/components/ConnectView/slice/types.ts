export interface ConnectViewState {
    phrase: string;
    isValidPhrase: boolean;
    pathBase: string;
    primary: {
        address: string;
        addressPath: string;
        addressPrivateKey: string;
        addressPublicKey: string;
    };
    funding: {
        address: string;
        addressPath: string;
        addressPrivateKey: string;
        addressPublicKey: string;
    };
    confirmedPermanent: boolean;
    confirmedStored: boolean;
    showLoginConfirm: string | 'CONNECT' | 'GENERATED' | 'PASSWORD';
    newPassword: string;
    confirmPassword: string;
    isValidPassword: boolean;
    privKeyCipherText: string;
}

export enum LoadErrorType {
    RESPONSE_ERROR = 1,
    NOT_FOUND = 2,
}
/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = ConnectViewState;
