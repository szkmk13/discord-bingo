export interface CardData {
  supabase_key: string;
  phrase: string;
}

export interface TBingoCard {
  label: string;
  activity: string;
  activity_index: number;
  marked: boolean;
  marked_list: boolean[];
}
