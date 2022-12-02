//This file contains contract information and utilities for Angel Battles 1.0 (Legacy) cards.
// For current contracts, please see the file SolidityContracts.js

//import Web3 from 'web3';
import { angelcarddata_contract_abi } from './ABI/AngelCardDataABI';
import { petcarddata_contract_abi } from './ABI/PetCardDataABI';
import { accessorycarddata_contract_abi } from './ABI/AccessoryCardDataABI';

const initLegacyContracts = (_web3, _currentAddress) => {
  web3 = _web3;
  currentAddress = _currentAddress;

  angelContract = new web3.eth.Contract(
    angelcarddata_contract_abi,
    angelcarddata_contract_address
  );


  petContract = new web3.eth.Contract(
    petcarddata_contract_abi,
    petcarddata_contract_address
  );

  accessoryContract = new web3.eth.Contract(
    accessorycarddata_contract_abi,
    accessorycarddata_contract_address
  );
};

let ownedAngelCount = 0;
let ownerAngels = [];
let angelIds = [];

let ownedPetCount = 0;
let ownerPets = [];
let petIds = [];

let ownedAccessoryCount = 0;
let ownerAccessories = [];
let accessoryIds = [];

let web3;
let currentAddress;

let angelContract;
let petContract;
let accessoryContract;

var angelcarddata_contract_address = "0x6d2e76213615925c5fc436565b5ee788ee0e86dc";
    
var petcarddata_contract_address = "0xB340686da996b8B3d486b4D27E38E38500A9E926";
  


var accessorycarddata_contract_address = "0x76177DCe92a8F69d7aDEACdf9aEda0F9a93a147d"



//Code for getting all legacy owned angels.
/****************************************************************************************** */

function getAngelContract() {
  return new web3.eth.Contract(
    angelcarddata_contract_abi,
    angelcarddata_contract_address
  );
}

function getPetContract() {
  return new web3.eth.Contract(
    petcarddata_contract_abi,
    petcarddata_contract_address
  );
}

function getAccessoryContract() {
  return new web3.eth.Contract(
    accessorycarddata_contract_abi,
    accessorycarddata_contract_address
  );
}

async function getAngelLockStatus(angelId) {
  return await angelContract.methods.getAngelLockStatus(angelId).call();
}

async function getAllAngels() {
  console.log('inside getall angels');

  ownedAngelCount = await angelContract.methods
    .getOwnerAngelCount(currentAddress)
    .call();

  angelIds = await getAngelIds(ownedAngelCount, currentAddress);

  ownerAngels = await getAngelArray(angelIds, currentAddress);

  return ownerAngels;
}

async function getAngelIds(ownedAngels, currentAddress) {
  let angelIds = [];
  let result = undefined;
  for (var i = 0; i < ownedAngels; i++) {
    result = await angelContract.methods
      .getAngelByIndex(currentAddress, i)
      .call();

    angelIds.push(result);
  }

  return angelIds;
}

async function getAngelArray(ownedAngels, currentAddress) {
  let ownerAngels = [];
  let result = undefined;
    console.log(ownedAngels)
  for (var i = 0; i < ownedAngels.length; i++) {
    result = await angelContract.methods.getAngel(ownedAngels[i]).call();
    console.log(result);
    //result will be all angels an address has EVER owned, so check if they currently own it.
    if (result.owner && result.owner.toUpperCase() === currentAddress.toUpperCase()) {
      ownerAngels.push(result);
    }
  }
    console.log('returning', ownerAngels)
  return ownerAngels;
}

//Code for getting all legacy owned pets.
/****************************************************************************************** */

async function getAllPets() {
  ownedPetCount = await getPetCount();

  petIds = await getPetIds(ownedPetCount);

  ownerPets = await getPetArray(petIds);

  return ownerPets;
}

async function getPetCount() {
  ownedPetCount = await petContract.methods
    .getOwnerPetCount(currentAddress)
    .call();
  return ownedPetCount;
}

async function getPetIds(ownedPets) {
  let petIds = [];
  let result = undefined;
  for (var i = 0; i < ownedPets; i++) {
    result = await petContract.methods.getPetByIndex(currentAddress, i).call();
    petIds.push(result);
  }

  return petIds;
}

async function getPetArray(ownedPets) {
  let ownerPets = [];
  let result = undefined;

  for (var i = 0; i < ownedPets.length; i++) {
    result = await petContract.methods.getPet(ownedPets[i]).call();

    if (result.owner.toUpperCase() === currentAddress.toUpperCase()) {
      ownerPets.push(result);
    }
  }

  return ownerPets;
}

//Code for getting all legacy owned Accessories.
/****************************************************************************************** */

async function getAccessoryLockStatus(accessoryId) {
  return await accessoryContract.methods
    .getAccessoryLockStatus(accessoryId)
    .call();
}

async function getAllAccessories() {
  ownedAccessoryCount = await getAccessoryCount();

  accessoryIds = await getAccessoryIds(ownedAccessoryCount);
    ownerAccessories = await getAccessoryArray(accessoryIds);
  return ownerAccessories;
}

async function getAccessoryCount() {
  ownedAccessoryCount = await accessoryContract.methods
    .getOwnerAccessoryCount(currentAddress)
    .call();
  return ownedAccessoryCount;
}

async function getAccessoryIds(ownedAccessories) {
  let accessoryIds = [];
  let result = undefined;
  for (var i = 0; i < ownedAccessories; i++) {
    result = await accessoryContract.methods
      .getAccessoryByIndex(currentAddress, i)
          .call();
      accessoryIds.push(result);

  }
  return accessoryIds;
}

async function getAccessoryArray(ownedAccessories) {
  let ownerAccessories = [];
  let result = undefined;

  for (var i = 0; i < ownedAccessories.length; i++) {
    result = await accessoryContract.methods
      .getAccessory(ownedAccessories[i])
      .call();
    //result will be all accessorys an address has EVER owned, so check if they currently own it.
    if (result && result.owner.toUpperCase() === currentAddress.toUpperCase()) {
      ownerAccessories.push(result);
    }
  }
  return ownerAccessories;
}

export {
  getAllAngels,
  getAngelLockStatus,
  getAllPets,
  getAllAccessories,
  getAccessoryLockStatus,
  getAngelContract,
  getPetContract,
  getAccessoryContract,
  initLegacyContracts,
};
