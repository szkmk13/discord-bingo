import BingoCard from "./BingoCard";
import CryptoJS from "crypto-js";
import { Modal } from "@mui/base/Modal";
import { useState } from "react";
import { useGetMaincards } from "../api/getBingo";
import { useCreateTodaysBingo } from "../api/createBingo";
import useFetchAndPost from "../api/getOrCreateBingo";
// import useFetchAndPost from "../api/2";
import CardData from "../types/bingo"

function BingoTable() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const { data:todaysBingo, isLoading, isError, postEmptyData } = useFetchAndPost();
  console.log(todaysBingo,isLoading,isError,postEmptyData);
  // console.log(data)
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


  if (isLoading){
    return <></>
  }
  if (isError){
    return <></>
  }
  const bingoList: Array<CardData> = todaysBingo[0].bingo

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
        {bingoList.map((data, index) => (
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
