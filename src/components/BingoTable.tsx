import BingoCard from "./BingoCard";
import CryptoJS from "crypto-js";
import { Modal } from "@mui/base/Modal";
import { useState } from "react";
import { useGetMaincards } from "../api/getBingo";

interface CardData {
  marked: boolean;
  phrase: string;
}
function BingoTable() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cardsData = [
    { marked: true, phrase: "dzięki za dzisiaj" },
    { marked: false, phrase: "... tirem" },
    { marked: true, phrase: "fomo" },
    { marked: false, phrase: "loldle" },
    { marked: false, phrase: "pokedle" },
    { marked: true, phrase: "stop cham" },
    { marked: false, phrase: "tft" },
    { marked: true, phrase: "wyslane cv" },
    { marked: false, phrase: "jolie jolie" },
    { marked: false, phrase: "classcat" },
    { marked: false, phrase: "larox barman" },
    { marked: true, phrase: "kosa szymek-daniel" },
    { marked: true, phrase: "[Object object]" },
    { marked: false, phrase: "stylowanie buttona" },
    { marked: false, phrase: "pisanie endpointow" },
    { marked: false, phrase: "daniel wejdzie na disc" },
  ];

  const { data, isLoading, error } = useGetMaincards();
  // console.log(data)

  function shuffleListWithHash(list: Array<CardData>, hash: string) {
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
  function checkWinCondition(list: Array<CardData>) {
    let marked_counter = 0;
    const possibleWins = [
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ];
    for (const posiibleWin of possibleWins) {
      for (const number of posiibleWin) {
        if (!list[number].marked) {
          marked_counter = 0;
          break; // Exit the loop early
        }
        marked_counter = marked_counter + 1;
      }
      if (marked_counter == 4) {
        return true;
      }
    }
    return false;
  }

  // Example usage
  const hash = "fsda";
  const shuffledList = shuffleListWithHash(cardsData, hash);

  const responseData = {
    cardsData: shuffledList,
    date: "test123",
  };

  const winForToday = { win: checkWinCondition(shuffledList) };
  const newResponseData = Object.assign({}, responseData, winForToday);
  console.log(newResponseData);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <p>Text in a modal</p>
      </Modal>
      <div className="grid grid-cols-4 gap-4 h-96">
        {shuffledList.map((data, index) => (
          <BingoCard
            key={`disc${index}`}
            marked={data.marked}
            phrase={data.phrase}
          />
        ))}
      </div>
    </>
  );
}

export default BingoTable;
