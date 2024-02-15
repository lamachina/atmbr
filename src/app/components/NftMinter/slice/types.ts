import { UTXO } from 'utils/builder/services/electrum-api.interface';
import { Repo } from 'types/Repo';

export interface MintStatusResult {
  commitNonces?: number;
  commitTxid?: string;
  commitRawtx?: string;
  revealTxid?: string;
  revealRawtx?: string;
  atomicalId?: string;
  startTime?: number;
  unixtime?: number;
  success?: boolean;
}

/* --- STATE --- */
export interface NftMinterState {
  name?: string;
  estimateFee?: any;
  fundingDepositUtxo?: UTXO;
  requiredFundingSatoshis: number;
  realmMintResult?: MintStatusResult;
  realmMintProgressNonces: number;
  commitBroadcastLog: Array<{
    item: any;
  }>;
  revealBroadcastLog: Array<{
    item: any;
  }>;
  mintStarted: boolean;
  nftType: 'realm' | 'subrealm' | 'container' | 'normal';
  loading: boolean;
  error?: NftMinterErrorType | null
}

export const enum NftMinterErrorType {
  GENERAL_ERROR = 1,
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = NftMinterState;
