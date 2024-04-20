
interface databaseBingoRow {
    date: string;
    order: JSON | null;
    [x: string]: string | boolean | JSON | null;
  }
  
  export default databaseBingoRow;
  