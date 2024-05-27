import BingoCard from "./BingoCard";

import { checkWinCondition } from "../utils/checkWinCondition";
import WinningModal from "./WinningModal";
import Streak from "./StreakAndDate";
import { useQueryClient } from "react-query";
import moment from "moment";
import Loader from "./Loader";
import { useGetBingo2 } from "../utils/supabase/order";
import { useActivitiesWithLabels } from "../utils/supabase/supabase";
const currentDate = moment().format("DD/MM/YYYY");
function BingoTable() {
  const { data: todaysBingo, isLoading, isError } = useGetBingo2(); //hook
  const queryClient = useQueryClient();
  const { data: possible_fields } = useActivitiesWithLabels();

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
            .map((un, index) => (
              <div
                key={index}
                className="border-2 rounded-lg bg-gray-400 m-2 flex items-center justify-center cursor-pointer select-none"
              ></div>
            ))}
        </div>
      </>
    );
  }
  if (isError) {
    return <></>;
  }
  if (todaysBingo && possible_fields) {
    const order = todaysBingo.order;
    const marked = todaysBingo.marked;
    queryClient.invalidateQueries({ queryKey: ["get-streak"] });
    const hasWon = checkWinCondition(todaysBingo);
    console.log(hasWon);
    
    return (
      <>
        <Streak />
        {hasWon && <WinningModal />}
        <div className="grid grid-cols-4 gap-4 h-96 ">
          {todaysBingo.order.map((activity: string, index: number) => (
            <BingoCard
            label = {possible_fields[activity]}
              activity={activity}
              activity_index={index}
              marked={marked[order.indexOf(activity)]}
              marked_list={marked}
            />
          ))}
        </div>
      </>
    );
  }
}

export default BingoTable;
