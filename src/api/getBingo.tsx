import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import moment from "moment";
import { shuffleListWithHash } from "../utils/shuffleList";
import { supabaseKeys } from "../constants/cardsData";
import databaseBingoRow from "../types/databaseBingoRow";

const currentDate = moment().format("MM/DD/YYYY");
const fetchSupa = async (): Promise<databaseBingoRow[] | undefined | null> => {
  const { data, error } = await supabase
    .from("bingo")
    .select("*")
    .eq("date", currentDate);

  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return null;
  }

  return data;
};

const getBingo = async (): Promise<databaseBingoRow | undefined> => {
  const data = await fetchSupa();

  if (!data || data.length === 0) {
    console.log("No data found, inserting new entry");

    const todaysOrder = shuffleListWithHash(supabaseKeys, currentDate);
    const { error } = await supabase
      .from("bingo")
      .insert({ date: currentDate, order: todaysOrder });

    if (error) {
      console.error("Error inserting new entry into Supabase:", error);
      return undefined;
    }
    
    const newData = await fetchSupa();
    if (!newData || newData.length === 0) {
      console.error("Something wet wrong");
      return undefined;
    }
    return newData[0];
  }

  return data[0];
};

export const useGetBingo = () => {
  return useQuery<databaseBingoRow | undefined>({
    queryKey: ["get-bingo"],
    queryFn: getBingo,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};
