import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface BingoCard {
  supabase_key: string;
  marked: boolean;
  phrase: string;
}

function BingoCard(data: BingoCard) {
  const [color, setColor] = useState(data.marked);
  const currentDate = "04/16/2024";
  const handleClick = async () => {

    setColor(true);
    const { error } = await supabase
      .from("bingo")
      .update({ [data.supabase_key]: true })
      .eq("date", currentDate);
    if (error) {
      console.log(error);
    }
    // todo send request with update to set as done
  };

  return (
    <>
      <div
        key={data.phrase}
        className={
          color
            ? "border-2 rounded-lg bg-green-400 m-2 flex items-center justify-center cursor-pointer select-none"
            : "border-2 rounded-lg bg-red-400 m-2 flex items-center justify-center cursor-pointer select-none"
        }
        onClick={handleClick}
      >
        <p className="text-center text-xl">{data.phrase}</p>
      </div>
    </>
  );
}

export default BingoCard;
