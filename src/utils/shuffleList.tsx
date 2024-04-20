import CryptoJS from "crypto-js";


export function shuffleListWithHash(list: Array<string>, hash: string) {
    // Convert the hash to a number
    const hashNumber = parseInt(
      CryptoJS.SHA256(hash).toString().substring(0, 8),
      16
    );

    // Seed the random number generator with the hash number
    const seededRandom = seededRandomGenerator(hashNumber);

    // Shuffle the list using the seeded random number generator
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
  }
  // Seeded random number generator
  function seededRandomGenerator(seed: number) {
    let seedValue = seed;
    return function () {
      const x = Math.sin(seedValue++) * 10000;
      return x - Math.floor(x);
    };
  }

