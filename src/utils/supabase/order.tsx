import moment from "moment";
import { useQuery } from "react-query";
import { supabase } from "./supabase";
import { shuffleListWithHash } from "../shuffleList";
import { databaseBingoRow } from "../../types/supabase";

const currentDate = moment().format("MM/DD/YYYY");
const fetchSupa = async (): Promise<Array<databaseBingoRow> | undefined | null> => {
  const { data, error } = await supabase
    .from("bingos")
    .select("*")
    .eq("date", currentDate);

  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return null;
  }

  return data;
};
const fetchOrder = async (): Promise<Array<string>> => {
  const { data, error } = await supabase.from("possible_fields").select("*");

  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return [];
  }
  const keys = data.map((element) => element.activity);
  return keys.slice(0,24);
};

export const fetchPossibleFields = async (): Promise<Array<string>> => {
    const { data, error } = await supabase.from("possible_fields").select("*");
  
    if (error) {
      console.error("Error fetching data from Supabase:", error);
      return [];
    }
    return data;
  };


const getBingo = async (): Promise<databaseBingoRow | undefined> => {
  const data = await fetchSupa();
  const possible_fields = await fetchOrder();
  if (!data || data.length === 0) {
    console.log("No data found, inserting new entry");
    const todaysOrder = shuffleListWithHash(possible_fields, currentDate);
    console.log(todaysOrder);

    const { error } = await supabase
      .from("bingos")
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

export const useGetBingo2 = () => {
  return useQuery<databaseBingoRow | undefined>({
    queryKey: ["get-bingo2"],
    queryFn: getBingo,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};
