import moment from "moment";
import { setWon } from "./supabase/supabase";
import databaseBingoRow2 from "../types/databaseBingoRow2";
const currentDate = moment().format("MM/DD/YYYY");

export function checkWinCondition(todaysBingo: databaseBingoRow2) {
  if (todaysBingo.completed) {
    return true;
  }
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
  for (const indices of possibleWins) {
    const allTrue = indices.every((index) => todaysBingo.marked[index]);
    if (allTrue) {
      console.log("setting completed");
      console.log(setWon(currentDate));
      return true;
    }
  }
  return false;
}
