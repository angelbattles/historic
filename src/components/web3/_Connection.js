import Web3 from 'web3';
import Portis from '@portis/web3';
import { initLegacyContracts } from './LegacyCards';
import { initContractsWithWeb3 } from './SolidityContracts';

let currentAddress = '0x0000000000000000000000000000000000000001';
//const portis = new Portis('db8a6364-423a-4abe-83f6-7177dc64a462', 'mainnet');
const portis = new Portis('fb10b2bc-e769-4c32-9704-67eddcb7744a', 'mainnet');
let web3 = null;
let ethereum = window.ethereum;

async function setMetaMaskWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      // Acccounts now exposed
      currentAddress = ethereum.selectedAddress;
      console.log(currentAddress);
      web3 = new Web3(Web3.givenProvider);
    } catch (error) {
      // User denied account access...
      alert(
        'In order to use metamask to interact with Angel Battles 2, you must tell metamask to allow to interact with Angel Battles 2 '
      );
    }
  }
  initLegacyContracts(web3);
  initContractsWithWeb3(web3);
  portis.logout();
}

function setLegacyWeb3() {
  if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    web3 = new Web3(Web3.givenProvider);
  }
}

//web3 = new Web3(portis.provider);

setMetaMaskWeb3();

console.log('Web3 instance: ', web3);

function getWeb3() {
  return web3;
}

async function setCurrentAddress() {
  console.log('inside setCurrentAddress');
  console.log(web3);
  currentAddress = web3.eth.getAccounts().then(function (accounts) {
    return accounts[0];
  });
  return currentAddress;
}

async function getCurrentAddress() {
  while (currentAddress === '0x0000000000000000000000000000000000000001') {
    currentAddress = await setCurrentAddress();
    console.log('Current Address: ', currentAddress);
  }
  return currentAddress;
}

export {
  web3,
  getWeb3,
  setMetaMaskWeb3,
  setLegacyWeb3,
  getCurrentAddress,
  currentAddress,
};
