import { useState } from "react";
import { useMutationUpdateBingosDatabase } from "../utils/supabase/supabase";
import moment from "moment";
import { TBingoCard } from "../types/bingo";
const currentDate = moment().format("MM/DD/YYYY");

function BingoCard(data: TBingoCard) {
  const [color, setColor] = useState(data.marked);
  const mutation = useMutationUpdateBingosDatabase(data, currentDate);

  const handleClick = async () => {
    setColor(true);
    mutation.mutate();
  };

  return (
    <>
      <div
        key={data.activity}
        className={
          color
            ? "border-2 rounded-lg bg-green-400 m-2 flex items-center justify-center cursor-pointer select-none"
            : "border-2 rounded-lg bg-red-300 m-2 flex items-center justify-center cursor-pointer select-none"
        }
        onClick={data.marked?()=>{}:handleClick}
      >
        <p className="text-center text-xl">{data.label}</p>
      </div>
    </>
  );
}

export default BingoCard;
