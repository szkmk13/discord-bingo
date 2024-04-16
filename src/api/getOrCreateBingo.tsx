import { QueryClient, useQuery, useMutation } from "react-query";
import { createClient } from "@supabase/supabase-js";
import moment from "moment";
import CardData from "../types/bingo";
import CryptoJS from "crypto-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const cardsData = [
  { marked: false, phrase: "dzięki za dzisiaj" },
  { marked: false, phrase: "... tirem" },
  { marked: false, phrase: "fomo" },
  { marked: false, phrase: "loldle" },
  { marked: false, phrase: "pokedle" },
  { marked: false, phrase: "stop cham" },
  { marked: false, phrase: "tft" },
  { marked: false, phrase: "wyslane cv" },
  { marked: false, phrase: "jolie jolie" },
  { marked: false, phrase: "classcat" },
  { marked: false, phrase: "larox barman" },
  { marked: false, phrase: "kosa szymek-daniel" },
  { marked: false, phrase: "[Object object]" },
  { marked: false, phrase: "stylowanie buttona" },
  { marked: false, phrase: "pisanie endpointow" },
  { marked: false, phrase: "daniel wejdzie na disc" },
];

function useFetchAndPost() {
  const currentDate = "04/16/2024";

  // const currentDate = moment().format('MM/DD/YYYY');

  function shuffleListWithHash(list: Array<CardData>, hash: string) {
    // Convert the hash to a number
    const hashNumber = parseInt(
      CryptoJS.SHA256(hash).toString().substring(0, 8),
      16
    );

    // Seed the random number generator with the hash number
    const seededRandom = seededRandomGenerator(hashNumber);

    // Shuffle the list using the seeded random number generator
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
  }
  // Seeded random number generator
  function seededRandomGenerator(seed: number) {
    let seedValue = seed;
    return function () {
      const x = Math.sin(seedValue++) * 10000;
      return x - Math.floor(x);
    };
  }

  // Fetch data
  const { data, isLoading, isError } = useQuery("getBingo", async () => {
    const { data: response } = await supabase
      .from("bingo")
      .select("bingo, completed")
      .eq("date", currentDate);

    return response;
  });
  console.log(data);

  // Post data mutation
  const postEmptyData = useMutation(
    async () => {
      const shuffledList = shuffleListWithHash(cardsData, currentDate);
      const postResponse = await supabase
        .from("bingo")
        .insert({ date: currentDate, bingo: shuffledList });
      console.log(postResponse);

      if (!postResponse.ok) {
        throw new Error("Failed to post data");
      }
    },
    {
      onSuccess: () => {
        QueryClient.invalidateQueries("getBingo"); // refetch data after posting
      },
    }
  );

  // Check if data is empty and post info if true
  if (data && Array.isArray(data) && data.length === 0) {
    postEmptyData.mutate();
  }
  if (data === undefined) {
    postEmptyData.mutate();
  }
  return {
    data,
    isLoading,
    isError,
    postEmptyData,
  };
}

export default useFetchAndPost;
