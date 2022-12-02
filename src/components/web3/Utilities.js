import { getCardDataContract } from './SolidityContracts.js';

const cardType = [
  'Barakiel',
  'Zadkiel',
  'Lucifer',
  'Michael',
  'Arel',
  'Raguel',
  'Lilith',
  'Furlac',
  'Azazel',
  'Eleleth',
  'Verin',
  'Ziwa',
  'Cimeriel',
  'Numinel',
  'Bat Gol',
  'Gabriel',
  'Metatron',
  'Rafael',
  'Melchezidek',
  'Semyaza',
  'Addadon',
  'Baalzebub',
  'Ben Nez',
  'Jophiel',
  'Gecko',
  'Parakeet',
  'Kitten',
  'Horse',
  'Komodo',
  'Falcon',
  'Bobcat',
  'Unicorn',
  'Rock Dragon',
  'Archaeopteryx',
  'Sabertooth',
  'Pegasus',
  'Dire Dragon',
  'Phoenix',
  'Liger',
  'Alicorn',
  'Fire Elemental',
  'Water Elemental',
  'Sun Elemental',
  'Leather Bracers',
  'Metal Bracers',
  "Scholar's Scroll",
  'Cosmic Scroll',
  '4 Leaf Clover',
  '7 Leaf Clover',
  'Red Collar',
  'Ruby Collar',
  'Yellow Collar',
  'Citrine Collar',
  'Blue Collar',
  'Sapphire Collar',
  'Carrots',
  'Cricket',
  'Bird Seed',
  'Cat Nip',
  'Lightning Rod',
  'Holy Light',
  '1 Ply Paper Towel',
  '2 Ply Paper Towel',
  'Cardboard',
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Stupid Fluffy Pink',
  'Orichalcum',
  'Diamond',
  'Titanium',
  'Zeroninum',
];

//Code for getting an array of all card
/****************************************************************************************** */

let tokenIds = []; //Array of all token ids ever owned by an address.

let ownerTokens;

async function getAllTokens(currentAddress) {
  if (!currentAddress) {
    return
  }
  // let web3 = getWeb3();
  let carddata_contract = getCardDataContract();
  //if (web3._provider.networkVersion !== 1) { return null;}
  //First see how many tokens the address owns. We need to check the total supply because recycling pets will otherwise cause some to not show up.
  let numTokensOwned = await carddata_contract.methods
    .balanceOf(currentAddress)
    .call();

  console.log('Tokens Ever Owned: ', numTokensOwned);

  //Find their token Ids.
  tokenIds = await getTokenIds(
    numTokensOwned,
    currentAddress,
    carddata_contract
  );
  //Return the information about each owned token id.

  ownerTokens = await getTokenArray(
    tokenIds,
    currentAddress,
    carddata_contract
  );
  return ownerTokens;
}

async function getTokenIds(numTokensOwned, currentAddress, carddata_contract) {
  let tokenIds = [];
  let result = undefined;
  let allTokensFound = false;
  let count = 0;
  console.log(numTokensOwned, currentAddress);
  while (allTokensFound === false) {
    result = await carddata_contract.methods
      .getABTokenByIndex(currentAddress, count)
      .call();
    // This will be true only when we have reached the end
    if (parseInt(result, 10) === 0 && count !== 0) {
      allTokensFound = true;
    } else {
      tokenIds.push(result);
      count++;
    }
  }

  return tokenIds;
}

async function getTokenArray(tokenIds, currentAddress, carddata_contract) {
  let ownerTokens = [];
  let result = undefined;
  let ownerTokenIds = [];
  for (var i = 0; i < tokenIds.length; i++) {
    try {
      result = await carddata_contract.methods.getABToken(tokenIds[i]).call();
      console.log('result ', result);
      //result will be all tokens an address has EVER owned, so check if they currently own it.
      if (result.owner.toUpperCase() === currentAddress.toUpperCase()) {
        ownerTokens.push(result);
        ownerTokenIds.push(tokenIds[i]);
      }
      if (result === 0 && i !== 0) {
        break;
      } //break out of for loop if we have passed the users tokens.
    } catch (e) {
      console.log('error getting token: ', tokenIds[i]);
    }
  }

  return { ownerTokens, ownerTokenIds };
}

//Function that takes in an old aura 0-5 and returns a new 3 component Aura.
function getAura(oldAura) {
  let auraBlue = 0;
  let auraYellow = 0;
  let auraRed = 0;

  if (oldAura === 0) {
    auraBlue = 1;
  } //blue aura
  if (oldAura === 1) {
    auraYellow = 1;
  } //yellow Aura
  if (oldAura === 2) {
    auraBlue = 1;
    auraRed = 1;
  } //purple Aura
  if (oldAura === 3) {
    auraYellow = 1;
    auraRed = 1;
  } //orange Aura
  if (oldAura === 4) {
    auraRed = 1;
  } //red Aura
  if (oldAura === 5) {
    auraBlue = 1;
    auraYellow = 1;
  } //green Aura

  return { auraRed, auraYellow, auraBlue };
}

//Function called on app load that grabs the current and main numbers of tokens from the chain.
async function getCurrentMaxNumbers() {
  let currMaxNumbers = {
    current: [],
    max: [],
  };

  let carddata_contract = getCardDataContract();
  for (var i = 0; i < 73; i++) {
    currMaxNumbers.current[i] = await carddata_contract.methods
      .getCurrentTokenNumbers(i)
      .call();
    //   currMaxNumbers.max[i] = await carddata_contract.methods.getMaxTokenNumbers(i).call();
  }

  return currMaxNumbers;
}

export { cardType, getAura, getCurrentMaxNumbers, getAllTokens };
