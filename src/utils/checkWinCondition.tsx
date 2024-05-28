import moment from "moment";
import { setWon } from "./supabase/supabase";
const currentDate = moment().format("MM/DD/YYYY");

export function checkWinCondition(isCompleted: boolean, marked: boolean[]) {
  if (isCompleted) {
    return true;
  }
  const possibleWins = [
    // Rows
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    // Columns
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    // Diagonal from top-left to bottom-right
    [0, 6, 12, 18, 24],
    // Diagonal from top-right to bottom-left
    [4, 8, 12, 16, 20],
  ];
  for (const indices of possibleWins) {
    const allTrue = indices.every((index) => marked[index]);
    if (allTrue) {
      console.log("setting completed");
      console.log(setWon(currentDate));
      return true;
    }
  }
  return false;
}
