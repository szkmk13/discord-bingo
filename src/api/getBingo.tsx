import { createClient } from "@supabase/supabase-js";
import { useQuery } from 'react-query'

const getMainCards = async (): Promise<Array<any>> => {
  const supabaseUrl = "https://wfqgozjhucuhujgvxqnp.supabase.co";
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  try {
    const { data } = await supabase
      .from("bingo").select("*")
      

    if (data === null) {
      return [];
    }
    console.log("jestdata")
    console.log(data)

    return data.json();
  } catch (error: any) {
    console.error("Error fetching maincards:", error);
    return [];
  }
};

export const useGetMaincards = () => {
  return useQuery({
    queryKey: "maincards-data",
    queryFn: getMainCards,
  });
};
