import { createClient } from "@supabase/supabase-js";
import moment from "moment";
import { useState, useEffect } from "react";
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
function useFetchAndPost() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const currentDate = moment().format('MM/DD/YYYY');
    const currentDate = '04/16/2024'

    const bingoData = [{ test: "test" }];
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
  
        try {
            const { data: response } = await supabase.from("bingo").select("*").eq('date', currentDate)
            console.log(response);
            // console.log(response.ok);
        //     console.log(response.json());
                
        //   if (!response.ok) {
        //     throw new Error('Network response was not ok');
        //   }
  
        //   const result = await response.json();
        //   console.log(result);

        //   setData(result);
          setData(response);
  
          // Check if data is empty and post info if true
          if (Array.isArray(response) && response.length === 0) {
            await postData();
          }
  
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      const postData = async () => {
        try {
          const postResponse = await supabase
          .from("bingo")
          .insert({ date:currentDate, bingo: bingoData });
            console.log(postResponse);
            
          if (!postResponse.ok) {
            throw new Error('Failed to post data');
          }
  
          // Fetch data again after posting
          fetchData();
  
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchData();
    }, []);
  
    return { data, loading, error };
  }
  
  export default useFetchAndPost;