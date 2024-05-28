import { createClient } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ActivityLabel } from "../../types/supabase";
import { TBingoCard } from "../../types/bingo";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const useMutationUpdateBingosDatabase = (
  data: TBingoCard,
  currentDate: string
) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const newList = data.marked_list;
      newList[data.activity_index] = true;
      const { error } = await supabase
        .from("bingos")
        .update({ marked: newList })
        .eq("date", currentDate);
      if (error) {
        console.log(error);
      }
    },
    {
      onSuccess() {
        console.log(`success changing ${data.activity}`);
        queryClient.invalidateQueries({ queryKey: ["get-bingo2"] });
      },
    }
  );
};

export const setWon = async (currentDate: string) => {
  const { data, error } = await supabase
    .from("bingos")
    .update({ completed: true })
    .eq("date", currentDate);
  return { data, error };
};
export const getActivitiesWithLabels = async (): Promise<ActivityLabel> => {
  const { data, error } = await supabase.from("possible_fields").select("*");

  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return {};
  }
  const new_Data: ActivityLabel = {};
  data.map((element) => (new_Data[element.activity] = element.readable));
  return new_Data;
};

export const useActivitiesWithLabels = () => {
  return useQuery<ActivityLabel>({
    queryKey: ["get-getActivitiesWithLabels"],
    queryFn: getActivitiesWithLabels,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};
