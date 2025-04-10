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
      addresses: {
        Row: {
          address: string
          city: string
          created_at: string
          id: string
          is_default: boolean | null
          name: string
          pincode: string
          state: string
          user_id: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          name: string
          pincode: string
          state: string
          user_id: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          name?: string
          pincode?: string
          state?: string
          user_id?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          address_id: string
          booking_date: string
          booking_time: string
          created_at: string
          id: string
          maid_id: string | null
          price: number
          service_id: string
          status: string
          user_id: string
        }
        Insert: {
          address_id: string
          booking_date: string
          booking_time: string
          created_at?: string
          id?: string
          maid_id?: string | null
          price: number
          service_id: string
          status?: string
          user_id: string
        }
        Update: {
          address_id?: string
          booking_date?: string
          booking_time?: string
          created_at?: string
          id?: string
          maid_id?: string | null
          price?: number
          service_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_maids: {
        Row: {
          created_at: string
          id: string
          maid_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          maid_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          maid_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_maids_maid_id_fkey"
            columns: ["maid_id"]
            isOneToOne: false
            referencedRelation: "maids"
            referencedColumns: ["id"]
          },
        ]
      }
      maids: {
        Row: {
          created_at: string
          email: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          jobs_completed: number | null
          level: number | null
          name: string
          phone_number: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          jobs_completed?: number | null
          level?: number | null
          name: string
          phone_number?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          jobs_completed?: number | null
          level?: number | null
          name?: string
          phone_number?: string | null
          rating?: number | null
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          created_at: string
          details: Json
          id: string
          is_default: boolean | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          details: Json
          id?: string
          is_default?: boolean | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          details?: Json
          id?: string
          is_default?: boolean | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          maid_id: string
          rating: number
          user_id: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          maid_id: string
          rating: number
          user_id: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          maid_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string
          created_at: string
          description: string | null
          duration: string
          icon: string | null
          id: string
          is_popular: boolean | null
          name: string
          price: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          duration: string
          icon?: string | null
          id?: string
          is_popular?: boolean | null
          name: string
          price: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          duration?: string
          icon?: string | null
          id?: string
          is_popular?: boolean | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
