import { useState } from "react";
import { supabase } from "../utils/supabase";
import moment from "moment";
import { useMutation, useQueryClient } from "react-query";
const currentDate = moment().format("MM/DD/YYYY");   


interface BingoCard {
  supabase_key: string;
  marked: boolean;
  phrase: string;
}

function BingoCard(data: BingoCard) {
  const [color,setColor] = useState(data.marked);
  const queryClient = useQueryClient()
  const mutation = useMutation(
    async () => {
      const { error } = await supabase
      .from("bingo")
      .update({ [data.supabase_key]: true })
      .eq("date", currentDate);
      if (error) {
        console.log(error);
      }
    },
    {
    onSuccess() {
    queryClient.invalidateQueries({queryKey:["get-bingo"]})
    queryClient.invalidateQueries({queryKey:["get-completed"]})

    
      
    },
  })
  const handleClick = async () => {
    setColor(true)
    mutation.mutate()
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
