import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import moment from "moment";

const currentDate = moment().format("MM/DD/YYYY");
const getCompleted = async () => {
    const { data, error } = await supabase
    .from("bingo")
    .select("completed")
    .eq("date", currentDate);

  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return null;
  }

  return data[0].completed;

};

export const useGetCompleted = () => {
  return useQuery({
    queryKey: ["get-completed"],
    queryFn: getCompleted,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};
