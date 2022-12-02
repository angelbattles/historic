//File that contains contract addresses and ABIs for the main contracts for AngelBattles.
//For contracts from AngelBattles 1.0 (ie, AngelCardData, PetCardData, etc, check the file LegacyCards.js)

import { carddata_contract_abi } from './ABI/CardDataABI';

var carddata_contract_address = '0x1D9711C7C67aCE347FF45661708AEAc4Bbb2aEd3';


let contract = null;

function getCardDataContract() {
  return contract;
}

function initContractsWithWeb3(web3) {
  contract = new web3.eth.Contract(
    carddata_contract_abi,
    carddata_contract_address
  );
}

export { getCardDataContract, initContractsWithWeb3 };
