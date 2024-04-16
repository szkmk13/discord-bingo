import BingoCard from "./BingoCard";
import moment from "moment";

const currentDate = moment().format("MM/DD/YYYY");
import CardData from "../types/bingo";
import { useGetBingo } from "../api/getBingo";
import { shuffleListWithHash } from "../utils/shuffleList";
import { cardsDataConstants } from "../constants/cardsData";
const shuffledList = shuffleListWithHash(cardsDataConstants, currentDate);

function BingoTable() {
  const { data: todaysBingo, isLoading, isError } = useGetBingo();

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

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <></>;
  }
  if (todaysBingo) {
    return (
      <>
        <div className="grid grid-cols-4 gap-4 h-96">
          {shuffledList.map((data, index) => (
            <BingoCard
              key={`disc${index}`}
              marked={todaysBingo[data.supabase_key]}
              phrase={data.phrase}
              supabase_key={data.supabase_key}
            />
          ))}
        </div>
      </>
    );
  }
}

export default BingoTable;
