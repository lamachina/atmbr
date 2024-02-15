/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { selectRequiredFundingSatoshis, selectFundingDepositUtxo, selectMintStarted, selectRealmMintResult, selectRealmMintProgressNonces } from './slice/selectors';
import { useNftMinterSlice } from './slice';
import {
  selectDecryptedFundingKey,
  selectFundingAddress,
  selectSha256d,
} from 'app/slice/selectors';
import { PaymentCode } from './PaymentCode';
import { UTXO } from 'utils/builder/services/electrum-api.interface';
import { InitiateMint } from './InitiateMint';
import { PaymentSettings } from './PaymentSettings';
import { MintInProcess } from './MintInProcess';
import { A } from '../A';
import { DecryptWalletModal } from '../DecryptWalletModal';
import { MintResultSuccess } from './MintResultSuccess';
import { MintResultError } from './MintResultError';
import { put } from 'redux-saga/effects';
import eventEmitter from './slice/eventEmitter'
import { MintStatus } from './MintStatus';
const CHECK_FUNDING_UTXO_TIME = 7000;

interface Props {
  name: string;
  primaryAddress: string;
}

export function NftMinter({ name, primaryAddress }: Props) {
  const { actions } = useNftMinterSlice();
  const sha256d = useSelector(selectSha256d);
  const decryptedFundingKey = useSelector(selectDecryptedFundingKey);
  const realmMintResult = useSelector(selectRealmMintResult);
  const [isDecryptWalletModalOpen, setDecryptWalletModalOpen] = React.useState(false);

  const dispatch = useDispatch();
  const fundingAddress = useSelector(selectFundingAddress);
  const realmMintProgressNonces = useSelector(selectRealmMintProgressNonces);
  const requiredFundingSatoshis: number = useSelector(selectRequiredFundingSatoshis);
  const mintStarted: boolean = useSelector(selectMintStarted);
  const fundingDepositUtxo: UTXO | any = useSelector(selectFundingDepositUtxo);
  let intervalFundingDeposit = useRef();

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
    //dispatch(actions.clearError());
    dispatch(actions.setMintName(name))
  };

  // Onload ensure we get the estimated fee rate and the required Satoshis
  useEffectOnMount(() => {
    dispatch(actions.getRequiredSatoshisAmount());

  });

  useEffect(() => {
    if (!fundingDepositUtxo || !fundingDepositUtxo.txid) {
      return;
    }
    if (intervalFundingDeposit) {
      clearInterval(intervalFundingDeposit.current);
    }

  }, [fundingDepositUtxo, intervalFundingDeposit])

  useEffect(() => {
    eventEmitter.on(
      "MINT_OPERATION",
      (progress) => {
        // latest percent available here, and will fire every time its updated
        // do with it what you need, i.e. update local state, store state, etc
        console.log('progress', progress);
        if (progress.nonces) {
          dispatch(actions.setMintProgressNonces(progress.nonces))
        }
      }
    );

    // stop listening on unmount
    return function cleanup() {
      eventEmitter.off("MINT_OPERATION")
    }
  }, [])

  useEffect(() => {
    if (fundingAddress && requiredFundingSatoshis) {
      console.log(`Starting to getFundingDepositUtxo and initiate interval every ${CHECK_FUNDING_UTXO_TIME} ms`)
      dispatch(
        actions.getFundingDepositUtxo({
          address: fundingAddress,
          satoshis: requiredFundingSatoshis,
        })
      );
      intervalFundingDeposit.current = setInterval(() => {
        console.log('Checking for deposit...', fundingAddress, requiredFundingSatoshis);
        dispatch(
          actions.getFundingDepositUtxo({
            address: fundingAddress,
            satoshis: requiredFundingSatoshis,
          })
        );
      }, CHECK_FUNDING_UTXO_TIME) as any;

      return () => {
        console.log('Clearing the interval to check funding deposit...');
        clearInterval(intervalFundingDeposit.current);
      };
    }
  }, [actions, dispatch, fundingAddress, requiredFundingSatoshis])

  useEffectOnMount(() => {
    dispatch(actions.getEstimateFee());
  });

  const getAddressLink = (address: string): string => {
    if (!address) {
      return '';
    }
    return 'https://mempool.space/address/' + address;
  }

  const onStartMint = async () => {
    dispatch(actions.initMintResult())
    dispatch(actions.startMint({
      realmName: name as any,
      initialAddress: primaryAddress as any,
      satoshisRequired: requiredFundingSatoshis,
      fundingWIF: decryptedFundingKey as any
    }));
  }

  const isMintSuccess = () => {
    if (realmMintResult && realmMintResult.success) {
      return true;
    }
    return false;
  }

  const isMintError = () => {
    return false;
  }

  const onDecryptWallet = async () => {
    setDecryptWalletModalOpen(true)
  }

  const onWalletDecrypted = async () => {
  }

  const getFundingUtxoLink = () => {
    if (fundingDepositUtxo) {
      return 'https://mempool.space/tx/' + fundingDepositUtxo.txid
    }
  }
  return (
    <Wrapper className=" border rounded-3 bg-body-secondary" >
      <DecryptWalletModal
        isOpen={isDecryptWalletModalOpen}
        sha256d={sha256d}
        onCloseModal={() => setDecryptWalletModalOpen(false)}
        onWalletDecrypted={onWalletDecrypted}
      />
      <div className="container">
        {mintStarted && !isMintSuccess() && <div className="row">
            <div className="col">
              <MintInProcess />
            </div>
          </div>
        }

        {mintStarted && !isMintSuccess() && <div className="row">
          <div className="col">
            <MintStatus progressNonces={realmMintProgressNonces} />
          </div>
        </div>}
      </div>

      {isMintSuccess() && <MintResultSuccess name={name} mintResult={realmMintResult} />}
      {isMintError() && <MintResultError mintResult={realmMintResult} />}


      {!mintStarted && <div >
        <WrapperBorder className="row p-4 p-md-5">
          <div className="col-md-6">
            <PaymentCode paymentAddress={fundingAddress as string} />
          </div>
          <div className="col-md-6">
            <PaymentSettings paymentAddress={fundingAddress as string} fundingDepositUtxo={fundingDepositUtxo} satoshis={requiredFundingSatoshis} />
          </div>
          <CenteredWrapper className="mt-3 mb-3">
            <CenterWrap>{fundingAddress}</CenterWrap>
          </CenteredWrapper>
          {!fundingDepositUtxo && <CenteredWrapper className="mt-1 mb-1">
            <A href={getAddressLink(fundingAddress as any)} target="_blank"> Awaiting funding payment...</A>
          </CenteredWrapper>}
          {fundingDepositUtxo && <>
            <DetectedFundingUtxo className="mt-3 mb-3">
              <A href={getFundingUtxoLink()} target="blank">Funding payment received!</A>
            </DetectedFundingUtxo>
            <InitiateMint expectedSatoshis={requiredFundingSatoshis} fundingDepositUtxo={fundingDepositUtxo} onStartMint={onStartMint} onDecryptWallet={onDecryptWallet} decryptedFundingKey={decryptedFundingKey} />
          </>}
        </WrapperBorder>
      </div>}

    </Wrapper>
  );
}

const MintStatusSection = styled.div`
  border-top: solid 1px #181818;
  display: flex;
  justify-content: center;
  color: #fff;
`

const DetectedFundingUtxo = styled.div`
  display: flex;
  justify-content: center;
  color: green;
  color: #ff914d;
`

const CenterWrap = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.8em;
  white-space: wrap;
`

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 100%;
  color: white;
  background-color: #000 !important;
  border: none !important;
  display: flex;
  justify-content: center;
  margin-top: 90px;

`;

const WrapperBorder = styled.div`
  width: 100%;
  color: white;
  background-color: #181818 !important;
  border: solid 2px rgb(60, 16, 105) !important;
  border-radius: 5px;
`;
