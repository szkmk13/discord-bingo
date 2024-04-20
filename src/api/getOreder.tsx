import { useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import moment from "moment";

const currentDate = moment().format("MM/DD/YYYY");
const getOrder = async () => {
    const { data, error } = await supabase
    .from("bingo")
    .select("order")
    .eq("date", currentDate);

  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return null;
  }

  return data[0].order;

};

export const useGetOrder = () => {
  return useQuery({
    queryKey: ["get-order"],
    queryFn: getOrder,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};
