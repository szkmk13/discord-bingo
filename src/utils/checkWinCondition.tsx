import databaseBingoRow from "../types/databaseBingoRow";

export function checkWinCondition(todaysOrder: Array<string>,todaysBingo:databaseBingoRow) {
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
      for (const index_from_today of posiibleWin) {
        if (!todaysBingo[todaysOrder[index_from_today]]) {
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