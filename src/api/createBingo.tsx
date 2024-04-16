import { createClient } from "@supabase/supabase-js";
import { useQuery } from 'react-query'

const createTodaysBingo = async (): Promise<Array<any>> => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase.from('bingo').insert({ date: 1, bingo: [] })

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error: any) {
    alert(error.message)
  }

};

export const useCreateTodaysBingo = () => {
  return useQuery({
    queryKey: "maincards-dataa",
    queryFn: createTodaysBingo,
  });
};
