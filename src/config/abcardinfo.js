//File abcardinfo.js contains information about the various cards in the game.
//Most of this information is also on the blockchain, but this file loads up constant information much more quickly than reading from the chain.

const urlRoot =
  "https://ipfs.io/ipfs/QmWKWsv1r1pDAVWRV8EHBZqj1UvMmzqy6oUvUSvVdufd62/";

//object containing information strings, etc about various angel battle cards. The card id is the position.
//For instance, to access information about card series 12, use ABCardInfo[12]
const ABCardInfo = {
  cards: [
    {
      location: urlRoot + "0.png",
      name: "Barakiel",
      description: "Common Blue Angel",
          max: 555,
      oldExists: 499,
      aura: "blue",
      price: 0,
    },
    {
      location: urlRoot + "1.png",
      name: "Zadkiel",
      description: "Angel of Mercy",
        max: 45,
      oldExists: 9,
      aura: "yellow",
      price: 30000000000000000,
    },
    {
      location: urlRoot + "2.png",
      name: "Lucifer",
      description: "Leader of the Fallen",
        max: 25,
      oldExists: 3,
      aura: "purple",
      price: 66600000000000000,
    },
    {
      location: urlRoot + "3.png",
      name: "Michael",
      description: "Prince of the Host",
        max: 25,
      oldExists: 3,
      aura: "orange",
        price: 80000000000000000,
    },
    {
      location: urlRoot + "4.png",
      name: "Arel",
      description: "Angel of Fire",
        max: 90,
      oldExists: 48,
      aura: "red",
        price: 3000000000000000,
    },
    {
      location: urlRoot + "5.png",
      name: "Raguel",
      description: "Angel of Justice",
        max: 90,
      oldExists: 52,
      aura: "yellow",
        price: 50000000000000000,
    },
    {
      location: urlRoot + "6.png",
      name: "Lilith",
      description: "Demon of the Night",
        max: 90,
      oldExists: 47,
      aura: "purple",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "7.png",
      name: "Furlac",
      description: "Angel of Earth",
        max: 90,
      oldExists: 46,
      aura: "green",
        price: 12500000000000000,
    },
    {
      location: urlRoot + "8.png",
      name: "Azazel",
      description: "Demon of Weapons",
            max: 90,
    oldExists: 49,
      aura: "orange",
        price: 8000000000000000,
    },
    {
      location: urlRoot + "9.png",
      name: "Eleleth",
      description: "Angel of Peace",
        max: 90,
      oldExists: 51,
      aura: "blue",
        price: 9000000000000000,
    },
    {
      location: urlRoot + "10.png",
      name: "Verin",
      description: "Demon of Impatience",
        max: 90,
        oldExists: 46,

      aura: "red",
        price: 7000000000000000,
    },
    {
      location: urlRoot + "11.png",
      name: "Ziwa",
      description: "Angel of Light",
        max: 90,
      oldExists: 46,
      aura: "yellow",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "12.png",
      name: "Cimeriel",
      description: "The Darkness of God",
        max: 90,
      oldExists: 33,
      aura: "purple",
        price: 12000000000000000,
    },
    {
      location: urlRoot + "13.png",
      name: "Numinel",
      description: "Angel of Knowledge",
        max: 90,
      oldExists: 28,
      aura: "green",
        price: 14000000000000000,
    },
    {
      location: urlRoot + "14.png",
      name: "Bat Gol",
      description: "Angel of the Heavenly Voice",
        max: 45,
      oldExists: 15,
      aura: "green",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "15.png",
      name: "Gabriel",
      description: "Messenger of God",
        max: 45,
      oldExists: 15,
      aura: "blue",
        price: 25000000000000000,
    },
    {
      location: urlRoot + "16.png",
      name: "Metatron",
      description: "Powerful Kingly Angel",
        max: 45,
      oldExists: 6,
      aura: "red",
        price: 26500000000000000,
    },
    {
      location: urlRoot + "17.png",
      name: "Rafael",
      description: "God Heals",
        max: 45,
      oldExists: 14,
      aura: "yellow",
        price: 15000000000000000,
    },
    {
      location: urlRoot + "18.png",
      name: "Melchezidek",
      description: "Priest King",
        max: 45,
      oldExists: 4,
      aura: "purple",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "19.png",
      name: "Semyaza",
      description: "Father of the Nephilim",
        max: 45,
      oldExists: 8,
      aura: "green",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "20.png",
      name: "Abbadon",
      description: "The Destroyer",
        max: 45,
      oldExists: 5,
      aura: "orange",
        price: 30000000000000000,
    },
    {
      location: urlRoot + "21.png",
      name: "Baalzebub",
      description: "Lord of the Flies",
        max: 45,
      oldExists: 4,
      aura: "blue",
        price: 35000000000000000,
    },
    {
      location: urlRoot + "22.png",
      name: "Ben Nez",
      description: "Angel of Wind",
        max: 45,
        oldExists: 4,
      aura: "red",
        price: 40000000000000000,
    },
    {
      location: urlRoot + "23.png",
      name: "Jophiel",
      description: "Cherub Guardian of Eden",
        max: 45,
        oldExists: 6,
      aura: "green",
        price: 40000000000000000,
    },
    {
      location: urlRoot + "24.png",
      name: "Gecko",
      description: "Level 1 Lizard",
        max: 400,
      oldExists: 267,
      aura: "Component",
      price: 0,
    },
    {
      location: urlRoot + "25.png",
      name: "Parakeet",
      description: "Level 1 Avian",
        max: 500,
        oldExists: 498,
      aura: "Component",
      price: 0,
    },
    {
      location: urlRoot + "26.png",
      name: "Kitten",
      description: "Level 1 Feline",
        max: 300,
        oldExists: 233,
      aura: "Component",
        price: 5000000000000000,
    },
    {
      location: urlRoot + "27.png",
      name: "Horse",
      description: "Level 1 Equine",
        max: 250,
        oldExists: 182,
      aura: "Component",
        price: 5000000000000000,
    },
    {
      location: urlRoot + "28.png",
      name: "Komodo",
      description: "Level 2 Lizard",
        max: 300,
        oldExists: 160,
      aura: "Component",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "29.png",
      name: "Falcon",
      description: "Level 2 Avian",
        max: 300,
        oldExists: 159,
      aura: "Component",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "30.png",
      name: "Bobcar",
      description: "Level 2 Feline",
        max: 300,
        oldExists: 156,
      aura: "Component",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "31.png",
      name: "Unicorn",
      description: "Level 2 Equine",
        max: 250,
        oldExists: 125,
      aura: "Component",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "32.png",
      name: "Rock Dragon",
      description: "Level 3 Lizard",
        max: 500,
        oldExists: 356,
      aura: "Component",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "33.png",
      name: "Archaeopteryx",
      description: "Level 3 Avian",
        max: 250,
        oldExists: 145,
      aura: "Component",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "34.png",
      name: "Sabertooth",
      description: "Level 3 Feline",
        max: 250,
        oldExists: 132,
      aura: "Component",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "35.png",
      name: "Pegasus",
      description: "Level 3 Equine",
        max: 250,
        oldExists: 148,
      aura: "Component",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "36.png",
      name: "Dire Dragon",
      description: "Level 4 Lizard",
        max: 100,
        oldExists: 32,
      aura: "Component",
        price: 30000000000000000,
    },
    {
      location: urlRoot + "37.png",
      name: "Phoenix",
      description: "Level 4 Avian",
        max: 100,
        oldExists: 25,
      aura: "Component",
        price: 30000000000000000,
    },
    {
      location: urlRoot + "38.png",
      name: "Liger",
      description: "Level 4 Feline",
        max: 100,
        oldExists: 44,
      aura: "Component",
        price: 30000000000000000,
    },
    {
      location: urlRoot + "39.png",
      name: "Alicorn",
      description: "Level 4 Equine",
        max: 100,
        oldExists: 32,
      aura: "Component",
        price: 30000000000000000,
    },
    {
      location: urlRoot + "40.png",
      name: "Fire Elemental",
      description: "Level 5 - Elemental",
        max: 50,
        oldExists: 1,
      aura: "Component",
        price: 40000000000000000,
    },
    {
      location: urlRoot + "41.png",
      name: "Water Elemental",
      description: "Level 5 - Elemental",
        max: 100,
        oldExists: 0,
      aura: "Component",
        price: 40000000000000000,
    },
    {
      location: urlRoot + "42.png",
      name: "Sun Elemental",
      description: "Level 5 - Elemental",
        max: 100,
        oldExists: 0,
      aura: "Component",
        price: 40000000000000000,
    },
    {
      location: urlRoot + "43.png",
      name: "Leather Bracers",
      description: "Increase BP + 5",
        max: 75,
      oldExists: 35,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "44.png",
      name: "Metal Bracers",
      description: "Increase BP + 10",
        max: 45,
        oldExists: 12,
        aura: "None",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "45.png",
      name: "Scholar's Scroll",
      description: "Increase EXP + 20",
        max: 75,
        oldExists: 13,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "46.png",
      name: "Cosmic Scroll",
      description: "Increase EXP + 40",
        max: 45,
        oldExists: 26,
      aura: "None",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "47.png",
      name: "4 Leaf Clover",
      description: "Slightly Increases Pet Luck",
        max: 75,
        oldExists: 1,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "48.png",
      name: "7 Leaf Clover",
      description: "Greatly Increases Pet Luck",
        max: 45,
        oldExists: 1,
      aura: "None",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "49.png",
      name: "Red Collar",
      description: "Slightly Increases Red Aura",
        max: 75,
        oldExists: 0,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "50.png",
      name: "Ruby Collar",
      description: "Greatly Increases Red Aura",
        max: 55,
        oldExists: 0,
      aura: "None",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "51.png",
      name: "Yellow Collar",
      description: "Slightly Increases Yellow Aura",
        max: 75,
        oldExists: 1,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "52.png",
      name: "Citrine Collar",
      description: "Greatly Increases Yellow Aura",
        max: 45,
        oldExists: 0,
      aura: "None",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "53.png",
      name: "Blue Collar",
      description: "Slightly Increases Blue Aura",
        max: 75,
        oldExists: 0,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "54.png",
      name: "Sapphire Collar",
      description: "Greatly Increases Blue Aura",
        max: 45,
        oldExists: 2,
      aura: "None",
        price: 20000000000000000,
    },
    {
      location: urlRoot + "55.png",
      name: "Carrots",
      description: "Increases Chance to Encounter Equine Line",
        max: 75,
        oldExists: 1,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "56.png",
      name: "Cricket",
      description: "Increases Chance to Encounter Lizard Line",
        max: 75,
        oldExists: 1,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "57.png",
      name: "Bird Seed",
      description: "Increases Chance to Encounter Avian Line",
        max: 75,
        oldExists: 1,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "58.png",
      name: "Cat Nip",
      description: "Increases Chance to Encounter Feline Line",
        max: 75,
        oldExists: 1,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "59.png",
      name: "Lightning Rod",
      description: "Increases Chance to Encounter Elemental",
        max: 75,
        oldExists: 3,
      aura: "None",
        price: 10000000000000000,
    },
    {
      location: urlRoot + "60.png",
      name: "Holy Light",
      description: "Extra Power vs Fallen Angels",
        max: 30,
        oldExists: 0,
      aura: "None",
        price: 50000000000000000,
    },
   
  ],
};

export default ABCardInfo;
