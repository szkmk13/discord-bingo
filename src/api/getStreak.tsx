import { useQuery } from "react-query";
import { supabase } from "../utils/supabase/supabase";
import moment from "moment";

const getStreak = async () => {
  const { data, error } = await supabase
    .from("bingo")
    .select("completed, date")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return null;
  }
  let streak = 0;
  let nextDate = moment();
  let oldDate = moment();
  for (const element of data) {
    if (element.date !== moment().format("YYYY-MM-DD")) {
      // if date is not tommorow check conditions
      oldDate = moment(element.date);
      if (oldDate !== nextDate.subtract(1, "days")) {
        break;
      }
    }

    nextDate = moment(element.date);
    if (!element.completed) {
      break;
    }
    streak = streak + 1;
  }

  return streak;
};

export const useGetStreak = () => {
  return useQuery({
    queryKey: ["get-streak"],
    queryFn: getStreak,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};
