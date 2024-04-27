import BingoCard from "./BingoCard";

import { useGetBingo } from "../api/getBingo";
import { supabaseToPhraseDict } from "../constants/cardsData";
import { checkWinCondition } from "../utils/checkWinCondition";
import { useGetOrder } from "../api/getOreder";
import { useGetCompleted } from "../api/getCompletedForToday";
import { useGetStreak } from "../api/getStreak";
import WinningModal from "./WinningModal";
import Streak from "./StreakAndDate";
import { useQueryClient } from "react-query";
import moment from "moment";
import Loader from "./Loader";
const currentDate = moment().format("DD/MM/YYYY");
function BingoTable() {
  const { data: todaysBingo, isLoading, isError } = useGetBingo();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center text-xl col-span-2 border-2 rounded-lg bg-zinc-400 ">
            Discord bingo for {currentDate}
          </div>
          <div className="text-center text-xl border-2 rounded-lg bg-zinc-200">
            Current streak🔥: <Loader />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 h-96 ">
          {Array(16)
            .fill(undefined)
            .map((un,index) => (
              <div key={index} className="border-2 rounded-lg bg-gray-400 m-2 flex items-center justify-center cursor-pointer select-none"></div>
            ))}
        </div>
      </>
    );
  }
  if (isError) {
    return <></>;
  }
  if (todaysBingo) {
    checkWinCondition(todaysBingo.order, todaysBingo);

    queryClient.invalidateQueries({ queryKey: ["get-streak"] });

    return (
      <>
        <Streak />
        <WinningModal />
        <div className="grid grid-cols-4 gap-4 h-96 ">
          {todaysBingo.order.map((actionString: string) => (
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
