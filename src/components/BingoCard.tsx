import { useState } from "react";
import { useMutationUpdateBingosDatabase } from "../utils/supabase/supabase";
import moment from "moment";
import { TBingoCard } from "../types/bingo";
const currentDate = moment().format("MM/DD/YYYY");

function BingoCard(data: TBingoCard) {
  const [color, setColor] = useState(data.marked);
  const mutation = useMutationUpdateBingosDatabase(data, currentDate);

  const handleClick = async () => {
    setColor(!data.marked);
    mutation.mutate();
  };

  return (
    <>
      <div
        key={data.activity}
        className={`border-2 rounded-lg m-2 flex items-center justify-center cursor-pointer select-none shadow-md min-w-12 min-h-12 sm:h-24 ${
          color ? 'bg-green-400' : 'bg-red-300'
        }`}
        onClick={handleClick}
      >
        <p className="text-center text-sm md:text-lg lg:text-xl text-wrap sm:m-1">{data.label}</p>
      </div>
    </>
  );
}

export default BingoCard;
