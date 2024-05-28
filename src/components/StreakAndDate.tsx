import moment from "moment";
import { useGetStreak } from "../api/getStreak";

function Streak() {
  const { data: streak } = useGetStreak();

  const currentDate = moment().format("DD/MM/YYYY");
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center text-xl col-span-2 border-2 rounded-lg bg-purple-400 ">Discord bingo for {currentDate}</div>
        <div className="text-center text-xl border-2 rounded-lg bg-orange-200">Current streak🔥: {streak}</div>
      </div>
    </>
  );
}

export default Streak;
