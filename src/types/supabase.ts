export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bingo: {
        Row: {
          classcat: boolean | null
          completed: boolean | null
          cv: boolean | null
          daniel_disc: boolean | null
          date: string
          dzieki_za_dzisiaj: boolean | null
          fomo: boolean | null
          jolie: boolean | null
          kosa: boolean | null
          krecimy: boolean | null
          loldle: boolean | null
          object_object: boolean | null
          order: Json | null
          pisanie_endpointow: boolean | null
          pokedle: boolean | null
          stop_cham: boolean | null
          stylowanie_buttona: boolean | null
          tft: boolean | null
          tirem: boolean | null
        }
        Insert: {
          classcat?: boolean | null
          completed?: boolean | null
          cv?: boolean | null
          daniel_disc?: boolean | null
          date: string
          dzieki_za_dzisiaj?: boolean | null
          fomo?: boolean | null
          jolie?: boolean | null
          kosa?: boolean | null
          krecimy?: boolean | null
          loldle?: boolean | null
          object_object?: boolean | null
          order?: Json | null
          pisanie_endpointow?: boolean | null
          pokedle?: boolean | null
          stop_cham?: boolean | null
          stylowanie_buttona?: boolean | null
          tft?: boolean | null
          tirem?: boolean | null
        }
        Update: {
          classcat?: boolean | null
          completed?: boolean | null
          cv?: boolean | null
          daniel_disc?: boolean | null
          date?: string
          dzieki_za_dzisiaj?: boolean | null
          fomo?: boolean | null
          jolie?: boolean | null
          kosa?: boolean | null
          krecimy?: boolean | null
          loldle?: boolean | null
          object_object?: boolean | null
          order?: Json | null
          pisanie_endpointow?: boolean | null
          pokedle?: boolean | null
          stop_cham?: boolean | null
          stylowanie_buttona?: boolean | null
          tft?: boolean | null
          tirem?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
