import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import moment from "moment";

const currentDate = moment().format("MM/DD/YYYY");
const fetchSupa = async () => {
  const { data } = await supabase
    .from("bingo")
    .select("*")
    .eq("date", currentDate);
  return data;
};
const getBingo = async () => {
  const data = await fetchSupa();

  if (data === undefined || data.length == 0) {
    console.log("dupa");
    const response = await supabase.from("bingo").insert({ date: currentDate });
    return response[0];
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
