import { createClient } from "@supabase/supabase-js";
import { useQuery } from 'react-query'
import { useCreateTodaysBingo } from "./createBingo";

const getMainCards = async (): Promise<Array<any>> => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  try {
    const { data } = await supabase
      .from("bingo").select("*")
      

    if (Array.isArray(data) && data.length === 0) {
        console.log("date to null")
        const data = useCreateTodaysBingo()
        console.log(data)
      return data;
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
function createTodaysBingo() {
    throw new Error("Function not implemented.");
}

