import BingoCard from "./BingoCard";

import { useGetBingo } from "../api/getBingo";
import { supabaseToPhraseDict } from "../constants/cardsData";
import { checkWinCondition } from "../utils/checkWinCondition";
import { useGetOrder } from "../api/getOreder";
import { useGetCompleted } from "../api/getCompletedForToday";

function BingoTable() {
  const { data: todaysBingo, isLoading, isError } = useGetBingo();
  const { data: todaysOrder} = useGetOrder()
  const { data: todaysCompleted} = useGetCompleted()

  if (isLoading) {
    return <><div>LOADING</div></>;
  }
  if (isError) {
    return <></>;
  }
  if (todaysBingo) {
    console.log(todaysOrder);
    console.log(todaysBingo);
    console.log(todaysCompleted);
    
    const hasWon = checkWinCondition(todaysOrder,todaysBingo)
    console.log(hasWon);
    
    
    return (
      <>
        {hasWon?<>Gratulacje wygrałeś</>:<></>}
        <div className="grid grid-cols-4 gap-4 h-96 ">
          {todaysOrder.map((actionString:string) => (
            <BingoCard
              key={actionString}
              marked={todaysBingo[actionString]}
              phrase={supabaseToPhraseDict[actionString]}
              supabase_key={actionString}
            />
          ))}
        </div>
      </>
    );
  }
}

export default BingoTable;
