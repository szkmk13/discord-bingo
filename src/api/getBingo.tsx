import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import moment from "moment";
import { shuffleListWithHash } from "../utils/shuffleList";
import { supabaseKeys } from "../constants/cardsData";
import databaseBingoRow from "../types/databaseBingoRow";

const currentDate = moment().format("MM/DD/YYYY");
const fetchSupa = async (): Promise<databaseBingoRow[] | undefined | null> => {
  const { data } = await supabase
    .from("bingo")
    .select("*")
    .eq("date", currentDate);
  return data;
};

const getBingo = async () => {
  const data = await fetchSupa();

  if (data === undefined || data.length == 0) {
    console.log("sending");
    const todaysOrder = shuffleListWithHash(supabaseKeys, currentDate);
    await supabase
      .from("bingo")
      .insert({ date: currentDate, order: todaysOrder });
    const data = await fetchSupa();

    return data[0];
  }

  return data[0];
};

export const useGetBingo = () => {
  return useQuery({
    queryKey: ["get-bingo"],
    queryFn: getBingo,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};
