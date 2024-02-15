/* eslint-disable import/first */
/* eslint-disable prettier/prettier */
var Buffer = require('buffer').Buffer;
window['Buffer'] = window['Buffer'] || Buffer;
window['bitcoin'] = window['bitcoin'] || {};
// eslint-disable-next-line import/first
//import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import * as ecc from '@bitcoinerlab/secp256k1';
// eslint-disable-next-line import/first
window['bitcoin'].initEccLib(ecc);
const crypto = require('crypto-browserify');
const bip39 = require('bip39');

export function createMnemonicPhrase() {
    const randomBytes = crypto.randomBytes(16); // 128 bits is enough
    const mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'));
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error('Invalid mnemonic generated!');
    }
    return {
        phrase: mnemonic,
    };
}
