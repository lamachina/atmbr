import * as React from 'react';
import styled from 'styled-components/macro';
import Modal from 'react-modal';
import { DecryptWalletForm } from './DecryptWalletForm';

interface Props {
  isOpen?: any;
  onCloseModal?: any;
  sha256d?: string;
  onWalletDecrypted: Function;
}

export function DecryptWalletModal({ isOpen, onCloseModal, sha256d, onWalletDecrypted }: Props) {
  Modal.setAppElement('#root');
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0px',
      maxWidth: '768px',
      borderRadius: '10px',
      backgroundColor: '#000',
      borderColor: 'rgb(60, 16, 105)',
      border: '2px solid rgb(60, 16, 105)',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 10px 20px',
      className: 'modal-responsive-fullscreen',
      zIndex: '9999',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }, 
  };

  return (
    <Wrapper className="added-item-modal-wrapper shadow-lg">
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Decrypt Wallet"
        portalClassName="modal-base"
      >
        <DecryptWalletForm sha256d={sha256d as any} onWalletDecrypted={onCloseModal} />
      </Modal>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  z-index: 999999;
`;
